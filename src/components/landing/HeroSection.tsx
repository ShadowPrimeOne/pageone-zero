import React from 'react';
import Image from 'next/image';

interface HeroSectionProps {
  headline: string;
  subheadline: string;
  ctaText: string;
  onCtaClick?: () => void;
  backgroundImage?: string;
}

// READY FOR PROP MAPPING
const HeroSection: React.FC<HeroSectionProps> = ({ headline, subheadline, ctaText, onCtaClick, backgroundImage }) => {
  // Parallax state removed
  // const [offset, setOffset] = useState(0);
  // const sectionRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (sectionRef.current) {
  //       const rect = sectionRef.current.getBoundingClientRect();
  //       setOffset(rect.top * 0.3); // Parallax strength
  //     }
  //   };
  //   window.addEventListener('scroll', handleScroll, { passive: true });
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  return (
    <section
      className="relative w-full h-screen flex flex-col items-center justify-center text-center overflow-x-hidden"
      style={{
        backgroundImage: `url('${backgroundImage || "/IMAGES/Trades Demo/Trades Hero Background 1.webp"}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'top center',
        backgroundRepeat: 'no-repeat',
        transition: 'background-position 0.2s cubic-bezier(.4,0,.2,1)',
      }}
    >
      <div className="relative z-10 w-auto max-w-[95vw] sm:w-full sm:max-w-2xl px-2 sm:px-6 py-10 mx-2 sm:mx-0 backdrop-blur-2xl bg-white/40 shadow-2xl flex flex-col items-center gap-6 animate-fadeInUp">
        {/* Mascot image overlapping the top - use Next.js Image for priority loading */}
        <div className="absolute left-1/2 -top-32 -translate-x-1/2 z-20 w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center">
          <Image
            src="/IMAGES/Trades Demo/Trades Logo Mascot.webp"
            alt="Trades Mascot"
            width={176}
            height={176}
            className="w-full h-full object-contain drop-shadow-xl"
            priority
            loading="eager"
          />
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight !text-white animate-fadeInUp" style={{
          textShadow: '0 4px 24px rgba(0,0,0,0.45), 0 1.5px 0 rgba(0,0,0,0.18)'
        }}>
          {headline}
        </h1>
        <p className="text-lg md:text-2xl font-medium !text-white mb-2 animate-fadeInUp" style={{
          textShadow: '0 2px 12px rgba(0,0,0,0.32), 0 1px 0 rgba(0,0,0,0.18)'
        }}>
          {subheadline}
        </p>
        <button
          className="inline-block px-10 py-4 rounded-2xl bg-gradient-to-r from-yellow-400 via-blue-500 to-blue-700 text-white font-bold text-lg shadow-xl hover:scale-105 hover:from-yellow-500 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-400 transition-all duration-200 animate-fadeInUp tracking-wide uppercase"
          onClick={onCtaClick}
        >
          {ctaText}
        </button>
      </div>
      {/* Optional: Add a subtle overlay for flair */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-0 w-40 h-40 bg-gradient-to-br from-blue-400/30 to-transparent rounded-full blur-2xl animate-float" />
        <div className="absolute right-0 bottom-0 w-40 h-40 bg-gradient-to-tr from-yellow-300/30 to-transparent rounded-full blur-2xl animate-float delay-2000" />
        {/* Bottom overlay gradient for smooth transition */}
        <div className="absolute left-0 right-0 bottom-0 h-32 sm:h-40" style={{
          background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, #fff 100%)',
          top: '85%',
          height: '15%'
        }} />
      </div>
      {/*
        For best above-the-fold performance:
        - Use a highly optimized, small hero background image (WebP/AVIF, <200KB if possible)
        - Consider inlining critical CSS (Next.js does this by default)
        - Only load fonts used above the fold, with font-display: swap
      */}
    </section>
  );
};

export default HeroSection; 