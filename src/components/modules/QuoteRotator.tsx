'use client'

import { useEffect, useState } from 'react'

const quotes = [
  {
    text: "Mobile is the enabling centrepiece of digital convergence… the digital gateway for the real world to join this global metamorphosis of human behavior.",
    author: "Tomi T. Ahonen, mobile strategist",
    source: "digitaldefynd.com",
  },
  {
    text: "Mobile design cannot be an afterthought — instead it should drive the entire application and web design process.",
    author: "John Reddin (on mobile-first design)",
    source: "lazure2.wordpress.com",
  },
  {
    text: "Mobile is our communications hub, our source of media consumption, car keys, our credit card, our calendar.",
    author: "Triin Linamagi, former TextMagic executive",
    source: "textmagic.com",
  },
  {
    text: "A journalist's smartphone is a TV studio in their pocket.",
    author: "Robb Montgomery, mobile-journalism pioneer",
    source: "en.wikipedia.org",
  },
  {
    text: "The cellphone was envisioned as 'a device that was an extension of you…', making you reachable everywhere.",
    author: "Marty Cooper on the phone's transformative power",
    source: "apnews.com",
  },
  {
    text: "Mobile-first design prioritizes the user experience, focusing on simplicity, speed, and ease of navigation.",
    author: "Digital Marketing Institute",
    source: "digitalmarketinginstitute.com",
  },
  {
    text: "Search engines like Google prioritize mobile‑friendly websites… crucial for search engine optimization.",
    author: "From 'Importance of Mobile‑First Design in Today's Digital World'",
    source: "digitaldefynd.com",
  },
  {
    text: "Digital-first will become the new mantra.",
    author: "From Forbes on digital transformation",
    source: "forbes.com",
  },
  {
    text: "A digitized enterprise is just the beginning; a transformed mindset is the goal.",
    author: "Peter Diamandis",
    source: "wired.com",
  },
  {
    text: "Tech adoption without process innovation is just window dressing.",
    author: "Chris Bedi, CIO at ServiceNow",
    source: "servicenow.com",
  },
  {
    text: "Technology changes fast; people change slower—lead with empathy.",
    author: "Mary Barra, CEO of General Motors",
    source: "gm.com",
  },
  {
    text: "Be customer-obsessed, not tech‑obsessed.",
    author: "Jeff Bezos",
    source: "amazon.com",
  },
  {
    text: "Data is the new oil, but only if refined with intelligence.",
    author: "Ginni Rometty, former CEO of IBM",
    source: "ibm.com",
  },
  {
    text: "Transformation is about possibility—seeing what's next and going after it.",
    author: "Aaron Levie, CEO of Box",
    source: "digitaldefynd.com",
  },
  {
    text: "When systems evolve faster than leaders, disruption is inevitable.",
    author: "John Chambers, former CEO of Cisco",
    source: "digitaldefynd.com",
  },
  {
    text: "A digital culture must be inclusive, experimental, and transparent.",
    author: "Julie Dodd, digital change agent",
    source: "digitaldefynd.com",
  },
  {
    text: "The future of AI is not about replacing humans, it's about augmenting human capabilities.",
    author: "Sundar Pichai, CEO of Google",
    source: "google.com",
  },
  {
    text: "AI will not replace humans, but those who use AI will replace those who don't.",
    author: "Ginni Rometty",
    source: "time.com",
  },
  {
    text: "AI has the potential to be more transformative than electricity or fire.",
    author: "Sundar Pichai",
    source: "time.com",
  },
  {
    text: "The future of AI is in our hands.",
    author: "Tim Cook, CEO of Apple",
    source: "time.com",
  },
  {
    text: "Artificial intelligence and generative AI may be the most important technology of any lifetime.",
    author: "Marc Benioff, CEO of Salesforce",
    source: "salesforce.com",
  },
  {
    text: "AI is a mirror, reflecting not only our intellect, but our values and fears.",
    author: "Anonymous, expert round‑up",
    source: "nisum.com",
  },
  {
    text: "It is not enough for machines to be intelligent; we must ensure they are aligned with human values.",
    author: "Stuart Russell",
    source: "autogpt.net",
  },
  {
    text: "The coming era of Artificial Intelligence will not be the era of war, but be the era of deep compassion, non‑violence, and love.",
    author: "Amit Ray",
    source: "autogpt.net",
  },
  {
    text: "AI will not destroy us. It will, however, expose who we truly are.",
    author: "Reid Hoffman",
    source: "autogpt.net",
  },
  {
    text: "AI can create a better future for all.",
    author: "Jim Carroll",
    source: "jimcarroll.com",
  },
  {
    text: "I believe in human‑centered AI to benefit people in positive and benevolent ways.",
    author: "Fei‑Fei Li",
    source: "stanford.edu",
  },
  {
    text: "For me it's very important to think about AI's impact in the world, and one of the most important missions is to democratize this technology.",
    author: "Fei‑Fei Li",
    source: "stanford.edu",
  },
  {
    text: "The true purpose of art is just expression… I use AI all the time to aid my busywork… it gives me so much free time… to write and draw and think of new projects.",
    author: "Reddit user on how AI frees creativity",
    source: "reddit.com",
  },
  {
    text: "Solidarity should be a core ethical principle of artificial intelligence.",
    author: "Miguel Luengo‑Oroz, inclusive AI advocate",
    source: "arxiv.org",
  },
  {
    text: "Digital adoption is an ongoing process, and organizations must be prepared to continuously adapt and evolve as new technologies and opportunities emerge.",
    author: "Qualeadity e-book",
    source: "qualeaditysoft.com",
  },
  {
    text: "If you're not online, you don't exist to your audience.",
    author: "MadPin Media",
    source: "madpinmedia.com",
  },
  {
    text: "Never underestimate the importance of having a strong online presence for your brand.",
    author: "Germany Kent",
    source: "goodreads.com",
  },
  {
    text: "Small businesses are the engines of local economies and the building blocks of vibrant communities.",
    author: "Jim Hackett",
    source: "shopify.com",
  },
  {
    text: "A small business is an amazing way to serve and leave an impact on the world you live in.",
    author: "Nicole Snow",
    source: "shopify.com",
  },
  {
    text: "A small business starts small.",
    author: "Richard Branson",
    source: "nicejob.com",
  },
  {
    text: "Social media is the modern‑day storefront.",
    author: "MadPin Media",
    source: "madpinmedia.com",
  },
  {
    text: "In today's digital era, a strong understanding of the digital and social media landscape can lead to success offline too.",
    author: "Germany Kent",
    source: "goodreads.com",
  },
  {
    text: "The best marketing doesn't feel like marketing.",
    author: "Tom Fishburne",
    source: "embryo.com",
  },
  {
    text: "Increased brand awareness online requires a strategic marketing approach focused on creating and distributing consistent content.",
    author: "Germany Kent",
    source: "goodreads.com",
  },
]

