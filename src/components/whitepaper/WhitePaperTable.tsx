'use client'

import React from 'react'

interface WhitePaperTableProps {
  title?: string
  headers: string[]
  data: string[][]
  className?: string
}

export default function WhitePaperTable({ title, headers, data, className = '' }: WhitePaperTableProps) {
  return (
    <div className={`bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm ${className}`}>
      {title && (
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
        </div>
      )}
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="px-6 py-4 text-left text-sm font-semibold text-gray-900 border-b border-gray-200"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50 transition-colors">
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 