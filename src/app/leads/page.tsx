"use client";
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import LeadTable from '@/components/leads/LeadTable';
import { LeadModal } from '@/components/leads/LeadModal';
import { LeadDrawer } from '@/components/leads/LeadDrawer';
import { dummyLeads, dummyClients } from '@/components/leads/dummyLeads';
import type { Lead, Client } from '@/components/leads/types';
import { useUser } from '@/lib/UserContext';
import MenuButton from '@/components/leads/MenuButton';

const emptyLead: Omit<Lead, 'id'> = {
  name: '',
  email: '',
  phone: '',
  status: 'Uncontacted',
  assignedTo: '',
  source: '',
  business: '',
  notes: '',
  appointmentDate: '',
  appointmentType: 'call',
  trialAgreed: false,
  lpReady: false,
  adwordsDeployed: false,
  gmbVerified: false,
};

function randomId() {
  return Math.random().toString(36).slice(2, 10);
}

export default function LeadsPage() {
  const user = useUser();
  const [leads, setLeads] = useState<Lead[]>(dummyLeads);
  const [clients, setClients] = useState<Client[]>(dummyClients);
  const [modalOpen, setModalOpen] = useState(false);
  const [editLead, setEditLead] = useState<Lead | null>(null);
  const [deleteLead, setDeleteLead] = useState<Lead | null>(null);
  const [drawerLead, setDrawerLead] = useState<Lead | null>(null);
  const [form, setForm] = useState<Omit<Lead, 'id'>>(emptyLead);
  const [isEdit, setIsEdit] = useState(false);

  // Modal open for add/edit
  const openAddModal = () => {
    setForm(emptyLead);
    setIsEdit(false);
    setModalOpen(true);
  };
  const openEditModal = (lead: Lead) => {
    setForm({ ...lead });
    setIsEdit(true);
    setEditLead(lead);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setEditLead(null);
  };

  // Add or update lead
  const handleSave = (lead: Omit<Lead, 'id'>) => {
    if (isEdit && editLead) {
      setLeads(leads.map(l => l.id === editLead.id ? { ...editLead, ...lead } : l));
    } else {
      setLeads([{ ...lead, id: randomId() }, ...leads]);
    }
    closeModal();
  };

  // Delete
  const handleDelete = () => {
    if (deleteLead) {
      setLeads(leads.filter(l => l.id !== deleteLead.id));
      setDeleteLead(null);
    }
  };

  // Assign to me
  const handleAssign = (lead: Lead) => {
    setLeads(leads.map(l => l.id === lead.id ? { ...l, assignedTo: user.id } : l));
  };

  // Open drawer
  const handleSelect = (lead: Lead) => setDrawerLead(lead);
  const closeDrawer = () => setDrawerLead(null);

  // Edit-in-place in drawer
  const handleDrawerChange = (field: keyof Lead, value: Lead[keyof Lead]) => {
    if (!drawerLead) return;
    const updated = { ...drawerLead, [field]: value };
    setDrawerLead(updated);
    setLeads(leads.map(l => l.id === drawerLead.id ? updated : l));
  };

  // Send Agreement stub
  const handleSendAgreement = () => {
    // No-op, handled in LeadDrawer stub modal
  };

  // Convert to Client
  const handleConvertToClient = () => {
    if (!drawerLead) return;
    // Remove from leads
    setLeads(leads.filter(l => l.id !== drawerLead.id));
    // Add to clients
    setClients([{ id: randomId(), name: drawerLead.name, email: drawerLead.email, phone: drawerLead.phone, business: drawerLead.business, notes: drawerLead.notes, convertedFromLeadId: drawerLead.id }, ...clients]);
    setDrawerLead(null);
  };

  return (
    <DashboardLayout>
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Leads</h1>
          <MenuButton
            className="ml-4"
            onClick={openAddModal}
            aria-label="Add Lead"
            type="button"
          >
            + Add Lead
          </MenuButton>
        </div>
        <LeadTable
          leads={leads}
          onEdit={openEditModal}
          onDelete={setDeleteLead}
          onAssign={handleAssign}
          onSelect={handleSelect}
        />
        {/* Add/Edit Modal */}
        <LeadModal
          isOpen={modalOpen}
          onClose={closeModal}
          onSave={handleSave}
          form={form}
          setForm={setForm}
          isEdit={isEdit}
        />
        {/* Delete Confirm Modal */}
        {deleteLead && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full border border-gray-200 p-8 relative">
              <button type="button" className="absolute top-4 right-4 text-gray-400 hover:text-gray-600" onClick={() => setDeleteLead(null)}>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              <h2 className="text-2xl font-bold mb-6 text-center text-red-600">Delete Lead?</h2>
              <p className="text-gray-700 mb-8 text-center">Are you sure you want to delete <b>{deleteLead.name}</b>? This cannot be undone.</p>
              <div className="flex gap-4">
                <button className="flex-1 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold" onClick={() => setDeleteLead(null)}>Cancel</button>
                <button className="flex-1 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold" onClick={handleDelete}>Delete</button>
              </div>
            </div>
          </div>
        )}
        {/* Lead Details Drawer */}
        <LeadDrawer
          lead={drawerLead}
          onClose={closeDrawer}
          onChange={handleDrawerChange}
          onSendAgreement={handleSendAgreement}
          onConvertToClient={handleConvertToClient}
        />
        {/* Clients List (simple) */}
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-2">Clients</h2>
          <div className="bg-white rounded-lg shadow divide-y divide-gray-100">
            {clients.length === 0 && <div className="p-4 text-gray-500">No clients yet.</div>}
            {clients.map(client => (
              <div key={client.id} className="flex flex-col md:flex-row md:items-center md:justify-between p-4 gap-1">
                <div>
                  <div className="font-semibold text-gray-900">{client.name}</div>
                  <div className="text-xs text-gray-500">{client.email} • {client.phone}</div>
                  {client.business && <div className="text-xs text-gray-400">{client.business}</div>}
                </div>
                {client.notes && <div className="text-xs text-gray-500 mt-1 md:mt-0">{client.notes}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 