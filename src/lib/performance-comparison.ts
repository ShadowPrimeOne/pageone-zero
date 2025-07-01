export interface PerformanceSnapshot {
  timestamp: number
  metrics: {
    lcp: number | null
    fid: number | null
    cls: number | null
    ttfb: number | null
    overallScore: number | null
    totalSize: number
    imageCount: number
  }
  summary: {
    availableMetrics: number
    goodMetrics: number
    needsImprovementMetrics: number
    poorMetrics: number
  }
  description: string
}

class PerformanceComparison {
  private storageKey = 'performance-snapshots'
  private maxSnapshots = 10

  saveSnapshot(metrics: { 
    lcp: number | null
    fid: number | null
    cls: number | null
    ttfb: number | null
    overallScore: number | null
    totalSize: number
    imageCount: number
    summary?: {
      availableMetrics: number
      goodMetrics: number
      needsImprovementMetrics: number
      poorMetrics: number
    }
  }, description: string): PerformanceSnapshot {
    const snapshot: PerformanceSnapshot = {
      timestamp: Date.now(),
      metrics: {
        lcp: metrics.lcp,
        fid: metrics.fid,
        cls: metrics.cls,
        ttfb: metrics.ttfb,
        overallScore: metrics.overallScore,
        totalSize: metrics.totalSize,
        imageCount: metrics.imageCount
      },
      summary: {
        availableMetrics: metrics.summary?.availableMetrics || 0,
        goodMetrics: metrics.summary?.goodMetrics || 0,
        needsImprovementMetrics: metrics.summary?.needsImprovementMetrics || 0,
        poorMetrics: metrics.summary?.poorMetrics || 0
      },
      description
    }

    const snapshots = this.getSnapshots()
    snapshots.unshift(snapshot)
    
    // Keep only the latest snapshots
    if (snapshots.length > this.maxSnapshots) {
      snapshots.splice(this.maxSnapshots)
    }

    localStorage.setItem(this.storageKey, JSON.stringify(snapshots))
    console.log('📊 Performance snapshot saved:', snapshot)
    
    return snapshot
  }

  getSnapshots(): PerformanceSnapshot[] {
    try {
      const stored = localStorage.getItem(this.storageKey)
      return stored ? JSON.parse(stored) : []
    } catch (e) {
      console.warn('Failed to load performance snapshots:', e)
      return []
    }
  }

  clearSnapshots(): void {
    localStorage.removeItem(this.storageKey)
    console.log('🗑️ Performance snapshots cleared')
  }

  compareSnapshots(snapshot1: PerformanceSnapshot, snapshot2: PerformanceSnapshot) {
    const comparison = {
      lcp: this.compareMetric(snapshot1.metrics.lcp, snapshot2.metrics.lcp, 'LCP', 'ms', false),
      fid: this.compareMetric(snapshot1.metrics.fid, snapshot2.metrics.fid, 'FID', 'ms', false),
      cls: this.compareMetric(snapshot1.metrics.cls, snapshot2.metrics.cls, 'CLS', '', false),
      ttfb: this.compareMetric(snapshot1.metrics.ttfb, snapshot2.metrics.ttfb, 'TTFB', 'ms', false),
      overallScore: this.compareMetric(snapshot1.metrics.overallScore, snapshot2.metrics.overallScore, 'Overall Score', '', true),
      totalSize: this.compareMetric(snapshot1.metrics.totalSize, snapshot2.metrics.totalSize, 'Total Size', 'KB', false),
      imageCount: this.compareMetric(snapshot1.metrics.imageCount, snapshot2.metrics.imageCount, 'Image Count', '', false)
    }

    return comparison
  }

  private compareMetric(
    value1: number | null, 
    value2: number | null, 
    name: string, 
    unit: string, 
    higherIsBetter: boolean
  ) {
    if (value1 === null || value2 === null) {
      return {
        name,
        before: value1,
        after: value2,
        change: null,
        changePercent: null,
        improvement: null,
        unit
      }
    }

    const change = value2 - value1
    const changePercent = ((change / value1) * 100)
    const improvement = higherIsBetter ? change > 0 : change < 0

    return {
      name,
      before: value1,
      after: value2,
      change,
      changePercent,
      improvement,
      unit
    }
  }

  generateComparisonReport(snapshot1: PerformanceSnapshot, snapshot2: PerformanceSnapshot) {
    const comparison = this.compareSnapshots(snapshot1, snapshot2)
    
    const improvements = Object.values(comparison).filter(c => c.improvement === true)
    const regressions = Object.values(comparison).filter(c => c.improvement === false && c.change !== null)
    const unchanged = Object.values(comparison).filter(c => c.improvement === null)

    const report = {
      summary: {
        improvements: improvements.length,
        regressions: regressions.length,
        unchanged: unchanged.length,
        totalComparable: improvements.length + regressions.length
      },
      details: comparison,
      recommendations: this.generateRecommendations(comparison)
    }

    console.log('📊 Performance Comparison Report:', report)
    return report
  }

  private generateRecommendations(comparison: Record<string, { 
    name: string
    before: number | null
    after: number | null
    change: number | null
    changePercent: number | null
    improvement: boolean | null
    unit: string
  }>): string[] {
    const recommendations: string[] = []

    // Check for significant regressions
    Object.values(comparison).forEach((metric) => {
      if (metric.improvement === false && metric.changePercent && Math.abs(metric.changePercent) > 10) {
        recommendations.push(`⚠️ ${metric.name} regressed by ${Math.abs(metric.changePercent).toFixed(1)}%`)
      }
    })

    // Check for significant improvements
    Object.values(comparison).forEach((metric) => {
      if (metric.improvement === true && metric.changePercent && Math.abs(metric.changePercent) > 10) {
        recommendations.push(`✅ ${metric.name} improved by ${Math.abs(metric.changePercent).toFixed(1)}%`)
      }
    })

    if (recommendations.length === 0) {
      recommendations.push('No significant changes detected')
    }

    return recommendations
  }
}

export const performanceComparison = new PerformanceComparison() 