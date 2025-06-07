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