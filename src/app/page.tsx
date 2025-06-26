'use client'

import React, { useEffect } from 'react'
import { EditorStateProvider } from '@/lib/editor/useEditorState'
import { ModuleBuilder } from '@/components/editor/ModuleBuilder'

export default function HomePage() {
  // Debug logging for main page
  useEffect(() => {
    console.log('🔍 HomePage Debug Info:')
    console.log('Main container dimensions:', window.innerWidth, 'x', window.innerHeight)
    
    const mainElement = document.querySelector('main')
    if (mainElement) {
      const rect = mainElement.getBoundingClientRect()
      const styles = window.getComputedStyle(mainElement)
      console.log('Main element dimensions:', rect.width, 'x', rect.height)
      console.log('Main element styles:', {
        height: styles.height,
        minHeight: styles.minHeight,
        maxHeight: styles.maxHeight,
        overflow: styles.overflow,
        display: styles.display,
        position: styles.position
      })
    }
  }, [])

  return (
    <EditorStateProvider>
      <main className="min-h-screen h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <ModuleBuilder />
      </main>
    </EditorStateProvider>
  )
}
