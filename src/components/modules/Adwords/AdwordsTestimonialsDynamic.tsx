'use client'

import React from 'react'

interface Testimonial {
  name: string
  title: string
  quote: string
}

interface Props {
  testimonials: Testimonial[]
}

export const AdwordsTestimonialsDynamic: React.FC<Props> = ({ testimonials }) => {
  return (
    <section className="w-full px-6 py-16 bg-black text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:text-4xl font-bold mb-12">
          Real Results from Real Businesses
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 text-left shadow-md"
            >
              <p className="text-base md:text-lg italic mb-4">&ldquo;{t.quote}&rdquo;</p>
              <p className="text-sm font-semibold">{t.name}</p>
              <p className="text-xs text-zinc-400">{t.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 