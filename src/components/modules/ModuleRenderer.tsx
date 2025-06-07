'use client'

import type { Module } from '@/lib/editor/types'
import { ModuleWrapper } from './ModuleWrapper'
import { HeroModule } from './HeroModule'
import { FormModule } from './FormModule'

interface Props {
  modules: Module[]
  selectedModuleId: string | null
  selectModule: (id: string) => void
  deleteModule: (id: string) => void
  moveModuleUp: (id: string) => void
  moveModuleDown: (id: string) => void
}

export function ModuleRenderer({
  modules,
  selectedModuleId,
  selectModule,
  deleteModule,
  moveModuleUp,
  moveModuleDown,
}: Props) {
  return (
    <div className="flex flex-col gap-0">
      {modules.map((mod, index) => (
        <ModuleWrapper
          key={mod.id}
          module={mod}
          selected={mod.id === selectedModuleId}
          onSelect={selectModule}
          onDelete={deleteModule}
          onMoveUp={moveModuleUp}
          onMoveDown={moveModuleDown}
          isFirst={index === 0}
          isLast={index === modules.length - 1}
        >
          {mod.type === 'hero' && <HeroModule {...mod.props} />}
          {mod.type === 'form' && <FormModule {...mod.props} />}
        </ModuleWrapper>
      ))}
    </div>
  )
} 