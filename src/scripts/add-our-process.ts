import { addOurProcessTemplate } from '@/lib/editor/db'

async function main() {
  try {
    await addOurProcessTemplate()
    console.log('✅ Successfully added OurProcess template to database')
  } catch (error) {
    console.error('❌ Failed to add OurProcess template:', error)
  }
}

main() 