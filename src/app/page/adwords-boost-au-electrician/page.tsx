'use client'

import React from 'react'

// Import custom Adwords modules (we'll build these next)
import { AdwordsHeroPromo } from '@/components/modules/Adwords/AdwordsHeroPromo'
import { TrustBanner } from '@/components/ui/TrustBanner'
import { AdwordsBenefitsGrid } from '@/components/modules/Adwords/AdwordsBenefitsGrid'
import { AdwordsHowItWorks } from '@/components/modules/Adwords/AdwordsHowItWorks'
import { AdwordsLeadForm } from '@/components/modules/Adwords/AdwordsLeadForm'
import { AdwordsTrustFooter } from '@/components/modules/Adwords/AdwordsTrustFooter'
import { TestimonialPopup } from '@/components/ui/TestimonialPopup'

export default function AdwordsBoostElectricianPage() {
  // For now, hardcode props per module
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
        <div className="relative w-full">
          <AdwordsHeroPromo />

          <AdwordsHowItWorks />

          <AdwordsBenefitsGrid
            benefits={[
              "GoogleAds / PPC\nSetup & Management",
              "Free Optimised\nLanding Page",
              "Leads Sent To\nPhone & Email",
              "90 Day Campaign\nPay only for 30*",
              "Weekly Reporting\nDedicated Support"
            ]}
          />

          <TrustBanner />

          <AdwordsLeadForm
            heading="Start Your 90-Day Campaign"
            subheading="We'll assign a local expert to you within 24h."
            fields={['name', 'email', 'phone', 'businessType']}
            ctaText="Get My Free Setup"
          />

          <AdwordsTrustFooter
            text="No spam. No contracts. Cancel anytime."
          />
        </div>
      </main>

      <TestimonialPopup />

    </>
  )
} 