'use client'

import React from 'react'
import Image from 'next/image'

// Import custom Adwords modules (we'll build these next)
import { AdwordsHeroPromo } from '@/components/modules/Adwords/AdwordsHeroPromo'
import { TrustBanner } from '@/components/ui/TrustBanner'
import { AdwordsBenefitsGrid } from '@/components/modules/Adwords/AdwordsBenefitsGrid'
import { AdwordsHowItWorks } from '@/components/modules/Adwords/AdwordsHowItWorks'
import { AdwordsTestimonialsDynamic } from '@/components/modules/Adwords/AdwordsTestimonialsDynamic'
import { AdwordsUrgencyBanner } from '@/components/modules/Adwords/AdwordsUrgencyBanner'
import { AdwordsLeadForm } from '@/components/modules/Adwords/AdwordsLeadForm'
import { AdwordsTrustFooter } from '@/components/modules/Adwords/AdwordsTrustFooter'

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
      `}</style>
      <main className="bg-black text-white overflow-x-hidden w-full max-w-full relative">
        <AdwordsHeroPromo />

        <AdwordsHowItWorks />

        <TrustBanner />

        <AdwordsBenefitsGrid
          heading="What's Included"
          benefits={[
            "Google Ads setup + daily optimisation",
            "FREE landing page, built for electricians",
            "Leads sent straight to your phone or email",
            "90 days of exposure — pay only for 1 month",
            "Automated responses, proactive funneling"
          ]}
        />

        <AdwordsTestimonialsDynamic
          testimonials={[
            {
              name: "Ben",
              title: "Electrician, Sydney",
              quote: "I booked 3 new jobs in 48 hours. Best campaign I've ever run."
            },
            {
              name: "Lisa",
              title: "Tutor, Singapore",
              quote: "I got 14 student leads in 2 weeks. The landing page converts like crazy."
            }
          ]}
        />

        <AdwordsUrgencyBanner
          text="⚡ Only 5 free landing pages left — offer ends in"
          countdown="2 days 14 hours"
        />

        <AdwordsLeadForm
          heading="Start Your 90-Day Campaign"
          subheading="We'll assign a local expert to you within 24h."
          fields={['name', 'email', 'phone', 'businessType']}
          ctaText="Get My Free Setup"
        />

        <AdwordsTrustFooter
          text="No spam. No contracts. Cancel anytime."
        />
      </main>

      {/* Boxy pinned to bottom right */}
      <div className="fixed bottom-4 right-4 z-[9999] pointer-events-none">
        <Image 
          src="/IMAGES/How it works/Boxy the page one automation exoert..png" 
          alt="Boxy" 
          width={160} 
          height={160} 
          className="w-20 h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 xl:w-40 xl:h-40" 
          style={{
            filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3))',
            animation: 'gentle-bounce 3s ease-in-out infinite'
          }}
        />
      </div>
    </>
  )
} 