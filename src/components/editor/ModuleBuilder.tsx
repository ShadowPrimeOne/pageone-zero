'use client'

import React from 'react'
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

  const handleAddModule = (type: ModuleType) => {
    // When adding from empty state, we add at the beginning
    if (modules.length === 0) {
      addModule(type, '', 'above')
    } else {
      // When adding to existing modules, add after the last module
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