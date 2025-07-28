import React from 'react';
import Image from "next/image";
import { ShieldCheck, Truck, Star, MapPin, Phone, Mail, ChevronDown } from "lucide-react";
import GoogleReviewModule from "@/components/landing/GoogleReviewModule";
import LeadForm from "@/components/landing/LeadForm";
import styles from './page.module.css';
import ReadyBanner from './ReadyBanner';
import GoogleReviewBar from './GoogleReviewBar';
import QuoteFormSection from './QuoteFormSection';

const trustBadges = [
  { src: "/IMAGES/horse-transport/optimized/MagicMillionsLogo-320w.webp", alt: "Magic Millions Logo", width: 128, height: 40 },
  { src: "/IMAGES/horse-transport/optimized/InglisLogo-128w.webp", alt: "Inglis Logo", width: 128, height: 40 },
  { src: "/IMAGES/horse-transport/optimized/IRTLogo-128w.webp", alt: "IRT Logo", width: 128, height: 40 },
];

const services = [
  { icon: <Truck className="text-gold-600" />, label: "Interstate", desc: "Direct, overnight routes across Australia." },
  { icon: <MapPin className="text-gold-600" />, label: "On Demand", desc: "Flexible, on-demand movements for all needs." },
  { icon: <Star className="text-gold-600" />, label: "Sales Transport", desc: "Expert handling for major sales events." },
  { icon: <ShieldCheck className="text-gold-600" />, label: "International", desc: "Specialist import/export and quarantine." },
];

const faqs = [
  { q: "How do I request a quote?", a: "Use the form or call 1300 306 646 for a fast, tailored quote." },
  { q: "What areas do you service?", a: "Australia-wide: Sydney, Melbourne, Brisbane, Gold Coast, and more." },
  { q: "Is my horse insured during transport?", a: "Yes, all horses are covered by comprehensive transit insurance." },
  { q: "What makes your fleet premium?", a: "Custom-built trucks, low ramps, climate control, and expert handlers." },
];

const leadFormFields = [
  { name: "name", label: "Name", type: "text", required: true },
  { name: "phone", label: "Phone", type: "tel", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "from", label: "From (Pickup Location)", type: "text", required: true },
  { name: "to", label: "To (Drop-off Location)", type: "text", required: true },
  { name: "details", label: "Horse Details", type: "text", required: false },
];

