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
  onEdit: (id: string) => void
  onAddRequest: (relativeId: string, position: 'above' | 'below') => void
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
  onEdit,
  onAddRequest,
  isFirst,
  isLast,
  children,
}: Props) {
  return (
    <div
      id={module.id}
      className={clsx(
        'relative w-full group transition-all',
        selected ? 'ring-2 ring-blue-500 ring-inset scale-[1.01] my-6' : ''
      )}
      onClick={() => onSelect(module.id)}
    >
      {/* Floating controls */}
      {selected && (
        <>
          <div className="absolute -top-5 left-1/2 -translate-x-1/2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                onAddRequest(module.id, 'above')
              }}
              className="rounded-full bg-white shadow p-2 text-lg hover:bg-gray-100"
            >➕</button>
          </div>
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2">
            <button
              onClick={(e) => {
                e.stopPropagation()
                onAddRequest(module.id, 'below')
              }}
              className="rounded-full bg-white shadow p-2 text-lg hover:bg-gray-100"
            >➕</button>
          </div>
          <div className="absolute top-2 right-2 z-50 flex flex-wrap gap-1 bg-white/80 backdrop-blur-md rounded-md p-1 shadow-lg">
            <button
              onClick={(e) => {
                e.stopPropagation()
                onEdit(module.id)
              }}
              className="p-1.5 bg-white rounded hover:bg-gray-100 text-gray-700"
              title="Edit"
            >
              ✏️
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onDuplicate(module.id)
              }}
              className="p-1.5 bg-white rounded hover:bg-gray-100 text-gray-700"
              title="Duplicate"
            >
              ✂️
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onDelete(module.id)
              }}
              className="p-1.5 bg-white rounded hover:bg-red-100 text-red-600"
              title="Delete"
            >
              🗑️
            </button>
            {!isFirst && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onMoveUp(module.id)
                }}
                className="p-1.5 bg-white rounded hover:bg-gray-100 text-gray-700"
                title="Move Up"
              >
                ⬆️
              </button>
            )}
            {!isLast && (
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onMoveDown(module.id)
                }}
                className="p-1.5 bg-white rounded hover:bg-gray-100 text-gray-700"
                title="Move Down"
              >
                ⬇️
              </button>
            )}
          </div>
        </>
      )}

      {/* Content */}
      <div className="flex flex-col w-full">{children}</div>
    </div>
  )
} 