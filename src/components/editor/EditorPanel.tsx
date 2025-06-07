'use client'

import type { HeroProps, FormProps, Module } from '@/lib/editor/types'

interface Props {
  modules: Module[]
  selectedModuleId: string | null
  isEditorOpen: boolean
  setIsEditorOpen: (value: boolean) => void
  updateModule: (id: string, newProps: HeroProps | FormProps) => void
}

export function EditorPanel({
  modules,
  selectedModuleId,
  isEditorOpen,
  setIsEditorOpen,
  updateModule,
}: Props) {
  const selected = modules.find(m => m.id === selectedModuleId)
  if (!selected || !isEditorOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4 text-gray-900">Edit {selected.type}</h2>

        {selected.type === 'hero' && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Heading
              </label>
              <input
                className="w-full p-2 border-2 border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors text-gray-900 bg-white"
                value={(selected.props as HeroProps).heading}
                onChange={e =>
                  updateModule(selected.id, {
                    ...selected.props,
                    heading: e.target.value,
                  } as HeroProps)
                }
                placeholder="Enter heading"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subheading
              </label>
              <input
                className="w-full p-2 border-2 border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors text-gray-900 bg-white"
                value={(selected.props as HeroProps).subheading}
                onChange={e =>
                  updateModule(selected.id, {
                    ...selected.props,
                    subheading: e.target.value,
                  } as HeroProps)
                }
                placeholder="Enter subheading"
              />
            </div>
          </>
        )}

        {selected.type === 'form' && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Form Title
              </label>
              <input
                className="w-full p-2 border-2 border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors text-gray-900 bg-white"
                value={(selected.props as FormProps).title}
                onChange={e =>
                  updateModule(selected.id, {
                    ...selected.props,
                    title: e.target.value,
                  } as FormProps)
                }
                placeholder="Enter form title"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Submit Button Text
              </label>
              <input
                className="w-full p-2 border-2 border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors text-gray-900 bg-white"
                value={(selected.props as FormProps).submitText}
                onChange={e =>
                  updateModule(selected.id, {
                    ...selected.props,
                    submitText: e.target.value,
                  } as FormProps)
                }
                placeholder="Enter button text"
              />
            </div>
          </>
        )}

        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          onClick={() => setIsEditorOpen(false)}
        >
          Done
        </button>
      </div>
    </div>
  )
} 