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

async function updateModuleTemplates() {
  try {
    console.log('📝 Updating module templates...')
    
    // Update Hero2 template
    const { data: hero2Template, error: hero2Error } = await supabase
      .from('module_templates')
      .update({
        props: {
          heading: 'Page.One',
          subheading: 'Your story begins here...',
          background: {
            type: 'gradient',
            color: '#000000',
            opacity: 0.8,
            gradient: {
              from: '#1a1a1a',
              to: '#000000',
              angle: 135
            }
          }
        }
      })
      .eq('type', 'hero2')
      .select()
      .single()

    if (hero2Error) {
      console.error('❌ Error updating Hero2 template:', hero2Error)
      process.exit(1)
    }

    // Update OurProcess template
    const { data: ourProcessTemplate, error: ourProcessError } = await supabase
      .from('module_templates')
      .update({
        props: {
          heading: 'Launch Your Page',
          subheading: 'From Anywhere, On Any Device',
          background: {
            type: 'color',
            color: '#FFFFFF',
            opacity: 1
          }
        }
      })
      .eq('type', 'OurProcess')
      .select()
      .single()

    if (ourProcessError) {
      console.error('❌ Error updating OurProcess template:', ourProcessError)
      process.exit(1)
    }

    console.log('✅ Module templates updated successfully:')
    console.log('   Hero2:', JSON.stringify(hero2Template.props, null, 2))
    console.log('   OurProcess:', JSON.stringify(ourProcessTemplate.props, null, 2))

    // First check if ContactForm template exists
    const { data: existingContactForm } = await supabase
      .from('module_templates')
      .select()
      .eq('type', 'contact_form')
      .single()

    const contactFormProps = {
      heading: "Get in Touch",
      subheading: "Let's create something amazing together",
      background: {
        type: 'gradient',
        color: '#000000',
        opacity: 1,
        gradient: {
          from: '#1a1a1a',
          to: '#000000',
          angle: 135
        }
      }
    }

    let contactFormTemplate
    if (!existingContactForm) {
      // Create new template
      const { data: newTemplate, error: createError } = await supabase
        .from('module_templates')
        .insert({
          type: 'contact_form',
          props: contactFormProps
        })
        .select()
        .single()

      if (createError) {
        console.error('❌ Error creating ContactForm template:', createError)
        process.exit(1)
      }
      contactFormTemplate = newTemplate
      console.log('✅ Created new ContactForm template')
    } else {
      // Update existing template
      const { data: updatedTemplate, error: updateError } = await supabase
        .from('module_templates')
        .update({ props: contactFormProps })
        .eq('type', 'contact_form')
        .select()
        .single()

      if (updateError) {
        console.error('❌ Error updating ContactForm template:', updateError)
        process.exit(1)
      }
      contactFormTemplate = updatedTemplate
      console.log('✅ Updated existing ContactForm template')
    }

    console.log('   ContactForm:', JSON.stringify(contactFormTemplate.props, null, 2))

  } catch (err) {
    console.error('❌ Unexpected error:', err)
    process.exit(1)
  }
}

updateModuleTemplates() 