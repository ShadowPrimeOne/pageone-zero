'use client'

import Image from 'next/image'
import React, { useEffect, useState, useRef } from 'react'

const slides = [
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
    caption: 'What if someone local could help?\nBuild the page. Set it up.\nMake sure it works — and get paid for it.',
  },
]

export default function ProblemScrollStory() {
  const [visibleSlides, setVisibleSlides] = useState<Set<number>>(new Set([0]))
  const slideRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    slideRefs.current.forEach((ref, index) => {
      if (!ref) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          setVisibleSlides(prev => {
            const newSet = new Set(prev)
            if (entry.isIntersecting) {
              newSet.add(index)
            } else {
              newSet.delete(index)
            }
            return newSet
          })
        },
        {
          threshold: 0.3,
          rootMargin: '-10% 0px -10% 0px'
        }
      )

      observer.observe(ref)
      observers.push(observer)
    })

    return () => {
      observers.forEach(observer => observer.disconnect())
    }
  }, [])

  return (
    <section className="relative w-full bg-gradient-to-b from-transparent to-white/50">
      {/* Slides stacked vertically */}
      {slides.map((slide, index) => (
        <div
          key={index}
          ref={(el) => { slideRefs.current[index] = el }}
          className="min-h-screen flex items-center justify-center px-6 py-20"
        >
          <div className="relative max-w-lg w-full">
            <div 
              className={`bg-white/15 backdrop-blur-md border border-white/30 rounded-2xl shadow-2xl overflow-hidden transition-all duration-1000 ease-out ${
                visibleSlides.has(index) 
                  ? 'transform translate-y-0 opacity-100 scale-100' 
                  : 'transform translate-y-20 opacity-0 scale-95'
              }`}
            >
              <div className="relative w-full h-auto">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  width={600}
                  height={400}
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="w-full h-auto object-contain"
                />
              </div>
              
              {/* Caption with clean typography */}
              <div className="p-6 sm:p-8 bg-black/20">
                <p 
                  className={`text-lg sm:text-xl font-semibold leading-relaxed text-white drop-shadow-lg transition-all duration-700 delay-300 ${
                    visibleSlides.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                >
                  {slide.caption.split('\n').map((line, lineIndex) => (
                    <span key={lineIndex} className="block mb-3 last:mb-0">
                      {line}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Summary section */}
      <div className="relative bg-white px-6 py-12 sm:py-20 max-w-2xl mx-auto text-center text-gray-800">
        <p className="text-md sm:text-lg leading-relaxed mb-4">
          This happens every day.
        </p>
        <p className="text-md sm:text-lg leading-relaxed mb-4">
          Not because small business owners don&apos;t care — but because going digital is hard, expensive, and confusing.
        </p>
        <p className="text-md sm:text-lg leading-relaxed mb-4">
          Most people don&apos;t know how to build a fast mobile page. And most tools don&apos;t offer help.
        </p>
        <p className="text-md sm:text-lg text-gray-700 mb-6">
          So the little guys get left behind.
        </p>
        <p className="mt-6 font-semibold text-yellow-600">
          That&apos;s what we&apos;re building: a people-powered way to bring businesses online — fast, simple, mobile-first.
        </p>
        <p className="mt-2 font-medium text-gray-600">
          Not another app. A real system to fill a real gap.
        </p>
      </div>
    </section>
  )
} 