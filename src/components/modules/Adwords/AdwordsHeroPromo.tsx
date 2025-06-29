'use client'

import React from 'react'
import Image from 'next/image'
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
          background: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 2%, rgba(0,0,0,0.98) 4%, rgba(0,0,0,0.96) 6%, rgba(0,0,0,0.94) 8%, rgba(0,0,0,0.92) 10%, rgba(0,0,0,0.9) 12%, rgba(0,0,0,0.88) 14%, rgba(0,0,0,0.86) 15%, rgba(0,0,0,0.84) 16%, rgba(0,0,0,0.82) 17%, rgba(0,0,0,0.8) 18%, rgba(0,0,0,0.78) 19%, rgba(0,0,0,0.76) 20%, rgba(0,0,0,0.74) 21%, rgba(0,0,0,0.72) 22%, rgba(0,0,0,0.7) 23%, rgba(0,0,0,0.68) 24%, rgba(0,0,0,0.66) 25%, rgba(0,0,0,0.64) 26%, rgba(0,0,0,0.62) 27%, rgba(0,0,0,0.6) 28%, rgba(0,0,0,0.58) 29%, rgba(0,0,0,0.56) 30%, rgba(0,0,0,0.54) 31%, rgba(0,0,0,0.52) 32%, rgba(0,0,0,0.5) 33%, rgba(0,0,0,0.48) 34%, rgba(0,0,0,0.46) 35%, rgba(0,0,0,0.44) 36%, rgba(0,0,0,0.42) 37%, rgba(0,0,0,0.4) 38%, rgba(0,0,0,0.38) 39%, rgba(0,0,0,0.36) 40%, rgba(0,0,0,0.34) 41%, rgba(0,0,0,0.32) 42%, rgba(0,0,0,0.3) 43%, rgba(0,0,0,0.28) 44%, rgba(0,0,0,0.26) 45%, rgba(0,0,0,0.24) 46%, rgba(0,0,0,0.22) 47%, rgba(0,0,0,0.2) 48%, rgba(0,0,0,0.18) 49%, rgba(0,0,0,0.16) 50%, rgba(0,0,0,0.14) 51%, rgba(0,0,0,0.12) 52%, rgba(0,0,0,0.1) 53%, rgba(0,0,0,0.08) 54%, rgba(0,0,0,0.06) 55%, rgba(0,0,0,0.04) 56%, rgba(0,0,0,0.02) 57%, rgba(0,0,0,0) 58%)'
        }} />

        {/* Bottom transition overlay to white */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent z-10"></div>

        {/* All hero content with unified fade-in */}
        <div className="relative z-50 w-full h-full flex flex-col justify-between animate-fadeInUp max-w-7xl mx-auto">
          {/* Top Content - Heading & Subheading */}
          <div className="w-full max-w-[90%] sm:max-w-screen-sm mx-auto px-4 text-left pt-[8vh] sm:pt-[5vh]">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-poppins leading-tight mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-green-400 via-green-300 to-green-400 bg-clip-text text-transparent text-5xl sm:text-5xl lg:text-6xl drop-shadow-[0_6px_12px_rgba(0,0,0,0.9)] animate-pulse hover:scale-105 transition-transform duration-300" style={{
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
            <p className="text-lg sm:text-2xl font-inter text-gray-200 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] max-w-2xl leading-relaxed">
              Get 90 days of real PPC leads + a landing page worth over $500 — built by elite mobile-first marketers.
            </p>
          </div>

          {/* Boxy Flying Electric - positioned relative to hero section */}
          <div className="absolute top-[20vh] right-0 md:top-[15vh] md:right-8 pointer-events-none z-40 transform -translate-y-20 -translate-x-8 md:-translate-y-32 md:-translate-x-32">
            <Image
              src="/IMAGES/BOXY/Boxy Flying Electric-flipped.png"
              alt="Boxy Flying Electric"
              width={200}
              height={200}
              className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 opacity-80"
              style={{
                filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3))',
                animation: 'float 6s ease-in-out infinite'
              }}
              quality={90}
              priority={false}
              sizes="(max-width: 768px) 96px, (max-width: 1024px) 128px, 160px"
            />
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
                    background: 'linear-gradient(to right, #F9A825, #FF8C00)',
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