'use client'

import { useState } from 'react'
import type { HeroProps } from '@/lib/editor/types'
import Image from 'next/image'

interface Props extends HeroProps {
  onUpdate?: (updates: Partial<HeroProps>) => void
}

export function TopImageCenterTextHero({ heading, subheading, onUpdate }: Props) {
  const [localHeading, setLocalHeading] = useState(heading)
  const [localSubheading, setLocalSubheading] = useState(subheading)
  const [cta, setCta] = useState('Start Free Trial')

  // Handle text updates
  const handleTextUpdate = (type: 'heading' | 'subheading' | 'cta', value: string) => {
    switch (type) {
      case 'heading':
        setLocalHeading(value)
        onUpdate?.({ heading: value })
        break
      case 'subheading':
        setLocalSubheading(value)
        onUpdate?.({ subheading: value })
        break
      case 'cta':
        setCta(value)
        break
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Top Image Section - 50% height */}
      <div className="h-[50vh] w-full relative">
        <Image
          src="/IMAGES/Example Hero2 Product..png"
          alt="Product Preview"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content Section - Centered with new color scheme */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 text-center bg-[#3C0066]">
        {/* Heading and Subheading - ~25% */}
        <div className="max-w-2xl mx-auto">
          <h1 
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 outline-none"
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => handleTextUpdate('heading', e.currentTarget.textContent || '')}
          >
            {localHeading}
          </h1>
          <p 
            className="text-base sm:text-lg md:text-xl text-white/90 mb-8 outline-none"
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => handleTextUpdate('subheading', e.currentTarget.textContent || '')}
          >
            {localSubheading}
          </p>
        </div>

        {/* CTA Button - ~15% with gradient */}
        <button 
          className="px-8 py-3 bg-gradient-to-b from-[#1B0029] via-[#2D004D] to-[#3C0066] text-white rounded-lg font-semibold text-base hover:opacity-90 transition-opacity duration-200 outline-none"
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => handleTextUpdate('cta', e.currentTarget.textContent || '')}
        >
          {cta}
        </button>
      </div>

      {/* Spacer/Margin - ~10% */}
      <div className="h-[10vh] bg-[#3C0066]" />
    </div>
  )
} 