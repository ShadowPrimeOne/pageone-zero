'use client'

import type { ReactNode } from 'react'
import clsx from 'clsx'
import type { Module } from '@/lib/editor/types'
import { useEffect, useRef } from 'react'
import { EditorPanel } from '../editor/EditorPanel'
import { useEditorState } from '@/lib/editor/useEditorState'

interface Props {
  module: Module
  selected: boolean
  onSelect: (id: string) => void
  onDelete: (id: string) => void
  onMoveUp: (id: string) => void
  onMoveDown: (id: string) => void
  onDuplicate: (id: string) => void
  onEdit: (id: string) => void
  onAddRequest: (relativeId: string, position: 'above' | 'below') => void
  isFirst: boolean
  isLast: boolean
  children: ReactNode
}

export function ModuleWrapper({
  module,
  selected,
  onSelect,
  onDelete,
  onMoveUp,
  onMoveDown,
  onDuplicate,
  onEdit,
  onAddRequest,
  isFirst,
  isLast,
  children,
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const { isEditorOpen, setIsEditorOpen, updateModule } = useEditorState()

  // Handle parallax effect
  useEffect(() => {
    if (!module.background?.parallax || !wrapperRef.current) return

    const handleScroll = () => {
      if (!wrapperRef.current) return
      const scrollY = window.scrollY
      const offset = scrollY * 0.5
      wrapperRef.current.style.backgroundPositionY = `${offset}px`
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [module.background?.parallax])

  const backgroundStyle = module.background ? {
    backgroundImage: module.background.type === 'image' ? `url(${module.background.value})` : undefined,
    backgroundColor: module.background.type === 'color' ? module.background.value : undefined,
    backgroundSize: module.background.type === 'image' ? 'cover' : undefined,
    backgroundPosition: module.background.type === 'image' ? 'center' : undefined,
    backgroundAttachment: module.background.parallax ? 'fixed' : 'scroll',
  } : {}

  const overlayStyle = module.background?.type === 'image' && module.background.overlay ? {
    backgroundColor: module.background.overlay.color,
    opacity: module.background.overlay.opacity,
  } : {}

  return (
    <div className="w-full">
      {/* Editor panel and controls appear above the module */}
      {selected && (
        <div className="w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 mb-2">
          <div className="max-w-7xl mx-auto px-4 py-2">
            <div className="grid grid-cols-6 gap-2 items-center justify-items-center">
              <div className="col-span-1">
                {!isFirst && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onMoveUp(module.id)
                    }}
                    className="w-full rounded-full bg-white/90 backdrop-blur-sm shadow p-2 text-lg hover:bg-gray-100"
                    title="Move Up"
                  >⬆️</button>
                )}
              </div>
              <div className="col-span-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsEditorOpen(true)
                    onEdit(module.id)
                  }}
                  className="w-full rounded-full bg-white/90 backdrop-blur-sm shadow p-2 text-lg hover:bg-gray-100"
                  title="Edit"
                >✏️</button>
              </div>
              <div className="col-span-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onDuplicate(module.id)
                  }}
                  className="w-full rounded-full bg-white/90 backdrop-blur-sm shadow p-2 text-lg hover:bg-gray-100"
                  title="Duplicate"
                >✂️</button>
              </div>
              <div className="col-span-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onDelete(module.id)
                  }}
                  className="w-full rounded-full bg-white/90 backdrop-blur-sm shadow p-2 text-lg hover:bg-red-100 text-red-600"
                  title="Delete"
                >🗑️</button>
              </div>
              <div className="col-span-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onAddRequest(module.id, 'below')
                  }}
                  className="w-full rounded-full bg-white/90 backdrop-blur-sm shadow p-2 text-lg hover:bg-gray-100"
                  title="Add Module"
                >➕</button>
              </div>
              <div className="col-span-1">
                {!isLast && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onMoveDown(module.id)
                    }}
                    className="w-full rounded-full bg-white/90 backdrop-blur-sm shadow p-2 text-lg hover:bg-gray-100"
                    title="Move Down"
                  >⬇️</button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Module content - edge to edge */}
      <div
        id={module.id}
        ref={wrapperRef}
        className={clsx(
          'relative w-full transition-all overflow-hidden',
          selected ? 'ring-2 ring-blue-500' : ''
        )}
        onClick={() => onSelect(selected ? '' : module.id)}
        style={backgroundStyle}
      >
        {/* Background overlay */}
        {module.background?.type === 'image' && module.background.overlay && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={overlayStyle}
          />
        )}

        {/* Content */}
        <div className="relative flex flex-col w-full">{children}</div>
      </div>

      {/* Editor panel */}
      {selected && isEditorOpen && (
        <div className="w-full bg-white/95 backdrop-blur-sm border-t border-gray-200 mt-2">
          <div className="max-w-7xl mx-auto px-4 py-2">
            <EditorPanel
              modules={[]}
              selectedModuleId={module.id}
              isEditorOpen={isEditorOpen}
              setIsEditorOpen={setIsEditorOpen}
              updateModule={updateModule}
            />
          </div>
        </div>
      )}
    </div>
  )
} 