import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, resolve, relative, basename, extname, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Directories to scan
const SCAN_DIRS = ['src', 'scripts', 'tools']

// Files/directories to exclude
const EXCLUDE_PATTERNS = [
  'node_modules',
  '.git',
  '.next',
  'dist',
  'build',
  '.DS_Store',
  '*.log',
  '*.lock',
  '*.md',
  '*.txt',
  '*.json',
  '*.config.js',
  '*.config.ts'
]

function shouldIncludeFile(filePath: string): boolean {
  const fileName = basename(filePath)
  return !EXCLUDE_PATTERNS.some(pattern => {
    if (pattern.includes('*')) {
      const regex = new RegExp(pattern.replace('*', '.*'))
      return regex.test(fileName)
    }
    return fileName === pattern || filePath.includes(pattern)
  })
}

function scanDirectory(dir: string): string[] {
  const files: string[] = []
  const entries = readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = join(dir, entry.name)
    
    if (entry.isDirectory()) {
      if (shouldIncludeFile(fullPath)) {
        files.push(...scanDirectory(fullPath))
      }
    } else if (entry.isFile() && shouldIncludeFile(fullPath)) {
      files.push(fullPath)
    }
  }

  return files
}

// Generate timestamp for the output file
const timestamp = new Date().toISOString().replace(/[:.]/g, '_')
const outputPath = `Audit${timestamp}.md`

let output = `# 🧩 Full Project Source Audit\n\n`
output += `Generated on: ${new Date().toISOString()}\n\n`
output += `## 📁 Project Structure\n\n`

// Scan all directories
const allFiles = SCAN_DIRS.flatMap(dir => {
  const fullDir = resolve(__dirname, '..', dir)
  return scanDirectory(fullDir)
})

// Sort files for consistent output
allFiles.sort()

// Add file contents
for (const file of allFiles) {
  const relativePath = relative(resolve(__dirname, '..'), file)
  try {
    const content = readFileSync(file, 'utf-8')
    output += `\n\n## 📄 ${relativePath}\n\n\`\`\`${extname(file).slice(1) || 'text'}\n${content}\n\`\`\`\n`
  } catch (error) {
    output += `\n\n## ❌ ${relativePath}\n\nError reading file: ${error}\n`
  }
}

// Write the audit file
writeFileSync(outputPath, output)
console.log('✅ Full audit file written to', outputPath) 