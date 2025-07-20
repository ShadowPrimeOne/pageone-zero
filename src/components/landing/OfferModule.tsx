import React from 'react';

interface OfferModuleProps {
  offerText: string;
  promoDetail: string;
  expiry?: string;
}

// READY FOR PROP MAPPING
const OfferModule: React.FC<OfferModuleProps> = ({ offerText, promoDetail, expiry }) => (
  <section className="w-full bg-blue-50 py-6 px-4 text-center rounded-xl shadow mb-6 max-w-lg mx-auto">
    <div className="text-lg md:text-xl font-bold text-blue-700 mb-2">{offerText}</div>
    <div className="text-gray-700 mb-2">{promoDetail}</div>
    {expiry && <div className="text-xs text-red-500 font-semibold">Offer ends: {expiry}</div>}
  </section>
);

export default OfferModule; 