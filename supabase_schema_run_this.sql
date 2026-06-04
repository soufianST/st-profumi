-- ST PROFUMI (Stripe) - Supabase Schema
-- انسخ هذا الملف بالكامل إلى Supabase → SQL Editor ثم Run

-- Extensions
create extension if not exists "pgcrypto";

-- Tables
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  phone text,
  marketing_opt_in boolean default true,
  created_at timestamptz default now()
);

create table if not exists public.addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  label text,
  full_name text,
  phone text,
  address_line1 text,
  address_line2 text,
  city text,
  province text,
  postal_code text,
  country text default 'IT',
  is_default boolean default false,
  created_at timestamptz default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  stripe_session_id text unique,
  stripe_payment_intent text,
  status text default 'processing',
  amount_total bigint,
  currency text,
  customer_email text,
  customer_name text,
  customer_phone text,
  shipping_name text,
  shipping_address jsonb,
  carrier text,
  tracking_number text,
  tracking_url text,
  items jsonb,
  created_at timestamptz default now()
);

-- Enable Row Level Security
alter table public.profiles enable row level security;
alter table public.addresses enable row level security;
alter table public.orders enable row level security;

-- Policies (Supabase SQL لا يدعم: CREATE POLICY IF NOT EXISTS)
-- لذلك نستعمل DROP POLICY IF EXISTS ثم CREATE POLICY.

-- Profiles: user can read/write own
DROP POLICY IF EXISTS profiles_select_own ON public.profiles;
CREATE POLICY profiles_select_own ON public.profiles
FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS profiles_update_own ON public.profiles;
CREATE POLICY profiles_update_own ON public.profiles
FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS profiles_insert_own ON public.profiles;
CREATE POLICY profiles_insert_own ON public.profiles
FOR INSERT WITH CHECK (auth.uid() = id);

-- Addresses: user can CRUD own
DROP POLICY IF EXISTS addresses_select_own ON public.addresses;
CREATE POLICY addresses_select_own ON public.addresses
FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS addresses_insert_own ON public.addresses;
CREATE POLICY addresses_insert_own ON public.addresses
FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS addresses_update_own ON public.addresses;
CREATE POLICY addresses_update_own ON public.addresses
FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS addresses_delete_own ON public.addresses;
CREATE POLICY addresses_delete_own ON public.addresses
FOR DELETE USING (auth.uid() = user_id);

-- Orders: user can read own (admin panel reads via service_role on backend)
DROP POLICY IF EXISTS orders_select_own ON public.orders;
CREATE POLICY orders_select_own ON public.orders
FOR SELECT USING (auth.uid() = user_id);

-- Helpful index
create index if not exists orders_user_id_created_at_idx on public.orders(user_id, created_at desc);
