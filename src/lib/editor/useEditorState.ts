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
    duplicateModule,
    deleteModule,
    setModules
  }
} 