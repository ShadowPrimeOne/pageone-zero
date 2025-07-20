import styles from '../../app/demo/health/health.module.css';

const features = [
  { icon: '📅', title: 'Open 7 Days', desc: 'Book any day, including weekends.' },
  { icon: '💳', title: 'All Health Funds', desc: 'We accept all major providers.' },
  { icon: '🚨', title: 'Emergency Care', desc: 'Same-day pain relief.' },
  { icon: '🧑‍⚕️', title: 'Gentle Team', desc: 'Caring, experienced staff.' },
  { icon: '🅿️', title: 'Free Parking', desc: 'Easy onsite parking.' },
];

export default function FeaturesSection() {
  return (
    <section className="w-full py-16 px-2 bg-transparent">
      <h2 className="text-2xl md:text-3xl font-bold text-[#13294B] mb-6 text-center">Why Choose BrightSmile Dental?</h2>
      <p className="text-center text-gray-600 mb-10 max-w-xl mx-auto">We make dental care easy, comfortable, and accessible for your whole family.</p>
      <div className="flex gap-6 overflow-x-auto md:grid md:grid-cols-5 md:gap-8 max-w-5xl mx-auto pb-2">
        {features.map((f, i) => (
          <div
            key={i}
            className={styles.glassCard + " min-w-[220px] md:min-w-0 flex flex-col items-center p-6 transition-transform hover:scale-105 hover:shadow-xl"}
            style={{ background: "rgba(255,255,255,0.85)" }}
          >
            <div className={styles.iconCircle + " mb-3 text-3xl"}>{f.icon}</div>
            <div className="font-bold text-[#13294B] mb-1 text-lg">{f.title}</div>
            <div className="text-gray-500 text-sm text-center">{f.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
} 