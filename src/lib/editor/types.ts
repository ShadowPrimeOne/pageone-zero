export interface HeroProps {
  heading: string
  subheading: string
  background?: ModuleBackground
}

export interface FormField {
  id: string
  label: string
  type: 'text' | 'email' | 'textarea'
  required: boolean
}

export interface FormProps {
  title: string
  fields: FormField[]
  submitText: string
  background?: ModuleBackground
}

export interface ModuleBackground {
  type: 'image' | 'color'
  value: string  // URL for image, hex code for color
  overlay?: {
    color: string  // hex code
    opacity: number  // 0-1
  }
  parallax?: boolean
}

export interface Module {
  id: string
  type: 'hero' | 'form'
  props: HeroProps | FormProps
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

export interface ModuleTemplate {
  type: 'hero' | 'form'
  props: HeroProps | FormProps
  background?: ModuleBackground
} 