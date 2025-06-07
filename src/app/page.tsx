'use client'

import { useEditorState } from '@/lib/editor/useEditorState'
import { ModuleRenderer } from '@/components/modules/ModuleRenderer'

export default function Page() {
  const {
    modules,
    selectedModuleId,
    selectModule,
    deleteModule,
    moveModuleUp,
    moveModuleDown,
    duplicateModule,
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

  return (
    <main className="min-h-screen w-full flex flex-col items-center bg-white">
      <div className="w-full max-w-2xl">
        <ModuleRenderer
          modules={modules}
          selectedModuleId={selectedModuleId}
          selectModule={selectModule}
          deleteModule={deleteModule}
          moveModuleUp={moveModuleUp}
          moveModuleDown={moveModuleDown}
          duplicateModule={duplicateModule}
        />
      </div>
    </main>
  )
}
