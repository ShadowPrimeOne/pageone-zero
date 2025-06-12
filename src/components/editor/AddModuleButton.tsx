'use client'

import { useEditorState } from '@/lib/editor/useEditorState'
import { DEFAULT_MODULE_IDS, ModuleType } from '@/lib/editor/defaultModules'
import { fetchModuleTemplateById } from '@/lib/editor/db'

export function AddModuleButton() {
  const { modules, setModules, setSelectedModuleId, setIsEditorOpen } = useEditorState()

  const handleAdd = async (type: ModuleType) => {
    const templateId = DEFAULT_MODULE_IDS[type]
    if (!templateId) {
      alert('Invalid module type')
      return
    }

    const template = await fetchModuleTemplateById(templateId)
    if (!template) {
      alert('Could not load template')
      return
    }

    const newModule = {
      id: `mod-${Date.now()}`,
      type: template.type,
      category: template.category,
      props: template.props
    }

    const newModules = [...modules, newModule]
    setModules(newModules)
    setSelectedModuleId(newModule.id)
    setIsEditorOpen(true)
  }

  return (
    <div className="p-4">
      <button
        className="bg-green-600 text-white px-4 py-2 rounded mb-2"
        onClick={() => handleAdd('classic_overlay_hero')}
      >
        + Add Classic Hero
      </button>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => handleAdd('top_image_center_text_hero')}
      >
        + Add Top Center Hero
      </button>
    </div>
  )
} 