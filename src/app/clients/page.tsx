"use client";
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { dummyClients } from '@/components/leads/dummyLeads';
import type { Client } from '@/components/leads/types';

export default function ClientsPage() {
  const [clients] = useState<Client[]>(dummyClients);
  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Clients</h1>
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
    </DashboardLayout>
  );
} 