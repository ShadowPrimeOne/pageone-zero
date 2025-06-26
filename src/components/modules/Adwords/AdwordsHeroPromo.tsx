'use client'

import React from 'react'

interface Background {
  type: 'image'
  url: string
  overlay: { color: string; opacity: number }
}

interface Props {
  heading: string
  subheading: string
  ctaText: string
  background: Background
  trustStrip: string
}

export const AdwordsHeroPromo: React.FC<Props> = ({
  heading,
  subheading,
  ctaText,
  background,
  trustStrip,
}) => {
  return (
    <section 
      className="relative w-full h-[100dvh] text-white flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: background.type === 'image' ? `url(${background.url})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay */}
      {background.type === 'image' && (
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundColor: background.overlay.color,
            opacity: background.overlay.opacity,
          }}
        />
      )}

      {/* Content */}
      <div className="z-10 text-center px-4 sm:px-6 max-w-xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
          {heading}
        </h1>
        <p className="text-base sm:text-lg md:text-xl mb-6 px-2">{subheading}</p>

        <a
          href="#lead-form"
          className="inline-block bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-base sm:text-lg md:text-xl py-3 sm:py-4 px-6 sm:px-8 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          {ctaText}
        </a>

        {/* Trust Strip */}
        <div className="mt-6 text-xs sm:text-sm text-white opacity-80 px-2">
          {trustStrip}
        </div>
      </div>
    </section>
  )
} 