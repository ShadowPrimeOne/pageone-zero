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

export default function PublicPage({ params }: Props) {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div id="encrypted-content">
          {/* Decrypted content will be rendered here */}
        </div>
      </div>
    </main>
  )
} 