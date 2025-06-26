'use client'

import React from 'react'

// Import custom Adwords modules (we'll build these next)
import { AdwordsHeroPromo } from '@/components/modules/Adwords/AdwordsHeroPromo'
import { AdwordsBenefitsGrid } from '@/components/modules/Adwords/AdwordsBenefitsGrid'
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
        <AdwordsHeroPromo
          heading="Book More Jobs — With Just One Ad Payment"
          subheading="We'll run your Google Ads for 3 months — build your landing page free — and send every lead straight to your phone."
          ctaText="Get 90 Days of Leads"
          background={{
            type: 'image',
            url: 'https://xkpxwcrxjgjmbxgupkhq.supabase.co/storage/v1/object/public/public-images/modules/Landingpage/Electrician%20Adwords%20Leads.png',
            overlay: { color: '#000000', opacity: 0.6 }
          }}
          trustStrip="✅ No Lock-In • Free Page • Instant Lead Alerts"
        />

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
    </>
  )
} 