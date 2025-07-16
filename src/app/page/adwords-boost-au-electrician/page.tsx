'use client'

import React, { Suspense, lazy } from 'react'

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
        
        /* Optimized animations for mobile-first performance */
        @keyframes gentle-bounce {
          0%, 100% { transform: translateY(0px) scaleX(-1); }
          50% { transform: translateY(-10px) scaleX(-1); }
        }
        
        @keyframes smooth-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        
        @keyframes ring-pulse {
          0% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 0.4; }
          100% { transform: scale(1.2); opacity: 0; }
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
        
        /* Optimized for mobile performance */
        @media (max-width: 768px) {
          .animate-pulse {
            animation-duration: 2s !important;
          }
          .animate-bounce {
            animation-duration: 1.5s !important;
          }
        }
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
    </>
  )
} 