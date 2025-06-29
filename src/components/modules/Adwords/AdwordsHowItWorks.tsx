'use client'

import React from 'react'
import Image from 'next/image'

interface Props {
  heading?: string
  steps?: Array<{
    icon: string
    title: string
    description: string
  }>
}

export const AdwordsHowItWorks: React.FC<Props> = ({
  heading = "How It Works",
  steps = [
    {
      icon: '/IMAGES/How it works/Schedule A Meeting with a Local Adwords Specialist_step 1.png',
      title: "Claim Your Free Spot",
      description: "Get your first 90-day growth campaign started — we only onboard a few clients at a time per region."
    },
    {
      icon: '/IMAGES/How it works/Step 2 We Build Your Landing Page and Google Adwords PPC campaign.png',
      title: "We Build Your Ads + Landing Page",
      description: "You get a pro landing page, lead funnel, and campaign setup — done for you, within 48 hours."
    },
    {
      icon: '/IMAGES/How it works/Step 3 - new leads to your phone from PPC adwords.png',
      title: "Leads Go Straight to Your Phone",
      description: "Every lead is instantly routed to your mobile. No dashboards. Just results you can action."
    }
  ]
}) => {
  return (
    <section className="relative w-full bg-white py-4 md:py-8 pb-12 md:pb-16">
      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Modern Step Layout */}
        <div className="space-y-0 md:space-y-12">
          {steps.map((step, index) => (
            <div key={index} className="relative min-h-screen md:min-h-0 flex items-center">
              {/* Step Container */}
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center w-full ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}>
                
                {/* Image Side */}
                <div className={`relative ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="relative group">
                    <Image
                      src={step.icon}
                      alt={`Step ${index + 1} - ${step.title}`}
                      width={400}
                      height={400}
                      className={`w-full h-auto mx-auto object-contain ${
                        index === 0 
                          ? 'max-w-xs lg:max-w-sm' 
                          : index === 2 
                          ? 'max-w-sm lg:max-w-md' 
                          : 'max-w-md lg:max-w-lg'
                      }`}
                      style={{
                        maxWidth: index === 0 ? '250px' : index === 2 ? '300px' : '400px',
                        filter: 'drop-shadow(0 16px 32px rgba(0, 0, 0, 0.7)) !important'
                      }}
                      quality={85}
                      priority={index === 0}
                      sizes="(max-width: 768px) 250px, (max-width: 1024px) 300px, 400px"
                    />
                    
                    {/* Subtle depth effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-yellow-400/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>
                
                {/* Content Side */}
                <div className={`flex flex-col justify-center ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <div className="space-y-4">
                    {/* Step Number */}
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-yellow-500 rounded-xl flex items-center justify-center text-white font-black text-lg">
                        {index + 1}
                      </div>
                      <div className="h-px flex-1 bg-gradient-to-r from-green-400 to-yellow-400"></div>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-black font-poppins text-gray-900 leading-tight !text-gray-900">
                      {step.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg !text-gray-600">
                      {step.description}
                    </p>
                    
                    {/* Action Button for Step 1 */}
                    {index === 0 && (
                      <div className="pt-2">
                        <button
                          className="relative text-black font-poppins font-bold tracking-wide whitespace-nowrap"
                          style={{
                            background: 'linear-gradient(to right, #F9A825, #FF8C00)',
                            display: 'inline-block',
                            cursor: 'pointer',
                            border: 'none',
                            outline: 'none',
                            position: 'relative',
                            zIndex: 10,
                            fontWeight: '700',
                            transition: 'all 0.3s ease',
                            textAlign: 'center',
                            padding: '16px 32px',
                            borderRadius: '8px',
                            fontSize: '18px'
                          }}
                        >
                          Claim Your Spot Now
                        </button>
                        
                        {/* Urgency Text */}
                        <div className="mt-3 text-sm text-gray-600 !text-gray-600">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-green-600 font-semibold">✓</span>
                            <span>Next 3 available spots: <span className="font-bold text-green-600">March 15, 18, 22</span></span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-red-600 font-semibold">⚡</span>
                            <span>Last spot booked: <span className="font-bold text-red-600">2 hours ago</span></span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute left-1/2 top-full transform -translate-x-1/2 mt-4">
                  <div className="w-px h-8 bg-gradient-to-b from-green-400/30 to-transparent"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 