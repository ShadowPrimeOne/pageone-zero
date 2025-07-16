'use client'

import React from 'react'

export default function WhitePaperHeader() {
  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Confidentiality Badge */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
              CONFIDENTIAL
            </span>
            <span className="text-sm text-gray-500">
              Investment Brief — Pre-Seed Round (Private)
            </span>
          </div>
          <div className="text-sm text-gray-500">
            July 2025 • Version 1.0
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          🧾 PageOne White Paper
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-gray-600 mb-8">
          Mobile-first tools for a future where people still matter
        </p>

        {/* Contact Info */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Prepared by:</h3>
              <p className="text-gray-700">Travis Cunningham (Founder, PageOne)</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Contact:</h3>
              <p className="text-gray-700">tcunningham2610@gmail.com</p>
              <p className="text-gray-700">+61 411 070 473</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            📄 Download as PDF
          </button>
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
            📧 Contact Founder
          </button>
          <button className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors">
            📤 Share
          </button>
        </div>
      </div>
    </header>
  )
} 