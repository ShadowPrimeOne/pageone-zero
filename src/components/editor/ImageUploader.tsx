'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface Props {
  existingUrl?: string
  onUpload: (url: string) => void
}

export default function ImageUploader({ existingUrl, onUpload }: Props) {
  const [isUploading, setIsUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [finalImageUrl, setFinalImageUrl] = useState<string | null>(existingUrl || null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      // Create temporary URL for preview
      const previewUrl = URL.createObjectURL(file)
      setPreviewUrl(previewUrl)

      // Store the file in state for later upload
      // For now, we'll use the preview URL and store the base64 data
      // The actual upload will happen when the form is submitted
      setFinalImageUrl(previewUrl)
      
      // Call the onUpload callback with the preview URL
      // The actual upload URL will be set later when the form is submitted
      onUpload(previewUrl)
    } catch (error) {
      console.error('Preview error:', error)
      setPreviewUrl(null)
    } finally {
      setIsUploading(false)
    }
  }

  // Clean up temporary URL when component unmounts
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  // Update finalImageUrl when existingUrl changes
  useEffect(() => {
    if (existingUrl && !existingUrl.startsWith('blob:')) {
      setFinalImageUrl(existingUrl)
    }
  }, [existingUrl])

  return (
    <div className="space-y-4">
      {/* Image Upload */}
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg">
        <div className="space-y-1 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex text-sm text-gray-600 dark:text-gray-400">
            <label
              htmlFor="image-upload"
              className="relative cursor-pointer rounded-md font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
            >
              <span>Upload a file</span>
              <input
                id="image-upload"
                name="image-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={isUploading}
                className="sr-only"
              />
            </label>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            PNG, JPG, GIF up to 10MB
          </p>
        </div>
      </div>

      {/* Image Preview */}
      {(previewUrl || finalImageUrl) && (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
          <Image
            src={previewUrl || finalImageUrl || ''}
            alt="Image Preview"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {isUploading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="text-white">Uploading...</div>
            </div>
          )}
        </div>
      )}
    </div>
  )
} 