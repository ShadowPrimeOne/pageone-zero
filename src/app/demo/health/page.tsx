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

export default function HealthDemoPage() {
  return (
    <div className="relative bg-gray-50 min-h-screen pb-24 scrollbar-hide">
      <FixedScrollingBanner text="🦷 New Patient Offer: $99 Checkup & Clean! Book Your Spot Today." />
      <div className="pt-12" />
      <HeroSection
        headline="Family-Friendly Dental & Health Care"
        subheadline="Now welcoming new patients! Modern clinic, gentle care, and flexible hours."
        ctaText="Book My Spot"
        onCtaClick={() => {}}
      />
      <OfferModule
        offerText="Gap-Free for Health Funds"
        promoDetail="$99 for new patients without health cover. Offer ends soon!"
        expiry="August 15, 2024"
      />
      <ServicesList
        services={[
          { label: 'Whitening' },
          { label: 'Braces & Invisalign' },
          { label: 'Emergency Dental' },
          { label: 'Checkups & Cleans' },
          { label: 'Children’s Dentistry' },
          { label: 'Physio & Allied Health' },
        ]}
      />
      <TrustBadges
        badges={[
          { img: '/IMAGES/Trust Banner/google-partner-logo-png_seeklogo-428155.png', alt: 'Google Partner' },
          { img: '/IMAGES/Trust Banner/Smiths_Logo.png', alt: 'Smiths' },
          { img: '/IMAGES/Trust Banner/Tesla Energy.webp', alt: 'Tesla' },
          { img: '/IMAGES/Trust Banner/PM Chamber of commerce.png', alt: 'Chamber of Commerce' },
        ]}
      />
      <GoogleReviewModule />
      <LeadForm
        fields={[
          { label: 'Full Name', type: 'text', name: 'name' },
          { label: 'Phone', type: 'tel', name: 'phone' },
          { label: 'Email', type: 'email', name: 'email' },
          { label: 'Preferred Time', type: 'text', name: 'preferredTime' },
        ]}
        onSubmit={() => {}}
      />
      <MapEmbed
        embedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.953736315904!3d-37.81627974202198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f1f1f1f1%3A0x5045675218ce6e0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1620211234567!5m2!1sen!2sus"
        label="Clinic Location"
      />
      <FooterCTA
        text="Book your appointment or call our team now."
        phone="1800654321"
        ctaLabel="Book Now"
      />
    </div>
  );
} 