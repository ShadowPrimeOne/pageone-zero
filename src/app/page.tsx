import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page.One Genesis',
  description: 'Create and publish encrypted pages',
}

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black p-10">
      <h1 className="text-2xl font-bold">Page.one Genesis Ready</h1>
    </main>
  )
}
