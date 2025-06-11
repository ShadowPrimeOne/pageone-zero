'use client'

import React, { useState, useEffect } from 'react'
import { Dialog } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import type { Module, HeroProps, ModuleBackground } from '@/lib/editor/types'

interface Props {
  isOpen: boolean
  close: () => void
  module: Module
  onUpdate: (updates: Partial<HeroProps>) => void
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
    onUpdate({
      ...module.props,
      [field]: value
    })
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Background Type
                  </label>
                  <select
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                    value={module.background?.type || 'color'}
                    onChange={(e) => handleBackgroundTypeChange(e.target.value as 'color' | 'image')}
                  >
                    <option value="color">Color</option>
                    <option value="image">Image</option>
                  </select>
                </div>

                {module.background?.type === 'color' ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Background Color
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        className="w-12 h-12 rounded-lg border border-gray-300"
                        value={module.background?.color || '#ffffff'}
                        onChange={(e) => handleBackgroundColorChange(e.target.value)}
                      />
                      <input
                        type="text"
                        className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                        value={module.background?.color || '#ffffff'}
                        onChange={(e) => handleBackgroundColorChange(e.target.value)}
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Background Image
                    </label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                          >
                            <span>Upload a file</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Opacity
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    className="w-full"
                    value={module.background?.opacity || 1}
                    onChange={(e) => handleBackgroundOpacityChange(parseFloat(e.target.value))}
                  />
                  <div className="text-sm text-gray-500 text-right">
                    {Math.round((module.background?.opacity || 1) * 100)}%
                  </div>
                </div>
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
                onClick={close}
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