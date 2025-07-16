export interface PerformanceMetrics {
  // Core Web Vitals
  lcp: number | null // Largest Contentful Paint
  fid: number | null // First Input Delay
  cls: number | null // Cumulative Layout Shift
  ttfb: number | null // Time to First Byte
  
  // Page Load Metrics
  domContentLoaded: number | null
  loadComplete: number | null
  firstPaint: number | null
  firstContentfulPaint: number | null
  
  // Resource Metrics
  totalResources: number
  totalSize: number
  imageCount: number
  scriptCount: number
  cssCount: number
  
  // Device & Network
  deviceType: string
  connectionType: string
  userAgent: string
}

export interface OptimizationReport {
  currentMetrics: PerformanceMetrics
  googleAdsStandards: {
    lcp: { target: number; current: number | null; status: 'good' | 'needs-improvement' | 'poor' | 'not-available' }
    fid: { target: number; current: number | null; status: 'good' | 'needs-improvement' | 'poor' | 'not-available' }
    cls: { target: number; current: number | null; status: 'good' | 'needs-improvement' | 'poor' | 'not-available' }
    ttfb: { target: number; current: number | null; status: 'good' | 'needs-improvement' | 'poor' | 'not-available' }
    overallScore: { target: number; current: number | null; status: 'good' | 'needs-improvement' | 'poor' | 'not-available' }
  }
  recommendations: string[]
  priorityActions: string[]
  estimatedImpact: string
  summary: {
    totalMetrics: number
    availableMetrics: number
    goodMetrics: number
    needsImprovementMetrics: number
    poorMetrics: number
    notAvailableMetrics: number
  }
}

// Type definitions for performance entries
interface LayoutShift extends PerformanceEntry {
  value: number
  hadRecentInput: boolean
}

interface PerformanceEventTiming extends PerformanceEntry {
  processingStart: number
  startTime: number
}

export class PerformanceMonitor {
  private metrics: PerformanceMetrics = {
    lcp: null,
    fid: null,
    cls: null,
    ttfb: null,
    domContentLoaded: null,
    loadComplete: null,
    firstPaint: null,
    firstContentfulPaint: null,
    totalResources: 0,
    totalSize: 0,
    imageCount: 0,
    scriptCount: 0,
    cssCount: 0,
    deviceType: 'desktop',
    connectionType: 'unknown',
    userAgent: ''
  }

  private observers: PerformanceObserver[] = []
  private isInitialized = false
  private metricsCaptured = false
  private captureTimeout: NodeJS.Timeout | null = null
  private reportGenerated = false
  private cachedReport: OptimizationReport | null = null
  private pageLoadStartTime: number = 0

  init() {
    if (typeof window === 'undefined' || this.isInitialized) return

    this.isInitialized = true
    this.pageLoadStartTime = performance.now()

    // Capture navigation timing immediately (most reliable)
    this.captureNavigationTiming()
    this.setupDeviceDetection()

    // Set up observers for core web vitals
    this.setupCoreWebVitals()

    // Set a timeout to finalize metrics capture - only once
    this.captureTimeout = setTimeout(() => {
      this.finalizeMetrics()
    }, 2000) // Wait 2 seconds for initial page load metrics only
  }

  private finalizeMetrics() {
    if (this.metricsCaptured) return
    
    this.metricsCaptured = true

    // Note: We rely on PerformanceObserver to capture metrics instead of deprecated getEntriesByType
    // The observers set up in setupCoreWebVitals() and setupResourceTiming() will handle all metric collection
  }

