'use client'

import React from 'react'

export default function QuickFactsCard() {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        💎 Investment Highlights
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="text-2xl font-bold text-blue-600 mb-2">$30K-$100K</div>
          <div className="text-sm text-gray-600">Pre-Seed Raise</div>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="text-2xl font-bold text-green-600 mb-2">$2K-$3.5K</div>
          <div className="text-sm text-gray-600">Revenue Per Client (Year 1)</div>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="text-2xl font-bold text-purple-600 mb-2">3.3M</div>
          <div className="text-sm text-gray-600">Australian SMEs (Target Market)</div>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="text-2xl font-bold text-orange-600 mb-2">70%</div>
          <div className="text-sm text-gray-600">Gross Margin (Year Avg)</div>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-2">🎯 Use of Funds</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Complete MVP and launch</li>
            <li>• Acquire first 50-100 clients</li>
            <li>• Recruit 10-20 ambassadors</li>
            <li>• Legal and investor setup</li>
          </ul>
        </div>
        
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-2">📈 Traction Targets</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• 500+ SMEs launched in 12 months</li>
            <li>• $1M-$1.5M AUD annual revenue</li>
            <li>• 12+ active ambassadors</li>
            <li>• 9-12 active regions</li>
          </ul>
        </div>
      </div>
    </div>
  )
} 