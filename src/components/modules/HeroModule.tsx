'use client'

import type { HeroProps } from '@/lib/editor/types'

export function HeroModule({ heading, subheading }: HeroProps) {
  return (
    <div className="text-center flex flex-col items-center justify-center h-screen px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-2 sm:mb-4 text-gray-900">{heading}</h1>
      <p className="text-lg sm:text-xl lg:text-2xl text-gray-700">{subheading}</p>
    </div>
  )
} 