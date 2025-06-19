'use client'

import { useState, useEffect } from 'react'
import { useEditorState } from '@/lib/editor/useEditorState'
import { showModal } from '@/lib/modal'
import { generateQRCode } from '@/lib/qr'
import { usePathname, useSearchParams } from 'next/navigation'

interface PublishModalProps {
  isOpen: boolean
  onClose: () => void
}

export function PublishModal({ isOpen, onClose }: PublishModalProps) {
  const { modules, isDirty } = useEditorState()
  const [slug, setSlug] = useState('')
  const [passphrase, setPassphrase] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSlugAvailable, setIsSlugAvailable] = useState<boolean | null>(null)
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isEditMode = searchParams.get('edit') === 'true'
  const currentSlug = pathname.split('/').pop()

  // Debug logging
  useEffect(() => {
    // Modal opened
  }, [modules, isDirty, isEditMode, currentSlug])

  useEffect(() => {
    // If we're in edit mode, set the current slug
    if (isEditMode && currentSlug) {
      setSlug(currentSlug)
    }
  }, [isEditMode, currentSlug])

  useEffect(() => {
    const checkSlug = async () => {
      if (!slug) {
        setIsSlugAvailable(null)
        return
      }

      // If we're in edit mode and the slug hasn't changed, skip the check
      if (isEditMode && slug === currentSlug) {
        setIsSlugAvailable(true)
        return
      }

      try {
        const res = await fetch(`/api/checkSlug?slug=${encodeURIComponent(slug)}`)
        const json = await res.json()
        
        if (!res.ok) {
          throw new Error(json.error || 'Failed to check slug')
        }
        
        setIsSlugAvailable(json.available)
        setError(null)
      } catch (err) {
        console.error('Error checking slug:', err)
        setError(err instanceof Error ? err.message : 'Failed to check slug availability')
        setIsSlugAvailable(null)
      }
    }

    // Debounce the check
    const timeoutId = setTimeout(checkSlug, 500)
    return () => clearTimeout(timeoutId)
  }, [slug, isEditMode, currentSlug])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      // Generate key from passphrase or use dev key
      const key = passphrase?.trim() || process.env.NEXT_PUBLIC_DEV_KEY

      if (!key) {
        throw new Error('Failed to generate key')
      }

      // Process modules for publishing
      const processedModules = modules.map(module => ({
        ...module,
        props: {
          ...module.props,
          background: module.props.background ? {
            ...module.props.background,
            _tempFile: module.props.background._tempFile ? {
              name: (module.props.background._tempFile as { name?: string; type: string; size?: number; data: string }).name || 'temp-file',
              type: module.props.background._tempFile.type,
              size: (module.props.background._tempFile as { name?: string; type: string; size?: number; data: string }).size || 0,
              data: module.props.background._tempFile.data
            } : undefined
          } : undefined
        }
      }))

      // Send to server
      const response = await fetch('/api/publishPage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          slug,
          key,
          modules: processedModules,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to publish page')
      }

      // Close publish modal
      onClose()

      // Show success modal with appropriate message
      showModal({
        title: "🎉 Your Page is Live!",
        message: "You can now visit or share your page.",
        actions: [
          { label: "🔗 View Page", href: `/page/${slug}` },
          { label: "📲 QR Code", action: () => generateQRCode(slug) },
          { label: "⬅ Back to Editor", href: "/" }
        ]
      })

    } catch (err) {
      console.error('❌ Publishing error:', err)
      setError(err instanceof Error ? err.message : 'Failed to publish page')
      
      // Show error modal
      showModal({
        title: "❌ Operation Failed",
        message: "Your page couldn't be published. Please check your connection or try again.",
        button: "Back to Editor"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold text-gray-900">
              {isEditMode ? 'Update Page' : 'Publish Page'}
            </h2>
            {isDirty && (
              <span className="text-green-600 text-sm">✓ Changes saved</span>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
              Page URL
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                page.one/
              </span>
              {isEditMode ? (
                <div className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 bg-gray-50 text-gray-900">
                  {slug}
                </div>
              ) : (
                <input
                  type="text"
                  id="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                  className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:ring-[#004225] focus:border-[#004225] text-gray-900"
                  placeholder="your-page"
                  required
                  disabled={isSubmitting}
                />
              )}
            </div>
            {!isEditMode && isSlugAvailable === true && (
              <p className="mt-1 text-sm text-green-600">✅ Available</p>
            )}
            {!isEditMode && isSlugAvailable === false && (
              <p className="mt-1 text-sm text-red-600">❌ Not available</p>
            )}
          </div>

          <div>
            <label htmlFor="passphrase" className="block text-sm font-medium text-gray-700">
              Passphrase (optional)
            </label>
            <input
              type="password"
              id="passphrase"
              value={passphrase}
              onChange={(e) => setPassphrase(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#004225] focus:border-[#004225] text-gray-900"
              placeholder="Leave empty for development key"
              disabled={isSubmitting}
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#004225]"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !slug || (isSlugAvailable === false && !isEditMode)}
              className="px-4 py-2 text-sm font-medium text-white bg-[#004225] border border-transparent rounded-md hover:bg-[#005c33] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#004225] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (isEditMode ? 'Updating...' : 'Publishing...') : (isEditMode ? 'Update' : 'Publish')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 