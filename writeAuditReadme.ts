import fs from 'fs'
import path from 'path'

const EXCLUDED_DIRS = ['node_modules', '.git', '.next', 'dist', 'out']
const ROOT_DIR = process.cwd()
const TIMESTAMP = new Date().toISOString().replace(/[:]/g, '-').replace(/\..+/, '')
const OUTPUT_FILE = path.join(ROOT_DIR, `Audit${TIMESTAMP.replace(/T/, '-').slice(0, 16).replace(/-/g, '_')}.md`)

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
  const output = [`# 📦 Full Codebase Audit - ${TIMESTAMP}\n\n`]

  for (const file of files) {
    try {
      output.push(formatFileContents(file))
    } catch (err) {
      console.warn(`Failed to read ${file}:`, err)
    }
  }

  fs.writeFileSync(OUTPUT_FILE, output.join('\n'), 'utf-8')
  console.log(`✅ Audit written to ${OUTPUT_FILE}`)
}

runAudit() 