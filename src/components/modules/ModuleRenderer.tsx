'use client'

import React from 'react'
import type { Module, HeroProps, FormProps, OurProcessProps, ContactFormProps, Hero2Props, ClassicOverlayHeroProps, TopImageCenterTextHeroProps, SplitLayoutHeroProps } from '@/lib/editor/types'
import { ModuleWrapper } from './ModuleWrapper'
import { HeroModule } from './HeroModule'
import { Hero2Module } from './Hero2Module'
import ClassicOverlayHero from './ClassicOverlayHero'
import TopImageCenterTextHero from './TopImageCenterTextHero'
import { SplitLayoutHero } from './SplitLayoutHero'
import FormModule from './FormModule'
import OurProcessModule from './OurProcessModule'
import { ContactFormModule } from './ContactFormModule'
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

type ModuleComponentProps = HeroProps | Hero2Props | ClassicOverlayHeroProps | TopImageCenterTextHeroProps | SplitLayoutHeroProps | FormProps | OurProcessProps | ContactFormProps

const MODULE_COMPONENTS = {
  hero: HeroModule,
  hero2: Hero2Module,
  form: FormModule,
  classic_overlay_hero: ClassicOverlayHero,
  top_image_center_text_hero: TopImageCenterTextHero,
  split_layout_hero: SplitLayoutHero,
  OurProcess: OurProcessModule,
  contact_form: ContactFormModule,
} as const

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
    const Component = MODULE_COMPONENTS[module.type as keyof typeof MODULE_COMPONENTS]
    if (!Component) {
      console.error(`No component found for module type: ${module.type}`)
      return null
    }

    const handleUpdate = (updates: Partial<ModuleComponentProps>) => {
      onUpdate(module.id, { props: { ...module.props, ...updates } })
    }

    // Type guard to ensure correct props are passed to each component
    switch (module.type) {
      case 'hero':
        return <HeroModule {...module.props as HeroProps} />
      case 'hero2':
        return <Hero2Module {...module.props as Hero2Props} onUpdate={handleUpdate} />
      case 'form':
        return <FormModule props={module.props as FormProps} />
      case 'classic_overlay_hero':
        return (
          <ClassicOverlayHero
            props={{
              ...(module.props as ClassicOverlayHeroProps),
              htmlContent: (module.props as ClassicOverlayHeroProps).htmlContent || {
                heading: (module.props as ClassicOverlayHeroProps).heading,
                subheading: (module.props as ClassicOverlayHeroProps).subheading
              },
              onUpdate: (updates: Partial<ClassicOverlayHeroProps>) => handleUpdate(updates)
            }}
          />
        )
      case 'top_image_center_text_hero':
        return (
          <TopImageCenterTextHero
            props={{
              ...(module.props as TopImageCenterTextHeroProps),
              htmlContent: (module.props as TopImageCenterTextHeroProps).htmlContent || {
                heading: (module.props as TopImageCenterTextHeroProps).heading,
                subheading: (module.props as TopImageCenterTextHeroProps).subheading
              },
              onUpdate: (updates: Partial<TopImageCenterTextHeroProps>) => handleUpdate(updates)
            }}
          />
        )
      case 'split_layout_hero':
        return (
          <SplitLayoutHero
            {...(module.props as SplitLayoutHeroProps)}
            heading={(module.props as SplitLayoutHeroProps).htmlContent?.heading || (module.props as SplitLayoutHeroProps).heading}
            subheading={(module.props as SplitLayoutHeroProps).htmlContent?.subheading || (module.props as SplitLayoutHeroProps).subheading}
            onUpdate={(updates: Partial<SplitLayoutHeroProps>) => handleUpdate(updates)}
          />
        )
      case 'OurProcess':
        return <OurProcessModule props={module.props as OurProcessProps} />
      case 'contact_form':
        return <ContactFormModule {...module.props as ContactFormProps} />
      default:
        return null
    }
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
      {modules.map((module) => (
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
          {renderModule(module)}
        </ModuleWrapper>
      ))}
    </div>
  )
}

export default ModuleRenderer; 