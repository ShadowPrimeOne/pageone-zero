"use client"

import Image from "next/image"
import React from "react"
import type { HeroProps } from '@/lib/editor/types'

export default function ClassicOverlayHero({ props }: { props: HeroProps }) {
  console.log('🧩 ClassicOverlayHero Props:', props)
  
  // Get background image from various possible sources
  const bgImage = props.background?.image || 
                 props.topBackground?.url || 
                 'https://xkpxwcrxjgjmbxgupkhq.supabase.co/storage/v1/object/public/public-images/modules/hero/classic_overlay_hero/1749617291214-hero-background.webp'

  return (
    <section className="relative w-full h-[90vh] overflow-hidden text-white">
      <Image
        src={bgImage}
        alt="Hero Background"
        fill
        className="object-cover object-center"
        unoptimized
        priority
        onError={(e) => {
          console.error('❌ Error loading hero background image:', e)
          // Fallback to a solid color if image fails to load
          const target = e.target as HTMLImageElement
          target.style.display = 'none'
        }}
      />
      <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-4xl font-bold">{props.heading || 'Missing Heading'}</h1>
        <p className="text-lg mt-2">{props.subheading || 'Missing Subheading'}</p>
      </div>
    </section>
  )
} 