"use client"

import Image from "next/image"
import React, { useState, useEffect } from "react"
import type { HeroProps } from '@/lib/editor/types'

export default function ClassicOverlayHero({ props }: { props: HeroProps }) {
  const [imageError, setImageError] = useState(false)
  const [imageState, setImageState] = useState<'loading' | 'error' | 'success'>('loading')
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  
  useEffect(() => {
    // Log initial props
    console.log('🔄 ClassicOverlayHero mounted with props:', {
      background: props.background,
      topBackground: props.topBackground,
      hasTempFile: !!props.background?._tempFile,
      imageUrl: props.background?.image,
      topBackgroundUrl: props.topBackground?.url
    })

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
        console.log('✅ Created temporary URL from base64 data')
      } catch (error) {
        console.error('❌ Error creating temporary URL:', error)
        setImageError(true)
      }
    } else {
      bgImage = props.background?.image || 
                props.topBackground?.url || 
                'https://xkpxwcrxjgjmbxgupkhq.supabase.co/storage/v1/object/public/public-images/modules/hero/classic_overlay_hero/1749617291214-hero-background.webp'
    }

    // Validate the URL
    if (bgImage) {
      try {
        new URL(bgImage)
        setImageUrl(bgImage)
        console.log('✅ Valid image URL:', bgImage)
      } catch {
        console.error('❌ Invalid image URL:', bgImage)
        setImageError(true)
      }
    } else {
      console.error('❌ No image URL available')
      setImageError(true)
    }

    // Cleanup function to revoke temporary URL
    return () => {
      if (bgImage && bgImage.startsWith('blob:')) {
        URL.revokeObjectURL(bgImage)
      }
    }
  }, [props])

  // Get overlay settings from props or use defaults
  const overlayColor = props.background?.overlay?.color || '#000000'
  const overlayOpacity = props.background?.overlay?.opacity || 0.5

  if (!imageUrl) {
    return (
      <section className="relative w-full h-screen overflow-hidden text-white bg-gray-900">
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center z-10">
          <h1 className="text-4xl font-bold">{props.heading || 'Missing Heading'}</h1>
          <p className="text-lg mt-2">{props.subheading || 'Missing Subheading'}</p>
        </div>
      </section>
    )
  }

  return (
    <section className="relative w-full h-screen overflow-hidden text-white">
      {!imageError && imageUrl && (
        <Image
          src={imageUrl}
          alt="Hero Background"
          fill
          className="object-cover object-center z-0"
          unoptimized
          priority
          onLoad={() => {
            console.log('✅ Image loaded successfully:', imageUrl)
            setImageState('success')
          }}
          onError={(e) => {
            const target = e.target as HTMLImageElement
            console.error('❌ Error loading hero background image:', {
              error: e,
              target,
              currentSrc: target?.currentSrc,
              props: props,
              imageState,
              url: imageUrl,
              naturalWidth: target?.naturalWidth,
              naturalHeight: target?.naturalHeight,
              complete: target?.complete
            })
            setImageError(true)
            setImageState('error')
          }}
        />
      )}
      <div 
        className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center z-10"
        style={{
          backgroundColor: `${overlayColor}${Math.round(overlayOpacity * 255).toString(16).padStart(2, '0')}`
        }}
      >
        <h1 className="text-4xl font-bold">{props.heading || 'Missing Heading'}</h1>
        <p className="text-lg mt-2">{props.subheading || 'Missing Subheading'}</p>
      </div>
    </section>
  )
} 