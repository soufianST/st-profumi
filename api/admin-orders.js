import { requireAdmin } from './_auth.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method Not Allowed' });

  try {
    const { supabase } = await requireAdmin(req);

    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(200);

    if (error) throw error;
    res.status(200).json({ orders: data || [] });
  } catch (e) {
    res.status(e.statusCode || 500).json({ error: e.message || 'Server error' });
  }
}
