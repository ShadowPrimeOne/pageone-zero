'use client'

import React from 'react'

interface Props {
  text: string
  countdown: string
}

export const AdwordsUrgencyBanner: React.FC<Props> = ({ text, countdown }) => {
  return (
    <section className="w-full bg-yellow-300 text-black text-center py-4 px-4">
      <p className="text-md md:text-lg font-semibold">
        {text} <span className="font-bold">{countdown}</span>
      </p>
    </section>
  )
} 