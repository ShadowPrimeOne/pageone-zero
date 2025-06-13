'use client'

import { useState, useEffect, useRef } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Module, HeroProps, Background } from '@/lib/editor/types'
import { BackgroundSettings } from './BackgroundSettings'
import { TextFormattingControls } from './TextFormattingControls'

interface Props {
  isOpen: boolean
  close: () => void
  module: Module
  onUpdate: (module: Module) => void
}

export function EditModuleModal({ isOpen, close, module, onUpdate }: Props) {
  const [activeTab, setActiveTab] = useState<'content' | 'background'>('content')
  const [moduleData, setModuleData] = useState(module)
  const [selectedField, setSelectedField] = useState<'heading' | 'subheading'>('heading')
  const [heading, setHeading] = useState((module.props as HeroProps).heading || '')
  const [subheading, setSubheading] = useState((module.props as HeroProps).subheading || '')
  const [localContent, setLocalContent] = useState((module.props as HeroProps).heading || '')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const updateTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)

  // Update local state when module prop changes
  useEffect(() => {
    setModuleData(module)
    setHeading((module.props as HeroProps).heading || '')
    setSubheading((module.props as HeroProps).subheading || '')
    setLocalContent(selectedField === 'heading' ? (module.props as HeroProps).heading || '' : (module.props as HeroProps).subheading || '')
  }, [module, selectedField])

  const handleEditorChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value
    setLocalContent(content)
    
    // Clear any existing timeout
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current)
    }
    
    // Set a new timeout to update the actual content
    updateTimeoutRef.current = setTimeout(() => {
      setCurrentValue(content)
    }, 500) // 500ms debounce
  }

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
        subheading,
        background: moduleData.props.background ? {
          ...moduleData.props.background,
          // Preserve the temporary file data if it exists
          _tempFile: moduleData.props.background._tempFile,
          // Ensure image URL is set if we have a temporary file
          image: moduleData.props.background._tempFile ? 
            URL.createObjectURL(new Blob([Buffer.from(moduleData.props.background._tempFile.data, 'base64')], 
              { type: moduleData.props.background._tempFile.type })) : 
            moduleData.props.background.image
        } : undefined
      }
    }
    
    console.log('EditModuleModal: Saving final module:', finalModule)
    onUpdate(finalModule)
    close()
  }

  const getCurrentValue = () => {
    return selectedField === 'heading' ? heading : subheading
  }

  const setCurrentValue = (value: string) => {
    if (selectedField === 'heading') {
      setHeading(value)
      handleContentChange({ heading: value })
    } else {
      setSubheading(value)
      handleContentChange({ subheading: value })
    }
  }

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current)
      }
    }
  }, [])

  if (!isOpen) return null

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
              {/* Field Selection */}
              <div className="flex gap-4 mb-4">
                <button
                  onClick={() => setSelectedField('heading')}
                  className={`px-4 py-2 rounded-md ${
                    selectedField === 'heading'
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                  }`}
                >
                  Heading
                </button>
                <button
                  onClick={() => setSelectedField('subheading')}
                  className={`px-4 py-2 rounded-md ${
                    selectedField === 'subheading'
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                  }`}
                >
                  Subheading
                </button>
              </div>

              {/* Text Formatting Controls */}
              <TextFormattingControls
                value={getCurrentValue()}
                onChange={setCurrentValue}
                className="mb-4"
              />

              {/* Rich Text Editor */}
              <div className="mt-4 relative">
                <textarea
                  ref={textareaRef}
                  value={localContent}
                  onChange={handleEditorChange}
                  className="w-full min-h-[12rem] px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-transparent text-transparent caret-gray-900 dark:caret-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  style={{ 
                    fontFamily: 'inherit',
                    fontSize: selectedField === 'heading' ? '1.5rem' : '1rem',
                    fontWeight: selectedField === 'heading' ? 'bold' : 'normal',
                    resize: 'vertical',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 1
                  }}
                />
                <div
                  className="w-full min-h-[12rem] px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  style={{ 
                    fontFamily: 'inherit',
                    fontSize: selectedField === 'heading' ? '1.5rem' : '1rem',
                    fontWeight: selectedField === 'heading' ? 'bold' : 'normal',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word'
                  }}
                  dangerouslySetInnerHTML={{ __html: localContent }}
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