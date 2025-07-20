"use client";
import React, { Suspense, lazy, useEffect } from 'react';
import FixedScrollingBanner from '@/components/landing/FixedScrollingBanner';
import HeroSection from '@/components/landing/HeroSection';
import OfferModule from '@/components/landing/OfferModule';
import ServicesList from '@/components/landing/ServicesList';
import TrustBadges from '@/components/landing/TrustBadges';
import LeadForm from '@/components/landing/LeadForm';
import FooterCTA from '@/components/landing/FooterCTA';
import { TrustBanner } from '@/components/ui/TrustBanner';

const GoogleReviewModule = lazy(() => import('@/components/landing/GoogleReviewModule'));
const MapEmbed = lazy(() => import('@/components/landing/MapEmbed'));

export default function Trades2Page() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="relative bg-gray-50 min-h-screen w-full text-gray-900 font-sans">
      <FixedScrollingBanner text="⚡️ 24/7 Emergency Service — 10% Off for New Customers! Call Now." />
      <HeroSection
        headline="Same-Day Electrician, Plumber & Builder Services"
        subheadline="Fast, reliable trades for your home or business. Licensed, insured, and local."
        ctaText="Call for Fast Service"
        onCtaClick={() => {}}
      />
      <section className="max-w-3xl mx-auto w-full px-4 py-8">
        <OfferModule
          offerText="10% Off First Job + Free Callout"
          promoDetail="Mention this ad to claim your discount. No hidden fees."
          expiry="Ends Soon"
        />
      </section>
      <section className="max-w-4xl mx-auto w-full px-4 py-8">
        <ServicesList
          services={[
            { label: 'Switches & Power' },
            { label: 'Lighting & Fans' },
            { label: 'Smoke Alarms' },
            { label: 'Hot Water Repairs' },
            { label: 'Emergency Callouts' },
            { label: 'Renovations & Fitouts' },
          ]}
        />
      </section>
      <section className="max-w-4xl mx-auto w-full px-4 py-8">
        <TrustBadges
          badges={[
            { img: '/IMAGES/Trust Banner/google-partner-logo-png_seeklogo-428155.png', alt: 'Google Partner' },
            { img: '/IMAGES/Trust Banner/Energy Safe Vic.avif', alt: 'Energy Safe' },
            { img: '/IMAGES/Trust Banner/Jetstar.png', alt: 'Jetstar' },
            { img: '/IMAGES/Trust Banner/Hertz.png', alt: 'Hertz' },
          ]}
        />
      </section>
      <section className="max-w-4xl mx-auto w-full px-4 py-8">
        <TrustBanner />
      </section>
      <section className="max-w-3xl mx-auto w-full px-4 py-8">
        <Suspense fallback={<div className="text-center py-8">Loading reviews…</div>}>
          <GoogleReviewModule />
        </Suspense>
      </section>
      <section className="max-w-2xl mx-auto w-full px-4 py-8">
        <LeadForm
          fields={[
            { label: 'Name', type: 'text', name: 'name' },
            { label: 'Phone', type: 'tel', name: 'phone' },
            { label: 'Job Type', type: 'select', name: 'jobType', options: ['Electrical', 'Plumbing', 'Building', 'Other'] },
          ]}
          onSubmit={() => {}}
        />
      </section>
      <section className="max-w-2xl mx-auto w-full px-4 py-8">
        <Suspense fallback={<div className="text-center py-8">Loading map…</div>}>
          <MapEmbed
            embedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.953736315904!3d-37.81627974202198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f1f1f1f1%3A0x5045675218ce6e0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1620211234567!5m2!1sen!2sus"
            label="Local Service Area"
          />
        </Suspense>
      </section>
      <FooterCTA
        text="Need a Tradie Fast? Call Now."
        phone="1800432100"
        ctaLabel="Call Now"
      />
    </div>
  );
} 