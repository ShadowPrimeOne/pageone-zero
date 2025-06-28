'use client'

import React from 'react'

export const AnimatedLogo: React.FC = () => {
  return (
    <div className="relative flex items-center justify-center">
      {/* Floating $ Signs - spaced further apart, with shadow */}
      <div className="absolute -top-8 -right-10">
        <span className="text-green-500 text-4xl font-bold animate-bounce drop-shadow-lg" style={{ opacity: 0.7, textShadow: '0 2px 8px #0008' }}>$</span>
      </div>
      <div className="absolute -bottom-8 -left-10">
        <span className="text-green-500 text-3xl font-bold animate-bounce drop-shadow-lg" style={{ opacity: 0.5, textShadow: '0 2px 8px #0008' }}>$</span>
      </div>
      <div className="absolute -top-14 left-1/2 transform -translate-x-1/2">
        <span className="text-green-500 text-5xl font-bold animate-bounce drop-shadow-lg" style={{ opacity: 1, textShadow: '0 2px 12px #000a' }}>$</span>
      </div>
    </div>
  )
} 