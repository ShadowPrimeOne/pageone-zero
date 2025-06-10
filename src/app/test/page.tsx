'use client'

import { EditorStateProvider, useEditorState } from '@/lib/editor/useEditorState'
import { ModuleRenderer } from '@/components/modules/ModuleRenderer'
import { EditorPanel } from '@/components/editor/EditorPanel'
import { AddModuleModal } from '@/components/editor/AddModuleModal'
import PublishModal from '@/components/editor/PublishModal'
import SuccessModal from '@/components/modals/SuccessModal'
import { useState } from 'react'
import { defaultModules } from '@/lib/editor/defaultModules'
import type { Module } from '@/lib/editor/types'

function TestPageContent() {
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
    isDirty,
    markClean,
  } = useEditorState()

  const [addModalOpen, setAddModalOpen] = useState(false)
  const [pendingAdd, setPendingAdd] = useState<{ relativeTo: string, position: 'above' | 'below' } | null>(null)
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [publishedSlug, setPublishedSlug] = useState<string>('')
  const [publishedKey, setPublishedKey] = useState<string>('')

  const openAddModuleModal = (relativeTo: string, position: 'above' | 'below') => {
    setPendingAdd({ relativeTo, position })
    setAddModalOpen(true)
  }

  const handlePublishSuccess = (slug: string, key?: string) => {
    console.log('✅ Publish successful:', { slug, key, moduleCount: modules.length })
    setIsPublishModalOpen(false)
    setPublishedSlug(slug)
    setPublishedKey(key || '')
    setIsSuccessModalOpen(true)
    markClean()
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <ModuleRenderer
          modules={modules}
          selectedModuleId={selectedModuleId}
          onSelect={selectModule}
          onDelete={deleteModule}
          onMoveUp={moveModuleUp}
          onMoveDown={moveModuleDown}
          onDuplicate={duplicateModule}
          onEdit={editModule}
          onAddRequest={openAddModuleModal}
        />
      </div>

      <EditorPanel
        modules={modules}
        selectedModuleId={selectedModuleId}
        isEditorOpen={isEditorOpen}
        setIsEditorOpen={setIsEditorOpen}
        updateModule={updateModule}
      />

      <AddModuleModal
        isOpen={addModalOpen}
        close={() => setAddModalOpen(false)}
        onAdd={(type) => {
          if (pendingAdd) {
            addModule(type, pendingAdd.relativeTo, pendingAdd.position)
          }
        }}
        templates={[]}
      />

      {isDirty && (
        <button
          onClick={() => setIsPublishModalOpen(true)}
          className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#004225] text-white shadow-lg hover:bg-[#005c33] hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center justify-center ring-1 ring-white/10"
          title="Publish Page"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-7 h-7"
          >
            <path d="M20 6L9 17L4 12" />
          </svg>
        </button>
      )}

      <PublishModal
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        onPublish={handlePublishSuccess}
        modules={modules}
      />

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        slug={publishedSlug}
        key={publishedKey}
      />
    </main>
  )
}

export default function TestPage() {
  return (
    <EditorStateProvider initialModules={defaultModules}>
      <TestPageContent />
    </EditorStateProvider>
  )
} 