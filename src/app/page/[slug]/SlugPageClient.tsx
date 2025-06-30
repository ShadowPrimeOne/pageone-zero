'use client'

import { useSessionKey } from '@/lib/auth/useSessionKey'
import { SaveButton } from '@/components/editor/SaveButton'
import { EditorStateProvider, useEditorState } from '@/lib/editor/useEditorState'
import { ModuleRenderer } from '@/components/modules/ModuleRenderer'
import type { Module } from '@/lib/editor/types'
import { useEffect, useState } from 'react'
import { getModuleTemplates } from '@/lib/editor/db'
import { usePageData } from '@/lib/editor/usePageData'

interface Props {
  slug: string
  modules: Module[]
  pageKey: string
  isEdit: boolean
  editKey: string
}

function EditorView() {
  const {
    modules: editorModules,
    selectedModuleId,
    selectModule,
    deleteModule,
    moveModuleUp,
    moveModuleDown,
    duplicateModule,
    editModule,
    isDirty,
    markClean
  } = useEditorState()

  const [moduleTemplates, setModuleTemplates] = useState<Module[]>([])

  // Load module templates on mount
  useEffect(() => {
    const loadTemplates = async () => {
      try {
        const templates = await getModuleTemplates()
        setModuleTemplates(templates)
      } catch (error) {
        console.error('Failed to load module templates:', error)
      }
    }
    loadTemplates()
  }, [])

  if (!editorModules) {
    console.error('EditorView: No modules available')
    return null
  }

  return (
    <>
      <SaveButton />
      <ModuleRenderer
        modules={editorModules}
        selectedModuleId={selectedModuleId}
        onSelect={selectModule}
        onDelete={deleteModule}
        onMoveUp={moveModuleUp}
        onMoveDown={moveModuleDown}
        onDuplicate={duplicateModule}
        onEdit={editModule}
        onAddRequest={() => {}}
      />
    </>
  )
}

export default function SlugPageClient({ slug, modules, pageKey, isEdit, editKey }: Props) {
  const { isAuthorized, isReady } = useSessionKey(slug)
  const authorized = isAuthorized(pageKey)

  const {
    pageData,
    isLoading,
    error,
    savePage,
    publishPage,
  } = usePageData(slug, editKey)

  if (!isReady) {
    return null
  }

  if (!isEdit || !authorized) {
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

  const handleSave = async () => {
    if (!pageData) return
    
    try {
      await savePage(pageData)
    } catch (error) {
      console.error('Failed to save page:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <EditorStateProvider initialModules={modules}>
          <EditorView />
        </EditorStateProvider>
      </div>
    </div>
  )
} 