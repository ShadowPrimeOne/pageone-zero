import styles from '../../app/demo/health/health.module.css';

export default function AboutSection() {
  return (
    <section className="max-w-3xl mx-auto py-16 px-4 flex flex-col items-center text-center">
      <div className={styles.glassCard + " p-8 w-full flex flex-col items-center"}>
        <div className={styles.iconCircle + " mb-4"}>
          <span className="text-4xl">🦷</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-[#13294B] mb-2">About BrightSmile Dental</h2>
        <hr className="w-16 border-t-4 border-[#FFD600] rounded-full mb-4" />
        <p className="text-gray-700 text-lg mb-2">
          BrightSmile Dental has served Suburbia since 2005. Our caring team delivers gentle, modern dentistry for all ages. We’re committed to making every visit comfortable, convenient, and stress-free.
        </p>
        <p className="text-gray-500 text-base">We welcome new patients and offer same-day appointments for your convenience.</p>
      </div>
    </section>
  );
} 