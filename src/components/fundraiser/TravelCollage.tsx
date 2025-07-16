'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Sample travel images - you can add more from the Travel directory
const travelImages = [
  '/IMAGES/Fundraising/Travel/20241030_204449.jpg',
  '/IMAGES/Fundraising/Travel/20241119_111141 (1).jpg',
  '/IMAGES/Fundraising/Travel/20241020_185711.jpg',
  '/IMAGES/Fundraising/Travel/20241114_172058.jpg',
  '/IMAGES/Fundraising/Travel/PXL_20240622_111030598.jpg',
  '/IMAGES/Fundraising/Travel/PXL_20240619_114657804.jpg',
  '/IMAGES/Fundraising/Travel/PXL_20240706_073336866.jpg',
  '/IMAGES/Fundraising/Travel/PXL_20240618_100748765.jpg',
]

export default function TravelCollage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % travelImages.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % travelImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + travelImages.length) % travelImages.length)
  }

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
            The Adventure So Far
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Capturing moments from around the world - each photo tells a story
          </p>
        </motion.div>

        {/* Image Slider */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Main Image */}
          <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="relative w-full h-full"
              >
                <Image
                  src={travelImages[currentImageIndex]}
                  alt={`Travel photo ${currentImageIndex + 1}`}
                  fill
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
            
            {/* Overlay gradient for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            
            {/* Image counter */}
            <motion.div 
              className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              {currentImageIndex + 1} / {travelImages.length}
            </motion.div>
          </div>

          {/* Navigation buttons */}
          <motion.button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
          
          <motion.button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>

          {/* Play/Pause button */}
          <motion.button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="absolute top-4 left-4 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-all duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isAutoPlaying ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </motion.button>
        </motion.div>

        {/* Thumbnail grid */}
        <motion.div 
          className="grid grid-cols-4 md:grid-cols-8 gap-2 mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {travelImages.map((image, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`
                relative h-16 md:h-20 rounded-lg overflow-hidden transition-all duration-300
                ${currentImageIndex === index 
                  ? 'ring-2 ring-blue-400 scale-105' 
                  : 'hover:scale-105'
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src={image}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </motion.button>
          ))}
        </motion.div>

        {/* Travel stats */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, staggerChildren: 0.1 }}
          viewport={{ once: true }}
        >
          {[
            { number: "25+", label: "Cities Explored" },
            { number: "500+", label: "Photos Taken" },
            { number: "12", label: "Months Traveling" },
            { number: "∞", label: "Memories Made" }
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
              <div className="text-2xl font-bold text-white">{stat.number}</div>
              <div className="text-sm text-white/70">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
} 