'use client'

import React from 'react'
import { EditorStateProvider } from '@/lib/editor/useEditorState'
import { ModuleBuilder } from '@/components/editor/ModuleBuilder'

export default function HomePage() {
  return (
    <EditorStateProvider>
      <main className="min-h-screen bg-gray-50">
        <ModuleBuilder />
      </main>
    </EditorStateProvider>
  )
}
