import fs from 'fs'
import path from 'path'

const EXCLUDED_DIRS = ['node_modules', '.git', '.next', 'dist', 'out']
const ROOT_DIR = process.cwd()
const TIMESTAMP = new Date().toISOString().replace(/[:]/g, '-').replace(/\..+/, '')
const OUTPUT_FILE_A = path.join(ROOT_DIR, `Audit_A_${TIMESTAMP.replace(/T/, '-').slice(0, 16).replace(/-/g, '_')}.md`)
const OUTPUT_FILE_B = path.join(ROOT_DIR, `Audit_B_${TIMESTAMP.replace(/T/, '-').slice(0, 16).replace(/-/g, '_')}.md`)

function shouldExclude(p: string) {
  return EXCLUDED_DIRS.some((dir) => p.includes(path.sep + dir + path.sep))
}

interface FileInfo {
  path: string
  size: number
  content: string
}

function collectFiles(dir: string): FileInfo[] {
  let results: FileInfo[] = []
  const list = fs.readdirSync(dir)

  list.forEach((file) => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat && stat.isDirectory()) {
      if (!shouldExclude(filePath)) {
        results = results.concat(collectFiles(filePath))
      }
    } else {
      try {
        const content = fs.readFileSync(filePath, 'utf-8')
        results.push({
          path: filePath,
          size: content.length,
          content: content
        })
      } catch (err) {
        console.warn(`Failed to read ${filePath}:`, err)
      }
    }
  })

  return results
}

function formatFileContents(fileInfo: FileInfo): string {
  const relPath = path.relative(ROOT_DIR, fileInfo.path)
  return `\n\n---\n### 📄 ${relPath}\n\`\`\`\n${fileInfo.content}\n\`\`\`\n`
}

function splitFilesBySize(files: FileInfo[]): { filesA: FileInfo[], filesB: FileInfo[] } {
  // Sort files by size (largest first) to optimize distribution
  files.sort((a, b) => b.size - a.size)
  
  const totalSize = files.reduce((sum, file) => sum + file.size, 0)
  
  const filesA: FileInfo[] = []
  const filesB: FileInfo[] = []
  let currentSizeA = 0
  let currentSizeB = 0
  
  for (const file of files) {
    // Add to whichever group is smaller
    if (currentSizeA <= currentSizeB) {
      filesA.push(file)
      currentSizeA += file.size
    } else {
      filesB.push(file)
      currentSizeB += file.size
    }
  }
  
  console.log(`📊 Size Distribution:`)
  console.log(`   Part A: ${(currentSizeA / 1024 / 1024).toFixed(2)} MB (${((currentSizeA / totalSize) * 100).toFixed(1)}%)`)
  console.log(`   Part B: ${(currentSizeB / 1024 / 1024).toFixed(2)} MB (${((currentSizeB / totalSize) * 100).toFixed(1)}%)`)
  console.log(`   Total: ${(totalSize / 1024 / 1024).toFixed(2)} MB`)
  
  return { filesA, filesB }
}

function runAudit() {
  console.log('🔍 Collecting files...')
  const files = collectFiles(ROOT_DIR)
  console.log(`📁 Found ${files.length} files`)
  
  const header = `# 📦 Full Codebase Audit - ${TIMESTAMP}\n\n`
  
  // Split files by size for equal distribution
  const { filesA, filesB } = splitFilesBySize(files)
  
  // Process first half (A)
  console.log('📝 Writing Part A...')
  const outputA = [header + '(Part A)\n']
  for (const file of filesA) {
    outputA.push(formatFileContents(file))
  }
  
  // Process second half (B)
  console.log('📝 Writing Part B...')
  const outputB = [header + '(Part B)\n']
  for (const file of filesB) {
    outputB.push(formatFileContents(file))
  }

  // Write both files
  fs.writeFileSync(OUTPUT_FILE_A, outputA.join('\n'), 'utf-8')
  fs.writeFileSync(OUTPUT_FILE_B, outputB.join('\n'), 'utf-8')
  
  console.log(`✅ Audit written to:`)
  console.log(`   - ${OUTPUT_FILE_A}`)
  console.log(`   - ${OUTPUT_FILE_B}`)
}

runAudit() 