'use client'

import React from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import type { Module } from '@/lib/editor/types'

interface Props {
  module: Module
  onClose: () => void
}

export function ModuleControlPanel({ module, onClose }: Props) {
  return (
    <div className="w-full bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            {module.type === 'classic_overlay_hero' && 'Classic Overlay Hero'}
            {module.type === 'top_image_center_text_hero' && 'Top Image + Center Text'}
            {module.type === 'split_layout_hero' && 'Split Layout Hero'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  )
} 