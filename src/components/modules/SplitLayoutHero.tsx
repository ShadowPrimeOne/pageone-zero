'use client'

import { useState } from 'react'
import type { HeroProps } from '@/lib/editor/types'
import Image from 'next/image'

interface Props extends HeroProps {
  ctaText: string
  ctaLink: string
  ctaTextColor?: string
  ctaBorderColor?: string
  ctaBackgroundColor?: string
  ctaBackgroundOpacity?: number
  onUpdate?: (updates: Partial<HeroProps>) => void
}

// Helper function to convert hex to RGB
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '0, 0, 0'
}

// Helper function to get content with fallback to placeholder
function getContentWithFallback(content: string | undefined, fallback: string): string {
  return content && content.trim() !== '' ? content : fallback
}

export function SplitLayoutHero({ 
  heading, 
  subheading, 
  body, 
  ctaText, 
  ctaLink, 
  ctaTextColor,
  ctaBorderColor,
  ctaBackgroundColor,
  ctaBackgroundOpacity,
  onUpdate 
}: Props) {
  const [localHeading, setLocalHeading] = useState(getContentWithFallback(heading, 'Enter Heading'))
  const [localSubheading, setLocalSubheading] = useState(getContentWithFallback(subheading, 'Enter Subheading'))
  const [localBody, setLocalBody] = useState(getContentWithFallback(body, 'Enter Body'))

  // Handle text updates
  const handleTextUpdate = (type: 'heading' | 'subheading' | 'body', value: string) => {
    switch (type) {
      case 'heading':
        setLocalHeading(value)
        onUpdate?.({ heading: value })
        break
      case 'subheading':
        setLocalSubheading(value)
        onUpdate?.({ subheading: value })
        break
      case 'body':
        setLocalBody(value)
        onUpdate?.({ body: value })
        break
    }
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full">
      {/* Left Column: Text */}
      <div className="w-full md:w-[60%] p-8 md:p-12 flex flex-col justify-center bg-[#1B0029]">
        <h1 
          className="text-2xl md:text-4xl font-bold text-white mb-4 outline-none"
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => handleTextUpdate('heading', e.currentTarget.textContent || '')}
        >
          {localHeading}
        </h1>
        <p 
          className="text-lg md:text-xl text-white/90 mb-8 outline-none"
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => handleTextUpdate('subheading', e.currentTarget.textContent || '')}
        >
          {localSubheading}
        </p>
        <p 
          className="text-base md:text-lg text-white/70 mb-8 outline-none"
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => handleTextUpdate('body', e.currentTarget.textContent || '')}
        >
          {localBody}
        </p>
        {ctaText && (
          <a
            href={ctaLink || '#'}
            className="inline-block px-8 py-3 rounded-md hover:opacity-90 transition-all mt-6"
            style={{
              backgroundColor: ctaBackgroundColor && ctaBackgroundOpacity !== undefined 
                ? `rgba(${hexToRgb(ctaBackgroundColor)}, ${ctaBackgroundOpacity / 100})`
                : ctaBackgroundColor || 'white',
              color: ctaTextColor || '#1B0029',
              border: ctaBorderColor ? `2px solid ${ctaBorderColor}` : 'none'
            }}
          >
            {ctaText}
          </a>
        )}
      </div>

      {/* Right Column: Image */}
      <div className="w-full md:w-[40%] flex items-center justify-center p-8 md:p-12 bg-white">
        <div className="relative w-[80%] aspect-square">
          <Image
            src="/IMAGES/avatar.svg"
            alt="Profile"
            fill
            className="object-cover rounded-full border-2 border-gray-200 shadow-lg"
            priority
          />
        </div>
      </div>
    </div>
  )
} 