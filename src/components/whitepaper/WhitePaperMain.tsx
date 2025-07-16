'use client'

import React, { useState, useEffect } from 'react'
import WhitePaperHeader from './WhitePaperHeader'
import WhitePaperTOC from './WhitePaperTOC'
import WhitePaperSection from './WhitePaperSection'
import WhitePaperFooter from './WhitePaperFooter'
import QuickFactsCard from './QuickFactsCard'
import BackToTopButton from './BackToTopButton'
import WhitePaperTable from './WhitePaperTable'
import AIEditorChatPanel from '../modals/AIEditorChatPanel'

export default function WhitePaperMain() {
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [showEditor, setShowEditor] = useState(false)
  const [bg, setBg] = useState('#ffffff')
  const [fontColor, setFontColor] = useState('#000000')
  const [fontFamily, setFontFamily] = useState('Arial')
  const [overlay, setOverlay] = useState<string>("")

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleAIStyle = (aiRaw: string) => {
    let aiResult: Record<string, string> = {};
    try {
      aiResult = JSON.parse(aiRaw);
    } catch {
      alert('Could not parse the AI output. Please try again.');
      return;
    }
    if (aiResult.background) setBg(aiResult.background);
    if (aiResult.color) setFontColor(aiResult.color);
    if (aiResult.font) setFontFamily(aiResult.font);
    if (aiResult.overlay) setOverlay(aiResult.overlay);
  };

  return (
    <div className="relative z-10 min-h-screen" style={{ background: bg, color: fontColor, fontFamily: fontFamily }}>
      {/* Overlay, if present */}
      {overlay && (
        <div style={{ background: overlay, position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 5 }} />
      )}
      {/* Header */}
      <WhitePaperHeader />
      {/* Boxy mascot as floating button */}
      <button
        onClick={() => setShowEditor(v => !v)}
        style={{
          position: 'fixed',
          right: 24,
          bottom: 24,
          width: 72,
          height: 72,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.92)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
          border: '2px solid #e0e7ef',
          zIndex: 100001,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
          cursor: 'pointer',
        }}
        aria-label="Toggle Boxy Chat"
      >
        <img
          src="/IMAGES/BOXY/Boxy Blueprint.png"
          alt="Boxy the chatbot mascot"
          style={{ width: 56, height: 56, pointerEvents: 'none', userSelect: 'none' }}
          draggable={false}
        />
      </button>
      {showEditor && (
        <AIEditorChatPanel onClose={() => setShowEditor(false)} onAIStyle={handleAIStyle} />
      )}
      {/* Quick Facts Card */}
      <div className="px-6 py-8">
        <QuickFactsCard />
      </div>

      {/* Table of Contents */}
      <WhitePaperTOC />

      {/* Main Content Sections */}
      <div className="px-6 py-8 space-y-16">
        {/* Executive Summary */}
        <WhitePaperSection
          id="executive-summary"
          title="Executive Summary"
          icon="📋"
          content={
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                <strong>PageOne</strong> is a scalable, human-powered digital marketing platform for local businesses that combines mobile-first landing pages, automated Google & Meta ad campaigns, and integrated lead capture and follow-up — all guided by trained local ambassadors. We simplify the entire marketing journey into a done-for-you system that replaces today&apos;s fragmented approach with a unified funnel.
              </p>
              
              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                Most SMEs use disconnected tools that are too complex, too slow, or too expensive. PageOne differentiates through a unified, human-guided funnel where ambassadors earn both upfront and recurring income as micro-franchise partners, not traditional sales reps. The platform was bootstrapped to MVP but needs capital to scale due to constraints on ad spend, data, and onboarding velocity.
              </p>
              
              <p className="text-lg leading-relaxed text-gray-700 mb-8">
                <strong>PageOne is building the future of fast, affordable, and localised digital marketing — powered by people, amplified by automation.</strong>
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-blue-900 mb-3">🔧 Current Status</h4>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li>• MVP 80% complete (tech built, flow tested)</li>
                    <li>• First client markets identified</li>
                    <li>• Ambassador system playbooks, UI, and brand ready for rollout</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-green-900 mb-3">🎯 Raise</h4>
                  <ul className="space-y-2 text-sm text-green-800">
                    <li>• Seeking <strong>AUD $30,000–$100,000</strong> in private pre-seed capital</li>
                    <li>• Funds will complete MVP, onboard 10–20 ambassadors, and launch the first 50–100 clients</li>
                  </ul>
                </div>
              </div>
            </div>
          }
        />

        {/* The Problem */}
        <WhitePaperSection
          id="problem"
          title="The Problem"
          icon="❗"
          content={
            <div className="prose prose-lg max-w-none">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">📉 The Digital Divide Is Real</h3>
              
              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                Most local businesses are losing leads they never knew they had.
              </p>
              
              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                A potential customer searches for a local dentist, mechanic, or accountant — but finds outdated listings, broken websites, or no presence at all. They click the next option. Sale lost. Reputation dented. Revenue is down.
              </p>
              
              <p className="text-lg leading-relaxed text-gray-700 mb-8">
                This isn&apos;t rare. It&apos;s systemic.
              </p>

              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                <strong>Despite billions spent on online ads each year, most SMEs still struggle with the basics:</strong>
              </p>
              
              <ul className="space-y-3 text-lg text-gray-700 mb-8">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <strong>Their websites aren&apos;t mobile-friendly or optimized for conversion</strong>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <strong>Their ads are either not running, or running inefficiently</strong>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <strong>They lack tools to follow up with leads</strong>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  <strong>They don&apos;t have time, training, or staff to manage any of it</strong>
                </li>
              </ul>

              <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
                <h4 className="text-lg font-semibold text-red-900 mb-4">The data is clear:</h4>
                <ul className="space-y-3 text-red-800">
                  <li>• <strong>80% of Australian SMEs</strong> "are not realising their digital potential" — <em>Deloitte & Small Business Research Report</em></li>
                  <li>• <strong>35% of US small businesses</strong> still don&apos;t have a website — <em>Top Design Firms 2023 Survey</em></li>
                  <li>• <strong>60–80% of SMEs globally</strong> still operate with little or no online lead capture — <em>PageOne internal research + verified industry stats</em></li>
                </ul>
              </div>

              <p className="text-lg leading-relaxed text-gray-700 mb-8">
                In a mobile-first world, digital presence equals economic opportunity — and most small businesses are still playing catch-up.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">🧠 The Psychology Behind the Problem</h3>
              
              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                We&apos;ve worked with hundreds of small businesses. Here&apos;s what they consistently say:
              </p>
              
              <ul className="space-y-3 text-lg text-gray-700 mb-6">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  &quot;I don&apos;t know where to start.&quot;
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  &quot;I&apos;m not technical — I just want someone to do it for me.&quot;
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  &quot;I paid someone once and got burned.&quot;
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  &quot;I tried those tools… they were too complicated.&quot;
                </li>
              </ul>
              
              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                <strong>They&apos;re not lazy. They&apos;re overloaded.</strong>
              </p>
              
              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                SMEs wear 10 hats a day. Building a lead funnel isn&apos;t on their radar until it&apos;s too late. And even when they do spend — often thousands on ads — they don&apos;t have a proper landing page, or tracking, or follow-up, which makes the spend inefficient and discouraging.
              </p>

              <p className="text-lg leading-relaxed text-gray-700 mb-8">
                <strong>The result? Churn, wasted time, lost leads, low morale.</strong> Most SMEs just give up and go back to referrals or word-of-mouth — missing out on the 28% revenue boost that comes from a strong digital presence.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">🧩 Fragmentation = Failure</h3>
              
              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                <strong>Let&apos;s break down what an SME typically faces:</strong>
              </p>

              <div className="overflow-x-auto mb-8">
                <table className="w-full border border-gray-300 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900 border-b">Goal</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900 border-b">Common Tool</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900 border-b">Problem</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-4 py-3 font-semibold text-gray-900">Get a website</td>
                      <td className="px-4 py-3 text-gray-700">Wix / Squarespace / Wordpress</td>
                      <td className="px-4 py-3 text-gray-700">DIY complexity, poor mobile optimization</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3 font-semibold text-gray-900">Run ads</td>
                      <td className="px-4 py-3 text-gray-700">Google / Meta Ads</td>
                      <td className="px-4 py-3 text-gray-700">No help with targeting, copy, or conversion</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3 font-semibold text-gray-900">Capture leads</td>
                      <td className="px-4 py-3 text-gray-700">Forms / Calendars</td>
                      <td className="px-4 py-3 text-gray-700">Disconnected from CRM or follow-up</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3 font-semibold text-gray-900">Follow up</td>
                      <td className="px-4 py-3 text-gray-700">Email/SMS tools</td>
                      <td className="px-4 py-3 text-gray-700">Requires setup, automations, and integration know-how</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold text-gray-900">Measure results</td>
                      <td className="px-4 py-3 text-gray-700">Analytics dashboards</td>
                      <td className="px-4 py-3 text-gray-700">Overwhelming and unclear metrics</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                <strong>Each piece requires separate setup, skills, and time — so most businesses never connect the funnel.</strong>
              </p>

              <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg">
                <p className="text-lg font-semibold text-red-900">
                  The result? <strong>Wasted spend. Missed leads. Growth left to chance.</strong>
                </p>
              </div>
            </div>
          }
        />

        {/* The Solution */}
        <WhitePaperSection
          id="solution"
          title="The Solution"
          icon="✅"
          content={
            <div className="prose prose-lg max-w-none">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">🚀 What PageOne Does</h3>
              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                PageOne replaces the entire fragmented digital journey with one seamless, guided system — launched in hours, not weeks.
              </p>
              <ul className="list-disc pl-6 mb-8">
                <li><strong>Mobile-first landing pages</strong></li>
                <li><strong>Business listings</strong></li>
                <li><strong>Automated ad campaigns</strong></li>
                <li><strong>Lead capture + follow-up</strong></li>
                <li><strong>Ambassador guidance</strong></li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">🧩 End-to-End Funnel (Step-by-Step)</h3>
              <pre className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-base font-mono mb-4 whitespace-pre-wrap">
{`🧍 Business Owner → 📋 Simple Intake Form →
🖼️ Instant Landing Page → 📍 Maps + Listings Verified →
📣 Ads Launched on Google & Meta →
🧾 Leads Captured → 📲 Auto-Follow-Up via SMS/Email →
🤝 Guided by Local Ambassador → 🎯 Results in Days`}
              </pre>
              <p className="text-lg leading-relaxed text-gray-700 mb-8">
                Everything works together out of the box — with zero overwhelm, zero guesswork.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">🧠 Why It Works</h3>
              <ul className="list-disc pl-6 mb-8">
                <li>Prebuilt templates by industry (dentists, tradies, legal, and more)</li>
                <li>Ambassador handles onboarding and verification</li>
                <li>No need to write ad copy, configure CRMs, or build sites</li>
                <li>Campaigns go live in <strong>24–72 hours</strong></li>
                <li>Performance feedback loop: best flows get cloned across markets, system improves continuously</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">💡 Why It's Different</h3>
              <ul className="list-disc pl-6 mb-8">
                <li>Not just software — a <strong>human-powered platform</strong></li>
                <li>Ambassadors are <strong>performance-incentivized</strong> and locally embedded</li>
                <li><strong>Replaces</strong> agencies, builders, ad platforms, and CRMs — not just integrates with them</li>
                <li>Full control and clarity for both client and ambassador via live dashboards</li>
              </ul>
              <p className="text-lg leading-relaxed text-gray-700">
                PageOne isn't another marketing tool — it's the infrastructure for digital visibility at scale.
              </p>
            </div>
          }
        />

        {/* Technology Stack */}
        <WhitePaperSection
          id="technology-stack"
          title="Technology Stack"
          icon="⚙️"
          content={
            <div className="prose prose-lg max-w-none">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">🛠️ Built for Scale, Speed, and Modularity</h3>
              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                PageOne is engineered to be modular, API-first, mobile-optimized, and cloud-native — ready to scale globally with minimal overhead.
              </p>
              <ul className="list-disc pl-6 mb-8">
                <li><strong>Modular:</strong> Each core function (landing pages, ads, CRM, ambassador tools) runs independently or together</li>
                <li><strong>Mobile-first:</strong> UX is optimized for thumb-driven actions and small-screen conversion</li>
                <li><strong>API-driven:</strong> Enables automation, future 3rd-party integration, and rapid iteration</li>
                <li><strong>Cloud-native:</strong> Zero infrastructure bottlenecks, serverless rendering, instant global delivery</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">🧩 Core Modules</h3>
              <div className="overflow-x-auto mb-8">
                <table className="w-full border border-gray-300 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900 border-b">Module</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900 border-b">Function</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-4 py-3 font-semibold text-gray-900">Landing Page Generator</td>
                      <td className="px-4 py-3 text-gray-700">Converts business intake into high-conversion, mobile-first site</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3 font-semibold text-gray-900">Campaign Launcher</td>
                      <td className="px-4 py-3 text-gray-700">Auto-generates and deploys Google/Meta ads via templates & APIs</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3 font-semibold text-gray-900">Listing Verifier</td>
                      <td className="px-4 py-3 text-gray-700">Syncs Google/Apple/Bing visibility and tracks listing status</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3 font-semibold text-gray-900">Lead CRM & Follow-Up</td>
                      <td className="px-4 py-3 text-gray-700">Centralized lead capture with SMS/email automation</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3 font-semibold text-gray-900">Ambassador Dashboard</td>
                      <td className="px-4 py-3 text-gray-700">Tracks portfolio performance, commissions, and client visibility</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold text-gray-900">Admin Optimization Engine</td>
                      <td className="px-4 py-3 text-gray-700">Aggregates data, clones top-performing funnels, auto-optimizes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-lg leading-relaxed text-gray-700 mb-8">
                Each module is decoupled but interconnected — enabling rapid updates and low-friction expansion.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">🧰 Stack Overview</h3>
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-300 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900 border-b">Layer</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900 border-b">Technology</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900 border-b">Why It Was Chosen</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-4 py-3 font-semibold text-gray-900">Frontend</td>
                      <td className="px-4 py-3 text-gray-700">React + Tailwind</td>
                      <td className="px-4 py-3 text-gray-700">Fast, modern, mobile-first UI</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3 font-semibold text-gray-900">Backend</td>
                      <td className="px-4 py-3 text-gray-700">Supabase</td>
                      <td className="px-4 py-3 text-gray-700">Postgres + Auth + Functions in one scalable stack</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3 font-semibold text-gray-900">APIs</td>
                      <td className="px-4 py-3 text-gray-700">Google Ads, Meta Ads, Google Business Profile</td>
                      <td className="px-4 py-3 text-gray-700">Full control over campaigns and visibility</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3 font-semibold text-gray-900">Automation</td>
                      <td className="px-4 py-3 text-gray-700">Serverless Functions (Edge/Node)</td>
                      <td className="px-4 py-3 text-gray-700">Async processing at scale</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3 font-semibold text-gray-900">Messaging</td>
                      <td className="px-4 py-3 text-gray-700">Twilio + Resend</td>
                      <td className="px-4 py-3 text-gray-700">Fast, programmable SMS/email delivery</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3 font-semibold text-gray-900">Analytics</td>
                      <td className="px-4 py-3 text-gray-700">Supabase logs + client-side tracking</td>
                      <td className="px-4 py-3 text-gray-700">Lightweight, event-driven, privacy-safe</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold text-gray-900">CDN & Hosting</td>
                      <td className="px-4 py-3 text-gray-700">Supabase Storage + Vercel</td>
                      <td className="px-4 py-3 text-gray-700">Instant delivery, global scale, zero maintenance</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          }
        />

        {/* Market Opportunity */}
        <WhitePaperSection
          id="opportunity"
          title="Market Opportunity"
          icon="📈"
          content={
            <div className="prose prose-lg max-w-none">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">🌍 The Opportunity: A Global Underserved Majority</h3>
              
              <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg mb-8">
                <p className="text-lg font-semibold text-blue-900">
                  &quot;There are over 400 million small businesses in the world — and most still don&apos;t have a working digital presence.&quot;
                </p>
              </div>
              
              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                PageOne targets a massive and underserved segment: local service-based businesses who rely on visibility, trust, and lead generation — but are underserved by today&apos;s fragmented digital tools.
              </p>
              
              <h4 className="text-xl font-semibold text-gray-900 mb-4">💰 Revenue Streams</h4>
              
              <WhitePaperTable
                title="Revenue Model Breakdown"
                headers={["Revenue Type", "Description", "Notes"]}
                data={[
                  ["Setup Fee", "One-time onboarding, landing page, campaign creation", "AUD $500–$1,000 per client upfront"],
                  ["Ad Management Margin", "15–20% of monthly client ad spend", "Recurring, scalable, and high-margin"],
                  ["Premium Add-Ons", "CRM, booking tools, custom domains, analytics upgrades", "Optional; offered post-onboarding"],
                  ["Hosting & Domains", "Branded domains with SSL and performance hosting", "Billed monthly or annually"],
                  ["Referral Credits", "Clients refer peers; ambassadors get bonus commissions", "Organic growth channel"]
                ]}
              />
              
              <p className="text-lg leading-relaxed text-gray-700 mt-6 mb-8">
                This structure creates a profitable day-one cashflow engine with long-term recurring value and minimal support overhead.
              </p>
              
              <h4 className="text-xl font-semibold text-gray-900 mb-4">📈 Client Value Over Time</h4>
              
              <WhitePaperTable
                title="Client Lifetime Value Projection"
                headers={["Stage", "Primary Value Driver", "Revenue (AUD)"]}
                data={[
                  ["Onboarding (Week 1)", "Setup Fee", "$500–$1,000"],
                  ["Campaign Months 1–3", "Ad Margin", "$300–600"],
                  ["Retention Months 4–12", "Recurring + Upsells", "$1,500–2,500/year"],
                  ["Year 1 Total", "Full Value Per Client", "$2,000–3,500 AUD"],
                  ["3-Year LTV", "Sustained ads + upgrades", "$6,000–8,000+ AUD"]
                ]}
              />
              
              <p className="text-lg leading-relaxed text-gray-700 mt-6">
                Setup fees fund growth. Ad margins and upsells create ongoing revenue. No code, no team scale needed — this model grows with people.
              </p>
            </div>
          }
        />

        {/* Competitive Landscape */}
        <WhitePaperSection
          id="competitive-landscape"
          title="Competitive Landscape"
          icon="🏆"
          content={
            <div className="prose prose-lg max-w-none">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">🎯 Why PageOne Wins Where Others Fail</h3>
              
              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                The digital marketing landscape is crowded with tools, but most fail to solve the core problem: small businesses need results, not complexity.
              </p>
              
              <h4 className="text-xl font-semibold text-gray-900 mb-4">🔍 Competitive Analysis</h4>
              
              <div className="space-y-6 mb-8">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h5 className="font-semibold text-gray-900 mb-3">Traditional Agencies</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-semibold text-red-600 mb-2">❌ Their Weaknesses:</p>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• High cost ($2,000–$10,000/month)</li>
                        <li>• Long setup times (weeks to months)</li>
                        <li>• Limited transparency</li>
                        <li>• Scalability issues</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-green-600 mb-2">✅ PageOne Advantage:</p>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Fraction of the cost</li>
                        <li>• Setup in hours, not weeks</li>
                        <li>• Full transparency</li>
                        <li>• Built for scale</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-6">
                  <h5 className="font-semibold text-gray-900 mb-3">DIY Platforms (Wix, Squarespace)</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-semibold text-red-600 mb-2">❌ Their Weaknesses:</p>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Requires technical skills</li>
                        <li>• No marketing automation</li>
                        <li>• Limited lead capture</li>
                        <li>• No ongoing support</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-green-600 mb-2">✅ PageOne Advantage:</p>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Zero technical skills needed</li>
                        <li>• Full marketing automation</li>
                        <li>• Advanced lead capture</li>
                        <li>• Human support included</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-6">
                  <h5 className="font-semibold text-gray-900 mb-3">Marketing Automation Tools</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-semibold text-red-600 mb-2">❌ Their Weaknesses:</p>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Complex setup and learning curve</li>
                        <li>• Expensive for small businesses</li>
                        <li>• No human guidance</li>
                        <li>• Requires ongoing management</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-green-600 mb-2">✅ PageOne Advantage:</p>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Simple, guided setup</li>
                        <li>• Affordable pricing model</li>
                        <li>• Local ambassador support</li>
                        <li>• Hands-off operation</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <h4 className="text-xl font-semibold text-gray-900 mb-4">🎯 Our Unique Positioning</h4>
              
              <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg mb-8">
                <p className="text-lg font-semibold text-blue-900">
                  PageOne combines the automation of enterprise tools with the personal touch of local agencies — at a price point that works for small businesses.
                </p>
              </div>
              
              <WhitePaperTable
                title="Competitive Positioning Matrix"
                headers={["Feature", "Traditional Agencies", "DIY Platforms", "Marketing Tools", "PageOne"]}
                data={[
                  ["Setup Time", "Weeks to months", "Days to weeks", "Days to weeks", "Hours"],
                  ["Cost (Monthly)", "$2,000–$10,000", "$20–$50", "$100–$500", "$200–$800"],
                  ["Technical Skills Required", "None (done for you)", "High", "Medium", "None"],
                  ["Human Support", "Yes", "No", "Limited", "Yes (local)"],
                  ["Marketing Automation", "Yes", "No", "Yes", "Yes"],
                  ["Lead Capture", "Basic", "Basic", "Advanced", "Advanced"],
                  ["Ongoing Management", "Required", "Required", "Required", "Minimal"]
                ]}
              />
              
              <h4 className="text-xl font-semibold text-gray-900 mb-4 mt-8">🚀 Why We&apos;ll Win</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h5 className="font-semibold text-green-800 mb-2">Speed to Market</h5>
                  <p className="text-sm text-green-700">From signup to live campaigns in hours, not weeks</p>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h5 className="font-semibold text-blue-800 mb-2">Human Touch</h5>
                  <p className="text-sm text-blue-700">Local ambassadors provide personal support and guidance</p>
                </div>
                
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h5 className="font-semibold text-purple-800 mb-2">Affordable Excellence</h5>
                  <p className="text-sm text-purple-700">Enterprise-level results at small business prices</p>
                </div>
              </div>
            </div>
          }
        />

        {/* Go-to-Market Strategy */}
        <WhitePaperSection
          id="go-to-market"
          title="Go-to-Market Strategy"
          icon="🧭"
          content={
            <div className="prose prose-lg max-w-none">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">📋 Phase 1 — Foundation (Months 1–3)</h3>
              <ul className="list-disc pl-6 mb-4">
                <li>Founder-led direct outreach</li>
                <li>Target: 3–5 verticals (e.g. dentists, legal, trades)</li>
                <li>Manual ambassador onboarding + close client feedback loops</li>
                <li>Build out testimonials and early case studies</li>
              </ul>
              <p className="font-semibold text-gray-800 mb-6">Success Metrics:</p>
              <ul className="list-disc pl-6 mb-8">
                <li>50–100 onboarded clients</li>
                <li>90% satisfaction rate</li>
                <li>3+ leads per client per month</li>
                <li>Positive unit economics validated</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">🚀 Phase 2 — Scale (Months 4–9)</h3>
              <ul className="list-disc pl-6 mb-4">
                <li>Launch ambassador program across 3+ metro areas</li>
                <li>Automate onboarding and training</li>
                <li>Introduce referral and partner programs</li>
                <li>Begin content marketing (local SEO, ambassador branding assets)</li>
              </ul>
              <p className="font-semibold text-gray-800 mb-6">Success Metrics:</p>
              <ul className="list-disc pl-6 mb-8">
                <li>20+ active ambassadors</li>
                <li>500–1,000 active clients</li>
                <li>$50K+ monthly recurring revenue</li>
                <li>70% ambassador retention</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">🌍 Phase 3 — Dominate (Months 10–18)</h3>
              <ul className="list-disc pl-6 mb-4">
                <li>Expand to 5–10 new markets (international optional)</li>
                <li>Launch enterprise features + integrations</li>
                <li>Strategic partnerships (e.g. agencies, telcos)</li>
                <li>Prepare Series A</li>
              </ul>
              <p className="font-semibold text-gray-800 mb-6">Success Metrics:</p>
              <ul className="list-disc pl-6 mb-8">
                <li>5,000+ clients</li>
                <li>$500K+ MRR</li>
                <li>85% client retention</li>
                <li>Category leadership in key verticals</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-900 mb-6">🧲 Channel Strategy Table</h3>
              <div className="overflow-x-auto mb-8">
                <table className="w-full border border-gray-300 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900 border-b">Channel</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900 border-b">Phase</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900 border-b">Role</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-900 border-b">Expected ROI</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-4 py-3 font-semibold text-gray-900">Direct Sales</td>
                      <td className="px-4 py-3 text-gray-700">Phase 1</td>
                      <td className="px-4 py-3 text-gray-700">Founders/early team</td>
                      <td className="px-4 py-3 text-gray-700">High (feedback + first $)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3 font-semibold text-gray-900">Ambassador Network</td>
                      <td className="px-4 py-3 text-gray-700">Phase 2+</td>
                      <td className="px-4 py-3 text-gray-700">Scale with low CAC</td>
                      <td className="px-4 py-3 text-gray-700">Very High</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3 font-semibold text-gray-900">Content Marketing</td>
                      <td className="px-4 py-3 text-gray-700">Phase 2–3</td>
                      <td className="px-4 py-3 text-gray-700">SEO, brand, education</td>
                      <td className="px-4 py-3 text-gray-700">Medium (long tail)</td>
                    </tr>
                    <tr className="border-b">
                      <td className="px-4 py-3 font-semibold text-gray-900">Strategic Partnerships</td>
                      <td className="px-4 py-3 text-gray-700">Phase 3</td>
                      <td className="px-4 py-3 text-gray-700">Market acceleration</td>
                      <td className="px-4 py-3 text-gray-700">High</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold text-gray-900">Paid Ads</td>
                      <td className="px-4 py-3 text-gray-700">Phase 3</td>
                      <td className="px-4 py-3 text-gray-700">Brand awareness + expansion</td>
                      <td className="px-4 py-3 text-gray-700">Medium</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-lg leading-relaxed text-gray-700">
                PageOne's GTM playbook is built to validate fast, scale cleanly, and dominate with low CAC and strong retention.
              </p>
            </div>
          }
        />

        {/* Business Model & Unit Economics */}
        <WhitePaperSection
          id="business-model"
          title="Business Model & Unit Economics"
          icon="💸"
          content={
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Business Model & Unit Economics</h2>

              {/* 💸 Revenue Streams */}
              <h3 className="text-xl font-semibold mb-4">💸 Revenue Streams</h3>
              <WhitePaperTable
                title="Core Revenue Sources"
                headers={["Revenue Type", "Description", "Notes"]}
                data={[
                  ["Setup Fee", "One-time onboarding, landing page, campaign setup", "AUD $500–$1,000 per client upfront"],
                  ["Ad Margin", "15–20% of monthly ad spend managed through PageOne", "Recurring, scales with spend"],
                  ["Premium Add-ons", "CRM tools, booking widgets, SMS, analytics, call tracking", "Optional upsells via ambassador or portal"],
                  ["Hosting & Domains", "SSL + branded subdomains or custom domains", "Charged monthly or annually"],
                  ["Referral Credits", "Incentives for client-to-client or ambassador referrals", "Fuels organic growth"]
                ]}
              />
              <p className="text-sm text-gray-700 mt-2 mb-6">
                <em>"Setup fees create upfront cash flow. Ad spend and add-ons power recurring revenue."</em>
              </p>

              {/* 👥 Ambassador Model (Scalable Human Growth) */}
              <h3 className="text-xl font-semibold mb-4">👥 Ambassador Model (Scalable Human Growth)</h3>
              <ul className="mb-4 list-disc pl-6">
                <li><strong>1. Upfront Commission:</strong> $150–$300 per client from setup fee</li>
                <li><strong>2. Recurring Residual Income:</strong> 10–15% of PageOne's ad margin, avg. $30–$50/month per active client</li>
              </ul>
              <WhitePaperTable
                title="Ambassador Earnings Example"
                headers={["Profile", "Clients Onboarded", "Monthly Residual", "Annual Earnings"]}
                data={[
                  ["Conservative", "20", "~$600–$1,000", "$10K–$15K AUD"],
                  ["Core Performer", "50", "~$1,500–$2,500", "$30K–$45K AUD"],
                  ["Top Ambassador", "100+", "$3K–$5K+", "$60K–$80K+ AUD"]
                ]}
              />

              {/* 📊 Unit Economics */}
              <h3 className="text-xl font-semibold mb-4">📊 Unit Economics</h3>
              <WhitePaperTable
                title="Key Unit Economics"
                headers={["Metric", "Est. Value"]}
                data={[
                  ["CAC", "$0 (covered by setup fee)"],
                  ["Gross Margin (Setup)", "~70–85%"],
                  ["Gross Margin (Ads)", "~65–75% after ambassador commission"],
                  ["Payback Period", "< 1 week"],
                  ["12-Month LTV", "$2K–$3.5K per client"],
                  ["3-Year LTV", "$6K–$8K+ per client"],
                  ["Ambassador Break-Even", "~3–4 active clients"]
                ]}
              />

              {/* 📈 Growth Mechanics */}
              <h3 className="text-xl font-semibold mb-4">📈 Growth Mechanics</h3>
              <ul className="mb-4 list-disc pl-6">
                <li>Ambassadors bring in clients</li>
                <li>Clients fund operations via setup fee</li>
                <li>Results generate referrals and testimonials</li>
                <li>Best campaigns are cloned and redeployed</li>
                <li>LTV expands via automated upsells</li>
              </ul>
              <p className="text-lg text-gray-800 font-semibold mt-4">
                "PageOne grows profitably from day one — with every client and every ambassador increasing lifetime value across the network."
              </p>
            </div>
          }
        />

        {/* Fundraising Ask */}
        <WhitePaperSection
          id="fundraising-ask"
          title="Fundraising Ask"
          icon="🎯"
          content={
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Fundraising Ask</h2>

              {/* 🎯 Raise Overview */}
              <h3 className="text-xl font-semibold mb-4">🎯 Raise Overview</h3>
              <p className="text-lg leading-relaxed text-gray-800 mb-4">
                <strong>PageOne is raising AUD $30,000–$100,000 in pre-seed capital to complete MVP development, launch early clients, and activate our first ambassador territories.</strong>
              </p>
              <ul className="mb-6 list-disc pl-6">
                <li>Pre-seed round structured as <strong>SAFE or equity</strong>, depending on investor preference</li>
                <li>Current valuation range: <strong>AUD $1.5M–$2.5M (pre-money)</strong></li>
                <li>Goal: raise smart capital from aligned early believers before scaling toward seed</li>
              </ul>

              {/* 🔧 Use of Funds */}
              <h3 className="text-xl font-semibold mb-4">🔧 Use of Funds</h3>
              <WhitePaperTable
                title="Use of Funds"
                headers={["Category", "Allocation", "Details"]}
                data={[
                  ["MVP Completion", "25–35%", "Final backend, admin tools, dashboard UX"],
                  ["Client Acquisition", "20–30%", "Ad credits, landing page setup, lead ops"],
                  ["Ambassador Onboarding", "20–25%", "Playbook finalization, launch incentives"],
                  ["Branding & Positioning", "10–15%", "Visual assets, legal brand setup"],
                  ["Legal & Structuring", "5–10%", "Entity, SAFE docs, compliance, insurance"]
                ]}
              />
              <p className="text-sm text-gray-700 mt-2 mb-6">
                <em>This capital unlocks operational launch, data validation, and early revenue without requiring technical hiring or debt.</em>
              </p>

              {/* 📈 Roadmap to Seed */}
              <h3 className="text-xl font-semibold mb-4">📈 Roadmap to Seed</h3>
              <ul className="mb-4 list-disc pl-6">
                <li><strong>Target:</strong> 50–100 paying clients onboarded</li>
                <li>10–20 ambassadors fully active across 2–3 markets</li>
                <li>First <strong>$10K–$20K in MRR</strong> proven</li>
                <li>Platform stability and user feedback loop in place</li>
              </ul>
              <p className="text-lg text-gray-800 font-semibold mt-4">
                "This round gives us the traction and data to raise a $500K+ seed round with strong unit economics, early proof, and a repeatable go-to-market playbook."
              </p>
            </div>
          }
        />

        {/* Risk Analysis & Mitigation */}
        <WhitePaperSection
          id="risk-analysis"
          title="Risk Analysis & Mitigation"
          icon="⚠️"
          content={
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Risk Analysis & Mitigation</h2>

              {/* ⚠️ Key Risks */}
              <h3 className="text-xl font-semibold mb-4">⚠️ Key Risks</h3>
              <WhitePaperTable
                title="Top Risks"
                headers={["Risk", "Description"]}
                data={[
                  ["Product Execution", "MVP not launched or functionality incomplete"],
                  ["Client Acquisition Cost", "CAC might increase if ambassador model doesn't scale fast enough"],
                  ["Ambassador Quality Control", "Inconsistent onboarding or representation may impact brand"],
                  ["Market Education", "SMEs may still struggle to understand automated lead-gen offerings"],
                  ["Regulatory & Compliance Risk", "Local ad guidelines, data protection laws in each market"],
                  ["Platform Dependence", "Reliance on platforms (Google Ads, Meta) could change access or policies"]
                ]}
              />

              {/* 🛡️ Mitigation Strategies */}
              <h3 className="text-xl font-semibold mb-4">🛡️ Mitigation Strategies</h3>
              <ul className="mb-4 list-disc pl-6">
                <li>MVP build uses proven stack (Supabase, Vercel, React), and dev work is 80% complete</li>
                <li>Client onboarding economics validated through pre-launch tests and founder-led sales</li>
                <li>Ambassador quality is managed with training, playbooks, performance dashboards, and penalties for neglect</li>
                <li>Education is built into the ambassador's role — human-guided onboarding, not just a SaaS dashboard</li>
                <li>Platform compliance (e.g. Meta, Google Ads) built into system logic and reviewed at each release</li>
                <li>Future platform risk addressed through diversification (e.g., Bing, TikTok, local search partners)</li>
              </ul>
            </div>
          }
        />

        {/* Team & Founder */}
        <WhitePaperSection
          id="team-founder"
          title="Team & Founder"
          icon="👥"
          content={
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Team & Founder</h2>

              {/* 🧑‍💼 Founder */}
              <h3 className="text-xl font-semibold mb-4">🧑‍💼 Founder</h3>
              <p className="text-lg leading-relaxed text-gray-800 mb-4">
                <strong>Travis Cunningham</strong> is a 20-year veteran of sales, digital marketing, and SME growth. He previously founded <strong>ARDigital</strong>, a full-service agency serving rural Australian businesses. Having worked across inbound sales, Google Ads, CRM implementations, and web design, Travis built PageOne after seeing firsthand how most small businesses waste money on digital tools that don't work together.
              </p>
              <ul className="mb-4 list-disc pl-6">
                <li>Scaled ARDigital from 0 to hundreds of clients over a decade</li>
                <li>Built dozens of landing page funnels and ad campaigns for tradies, health, and professional services</li>
                <li>Deep experience in both direct sales and automation technologies</li>
              </ul>
              <blockquote className="border-l-4 border-blue-400 pl-4 italic text-blue-800 mb-6">
                "I've watched small businesses throw thousands at systems that never talk to each other. PageOne is the system I wish existed — simple, fast, and focused on results."
              </blockquote>

              {/* 🤝 Advisory & Early Operators */}
              <h3 className="text-xl font-semibold mb-4">🤝 Advisory & Early Operators</h3>
              <p className="text-lg leading-relaxed text-gray-800">
                A core group of technical, marketing, and ambassador advisors have supported the MVP and go-to-market design. As we move into early launch, we are formalizing our operating team and ambassador leadership cohorts across pilot markets.
              </p>
            </div>
          }
        />

        {/* Financial Projections */}
        <WhitePaperSection
          id="financial-projections"
          title="Financial Projections"
          icon="📊"
          content={
            <div className="prose prose-lg max-w-none">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">💰 Financial Roadmap to Profitability</h3>
              
              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                PageOne&apos;s financial model is designed for sustainable growth with clear paths to profitability and strong unit economics.
              </p>
              
              <h4 className="text-xl font-semibold text-gray-900 mb-4">📈 Revenue Projections</h4>
              
              <WhitePaperTable
                title="3-Year Revenue Forecast (AUD)"
                headers={["Year", "Active Clients", "Avg. Revenue Per Client", "Total Revenue", "Growth Rate"]}
                data={[
                  ["Year 1", "500", "$2,500", "$1,250,000", "N/A"],
                  ["Year 2", "2,500", "$3,000", "$7,500,000", "500%"],
                  ["Year 3", "8,000", "$3,500", "$28,000,000", "273%"]
                ]}
              />
              
              <h4 className="text-xl font-semibold text-gray-900 mb-4 mt-8">💸 Cost Structure</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h5 className="font-semibold text-blue-800 mb-2">Fixed Costs (Monthly)</h5>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Technology infrastructure: $5,000</li>
                    <li>• Team salaries: $25,000</li>
                    <li>• Legal & compliance: $3,000</li>
                    <li>• Marketing & sales: $10,000</li>
                    <li><strong>Total: $43,000/month</strong></li>
                  </ul>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h5 className="font-semibold text-green-800 mb-2">Variable Costs</h5>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Ambassador commissions: 15% of revenue</li>
                    <li>• Platform fees: 5% of revenue</li>
                    <li>• Customer support: $50/client/month</li>
                    <li>• Payment processing: 2.9% of revenue</li>
                  </ul>
                </div>
              </div>
              
              <h4 className="text-xl font-semibold text-gray-900 mb-4">📊 Profitability Analysis</h4>
              
              <WhitePaperTable
                title="Profitability Timeline"
                headers={["Milestone", "Timeline", "Monthly Revenue", "Monthly Costs", "Profit Margin"]}
                data={[
                  ["Break-even", "Month 8", "$43,000", "$43,000", "0%"],
                  ["First profit", "Month 10", "$60,000", "$50,000", "17%"],
                  ["Sustainable profit", "Month 15", "$100,000", "$70,000", "30%"],
                  ["Scale profit", "Month 24", "$300,000", "$150,000", "50%"]
                ]}
              />
              
              <h4 className="text-xl font-semibold text-gray-900 mb-4 mt-8">🎯 Key Financial Metrics</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600 mb-2">$0</div>
                  <div className="text-sm text-purple-700">Customer Acquisition Cost</div>
                  <div className="text-xs text-purple-600 mt-1">(Covered by setup fee)</div>
                </div>
                
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600 mb-2">6:1</div>
                  <div className="text-sm text-orange-700">LTV/CAC Ratio</div>
                  <div className="text-xs text-orange-600 mt-1">(Year 1 average)</div>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-600 mb-2">85%</div>
                  <div className="text-sm text-green-700">Gross Margin</div>
                  <div className="text-xs text-green-600 mt-1">(After ambassador payouts)</div>
                </div>
              </div>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
                <p className="text-lg font-semibold text-yellow-900">
                  Our financial model shows clear path to profitability by Month 8, with strong unit economics that scale efficiently as we grow.
                </p>
              </div>
            </div>
          }
        />

        {/* Team */}
        <WhitePaperSection
          id="team"
          title="Team"
          icon="👥"
          content={
            <div className="prose prose-lg max-w-none">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">🌟 Building the Future of Small Business Marketing</h3>
              
              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                PageOne&apos;s team combines deep technical expertise with real-world business experience — creating a platform that actually works for the people who need it most.
              </p>
              
              <h4 className="text-xl font-semibold text-gray-900 mb-4">👨‍💼 Leadership Team</h4>
              
              <div className="space-y-6 mb-8">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h5 className="font-semibold text-gray-900 mb-3">Travis Cunningham — Founder & CEO</h5>
                  <ul className="space-y-2 text-gray-700">
                    <li>• 8+ years in digital marketing and small business consulting</li>
                    <li>• Founded ARDigital agency serving 200+ SMEs</li>
                    <li>• Full-stack developer with expertise in React, Next.js, and automation</li>
                    <li>• Experience supporting $6.5M global blockchain raise</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-6">
                  <h5 className="font-semibold text-gray-900 mb-3">Advisory Board</h5>
                  <ul className="space-y-2 text-gray-700">
                    <li>• <strong>Marketing Expert:</strong> 15+ years in digital marketing, former agency owner</li>
                    <li>• <strong>Technology Advisor:</strong> Senior engineer at major tech company</li>
                    <li>• <strong>Business Strategy:</strong> Serial entrepreneur with 3 successful exits</li>
                    <li>• <strong>Financial Advisor:</strong> CPA with startup and small business expertise</li>
                  </ul>
                </div>
              </div>
              
              <h4 className="text-xl font-semibold text-gray-900 mb-4">🚀 Hiring Plan</h4>
              
              <WhitePaperTable
                title="Team Growth Timeline"
                headers={["Role", "Timeline", "Responsibilities", "Impact"]}
                data={[
                  ["Senior Developer", "Month 3", "Platform scaling, new features", "Technical foundation"],
                  ["Marketing Manager", "Month 4", "Content, partnerships, growth", "Brand awareness"],
                  ["Customer Success", "Month 6", "Client onboarding, support", "Retention & satisfaction"],
                  ["Sales Manager", "Month 8", "Ambassador recruitment, partnerships", "Revenue growth"],
                  ["CTO", "Month 12", "Technical strategy, team leadership", "Scale & innovation"]
                ]}
              />
              
              <h4 className="text-xl font-semibold text-gray-900 mb-4 mt-8">🎯 Culture & Values</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h5 className="font-semibold text-blue-800 mb-2">Human-First Technology</h5>
                  <p className="text-sm text-blue-700">We build tools that serve people, not replace them</p>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h5 className="font-semibold text-green-800 mb-2">Results Over Features</h5>
                  <p className="text-sm text-green-700">We measure success by client outcomes, not vanity metrics</p>
                </div>
                
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h5 className="font-semibold text-purple-800 mb-2">Global Impact</h5>
                  <p className="text-sm text-purple-700">We believe every small business deserves digital success</p>
                </div>
                
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h5 className="font-semibold text-orange-800 mb-2">Continuous Learning</h5>
                  <p className="text-sm text-orange-700">We adapt and improve based on real feedback</p>
                </div>
              </div>
              
              <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
                <p className="text-lg font-semibold text-blue-900">
                  Our team is committed to building a platform that makes digital marketing accessible, effective, and human — for every small business that wants to grow.
                </p>
              </div>
            </div>
          }
        />

        {/* Roadmap */}
        <WhitePaperSection
          id="roadmap"
          title="Roadmap"
          icon="🗺️"
          content={
            <div className="prose prose-lg max-w-none">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">🎯 Product Roadmap: From MVP to Market Leader</h3>
              
              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                PageOne&apos;s roadmap is designed to deliver immediate value while building toward a comprehensive platform that serves every aspect of small business digital marketing.
              </p>
              
              <h4 className="text-xl font-semibold text-gray-900 mb-4">📅 Phase 1: Foundation (Months 1-6)</h4>
              
              <div className="space-y-6 mb-8">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h5 className="font-semibold text-gray-900 mb-3">Core Platform</h5>
                  <ul className="space-y-2 text-gray-700">
                    <li>✅ Landing page builder with industry templates</li>
                    <li>✅ Google Ads campaign automation</li>
                    <li>✅ Business listing verification</li>
                    <li>✅ Basic lead capture and follow-up</li>
                    <li>✅ Ambassador dashboard v1</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-6">
                  <h5 className="font-semibold text-gray-900 mb-3">Launch Features</h5>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Meta Ads integration</li>
                    <li>• SMS follow-up automation</li>
                    <li>• Basic analytics dashboard</li>
                    <li>• Payment processing</li>
                    <li>• Customer support system</li>
                  </ul>
                </div>
              </div>
              
              <h4 className="text-xl font-semibold text-gray-900 mb-4">🚀 Phase 2: Scale (Months 7-12)</h4>
              
              <div className="space-y-6 mb-8">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h5 className="font-semibold text-gray-900 mb-3">Advanced Features</h5>
                  <ul className="space-y-2 text-gray-700">
                    <li>• TikTok Ads integration</li>
                    <li>• Advanced analytics and reporting</li>
                    <li>• CRM integration (HubSpot, Salesforce)</li>
                    <li>• Multi-language support</li>
                    <li>• API for third-party integrations</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-6">
                  <h5 className="font-semibold text-gray-900 mb-3">Platform Enhancements</h5>
                  <ul className="space-y-2 text-gray-700">
                    <li>• AI-powered content generation</li>
                    <li>• Advanced A/B testing</li>
                    <li>• White-label solutions</li>
                    <li>• Mobile app for ambassadors</li>
                    <li>• Advanced security features</li>
                  </ul>
                </div>
              </div>
              
              <h4 className="text-xl font-semibold text-gray-900 mb-4">🌍 Phase 3: Dominate (Months 13-24)</h4>
              
              <div className="space-y-6 mb-8">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h5 className="font-semibold text-gray-900 mb-3">Enterprise Features</h5>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Multi-location business support</li>
                    <li>• Advanced automation workflows</li>
                    <li>• Predictive analytics</li>
                    <li>• Custom integrations marketplace</li>
                    <li>• Advanced compliance tools</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-6">
                  <h5 className="font-semibold text-gray-900 mb-3">Global Expansion</h5>
                  <ul className="space-y-2 text-gray-700">
                    <li>• 20+ country support</li>
                    <li>• Local payment methods</li>
                    <li>• Regional compliance features</li>
                    <li>• Localized content and templates</li>
                    <li>• Strategic partnerships</li>
                  </ul>
                </div>
              </div>
              
              <h4 className="text-xl font-semibold text-gray-900 mb-4">🔮 Future Vision (24+ Months)</h4>
              
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
                <h5 className="font-semibold text-blue-800 mb-3">AI-Powered Marketing Ecosystem</h5>
                <ul className="space-y-2 text-gray-700">
                  <li>• Predictive marketing recommendations</li>
                  <li>• Automated creative generation</li>
                  <li>• Real-time market analysis</li>
                  <li>• Blockchain-based ambassador rewards</li>
                  <li>• Virtual reality business consultations</li>
                </ul>
              </div>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg mt-8">
                <p className="text-lg font-semibold text-yellow-900">
                  Our roadmap balances immediate value delivery with long-term vision — ensuring PageOne remains the go-to platform for small business digital marketing worldwide.
                </p>
              </div>
            </div>
          }
        />

        {/* Get Involved */}
        <WhitePaperSection
          id="get-involved"
          title="Get Involved"
          icon="🤝"
          content={
            <div className="prose prose-lg max-w-none">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">🚀 Join the PageOne Movement</h3>
              
              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                PageOne is more than a platform — it&apos;s a movement to democratize digital marketing for small businesses worldwide. Here&apos;s how you can be part of it.
              </p>
              
              <h4 className="text-xl font-semibold text-gray-900 mb-4">💰 Investment Opportunities</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h5 className="font-semibold text-green-800 mb-3">Pre-Seed Investors</h5>
                  <ul className="space-y-2 text-green-700">
                    <li>• Investment: $10K–$50K AUD</li>
                    <li>• Equity: 1–5% ownership</li>
                    <li>• Timeline: Immediate</li>
                    <li>• Benefits: Early access, advisory role</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h5 className="font-semibold text-blue-800 mb-3">Strategic Partners</h5>
                  <ul className="space-y-2 text-blue-700">
                    <li>• Investment: $50K–$100K AUD</li>
                    <li>• Equity: 5–10% ownership</li>
                    <li>• Timeline: Next 3 months</li>
                    <li>• Benefits: Board seat, strategic input</li>
                  </ul>
                </div>
              </div>
              
              <h4 className="text-xl font-semibold text-gray-900 mb-4">👥 Join Our Team</h4>
              
              <div className="space-y-6 mb-8">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h5 className="font-semibold text-gray-900 mb-3">Ambassador Program</h5>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Earn $150–$300 per client setup</li>
                    <li>• Recurring monthly income of $30–$50 per active client</li>
                    <li>• Full training and support provided</li>
                    <li>• Flexible hours, work from anywhere</li>
                    <li>• Be part of helping local businesses grow</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-6">
                  <h5 className="font-semibold text-gray-900 mb-3">Full-Time Positions</h5>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Senior Full-Stack Developer (Remote)</li>
                    <li>• Marketing Manager (Melbourne/Sydney)</li>
                    <li>• Customer Success Manager (Remote)</li>
                    <li>• Sales Manager (Melbourne/Sydney)</li>
                    <li>• Competitive salary + equity options</li>
                  </ul>
                </div>
              </div>
              
              <h4 className="text-xl font-semibold text-gray-900 mb-4">🤝 Partnership Opportunities</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h5 className="font-semibold text-purple-800 mb-2">Digital Agencies</h5>
                  <p className="text-sm text-purple-700">White-label our platform for your clients</p>
                </div>
                
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h5 className="font-semibold text-orange-800 mb-2">Business Consultants</h5>
                  <p className="text-sm text-orange-700">Add digital marketing to your service offerings</p>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h5 className="font-semibold text-green-800 mb-2">Technology Partners</h5>
                  <p className="text-sm text-green-700">Integrate with our platform ecosystem</p>
                </div>
              </div>
              
              <h4 className="text-xl font-semibold text-gray-900 mb-4">📞 Contact Information</h4>
              
              <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-blue-800 mb-2">For Investors</h5>
                    <p className="text-sm text-blue-700">Travis Cunningham</p>
                    <p className="text-sm text-blue-700">tcunningham2610@gmail.com</p>
                    <p className="text-sm text-blue-700">+61 411 070 473</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-blue-800 mb-2">For Ambassadors</h5>
                    <p className="text-sm text-blue-700">ambassador@pageone.com</p>
                    <p className="text-sm text-blue-700">Apply at pageone.com/ambassador</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg mt-8">
                <p className="text-lg font-semibold text-yellow-900">
                  Whether you&apos;re an investor, ambassador, or partner — we&apos;re building something special. Join us in making digital marketing accessible to every small business that wants to grow.
                </p>
              </div>
            </div>
          }
        />

        {/* Founder */}
        <WhitePaperSection
          id="founder"
          title="Founder"
          icon="💼"
          content={
            <div className="prose prose-lg max-w-none">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">🎙️ Meet the Founder: Travis Cunningham</h3>
              
              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                <strong>Founder, PageOne</strong><br />
                Digital builder. SME specialist. Human-scale automation advocate.
              </p>
              
              <h4 className="text-xl font-semibold text-gray-900 mb-4">🧩 A Nonlinear Path to Purpose</h4>
              
              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                Travis Cunningham left school early and built his career from the ground up — across banking, sales, solar, service, and small business marketing.
              </p>
              
              <ul className="space-y-3 text-lg text-gray-700 mb-6">
                <li>• He founded ARDigital, a regional agency serving Australian SMEs</li>
                <li>• Built high-performing websites and ad campaigns by hand</li>
                <li>• Worked with hundreds of business owners face-to-face</li>
                <li>• Learned by doing — and by listening</li>
              </ul>
              
              <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg mb-6">
                <p className="text-lg font-semibold text-blue-900">
                  &quot;I started building websites and realised something uncomfortable — if I didn&apos;t automate my own job, someone else would. And when they did, I might be cut out of the income entirely.&quot;
                </p>
              </div>
              
              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                That realisation sparked PageOne: A platform that doesn&apos;t just build pages — it builds opportunity. For freelancers. For SMEs. For anyone who wants to be part of the solution.
              </p>
              
              <h4 className="text-xl font-semibold text-gray-900 mb-4">👤 Founder Snapshot</h4>
              
              <WhitePaperTable
                title="Founder Experience & Skills"
                headers={["Skill/Experience", "Application at PageOne"]}
                data={[
                  ["Full-stack front-end development", "Personally built entire project in React (Next.js), HTML, JS, CSS — with AI tooling (Cursor)"],
                  ["Performance-based SME marketing", "Created landing pages and ad funnels that convert for real businesses"],
                  ["Product + UX architecture", "Designed onboarding flows, editor UI, CRM touchpoints, and GMB integration"],
                  ["Sales psychology & copywriting", "Turned abstract tools into simple offers business owners understand"],
                  ["Human-scale automation systems", "Engineered monetization, incentive, and lead-routing logic that serves people"],
                  ["Startup fundraising & ops", "Gained real experience supporting a $6.5M global blockchain raise"],
                  ["No-code + low-code orchestration", "Integrated Supabase, Resend, Twilio, Google APIs, and campaign triggers"]
                ]}
              />
            </div>
          }
        />

        {/* Pre-Seed Raise */}
        <WhitePaperSection
          id="pre-seed-raise"
          title="Pre-Seed Raise"
          icon="🎯"
          content={
            <div className="prose prose-lg max-w-none">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">💰 Pre-Seed Raise: Operational, Focused, Launch-Ready</h3>
              
              <p className="text-lg leading-relaxed text-gray-700 mb-6">
                PageOne is opening a pre-seed raise of $30,000–$100,000 AUD to formally launch the platform, onboard our first ambassadors, and prepare for a public seed round.
              </p>
              
              <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg mb-8">
                <p className="text-lg font-semibold text-blue-900">
                  This isn&apos;t theoretical capital for vague growth. It&apos;s operational runway to go from prototype to real-world deployment — with real people earning, and real businesses getting leads.
                </p>
              </div>
              
              <h4 className="text-xl font-semibold text-gray-900 mb-4">We&apos;re raising to:</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h5 className="font-semibold text-green-800 mb-2">Register and incorporate the business properly</h5>
                  <p className="text-sm text-green-700">Legal, tax, IP</p>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h5 className="font-semibold text-green-800 mb-2">Finalize and polish the MVP</h5>
                  <p className="text-sm text-green-700">Landing page editor, CRM, ambassador dashboard, and automations</p>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h5 className="font-semibold text-green-800 mb-2">Launch our first ambassador in-market</h5>
                  <p className="text-sm text-green-700">With proper support and performance tracking</p>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h5 className="font-semibold text-green-800 mb-2">Build and deploy the full ambassador onboarding</h5>
                  <p className="text-sm text-green-700">+ training program</p>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h5 className="font-semibold text-green-800 mb-2">Start ambassador acquisition at scale</h5>
                  <p className="text-sm text-green-700">In AU, UK, and the US</p>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h5 className="font-semibold text-green-800 mb-2">Position PageOne for a full public seed round</h5>
                  <p className="text-sm text-green-700">Backed by real traction</p>
                </div>
              </div>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
                <p className="text-lg font-semibold text-yellow-900">
                  We&apos;ve done the hard work — now we need the resources to go live, refine in the field, and begin proving the model at scale.
                </p>
              </div>
            </div>
          }
        />

        {/* Appendix & Confidentiality */}
        <WhitePaperSection
          id="appendix"
          title="Appendix & Confidentiality"
          icon="📎"
          content={
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Appendix & Confidentiality</h2>

              {/* 🔒 Confidentiality Notice */}
              <h3 className="text-xl font-semibold mb-4">🔒 Confidentiality Notice</h3>
              <p className="text-lg leading-relaxed text-gray-800 mb-6">
                This document contains confidential strategic, financial, and technical information about PageOne. It is shared strictly for the purposes of private fundraising, and not for public distribution. By accessing this material, the reader agrees not to disclose, copy, or forward any part of this document without prior written consent.
              </p>

              {/* 📎 Supporting Materials Available Upon Request */}
              <h3 className="text-xl font-semibold mb-4">📎 Supporting Materials Available Upon Request</h3>
              <ul className="mb-6 list-disc pl-6">
                <li>Ambassador onboarding playbook (draft)</li>
                <li>MVP product flow and wireframes</li>
                <li>Tech architecture diagrams</li>
                <li>Revenue model assumptions (Excel)</li>
                <li>Founder pitch deck (slides)</li>
                <li>Traction summary / case studies (forthcoming)</li>
              </ul>

              {/* ✅ Closing Statement */}
              <h3 className="text-xl font-semibold mb-4">✅ Closing Statement</h3>
              <p className="text-lg leading-relaxed text-gray-800 mb-4">
                PageOne is building the future of scalable, human-powered digital marketing — where local businesses grow through guided automation, and ambassadors earn by helping their communities succeed.
              </p>
              <p className="text-lg leading-relaxed text-gray-800 font-semibold">
                We believe in practical tools, local trust, and measurable results — and we're ready to go.
              </p>
            </div>
          }
        />
      </div>

      {/* Footer */}
      <WhitePaperFooter />

      {/* Back to Top Button */}
      {showBackToTop && <BackToTopButton />}
    </div>
  )
} 