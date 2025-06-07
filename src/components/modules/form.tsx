import { FC } from 'react'
import { FormData } from '@/lib/editor/types'

interface FormModuleProps {
  data: FormData
}

export const FormModule: FC<FormModuleProps> = ({ data }) => {
  const { title, fields, submitText } = data

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <form className="space-y-4">
        {fields.map((field) => (
          <div key={field.id}>
            <label className="block text-sm font-medium mb-1">
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            {field.type === 'textarea' ? (
              <textarea
                className="w-full px-3 py-2 border rounded-md"
                required={field.required}
              />
            ) : (
              <input
                type={field.type}
                className="w-full px-3 py-2 border rounded-md"
                required={field.required}
              />
            )}
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          {submitText}
        </button>
      </form>
    </div>
  )
} 