'use client'

import React from 'react'

export const TrustBanner: React.FC = () => {
  const logos = [
    '/IMAGES/Trust Banner/google-partner-logo-png_seeklogo-428155.png',
    '/IMAGES/Trust Banner/telstra-eps-vector-logo.png',
    '/IMAGES/Trust Banner/Tesla Energy.webp',
    '/IMAGES/Trust Banner/Energy Safe Vic.avif',
    '/IMAGES/Trust Banner/Jetstar.png',
    '/IMAGES/Trust Banner/Hertz.png',
    '/IMAGES/Trust Banner/Toyota.jpg',
    '/IMAGES/Trust Banner/Wrangler Australia.png',
    '/IMAGES/Trust Banner/PM Chamber of commerce.png',
    '/IMAGES/Trust Banner/Smiths_Logo.png',
    '/IMAGES/Trust Banner/commonwealth-bank-logo-png_seeklogo-219412.png'
  ]

  return (
    <section className="relative w-full bg-white py-3 md:py-4 border-t border-gray-200 -mt-2 z-40" style={{ boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)' }}>
      {/* Content */}
      <div className="relative z-50 max-w-7xl mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-4">
          <h2 className="font-poppins font-semibold text-black !text-black tracking-wide" style={{ color: 'black', fontSize: '1.2rem' }}>
            Trusted by the best
          </h2>
          <div className="w-8 h-0.5 bg-gradient-to-r from-green-400 to-yellow-400 mx-auto mt-1 rounded-full"></div>
        </div>
        
        {/* Logo Banner */}
        <div className="flex w-max animate-scroll space-x-4 md:space-x-6 px-6">
          {[...logos, ...logos, ...logos].map((src, i) => (
            <div key={`logo-${i}-${src}`} className="flex items-center justify-center">
              <img
                src={src}
                alt={`Trust logo ${i + 1}`}
                className="h-16 md:h-20 w-16 md:w-20 object-contain hover:opacity-80 transition-opacity duration-300"
                loading="lazy"
                onError={(e) => {
                  console.warn(`Failed to load logo: ${src}`);
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 