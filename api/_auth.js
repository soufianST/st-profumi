import { createClient } from '@supabase/supabase-js';
import { isAdminEmail } from './_supabase.js';

export async function requireAdmin(req) {
  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');

  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : '';
  if (!token) {
    const err = new Error('Missing Authorization token');
    err.statusCode = 401;
    throw err;
  }

  const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data?.user) {
    const err = new Error('Invalid token');
    err.statusCode = 401;
    throw err;
  }

  const email = data.user.email;
  if (!isAdminEmail(email)) {
    const err = new Error('Forbidden');
    err.statusCode = 403;
    throw err;
  }

  return { supabase, user: data.user };
}
