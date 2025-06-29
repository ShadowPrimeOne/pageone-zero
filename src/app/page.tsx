'use client'

import React, { useEffect } from 'react'
import Image from 'next/image'
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
        
        {/* Boxy pinned to bottom left */}
        <div className="fixed bottom-4 left-4 z-[9999] pointer-events-none bg-blue-500 p-2 rounded">
          <Image 
            src="/IMAGES/How it works/Boxy the page one automation exoert..png" 
            alt="Boxy" 
            width={100} 
            height={100} 
            className="w-20 h-20 md:w-24 md:h-24 animate-bounce" 
            style={{
              filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3))',
              transform: 'scaleX(-1)'
            }}
          />
        </div>
      </main>
    </EditorStateProvider>
  )
}
