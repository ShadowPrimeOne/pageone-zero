'use client'

import type { HeroProps } from '@/lib/editor/types'

export function HeroModule({ heading, subheading }: HeroProps) {
  return (
    <div className="w-full py-12 text-center">
      <h1 className="text-4xl font-bold mb-4">{heading}</h1>
      <p className="text-xl text-gray-600">{subheading}</p>
    </div>
  )
} 