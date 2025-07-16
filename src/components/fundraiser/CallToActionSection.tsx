'use client'

import { motion } from 'framer-motion'

export default function CallToActionSection() {
  return (
    <section className="py-24 px-4 relative" data-section="cta">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2 
          className="text-3xl md:text-4xl font-semibold text-[#2D2D2D] mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Join our pre-seed circle
        </motion.h2>
        
        <motion.div 
          className="space-y-8 text-[#4B4453] text-lg leading-relaxed mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p>
            I&apos;m raising <span className="font-semibold text-[#376E6F]">$30,000 AUD</span> from friends, family, and believers.
          </p>
          
          <div className="space-y-4">
            <p>This gets us to cashflow, proven users, and a proper seed round.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <motion.div 
                className="p-6 rounded-2xl border-2 border-[#376E6F]/20 bg-white/50 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.8)" }}
              >
                <div className="text-2xl font-bold text-[#376E6F] mb-2">$500</div>
                <div className="text-[#4B4453] font-medium">Early contributor tier</div>
                <div className="text-sm text-[#4B4453]/70 mt-2">Claim product or future shares</div>
              </motion.div>
              
              <motion.div 
                className="p-6 rounded-2xl border-2 border-[#376E6F]/20 bg-white/50 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.8)" }}
              >
                <div className="text-2xl font-bold text-[#376E6F] mb-2">$1000</div>
                <div className="text-[#4B4453] font-medium">Top supporter tier</div>
                <div className="text-sm text-[#4B4453]/70 mt-2">Greater equity or marketing claim</div>
              </motion.div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="pt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <button className="px-12 py-6 text-xl font-semibold rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 bg-[#376E6F] text-white shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-[#376E6F]/50">
            Back the Vision
          </button>
        </motion.div>
        
        {/* Decorative elements */}
        <motion.div 
          className="absolute top-1/3 left-1/4 w-40 h-40 bg-[#376E6F]/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/4 w-32 h-32 bg-[#4B4453]/10 rounded-full blur-2xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>
    </section>
  )
} 