'use client'

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import type { Module, HeroProps, FormProps } from './types'

interface EditorStateContextType {
  modules: Module[]
  selectedModuleId: string | null
  isEditorOpen: boolean
  setIsEditorOpen: (value: boolean) => void
  isPublishModalOpen: boolean
  setIsPublishModalOpen: (value: boolean) => void
  selectModule: (id: string) => void
  editModule: (id: string) => void
  updateModule: (id: string, newProps: HeroProps | FormProps) => void
  moveModuleUp: (id: string) => void
  moveModuleDown: (id: string) => void
  duplicateModule: (id: string) => void
  deleteModule: (id: string) => void
  setModules: (modules: Module[]) => void
  addModule: (type: 'hero' | 'form', relativeTo: string, position: 'above' | 'below') => void
  isDirty: boolean
  markClean: () => void
}

const EditorStateContext = createContext<EditorStateContextType | null>(null)

export const EditorStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [modules, setModules] = useState<Module[]>([])
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null)
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false)
  const [isDirty, setIsDirty] = useState(false)

  const selectModule = (id: string) => {
    setSelectedModuleId(id)
  }

  const editModule = (id: string) => {
    setSelectedModuleId(id)
    setIsEditorOpen(true)
  }

  const updateModule = (id: string, newProps: HeroProps | FormProps) => {
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
    }
  }

  const moveModuleDown = (id: string) => {
    const index = modules.findIndex(mod => mod.id === id)
    if (index < modules.length - 1) {
      const newModules = [...modules]
      const [moved] = newModules.splice(index, 1)
      newModules.splice(index + 1, 0, moved)
      setModules(newModules)
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
    }
  }

  const deleteModule = (id: string) => {
    setModules(mods => mods.filter(mod => mod.id !== id))
    if (selectedModuleId === id) {
      setSelectedModuleId(null)
      setIsEditorOpen(false)
    }
  }

  const addModule = (type: 'hero' | 'form', relativeTo: string, position: 'above' | 'below') => {
    const index = modules.findIndex(mod => mod.id === relativeTo)
    const id = `mod-${Date.now()}-${Math.random().toString(36).slice(2)}`
    const newModule: Module = {
      id,
      type,
      props: type === 'hero'
        ? { heading: 'New Hero', subheading: 'Subheading here' }
        : { title: 'New Form', submitText: 'Submit', fields: [] }
    }

    const newModules = [...modules]
    newModules.splice(position === 'above' ? index : index + 1, 0, newModule)
    setModules(newModules)
    setSelectedModuleId(id)

    // Wait a moment before scrolling into view
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 100)
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

export function useEditorState(initialModules: Module[] = []) {
  const context = useContext(EditorStateContext)
  if (!context) {
    throw new Error('useEditorState must be used within an EditorStateProvider')
  }

  // ✅ Fix: Safe initialization of modules
  useEffect(() => {
    if (initialModules.length > 0 && context.modules.length === 0) {
      context.setModules(initialModules)
    }
  }, [initialModules, context.modules.length, context.setModules])

  return context
} 