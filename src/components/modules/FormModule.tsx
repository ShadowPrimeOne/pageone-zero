'use client'

import type { FormProps } from '@/lib/editor/types'

export function FormModule({ title, fields, submitText }: FormProps) {
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900">{title}</h2>
      <form className="space-y-4">
        {fields.map(field => (
          <div key={field.id}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
            {field.type === 'textarea' ? (
              <textarea
                className="w-full p-2 border-2 border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors text-gray-900 bg-white"
                required={field.required}
              />
            ) : (
              <input
                type={field.type}
                className="w-full p-2 border-2 border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors text-gray-900 bg-white"
                required={field.required}
              />
            )}
          </div>
        ))}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          {submitText}
        </button>
      </form>
    </div>
  )
} 