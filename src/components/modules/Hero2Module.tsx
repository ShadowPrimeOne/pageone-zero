'use client'

import { useEffect, useRef, useState } from 'react'
import type { HeroProps, ModuleBackground } from '@/lib/editor/types'

interface Props extends HeroProps {
  background?: ModuleBackground
  onUpdate?: (updates: Partial<HeroProps>) => void
}

export function Hero2Module({ heading, subheading, background, onUpdate }: Props) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [localHeading, setLocalHeading] = useState(heading)
  const [localSubheading, setLocalSubheading] = useState(subheading)
  const [cta1, setCta1] = useState('CTA 1')
  const [cta2, setCta2] = useState('CTA 2')

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

  // Handle text updates
  const handleTextUpdate = (type: 'heading' | 'subheading' | 'cta1' | 'cta2', value: string) => {
    switch (type) {
      case 'heading':
        setLocalHeading(value)
        onUpdate?.({ heading: value })
        break
      case 'subheading':
        setLocalSubheading(value)
        onUpdate?.({ subheading: value })
        break
      case 'cta1':
        setCta1(value)
        break
      case 'cta2':
        setCta2(value)
        break
    }
  }

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
      <div className="relative z-10 flex flex-col items-center min-h-screen px-4 text-center sm:px-6 lg:px-8">
        {/* Top Section - H1 and Subtitle */}
        <div className="relative z-20 pt-32">
          <h1 
            className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-4 outline-none"
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => handleTextUpdate('heading', e.currentTarget.textContent || '')}
          >
            {localHeading}
          </h1>
          <p 
            className="text-xl sm:text-2xl text-white/80 outline-none"
            contentEditable
            suppressContentEditableWarning
            onBlur={(e) => handleTextUpdate('subheading', e.currentTarget.textContent || '')}
          >
            {localSubheading}
          </p>
        </div>

        {/* Middle Section - Animated SVG */}
        <div className="relative z-20 flex-1 flex items-center justify-center">
          <div className="w-[80vw] h-[80vw] max-w-[1200px] max-h-[1200px] opacity-30">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
              <defs>
                <filter id="glow" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="0.6" result="blur">
                    <animate
                      attributeName="stdDeviation"
                      values="0.6;1.2;0;1.2;0.6"
                      dur="6s"
                      repeatCount="indefinite"
                    />
                  </feGaussianBlur>
                  <feMerge>
                    <feMergeNode in="blur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>

                <style>
                  {`
                    .rotate {
                      animation: rotate 120s linear infinite;
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
        </div>

        {/* Bottom Section - CTA Buttons */}
        <div className="relative z-20 pb-32">
          <div className="flex gap-0">
            <button 
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white text-lg font-medium transition-all duration-200 border-r border-white/20 outline-none"
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleTextUpdate('cta1', e.currentTarget.textContent || '')}
            >
              {cta1}
            </button>
            <button 
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white text-lg font-medium transition-all duration-200 outline-none"
              contentEditable
              suppressContentEditableWarning
              onBlur={(e) => handleTextUpdate('cta2', e.currentTarget.textContent || '')}
            >
              {cta2}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 