import React, { useState } from 'react';
import type { Lead, LeadStatus, Ambassador } from './types';
import AgreementModal from './AgreementModal';

interface LeadDrawerProps {
  ambassadors: Ambassador[];
  lead: Lead | null;
  onClose: () => void;
  onChange: (field: keyof Lead, value: Lead[keyof Lead]) => void;
  onConvertToClient: () => void;
  onAgreementChange: (fields: Partial<Lead>) => void;
}

const statusOptions: LeadStatus[] = ['Uncontacted', 'Welcome Email', 'Appointment Set', 'Converted'];
const appointmentTypes = [
  { value: 'call', label: 'Call' },
  { value: 'zoom', label: 'Zoom' },
  { value: 'in-person', label: 'In Person' },
];

export const LeadDrawer: React.FC<LeadDrawerProps> = ({ lead, onClose, onChange, onConvertToClient, onAgreementChange, ambassadors }) => {
  const [agreementModalOpen, setAgreementModalOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  if (!lead) return null;

  // Agreement status
  const agreementStatus = lead.signatureName ? 'Signed' : 'Awaiting Signature';

  const handleSignAgreement = (signature: string) => {
    onAgreementChange({
      signatureName: signature,
      agreementDate: new Date().toISOString(),
      trialAgreed: true,
    });
    setAgreementModalOpen(false);
    setShowSuccess(true);
    // TODO: Store signature SVG/image, email link, Supabase, PDF export
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1" onClick={onClose} />
      <div className="w-full max-w-md bg-white h-full shadow-2xl border-l border-gray-200 flex flex-col p-8 relative animate-slide-in-right overflow-y-auto">
        <button type="button" className="absolute top-4 right-4 text-gray-400 hover:text-gray-600" onClick={onClose}>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <input className="font-bold text-2xl bg-transparent border-b border-gray-200 focus:border-blue-400 outline-none flex-1" value={lead.name} onChange={e => onChange('name', e.target.value)} />
          <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ml-2 ${lead.status === 'Uncontacted' ? 'bg-blue-100 text-blue-800' : lead.status === 'Welcome Email' ? 'bg-yellow-100 text-yellow-800' : lead.status === 'Appointment Set' ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700'}`}>{lead.status}</span>
        </h2>
        {/* DEBUG: Show current status and trialAgreed */}
        <div className="mb-2 text-xs text-gray-500">DEBUG: status = &#39;{lead.status}&#39;, agreementStatus = {agreementStatus}</div>
        <div className="mb-2 text-xs">
          Agreement Status: <span className={agreementStatus === 'Signed' ? 'text-green-700 font-semibold' : 'text-yellow-700 font-semibold'}>{agreementStatus}</span>
          {lead.signatureName && lead.agreementDate && (
            <span className="ml-2 text-xs text-gray-400">({new Date(lead.agreementDate).toLocaleDateString()})</span>
          )}
        </div>
        <div className="space-y-4">
            <select
              className="w-full px-4 py-2 rounded-lg border border-gray-200 text-gray-900"
              value={lead.ambassador_id || ''}
              onChange={e => onChange('ambassador_id', e.target.value)}
            >
              <option value="">Assign Ambassador</option>
              {ambassadors.map(a => (
                <option key={a.id} value={a.id}>{a.name} ({a.email})</option>
              ))}
            </select>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Email</label>
            <input className="w-full px-4 py-2 rounded-lg border border-gray-200 text-gray-900" value={lead.email} onChange={e => onChange('email', e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Phone</label>
            <input className="w-full px-4 py-2 rounded-lg border border-gray-200 text-gray-900" value={lead.phone} onChange={e => onChange('phone', e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Business</label>
            <input className="w-full px-4 py-2 rounded-lg border border-gray-200 text-gray-900" value={lead.business || ''} onChange={e => onChange('business', e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Source</label>
            <input className="w-full px-4 py-2 rounded-lg border border-gray-200 text-gray-900" value={lead.source || ''} onChange={e => onChange('source', e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Notes</label>
            <textarea className="w-full px-4 py-2 rounded-lg border border-gray-200 text-gray-900" value={lead.notes || ''} onChange={e => onChange('notes', e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Status</label>
            <select className="w-full px-4 py-2 rounded-lg border border-gray-200 text-gray-900" value={lead.status} onChange={e => onChange('status', e.target.value as LeadStatus)}>
              {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="flex gap-2">
            <input type="datetime-local" className="flex-1 px-4 py-2 rounded-lg border border-gray-200 text-gray-900" value={lead.appointmentDate || ''} onChange={e => onChange('appointmentDate', e.target.value)} />
            <select className="flex-1 px-4 py-2 rounded-lg border border-gray-200 text-gray-900" value={lead.appointmentType || 'call'} onChange={e => onChange('appointmentType', e.target.value)}>
              {appointmentTypes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" checked={!!lead.trialAgreed} onChange={e => onChange('trialAgreed', e.target.checked)} />
            <span className="text-gray-900 font-medium">Trial Agreed</span>
          </label>
          {/* Agreement/Convert Workflow */}
          {!lead.signatureName && (
            <span
              className="block w-full text-center mt-4 text-blue-700 underline font-semibold cursor-pointer hover:text-blue-900 transition-colors"
              onClick={() => setAgreementModalOpen(true)}
              role="button"
              tabIndex={0}
            >
              Sign Agreement
            </span>
          )}
          {lead.signatureName && lead.status === 'Converted' && (
            <span
              className="block w-full text-center mt-4 text-blue-700 underline font-semibold cursor-pointer hover:text-blue-900 transition-colors"
              onClick={onConvertToClient}
              role="button"
              tabIndex={0}
            >
              Convert to Client
            </span>
          )}
          <div className="flex gap-2 mt-2">
            <span className={`px-2 py-1 rounded text-xs font-semibold ${lead.lpReady ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>LP Ready</span>
            <span className={`px-2 py-1 rounded text-xs font-semibold ${lead.adwordsDeployed ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>Adwords Deployed</span>
            <span className={`px-2 py-1 rounded text-xs font-semibold ${lead.gmbVerified ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>GMB Verified</span>
          </div>
        </div>
        <AgreementModal
          isOpen={agreementModalOpen}
          onClose={() => setAgreementModalOpen(false)}
          onSign={handleSignAgreement}
        />
        {showSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-gray-200 p-8 relative">
              <button type="button" className="absolute top-4 right-4 text-gray-400 hover:text-gray-600" onClick={() => setShowSuccess(false)}>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              <h2 className="text-2xl font-bold mb-6 text-center text-green-700">Agreement Signed</h2>
              <p className="text-gray-700 mb-8 text-center">Agreement signed. Onboarding can begin.</p>
              <button className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold" onClick={() => setShowSuccess(false)}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 