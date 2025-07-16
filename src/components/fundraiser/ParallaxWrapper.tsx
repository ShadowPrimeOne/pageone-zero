'use client'

import { ReactNode, useEffect, useState } from 'react'
import Image from 'next/image'

interface ParallaxWrapperProps {
  children: ReactNode
}

export default function ParallaxWrapper({ children }: ParallaxWrapperProps) {
  const [scrollY, setScrollY] = useState(0)
  const [isClient, setIsClient] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  // Different parallax speeds for mobile vs desktop
  const layer1Speed = isMobile ? 0.005 : 0.02
  const layer2Speed = isMobile ? 0.02 : 0.08

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#FFD97D]">
      {/* Background Layer 1 - Base background (moves up very slowly) */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          transform: isClient ? `translateY(-${scrollY * layer1Speed}px)` : 'translateY(0px)',
        }}
      >
        <Image
          src="/IMAGES/Fundraising/Background Layer 1.png"
          alt="Background Layer 1"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />
      </div>
      
      {/* Background Layer 2 - Middle layer (moves up slightly faster) */}
      <div 
        className="fixed inset-0 z-1"
        style={{
          transform: isClient ? `translateY(-${scrollY * layer2Speed}px)` : 'translateY(0px)',
        }}
      >
        <Image
          src="/IMAGES/Fundraising/Layer 2 BG.png"
          alt="Background Layer 2"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-60"
          priority
        />
      </div>
      
      {/* Content overlay - moves at normal scroll speed */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
} 