'use client'

import React from 'react'

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
      icon: '/IMAGES/How it works/schedule Step 1.png',
      title: "Claim Your Free Spot",
      description: "Limited spots — get your 90-day setup bonus while available."
    },
    {
      icon: '/IMAGES/How it works/11395288_selection_prospective_employees_business_team_icon step 2 .svg',
      title: "We Build Your Funnel",
      description: "We craft your landing page and ad campaign with conversion in mind."
    },
    {
      icon: '/IMAGES/How it works/3088383_astronomy_launch_rocket_shuttle_space_icon step 3.svg',
      title: "Your Leads Go Live",
      description: "Start receiving real leads. No contracts. No lock-in."
    }
  ]
}) => {
  return (
    <section className="relative w-full bg-gradient-to-b from-[#F1F8E9] to-white min-h-screen flex items-center justify-center py-4 md:py-8 lg:py-12 overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-6 lg:px-8 w-full">
        {/* Hero Title Section */}
        <div className="text-center mb-6 md:mb-8 lg:mb-12">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black font-poppins text-gray-900 mb-3 md:mb-4 tracking-tight leading-tight">
            {heading}
          </h2>
          
          <p className="text-lg md:text-xl lg:text-2xl text-gray-600 max-w-2xl md:max-w-3xl mx-auto leading-relaxed font-poppins">
            Get your electrician business growing in just 3 simple steps
          </p>
          
          <div className="w-20 md:w-24 h-1 bg-gradient-to-r from-green-400 to-yellow-400 mx-auto mt-3 md:mt-4 rounded-full"></div>
        </div>

        {/* Steps Grid */}
        <div className="space-y-4 md:space-y-8 lg:space-y-12">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="group"
            >
              {/* Step Container */}
              <div className={`flex flex-col lg:flex-row items-center gap-4 md:gap-6 lg:gap-8 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}>
                
                {/* Left Side - Icon */}
                <div className={`flex flex-col items-center lg:items-start ${
                  index % 2 === 1 ? 'lg:items-end' : ''
                }`}>
                  {/* Icon Container */}
                  <div className="relative">
                    <div className="w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 p-3 md:p-4 lg:p-6 bg-white rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl border border-gray-100 transform group-hover:scale-105 group-hover:shadow-3xl transition-all duration-500">
                      <img
                        src={step.icon}
                        alt={`Step ${index + 1} icon`}
                        className="w-full h-full object-contain"
                        loading="lazy"
                      />
                    </div>
                    <div className="absolute -inset-2 md:-inset-4 bg-gradient-to-br from-green-400/20 to-yellow-400/20 rounded-2xl md:rounded-3xl blur-xl md:blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>
                
                {/* Right Side - Content */}
                <div className="flex-1 text-center lg:text-left max-w-sm md:max-w-lg lg:max-w-xl">
                  <div className="space-y-2 md:space-y-3">
                    <h3 className="text-xl md:text-3xl lg:text-4xl font-black font-poppins text-gray-900 leading-tight">
                      <span className="text-green-500 mr-1 md:mr-2">{index + 1}.</span>
                      {step.title}
                    </h3>
                    <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed font-poppins">
                      {step.description}
                    </p>
                    
                    {/* Action Button for Step 1 */}
                    {index === 0 && (
                      <div className="pt-2 md:pt-3">
                        <button className="inline-flex items-center px-5 py-2 md:px-6 md:py-3 bg-gradient-to-r from-green-500 to-yellow-500 text-white font-bold text-sm md:text-base rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-poppins">
                          Claim Your Spot Now
                          <svg className="ml-2 w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Connecting Line (except for last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block relative mt-6 md:mt-8">
                  <div className="absolute left-1/2 top-0 w-px h-10 md:h-12 bg-gradient-to-b from-green-400/50 to-transparent"></div>
                  <div className="absolute left-1/2 top-10 md:top-12 w-3 h-3 md:w-4 md:h-4 bg-gradient-to-r from-green-400 to-yellow-400 rounded-full transform -translate-x-1/2"></div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center mt-6 md:mt-8 lg:mt-12">
          <div className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 shadow-xl md:shadow-2xl border border-gray-100 max-w-2xl md:max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-black font-poppins text-gray-900 mb-4 md:mb-6">
              Ready to Get Started?
            </h3>
            <button className="inline-flex items-center px-6 py-3 md:px-8 md:py-4 bg-gradient-to-r from-green-500 to-yellow-500 text-white font-bold text-base md:text-lg rounded-xl md:rounded-2xl shadow-lg md:shadow-xl hover:shadow-xl md:hover:shadow-2xl transform hover:scale-105 transition-all duration-300 font-poppins">
              Start Your Free Setup
              <svg className="ml-2 w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
} 