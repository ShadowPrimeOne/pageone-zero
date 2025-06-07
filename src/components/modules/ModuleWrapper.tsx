'use client'

import { FC, ReactNode } from 'react'
import clsx from 'clsx'
import type { Module } from '@/lib/editor/types'

interface Props {
  module: Module
  selected: boolean
  onSelect: (id: string) => void
  onDelete: (id: string) => void
  onMoveUp: (id: string) => void
  onMoveDown: (id: string) => void
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
  isFirst,
  isLast,
  children,
}: Props) {
  return (
    <div
      onClick={() => onSelect(module.id)}
      className={clsx(
        'relative w-full',
        selected ? 'ring-2 ring-blue-500' : ''
      )}
    >
      {selected && (
        <div className="absolute top-2 right-2 z-50 flex gap-1 bg-white/70 backdrop-blur-md rounded-md p-1 shadow-lg">
          <button onClick={(e) => { e.stopPropagation(); onMoveUp(module.id) }} disabled={isFirst}>⬆️</button>
          <button onClick={(e) => { e.stopPropagation(); onMoveDown(module.id) }} disabled={isLast}>⬇️</button>
          <button onClick={(e) => { e.stopPropagation(); console.log('Edit') }}>✏️</button>
          <button onClick={(e) => { e.stopPropagation(); onDelete(module.id) }}>❌</button>
        </div>
      )}
      <div className="flex flex-col w-full">{children}</div>
    </div>
  )
} 