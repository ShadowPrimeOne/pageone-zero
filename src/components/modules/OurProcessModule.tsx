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
        svgRef.current.style.transform = `translateY(${scrollY * 0.5}px)`
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
            {/* Ambient light field */}
            <radialGradient id="spotlight" cx="50%" cy="35%" r="60%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.04)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>

            {/* Neon color glows */}
            <radialGradient id="glow-celeste" cx="90%" cy="90%" r="20%">
              <stop offset="0%" stopColor="#BFFFFC" stopOpacity="0.06" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <radialGradient id="glow-fuchsia" cx="10%" cy="85%" r="20%">
              <stop offset="0%" stopColor="#FF00FE" stopOpacity="0.05" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <radialGradient id="glow-aqua" cx="15%" cy="10%" r="15%">
              <stop offset="0%" stopColor="#41FEFF" stopOpacity="0.05" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>

          {/* Base white glow */}
          <rect width="100" height="100" fill="url(#spotlight)" />
          <rect width="100" height="100" fill="url(#glow-celeste)" />
          <rect width="100" height="100" fill="url(#glow-fuchsia)" />
          <rect width="100" height="100" fill="url(#glow-aqua)" />

          {/* Top-left sacred cluster */}
          <circle cx="10" cy="10" r="8" stroke="#FF00FE" strokeOpacity="0.05" strokeWidth="0.4" fill="none" />
          <circle cx="17" cy="14" r="6" stroke="#41FEFF" strokeOpacity="0.04" strokeWidth="0.4" fill="none" />
          <path d="M5,20 L15,8 L25,20 Z" stroke="#EE018F" strokeOpacity="0.04" strokeWidth="0.3" fill="none" />

          {/* Bottom-left corner */}
          <circle cx="15" cy="85" r="7" stroke="#3E1340" strokeOpacity="0.03" strokeWidth="0.5" fill="none" />
          <path d="M10,90 L20,80 L25,90 Z" stroke="#BFFFFC" strokeOpacity="0.04" strokeWidth="0.3" fill="none" />

          {/* Top-right triangle and hex */}
          <path d="M80,5 L90,15 L70,15 Z" stroke="#FF00FE" strokeOpacity="0.05" strokeWidth="0.3" fill="none" />
          <path d="M85,20 L90,25 L90,35 L85,40 L80,35 L80,25 Z"
                stroke="#41FEFF" strokeOpacity="0.04" strokeWidth="0.4" fill="none" />

          {/* Bottom-right pattern */}
          <circle cx="88" cy="88" r="6" stroke="#FF00FE" strokeOpacity="0.03" strokeWidth="0.4" fill="none" />
          <path d="M75,90 L90,78 L95,90 Z" stroke="#BFFFFC" strokeOpacity="0.04" strokeWidth="0.3" fill="none" />
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