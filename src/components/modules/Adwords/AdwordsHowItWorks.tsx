'use client'

import React from 'react'
import { PlugIcon, ToolsIcon, RooIcon } from '@/icons/AdwordsIcons'

interface Props {
  heading: string
  steps: Array<{
    icon: 'plug' | 'tools' | 'roo'
    title: string
    description: string
  }>
}

const iconMap = {
  plug: PlugIcon,
  tools: ToolsIcon,
  roo: RooIcon
}

export const AdwordsHowItWorks: React.FC<Props> = ({
  heading,
  steps,
}) => {
  return (
    <section className="w-full px-4 sm:px-6 py-16 md:py-24 bg-black text-white min-h-[80vh] flex items-center">
      <div className="max-w-screen-md mx-auto w-full">
        <h2 className="text-2xl md:text-4xl font-semibold text-center mb-12 text-balance text-white animate-fadeInUp">
          {heading}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => {
            const IconComponent = iconMap[step.icon]
            return (
              <div 
                key={index}
                className="flex flex-col items-center text-center gap-3 p-4 bg-zinc-900 rounded-xl transition-transform duration-300 hover:scale-105 animate-fadeInUp"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <IconComponent className="text-yellow-400 w-10 h-10" />
                <h3 className="text-lg font-semibold text-white">
                  {step.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-snug">
                  {step.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
} 