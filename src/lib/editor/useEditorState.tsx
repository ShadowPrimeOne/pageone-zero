'use client'

import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react'
import type { Module } from './types'
import { DEFAULT_MODULE_IDS, ModuleType } from './defaultModules'
import { fetchModuleTemplateById } from './db'

interface EditorStateContextType {
  modules: Module[]
  selectedModuleId: string | null
  isEditorOpen: boolean
  setIsEditorOpen: (value: boolean) => void
  isPublishModalOpen: boolean
  setIsPublishModalOpen: (value: boolean) => void
  selectModule: (id: string) => void
  editModule: (id: string) => void
  updateModule: (id: string, updates: Partial<Module>) => void
  moveModuleUp: (id: string) => void
  moveModuleDown: (id: string) => void
  duplicateModule: (id: string) => void
  deleteModule: (id: string) => void
  setModules: (modules: Module[]) => void
  addModule: (type: ModuleType, relativeTo: string, position: 'above' | 'below') => void
  isDirty: boolean
  markClean: () => void
  setSelectedModuleId: (id: string | null) => void
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

  // Sync modules with initialModules
  useEffect(() => {
    if (initialModules.length > 0) {
      setModules(initialModules)
    }
  }, [initialModules])

  const selectModule = useCallback((id: string) => {
    setSelectedModuleId(id)
  }, [])

  const editModule = useCallback((id: string) => {
    setSelectedModuleId(id)
    setIsEditorOpen(true)
  }, [])

  const updateModule = useCallback((moduleId: string, updates: Partial<Module>) => {
    console.log('useEditorState: updateModule called with:', { moduleId, updates })
    console.log('useEditorState: Current modules state:', modules)
    
    setModules(prevModules => {
      console.log('useEditorState: Previous modules:', prevModules)
      
      const moduleIndex = prevModules.findIndex(m => m.id === moduleId)
      if (moduleIndex === -1) {
        console.log('useEditorState: Module not found:', moduleId)
        return prevModules
      }

      const moduleToUpdate = prevModules[moduleIndex]
      console.log('useEditorState: Found module to update:', moduleToUpdate)

      // Create a new module with merged updates
      const updatedModule = {
        ...moduleToUpdate,
        props: {
          ...moduleToUpdate.props,
          ...(updates.props || {})
        }
      }

      // Handle background updates separately to ensure proper merging
      if (updates.props?.background) {
        updatedModule.props.background = {
          ...moduleToUpdate.props.background,
          ...updates.props.background,
          type: updates.props.background.type || moduleToUpdate.props.background?.type || 'color',
          color: updates.props.background.type === 'color' ? (updates.props.background.color || moduleToUpdate.props.background?.color || '#000000') : '#000000',
          opacity: updates.props.background.opacity ?? moduleToUpdate.props.background?.opacity ?? 1,
          image: updates.props.background.type === 'image' ? updates.props.background.image : moduleToUpdate.props.background?.image,
          _tempFile: updates.props.background._tempFile || moduleToUpdate.props.background?._tempFile,
          overlay: {
            color: updates.props.background.overlay?.color || moduleToUpdate.props.background?.overlay?.color || '#000000',
            opacity: updates.props.background.overlay?.opacity ?? moduleToUpdate.props.background?.overlay?.opacity ?? 0.5
          }
        }
      }

      console.log('useEditorState: Applying updates:', updatedModule)
      
      // Create new array with updated module
      const newModules = [...prevModules]
      newModules[moduleIndex] = updatedModule
      
      console.log('useEditorState: New modules state:', newModules)
      return newModules
    })

    // Set dirty state to true when module is updated
    setIsDirty(true)
  }, [modules]) // Add modules to dependency array

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

  const addModule = async (type: ModuleType, relativeTo: string, position: 'above' | 'below') => {
    const templateId = DEFAULT_MODULE_IDS[type]
    if (!templateId) {
      console.error(`❌ No default template ID for ${type}`)
      return
    }

    const template = await fetchModuleTemplateById(templateId)
    if (!template) {
      console.error(`❌ Could not load template for ID ${templateId}`)
      return
    }

    const newModule = {
      id: crypto.randomUUID(),
      type: template.type,
      category: template.category,
      props: template.props,
    }

    setModules(prevModules => {
      // If this is the first module, just add it
      if (prevModules.length === 0) {
        return [newModule]
      }

      // Otherwise, add it relative to the specified module
      const relativeIndex = prevModules.findIndex(m => m.id === relativeTo)
      if (relativeIndex === -1) return prevModules

      const newModules = [...prevModules]
      newModules.splice(position === 'above' ? relativeIndex : relativeIndex + 1, 0, newModule)
      return newModules
    })
    setSelectedModuleId(newModule.id)
    setIsEditorOpen(true)
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
    markClean,
    setSelectedModuleId
  }

  return (
    <EditorStateContext.Provider value={value}>
      {children}
    </EditorStateContext.Provider>
  )
} 