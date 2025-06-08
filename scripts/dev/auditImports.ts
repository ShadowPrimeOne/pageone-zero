import fs from 'fs'
import path from 'path'

const ROOT = path.resolve(__dirname, '../../')

type ImportCheck = {
  file: string
  expectedPath: string
  type: 'default' | 'named'
  label: string
}

type FileCheck = {
  file: string
  shouldExist: true
}

type ExportCheck = {
  file: string
  exports: string[]
}

type Check = ImportCheck | FileCheck | ExportCheck

const checks: Check[] = [
  {
    file: 'src/app/page/[slug]/page.tsx',
    expectedPath: '@/components/modules/PublicModuleRenderer',
    type: 'default',
    label: 'PublicModuleRenderer',
  },
  {
    file: 'src/components/modules/PublicModuleRenderer.tsx',
    shouldExist: true,
  },
  {
    file: 'src/components/modules/ModuleRenderer.tsx',
    exports: ['ModuleRenderer'],
  },
]

function checkFileExists(file: string) {
  const exists = fs.existsSync(path.join(ROOT, file))
  console.log(`${exists ? '✅' : '❌'} ${file} ${exists ? 'exists' : 'is missing'}`)
  return exists
}

function checkImport({
  file,
  expectedPath,
  type,
  label,
}: ImportCheck) {
  const fullPath = path.join(ROOT, file)
  if (!fs.existsSync(fullPath)) {
    console.warn(`⚠️ File not found: ${file}`)
    return
  }
  const code = fs.readFileSync(fullPath, 'utf8')
  const regex =
    type === 'default'
      ? new RegExp(`import\\s+${label}\\s+from\\s+['"]${expectedPath}['"]`)
      : new RegExp(`import\\s+\\{[^}]*\\b${label}\\b[^}]*\\}\\s+from\\s+['"]${expectedPath}['"]`)

  const result = regex.test(code)
  console.log(`${result ? '✅' : '❌'} ${label} ${type} import in ${file}`)
}

function checkNamedExport(file: string, exports: string[]) {
  const fullPath = path.join(ROOT, file)
  if (!fs.existsSync(fullPath)) {
    console.warn(`⚠️ File not found: ${file}`)
    return
  }
  const code = fs.readFileSync(fullPath, 'utf8')
  exports.forEach((label) => {
    const regex = new RegExp(`export\\s+(const|function|class)?\\s*${label}\\b`)
    const result = regex.test(code)
    console.log(`${result ? '✅' : '❌'} ${label} exported in ${file}`)
  })
}

function runAudit() {
  console.log('--- 🔍 Import Audit ---')

  checks.forEach((check) => {
    if ('shouldExist' in check) {
      checkFileExists(check.file)
    } else if ('expectedPath' in check) {
      checkImport(check as ImportCheck)
    } else if ('exports' in check) {
      checkNamedExport(check.file, check.exports)
    }
  })

  console.log('--- ✅ Audit Complete ---')
}

runAudit() 