export default function HorseTransportLanding() {
  return (
    <>
      <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <Image src="/IMAGES/horse-transport/horse-logo.svg" alt="Sydney Horse Transport Logo" width={48} height={48} className="rounded-full" style={{ width: 'auto', height: 'auto' }} priority />
          <span className={styles.logoText}>Sydney Horse Transport</span>
        </div>
        <a href="#quote" className={styles.cta}>Request Quote</a>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        <Image
          src="/IMAGES/horse-transport/Hero 2 real.webp"
          alt="Premium horse transport truck"
          fill
          priority
          className={styles.heroImg}
          style={{objectFit: 'cover', objectPosition: 'center'}}
          unoptimized={true}
        />
        <div className={styles.heroContent} style={{ position: 'absolute', top: 0, left: 0, right: 0, margin: '0 auto', zIndex: 2, width: '100%', maxWidth: 600, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
          <Image
            src="/IMAGES/horse-transport/optimized/TruckLogo-220w.webp"
            alt="Truck Logo"
            width={220}
            height={125}
            className={styles.truckLogo}
            style={{ width: 'auto', height: 'auto' }}
            priority
          />
          <div className={styles.heroHeadlineWrap}>
            <img src="/IMAGES/horse-transport/headline-brushstroke.svg" alt="" className={styles.heroBrushstroke} aria-hidden="true" />
            <h1 className={styles.heroTitle}>Australia's Premier Horse Transport</h1>
          </div>
          <p className={styles.heroSubtitle}>Trusted by trainers & owners for 25+ years</p>
        </div>
        <div className={styles.heroGradient} />
        {/* New bottom bar for CTAs and trust badges */}
        <div className={styles.heroBottomBar}>
          <div className={styles.heroActions}>
            <a href="#quote" className="px-6 py-3 rounded-full bg-[#C9A14A] text-[#0B2341] font-semibold shadow hover:bg-[#b28c3a] transition">Request Quote</a>
            <a href="tel:1300306646" className={`${styles.ctaPhone} px-6 py-3 rounded-full bg-[#0B2341] text-[#C9A14A] font-semibold shadow hover:bg-[#233b5e] transition flex items-center gap-2`}><Phone className="w-5 h-5" /> 1300 306 646</a>
          </div>
          <div className={styles.heroBadges}>
            {trustBadges.map(badge => (
              <Image
                key={badge.alt}
                src={badge.src}
                alt={badge.alt}
                width={badge.width}
                height={badge.height}
                className={styles.badgeImg}
                unoptimized={true}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Australia’s Top Owners & Trainers Choose Us */}
      <section className={styles.whyChooseUsSection}>
        <h2 className={styles.sectionTitle}>Why Australia’s Top Owners & Trainers Choose Us</h2>
        <div className={styles.whyChooseUsCards}>
          {/* Trusted by Champions */}
          <div className={styles.whyChooseUsCard}>
            <Image
  src="/IMAGES/horse-transport/optimized/TrustedbyChampions-640w.webp"
  alt="Trusted by Champions"
  width={400}
  height={185}
/>
            <div className={styles.whyChooseUsCardContent}>
              <h3 className={styles.whyChooseUsTitle}>Trusted by Champions</h3>
              <p className={styles.whyChooseUsText}>Preferred by leading trainers like Chris Waller. Proud to have transported legends like Winx.</p>
            </div>
          </div>
          {/* Sales & International Expertise */}
          <div className={styles.whyChooseUsCard}>
            <Image
  src="/IMAGES/horse-transport/optimized/International-640w.webp"
  alt="Sales and International"
  width={400}
  height={185}
/>
            <div className={styles.whyChooseUsCardContent}>
              <h3 className={styles.whyChooseUsTitle}>Sales & International Experts</h3>
              <p className={styles.whyChooseUsText}>Official carriers for Magic Millions, Inglis & IRT. Seamless domestic & global transport.</p>
            </div>
          </div>
          {/* Modern Fleet & Safety */}
          <div className={styles.whyChooseUsCard}>
            <Image
  src="/IMAGES/horse-transport/optimized/Herotruckhorsetransport-640w.webp"
  alt="Modern Fleet"
  width={400}
  height={185}
  style={{ width: 'auto', height: 'auto' }}
  unoptimized={true}
/>
            <div className={styles.whyChooseUsCardContent}>
              <h3 className={styles.whyChooseUsTitle}>Australia’s Most Modern Fleet</h3>
              <p className={styles.whyChooseUsText}>Custom-built trucks for ultimate comfort, safety, and hygiene. Low ramps, climate control, and meticulous care.</p>
            </div>
          </div>
          {/* Nationwide Coverage */}
          <div className={styles.whyChooseUsCard}>
            <Image
  src="/IMAGES/horse-transport/optimized/Australiawide-640w.webp"
  alt="Nation wide"
  width={400}
  height={185}
  style={{ width: 'auto', height: 'auto' }}
  unoptimized={true}
/>
            <div className={styles.whyChooseUsCardContent}>
              <h3 className={styles.whyChooseUsTitle}>Nationwide Coverage</h3>
              <p className={styles.whyChooseUsText}>Weekly direct routes connecting all major cities. Flexible pickups—Australia wide.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ready for Your Horse Banner */}
      </div>
      <ReadyBanner />
      <div className={styles.container}>

      {/* About Section */}
      <section className={styles.section + ' text-center'}>
        <h2 className={styles.sectionTitle}>About Us</h2>
        <div className={styles.sectionCard}>
          <Image
  src="/IMAGES/horse-transport/optimized/AboutUsImage-640w.webp"
  alt="Horse transport team"
  width={320}
  height={180}
  style={{ width: '100%', height: 'auto' }}
/>
          <p className={styles.sectionCardDesc}>Family owned, serving Sydney & NSW for 20+ years. We treat your horse like our own.</p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.faqSection}>
        <h2 className={styles.faqTitle}>FAQ – Trusted Transport for Elite Horses</h2>
        <p className={styles.faqSubtitle}>Quick answers to the questions you ask right before saying “yes.”</p>
        <div className={styles.faqList}>
          <div className={styles.faqCard}>
            <h3 className={styles.faqQ}>What areas do you cover?</h3>
            <p className={styles.faqA}><b>Australia-wide.</b> We run regular interstate routes between all capital cities and frequently service major sales, studs, and racing events. If your horse needs to move, we’ve likely done that run before.</p>
          </div>
          <div className={styles.faqCard}>
            <h3 className={styles.faqQ}>Is your team experienced with high-value race and sport horses?</h3>
            <p className={styles.faqA}>Yes — we specialize in transporting thoroughbreds. Our handlers are professionals with years of experience moving Group horses, stallions, yearlings, and competition athletes.</p>
          </div>
          <div className={styles.faqCard}>
            <h3 className={styles.faqQ}>What safety measures are in place during transport?</h3>
            <p className={styles.faqA}>Every float is purpose-built with full suspension, padded partitions, temperature control, and onboard CCTV. Horses are checked regularly, and we never overload or rush.</p>
          </div>
          <div className={styles.faqCard}>
            <h3 className={styles.faqQ}>Is the transport insured?</h3>
            <p className={styles.faqA}>Yes. We are <b>fully insured up to $25 million per animal</b>. This covers all in-transit risks and gives you complete peace of mind.</p>
          </div>
          <div className={styles.faqCard}>
            <h3 className={styles.faqQ}>Can I track my horse during the journey?</h3>
            <p className={styles.faqA}>Yes. We offer live tracking and regular check-ins, including photos or updates depending on the trip length and your preference.</p>
          </div>
          <div className={styles.faqCard}>
            <h3 className={styles.faqQ}>Do you handle loading if my horse is difficult?</h3>
            <p className={styles.faqA}>Absolutely. Our team is calm, skilled, and trained in low-stress, professional handling. No sedation, no shortcuts — just time, patience, and experience.</p>
          </div>
          <div className={styles.faqCard}>
            <h3 className={styles.faqQ}>Do you offer overnight or long-distance options?</h3>
            <p className={styles.faqA}>Yes — from short local transfers to long-haul trips with <b>overnight stabling</b>, rest stops, and feed/water breaks. Care standards match competition or stud prep quality.</p>
          </div>
          <div className={styles.faqCard}>
            <h3 className={styles.faqQ}>Can I speak to someone before I book?</h3>
            <p className={styles.faqA}>Of course. You’ll speak directly to someone with hands-on horse experience — not a call center. We’re available by phone 7 days a week.</p>
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <QuoteFormSection />

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerColLeft}>
            <div className={styles.footerBrand}>Sydney Horse Transport</div>
            <div className={styles.footerLocation}>Sydney, NSW</div>
            <div className={styles.footerABN}>ABN: 12 345 678 910</div>
          </div>
          <div className={styles.footerColRight}>
            <a href="mailto:info@sydneyhorsetransport.com.au" className={styles.footerLink}>info@sydneyhorsetransport.com.au</a>
            <a href="tel:0412345678" className={styles.footerLink}>0412 345 678</a>
            <div className={styles.footerPolicyLinks}>
              <a href="#" className={styles.footerPolicy}>Privacy Policy</a>
              <a href="#" className={styles.footerPolicy}>Terms</a>
            </div>
          </div>
        </div>
      </footer>
      <GoogleReviewBar />
      </div>
    </>
  );
}
