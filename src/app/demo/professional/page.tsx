"use client";

import React from 'react';
import styles from './professional.module.css';

// SVG Placeholder Component
const SvgPlaceholder = ({ label, width, height }: { label: string; width: number; height: number }) => (
  <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="bg-gray-200 rounded-full" xmlns="http://www.w3.org/2000/svg">
    <rect width={width} height={height} fill="#e5e7eb" />
    <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#6b7280" fontSize="16" fontFamily="sans-serif">{label}</text>
  </svg>
);

// Modern Trust Badge Component
const TrustBadge = () => (
  <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm rounded-full shadow px-2.5 py-0.5 max-w-xs min-w-[160px]">
    <span className="flex items-center gap-1">
      <span className="text-yellow-400 text-base align-middle" style={{marginTop: '-2px'}}>★</span>
      <span className="text-blue-900 font-bold text-base leading-none">4.9</span>
    </span>
    <span className="text-gray-700 text-sm font-semibold ml-1">Google</span>
    <span className="mx-1 text-gray-300 text-lg select-none">·</span>
    <span className="text-gray-400 text-xs font-normal whitespace-nowrap">CPA Certified</span>
  </div>
);

// Google Review Banner
const GoogleReviewBanner = () => (
  <div className="fixed bottom-0 left-0 w-full z-50 flex justify-center pointer-events-none">
    <div className="pointer-events-auto bg-white/80 backdrop-blur-md rounded-t-xl shadow-lg px-4 py-2 flex items-center gap-3 border-t border-gray-200 max-w-md mx-auto mb-2 animate-fadeInUp">
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="14" cy="14" r="14" fill="#4285F4"/><text x="50%" y="54%" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="bold" fontFamily="sans-serif">G</text></svg>
      <span className="font-semibold text-blue-900">4.9★ from 125 Perth clients</span>
      <span className="text-gray-600 text-sm italic">“Fast, friendly, and saved us money!”</span>
    </div>
  </div>
);

