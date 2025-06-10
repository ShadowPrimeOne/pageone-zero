'use client'

import { useState } from 'react'
import type { HeroProps } from '@/lib/editor/types'
import Image from 'next/image'

interface Props extends HeroProps {
  onUpdate?: (updates: Partial<HeroProps>) => void
}

export function SplitLayoutHero({ heading, subheading, onUpdate }: Props) {
  const [localHeading, setLocalHeading] = useState(heading)
  const [localSubheading, setLocalSubheading] = useState(subheading)
  const [cta, setCta] = useState('Book a Call')

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
        <button 
          className="px-6 py-3 bg-white text-[#1B0029] text-base font-semibold rounded-md hover:bg-white/90 transition-all duration-200 w-fit outline-none"
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => handleTextUpdate('cta', e.currentTarget.textContent || '')}
        >
          {cta}
        </button>
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