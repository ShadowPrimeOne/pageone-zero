'use client'

import Image from 'next/image'
import React from 'react'

export default function ProblemSection() {
  return (
    <section className="relative w-full py-32">
      <div className="max-w-6xl mx-auto px-4">
        {/* Main content container with glassmorphism */}
        <div className="relative">
          {/* Background blur effect */}
          <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-3xl border border-white/30 shadow-2xl"></div>
          
          {/* Content */}
          <div className="relative p-8 md:p-12 lg:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              
              {/* Text Content */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <div className="inline-flex items-center px-4 py-2 bg-[#376E6F]/10 rounded-full">
                    <span className="text-[#376E6F] font-medium text-sm uppercase tracking-wide">
                      The Challenge
                    </span>
                  </div>
                  
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2D2D2D] leading-tight">
                    Local businesses aren&apos;t just offline — they&apos;re locked out.
                  </h2>
                </div>
                
                <div className="space-y-6 text-[#4B4453] text-lg leading-relaxed">
                  <p className="text-xl">
                    Most small businesses don&apos;t own their websites, leads, or data.
                  </p>
                  <p>
                    They rely on platforms like Facebook, with no control, no visibility, and no future-proof growth.
                  </p>
                  
                  <div className="space-y-4 pt-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-[#376E6F] rounded-full mt-3 flex-shrink-0"></div>
                      <p className="font-semibold text-[#376E6F]">
                        They don&apos;t show up on Google
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-[#376E6F] rounded-full mt-3 flex-shrink-0"></div>
                      <p className="font-semibold text-[#376E6F]">
                        They can&apos;t track leads
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-[#376E6F] rounded-full mt-3 flex-shrink-0"></div>
                      <p className="font-semibold text-[#376E6F]">
                        They can&apos;t grow confidently
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-6">
                  <div className="bg-[#376E6F]/5 border-l-4 border-[#376E6F] p-6 rounded-r-xl">
                    <p className="text-[#4B4453] text-lg">
                      Agencies are too expensive. AI tools are too cold. DIY platforms offer no help.
                    </p>
                    <p className="text-[#376E6F] font-bold text-xl mt-3">
                      What they need is ownership, visibility, and a human who can help.
                    </p>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="relative flex justify-center lg:justify-end">
                <div className="relative w-full max-w-lg">
                  {/* Image container with depth */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#376E6F]/20 to-[#4B4453]/20 rounded-3xl blur-2xl transform rotate-3"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-[#376E6F]/10 to-[#4B4453]/10 rounded-3xl blur-xl transform -rotate-2"></div>
                    
                    <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-2xl">
                      <Image
                        src="/IMAGES/Fundraising/No Data No Choice.png"
                        alt="No Data No Choice Graphic"
                        width={400}
                        height={400}
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
                        className="w-full h-auto object-contain"
                        priority
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 