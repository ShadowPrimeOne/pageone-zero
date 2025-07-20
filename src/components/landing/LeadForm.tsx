"use client";

import React, { useState } from 'react';

interface Field {
  label: string;
  type: string;
  name: string;
  options?: string[];
}
interface LeadFormProps {
  fields: Field[];
  onSubmit: (values: Record<string, string>) => void;
}

// READY FOR PROP MAPPING
const LeadForm: React.FC<LeadFormProps> = ({ fields, onSubmit }) => {
  const [values, setValues] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setValues(v => ({ ...v, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <form className="w-full max-w-lg mx-auto bg-white rounded-xl shadow p-6 my-6" onSubmit={handleSubmit}>
      <div className="space-y-4">
        {fields.map((field, i) => (
          <div key={i}>
            <label className="block text-sm font-semibold mb-1" htmlFor={field.name}>{field.label}</label>
            {field.type === 'select' ? (
              <select
                id={field.name}
                name={field.name}
                className="w-full border rounded p-2"
                onChange={handleChange}
                value={values[field.name] || ''}
              >
                <option value="">Select...</option>
                {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            ) : (
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                className="w-full border rounded p-2"
                onChange={handleChange}
                value={values[field.name] || ''}
              />
            )}
          </div>
        ))}
      </div>
      <button type="submit" className="mt-6 w-full py-3 rounded-lg !bg-blue-600 !text-white !border !border-blue-600 font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 hover:!bg-blue-700 text-lg">Submit</button>
    </form>
  );
};

export default LeadForm; 