'use client'

import React from 'react'

interface Props {
  heading: string
  benefits: string[]
}

export const AdwordsBenefitsGrid: React.FC<Props> = ({ heading, benefits }) => {
  return (
    <section className="w-full px-6 py-12 bg-zinc-950 text-white">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl md:text-4xl font-bold mb-8">{heading}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-zinc-900 rounded-xl p-5 border border-zinc-800 shadow-sm"
            >
              <p className="text-base md:text-lg leading-snug">{benefit}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 