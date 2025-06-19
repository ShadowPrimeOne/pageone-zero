const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing environment variables:')
  console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅' : '❌')
  console.error('SUPABASE_SERVICE_ROLE_KEY:', supabaseKey ? '✅' : '❌')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function updateTemplatesWithCta() {
  console.log('🔄 Adding CTA fields to module templates...')

  try {
    // Fetch all module templates
    const { data: templates, error } = await supabase
      .from('module_templates')
      .select('*')

    if (error) {
      console.error('❌ Error fetching templates:', error)
      return
    }

    console.log(`📋 Found ${templates.length} templates to update`)

    // Update each template with CTA fields
    for (const template of templates) {
      const updatedProps = {
        ...template.props,
        ctaText: getCtaPlaceholder(template.type),
        ctaLink: '#'
      }

      const { error: updateError } = await supabase
        .from('module_templates')
        .update({ props: updatedProps })
        .eq('id', template.id)

      if (updateError) {
        console.error(`❌ Error updating template ${template.id}:`, updateError)
      } else {
        console.log(`✅ Updated template ${template.id} (${template.type})`)
      }
    }

    console.log('🎉 Successfully added CTA fields to all module templates!')
  } catch (error) {
    console.error('❌ Unexpected error:', error)
  }
}

function getCtaPlaceholder(type) {
  switch (type) {
    case 'classic_overlay_hero':
      return 'Get Started'
    
    case 'top_image_center_text_hero':
      return 'Learn More'
    
    case 'split_layout_hero':
      return 'Book a Call'
    
    case 'hero':
      return 'Get Started'
    
    case 'hero2':
      return 'Get Started'
    
    default:
      return 'Get Started'
  }
}

// Run the script
updateTemplatesWithCta()
  .then(() => {
    console.log('✅ Script completed successfully')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Script failed:', error)
    process.exit(1)
  }) 