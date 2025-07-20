import styles from '../../app/demo/health/health.module.css';

export default function StickyCTA() {
  return (
    <div className="fixed bottom-0 left-0 w-full z-50 block md:hidden">
      <div className={styles.glassCard + " flex items-center justify-center py-3 px-4 shadow-lg"}>
        <a href="tel:1234567890" className={styles.ctaButton + " w-full text-center font-bold text-lg rounded-xl py-3 px-6 shadow transition-all animate-pulse hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-[#FFD600]"}>
          📞 Call Now
        </a>
      </div>
    </div>
  );
} 