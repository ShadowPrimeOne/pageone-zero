'use client'

import { EditModuleModal } from './EditModuleModal'
import type { Module } from '@/lib/editor/types'

interface EditorPanelProps {
  modules: Module[]
  selectedModuleId: string | null
  isEditorOpen: boolean
  setIsEditorOpen: (open: boolean) => void
  updateModule: (module: Module) => void
}

export function EditorPanel({ 
  modules, 
  selectedModuleId, 
  isEditorOpen, 
  setIsEditorOpen, 
  updateModule 
}: EditorPanelProps) {
  const selectedModule = modules.find(m => m.id === selectedModuleId)

  if (!isEditorOpen || !selectedModule) {
    return null
  }

  return (
    <EditModuleModal
      isOpen={isEditorOpen}
      close={() => setIsEditorOpen(false)}
      module={selectedModule}
      onUpdate={updateModule}
    />
  )
} 