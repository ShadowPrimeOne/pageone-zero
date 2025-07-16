export type LeadStatus = 'New' | 'Contacted' | 'Onboarded' | 'Lost';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: LeadStatus;
  assignedTo?: string;
  source?: string;
  business?: string;
  notes?: string;
} 