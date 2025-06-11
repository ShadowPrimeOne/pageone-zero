'use client'

import { useState } from 'react'
import type { HeroProps } from '@/lib/editor/types'
import Image from 'next/image'

interface Props extends HeroProps {
  onUpdate?: (updates: Partial<HeroProps>) => void
}

export function ClassicOverlayHero({ heading, subheading, onUpdate }: Props) {
  const [localHeading, setLocalHeading] = useState(heading)
  const [localSubheading, setLocalSubheading] = useState(subheading)
  const [cta, setCta] = useState('Get Started')

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
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/IMAGES/hero-background.webp"
          alt="Hero Background"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay - fully transparent */}
        <div className="absolute inset-0 bg-black/0" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center pt-20 px-4">
        {/* Text Box Container */}
        <div className="w-full max-w-3xl mx-auto">
          {/* Text Box */}
          <div className="text-left">
            <h1 
              className="text-4xl font-bold tracking-tight sm:text-6xl mb-6 outline-none
                text-white
                drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]
                transition-all duration-500
                hover:text-[#00FFD1]"
              suppressContentEditableWarning
              onBlur={(e) => handleTextUpdate('heading', e.currentTarget.textContent || '')}
            >
              {localHeading}
            </h1>
            <p 
              className="text-xl sm:text-2xl text-white/90 mb-8 outline-none
                backdrop-blur-sm bg-white/5 rounded-lg p-4
                border border-white/10
                shadow-[0_4px_20px_rgba(0,0,0,0.1)]
                transition-all duration-300 hover:bg-white/10"
              suppressContentEditableWarning
              onBlur={(e) => handleTextUpdate('subheading', e.currentTarget.textContent || '')}
            >
              {localSubheading}
            </p>
            <button 
              className="group relative px-8 py-4 text-lg font-medium rounded-md transition-all duration-500 outline-none
                bg-gradient-to-r from-[#1B0029] via-[#2D004D] to-[#3C0066]
                hover:from-[#2D004D] hover:via-[#3C0066] hover:to-[#1B0029]
                text-white
                shadow-[0_4px_20px_rgba(0,0,0,0.2)]
                hover:shadow-[0_8px_30px_rgba(0,255,209,0.3)]
                hover:scale-105 hover:-translate-y-1
                active:scale-95
                before:absolute before:inset-0 before:rounded-md
                before:bg-gradient-to-r before:from-[#00FFD1] before:via-[#00B8FF] before:to-[#00FFD1]
                before:opacity-0 before:transition-opacity before:duration-500
                hover:before:opacity-20
                after:absolute after:inset-0 after:rounded-md
                after:bg-gradient-to-r after:from-[#00FFD1] after:via-[#00B8FF] after:to-[#00FFD1]
                after:opacity-0 after:blur-xl after:transition-opacity after:duration-500
                hover:after:opacity-30
                backdrop-blur-sm"
              suppressContentEditableWarning
              onBlur={(e) => handleTextUpdate('cta', e.currentTarget.textContent || '')}
            >
              <span className="relative z-10 flex items-center gap-2">
                {cta}
                <svg 
                  className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 