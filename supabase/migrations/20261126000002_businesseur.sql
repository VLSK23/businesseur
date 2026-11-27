-- =========================================================
-- BUSINESSEUR — migration 2
-- À coller en entier dans Supabase > SQL Editor > Run,
-- APRÈS la migration 1 (20261126000001_victoria_init.sql).
-- =========================================================

-- ---------- 1. Profil Businesseur sur chaque compte ----------
alter table public.profiles
  add column if not exists profil text not null default 'entrepreneur';

alter table public.profiles drop constraint if exists profiles_profil_check;
alter table public.profiles
  add constraint profiles_profil_check
  check (profil in ('entrepreneur', 'mentor', 'investisseur'));

-- À l'inscription, on enregistre aussi le profil choisi.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  choix text := new.raw_user_meta_data ->> 'profil';
begin
  if choix is null or choix not in ('entrepreneur', 'mentor', 'investisseur') then
    choix := 'entrepreneur';
  end if;
  insert into public.profiles (id, email, full_name, profil)
  values (new.id, new.email, new.raw_user_meta_data ->> 'full_name', choix);
  return new;
end;
$$;

-- ---------- 2. Messages du formulaire "Contactez-nous" ----------
create table if not exists public.contact_messages (
  id          uuid primary key default gen_random_uuid(),
  nom         text not null check (char_length(nom) between 1 and 200),
  email       text not null check (char_length(email) between 3 and 320),
  profil      text not null default 'autre'
              check (profil in ('entrepreneur', 'mentor', 'investisseur', 'autre')),
  message     text not null check (char_length(message) between 1 and 5000),
  created_at  timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

-- Tout visiteur peut ENVOYER un message, mais personne ne peut les lire
-- depuis le site : tu les lis dans Supabase > Table Editor.
drop policy if exists "Envoyer un message" on public.contact_messages;
create policy "Envoyer un message" on public.contact_messages
  for insert to anon, authenticated with check (true);

-- ---------- 3. Abonnés à "La gazette du Businesseur" ----------
create table if not exists public.newsletter_subscribers (
  id          uuid primary key default gen_random_uuid(),
  email       text not null unique check (char_length(email) between 3 and 320),
  created_at  timestamptz not null default now()
);

alter table public.newsletter_subscribers enable row level security;

drop policy if exists "S'abonner" on public.newsletter_subscribers;
create policy "S'abonner" on public.newsletter_subscribers
  for insert to anon, authenticated with check (true);
