// File: src/lib/data.ts
import { supabase } from './supabase'

export async function getPageBySlug(slug: string) {
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

    // Validate modules data
    if (!data.modules || !Array.isArray(data.modules)) {
      console.error('❌ Invalid modules data:', data.modules)
      throw new Error('Invalid modules data')
    }

    console.log('✅ Page data fetched successfully:', {
      slug,
      hasModules: !!data.modules,
      moduleCount: data.modules.length
    })

    return data
  } catch (error) {
    console.error('❌ Error fetching page:', error)
    throw error
  }
}
