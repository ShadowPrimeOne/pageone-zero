'use client'

import { EditorStateProvider } from '@/lib/editor/useEditorState'
import { ModuleBuilder } from '@/components/editor/ModuleBuilder'
import type { Module } from '@/lib/editor/types'

interface Props {
  initialModules: Module[]
}

export default function EditorView({ initialModules }: Props) {
  return (
    <EditorStateProvider initialModules={initialModules}>
      <ModuleBuilder />
    </EditorStateProvider>
  )
} 