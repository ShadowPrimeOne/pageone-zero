export interface ModuleBackground {
  type: 'image' | 'color'
  color: string
  opacity: number
  overlay?: {
    color: string
    opacity: number
  }
}

export interface HeroProps {
  heading: string
  subheading: string
  background?: ModuleBackground
}

export interface ClassicOverlayHeroProps extends HeroProps {
  background?: ModuleBackground
}

export interface TopImageCenterTextHeroProps extends HeroProps {
  background?: ModuleBackground
}

export interface SplitLayoutHeroProps extends HeroProps {
  background?: ModuleBackground
}

export interface FormField {
  id: string
  label: string
  type: 'text' | 'email' | 'textarea'
  required: boolean
  placeholder?: string
}

export interface FormProps {
  title: string
  submitText: string
  fields: FormField[]
  background?: ModuleBackground
}

export interface Module {
  id: string
  type: 'classic_overlay_hero' | 'top_image_center_text_hero' | 'split_layout_hero'
  heading: string
  subheading: string
  ctaText: string
  background?: {
    type: 'image' | 'color'
    image?: string
    color?: string
    parallax?: boolean
    overlay?: {
      color: string
      opacity: number
    }
  }
}

export interface ModuleTemplate {
  type: 'classic_overlay_hero' | 'top_image_center_text_hero' | 'split_layout_hero'
  props: ClassicOverlayHeroProps | TopImageCenterTextHeroProps | SplitLayoutHeroProps
  background?: ModuleBackground
}

export type ModuleType = 'classic_overlay_hero' | 'top_image_center_text_hero' | 'split_layout_hero'

export interface Hero2Props extends HeroProps {
  background?: ModuleBackground
}

export interface OurProcessProps {
  heading: string
  subheading: string
  background?: ModuleBackground
}

export interface ContactFormProps {
  heading: string
  subheading: string
  background?: ModuleBackground
}

export interface HeroModuleContent {
  title: string
  subtitle?: string
  imageUrl?: string
}

export interface FormModuleContent {
  title: string
  fields: {
    id: string
    label: string
    type: 'text' | 'email' | 'textarea'
    required: boolean
  }[]
  submitText: string
}

export interface HeroData {
  title: string
  subtitle: string
  ctaText: string
  ctaLink: string
}

export interface FormData {
  title: string
  fields: Array<{
    id: string
    label: string
    type: 'text' | 'email' | 'textarea'
    required: boolean
  }>
  submitText: string
} 