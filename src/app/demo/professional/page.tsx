"use client";

import React from 'react';
import FixedScrollingBanner from '@/components/landing/FixedScrollingBanner';
import HeroSection from '@/components/landing/HeroSection';
import OfferModule from '@/components/landing/OfferModule';
import ServicesList from '@/components/landing/ServicesList';
import TrustBadges from '@/components/landing/TrustBadges';
import GoogleReviewModule from '@/components/landing/GoogleReviewModule';
import LeadForm from '@/components/landing/LeadForm';
import MapEmbed from '@/components/landing/MapEmbed';
import FooterCTA from '@/components/landing/FooterCTA';
// import { TrustBanner } from '@/components/ui/TrustBanner';

export default function ProfessionalDemoPage() {
  return (
    <div className="relative bg-gray-50 min-h-screen pb-24 scrollbar-hide">
      <FixedScrollingBanner text="⚡️ Limited Time: Free Consultation for New Clients! Book Today." />
      <div className="pt-12" />
      <HeroSection
        headline="Expert Accounting & Legal Advice, On Demand"
        subheadline="Get tailored solutions for your business or personal needs. Fast, confidential, and affordable."
        ctaText="Book Free Consult"
        icon={<span role="img" aria-label="briefcase">💼</span>}
        onCtaClick={() => {}}
      />
      <OfferModule
        offerText="Free 30-Minute Consultation"
        promoDetail="No obligation. Meet with a senior advisor and get actionable insights."
        expiry="July 31, 2024"
      />
      <ServicesList
        services={[
          { label: 'Tax & Compliance' },
          { label: 'Business Structuring' },
          { label: 'Contracts & Legal Advice' },
          { label: 'Bookkeeping & Payroll' },
          { label: 'Trust & Estate Planning' },
          { label: 'Startup Advisory' },
        ]}
      />
      <TrustBadges
        badges={[
          { img: '/IMAGES/Trust Banner/google-partner-logo-png_seeklogo-428155.png', alt: 'Google Partner' },
          { img: '/IMAGES/Trust Banner/PM Chamber of commerce.png', alt: 'Chamber of Commerce' },
          { img: '/IMAGES/Trust Banner/commonwealth-bank-logo-png_seeklogo-219412.png', alt: 'CBA' },
          { img: '/IMAGES/Trust Banner/Smiths_Logo.png', alt: 'Smiths' },
        ]}
      />
      {/* <TrustBanner /> */}
      <GoogleReviewModule />
      <LeadForm
        fields={[
          { label: 'Full Name', type: 'text', name: 'name' },
          { label: 'Email', type: 'email', name: 'email' },
          { label: 'Phone', type: 'tel', name: 'phone' },
          { label: 'Service Needed', type: 'text', name: 'service' },
        ]}
        onSubmit={() => {}}
      />
      <MapEmbed
        embedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.953736315904!3d-37.81627974202198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f1f1f1f1%3A0x5045675218ce6e0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1620211234567!5m2!1sen!2sus"
        label="Our Office Location"
      />
      <FooterCTA
        text="Questions? Call or Email Our Team Now."
        phone="1800123456"
        email="info@proadvice.com"
        ctaLabel="Call Now"
      />
    </div>
  );
} 