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
  const [activeTab, setActiveTab] = useState<'content' | 'background' | 'layout'>('content')
  const [moduleData, setModuleData] = useState(module)
  const [selectedField, setSelectedField] = useState<'heading' | 'subheading' | 'body' | 'cta'>('heading')
  const [heading, setHeading] = useState((module.props as HeroProps).heading || '')
  const [subheading, setSubheading] = useState((module.props as HeroProps).subheading || '')
  const [body, setBody] = useState((module.props as HeroProps).body || '')
  const [ctaText, setCtaText] = useState((module.props as HeroProps).ctaText || '')
  const [ctaLink, setCtaLink] = useState((module.props as HeroProps).ctaLink || '')
  const [ctaTextColor, setCtaTextColor] = useState((module.props as HeroProps).ctaTextColor || '#ffffff')
  const [ctaBorderColor, setCtaBorderColor] = useState((module.props as HeroProps).ctaBorderColor || '#000000')
  const [ctaBackgroundColor, setCtaBackgroundColor] = useState((module.props as HeroProps).ctaBackgroundColor || '')
  const [ctaBackgroundOpacity, setCtaBackgroundOpacity] = useState((module.props as HeroProps).ctaBackgroundOpacity ?? 100)
  const [ctaAlignment, setCtaAlignment] = useState((module.props as HeroProps).ctaAlignment || 'center')
  const [textPosition, setTextPosition] = useState((module.props as HeroProps).textPosition || 'center')
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
      setCtaBackgroundColor((module.props as HeroProps).ctaBackgroundColor || '')
      setCtaBackgroundOpacity((module.props as HeroProps).ctaBackgroundOpacity ?? 100)
      setCtaAlignment((module.props as HeroProps).ctaAlignment || 'center')
      setTextPosition((module.props as HeroProps).textPosition || 'center')
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
    
    setModuleData(updatedModule)
    onUpdate(updatedModule)
  }

  const handleLayoutChange = (position: 'top' | 'center' | 'bottom') => {
    setTextPosition(position)
    
    const updatedModule = {
      ...moduleData,
      props: {
        ...moduleData.props,
        textPosition: position
      }
    }
    
    setModuleData(updatedModule)
    onUpdate(updatedModule)
  }

  const handleBackgroundChange = (updates: Partial<Background>) => {
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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" data-editor-modal>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col border border-gray-200">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Edit Module</h2>
            <button
              onClick={close}
              className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              className={`flex-1 px-6 py-4 text-base font-medium transition-colors ${
                activeTab === 'content'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('content')}
            >
              Content
            </button>
            <button
              className={`flex-1 px-6 py-4 text-base font-medium transition-colors ${
                activeTab === 'background'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('background')}
            >
              Background
            </button>
            <button
              className={`flex-1 px-6 py-4 text-base font-medium transition-colors ${
                activeTab === 'layout'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('layout')}
            >
              Layout
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'content' && (
            <div className="space-y-6">
              {/* Field Selection */}
              <div className="flex gap-3 mb-6">
                <button
                  onClick={() => setSelectedField('heading')}
                  className={`px-4 py-3 rounded-lg font-medium transition-all ${
                    selectedField === 'heading'
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Heading
                </button>
                <button
                  onClick={() => setSelectedField('subheading')}
                  className={`px-4 py-3 rounded-lg font-medium transition-all ${
                    selectedField === 'subheading'
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Subheading
                </button>
                <button
                  onClick={() => setSelectedField('body')}
                  className={`px-4 py-3 rounded-lg font-medium transition-all ${
                    selectedField === 'body'
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Body
                </button>
                <button
                  onClick={() => setSelectedField('cta')}
                  className={`px-4 py-3 rounded-lg font-medium transition-all ${
                    selectedField === 'cta'
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
                  className="mb-6"
                />
              )}

              {/* CTA Button Editor */}
              {selectedField === 'cta' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
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
                      className="w-full p-4 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-primary focus:border-primary placeholder-gray-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
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
                      className="w-full p-4 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-primary focus:border-primary placeholder-gray-500"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Text Color
                      </label>
                      <input
                        type="color"
                        value={ctaTextColor}
                        onChange={(e) => {
                          setCtaTextColor(e.target.value)
                          handleContentChange({ ctaTextColor: e.target.value })
                        }}
                        className="w-full h-12 border border-gray-300 rounded-lg cursor-pointer"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Border Color
                      </label>
                      <input
                        type="color"
                        value={ctaBorderColor}
                        onChange={(e) => {
                          setCtaBorderColor(e.target.value)
                          handleContentChange({ ctaBorderColor: e.target.value })
                        }}
                        className="w-full h-12 border border-gray-300 rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Background Color
                      </label>
                      <input
                        type="color"
                        value={ctaBackgroundColor}
                        onChange={(e) => {
                          setCtaBackgroundColor(e.target.value)
                          handleContentChange({ ctaBackgroundColor: e.target.value })
                        }}
                        className="w-full h-12 border border-gray-300 rounded-lg cursor-pointer"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
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
                          className="flex-1 h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        />
                        <span className="text-sm text-gray-600 w-12 font-medium">
                          {ctaBackgroundOpacity}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Button Alignment
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        onClick={() => {
                          setCtaAlignment('left')
                          handleContentChange({ ctaAlignment: 'left' })
                        }}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          ctaAlignment === 'left'
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-sm font-medium">Left</div>
                        </div>
                      </button>
                      
                      <button
                        onClick={() => {
                          setCtaAlignment('center')
                          handleContentChange({ ctaAlignment: 'center' })
                        }}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          ctaAlignment === 'center'
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-sm font-medium">Center</div>
                        </div>
                      </button>
                      
                      <button
                        onClick={() => {
                          setCtaAlignment('right')
                          handleContentChange({ ctaAlignment: 'right' })
                        }}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          ctaAlignment === 'right'
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-sm font-medium">Right</div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Rich Text Editor */}
              {selectedField !== 'cta' && (
                <div className="mt-6">
                  <div
                    ref={contentRef}
                    contentEditable
                    suppressContentEditableWarning
                    onInput={handleInput}
                    onBlur={handleInput}
                    onKeyUp={saveSelection}
                    onMouseUp={saveSelection}
                    onSelect={saveSelection}
                    className="w-full min-h-[12rem] px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-primary focus:border-primary resize-none"
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
            <div className="space-y-6">
              <BackgroundSettings
                background={moduleData.props.background}
                onChange={handleBackgroundChange}
              />
            </div>
          )}

          {activeTab === 'layout' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-4">
                  Content Position
                </label>
                <div className="grid grid-cols-3 gap-4">
                  <button
                    onClick={() => handleLayoutChange('top')}
                    className={`p-6 rounded-lg border-2 transition-all ${
                      textPosition === 'top'
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-lg font-semibold mb-1">Top</div>
                      <div className="text-xs text-gray-500">Center of top 50%</div>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => handleLayoutChange('center')}
                    className={`p-6 rounded-lg border-2 transition-all ${
                      textPosition === 'center'
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-lg font-semibold mb-1">Center</div>
                      <div className="text-xs text-gray-500">Middle of whole page</div>
                    </div>
                  </button>
                  
                  <button
                    onClick={() => handleLayoutChange('bottom')}
                    className={`p-6 rounded-lg border-2 transition-all ${
                      textPosition === 'bottom'
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-lg font-semibold mb-1">Bottom</div>
                      <div className="text-xs text-gray-500">Center of bottom 50%</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-end gap-4">
            <button
              onClick={close}
              className="btn btn-secondary px-6 py-3 text-base font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="btn btn-primary px-6 py-3 text-base font-medium"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 