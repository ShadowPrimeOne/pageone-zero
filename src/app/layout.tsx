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
        <title>Sydney Horse Transport – Premium Horse Transport Australia-wide</title>
        <meta name="description" content="Premium horse transport services Australia-wide. Safe, reliable, and professional horse transport for owners, trainers, and breeders. Get an instant quote today!" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Preconnect for Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Inline critical CSS for horse-transport landing page */}
        {typeof window !== 'undefined' && window.location.pathname.startsWith('/demo/horse-transport') && (
          <style jsx global>{`
            /* --- Critical CSS for above-the-fold content --- */
            html, body, .container { background: #f9fafb; min-height: 100vh; font-family: 'Inter', Arial, sans-serif; }
            .header { width: 100vw; display: flex; justify-content: space-between; align-items: center; padding: 0 32px; background: #fff; z-index: 10; }
            .logo { display: flex; align-items: center; gap: 8px; }
            .logoText { font-weight: bold; font-size: 1.1rem; color: #0B2341; letter-spacing: -0.5px; }
            .hero { position: relative; width: 100%; min-height: 48vh; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #0B2341; color: #fff; overflow: hidden; }
            .heroHeadlineWrap { position: relative; display: flex; justify-content: center; align-items: center; width: 100%; margin-bottom: 12px; }
            .heroTitle { position: relative; font-size: 2.4rem; font-weight: bold; margin-bottom: 0; text-shadow: 0 2px 8px rgba(0,0,0,0.18); z-index: 1; max-width: 90vw; width: 100%; line-height: 1.08; word-break: break-word; white-space: normal; }
            .heroBadges { display: flex; gap: 12px; justify-content: center; align-items: center; margin-bottom: 6px; }
            .badgeImg { width: 80px; height: auto; object-fit: contain; background: transparent; }
            .readyBanner { width: 100vw; margin-left: 50%; transform: translateX(-50%); background: linear-gradient(90deg, #0B2341 0%, #C9A14A 100%); color: #fff; display: flex; align-items: center; justify-content: center; min-height: 120px; box-shadow: 0 6px 32px 0 rgba(10,20,40,0.07); position: relative; }
            .readyBannerInner { width: 100%; max-width: 1200px; display: flex; align-items: center; justify-content: space-between; padding: 24px 32px 0 32px !important; gap: 28px; margin-bottom: 0 !important; }
            .readyBannerIcon { flex-shrink: 0; display: flex; align-items: center; justify-content: center; background: #fff; border-radius: 50%; width: 56px; height: 56px; box-shadow: 0 2px 12px 0 rgba(10,20,40,0.08); margin-right: 20px; }
            .readyBannerTitle { font-size: 1.6rem; font-weight: 700; margin-bottom: 4px; color: #fff; }
            .readyBannerDesc { font-size: 1.1rem; color: #f5f5f5; margin-bottom: 0; }
            .readyBannerButton { background: #C9A14A; color: #0B2341; font-weight: 700; font-size: 1.1rem; border: none; border-radius: 999px; padding: 16px 40px; cursor: pointer; box-shadow: 0 2px 12px 0 rgba(10,20,40,0.11); transition: background 0.2s, color 0.2s; }
            .readyBannerButton:hover { background: #fff; color: #C9A14A; }
            .reviewBar { position: fixed; left: 0; bottom: 0; width: 100vw; background: #fff; border-top: 1.5px solid #e3e9f5; box-shadow: 0 -2px 16px 0 rgba(10,20,40,0.09); z-index: 1000; height: 76px; display: flex; align-items: center; overflow: hidden; }
            .reviewScroller { display: flex; align-items: center; animation: scrollReviews 37s linear infinite; will-change: transform; }
            @keyframes scrollReviews { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
            .reviewCard { display: flex; align-items: center; background: #fff; border-radius: 18px; box-shadow: 0 1px 4px 0 rgba(60,64,67,0.08); margin: 0 18px; padding: 10px 22px 10px 18px; min-width: 320px; max-width: 400px; font-size: 1rem; line-height: 1.35; position: relative; border: 1px solid #f1f3f4; }
            .googleIcon { width: 28px; height: 28px; margin-right: 10px; flex-shrink: 0; }
            .stars { color: #fbbc04; margin-left: 6px; margin-right: 10px; font-size: 1.15rem; display: flex; align-items: center; }
            .reviewer { font-weight: 600; margin-right: 8px; color: #222; white-space: nowrap; }
            /* Responsive tweaks for mobile */
            @media (max-width: 900px) { .readyBannerInner { flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 24px 12px; gap: 18px; } .readyBannerIcon { margin-right: 0; margin-bottom: 8px; } }
            @media (max-width: 700px) { .header { flex-direction: column; padding: 0 12px; gap: 10px; } .heroBadges { gap: 16px; margin-top: 10px; } }
            @media (max-width: 600px) { .heroTitle { font-size: 2rem; } }
          `}</style>
        )}
        {/* Defer non-critical CSS for rest of app */}
        <link rel="stylesheet" href="/src/app/demo/horse-transport/page.module.css" media="print" onLoad={(e) => { (e.currentTarget as HTMLLinkElement).media = 'all'; }} />
        <link rel="stylesheet" href="/src/app/demo/horse-transport/ReadyBanner.module.css" media="print" onLoad={(e) => { (e.currentTarget as HTMLLinkElement).media = 'all'; }} />
        <link rel="stylesheet" href="/src/app/demo/horse-transport/GoogleReviewBar.module.css" media="print" onLoad={(e) => { (e.currentTarget as HTMLLinkElement).media = 'all'; }} />
      </head>
      <body className={inter.className}>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  )
}
