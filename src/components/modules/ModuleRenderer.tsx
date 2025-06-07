import { FC } from 'react'
import { ModuleType } from '@/lib/editor/types'
import { HeroModule } from './hero'
import { FormModule } from './form'

interface ModuleRendererProps {
  type: ModuleType
  data: any
}

export const ModuleRenderer: FC<ModuleRendererProps> = ({ type, data }) => {
  switch (type) {
    case 'hero':
      return <HeroModule data={data} />
    case 'form':
      return <FormModule data={data} />
    default:
      return <div>Unknown module type: {type}</div>
  }
} 