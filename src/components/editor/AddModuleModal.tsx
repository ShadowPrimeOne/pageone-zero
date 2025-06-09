'use client'

import type { Module, HeroProps, FormProps } from '@/lib/editor/types'

interface Props {
  isOpen: boolean
  close: () => void
  onAdd: (type: 'hero' | 'form') => void
  templates: Module[]
}

export function AddModuleModal({ isOpen, close, onAdd, templates }: Props) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4">Add Module</h2>
        <div className="space-y-4">
          {templates.map(template => {
            const isHero = template.type === 'hero'
            const heroProps = isHero ? template.props as HeroProps : null
            const formProps = !isHero ? template.props as FormProps : null

            return (
              <button
                key={template.id}
                onClick={() => {
                  onAdd(template.type as 'hero' | 'form')
                  close()
                }}
                className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
              >
                <h3 className="font-medium text-gray-900">
                  {isHero 
                    ? heroProps?.heading || 'Hero Section'
                    : formProps?.title || 'Contact Form'}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {isHero
                    ? heroProps?.subheading || 'Add a hero section with title and subtitle'
                    : 'Add a contact form with customizable fields'}
                </p>
              </button>
            )
          })}
        </div>
        <button
          onClick={close}
          className="mt-6 w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  )
} 