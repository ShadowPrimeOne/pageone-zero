'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import clsx from 'clsx'

const testimonials = [
  {
    name: "Ben T.",
    business: "Inner West Sparky",
    text: "Booked 3 new jobs in 48 hours — easy as. - Ben",
    img: "/IMAGES/Testimonials/Ben_T..webp"
  },
  {
    name: "Mick R.",
    business: "Gold Coast Electric",
    text: "Clients found me day one. Best ad dollars I've spent. - Mick",
    img: "/IMAGES/Testimonials/Mick_R..webp"
  },
  {
    name: "Lana M.",
    business: "Home Security Installs",
    text: "Finally someone who gets tradies. Leads come straight in. - Lana",
    img: "/IMAGES/Testimonials/Tayla_L..webp"
  },
  {
    name: "Jas B.",
    business: "Northern Beaches Data",
    text: "I just reply to texts and the work rolls in. Too easy. - Jas",
    img: "/IMAGES/Testimonials/Jason_B_(Jas).webp"
  },
  {
    name: "Ellie C.",
    business: "Power & Renovations",
    text: "Gave it a crack, now I'm flat out. Unreal support. - Ellie",
    img: "/IMAGES/Testimonials/Ellie_C..webp"
  }
]

export const TestimonialPopup = () => {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(false)
  const [starCount, setStarCount] = useState(0)
  const [flash, setFlash] = useState(false)

  useEffect(() => {
    const show = setTimeout(() => setVisible(true), 3000)
    const cycle = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex((i) => (i + 1) % testimonials.length)
        setVisible(true)
      }, 1500)
    }, 15000)

    return () => {
      clearTimeout(show)
      clearInterval(cycle)
    }
  }, [])

  // Animate stars when popup becomes visible
  useEffect(() => {
    if (visible) {
      setStarCount(0)
      const starTimer = setTimeout(() => {
        setStarCount(1)
        setTimeout(() => setStarCount(2), 300)
        setTimeout(() => setStarCount(3), 600)
        setTimeout(() => setStarCount(4), 900)
        setTimeout(() => {
          setStarCount(5)
          setFlash(true)
          setTimeout(() => setFlash(false), 500)
        }, 1200)
      }, 800)
      return () => clearTimeout(starTimer)
    }
  }, [visible, index])

  const t = testimonials[index]

  return (
    <div
      className={clsx(
        'fixed bottom-6 left-4 z-[999] flex flex-col items-start gap-2 transition-all duration-1000 ease-in-out',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      )}
    >
      {/* 5 Stars Above Speech Bubble */}
      <div className={clsx(
        "flex gap-1 ml-20 transition-all duration-1000 ease-out",
        flash && "scale-110"
      )}>
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill={i < starCount ? "#FFC107" : "#E0E0E0"}
            className={clsx(
              "w-5 h-5 transition-all duration-500 ease-out",
              i < starCount && "animate-pulse",
              flash && i < starCount && "animate-bounce"
            )}
          >
            <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z" />
          </svg>
        ))}
      </div>

      {/* Google Review Widget */}
      <div className="relative max-w-[320px] ml-20">
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
          className="relative rounded-lg p-3 overflow-hidden"
          style={{
            background: 'rgba(255, 255, 255, 0.4)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)',
            border: 'none',
            outline: 'none'
          }}
        >
          {/* Gradient lighting animation */}
          <div 
            className="absolute inset-0 animate-pulse" 
            style={{ 
              animationDuration: '3s', 
              animationDelay: '1s',
              background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.15), transparent)',
              border: 'none',
              outline: 'none'
            }}
          ></div>
          
          {/* Depth shadow overlay */}
          <div 
            className="absolute inset-0 rounded-lg"
            style={{
              background: 'linear-gradient(to bottom right, rgba(0,0,0,0.03), transparent)',
              border: 'none',
              outline: 'none'
            }}
          ></div>
          
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
          <div className="text-xs leading-tight text-gray-800 mb-1.5 relative z-10">{t.text}</div>
          
          {/* Business Info */}
          <div className="text-xs text-gray-500 font-medium relative z-10">{t.business}</div>
        </div>
      </div>

      {/* Profile Image in Gold Circle - Bottom Left */}
      <div className="absolute bottom-0 left-0">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 p-1 shadow-lg">
          <Image
            src={t.img}
            alt={t.name}
            width={56}
            height={56}
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      </div>
    </div>
  )
} 