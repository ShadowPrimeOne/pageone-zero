import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import sharp from 'sharp'

// Maximum file size (50MB)
const MAX_FILE_SIZE = 50 * 1024 * 1024

// Allowed image types
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']

export async function POST(request: Request) {
  try {
    const { base64, name, type, slug } = await request.json()

    if (!base64 || !name || !slug || !type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(type)) {
      return NextResponse.json(
        { error: `Invalid file type: ${type}` },
        { status: 400 }
      )
    }

    // Convert base64 to buffer
    const imageBuffer = Buffer.from(base64, 'base64')

    // Validate buffer
    if (!imageBuffer || !imageBuffer.length) {
      return NextResponse.json(
        { error: 'Invalid image data' },
        { status: 400 }
      )
    }

    // Validate file size
    if (imageBuffer.length > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size exceeds 50MB limit' },
        { status: 400 }
      )
    }

    try {
      // Optimize image
      const optimizedImage = await sharp(imageBuffer)
        .resize(1920, 1080, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .webp({ quality: 90 })
        .toBuffer()

      // Sanitize filename and generate path
      const timestamp = Date.now()
      const safeName = name.replace(/[^a-zA-Z0-9-_]/g, '') // remove symbols
      const filename = `${timestamp}-${safeName}.webp`
      const path = `user/${slug}/${filename}`

      // Upload to Supabase Storage using admin client
      const { error: uploadError } = await supabaseAdmin.storage
        .from('public-images')
        .upload(path, optimizedImage, {
          contentType: 'image/webp',
          upsert: true,
          headers: {
            'Content-Disposition': `inline; filename="${filename}"`
          }
        })

      if (uploadError) {
        console.error('Upload error:', uploadError)
        return NextResponse.json(
          { error: 'Failed to upload file' },
          { status: 500 }
        )
      }

      // Get public URL
      const { data: { publicUrl } } = supabaseAdmin.storage
        .from('public-images')
        .getPublicUrl(path)

      return NextResponse.json({ url: publicUrl })
    } catch (error: unknown) {
      console.error('Image processing error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to process image'
      return NextResponse.json(
        { error: errorMessage },
        { status: 500 }
      )
    }
  } catch (error: unknown) {
    console.error('Upload error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Internal server error'
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
} 