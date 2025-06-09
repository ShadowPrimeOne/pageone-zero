import { NextResponse } from 'next/server'
import { savePage } from '@/lib/editor/db'

export async function POST(request: Request) {
  try {
    const { slug, modules, key } = await request.json()

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

    const result = await savePage({ slug, modules, key })

    return NextResponse.json(result)
  } catch (err) {
    console.error('[Save] Unexpected error:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal server error' },
      { status: 500 }
    )
  }
} 