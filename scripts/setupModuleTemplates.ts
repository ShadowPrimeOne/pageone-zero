const { createClient } = require('@supabase/supabase-js')
const dotenv = require('dotenv')
const fs = require('fs')
const path = require('path')

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
  try {
    console.log('📝 Reading SQL script...')
    const sqlPath = path.join(__dirname, 'setupModuleTemplates.sql')
    const sql = fs.readFileSync(sqlPath, 'utf8')

    console.log('🔄 Executing SQL...')
    const { error } = await supabase.rpc('exec_sql', { sql })

    if (error) {
      console.error('❌ Error executing SQL:', error)
      process.exit(1)
    }

    console.log('✅ Module templates setup complete!')
  } catch (err) {
    console.error('❌ Unexpected error:', err)
    process.exit(1)
  }
}

run() 