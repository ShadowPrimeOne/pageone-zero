'use client'

import { useEffect, useState } from 'react'

const getCountdown = () => {
  const deadline = new Date('2025-07-15T00:00:00+07:00').getTime()
  const now = new Date().getTime()
  const diff = deadline - now
  if (diff <= 0) return '00d 00h 00m'
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const mins = Math.floor((diff / (1000 * 60)) % 60)
  return `${String(days).padStart(2, '0')}d ${String(hours).padStart(2, '0')}h ${String(mins).padStart(2, '0')}m`
}

export default function BottomSupportCTA() {
  const [timeLeft, setTimeLeft] = useState(getCountdown())

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getCountdown())
    }, 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-lg border-t border-[#376E6F]/20 shadow-lg px-4 py-3 flex items-center justify-between">
      <div className="flex items-center">
        <div className="text-sm text-[#4B4453]">
          <span className="font-medium">⏳ {timeLeft} left</span>
        </div>
      </div>
      <button className="bg-[#376E6F] text-[#2D2D2D] text-lg font-semibold px-8 py-3 rounded-full shadow-md hover:bg-[#2D5A5B] hover:shadow-lg transition-all duration-200 transform hover:scale-105 border-2 border-[#376E6F]">
        Show Support Today
      </button>
    </div>
  )
} 