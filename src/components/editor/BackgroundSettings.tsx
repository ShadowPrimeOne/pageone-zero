'use client'

import { useState, useRef } from 'react'
import type { ModuleBackground } from '@/lib/editor/types'

interface Props {
  background?: ModuleBackground
  onChange: (background: ModuleBackground) => void
}

export function BackgroundSettings({ background, onChange }: Props) {
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const { url } = await response.json()
      onChange({
        type: 'image',
        value: url,
        overlay: background?.overlay,
        parallax: background?.parallax
      })
    } catch (error) {
      console.error('Upload error:', error)
      alert('Failed to upload image')
    } finally {
      setIsUploading(false)
    }
  }

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      type: 'color',
      value: e.target.value,
      overlay: background?.overlay,
      parallax: background?.parallax
    })
  }

  const handleOverlayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...background!,
      overlay: {
        color: e.target.value,
        opacity: background?.overlay?.opacity || 0.5
      }
    })
  }

  const handleOpacityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...background!,
      overlay: {
        color: background?.overlay?.color || '#000000',
        opacity: parseFloat(e.target.value)
      }
    })
  }

  const handleParallaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...background!,
      parallax: e.target.checked
    })
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Background Type
        </label>
        <div className="flex gap-4">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex-1 p-2 border-2 border-gray-300 rounded-md hover:border-blue-500 hover:bg-blue-50 transition-colors"
            disabled={isUploading}
          >
            {isUploading ? 'Uploading...' : 'Upload Image'}
          </button>
          <input
            type="color"
            value={background?.type === 'color' ? background.value : '#ffffff'}
            onChange={handleColorChange}
            className="w-12 h-10 p-1 border-2 border-gray-300 rounded-md"
          />
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {background?.type === 'image' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Overlay Color
            </label>
            <input
              type="color"
              value={background.overlay?.color || '#000000'}
              onChange={handleOverlayChange}
              className="w-full h-10 p-1 border-2 border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Overlay Opacity
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={background.overlay?.opacity || 0.5}
              onChange={handleOpacityChange}
              className="w-full"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="parallax"
              checked={background.parallax || false}
              onChange={handleParallaxChange}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="parallax" className="text-sm font-medium text-gray-700">
              Enable Parallax
            </label>
          </div>
        </>
      )}
    </div>
  )
} 