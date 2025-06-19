'use client'

import React from 'react'
import { useEditorState } from '@/lib/editor/useEditorState'
import ImageUploader from '@/components/editor/ImageUploader'
import type { HeroProps, FormProps, Module } from '@/lib/editor/types'
import { BackgroundSettings } from './BackgroundSettings'

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
  const { selectedModule } = useEditorState()

  if (!selectedModule) return null

  const { type, props } = selectedModule

  const handleBackgroundChange = (background: Module['background']) => {
    updateModule(selectedModule.id, {
      ...selectedModule.props,
      background
    })
  }

  return (
    <div className="fixed inset-0 z-[100] bg-white/70 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4 text-gray-900">Edit {type}</h2>

        {type === 'top_image_center_text_hero' && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Heading
              </label>
              <input
                className="w-full p-2 border-2 border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors text-gray-900 bg-white"
                value={props.heading || ''}
                onChange={(e) =>
                  updateModule(selectedModule.id, {
                    props: {
                      ...props,
                      heading: e.target.value,
                    },
                  })
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
                value={props.subheading || ''}
                onChange={(e) =>
                  updateModule(selectedModule.id, {
                    props: {
                      ...props,
                      subheading: e.target.value,
                    },
                  })
                }
                placeholder="Enter subheading"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Body
              </label>
              <input
                className="w-full p-2 border-2 border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors text-gray-900 bg-white"
                value={props.body || ''}
                onChange={(e) =>
                  updateModule(selectedModule.id, {
                    props: {
                      ...props,
                      body: e.target.value,
                    },
                  })
                }
                placeholder="Enter body text"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Top Background Image
              </label>
              <ImageUploader
                existingUrl={props.topBackground?.url}
                onUpload={(url) =>
                  updateModule(selectedModule.id, {
                    props: {
                      ...props,
                      topBackground: { ...props.topBackground, url },
                    },
                  })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bottom Background Color
              </label>
              <input
                type="color"
                value={props.bottomBackground?.color || '#000000'}
                onChange={(e) =>
                  updateModule(selectedModule.id, {
                    props: {
                      ...props,
                      bottomBackground: {
                        ...props.bottomBackground,
                        color: e.target.value,
                      },
                    },
                  })
                }
                className="w-16 h-8"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bottom Opacity
              </label>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={props.bottomBackground?.opacity || 1}
                onChange={(e) =>
                  updateModule(selectedModule.id, {
                    props: {
                      ...props,
                      bottomBackground: {
                        ...props.bottomBackground,
                        opacity: parseFloat(e.target.value),
                      },
                    },
                  })
                }
                className="w-full"
              />
            </div>
          </>
        )}

        {type === 'form' && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Form Title
              </label>
              <input
                className="w-full p-2 border-2 border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors text-gray-900 bg-white"
                value={(props as FormProps).title}
                onChange={(e) =>
                  updateModule(selectedModule.id, {
                    ...props,
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
                value={(props as FormProps).submitText}
                onChange={(e) =>
                  updateModule(selectedModule.id, {
                    ...props,
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