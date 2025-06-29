'use client'

import React, { useEffect, useRef, useState } from 'react'

interface MoneyFlowPhoneProps {
  className?: string
  scale?: 'sm' | 'md' | 'lg' | 'xl'
  showMoneyFlow?: boolean
  phoneImage?: string
  phoneAlt?: string
}

export const MoneyFlowPhone: React.FC<MoneyFlowPhoneProps> = ({
  className = '',
  scale = 'md',
  showMoneyFlow = true,
  phoneImage = '/IMAGES/How it works/phone.png',
  phoneAlt = 'Mobile Phone'
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [particles, setParticles] = useState<Array<{
    id: number
    x: number
    y: number
    opacity: number
    scale: number
    size: 'small' | 'medium' | 'large'
    fadeIn: number
  }>>([])
  const particleIdRef = useRef(0)
  const cycleStartTimeRef = useRef(0)
  const initialDelayRef = useRef(true)

  const scaleClasses = {
    sm: 'scale-75',
    md: 'scale-100',
    lg: 'scale-125',
    xl: 'scale-150'
  }

  useEffect(() => {
    if (!showMoneyFlow) return
    
    setIsLoaded(true)
    
    let animationId: number
    const startTime = Date.now()
    cycleStartTimeRef.current = startTime

    const animate = () => {
      const cycleElapsed = Date.now() - cycleStartTimeRef.current
      
      // Initial delay to prevent jumpy start
      if (initialDelayRef.current && cycleElapsed < 2000) {
        animationId = requestAnimationFrame(animate)
        return
      }
      initialDelayRef.current = false
      
      // Smooth reset cycle every 18 seconds (15s active + 3s fade)
      if (cycleElapsed >= 18000) {
        setParticles(prev => 
          prev.map(particle => ({
            ...particle,
            opacity: Math.max(0, particle.opacity - 0.02) // Slower fade out over 3 seconds
          })).filter(particle => particle.opacity > 0)
        )
        
        // Only reset when all particles are gone
        if (particles.length === 0) {
          particleIdRef.current = 0
          cycleStartTimeRef.current = Date.now()
          initialDelayRef.current = true // Reset initial delay for next cycle
        }
        
        animationId = requestAnimationFrame(animate)
        return
      }
      
      // Create new particles every 1200ms - only in first 12 seconds of cycle
      // Add extra delay for first particle to ensure clean start
      const firstParticleDelay = initialDelayRef.current === false && particles.length === 0 ? 500 : 0
      if (cycleElapsed < 12000 && (cycleElapsed + firstParticleDelay) % 1200 < 16 && particles.length < 8) {
        const newParticle = {
          id: particleIdRef.current++,
          x: Math.random() * 40 - 30, // Moved left by shifting range from -20 to -30
          y: 10 + Math.random() * 10, // Random vertical starting position
          opacity: 0, // Start invisible for fade-in
          scale: 0.8 + Math.random() * 0.4, // Random scale between 0.8 and 1.2
          size: ['small', 'medium', 'large'][Math.floor(Math.random() * 3)] as 'small' | 'medium' | 'large',
          fadeIn: 0 // Fade-in progress
        }
        setParticles(prev => [...prev, newParticle])
      }

      // Update existing particles
      setParticles(prev => 
        prev
          .map(particle => {
            const age = cycleElapsed - (particle.id * 1200) // Age based on creation time
            const progress = (age % 4000) / 4000 // 4 second cycle
            
            if (progress >= 1) {
              return null // Remove particle after animation
            }

            // Fade-in effect for first 0.3 seconds (shorter for quicker appearance)
            const fadeInProgress = Math.min(1, age / 300)
            const fadeInOpacity = fadeInProgress

            return {
              ...particle,
              y: 10 - (progress * 100), // Moved up starting point and reduced travel distance
              opacity: fadeInOpacity * (1 - progress), // Combine fade-in with fade-out
              scale: 1 + (progress * 0.2), // Reduced growth
              fadeIn: fadeInProgress
            }
          })
          .filter(Boolean) as typeof particles
      )

      animationId = requestAnimationFrame(animate)
    }

    if (isLoaded) {
      animationId = requestAnimationFrame(animate)
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [isLoaded, particles.length, showMoneyFlow])

  const getSizeClass = (size: 'small' | 'medium' | 'large') => {
    switch (size) {
      case 'small': return 'text-lg'
      case 'medium': return 'text-2xl'
      case 'large': return 'text-3xl'
    }
  }

  return (
    <div 
      className={`flex flex-col items-center transition-transform duration-300 ${scaleClasses[scale]} ${className}`}
      style={{
        filter: 'drop-shadow(0 15px 30px rgba(0, 0, 0, 0.3))'
      }}
    >
      {/* Money flow particles */}
      {showMoneyFlow && (
        <div className="relative flex items-center justify-center w-full">
          {particles.map(particle => (
            <div
              key={particle.id}
              className="absolute pointer-events-none"
              style={{
                left: `calc(50% + ${particle.x}px)`,
                top: `${particle.y}px`,
                transform: `scale(${particle.scale})`,
                opacity: particle.opacity,
                transition: 'none'
              }}
            >
              <span 
                className={`text-green-600 font-bold drop-shadow-lg ${getSizeClass(particle.size)}`}
                style={{ 
                  textShadow: '0 2px 8px rgba(0,0,0,0.5)',
                }}
              >
                $
              </span>
            </div>
          ))}
        </div>
      )}
      
      {/* Phone Image */}
      <div className="relative">
        <img
          src={phoneImage}
          alt={phoneAlt}
          className="w-32 h-64 object-contain"
          style={{
            filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3))'
          }}
        />
        
        {/* Pulsing rings around phone */}
        {showMoneyFlow && (
          <>
            <div className="absolute inset-0 w-32 h-64 border-2 border-yellow-400/30 rounded-3xl animate-ping" style={{ animationDelay: '0s' }}></div>
            <div className="absolute inset-0 w-32 h-64 border-2 border-yellow-400/20 rounded-3xl animate-ping" style={{ animationDelay: '1s' }}></div>
            <div className="absolute inset-0 w-32 h-64 border-2 border-yellow-400/10 rounded-3xl animate-ping" style={{ animationDelay: '2s' }}></div>
          </>
        )}
      </div>
    </div>
  )
} 