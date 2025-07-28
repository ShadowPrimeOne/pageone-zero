import { NextResponse } from 'next/server'
import sharp from 'sharp'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: Request) {
  // Supabase logic disabled for local dev
  return NextResponse.json({ success: true, url: '', path: '' })
}