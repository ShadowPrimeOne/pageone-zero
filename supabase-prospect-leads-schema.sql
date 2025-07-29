-- Create prospect_leads table for the prospecting lead form
CREATE TABLE IF NOT EXISTS prospect_leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_name TEXT NOT NULL,
  contact_name TEXT,
  position TEXT,
  phone TEXT,
  website_url TEXT,
  gmb_status TEXT,
  website_quality TEXT,
  advertising_status TEXT[],
  ad_quality TEXT,
  facebook_active TEXT,
  contact_method TEXT[],
  lead_capacity TEXT,
  opportunity_summary TEXT NOT NULL,
  ambassador TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE prospect_leads ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts for all authenticated users
CREATE POLICY "Allow inserts for authenticated users" ON prospect_leads
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Create policy to allow reads for all authenticated users
CREATE POLICY "Allow reads for authenticated users" ON prospect_leads
  FOR SELECT USING (auth.role() = 'authenticated');

-- Create policy to allow all operations for service role
CREATE POLICY "Allow all for service role" ON prospect_leads
  FOR ALL USING (auth.role() = 'service_role');

-- Add index for better query performance
CREATE INDEX IF NOT EXISTS idx_prospect_leads_ambassador ON prospect_leads(ambassador);
CREATE INDEX IF NOT EXISTS idx_prospect_leads_created_at ON prospect_leads(created_at DESC);
