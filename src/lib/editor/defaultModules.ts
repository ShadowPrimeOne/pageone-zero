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
  classic_overlay_hero: '8956e674-f3ec-4789-8c5d-f64a4db0973b',
  split_layout_hero: '2e84075c-ebbe-47d2-bf9c-d1c7721ebde3'
} as const

export type ModuleType = keyof typeof DEFAULT_MODULE_IDS 