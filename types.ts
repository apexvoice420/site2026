
export enum AppView {
  LANDING = 'LANDING',
  DEMO = 'DEMO',
  PRICING = 'PRICING',
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD',
  LEAD_PACK = 'LEAD_PACK',
  SETUP = 'SETUP'
}

export interface Lead {
  id: string;
  timestamp: string;
  name: string;
  phone: string;
  service: 'Roofing' | 'Plumbing';
  urgency: 'Urgent' | 'Non-Urgent';
  status: 'New' | 'Interested' | 'Not Interested' | 'Demo Booked';
  summary: string;
}

export interface CallLog {
  id: string;
  timestamp: string;
  direction: 'Inbound' | 'Outbound';
  duration: string;
  outcome: string;
  client: string;
}
