'use client'

import React, { Suspense, lazy, useEffect, useState } from 'react'
import { usePerformance } from '@/lib/hooks/usePerformance'

// Lazy load components for better performance
const AdwordsHeroPromo = lazy(() => import('@/components/modules/Adwords/AdwordsHeroPromo').then(mod => ({ default: mod.AdwordsHeroPromo })))
const TrustBanner = lazy(() => import('@/components/ui/TrustBanner').then(mod => ({ default: mod.TrustBanner })))
const AdwordsBenefitsGrid = lazy(() => import('@/components/modules/Adwords/AdwordsBenefitsGrid').then(mod => ({ default: mod.AdwordsBenefitsGrid })))
const AdwordsHowItWorks = lazy(() => import('@/components/modules/Adwords/AdwordsHowItWorks').then(mod => ({ default: mod.AdwordsHowItWorks })))
const AdwordsLeadForm = lazy(() => import('@/components/modules/Adwords/AdwordsLeadForm').then(mod => ({ default: mod.AdwordsLeadForm })))
const AdwordsTrustFooter = lazy(() => import('@/components/modules/Adwords/AdwordsTrustFooter').then(mod => ({ default: mod.AdwordsTrustFooter })))
const TestimonialPopup = lazy(() => import('@/components/ui/TestimonialPopup').then(mod => ({ default: mod.TestimonialPopup })))

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
  </div>
)

