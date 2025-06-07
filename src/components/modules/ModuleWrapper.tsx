'use client'

import type { ReactNode } from 'react'
import clsx from 'clsx'
import type { Module } from '@/lib/editor/types'

interface Props {
  module: Module
  selected: boolean
  onSelect: (id: string) => void
  onDelete: (id: string) => void
  onMoveUp: (id: string) => void
  onMoveDown: (id: string) => void
  onDuplicate: (id: string) => void
  isFirst: boolean
  isLast: boolean
  children: ReactNode
}

export function ModuleWrapper({
  module,
  selected,
  onSelect,
  onDelete,
  onMoveUp,
  onMoveDown,
  onDuplicate,
  isFirst,
  isLast,
  children,
}: Props) {
  return (
    <div
      onClick={() => onSelect(module.id)}
      className={clsx(
        'relative w-full transition-all',
        selected ? 'ring-2 ring-blue-500 z-10' : ''
      )}
    >
      {selected && (
        <div className="absolute top-3 right-3 z-20 flex flex-wrap gap-2 p-2 bg-white/80 backdrop-blur-md rounded-xl shadow-xl">
          {!isFirst && (
            <button
              onClick={e => { e.stopPropagation(); onMoveUp(module.id) }}
              className="p-2 text-lg text-gray-700 rounded hover:bg-blue-100 hover:text-blue-700"
              title="Move up"
            >
              ↑
            </button>
          )}
          {!isLast && (
            <button
              onClick={e => { e.stopPropagation(); onMoveDown(module.id) }}
              className="p-2 text-lg text-gray-700 rounded hover:bg-blue-100 hover:text-blue-700"
              title="Move down"
            >
              ↓
            </button>
          )}
          <button
            onClick={e => { e.stopPropagation(); onDuplicate(module.id) }}
            className="p-2 text-lg rounded hover:bg-green-100"
            title="Duplicate"
          >
            ✂️
          </button>
          <button
            onClick={e => { e.stopPropagation(); console.log('Edit stub') }}
            className="p-2 text-lg rounded hover:bg-yellow-100"
            title="Edit"
          >
            ✏️
          </button>
          <button
            onClick={e => { e.stopPropagation(); onDelete(module.id) }}
            className="p-2 text-lg text-red-500 rounded hover:bg-red-100"
            title="Delete"
          >
            ❌
          </button>
        </div>
      )}
      <div className="flex flex-col w-full">{children}</div>
    </div>
  )
} 