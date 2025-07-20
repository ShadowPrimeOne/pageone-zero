import Image from "next/image";
import styles from '../../app/demo/health/health.module.css';

export default function HeroSection() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroOverlay}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroHeadline}>
            New Patients Welcome — <span className={styles.accent}>Same Day Appointments</span>
          </h1>
          <p className={styles.heroSub}>
            Modern family dental care, trusted by Suburbia. Book today, be seen today.
          </p>
          <div className={styles.heroCTA}>
            <a href="#booking" className={styles.primaryBtn}>
              Book Appointment
            </a>
            <a href="tel:1234567890" className={styles.secondaryBtn}>
              Call Now
            </a>
          </div>
          <p className={styles.heroTrust}>
            ⭐⭐⭐⭐⭐ Rated by local families · All health funds accepted
          </p>
        </div>
      </div>
      <Image
        src="/IMAGES/Dentist/lark-dental-services-smiling-family-great-teeth.jpg"
        alt="Smiling family dental patients"
        fill
        priority
        className={styles.heroImage}
        sizes="100vw"
      />
    </section>
  );
} 