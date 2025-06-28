'use client'

import React from 'react'

interface Props {
  text: string
}

export const AdwordsTrustFooter: React.FC<Props> = ({ text }) => {
  return (
    <section className="w-full px-4 sm:px-6 py-12 md:py-16 bg-black text-white">
      <div className="max-w-screen-md mx-auto text-center">
        <p className="text-sm md:text-base text-zinc-400 leading-snug animate-fadeInUp">
          {text}
        </p>
      </div>
    </section>
  )
} 