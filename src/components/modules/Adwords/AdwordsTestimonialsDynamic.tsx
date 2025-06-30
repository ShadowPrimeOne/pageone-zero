'use client'

import React from 'react'

interface Testimonial {
  name: string
  title: string
  quote: string
  rating?: number
  company?: string
}

interface Props {
  testimonials: Testimonial[]
}

export const AdwordsTestimonialsDynamic: React.FC<Props> = ({
  testimonials,
}) => {
  return (
    <section className="relative w-full h-screen bg-white overflow-hidden">
      <style jsx>{`
        .testimonials-container {
          position: relative;
          z-index: 10;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 1rem;
        }

        .heading-container {
          text-align: left;
          margin-bottom: 3rem;
          width: 100%;
          position: relative;
        }

        .section-subheading {
          font-family: 'Poppins', sans-serif;
          font-size: 1.125rem;
          color: #6b7280;
          max-width: 600px;
          line-height: 1.6;
          text-align: left;
        }

        .section-heading {
          font-family: 'Poppins', sans-serif;
          font-size: 2rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 1rem;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }

        .rainbow-divider {
          height: 3px;
          background: linear-gradient(90deg, 
            #22c55e 0%, 
            #16a34a 25%, 
            #fbbf24 50%, 
            #f59e0b 75%, 
            #22c55e 100%
          );
          margin: 1.5rem 0;
          border-radius: 2px;
          width: 80px;
          animation: rainbow 3s linear infinite;
        }

        @keyframes rainbow {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          max-width: 800px;
          width: 100%;
        }

        .testimonial-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 1.5rem;
          padding: 2rem;
          box-shadow: 
            0 4px 20px rgba(0, 0, 0, 0.08),
            0 1px 3px rgba(0, 0, 0, 0.05),
            inset 0 1px 0 rgba(255, 255, 255, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.3);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          animation: fadeInUp 0.6s ease-out forwards;
          position: relative;
          overflow: hidden;
        }

        .testimonial-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(34, 197, 94, 0.3), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .testimonial-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 4px;
          height: 100%;
          background: linear-gradient(180deg, #F9A825 0%, #FF8C00 50%, #22c55e 100%);
          border-radius: 1.5rem 0 0 1.5rem;
          opacity: 0.8;
        }

        .testimonial-card:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 
            0 12px 40px rgba(0, 0, 0, 0.12),
            0 4px 12px rgba(34, 197, 94, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
          background: rgba(255, 255, 255, 0.98);
        }

        .testimonial-card:hover::before {
          opacity: 1;
        }

        .quote-text {
          font-family: 'Poppins', sans-serif;
          font-size: 1.125rem;
          font-weight: 500;
          color: #1f2937;
          line-height: 1.7;
          margin-bottom: 2rem;
          position: relative;
          padding-left: 1rem;
        }

        .quote-text::before {
          content: '"';
          position: absolute;
          left: -0.5rem;
          top: -0.5rem;
          font-size: 3rem;
          color: #22c55e;
          font-family: serif;
          opacity: 0.3;
        }

        .author-section {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .author-avatar {
          width: 3.5rem;
          height: 3.5rem;
          background: linear-gradient(135deg, #22c55e, #16a34a);
          border-radius: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 
            0 4px 12px rgba(34, 197, 94, 0.3),
            0 2px 4px rgba(0, 0, 0, 0.1);
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: 1.25rem;
          color: white;
          flex-shrink: 0;
        }

        .author-info {
          flex: 1;
        }

        .author-name {
          font-family: 'Poppins', sans-serif;
          font-size: 1.125rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 0.25rem;
        }

        .author-title {
          font-family: 'Poppins', sans-serif;
          font-size: 0.875rem;
          color: #6b7280;
          margin-bottom: 0.25rem;
        }

        .author-company {
          font-family: 'Poppins', sans-serif;
          font-size: 0.875rem;
          color: #22c55e;
          font-weight: 500;
        }

        .rating-stars {
          display: flex;
          gap: 0.25rem;
          margin-top: 0.5rem;
        }

        .star {
          color: #fbbf24;
          font-size: 1rem;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .testimonial-card:nth-child(1) { animation-delay: 0.1s; }
        .testimonial-card:nth-child(2) { animation-delay: 0.2s; }
        .testimonial-card:nth-child(3) { animation-delay: 0.3s; }
        .testimonial-card:nth-child(4) { animation-delay: 0.4s; }
        .testimonial-card:nth-child(5) { animation-delay: 0.5s; }

        @media (min-width: 768px) {
          .testimonials-container {
            padding: 2rem;
          }

          .section-heading {
            font-size: 2.5rem;
          }

          .section-subheading {
            font-size: 1.25rem;
          }

          .testimonials-grid {
            gap: 2rem;
            max-width: 900px;
          }

          .testimonial-card {
            padding: 2.5rem;
          }

          .quote-text {
            font-size: 1.25rem;
          }

          .author-avatar {
            width: 4rem;
            height: 4rem;
            font-size: 1.5rem;
          }

          .author-name {
            font-size: 1.25rem;
          }
        }

        @media (min-width: 1024px) {
          .section-heading {
            font-size: 3rem;
          }

          .testimonials-grid {
            max-width: 1000px;
          }

          .testimonial-card {
            padding: 3rem;
          }

          .quote-text {
            font-size: 1.375rem;
          }

          .author-avatar {
            width: 4.5rem;
            height: 4.5rem;
            font-size: 1.75rem;
          }
        }

        @media (min-width: 1280px) {
          .testimonials-container {
            max-width: 1200px;
            margin: 0 auto;
          }
          
          .testimonials-grid {
            max-width: 1100px;
          }
        }

        @media (max-width: 767px) {
          .testimonials-container {
            padding: 1rem;
          }

          .heading-container {
            text-align: center;
          }

          .section-heading {
            font-size: 1.75rem;
          }

          .section-subheading {
            font-size: 1rem;
          }

          .testimonials-grid {
            gap: 1rem;
          }

          .testimonial-card {
            padding: 1.5rem;
          }

          .quote-text {
            font-size: 1rem;
            padding-left: 0.75rem;
          }

          .quote-text::before {
            left: -0.25rem;
            top: -0.25rem;
            font-size: 2.5rem;
          }

          .author-avatar {
            width: 3rem;
            height: 3rem;
            font-size: 1.125rem;
          }

          .author-name {
            font-size: 1rem;
          }

          .author-title,
          .author-company {
            font-size: 0.8rem;
          }
        }
      `}</style>
      
      <div className="testimonials-container">
        <div className="heading-container">
          <h2 className="section-heading">
            What Our Clients Say
          </h2>
          <div className="rainbow-divider"></div>
          <p className="section-subheading">
            Real results from real electrical businesses who trusted us with their growth
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <blockquote className="quote-text">
                {testimonial.quote}
              </blockquote>
              
              <div className="author-section">
                <div className="author-avatar">
                  {testimonial.name.charAt(0).toUpperCase()}
                </div>
                <div className="author-info">
                  <p className="author-name">{testimonial.name}</p>
                  <p className="author-title">{testimonial.title}</p>
                  {testimonial.company && (
                    <p className="author-company">{testimonial.company}</p>
                  )}
                  {testimonial.rating && (
                    <div className="rating-stars">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="star">
                          {i < testimonial.rating! ? '★' : '☆'}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 