'use client'

import { ModuleRenderer } from './ModuleRenderer'
import type { Module } from '@/lib/editor/types'

interface Props {
  modules: Module[]
  isEditMode?: boolean
}

export default function PublicModuleRenderer({ modules }: Props) {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
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
      />
    </div>
  )
} 