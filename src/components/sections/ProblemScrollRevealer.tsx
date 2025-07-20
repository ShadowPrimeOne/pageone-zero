'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'

interface Slide {
  src: string
  alt: string
  caption: string
}

const slides: Slide[] = [
  {
    src: '/IMAGES/Fundraising/Customer Search Slide 1.png',
    alt: 'Customer searching on mobile',
    caption: 'When people need a business —\nthey pick up their phone and search.',
  },
  {
    src: '/IMAGES/Fundraising/Business Not Online Slide 2.png',
    alt: 'Business not found online',
    caption: 'But many small businesses don&apos;t show up.\nNo proper page. No info. No way to contact.',
  },
  {
    src: '/IMAGES/Fundraising/Competitor gets the easy lead Slide 3.png',
    alt: 'Competitor wins lead',
    caption: 'So the customer clicks the next option.\nUsually a big brand — fast, polished, ready.',
  },
  {
    src: '/IMAGES/Fundraising/Ambassador Slide 4.png',
    alt: 'Ambassador helps business',
    caption: 'What if someone local could help?\nSet it up. Make it live. And earn from the results.',
  },
]

export default function ProblemScrollRevealer() {
  const [isEnhanced, setIsEnhanced] = useState(false)

  useEffect(() => {
    // Check if we can use enhanced features
    const supportsScrollSnap = CSS.supports('scroll-snap-type', 'y')
    const supportsIntersectionObserver = 'IntersectionObserver' in window
    
    if (supportsScrollSnap && supportsIntersectionObserver) {
      setIsEnhanced(true)
    }
  }, [])

  if (isEnhanced) {
    return <ScrollExperience slides={slides} />
  }

  return <StaticGrid slides={slides} />
}

// Static Grid Fallback Component
function StaticGrid({ slides }: { slides: Slide[] }) {
  return (
    <section className="w-full bg-[#fffdfa] px-6 sm:px-8 py-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-800 mb-4">
            The Digital Gap
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A story that happens every day, everywhere.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid gap-8 sm:gap-12">
          {slides.map((slide: Slide, index: number) => (
            <div key={index} className="relative">
              {/* Image Container */}
              <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
                  priority={index === 0}
                />
                
                {/* Text Overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
                  <div className="bg-black/70 backdrop-blur-sm px-4 py-3 rounded-lg shadow-xl max-w-md mx-auto">
                    <p className="text-base sm:text-lg font-medium leading-snug text-white whitespace-pre-line">
                      {slide.caption}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Section */}
        <div className="mt-16 text-center max-w-2xl mx-auto">
          <h3 className="text-2xl font-semibold mb-6 text-gray-800">
            This isn&apos;t a theory.
          </h3>
          <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
            <p>
              It&apos;s the digital gap that&apos;s growing by the day.
            </p>
            <p>
              Not because small business owners don&apos;t care — but because going digital is hard, expensive, and confusing.
            </p>
            <p>
              Most people don&apos;t know how to build a fast mobile page. And most tools don&apos;t offer help.
            </p>
            <p className="text-gray-700">
              So the little guys get left behind.
            </p>
            <p className="mt-6 font-semibold text-yellow-500">
              That&apos;s what we&apos;re building: a people-powered way to bring businesses online — fast, simple, mobile-first.
            </p>
            <p className="font-medium text-gray-600">
              Not another app. A real system to fill a real gap.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// Enhanced Scroll Experience Component
function ScrollExperience({ slides }: { slides: Slide[] }) {
  return (
    <section className="w-full bg-[#fffdfa]">
      {/* Individual full-screen sections without scroll-snap container */}
      {slides.map((slide: Slide, index: number) => (
        <div
          key={index}
          className="h-screen w-full relative flex items-center justify-center overflow-hidden"
        >
          {/* Full-screen image with better object-fit handling */}
          <div className="absolute inset-0 z-0">
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className="object-contain sm:object-cover"
              sizes="100vw"
              priority={index === 0}
              style={{
                objectPosition: 'center center'
              }}
            />
          </div>
          
          {/* Text overlay with better positioning */}
          <div className="absolute z-10 inset-x-0 bottom-12 sm:bottom-20 text-center px-6">
            <div className="inline-block bg-black/70 text-white backdrop-blur-sm px-4 py-3 rounded-lg shadow-xl max-w-md mx-auto">
              <p className="text-base sm:text-lg font-medium leading-snug whitespace-pre-line">
                {slide.caption}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Summary section after scroll */}
      <div className="px-6 py-12 sm:py-20 text-center max-w-2xl mx-auto">
        <h3 className="text-2xl font-semibold mb-6 text-gray-800">
          This isn&apos;t a theory.
        </h3>
        <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
          <p>
            It&apos;s the digital gap that&apos;s growing by the day.
          </p>
          <p>
            Not because small business owners don&apos;t care — but because going digital is hard, expensive, and confusing.
          </p>
          <p>
            Most people don&apos;t know how to build a fast mobile page. And most tools don&apos;t offer help.
          </p>
          <p className="text-gray-700">
            So the little guys get left behind.
          </p>
          <p className="mt-6 font-semibold text-yellow-500">
            That&apos;s what we&apos;re building: a people-powered way to bring businesses online — fast, simple, mobile-first.
          </p>
          <p className="font-medium text-gray-600">
            Not another app. A real system to fill a real gap.
          </p>
        </div>
      </div>
    </section>
  )
} 