export interface ModuleProps<T extends string> {
  type: T
  heading?: string
  subheading?: string
  background?: {
    image?: string
    alt?: string
  }
  topBackground?: {
    url?: string
    type?: string
  }
} 