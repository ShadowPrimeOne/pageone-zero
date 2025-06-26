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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md border border-gray-200">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-gray-900">
                {isEditMode ? 'Update Page' : 'Publish Page'}
              </h2>
              {isDirty && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  ✓ Changes saved
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="slug" className="block text-sm font-semibold text-gray-900 mb-2">
                Page URL
              </label>
              <div className="flex rounded-lg shadow-sm border border-gray-300 focus-within:ring-2 focus-within:ring-primary focus-within:border-primary">
                <span className="inline-flex items-center px-4 rounded-l-lg border-0 bg-gray-50 text-gray-700 text-sm font-medium">
                  page.one/
                </span>
                {isEditMode ? (
                  <div className="flex-1 min-w-0 block w-full px-4 py-3 rounded-r-lg border-0 bg-gray-50 text-gray-900 font-medium">
                    {slug}
                  </div>
                ) : (
                  <input
                    type="text"
                    id="slug"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                    className="flex-1 min-w-0 block w-full px-4 py-3 rounded-r-lg border-0 focus:ring-0 focus:outline-none text-gray-900 placeholder-gray-500"
                    placeholder="your-page"
                    required
                    disabled={isSubmitting}
                  />
                )}
              </div>
              {!isEditMode && isSlugAvailable === true && (
                <p className="mt-2 text-sm text-green-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Available
                </p>
              )}
              {!isEditMode && isSlugAvailable === false && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  Not available
                </p>
              )}
            </div>

            <div>
              <label htmlFor="passphrase" className="block text-sm font-semibold text-gray-900 mb-2">
                Passphrase (optional)
              </label>
              <input
                type="password"
                id="passphrase"
                value={passphrase}
                onChange={(e) => setPassphrase(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-primary text-gray-900 placeholder-gray-500"
                placeholder="Leave empty for development key"
                disabled={isSubmitting}
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex">
                  <svg className="w-5 h-5 text-red-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <div className="ml-3">
                    <p className="text-sm text-red-800">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-secondary px-6 py-3 text-base font-medium"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !slug || (isSlugAvailable === false && !isEditMode)}
                className="btn btn-primary px-6 py-3 text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (isEditMode ? 'Updating...' : 'Publishing...') : (isEditMode ? 'Update' : 'Publish')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 