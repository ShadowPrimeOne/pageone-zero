'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function ProfileBlock() {
  return (
    <section className="py-24 px-4 relative">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        {/* Profile Image */}
        <motion.div 
          className="relative mx-auto w-64 h-64 md:w-80 md:h-80"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full blur-xl"></div>
          <motion.div 
            className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/20 shadow-2xl"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src="/IMAGES/Fundraising/Travis Cunningham 2025.jpg"
              alt="Travis Cunningham"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </motion.div>
        
        {/* Profile Caption */}
        <div className="space-y-6">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Meet Travis
          </motion.h2>
          <motion.p 
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            A passionate adventurer with big dreams and an even bigger heart. 
            Every step of this journey is made possible by amazing people like you.
          </motion.p>
          
          {/* Stats or highlights */}
          <motion.div 
            className="flex flex-wrap justify-center gap-8 pt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, staggerChildren: 0.1 }}
            viewport={{ once: true }}
          >
            {[
              { number: "100+", label: "Days Traveled" },
              { number: "15+", label: "Countries Visited" },
              { number: "1000+", label: "Memories Made" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              >
                <div className="text-2xl md:text-3xl font-bold text-white">{stat.number}</div>
                <div className="text-sm md:text-base text-white/70">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
} 