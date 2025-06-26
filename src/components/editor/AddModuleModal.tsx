'use client'

import React, { useState } from 'react'
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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with transparency */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={close} />
      
      {/* Full-screen modal on mobile, centered on desktop */}
      <div className="relative w-full h-full sm:h-auto sm:w-auto sm:max-w-4xl sm:max-h-[90vh] bg-white sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-200 bg-gradient-to-r from-primary-50 to-primary-100 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-12 h-12 bg-primary-500 rounded-xl">
              <PlusIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">
                Add Module
              </h2>
              <p className="text-sm text-neutral-600">
                Choose a template to get started
              </p>
            </div>
          </div>
          <button
            onClick={close}
            className="btn btn-ghost btn-sm flex items-center justify-center w-12 h-12 rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Close modal"
          >
            <XMarkIcon className="w-6 h-6 text-neutral-600" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6" style={{ height: '500px', maxHeight: '500px' }}>
          {/* Category Selector - Big mobile buttons */}
          <div className="mb-8">
            <label className="block text-xl font-semibold text-neutral-900 mb-6">
              Choose a category:
            </label>
            <div className="grid grid-cols-1 gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                    selectedCategory === category
                      ? 'border-blue-600 bg-blue-600 text-white shadow-md'
                      : 'border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50 text-gray-700'
                  }`}
                  style={{
                    backgroundColor: selectedCategory === category ? '#2563eb' : '#ffffff',
                    color: selectedCategory === category ? '#ffffff' : '#374151',
                    borderColor: selectedCategory === category ? '#2563eb' : '#d1d5db'
                  }}
                >
                  <div className="text-lg font-semibold mb-1">{category}</div>
                  <div className="text-sm opacity-80">
                    {category === 'Hero' && 'Landing page sections'}
                    {category === 'Our Process' && 'Step-by-step guides'}
                    {category === 'Contact' && 'Contact forms & info'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Templates */}
          {selectedCategory === 'Hero' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-neutral-900 mb-6">
                Hero Templates
              </h3>
              <div className="space-y-6">
                {heroTemplates.map((template) => (
                  <div
                    key={template.type}
                    className={`cursor-pointer rounded-2xl border-2 transition-all duration-200 hover:shadow-lg ${
                      selectedTemplate === template.type
                        ? 'border-primary-500 bg-primary-50 shadow-lg'
                        : 'border-neutral-200 bg-white hover:border-neutral-300'
                    }`}
                    onClick={() => handleTemplateClick(template.type)}
                  >
                    <div className="p-6">
                      {/* Template Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <h4 className="text-xl font-semibold text-neutral-900 mb-2">
                            {template.title}
                          </h4>
                          <p className="text-base text-neutral-600">
                            {template.description}
                          </p>
                        </div>
                        {selectedTemplate === template.type && (
                          <div className="flex items-center justify-center w-10 h-10 bg-primary-500 rounded-full">
                            <PlusIcon className="w-5 h-5 text-white" />
                          </div>
                        )}
                      </div>

                      {/* Template Preview */}
                      <div className="mb-6">
                        <div 
                          className={`w-full transition-all duration-200 rounded-xl overflow-hidden ${
                            selectedTemplate === template.type 
                              ? 'ring-2 ring-primary-500 ring-offset-2' 
                              : 'hover:shadow-md'
                          }`}
                          dangerouslySetInnerHTML={{ __html: template.svg }} 
                          style={{ aspectRatio: '100/180' }}
                        />
                      </div>

                      {/* Big CTA Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleTemplateClick(template.type)
                        }}
                        className={`btn w-full py-4 px-6 rounded-xl text-lg font-semibold transition-all duration-200 ${
                          selectedTemplate === template.type
                            ? 'btn-primary shadow-lg'
                            : 'btn-secondary'
                        }`}
                      >
                        {selectedTemplate === template.type ? 'Add This Template' : 'Select Template'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedCategory === 'Our Process' && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-neutral-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🚧</span>
              </div>
              <h3 className="text-2xl font-semibold text-neutral-900 mb-4">
                Coming Soon
              </h3>
              <p className="text-lg text-neutral-600">
                Our Process templates are being crafted. Check back soon!
              </p>
            </div>
          )}

          {selectedCategory === 'Contact' && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-neutral-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">📧</span>
              </div>
              <h3 className="text-2xl font-semibold text-neutral-900 mb-4">
                Coming Soon
              </h3>
              <p className="text-lg text-neutral-600">
                Contact form templates are being designed. Check back soon!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 