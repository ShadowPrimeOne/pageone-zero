// src/app/page/[slug]/page.tsx
import { getPageBySlug } from '@/lib/data'
import { notFound } from 'next/navigation'
import PublicModuleRenderer from '@/components/modules/PublicModuleRenderer'
import type { Metadata } from 'next'

type Props = {
  params: { slug: string };
};

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const page = await getPageBySlug(slug);
  
  if (!page) {
    return {
      title: 'Not found',
      description: 'The requested page could not be found.',
    }
  }

  return {
    title: `${slug} | Page.one`,
    description: `Published page for ${slug}`,
  }
}

export default async function Page({ params }: Props) {
  const { slug } = params;
  const page = await getPageBySlug(slug);

  if (!page) {
    notFound()
  }

  return (
    <div className="min-h-screen w-full">
      <PublicModuleRenderer modules={page.modules} />
    </div>
  );
}
