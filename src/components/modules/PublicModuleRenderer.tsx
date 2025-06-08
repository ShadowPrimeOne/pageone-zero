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
    console.log('🔄 PublicModuleRenderer mounted')
    return () => console.log('🔄 PublicModuleRenderer unmounted')
  }, [])

  console.log('🎨 PublicModuleRenderer rendering with modules:', modules)

  return (
    <main className="min-h-screen bg-gray-50">
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
    </main>
  )
} 