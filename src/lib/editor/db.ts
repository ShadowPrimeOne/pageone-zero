import { supabase } from '@/lib/supabase'
import type { Module } from './types'

interface SavePageParams {
  slug: string
  modules: Module[]
  key: string
}

interface PublishPageParams extends SavePageParams {
  phoneNumber?: string
}

// Load module templates from database
export async function getModuleTemplates() {
  const { data, error } = await supabase
    .from('module_templates')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) {
    console.error('[GetModuleTemplates] Supabase error:', error)
    throw new Error('Failed to load module templates')
  }

  return data || []
}

// Load page by slug
export async function getPageBySlug(slug: string) {
  const { data, error } = await supabase
    .from('pages')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('[GetPageBySlug] Supabase error:', error)
    throw new Error('Failed to load page')
  }

  return data
}

export async function savePage({ slug, modules, key }: SavePageParams) {
  if (!modules || modules.length === 0) {
    throw new Error('No modules to save')
  }

  const { error } = await supabase
    .from('pages')
    .update({ 
      modules,
      updated_at: new Date().toISOString()
    })
    .eq('slug', slug)
    .eq('key', key)

  if (error) {
    console.error('[SavePage] Supabase update error:', error)
    throw new Error('Failed to save page')
  }

  return { success: true }
}

export async function publishPage({ slug, modules, key, phoneNumber }: PublishPageParams) {
  if (!modules || modules.length === 0) {
    throw new Error('No modules to publish')
  }

  // Check if slug already exists
  const { data: existingPage } = await supabase
    .from('pages')
    .select('id')
    .eq('slug', slug)
    .single()

  if (existingPage) {
    throw new Error('Slug already exists')
  }

  // Insert new page
  const { error: insertError } = await supabase
    .from('pages')
    .insert({ 
      slug, 
      key, 
      modules,
      phone_number: phoneNumber,
      created_at: new Date().toISOString()
    })

  if (insertError) {
    console.error('[PublishPage] Supabase insert error:', insertError)
    throw new Error('Failed to publish page')
  }

  return { 
    success: true,
    slug,
    url: `https://page.one/page/${slug}#key=${key}`
  }
} 