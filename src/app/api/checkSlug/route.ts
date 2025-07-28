import { NextResponse } from 'next/server'
// import { createClient } from '@supabase/supabase-js'

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// )

export async function GET(request: Request) {
  // Supabase temporarily disabled for local dev: always return available
  return NextResponse.json({ available: true })
}

 