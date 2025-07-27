import React from 'react';
import styles from './ReadyBanner.module.css';
import { BadgeCheck } from 'lucide-react';

export default function ReadyBanner() {
  return (
    <section className={styles.readyBanner}>
      <div className={styles.readyBannerInner}>
        <span className={styles.readyBannerIcon}>
          <BadgeCheck size={36} color="#C9A14A" strokeWidth={2.5} />
        </span>
        <div className={styles.readyBannerText}>
          <div className={styles.readyBannerTitle}>
            Ready for Your Horse
          </div>
          <div className={styles.readyBannerDesc}>
            Join 1,000+ owners who trust us for safe, reliable transport. Fast quotes, real service.
          </div>
        </div>
        <div className={styles.readyBannerCTA}>
          <button className={styles.readyBannerButton}>
            Get Your Free Quote
          </button>
        </div>
      </div>
    </section>
  );
}
