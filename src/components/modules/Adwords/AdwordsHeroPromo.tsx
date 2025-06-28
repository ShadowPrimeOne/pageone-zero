'use client'

import React from 'react'
import { AnimatedPhoneUnit } from './AnimatedPhoneUnit'
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
        className="relative w-full h-[100vh] bg-no-repeat bg-cover bg-[70%_center] sm:bg-[center_80%] text-white flex flex-col justify-between pt-16"
        style={{ backgroundImage: `url('/ElectricalLP/hero_powergrid_bg.webp')` }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-transparent z-0" style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 2%, rgba(0,0,0,0.98) 4%, rgba(0,0,0,0.96) 6%, rgba(0,0,0,0.94) 8%, rgba(0,0,0,0.92) 10%, rgba(0,0,0,0.9) 12%, rgba(0,0,0,0.88) 14%, rgba(0,0,0,0.86) 16%, rgba(0,0,0,0.84) 18%, rgba(0,0,0,0.82) 20%, rgba(0,0,0,0.8) 22%, rgba(0,0,0,0.78) 24%, rgba(0,0,0,0.76) 26%, rgba(0,0,0,0.74) 28%, rgba(0,0,0,0.72) 30%, rgba(0,0,0,0.7) 32%, rgba(0,0,0,0.68) 34%, rgba(0,0,0,0.66) 36%, rgba(0,0,0,0.64) 38%, rgba(0,0,0,0.62) 40%, rgba(0,0,0,0.6) 42%, rgba(0,0,0,0.58) 44%, rgba(0,0,0,0.56) 46%, rgba(0,0,0,0.54) 48%, rgba(0,0,0,0.52) 50%, rgba(0,0,0,0.5) 52%, rgba(0,0,0,0.48) 54%, rgba(0,0,0,0.46) 56%, rgba(0,0,0,0.44) 58%, rgba(0,0,0,0.42) 60%, rgba(0,0,0,0.4) 62%, rgba(0,0,0,0.38) 64%, rgba(0,0,0,0.36) 66%, rgba(0,0,0,0.34) 68%, rgba(0,0,0,0.32) 70%, rgba(0,0,0,0.3) 72%, rgba(0,0,0,0.28) 74%, rgba(0,0,0,0.26) 76%, rgba(0,0,0,0.24) 78%, rgba(0,0,0,0.22) 80%, rgba(0,0,0,0.2) 82%, rgba(0,0,0,0.18) 84%, rgba(0,0,0,0.16) 86%, rgba(0,0,0,0.14) 88%, rgba(0,0,0,0.12) 90%, rgba(0,0,0,0.1) 92%, rgba(0,0,0,0.08) 94%, rgba(0,0,0,0.06) 96%, rgba(0,0,0,0.04) 98%, rgba(0,0,0,0.02) 99%, rgba(0,0,0,0) 100%)'
        }} />

        {/* All hero content with unified fade-in */}
        <div className="relative z-10 w-full h-full flex flex-col justify-between animate-fadeInUp">
          {/* Top Content - Heading & Subheading */}
          <div className="w-full max-w-[90%] sm:max-w-screen-sm mx-auto px-4 text-center pt-[8vh] sm:pt-[5vh]">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-poppins leading-tight mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-green-400 via-green-300 to-green-400 bg-clip-text text-transparent text-4xl sm:text-5xl lg:text-6xl drop-shadow-[0_6px_12px_rgba(0,0,0,0.9)] animate-pulse hover:scale-105 transition-transform duration-300" style={{
                animation: 'pulse 3s ease-in-out infinite, glow 2s ease-in-out infinite alternate'
              }}>
                SERIOUS GROWTH
              </span>
              <br />
              <span className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] text-xl sm:text-3xl lg:text-4xl font-semibold">
                For Your Electrical Business
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 bg-clip-text text-transparent animate-pulse text-lg sm:text-xl lg:text-2xl">
                — People Powered, Results Driven
              </span>
            </h1>
            <p className="text-lg sm:text-2xl font-inter text-gray-200 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] max-w-2xl mx-auto leading-relaxed">
              Get 90 days of real PPC leads + a $500+ landing page — built by elite mobile-first marketers.
            </p>
          </div>

          {/* Bottom Content - CTA */}
          <div className="w-full flex justify-center pb-[8vh] px-4">
            <div className="flex items-center space-x-0 md:space-x-6">
              {/* Animated Phone Unit with responsive scaling */}
              <AnimatedPhoneUnit 
                scale="md"
                className="md:scale-125 lg:scale-150"
              />
              
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
        </div>

        {/* Spark SVG placeholder */}
        <div id="spark-glow" className="absolute bottom-[64px] right-[24px] z-0 w-24 h-24 pointer-events-none"></div>
      </section>
    </>
  )
} 