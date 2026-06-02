-- Run in Supabase SQL editor

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

-- Basic RLS
alter table public.profiles enable row level security;
alter table public.addresses enable row level security;
alter table public.orders enable row level security;

-- Profiles: user can read/write own
create policy if not exists "profiles_select_own" on public.profiles
for select using (auth.uid() = id);
create policy if not exists "profiles_update_own" on public.profiles
for update using (auth.uid() = id);
create policy if not exists "profiles_insert_own" on public.profiles
for insert with check (auth.uid() = id);

-- Addresses: user can CRUD own
create policy if not exists "addresses_select_own" on public.addresses
for select using (auth.uid() = user_id);
create policy if not exists "addresses_insert_own" on public.addresses
for insert with check (auth.uid() = user_id);
create policy if not exists "addresses_update_own" on public.addresses
for update using (auth.uid() = user_id);
create policy if not exists "addresses_delete_own" on public.addresses
for delete using (auth.uid() = user_id);

-- Orders: user can read own
create policy if not exists "orders_select_own" on public.orders
for select using (auth.uid() = user_id);

-- Helpful index
create index if not exists orders_user_id_created_at_idx on public.orders(user_id, created_at desc);
