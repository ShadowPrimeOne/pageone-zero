import fs from 'fs'
import path from 'path'

const projectRoot = path.resolve(__dirname, '../../')
const srcPath = path.join(projectRoot, 'src')

function getAllFiles(dirPath: string, arrayOfFiles: { path: string; size: number }[] = []): { path: string; size: number }[] {
  const files = fs.readdirSync(dirPath)
  
  for (const file of files) {
    const fullPath = path.join(dirPath, file)
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, arrayOfFiles)
    } else {
      const stats = fs.statSync(fullPath)
      arrayOfFiles.push({
        path: path.relative(projectRoot, fullPath),
        size: stats.size
      })
    }
  }
  
  return arrayOfFiles
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

function printFileMap() {
  console.log('\n📁 Project File Map\n')
  
  const files = getAllFiles(srcPath)
    .sort((a, b) => a.path.localeCompare(b.path))
  
  let totalSize = 0
  let fileCount = 0
  
  for (const file of files) {
    const size = formatSize(file.size)
    console.log(`${size.padStart(8)} ${file.path}`)
    totalSize += file.size
    fileCount++
  }
  
  console.log('\n📊 Summary:')
  console.log(`Total Files: ${fileCount}`)
  console.log(`Total Size: ${formatSize(totalSize)}`)
  console.log('\n')
}

printFileMap() 