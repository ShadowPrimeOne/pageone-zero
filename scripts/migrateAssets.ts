import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import * as fs from 'fs'
import * as path from 'path'

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

// Define the mapping of local paths to Supabase paths
const assetMappings = [
  {
    localPath: 'public/IMAGES/hero-background.webp',
    moduleType: 'classic_overlay_hero',
    category: 'hero'
  },
  {
    localPath: 'public/images/split-hero.jpg',
    moduleType: 'split_layout_hero',
    category: 'hero'
  },
  {
    localPath: 'public/images/top-image-hero.jpg',
    moduleType: 'top_image_center_text_hero',
    category: 'hero'
  },
  {
    localPath: 'public/images/basic-hero.jpg',
    moduleType: 'hero',
    category: 'hero'
  },
  {
    localPath: 'public/images/hero2.jpg',
    moduleType: 'hero2',
    category: 'hero'
  }
]

async function migrateAssets() {
  console.log('🚀 Starting asset migration...')

  for (const mapping of assetMappings) {
    try {
      const { localPath, moduleType, category } = mapping
      
      // Check if file exists
      if (!fs.existsSync(localPath)) {
        console.error(`❌ File not found: ${localPath}`)
        continue
      }

      // Read file
      const fileBuffer = fs.readFileSync(localPath)
      const fileName = path.basename(localPath)
      const timestamp = Date.now()
      const supabasePath = `modules/${category}/${moduleType}/${timestamp}-${fileName}`

      console.log(`📤 Uploading ${fileName} to ${supabasePath}...`)

      // Upload to Supabase
      const { data, error } = await supabase.storage
        .from('public-images')
        .upload(supabasePath, fileBuffer, {
          contentType: `image/${path.extname(fileName).slice(1)}`,
          cacheControl: '3600',
          upsert: false
        })

      if (error) {
        console.error(`❌ Upload failed for ${fileName}:`, error)
        continue
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('public-images')
        .getPublicUrl(supabasePath)

      console.log(`✅ Uploaded ${fileName}`)
      console.log(`🔗 Public URL: ${publicUrl}`)

      // Update module templates with new image URLs
      const { data: templates, error: templateError } = await supabase
        .from('module_templates')
        .select('*')
        .eq('type', moduleType)

      if (templateError) {
        console.error(`❌ Failed to fetch templates for ${moduleType}:`, templateError)
        continue
      }

      for (const template of templates) {
        if (template.props.background?.type === 'image') {
          const updatedProps = {
            ...template.props,
            background: {
              ...template.props.background,
              image: publicUrl
            }
          }

          const { error: updateError } = await supabase
            .from('module_templates')
            .update({ props: updatedProps })
            .eq('id', template.id)

          if (updateError) {
            console.error(`❌ Failed to update template ${template.id}:`, updateError)
          } else {
            console.log(`✅ Updated template ${template.id} with new image URL`)
          }
        }
      }

    } catch (error) {
      console.error('❌ Unexpected error:', error)
    }
  }

  console.log('✨ Asset migration completed!')
}

// Run the migration
migrateAssets().catch(console.error) 