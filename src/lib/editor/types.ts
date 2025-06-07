export type ModuleType = 'hero' | 'form'

export interface ModuleData {
  id: string
  type: ModuleType
  data: Record<string, unknown>
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

export interface Module {
  id: string
  type: 'hero' | 'form'
  props: HeroProps | FormProps
}

export interface HeroProps {
  heading: string
  subheading: string
}

export interface FormProps {
  title: string
  fields: FormField[]
  submitText: string
}

export interface FormField {
  id: string
  label: string
  type: 'text' | 'email' | 'textarea'
  required: boolean
} 