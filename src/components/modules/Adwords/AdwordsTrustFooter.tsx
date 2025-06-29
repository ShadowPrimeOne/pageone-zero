'use client'

import React from 'react'

interface Props {
  text: string
}

export const AdwordsTrustFooter: React.FC<Props> = ({ text }) => {
  return (
    <section className="relative w-full px-4 sm:px-6 py-12 md:py-16 bg-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-black"></div>
      <div className="relative z-10 max-w-screen-md mx-auto text-center">
        <p className="text-sm md:text-base text-zinc-400 leading-snug animate-fadeInUp">
          {text}
        </p>
      </div>
    </section>
  )
} 