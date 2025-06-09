'use client'

import { useEffect, useState } from 'react'

export function useSessionKey(slug: string) {
  const [sessionKey, setSessionKey] = useState<string | null>(null)
  const devKey = process.env.NEXT_PUBLIC_DEV_KEY

  useEffect(() => {
    const urlKey = new URLSearchParams(window.location.search).get('key')
    const stored = localStorage.getItem('sessionKey')

    console.log('useSessionKey: Checking keys', {
      urlKey,
      stored,
      devKey,
      slug
    })

    if (urlKey) {
      console.log('useSessionKey: Setting key from URL')
      localStorage.setItem('sessionKey', urlKey)
      setSessionKey(urlKey)
    } else if (stored) {
      console.log('useSessionKey: Using stored key')
      setSessionKey(stored)
    }
  }, [slug])

  const isAuthorized = (pageKey: string) => {
    const authorized = sessionKey === pageKey || sessionKey === devKey
    console.log('useSessionKey: Checking authorization', {
      sessionKey,
      pageKey,
      devKey,
      authorized
    })
    return authorized
  }

  return {
    sessionKey,
    isAuthorized,
    isReady: sessionKey !== null
  }
} 