'use client'

import React, { useState } from 'react'

interface Props {
  heading?: string
  subheading?: string
  fields?: string[]
  ctaText?: string
}

interface BookingSlot {
  date: string
  day: string
  available: boolean
  spotsLeft?: number
}

export const AdwordsLeadForm: React.FC<Props> = ({
  heading = "⚡ Only 5 Free Setups Left This Week",
  subheading = "Claim your spot before someone else does. Limited availability per week.",
  fields = ['name', 'phone', 'businessType'],
  ctaText = "Lock in My Free Campaign",
}) => {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)

  // Available booking slots with scarcity
  const bookingSlots: BookingSlot[] = [
    { date: '2024-03-15', day: 'Fri 15', available: true, spotsLeft: 2 },
    { date: '2024-03-18', day: 'Mon 18', available: true, spotsLeft: 1 },
    { date: '2024-03-22', day: 'Fri 22', available: true, spotsLeft: 1 },
    { date: '2024-03-25', day: 'Mon 25', available: false },
    { date: '2024-03-29', day: 'Fri 29', available: false },
  ]

  const handleDateSelect = (date: string) => {
    setSelectedDate(date)
    setShowForm(true)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const form = e.currentTarget
    const formData = new FormData(form)

    const payload = {
      name: formData.get('name') || '',
      phone: formData.get('phone') || '',
      businessType: formData.get('businessType') || '',
      selectedDate: selectedDate,
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
    <section id="lead-form" className="relative w-full px-4 sm:px-6 py-12 md:py-16 lg:py-24 bg-gradient-to-b from-zinc-950 to-black text-white min-h-[70vh] md:min-h-[80vh] flex items-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 to-black"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      
      <div className="relative z-10 max-w-screen-lg mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-black font-poppins mb-3 md:mb-4 text-balance text-white animate-fadeInUp">
            {heading}
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-center text-zinc-300 leading-relaxed animate-fadeInUp animate-stagger-1 max-w-2xl mx-auto px-2">
            {subheading}
          </p>
        </div>

        {submitted ? (
          <div className="bg-gradient-to-r from-green-600 to-green-500 text-white p-6 md:p-8 rounded-2xl text-center animate-scaleIn max-w-md mx-auto">
            <div className="text-4xl md:text-5xl mb-3 md:mb-4">✅</div>
            <h3 className="text-xl md:text-2xl font-bold mb-2">Spot Reserved!</h3>
            <p className="text-base md:text-lg">We&apos;ll call you within 2 hours to confirm your setup.</p>
          </div>
        ) : (
          <div className="animate-fadeInUp animate-stagger-2">
            {/* Booking Grid */}
            <div className="mb-6 md:mb-8">
              <h3 className="text-lg md:text-xl font-semibold text-center mb-4 md:mb-6 text-zinc-200 px-2">
                Select Your Preferred Date
              </h3>
              
              {/* Horizontal Scroll of Dates */}
              <div className="flex gap-3 md:gap-4 overflow-x-auto pb-4 scrollbar-hide px-2">
                {bookingSlots.map((slot) => (
                  <div
                    key={slot.date}
                    className={`flex-shrink-0 w-28 h-28 md:w-32 md:h-32 rounded-xl md:rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                      slot.available
                        ? 'border-green-500 bg-green-500/10 hover:border-green-400 hover:bg-green-500/20'
                        : 'border-zinc-600 bg-zinc-800/50 cursor-not-allowed opacity-50'
                    } ${selectedDate === slot.date ? 'ring-4 ring-green-400 ring-opacity-50' : ''}`}
                    onClick={() => slot.available && handleDateSelect(slot.date)}
                  >
                    <div className="flex flex-col items-center justify-center h-full p-2 md:p-4 text-center">
                      <div className={`text-lg md:text-2xl font-bold mb-1 ${
                        slot.available ? 'text-green-400' : 'text-zinc-400'
                      }`}>
                        {slot.day}
                      </div>
                      {slot.available ? (
                        <div className="text-xs md:text-sm text-green-300 font-semibold">
                          {slot.spotsLeft} Spot{slot.spotsLeft !== 1 ? 's' : ''} Left
                        </div>
                      ) : (
                        <div className="text-xs md:text-sm text-zinc-500 font-semibold">
                          Fully Booked
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form - Slides up when date selected */}
            {showForm && selectedDate && (
              <div className="animate-fadeInUp">
                <div className="bg-gradient-to-r from-zinc-900/80 to-zinc-800/80 backdrop-blur-xl border border-zinc-700 rounded-xl md:rounded-2xl p-6 md:p-8 max-w-md mx-auto">
                  <div className="text-center mb-4 md:mb-6">
                    <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                      Complete Your Booking
                    </h3>
                    <p className="text-zinc-300 text-sm">
                      Selected: {bookingSlots.find(s => s.date === selectedDate)?.day}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                    {fields.includes('name') && (
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        required
                        autoComplete="name"
                        className="w-full px-3 md:px-4 py-3 md:py-3 rounded-lg md:rounded-xl bg-zinc-800/50 text-white placeholder:text-zinc-400 border border-zinc-600 focus:border-green-500 focus:outline-none transition-colors duration-300 text-base"
                      />
                    )}
                    
                    {fields.includes('phone') && (
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Your Phone"
                        required
                        autoComplete="tel"
                        className="w-full px-3 md:px-4 py-3 md:py-3 rounded-lg md:rounded-xl bg-zinc-800/50 text-white placeholder:text-zinc-400 border border-zinc-600 focus:border-green-500 focus:outline-none transition-colors duration-300 text-base"
                      />
                    )}
                    
                    {fields.includes('businessType') && (
                      <select
                        name="businessType"
                        defaultValue=""
                        required
                        className="w-full px-3 md:px-4 py-3 md:py-3 rounded-lg md:rounded-xl bg-zinc-800/50 text-white border border-zinc-600 focus:border-green-500 focus:outline-none transition-colors duration-300 text-base"
                      >
                        <option value="" disabled>
                          What type of business?
                        </option>
                        <option value="Electrician">Electrician</option>
                        <option value="Plumber">Plumber</option>
                        <option value="HVAC">HVAC</option>
                        <option value="Roofing">Roofing</option>
                        <option value="Landscaping">Landscaping</option>
                        <option value="Other">Other</option>
                      </select>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold py-3 md:py-4 px-6 md:px-8 rounded-lg md:rounded-xl mt-4 md:mt-6 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed animate-pulse text-base md:text-lg"
                      style={{
                        background: 'linear-gradient(to right, #F9A825, #FF8C00)',
                        boxShadow: '0 10px 25px rgba(249, 168, 37, 0.3)'
                      }}
                    >
                      {loading ? 'Securing Your Spot...' : ctaText}
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* Urgency Indicators */}
            <div className="text-center mt-6 md:mt-8 space-y-2 px-4">
              <div className="flex items-center justify-center space-x-2 text-xs md:text-sm text-zinc-400">
                <span className="text-green-500">✓</span>
                <span>Last spot booked: <span className="text-red-400 font-semibold">2 hours ago</span></span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-xs md:text-sm text-zinc-400">
                <span className="text-yellow-500">⚡</span>
                <span>Average response time: <span className="text-green-400 font-semibold">47 minutes</span></span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
} 