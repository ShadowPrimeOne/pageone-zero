"use client"

import type { ClassicOverlayHeroProps } from '@/lib/editor/types'
import { useState, useEffect } from 'react'
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

export default function ClassicOverlayHero({ props }: { props: ClassicOverlayHeroProps }) {
  const { background, topBackground, htmlContent, onUpdate } = props
  const [imageUrl, setImageUrl] = useState<string | undefined>(background?.url)
  const [imageState, setImageState] = useState<'loading' | 'error' | 'success'>('loading')
  const pathname = usePathname()

  // Only enable content editing if we're in edit mode
  const isEditMode = pathname?.startsWith('/edit/')

  // Handle text updates
  const handleTextUpdate = (type: 'heading' | 'subheading', value: string) => {
    if (!isEditMode) return
    console.log('📝 Text update:', { type, value })
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
    console.log('🔄 ClassicOverlayHero mounted with props:', {
      background,
      topBackground,
      imageUrl,
      textPosition: props.textPosition
    })

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
        console.log('✅ Created temporary URL from base64 data')
      } catch (error) {
        console.error('❌ Error creating temporary URL:', error)
        setImageState('error')
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
        console.log('✅ Valid image URL:', bgImage)
      } catch {
        console.error('❌ Invalid image URL:', bgImage)
        setImageState('error')
      }
    } else {
      console.error('❌ No image URL available')
      setImageState('error')
    }

    // Cleanup function to revoke temporary URL
    return () => {
      if (bgImage && bgImage.startsWith('blob:')) {
        URL.revokeObjectURL(bgImage)
      }
    }
  }, [background, topBackground, props.textPosition])

  // Get animation classes
  const startAnimationClass = startAnimations[props.startAnimation || 'none']
  const hoverAnimationClass = hoverAnimations[props.hoverAnimation || 'none']

  return (
    <div className="relative min-h-screen w-full">
      {/* Background */}
      {background && (
        <div className="absolute inset-0">
          {background.type === 'image' && imageUrl && (
            <img
              src={imageUrl}
              alt="Background"
              className="w-full h-full object-cover"
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
                setImageState('error')
              }}
            />
          )}
          {background.type === 'color' && background.color && (
            <div
              className="w-full h-full"
              style={{ backgroundColor: background.color }}
            />
          )}
          {background.overlay && (
            <div
              className="absolute inset-0"
              style={{ 
                backgroundColor: background.overlay.color,
                opacity: background.overlay.opacity
              }}
            />
          )}
        </div>
      )}

      {/* Content */}
      <div className={`relative z-10 flex flex-col items-center min-h-screen px-4 text-center sm:px-6 lg:px-8 ${
        props.textPosition === 'top' ? 'justify-start pt-20' :
        props.textPosition === 'bottom' ? 'justify-end pb-20' :
        'justify-center'
      }`}>
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
            dangerouslySetInnerHTML={{ __html: htmlContent?.heading || '' }}
          />
          <p 
            className="text-xl sm:text-2xl text-white/80 outline-none"
            contentEditable={isEditMode}
            suppressContentEditableWarning
            onBlur={(e) => handleTextUpdate('subheading', e.currentTarget.textContent || '')}
            dangerouslySetInnerHTML={{ __html: htmlContent?.subheading || '' }}
          />
        </div>
      </div>
    </div>
  )
} 