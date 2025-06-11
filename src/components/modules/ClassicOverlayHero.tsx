'use client'

import { useState } from 'react'
import type { HeroProps } from '@/lib/editor/types'
import Image from 'next/image'

interface Props extends HeroProps {
  onUpdate?: (updates: Partial<HeroProps>) => void
}

export function ClassicOverlayHero({ heading, subheading, background, onUpdate }: Props) {
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
        {background?.type === 'image' && background.image ? (
          <Image
            src={background.image}
            alt="Hero Background"
            fill
            priority
            quality={90}
            className="object-cover"
            sizes="100vw"
            style={{
              objectPosition: 'center',
              objectFit: 'cover'
            }}
          />
        ) : (
          <div 
            className="w-full h-full"
            style={{
              backgroundColor: background?.color || '#000000',
              opacity: background?.opacity || 1
            }}
          />
        )}
        {/* Dark overlay */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundColor: background?.overlay?.color || '#000000',
            opacity: background?.overlay?.opacity || 0.5
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          {localHeading}
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-8">
          {localSubheading}
        </p>
        <button className="px-8 py-3 bg-white text-black rounded-lg font-medium hover:bg-white/90 transition-colors">
          {cta}
        </button>
      </div>
    </div>
  )
} 