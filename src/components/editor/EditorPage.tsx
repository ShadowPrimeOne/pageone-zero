'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import type { Module } from '@/lib/editor/types'

// Dynamically import the editor component with no SSR
const EditorView = dynamic(
  () => import('./EditorView'),
  { 
    ssr: false,
    loading: () => <div>Loading editor...</div>
  }
) as React.ComponentType<{ initialModules: Module[] }>

interface Props {
  modules: Module[]
}

export default function EditorPage({ modules }: Props) {
  return (
    <main className="min-h-screen bg-gray-50">
      <EditorView initialModules={modules} />
    </main>
  )
} 