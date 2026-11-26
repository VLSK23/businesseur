-- =========================================================
-- VICTORIA — structure de la base (migration 1)
-- À coller en entier dans Supabase > SQL Editor > Run
-- =========================================================

-- ---------- 1. Profils clients ----------
-- Une ligne par compte, liée au compte de connexion (auth.users).
create table if not exists public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  email       text,
  full_name   text,
  phone       text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Chaque personne ne voit et ne modifie que son propre profil.
drop policy if exists "Lire son profil" on public.profiles;
create policy "Lire son profil" on public.profiles
  for select to authenticated using ((select auth.uid()) = id);

drop policy if exists "Modifier son profil" on public.profiles;
create policy "Modifier son profil" on public.profiles
  for update to authenticated
  using ((select auth.uid()) = id) with check ((select auth.uid()) = id);

-- Crée automatiquement le profil quand quelqu'un s'inscrit.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Met à jour la colonne updated_at à chaque modification.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- ---------- 2. Demandes de rendez-vous ----------
create table if not exists public.appointments (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null default auth.uid() references public.profiles (id) on delete cascade,
  preferred_date  date,
  message         text,
  status          text not null default 'en_attente'
                  check (status in ('en_attente', 'confirme', 'annule')),
  created_at      timestamptz not null default now()
);

create index if not exists appointments_user_id_idx on public.appointments (user_id);

alter table public.appointments enable row level security;

drop policy if exists "Voir ses rendez-vous" on public.appointments;
create policy "Voir ses rendez-vous" on public.appointments
  for select to authenticated using ((select auth.uid()) = user_id);

drop policy if exists "Demander un rendez-vous" on public.appointments;
create policy "Demander un rendez-vous" on public.appointments
  for insert to authenticated with check ((select auth.uid()) = user_id);
