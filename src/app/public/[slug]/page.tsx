import { Metadata } from 'next'

interface Props {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Page.One - ${params.slug}`,
    description: 'Encrypted page content',
  }
}

export default async function PublicPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Public Page: {slug}</h1>
        <p className="text-gray-600">This is a public page for {slug}</p>
      </div>
    </main>
  )
} 