import React from 'react';
import type { Lead, LeadStatus, Ambassador } from './types';

interface LeadModalProps {
  ambassadors: Ambassador[];
  isOpen: boolean;
  onClose: () => void;
  onSave: (lead: Omit<Lead, 'id'>) => void;
  form: Omit<Lead, 'id'>;
  setForm: (f: Omit<Lead, 'id'>) => void;
  isEdit?: boolean;
}

const statusOptions: LeadStatus[] = ['Uncontacted', 'Welcome Email', 'Appointment Set', 'Converted'];
const appointmentTypes = [
  { value: 'call', label: 'Call' },
  { value: 'zoom', label: 'Zoom' },
  { value: 'in-person', label: 'In Person' },
];

export const LeadModal: React.FC<LeadModalProps> = ({ isOpen, onClose, onSave, form, setForm, isEdit, ambassadors }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <form
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-gray-200 p-8 relative"
        onSubmit={e => { e.preventDefault(); onSave(form); }}
      >
        <button type="button" className="absolute top-4 right-4 text-gray-400 hover:text-gray-600" onClick={onClose}>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center">{isEdit ? 'Edit Lead' : 'Add Lead'}</h2>
        <div className="space-y-4">
          <select
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-400 text-gray-900"
            value={form.ambassador_id || ''}
            onChange={e => setForm({ ...form, ambassador_id: e.target.value })}
          >
            <option value="">Assign Ambassador</option>
            {ambassadors.map(a => (
              <option key={a.id} value={a.id}>{a.name} ({a.email})</option>
            ))}
          </select>
          <input className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-400 text-gray-900" placeholder="Name" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
          <input className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-400 text-gray-900" placeholder="Email" type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          <input className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-400 text-gray-900" placeholder="Phone" required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
          <input className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-400 text-gray-900" placeholder="Business" value={form.business || ''} onChange={e => setForm({ ...form, business: e.target.value })} />
          <input className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-400 text-gray-900" placeholder="Source" value={form.source || ''} onChange={e => setForm({ ...form, source: e.target.value })} />
          <textarea className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-400 text-gray-900" placeholder="Notes" value={form.notes || ''} onChange={e => setForm({ ...form, notes: e.target.value })} />
          <select className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-400 text-gray-900" value={form.status} onChange={e => setForm({ ...form, status: e.target.value as LeadStatus })}>
            {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <div className="flex gap-2">
            <input type="datetime-local" className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-400 text-gray-900" value={form.appointmentDate || ''} onChange={e => setForm({ ...form, appointmentDate: e.target.value })} />
            <select className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-400 text-gray-900" value={form.appointmentType || 'call'} onChange={e => setForm({ ...form, appointmentType: e.target.value as any })}>
              {appointmentTypes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600" checked={!!form.trialAgreed} onChange={e => setForm({ ...form, trialAgreed: e.target.checked })} />
            <span className="text-gray-900 font-medium">Trial Agreed</span>
          </label>
          <div className="flex gap-2">
            <span className={`px-2 py-1 rounded text-xs font-semibold ${form.lpReady ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>LP Ready</span>
            <span className={`px-2 py-1 rounded text-xs font-semibold ${form.adwordsDeployed ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>Adwords Deployed</span>
            <span className={`px-2 py-1 rounded text-xs font-semibold ${form.gmbVerified ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>GMB Verified</span>
          </div>
        </div>
        <button type="submit" className="mt-8 w-full py-3 rounded-lg !bg-blue-600 !text-white !border !border-blue-600 font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 hover:!bg-blue-700 text-lg">{isEdit ? 'Save Changes' : 'Add Lead'}</button>
      </form>
    </div>
  );
}; 