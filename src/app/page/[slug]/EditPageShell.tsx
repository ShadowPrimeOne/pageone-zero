import { useEffect } from 'react'

interface EditPageShellProps {
  slug: string
  justPublished: boolean
}

export default function EditPageShell({ slug, justPublished }: EditPageShellProps) {
  useEffect(() => {
    // Check if we just published
    if (justPublished) {
      // Handle published state
    }
  }, [justPublished])

  return (
    <div className="min-h-screen">
      <div className="p-4">
        <h1 className="text-lg font-semibold">Editing: {slug}</h1>
        <p className="text-gray-600">Page editor content would go here...</p>
      </div>
    </div>
  )
} 