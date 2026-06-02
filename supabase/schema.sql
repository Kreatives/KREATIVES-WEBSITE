-- KREATIVES CMS — database-structuur
-- Idempotent: kan veilig opnieuw uitgevoerd worden.

-- ========== Tabellen ==========

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  position int not null default 0,
  slug text unique not null,
  name text not null,
  type text,
  year text,
  client text,
  excerpt text,
  intro text,
  image text,
  tags text[] default '{}',
  sections jsonb not null default '[]'::jsonb
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  position int not null default 0,
  author text not null,
  role text,
  company text,
  title text,
  quote text not null,
  photo text,
  color text default '#FD6D17'
);

create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  position int not null default 0,
  category text,
  question text not null,
  answer text not null
);

-- ========== Row Level Security ==========

alter table public.projects enable row level security;
alter table public.reviews enable row level security;
alter table public.faqs enable row level security;

-- Publiek mag lezen (de website toont de content)
drop policy if exists "public read projects" on public.projects;
create policy "public read projects" on public.projects for select using (true);
drop policy if exists "public read reviews" on public.reviews;
create policy "public read reviews" on public.reviews for select using (true);
drop policy if exists "public read faqs" on public.faqs;
create policy "public read faqs" on public.faqs for select using (true);

-- Alleen ingelogde gebruikers mogen schrijven
drop policy if exists "auth write projects" on public.projects;
create policy "auth write projects" on public.projects for all to authenticated using (true) with check (true);
drop policy if exists "auth write reviews" on public.reviews;
create policy "auth write reviews" on public.reviews for all to authenticated using (true) with check (true);
drop policy if exists "auth write faqs" on public.faqs;
create policy "auth write faqs" on public.faqs for all to authenticated using (true) with check (true);

-- ========== Opslag voor afbeeldingen ==========

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "public read media" on storage.objects;
create policy "public read media" on storage.objects for select using (bucket_id = 'media');
drop policy if exists "auth upload media" on storage.objects;
create policy "auth upload media" on storage.objects for insert to authenticated with check (bucket_id = 'media');
drop policy if exists "auth update media" on storage.objects;
create policy "auth update media" on storage.objects for update to authenticated using (bucket_id = 'media');
drop policy if exists "auth delete media" on storage.objects;
create policy "auth delete media" on storage.objects for delete to authenticated using (bucket_id = 'media');
