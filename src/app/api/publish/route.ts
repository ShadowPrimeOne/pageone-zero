import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: Request) {
  try {
    const { slug, encryptedPayload } = await request.json()

    if (!slug || !encryptedPayload) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from('encrypted_pages')
      .upsert({
        slug,
        encrypted_payload: encryptedPayload,
        updated_at: new Date().toISOString(),
      })

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Publish error:', error)
    return NextResponse.json(
      { error: 'Failed to publish page' },
      { status: 500 }
    )
  }
} 