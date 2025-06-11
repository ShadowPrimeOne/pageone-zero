'use client'

import type { Module, HeroProps, Hero2Props, ClassicOverlayHeroProps, TopImageCenterTextHeroProps, SplitLayoutHeroProps, FormProps, OurProcessProps, ContactFormProps } from '@/lib/editor/types'
import { ModuleWrapper } from './ModuleWrapper'
import { HeroModule } from './HeroModule'
import { Hero2Module } from './Hero2Module'
import { ClassicOverlayHero } from './ClassicOverlayHero'
import { TopImageCenterTextHero } from './TopImageCenterTextHero'
import { SplitLayoutHero } from './SplitLayoutHero'
import { FormModule } from './FormModule'
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
  onUpdate?: (moduleId: string, updates: Partial<HeroProps | Hero2Props | ClassicOverlayHeroProps | TopImageCenterTextHeroProps | SplitLayoutHeroProps | FormProps | OurProcessProps | ContactFormProps>) => void
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
  onUpdate,
}: Props) {
  console.log('ModuleRenderer render:', { modules, selectedModuleId, hasUpdateHandler: !!onUpdate })
  
  return (
    <>
      {modules.map((module, index) => {
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
            onUpdate={(moduleId, updates) => {
              console.log('ModuleRenderer: Received update from ModuleWrapper:', { moduleId, updates })
              onUpdate?.(moduleId, updates)
            }}
          >
            {module.type === 'hero' && <HeroModule {...(module.props as HeroProps)} />}
            {module.type === 'hero2' && <Hero2Module {...(module.props as Hero2Props)} />}
            {module.type === 'classic_overlay_hero' && (
              <ClassicOverlayHero 
                {...(module.props as ClassicOverlayHeroProps)} 
                onUpdate={(updates) => {
                  console.log('ClassicOverlayHero update:', module.id, updates)
                  onUpdate?.(module.id, updates)
                }} 
              />
            )}
            {module.type === 'top_image_center_text_hero' && (
              <TopImageCenterTextHero 
                {...(module.props as TopImageCenterTextHeroProps)} 
                onUpdate={(updates) => {
                  console.log('TopImageCenterTextHero update:', module.id, updates)
                  onUpdate?.(module.id, updates)
                }} 
              />
            )}
            {module.type === 'split_layout_hero' && (
              <SplitLayoutHero 
                {...(module.props as SplitLayoutHeroProps)} 
                onUpdate={(updates) => {
                  console.log('SplitLayoutHero update:', module.id, updates)
                  onUpdate?.(module.id, updates)
                }} 
              />
            )}
            {module.type === 'form' && <FormModule {...(module.props as FormProps)} />}
            {module.type === 'OurProcess' && <OurProcessModule props={module.props as OurProcessProps} />}
            {module.type === 'contact_form' && <ContactFormModule {...(module.props as ContactFormProps)} />}
          </ModuleWrapper>
        )
      })}
    </>
  )
} 