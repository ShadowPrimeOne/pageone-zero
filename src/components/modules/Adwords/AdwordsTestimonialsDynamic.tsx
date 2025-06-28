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

export const AdwordsTestimonialsDynamic: React.FC<Props> = ({
  testimonials,
}) => {
  return (
    <section className="w-full px-4 sm:px-6 py-16 md:py-24 bg-black text-white min-h-[80vh] flex items-center">
      <div className="max-w-screen-md mx-auto w-full">
        <h2 className="text-2xl md:text-4xl font-semibold text-center mb-12 text-balance text-white animate-fadeInUp">
          What Our Clients Say
        </h2>

        <div className="space-y-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-zinc-900 rounded-xl p-6 md:p-8 transition-transform duration-300 hover:scale-105 animate-fadeInUp"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <blockquote className="text-md md:text-lg text-zinc-300 leading-snug mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-sm text-zinc-400">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 