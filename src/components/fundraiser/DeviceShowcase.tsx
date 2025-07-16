'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function DeviceShowcase() {
  const [activeDevice, setActiveDevice] = useState<'mobile' | 'laptop'>('mobile')

  return (
    <section className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            See the Journey
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Experience the adventure through our mobile-first platform
          </p>
        </motion.div>

        {/* Device Toggle */}
        <motion.div 
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-full p-1 border border-white/20">
            <button
              onClick={() => setActiveDevice('mobile')}
              className={`
                px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${activeDevice === 'mobile'
                  ? 'bg-white text-gray-900 shadow-lg'
                  : 'text-white/70 hover:text-white'
                }
              `}
            >
              Mobile
            </button>
            <button
              onClick={() => setActiveDevice('laptop')}
              className={`
                px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${activeDevice === 'laptop'
                  ? 'bg-white text-gray-900 shadow-lg'
                  : 'text-white/70 hover:text-white'
                }
              `}
            >
              Desktop
            </button>
          </div>
        </motion.div>

        {/* Device Showcase */}
        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="relative">
            {activeDevice === 'mobile' ? (
              <motion.div 
                className="relative w-64 h-[500px] md:w-80 md:h-[600px]"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Mobile device frame */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3rem] shadow-2xl border-8 border-gray-700">
                  {/* Screen */}
                  <div className="absolute inset-2 bg-black rounded-[2rem] overflow-hidden">
                    <Image
                      src="/IMAGES/Fundraising/Mobile Phone with Landing Page on Screen.png"
                      alt="Mobile Landing Page"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                className="relative w-full max-w-4xl"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Laptop device frame */}
                <div className="relative">
                  {/* Laptop base */}
                  <div className="bg-gradient-to-b from-gray-700 to-gray-900 rounded-lg shadow-2xl border-4 border-gray-600 p-4">
                    {/* Screen */}
                    <div className="bg-black rounded-lg overflow-hidden aspect-video">
                      <Image
                        src="/IMAGES/Fundraising/Mobil epHone With Landing Page in Front of Laptop.png"
                        alt="Desktop Landing Page"
                        width={800}
                        height={450}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  {/* Phone overlay */}
                  <motion.div 
                    className="absolute -bottom-8 -right-8 w-32 h-64"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-[1.5rem] shadow-xl border-4 border-gray-700">
                      <div className="absolute inset-1 bg-black rounded-[1rem] overflow-hidden">
                        <Image
                          src="/IMAGES/Fundraising/Mobile Phone with Landing Page on Screen.png"
                          alt="Mobile overlay"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Feature highlights */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, staggerChildren: 0.2 }}
          viewport={{ once: true }}
        >
          {[
            {
              icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
              title: "Mobile First",
              description: "Optimized for every device, ensuring the best experience wherever you are.",
              color: "blue"
            },
            {
              icon: "M13 10V3L4 14h7v7l9-11h-7z",
              title: "Lightning Fast",
              description: "Built for speed and performance, so you never miss a moment.",
              color: "purple"
            },
            {
              icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
              title: "Secure & Reliable",
              description: "Your data and contributions are protected with enterprise-grade security.",
              color: "green"
            }
          ].map((feature, index) => (
            <motion.div 
              key={index}
              className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
            >
              <div className={`w-12 h-12 bg-${feature.color}-500/20 rounded-full flex items-center justify-center mx-auto mb-4`}>
                <svg className={`w-6 h-6 text-${feature.color}-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-white/70">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
} 