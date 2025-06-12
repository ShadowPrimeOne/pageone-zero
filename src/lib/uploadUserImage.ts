export async function uploadUserImage(file: File, slug: string): Promise<string> {
  console.log('📤 Preparing upload for:', {
    name: file.name,
    type: file.type,
    size: file.size
  })

  // Convert file to base64
  const base64 = await new Promise<string>((resolve) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      const base64String = reader.result as string
      // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
      resolve(base64String.split(',')[1])
    }
    reader.readAsDataURL(file)
  })

  const response = await fetch('/api/uploadImage', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      base64,
      name: file.name,
      type: file.type,
      slug: slug.replace(/[^a-zA-Z0-9-_]/g, '') // sanitize
    })
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(`❌ Upload failed: ${error.error || 'Unknown error'}`)
  }

  const { url } = await response.json()
  console.log('🔗 Generated public URL:', url)

  return url
} 