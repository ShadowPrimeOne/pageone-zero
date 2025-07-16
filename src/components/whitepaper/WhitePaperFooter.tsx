'use client'

import React from 'react'

export default function WhitePaperFooter() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">📧 Contact Information</h3>
            <div className="space-y-2 text-gray-300">
              <p><strong>Travis Cunningham</strong></p>
              <p>Founder, PageOne</p>
              <p>Email: tcunningham2610@gmail.com</p>
              <p>Phone: +61 411 070 473</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">🔒 Confidentiality Notice</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              This document contains sensitive strategic, technical, and financial information. 
              It is shared strictly under NDA or private invitation, and not for public distribution.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            📄 Download as PDF
          </button>
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
            📧 Contact Founder
          </button>
          <button className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors">
            📤 Share Document
          </button>
        </div>

        {/* Legal Footer */}
        <div className="border-t border-gray-700 pt-8">
          <div className="text-center text-gray-400 text-sm">
            <p className="mb-2">
              PageOne is building the future of fast, affordable, and localised digital marketing — 
              powered by people, amplified by automation.
            </p>
            <p>
              © 2025 PageOne. All rights reserved. | 
              Last updated: July 2025 | 
              Version: 1.0
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
} 