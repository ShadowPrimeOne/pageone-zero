'use client'

import { useState } from 'react'
import type { Module, HeroProps, FormProps } from './types'

export function useEditorState(initialModules: Module[] = []) {
  const [modules, setModules] = useState<Module[]>(initialModules)
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null)
  const [isEditorPanelOpen, setIsEditorPanelOpen] = useState(false)
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false)

  const selectModule = (id: string) => {
    setSelectedModuleId(id)
  }

  const editModule = (id: string) => {
    setSelectedModuleId(id)
    setIsEditorPanelOpen(true)
  }

  const updateModule = (id: string, props: HeroProps | FormProps) => {
    setModules(prev =>
      prev.map(mod => (mod.id === id ? { ...mod, props } : mod))
    )
  }

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

  const deleteModule = (id: string) => {
    setModules(mods => mods.filter(mod => mod.id !== id))
    if (selectedModuleId === id) {
      setSelectedModuleId(null)
      setIsEditorPanelOpen(false)
    }
  }

  return {
    modules,
    selectedModuleId,
    isEditorPanelOpen,
    setIsEditorPanelOpen,
    isPublishModalOpen,
    setIsPublishModalOpen,
    selectModule,
    editModule,
    updateModule,
    moveModuleUp,
    moveModuleDown,
    deleteModule,
    setModules
  }
} 