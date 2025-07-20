import React from 'react';

interface ServiceItem {
  icon?: string; // now a string path
  label: string;
  description?: string;
}
interface ServicesListProps {
  services: ServiceItem[];
}

// READY FOR PROP MAPPING
const ServicesList: React.FC<ServicesListProps> = ({ services }) => (
  <section className="w-full py-6 px-4 max-w-3xl mx-auto">
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {services.map((service, i) => (
        <li key={i} className="flex flex-col items-center md:items-start gap-2 bg-white rounded-lg shadow p-4">
          {service.icon && (
            <div className="mb-1 w-14 h-14 sm:w-20 sm:h-20 flex items-center justify-center">
              <img src={service.icon} alt={service.label} className="w-full h-full object-contain" />
            </div>
          )}
          <div className="flex flex-col items-center md:items-start w-full">
            <span className="text-gray-800 font-semibold text-base text-center md:text-left">{service.label}</span>
            {service.description && (
              <span className="text-xs text-gray-500 leading-snug mt-1 text-center md:text-left">{service.description}</span>
            )}
          </div>
        </li>
      ))}
    </ul>
  </section>
);

export default ServicesList; 