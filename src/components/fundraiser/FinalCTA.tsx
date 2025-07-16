'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function FinalCTA() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section className="py-24 px-4 relative">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        {/* Main message */}
        <motion.div 
          className="space-y-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-3xl md:text-5xl font-bold text-white leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="block">Ready to Join</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              The Adventure?
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Every contribution, no matter how small, helps make this journey possible. 
            Together, we can create something extraordinary.
          </motion.p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`
              px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform
              hover:scale-105 active:scale-95
              ${isHovered 
                ? 'shadow-2xl shadow-green-500/25' 
                : 'shadow-lg'
              }
              bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700
              text-white border-2 border-white/20 min-w-[200px]
              focus:outline-none focus:ring-4 focus:ring-green-500/50
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Help Launch This
          </motion.button>
          
          <motion.button 
            className="px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white hover:bg-white/20 min-w-[200px] focus:outline-none focus:ring-4 focus:ring-white/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </motion.button>
        </motion.div>

        {/* Trust indicators */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, staggerChildren: 0.2 }}
          viewport={{ once: true }}
        >
          {[
            {
              icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
              title: "Secure & Safe",
              description: "Your contribution is protected with bank-level security",
              color: "green"
            },
            {
              icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
              title: "Transparent",
              description: "See exactly how your support makes a difference",
              color: "blue"
            },
            {
              icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
              title: "From the Heart",
              description: "Every contribution comes with genuine gratitude",
              color: "purple"
            }
          ].map((trust, index) => (
            <motion.div 
              key={index}
              className="text-center p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className={`w-12 h-12 bg-${trust.color}-500/20 rounded-full flex items-center justify-center mx-auto mb-4`}>
                <svg className={`w-6 h-6 text-${trust.color}-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={trust.icon} />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{trust.title}</h3>
              <p className="text-sm text-white/70">{trust.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Social proof */}
        <motion.div 
          className="pt-12 border-t border-white/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-white/60">
            Join <span className="text-white font-semibold">500+ supporters</span> who have already contributed to this journey
          </p>
        </motion.div>

        {/* Decorative elements */}
        <motion.div 
          className="absolute top-1/3 left-1/4 w-40 h-40 bg-green-500/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>
    </section>
  )
} 