'use client'

import { useState, useEffect } from 'react'
import { Background } from '@/lib/editor/types'
import { ColorPicker } from './ColorPicker'
import Image from 'next/image'

interface Props {
  background?: Background
  onChange: (updates: Partial<Background & { _tempFile?: File }>) => void
}

const defaultBackground: Background = {
  type: 'color',
  color: '#000000',
  opacity: 1,
  overlay: {
    color: '#000000',
    opacity: 0.5
  }
}

export function BackgroundSettings({ background = defaultBackground, onChange }: Props) {
  const [isUploading, setIsUploading] = useState(false)
  const [tempImageUrl, setTempImageUrl] = useState<string | null>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      // Create temporary URL for preview
      const tempUrl = URL.createObjectURL(file)
      setTempImageUrl(tempUrl)

      // Store the file in state for later upload
      onChange({
        type: 'image',
        image: tempUrl,
        color: '#000000',
        opacity: 1,
        overlay: background.overlay || { color: '#000000', opacity: 0.5 },
        _tempFile: file // Store the file for later upload
      })
    } catch (error) {
      console.error('Preview error:', error)
      setTempImageUrl(null)
    } finally {
      setIsUploading(false)
    }
  }

  // Clean up temporary URL when component unmounts
  useEffect(() => {
    return () => {
      if (tempImageUrl) {
        URL.revokeObjectURL(tempImageUrl)
      }
    }
  }, [tempImageUrl])

  const handleTypeChange = (type: 'color' | 'image') => {
    if (type === 'image') {
      onChange({
        type: 'image',
        color: '#000000',
        opacity: 1,
        image: background.image,
        overlay: background.overlay || { color: '#000000', opacity: 0.5 }
      })
    } else {
      onChange({
        type: 'color',
        color: background.color || '#000000',
        opacity: background.opacity || 1,
        overlay: background.overlay || { color: '#000000', opacity: 0.5 }
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* Background Type Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Background Type
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            className={`px-4 py-3 rounded-lg border ${
              background.type === 'color'
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
            onClick={() => handleTypeChange('color')}
          >
            Color
          </button>
          <button
            className={`px-4 py-3 rounded-lg border ${
              background.type === 'image'
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
            onClick={() => handleTypeChange('image')}
          >
            Image
          </button>
        </div>
      </div>

      {/* Color Picker */}
      {background.type === 'color' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Background Color
          </label>
          <ColorPicker
            color={background.color}
            onChange={(color: string) => onChange({ color })}
          />
        </div>
      )}

      {/* Image Upload */}
      {background.type === 'image' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Background Image
          </label>
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
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
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
        </div>
      )}

      {/* Image Preview */}
      {(tempImageUrl || background.image) && (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
          <Image
            src={tempImageUrl || background.image || ''}
            alt="Background Preview"
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

      {/* Overlay Settings */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Overlay Color
          </label>
          <ColorPicker
            color={background.overlay?.color || '#000000'}
            onChange={(color: string) => onChange({ 
              overlay: { 
                color,
                opacity: background.overlay?.opacity || 0.5
              }
            })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Overlay Opacity
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={background.overlay?.opacity || 0.5}
            onChange={(e) => onChange({
              overlay: {
                color: background.overlay?.color || '#000000',
                opacity: parseFloat(e.target.value)
              }
            })}
            className="w-full"
          />
        </div>
      </div>
    </div>
  )
} 