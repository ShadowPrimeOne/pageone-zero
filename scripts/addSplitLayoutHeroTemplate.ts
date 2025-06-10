import { createClient } from '@supabase/supabase-js'
import type { ModuleTemplate } from '../src/lib/editor/types'
import * as dotenv from 'dotenv'

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing environment variables:')
  console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅' : '❌')
  console.error('SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? '✅' : '❌')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function addSplitLayoutHeroTemplate() {
  try {
    // Check if template already exists
    const { data: existingTemplate } = await supabase
      .from('module_templates')
      .select('*')
      .eq('type', 'split_layout_hero')
      .single()

    const template: ModuleTemplate = {
      type: 'split_layout_hero',
      props: {
        heading: 'Jane Doe',
        subheading: 'Expert Legal Advisor',
        background: {
          type: 'color',
          color: '#ffffff',
          opacity: 1
        }
      }
    }

    if (existingTemplate) {
      // Update existing template
      const { data, error } = await supabase
        .from('module_templates')
        .update(template)
        .eq('id', existingTemplate.id)
        .select()
        .single()

      if (error) throw error
      console.log('Updated existing template:', data)
    } else {
      // Insert new template
      const { data, error } = await supabase
        .from('module_templates')
        .insert(template)
        .select()
        .single()

      if (error) throw error
      console.log('Added new template:', data)
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

addSplitLayoutHeroTemplate() 