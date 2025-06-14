export interface Background {
  type: 'image' | 'color'
  url?: string
  color?: string
  opacity: number
  image?: string
  _tempFile?: {
    name: string
    type: string
    size: number
    data: string
  }
  overlay?: {
    color: string
    opacity: number
  }
}

export interface ModuleBackground extends Background {
  parallax?: boolean
}

export interface HeroProps {
  heading?: string
  subheading?: string
  background?: Background
  topBackground?: {
    url?: string
    type?: string
  }
  ctaText?: string
  onUpdate?: (updates: Partial<HeroProps>) => void
  htmlContent?: {
    heading?: string
    subheading?: string
  }
  textPosition?: 'top' | 'center' | 'bottom'
}

export interface ClassicOverlayHeroProps {
  background?: {
    type: 'image' | 'color'
    url?: string
    image?: string
    color?: string
    opacity?: number
    overlay?: {
      color: string
      opacity: number
    }
    _tempFile?: {
      data: string
      type: string
    }
  }
  topBackground?: {
    url: string
  }
  htmlContent?: {
    heading?: string
    subheading?: string
    bodyText?: string
  }
  onUpdate?: (updates: Partial<ClassicOverlayHeroProps>) => void
  textPosition?: 'top' | 'center' | 'bottom'
  startAnimation?: 'none' | 'fadeIn' | 'slideUp' | 'slideDown'
  hoverAnimation?: 'none' | 'scale' | 'lift' | 'glow'
}

export interface ClassicOverlayHeroHtmlContent {
  heading: string
  subheading: string
  bodyText: string
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
  onUpdate?: (updates: Partial<FormProps>) => void
}

export type ModuleCategory = 'hero' | 'content' | 'form' | 'process' | 'contact';

export interface Module {
  id: string
  type: 'classic_overlay_hero' | 'top_image_center_text_hero' | 'split_layout_hero' | 'hero' | 'hero2' | 'form' | 'OurProcess' | 'contact_form'
  category: ModuleCategory
  props: HeroProps | Hero2Props | ClassicOverlayHeroProps | TopImageCenterTextHeroProps | SplitLayoutHeroProps | FormProps | OurProcessProps | ContactFormProps
  background?: ModuleBackground
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
  onUpdate?: (updates: Partial<OurProcessProps>) => void
}

export interface ContactFormProps {
  heading: string
  subheading: string
  background?: ModuleBackground
  onUpdate?: (updates: Partial<ContactFormProps>) => void
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