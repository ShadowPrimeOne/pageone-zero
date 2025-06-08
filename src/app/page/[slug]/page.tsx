import { getPageBySlug } from '@/lib/data'
import PublicModuleRenderer from '@/components/modules/PublicModuleRenderer'
import { Metadata } from 'next'

export async function generateMetadata(
  context: { params: { slug: string } }
): Promise<Metadata> {
  const { params } = context
  return {
    title: `${params.slug} | Page.one`,
  }
}

export default async function PublicPage(
  context: { 
    params: { slug: string }
    searchParams: { [key: string]: string | string[] }
  }
) {
  const { params, searchParams } = context
  const slug = params.slug
  const isEditMode = searchParams?.edit === 'true'

  console.log('🔐 Supabase URL at runtime:', process.env.NEXT_PUBLIC_SUPABASE_URL)
  console.log('🔑 Supabase Key prefix:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.slice(0, 8) + '...')
  console.log('🔍 Requested Slug:', slug)
  console.log('🧪 Edit Mode?', isEditMode)

  try {
    const data = await getPageBySlug(slug)
    console.log('✅ Data Loaded:', data)

    if (!data) return <div>⚠️ No page data found for slug: {slug}</div>

    return (
      <div className="min-h-screen">
        <PublicModuleRenderer modules={data.modules} isEditMode={isEditMode} />
      </div>
    )
  } catch (err) {
    console.error('❌ Error fetching page by slug:', err)
    return <div>❌ Error loading page. Check console.</div>
  }
} 