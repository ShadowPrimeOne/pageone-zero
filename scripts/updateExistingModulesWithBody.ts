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

async function updateExistingModulesWithBody() {
  try {
    console.log('📝 Updating existing modules in pages table to include body field...')
    
    // Get all pages with modules
    const { data: pages, error } = await supabase
      .from('pages')
      .select('id, slug, modules')
      .not('modules', 'is', null)

    if (error) {
      console.error('❌ Error fetching pages:', error)
      process.exit(1)
    }

    if (!pages || pages.length === 0) {
      console.log('ℹ️  No pages with modules found')
      return
    }

    console.log(`\n🔍 Found ${pages.length} pages with modules to check:`)

    let updatedPages = 0
    let totalUpdatedModules = 0

    // Process each page
    for (const page of pages) {
      if (!page.modules || !Array.isArray(page.modules)) {
        continue
      }

      let pageNeedsUpdate = false
      const updatedModules = page.modules.map((module: { type: string; props?: { body?: string; [key: string]: unknown } }) => {
        // Check if this is a hero module that needs body field
        if (isHeroModule(module.type) && !module.props?.body) {
          const bodyPlaceholder = getBodyPlaceholder(module.type)
          const updatedProps = {
            ...module.props,
            body: bodyPlaceholder
          }
          
          console.log(`   📝 Adding body to ${module.type} module in page ${page.slug}`)
          pageNeedsUpdate = true
          
          return {
            ...module,
            props: updatedProps
          }
        }
        
        return module
      })

      // Update the page if any modules were modified
      if (pageNeedsUpdate) {
        const { error: updateError } = await supabase
          .from('pages')
          .update({ modules: updatedModules })
          .eq('id', page.id)

        if (updateError) {
          console.error(`❌ Error updating page ${page.slug}:`, updateError)
          continue
        }

        updatedPages++
        totalUpdatedModules += updatedModules.filter((m: { props?: { body?: string } }) => m.props?.body).length
        console.log(`✅ Updated page ${page.slug}`)
      }
    }

    console.log(`\n🎉 Update complete!`)
    console.log(`   Updated ${updatedPages} pages`)
    console.log(`   Updated ${totalUpdatedModules} modules with body field`)

  } catch (err) {
    console.error('❌ Unexpected error:', err)
    process.exit(1)
  }
}

function isHeroModule(type: string): boolean {
  return ['classic_overlay_hero', 'top_image_center_text_hero', 'split_layout_hero', 'hero', 'hero2'].includes(type)
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

updateExistingModulesWithBody() 