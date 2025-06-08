import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing environment variables:')
  console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅' : '❌')
  console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseKey ? '✅' : '❌')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function test() {
  console.log('🔍 Testing Supabase connection...')
  console.log('URL:', supabaseUrl)
  
  try {
    // First, check all pages
    const { data: allPages, error: allError } = await supabase
      .from('pages')
      .select('*')
    
    console.log('\n📊 All pages in database:')
    console.log(JSON.stringify(allPages, null, 2))
    if (allError) console.error('❌ Error fetching all pages:', allError)

    // Then, specifically check for 'qwerty'
    const { data: qwertyPage, error: qwertyError } = await supabase
      .from('pages')
      .select('*')
      .eq('slug', 'qwerty')

    console.log('\n🔎 Specific query for slug "qwerty":')
    console.log(JSON.stringify(qwertyPage, null, 2))
    if (qwertyError) console.error('❌ Error fetching qwerty page:', qwertyError)

  } catch (err) {
    console.error('❌ Connection failed:', err)
  }
}

test() 