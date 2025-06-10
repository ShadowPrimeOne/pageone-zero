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

async function addTopImageCenterTextHeroTemplate() {
  try {
    console.log('📝 Adding Top Image Center Text Hero template...')
    
    // First check if template already exists
    const { data: existingTemplate } = await supabase
      .from('module_templates')
      .select('*')
      .eq('type', 'top_image_center_text_hero')
      .single()

    const templateProps = {
      heading: "Top Image + Center Text",
      subheading: "Use Case: Clear product intros, coaching, services",
      background: {
        type: 'color',
        color: '#ffffff',
        opacity: 1
      }
    }

    let template
    if (!existingTemplate) {
      // Create new template
      const { data: newTemplate, error: createError } = await supabase
        .from('module_templates')
        .insert({
          type: 'top_image_center_text_hero',
          props: templateProps
        })
        .select()
        .single()

      if (createError) {
        console.error('❌ Error creating Top Image Center Text Hero template:', createError)
        process.exit(1)
      }
      template = newTemplate
      console.log('✅ Created new Top Image Center Text Hero template')
    } else {
      // Update existing template
      const { data: updatedTemplate, error: updateError } = await supabase
        .from('module_templates')
        .update({ props: templateProps })
        .eq('type', 'top_image_center_text_hero')
        .select()
        .single()

      if (updateError) {
        console.error('❌ Error updating Top Image Center Text Hero template:', updateError)
        process.exit(1)
      }
      template = updatedTemplate
      console.log('✅ Updated existing Top Image Center Text Hero template')
    }

    console.log('   ID:', template.id)
    console.log('   Type:', template.type)
    console.log('   Props:', JSON.stringify(template.props, null, 2))

  } catch (err) {
    console.error('❌ Unexpected error:', err)
    process.exit(1)
  }
}

// Run the function
addTopImageCenterTextHeroTemplate() 