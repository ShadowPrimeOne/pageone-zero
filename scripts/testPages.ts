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

async function run() {
  console.log('🔍 Checking pages table...')
  
  try {
    const { data, error } = await supabase.from('pages').select('*')
    
    if (error) {
      console.error('❌ Error fetching pages:', error)
      return
    }

    console.log('✅ Pages in database:', JSON.stringify(data, null, 2))
    
    // Check schema
    const { data: schema, error: schemaError } = await supabase
      .from('pages')
      .select('*')
      .limit(1)
      .single()
    
    if (schemaError) {
      console.error('❌ Error checking schema:', schemaError)
      return
    }

    console.log('\n📋 Table schema sample:', JSON.stringify(schema, null, 2))
  } catch (err) {
    console.error('❌ Connection failed:', err)
  }
}

run() 