import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { generateKey } from '@/lib/encryption'
import { Module } from '@/lib/editor/types'
import sharp from 'sharp'

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

// Maximum file size (50MB)
const MAX_FILE_SIZE = 50 * 1024 * 1024

// Allowed image types
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']

export async function POST(request: Request) {
  try {
    const { slug, key, modules } = await request.json()

    if (!slug || !key || !modules) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Generate encryption key
    const encryptionKey = await generateKey(key)
    if (!encryptionKey) {
      return NextResponse.json(
        { error: 'Failed to generate encryption key' },
        { status: 500 }
      )
    }

    // Process modules to handle image uploads
    const processedModules = await Promise.all(modules.map(async (module: Module) => {
      if (module.props?.background?.type === 'image' && module.props.background._tempFile?.data) {
        try {
          // Validate file type
          const fileType = module.props.background._tempFile.type
          if (!ALLOWED_TYPES.includes(fileType)) {
            throw new Error(`Invalid file type: ${fileType}`)
          }

          // Convert base64 to buffer
          const imageBuffer = Buffer.from(module.props.background._tempFile.data, 'base64')

          // Validate file size
          if (imageBuffer.length > MAX_FILE_SIZE) {
            throw new Error('File size exceeds 50MB limit')
          }

          // Optimize image
          const optimizedImage = await sharp(imageBuffer)
            .resize(1920, 1080, {
              fit: 'inside',
              withoutEnlargement: true
            })
            .webp({ quality: 90 })
            .toBuffer()

          // Generate unique filename with timestamp
          const timestamp = Date.now()
          const filename = `${timestamp}-${module.props.background._tempFile.name.replace(/\.[^/.]+$/, '')}.webp`
          const filePath = `user/${slug}/${filename}`

          // Upload to Supabase Storage
          const { error: uploadError } = await supabase.storage
            .from('public-images')
            .upload(filePath, optimizedImage, {
              contentType: 'image/webp',
              upsert: true
            })

          if (uploadError) {
            console.error('Error uploading image:', uploadError)
            throw uploadError
          }

          // Get public URL
          const { data: { publicUrl } } = supabase.storage
            .from('public-images')
            .getPublicUrl(filePath)

          // Update module with image URL
          return {
            ...module,
            props: {
              ...module.props,
              background: {
                ...module.props.background,
                image: publicUrl,
                _tempFile: undefined // Remove temporary file data
              }
            }
          }
        } catch (error) {
          console.error('Error processing image:', error)
          throw error
        }
      }
      return module
    }))

    // Encrypt modules data
    const encryptedData = await encryptData(processedModules, encryptionKey)

    // Save to Supabase
    const { data, error } = await supabase
      .from('pages')
      .upsert({
        slug,
        key,
        modules: encryptedData,
        updated_at: new Date().toISOString()
      })

    if (error) {
      console.error('Error saving to Supabase:', error)
      return NextResponse.json(
        { error: 'Failed to save page' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error in publishPage:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

async function encryptData(data: Module[], key: CryptoKey): Promise<string> {
  const encoder = new TextEncoder()
  const jsonString = JSON.stringify(data)
  const dataBuffer = encoder.encode(jsonString)

  const iv = crypto.getRandomValues(new Uint8Array(12))
  const encryptedBuffer = await crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv
    },
    key,
    dataBuffer
  )

  const encryptedArray = new Uint8Array(encryptedBuffer)
  const combinedArray = new Uint8Array(iv.length + encryptedArray.length)
  combinedArray.set(iv)
  combinedArray.set(encryptedArray, iv.length)

  return btoa(String.fromCharCode(...combinedArray))
} 