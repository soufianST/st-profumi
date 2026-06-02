import { createClient } from '@supabase/supabase-js';

export function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  return createClient(url, key, { auth: { persistSession: false } });
}

export function isAdminEmail(email) {
  const raw = process.env.ADMIN_EMAILS || '';
  const admins = raw
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  return !!email && admins.includes(String(email).trim().toLowerCase());
}
