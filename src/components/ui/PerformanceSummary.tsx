'use client'

import { useEffect, useState } from 'react'
import { performanceMonitor, type OptimizationReport } from '@/lib/performance-monitor'

export const PerformanceSummary = () => {
  const [report, setReport] = useState<OptimizationReport | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  const generateReport = () => {
    const newReport = performanceMonitor.generateReport()
    setReport(newReport)
  }

  useEffect(() => {
    // Generate report after a delay to allow metrics to be captured
    const timer = setTimeout(() => {
      generateReport()
      setIsVisible(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!report || !isVisible) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600'
      case 'needs-improvement': return 'text-yellow-600'
      case 'poor': return 'text-red-600'
      case 'not-available': return 'text-gray-500'
      default: return 'text-gray-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good': return '✅'
      case 'needs-improvement': return '⚠️'
      case 'poor': return '❌'
      case 'not-available': return '❓'
      default: return '❓'
    }
  }

  const formatMetric = (value: number | null, unit: string = 'ms') => {
    if (value === null) return 'N/A'
    if (unit === 'ms') return `${Math.round(value)}ms`
    return `${value.toFixed(3)}`
  }

  const getOverallGrade = () => {
    const score = report.googleAdsStandards.overallScore.current
    if (score === null) return 'N/A'
    if (score >= 90) return 'A'
    if (score >= 80) return 'B'
    if (score >= 70) return 'C'
    if (score >= 60) return 'D'
    return 'F'
  }

  return (
    <div className="fixed bottom-4 left-4 z-[1000] bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-900">Performance Summary</h3>
        <div className="flex items-center gap-2">
          <button 
            onClick={generateReport}
            className="text-blue-600 hover:text-blue-800 text-xs"
            title="Refresh"
          >
            🔄
          </button>
          <button 
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-gray-600 text-xs"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Overall Grade */}
      <div className="mb-3 text-center">
        <div className="text-2xl font-bold text-gray-900">{getOverallGrade()}</div>
        <div className="text-xs text-gray-600">
          {report.googleAdsStandards.overallScore.current ? 
            `${Math.round(report.googleAdsStandards.overallScore.current)}/100` : 
            'Score N/A'
          }
        </div>
      </div>

      {/* Key Metrics */}
      <div className="space-y-2 text-xs">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">LCP:</span>
          <div className="flex items-center gap-1">
            <span className="font-medium">{formatMetric(report.currentMetrics.lcp)}</span>
            <span className={getStatusColor(report.googleAdsStandards.lcp.status)}>
              {getStatusIcon(report.googleAdsStandards.lcp.status)}
            </span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">FID:</span>
          <div className="flex items-center gap-1">
            <span className="font-medium">{formatMetric(report.currentMetrics.fid)}</span>
            <span className={getStatusColor(report.googleAdsStandards.fid.status)}>
              {getStatusIcon(report.googleAdsStandards.fid.status)}
            </span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">CLS:</span>
          <div className="flex items-center gap-1">
            <span className="font-medium">{formatMetric(report.currentMetrics.cls, '')}</span>
            <span className={getStatusColor(report.googleAdsStandards.cls.status)}>
              {getStatusIcon(report.googleAdsStandards.cls.status)}
            </span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-600">TTFB:</span>
          <div className="flex items-center gap-1">
            <span className="font-medium">{formatMetric(report.currentMetrics.ttfb)}</span>
            <span className={getStatusColor(report.googleAdsStandards.ttfb.status)}>
              {getStatusIcon(report.googleAdsStandards.ttfb.status)}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-3 pt-3 border-t border-gray-200">
        <div className="flex justify-between text-xs text-gray-600">
          <span>Available: {report.summary.availableMetrics}/{report.summary.totalMetrics}</span>
          <span>Good: {report.summary.goodMetrics}</span>
        </div>
      </div>

      {/* Top Priority */}
      {report.priorityActions.length > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="text-xs text-gray-600 mb-1">Top Priority:</div>
          <div className="text-xs text-gray-800 bg-yellow-50 p-2 rounded">
            {report.priorityActions[0]}
          </div>
        </div>
      )}
    </div>
  )
} 