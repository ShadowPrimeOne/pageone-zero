export interface HeroProps {
  heading: string
  subheading: string
  background?: ModuleBackground
}

export interface Hero2Props extends HeroProps {
  background?: ModuleBackground
}

export interface OurProcessProps {
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
  type: 'color' | 'gradient'
  color: string
  opacity: number
  value?: string
  gradient?: {
    from: string
    to: string
    angle: number
  }
}

export interface ContactFormProps {
  heading: string
  subheading: string
  background?: ModuleBackground
}

export interface Module {
  id: string
  type: 'hero' | 'hero2' | 'form' | 'OurProcess' | 'contact_form'
  props: HeroProps | Hero2Props | FormProps | OurProcessProps | ContactFormProps
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
  type: 'hero' | 'hero2' | 'form' | 'OurProcess' | 'contact_form'
  props: HeroProps | Hero2Props | FormProps | OurProcessProps | ContactFormProps
  background?: ModuleBackground
}

export type ModuleType = 'hero' | 'hero2' | 'form' | 'OurProcess' | 'contact_form' 