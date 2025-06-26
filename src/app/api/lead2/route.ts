import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, businessType, slug, key } = body

    // Validate required fields
    if (!name || !email || !businessType || !slug) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // TODO: Send email to shadow.prime.one@gmail.com
    console.log('📧 Email to send:', {
      to: 'shadow.prime.one@gmail.com',
      subject: `New Lead: ${businessType} - ${slug}`,
      body: `
        New lead received:
        Name: ${name}
        Email: ${email}
        Phone: ${phone || 'Not provided'}
        Business Type: ${businessType}
        Source: ${slug}
        Key: ${key || 'No key'}
      `
    })

    // TODO: Send SMS to +61411070473
    console.log('📱 SMS to send:', {
      to: '+61411070473',
      message: `New ${businessType} lead: ${name} (${email}) from ${slug}`
    })

    // TODO: Save to Supabase
    console.log('💾 Save to Supabase:', {
      table: 'leads',
      data: {
        name,
        email,
        phone,
        businessType,
        slug,
        key,
        createdAt: new Date().toISOString()
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Lead submission error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 