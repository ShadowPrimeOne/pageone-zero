'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function HeroSection() {
  const [showStickyCTA, setShowStickyCTA] = useState(false)

  // Handle sticky CTA visibility on scroll
  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.querySelector('section')
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight
        setShowStickyCTA(window.scrollY > heroBottom - 100)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToCTA = () => {
    const ctaSection = document.querySelector('[data-section="cta"]')
    if (ctaSection) {
      ctaSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <section className="min-h-screen flex items-center justify-center px-4 py-16 pb-32 relative">
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid grid-cols-1 gap-12 items-center">
            {/* Content */}
            <motion.div 
              className="text-center space-y-8 -mt-8 lg:mt-0"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#2D2D2D] leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Mobile-first tools for a future where people still matter.
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl text-[#4B4453] max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Helping small businesses grow, one click at a time.
              </motion.p>
            </motion.div>

            {/* Floating Toolbox Icon */}
            <motion.div 
              className="relative flex justify-center items-center lg:pt-8"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.div 
                className="relative w-80 h-80 md:w-96 md:h-96 lg:w-[600px] lg:h-[600px]"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src="/IMAGES/Fundraising/Hero Toolbox icon.png"
                  alt="Mobile Tools Icon"
                  fill
                  sizes="(max-width: 768px) 320px, (max-width: 1024px) 384px, 600px"
                  className="object-contain"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sticky CTA for mobile */}
      {showStickyCTA && (
        <motion.div
          className="fixed bottom-4 left-4 right-4 z-50 lg:hidden"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
        >
          <button 
            onClick={scrollToCTA}
            className="w-full px-6 py-4 text-lg font-semibold rounded-full bg-[#376E6F] text-white shadow-2xl hover:bg-[#2D5A5B] transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            Get Involved
          </button>
        </motion.div>
      )}
    </>
  )
} 