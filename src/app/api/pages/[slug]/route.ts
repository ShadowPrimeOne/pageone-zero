import { NextRequest, NextResponse } from 'next/server'
// Supabase and encryption logic disabled for local dev

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  // Supabase and encryption logic disabled for local dev
  const { slug } = await params;
  return NextResponse.json({
    slug,
    title: 'Stub Page',
    description: 'A stub page for local development.',
    modules: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  })
}