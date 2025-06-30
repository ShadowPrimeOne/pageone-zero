'use client'

import React, { useEffect, useRef, useState } from 'react'

export const AnimatedLogo: React.FC = () => {
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

  useEffect(() => {
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
      
      // Smooth reset cycle every 36 seconds (30s active + 6s fade) - doubled from 18s
      if (cycleElapsed >= 36000) {
        setParticles(prev => 
          prev.map(particle => ({
            ...particle,
            opacity: Math.max(0, particle.opacity - 0.01) // Slower fade out over 6 seconds
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
      
      // Create new particles every 2400ms - only in first 24 seconds of cycle (doubled from 12s)
      // Add extra delay for first particle to ensure clean start
      const firstParticleDelay = initialDelayRef.current === false && particles.length === 0 ? 500 : 0
      if (cycleElapsed < 24000 && (cycleElapsed + firstParticleDelay) % 2400 < 16 && particles.length < 4) {
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
            const age = cycleElapsed - (particle.id * 2400) // Age based on creation time
            const progress = (age % 4000) / 4000 // 4 second cycle
            
            if (progress >= 1) {
              return null // Remove particle after animation
            }

            // Fade-in effect for first 0.3 seconds (shorter for quicker appearance)
            const fadeInProgress = Math.min(1, age / 300)
            const fadeInOpacity = fadeInProgress

            return {
              ...particle,
              y: 10 - (progress * 150), // Increased travel distance from 100 to 150px
              opacity: Math.max(0, Math.min(1, fadeInOpacity * (1 - Math.pow(Math.max(0, progress), 0.7)))), // Smoother fade out with bounds checking
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
  }, [isLoaded, particles.length])

  const getSizeClass = (size: 'small' | 'medium' | 'large') => {
    switch (size) {
      case 'small': return 'text-lg'
      case 'medium': return 'text-2xl'
      case 'large': return 'text-3xl'
    }
  }

  return (
    <div className="relative flex items-center justify-center w-full">
      {/* Money flow particles */}
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
  )
} 