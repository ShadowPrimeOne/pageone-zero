import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function removeTestModule() {
  try {
    console.log('🔍 Finding test module...')
    
    // Search for the test module using JSON operators
    const { data: modules, error: findError } = await supabase
      .from('module_templates')
      .select('*')
      .eq('type', 'hero')
      .contains('props', { heading: 'Hello', subheading: 'This is a test module' })

    if (findError) {
      console.error('❌ Error finding test module:', findError)
      process.exit(1)
    }

    if (!modules || modules.length === 0) {
      console.log('ℹ️ No test module found')
      process.exit(0)
    }

    const testModule = modules[0]
    console.log('✅ Found test module:', testModule.id)

    // Delete the test module
    const { error: deleteError } = await supabase
      .from('module_templates')
      .delete()
      .eq('id', testModule.id)

    if (deleteError) {
      console.error('❌ Error deleting test module:', deleteError)
      process.exit(1)
    }

    console.log('✅ Successfully removed test module:', testModule.id)
  } catch (error) {
    console.error('❌ Unexpected error:', error)
    process.exit(1)
  }
}

removeTestModule() 