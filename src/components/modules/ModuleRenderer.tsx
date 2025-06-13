'use client'

import React from 'react'
import type { Module } from '@/lib/editor/types'
import { ModuleWrapper } from './ModuleWrapper'
import { HeroModule } from './HeroModule'
import { Hero2Module } from './Hero2Module'
import ClassicOverlayHero from './ClassicOverlayHero'
import { TopImageCenterTextHero } from './TopImageCenterTextHero'
import { SplitLayoutHero } from './SplitLayoutHero'
import { FormModule } from './FormModule'
import OurProcessModule from './OurProcessModule'
import { ContactFormModule } from './ContactFormModule'
import type { HeroProps, Hero2Props, ClassicOverlayHeroProps, TopImageCenterTextHeroProps, SplitLayoutHeroProps, FormProps, OurProcessProps, ContactFormProps } from '@/lib/editor/types'
import { useEditorControls } from '@/lib/editor/useEditorControls'

interface ModuleRendererProps {
  modules: Module[]
  selectedModuleId: string | null
  onSelect: (id: string) => void
  onDelete: (id: string) => void
  onMoveUp: (id: string) => void
  onMoveDown: (id: string) => void
  onDuplicate: (id: string) => void
  onEdit: (id: string) => void
  onAddRequest: () => void
  onUpdate: (id: string, updates: Partial<Module>) => void
}

interface ModuleComponentProps {
  props: any
}

const MODULE_COMPONENTS: Record<string, React.ComponentType<ModuleComponentProps>> = {
  hero: HeroModule,
  hero2: Hero2Module,
  form: FormModule,
  classic_overlay_hero: ClassicOverlayHero,
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
  onUpdate
}: ModuleRendererProps) {
  const { setIsAddModalOpen } = useEditorControls()

  const renderModule = (module: Module) => {
    const Component = MODULE_COMPONENTS[module.type]
    if (!Component) {
      console.error(`No component found for module type: ${module.type}`)
      return null
    }
    return (
      <ModuleWrapper
        key={module.id}
        module={module}
        selected={selectedModuleId === module.id}
        onSelect={onSelect}
        onDelete={onDelete}
        onMoveUp={onMoveUp}
        onMoveDown={onMoveDown}
        onDuplicate={onDuplicate}
        onEdit={onEdit}
        onAddRequest={onAddRequest}
        onUpdate={onUpdate}
        isFirst={modules.indexOf(module) === 0}
        isLast={modules.indexOf(module) === modules.length - 1}
      >
        <Component props={module.props} />
      </ModuleWrapper>
    )
  }

  if (modules.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="text-white bg-black px-6 py-3 rounded-full text-lg hover:bg-gray-800 transition"
        >
          + Add Module
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {modules.map(renderModule)}
    </div>
  )
}

export default ModuleRenderer; 