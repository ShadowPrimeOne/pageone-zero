import type { Module } from './types'

export const defaultModules: Module[] = [
  {
    id: '1',
    type: 'classic_overlay_hero',
    heading: 'Welcome to Your New Page',
    subheading: 'Start building your page by adding modules below',
    ctaText: 'Get Started',
    background: {
      type: 'image',
      image: '/images/hero-bg.jpg',
      parallax: true,
      overlay: {
        color: '#000000',
        opacity: 0.5
      }
    }
  },
  {
    id: 'hero-1',
    type: 'top_image_center_text_hero',
    heading: 'Page.one',
    subheading: 'Genesis Ready.',
    ctaText: 'Learn More',
    background: {
      type: 'color',
      color: '#ffffff'
    }
  },
  {
    id: 'hero-2',
    type: 'split_layout_hero',
    heading: "Let's talk",
    subheading: 'Get in touch with us',
    ctaText: 'Contact Us',
    background: {
      type: 'image',
      image: '/images/split-hero.jpg',
      parallax: false
    }
  }
] 