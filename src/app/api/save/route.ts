import { NextResponse } from 'next/server'
import { savePage } from '@/lib/editor/db'

export async function POST(request: Request) {
  // Backend logic disabled for local dev
  return NextResponse.json({ success: true })
}