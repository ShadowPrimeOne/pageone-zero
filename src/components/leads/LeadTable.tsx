import React from 'react';
import { Lead } from './types';
import { useUser } from '@/lib/UserContext';

interface LeadTableProps {
  leads: Lead[];
  onEdit: (lead: Lead) => void;
  onDelete: (lead: Lead) => void;
  onAssign: (lead: Lead) => void;
  onSelect: (lead: Lead) => void;
}

const statusColors: Record<string, string> = {
  New: 'bg-blue-100 text-blue-800',
  Contacted: 'bg-yellow-100 text-yellow-800',
  Onboarded: 'bg-green-100 text-green-800',
  Lost: 'bg-red-100 text-red-800',
};

const LeadTable: React.FC<LeadTableProps> = ({ leads, onEdit, onDelete, onAssign, onSelect }) => {
  const user = useUser();

  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-3 py-2 text-left text-xs font-semibold text-gray-900">Name</th>
            <th className="px-3 py-2 text-left text-xs font-semibold text-gray-900">Email</th>
            <th className="px-3 py-2 text-left text-xs font-semibold text-gray-900">Phone</th>
            <th className="px-3 py-2 text-left text-xs font-semibold text-gray-900">Status</th>
            <th className="px-3 py-2 text-left text-xs font-semibold text-gray-900">Source</th>
            <th className="px-3 py-2 text-left text-xs font-semibold text-gray-900">Assigned To</th>
            <th className="px-3 py-2 text-center text-xs font-semibold text-gray-900">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {leads.map((lead) => (
            <tr key={lead.id} className="hover:bg-blue-50 cursor-pointer" onClick={() => onSelect(lead)}>
              <td className="px-3 py-2 whitespace-nowrap font-medium text-gray-900">{lead.name}</td>
              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{lead.email}</td>
              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{lead.phone}</td>
              <td className="px-3 py-2 whitespace-nowrap">
                <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${statusColors[lead.status] || 'bg-gray-100 text-gray-900'}`}>{lead.status}</span>
              </td>
              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{lead.source || '-'}</td>
              <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{lead.assignedTo ? (lead.assignedTo === user.id ? 'Me' : 'Other') : <span className="text-gray-400">Unassigned</span>}</td>
              <td className="px-3 py-2 whitespace-nowrap flex gap-2 items-center justify-center" onClick={e => e.stopPropagation()}>
                <button className="p-1 hover:bg-blue-100 rounded" title="Edit" onClick={() => onEdit(lead)}>
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536M9 13l6-6 3 3-6 6H9v-3z" /></svg>
                </button>
                <button className="p-1 hover:bg-red-100 rounded" title="Delete" onClick={() => onDelete(lead)}>
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 19a2 2 0 002 2h8a2 2 0 002-2V7H6v12zM19 7V5a2 2 0 00-2-2H7a2 2 0 00-2 2v2" /></svg>
                </button>
                {!lead.assignedTo && (
                  <button className="p-1 hover:bg-green-100 rounded" title="Assign to Me" onClick={() => onAssign(lead)}>
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Mobile list view */}
      <div className="md:hidden divide-y divide-gray-100 bg-white mt-2 rounded-lg shadow-sm">
        {leads.map((lead) => (
          <div key={lead.id} className="flex flex-col px-4 py-3 gap-1 hover:bg-blue-50 cursor-pointer" onClick={() => onSelect(lead)}>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-900">{lead.name}</span>
              <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${statusColors[lead.status] || 'bg-gray-100 text-gray-900'}`}>{lead.status}</span>
            </div>
            <div className="text-xs text-gray-500">{lead.email} • {lead.phone}</div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-gray-400">{lead.source || '-'}</span>
              <span className="text-xs text-gray-400">{lead.assignedTo ? (lead.assignedTo === user.id ? 'Me' : 'Other') : 'Unassigned'}</span>
            </div>
            <div className="flex gap-2 mt-2">
              <button className="p-1 hover:bg-blue-100 rounded" title="Edit" onClick={e => { e.stopPropagation(); onEdit(lead); }}>
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536M9 13l6-6 3 3-6 6H9v-3z" /></svg>
              </button>
              <button className="p-1 hover:bg-red-100 rounded" title="Delete" onClick={e => { e.stopPropagation(); onDelete(lead); }}>
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 19a2 2 0 002 2h8a2 2 0 002-2V7H6v12zM19 7V5a2 2 0 00-2-2H7a2 2 0 00-2 2v2" /></svg>
              </button>
              {!lead.assignedTo && (
                <button className="p-1 hover:bg-green-100 rounded" title="Assign to Me" onClick={e => { e.stopPropagation(); onAssign(lead); }}>
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeadTable; 