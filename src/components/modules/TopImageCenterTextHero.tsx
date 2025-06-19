"use client"

import { useState, useEffect } from 'react'
import type { HeroProps } from '@/lib/editor/types'
import Image from 'next/image'

export default function TopImageCenterTextHero({ props }: { props: HeroProps }) {
  const [imageError, setImageError] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  
  useEffect(() => {
    // Determine the image URL
    let bgImage: string | null = null

    if (props.background?._tempFile) {
      try {
        // Create a blob from the base64 data
        const base64Data = props.background._tempFile.data
        const binaryString = atob(base64Data)
        const bytes = new Uint8Array(binaryString.length)
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i)
        }
        const blob = new Blob([bytes], { type: props.background._tempFile.type })
        bgImage = URL.createObjectURL(blob)
      } catch {
        setImageError(true)
      }
    } else {
      bgImage = props.background?.image || 
                props.topBackground?.url || 
                'https://xkpxwcrxjgjmbxgupkhq.supabase.co/storage/v1/object/public/public-images/modules/hero/top_image_center_text_hero/1749617291214-hero-background.webp'
    }

    // Validate the URL
    if (bgImage) {
      try {
        new URL(bgImage)
        setImageUrl(bgImage)
      } catch {
        setImageError(true)
      }
    } else {
      setImageError(true)
    }

    // Cleanup function to revoke temporary URL
    return () => {
      if (bgImage && bgImage.startsWith('blob:')) {
        URL.revokeObjectURL(bgImage)
      }
    }
  }, [props])

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center">
      <div className="w-full h-[50vh] relative">
        {!imageError && imageUrl && (
          <Image
            src={imageUrl}
            alt="Hero Background"
            fill
            className="object-cover object-center"
            unoptimized
            priority
            onLoad={() => {
              // Image loaded successfully
            }}
            onError={() => {
              setImageError(true)
            }}
          />
        )}
      </div>
      <div className="w-full flex-1 flex flex-col items-center justify-center px-4 text-center py-12">
        <h1 
          className="text-4xl font-bold mb-4"
          dangerouslySetInnerHTML={{ 
            __html: props.htmlContent?.heading || props.heading || 'Missing Heading' 
          }}
        />
        <p 
          className="text-lg max-w-2xl mb-4"
          dangerouslySetInnerHTML={{ 
            __html: props.htmlContent?.subheading || props.subheading || 'Missing Subheading' 
          }}
        />
        <p 
          className="text-base max-w-2xl text-gray-600"
          dangerouslySetInnerHTML={{ 
            __html: props.htmlContent?.body || props.body || '' 
          }}
        />
        {props.htmlContent?.ctaText || props.ctaText ? (
          <a
            href={props.ctaLink || '#'}
            className="inline-block bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors mt-6"
          >
            {props.htmlContent?.ctaText || props.ctaText}
          </a>
        ) : null}
      </div>
    </section>
  )
} 