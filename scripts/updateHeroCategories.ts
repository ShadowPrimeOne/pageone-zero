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

async function updateHeroCategories() {
  try {
    console.log('📝 Updating hero module categories...')
    
    // List of hero module types
    const heroTypes = [
      'hero',
      'hero2',
      'classic_overlay_hero',
      'top_image_center_text_hero',
      'split_layout_hero'
    ]

    // Update each hero template
    for (const type of heroTypes) {
      const { error } = await supabase
        .from('module_templates')
        .update({ category: 'hero' })
        .eq('type', type)
        .select()

      if (error) {
        console.error(`❌ Error updating ${type} template:`, error)
        continue
      }

      console.log(`✅ Updated ${type} template category to 'hero'`)
    }

    // Verify the updates
    const { data: templates, error: fetchError } = await supabase
      .from('module_templates')
      .select('*')
      .in('type', heroTypes)

    if (fetchError) {
      console.error('❌ Error fetching updated templates:', fetchError)
      process.exit(1)
    }

    console.log('\n📋 Updated Templates:')
    templates.forEach((template) => {
      console.log(`\n${template.type.toUpperCase()}:`)
      console.log('   ID:', template.id)
      console.log('   Category:', template.category)
    })

  } catch (err) {
    console.error('❌ Unexpected error:', err)
    process.exit(1)
  }
}

// Run the update
updateHeroCategories() 