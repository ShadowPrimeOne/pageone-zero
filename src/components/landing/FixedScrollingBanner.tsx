import React from 'react';

interface FixedScrollingBannerProps {
  text: string;
}

// Add the following to your global CSS (e.g., globals.css):
// @keyframes ticker-scroll { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }
// .ticker-scroll { display: inline-block; animation: ticker-scroll 18s linear infinite; }

const FixedScrollingBanner: React.FC<FixedScrollingBannerProps> = ({ text }) => (
  <div className="fixed top-0 left-0 w-full z-50 bg-yellow-400 text-black font-semibold text-sm md:text-base py-2 border-b border-yellow-500 overflow-hidden shadow-md">
    <div className="whitespace-nowrap ticker-scroll px-8">
      {text}
    </div>
  </div>
);

export default FixedScrollingBanner; 