import { NextResponse } from 'next/server'
import sharp from 'sharp'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const moduleType = formData.get('moduleType') as string
    const pageSlug = formData.get('pageSlug') as string

    if (!file || !moduleType || !pageSlug) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Initialize Supabase client with service role key
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // Generate a unique filename
    const timestamp = Date.now()
    const filename = `${timestamp}-${file.name}`
    const fullPath = `user/${pageSlug}/${filename}`

    // Convert File to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Optimize the image
    const optimizedImage = await sharp(buffer)
      .resize(1920, 1080, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality: 90 })
      .toBuffer()

    // Upload the optimized image directly to the final path
    const { error: uploadError } = await supabase.storage
      .from('public-images')
      .upload(fullPath, optimizedImage, {
        contentType: 'image/webp',
        upsert: true
      })

    if (uploadError) {
      console.error('Upload error:', uploadError)
      return NextResponse.json(
        { error: 'Failed to upload file' },
        { status: 500 }
      )
    }

    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from('public-images')
      .getPublicUrl(fullPath)

    console.log('Successfully uploaded image to:', fullPath)
    console.log('Public URL:', publicUrl)

    return NextResponse.json({
      success: true,
      url: publicUrl,
      path: fullPath
    })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 