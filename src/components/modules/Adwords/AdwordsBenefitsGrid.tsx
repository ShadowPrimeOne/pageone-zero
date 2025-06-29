'use client'

import React from 'react'
import Image from 'next/image'

interface Props {
  benefits: string[]
}

const benefitImages = [
  "/IMAGES/Adwords Benefit Grid/money-growth_7736620.png",
  "/IMAGES/Adwords Benefit Grid/summary_12202897.png", 
  "/IMAGES/Adwords Benefit Grid/acknowledge_12066508.png",
  "/IMAGES/Adwords Benefit Grid/wellbeing_12455461.png",
  "/IMAGES/Adwords Benefit Grid/employee_5966885.png"
]

export const AdwordsBenefitsGrid: React.FC<Props> = ({
  benefits,
}) => {
  return (
    <section className="relative w-full h-screen bg-white overflow-hidden">
      <style jsx>{`
        .white-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: white;
          z-index: 0;
        }

        .background-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
          z-index: 1;
          min-height: 100vh;
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
          background-color: white;
          max-width: 100%;
          max-height: 100vh;
          aspect-ratio: auto;
        }

        .gradient-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 1) 0%,
            rgba(255, 255, 255, 0.95) 5%,
            rgba(255, 255, 255, 0.9) 10%,
            rgba(255, 255, 255, 0.8) 15%,
            rgba(255, 255, 255, 0.7) 20%,
            rgba(255, 255, 255, 0.5) 22%,
            rgba(255, 255, 255, 0.3) 24%,
            rgba(255, 255, 255, 0) 25%,
            rgba(255, 255, 255, 0) 85%,
            rgba(255, 255, 255, 0.1) 87%,
            rgba(255, 255, 255, 0.2) 89%,
            rgba(255, 255, 255, 0.4) 91%,
            rgba(255, 255, 255, 0.6) 93%,
            rgba(255, 255, 255, 0.8) 95%,
            rgba(255, 255, 255, 0.9) 97%,
            rgba(255, 255, 255, 1) 100%
          );
          z-index: 2;
        }

        .benefits-container {
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
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 2rem;
          width: 100%;
        }

        .benefits-boxy-container {
          position: absolute;
          left: 10%;
          top: 50%;
          transform: translateY(-50%);
          z-index: 15;
          animation: float 3s ease-in-out infinite;
        }

        .benefits-boxy-image {
          width: 60px;
          height: 60px;
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
        }

        .heading-text {
          text-align: left;
          width: 100%;
          max-width: 600px;
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
          margin: 1rem 0;
          border-radius: 2px;
          animation: rainbow 3s linear infinite;
        }

        @keyframes rainbow {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }

        @keyframes float {
          0%, 100% { 
            transform: translateY(-50%) translateY(0px);
          }
          50% { 
            transform: translateY(-50%) translateY(-20px);
          }
        }

        .benefits-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
          max-width: 500px;
          width: 100%;
          margin-top: 1.5rem;
        }

        .benefit-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.25rem;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 1.5rem;
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

        .benefit-item::before {
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

        .benefit-item::after {
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

        .benefit-item:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 
            0 12px 40px rgba(0, 0, 0, 0.12),
            0 4px 12px rgba(34, 197, 94, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
          background: rgba(255, 255, 255, 0.98);
        }

        .benefit-item:hover::before {
          opacity: 1;
        }

        .benefit-item:hover .benefit-icon-container {
          transform: scale(1.1);
          box-shadow: 
            0 6px 20px rgba(34, 197, 94, 0.4),
            0 3px 8px rgba(0, 0, 0, 0.15),
            0 0 0 1px rgba(255, 255, 255, 0.3);
        }

        .benefit-item:hover .benefit-icon-container::before {
          opacity: 1;
        }

        .benefit-item:hover .benefit-icon-container::after {
          opacity: 0.6;
        }

        .benefit-icon-container {
          flex-shrink: 0;
          width: 3.5rem;
          height: 3.5rem;
          background: linear-gradient(135deg, #22c55e, #16a34a);
          border-radius: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 
            0 4px 12px rgba(34, 197, 94, 0.3),
            0 2px 4px rgba(0, 0, 0, 0.1),
            0 0 0 1px rgba(255, 255, 255, 0.2);
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          animation: iconPopIn 0.8s ease-out;
        }

        .benefit-icon-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .benefit-icon-container::after {
          content: '';
          position: absolute;
          inset: -2px;
          background: linear-gradient(45deg, #F9A825, #FF8C00, #22c55e, #16a34a);
          border-radius: 1rem;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: -1;
          filter: blur(8px);
        }

        .benefit-icon {
          width: 2rem;
          height: 2rem;
          filter: brightness(0) invert(1) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
          transition: all 0.3s ease;
          animation: iconPulse 3s ease-in-out infinite;
          transform-origin: center;
        }

        .benefit-item:hover .benefit-icon {
          filter: brightness(0) invert(1) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4));
          animation-play-state: paused;
        }

        .benefit-text {
          font-family: 'Poppins', sans-serif;
          font-size: 1rem;
          font-weight: 500;
          color: #1f2937;
          line-height: 1.6;
          flex: 1;
          margin-left: 0.5rem;
        }

        .benefit-tick {
          flex-shrink: 0;
          width: 1.5rem !important;
          height: 1.5rem !important;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
          transition: all 0.3s ease;
          opacity: 0.8;
        }

        .benefit-item:hover .benefit-tick {
          opacity: 1;
          transform: scale(1.1);
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
        }

        .heading-text h2 {
          color: #1f2937 !important;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }

        .heading-text p {
          color: #4b5563 !important;
        }

        .section-heading {
          color: #1f2937 !important;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }

        .section-subheading {
          color: #4b5563 !important;
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

        .benefit-item:nth-child(1) { animation-delay: 0.1s; }
        .benefit-item:nth-child(2) { animation-delay: 0.2s; }
        .benefit-item:nth-child(3) { animation-delay: 0.3s; }
        .benefit-item:nth-child(4) { animation-delay: 0.4s; }
        .benefit-item:nth-child(5) { animation-delay: 0.5s; }

        .benefit-item:nth-child(1) .benefit-icon-container { animation-delay: 0.2s; }
        .benefit-item:nth-child(2) .benefit-icon-container { animation-delay: 0.3s; }
        .benefit-item:nth-child(3) .benefit-icon-container { animation-delay: 0.4s; }
        .benefit-item:nth-child(4) .benefit-icon-container { animation-delay: 0.5s; }
        .benefit-item:nth-child(5) .benefit-icon-container { animation-delay: 0.6s; }

        @keyframes iconPopIn {
          0% {
            opacity: 0;
            transform: scale(0.5) rotate(-10deg);
          }
          50% {
            transform: scale(1.1) rotate(5deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }

        @keyframes iconPulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
        }

        @keyframes iconFloat {
          0%, 100% {
            transform: scale(1) translateY(0px);
          }
          50% {
            transform: scale(1) translateY(-3px);
          }
        }

        @media (min-width: 768px) {
          .benefits-container {
            padding: 2rem;
          }

          .benefits-boxy-container {
            left: 12%;
          }
          
          .benefits-boxy-container .benefits-boxy-image {
            width: 128px !important;
            height: 128px !important;
          }

          .heading-text {
            margin-top: -3rem !important;
          }

          .benefits-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
            max-width: 600px;
          }

          .benefit-item {
            padding: 1.75rem;
          }

          .benefit-icon-container {
            width: 4rem;
            height: 4rem;
          }

          .benefit-icon {
            width: 2.25rem;
            height: 2.25rem;
          }

          .benefit-text {
            font-size: 1.125rem;
          }

          .benefit-tick {
            width: 2.5rem !important;
            height: 2.5rem !important;
          }
        }

        @media (min-width: 1024px) {
          .benefits-boxy-container {
            left: 15%;
          }
          
          .benefits-boxy-container .benefits-boxy-image {
            width: 160px !important;
            height: 160px !important;
          }

          .benefits-grid {
            max-width: 700px;
          }

          .benefit-item {
            padding: 2rem;
          }

          .benefit-icon-container {
            width: 4.5rem;
            height: 4.5rem;
          }

          .benefit-icon {
            width: 2.5rem;
            height: 2.5rem;
          }

          .benefit-text {
            font-size: 1.25rem;
          }

          .benefit-tick {
            width: 3rem !important;
            height: 3rem !important;
          }
        }

        @media (min-width: 1280px) {
          .benefits-container {
            max-width: 1200px;
            margin: 0 auto;
          }
          
          .benefits-boxy-container {
            left: 8%;
          }
          
          .benefits-boxy-container .benefits-boxy-image {
            width: 160px !important;
            height: 160px !important;
          }
          
          .heading-text {
            max-width: 800px;
            margin-left: 180px;
          }
          
          .benefits-grid {
            max-width: 800px;
          }
        }

        @media (max-width: 767px) {
          .benefits-boxy-container {
            left: 2%;
            top: 50%;
          }
          
          .benefits-boxy-container .benefits-boxy-image {
            width: 70px !important;
            height: 70px !important;
          }

          .heading-text {
            margin-left: 80px;
          }

          .benefits-grid {
            gap: 0.875rem;
          }

          .benefit-item {
            padding: 1rem;
          }

          .benefit-icon-container {
            width: 3rem;
            height: 3rem;
          }

          .benefit-icon {
            width: 1.75rem;
            height: 1.75rem;
          }

          .benefit-text {
            font-size: 0.95rem;
          }

          .benefit-tick {
            width: 1.5rem !important;
            height: 1.5rem !important;
          }
        }
      `}</style>
      
      {/* White Background */}
      <div className="white-background"></div>
      
      {/* Background Image */}
      <img
        src="/IMAGES/Adwords Benefit Grid/Adwords Blueprint Background.png"
        alt="Adwords Blueprint Background"
        className="background-image"
      />
      
      {/* Gradient Overlay */}
      <div className="gradient-overlay"></div>
      
      <div className="benefits-container">
        <div className="heading-container">
          {/* Boxy */}
          <div className="benefits-boxy-container">
            <Image
              src="/IMAGES/BOXY/Boxy Blueprint-flipped.png"
              alt="Boxy Blueprint"
              width={140}
              height={140}
              className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 opacity-80"
              style={{
                filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))',
                animation: 'float 3s ease-in-out infinite'
              }}
              quality={90}
              priority={false}
              sizes="(max-width: 768px) 64px, (max-width: 1024px) 80px, 96px"
            />
          </div>
          
          <div className="heading-text">
            <h2 className="text-2xl md:text-4xl font-semibold text-left mb-4 md:mb-6 text-balance text-black animate-fadeInUp px-4 font-poppins">
              Blueprint For Success
        </h2>
            <div className="rainbow-divider"></div>
            <p className="text-lg md:text-xl text-gray-600 text-left max-w-3xl mx-auto px-4 font-poppins leading-relaxed">
              All inclusive package for a limited number of business&apos;s...
            </p>
          </div>
        </div>

        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <div key={index} className="benefit-item">
              <div className="benefit-icon-container">
                <Image
                  src={benefitImages[index]}
                  alt={`Benefit ${index + 1}`}
                  width={32}
                  height={32}
                  className="benefit-icon"
                  quality={90}
                  priority={false}
                  sizes="(max-width: 768px) 28px, (max-width: 1024px) 36px, 40px"
                />
              </div>
              <p className="benefit-text">
                {benefit}
              </p>
              <img
                src="/IMAGES/Adwords Benefit Grid/tick adwords.png"
                alt="Tick"
                className="benefit-tick"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 