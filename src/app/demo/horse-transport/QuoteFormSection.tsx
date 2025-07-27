"use client";
import React from "react";
import LeadForm from "@/components/landing/LeadForm";

export default function QuoteFormSection() {
  return (
    <section id="quote" className="max-w-3xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold text-blue-900 mb-4 text-center">Get Your Instant Quote</h2>
      <LeadForm
        fields={[
          { name: "name", label: "Your Name", type: "text" },
          { name: "phone", label: "Phone Number", type: "tel" },
          { name: "pickup", label: "Pickup Suburb", type: "text" },
          { name: "dropoff", label: "Drop-off Suburb", type: "text" },
          { name: "horse", label: "Horse Details", type: "text" },
          { name: "date", label: "Preferred Date", type: "date" }
        ]}
        onSubmit={(values) => {
          // TODO: Integrate with backend or email
          alert("Thank you! We will contact you soon.");
        }}
      />
    </section>
  );
}
