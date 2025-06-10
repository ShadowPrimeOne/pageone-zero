'use client'

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import type { Module, HeroProps, FormProps, ClassicOverlayHeroProps, TopImageCenterTextHeroProps, SplitLayoutHeroProps } from './types'

interface EditorStateContextType {
  modules: Module[]
  selectedModuleId: string | null
  isEditorOpen: boolean
  setIsEditorOpen: (value: boolean) => void
  isPublishModalOpen: boolean
  setIsPublishModalOpen: (value: boolean) => void
  selectModule: (id: string) => void
  editModule: (id: string) => void
  updateModule: (id: string, newProps: HeroProps | FormProps | ClassicOverlayHeroProps | TopImageCenterTextHeroProps | SplitLayoutHeroProps) => void
  moveModuleUp: (id: string) => void
  moveModuleDown: (id: string) => void
  duplicateModule: (id: string) => void
  deleteModule: (id: string) => void
  setModules: (modules: Module[]) => void
  addModule: (type: 'classic_overlay_hero' | 'top_image_center_text_hero' | 'split_layout_hero', relativeTo: string, position: 'above' | 'below') => void
  isDirty: boolean
  markClean: () => void
}

const EditorStateContext = createContext<EditorStateContextType | null>(null)

interface EditorStateProviderProps {
  children: ReactNode
  initialModules?: Module[]
}

export const EditorStateProvider: React.FC<EditorStateProviderProps> = ({ 
  children, 
  initialModules = []
}) => {
  const [modules, setModules] = useState<Module[]>(initialModules)
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null)
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false)
  const [isDirty, setIsDirty] = useState(false)

  // Update modules when initialModules changes
  useEffect(() => {
    if (initialModules.length > 0) {
      setModules(initialModules)
    }
  }, [initialModules])

  const selectModule = (id: string) => {
    setSelectedModuleId(id)
  }

  const editModule = (id: string) => {
    setSelectedModuleId(id)
    setIsEditorOpen(true)
  }

  const updateModule = (id: string, newProps: HeroProps | FormProps | ClassicOverlayHeroProps | TopImageCenterTextHeroProps | SplitLayoutHeroProps) => {
    setModules(mods =>
      mods.map(mod => mod.id === id ? { ...mod, props: newProps } : mod)
    )
    setIsDirty(true)
  }

  const markClean = () => setIsDirty(false)

  const moveModuleUp = (id: string) => {
    const index = modules.findIndex(mod => mod.id === id)
    if (index > 0) {
      const newModules = [...modules]
      const [moved] = newModules.splice(index, 1)
      newModules.splice(index - 1, 0, moved)
      setModules(newModules)
      setIsDirty(true)
    }
  }

  const moveModuleDown = (id: string) => {
    const index = modules.findIndex(mod => mod.id === id)
    if (index < modules.length - 1) {
      const newModules = [...modules]
      const [moved] = newModules.splice(index, 1)
      newModules.splice(index + 1, 0, moved)
      setModules(newModules)
      setIsDirty(true)
    }
  }

  const duplicateModule = (id: string) => {
    const index = modules.findIndex(m => m.id === id)
    if (index !== -1) {
      const original = modules[index]
      const duplicated = {
        ...original,
        id: `${original.id}-copy-${Date.now()}`
      }
      const newModules = [...modules]
      newModules.splice(index + 1, 0, duplicated)
      setModules(newModules)
      setIsDirty(true)
    }
  }

  const deleteModule = (id: string) => {
    setModules(mods => mods.filter(mod => mod.id !== id))
    if (selectedModuleId === id) {
      setSelectedModuleId(null)
      setIsEditorOpen(false)
    }
    setIsDirty(true)
  }

  const addModule = (type: 'classic_overlay_hero' | 'top_image_center_text_hero' | 'split_layout_hero', relativeTo: string, position: 'above' | 'below') => {
    const index = modules.findIndex(mod => mod.id === relativeTo)
    const id = `mod-${Date.now()}-${Math.random().toString(36).slice(2)}`
    
    let props: ClassicOverlayHeroProps | TopImageCenterTextHeroProps | SplitLayoutHeroProps
    
    switch (type) {
      case 'classic_overlay_hero':
        props = {
          heading: 'Classic Overlay Hero',
          subheading: 'High-impact visual services (e.g., automotive, fitness, travel)',
          background: {
            type: 'image',
            color: '#000000',
            opacity: 0.6,
            overlay: {
              color: '#000000',
              opacity: 0.4
            }
          }
        }
        break
      case 'top_image_center_text_hero':
        props = {
          heading: 'Top Image + Center Text',
          subheading: 'Clear product intros, coaching, services',
          background: {
            type: 'color',
            color: '#ffffff',
            opacity: 1
          }
        }
        break
      case 'split_layout_hero':
        props = {
          heading: 'Split Layout Hero',
          subheading: 'Personal brands, consultants, lawyers',
          background: {
            type: 'color',
            color: '#ffffff',
            opacity: 1
          }
        }
        break
    }

    const newModule: Module = {
      id,
      type,
      props
    }

    const newModules = [...modules]
    newModules.splice(position === 'above' ? index : index + 1, 0, newModule)
    setModules(newModules)
    setSelectedModuleId(id)
    setIsDirty(true)

    // Wait for the DOM to update before scrolling
    requestAnimationFrame(() => {
      const element = document.getElementById(id)
      if (element) {
        const menuHeight = 60 // Approximate height of the menu
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - menuHeight

        // First scroll to position
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })

        // Then lock scroll after animation completes
        setTimeout(() => {
          const finalScrollY = offsetPosition // Use the same position we scrolled to
          document.body.style.overflow = 'hidden'
          document.body.style.position = 'fixed'
          document.body.style.top = `-${finalScrollY}px`
          document.body.style.width = '100%'
        }, 300)
      }
    })
  }

  const value: EditorStateContextType = {
    modules,
    selectedModuleId,
    isEditorOpen,
    setIsEditorOpen,
    isPublishModalOpen,
    setIsPublishModalOpen,
    selectModule,
    editModule,
    updateModule,
    moveModuleUp,
    moveModuleDown,
    duplicateModule,
    deleteModule,
    setModules,
    addModule,
    isDirty,
    markClean,
  }

  return (
    <EditorStateContext.Provider value={value}>
      {children}
    </EditorStateContext.Provider>
  )
}

export const useEditorState = () => {
  const context = useContext(EditorStateContext)
  if (!context) {
    throw new Error('useEditorState must be used within an EditorStateProvider')
  }
  return context
} 