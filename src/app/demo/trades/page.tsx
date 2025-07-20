"use client";

import React from 'react';
import FixedScrollingBanner from '@/components/landing/FixedScrollingBanner';
import HeroSection from '@/components/landing/HeroSection';
import OfferModule from '@/components/landing/OfferModule';
import ServicesList from '@/components/landing/ServicesList';
import GoogleReviewModule from '@/components/landing/GoogleReviewModule';
import ContactModule from '@/components/landing/ContactModule';
import FooterCTA from '@/components/landing/FooterCTA';
import OurWorkShowcase from '@/components/landing/OurWorkShowcase';

export default function TradesDemoPage() {
  return (
    <div className="relative min-h-screen pb-24 overflow-x-hidden scrollbar-hide">
      <FixedScrollingBanner text="⚡️ 24/7 Emergency Service — 10% Off for New Customers! Call Now." />
      <HeroSection
        headline="Same-Day Electrician, Plumber & Builder Services"
        subheadline="Fast, reliable trades for your home or business. Licensed, insured, and local."
        ctaText="Call for Fast Service"
        onCtaClick={() => {}}
        backgroundImage="/IMAGES/Trades Demo/Trade Hero bg.webp"
      />
      <section className="my-8 md:my-16">
        <OfferModule
          offerText="10% Off First Job + Free Callout"
          promoDetail="Mention this ad to claim your discount. No hidden fees."
          expiry="Ends Soon"
        />
      </section>
      <section className="my-8 md:my-16">
        <ServicesList
          services={[
            {
              label: 'Switches & Power',
              description: 'Upgrade or repair power points and light switches throughout your property. We ensure safe, tidy installs and reliable access wherever you need it.',
              icon: '/IMAGES/Trades Demo/Icons/Switches & Power Icon.webp'
            },
            {
              label: 'Lighting & Fans',
              description: 'From new downlights to ceiling fans, we handle all lighting upgrades, repairs, and installations—indoor or outdoor, bright and efficient every time.',
              icon: '/IMAGES/Trades Demo/Icons/Lighting & Fans.webp'
            },
            {
              label: 'Smoke Alarms',
              description: 'Protect your family or business with professional smoke alarm installation, testing, and compliance checks. Peace of mind, guaranteed.',
              icon: '/IMAGES/Trades Demo/Icons/Smoke and Fire alarms.webp'
            },
            {
              label: 'Hot Water Repairs',
              description: 'Fast troubleshooting and repair of electric hot water systems—restoring hot water to your home or workplace with minimal downtime.',
              icon: '/IMAGES/Trades Demo/Icons/Hot Water Service Repairs.webp'
            },
            {
              label: 'Emergency Callouts',
              description: '24/7 rapid response for urgent electrical faults, power loss, or safety hazards. One call and we’re on the way—day or night.',
              icon: '/IMAGES/Trades Demo/Icons/Emergency Service Calls.webp'
            },
            {
              label: 'Renovations & Fitouts',
              description: 'Complete wiring, upgrades, and electrical fitouts for renovations, new builds, or shop refits. Expert advice and finish, start to finish.',
              icon: '/IMAGES/Trades Demo/Icons/Renovations & Fitouts.webp'
            },
          ]}
        />
      </section>
      <section className="my-8 md:my-16">
        <OurWorkShowcase />
      </section>
      <section className="my-8 md:my-16">
        <GoogleReviewModule />
      </section>
      <section className="my-8 md:my-16 mb-32 md:mb-40">
        <ContactModule
          address="123 Trades Avenue, Sydney NSW 2000"
          abn="12 345 678 910"
          phone="1800 432 100"
          email="hello@tradesdemo.com.au"
          mapEmbedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.953736315904!3d-37.81627974202198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f1f1f1f1%3A0x5045675218ce6e0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1620211234567!5m2!1sen!2sus"
        />
      </section>
      <FooterCTA
        text="Need a Tradie Fast? Call Now."
        phone="1800432100"
        ctaLabel="Call Now"
      />
      <style jsx global>{`
        [data-testimonial] {
          bottom: 4.2rem !important;
        }
      `}</style>
    </div>
  );
} 