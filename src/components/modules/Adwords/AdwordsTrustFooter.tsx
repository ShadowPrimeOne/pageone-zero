'use client'

import React from 'react'

interface Props {
  text: string
}

export const AdwordsTrustFooter: React.FC<Props> = ({ text }) => {
  return (
    <footer className="w-full bg-zinc-950 text-white text-center py-8 text-sm">
      <div className="space-y-2">
        <p className="opacity-80">{text}</p>
      </div>
    </footer>
  )
} 