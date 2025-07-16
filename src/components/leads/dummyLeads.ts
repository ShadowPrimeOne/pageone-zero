import { Lead } from './types';

export const dummyLeads: Lead[] = [
  {
    id: '1',
    name: 'Alice Smith',
    email: 'alice@example.com',
    phone: '555-1234',
    status: 'New',
    assignedTo: '',
    source: 'Web Form',
    business: 'Smith Dental',
    notes: 'Interested in Google Ads.'
  },
  {
    id: '2',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    phone: '555-5678',
    status: 'Contacted',
    assignedTo: 'demo-user-uuid',
    source: 'Referral',
    business: 'Johnson Plumbing',
    notes: 'Follow up next week.'
  },
  {
    id: '3',
    name: 'Carol Lee',
    email: 'carol@example.com',
    phone: '555-8765',
    status: 'Onboarded',
    assignedTo: 'demo-user-uuid',
    source: 'Landing Page',
    business: 'Lee Consulting',
    notes: 'Onboarded, send welcome kit.'
  },
  {
    id: '4',
    name: 'David Kim',
    email: 'david@example.com',
    phone: '555-4321',
    status: 'Lost',
    assignedTo: '',
    source: 'Web Form',
    business: 'Kim Electric',
    notes: 'Went with competitor.'
  },
  {
    id: '5',
    name: 'Eva Green',
    email: 'eva@example.com',
    phone: '555-2468',
    status: 'New',
    assignedTo: '',
    source: 'Event',
    business: 'Green Marketing',
    notes: ''
  }
]; 