// src/app/page/[slug]/page.tsx
import { Metadata } from 'next'

// All backend logic disabled for local dev

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Stub Page: ${slug}`,
    description: 'This is a static stub for local development.'
  };
}


export default async function Page({ params, searchParams }: { params: Promise<{ slug: string }>, searchParams: Promise<{ edit?: string }> }) {
  const { slug } = await params;
  const { edit } = await searchParams;
  // Static stub: always show a placeholder page for local dev
  const isEditMode = edit === 'true';
  const modules = [];
  if (isEditMode) {
    return <div>Edit mode is disabled in local dev stub.</div>;
  } else {
    return (
      <main className="min-h-screen bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 text-center">
          <h1 className="text-3xl font-bold mb-4">Stub Page: {slug}</h1>
          <p className="text-gray-600">This is a static stub for local development. No backend data is loaded.</p>
        </div>
      </main>
    );
  }
}

