"use client"

import type { ClassicOverlayHeroProps, ClassicOverlayHeroHtmlContent } from '@/lib/editor/types'
import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

// Animation classes
const startAnimations = {
  none: '',
  fadeIn: 'animate-fade-in',
  slideUp: 'animate-slide-up',
  slideDown: 'animate-slide-down'
}

const hoverAnimations = {
  none: '',
  scale: 'hover:scale-105 transition-transform duration-300',
  lift: 'hover:-translate-y-1 transition-transform duration-300',
  glow: 'hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-shadow duration-300'
}

// Helper function to convert hex to RGB
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '0, 0, 0'
}

// Helper function to get content with fallback to placeholder
// function getContentWithFallback(htmlContent: string | undefined, fallback: string): string {
//   // If htmlContent is undefined, it means the field was never edited - show placeholder
//   if (htmlContent === undefined) return fallback
//   // If htmlContent is an empty string, it means user cleared it - show nothing
//   if (htmlContent === '') return ''
//   // If htmlContent has content, show it
//   return htmlContent
// }

export default function ClassicOverlayHero({ props }: { props: ClassicOverlayHeroProps }) {
  const { background, topBackground, htmlContent, onUpdate } = props
  const [imageUrl, setImageUrl] = useState<string | undefined>(background?.url)
  const [isClient, setIsClient] = useState(false)
  const pathname = usePathname()
  const blobUrlRef = useRef<string | null>(null)

  // Only enable content editing if we're in edit mode
  const isEditMode = pathname?.startsWith('/edit/')

  // Ensure client-side hydration
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Handle text updates
  const handleTextUpdate = (type: keyof ClassicOverlayHeroHtmlContent, value: string) => {
    if (!isEditMode) return
    if (onUpdate) {
      onUpdate({
        htmlContent: {
          ...htmlContent,
          [type]: value
        }
      })
    }
  }

  useEffect(() => {
    // Clean up previous blob URL
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current)
      blobUrlRef.current = null
    }

    // Determine the image URL
    let bgImage: string | undefined = undefined

    if (background?._tempFile) {
      try {
        // Create a blob from the base64 data
        const base64Data = background._tempFile.data
        const binaryString = atob(base64Data)
        const bytes = new Uint8Array(binaryString.length)
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i)
        }
        const blob = new Blob([bytes], { type: background._tempFile.type })
        bgImage = URL.createObjectURL(blob)
        blobUrlRef.current = bgImage
      } catch {
        // Handle error silently
      }
    } else {
      bgImage = background?.image || 
                topBackground?.url || 
                'https://xkpxwcrxjgjmbxgupkhq.supabase.co/storage/v1/object/public/public-images/modules/hero/classic_overlay_hero/1749617291214-hero-background.webp'
    }

    // Validate the URL
    if (bgImage) {
      try {
        new URL(bgImage)
        setImageUrl(bgImage)
      } catch {
        // Handle error silently
      }
    }
  }, [background?._tempFile?.data, background?.image, topBackground?.url])

  // Cleanup blob URL on unmount
  useEffect(() => {
    return () => {
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current)
      }
    }
  }, [])

  // Get animation classes
  const startAnimationClass = startAnimations[props.startAnimation || 'none']
  const hoverAnimationClass = hoverAnimations[props.hoverAnimation || 'none']

  return (
    <div className="relative w-full h-screen overflow-hidden" style={{ height: '100dvh', minHeight: '100dvh', maxHeight: '100dvh' }}>
      {/* Background */}
      {background && (
        <div className="absolute inset-0">
          {background.type === 'image' && imageUrl && (
            <img
              src={imageUrl}
              alt="Background"
              className="w-full h-full object-cover object-center"
              style={{ height: '100dvh', minHeight: '100dvh' }}
            />
          )}
          {background.type === 'color' && background.color && (
            <div
              className="w-full h-full"
              style={{ 
                backgroundColor: background.color,
                height: '100dvh',
                minHeight: '100dvh'
              }}
            />
          )}
          {background.overlay && (
            <div
              className="absolute inset-0"
              style={{ 
                backgroundColor: background.overlay.color,
                opacity: background.overlay.opacity,
                height: '100dvh',
                minHeight: '100dvh'
              }}
            />
          )}
        </div>
      )}

      {/* Content */}
      <div className={`relative z-10 flex flex-col items-center justify-center h-full px-4 text-center sm:px-6 lg:px-8 ${
        props.textPosition === 'top' ? 'justify-start pt-20' :
        props.textPosition === 'bottom' ? 'justify-end pb-20' :
        'justify-center'
      }`} style={{ height: '100dvh', minHeight: '100dvh' }}>
        <div className={`w-full max-w-4xl ${startAnimationClass} ${hoverAnimationClass} ${
          props.textPosition === 'top' ? 'mt-20' :
          props.textPosition === 'bottom' ? 'mb-20' :
          ''
        }`}>
          <h1 
            className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-4 outline-none"
            contentEditable={isEditMode}
            suppressContentEditableWarning
            onBlur={(e) => handleTextUpdate('heading', e.currentTarget.textContent || '')}
            dangerouslySetInnerHTML={{ __html: isClient ? (htmlContent?.heading || 'Classic Overlay Hero') : 'Classic Overlay Hero' }}
          />
          <p 
            className="text-xl sm:text-2xl text-white/80 outline-none mb-6"
            contentEditable={isEditMode}
            suppressContentEditableWarning
            onBlur={(e) => handleTextUpdate('subheading', e.currentTarget.textContent || '')}
            dangerouslySetInnerHTML={{ __html: isClient ? (htmlContent?.subheading || 'High-impact visual services (e.g., automotive, fitness, travel)') : 'High-impact visual services (e.g., automotive, fitness, travel)' }}
          />
          <p 
            className="text-lg sm:text-xl text-white/70 outline-none"
            contentEditable={isEditMode}
            suppressContentEditableWarning
            onBlur={(e) => handleTextUpdate('body', e.currentTarget.textContent || '')}
            dangerouslySetInnerHTML={{ __html: isClient ? (htmlContent?.body || 'High-impact visual services perfect for automotive, fitness, travel, and other visually-driven industries. Create compelling content that converts visitors into customers.') : 'High-impact visual services perfect for automotive, fitness, travel, and other visually-driven industries. Create compelling content that converts visitors into customers.' }}
          />
          {htmlContent?.ctaText || props.ctaText ? (
            <div className={`mt-6 ${
              props.ctaAlignment === 'left' ? 'text-left' :
              props.ctaAlignment === 'right' ? 'text-right' :
              'text-center'
            }`}>
              <a
                href={props.ctaLink || '#'}
                className="inline-block px-8 py-3 rounded-md hover:opacity-90 transition-all"
                style={{
                  backgroundColor: props.ctaBackgroundColor && props.ctaBackgroundOpacity !== undefined 
                    ? `rgba(${hexToRgb(props.ctaBackgroundColor)}, ${props.ctaBackgroundOpacity / 100})`
                    : props.ctaBackgroundColor || 'rgba(255, 255, 255, 0.9)',
                  color: props.ctaTextColor || (props.ctaBackgroundColor ? '#ffffff' : '#000000'),
                  border: props.ctaBorderColor ? `2px solid ${props.ctaBorderColor}` : 'none'
                }}
              >
                {htmlContent?.ctaText || props.ctaText}
              </a>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
} 