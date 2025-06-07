'use client'

import type { HeroProps } from '@/lib/editor/types'

export function HeroModule({ heading, subheading }: HeroProps) {
  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-bold mb-4 text-gray-900">{heading}</h1>
      <p className="text-xl text-gray-700">{subheading}</p>
    </div>
  )
} 