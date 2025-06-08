import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Define the target files for audit
const targetFiles = [
  'src/app/page/[slug]/page.tsx',
  'src/app/page.tsx',
  'src/app/layout.tsx',
  'src/app/api/publishPage/route.ts',
  'src/components/modules/ModuleRenderer.tsx',
  'src/components/modules/HeroModule.tsx',
  'src/components/modules/FormModule.tsx',
  'src/components/modules/ModuleWrapper.tsx',
  'src/components/editor/PublishModal.tsx',
  'src/components/editor/EditorPanel.tsx',
  'src/components/editor/AddModuleModal.tsx',
  'src/lib/hooks/useEditorState.ts',
  'src/lib/editor/types.ts',
  'src/lib/data.ts',
  'src/lib/supabase.ts',
  'src/lib/keyManager.ts',
  'src/lib/encryption.ts'
]

const outputPath = 'doc1.txt'
let output = `🧩 Full Project Source Audit for React Component Import Error\n\n`

for (const file of targetFiles) {
  const fullPath = path.resolve(__dirname, '..', file)
  if (fs.existsSync(fullPath)) {
    const content = fs.readFileSync(fullPath, 'utf-8')
    output += `\n\n--- FILE: ${file} ---\n\n` + content
  } else {
    output += `\n\n--- FILE NOT FOUND: ${file} ---\n\n`
  }
}

fs.writeFileSync(outputPath, output)
console.log('✅ Full audit file written to', outputPath) 