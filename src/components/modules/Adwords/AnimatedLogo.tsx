'use client'

import React, { useEffect, useRef, useState } from 'react'

export const AnimatedLogo: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [bounceValue1, setBounceValue1] = useState(0)
  const [bounceValue2, setBounceValue2] = useState(0)
  const [bounceValue3, setBounceValue3] = useState(0)
  const dollar1Ref = useRef<HTMLSpanElement>(null)
  const dollar2Ref = useRef<HTMLSpanElement>(null)
  const dollar3Ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    setIsLoaded(true)
    
    let animationId: number
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      
      // All bounce to the same bottom line (phone top margin)
      const bounce1 = Math.sin((elapsed / 1000) * Math.PI) * 12
      const bounce2 = Math.sin(((elapsed - 300) / 1000) * Math.PI) * 12
      const bounce3 = Math.sin(((elapsed - 600) / 1000) * Math.PI) * 12
      
      setBounceValue1(bounce1)
      setBounceValue2(bounce2)
      setBounceValue3(bounce3)

      if (dollar1Ref.current) {
        dollar1Ref.current.style.top = `${-13 + bounce1}px`
      }
      if (dollar2Ref.current) {
        dollar2Ref.current.style.top = `${-13 + bounce2}px`
      }
      if (dollar3Ref.current) {
        dollar3Ref.current.style.top = `${-13 + bounce3}px`
      }

      animationId = requestAnimationFrame(animate)
    }

    if (isLoaded) {
      animationId = requestAnimationFrame(animate)
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [isLoaded])

  return (
    <div className="relative flex items-center justify-center w-full">
      {/* All three dollar signs bouncing to same bottom line */}
      <div className="absolute -top-2" style={{ left: '40%' }}>
        <span 
          ref={dollar1Ref}
          className="text-green-500 text-3xl font-bold drop-shadow-lg absolute" 
          style={{ 
            opacity: 0.5, 
            textShadow: '0 2px 8px #0008',
            top: `${-13 + bounceValue1}px`,
            transition: 'none'
          }}
        >$</span>
      </div>
      
      <div className="absolute -top-2" style={{ left: '50%', marginLeft: '-0.75rem' }}>
        <span 
          ref={dollar2Ref}
          className="text-green-500 text-5xl font-bold drop-shadow-lg absolute" 
          style={{ 
            opacity: 1, 
            textShadow: '0 2px 12px #000a',
            top: `${-13 + bounceValue2}px`,
            transition: 'none'
          }}
        >$</span>
      </div>
      
      <div className="absolute -top-2" style={{ left: '55%' }}>
        <span 
          ref={dollar3Ref}
          className="text-green-500 text-4xl font-bold drop-shadow-lg absolute" 
          style={{ 
            opacity: 0.7, 
            textShadow: '0 2px 8px #0008',
            top: `${-13 + bounceValue3}px`,
            transition: 'none'
          }}
        >$</span>
      </div>
    </div>
  )
} 