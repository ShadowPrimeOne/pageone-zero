import React, { useState } from 'react';
import styles from '../../app/demo/health/health.module.css';

export default function BookingForm() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', date: '', notes: '' });
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log('Booking:', form); // TODO: Integrate backend
    alert('Thank you! We will contact you soon.');
  }
  return (
    <section className="max-w-md mx-auto py-16 px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-[#13294B] mb-2 text-center">Book Your Visit in 60 Seconds</h2>
      <p className="text-gray-600 text-center mb-6">Prefer a call? Call us now for immediate availability.</p>
      <form onSubmit={handleSubmit} className={styles.glassCard + ' flex flex-col gap-4 p-8 border-2 border-[#FFD600]'}>
        <input className="rounded-lg border-2 border-[#FFD600] px-4 py-3 text-gray-900 font-semibold placeholder-gray-400 focus:ring-2 focus:ring-[#FFD600] text-lg" name="name" type="text" placeholder="Full Name" value={form.name} onChange={handleChange} required />
        <input className="rounded-lg border-2 border-[#FFD600] px-4 py-3 text-gray-900 font-semibold placeholder-gray-400 focus:ring-2 focus:ring-[#FFD600] text-lg" name="phone" type="tel" placeholder="Phone" value={form.phone} onChange={handleChange} required />
        <input className="rounded-lg border-2 border-[#FFD600] px-4 py-3 text-gray-900 font-semibold placeholder-gray-400 focus:ring-2 focus:ring-[#FFD600] text-lg" name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input className="rounded-lg border-2 border-[#FFD600] px-4 py-3 text-gray-900 font-semibold placeholder-gray-400 focus:ring-2 focus:ring-[#FFD600] text-lg" name="date" type="date" placeholder="Preferred Date" value={form.date} onChange={handleChange} />
        <textarea className="rounded-lg border-2 border-[#FFD600] px-4 py-3 text-gray-900 font-semibold placeholder-gray-400 focus:ring-2 focus:ring-[#FFD600] text-lg" name="notes" placeholder="Notes (optional)" value={form.notes} onChange={handleChange} rows={2} />
        <button type="submit" className={styles.ctaButton + ' w-full py-3 rounded-xl font-bold text-lg shadow-lg mt-2'}>Book Appointment Now</button>
      </form>
      <div className="text-xs text-gray-400 text-center mt-2">We respect your privacy. Your info is never shared.</div>
    </section>
  );
} 