import { requireAdmin } from './_auth.js';
import { getResend, getFromEmail } from './_email.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  try {
    const { supabase, user } = await requireAdmin(req);
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    const subject = String(body?.subject || '').trim();
    const message = String(body?.message || '').trim();
    if (!subject || !message) return res.status(400).json({ error: 'Missing subject or message' });

    // Get recipients (opt-in)
    const { data: profiles, error } = await supabase
      .from('profiles')
      .select('email, marketing_opt_in')
      .limit(10000);

    if (error) throw error;

    const emails = (profiles || [])
      .filter((p) => p.marketing_opt_in !== false)
      .map((p) => p.email)
      .filter(Boolean);

    const resend = getResend();

    // Basic batching to avoid huge single request
    const batchSize = 50;
    let sent = 0;
    for (let i = 0; i < emails.length; i += batchSize) {
      const batch = emails.slice(i, i + batchSize);
      if (!batch.length) continue;

      await resend.emails.send({
        from: getFromEmail(),
        to: batch,
        subject,
        html: `
          <div style="font-family:Arial,sans-serif;line-height:1.7">
            <p>${message.replace(/\n/g, '<br/>')}</p>
            <hr style="border:none;border-top:1px solid #eee;margin:18px 0"/>
            <p style="color:#777;font-size:12px">Sent by ${user.email}</p>
          </div>
        `,
      });

      sent += batch.length;
    }

    res.status(200).json({ sent });
  } catch (e) {
    res.status(e.statusCode || 500).json({ error: e.message || 'Server error' });
  }
}
