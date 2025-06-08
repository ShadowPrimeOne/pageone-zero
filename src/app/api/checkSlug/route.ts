import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

// Debug client with service role key (only for development)
const supabaseAdmin = process.env.NODE_ENV === 'development' && 
  process.env.SUPABASE_SERVICE_ROLE_KEY && 
  process.env.NEXT_PUBLIC_SUPABASE_URL
  ? createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )
  : null

// Debug test for Supabase connection
async function testSupabaseConnection() {
  console.log('[checkSlug] Testing Supabase connection...')
  const { data, error } = await supabase
    .from('pages')
    .select('slug')
    .eq('slug', 'qwerty')
    .limit(1)

  console.log('[checkSlug] Manual test - Found:', data, 'Error:', error)
  return { data, error }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const slug = searchParams.get('slug')

  if (!slug) {
    return NextResponse.json({ error: 'Missing slug' }, { status: 400 })
  }

  try {
    // Run connection test first
    await testSupabaseConnection()

    console.log('[checkSlug] Checking slug:', slug)

    // Test with anon key
    console.log('[checkSlug] Testing with anon key...')
    const { data: anonData, error: anonError } = await supabase
      .from('pages')
      .select('*')
      .eq('slug', slug)

    const anonResult = anonData || []
    console.log('[checkSlug] Anon key result:', {
      data: JSON.stringify(anonResult, null, 2),
      error: anonError
    })

    // Only use admin client in development
    if (supabaseAdmin) {
      console.log('[checkSlug] Testing with service role key...')
      const { data: adminData, error: adminError } = await supabaseAdmin
        .from('pages')
        .select('*')
        .eq('slug', slug)

      const adminResult = adminData || []
      console.log('[checkSlug] Service role result:', {
        data: JSON.stringify(adminResult, null, 2),
        error: adminError
      })

      // Use admin data for availability check in development
      const isAvailable = adminResult.length === 0
      console.log('[checkSlug] Availability determination:', {
        anonDataLength: anonResult.length,
        adminDataLength: adminResult.length,
        isAvailable
      })

      return NextResponse.json({ available: isAvailable })
    }

    // In production, use anon key result
    const isAvailable = anonResult.length === 0
    console.log('[checkSlug] Availability determination:', {
      anonDataLength: anonResult.length,
      isAvailable
    })

    return NextResponse.json({ available: isAvailable })
  } catch (err) {
    console.error('[checkSlug] Unexpected error:', err)
    return NextResponse.json(
      { error: 'Failed to check slug availability' },
      { status: 500 }
    )
  }
} 