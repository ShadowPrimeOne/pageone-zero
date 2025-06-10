import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

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

    // Insert new page
    const { error: insertError } = await supabase
      .from('pages')
      .insert({ 
        slug, 
        key, 
        modules,
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