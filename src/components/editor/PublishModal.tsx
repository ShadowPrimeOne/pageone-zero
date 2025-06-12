'use client'

import { useState, useEffect } from 'react'
import { useEditorState } from '@/lib/editor/useEditorState'
import { showModal } from '@/lib/modal'
import { generateQRCode } from '@/lib/qr'
import { uploadUserImage } from '@/lib/uploadUserImage'

interface PublishModalProps {
  isOpen: boolean
  onClose: () => void
}

export function PublishModal({ isOpen, onClose }: PublishModalProps) {
  const { modules } = useEditorState()
  const [slug, setSlug] = useState('')
  const [passphrase, setPassphrase] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSlugAvailable, setIsSlugAvailable] = useState<boolean | null>(null)

  // Debug logging
  useEffect(() => {
    if (isOpen) {
      console.log('🔍 PublishModal opened with modules:', modules)
    }
  }, [isOpen, modules])

  useEffect(() => {
    const checkSlug = async () => {
      if (!slug) {
        setIsSlugAvailable(null)
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
  }, [slug])

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

      // Process modules to handle image uploads
      const processedModules = await Promise.all(modules.map(async (module) => {
        if (module.props?.background?.type === 'image' && module.props.background._tempFile) {
          try {
            // Convert base64 data back to File
            const base64Data = module.props.background._tempFile.data
            const binaryString = atob(base64Data)
            const bytes = new Uint8Array(binaryString.length)
            for (let i = 0; i < binaryString.length; i++) {
              bytes[i] = binaryString.charCodeAt(i)
            }
            const file = new File([bytes], module.props.background._tempFile.name, {
              type: module.props.background._tempFile.type
            })

            // Upload the file
            const url = await uploadUserImage(file, slug)

            // Update the module with the new URL and remove _tempFile
            return {
              ...module,
              props: {
                ...module.props,
                background: {
                  ...module.props.background,
                  image: url,
                  _tempFile: undefined
                }
              }
            }
          } catch (error) {
            console.error('Error uploading image:', error)
            throw new Error(`Failed to upload image: ${error instanceof Error ? error.message : 'Unknown error'}`)
          }
        }
        return module
      }))

      console.log('📤 Sending modules to server:', processedModules)

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

      // Show success modal
      showModal({
        title: "🎉 Your Page is Live!",
        message: "You can now visit or share your page.",
        actions: [
          { label: "🔗 View Page", href: `/page/${slug}` },
          { label: "✏️ Edit Page", href: `/page/${slug}?edit=true` },
          { label: "📲 QR Code", action: () => generateQRCode(slug) },
          { label: "⬅ Back to Editor", href: "/test" }
        ]
      })

    } catch (err) {
      console.error('❌ Publishing error:', err)
      setError(err instanceof Error ? err.message : 'Failed to publish page')
      
      // Show error modal
      showModal({
        title: "❌ Publishing Failed",
        message: "Your page couldn't be saved. Please check your connection or try again.",
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
          <h2 className="text-xl font-semibold text-gray-900">Publish Page</h2>
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
            </div>
            {isSlugAvailable === true && (
              <p className="mt-1 text-sm text-green-600">✅ Available</p>
            )}
            {isSlugAvailable === false && (
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
              disabled={isSubmitting || !slug || isSlugAvailable === false}
              className="px-4 py-2 text-sm font-medium text-white bg-[#004225] border border-transparent rounded-md hover:bg-[#005c33] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#004225] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Publishing...' : 'Next'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 