'use client'

export function AddModuleModal({
  isOpen,
  close,
  onAdd
}: {
  isOpen: boolean
  close: () => void
  onAdd: (type: 'hero' | 'form') => void
}) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-lg font-semibold mb-4">Add a Module</h2>
        <button
          className="w-full mb-2 py-2 bg-blue-600 text-white rounded"
          onClick={() => {
            onAdd('hero')
            close()
          }}
        >
          ➕ Add Hero
        </button>
        <button
          className="w-full py-2 bg-green-600 text-white rounded"
          onClick={() => {
            onAdd('form')
            close()
          }}
        >
          ➕ Add Form
        </button>
        <button
          className="mt-4 text-sm underline text-gray-500"
          onClick={close}
        >
          Cancel
        </button>
      </div>
    </div>
  )
} 