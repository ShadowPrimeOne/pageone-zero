import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { generateKey, encryptData } from '@/lib/encryption'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function PUT(request: Request) {
  try {
    const { slug, key, modules } = await request.json()

    if (!slug || !key || !modules) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if page exists
    const { data: existingPage, error: fetchError } = await supabase
      .from('pages')
      .select('*')
      .eq('slug', slug)
      .single()

    if (fetchError || !existingPage) {
      return NextResponse.json(
        { error: 'Page not found' },
        { status: 404 }
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

    // Encrypt modules with the provided key
    const encryptedModules = await encryptData(modules, encryptionKey)

    // Update the page
    const { error: updateError } = await supabase
      .from('pages')
      .update({
        modules: encryptedModules,
        updated_at: new Date().toISOString()
      })
      .eq('slug', slug)

    if (updateError) {
      console.error('Error updating page:', updateError)
      return NextResponse.json(
        { error: 'Failed to update page' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in updatePage:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 