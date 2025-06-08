'use client'

import { useState, useEffect } from 'react'
import { useEditorState } from '@/lib/editor/useEditorState'
import { ModuleRenderer } from '@/components/modules/ModuleRenderer'
import { EditorPanel } from '@/components/editor/EditorPanel'
import { AddModuleModal } from '@/components/editor/AddModuleModal'
import PublishModal from '@/components/editor/PublishModal'
import { EditorStateProvider } from '@/lib/editor/useEditorState'
import type { Module } from '@/lib/editor/types'

const initialModules: Module[] = [
  {
    id: 'hero-1',
    type: 'hero',
    props: {
      heading: 'Page.one',
      subheading: 'Genesis Ready.',
    },
  },
  {
    id: 'form-1',
    type: 'form',
    props: {
      title: "Let's talk",
      fields: [
        {
          id: 'name',
          label: 'Name',
          type: 'text',
          required: true,
        },
        {
          id: 'email',
          label: 'Email',
          type: 'email',
          required: true,
        },
        {
          id: 'message',
          label: 'Message',
          type: 'textarea',
          required: true,
        },
      ],
      submitText: 'Send Message',
    },
  },
]

function PageContent() {
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
  } = useEditorState(initialModules)

  const [addModalOpen, setAddModalOpen] = useState(false)
  const [pendingAdd, setPendingAdd] = useState<{ relativeTo: string, position: 'above' | 'below' } | null>(null)
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false)

  // Debug logging on mount and module changes
  useEffect(() => {
    console.log('🔍 PageContent mounted with modules:', modules)
  }, [])

  useEffect(() => {
    console.log('📦 Modules updated:', modules)
  }, [modules])

  useEffect(() => {
    if (selectedModuleId) {
      console.log('🎯 Selected module:', selectedModuleId)
    }
  }, [selectedModuleId])

  const openAddModuleModal = (relativeTo: string, position: 'above' | 'below') => {
    setPendingAdd({ relativeTo, position })
    setAddModalOpen(true)
  }

  const handlePublishSuccess = (slug: string, key?: string) => {
    console.log('✅ Publish successful:', { slug, key, moduleCount: modules.length })
    setIsPublishModalOpen(false)
    markClean()
  }

  return (
    <>
      <div>Debug active</div>
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
        />

        {isDirty && (
          <button
            onClick={() => setIsPublishModalOpen(true)}
            disabled={modules.length === 0}
            className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#004225] text-white shadow-lg hover:bg-[#005c33] hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center justify-center ring-1 ring-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
            title={modules.length === 0 ? "Add at least one module to publish" : "Publish Page"}
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
      </main>
    </>
  )
}

export default function Page() {
  return (
    <EditorStateProvider>
      <PageContent />
    </EditorStateProvider>
  )
}
