'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { AnimatedPhoneUnit } from './AnimatedPhoneUnit'

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
          
          /* Optimized badge sizing */
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
          
          /* Mobile-specific positioning */
          @media (max-width: 767px) {
            .hero-cta-container {
              margin-top: 0px !important;
              transform: translateY(20px) !important;
            }
          }
        `}</style>

        {/* Gradient Overlay - Simplified */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-transparent z-0" style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0) 100%)'
        }} />

        {/* Bottom transition overlay to white */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent z-10"></div>

        {/* All hero content with optimized fade-in */}
        <div className="relative z-50 w-full h-full flex flex-col justify-between max-w-7xl mx-auto">
          {/* Top Content - Heading & Subheading */}
          <div className="w-full max-w-[90%] sm:max-w-screen-sm mx-auto px-4 text-left pt-[4vh] sm:pt-[5vh]">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-poppins leading-tight mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-green-400 via-green-300 to-green-400 bg-clip-text text-transparent text-5xl sm:text-5xl lg:text-6xl drop-shadow-[0_6px_12px_rgba(0,0,0,0.9)] animate-pulse" style={{
                animation: 'smooth-pulse 3s ease-in-out infinite'
              }}>
                SERIOUS GROWTH
              </span>
              <br />
              <span className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] text-xl sm:text-3xl lg:text-4xl font-semibold">
                For Your Electrical Business
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 bg-clip-text text-transparent text-lg sm:text-xl lg:text-2xl">
                — People Powered, Results Driven
              </span>
            </h1>
            <p className="text-lg sm:text-2xl font-inter text-gray-200 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] max-w-2xl leading-relaxed">
              Get 90 days of real PPC leads + a landing page worth over $500 — built by elite mobile-first marketers.
            </p>
          </div>

          {/* Boxy Flying Electric - Optimized */}
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
              quality={85}
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
                      quality={85}
                      priority={true}
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
                      quality={85}
                      priority={true}
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
                      quality={85}
                      priority={true}
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