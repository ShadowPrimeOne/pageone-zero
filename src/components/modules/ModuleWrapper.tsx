'use client'

import type { ReactNode } from 'react'
import clsx from 'clsx'
import type { Module } from '@/lib/editor/types'
import { useEffect, useRef } from 'react'

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

  // Debug logging
  useEffect(() => {
    console.log('ModuleWrapper rendered:', {
      moduleId: module.id,
      selected,
      isFirst,
      isLast
    })
  }, [module.id, selected, isFirst, isLast])

  // Handle parallax effect
  useEffect(() => {
    if (!module.background?.parallax || !wrapperRef.current) return

    const handleScroll = () => {
      if (!wrapperRef.current) return
      const scrollY = window.scrollY
      const offset = scrollY * 0.5 // Adjust parallax speed here
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
    <div className={clsx(
      'relative transition-all',
      selected ? 'pt-20' : 'py-8' // Add space at top when selected
    )}>
      {/* Module controls - now in a grid at the top */}
      {selected && (
        <div className="absolute top-0 left-0 right-0 flex justify-center gap-2 z-50">
          <button
            onClick={(e) => {
              e.stopPropagation()
              console.log('Add module above:', module.id)
              onAddRequest(module.id, 'above')
            }}
            className="rounded-full bg-white shadow p-2 text-lg hover:bg-gray-100"
            title="Add Above"
          >➕</button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              console.log('Edit module:', module.id)
              onEdit(module.id)
            }}
            className="rounded-full bg-white shadow p-2 text-lg hover:bg-gray-100"
            title="Edit"
          >
            ✏️
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              console.log('Duplicate module:', module.id)
              onDuplicate(module.id)
            }}
            className="rounded-full bg-white shadow p-2 text-lg hover:bg-gray-100"
            title="Duplicate"
          >
            ✂️
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              console.log('Delete module:', module.id)
              onDelete(module.id)
            }}
            className="rounded-full bg-white shadow p-2 text-lg hover:bg-red-100 text-red-600"
            title="Delete"
          >
            🗑️
          </button>
          {!isFirst && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                console.log('Move module up:', module.id)
                onMoveUp(module.id)
              }}
              className="rounded-full bg-white shadow p-2 text-lg hover:bg-gray-100"
              title="Move Up"
            >
              ⬆️
            </button>
          )}
          {!isLast && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                console.log('Move module down:', module.id)
                onMoveDown(module.id)
              }}
              className="rounded-full bg-white shadow p-2 text-lg hover:bg-gray-100"
              title="Move Down"
            >
              ⬇️
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation()
              console.log('Add module below:', module.id)
              onAddRequest(module.id, 'below')
            }}
            className="rounded-full bg-white shadow p-2 text-lg hover:bg-gray-100"
            title="Add Below"
          >➕</button>
        </div>
      )}

      {/* Module content */}
      <div
        id={module.id}
        ref={wrapperRef}
        className={clsx(
          'relative w-full group transition-all',
          selected ? 'ring-2 ring-blue-500 ring-inset scale-[1.01]' : ''
        )}
        onClick={() => {
          console.log('Module clicked:', module.id)
          onSelect(module.id)
        }}
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
    </div>
  )
} 