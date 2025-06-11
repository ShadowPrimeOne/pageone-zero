'use client'

import React, { useState, useEffect } from 'react'
import { Dialog } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import type { Module, HeroProps, Hero2Props, ModuleBackground } from '@/lib/editor/types'
import { BackgroundSettings } from '@/components/editor/BackgroundSettings'

interface Props {
  isOpen: boolean
  close: () => void
  module: Module
  onUpdate: (updates: Partial<HeroProps | Hero2Props>) => void
}

export function EditModuleModal({ isOpen, close, module, onUpdate }: Props) {
  const [selectedTab, setSelectedTab] = useState<'content' | 'background' | 'overlay'>('content')
  const [heading, setHeading] = useState((module.props as HeroProps).heading || '')
  const [subheading, setSubheading] = useState((module.props as HeroProps).subheading || '')

  // Update local state when module changes
  useEffect(() => {
    setHeading((module.props as HeroProps).heading || '')
    setSubheading((module.props as HeroProps).subheading || '')
  }, [module])

  if (!isOpen) return null

  const handleBackgroundChange = (background: ModuleBackground) => {
    onUpdate({ background } as HeroProps)
  }

  const handleTextChange = (field: keyof HeroProps, value: string) => {
    if (field === 'heading') {
      setHeading(value)
    } else if (field === 'subheading') {
      setSubheading(value)
    }
  }

  const handleSave = () => {
    console.log('EditModuleModal: handleSave called with:', { heading, subheading })
    const updates = module.type === 'hero2'
      ? {
          heading,
          subheading,
          background: module.props.background ? {
            ...module.props.background,
            opacity: module.props.background.opacity ?? 1
          } : undefined
        } as Partial<Hero2Props>
      : {
          heading,
          subheading,
          background: module.props.background ? {
            ...module.props.background,
            opacity: module.props.background.opacity ?? 1
          } : undefined
        } as Partial<HeroProps>
    
    console.log('EditModuleModal: Saving updates:', updates)
    if (onUpdate) {
      onUpdate(updates)
      console.log('EditModuleModal: Updates sent to parent')
    } else {
      console.warn('EditModuleModal: onUpdate handler is not defined')
    }
    close()
  }

  const handleBackgroundTypeChange = (type: 'color' | 'image') => {
    const newBackground: ModuleBackground = {
      type,
      color: type === 'color' ? '#ffffff' : '',
      opacity: 1,
      ...(type === 'image' ? { image: '' } : {})
    }
    handleBackgroundChange(newBackground)
  }

  const handleBackgroundColorChange = (color: string) => {
    if (!module.background) return
    handleBackgroundChange({
      ...module.background,
      color,
      type: 'color'
    })
  }

  const handleBackgroundOpacityChange = (opacity: number) => {
    if (!module.background) return
    handleBackgroundChange({
      ...module.background,
      opacity
    })
  }

  const handleOverlayColorChange = (color: string) => {
    if (!module.background) return
    handleBackgroundChange({
      ...module.background,
      overlay: {
        color,
        opacity: module.background.overlay?.opacity || 0.5
      }
    })
  }

  const handleOverlayOpacityChange = (opacity: number) => {
    if (!module.background) return
    handleBackgroundChange({
      ...module.background,
      overlay: {
        color: module.background.overlay?.color || '#000000',
        opacity
      }
    })
  }

  return (
    <Dialog open={isOpen} onClose={close} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-x-0 top-0 flex justify-center">
        <Dialog.Panel className="w-[95%] sm:w-[85%] md:w-[75%] lg:w-[65%] xl:w-[55%] bg-white rounded-b-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b bg-gray-900 text-white">
            <Dialog.Title className="text-2xl font-bold">Edit Module</Dialog.Title>
            <button
              onClick={close}
              className="text-gray-300 hover:text-white"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              <button
                onClick={() => setSelectedTab('content')}
                className={`
                  py-4 px-1 border-b-2 font-medium text-sm
                  ${selectedTab === 'content'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                Content
              </button>
              <button
                onClick={() => setSelectedTab('background')}
                className={`
                  py-4 px-1 border-b-2 font-medium text-sm
                  ${selectedTab === 'background'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                Background
              </button>
              <button
                onClick={() => setSelectedTab('overlay')}
                className={`
                  py-4 px-1 border-b-2 font-medium text-sm
                  ${selectedTab === 'overlay'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                Overlay
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="p-6">
            {selectedTab === 'content' && (
              <div className="space-y-6 p-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Heading
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                    value={heading}
                    onChange={(e) => handleTextChange('heading', e.target.value)}
                    placeholder="Enter heading"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subheading
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                    value={subheading}
                    onChange={(e) => handleTextChange('subheading', e.target.value)}
                    placeholder="Enter subheading"
                  />
                </div>
              </div>
            )}

            {selectedTab === 'background' && (
              <div className="space-y-6">
                <BackgroundSettings
                  background={module.background}
                  onChange={handleBackgroundChange}
                  moduleType={module.type}
                />
              </div>
            )}

            {selectedTab === 'overlay' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Overlay Color
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      className="w-12 h-12 rounded-lg border border-gray-300"
                      value={module.background?.overlay?.color || '#000000'}
                      onChange={(e) => handleOverlayColorChange(e.target.value)}
                    />
                    <input
                      type="text"
                      className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                      value={module.background?.overlay?.color || '#000000'}
                      onChange={(e) => handleOverlayColorChange(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Overlay Opacity
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    className="w-full"
                    value={module.background?.overlay?.opacity || 0}
                    onChange={(e) => handleOverlayOpacityChange(parseFloat(e.target.value))}
                  />
                  <div className="text-sm text-gray-500 text-right">
                    {Math.round((module.background?.overlay?.opacity || 0) * 100)}%
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex justify-end space-x-3">
              <button
                onClick={close}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Save Changes
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
} 