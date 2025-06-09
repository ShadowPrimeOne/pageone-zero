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

async function updateModuleTemplates() {
  try {
    console.log('📝 Updating module templates...')
    
    // Update Hero2 template
    const { data: hero2Template, error: hero2Error } = await supabase
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
      .eq('type', 'hero2')
      .select()
      .single()

    if (hero2Error) {
      console.error('❌ Error updating Hero2 template:', hero2Error)
      process.exit(1)
    }

    // Update OurProcess template
    const { data: ourProcessTemplate, error: ourProcessError } = await supabase
      .from('module_templates')
      .update({
        props: {
          heading: 'Our Process',
          subheading: 'Simple steps to create your perfect page',
          background: {
            type: 'color',
            color: '#FFFFFF',
            opacity: 1
          }
        }
      })
      .eq('type', 'OurProcess')
      .select()
      .single()

    if (ourProcessError) {
      console.error('❌ Error updating OurProcess template:', ourProcessError)
      process.exit(1)
    }

    console.log('✅ Module templates updated successfully:')
    console.log('   Hero2:', JSON.stringify(hero2Template.props, null, 2))
    console.log('   OurProcess:', JSON.stringify(ourProcessTemplate.props, null, 2))

  } catch (err) {
    console.error('❌ Unexpected error:', err)
    process.exit(1)
  }
}

updateModuleTemplates() 