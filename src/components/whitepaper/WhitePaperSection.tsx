'use client'

import React from 'react'

interface WhitePaperSectionProps {
  id: string
  title: string
  icon: string
  content: React.ReactNode
}

export default function WhitePaperSection({ id, title, icon, content }: WhitePaperSectionProps) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center mb-8">
          <div className="text-4xl mr-4">{icon}</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">{title}</h2>
        </div>

        {/* Section Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          {content}
        </div>
      </div>
    </section>
  )
} 