'use client'

import { useState, useEffect } from 'react'
import { useEditorState } from '@/lib/editor/useEditorState'
import { ModuleRenderer } from '@/components/modules/ModuleRenderer'
import { AddModuleModal } from '@/components/editor/AddModuleModal'
import { PublishModal } from '@/components/editor/PublishModal'
import { EditorStateProvider } from '@/lib/editor/useEditorState'
import type { Module } from '@/lib/editor/types'
import { getModuleTemplates } from '@/lib/editor/db'

function PageContent() {
  const {
    modules,
    selectedModuleId,
    selectModule,
    deleteModule,
    moveModuleUp,
    moveModuleDown,
    duplicateModule,
    editModule,
    addModule,
    isDirty,
    setModules
  } = useEditorState()

  const [addModalOpen, setAddModalOpen] = useState(false)
  const [pendingAdd, setPendingAdd] = useState<{ relativeTo: string, position: 'above' | 'below' } | null>(null)
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false)
  const [moduleTemplates, setModuleTemplates] = useState<Module[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Load module templates and set initial modules
  useEffect(() => {
    const loadTemplates = async () => {
      try {
        const templates = await getModuleTemplates()
        setModuleTemplates(templates)
        
        // Filter for Hero2, OurProcess, and ContactForm modules
        const initialModules = templates
          .filter(template => 
            template.type === 'hero2' || 
            template.type === 'classic_overlay_hero' ||
            template.type === 'top_image_center_text_hero' ||
            template.type === 'split_layout_hero' ||
            template.type === 'OurProcess' || 
            template.type === 'contact_form'
          )
          .map(template => ({
            ...template,
            id: `mod-${Date.now()}-${Math.random().toString(36).slice(2)}`
          }))
        
        // Ensure Hero2 is first, then Classic Overlay Hero, then Top Image Center Text Hero, then Split Layout Hero, then OurProcess, then ContactForm
        const sortedModules = initialModules.sort((a, b) => {
          if (a.type === 'hero2') return -1
          if (b.type === 'hero2') return 1
          if (a.type === 'classic_overlay_hero') return -1
          if (b.type === 'classic_overlay_hero') return 1
          if (a.type === 'top_image_center_text_hero') return -1
          if (b.type === 'top_image_center_text_hero') return 1
          if (a.type === 'split_layout_hero') return -1
          if (b.type === 'split_layout_hero') return 1
          if (a.type === 'OurProcess') return -1
          if (b.type === 'OurProcess') return 1
          return 0
        })

        setModules(sortedModules)
      } catch (error) {
        console.error('Failed to load module templates:', error)
      } finally {
        setIsLoading(false)
      }
    }
    loadTemplates()
  }, [setModules])

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading editor...</div>
      </div>
    )
  }

  return (
    <>
      <main className="min-h-screen">
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

        <AddModuleModal
          isOpen={addModalOpen}
          close={() => setAddModalOpen(false)}
          onAdd={(type) => {
            if (pendingAdd) {
              addModule(type, pendingAdd.relativeTo, pendingAdd.position)
            }
          }}
          templates={moduleTemplates}
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
        />
      </main>
    </>
  )
}

export default function Home() {
  return (
    <EditorStateProvider>
      <PageContent />
    </EditorStateProvider>
  )
}
