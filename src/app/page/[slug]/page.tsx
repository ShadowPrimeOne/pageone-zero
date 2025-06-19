// src/app/page/[slug]/page.tsx
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import EditorPage from '@/components/editor/EditorPage'
import PublicModuleRenderer from '@/components/modules/PublicModuleRenderer'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pages/${slug}`, {
      cache: 'no-store'
    })
    
    if (!response.ok) {
      return {
        title: 'Page Not Found',
        description: 'The requested page could not be found.'
      }
    }
    
    const data = await response.json()
    
    return {
      title: data.title || 'Page',
      description: data.description || 'A page created with PageOne.',
      openGraph: {
        title: data.title || 'Page',
        description: data.description || 'A page created with PageOne.',
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

export default async function Page({ params, searchParams }: { 
  params: { slug: string }, 
  searchParams: { edit?: string } 
}) {
  const { slug } = params
  const { edit } = searchParams
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pages/${slug}`, {
      cache: 'no-store'
    })
    
    if (!response.ok) {
      notFound()
    }
    
    const data = await response.json()
    const modules = data.modules || []
    
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
  } catch {
    notFound()
  }
}
