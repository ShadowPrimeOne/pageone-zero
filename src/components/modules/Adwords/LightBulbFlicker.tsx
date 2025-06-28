'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'

export const MobilePhoneIcon: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showPulse, setShowPulse] = useState(false)

  useEffect(() => {
    // Phone appears first
    const phoneTimer = setTimeout(() => setIsLoaded(true), 100)
    
    // Pulse rings appear 1 second after phone
    const pulseTimer = setTimeout(() => setShowPulse(true), 1100)
    
    return () => {
      clearTimeout(phoneTimer)
      clearTimeout(pulseTimer)
    }
  }, [])

  return (
    <div className={`relative flex flex-col items-center mt-2 transition-opacity duration-500 bg-transparent border-0 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Mobile Phone Icon */}
      <div className="relative bg-transparent border-0">
        {/* Pulsing Ring Background - Only show after delay */}
        {showPulse && (
          <>
            <div className="absolute inset-0 w-48 h-48 md:w-56 md:h-56 border-[0.5px] border-yellow-400/20 rounded-full opacity-0" style={{
              animation: 'customPing 2s cubic-bezier(0, 0, 0.2, 1) infinite'
            }}></div>
            <div className="absolute inset-0 w-48 h-48 md:w-56 md:h-56 border-[0.5px] border-yellow-400/15 rounded-full opacity-0" style={{ 
              animationDelay: '1s',
              animation: 'customPing 2s cubic-bezier(0, 0, 0.2, 1) infinite'
            }}></div>
            <div className="absolute inset-0 w-48 h-48 md:w-56 md:h-56 border-[0.5px] border-yellow-400/10 rounded-full opacity-0" style={{ 
              animationDelay: '2s',
              animation: 'customPing 2s cubic-bezier(0, 0, 0.2, 1) infinite'
            }}></div>
          </>
        )}
        
        {/* Mobile Phone Image */}
        <div className="relative w-48 h-48 md:w-56 md:h-56 flex items-center justify-center bg-transparent border-0">
          <Image
            src="/IMAGES/Adwords Leads for electrical industry incoming call.png"
            alt="Adwords Leads for Electrical Industry"
            fill
            priority
            className="object-contain bg-transparent"
            style={{
              filter: 'drop-shadow(0 15px 30px rgba(0, 0, 0, 0.3))'
            }}
            sizes="(max-width: 768px) 192px, 224px"
          />
        </div>
      </div>
    </div>
  )
} 