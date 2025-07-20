import React from 'react';

interface FooterCTAProps {
  text: string;
  phone?: string;
  email?: string;
  ctaLabel: string;
}

// READY FOR PROP MAPPING
const FooterCTA: React.FC<FooterCTAProps> = ({ text, phone, email, ctaLabel }) => (
  <div className="fixed bottom-0 left-0 w-full z-40 bg-blue-700 text-white flex items-center justify-between px-4 py-3 shadow-lg">
    <div className="font-semibold text-base md:text-lg">{text}</div>
    <div className="flex gap-2 items-center">
      {phone && <a href={`tel:${phone}`} className="underline font-medium hover:text-yellow-300 transition-colors">{ctaLabel}</a>}
      {email && <a href={`mailto:${email}`} className="underline font-medium hover:text-yellow-300 transition-colors">Email</a>}
    </div>
  </div>
);

export default FooterCTA; 