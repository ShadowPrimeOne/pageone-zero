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

function collectFiles(dir: string): string[] {
  let results: string[] = []
  const list = fs.readdirSync(dir)

  list.forEach((file) => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat && stat.isDirectory()) {
      if (!shouldExclude(filePath)) {
        results = results.concat(collectFiles(filePath))
      }
    } else {
      results.push(filePath)
    }
  })

  return results
}

function formatFileContents(filePath: string): string {
  const relPath = path.relative(ROOT_DIR, filePath)
  const content = fs.readFileSync(filePath, 'utf-8')
  return `\n\n---\n### 📄 ${relPath}\n\`\`\`\n${content}\n\`\`\`\n`
}

function runAudit() {
  const files = collectFiles(ROOT_DIR)
  const header = `# 📦 Full Codebase Audit - ${TIMESTAMP}\n\n`
  
  // Sort files alphabetically
  files.sort()
  
  // Split files into two groups
  const midPoint = Math.ceil(files.length / 2)
  const filesA = files.slice(0, midPoint)
  const filesB = files.slice(midPoint)
  
  // Process first half (A)
  const outputA = [header + '(Part A)\n']
  for (const file of filesA) {
    try {
      outputA.push(formatFileContents(file))
    } catch (err) {
      console.warn(`Failed to read ${file}:`, err)
    }
  }
  
  // Process second half (B)
  const outputB = [header + '(Part B)\n']
  for (const file of filesB) {
    try {
      outputB.push(formatFileContents(file))
    } catch (err) {
      console.warn(`Failed to read ${file}:`, err)
    }
  }

  // Write both files
  fs.writeFileSync(OUTPUT_FILE_A, outputA.join('\n'), 'utf-8')
  fs.writeFileSync(OUTPUT_FILE_B, outputB.join('\n'), 'utf-8')
  
  console.log(`✅ Audit written to:`)
  console.log(`   - ${OUTPUT_FILE_A}`)
  console.log(`   - ${OUTPUT_FILE_B}`)
}

runAudit() 