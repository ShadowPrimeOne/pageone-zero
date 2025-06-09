import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import type { Module } from '../src/lib/editor/types'

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

interface ModuleTemplate extends Module {
  created_at: string
}

async function checkTemplates() {
  try {
    console.log('🔍 Checking module templates...')
    
    const { data, error } = await supabase
      .from('module_templates')
      .select('*')
      .order('created_at', { ascending: true })

    if (error) {
      console.error('❌ Error fetching templates:', error)
      process.exit(1)
    }

    if (!data || data.length === 0) {
      console.error('❌ No templates found!')
      process.exit(1)
    }

    console.log('\n✅ Found templates:')
    data.forEach((template: ModuleTemplate, index: number) => {
      console.log(`\n${index + 1}. ${template.type.toUpperCase()} Template:`)
      console.log('   ID:', template.id)
      console.log('   Props:', JSON.stringify(template.props, null, 2))
    })

  } catch (err) {
    console.error('❌ Unexpected error:', err)
    process.exit(1)
  }
}

checkTemplates() 