'use client'

import { useState, useEffect } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Module, HeroProps, Background } from '@/lib/editor/types'
import { BackgroundSettings } from './BackgroundSettings'

interface Props {
  isOpen: boolean
  close: () => void
  module: Module
  onUpdate: (module: Module) => void
}

export function EditModuleModal({ isOpen, close, module, onUpdate }: Props) {
  const [activeTab, setActiveTab] = useState<'content' | 'background'>('content')
  const [moduleData, setModuleData] = useState(module)
  const [heading, setHeading] = useState((module.props as HeroProps).heading || '')
  const [subheading, setSubheading] = useState((module.props as HeroProps).subheading || '')

  // Update local state when module prop changes
  useEffect(() => {
    setModuleData(module)
    setHeading((module.props as HeroProps).heading || '')
    setSubheading((module.props as HeroProps).subheading || '')
  }, [module])

  if (!isOpen) return null

  const handleContentChange = (updates: Partial<HeroProps>) => {
    console.log('EditModuleModal: handleContentChange called with:', updates)
    console.log('EditModuleModal: Current moduleData:', moduleData)
    
    const updatedModule = {
      ...moduleData,
      props: {
        ...moduleData.props,
        ...updates
      }
    }
    
    console.log('EditModuleModal: Created content update:', updatedModule)
    setModuleData(updatedModule)
    onUpdate(updatedModule)
  }

  const handleBackgroundChange = (updates: Partial<Background>) => {
    console.log('EditModuleModal: Background update:', updates)
    
    // Create updated module with background changes
    const updatedModule = {
      ...moduleData,
      props: {
        ...moduleData.props,
        background: {
          ...moduleData.props.background,
          ...updates,
          type: updates.type || moduleData.props.background?.type || 'color',
          color: updates.type === 'color' ? (updates.color || moduleData.props.background?.color || '#000000') : '#000000',
          opacity: updates.opacity ?? moduleData.props.background?.opacity ?? 1,
          image: updates.type === 'image' ? updates.image : moduleData.props.background?.image,
          overlay: {
            color: updates.overlay?.color || moduleData.props.background?.overlay?.color || '#000000',
            opacity: updates.overlay?.opacity ?? moduleData.props.background?.overlay?.opacity ?? 0.5
          }
        }
      }
    }
    
    setModuleData(updatedModule)
    onUpdate(updatedModule)
  }

  const handleSave = () => {
    console.log('EditModuleModal: handleSave called')
    console.log('EditModuleModal: Current moduleData:', moduleData)
    
    // Ensure all changes are saved before closing
    const finalModule = {
      ...moduleData,
      props: {
        ...moduleData.props,
        heading,
        subheading
      }
    }
    
    console.log('EditModuleModal: Saving final module:', finalModule)
    onUpdate(finalModule)
    close()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Edit Module</h2>
            <button
              onClick={close}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex">
            <button
              className={`flex-1 px-4 py-3 text-sm font-medium ${
                activeTab === 'content'
                  ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
              onClick={() => setActiveTab('content')}
            >
              Content
            </button>
            <button
              className={`flex-1 px-4 py-3 text-sm font-medium ${
                activeTab === 'background'
                  ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
              onClick={() => setActiveTab('background')}
            >
              Background
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'content' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Heading
                </label>
                <input
                  type="text"
                  value={heading}
                  onChange={(e) => {
                    setHeading(e.target.value)
                    handleContentChange({
                      heading: e.target.value
                    })
                  }}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter heading"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subheading
                </label>
                <input
                  type="text"
                  value={subheading}
                  onChange={(e) => {
                    setSubheading(e.target.value)
                    handleContentChange({
                      subheading: e.target.value
                    })
                  }}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter subheading"
                />
              </div>
            </div>
          )}

          {activeTab === 'background' && (
            <div className="space-y-4">
              <BackgroundSettings
                background={moduleData.props.background}
                onChange={handleBackgroundChange}
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <div className="flex justify-end gap-4">
            <button
              onClick={close}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 