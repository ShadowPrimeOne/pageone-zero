import React from 'react'
import { ModuleRenderer } from './modules/ModuleRenderer'
import type { Module } from '@/lib/editor/types'

interface Props {
  data: {
    modules: Module[]
  }
}

export default function PageRenderer({ data }: Props) {
  return (
    <div>
      <ModuleRenderer
        modules={data.modules}
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