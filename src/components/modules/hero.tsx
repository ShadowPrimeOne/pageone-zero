import { FC } from 'react'
import { HeroData } from '@/lib/editor/types'

interface HeroModuleProps {
  data: HeroData
}

export const HeroModule: FC<HeroModuleProps> = ({ data }) => {
  const { title, subtitle, ctaText, ctaLink } = data

  return (
    <div className="text-center py-16">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <p className="text-xl text-gray-600 mb-8">{subtitle}</p>
      <a
        href={ctaLink}
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
      >
        {ctaText}
      </a>
    </div>
  )
} 