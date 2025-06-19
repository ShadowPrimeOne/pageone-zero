'use client'

import { ModuleRenderer } from './ModuleRenderer'
import type { Module } from '@/lib/editor/types'
import { useEffect } from 'react'

interface Props {
  modules: Module[]
  isEditMode?: boolean
}

export default function PublicModuleRenderer({ modules }: Props) {
  useEffect(() => {
    // Component mounted
    return () => {
      // Component unmounted
    }
  }, [])

  // Render modules
  return (
    <ModuleRenderer
      modules={modules}
      selectedModuleId={null}
      onSelect={() => {}}
      onDelete={() => {}}
      onMoveUp={() => {}}
      onMoveDown={() => {}}
      onDuplicate={() => {}}
      onEdit={() => {}}
      onAddRequest={() => {}}
      onUpdate={() => {}}
    />
  )
} 