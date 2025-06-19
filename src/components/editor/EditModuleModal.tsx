'use client'

import { useState, useEffect, useRef } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Module, HeroProps, Background, ClassicOverlayHeroProps } from '@/lib/editor/types'
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
  const [selectedField, setSelectedField] = useState<'heading' | 'subheading' | 'body' | 'cta'>('heading')
  const [heading, setHeading] = useState((module.props as HeroProps).heading || '')
  const [subheading, setSubheading] = useState((module.props as HeroProps).subheading || '')
  const [body, setBody] = useState((module.props as HeroProps).body || '')
  const [ctaText, setCtaText] = useState((module.props as HeroProps).ctaText || '')
  const [ctaLink, setCtaLink] = useState((module.props as HeroProps).ctaLink || '')
  const [ctaTextColor, setCtaTextColor] = useState((module.props as HeroProps).ctaTextColor || '#ffffff')
  const [ctaBorderColor, setCtaBorderColor] = useState((module.props as HeroProps).ctaBorderColor || '#000000')
  const [ctaBackgroundColor, setCtaBackgroundColor] = useState((module.props as HeroProps).ctaBackgroundColor || 'transparent')
  const [ctaBackgroundOpacity, setCtaBackgroundOpacity] = useState((module.props as HeroProps).ctaBackgroundOpacity ?? 100)
  const [localContent, setLocalContent] = useState((module.props as HeroProps).heading || '')
  const contentRef = useRef<HTMLDivElement>(null)
  const lastSelectionRef = useRef<{ start: number; end: number } | null>(null)
  const isUpdatingRef = useRef(false)

  // Update local state when module prop changes
  useEffect(() => {
    if (!isUpdatingRef.current) {
      setModuleData(module)
      setHeading((module.props as HeroProps).heading || '')
      setSubheading((module.props as HeroProps).subheading || '')
      setBody((module.props as HeroProps).body || '')
      setCtaText((module.props as HeroProps).ctaText || '')
      setCtaLink((module.props as HeroProps).ctaLink || '')
      setCtaTextColor((module.props as HeroProps).ctaTextColor || '#ffffff')
      setCtaBorderColor((module.props as HeroProps).ctaBorderColor || '#000000')
      setCtaBackgroundColor((module.props as HeroProps).ctaBackgroundColor || 'transparent')
      setCtaBackgroundOpacity((module.props as HeroProps).ctaBackgroundOpacity ?? 100)
      setLocalContent(selectedField === 'heading' ? (module.props as HeroProps).heading || '' : (module.props as HeroProps).subheading || '')
    }
  }, [module, selectedField])

  const saveSelection = () => {
    if (!contentRef.current) return
    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) return

    const range = selection.getRangeAt(0)
    if (!contentRef.current.contains(range.commonAncestorContainer)) return

    const preSelectionRange = range.cloneRange()
    preSelectionRange.selectNodeContents(contentRef.current)
    preSelectionRange.setEnd(range.startContainer, range.startOffset)
    const start = preSelectionRange.toString().length

    lastSelectionRef.current = {
      start,
      end: start + range.toString().length
    }
  }

  const restoreSelection = () => {
    if (!lastSelectionRef.current || !contentRef.current) return

    const selection = window.getSelection()
    if (!selection) return

    const range = document.createRange()
    let charIndex = 0
    let startNode: Node | null = null
    let startOffset = 0
    let endNode: Node | null = null
    let endOffset = 0

    const traverseNodes = (node: Node) => {
      if (startNode && endNode) return

      if (node.nodeType === Node.TEXT_NODE) {
        const nextCharIndex = charIndex + node.textContent!.length

        if (!startNode && charIndex <= lastSelectionRef.current!.start && lastSelectionRef.current!.start <= nextCharIndex) {
          startNode = node
          startOffset = lastSelectionRef.current!.start - charIndex
        }

        if (!endNode && charIndex <= lastSelectionRef.current!.end && lastSelectionRef.current!.end <= nextCharIndex) {
          endNode = node
          endOffset = lastSelectionRef.current!.end - charIndex
        }

        charIndex = nextCharIndex
      } else {
        for (const child of Array.from(node.childNodes)) {
          traverseNodes(child)
        }
      }
    }

    traverseNodes(contentRef.current)

    if (startNode && endNode) {
      try {
        range.setStart(startNode, startOffset)
        range.setEnd(endNode, endOffset)
        selection.removeAllRanges()
        selection.addRange(range)
      } catch (error) {
        console.error('Error restoring selection:', error)
      }
    }
  }

  const handleContentChange = (updates: Partial<HeroProps>) => {
    console.log('EditModuleModal: handleContentChange called with:', updates)
    console.log('EditModuleModal: Current moduleData:', moduleData)
    
    // Only update htmlContent for the specific field being edited
    const textFields = ['heading', 'subheading', 'body', 'ctaText']
    const htmlContentUpdates: { [key: string]: string | undefined } = {}
    
    // Only update htmlContent if we're editing a text field AND that specific field is in the updates
    Object.keys(updates).forEach(key => {
      if (textFields.includes(key) && key === selectedField) {
        // Only set htmlContent if the field actually has content (not empty string)
        const value = updates[key as keyof HeroProps] as string | undefined
        if (value && value.trim() !== '') {
          htmlContentUpdates[key] = value
        } else if (value === '') {
          // If user cleared the field, set it to empty string to show nothing
          htmlContentUpdates[key] = ''
        }
        // If value is undefined, don't set htmlContent (preserve original placeholder)
      }
    })
    
    // Only update htmlContent if there are actual text field changes
    const updatedModule = {
      ...moduleData,
      props: {
        ...moduleData.props,
        ...updates,
        ...(Object.keys(htmlContentUpdates).length > 0 && {
          htmlContent: {
            ...(moduleData.props as ClassicOverlayHeroProps).htmlContent,
            ...htmlContentUpdates
          }
        })
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
        body,
        ctaText,
        ctaLink,
        ctaTextColor,
        ctaBorderColor,
        ctaBackgroundColor,
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

  const setCurrentValue = (value: string) => {
    if (selectedField === 'heading') {
      setHeading(value)
      handleContentChange({ heading: value })
    } else if (selectedField === 'subheading') {
      setSubheading(value)
      handleContentChange({ subheading: value })
    } else if (selectedField === 'body') {
      setBody(value)
      handleContentChange({ body: value })
    } else if (selectedField === 'cta') {
      setCtaText(value)
      handleContentChange({ ctaText: value })
    }
  }

  // Update localContent when selectedField changes
  useEffect(() => {
    if (selectedField === 'heading') {
      setLocalContent((module.props as HeroProps).heading || '')
    } else if (selectedField === 'subheading') {
      setLocalContent((module.props as HeroProps).subheading || '')
    } else if (selectedField === 'body') {
      setLocalContent((module.props as HeroProps).body || '')
    } else {
      setLocalContent((module.props as HeroProps).ctaText || '')
    }
  }, [selectedField, module.props])

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    if (!e.currentTarget) return
    
    try {
      saveSelection()
      const content = e.currentTarget.innerHTML
      setLocalContent(content)
      
      isUpdatingRef.current = true
      setCurrentValue(content)
      requestAnimationFrame(() => {
        isUpdatingRef.current = false
        restoreSelection()
      })
    } catch (error) {
      console.error('Error updating content:', error)
    }
  }

  const handleFormatChange = (value: string) => {
    if (!contentRef.current) return
    
    saveSelection()
    setLocalContent(value)
    setCurrentValue(value)
    
    isUpdatingRef.current = true
    requestAnimationFrame(() => {
      isUpdatingRef.current = false
      restoreSelection()
    })
  }

  const handleStyleChange = (style: string, value: string) => {
    if (!contentRef.current) return
    
    saveSelection()
    const selection = window.getSelection()
    if (!selection) return

    const range = selection.getRangeAt(0)
    if (!contentRef.current.contains(range.commonAncestorContainer)) return

    const span = document.createElement('span')
    span.style[style as any] = value
    range.surroundContents(span)

    const content = contentRef.current.innerHTML
    setLocalContent(content)
    setCurrentValue(content)
    
    isUpdatingRef.current = true
    requestAnimationFrame(() => {
      isUpdatingRef.current = false
      restoreSelection()
    })
  }

  // Add event listeners for selection changes
  useEffect(() => {
    const handleSelectionChange = () => {
      if (!isUpdatingRef.current) {
        saveSelection()
      }
    }

    document.addEventListener('selectionchange', handleSelectionChange)
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange)
    }
  }, [])

  // Restore selection after content update
  useEffect(() => {
    if (contentRef.current && !isUpdatingRef.current) {
      requestAnimationFrame(restoreSelection)
    }
  }, [localContent])

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
                <button
                  onClick={() => setSelectedField('body')}
                  className={`px-4 py-2 rounded-md ${
                    selectedField === 'body'
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                  }`}
                >
                  Body
                </button>
                <button
                  onClick={() => setSelectedField('cta')}
                  className={`px-4 py-2 rounded-md ${
                    selectedField === 'cta'
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                  }`}
                >
                  CTA
                </button>
              </div>

              {/* Text Formatting Controls */}
              {selectedField !== 'cta' && (
                <TextFormattingControls
                  value={localContent}
                  onChange={handleFormatChange}
                  onStyleChange={handleStyleChange}
                  className="mb-4"
                />
              )}

              {/* CTA Button Editor */}
              {selectedField === 'cta' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Link (Button links to...)
                    </label>
                    <input
                      type="text"
                      value={ctaLink}
                      onChange={(e) => {
                        setCtaLink(e.target.value)
                        handleContentChange({ ctaLink: e.target.value })
                      }}
                      placeholder="https://example.com or #section"
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Button Text (Displayed Text)
                    </label>
                    <input
                      type="text"
                      value={ctaText}
                      onChange={(e) => {
                        setCtaText(e.target.value)
                        handleContentChange({ ctaText: e.target.value })
                      }}
                      placeholder="Get Started"
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Text Color
                    </label>
                    <input
                      type="color"
                      value={ctaTextColor}
                      onChange={(e) => {
                        setCtaTextColor(e.target.value)
                        handleContentChange({ ctaTextColor: e.target.value })
                      }}
                      className="w-16 h-10 border border-gray-300 dark:border-gray-600 rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Border/Outline Color
                    </label>
                    <input
                      type="color"
                      value={ctaBorderColor}
                      onChange={(e) => {
                        setCtaBorderColor(e.target.value)
                        handleContentChange({ ctaBorderColor: e.target.value })
                      }}
                      className="w-16 h-10 border border-gray-300 dark:border-gray-600 rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Background Color
                    </label>
                    <input
                      type="color"
                      value={ctaBackgroundColor}
                      onChange={(e) => {
                        setCtaBackgroundColor(e.target.value)
                        handleContentChange({ ctaBackgroundColor: e.target.value })
                      }}
                      className="w-16 h-10 border border-gray-300 dark:border-gray-600 rounded-md"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Background Transparency
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={ctaBackgroundOpacity}
                        onChange={(e) => {
                          const opacity = parseInt(e.target.value)
                          setCtaBackgroundOpacity(opacity)
                          handleContentChange({ ctaBackgroundOpacity: opacity })
                        }}
                        className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400 w-12">
                        {ctaBackgroundOpacity}%
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Rich Text Editor */}
              {selectedField !== 'cta' && (
                <div className="mt-4">
                  <div
                    ref={contentRef}
                    contentEditable
                    suppressContentEditableWarning
                    onInput={handleInput}
                    onBlur={handleInput}
                    onKeyUp={saveSelection}
                    onMouseUp={saveSelection}
                    onSelect={saveSelection}
                    className="w-full min-h-[12rem] px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    style={{ 
                      fontFamily: 'inherit',
                      fontSize: selectedField === 'heading' ? '1.5rem' : selectedField === 'subheading' ? '1rem' : '0.875rem',
                      fontWeight: selectedField === 'heading' ? 'bold' : selectedField === 'subheading' ? 'semibold' : 'normal',
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                      lineHeight: 'inherit'
                    }}
                    dangerouslySetInnerHTML={{ __html: localContent }}
                  />
                </div>
              )}
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