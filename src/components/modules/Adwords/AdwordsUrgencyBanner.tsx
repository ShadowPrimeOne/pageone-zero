'use client'

import React from 'react'

interface Props {
  text: string
  countdown: string
}

export const AdwordsUrgencyBanner: React.FC<Props> = ({
  text,
  countdown,
}) => {
  return (
    <section className="relative w-full px-4 sm:px-6 py-16 md:py-20 bg-red-600 text-white min-h-[60vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-red-600"></div>
      <div className="relative z-10 max-w-screen-md mx-auto w-full text-center">
        <div className="bg-red-700 rounded-xl p-8 md:p-12 animate-scaleIn">
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-balance text-white animate-fadeInUp">
            {text}
          </h2>
          <div className="text-2xl md:text-3xl font-bold text-yellow-300 animate-pulse">
            {countdown}
          </div>
        </div>
      </div>
    </section>
  )
} 