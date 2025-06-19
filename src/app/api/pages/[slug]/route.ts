import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/server'
import { decryptData, generateKey } from '@/lib/encryption'

const DEV_KEY = process.env.NEXT_PUBLIC_DEV_KEY || 'dev-key-1234'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    // Fetch the page from the database
    const { data: page, error } = await supabase
      .from('pages')
      .select('*')
      .eq('slug', slug)
      .maybeSingle()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }

    if (!page) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 })
    }

    // Handle encrypted modules
    let modules = page.modules
    if (typeof modules === 'string') {
      try {
        // Try to decrypt with dev key first
        const cryptoKey = await generateKey(DEV_KEY)
        if (!cryptoKey) {
          throw new Error('Failed to generate encryption key')
        }
        modules = await decryptData(modules, cryptoKey)
      } catch (error) {
        console.error('Error decrypting modules:', error)
        return NextResponse.json({ error: 'Failed to decrypt page data' }, { status: 500 })
      }
    }

    // Validate modules data
    if (!modules || !Array.isArray(modules)) {
      console.error('Invalid modules data:', modules)
      return NextResponse.json({ error: 'Invalid modules data' }, { status: 500 })
    }

    return NextResponse.json({
      slug: page.slug,
      title: page.title || 'Page',
      description: page.description || 'A page created with PageOne.',
      modules: modules,
      created_at: page.created_at,
      updated_at: page.updated_at
    })

  } catch (error) {
    console.error('Error fetching page:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 