export default function ProfessionalDemoPage() {
  return (
    <div className={styles.professionalLanding + " relative min-h-screen bg-gradient-to-b from-blue-900 via-blue-700 to-white flex flex-col"}>
      {/* Top Bar */}
      <div className="absolute top-0 left-0 w-full flex justify-between items-center px-4 py-3 z-30">
        <div className="flex items-center gap-2">
          <img src="/IMAGES/Professional/Perth Tax Pro LOGO.png" alt="Perth Tax Pro Logo" style={{ maxWidth: '138px', maxHeight: '55px' }} className="object-contain align-middle h-12 md:h-12 w-auto" />
          <span className="ml-2 font-bold text-white text-lg hidden sm:inline">PerthTaxPro</span>
        </div>
        <div className="flex items-center gap-2">
          <TrustBadge />
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative flex flex-col-reverse md:flex-row items-center justify-center w-full min-h-screen pt-24 md:pt-0 px-4 md:px-12 pb-16 md:pb-0 overflow-hidden">
        {/* Hero Copy */}
        <div className="z-20 flex-1 flex flex-col items-center md:items-start text-center md:text-left max-w-xl">
          <h1
            className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold drop-shadow-[0_2px_18px_rgba(0,0,0,0.30)] tracking-tight leading-tight text-center mb-2"
          >
            <span className="inline-block align-middle">🦸‍♂️</span>
            Give Your Business <span className="text-yellow-300">Superpowers</span>
          </h1>
          <p className="text-lg md:text-2xl text-white mb-4 animate-fadeInUp" style={{textShadow:'0 2px 12px rgba(0,0,0,0.32)'}}>Free 2025 Business Tax Audit for Perth SMEs — Save Money, Stay Compliant</p>
          <div className="flex flex-col sm:flex-row gap-2 items-center mb-2 animate-fadeInUp">
            <span className="bg-white/80 text-blue-900 font-semibold rounded-full px-4 py-1 text-sm shadow">100+ Perth Businesses Helped</span>
            <span className="bg-yellow-400/90 text-blue-900 font-semibold rounded-full px-4 py-1 text-sm shadow">20 Years Experience</span>
          </div>
          <div className="text-sm text-white/90 italic mb-4 animate-fadeInUp">“I saved $4,300 in tax — Joe, Local Retailer”</div>
          {/* CTA Form */}
          <form className="w-full flex flex-col gap-2 items-center animate-fadeInUp">
            <div className="w-full max-w-md flex flex-col gap-2">
              <input className="w-full px-4 py-3 rounded-lg border-2 border-yellow-400 bg-white text-gray-900 font-bold placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-500 shadow-md transition-all duration-200" type="text" placeholder="Your Name" required />
              <input className="w-full px-4 py-3 rounded-lg border-2 border-yellow-400 bg-white text-gray-900 font-bold placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-500 shadow-md transition-all duration-200" type="text" placeholder="Phone or Email" required />
              <button type="submit" className={"button2025 w-full px-8 py-4 rounded-2xl text-white text-lg font-bold tracking-tight shadow-2xl transition-all duration-200 relative overflow-hidden focus:outline-none focus:ring-4 focus:ring-blue-300 hover:scale-105 active:scale-98 flex items-center justify-center gap-2 group " + styles.button2025}>
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-1 text-2xl" aria-hidden="true">🦸‍♂️</span>
                <span className="ml-2">Book Free Audit</span>
                <span className="shine2025" />
              </button>
            </div>
          </form>
          <div className="w-full text-center mt-2 text-white/90 text-sm animate-fadeInUp">Or <a href="tel:0893012200" className="underline text-yellow-300 hover:text-yellow-400">call now</a></div>
          {/* Urgency Bar */}
          <div className="mt-4 w-full flex justify-center animate-pulse">
            <div className="bg-red-500/90 text-white font-bold rounded-full px-5 py-2 shadow border-2 border-white/60 animate-urgencyBar">
              Limited offer: Only 5 audits left this week!
            </div>
          </div>
        </div>
        {/* Hero Image + Effects */}
        <div className="relative flex-1 flex items-center justify-center w-full h-[340px] md:h-[520px] mb-8 md:mb-0 z-10">
          {/* Glass highlight */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 md:w-[420px] md:h-[420px] rounded-full bg-white/30 backdrop-blur-2xl shadow-2xl z-10" style={{filter:'blur(0.5px)'}}></div>
          {/* Perth city gradient silhouette (SVG placeholder) */}
          <svg className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-32 md:h-40 z-0" viewBox="0 0 400 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="cityGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1a2a4d" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#fff" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0 80V60L20 55V40L40 38V60L60 58V30L80 28V60L100 55V35L120 32V60L140 58V45L160 42V60L180 55V38L200 35V60L220 58V40L240 38V60L260 55V30L280 28V60L300 55V35L320 32V60L340 58V45L360 42V60L380 55V38L400 35V80Z" fill="url(#cityGrad)" />
          </svg>
          {/* Accountant Hero Image */}
          <img 
            src="/IMAGES/Professional/Accountant-hero-1024x683.jpg" 
            alt="Professional accountant at work - hero banner" 
            className="relative z-20 rounded-2xl shadow-2xl object-cover w-72 h-72 md:w-[420px] md:h-[420px] border-4 border-white/80 animate-fadeInUp" 
            style={{ aspectRatio: '1/1', objectPosition: 'center 30%' }}
            width={420}
            height={420}
          />
        </div>
      </section>

      {/* Sticky Google Review Banner */}
      <GoogleReviewBanner />

      {/* About / Why Choose Us */}
      <section className="max-w-3xl mx-auto py-10 px-4 text-center">
        <h2 className="text-2xl font-bold text-white mb-2 drop-shadow">Why Choose PerthPro Accountants?</h2>
        <p className="text-blue-50 mb-4 drop-shadow">We’re your local partners for life—helping Perth businesses grow, save, and succeed for over 20 years. Our team delivers expert advice, personal service, and real results.</p>
        <div className="flex flex-wrap justify-center gap-6 mt-6">
          <div className="flex flex-col items-center">
            <SvgPlaceholder label="Badge 64x64" width={64} height={64} />
            <span className="text-sm text-blue-100 mt-2 drop-shadow">Trusted by 100+ Perth Businesses</span>
          </div>
          <div className="flex flex-col items-center">
            <SvgPlaceholder label="Badge 64x64" width={64} height={64} />
            <span className="text-sm text-blue-100 mt-2 drop-shadow">Award-Winning Service</span>
          </div>
          <div className="flex flex-col items-center">
            <SvgPlaceholder label="Badge 64x64" width={64} height={64} />
            <span className="text-sm text-blue-100 mt-2 drop-shadow">Certified Accountants</span>
          </div>
        </div>
      </section>

      {/* Services Summary */}
      <section className="max-w-4xl mx-auto py-10 px-4">
        <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center gap-4 bg-white rounded-lg shadow p-4">
            <SvgPlaceholder label="Icon 48x48" width={48} height={48} />
            <div>
              <div className="font-semibold text-gray-800">Tax & Accounting</div>
              <div className="text-sm text-gray-500">Business and personal tax returns, BAS, compliance, and more.</div>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white rounded-lg shadow p-4">
            <SvgPlaceholder label="Icon 48x48" width={48} height={48} />
            <div>
              <div className="font-semibold text-gray-800">Wealth Management</div>
              <div className="text-sm text-gray-500">Superannuation, investments, and retirement planning.</div>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white rounded-lg shadow p-4">
            <SvgPlaceholder label="Icon 48x48" width={48} height={48} />
            <div>
              <div className="font-semibold text-gray-800">Business Improvement</div>
              <div className="text-sm text-gray-500">Profit growth, cashflow, and business advisory.</div>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white rounded-lg shadow p-4">
            <SvgPlaceholder label="Icon 48x48" width={48} height={48} />
            <div>
              <div className="font-semibold text-gray-800">Finance & Loans</div>
              <div className="text-sm text-gray-500">Business loans, equipment finance, and refinancing.</div>
            </div>
          </div>
        </div>
      </section>

      {/* How the Free Audit Works */}
      <section className="max-w-3xl mx-auto py-10 px-4">
        <h2 className="text-2xl font-bold text-white mb-4 text-center drop-shadow">How It Works</h2>
        <ol className="list-decimal list-inside text-blue-50 space-y-2 drop-shadow">
          <li><span className="font-semibold text-yellow-200">Book your free audit</span> using the form below.</li>
          <li><span className="font-semibold text-yellow-200">Meet with a professional</span> (in person or online) to review your business finances.</li>
          <li><span className="font-semibold text-yellow-200">Receive your audit report</span> with actionable recommendations—no obligation.</li>
        </ol>
      </section>

      {/* Testimonials */}
      <section className="max-w-3xl mx-auto py-10 px-4">
        <h2 className="text-2xl font-bold text-blue-900 mb-4 text-center">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
            <SvgPlaceholder label="Client 80x80" width={80} height={80} />
            <div className="italic text-gray-700 mt-2">“PerthPro helped us save thousands and made tax time stress-free!”</div>
            <div className="text-sm text-blue-800 font-semibold mt-1">— Alex B., Small Business Owner</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
            <SvgPlaceholder label="Client 80x80" width={80} height={80} />
            <div className="italic text-gray-700 mt-2">“The audit was eye-opening. We got real, practical advice.”</div>
            <div className="text-sm text-blue-800 font-semibold mt-1">— Priya S., Cafe Owner</div>
          </div>
        </div>
      </section>

      {/* Meet Your Professionals */}
      <section className="max-w-4xl mx-auto py-10 px-4">
        <h2 className="text-2xl font-bold text-blue-900 mb-4 text-center">Meet Your Professionals</h2>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="flex flex-col items-center">
            <SvgPlaceholder label="Staff 160x160" width={160} height={160} />
            <div className="font-semibold text-gray-800 mt-2">Jordan Lee</div>
            <div className="text-sm text-gray-500">Senior Accountant</div>
          </div>
          <div className="flex flex-col items-center">
            <SvgPlaceholder label="Staff 160x160" width={160} height={160} />
            <div className="font-semibold text-gray-800 mt-2">Morgan Smith</div>
            <div className="text-sm text-gray-500">Business Advisor</div>
          </div>
          <div className="flex flex-col items-center">
            <SvgPlaceholder label="Staff 160x160" width={160} height={160} />
            <div className="font-semibold text-gray-800 mt-2">Taylor Kim</div>
            <div className="text-sm text-gray-500">Wealth Specialist</div>
          </div>
        </div>
      </section>

      {/* Contact / Booking Form */}
      <section className="max-w-lg mx-auto py-10 px-4">
        <h2 className="text-2xl font-bold text-blue-900 mb-4 text-center">Book Your Free Audit</h2>
        <form className="bg-white/90 rounded-xl shadow-2xl p-6 flex flex-col gap-4">
          <input className="border rounded-lg p-3 bg-white/80 backdrop-blur focus:ring-2 focus:ring-blue-400 focus:shadow-lg focus:animate-inputPulse text-gray-900 placeholder-gray-500 transition-all duration-200" type="text" placeholder="Full Name" required />
          <input className="border rounded-lg p-3 bg-white/80 backdrop-blur focus:ring-2 focus:ring-blue-400 focus:shadow-lg focus:animate-inputPulse text-gray-900 placeholder-gray-500 transition-all duration-200" type="email" placeholder="Email" required />
          <input className="border rounded-lg p-3 bg-white/80 backdrop-blur focus:ring-2 focus:ring-blue-400 focus:shadow-lg focus:animate-inputPulse text-gray-900 placeholder-gray-500 transition-all duration-200" type="tel" placeholder="Phone" required />
          <input className="border rounded-lg p-3 bg-white/80 backdrop-blur focus:ring-2 focus:ring-blue-400 focus:shadow-lg focus:animate-inputPulse text-gray-900 placeholder-gray-500 transition-all duration-200" type="text" placeholder="Business Name" required />
          <button type="submit" className={"button2025 w-full px-8 py-4 text-lg font-bold flex items-center justify-center gap-2 shadow-2xl transition-all duration-200 rounded-2xl relative overflow-hidden group focus:outline-none focus:ring-4 focus:ring-blue-400 " + styles.button2025}>
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1 text-2xl">🦸‍♂️</span>
            Book Free Audit
            <span className="shine2025" />
          </button>
        </form>
      </section>

      {/* Location & Contact Info */}
      <section className="max-w-3xl mx-auto py-10 px-4 text-center">
        <h2 className="text-2xl font-bold text-blue-900 mb-2">Our Offices</h2>
        <div className="flex flex-wrap justify-center gap-8 mb-4">
          <div>
            <div className="font-semibold text-gray-800">Perth CBD</div>
            <div className="text-gray-600">Ground Floor, 218 St Georges Terrace, Perth WA 6000</div>
          </div>
          <div>
            <div className="font-semibold text-gray-800">Joondalup</div>
            <div className="text-gray-600">Level 2, 5 Davidson Terrace, Joondalup WA 6027</div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          {/* Map SVG Placeholder (Ideal: 400x200) */}
          <SvgPlaceholder label="Map 400x200" width={400} height={200} />
          <div className="mt-2 text-gray-700">Call: <a href="tel:0893012200" className="text-blue-700 underline">(08) 9301 2200</a> &nbsp;|&nbsp; Email: <a href="mailto:info@perthpro.com.au" className="text-blue-700 underline">info@perthpro.com.au</a></div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 text-center text-gray-500 text-sm bg-gray-100 border-t mt-8">
        &copy; {new Date().getFullYear()} PerthPro Accountants. All rights reserved. | Privacy Policy
      </footer>
    </div>
  );
} 