'use client'

import { useState, useEffect } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { useRouter } from 'next/navigation'
import type { Module } from '@/lib/editor/types'

interface PublishModalProps {
  isOpen: boolean
  onClose: () => void
  onPublish: (slug: string, key?: string) => void
  modules: Module[]
}

export default function PublishModal({ isOpen, onClose, onPublish, modules }: PublishModalProps) {
  const router = useRouter()
  const [slug, setSlug] = useState('')
  const [passphrase, setPassphrase] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isSlugAvailable, setIsSlugAvailable] = useState<boolean | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [qrValue, setQrValue] = useState<string | null>(null)

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

        // Debug log for testing
        console.log('🔍 Slug check result:', { slug, available: json.available })
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
    setError(null)
    setIsSubmitting(true)

    try {
      // Validate modules before submission
      if (!modules || modules.length === 0) {
        throw new Error('At least one module is required')
      }

      // Validate slug
      if (!slug) {
        throw new Error('Page URL is required')
      }

      console.log('📦 Validating modules before publish:', modules)

      // Generate key from passphrase or use dev key
      const key = passphrase 
        ? await generateKeyFromPassphrase(passphrase)
        : process.env.NEXT_PUBLIC_DEV_KEY || 'dev-key-1234'

      if (!key) {
        throw new Error('Failed to generate key')
      }

      // Final slug availability check
      const slugCheck = await fetch(`/api/checkSlug?slug=${encodeURIComponent(slug)}`)
      const slugData = await slugCheck.json()
      
      if (!slugCheck.ok) {
        throw new Error(slugData.error || 'Failed to verify slug availability')
      }

      if (!slugData.available) {
        throw new Error('This slug is no longer available. Please try another one.')
      }

      const response = await fetch('/api/publishPage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug,
          key,
          content: modules,
          phone_number: phoneNumber || null
        })
      })

      // Log the request body for debugging
      console.log('📤 Publishing request:', {
        slug,
        key,
        modules,
        phone_number: phoneNumber || null
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('❌ Publish error response:', errorData)
        throw new Error(errorData.error || 'Failed to publish page')
      }

      const pageUrl = `${window.location.origin}/page/${slug}#key=${key}`
      setQrValue(pageUrl)
      onPublish(slug, key)
      
      // Navigate to the new page
      router.push(`/page/${slug}?key=${key}`)
    } catch (err) {
      console.error('Publish error:', err)
      setError(err instanceof Error ? err.message : 'Failed to publish page')
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
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number (optional)
            </label>
            <input
              type="tel"
              id="phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#004225] focus:border-[#004225] text-gray-900"
              placeholder="+1234567890"
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
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !slug || isSlugAvailable === false}
              className="px-4 py-2 text-sm font-medium text-white bg-[#004225] border border-transparent rounded-md hover:bg-[#005c33] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#004225] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Publishing...' : 'Publish'}
            </button>
          </div>
        </form>

        {qrValue && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Scan to view your page:</p>
            <div className="flex justify-center">
              <QRCodeSVG value={qrValue} size={200} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

async function generateKeyFromPassphrase(passphrase: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(passphrase)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
} 