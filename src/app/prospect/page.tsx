"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';

interface ProspectFormData {
  business_name: string;
  contact_name: string;
  position: string;
  phone: string;
  website_url: string;
  gmb_status: string;
  website_quality: string;
  advertising_status: string[];
  ad_quality: string;
  facebook_active: string;
  contact_method: string[];
  lead_capacity: string;
  opportunity_summary: string;
  ambassador: string;
}

const initialFormData: ProspectFormData = {
  business_name: '',
  contact_name: '',
  position: '',
  phone: '',
  website_url: '',
  gmb_status: '',
  website_quality: '',
  advertising_status: [],
  ad_quality: '',
  facebook_active: '',
  contact_method: [],
  lead_capacity: '',
  opportunity_summary: '',
  ambassador: '',
};

export default function ProspectPage() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<ProspectFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ambassadorName = searchParams.get('user');
    if (ambassadorName) {
      setFormData(prev => ({ ...prev, ambassador: ambassadorName }));
    }
  }, [searchParams]);

  const handleInputChange = (field: keyof ProspectFormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleContactMethodChange = (method: string) => {
    setFormData(prev => {
      const current = prev.contact_method || [];
      if (current.includes(method)) {
        return { ...prev, contact_method: current.filter(m => m !== method) };
      } else {
        return { ...prev, contact_method: [...current, method] };
      }
    });
  };

  const handleAdvertisingStatusChange = (status: string) => {
    setFormData(prev => {
      const current = prev.advertising_status || [];
      if (current.includes(status)) {
        return { ...prev, advertising_status: current.filter(s => s !== status) };
      } else {
        return { ...prev, advertising_status: [...current, status] };
      }
    });
  };

  const validateForm = (): boolean => {
    if (!formData.business_name.trim()) {
      setError('Business Name is required');
      return false;
    }
    if (!formData.opportunity_summary.trim()) {
      setError('Opportunity Summary is required');
      return false;
    }
    if (!formData.ambassador.trim()) {
      setError('Ambassador information is missing from URL');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const { error: insertError } = await supabase
        .from('prospect_leads')
        .insert([{
          ...formData,
          contact_method: formData.contact_method, // array of strings
          advertising_status: formData.advertising_status, // array of strings
          created_at: new Date().toISOString(),
        }]);

      if (insertError) throw insertError;

      setSubmitted(true);
      setFormData(initialFormData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit lead');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Lead Submitted!</h2>
          <p className="text-gray-600 mb-6">Thank you for submitting this prospect. The lead has been saved and will be reviewed.</p>
          <button
            onClick={() => setSubmitted(false)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Submit Another Lead
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Prospect Lead Form</h1>
            {formData.ambassador && (
              <p className="text-lg text-blue-600">Welcome, {formData.ambassador}!</p>
            )}
            <p className="text-gray-600">Submit qualified prospect information</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-600 font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Business Name - Required */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Business Name *
              </label>
              <input
                type="text"
                required
                value={formData.business_name}
                onChange={(e) => handleInputChange('business_name', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                placeholder="Enter business name"
              />
            </div>

            {/* Contact Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Contact Name
              </label>
              <input
                type="text"
                value={formData.contact_name}
                onChange={(e) => handleInputChange('contact_name', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                placeholder="Enter contact person's name"
              />
            </div>

            {/* Position */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Position
              </label>
              <input
                type="text"
                value={formData.position}
                onChange={(e) => handleInputChange('position', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                placeholder="Enter contact's position (e.g. Owner, Manager)"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                placeholder="Enter phone number"
              />
            </div>

            {/* Website URL */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Website URL
              </label>
              <input
                type="url"
                value={formData.website_url}
                onChange={(e) => handleInputChange('website_url', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                placeholder="https://example.com"
              />
            </div>

            {/* GMB Status */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Google My Business Status
              </label>
              <select
                value={formData.gmb_status}
                onChange={(e) => handleInputChange('gmb_status', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              >
                <option value="">Select GMB status</option>
                <option value="Yes">Yes</option>
                <option value="Unclaimed">Unclaimed</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* Website Quality */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Website Quality
              </label>
              <select
                value={formData.website_quality}
                onChange={(e) => handleInputChange('website_quality', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              >
                <option value="">Select website quality</option>
                <option value="Good">Good</option>
                <option value="Outdated">Outdated</option>
                <option value="None">None</option>
              </select>
            </div>

            {/* Currently Advertising? - Multi-checkbox */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Currently Advertising? (select all that apply)
              </label>
              <div className="flex flex-wrap gap-4">
                {['Yes (Google)', 'Yes (Meta)', 'No', 'Unsure'].map(status => (
                  <label key={status} className="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      value={status}
                      checked={formData.advertising_status.includes(status)}
                      onChange={() => handleAdvertisingStatusChange(status)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-400"
                    />
                    <span>{status}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Ad Quality */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Ad Quality (if any)
              </label>
              <select
                value={formData.ad_quality}
                onChange={(e) => handleInputChange('ad_quality', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              >
                <option value="">Select ad quality</option>
                <option value="Good">Good</option>
                <option value="Bad">Bad</option>
                <option value="No Ads">No Ads</option>
              </select>
            </div>

            {/* Facebook Active */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Facebook Active?
              </label>
              <select
                value={formData.facebook_active}
                onChange={(e) => handleInputChange('facebook_active', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              >
                <option value="">Select Facebook status</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Not Found">Not Found</option>
              </select>
            </div>

            {/* Contact Method - Multi-checkbox */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Contact Method (select all that apply)
              </label>
              <div className="flex flex-wrap gap-4">
                {['Phone', 'Messenger', 'Form', 'None'].map(method => (
                  <label key={method} className="inline-flex items-center gap-2">
                    <input
                      type="checkbox"
                      value={method}
                      checked={formData.contact_method.includes(method)}
                      onChange={() => handleContactMethodChange(method)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-400"
                    />
                    <span>{method}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Lead Capacity */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Can They Handle More Leads?
              </label>
              <select
                value={formData.lead_capacity}
                onChange={(e) => handleInputChange('lead_capacity', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              >
                <option value="">Select lead capacity</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Unknown">Unknown</option>
              </select>
            </div>

            {/* Opportunity Summary - Required */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Opportunity Summary *
              </label>
              <textarea
                required
                rows={4}
                value={formData.opportunity_summary}
                onChange={(e) => handleInputChange('opportunity_summary', e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                placeholder="Describe the opportunity, pain points, and potential fit..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Lead'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
