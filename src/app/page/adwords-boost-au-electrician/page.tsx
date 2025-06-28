'use client'

import React from 'react'

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
      `}</style>
      <main className="bg-black text-white overflow-x-hidden w-full max-w-full">
        <AdwordsHeroPromo />

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

        <AdwordsHowItWorks
          heading="How It Works"
          steps={[
            {
              icon: 'plug',
              title: "Setup Campaign",
              description: "We build your Google Ads campaign and landing page in 24 hours"
            },
            {
              icon: 'tools',
              title: "Get Leads",
              description: "Leads come straight to your phone via SMS and email alerts"
            },
            {
              icon: 'roo',
              title: "Book Jobs",
              description: "Convert leads into paying customers with our proven system"
            }
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
    </>
  )
} 