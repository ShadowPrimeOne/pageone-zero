'use client'

import React, { useState } from 'react'

interface Props {
  heading: string
  subheading: string
  fields: string[]
  ctaText: string
}

export const AdwordsLeadForm: React.FC<Props> = ({
  heading,
  subheading,
  fields,
  ctaText,
}) => {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const form = e.currentTarget
    const formData = new FormData(form)

    const payload = {
      name: formData.get('name') || '',
      email: formData.get('email') || '',
      phone: formData.get('phone') || '',
      businessType: formData.get('businessType') || '',
      slug: 'adwords-boost-au-electrician',
      key: 'dev-key-1234'
    }

    try {
      const res = await fetch('/api/lead2', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (!res.ok) throw new Error('Failed to send')
      setSubmitted(true)
    } catch (err) {
      console.error('Lead submit error:', err)
      alert('Something went wrong — please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="lead-form" className="relative w-full px-4 sm:px-6 py-16 md:py-24 bg-zinc-950 text-white min-h-[80vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-zinc-950"></div>
      <div className="relative z-10 max-w-screen-md mx-auto w-full">
        <h2 className="text-2xl md:text-4xl font-semibold text-center mb-4 text-balance text-white animate-fadeInUp">
          {heading}
        </h2>
        <p className="text-md md:text-lg text-center mb-12 text-zinc-400 leading-snug animate-fadeInUp animate-stagger-1">
          {subheading}
        </p>

        {submitted ? (
          <div className="bg-green-600 text-white p-8 rounded-xl text-center animate-scaleIn">
            <div className="text-4xl mb-4">✅</div>
            <p className="text-lg font-semibold">Thanks! We&apos;ll be in touch shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 animate-fadeInUp animate-stagger-2">
            {fields.includes('name') && (
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                autoComplete="name"
                className="px-6 py-4 rounded-lg bg-zinc-800 text-white placeholder:text-zinc-400 border border-zinc-700 focus:border-blue-500 focus:outline-none transition-colors duration-300"
              />
            )}
            {fields.includes('email') && (
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                autoComplete="email"
                className="px-6 py-4 rounded-lg bg-zinc-800 text-white placeholder:text-zinc-400 border border-zinc-700 focus:border-blue-500 focus:outline-none transition-colors duration-300"
              />
            )}
            {fields.includes('phone') && (
              <input
                type="tel"
                name="phone"
                placeholder="Your Phone"
                autoComplete="tel"
                className="px-6 py-4 rounded-lg bg-zinc-800 text-white placeholder:text-zinc-400 border border-zinc-700 focus:border-blue-500 focus:outline-none transition-colors duration-300"
              />
            )}
            {fields.includes('businessType') && (
              <select
                name="businessType"
                defaultValue=""
                required
                autoComplete="organization"
                className="px-6 py-4 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-blue-500 focus:outline-none transition-colors duration-300"
              >
                <option value="" disabled>
                  Select Your Business Type
                </option>
                <option value="Electrician">Electrician</option>
                <option value="Fitness">Fitness</option>
                <option value="Legal">Legal</option>
                <option value="Tutor">Tutor</option>
                <option value="Other">Other</option>
              </select>
            )}
            <button
              type="submit"
              disabled={loading}
              className="bg-cyan-400 text-black font-semibold py-4 px-8 rounded-full mt-6 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : ctaText}
            </button>
          </form>
        )}
      </div>
    </section>
  )
} 