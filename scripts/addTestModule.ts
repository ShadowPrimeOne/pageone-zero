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

async function addTestModule() {
  try {
    console.log('📝 Adding test module...')
    
    const testModule = {
      type: 'hero',
      props: {
        heading: 'Hello',
        subheading: 'This is a test module'
      }
    }

    const { data, error } = await supabase
      .from('module_templates')
      .insert(testModule)
      .select()
      .single()

    if (error) {
      console.error('❌ Error adding test module:', error)
      process.exit(1)
    }

    console.log('✅ Test module added successfully:')
    console.log('   ID:', data.id)
    console.log('   Type:', data.type)
    console.log('   Props:', JSON.stringify(data.props, null, 2))

  } catch (err) {
    console.error('❌ Unexpected error:', err)
    process.exit(1)
  }
}

addTestModule() 