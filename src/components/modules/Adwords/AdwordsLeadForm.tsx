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
    <section id="lead-form" className="w-full px-6 py-16 bg-zinc-950 text-white">
      <div className="max-w-xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold text-center mb-4">{heading}</h2>
        <p className="text-md text-center mb-8">{subheading}</p>

        {submitted ? (
          <div className="bg-green-600 text-white p-6 rounded-xl text-center">
            ✅ Thanks! We&apos;ll be in touch shortly.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {fields.includes('name') && (
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                autoComplete="name"
                className="px-4 py-3 rounded-md bg-zinc-800 text-white placeholder:text-zinc-400"
              />
            )}
            {fields.includes('email') && (
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                autoComplete="email"
                className="px-4 py-3 rounded-md bg-zinc-800 text-white placeholder:text-zinc-400"
              />
            )}
            {fields.includes('phone') && (
              <input
                type="tel"
                name="phone"
                placeholder="Your Phone"
                autoComplete="tel"
                className="px-4 py-3 rounded-md bg-zinc-800 text-white placeholder:text-zinc-400"
              />
            )}
            {fields.includes('businessType') && (
              <select
                name="businessType"
                defaultValue=""
                required
                autoComplete="organization"
                className="px-4 py-3 rounded-md bg-zinc-800 text-white"
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
              className="bg-cyan-400 text-black font-semibold py-3 rounded-full mt-4 hover:scale-105 transition-transform shadow-md"
            >
              {loading ? 'Sending...' : ctaText}
            </button>
          </form>
        )}
      </div>
    </section>
  )
} 