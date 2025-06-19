'use client'

import { useEffect, useState } from 'react'

export function useSessionKey(slug: string) {
  const [sessionKey, setSessionKey] = useState<string | null>(null)
  const devKey = process.env.NEXT_PUBLIC_DEV_KEY

  useEffect(() => {
    const urlKey = new URLSearchParams(window.location.search).get('key')
    const stored = localStorage.getItem('sessionKey')

    if (urlKey) {
      localStorage.setItem('sessionKey', urlKey)
      setSessionKey(urlKey)
    } else if (stored) {
      setSessionKey(stored)
    }
  }, [slug])

  const isAuthorized = (pageKey: string) => {
    const authorized = sessionKey === pageKey || sessionKey === devKey
    return authorized
  }

  return {
    sessionKey,
    isAuthorized,
    isReady: sessionKey !== null
  }
} 