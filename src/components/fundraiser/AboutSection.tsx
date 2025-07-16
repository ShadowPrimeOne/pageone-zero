'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function AboutSection() {
  return (
    <section className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-semibold text-[#2D2D2D]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Built by someone who&apos;s seen it up close.
            </motion.h2>
            
            <motion.div 
              className="space-y-6 text-[#4B4453] text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <p>
                I&apos;m Travis. I ran a digital agency in rural Victoria, helped grow real businesses, then travelled the world. I saw billions coming online with nothing. I saw AI replacing jobs. But I also saw an opportunity: People helping people go digital, from their phone.
              </p>
              <p className="font-semibold text-[#376E6F]">
                That&apos;s why I built this.
              </p>
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div 
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="relative w-80 h-80 md:w-96 md:h-96"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#376E6F]/20 to-[#4B4453]/20 rounded-full blur-xl"></div>
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-[#376E6F]/20 shadow-2xl">
                <Image
                  src="/IMAGES/Fundraising/Travis Cunningham 2025.jpg"
                  alt="Travis Cunningham"
                  fill
                  sizes="(max-width: 768px) 320px, (max-width: 1024px) 384px, 400px"
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 