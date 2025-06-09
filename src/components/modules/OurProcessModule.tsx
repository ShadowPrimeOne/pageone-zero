'use client'

import { useEffect, useRef } from 'react'
import type { ModuleBackground } from '@/lib/editor/types'

interface Props {
  background?: ModuleBackground
}

export function OurProcessModule({ background }: Props) {
  const svgRef = useRef<SVGSVGElement>(null)

  // Parallax effect for the background
  useEffect(() => {
    const handleScroll = () => {
      if (svgRef.current) {
        const scrollY = window.scrollY
        // Reduce the multiplier from 0.5 to 0.2 and ensure it doesn't go above 0
        const translateY = Math.min(0, scrollY * 0.2)
        svgRef.current.style.transform = `translateY(${translateY}px)`
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white">
      {/* Background with parallax effect */}
      <div className="absolute inset-0">
        <svg
          ref={svgRef}
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Neon gradients for coloring */}
            <linearGradient id="neon-line" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#BFFFFC" stopOpacity="0.18"/>
              <stop offset="100%" stopColor="#FF00FE" stopOpacity="0.18"/>
            </linearGradient>

            {/* Pattern: Moroccan tile (8-point star with diamonds) */}
            <pattern id="mosaic" width="10" height="10" patternUnits="userSpaceOnUse">
              {/* 8-point star */}
              <path d="M5 0 L6.5 3.5 L10 5 L6.5 6.5 L5 10 L3.5 6.5 L0 5 L3.5 3.5 Z"
                    fill="none" stroke="url(#neon-line)" strokeWidth="0.4"/>
              {/* Center diamond overlay */}
              <path d="M5 2 L6.5 5 L5 8 L3.5 5 Z"
                    fill="none" stroke="url(#neon-line)" strokeWidth="0.3"/>
            </pattern>
          </defs>

          {/* Background fill using pattern */}
          <rect width="100" height="100" fill="url(#mosaic)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Our Process
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Simple steps to create your perfect page
            </p>
          </div>

          <div className="relative">
            {/* Vertical divider with gradient */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#41FEFF] via-[#FF00FE] to-[#EE018F]" />

            {/* Process steps */}
            <div className="space-y-24">
              {/* Step 1: Create */}
              <div className="relative flex items-center">
                <div className="w-1/2 pr-12 text-right">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Create</h3>
                </div>
                <div className="w-1/2 pl-12">
                  <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden">
                    <svg
                      className="w-full h-full"
                      viewBox="0 0 400 225"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="400" height="225" fill="#E5E7EB"/>
                      <path d="M200 112.5L150 87.5L250 87.5L200 112.5Z" fill="#9CA3AF"/>
                      <circle cx="200" cy="112.5" r="25" fill="#6B7280"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Step 2: Save */}
              <div className="relative flex items-center">
                <div className="w-1/2 pr-12 text-right">
                  <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden">
                    <svg
                      className="w-full h-full"
                      viewBox="0 0 400 225"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="400" height="225" fill="#E5E7EB"/>
                      <rect x="150" y="75" width="100" height="75" fill="#9CA3AF"/>
                      <path d="M150 75L200 50L250 75" stroke="#6B7280" strokeWidth="2"/>
                    </svg>
                  </div>
                </div>
                <div className="w-1/2 pl-12">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Save</h3>
                </div>
              </div>

              {/* Step 3: Share */}
              <div className="relative flex items-center">
                <div className="w-1/2 pr-12 text-right">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Share</h3>
                </div>
                <div className="w-1/2 pl-12">
                  <div className="aspect-w-16 aspect-h-9 bg-gray-100 rounded-lg overflow-hidden">
                    <svg
                      className="w-full h-full"
                      viewBox="0 0 400 225"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="400" height="225" fill="#E5E7EB"/>
                      <circle cx="200" cy="112.5" r="50" fill="#9CA3AF"/>
                      <path d="M200 62.5L250 112.5L200 162.5L150 112.5L200 62.5Z" fill="#6B7280"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 