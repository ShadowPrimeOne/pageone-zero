'use client'

import React, { useEffect } from 'react'
import type { Module, HeroProps, FormProps, OurProcessProps, ContactFormProps, Hero2Props, ClassicOverlayHeroProps, TopImageCenterTextHeroProps, SplitLayoutHeroProps, ModuleBackground } from '@/lib/editor/types'
import { ModuleWrapper } from './ModuleWrapper'
import dynamic from 'next/dynamic'
import { useEditorControls } from '@/lib/editor/useEditorControls'

// Lazy load all module components
const HeroModule = dynamic(() => import('./HeroModule').then(mod => ({ default: mod.HeroModule })), {
  loading: () => (
    <div className="w-full h-32 flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
    </div>
  )
})
const Hero2Module = dynamic(() => import('./Hero2Module').then(mod => ({ default: mod.Hero2Module })), {
  loading: () => (
    <div className="w-full h-32 flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
    </div>
  )
})
const ClassicOverlayHero = dynamic(() => import('./ClassicOverlayHero'), {
  loading: () => (
    <div className="w-full h-32 flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
    </div>
  )
})
const TopImageCenterTextHero = dynamic(() => import('./TopImageCenterTextHero'), {
  loading: () => (
    <div className="w-full h-32 flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
    </div>
  )
})
const SplitLayoutHero = dynamic(() => import('./SplitLayoutHero').then(mod => ({ default: mod.SplitLayoutHero })), {
  loading: () => (
    <div className="w-full h-32 flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
    </div>
  )
})
const FormModule = dynamic(() => import('./FormModule'), {
  loading: () => (
    <div className="w-full h-32 flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
    </div>
  )
})
const OurProcessModule = dynamic(() => import('./OurProcessModule'), {
  loading: () => (
    <div className="w-full h-32 flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
    </div>
  )
})
const ContactFormModule = dynamic(() => import('./ContactFormModule').then(mod => ({ default: mod.ContactFormModule })), {
  loading: () => (
    <div className="w-full h-32 flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
    </div>
  )
})

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

  // Debug logging for ModuleRenderer
  useEffect(() => {
    console.log('🔍 ModuleRenderer Debug Info:')
    console.log('Number of modules:', modules.length)
    console.log('Selected module ID:', selectedModuleId)
    
    const rendererContainer = document.querySelector('[data-renderer]')
    if (rendererContainer) {
      const rect = rendererContainer.getBoundingClientRect()
      const styles = window.getComputedStyle(rendererContainer)
      console.log('ModuleRenderer container dimensions:', rect.width, 'x', rect.height)
      console.log('ModuleRenderer container styles:', {
        height: styles.height,
        minHeight: styles.minHeight,
        maxHeight: styles.maxHeight,
        overflow: styles.overflow,
        display: styles.display,
        position: styles.position
      })
    }
  }, [modules.length, selectedModuleId])

  const renderModule = (module: Module) => {
    const Component = MODULE_COMPONENTS[module.type as keyof typeof MODULE_COMPONENTS]
    if (!Component) {
      return null
    }

    const handleUpdate = (updates: Partial<ModuleComponentProps>) => {
      if (updates.background) {
        const currentBackground = module.props.background || {} as ModuleBackground
        const newBackground: ModuleBackground = {
          type: updates.background.type || currentBackground.type || 'color',
          color: updates.background.type === 'color' ? (updates.background.color || currentBackground.color || '#000000') : '#000000',
          opacity: updates.background.opacity ?? currentBackground.opacity ?? 1,
          image: updates.background.type === 'image' ? updates.background.image : currentBackground.image,
          _tempFile: updates.background._tempFile ? {
            name: updates.background._tempFile.name || 'temp',
            type: updates.background._tempFile.type,
            size: updates.background._tempFile.size || 0,
            data: updates.background._tempFile.data
          } : currentBackground._tempFile,
          overlay: {
            color: updates.background.overlay?.color || currentBackground.overlay?.color || '#000000',
            opacity: updates.background.overlay?.opacity ?? currentBackground.overlay?.opacity ?? 0.5
          }
        }
        updates.background = newBackground
      }
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
                heading: (module.props as ClassicOverlayHeroProps).heading || '',
                subheading: (module.props as ClassicOverlayHeroProps).subheading || '',
                body: (module.props as ClassicOverlayHeroProps).body || ''
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
                heading: (module.props as TopImageCenterTextHeroProps).heading || '',
                subheading: (module.props as TopImageCenterTextHeroProps).subheading || '',
                body: (module.props as TopImageCenterTextHeroProps).body || ''
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
            body={(module.props as SplitLayoutHeroProps).htmlContent?.body || (module.props as SplitLayoutHeroProps).body}
            ctaText={(module.props as SplitLayoutHeroProps).htmlContent?.ctaText || (module.props as SplitLayoutHeroProps).ctaText || 'Get Started'}
            ctaLink={(module.props as SplitLayoutHeroProps).ctaLink || '#'}
            ctaTextColor={(module.props as SplitLayoutHeroProps).ctaTextColor}
            ctaBorderColor={(module.props as SplitLayoutHeroProps).ctaBorderColor}
            ctaBackgroundColor={(module.props as SplitLayoutHeroProps).ctaBackgroundColor}
            ctaBackgroundOpacity={(module.props as SplitLayoutHeroProps).ctaBackgroundOpacity}
            onUpdate={(updates: Partial<SplitLayoutHeroProps>) => {
              const updatedModule = {
                ...module,
                props: {
                  ...module.props,
                  ...updates
                }
              }
              onUpdate(updatedModule)
            }}
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
          className="btn btn-primary px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
        >
          + Add Module
        </button>
      </div>
    )
  }

  return (
    <div data-renderer>
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