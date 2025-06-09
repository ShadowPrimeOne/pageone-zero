'use client'

import type { Module, HeroProps, Hero2Props, FormProps, OurProcessProps, ContactFormProps } from '@/lib/editor/types'
import { ModuleWrapper } from './ModuleWrapper'
import { HeroModule } from './HeroModule'
import { Hero2Module } from './Hero2Module'
import { FormModule } from './FormModule'
import { useEffect } from 'react'
import OurProcessModule from './OurProcessModule'
import { ContactFormModule } from './ContactFormModule'

interface Props {
  modules: Module[]
  selectedModuleId: string | null
  onSelect: (id: string) => void
  onDelete: (id: string) => void
  onMoveUp: (id: string) => void
  onMoveDown: (id: string) => void
  onDuplicate: (id: string) => void
  onEdit: (id: string) => void
  onAddRequest: (relativeId: string, position: 'above' | 'below') => void
}

export function ModuleRenderer({
  modules,
  selectedModuleId,
  onSelect,
  onDelete,
  onMoveUp,
  onMoveDown,
  onDuplicate,
  onEdit,
  onAddRequest,
}: Props) {
  useEffect(() => {
    console.log('🔄 ModuleRenderer mounted')
    return () => console.log('🔄 ModuleRenderer unmounted')
  }, [])

  console.log('🎨 ModuleRenderer rendering with modules:', modules)

  return (
    <div className="flex flex-col">
      {modules.map((module, index) => {
        console.log('🎨 rendering module:', module.type)
        const isFirst = index === 0
        const isLast = index === modules.length - 1

        return (
          <ModuleWrapper
            key={module.id}
            module={module}
            selected={module.id === selectedModuleId}
            onSelect={onSelect}
            onDelete={onDelete}
            onMoveUp={onMoveUp}
            onMoveDown={onMoveDown}
            onDuplicate={onDuplicate}
            onEdit={onEdit}
            onAddRequest={onAddRequest}
            isFirst={isFirst}
            isLast={isLast}
          >
            {module.type === 'hero' && <HeroModule {...(module.props as HeroProps)} />}
            {module.type === 'hero2' && <Hero2Module {...(module.props as Hero2Props)} />}
            {module.type === 'form' && <FormModule {...(module.props as FormProps)} />}
            {module.type === 'OurProcess' && <OurProcessModule props={module.props as OurProcessProps} />}
            {module.type === 'contact_form' && <ContactFormModule {...(module.props as ContactFormProps)} />}
          </ModuleWrapper>
        )
      })}
    </div>
  )
} 