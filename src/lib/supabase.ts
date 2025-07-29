import { createClient } from '@supabase/supabase-js'

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('[supabase.ts] Missing Supabase env vars')
}

// Create a singleton instance to prevent multiple clients
let supabaseInstance: ReturnType<typeof createClient> | null = null

export const supabase = (() => {
  if (!supabaseInstance) {
    supabaseInstance = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
  }
  return supabaseInstance
})()

// Ambassador CRUD functions
import type { Ambassador } from '../components/leads/types'

export async function getAmbassadors(): Promise<Ambassador[]> {
  const { data, error } = await supabase
    .from('ambassadors')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function createAmbassador(ambassador: Omit<Ambassador, 'id' | 'created_at'>): Promise<Ambassador> {
  const { data, error } = await supabase
    .from('ambassadors')
    .insert([ambassador])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function assignLeadToAmbassador(leadId: string, ambassadorId: string): Promise<void> {
  const { error } = await supabase
    .from('leads')
    .update({ ambassador_id: ambassadorId })
    .eq('id', leadId);
  if (error) throw error;
}

// Prospect leads functions
export async function getProspectLeads(): Promise<any[]> {
  const { data, error } = await supabase
    .from('prospect_leads')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function getProspectLeadsByAmbassador(ambassador: string): Promise<any[]> {
  const { data, error } = await supabase
    .from('prospect_leads')
    .select('*')
    .eq('ambassador', ambassador)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}