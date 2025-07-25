'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import clsx from 'clsx'

const testimonials = [
  {
    name: "Ben T.",
    business: "Inner West Sparky",
    text: "Booked 3 new jobs in 48 hours — easy as.",
    img: "/IMAGES/Testimonials/Ben_T..webp"
  },
  {
    name: "Mick R.",
    business: "Gold Coast Electric",
    text: "Clients found me day one. Best ad dollars I've spent.",
    img: "/IMAGES/Testimonials/Mick_R..webp"
  },
  {
    name: "Lana M.",
    business: "Home Security Installs",
    text: "At last I don't have to chase up the agency to get a result! We are booked solid, Thanks!",
    img: "/IMAGES/Testimonials/Tayla_L..webp"
  },
  {
    name: "Jas B.",
    business: "Northern Beaches Data",
    text: "I just reply to texts and the work rolls in. Too easy.",
    img: "/IMAGES/Testimonials/Jason_B_(Jas).webp"
  },
  {
    name: "Ellie C.",
    business: "Kestral Steel & Roofing",
    text: "Adwords has been a game changer, highly recommended if you want easy leads",
    img: "/IMAGES/Testimonials/Ellie_C..webp"
  }
]

export const TestimonialPopup = () => {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(false)
  const [starCount, setStarCount] = useState(0)

  useEffect(() => {
    // Show immediately for better user experience
    setVisible(true)
    
    // Start star animation immediately
    const starTimer = setTimeout(() => {
      setStarCount(1)
      setTimeout(() => setStarCount(2), 200)
      setTimeout(() => setStarCount(3), 400)
      setTimeout(() => setStarCount(4), 600)
      setTimeout(() => setStarCount(5), 800)
    }, 100)

    // Cycle testimonials every 8 seconds
    const cycle = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex((i) => (i + 1) % testimonials.length)
        setVisible(true)
        // Restart star animation
        setStarCount(0)
        setTimeout(() => {
          setStarCount(1)
          setTimeout(() => setStarCount(2), 200)
          setTimeout(() => setStarCount(3), 400)
          setTimeout(() => setStarCount(4), 600)
          setTimeout(() => setStarCount(5), 800)
        }, 100)
      }, 300)
    }, 8000)

    return () => {
      clearTimeout(starTimer)
      clearInterval(cycle)
    }
  }, [])

  // Preload next image to reduce lag
  useEffect(() => {
    const nextIndex = (index + 1) % testimonials.length
    const nextImage = new window.Image()
    nextImage.src = testimonials[nextIndex].img
  }, [index])

  const t = testimonials[index]

  return (
    <div
      className={clsx(
        'fixed bottom-6 left-1/2 transform -translate-x-1/2 z-[999] flex flex-col items-center gap-0 transition-all duration-300 ease-in-out w-full max-w-none',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      )}
      data-testimonial
    >
      {/* 5 Stars Above Speech Bubble - Simplified Animation */}
      <div className="flex gap-1 mb-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill={i < starCount ? "#FFC107" : "#E0E0E0"}
            className={clsx(
              "w-5 h-5 transition-all duration-300 ease-out",
              i < starCount && "animate-pulse"
            )}
          >
            <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z" />
          </svg>
        ))}
      </div>

      {/* Profile Image and Speech Bubble Container */}
      <div className="flex items-end gap-3 w-full px-4 max-w-none justify-center">
        {/* Profile Image Badge - Optimized */}
        <div 
          className="w-16 h-16 rounded-full p-1 flex-shrink-0"
          style={{
            background: 'rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)',
            border: 'none',
            outline: 'none'
          }}
        >
          <div className="w-full h-full rounded-full overflow-hidden">
            <Image
              src={t.img}
              alt={t.name}
              width={56}
              height={56}
              className="w-full h-full object-cover"
              priority={index === 0}
            />
          </div>
        </div>

        {/* Google Review Widget - Simplified */}
        <div className="relative flex-1 min-w-0 w-full max-w-[320px]">
          {/* Speech bubble tail */}
          <div 
            className="absolute left-[-6px] bottom-3 w-3 h-3 transform rotate-45 shadow-sm"
            style={{
              background: 'rgba(255, 255, 255, 0.6)',
              backdropFilter: 'blur(12px)',
              border: 'none',
              outline: 'none'
            }}
          ></div>
          
          {/* Google Review Widget */}
          <div 
            className="relative rounded-lg p-3 overflow-hidden w-full"
            style={{
              background: 'rgba(255, 255, 255, 0.4)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)',
              border: 'none',
              outline: 'none'
            }}
          >
            {/* Google Header */}
            <div className="flex items-center gap-2 mb-1.5 relative z-10">
              <div 
                className="w-5 h-5 rounded-full flex items-center justify-center"
                style={{
                  background: '#4285F4',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  border: 'none',
                  outline: 'none'
                }}
              >
                <span className="text-white text-xs font-bold">G</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs font-medium text-gray-900">Google</span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-400">Review</span>
              </div>
            </div>

            {/* Review Content */}
            <div className="text-xs leading-tight text-gray-800 mb-1.5 relative z-10">{t.text.replace(` - ${t.name}`, '')}</div>
            
            {/* Business Info */}
            <div className="text-xs text-gray-500 font-medium relative z-10">
              <div>{t.name} • {t.business}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 