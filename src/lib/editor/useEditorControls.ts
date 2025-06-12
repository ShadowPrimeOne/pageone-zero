'use client'

import { create } from 'zustand'

interface EditorControlsState {
  isAddModalOpen: boolean
  setIsAddModalOpen: (isOpen: boolean) => void
}

export const useEditorControls = create<EditorControlsState>((set) => ({
  isAddModalOpen: false,
  setIsAddModalOpen: (isOpen: boolean) => set({ isAddModalOpen: isOpen }),
})) 