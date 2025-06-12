'use client'

import { QRCodeSVG } from 'qrcode.react'
import Link from 'next/link'

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
  slug: string
  key: string
}

export default function SuccessModal({ isOpen, onClose, slug, key }: SuccessModalProps) {
  if (!isOpen) return null

  const pageUrl = `${window.location.origin}/page/${slug}#key=${key}`

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">🎉 Your Page is Live!</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <p className="text-gray-600 mb-6">You can now visit or share your page.</p>

        <div className="space-y-3">
          <a
            href={`/page/${slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full px-4 py-2 text-sm font-medium text-center text-white bg-[#004225] border border-transparent rounded-md hover:bg-[#005c33] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#004225]"
          >
            🔗 View Page
          </a>

          <a
            href={`/page/${slug}?edit=true`}
            className="block w-full px-4 py-2 text-sm font-medium text-center text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#004225]"
          >
            ✏️ Edit Page
          </a>

          <Link
            href="/"
            className="block w-full px-4 py-2 text-sm font-medium text-center text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#004225]"
          >
            Back to Editor
          </Link>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">Scan to view your page:</p>
          <div className="flex justify-center">
            <QRCodeSVG value={pageUrl} size={200} />
          </div>
        </div>
      </div>
    </div>
  )
} 