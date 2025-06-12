'use client'

import React from 'react'
import type { Module } from '@/lib/editor/types'
import { ModuleWrapper } from './ModuleWrapper'
import { HeroModule } from './HeroModule'
import { Hero2Module } from './Hero2Module'
import { ClassicOverlayHero } from './ClassicOverlayHero'
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
    <div className="space-y-4">
      {modules.map((module, index) => {
        const isFirst = index === 0
        const isLast = index === modules.length - 1
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
            isFirst={isFirst}
            isLast={isLast}
          >
            {module.type === 'hero' && <HeroModule {...(module.props as HeroProps)} />}
            {module.type === 'hero2' && <Hero2Module {...(module.props as Hero2Props)} />}
            {module.type === 'classic_overlay_hero' && <ClassicOverlayHero {...(module.props as ClassicOverlayHeroProps)} />}
            {module.type === 'top_image_center_text_hero' && <TopImageCenterTextHero {...(module.props as TopImageCenterTextHeroProps)} />}
            {module.type === 'split_layout_hero' && <SplitLayoutHero {...(module.props as SplitLayoutHeroProps)} />}
            {module.type === 'form' && <FormModule {...(module.props as FormProps)} />}
            {module.type === 'OurProcess' && <OurProcessModule props={module.props as OurProcessProps} />}
            {module.type === 'contact_form' && <ContactFormModule {...(module.props as ContactFormProps)} />}
          </ModuleWrapper>
        )
      })}
    </div>
  )
}

export default ModuleRenderer; 