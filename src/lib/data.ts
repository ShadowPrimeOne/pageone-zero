// File: src/lib/data.ts
import { supabase } from './supabase'

export async function getPageBySlug(slug: string) {
  console.log('🔍 Supabase fetch start for:', slug)

  const { data, error } = await supabase
    .from('pages')
    .select('*')
    .eq('slug', slug)
    .maybeSingle()

  if (error) {
    console.error('❌ Supabase error:', error)
  }

  if (!data) {
    console.warn('⚠️ Supabase returned null. Check slug or RLS.')
  }

  return data
}
