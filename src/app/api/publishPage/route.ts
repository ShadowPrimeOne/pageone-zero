import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import sharp from 'sharp'
import { Module } from '@/lib/editor/types'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

async function processTemporaryImages(modules: Module[], slug: string) {
  const processedModules = [...modules]
  
  for (let i = 0; i < processedModules.length; i++) {
    const moduleData = processedModules[i]
    if (moduleData.props?.background?.type === 'image' && moduleData.props.background._tempFile) {
      try {
        // Convert File to ArrayBuffer
        const arrayBuffer = await moduleData.props.background._tempFile.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        // Optimize the image
        const optimizedImage = await sharp(buffer)
          .resize(1920, 1080, {
            fit: 'inside',
            withoutEnlargement: true
          })
          .webp({ quality: 90 })
          .toBuffer()

        // Generate a unique filename
        const timestamp = Date.now()
        const filename = `${timestamp}-${moduleData.props.background._tempFile.name}`
        const fullPath = `user/${slug}/${filename}`

        // Upload the optimized image
        const { error: uploadError } = await supabase.storage
          .from('public-images')
          .upload(fullPath, optimizedImage, {
            contentType: 'image/webp',
            upsert: true
          })

        if (uploadError) {
          console.error('Upload error:', uploadError)
          throw new Error('Failed to upload image')
        }

        // Get the public URL
        const { data: { publicUrl } } = supabase.storage
          .from('public-images')
          .getPublicUrl(fullPath)

        // Update the module with the new image URL
        processedModules[i] = {
          ...moduleData,
          props: {
            ...moduleData.props,
            background: {
              ...moduleData.props.background,
              image: publicUrl,
              _tempFile: undefined // Remove the temporary file
            }
          }
        }
      } catch (error) {
        console.error('Error processing image:', error)
        throw new Error('Failed to process image')
      }
    }
  }

  return processedModules
}

export async function POST(request: Request) {
  try {
    const { slug, key, modules } = await request.json()

    // Validate required fields
    if (!slug || !key || !modules) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate modules
    if (!Array.isArray(modules) || modules.length === 0) {
      return NextResponse.json(
        { error: 'Invalid modules data' },
        { status: 400 }
      )
    }

    // Check if slug already exists
    const { data: existingPage } = await supabase
      .from('pages')
      .select('id')
      .eq('slug', slug)
      .single()

    if (existingPage) {
      return NextResponse.json(
        { error: 'Slug already exists' },
        { status: 409 }
      )
    }

    // Process any temporary images
    const processedModules = await processTemporaryImages(modules, slug)

    // Insert new page with processed modules
    const { error: insertError } = await supabase
      .from('pages')
      .insert({ 
        slug, 
        key, 
        modules: processedModules,
        created_at: new Date().toISOString()
      })

    if (insertError) {
      console.error('[PublishPage] Supabase insert error:', insertError)
      return NextResponse.json(
        { error: 'Failed to publish page' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      success: true,
      slug,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/page/${slug}#key=${key}`
    })
  } catch (error) {
    console.error('[PublishPage] Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 