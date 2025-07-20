import React from 'react';

interface Badge {
  img: string;
  alt: string;
  label?: string;
}
interface TrustBadgesProps {
  badges: Badge[];
}

// READY FOR PROP MAPPING
const TrustBadges: React.FC<TrustBadgesProps> = ({ badges }) => (
  <section className="w-full py-4 px-4 flex flex-wrap justify-center gap-4 items-center">
    {badges.map((badge, i) => (
      <div key={i} className="flex flex-col items-center">
        <img src={badge.img} alt={badge.alt} className="w-12 h-12 object-contain mb-1" />
        {badge.label && <span className="text-xs text-gray-600">{badge.label}</span>}
      </div>
    ))}
  </section>
);

export default TrustBadges; 