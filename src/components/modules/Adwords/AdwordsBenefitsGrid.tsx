'use client'

import React from 'react'
import { PlugIcon, LockIcon, PhoneIcon, ToolsIcon, RooIcon } from '@/icons/AdwordsIcons'

interface Props {
  heading: string
  benefits: string[]
}

const benefitIcons = [PlugIcon, LockIcon, PhoneIcon, ToolsIcon, RooIcon]

export const AdwordsBenefitsGrid: React.FC<Props> = ({
  heading,
  benefits,
}) => {
  return (
    <section className="w-full px-4 sm:px-6 py-16 md:py-24 bg-zinc-950 text-white min-h-[80vh] flex items-center">
      <div className="max-w-screen-md mx-auto w-full">
        <h2 className="text-2xl md:text-4xl font-semibold text-center mb-12 text-balance text-white animate-fadeInUp">
          {heading}
        </h2>

        <div className="grid gap-6 md:gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefitIcons[index] || ToolsIcon
            return (
              <div 
                key={index}
                className="flex items-start gap-4 p-6 bg-zinc-900 rounded-xl transition-transform duration-300 hover:scale-105 animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center border border-zinc-700">
                  <IconComponent className="text-yellow-400 w-8 h-8" />
                </div>
                <p className="text-md md:text-lg text-zinc-300 leading-snug">
                  {benefit}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
} 