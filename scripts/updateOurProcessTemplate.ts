import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase credentials')
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function updateOurProcessTemplate() {
  try {
    // Find the OurProcess template
    const { data: template, error: findError } = await supabase
      .from('module_templates')
      .select('*')
      .eq('type', 'our_process')
      .single()

    if (findError) throw findError

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
      <stop offset="0%" stop-color="#BFFFFC" stop-opacity="0.05"/>
      <stop offset="100%" stop-color="#FF00FE" stop-opacity="0.04"/>
    </linearGradient>

    <!-- Pattern: Moroccan tile (8-point star with diamonds) -->
    <pattern id="mosaic" width="10" height="10" patternUnits="userSpaceOnUse">
      <!-- 8-point star -->
      <path d="M5 0 L6.5 3.5 L10 5 L6.5 6.5 L5 10 L3.5 6.5 L0 5 L3.5 3.5 Z"
            fill="none" stroke="url(#neon-line)" stroke-width="0.3"/>
      <!-- Center diamond overlay -->
      <path d="M5 2 L6.5 5 L5 8 L3.5 5 Z"
            fill="none" stroke="url(#neon-line)" stroke-width="0.2"/>
    </pattern>
  </defs>

  <!-- Background fill using pattern -->
  <rect width="100" height="100" fill="url(#mosaic)" />
</svg>`
          }
        }
      })
      .eq('id', template.id)
      .select()
      .single()

    if (updateError) throw updateError

    console.log('OurProcess template updated successfully:', updatedTemplate)
  } catch (error) {
    console.error('Error updating OurProcess template:', error)
  }
}

updateOurProcessTemplate() 