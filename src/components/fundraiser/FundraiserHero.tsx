'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function FundraiserHero() {
  const [isHovered, setIsHovered] = useState(false)
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

  return (
    <>
      <section className="min-h-screen flex items-center justify-center px-4 py-16 relative">
        {/* Content container - centered in middle third */}
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Main heading */}
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="block">Support Travis&apos;s</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Journey
            </span>
          </motion.h1>
          
          {/* Subtitle */}
          <motion.p 
            className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Every contribution helps make dreams come true. Join me on this incredible adventure.
          </motion.p>
          
          {/* CTA Button */}
          <motion.div 
            className="pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className={`
                px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform
                hover:scale-105 active:scale-95
                ${isHovered 
                  ? 'shadow-2xl shadow-blue-500/25' 
                  : 'shadow-lg'
                }
                bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700
                text-white border-2 border-white/20
                focus:outline-none focus:ring-4 focus:ring-blue-500/50
              `}
            >
              Back the Vision
            </button>
          </motion.div>
          
          {/* Decorative elements */}
          <motion.div 
            className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl"
            animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </div>
      </section>

      {/* Sticky CTA for mobile */}
      {showStickyCTA && (
        <motion.div
          className="fixed bottom-4 left-4 right-4 z-50 md:hidden"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
        >
          <button className="w-full px-6 py-4 text-lg font-semibold rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl border-2 border-white/20 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 active:scale-95">
            Back the Vision
          </button>
        </motion.div>
      )}
    </>
  )
} 