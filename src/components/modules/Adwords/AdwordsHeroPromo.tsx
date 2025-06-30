'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { AnimatedPhoneUnit } from './AnimatedPhoneUnit'
// Remove the broken import
// import heroBG from '@/Electrical_LP/hero_powergrid_bg.webp'

export const AdwordsHeroPromo: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 4,
    minutes: 21,
    seconds: 15
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        let { hours, minutes, seconds } = prevTime
        
        if (seconds > 0) {
          seconds--
        } else if (minutes > 0) {
          minutes--
          seconds = 59
        } else if (hours > 0) {
          hours--
          minutes = 59
          seconds = 59
        }
        
        return { hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (time: number) => time.toString().padStart(2, '0')

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
        className="relative w-full h-[90vh] bg-no-repeat bg-cover text-white flex flex-col justify-between pt-16 hero-bg-section"
        style={{ 
          backgroundImage: `url('/ElectricalLP/hero_powergrid_bg.webp')`
        }}
      >
        <style jsx>{`
          .hero-bg-section {
            background-position: 70% 10% !important;
          }
          
          @media (min-width: 768px) {
            .hero-bg-section {
              background-position: center 80% !important;
            }
          }
          
          @keyframes heroBoxyFloat {
            0%, 100% { 
              transform: translateY(-20px) translateX(-8px);
            }
            50% { 
              transform: translateY(-40px) translateX(-8px);
            }
          }
          
          @media (min-width: 768px) {
            @keyframes heroBoxyFloat {
              0%, 100% { 
                transform: translateY(-32px) translateX(-32px);
              }
              50% { 
                transform: translateY(-52px) translateX(-32px);
              }
            }
          }
          
          /* BULLETPROOF BADGE SIZING - FINAL VERSION */
          .hero-badge-bulletproof-2024 {
            width: 80px !important;
            height: 80px !important;
            min-width: 80px !important;
            min-height: 80px !important;
            max-width: 80px !important;
            max-height: 80px !important;
            flex-shrink: 0 !important;
            object-fit: contain !important;
            display: block !important;
            box-sizing: border-box !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          
          @media (min-width: 768px) {
            .hero-badge-bulletproof-2024 {
              width: 120px !important;
              height: 120px !important;
              min-width: 120px !important;
              min-height: 120px !important;
              max-width: 120px !important;
              max-height: 120px !important;
            }
          }
          
          /* Override Next.js Image component styles */
          .hero-badge-bulletproof-2024 img {
            width: 100% !important;
            height: 100% !important;
            object-fit: contain !important;
            max-width: none !important;
            min-width: none !important;
            max-height: none !important;
            min-height: none !important;
          }
          
          /* Override any global image styles */
          img.hero-badge-bulletproof-2024 {
            width: 80px !important;
            height: 80px !important;
            min-width: 80px !important;
            min-height: 80px !important;
            max-width: 80px !important;
            max-height: 80px !important;
          }
          
          @media (min-width: 768px) {
            img.hero-badge-bulletproof-2024 {
              width: 120px !important;
              height: 120px !important;
              min-width: 120px !important;
              min-height: 120px !important;
              max-width: 120px !important;
              max-height: 120px !important;
            }
          }
          
          /* Override Tailwind and any other framework */
          .hero-badge-bulletproof-2024[style] {
            width: 80px !important;
            height: 80px !important;
            min-width: 80px !important;
            min-height: 80px !important;
            max-width: 80px !important;
            max-height: 80px !important;
          }
          
          @media (min-width: 768px) {
            .hero-badge-bulletproof-2024[style] {
              width: 120px !important;
              height: 120px !important;
              min-width: 120px !important;
              min-height: 120px !important;
              max-width: 120px !important;
              max-height: 120px !important;
            }
          }
          
          /* Mobile-specific positioning */
          @media (max-width: 767px) {
            .hero-cta-container {
              margin-top: 0px !important;
              transform: translateY(20px) !important;
            }
          }
        `}</style>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-transparent z-0" style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 2%, rgba(0,0,0,0.98) 4%, rgba(0,0,0,0.96) 6%, rgba(0,0,0,0.94) 8%, rgba(0,0,0,0.92) 10%, rgba(0,0,0,0.9) 12%, rgba(0,0,0,0.88) 14%, rgba(0,0,0,0.86) 15%, rgba(0,0,0,0.84) 16%, rgba(0,0,0,0.82) 17%, rgba(0,0,0,0.8) 18%, rgba(0,0,0,0.78) 19%, rgba(0,0,0,0.76) 20%, rgba(0,0,0,0.74) 21%, rgba(0,0,0,0.72) 22%, rgba(0,0,0,0.7) 23%, rgba(0,0,0,0.68) 24%, rgba(0,0,0,0.66) 25%, rgba(0,0,0,0.64) 26%, rgba(0,0,0,0.62) 27%, rgba(0,0,0,0.6) 28%, rgba(0,0,0,0.58) 29%, rgba(0,0,0,0.56) 30%, rgba(0,0,0,0.54) 31%, rgba(0,0,0,0.52) 32%, rgba(0,0,0,0.5) 33%, rgba(0,0,0,0.48) 34%, rgba(0,0,0,0.46) 35%, rgba(0,0,0,0.44) 36%, rgba(0,0,0,0.42) 37%, rgba(0,0,0,0.4) 38%, rgba(0,0,0,0.38) 39%, rgba(0,0,0,0.36) 40%, rgba(0,0,0,0.34) 41%, rgba(0,0,0,0.32) 42%, rgba(0,0,0,0.3) 43%, rgba(0,0,0,0.28) 44%, rgba(0,0,0,0.26) 45%, rgba(0,0,0,0.24) 46%, rgba(0,0,0,0.22) 47%, rgba(0,0,0,0.2) 48%, rgba(0,0,0,0.18) 49%, rgba(0,0,0,0.16) 50%, rgba(0,0,0,0.14) 51%, rgba(0,0,0,0.12) 52%, rgba(0,0,0,0.1) 53%, rgba(0,0,0,0.08) 54%, rgba(0,0,0,0.06) 55%, rgba(0,0,0,0.04) 56%, rgba(0,0,0,0.02) 57%, rgba(0,0,0,0) 58%)'
        }} />

        {/* Bottom transition overlay to white */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent z-10"></div>

        {/* All hero content with unified fade-in */}
        <div className="relative z-50 w-full h-full flex flex-col justify-between animate-fadeInUp max-w-7xl mx-auto">
          {/* Top Content - Heading & Subheading */}
          <div className="w-full max-w-[90%] sm:max-w-screen-sm mx-auto px-4 text-left pt-[4vh] sm:pt-[5vh]">
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
          <div className="hero-boxy-container absolute top-[12vh] right-2 md:top-[20vh] md:right-8 pointer-events-none z-40 transform -translate-y-16 -translate-x-4 md:-translate-y-32 md:-translate-x-32">
            <Image
              src="/IMAGES/BOXY/Boxy Flying Electric-flipped.png"
              alt="Boxy Flying Electric"
              width={200}
              height={200}
              className="hero-boxy-image w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 opacity-80"
              style={{
                filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3))',
                animation: 'heroBoxyFloat 6s ease-in-out infinite'
              }}
              quality={90}
              priority={false}
              sizes="(max-width: 768px) 128px, (max-width: 1024px) 160px, 192px"
            />
          </div>

          {/* Bottom Content - CTA */}
          <div className="w-full flex justify-center pb-[8vh] px-4">
            <div className="flex items-end space-x-0 md:space-x-6 -ml-12 md:ml-0">
              {/* Animated Phone Unit with responsive scaling */}
              <AnimatedPhoneUnit 
                scale="md"
                className="md:scale-125 lg:scale-150 -mb-6 md:-mb-1"
              />
              
              {/* CTA Button with Badges Above */}
              <div 
                className="relative -ml-4 md:ml-0 hero-cta-container"
                style={{
                  marginTop: '-10px',
                  transform: 'translateY(-5px)'
                }}
              >
                {/* Badges Section - Positioned above the button */}
                <div className="flex items-center justify-center mb-3 -space-x-2 absolute bottom-full left-1/2 transform -translate-x-1/2">
                  {/* Mobile First Badge */}
                  <div className="relative z-30">
                    <Image
                      src="/IMAGES/Badges/Mobile First Badge.png"
                      alt="Mobile First Badge"
                      width={100}
                      height={100}
                      className="hero-badge-bulletproof-2024 drop-shadow-lg"
                      quality={90}
                      style={{
                        width: '80px',
                        height: '80px',
                        minWidth: '80px',
                        minHeight: '80px',
                        maxWidth: '80px',
                        maxHeight: '80px',
                        objectFit: 'contain',
                        display: 'block',
                        flexShrink: 0
                      }}
                    />
                  </div>
                  
                  {/* People's Choice Badge */}
                  <div className="relative z-20">
                    <Image
                      src="/IMAGES/Badges/Peoples choice Badge.png"
                      alt="People's Choice Badge"
                      width={100}
                      height={100}
                      className="hero-badge-bulletproof-2024 drop-shadow-lg"
                      quality={90}
                      style={{
                        width: '80px',
                        height: '80px',
                        minWidth: '80px',
                        minHeight: '80px',
                        maxWidth: '80px',
                        maxHeight: '80px',
                        objectFit: 'contain',
                        display: 'block',
                        flexShrink: 0
                      }}
                    />
                  </div>
                  
                  {/* Google Adwords Gold Badge */}
                  <div className="relative z-10">
                    <Image
                      src="/IMAGES/Badges/Google Adwords Gold Partner.png"
                      alt="Google Adwords Gold Partner Badge"
                      width={100}
                      height={100}
                      className="hero-badge-bulletproof-2024 drop-shadow-lg"
                      quality={90}
                      style={{
                        width: '80px',
                        height: '80px',
                        minWidth: '80px',
                        minHeight: '80px',
                        maxWidth: '80px',
                        maxHeight: '80px',
                        objectFit: 'contain',
                        display: 'block',
                        flexShrink: 0
                      }}
                    />
                  </div>
                </div>
                
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
                
                {/* Scarcity Line - Mobile Responsive */}
                <div className="mt-2 text-center">
                  <p className="text-xs sm:text-sm font-semibold text-red-600 drop-shadow-sm">
                    🟡 Only 3 left — expires <span className="animate-pulse">{formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}</span>!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Spark SVG placeholder */}
          <div id="spark-glow" className="absolute bottom-[64px] right-[24px] z-0 w-24 h-24 pointer-events-none"></div>
        </div>
      </section>
    </>
  )
} 