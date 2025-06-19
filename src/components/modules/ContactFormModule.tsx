'use client'

import { useState } from 'react'
import type { ModuleBackground } from '@/lib/editor/types'

interface Props {
  heading?: string
  subheading?: string
  background?: ModuleBackground
}

export function ContactFormModule({ 
  heading = "Get in Touch", 
  subheading = "Let's create something amazing together",
  background 
}: Props) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic would go here
    // For now, just prevent default
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Set background styles
  const backgroundStyle = background?.type === 'gradient' 
    ? {
        background: `linear-gradient(${background.gradient?.angle || 135}deg, ${background.gradient?.from || '#1a1a1a'}, ${background.gradient?.to || '#000000'})`,
        opacity: background.opacity
      }
    : background?.type === 'color'
    ? {
        backgroundColor: background.color,
        opacity: background.opacity
      }
    : {}

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background with gradient */}
      <div 
        className="absolute inset-0"
        style={backgroundStyle}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-[#00FFD1]/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-16 sm:px-6 lg:px-8">
        {/* Heading Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {heading}
          </h2>
          <p className="mt-4 text-xl text-white/80">
            {subheading}
          </p>
        </div>

        {/* Form Section */}
        <div className="w-full max-w-2xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 gap-8">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white/90 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#00FFD1] focus:border-transparent transition-all duration-200"
                  placeholder="Your name"
                  required
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#00FFD1] focus:border-transparent transition-all duration-200"
                  placeholder="your@email.com"
                  required
                />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white/90 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#00FFD1] focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Your message..."
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-8 py-3 bg-[#00FFD1] text-black font-medium rounded-lg hover:bg-[#00FFD1]/90 focus:outline-none focus:ring-2 focus:ring-[#00FFD1] focus:ring-offset-2 focus:ring-offset-black transition-all duration-200"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 