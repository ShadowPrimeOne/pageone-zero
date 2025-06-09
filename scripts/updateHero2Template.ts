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

async function updateHero2Template() {
  try {
    console.log('📝 Updating Hero2 template...')
    
    // First, find the existing Hero2 template
    const { data: existingTemplate, error: findError } = await supabase
      .from('module_templates')
      .select('*')
      .eq('type', 'hero2')
      .single()

    if (findError) {
      console.error('❌ Error finding Hero2 template:', findError)
      process.exit(1)
    }

    if (!existingTemplate) {
      console.error('❌ Hero2 template not found')
      process.exit(1)
    }

    // Update the template with new copy
    const { data: updatedTemplate, error: updateError } = await supabase
      .from('module_templates')
      .update({
        props: {
          heading: 'Page.One',
          subheading: 'Your story begins here...',
          background: {
            type: 'gradient',
            color: '#000000',
            opacity: 0.8,
            gradient: {
              from: '#1a1a1a',
              to: '#000000',
              angle: 135
            }
          }
        }
      })
      .eq('id', existingTemplate.id)
      .select()
      .single()

    if (updateError) {
      console.error('❌ Error updating Hero2 template:', updateError)
      process.exit(1)
    }

    console.log('✅ Hero2 template updated successfully:')
    console.log('   ID:', updatedTemplate.id)
    console.log('   Type:', updatedTemplate.type)
    console.log('   Props:', JSON.stringify(updatedTemplate.props, null, 2))

  } catch (err) {
    console.error('❌ Unexpected error:', err)
    process.exit(1)
  }
}

updateHero2Template() 