import styles from '../../app/demo/health/health.module.css';

const testimonials = [
  {
    quote: 'Had a toothache, was seen same day. Friendly staff!',
    name: 'Jane M.',
    icon: '👩',
  },
  {
    quote: 'Took care of my daughter’s braces—gentle and caring.',
    name: 'Paul T.',
    icon: '👨',
  },
  {
    quote: 'Great with kids and adults alike. Highly recommend!',
    name: 'Samira K.',
    icon: '🧕',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="max-w-5xl mx-auto py-16 px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-[#13294B] mb-10 text-center">What Our Patients Say</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <div key={i} className={styles.glassCard + " flex flex-col items-center text-center p-8"}>
            <div className={styles.iconCircle + " mb-3"}>{t.icon}</div>
            <div className="text-[#13294B] font-semibold mb-2 text-lg">{t.quote}</div>
            <div className="flex items-center gap-1 mb-1">
              {Array.from({ length: 5 }).map((_, j) => (
                <span key={j} className="text-yellow-400 text-lg">★</span>
              ))}
            </div>
            <div className="text-gray-500 text-sm">{t.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
} 