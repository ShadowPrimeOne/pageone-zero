'use client'

import { useState } from 'react'
import { useEditorState } from '@/lib/editor/useEditorState'
import { ModuleRenderer } from '@/components/modules/ModuleRenderer'
import { EditorPanel } from '@/components/editor/EditorPanel'
import { AddModuleModal } from '@/components/editor/AddModuleModal'

export default function Page() {
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
  } = useEditorState([
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
  ])

  const [addModalOpen, setAddModalOpen] = useState(false)
  const [pendingAdd, setPendingAdd] = useState<{ relativeTo: string, position: 'above' | 'below' } | null>(null)

  const openAddModuleModal = (relativeTo: string, position: 'above' | 'below') => {
    setPendingAdd({ relativeTo, position })
    setAddModalOpen(true)
  }

  console.log("modules", modules)
  console.log("selectedModuleId", selectedModuleId)
  console.log("rendering Page")

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
      </main>
    </>
  )
}
