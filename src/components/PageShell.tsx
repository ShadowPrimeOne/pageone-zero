'use client'

import React from 'react'
import { EditorStateProvider } from '@/lib/editor/useEditorState'

interface Props {
  children: React.ReactNode
}

export default function PageShell({ children }: Props) {
  return (
    <EditorStateProvider>
      <main className="min-h-screen bg-gray-50">
        {children}
      </main>
    </EditorStateProvider>
  )
} 