export default function AdwordsBoostElectricianPage() {
  const { animationLevel, slowDevice } = usePerformance()
  const [showPerformance, setShowPerformance] = useState(false)
  const [performanceData, setPerformanceData] = useState<any>(null)

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'P') {
        event.preventDefault()
        setShowPerformance(prev => !prev)
        
        // Get performance data when showing
        if (!showPerformance) {
          setTimeout(() => {
            // @ts-expect-error - Accessing global performance monitor
            if (typeof window !== 'undefined' && window.performanceMonitor) {
              // @ts-expect-error - Accessing global performance monitor
              const report = window.performanceMonitor.generateReport()
              setPerformanceData(report)
            }
          }, 100)
        }
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [showPerformance])

  // Conditional styles based on performance
  const getAnimationStyles = () => {
    if (animationLevel === 'minimal') {
      return `
        * {
          animation-duration: 0s !important;
          transition-duration: 0s !important;
        }
        .animate-fadeInUp,
        .animate-fadeInLeft,
        .animate-fadeInRight,
        .animate-scaleIn,
        .animate-pulse,
        .animate-bounce {
          animation: none !important;
        }
      `
    }
    
    if (animationLevel === 'reduced') {
      return `
        * {
          animation-duration: 0.5s !important;
          transition-duration: 0.2s !important;
        }
      `
    }
    
    return ''
  }

  const getScoreColor = (score: number | null) => {
    if (score === null) return 'text-gray-400'
    if (score >= 90) return 'text-green-400'
    if (score >= 70) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-400'
      case 'needs-improvement': return 'text-yellow-400'
      case 'poor': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  const resetPerformance = () => {
    // @ts-expect-error - Accessing global performance monitor
    if (typeof window !== 'undefined' && window.performanceMonitor) {
      // @ts-expect-error - Accessing global performance monitor
      window.performanceMonitor.reset()
      setPerformanceData(null)
      setShowPerformance(false)
      // Re-show after a moment to get fresh data
      setTimeout(() => {
        setShowPerformance(true)
        setTimeout(() => {
          // @ts-expect-error - Accessing global performance monitor
          if (window.performanceMonitor) {
            // @ts-expect-error - Accessing global performance monitor
            const report = window.performanceMonitor.generateReport()
            setPerformanceData(report)
          }
        }, 1000)
      }, 100)
    }
  }

  return (
    <>
      <style jsx global>{`
        html, body {
          width: 100vw !important;
          max-width: 100vw !important;
          overflow-x: hidden !important;
          margin: 0 !important;
          padding: 0 !important;
          background: black !important;
          min-height: 100vh !important;
        }
        body {
          background: black !important;
        }
        ::-webkit-scrollbar {
          display: none !important;
        }
        * {
          -ms-overflow-style: none !important;
          scrollbar-width: none !important;
        }
        
        /* Performance-based animations */
        ${getAnimationStyles()}
        
        /* Optimized animations for slow devices */
        ${slowDevice ? `
          .dollar-bounce,
          .spark-particle,
          .electric-border {
            animation: none !important;
          }
        ` : ''}
        
        @keyframes gentle-bounce {
          0%, 100% { transform: translateY(0px) scaleX(-1); }
          50% { transform: translateY(-10px) scaleX(-1); }
        }
        @keyframes typing-dots {
          0%, 20% { opacity: 0; }
          40% { opacity: 1; }
          60% { opacity: 1; }
          80% { opacity: 1; }
          100% { opacity: 0; }
        }
        .typing-dot {
          animation: typing-dots 2s ease-in-out infinite;
        }
        .typing-dot:nth-child(1) { animation-delay: 0s; }
        .typing-dot:nth-child(2) { animation-delay: 0.3s; }
        .typing-dot:nth-child(3) { animation-delay: 0.6s; }
      `}</style>
      
      <main className="bg-black text-white overflow-x-hidden w-full max-w-full relative min-h-screen">
        <div className="relative w-full" data-hero>
          <Suspense fallback={<LoadingSpinner />}>
            <AdwordsHeroPromo />
          </Suspense>

          <Suspense fallback={<LoadingSpinner />}>
            <AdwordsHowItWorks />
          </Suspense>

          <Suspense fallback={<LoadingSpinner />}>
            <AdwordsBenefitsGrid
              benefits={[
                "GoogleAds / PPC\nSetup & Management",
                "Free Optimised\nLanding Page",
                "Leads Sent To\nPhone & Email",
                "90 Day Campaign\nPay only for 30*",
                "Weekly Reporting\nDedicated Support"
              ]}
            />
          </Suspense>

          <Suspense fallback={<LoadingSpinner />}>
            <TrustBanner />
          </Suspense>

          <Suspense fallback={<LoadingSpinner />}>
            <AdwordsLeadForm
              heading="Start Your 90-Day Campaign"
              subheading="We'll assign a local expert to you within 24h."
              fields={['name', 'email', 'phone', 'businessType']}
              ctaText="Get My Free Setup"
            />
          </Suspense>

          <Suspense fallback={<LoadingSpinner />}>
            <AdwordsTrustFooter
              text="No spam. No contracts. Cancel anytime."
            />
          </Suspense>
        </div>
      </main>

      <Suspense fallback={null}>
        <TestimonialPopup />
      </Suspense>

      {/* Performance Display - Press Ctrl+Shift+P to toggle */}
      {showPerformance && (
        <div className="fixed top-4 right-4 z-50 bg-black/90 backdrop-blur-sm border border-gray-700 rounded-lg shadow-xl p-4 max-w-sm text-white">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">Performance Score</h3>
            <div className="flex gap-2">
              <button
                onClick={resetPerformance}
                className="text-blue-400 hover:text-blue-300 text-sm"
                title="Reset and get fresh metrics"
              >
                🔄
              </button>
              <button
                onClick={() => setShowPerformance(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
          </div>
          
          {performanceData ? (
            <div className="space-y-3">
              <div className="text-center">
                <div className={`text-3xl font-bold ${getScoreColor(performanceData.googleAdsStandards.overallScore.current)}`}>
                  {performanceData.googleAdsStandards.overallScore.current}/100
                </div>
                <div className="text-sm text-gray-400">
                  {performanceData.googleAdsStandards.overallScore.status === 'good' ? '✅ Excellent' : 
                   performanceData.googleAdsStandards.overallScore.status === 'needs-improvement' ? '⚠️ Needs Work' : '❌ Poor'}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>LCP:</span>
                    <span className={getStatusColor(performanceData.googleAdsStandards.lcp.status)}>
                      {performanceData.googleAdsStandards.lcp.current ? `${Math.round(performanceData.googleAdsStandards.lcp.current)}ms` : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>FID:</span>
                    <span className={getStatusColor(performanceData.googleAdsStandards.fid.status)}>
                      {performanceData.googleAdsStandards.fid.current ? `${Math.round(performanceData.googleAdsStandards.fid.current)}ms` : 'N/A'}
                    </span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>CLS:</span>
                    <span className={getStatusColor(performanceData.googleAdsStandards.cls.status)}>
                      {performanceData.googleAdsStandards.cls.current ? performanceData.googleAdsStandards.cls.current.toFixed(3) : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>TTFB:</span>
                    <span className={getStatusColor(performanceData.googleAdsStandards.ttfb.status)}>
                      {performanceData.googleAdsStandards.ttfb.current ? `${Math.round(performanceData.googleAdsStandards.ttfb.current)}ms` : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>

              {performanceData.recommendations.length > 0 && (
                <div className="text-xs text-gray-300">
                  <div className="font-semibold mb-1">Top Priority:</div>
                  <div>{performanceData.recommendations[0]}</div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center text-gray-400">
              Loading performance data...
            </div>
          )}
          
          <div className="text-xs text-gray-500 mt-3 text-center">
            Press Ctrl+Shift+P to hide
          </div>
        </div>
      )}
    </>
  )
} 