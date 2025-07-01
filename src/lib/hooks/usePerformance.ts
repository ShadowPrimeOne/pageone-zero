import { useState, useEffect } from 'react'

interface PerformanceConfig {
  reducedMotion: boolean
  slowDevice: boolean
  lowBandwidth: boolean
  animationLevel: 'full' | 'reduced' | 'minimal'
}

interface NetworkInformation {
  effectiveType?: string
}

interface ExtendedNavigator extends Navigator {
  deviceMemory?: number
  connection?: NetworkInformation
  mozConnection?: NetworkInformation
  webkitConnection?: NetworkInformation
}

export function usePerformance(): PerformanceConfig {
  const [config, setConfig] = useState<PerformanceConfig>({
    reducedMotion: false,
    slowDevice: false,
    lowBandwidth: false,
    animationLevel: 'full'
  })

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const reducedMotion = mediaQuery.matches

    // Detect slow device (low-end mobile)
    const extendedNavigator = navigator as ExtendedNavigator
    const slowDevice = 
      navigator.hardwareConcurrency <= 2 || 
      (extendedNavigator.deviceMemory && extendedNavigator.deviceMemory <= 2) ||
      /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

    // Detect low bandwidth (slow connection)
    const connection = extendedNavigator.connection || extendedNavigator.mozConnection || extendedNavigator.webkitConnection
    const lowBandwidth = connection ? 
      connection.effectiveType === 'slow-2g' || 
      connection.effectiveType === '2g' || 
      connection.effectiveType === '3g' : false

    // Determine animation level
    let animationLevel: 'full' | 'reduced' | 'minimal' = 'full'
    
    if (reducedMotion || slowDevice || lowBandwidth) {
      animationLevel = 'minimal'
    } else if (slowDevice || lowBandwidth) {
      animationLevel = 'reduced'
    }

    setConfig({
      reducedMotion,
      slowDevice,
      lowBandwidth,
      animationLevel
    })

    // Listen for changes
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setConfig(prev => ({
        ...prev,
        reducedMotion: e.matches,
        animationLevel: e.matches ? 'minimal' : prev.animationLevel
      }))
    }

    mediaQuery.addEventListener('change', handleMotionChange)

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange)
    }
  }, [])

  return config
}

// Utility functions for conditional rendering
export const shouldAnimate = (level: 'full' | 'reduced' | 'minimal', currentLevel: 'full' | 'reduced' | 'minimal') => {
  const levels = { full: 3, reduced: 2, minimal: 1 }
  return levels[currentLevel] >= levels[level]
}

export const getAnimationDuration = (baseDuration: number, animationLevel: 'full' | 'reduced' | 'minimal') => {
  switch (animationLevel) {
    case 'minimal': return 0
    case 'reduced': return baseDuration * 0.5
    case 'full': return baseDuration
  }
} 