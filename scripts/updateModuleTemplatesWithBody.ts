import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

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

async function updateModuleTemplatesWithBody() {
  try {
    console.log('📝 Updating module templates to include body field...')
    
    // Get all hero templates
    const { data: templates, error } = await supabase
      .from('module_templates')
      .select('*')
      .in('type', ['classic_overlay_hero', 'top_image_center_text_hero', 'split_layout_hero', 'hero', 'hero2'])
      .order('created_at', { ascending: true })

    if (error) {
      console.error('❌ Error fetching templates:', error)
      process.exit(1)
    }

    if (!templates || templates.length === 0) {
      console.error('❌ No hero templates found!')
      process.exit(1)
    }

    console.log(`\n🔍 Found ${templates.length} hero templates to update:`)

    // Update each template to include body field
    for (const template of templates) {
      console.log(`\n📝 Updating ${template.type} template...`)
      
      const currentProps = template.props as { heading?: string; subheading?: string; body?: string; [key: string]: any }
      const bodyPlaceholder = getBodyPlaceholder(template.type)
      
      // Add body field if it doesn't exist
      if (!currentProps.body) {
        const updatedProps = {
          ...currentProps,
          body: bodyPlaceholder
        }

        const { error: updateError } = await supabase
          .from('module_templates')
          .update({ props: updatedProps })
          .eq('id', template.id)
          .select()
          .single()

        if (updateError) {
          console.error(`❌ Error updating ${template.type} template:`, updateError)
          continue
        }

        console.log(`✅ Updated ${template.type} template:`)
        console.log(`   Heading: ${updatedProps.heading || 'N/A'}`)
        console.log(`   Subheading: ${updatedProps.subheading || 'N/A'}`)
        console.log(`   Body: ${updatedProps.body}`)
      } else {
        console.log(`⏭️  ${template.type} template already has body field`)
      }
    }

    console.log('\n🎉 All hero templates updated successfully!')

  } catch (err) {
    console.error('❌ Unexpected error:', err)
    process.exit(1)
  }
}

function getBodyPlaceholder(type: string): string {
  switch (type) {
    case 'classic_overlay_hero':
      return 'High-impact visual services perfect for automotive, fitness, travel, and other visually-driven industries. Create compelling content that converts visitors into customers.'
    
    case 'top_image_center_text_hero':
      return 'Perfect for clear product introductions, coaching services, and professional services. Use this space to provide additional context and value to your visitors.'
    
    case 'split_layout_hero':
      return 'Ideal for personal brands, consultants, lawyers, and professionals who want to showcase both their expertise and personality. Tell your story and build trust with potential clients.'
    
    case 'hero':
      return 'Simple and effective hero section. Use this body text to provide additional information about your brand, service, or product.'
    
    case 'hero2':
      return 'Modern design with gradient background. This body text area allows you to expand on your main message and provide more context to your visitors.'
    
    default:
      return 'Add compelling body text here to provide more context and value to your visitors.'
  }
}

updateModuleTemplatesWithBody() 