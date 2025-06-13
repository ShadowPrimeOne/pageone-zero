// File: src/lib/data.ts
import { supabase } from './supabase'
import { decryptData, generateKey } from './encryption'

const DEV_KEY = process.env.NEXT_PUBLIC_DEV_KEY || 'dev-key-1234'

export async function getPageBySlug(slug: string, key?: string) {
  console.log('🔍 Fetching page data for slug:', slug)

  try {
    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .eq('slug', slug)
      .maybeSingle()

    if (error) {
      console.error('❌ Supabase error:', error)
      throw error
    }

    if (!data) {
      console.warn('⚠️ No page found for slug:', slug)
      return null
    }

    // Handle encrypted modules - use provided key or fall back to dev key
    let modules = data.modules
    if (typeof modules === 'string') {
      try {
        const encryptionKey = key || DEV_KEY
        console.log('🔐 Attempting to decrypt modules with key:', encryptionKey ? 'provided' : 'dev key')
        const cryptoKey = await generateKey(encryptionKey)
        if (!cryptoKey) {
          throw new Error('Failed to generate encryption key')
        }
        modules = await decryptData(modules, cryptoKey)
        console.log('✅ Modules decrypted successfully')
      } catch (error) {
        console.error('❌ Error decrypting modules:', error)
        throw new Error('Failed to decrypt page data')
      }
    }

    // Validate modules data
    if (!modules || !Array.isArray(modules)) {
      console.error('❌ Invalid modules data:', modules)
      throw new Error('Invalid modules data')
    }

    console.log('✅ Page data fetched successfully:', {
      slug,
      hasModules: !!modules,
      moduleCount: modules.length
    })

    return {
      ...data,
      modules
    }
  } catch (error) {
    console.error('❌ Error fetching page:', error)
    throw error
  }
}
