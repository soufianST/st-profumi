import Stripe from 'stripe';
import { getSupabaseAdmin } from './_supabase.js';
import { getResend, getFromEmail } from './_email.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2024-06-20' });

function buffer(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

function trackingLink(carrier, trackingNumber) {
  const c = (carrier || '').toLowerCase();
  const n = encodeURIComponent(trackingNumber || '');
  if (!trackingNumber) return '';
  if (c.includes('gls')) return `https://gls-group.com/IT/it/servizi-online/ricerca-spedizioni/?match=${n}`;
  if (c.includes('poste')) return `https://www.poste.it/cerca/index.html#/risultati-spedizioni/${n}`;
  return '';
}

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    res.status(500).send('Missing STRIPE_WEBHOOK_SECRET');
    return;
  }

  let event;
  try {
    const rawBody = await buffer(req);
    const sig = req.headers['stripe-signature'];
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;

      const supabase = getSupabaseAdmin();
      const userId = session.client_reference_id || session.metadata?.user_id || null;

      // Fetch line items for storage
      const li = await stripe.checkout.sessions.listLineItems(session.id, { limit: 100 });
      const items = (li.data || []).map((x) => ({
        description: x.description,
        quantity: x.quantity,
        amount_total: x.amount_total,
        currency: x.currency,
      }));

      const shipping = session.shipping_details || null;
      const address = shipping?.address || null;
      const phone = session.customer_details?.phone || null;
      const email = session.customer_details?.email || session.customer_email || null;
      const name = session.customer_details?.name || shipping?.name || null;

      const order = {
        user_id: userId,
        stripe_session_id: session.id,
        stripe_payment_intent: session.payment_intent || null,
        status: 'paid',
        amount_total: session.amount_total,
        currency: session.currency,
        customer_email: email,
        customer_name: name,
        customer_phone: phone,
        shipping_address: address,
        shipping_name: shipping?.name || null,
        carrier: null,
        tracking_number: null,
        tracking_url: null,
        items,
        created_at: new Date().toISOString(),
      };

      // Upsert by stripe_session_id
      const { data: saved, error } = await supabase
        .from('orders')
        .upsert(order, { onConflict: 'stripe_session_id' })
        .select('*')
        .single();

      if (error) throw error;

      // Send confirmation email
      try {
        if (email) {
          const resend = getResend();
          await resend.emails.send({
            from: getFromEmail(),
            to: [email],
            subject: 'ST PROFUMI — Order received',
            html: `
              <div style="font-family:Arial,sans-serif;line-height:1.6">
                <h2>Order received ✅</h2>
                <p>Thank you${name ? `, ${name}` : ''}! We received your order.</p>
                <p><b>Order ID:</b> ${saved.id}</p>
                <p><b>Amount:</b> ${(session.amount_total / 100).toFixed(2)} ${session.currency.toUpperCase()}</p>
                <p>You can track your order from the Orders tab on the website.</p>
              </div>
            `,
          });
        }
      } catch (_) {
        // ignore email errors to not fail webhook
      }
    }

    res.json({ received: true });
  } catch (err) {
    res.status(500).send(err.message || 'Server error');
  }
}
