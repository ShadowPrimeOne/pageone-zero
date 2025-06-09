'use client'

import { useEffect, useRef } from 'react'
import type { HeroProps, ModuleBackground } from '@/lib/editor/types'

interface Props extends HeroProps {
  background?: ModuleBackground
}

export function Hero2Module({ heading, subheading, background }: Props) {
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

  // Set background styles
  const backgroundStyle = background?.type === 'gradient' 
    ? {
        background: `linear-gradient(${background.gradient?.angle || 135}deg, ${background.gradient?.from || '#1a1a1a'}, ${background.gradient?.to || '#000000'})`,
        opacity: background.opacity
      }
    : background?.type === 'color'
    ? {
        backgroundColor: background.color,
        opacity: background.opacity
      }
    : {}

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background with parallax effect */}
      <div 
        className="absolute inset-0"
        style={backgroundStyle}
      >
        <svg
          ref={svgRef}
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="hero2-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
            </linearGradient>
          </defs>
          <path
            d="M0,0 L100,0 L100,100 L0,100 Z"
            fill="url(#hero2-gradient)"
          />
          <path
            d="M0,0 L100,0 L50,50 Z"
            fill="rgba(255,255,255,0.05)"
          />
          <path
            d="M100,100 L0,100 L50,50 Z"
            fill="rgba(255,255,255,0.05)"
          />
        </svg>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-[#00FFD1]/20" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center sm:px-6 lg:px-8">
        {/* Animated SVG */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 sm:w-[32rem] sm:h-[32rem] opacity-50">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
            <defs>
              <filter id="glow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="0.6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>

              <style>
                {`
                  .rotate {
                    animation: rotate 90s linear infinite;
                    transform-origin: 50% 50%;
                  }

                  @keyframes rotate {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                  }
                `}
              </style>
            </defs>

            <g className="rotate" filter="url(#glow)" strokeWidth="0.25" fill="none">
              {/* Center */}
              <circle cx="50" cy="50" r="20" stroke="#FF00FF" opacity="0.9"/> {/* Fuchsia */}

              {/* Hexagonal ring */}
              <circle cx="50" cy="30" r="20" stroke="#41FEFF" opacity="0.8"/> {/* Aqua */}
              <circle cx="70" cy="50" r="20" stroke="#39FF14" opacity="0.8"/> {/* Neon Green */}
              <circle cx="50" cy="70" r="20" stroke="#FFD700" opacity="0.8"/> {/* Electric Gold */}
              <circle cx="30" cy="50" r="20" stroke="#00FFD1" opacity="0.8"/> {/* Neon Teal */}
              <circle cx="64.14" cy="35.86" r="20" stroke="#BFFFFC" opacity="0.8"/> {/* Celeste */}
              <circle cx="35.86" cy="35.86" r="20" stroke="#00BFFF" opacity="0.8"/> {/* Bright Blue */}

              {/* Bottom diagonals */}
              <circle cx="64.14" cy="64.14" r="20" stroke="#FF66FF" opacity="0.8"/> {/* Hot Pink */}
              <circle cx="35.86" cy="64.14" r="20" stroke="#FF1493" opacity="0.8"/> {/* Deep Pink */}
            </g>
          </svg>
        </div>

        <div className="relative z-20">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            {heading}
          </h1>
          <p className="text-xl sm:text-2xl text-white/80">
            {subheading}
          </p>
        </div>
      </div>
    </div>
  )
} 