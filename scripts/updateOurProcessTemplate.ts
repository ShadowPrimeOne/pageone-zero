import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing environment variables:')
  console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅' : '❌')
  console.error('SUPABASE_SERVICE_ROLE_KEY:', supabaseKey ? '✅' : '❌')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function updateOurProcessTemplate() {
  try {
    console.log('📝 Updating OurProcess template...')
    
    // First, find the existing OurProcess template
    const { data: existingTemplate, error: findError } = await supabase
      .from('module_templates')
      .select('*')
      .eq('type', 'our-process')
      .single()

    if (findError) {
      console.error('❌ Error finding OurProcess template:', findError)
      process.exit(1)
    }

    if (!existingTemplate) {
      console.error('❌ OurProcess template not found')
      process.exit(1)
    }

    // Update the template with new props
    const { data: updatedTemplate, error: updateError } = await supabase
      .from('module_templates')
      .update({
        props: {
          heading: "Our Process",
          subheading: "Simple steps to create your perfect page",
          background: {
            type: "solid",
            color: "#FFFFFF",
            opacity: 1,
            svg: `<svg viewBox="0 0 100 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Neon gradients for coloring -->
    <linearGradient id="neon-line" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#BFFFFC" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#FF00FE" stop-opacity="0.18"/>
    </linearGradient>

    <!-- Pattern: Moroccan tile (8-point star with diamonds) -->
    <pattern id="mosaic" width="10" height="10" patternUnits="userSpaceOnUse">
      <!-- 8-point star -->
      <path d="M5 0 L6.5 3.5 L10 5 L6.5 6.5 L5 10 L3.5 6.5 L0 5 L3.5 3.5 Z"
            fill="none" stroke="url(#neon-line)" stroke-width="0.4"/>
      <!-- Center diamond overlay -->
      <path d="M5 2 L6.5 5 L5 8 L3.5 5 Z"
            fill="none" stroke="url(#neon-line)" stroke-width="0.3"/>
    </pattern>
  </defs>

  <!-- Background fill using pattern -->
  <rect width="100" height="100" fill="url(#mosaic)" />
</svg>`
          }
        }
      })
      .eq('id', existingTemplate.id)
      .select()
      .single()

    if (updateError) {
      console.error('❌ Error updating OurProcess template:', updateError)
      process.exit(1)
    }

    console.log('✅ OurProcess template updated successfully:')
    console.log('   ID:', updatedTemplate.id)
    console.log('   Type:', updatedTemplate.type)
    console.log('   Props:', JSON.stringify(updatedTemplate.props, null, 2))

  } catch (err) {
    console.error('❌ Unexpected error:', err)
    process.exit(1)
  }
}

updateOurProcessTemplate() 