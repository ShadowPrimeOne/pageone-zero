'use client'

import React, { useState, useEffect } from 'react'
import { 
  BoldIcon, 
  ItalicIcon, 
  UnderlineIcon,
  PaintBrushIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon
} from '@heroicons/react/24/outline'

interface TextFormattingControlsProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

const FONT_FAMILIES = [
  { name: 'Default', value: 'inherit' },
  { name: 'Arial', value: 'Arial, sans-serif' },
  { name: 'Times New Roman', value: '"Times New Roman", serif' },
  { name: 'Courier New', value: '"Courier New", monospace' },
  { name: 'Georgia', value: 'Georgia, serif' },
  { name: 'Verdana', value: 'Verdana, sans-serif' },
  { name: 'Helvetica', value: 'Helvetica, sans-serif' }
]

const FONT_SIZES = [
  { name: 'Small', value: '0.875rem' },
  { name: 'Normal', value: '1rem' },
  { name: 'Large', value: '1.25rem' },
  { name: 'XL', value: '1.5rem' },
  { name: '2XL', value: '2rem' },
  { name: '3XL', value: '3rem' }
]

const COLORS = [
  { name: 'Default', value: 'inherit' },
  { name: 'Black', value: '#000000' },
  { name: 'White', value: '#FFFFFF' },
  { name: 'Red', value: '#EF4444' },
  { name: 'Green', value: '#10B981' },
  { name: 'Blue', value: '#3B82F6' },
  { name: 'Yellow', value: '#F59E0B' },
  { name: 'Purple', value: '#8B5CF6' },
  { name: 'Pink', value: '#EC4899' }
]

const LINE_SPACING_OPTIONS = [
  { name: 'Single', value: '1' },
  { name: '1.5', value: '1.5' },
  { name: 'Double', value: '2' },
  { name: '2.5', value: '2.5' },
  { name: 'Triple', value: '3' }
]

