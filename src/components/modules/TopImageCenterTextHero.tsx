"use client"

import { useState, useEffect, useRef } from 'react'
import type { HeroProps } from '@/lib/editor/types'
import Image from 'next/image'

// Helper function to convert hex to RGB
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '0, 0, 0'
}

// Helper function to get content with fallback to placeholder
function getContentWithFallback(htmlContent: string | undefined, propContent: string | undefined, fallback: string): string {
  // If htmlContent is undefined, it means the field was never edited - check propContent or show placeholder
  if (htmlContent === undefined) {
    if (propContent && propContent.trim() !== '') return propContent
    return fallback
  }
  // If htmlContent is an empty string, it means user cleared it - show nothing
  if (htmlContent === '') return ''
  // If htmlContent has content, show it
  return htmlContent
}

export default function TopImageCenterTextHero({ props }: { props: HeroProps }) {
  const [imageError, setImageError] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const blobUrlRef = useRef<string | null>(null)
  
  useEffect(() => {
    // Clean up previous blob URL
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current)
      blobUrlRef.current = null
    }

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
        blobUrlRef.current = bgImage
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
  }, [props.background?._tempFile?.data, props.background?.image, props.topBackground?.url])

  // Cleanup blob URL on unmount
  useEffect(() => {
    return () => {
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current)
      }
    }
  }, [])

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
            __html: getContentWithFallback(props.htmlContent?.heading, props.heading, 'Missing Heading') 
          }}
        />
        <p 
          className="text-lg max-w-2xl mb-4"
          dangerouslySetInnerHTML={{ 
            __html: getContentWithFallback(props.htmlContent?.subheading, props.subheading, 'Missing Subheading') 
          }}
        />
        <p 
          className="text-base max-w-2xl text-gray-600"
          dangerouslySetInnerHTML={{ 
            __html: getContentWithFallback(props.htmlContent?.body, props.body, '') 
          }}
        />
        {props.htmlContent?.ctaText || props.ctaText ? (
          <a
            href={props.ctaLink || '#'}
            className="inline-block px-8 py-3 rounded-md hover:opacity-90 transition-all mt-6"
            style={{
              backgroundColor: props.ctaBackgroundColor && props.ctaBackgroundOpacity !== undefined 
                ? `rgba(${hexToRgb(props.ctaBackgroundColor)}, ${props.ctaBackgroundOpacity / 100})`
                : props.ctaBackgroundColor || 'black',
              color: props.ctaTextColor || 'white',
              border: props.ctaBorderColor ? `2px solid ${props.ctaBorderColor}` : 'none'
            }}
          >
            {props.htmlContent?.ctaText || props.ctaText}
          </a>
        ) : null}
      </div>
    </section>
  )
} 