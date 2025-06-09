'use client'

import { EditorStateProvider, useEditorState } from '@/lib/editor/useEditorState'
import { ModuleRenderer } from '@/components/modules/ModuleRenderer'
import { EditorPanel } from '@/components/editor/EditorPanel'
import { SaveButton } from '@/components/editor/SaveButton'
import { useSessionKey } from '@/lib/auth/useSessionKey'
import type { Module } from '@/lib/editor/types'
import { useEffect } from 'react'

interface Props {
  slug: string
  modulesFromServer: Module[]
  pageKey: string
}

function EditorContent({ initialModules }: { initialModules: Module[] }) {
  const {
    modules,
    selectedModuleId,
    isEditorOpen,
    selectModule,
    setIsEditorOpen,
    updateModule,
    deleteModule,
    moveModuleUp,
    moveModuleDown,
    duplicateModule,
    editModule,
    addModule,
    setModules
  } = useEditorState()

  // Initialize modules from server
  useEffect(() => {
    setModules(initialModules)
  }, [initialModules, setModules])

  return (
    <>
      <SaveButton />
      <ModuleRenderer
        modules={modules}
        selectedModuleId={selectedModuleId}
        onSelect={selectModule}
        onDelete={deleteModule}
        onMoveUp={moveModuleUp}
        onMoveDown={moveModuleDown}
        onDuplicate={duplicateModule}
        onEdit={editModule}
        onAddRequest={(relativeId, position) => {
          // For now, we'll just add a hero module
          addModule('hero', relativeId, position)
        }}
      />
      <EditorPanel
        modules={modules}
        selectedModuleId={selectedModuleId}
        isEditorOpen={isEditorOpen}
        setIsEditorOpen={setIsEditorOpen}
        updateModule={updateModule}
      />
    </>
  )
}

export default function PageEditor({ slug, modulesFromServer, pageKey }: Props) {
  const { isAuthorized } = useSessionKey(slug)

  if (!isAuthorized(pageKey)) return null

  return (
    <EditorStateProvider>
      <EditorContent initialModules={modulesFromServer} />
    </EditorStateProvider>
  )
} 