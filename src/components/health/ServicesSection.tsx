import styles from '../../app/demo/health/health.module.css';

const services = [
  { icon: '🦷', label: 'Check-ups', desc: 'Routine exams & cleans for all ages.' },
  { icon: '⚡', label: 'Emergency', desc: 'Same-day pain relief & urgent care.' },
  { icon: '😁', label: 'Whitening', desc: 'Brighten your smile safely.' },
  { icon: '🦷', label: 'Braces & Aligners', desc: 'Straighten teeth discreetly.' },
  { icon: '👶', label: 'Kids’ Dentistry', desc: 'Gentle care for little ones.' },
  { icon: '🦷', label: 'Implants', desc: 'Restore missing teeth naturally.' },
];

export default function ServicesSection() {
  return (
    <section className="max-w-5xl mx-auto py-16 px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-[#13294B] mb-10 text-center">Our Dental Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {services.map((s, i) => (
          <div key={i} className={styles.glassCard + " flex flex-col items-center p-7"}>
            <div className={styles.iconCircle + " mb-3"} aria-hidden="true">{s.icon}</div>
            <div className="font-semibold text-[#13294B] mb-1 text-lg">{s.label}</div>
            <div className="text-gray-500 text-sm text-center">{s.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
} 