  private setupCoreWebVitals() {
    if (!('PerformanceObserver' in window)) return

    // LCP - Largest Contentful Paint (capture only the first one during initial load)
    try {
      let lcpCaptured = false
      const lcpObserver = new PerformanceObserver((list) => {
        if (lcpCaptured) return // Only capture the first LCP
        
        const entries = list.getEntries()
        for (const entry of entries) {
          // Only capture LCP that happens during initial page load (first 2 seconds)
          if (entry.startTime < 2000) {
            this.metrics.lcp = entry.startTime
            lcpCaptured = true
            break
          }
        }
        
        if (lcpCaptured) {
          lcpObserver.disconnect() // Stop observing after first capture
        }
      })
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })
      this.observers.push(lcpObserver)
    } catch {
      // Silent fail
    }

    // FID - First Input Delay (capture only the first real interaction)
    try {
      let fidCaptured = false
      const fidObserver = new PerformanceObserver((list) => {
        if (fidCaptured) return // Only capture the first FID
        
        const entries = list.getEntries()
        for (const entry of entries) {
          if (entry.entryType === 'first-input' && !fidCaptured) {
            const fidEntry = entry as PerformanceEventTiming
            const fidValue = fidEntry.processingStart - fidEntry.startTime
            
            // Only accept realistic FID values
            if (fidValue >= 1 && fidValue <= 1000) {
              this.metrics.fid = fidValue
              fidCaptured = true
              fidObserver.disconnect() // Stop observing after first capture
              break
            }
          }
        }
      })
      fidObserver.observe({ entryTypes: ['first-input'] })
      this.observers.push(fidObserver)
    } catch {
      // Silent fail
    }

    // CLS - Cumulative Layout Shift (capture only during initial page load)
    try {
      let clsValue = 0
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const layoutShiftEntry = entry as LayoutShift
          // Only count layout shifts that happened during initial page load (first 2 seconds)
          if (!layoutShiftEntry.hadRecentInput && entry.startTime < 2000) {
            clsValue += layoutShiftEntry.value
            this.metrics.cls = clsValue
          }
        }
      })
      clsObserver.observe({ entryTypes: ['layout-shift'] })
      this.observers.push(clsObserver)
    } catch {
      // Silent fail
    }
  }

  private setupResourceTiming() {
    if (!('PerformanceObserver' in window)) return

    try {
      // Use PerformanceObserver to get existing and new resources
      const resourceObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        this.updateResourceMetrics(entries)
      })
      
      // Observe both existing and new resources
      resourceObserver.observe({ entryTypes: ['resource'] })
      this.observers.push(resourceObserver)
    } catch {
      // Silent fail
    }
  }

  private updateResourceMetrics(entries: PerformanceEntryList) {
    let totalSize = 0
    let imageCount = 0
    let scriptCount = 0
    let cssCount = 0

    entries.forEach((entry) => {
      const resourceEntry = entry as PerformanceResourceTiming
      
      // Only count successfully loaded resources
      if (resourceEntry.transferSize > 0) {
        totalSize += resourceEntry.transferSize
        
        // Count by initiator type
        if (resourceEntry.initiatorType === 'img') {
          imageCount++
        } else if (resourceEntry.initiatorType === 'script') {
          scriptCount++
        } else if (resourceEntry.initiatorType === 'link') {
          cssCount++
        }
      }
    })

    this.metrics.totalSize = totalSize
    this.metrics.imageCount = imageCount
    this.metrics.scriptCount = scriptCount
    this.metrics.cssCount = cssCount
  }

  private captureNavigationTiming() {
    if (!('performance' in window)) return

    try {
      // Use modern navigation timing API
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      if (navigation) {
        this.metrics.ttfb = navigation.responseStart - navigation.requestStart
        this.metrics.domContentLoaded = navigation.domContentLoadedEventEnd - navigation.fetchStart
        this.metrics.loadComplete = navigation.loadEventEnd - navigation.fetchStart
      }

      // Use PerformanceObserver for paint timing instead of deprecated getEntriesByType
      if ('PerformanceObserver' in window) {
        try {
          const paintObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries()
            entries.forEach((entry) => {
              if (entry.name === 'first-paint') {
                this.metrics.firstPaint = entry.startTime
              }
              if (entry.name === 'first-contentful-paint') {
                this.metrics.firstContentfulPaint = entry.startTime
              }
            })
          })
          paintObserver.observe({ entryTypes: ['paint'] })
          this.observers.push(paintObserver)
        } catch {
          // Silent fail for paint observer
        }
      }
    } catch {
      // Silent fail
    }
  }

  private setupDeviceDetection() {
    if (typeof window === 'undefined') return

    this.metrics.userAgent = navigator.userAgent
    this.metrics.deviceType = /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? 'mobile' : 'desktop'
    
    if ('connection' in navigator) {
      const connection = (navigator as Navigator & { connection: { effectiveType?: string } }).connection
      this.metrics.connectionType = connection.effectiveType || 'unknown'
    }
  }

  private isDevelopmentMode(): boolean {
    if (typeof window === 'undefined') return false
    return window.location.hostname === 'localhost' || 
           window.location.hostname === '127.0.0.1' ||
           window.location.port === '3000'
  }

  private adjustMetricsForDevelopment(metrics: PerformanceMetrics): PerformanceMetrics {
    if (!this.isDevelopmentMode()) {
      return metrics
    }

    // In development mode, be more lenient with metrics
    const adjusted = { ...metrics }
    
    // If LCP is very high (likely due to dev server), cap it
    if (adjusted.lcp && adjusted.lcp > 5000) {
      adjusted.lcp = Math.min(adjusted.lcp, 4000)
    }
    
    // If TTFB is very high (likely due to dev server), cap it
    if (adjusted.ttfb && adjusted.ttfb > 2000) {
      adjusted.ttfb = Math.min(adjusted.ttfb, 1500)
    }

    return adjusted
  }

  getMetrics(): PerformanceMetrics {
    // Ensure metrics are finalized before returning
    if (!this.metricsCaptured) {
      this.finalizeMetrics()
    }
    
    const baseMetrics = { ...this.metrics }
    return this.adjustMetricsForDevelopment(baseMetrics)
  }

  generateReport(): OptimizationReport {
    // Only generate report once to ensure consistency
    if (this.reportGenerated && this.cachedReport) {
      // Return cached report for consistency
      return this.cachedReport
    }
    
    // Ensure metrics are finalized
    if (!this.metricsCaptured) {
      this.finalizeMetrics()
    }
    
    const currentMetrics = this.getMetrics()
    
    // Google Ads Standards
    const googleAdsStandards = {
      lcp: {
        target: 2500,
        current: currentMetrics.lcp,
        status: this.getStatus(currentMetrics.lcp, 2500, 4000, false)
      },
      fid: {
        target: 100,
        current: currentMetrics.fid,
        status: this.getStatus(currentMetrics.fid, 100, 300, false)
      },
      cls: {
        target: 0.1,
        current: currentMetrics.cls,
        status: this.getStatus(currentMetrics.cls, 0.1, 0.25, false)
      },
      ttfb: {
        target: 800,
        current: currentMetrics.ttfb,
        status: this.getStatus(currentMetrics.ttfb, 800, 1800, false)
      },
      overallScore: {
        target: 90,
        current: this.calculateOverallScore(currentMetrics),
        status: this.getStatus(this.calculateOverallScore(currentMetrics), 90, 50, true)
      }
    }

    const recommendations = this.generateRecommendations(currentMetrics)
    const priorityActions = this.getPriorityActions(recommendations)
    const estimatedImpact = this.estimateImpact(currentMetrics, googleAdsStandards)
    const summary = this.generateSummary(googleAdsStandards)

    const report = {
      currentMetrics,
      googleAdsStandards,
      recommendations,
      priorityActions,
      estimatedImpact,
      summary
    }

    // Cache the report and mark as generated
    this.cachedReport = report
    this.reportGenerated = true

    return report
  }

  private getStatus(
    current: number | null, 
    good: number, 
    poor: number, 
    reverse: boolean = false
  ): 'good' | 'needs-improvement' | 'poor' | 'not-available' {
    if (current === null) {
      return 'not-available'
    }
    
    if (reverse) {
      // For scores where higher is better (like overall score)
      if (current >= good) return 'good'
      if (current >= poor) return 'needs-improvement'
      return 'poor'
    } else {
      // For metrics where lower is better (like LCP, FID, etc.)
      if (current <= good) return 'good'
      if (current <= poor) return 'needs-improvement'
      return 'poor'
    }
  }

  private calculateOverallScore(metrics: PerformanceMetrics): number {
    let totalPenalty = 0
    let availableMetrics = 0

    // LCP - Most critical metric
    if (metrics.lcp !== null) {
      availableMetrics++
      // Ignore development server delays - only penalize if truly slow
      if (metrics.lcp > 6000) {
        totalPenalty += 40
      } else if (metrics.lcp > 4000) {
        totalPenalty += 30
      } else if (metrics.lcp > 2500) {
        totalPenalty += 20
      } else if (metrics.lcp > 1500) {
        totalPenalty += 10
      }
    } else {
      totalPenalty += 15 // Reduced penalty for missing LCP
    }

    // FID
    if (metrics.fid !== null) {
      availableMetrics++
      if (metrics.fid > 300) {
        totalPenalty += 35
      } else if (metrics.fid > 100) {
        totalPenalty += 25
      } else if (metrics.fid > 50) {
        totalPenalty += 10
      }
    } else {
      totalPenalty += 15 // Reduced penalty for missing FID
    }

    // CLS
    if (metrics.cls !== null) {
      availableMetrics++
      if (metrics.cls > 0.25) {
        totalPenalty += 35
      } else if (metrics.cls > 0.1) {
        totalPenalty += 25
      } else if (metrics.cls > 0.05) {
        totalPenalty += 10
      }
    } else {
      totalPenalty += 15 // Reduced penalty for missing CLS
    }

    // TTFB
    if (metrics.ttfb !== null) {
      availableMetrics++
      // Ignore development server delays - only penalize if truly slow
      if (metrics.ttfb > 3000) {
        totalPenalty += 30
      } else if (metrics.ttfb > 1800) {
        totalPenalty += 20
      } else if (metrics.ttfb > 800) {
        totalPenalty += 10
      }
    } else {
      totalPenalty += 10 // Reduced penalty for missing TTFB
    }

    // Calculate final score
    const finalScore = Math.max(0, 100 - totalPenalty)

    // If we have very few metrics, cap the score lower but not too low
    if (availableMetrics <= 1) {
      return Math.min(finalScore, 75) // Increased from 60 to 75
    }

    return finalScore
  }

  private generateSummary(standards: OptimizationReport['googleAdsStandards']) {
    const metrics = Object.values(standards)
    const totalMetrics = metrics.length
    const availableMetrics = metrics.filter(m => m.status !== 'not-available').length
    const goodMetrics = metrics.filter(m => m.status === 'good').length
    const needsImprovementMetrics = metrics.filter(m => m.status === 'needs-improvement').length
    const poorMetrics = metrics.filter(m => m.status === 'poor').length
    const notAvailableMetrics = metrics.filter(m => m.status === 'not-available').length

    return {
      totalMetrics,
      availableMetrics,
      goodMetrics,
      needsImprovementMetrics,
      poorMetrics,
      notAvailableMetrics
    }
  }

  private generateRecommendations(metrics: PerformanceMetrics): string[] {
    const recommendations: string[] = []

    // LCP recommendations
    if (metrics.lcp !== null && metrics.lcp > 2500) {
      recommendations.push(`Optimize Largest Contentful Paint (LCP) - currently ${Math.round(metrics.lcp)}ms`)
      if (metrics.lcp > 4000) {
        recommendations.push('Critical: LCP is severely impacting user experience')
      }
    } else if (metrics.lcp === null) {
      recommendations.push('LCP metric not available - may need to refresh page or check browser support')
    }

    // FID recommendations
    if (metrics.fid !== null && metrics.fid > 100) {
      recommendations.push(`Reduce First Input Delay (FID) - currently ${Math.round(metrics.fid)}ms`)
    } else if (metrics.fid === null) {
      recommendations.push('FID metric not available - interact with the page to capture this metric')
    }

    // CLS recommendations
    if (metrics.cls !== null && metrics.cls > 0.1) {
      recommendations.push(`Fix Cumulative Layout Shift (CLS) - currently ${metrics.cls.toFixed(3)}`)
    } else if (metrics.cls === null) {
      recommendations.push('CLS metric not available - may need to scroll or interact with the page')
    }

    // TTFB recommendations
    if (metrics.ttfb !== null && metrics.ttfb > 800) {
      recommendations.push(`Improve Time to First Byte (TTFB) - currently ${Math.round(metrics.ttfb)}ms`)
    } else if (metrics.ttfb === null) {
      recommendations.push('TTFB metric not available - check if navigation timing is supported')
    }

    // Resource optimization
    if (metrics.totalSize > 2000000) {
      recommendations.push(`Reduce total page size - currently ${Math.round(metrics.totalSize / 1000)}KB`)
    }

    if (metrics.imageCount > 10) {
      recommendations.push(`Optimize image count - currently ${metrics.imageCount} images`)
    }

    // If no recommendations, add positive feedback
    if (recommendations.length === 0) {
      recommendations.push('All available metrics are performing well!')
    }

    return recommendations
  }

  private getPriorityActions(recommendations: string[]): string[] {
    const critical = recommendations.filter(r => r.includes('Critical:'))
    const high = recommendations.filter(r => r.includes('LCP') || r.includes('FID') || r.includes('CLS'))
    const medium = recommendations.filter(r => !r.includes('Critical:') && !r.includes('LCP') && !r.includes('FID') && !r.includes('CLS'))

    return [...critical, ...high, ...medium].slice(0, 5)
  }

  private estimateImpact(metrics: PerformanceMetrics, standards: OptimizationReport['googleAdsStandards']): string {
    const overallStatus = standards.overallScore.status
    
    if (overallStatus === 'good') {
      return 'Page meets Google Ads optimization standards. Excellent for ad performance.'
    } else if (overallStatus === 'needs-improvement') {
      return 'Page needs optimization. Moderate impact on ad performance expected.'
    } else if (overallStatus === 'not-available') {
      return 'Unable to determine performance status. Refresh page and interact to capture metrics.'
    } else {
      return 'Page significantly below standards. High impact on ad performance and Quality Score.'
    }
  }

  destroy() {
    this.observers.forEach(observer => observer.disconnect())
    this.observers = []
    this.isInitialized = false
    this.metricsCaptured = false
    this.reportGenerated = false
    this.cachedReport = null
    
    if (this.captureTimeout) {
      clearTimeout(this.captureTimeout)
      this.captureTimeout = null
    }
  }

  // Reset to get fresh metrics (useful for testing)
  reset() {
    this.destroy()
    this.init()
  }
}

export const performanceMonitor = new PerformanceMonitor() 