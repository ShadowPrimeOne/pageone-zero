'use client'

import { useEffect, useState } from 'react'

export const PerformanceTest = () => {
  const [testData, setTestData] = useState<any>(null)
  const [isVisible, setIsVisible] = useState(false)

  const runTest = () => {
    if (typeof window === 'undefined') return

    const data: any = {
      timestamp: Date.now(),
      performance: {
        available: typeof performance !== 'undefined',
        getEntriesByType: typeof performance?.getEntriesByType === 'function',
        now: typeof performance?.now === 'function'
      },
      entries: {}
    }

    // Test all performance entry types
    const entryTypes = [
      'navigation',
      'resource',
      'paint',
      'largest-contentful-paint',
      'first-input',
      'layout-shift',
      'measure',
      'mark'
    ]

    entryTypes.forEach(type => {
      try {
        const entries = performance.getEntriesByType(type)
        data.entries[type] = {
          count: entries.length,
          sample: entries.length > 0 ? entries[0] : null
        }
      } catch (e) {
        data.entries[type] = { error: e.message }
      }
    })

    // Test navigation timing specifically
    try {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      if (navigation) {
        data.navigation = {
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.fetchStart,
          loadComplete: navigation.loadEventEnd - navigation.fetchStart,
          ttfb: navigation.responseStart - navigation.requestStart,
          domInteractive: navigation.domInteractive - navigation.fetchStart
        }
      }
    } catch (e) {
      data.navigation = { error: e.message }
    }

    // Test resource timing
    try {
      const resources = performance.getEntriesByType('resource')
      data.resources = {
        total: resources.length,
        byType: resources.reduce((acc: any, resource: any) => {
          const type = resource.initiatorType || 'unknown'
          acc[type] = (acc[type] || 0) + 1
          return acc
        }, {}),
        totalSize: resources.reduce((sum: number, resource: any) => sum + (resource.transferSize || 0), 0)
      }
    } catch (e) {
      data.resources = { error: e.message }
    }

    setTestData(data)
    setIsVisible(true)
    console.log('🧪 Performance Test Results:', data)
  }

  useEffect(() => {
    // Auto-run test after page load
    const timer = setTimeout(runTest, 3000)
    return () => clearTimeout(timer)
  }, [])

  if (!isVisible || !testData) return null

  return (
    <div className="fixed bottom-4 right-4 z-[1000] bg-white rounded-lg shadow-xl border border-gray-200 p-4 max-w-lg max-h-96 overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Performance Test</h3>
        <div className="flex items-center gap-2">
          <button 
            onClick={runTest}
            className="text-blue-600 hover:text-blue-800 text-sm"
            title="Run test"
          >
            🔄
          </button>
          <button 
            onClick={() => setIsVisible(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="space-y-4 text-xs">
        {/* Performance API Status */}
        <div className="p-2 bg-blue-50 rounded">
          <h4 className="font-semibold text-blue-900 mb-2">Performance API</h4>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span>Available:</span>
              <span className={testData.performance.available ? 'text-green-600' : 'text-red-600'}>
                {testData.performance.available ? 'Yes' : 'No'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>getEntriesByType:</span>
              <span className={testData.performance.getEntriesByType ? 'text-green-600' : 'text-red-600'}>
                {testData.performance.getEntriesByType ? 'Yes' : 'No'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>performance.now:</span>
              <span className={testData.performance.now ? 'text-green-600' : 'text-red-600'}>
                {testData.performance.now ? 'Yes' : 'No'}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Timing */}
        {testData.navigation && !testData.navigation.error && (
          <div className="p-2 bg-green-50 rounded">
            <h4 className="font-semibold text-green-900 mb-2">Navigation Timing</h4>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>TTFB:</span>
                <span>{Math.round(testData.navigation.ttfb)}ms</span>
              </div>
              <div className="flex justify-between">
                <span>DOM Content Loaded:</span>
                <span>{Math.round(testData.navigation.domContentLoaded)}ms</span>
              </div>
              <div className="flex justify-between">
                <span>Load Complete:</span>
                <span>{Math.round(testData.navigation.loadComplete)}ms</span>
              </div>
            </div>
          </div>
        )}

        {/* Resource Analysis */}
        {testData.resources && !testData.resources.error && (
          <div className="p-2 bg-yellow-50 rounded">
            <h4 className="font-semibold text-yellow-900 mb-2">Resources</h4>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>Total Resources:</span>
                <span>{testData.resources.total}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Size:</span>
                <span>{Math.round(testData.resources.totalSize / 1024)}KB</span>
              </div>
              {Object.entries(testData.resources.byType).map(([type, count]: [string, any]) => (
                <div key={type} className="flex justify-between">
                  <span>{type}:</span>
                  <span>{count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Entry Types */}
        <div className="p-2 bg-gray-50 rounded">
          <h4 className="font-semibold text-gray-900 mb-2">Performance Entries</h4>
          <div className="space-y-1">
            {Object.entries(testData.entries).map(([type, data]: [string, any]) => (
              <div key={type} className="flex justify-between">
                <span className="text-gray-600">{type}:</span>
                <span className={data.count > 0 ? 'text-green-600' : 'text-red-600'}>
                  {data.count || 0}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Raw Data Button */}
        <button
          onClick={() => {
            console.log('📊 Raw Performance Test Data:', testData)
            alert('Raw data logged to console. Press F12 to view.')
          }}
          className="w-full bg-gray-600 text-white text-xs py-2 px-3 rounded hover:bg-gray-700"
        >
          📊 Log Raw Data to Console
        </button>
      </div>
    </div>
  )
} 