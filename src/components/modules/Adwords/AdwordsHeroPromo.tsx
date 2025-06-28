'use client'

import React from 'react'
import { AnimatedLogo } from './AnimatedLogo'
import { MobilePhoneIcon } from './LightBulbFlicker'
// Remove the broken import
// import heroBG from '@/Electrical_LP/hero_powergrid_bg.webp'

export const AdwordsHeroPromo: React.FC = () => {
  return (
    <>
      {/* Sticky Ticker - Always at top when scrolling */}
      <div className="ticker-wrapper sticky-ticker rounded-md">
        <div className="ticker-content">
          <span className="mx-8">⚡ 2 Months Free AdWords Management — Limited Offer</span>
          <span className="mx-8">💰 Free High-Performance Landing Page (Normally $500)</span>
          <span className="mx-8">🧑‍🔧 Real Aussie Support — No Bots. No BS.</span>
          <span className="mx-8">🔒 No Lock-In Contracts — Just Results</span>
          <span className="mx-8">🚨 Limited Availability - Claim your package now!</span>
          <span className="mx-8">🇦🇺 100% Australian owned and Run</span>
          <span className="mx-8">⚡ 2 Months Free AdWords Management — Limited Offer</span>
          <span className="mx-8">💰 Free High-Performance Landing Page (Normally $500)</span>
          <span className="mx-8">🧑‍🔧 Real Aussie Support — No Bots. No BS.</span>
          <span className="mx-8">🔒 No Lock-In Contracts — Just Results</span>
          <span className="mx-8">🚨 Limited Availability - Claim your package now!</span>
          <span className="mx-8">🇦🇺 100% Australian owned and Run</span>
        </div>
      </div>

      <section
        className="relative w-full h-[100vh] bg-no-repeat bg-cover bg-[60%_center] sm:bg-[center_80%] text-white flex flex-col justify-between pt-16"
        style={{ backgroundImage: `url('/ElectricalLP/hero_powergrid_bg.webp')` }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#263238dd] via-transparent to-transparent z-0" />

        {/* Top Content - Heading & Subheading */}
        <div className="relative z-10 w-full max-w-[90%] sm:max-w-screen-sm mx-auto px-4 text-center pt-[8vh] sm:pt-[5vh]">
          <h1 className="text-2xl sm:text-4xl font-bold font-poppins leading-tight drop-shadow mb-4">
            Serious Growth for Your Electrical Business — Powered by People
          </h1>
          <p className="text-sm sm:text-lg font-inter drop-shadow-sm">
            90 days of proven PPC success, guided by a real Aussie Ambassador, backed by the best in automation.
          </p>
        </div>

        {/* Bottom Content - CTA */}
        <div className="relative z-10 w-full flex justify-center pb-[8vh] px-4">
          <div className="flex items-center space-x-0 md:space-x-6">
            {/* Animated Logo + Mobile Phone */}
            <div className="flex flex-col items-center">
              <AnimatedLogo />
              <MobilePhoneIcon />
            </div>
            
            {/* CTA Button */}
            <div className="relative -ml-4 md:ml-0">
              <button
                className="relative text-black font-poppins font-bold tracking-wide whitespace-nowrap cta-button-responsive"
                style={{
                  background: 'linear-gradient(to right, #F9A825, transparent)',
                  display: 'inline-block',
                  cursor: 'pointer',
                  border: 'none',
                  outline: 'none',
                  position: 'relative',
                  zIndex: 10,
                  fontWeight: '700',
                  transition: 'all 0.3s ease',
                  textAlign: 'center'
                }}
              >
                Start Growing Today
              </button>
            </div>
          </div>
        </div>

        {/* Spark SVG placeholder */}
        <div id="spark-glow" className="absolute bottom-[64px] right-[24px] z-0 w-24 h-24 pointer-events-none"></div>
      </section>
    </>
  )
} 