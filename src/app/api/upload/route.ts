import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  // This is a stub for future image upload functionality
  return NextResponse.json(
    { error: 'Image upload not implemented yet' },
    { status: 501 }
  )
} 