'use client'

import type { FormProps } from '@/lib/editor/types'

export function FormModule({ title, fields, submitText }: FormProps) {
  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <form className="space-y-4">
        {fields.map(field => (
          <div key={field.id}>
            <label className="block text-sm font-medium mb-1">
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            {field.type === 'textarea' ? (
              <textarea
                className="w-full p-2 border rounded"
                required={field.required}
              />
            ) : (
              <input
                type={field.type}
                className="w-full p-2 border rounded"
                required={field.required}
              />
            )}
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          {submitText}
        </button>
      </form>
    </div>
  )
} 