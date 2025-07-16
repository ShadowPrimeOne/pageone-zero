'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'

export const MobilePhoneIcon: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showPulse, setShowPulse] = useState(false)

  useEffect(() => {
    // Phone appears immediately for better perceived performance
    setIsLoaded(true)
    
    // Pulse rings appear 500ms after phone for smooth effect
    const pulseTimer = setTimeout(() => setShowPulse(true), 500)
    
    return () => {
      clearTimeout(pulseTimer)
    }
  }, [])

  return (
    <div className={`relative flex flex-col items-center mt-2 transition-opacity duration-300 bg-transparent border-0 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Mobile Phone Icon */}
      <div className="relative bg-transparent border-0">
        {/* Optimized Pulsing Ring Background */}
        {showPulse && (
          <>
            <div className="absolute inset-0 w-48 h-48 md:w-56 md:h-56 border-[0.5px] border-yellow-400/30 rounded-full opacity-0" style={{
              animation: 'ring-pulse 3s ease-out infinite'
            }}></div>
            <div className="absolute inset-0 w-48 h-48 md:w-56 md:h-56 border-[0.5px] border-yellow-400/20 rounded-full opacity-0" style={{ 
              animationDelay: '1s',
              animation: 'ring-pulse 3s ease-out infinite'
            }}></div>
            <div className="absolute inset-0 w-48 h-48 md:w-56 md:h-56 border-[0.5px] border-yellow-400/10 rounded-full opacity-0" style={{ 
              animationDelay: '2s',
              animation: 'ring-pulse 3s ease-out infinite'
            }}></div>
          </>
        )}
        
        {/* Mobile Phone Image - Optimized for above-the-fold loading */}
        <div className="relative w-48 h-48 md:w-56 md:h-56 flex items-center justify-center bg-transparent border-0">
          <Image
            src="/IMAGES/Adwords Leads for electrical industry incoming call.png"
            alt="Adwords Leads for Electrical Industry"
            fill
            quality={90}
            priority={true}
            className="object-contain bg-transparent"
            style={{
              filter: 'drop-shadow(0 15px 30px rgba(0, 0, 0, 0.3))'
            }}
            sizes="(max-width: 768px) 192px, 224px"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
        </div>
      </div>
    </div>
  )
} 