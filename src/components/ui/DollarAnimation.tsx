'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { usePerformance } from '@/lib/hooks/usePerformance'

interface Particle {
  id: number
  x: number
  y: number
  opacity: number
  scale: number
  rotation: number
  velocity: { x: number; y: number }
}

export function DollarAnimation() {
  const [particles, setParticles] = useState<Particle[]>([])
  const { animationLevel, slowDevice } = usePerformance()

  // Performance-based configuration
  const getConfig = useCallback(() => {
    if (animationLevel === 'minimal') {
      return {
        maxParticles: 0,
        spawnInterval: 0,
        travelDistance: 0
      }
    }
    
    if (animationLevel === 'reduced' || slowDevice) {
      return {
        maxParticles: 3,
        spawnInterval: 4000, // 4 seconds
        travelDistance: 100
      }
    }
    
    return {
      maxParticles: 6,
      spawnInterval: 2000, // 2 seconds
      travelDistance: 150
    }
  }, [animationLevel, slowDevice])

  const config = getConfig()

  // Create new particle
  const createParticle = useCallback(() => {
    if (config.maxParticles === 0) return

    const newParticle: Particle = {
      id: Date.now() + Math.random(),
      x: Math.random() * window.innerWidth,
      y: window.innerHeight + 20,
      opacity: 1,
      scale: 0.8 + Math.random() * 0.4,
      rotation: Math.random() * 360,
      velocity: {
        x: (Math.random() - 0.5) * 2,
        y: -2 - Math.random() * 2
      }
    }

    setParticles(prev => {
      const updated = [...prev, newParticle]
      return updated.slice(-config.maxParticles)
    })
  }, [config.maxParticles])

  // Update particles
  const updateParticles = useCallback(() => {
    if (config.maxParticles === 0) return

    setParticles(prev => 
      prev
        .map(particle => ({
          ...particle,
          x: particle.x + particle.velocity.x,
          y: particle.y + particle.velocity.y,
          opacity: Math.max(0, particle.opacity - 0.02),
          rotation: particle.rotation + 2
        }))
        .filter(particle => 
          particle.opacity > 0 && 
          particle.y > -50 && 
          particle.y < window.innerHeight + 100
        )
    )
  }, [config.maxParticles])

  // Spawn particles
  useEffect(() => {
    if (config.maxParticles === 0 || config.spawnInterval === 0) return

    const interval = setInterval(createParticle, config.spawnInterval)
    return () => clearInterval(interval)
  }, [createParticle, config.maxParticles, config.spawnInterval])

  // Update animation
  useEffect(() => {
    if (config.maxParticles === 0) return

    const interval = setInterval(updateParticles, 50) // 20 FPS for better performance
    return () => clearInterval(interval)
  }, [updateParticles, config.maxParticles])

  // Don't render if animations are disabled
  if (config.maxParticles === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute text-green-400 font-bold select-none"
          style={{
            left: particle.x,
            top: particle.y,
            opacity: particle.opacity,
            transform: `scale(${particle.scale}) rotate(${particle.rotation}deg)`,
            fontSize: '1.5rem',
            textShadow: '0 0 10px rgba(34, 197, 94, 0.5)',
            transition: 'none'
          }}
        >
          $
        </div>
      ))}
    </div>
  )
}

// Optimized version for slow devices
export function DollarAnimationOptimized() {
  const { animationLevel, slowDevice } = usePerformance()

  // Don't render on slow devices or when animations are minimal
  if (animationLevel === 'minimal' || slowDevice) {
    return null
  }

  return <DollarAnimation />
} 