export default function QuoteRotator() {
  const [shuffledQuotes, setShuffledQuotes] = useState<typeof quotes>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  // Fisher-Yates shuffle algorithm
  const shuffleArray = (array: typeof quotes) => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  useEffect(() => {
    // Initial shuffle
    setShuffledQuotes(shuffleArray(quotes))
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1
        
        // If we've shown all quotes, reshuffle and start over
        if (nextIndex >= shuffledQuotes.length) {
          setShuffledQuotes(shuffleArray(quotes))
          return 0
        }
        
        return nextIndex
      })
    }, 7000)
    
    return () => clearInterval(interval)
  }, [shuffledQuotes.length])

  // Don't render until we have shuffled quotes
  if (shuffledQuotes.length === 0) {
    return null
  }

  const { text, author, source } = shuffledQuotes[currentIndex]

  return (
    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 w-[85%] sm:w-[70%] max-w-lg">
      <div className="bg-white/25 backdrop-blur-lg rounded-xl shadow-2xl p-2 text-center">
        <div className="text-sm sm:text-base text-gray-800 italic transition-opacity duration-500 ease-in-out leading-tight">
          &ldquo;{text}&rdquo;
          <div className="text-xs text-gray-600 leading-tight mt-1">
            — {author} <span className="text-yellow-600">({source})</span>
          </div>
        </div>
      </div>
    </div>
  )
} 