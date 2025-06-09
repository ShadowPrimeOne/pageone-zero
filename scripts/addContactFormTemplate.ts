import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase credentials')
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function addContactFormTemplate() {
  try {
    const { data, error } = await supabase
      .from('module_templates')
      .insert([
        {
          type: 'contact_form',
          props: {
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
        }
      ])
      .select()

    if (error) throw error

    console.log('Contact Form template added successfully:', data)
  } catch (error) {
    console.error('Error adding Contact Form template:', error)
  }
}

addContactFormTemplate() 