'use client'

import React, { useState, useEffect } from 'react'
import { usePerformance } from '@/lib/hooks/usePerformance'

interface PerformanceMetrics {
  fcp: number | null
  lcp: number | null
  fid: number | null
  cls: number | null
  ttfb: number | null
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null
  })
  const [isVisible, setIsVisible] = useState(false)
  const { animationLevel, slowDevice, lowBandwidth } = usePerformance()

  // Toggle visibility with keyboard shortcut (Ctrl+Shift+P)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        setIsVisible(prev => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Track Core Web Vitals
  useEffect(() => {
    if (typeof window === 'undefined') return

    // First Contentful Paint
    const fcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint')
      if (fcpEntry) {
        setMetrics(prev => ({ ...prev, fcp: fcpEntry.startTime }))
      }
    })
    fcpObserver.observe({ entryTypes: ['paint'] })

    // Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const lastEntry = entries[entries.length - 1]
      if (lastEntry) {
        setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }))
      }
    })
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

    // First Input Delay
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach(entry => {
        setMetrics(prev => ({ ...prev, fid: entry.processingStart - entry.startTime }))
      })
    })
    fidObserver.observe({ entryTypes: ['first-input'] })

    // Cumulative Layout Shift
    const clsObserver = new PerformanceObserver((list) => {
      let clsValue = 0
      list.getEntries().forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value
        }
      })
      setMetrics(prev => ({ ...prev, cls: clsValue }))
    })
    clsObserver.observe({ entryTypes: ['layout-shift'] })

    // Time to First Byte
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    if (navigationEntry) {
      setMetrics(prev => ({ ...prev, ttfb: navigationEntry.responseStart - navigationEntry.requestStart }))
    }

    return () => {
      fcpObserver.disconnect()
      lcpObserver.disconnect()
      fidObserver.disconnect()
      clsObserver.disconnect()
    }
  }, [])

  if (!isVisible) return null

  const getPerformanceGrade = (metric: number | null, thresholds: { good: number; needsImprovement: number }) => {
    if (metric === null) return 'N/A'
    if (metric <= thresholds.good) return '🟢 Good'
    if (metric <= thresholds.needsImprovement) return '🟡 Needs Improvement'
    return '🔴 Poor'
  }

  const getDeviceInfo = () => {
    const info = {
      userAgent: navigator.userAgent,
      hardwareConcurrency: navigator.hardwareConcurrency,
      deviceMemory: (navigator as any).deviceMemory,
      connection: (navigator as any).connection?.effectiveType || 'unknown',
      screenSize: `${window.screen.width}x${window.screen.height}`,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      pixelRatio: window.devicePixelRatio
    }
    return info
  }

  const deviceInfo = getDeviceInfo()

  return (
    <div className="fixed top-4 right-4 bg-black bg-opacity-90 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm text-xs font-mono">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold">Performance Monitor</h3>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-white"
        >
          ✕
        </button>
      </div>

      <div className="space-y-2">
        <div className="border-b border-gray-700 pb-2">
          <h4 className="font-semibold mb-1">Core Web Vitals</h4>
          <div className="space-y-1">
            <div>FCP: {metrics.fcp?.toFixed(0)}ms {getPerformanceGrade(metrics.fcp, { good: 1800, needsImprovement: 3000 })}</div>
            <div>LCP: {metrics.lcp?.toFixed(0)}ms {getPerformanceGrade(metrics.lcp, { good: 2500, needsImprovement: 4000 })}</div>
            <div>FID: {metrics.fid?.toFixed(0)}ms {getPerformanceGrade(metrics.fid, { good: 100, needsImprovement: 300 })}</div>
            <div>CLS: {metrics.cls?.toFixed(3)} {getPerformanceGrade(metrics.cls, { good: 0.1, needsImprovement: 0.25 })}</div>
            <div>TTFB: {metrics.ttfb?.toFixed(0)}ms {getPerformanceGrade(metrics.ttfb, { good: 800, needsImprovement: 1800 })}</div>
          </div>
        </div>

        <div className="border-b border-gray-700 pb-2">
          <h4 className="font-semibold mb-1">Performance Settings</h4>
          <div className="space-y-1">
            <div>Animation Level: {animationLevel}</div>
            <div>Slow Device: {slowDevice ? 'Yes' : 'No'}</div>
            <div>Low Bandwidth: {lowBandwidth ? 'Yes' : 'No'}</div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-1">Device Info</h4>
          <div className="space-y-1 text-xs">
            <div>CPU Cores: {deviceInfo.hardwareConcurrency}</div>
            <div>Memory: {deviceInfo.deviceMemory || 'Unknown'}GB</div>
            <div>Connection: {deviceInfo.connection}</div>
            <div>Screen: {deviceInfo.screenSize}</div>
            <div>Viewport: {deviceInfo.viewport}</div>
            <div>Pixel Ratio: {deviceInfo.pixelRatio}</div>
          </div>
        </div>
      </div>

      <div className="mt-3 text-xs text-gray-400">
        Press Ctrl+Shift+P to toggle
      </div>
    </div>
  )
}

// Development-only component
export function PerformanceMonitorDev() {
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return <PerformanceMonitor />
} 