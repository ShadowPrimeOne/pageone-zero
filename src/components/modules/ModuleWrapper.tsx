'use client'

import { useEffect, useRef, ReactNode, useState } from 'react'
import React from 'react'
import type { Module, HeroProps, Hero2Props, Background } from '@/lib/editor/types'
import Image from 'next/image'
import { EditModuleModal } from '../editor/EditModuleModal'
import clsx from 'clsx'

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
  onUpdate?: (id: string, updates: Partial<HeroProps | Hero2Props>) => void
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
  onUpdate,
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const scrollPositionRef = useRef<number>(0)
  const [tempUrl, setTempUrl] = useState<string | null>(null)

  // Handle scroll to top when module is selected
  useEffect(() => {
    if (selected && wrapperRef.current) {
      // Store current scroll position before any changes
      scrollPositionRef.current = window.scrollY
      
      // Get the menu element
      const menuElement = document.querySelector('.sticky.top-0')
      if (menuElement) {
        // Get the menu's position
        const menuRect = menuElement.getBoundingClientRect()
        const menuTop = menuRect.top + window.scrollY
        
        // Scroll to the menu's position
        window.scrollTo(0, menuTop)
        
        // Then lock the scroll
        document.body.style.overflow = 'hidden'
        document.body.style.position = 'fixed'
        document.body.style.width = '100%'
        document.body.style.top = `-${menuTop}px`
      }
    } else {
      // Restore scroll position and unlock
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
      document.body.style.top = ''
      
      // If we have a stored position, scroll to it
      if (scrollPositionRef.current !== 0) {
        window.scrollTo(0, scrollPositionRef.current)
      }
    }
  }, [selected])

  // Clean up temporary URL when component unmounts
  useEffect(() => {
    return () => {
      if (tempUrl) {
        URL.revokeObjectURL(tempUrl)
      }
    }
  }, [tempUrl])

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
    backgroundImage: module.background.type === 'image' ? `url(${module.background.image || (module.background._tempFile ? (() => {
      const url = URL.createObjectURL(module.background._tempFile!)
      setTempUrl(url)
      return url
    })() : undefined)})` : undefined,
    backgroundColor: module.background.type === 'color' ? module.background.color : undefined,
    backgroundSize: module.background.type === 'image' ? 'cover' : undefined,
    backgroundPosition: module.background.type === 'image' ? 'center' : undefined,
    backgroundAttachment: module.background.parallax ? 'fixed' : 'scroll',
  } : {}

  const overlayStyle = module.background?.type === 'image' && module.background.overlay ? {
    backgroundColor: module.background.overlay.color,
    opacity: module.background.overlay.opacity,
  } : {}

  const handleModuleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (selected) {
      onSelect('') // Deselect by passing empty string
    } else {
      onSelect(module.id)
    }
  }

  const handleUpdate = (updates: Partial<Module['props']>) => {
    if (updates.background) {
      console.log('ModuleWrapper: Background update:', updates.background)
      const currentBackground = (module.props.background || {}) as Background
      const newBackground: Background = {
        ...currentBackground,
        ...updates.background,
        type: updates.background.type || currentBackground.type || 'color',
        color: updates.background.type === 'color' ? (updates.background.color || currentBackground.color || '#000000') : '#000000',
        opacity: updates.background.opacity ?? currentBackground.opacity ?? 1,
        image: updates.background.type === 'image' ? updates.background.image : currentBackground.image,
        _tempFile: updates.background._tempFile || currentBackground._tempFile,
        overlay: {
          color: updates.background.overlay?.color || currentBackground.overlay?.color || '#000000',
          opacity: updates.background.overlay?.opacity ?? currentBackground.overlay?.opacity ?? 0.5
        }
      }
      updates.background = newBackground
    }

    const updatedProps = {
      ...module.props,
      ...updates
    }
    onUpdate?.(module.id, updatedProps)
  }

  return (
    <div className="relative">
      {/* Editor panel and controls appear above the module */}
      {selected && (
        <div className="w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-2">
            <div className="grid grid-cols-6 gap-2 items-center justify-items-center">
              {/* Move Up Button */}
              <div className="col-span-1">
                <button
                  onClick={(e) => {
                    if (!isFirst) {
                      e.stopPropagation()
                      onMoveUp(module.id)
                    }
                  }}
                  className={clsx(
                    "w-full rounded-full bg-white/90 backdrop-blur-sm shadow p-2 transition-all duration-200",
                    isFirst 
                      ? "opacity-60 cursor-not-allowed" 
                      : "hover:bg-gray-100 hover:scale-110"
                  )}
                  title={isFirst ? "Cannot move up" : "Move Up"}
                >
                  <Image
                    src="/IMAGES/Up.svg"
                    alt="Move Up"
                    width={24}
                    height={24}
                    className={clsx(
                      "[filter:invert(0.5)_sepia(1)_saturate(5)_hue-rotate(175deg)_brightness(1.2)]",
                      isFirst && "opacity-70"
                    )}
                  />
                </button>
              </div>

              {/* Edit Button */}
              <div className="col-span-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsEditorOpen(true)
                    onEdit(module.id)
                  }}
                  className="w-full rounded-full bg-white/90 backdrop-blur-sm shadow p-2 hover:bg-gray-100 transition-all duration-200 hover:scale-110"
                  title="Edit"
                >
                  <Image
                    src="/IMAGES/EDIT.svg"
                    alt="Edit"
                    width={24}
                    height={24}
                  />
                </button>
              </div>

              {/* Duplicate Button */}
              <div className="col-span-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onDuplicate(module.id)
                  }}
                  className="w-full rounded-full bg-white/90 backdrop-blur-sm shadow p-2 hover:bg-gray-100 transition-all duration-200 hover:scale-110"
                  title="Duplicate"
                >
                  <Image
                    src="/IMAGES/COPY.svg"
                    alt="Duplicate"
                    width={24}
                    height={24}
                  />
                </button>
              </div>

              {/* Delete Button */}
              <div className="col-span-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onDelete(module.id)
                  }}
                  className="w-full rounded-full bg-white/90 backdrop-blur-sm shadow p-2 hover:bg-red-100 text-red-600 transition-all duration-200 hover:scale-110"
                  title="Delete"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>

              {/* Add Module Button */}
              <div className="col-span-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onAddRequest(module.id, 'below')
                  }}
                  className="w-full rounded-full bg-white/90 backdrop-blur-sm shadow p-2 hover:bg-gray-100 transition-all duration-200 hover:scale-110"
                  title="Add Module"
                >
                  <Image
                    src="/IMAGES/ADD MODULE.svg"
                    alt="Add Module"
                    width={24}
                    height={24}
                  />
                </button>
              </div>

              {/* Move Down Button */}
              <div className="col-span-1">
                <button
                  onClick={(e) => {
                    if (!isLast) {
                      e.stopPropagation()
                      onMoveDown(module.id)
                    }
                  }}
                  className={clsx(
                    "w-full rounded-full bg-white/90 backdrop-blur-sm shadow p-2 transition-all duration-200",
                    isLast 
                      ? "opacity-60 cursor-not-allowed" 
                      : "hover:bg-gray-100 hover:scale-110"
                  )}
                  title={isLast ? "Cannot move down" : "Move Down"}
                >
                  <Image
                    src="/IMAGES/Down 1.svg"
                    alt="Move Down"
                    width={24}
                    height={24}
                    className={clsx(
                      "[filter:invert(0.5)_sepia(1)_saturate(5)_hue-rotate(320deg)_brightness(1.2)]",
                      isLast && "opacity-70"
                    )}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Editor panel - moved outside the module content */}
      {selected && isEditorOpen && (
        <EditModuleModal
          isOpen={isEditorOpen}
          close={() => setIsEditorOpen(false)}
          module={module}
          onUpdate={handleUpdate}
        />
      )}

      {/* Module content - edge to edge */}
      <div
        id={module.id}
        ref={wrapperRef}
        className={clsx(
          'relative w-full transition-all overflow-hidden',
          selected ? 'ring-2 ring-blue-500 ring-offset-2' : ''
        )}
        onClick={handleModuleClick}
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
        <div 
          className={clsx(
            "relative flex flex-col w-full",
            selected && "pointer-events-none"
          )}
        >
          {children}
        </div>
      </div>
    </div>
  )
} 