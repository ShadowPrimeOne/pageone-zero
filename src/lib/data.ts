import { supabase } from './supabase'

export async function getPageBySlug(slug: string) {
  const { data, error } = await supabase
    .from('pages')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error fetching page by slug:', error)
    return null
  }

  return data
} 