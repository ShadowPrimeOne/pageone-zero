import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/server'
import sharp from 'sharp'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const moduleType = formData.get('moduleType') as string
    const pageSlug = formData.get('pageSlug') as string

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'File must be an image' }, { status: 400 })
    }

    if (!pageSlug) {
      return NextResponse.json({ error: 'Page slug is required' }, { status: 400 })
    }

    // Read the file as ArrayBuffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Optimize image using sharp
    const optimizedImage = await sharp(buffer)
      .resize(1920, 1080, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality: 90 })
      .toBuffer()

    // Generate unique filename
    const timestamp = Date.now()
    const filename = `${moduleType}-${timestamp}.webp`

    // Ensure the folder exists
    const folderPath = `public-images/user/${pageSlug}`
    const { data: folderExists, error: listError } = await supabase
      .storage
      .from('public-images')
      .list(`user/${pageSlug}`)

    if (listError) {
      console.error('List error:', listError)
      return NextResponse.json({ error: 'Failed to check folder existence' }, { status: 500 })
    }

    if (!folderExists) {
      // Create the folder by uploading a placeholder file
      const { error: createError } = await supabase
        .storage
        .from('public-images')
        .upload(`${folderPath}/.placeholder`, new Uint8Array(0), {
          upsert: true
        })

      if (createError) {
        console.error('Create folder error:', createError)
        return NextResponse.json({ error: 'Failed to create folder' }, { status: 500 })
      }
    }

    // Upload the optimized image
    const { error: uploadError } = await supabase
      .storage
      .from('public-images')
      .upload(`${folderPath}/${filename}`, optimizedImage, {
        cacheControl: '31536000',
        upsert: false
      })

    if (uploadError) {
      console.error('Upload error:', uploadError)
      return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 })
    }

    // Get the public URL
    const { data: { publicUrl } } = supabase
      .storage
      .from('public-images')
      .getPublicUrl(`${folderPath}/${filename}`)

    return NextResponse.json({
      success: true,
      url: publicUrl,
      path: `${folderPath}/${filename}`
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 