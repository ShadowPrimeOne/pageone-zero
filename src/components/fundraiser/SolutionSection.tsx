'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export default function SolutionSection() {
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
              A system built for mobile. Powered by people.
            </motion.h2>
            
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {/* Bullet points */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#376E6F] rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-[#4B4453] text-lg">Free landing page for any business</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#376E6F] rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-[#4B4453] text-lg">90-day launch campaign for $600 AUD</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#376E6F] rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-[#4B4453] text-lg">If it works? They stay on for $400/month</p>
                </div>
              </div>
              
              {/* Description */}
              <div className="pt-6 space-y-4 text-[#4B4453] text-lg leading-relaxed">
                <p>
                  All built by <span className="font-semibold text-[#376E6F]">local ambassadors</span> — digital helpers who earn recurring income while helping real businesses grow.
                </p>
                <p>
                  We take care of the training, marketing, tools, and tech.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Device Showcase */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              {/* Laptop device frame */}
              <motion.div 
                className="bg-gradient-to-b from-gray-700 to-gray-900 rounded-lg shadow-2xl border-4 border-gray-600 p-4"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                {/* Screen */}
                <div className="bg-black rounded-lg overflow-hidden aspect-video">
                  <Image
                    src="/IMAGES/Fundraising/Mobil epHone With Landing Page in Front of Laptop.png"
                    alt="Desktop Landing Page"
                    width={800}
                    height={450}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
              
              {/* Phone overlay */}
              <motion.div 
                className="absolute -bottom-8 -right-8 w-32 h-64"
                initial={{ opacity: 0, x: 50, y: 50 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-[1.5rem] shadow-xl border-4 border-gray-700">
                  <div className="absolute inset-1 bg-black rounded-[1rem] overflow-hidden">
                    <Image
                      src="/IMAGES/Fundraising/Mobile Phone with Landing Page on Screen.png"
                      alt="Mobile overlay"
                      fill
                      sizes="128px"
                      className="object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 