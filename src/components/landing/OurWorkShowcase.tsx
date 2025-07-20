import React, { useEffect, useState, useRef } from 'react';

const jobs = [
  {
    image: '/IMAGES/Trades Demo/Our Work/Job 1 Switchboard surry hills.webp',
    title: 'Switchboard Upgrade, Surry Hills Home',
    description:
      'Our team replaced an outdated fuse box with a new safety switchboard for this growing family. All circuits now protected and compliant with the latest standards.',
    quote:
      '"We didn’t realise how old our switchboard was until we had a few power cuts. The team made it quick and easy—now we feel a lot safer at home."',
    customer: '— Emma H., Homeowner',
  },
  {
    image: '/IMAGES/Trades Demo/Our Work/Fan installation.webp',
    title: 'Living Room Downlights & Fan Install, Ashfield',
    description:
      'Energy-saving LED downlights and a quiet ceiling fan were added for year-round comfort and style.',
    quote:
      '"Love how bright and fresh the place feels now! Everything was done in just one visit—highly recommended."',
    customer: '— Priya & Michael',
  },
  {
    image: '/IMAGES/Trades Demo/Our Work/Office fit out.webp',
    title: 'Office Electrical Fitout, CBD Workspace',
    description:
      'Full office rewiring, energy-efficient lighting, and new workstation power points installed to support flexible working.',
    quote:
      '"The team handled everything—from planning to installation. Zero downtime for our staff. Great experience."',
    customer: '— Lisa T., Operations Manager',
  },
  {
    image: '/IMAGES/Trades Demo/Our Work/School Job.webp',
    title: 'Classroom Electrical Safety Upgrade, Northside Primary',
    description:
      'Installed new smoke alarms, tested all circuits, and added extra outlets to keep classrooms safe and tech-ready.',
    quote:
      '"It’s a real relief to know our alarms are up to date. The electricians worked around our schedule and were fantastic with staff and kids alike."',
    customer: '— Ms. Carter, Year 3 Teacher',
  },
];

export default function OurWorkShowcase() {
  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const transitionDuration = 350; // ms

  // Auto-slide every 7 seconds
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      handleSlideChange((index + 1) % jobs.length);
    }, 7000);
    return () => clearTimeout(timeoutRef.current!);
  }, [index]);

  // Slide change with fade transition
  const handleSlideChange = (newIndex: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setIndex(newIndex);
      setIsTransitioning(false);
    }, transitionDuration);
  };

  // Swipe support (mobile)
  const startX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (startX.current === null) return;
    const delta = e.changedTouches[0].clientX - startX.current;
    if (delta > 50) handleSlideChange((index - 1 + jobs.length) % jobs.length);
    if (delta < -50) handleSlideChange((index + 1) % jobs.length);
    startX.current = null;
  };

  return (
    <section className="w-full max-w-2xl mx-auto py-10 px-2 sm:px-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-900">Our Work</h2>
      <div
        className="relative rounded-3xl overflow-hidden shadow-xl bg-white/80 backdrop-blur-lg flex flex-col items-center"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Image with fade transition */}
        <div className={`w-full aspect-[16/9] sm:aspect-[2/1] bg-gray-100 flex items-center justify-center relative transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          <img
            src={jobs[index].image}
            alt={jobs[index].title}
            className="object-cover w-full h-full transition-all duration-700 rounded-t-3xl"
            style={{ objectPosition: 'center' }}
          />
        </div>
        {/* Content with fade transition */}
        <div className={`p-5 sm:p-8 flex flex-col gap-2 w-full min-h-[180px] sm:min-h-[160px] bg-white/90 backdrop-blur-lg transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          <h3 className="text-lg sm:text-xl font-semibold text-blue-800 mb-1 text-center sm:text-left break-words">{jobs[index].title}</h3>
          <p className="text-gray-700 text-sm sm:text-base mb-2 text-center sm:text-left break-words overflow-hidden">{jobs[index].description}</p>
          <blockquote className="italic text-blue-700 text-base sm:text-lg font-medium mb-1 text-center sm:text-left break-words overflow-hidden">{jobs[index].quote}</blockquote>
          <div className="text-xs text-gray-500 text-center sm:text-left break-words">{jobs[index].customer}</div>
        </div>
        {/* Dots navigation */}
        <div className="flex justify-center gap-2 pb-4">
          {jobs.map((_, i) => (
            <button
              key={i}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === index ? 'bg-blue-600 scale-125' : 'bg-gray-300'}`}
              onClick={() => !isTransitioning && handleSlideChange(i)}
              aria-label={`Show job ${i + 1}`}
              disabled={isTransitioning}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 