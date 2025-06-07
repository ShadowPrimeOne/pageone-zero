'use client'

import type { Module, HeroProps, FormProps } from '@/lib/editor/types'
import { ModuleWrapper } from './ModuleWrapper'
import { HeroModule } from './HeroModule'
import { FormModule } from './FormModule'

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
  console.log("rendering ModuleRenderer", { modules, selectedModuleId })

  return (
    <div className="flex flex-col gap-4">
      {modules.map((module, index) => {
        console.log("rendering module", { module, index })
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
            isFirst={index === 0}
            isLast={index === modules.length - 1}
          >
            {module.type === 'hero' && <HeroModule {...(module.props as HeroProps)} />}
            {module.type === 'form' && <FormModule {...(module.props as FormProps)} />}
          </ModuleWrapper>
        )
      })}
    </div>
  )
} 