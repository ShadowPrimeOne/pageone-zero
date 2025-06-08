'use client'

import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { Module } from '@/lib/editor/types'
import { ModuleRenderer } from './ModuleRenderer'
import { EditorPanel } from '@/components/editor/EditorPanel'
import { EditorStateProvider, useEditorState } from '@/lib/editor/useEditorState'

type Props = {
  modules: Module[]
}

function EditorView({ modules }: Props) {
  const editorState = useEditorState(modules)
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null)
  const [isEditorOpen, setIsEditorOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <ModuleRenderer 
          modules={editorState.modules}
          selectedModuleId={selectedModuleId}
          onSelect={setSelectedModuleId}
          onDelete={() => {}}
          onMoveUp={() => {}}
          onMoveDown={() => {}}
          onDuplicate={() => {}}
          onEdit={() => setIsEditorOpen(true)}
          onAddRequest={() => {}}
        />
        <EditorPanel 
          modules={editorState.modules}
          selectedModuleId={selectedModuleId}
          isEditorOpen={isEditorOpen}
          setIsEditorOpen={setIsEditorOpen}
          updateModule={() => {}}
        />
      </div>
    </div>
  )
}

export default function PublicModuleRenderer({ modules }: Props) {
  const searchParams = useSearchParams()
  const isEditing = searchParams.get('edit') === 'true'

  if (isEditing) {
    return (
      <EditorStateProvider>
        <EditorView modules={modules} />
      </EditorStateProvider>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
    </div>
  )
} 