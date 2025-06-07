import { FC, ReactNode } from 'react'
import clsx from 'clsx'

interface ModuleWrapperProps {
  id: string
  isSelected: boolean
  onSelect: () => void
  children: ReactNode
}

export const ModuleWrapper: FC<ModuleWrapperProps> = ({
  id,
  isSelected,
  onSelect,
  children,
}) => {
  return (
    <div
      id={id}
      onClick={onSelect}
      className={clsx(
        'relative p-4 rounded-lg transition-colors',
        isSelected
          ? 'ring-2 ring-blue-500 bg-blue-50'
          : 'hover:bg-gray-50 cursor-pointer'
      )}
    >
      {children}
    </div>
  )
} 