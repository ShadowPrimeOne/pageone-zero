'use client'

import React from 'react'

interface WhitePaperChartProps {
  title: string
  type: 'bar' | 'line' | 'pie' | 'metric'
  data: {
    labels: string[]
    values: number[]
    colors?: string[]
  }
  className?: string
}

export default function WhitePaperChart({ title, type, data, className = '' }: WhitePaperChartProps) {
  const maxValue = Math.max(...data.values)
  
  const renderBarChart = () => (
    <div className="space-y-3">
      {data.labels.map((label, index) => (
        <div key={index} className="flex items-center space-x-4">
          <div className="w-24 text-sm text-gray-600 truncate">{label}</div>
          <div className="flex-1 bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all duration-500"
              style={{
                width: `${(data.values[index] / maxValue) * 100}%`
              }}
            />
          </div>
          <div className="w-16 text-sm font-semibold text-gray-900 text-right">
            {data.values[index]}
          </div>
        </div>
      ))}
    </div>
  )
  
  const renderMetricChart = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.labels.map((label, index) => (
        <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {data.values[index]}
          </div>
          <div className="text-sm text-gray-600">{label}</div>
        </div>
      ))}
    </div>
  )
  
  const renderPieChart = () => (
    <div className="flex items-center justify-center">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full transform -rotate-90">
          {data.labels.map((label, index) => {
            const percentage = (data.values[index] / data.values.reduce((a, b) => a + b, 0)) * 100
            const startAngle = data.values
              .slice(0, index)
              .reduce((sum, value) => sum + (value / data.values.reduce((a, b) => a + b, 0)) * 360, 0)
            const endAngle = startAngle + (percentage / 100) * 360
            
            const x1 = 50 + 40 * Math.cos(startAngle * Math.PI / 180)
            const y1 = 50 + 40 * Math.sin(startAngle * Math.PI / 180)
            const x2 = 50 + 40 * Math.cos(endAngle * Math.PI / 180)
            const y2 = 50 + 40 * Math.sin(endAngle * Math.PI / 180)
            
            const largeArcFlag = percentage > 50 ? 1 : 0
            
            return (
              <path
                key={index}
                d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                fill={data.colors?.[index] || `hsl(${(index * 137.5) % 360}, 70%, 60%)`}
                className="transition-all duration-300 hover:opacity-80"
              />
            )
          })}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900">
              {data.values.reduce((a, b) => a + b, 0)}
            </div>
            <div className="text-xs text-gray-600">Total</div>
          </div>
        </div>
      </div>
    </div>
  )
  
  const renderLineChart = () => (
    <div className="relative h-48">
      <svg className="w-full h-full">
        <polyline
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-blue-600"
          points={data.values
            .map((value, index) => {
              const x = (index / (data.values.length - 1)) * 100
              const y = 100 - (value / maxValue) * 100
              return `${x},${y}`
            })
            .join(' ')}
        />
        {data.values.map((value, index) => {
          const x = (index / (data.values.length - 1)) * 100
          const y = 100 - (value / maxValue) * 100
          return (
            <circle
              key={index}
              cx={`${x}%`}
              cy={`${y}%`}
              r="4"
              fill="currentColor"
              className="text-blue-600"
            />
          )
        })}
      </svg>
    </div>
  )
  
  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-6 shadow-sm ${className}`}>
      <h4 className="text-lg font-semibold text-gray-900 mb-4">{title}</h4>
      
      {type === 'bar' && renderBarChart()}
      {type === 'metric' && renderMetricChart()}
      {type === 'pie' && renderPieChart()}
      {type === 'line' && renderLineChart()}
    </div>
  )
} 