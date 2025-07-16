'use client'

import { Inter } from 'next/font/google'
import './globals.css'
import { useEffect } from 'react'
import { PerformanceMonitor } from '@/lib/performance-monitor'
import { UserProvider } from '../lib/UserContext';

const inter = Inter({ subsets: ['latin'] })

// Global performance monitor instance
let performanceMonitor: PerformanceMonitor | null = null

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    // Initialize performance monitor only once
    if (!performanceMonitor) {
      performanceMonitor = new PerformanceMonitor()
      performanceMonitor.init()
      console.log('🚀 Performance Monitor initialized in layout')
      // Make it available for testing in browser console
      if (typeof window !== 'undefined') {
        // @ts-expect-error - Making performance monitor available globally for testing
        window.performanceMonitor = performanceMonitor
      }
    }
  }, [])

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  )
}
