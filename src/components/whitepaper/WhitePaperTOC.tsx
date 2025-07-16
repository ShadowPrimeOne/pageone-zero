'use client'

import React, { useState, useEffect } from 'react'

const sections = [
  { id: 'executive-summary', title: 'Executive Summary', icon: '📋' },
  { id: 'problem', title: 'The Problem', icon: '❗' },
  { id: 'solution', title: 'The Solution', icon: '✅' },
  { id: 'technology-stack', title: 'Technology Stack', icon: '⚙️' },
  { id: 'opportunity', title: 'Market Opportunity', icon: '📈' },
  { id: 'competitive-landscape', title: 'Competitive Landscape', icon: '🏆' },
  { id: 'go-to-market', title: 'Go-to-Market Strategy', icon: '🧭' },
  { id: 'business-model', title: 'Business Model & Unit Economics', icon: '💸' },
  { id: 'current-status', title: 'Current Status', icon: '🛠️' },
  { id: 'risk-analysis', title: 'Risk Analysis', icon: '⚠️' },
  { id: 'financial-projections', title: 'Financial Projections', icon: '📊' },
  { id: 'founder', title: 'Founder', icon: '💼' },
  { id: 'team', title: 'Team', icon: '👥' },
  { id: 'pre-seed-raise', title: 'Pre-Seed Raise', icon: '🎯' },
  { id: 'roadmap', title: 'Roadmap', icon: '🗺️' },
  { id: 'get-involved', title: 'Get Involved', icon: '🤝' },
]

export default function WhitePaperTOC() {
  const [activeSection, setActiveSection] = useState('executive-summary')
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]')
      let current = 'executive-summary'

      sections.forEach((section) => {
        const element = section as HTMLElement
        const sectionTop = element.offsetTop - 100
        const sectionHeight = element.clientHeight
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          current = section.getAttribute('id') || 'executive-summary'
        }
      })

      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-20 z-40">
      <div className="max-w-4xl mx-auto px-6 py-4">
        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full bg-gray-100 hover:bg-gray-200 px-4 py-3 rounded-lg font-semibold text-gray-700 flex items-center justify-between"
          >
            <span>📋 Table of Contents</span>
            <span>{isExpanded ? '▲' : '▼'}</span>
          </button>
        </div>

        {/* Desktop TOC */}
        <div className={`${isExpanded ? 'block' : 'hidden'} md:block`}>
          <div className="flex flex-wrap gap-2 md:gap-4">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === section.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-1">{section.icon}</span>
                <span className="hidden sm:inline">{section.title}</span>
                <span className="sm:hidden">{section.title.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 