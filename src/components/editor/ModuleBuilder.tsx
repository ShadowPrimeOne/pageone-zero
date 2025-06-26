'use client'

import React, { useEffect } from 'react'
import { ModuleRenderer } from '@/components/modules/ModuleRenderer'
import { useEditorState } from '@/lib/editor/useEditorState'
import { useEditorControls } from '@/lib/editor/useEditorControls'
import { AddModuleModal } from '@/components/editor/AddModuleModal'
import { PublishModal } from '@/components/editor/PublishModal'
import type { ModuleType } from '@/lib/editor/defaultModules'

export function ModuleBuilder() {
  const {
    modules,
    selectedModuleId,
    selectModule,
    deleteModule,
    moveModuleUp,
    moveModuleDown,
    duplicateModule,
    editModule,
    updateModule,
    addModule,
    isDirty,
    isPublishModalOpen,
    setIsPublishModalOpen
  } = useEditorState()

  const { isAddModalOpen, setIsAddModalOpen } = useEditorControls()

  // Scroll to selected module when it changes (for newly added modules)
  useEffect(() => {
    if (selectedModuleId) {
      // Small delay to ensure the module is rendered and editor state is updated
      setTimeout(() => {
        const moduleElement = document.getElementById(selectedModuleId)
        if (moduleElement) {
          // Check if we're in edit mode
          const isEditMode = window.location.pathname.includes('/edit/')
          if (isEditMode) {
            // In edit mode, scroll to the module and let the scroll lock handle the rest
            moduleElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
          } else {
            // In view mode, just scroll to the module normally
            moduleElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }
        }
      }, 200) // Increased delay to ensure editor state is fully updated
    }
  }, [selectedModuleId])

  const handleAddModule = (type: ModuleType) => {
    // Always add at the end of the list
    if (modules.length === 0) {
      addModule(type, '', 'above')
    } else {
      addModule(type, modules[modules.length - 1].id, 'below')
    }
  }

  return (
    <>
      <ModuleRenderer 
        modules={modules}
        selectedModuleId={selectedModuleId}
        onSelect={selectModule}
        onDelete={deleteModule}
        onMoveUp={moveModuleUp}
        onMoveDown={moveModuleDown}
        onDuplicate={duplicateModule}
        onEdit={editModule}
        onAddRequest={() => setIsAddModalOpen(true)}
        onUpdate={updateModule}
      />

      <AddModuleModal 
        isOpen={isAddModalOpen}
        close={() => setIsAddModalOpen(false)}
        onAdd={handleAddModule}
        templates={[]} // The templates are defined inside the modal component
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
    </>
  )
} 