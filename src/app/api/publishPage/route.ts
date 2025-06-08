import { supabase } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { slug, key, modules } = await req.json()

    // Input validation
    if (!slug || typeof slug !== 'string') {
      return NextResponse.json(
        { error: 'Valid slug is required' },
        { status: 400 }
      )
    }

    if (!key || typeof key !== 'string') {
      return NextResponse.json(
        { error: 'Valid key is required' },
        { status: 400 }
      )
    }

    if (!Array.isArray(modules) || modules.length === 0) {
      return NextResponse.json(
        { error: 'At least one module is required' },
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

    // Insert page
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
      url: `https://page.one/page/${slug}#key=${key}`
    })

  } catch (err) {
    console.error('[PublishPage] Unexpected error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 