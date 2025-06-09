'use client'

import { useEffect, useRef } from 'react'
import { OurProcessProps } from '@/lib/editor/types'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface Props {
  props: OurProcessProps
}

export default function OurProcessModule({ props }: Props) {
  const { heading = 'Launch Your Page', subheading = 'From Anywhere, On Any Device' } = props
  const svgRef = useRef<SVGSVGElement>(null)

  // Parallax effect for the background
  useEffect(() => {
    const handleScroll = () => {
      if (svgRef.current) {
        const scrollY = window.scrollY
        const translateY = Math.min(0, scrollY * 0.2)
        svgRef.current.style.transform = `translateY(${translateY}px)`
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white">
      {/* Background with parallax effect */}
      <div className="absolute inset-0">
        <svg
          ref={svgRef}
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="neon-line" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#BFFFFC" stopOpacity="0.12"/>
              <stop offset="100%" stopColor="#FF00FE" stopOpacity="0.12"/>
            </linearGradient>
            <pattern id="mosaic" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M5 0 L6.5 3.5 L10 5 L6.5 6.5 L5 10 L3.5 6.5 L0 5 L3.5 3.5 Z"
                    fill="none" stroke="url(#neon-line)" strokeWidth="0.4"/>
              <path d="M5 2 L6.5 5 L5 8 L3.5 5 Z"
                    fill="none" stroke="url(#neon-line)" strokeWidth="0.3"/>
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#mosaic)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
        <motion.div 
          className="max-w-7xl mx-auto w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {/* Header */}
          <motion.div 
            className="text-center mb-20"
            variants={itemVariants}
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 mb-6">
              {heading}
            </h1>
            <h3 className="text-2xl md:text-3xl text-gray-600">
              {subheading}
            </h3>
          </motion.div>

          {/* Process Steps */}
          <div className="relative flex">
            {/* Left Column */}
            <div className="w-1/2 pr-16 space-y-32">
              <motion.div variants={itemVariants} className="flex justify-end">
                <h3 className="text-3xl font-semibold text-gray-900 group">
                  Click
                  <span className="block h-0.5 w-0 bg-[#41FEFF] group-hover:w-full transition-all duration-300 ease-in-out"></span>
                </h3>
              </motion.div>
              <motion.div variants={itemVariants} className="flex justify-end">
                <div className="relative w-full max-w-sm h-48 group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#41FEFF]/10 to-[#FF00FE]/10 rounded-lg blur-sm group-hover:blur-md transition-all duration-300"></div>
                  <Image
                    src="/IMAGES/create.svg"
                    alt="Create"
                    fill
                    className="object-contain p-4"
                  />
                </div>
              </motion.div>
              <motion.div variants={itemVariants} className="flex justify-end">
                <h3 className="text-3xl font-semibold text-gray-900 group">
                  Share
                  <span className="block h-0.5 w-0 bg-[#EE018F] group-hover:w-full transition-all duration-300 ease-in-out"></span>
                </h3>
              </motion.div>
            </div>

            {/* Vertical neon gradient divider */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#41FEFF] via-[#FF00FE] to-[#EE018F]" />

            {/* Right Column */}
            <div className="w-1/2 pl-16 space-y-32">
              <motion.div variants={itemVariants}>
                <div className="relative w-full max-w-sm h-48 group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#41FEFF]/10 to-[#FF00FE]/10 rounded-lg blur-sm group-hover:blur-md transition-all duration-300"></div>
                  <Image
                    src="/IMAGES/click.svg"
                    alt="Click"
                    fill
                    className="object-contain p-4"
                  />
                </div>
              </motion.div>
              <motion.div variants={itemVariants}>
                <h3 className="text-3xl font-semibold text-gray-900 group">
                  Create
                  <span className="block h-0.5 w-0 bg-[#FF00FE] group-hover:w-full transition-all duration-300 ease-in-out"></span>
                </h3>
              </motion.div>
              <motion.div variants={itemVariants}>
                <div className="relative w-full max-w-sm h-48 group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#41FEFF]/10 to-[#FF00FE]/10 rounded-lg blur-sm group-hover:blur-md transition-all duration-300"></div>
                  <Image
                    src="/IMAGES/share.svg"
                    alt="Share"
                    fill
                    className="object-contain p-4"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 