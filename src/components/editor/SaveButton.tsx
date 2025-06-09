'use client'

import { useState } from 'react'
import { useEditorState } from '@/lib/editor/useEditorState'
import SaveModal from './SaveModal'

export function SaveButton() {
  const { modules, isDirty, markClean } = useEditorState()
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false)

  if (!isDirty) return null

  return (
    <>
      <button
        onClick={() => setIsSaveModalOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#004225] text-white shadow-lg hover:bg-[#005c33] hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center justify-center ring-1 ring-white/10"
        title="Save Changes"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-7 h-7"
        >
          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
          <polyline points="17 21 17 13 7 13 7 21" />
          <polyline points="7 3 7 8 15 8" />
        </svg>
      </button>

      <SaveModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onSave={() => {
          setIsSaveModalOpen(false)
          markClean()
        }}
        modules={modules}
      />
    </>
  )
} 