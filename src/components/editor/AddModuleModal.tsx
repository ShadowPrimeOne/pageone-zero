'use client'

import React, { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { XMarkIcon, PlusIcon } from '@heroicons/react/24/outline'
import type { Module } from '@/lib/editor/types'
import type { ModuleType } from '@/lib/editor/defaultModules'

interface Props {
  isOpen: boolean
  close: () => void
  onAdd: (type: ModuleType) => void
  templates: Module[]
}

type Category = 'Hero' | 'Our Process' | 'Contact'

const categories: Category[] = ['Hero', 'Our Process', 'Contact']

const heroTemplates = [
  {
    type: 'classic_overlay_hero' as const,
    title: 'Classic Overlay Hero',
    description: 'High-impact visual services (e.g., automotive, fitness, travel)',
    svg: `<svg viewBox="0 0 100 180" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
      <!-- Background Image Placeholder -->
      <rect x="0" y="0" width="100" height="180" fill="#333" />
      <!-- Dark Overlay -->
      <rect x="0" y="0" width="100" height="180" fill="black" opacity="0.4" />
      <!-- Centered Heading -->
      <text x="50" y="60" font-size="8" fill="white" text-anchor="middle" font-family="Arial">Big Headline</text>
      <!-- Subheading -->
      <text x="50" y="72" font-size="5" fill="white" text-anchor="middle" font-family="Arial">Supportive tagline here</text>
      <!-- CTA Button -->
      <rect x="30" y="90" rx="3" ry="3" width="40" height="12" fill="white" />
      <text x="50" y="98" font-size="5" fill="black" text-anchor="middle" font-family="Arial">Get Started</text>
    </svg>`
  },
  {
    type: 'top_image_center_text_hero' as const,
    title: 'Top Image + Center Text',
    description: 'Clear product intros, coaching, services',
    svg: `<svg viewBox="0 0 100 180" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
      <!-- Top Image Placeholder (Top 50%) -->
      <rect x="0" y="0" width="100" height="90" fill="#ccc" />
      <text x="50" y="50" font-size="6" fill="#666" text-anchor="middle" font-family="Arial">Image</text>
      <!-- Heading -->
      <text x="50" y="110" font-size="8" fill="#222" text-anchor="middle" font-family="Arial">Clear Headline</text>
      <!-- Subheading -->
      <text x="50" y="122" font-size="5" fill="#555" text-anchor="middle" font-family="Arial">Descriptive tagline</text>
      <!-- CTA Button -->
      <rect x="30" y="135" rx="3" ry="3" width="40" height="12" fill="#000" />
      <text x="50" y="143" font-size="5" fill="#fff" text-anchor="middle" font-family="Arial">Learn More</text>
    </svg>`
  },
  {
    type: 'split_layout_hero' as const,
    title: 'Split Layout Hero',
    description: 'Personal brands, consultants, lawyers',
    svg: `<svg viewBox="0 0 100 180" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
      <!-- Left Side (50%) -->
      <rect x="0" y="0" width="50" height="180" fill="#333" />
      <text x="25" y="90" font-size="6" fill="white" text-anchor="middle" font-family="Arial">Image</text>
      <!-- Right Side (50%) -->
      <rect x="50" y="0" width="50" height="180" fill="#f5f5f5" />
      <!-- Heading -->
      <text x="75" y="60" font-size="8" fill="#222" text-anchor="middle" font-family="Arial">Headline</text>
      <!-- Subheading -->
      <text x="75" y="80" font-size="5" fill="#555" text-anchor="middle" font-family="Arial">Subtitle</text>
      <!-- CTA Button -->
      <rect x="60" y="100" rx="3" ry="3" width="30" height="10" fill="#000" />
      <text x="75" y="107" font-size="4" fill="#fff" text-anchor="middle" font-family="Arial">CTA</text>
    </svg>`
  }
]

export function AddModuleModal({ isOpen, close, onAdd }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<Category>('Hero')
  const [selectedTemplate, setSelectedTemplate] = useState<ModuleType | null>(null)

  if (!isOpen) return null

  const handleTemplateClick = (type: ModuleType) => {
    if (selectedTemplate === type) {
      onAdd(type)
      close()
    } else {
      setSelectedTemplate(type)
    }
  }

  return (
    <Dialog open={isOpen} onClose={close} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-x-0 top-0 flex justify-center">
        <Dialog.Panel className="w-[95%] sm:w-[85%] md:w-[75%] lg:w-[65%] xl:w-[55%] bg-white rounded-b-xl shadow-lg overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b bg-gray-900 text-white">
            <Dialog.Title className="text-2xl font-bold">Add Module</Dialog.Title>
            <button
              onClick={close}
              className="text-gray-300 hover:text-white"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6">
            <div className="mb-6 relative">
              <label htmlFor="category" className="block text-base font-semibold text-gray-900 mb-2">
                Choose a category:
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as Category)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 appearance-none"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>

            {selectedCategory === 'Hero' && (
              <div className="max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
                <div className="divide-y divide-gray-200">
                  {heroTemplates.map((template) => (
                    <div key={template.type} className="py-8 first:pt-0 last:pb-0">
                      <div 
                        onClick={() => handleTemplateClick(template.type)}
                        className="w-full cursor-pointer group relative"
                      >
                        <div className="flex flex-col items-center">
                          <div className="w-3/4 max-w-md relative">
                            <div 
                              className={`w-full transition-all duration-200 ${
                                selectedTemplate === template.type 
                                  ? 'ring-2 ring-blue-500 ring-offset-2 rounded-lg' 
                                  : ''
                              }`}
                              dangerouslySetInnerHTML={{ __html: template.svg }} 
                              style={{ aspectRatio: '100/180' }}
                            />
                            {selectedTemplate === template.type && (
                              <div className="absolute inset-0 bg-blue-600/30 rounded-lg flex items-center justify-center backdrop-blur-[2px]">
                                <PlusIcon className="w-12 h-12 text-white drop-shadow-lg" />
                              </div>
                            )}
                          </div>
                          <div className="mt-4 text-center">
                            <h3 className={`text-lg font-semibold transition-colors duration-200 ${
                              selectedTemplate === template.type 
                                ? 'text-blue-600' 
                                : 'text-gray-900 group-hover:text-blue-600'
                            }`}>
                              {template.title}
                            </h3>
                            <p className="text-base text-gray-600 mt-2">
                              {template.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedCategory === 'Our Process' && (
              <div className="text-center py-8 text-gray-500 text-base">
                Coming soon...
              </div>
            )}

            {selectedCategory === 'Contact' && (
              <div className="text-center py-8 text-gray-500 text-base">
                Coming soon...
              </div>
            )}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
} 