export function TextFormattingControls({ value, onChange, className = '' }: TextFormattingControlsProps) {
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isUnderline, setIsUnderline] = useState(false)
  const [fontSize, setFontSize] = useState('normal')
  const [fontFamily, setFontFamily] = useState('inherit')
  const [textColor, setTextColor] = useState('inherit')
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [textAlign, setTextAlign] = useState('left')
  const [lineSpacing, setLineSpacing] = useState('1')

  // Update state based on current value
  useEffect(() => {
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = value

    // Check for text alignment - look for wrapper div with text-align style
    const alignDiv = tempDiv.querySelector('div[style*="text-align"]')
    let currentAlign = 'left'
    if (alignDiv) {
      const style = alignDiv.getAttribute('style')
      const alignMatch = style?.match(/text-align:\s*([^;"]+)/)
      currentAlign = alignMatch ? alignMatch[1] : 'left'
    }
    setTextAlign(currentAlign)

    // Check for bold
    const boldElements = tempDiv.querySelectorAll('strong, b, [style*="font-weight: bold"]')
    setIsBold(boldElements.length > 0)

    // Check for italic
    const italicElements = tempDiv.querySelectorAll('em, i, [style*="font-style: italic"]')
    setIsItalic(italicElements.length > 0)

    // Check for underline
    const underlineElements = tempDiv.querySelectorAll('u, [style*="text-decoration: underline"]')
    setIsUnderline(underlineElements.length > 0)

    // Check for font family
    const fontFamilyMatch = value.match(/font-family:\s*([^;"]+)/)
    const currentFontFamily = fontFamilyMatch ? fontFamilyMatch[1].replace(/['"]/g, '') : 'inherit'
    setFontFamily(currentFontFamily)

    // Check for font size
    const fontSizeMatch = value.match(/font-size:\s*([^;"]+)/)
    const currentFontSize = fontSizeMatch ? fontSizeMatch[1] : 'normal'
    setFontSize(currentFontSize)

    // Check for text color
    const colorMatch = value.match(/color:\s*([^;"]+)/)
    setTextColor(colorMatch ? colorMatch[1] : 'inherit')

    // Check for line spacing
    const lineSpacingMatch = value.match(/line-height:\s*([^;"]+)/)
    const currentLineSpacing = lineSpacingMatch ? lineSpacingMatch[1] : '1'
    setLineSpacing(currentLineSpacing)
  }, [value])

  const toggleFormat = (format: 'bold' | 'italic' | 'underline') => {
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = value || '' // Ensure we have a string value

    // Get the current content
    const content = tempDiv.innerHTML || ''

    switch (format) {
      case 'bold':
        if (isBold) {
          // Remove bold
          const newContent = content.replace(/<strong>(.*?)<\/strong>/g, '$1')
          tempDiv.innerHTML = newContent
        } else {
          // Add bold
          const newContent = content.replace(/([^<]*)(<[^>]*>)?/g, (match, text, tag) => {
            if (!text || !text.trim()) return match
            return `<strong>${text}</strong>${tag || ''}`
          })
          tempDiv.innerHTML = newContent
        }
        break

      case 'italic':
        if (isItalic) {
          // Remove italic
          const newContent = content.replace(/<em>(.*?)<\/em>/g, '$1')
          tempDiv.innerHTML = newContent
        } else {
          // Add italic
          const newContent = content.replace(/([^<]*)(<[^>]*>)?/g, (match, text, tag) => {
            if (!text || !text.trim()) return match
            return `<em>${text}</em>${tag || ''}`
          })
          tempDiv.innerHTML = newContent
        }
        break

      case 'underline':
        if (isUnderline) {
          // Remove underline
          const newContent = content.replace(/<u>(.*?)<\/u>/g, '$1')
          tempDiv.innerHTML = newContent
        } else {
          // Add underline
          const newContent = content.replace(/([^<]*)(<[^>]*>)?/g, (match, text, tag) => {
            if (!text || !text.trim()) return match
            return `<u>${text}</u>${tag || ''}`
          })
          tempDiv.innerHTML = newContent
        }
        break
    }

    // Ensure we have a valid string before calling onChange
    const newValue = tempDiv.innerHTML || ''
    onChange(newValue)
  }

  const handleAlignmentChange = (alignment: 'left' | 'center' | 'right') => {
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = value

    // Get the current content
    const content = tempDiv.innerHTML

    // Remove any existing text-align style
    const cleanContent = content.replace(/<div[^>]*style="[^"]*text-align:[^"]*"[^>]*>(.*?)<\/div>/g, '$1')

    // Always wrap in a div with text-align, even for left alignment
    tempDiv.innerHTML = `<div style="text-align: ${alignment}">${cleanContent}</div>`

    onChange(tempDiv.innerHTML)
  }

  const handleFontFamilyChange = (family: string) => {
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = value

    // Get the current content
    const content = tempDiv.innerHTML

    // Remove any existing font-family style
    const cleanContent = content.replace(/<span[^>]*style="[^"]*font-family:[^"]*"[^>]*>(.*?)<\/span>/g, '$1')

    if (family !== 'inherit') {
      // Wrap content in a span with the new font family
      tempDiv.innerHTML = `<span style="font-family: ${family}">${cleanContent}</span>`
    } else {
      tempDiv.innerHTML = cleanContent
    }

    onChange(tempDiv.innerHTML)
  }

  const handleFontSizeChange = (size: string) => {
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = value

    // Get the current content
    const content = tempDiv.innerHTML

    // Remove any existing font-size style
    const cleanContent = content.replace(/<span[^>]*style="[^"]*font-size:[^"]*"[^>]*>(.*?)<\/span>/g, '$1')

    if (size !== 'normal') {
      // Wrap content in a span with the new font size
      tempDiv.innerHTML = `<span style="font-size: ${size}">${cleanContent}</span>`
    } else {
      tempDiv.innerHTML = cleanContent
    }

    onChange(tempDiv.innerHTML)
  }

  const handleColorChange = (color: string) => {
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = value

    // Get the current content
    const content = tempDiv.innerHTML

    // Remove any existing color style
    const cleanContent = content.replace(/<span[^>]*style="[^"]*color:[^"]*"[^>]*>(.*?)<\/span>/g, '$1')

    if (color !== 'inherit') {
      // Wrap content in a span with the new color
      tempDiv.innerHTML = `<span style="color: ${color}">${cleanContent}</span>`
    } else {
      tempDiv.innerHTML = cleanContent
    }

    onChange(tempDiv.innerHTML)
    setShowColorPicker(false)
  }

  const handleLineSpacingChange = (spacing: string) => {
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = value

    // Get the current content
    const content = tempDiv.innerHTML

    // Remove any existing line-height style
    const cleanContent = content.replace(/<span[^>]*style="[^"]*line-height:[^"]*"[^>]*>(.*?)<\/span>/g, '$1')

    if (spacing !== '1') {
      // Wrap content in a span with the new line spacing
      tempDiv.innerHTML = `<span style="line-height: ${spacing}">${cleanContent}</span>`
    } else {
      tempDiv.innerHTML = cleanContent
    }

    onChange(tempDiv.innerHTML)
  }

  return (
    <div className={`flex flex-wrap items-center gap-2 p-2 border border-gray-200 dark:border-gray-700 rounded-md ${className}`}>
      <button
        onClick={() => toggleFormat('bold')}
        className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${isBold ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
        title="Bold"
      >
        <BoldIcon className="w-5 h-5" />
      </button>
      <button
        onClick={() => toggleFormat('italic')}
        className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${isItalic ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
        title="Italic"
      >
        <ItalicIcon className="w-5 h-5" />
      </button>
      <button
        onClick={() => toggleFormat('underline')}
        className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${isUnderline ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
        title="Underline"
      >
        <UnderlineIcon className="w-5 h-5" />
      </button>
      <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1" />
      <button
        onClick={() => handleAlignmentChange('left')}
        className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${textAlign === 'left' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
        title="Align Left"
      >
        <ArrowLeftIcon className="w-5 h-5" />
      </button>
      <button
        onClick={() => handleAlignmentChange('center')}
        className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${textAlign === 'center' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
        title="Align Center"
      >
        <ArrowUpIcon className="w-5 h-5" />
      </button>
      <button
        onClick={() => handleAlignmentChange('right')}
        className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${textAlign === 'right' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
        title="Align Right"
      >
        <ArrowRightIcon className="w-5 h-5" />
      </button>
      <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1" />
      <select
        value={lineSpacing}
        onChange={(e) => handleLineSpacingChange(e.target.value)}
        className="px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        title="Line Spacing"
      >
        {LINE_SPACING_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
      <select
        value={fontFamily}
        onChange={(e) => handleFontFamilyChange(e.target.value)}
        className="px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
      >
        {FONT_FAMILIES.map((font) => (
          <option key={font.value} value={font.value}>
            {font.name}
          </option>
        ))}
      </select>
      <select
        value={fontSize}
        onChange={(e) => handleFontSizeChange(e.target.value)}
        className="px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
      >
        {FONT_SIZES.map((size) => (
          <option key={size.value} value={size.value}>
            {size.name}
          </option>
        ))}
      </select>
      <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-1" />
      <div className="relative">
        <button
          onClick={() => setShowColorPicker(!showColorPicker)}
          className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${textColor !== 'inherit' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
          title="Text Color"
        >
          <PaintBrushIcon className="w-5 h-5" style={{ color: textColor }} />
        </button>
        {showColorPicker && (
          <div className="absolute top-full left-0 mt-1 p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-10 grid grid-cols-3 gap-1">
            {COLORS.map((color) => (
              <button
                key={color.value}
                onClick={() => handleColorChange(color.value)}
                className="w-6 h-6 rounded-full border border-gray-200 dark:border-gray-700"
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}