import React, { useState } from 'react';

interface ContactModuleProps {
  address: string;
  abn: string;
  phone: string;
  email: string;
  mapEmbedUrl: string;
  onCallbackRequest?: (values: { name: string; phone: string }) => void;
}

const ContactModule: React.FC<ContactModuleProps> = ({ address, abn, phone, email, mapEmbedUrl, onCallbackRequest }) => {
  const [form, setForm] = useState({ name: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    onCallbackRequest?.(form);
  };

  return (
    <section className="w-full max-w-5xl mx-auto my-12 px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
      {/* Contact Info */}
      <div className="flex flex-col justify-between bg-white/90 rounded-3xl shadow-xl p-8 md:p-10 mb-6 md:mb-0">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-4">How to Contact Us</h2>
          <p className="text-gray-700 mb-6 text-base sm:text-lg">We&apos;re here to help—reach out for fast, friendly service or request a call back and we&apos;ll get in touch ASAP.</p>
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-2 text-gray-800"><span className="font-semibold">Address:</span> <span>{address}</span></div>
            <div className="flex items-center gap-2 text-gray-800"><span className="font-semibold">ABN:</span> <span>{abn}</span></div>
            <div className="flex items-center gap-2 text-gray-800"><span className="font-semibold">Phone:</span> <a href={`tel:${phone}`} className="text-blue-700 underline font-medium hover:text-blue-900">{phone}</a></div>
            <div className="flex items-center gap-2 text-gray-800"><span className="font-semibold">Email:</span> <a href={`mailto:${email}`} className="text-blue-700 underline font-medium hover:text-blue-900">{email}</a></div>
          </div>
        </div>
        {/* Fast Callback Form */}
        <form className="mt-6 bg-blue-50 rounded-2xl p-6 shadow flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="text-lg font-semibold text-blue-800 mb-2">Request a Fast Call Back</div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-400"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">Best Contact Number</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-400"
              value={form.phone}
              onChange={handleChange}
              placeholder="e.g. 0412 345 678"
            />
          </div>
          <button type="submit" className="mt-2 w-full py-3 rounded-lg bg-blue-700 text-white font-bold text-lg shadow hover:bg-blue-800 transition-all">Request Call Back</button>
          {submitted && <div className="text-green-600 text-sm mt-2">Thank you! We&apos;ll call you back as soon as possible.</div>}
        </form>
      </div>
      {/* Map */}
      <div className="flex flex-col justify-center">
        <div className="rounded-3xl overflow-hidden shadow-xl border border-gray-200 h-full min-h-[320px]">
          <iframe
            src={mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: 320 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Our Location"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default ContactModule; 