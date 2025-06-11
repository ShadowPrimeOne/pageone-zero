'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import type { Module, HeroProps, FormProps, Hero2Props, ClassicOverlayHeroProps, TopImageCenterTextHeroProps, SplitLayoutHeroProps, OurProcessProps, ContactFormProps } from './types'

interface EditorStateContextType {
  modules: Module[]
  selectedModuleId: string | null
  isEditorOpen: boolean
  setIsEditorOpen: (value: boolean) => void
  isPublishModalOpen: boolean
  setIsPublishModalOpen: (value: boolean) => void
  selectModule: (id: string) => void
  editModule: (id: string) => void
  updateModule: (id: string, updates: Partial<HeroProps | FormProps | Hero2Props | ClassicOverlayHeroProps | TopImageCenterTextHeroProps | SplitLayoutHeroProps | OurProcessProps | ContactFormProps>) => void
  moveModuleUp: (id: string) => void
  moveModuleDown: (id: string) => void
  duplicateModule: (id: string) => void
  deleteModule: (id: string) => void
  setModules: (modules: Module[]) => void
  addModule: (type: 'classic_overlay_hero' | 'top_image_center_text_hero' | 'split_layout_hero', relativeTo: string, position: 'above' | 'below') => void
  isDirty: boolean
  markClean: () => void
}

const EditorStateContext = createContext<EditorStateContextType | undefined>(undefined)

export const useEditorState = () => {
  const context = useContext(EditorStateContext)
  if (!context) {
    throw new Error('useEditorState must be used within an EditorStateProvider')
  }
  return context
}

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

  const selectModule = (id: string) => {
    setSelectedModuleId(id)
    // Don't open editor on selection
  }

  const editModule = (id: string) => {
    setSelectedModuleId(id)
    setIsEditorOpen(true)
  }

  const updateModule = (id: string, updates: Partial<HeroProps | FormProps | Hero2Props | ClassicOverlayHeroProps | TopImageCenterTextHeroProps | SplitLayoutHeroProps | OurProcessProps | ContactFormProps>) => {
    console.log('useEditorState: Updating module:', id, updates)
    setModules(prevModules => {
      const updatedModules = prevModules.map(module => {
        if (module.id === id) {
          console.log('useEditorState: Found module to update:', module)
          // Create a new module object to ensure state update
          const updatedModule = {
            ...module,
            props: {
              ...module.props,
              ...updates
            }
          }
          console.log('useEditorState: Updated module:', updatedModule)
          return updatedModule
        }
        return module
      })
      console.log('useEditorState: New modules state:', updatedModules)
      return updatedModules
    })
    setIsDirty(true)
  }

  const moveModuleUp = (id: string) => {
    setModules(prevModules => {
      const index = prevModules.findIndex(m => m.id === id)
      if (index <= 0) return prevModules

      const newModules = [...prevModules]
      const temp = newModules[index]
      newModules[index] = newModules[index - 1]
      newModules[index - 1] = temp
      return newModules
    })
    setIsDirty(true)
  }

  const moveModuleDown = (id: string) => {
    setModules(prevModules => {
      const index = prevModules.findIndex(m => m.id === id)
      if (index === -1 || index === prevModules.length - 1) return prevModules

      const newModules = [...prevModules]
      const temp = newModules[index]
      newModules[index] = newModules[index + 1]
      newModules[index + 1] = temp
      return newModules
    })
    setIsDirty(true)
  }

  const duplicateModule = (id: string) => {
    setModules(prevModules => {
      const moduleToDuplicate = prevModules.find(m => m.id === id)
      if (!moduleToDuplicate) return prevModules

      const newModule = {
        ...moduleToDuplicate,
        id: crypto.randomUUID()
      }

      const index = prevModules.findIndex(m => m.id === id)
      const newModules = [...prevModules]
      newModules.splice(index + 1, 0, newModule)
      return newModules
    })
    setIsDirty(true)
  }

  const deleteModule = (id: string) => {
    setModules(prevModules => prevModules.filter(m => m.id !== id))
    if (selectedModuleId === id) {
      setSelectedModuleId(null)
      setIsEditorOpen(false)
    }
    setIsDirty(true)
  }

  const addModule = (type: 'classic_overlay_hero' | 'top_image_center_text_hero' | 'split_layout_hero', relativeTo: string, position: 'above' | 'below') => {
    const newModule: Module = {
      id: crypto.randomUUID(),
      type,
      props: {
        heading: 'New Module',
        subheading: 'Add your content here',
        background: {
          type: 'color',
          color: '#ffffff',
          opacity: 1
        }
      }
    }

    setModules(prevModules => {
      const relativeIndex = prevModules.findIndex(m => m.id === relativeTo)
      if (relativeIndex === -1) return prevModules

      const newModules = [...prevModules]
      newModules.splice(position === 'above' ? relativeIndex : relativeIndex + 1, 0, newModule)
      return newModules
    })
    setIsDirty(true)
  }

  const markClean = () => {
    setIsDirty(false)
  }

  const value = {
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
    markClean
  }

  return (
    <EditorStateContext.Provider value={value}>
      {children}
    </EditorStateContext.Provider>
  )
} 