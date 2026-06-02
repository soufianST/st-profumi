import { requireAdmin } from './_auth.js';

function trackingUrl(carrier, trackingNumber) {
  const c = String(carrier || '').toLowerCase();
  const n = encodeURIComponent(String(trackingNumber || ''));
  if (!trackingNumber) return null;
  if (c.includes('gls')) return `https://gls-group.com/IT/it/servizi-online/ricerca-spedizioni/?match=${n}`;
  if (c.includes('poste')) return `https://www.poste.it/cerca/index.html#/risultati-spedizioni/${n}`;
  return null;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  try {
    const { supabase } = await requireAdmin(req);
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    const id = body?.id;
    if (!id) return res.status(400).json({ error: 'Missing order id' });

    const patch = {};
    if (body.status) patch.status = body.status;
    if (body.carrier !== undefined) patch.carrier = body.carrier;
    if (body.tracking_number !== undefined) {
      patch.tracking_number = body.tracking_number;
      patch.tracking_url = trackingUrl(body.carrier || patch.carrier, body.tracking_number);
    }

    const { data, error } = await supabase.from('orders').update(patch).eq('id', id).select('*').single();
    if (error) throw error;

    res.status(200).json({ order: data });
  } catch (e) {
    res.status(e.statusCode || 500).json({ error: e.message || 'Server error' });
  }
}
