/**
 * Backend pricing reminder: only discount sample decants, grouped by identical sample size.
 * Full bottles and non-sample items must always remain at full price.
 */

import Stripe from 'stripe';
import { getSupabaseAdmin } from './_supabase.js';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const siteUrl = process.env.SITE_URL || process.env.VERCEL_URL;

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

function absUrl(path) {
  const base = siteUrl
    ? (siteUrl.startsWith('http') ? siteUrl : `https://${siteUrl}`)
    : 'http://localhost:5173';
  return `${base}${path}`;
}

/**
 * Apply tiered sample discounts only to sample decants of the same size:
 *   - 3rd cheapest sample of the same size gets 50% off
 *   - 4th cheapest sample of the same size is nearly free (1 cent for Stripe)
 * Full bottles and non-sample items are excluded entirely.
 */
const DISCOUNTABLE_SAMPLE_SIZES = new Set([2, 5, 10]);

function isDiscountableSample(item) {
  if (item?.isFull) return false;
  const numericMl = Number(item?.ml);
  return Number.isFinite(numericMl) && DISCOUNTABLE_SAMPLE_SIZES.has(numericMl);
}

function applyDiscounts(items) {
  const discountedUnits = [];
  const groupedSampleUnits = new Map();

  for (const item of items) {
    const qty = Math.max(1, Number(item.qty) || 1);
    for (let i = 0; i < qty; i += 1) {
      const unit = { ...item, qty: 1 };
      if (!isDiscountableSample(unit)) {
        discountedUnits.push(unit);
        continue;
      }

      const sizeKey = String(unit.ml);
      const bucket = groupedSampleUnits.get(sizeKey) || [];
      bucket.push(unit);
      groupedSampleUnits.set(sizeKey, bucket);
    }
  }

  for (const units of groupedSampleUnits.values()) {
    units.sort((a, b) => Number(a.unitPriceEur) - Number(b.unitPriceEur));

    for (let i = 0; i < units.length; i += 1) {
      const pos = i + 1;
      const basePrice = Number(units[i].unitPriceEur);
      let nextPrice = basePrice;

      if (pos % 4 === 0) {
        nextPrice = 0.01;
      } else if (pos % 3 === 0) {
        nextPrice = Number((basePrice * 0.5).toFixed(2));
      }

      discountedUnits.push({ ...units[i], unitPriceEur: nextPrice.toFixed(2) });
    }
  }

  const collapsed = [];
  for (const unit of discountedUnits) {
    const existing = collapsed.find(
      (c) =>
        c.name === unit.name &&
        c.ml === unit.ml &&
        c.unitPriceEur === unit.unitPriceEur &&
        Boolean(c.isFull) === Boolean(unit.isFull)
    );

    if (existing) {
      existing.qty += 1;
    } else {
      collapsed.push({ ...unit, qty: 1 });
    }
  }

  return collapsed;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Method Not Allowed' }));
    return;
  }

  if (!stripeSecretKey) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Missing STRIPE_SECRET_KEY in environment variables' }));
    return;
  }

  try {
    const stripe = new Stripe(stripeSecretKey, { apiVersion: '2024-06-20' });

    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const rawItems = body && Array.isArray(body.items) ? body.items : [];
    const customerEmail = body?.customerEmail || undefined;
    const userId = body?.userId || undefined;

    if (!rawItems.length) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Cart is empty' }));
      return;
    }

    // Re-validate unit prices against the source of truth (Supabase `products`
    // table) so a tampered client request can't pay less than the real price.
    // Done BEFORE discounts are applied so discount math runs on correct base prices.
    try {
      const admin = getSupabaseAdmin();
      const ids = [
        ...new Set(
          rawItems
            .map((it) => Number(it.id))
            .filter((n) => Number.isFinite(n))
        ),
      ];
      if (ids.length) {
        const { data: products, error: prodErr } = await admin
          .from('products')
          .select('id, sizes')
          .in('id', ids);
        if (!prodErr && Array.isArray(products)) {
          const sizesById = new Map(products.map((p) => [p.id, p.sizes]));
          for (const it of rawItems) {
            const sizes = sizesById.get(Number(it.id));
            if (!Array.isArray(sizes)) continue;
            const match = sizes.find(
              (s) => String(s.ml) === String(it.ml) && Boolean(s.full) === Boolean(it.isFull)
            );
            if (match) it.unitPriceEur = String(match.price);
          }
        }
      }
    } catch {
      // Supabase not configured — keep client-provided prices (legacy behavior)
    }

    // Apply discount tiers
    const discountedItems = applyDiscounts(rawItems);

    const line_items = discountedItems.map((it) => {
      const title = it.brand ? `${it.brand} ${it.name}` : it.name;
      const ml = it && it.ml !== undefined && it.ml !== null ? it.ml : '';
      const mlText = typeof ml === 'number' ? `${ml}ml` : String(ml);
      const label = `${title} — ${mlText}`;
      const amount = Math.round(Number(it.unitPriceEur) * 100);
      return {
        quantity: Math.max(1, Number(it.qty) || 1),
        price_data: {
          currency: 'eur',
          unit_amount: Math.max(1, amount),
          product_data: {
            name: label,
            images: it.image ? [it.image] : undefined,
          },
        },
      };
    });

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      allow_promotion_codes: true,
      customer_email: customerEmail,
      client_reference_id: userId,
      metadata: {
        user_id: userId || '',
      },
      phone_number_collection: { enabled: true },
      shipping_address_collection: {
        allowed_countries: [
          'IT', 'FR', 'DE', 'ES', 'BE', 'NL', 'AT', 'PT',
          'CH', 'LU', 'PL', 'SE', 'DK', 'FI', 'NO', 'IE',
          'GR', 'CZ', 'HU', 'RO', 'HR', 'SK', 'SI', 'GB',
        ],
      },
      success_url: absUrl('/#/received?order={CHECKOUT_SESSION_ID}'),
      cancel_url: absUrl('/#/'),
    });

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ url: session.url }));
  } catch (e) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: e && e.message ? e.message : 'Stripe error' }));
  }
}
