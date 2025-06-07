import { FC } from 'react'

interface EditorPanelProps {
  selectedModuleId: string | null
}

export const EditorPanel: FC<EditorPanelProps> = ({ selectedModuleId }) => {
  if (!selectedModuleId) {
    return (
      <div className="p-4 border-l border-gray-200">
        <p className="text-gray-500">Select a module to edit</p>
      </div>
    )
  }

  return (
    <div className="p-4 border-l border-gray-200">
      <h3 className="text-lg font-medium mb-4">Edit Module</h3>
      {/* Module-specific editor will be rendered here */}
    </div>
  )
} 