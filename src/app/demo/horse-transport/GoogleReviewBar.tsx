import React from "react";
import styles from "./GoogleReviewBar.module.css";

const reviews = [
  { name: "Sarah T.", text: "Incredible service—my horse arrived calm and happy. Highly recommend!" },
  { name: "James W.", text: "Professional, reliable, and friendly team. The only transport I trust." },
  { name: "Emily B.", text: "Booking was easy and the updates gave me peace of mind. Thank you!" },
  { name: "Michael R.", text: "Trucks are spotless and staff truly care about the horses. 5 stars!" },
  { name: "Lisa K.", text: "Prompt, courteous, and very knowledgeable. Will use again for sure." },
  { name: "David L.", text: "Best horse transport in Sydney. My trainer recommended them—now I do too!" },
  { name: "Rebecca S.", text: "Superb communication from start to finish. My mare was in great hands." },
  { name: "Tom M.", text: "Arrived right on time and handled my nervous gelding perfectly." },
  { name: "Jessica F.", text: "So grateful for the care and attention. The whole process was stress-free." },
  { name: "Anna P.", text: "Five-star experience! Wouldn’t trust anyone else with my horses." },
];

function GoogleIcon() {
  // Google "G" SVG (official colors)
  return (
    <svg className={styles.googleIcon} viewBox="0 0 24 24" aria-label="Google logo">
      <g>
        <path fill="#4285F4" d="M12 11.8v3.4h4.8c-.2 1.3-1.5 3.7-4.8 3.7-2.9 0-5.3-2.4-5.3-5.3s2.4-5.3 5.3-5.3c1.6 0 2.7.7 3.3 1.3l2.3-2.2C16.1 6.4 14.2 5.3 12 5.3 7.6 5.3 4 8.9 4 13.2s3.6 7.9 8 7.9c4.6 0 7.6-3.2 7.6-7.8 0-.5-.1-.9-.2-1.3H12z"/>
        <path fill="#34A853" d="M12 21.1c2.4 0 4.4-.8 5.9-2.2l-2.8-2.2c-.8.5-1.7.9-3.1.9-2.4 0-4.4-1.6-5.1-3.7H4.1v2.3C5.6 19.2 8.6 21.1 12 21.1z"/>
        <path fill="#FBBC05" d="M6.9 13.9c-.2-.5-.3-1.1-.3-1.7s.1-1.2.3-1.7V8.2H4.1C3.4 9.6 3 11.3 3 13.2s.4 3.6 1.1 5l2.8-2.2z"/>
        <path fill="#EA4335" d="M12 7.8c1.3 0 2.2.6 2.7 1.1l2-2C15.5 5.8 13.9 5 12 5c-3.4 0-6.4 2-7.9 4.9l2.8 2.2c.7-2.1 2.7-3.7 5.1-3.7z"/>
      </g>
    </svg>
  );
}

function Stars() {
  return (
    <span className={styles.stars} aria-label="5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 20 20" fill="#fbbc04" aria-hidden="true"><polygon points="10,1.5 12.7,7.2 19,7.8 14,12.2 15.5,18.5 10,15.3 4.5,18.5 6,12.2 1,7.8 7.3,7.2"/></svg>
      ))}
    </span>
  );
}

function ReviewCard({ name, text }: { name: string; text: string }) {
  return (
    <div className={styles.reviewCard}>
      <GoogleIcon />
      <span className={styles.reviewer}>{name}</span>
      <Stars />
      <span className={styles.reviewText}>{text}</span>
    </div>
  );
}

export default function GoogleReviewBar() {
  // Duplicate reviews for seamless infinite scroll
  const reviewSet = [...reviews, ...reviews];
  return (
    <div className={styles.reviewBar} role="region" aria-label="Google reviews">
      <div className={styles.reviewScroller}>
        {reviewSet.map((r, i) => (
          <ReviewCard key={i} name={r.name} text={r.text} />
        ))}
      </div>
    </div>
  );
}
