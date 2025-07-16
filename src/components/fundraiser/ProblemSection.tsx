'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

// Sample travel images for the collage
const travelImages = [
  '/IMAGES/Fundraising/Travel/20241030_204449.jpg',
  '/IMAGES/Fundraising/Travel/20241119_111141 (1).jpg',
  '/IMAGES/Fundraising/Travel/20241020_185711.jpg',
  '/IMAGES/Fundraising/Travel/20241114_172058.jpg',
  '/IMAGES/Fundraising/Travel/PXL_20240622_111030598.jpg',
  '/IMAGES/Fundraising/Travel/PXL_20240619_114657804.jpg',
]

export default function ProblemSection() {
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
              Small businesses are falling behind.
            </motion.h2>
            
            <motion.div 
              className="space-y-6 text-[#4B4453] text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <p>Most still don&apos;t have a proper website.</p>
              <p>Many are invisible online.</p>
              <p>Predatory platforms and AI are replacing, not helping.</p>
              <p>But almost everyone has a phone.</p>
              <p className="font-semibold text-[#376E6F]">92% of internet access is mobile-first</p>
              <p>In emerging markets, most have never touched a laptop.</p>
            </motion.div>
          </motion.div>

          {/* Travel Image Collage */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-2 gap-4">
              {travelImages.slice(0, 4).map((image, index) => (
                <motion.div
                  key={index}
                  className={`relative overflow-hidden rounded-2xl shadow-lg ${
                    index === 0 ? 'col-span-2 h-64' : 'h-48'
                  }`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Image
                    src={image}
                    alt={`Travel photo ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                </motion.div>
              ))}
            </div>
            
            {/* Additional floating images */}
            <motion.div
              className="absolute -top-4 -right-4 w-32 h-32 rounded-xl overflow-hidden shadow-lg"
              initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <Image
                src={travelImages[4]}
                alt="Travel photo 5"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
            </motion.div>
            
            <motion.div
              className="absolute -bottom-4 -left-4 w-24 h-24 rounded-xl overflow-hidden shadow-lg"
              initial={{ opacity: 0, scale: 0.8, rotate: 15 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.1, rotate: -5 }}
            >
              <Image
                src={travelImages[5]}
                alt="Travel photo 6"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 