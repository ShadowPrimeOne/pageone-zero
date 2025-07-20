import React from 'react';

interface MapEmbedProps {
  embedUrl: string;
  label?: string;
}

// READY FOR PROP MAPPING
const MapEmbed: React.FC<MapEmbedProps> = ({ embedUrl, label }) => (
  <section className="w-full max-w-lg mx-auto my-6">
    {label && <div className="mb-2 text-sm font-semibold text-gray-700">{label}</div>}
    <div className="rounded-xl overflow-hidden shadow border border-gray-200">
      <iframe
        src={embedUrl}
        width="100%"
        height="220"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={label || 'Map'}
      ></iframe>
    </div>
  </section>
);

export default MapEmbed; 