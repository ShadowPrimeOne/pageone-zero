export type LeadStatus = 'Uncontacted' | 'Welcome Email' | 'Appointment Set' | 'Converted';

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
  appointmentDate?: string;
  appointmentType?: 'call' | 'zoom' | 'in-person';
  trialAgreed?: boolean;
  lpReady?: boolean;
  adwordsDeployed?: boolean;
  gmbVerified?: boolean;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  business?: string;
  notes?: string;
  convertedFromLeadId?: string;
} 