"use client";

import HeroSection from '../../../components/health/HeroSection';
import ServicesSection from '../../../components/health/ServicesSection';
import FeaturesSection from '../../../components/health/FeaturesSection';
import AboutSection from '../../../components/health/AboutSection';
import TestimonialsSection from '../../../components/health/TestimonialsSection';
import BookingForm from '../../../components/health/BookingForm';
import StickyCTA from '../../../components/health/StickyCTA';
import FooterSection from '../../../components/health/FooterSection';
import styles from './health.module.css';

export default function HealthLandingPage() {
  return (
    <div className={styles.healthLanding + ' bg-[#F5F7FA] min-h-screen flex flex-col'}>
      <HeroSection />
      <FeaturesSection />
      <ServicesSection />
      <AboutSection />
      <TestimonialsSection />
      <BookingForm />
      <FooterSection />
      <StickyCTA />
    </div>
  );
} 