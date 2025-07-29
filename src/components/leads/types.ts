export type LeadStatus = 'Uncontacted' | 'Welcome Email' | 'Appointment Set' | 'Converted';

export type AgreementStatus = 'Awaiting Signature' | 'Signed';

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
  signatureName?: string;
  agreementDate?: string;
  lpReady?: boolean;
  adwordsDeployed?: boolean;
  gmbVerified?: boolean;
  ambassador_id?: string;
}

export interface Ambassador {
  id: string;
  name: string;
  email: string;
  created_at: string;
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