import type { Module } from './types'

export const defaultModules: Module[] = [
  {
    id: '1',
    type: 'classic_overlay_hero',
    category: 'hero',
    props: {
      heading: 'Welcome to Your New Page',
      subheading: 'Start building your page by adding modules below',
      ctaText: 'Get Started',
      background: {
        type: 'image',
        image: '/images/hero-bg.jpg',
        color: '#000000',
        opacity: 1,
        parallax: true,
        overlay: {
          color: '#000000',
          opacity: 0.5
        }
      }
    }
  }
]

export const DEFAULT_MODULE_IDS = {
  top_image_center_text_hero: '28173bac-8cf5-42b9-89d6-316082b08db7',
  classic_overlay_hero: 'default-id-classic-overlay-hero'
} as const

export type ModuleType = keyof typeof DEFAULT_MODULE_IDS 