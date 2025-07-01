'use client'

import { Inter } from 'next/font/google'
import './globals.css'
import { useEffect } from 'react'
import { PerformanceMonitor } from '@/lib/performance-monitor'

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
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
