// src/app/page/[slug]/page.tsx
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import EditorPage from '@/components/editor/EditorPage'
import PublicModuleRenderer from '@/components/modules/PublicModuleRenderer'
import { supabase } from '@/lib/supabase/server'
import { decryptData, generateKey } from '@/lib/encryption'

const DEV_KEY = process.env.NEXT_PUBLIC_DEV_KEY || 'dev-key-1234'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  
  try {
    // Fetch the page from the database
    const { data: page, error } = await supabase
      .from('pages')
      .select('*')
      .eq('slug', slug)
      .maybeSingle()

    if (error || !page) {
      return {
        title: 'Page Not Found',
        description: 'The requested page could not be found.'
      }
    }
    
    return {
      title: page.title || 'Page',
      description: page.description || 'A page created with PageOne.',
      openGraph: {
        title: page.title || 'Page',
        description: page.description || 'A page created with PageOne.',
        type: 'website',
      },
    }
  } catch {
    return {
      title: 'Page',
      description: 'A page created with PageOne.'
    }
  }
}

export default async function Page({ 
  params, 
  searchParams 
}: { 
  params: Promise<{ slug: string }>, 
  searchParams: Promise<{ edit?: string }> 
}) {
  const { slug } = await params
  const { edit } = await searchParams
  
  try {
    // Fetch the page from the database
    const { data: page, error } = await supabase
      .from('pages')
      .select('*')
      .eq('slug', slug)
      .maybeSingle()

    if (error) {
      console.error('Database error:', error)
      notFound()
    }

    if (!page) {
      notFound()
    }

    // Handle encrypted modules
    let modules = page.modules
    if (typeof modules === 'string') {
      try {
        // Try to decrypt with dev key first
        const cryptoKey = await generateKey(DEV_KEY)
        if (!cryptoKey) {
          throw new Error('Failed to generate encryption key')
        }
        modules = await decryptData(modules, cryptoKey)
      } catch (error) {
        console.error('Error decrypting modules:', error)
        notFound()
      }
    }

    // Validate modules data
    if (!modules || !Array.isArray(modules)) {
      console.error('Invalid modules data:', modules)
      notFound()
    }
    
    // Check if we're in edit mode
    const isEditMode = edit === 'true'
    
    if (isEditMode) {
      return <EditorPage modules={modules} />
    } else {
      return (
        <main className="min-h-screen bg-white">
          <PublicModuleRenderer modules={modules} />
        </main>
      )
    }
  } catch (error) {
    console.error('Error fetching page:', error)
    notFound()
  }
}
