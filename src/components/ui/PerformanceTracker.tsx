'use client'

import { useEffect, useState } from 'react'
import { performanceMonitor } from '@/lib/performance-monitor'
import { performanceComparison, type PerformanceSnapshot } from '@/lib/performance-comparison'

export const PerformanceTracker = () => {
  const [snapshots, setSnapshots] = useState<PerformanceSnapshot[]>([])
  const [isVisible, setIsVisible] = useState(false)
  const [description, setDescription] = useState('')

  useEffect(() => {
    setSnapshots(performanceComparison.getSnapshots())
  }, [])

  const saveSnapshot = () => {
    const report = performanceMonitor.generateReport()
    performanceComparison.saveSnapshot({
      lcp: report.currentMetrics.lcp,
      fid: report.currentMetrics.fid,
      cls: report.currentMetrics.cls,
      ttfb: report.currentMetrics.ttfb,
      overallScore: report.googleAdsStandards.overallScore.current,
      totalSize: report.currentMetrics.totalSize,
      imageCount: report.currentMetrics.imageCount,
      summary: report.summary
    }, description || `Snapshot ${snapshots.length + 1}`)
    
    setSnapshots(performanceComparison.getSnapshots())
    setDescription('')
  }

  const compareSnapshots = (index1: number, index2: number) => {
    if (index1 >= snapshots.length || index2 >= snapshots.length) return
    
    const report = performanceComparison.generateComparisonReport(snapshots[index1], snapshots[index2])
    console.log('📊 Comparison Report:', report)
    
    // Show comparison in alert for now (you can enhance this with a modal)
    const summary = `Improvements: ${report.summary.improvements}\nRegressions: ${report.summary.regressions}\nUnchanged: ${report.summary.unchanged}`
    alert(`Performance Comparison:\n\n${summary}\n\nCheck console for detailed report.`)
  }

  const clearSnapshots = () => {
    performanceComparison.clearSnapshots()
    setSnapshots([])
  }

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString()
  }

  if (!isVisible) return null

  return (
    <div className="fixed top-4 left-4 z-[1000] bg-white rounded-lg shadow-xl border border-gray-200 p-4 max-w-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Performance Tracker</h3>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>

      {/* Save New Snapshot */}
      <div className="mb-4 p-3 bg-blue-50 rounded">
        <h4 className="text-sm font-semibold text-blue-900 mb-2">Save Snapshot</h4>
        <input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 text-sm border border-gray-300 rounded mb-2"
        />
        <button
          onClick={saveSnapshot}
          className="w-full bg-blue-600 text-white text-sm py-2 px-3 rounded hover:bg-blue-700"
        >
          📊 Save Current Performance
        </button>
      </div>

      {/* Snapshots List */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-semibold text-gray-900">Snapshots ({snapshots.length})</h4>
          {snapshots.length > 0 && (
            <button
              onClick={clearSnapshots}
              className="text-red-600 text-xs hover:text-red-800"
            >
              Clear All
            </button>
          )}
        </div>
        
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {snapshots.map((snapshot, index) => (
            <div key={snapshot.timestamp} className="p-2 bg-gray-50 rounded text-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium">{snapshot.description}</span>
                <span className="text-gray-500">{formatTimestamp(snapshot.timestamp)}</span>
              </div>
              <div className="text-gray-600">
                Score: {snapshot.metrics.overallScore ? Math.round(snapshot.metrics.overallScore) : 'N/A'}/100
              </div>
              {index > 0 && (
                <button
                  onClick={() => compareSnapshots(index - 1, index)}
                  className="text-blue-600 text-xs hover:text-blue-800 mt-1"
                >
                  Compare with previous
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="text-xs text-gray-600">
        <p>💡 Use this to track performance improvements during optimizations</p>
        <p>📊 Snapshots are saved in localStorage</p>
      </div>
    </div>
  )
} 