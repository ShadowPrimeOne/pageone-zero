interface Props {
  color: string
  onChange: (color: string) => void
}

export function ColorPicker({ color, onChange }: Props) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="color"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        className="w-12 h-10 p-1 border-2 border-gray-300 rounded-md"
      />
      <input
        type="text"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 px-3 py-2 border-2 border-gray-300 rounded-md"
        placeholder="#000000"
      />
    </div>
  )
} 