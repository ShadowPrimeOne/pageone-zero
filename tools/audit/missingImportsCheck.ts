import fs from 'fs'
import path from 'path'

const projectRoot = path.resolve(__dirname, '../../')
const srcPath = path.join(projectRoot, 'src')

const getAllFiles = (dirPath: string, arrayOfFiles: string[] = []): string[] => {
  const files = fs.readdirSync(dirPath)
  for (const file of files) {
    const fullPath = path.join(dirPath, file)
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, arrayOfFiles)
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      arrayOfFiles.push(fullPath)
    }
  }
  return arrayOfFiles
}

const extractImports = (fileContent: string): string[] => {
  const importRegex = /import .*? from ['"]@\/(.*?)['"]/g
  const matches = [...fileContent.matchAll(importRegex)]
  return matches.map((match) => match[1])
}

const checkImportPaths = () => {
  const allFiles = getAllFiles(srcPath)
  const usedPaths = new Set<string>()
  const missingPaths: { file: string; imp: string }[] = []

  for (const file of allFiles) {
    const content = fs.readFileSync(file, 'utf8')
    const imports = extractImports(content)
    for (const imp of imports) {
      const resolved = path.join(srcPath, imp)
      if (!fs.existsSync(resolved + '.ts') && 
          !fs.existsSync(resolved + '.tsx') && 
          !fs.existsSync(resolved) && 
          !fs.existsSync(resolved + '/index.tsx')) {
        missingPaths.push({ file, imp })
      } else {
        usedPaths.add(imp)
      }
    }
  }

  console.log('\n--- ✅ Import Path Audit ---')
  if (missingPaths.length === 0) {
    console.log('All @/ imports resolved ✅')
  } else {
    for (const { file, imp } of missingPaths) {
      console.log(`❌ Missing: '@/` + imp + `' used in ${file}`)
    }
  }
  console.log('--- End of Audit ---\n')
}

checkImportPaths() 