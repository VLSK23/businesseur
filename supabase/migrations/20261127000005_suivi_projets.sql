-- =========================================================
-- BUSINESSEUR — migration 5 : newsletter de chaque projet
-- À coller dans Supabase > SQL Editor > Run, APRÈS les migrations 1, 2 et 3.
-- Le bouton « Se tenir informé du projet » enregistre ici l'e-mail ET le projet suivi.
-- =========================================================

create table if not exists public.projet_abonnes (
  id          uuid primary key default gen_random_uuid(),
  projet      text not null check (char_length(projet) between 1 and 100),
  email       text not null check (char_length(email) between 3 and 320),
  nom         text check (nom is null or char_length(nom) <= 100),
  created_at  timestamptz not null default now(),
  unique (projet, email)
);

alter table public.projet_abonnes enable row level security;

-- Tout visiteur peut s'abonner à un projet, mais personne ne peut lire la liste depuis le site.
drop policy if exists "Suivre un projet" on public.projet_abonnes;
create policy "Suivre un projet" on public.projet_abonnes
  for insert to anon, authenticated with check (true);

-- Vue pratique pour la démo : nombre d'abonnés par projet.
create or replace view public.abonnes_par_projet
with (security_invoker = true) as
select projet, count(*) as nombre_abonnes, max(created_at) as dernier_abonnement
from public.projet_abonnes
group by projet
order by nombre_abonnes desc;

revoke all on public.abonnes_par_projet from anon, authenticated;

-- Quelques abonnés de démonstration (adresses @example.com).
insert into public.projet_abonnes (projet, email, nom) values
  ('woufhome', 'sarah.martin@example.com', 'Sarah'),
  ('woufhome', 'thomas.durand@example.com', 'Thomas'),
  ('woufhome', 'emma.garcia@example.com', 'Emma'),
  ('woufhome', 'paul.faure@example.com', 'Paul'),
  ('terre-et-bocal', 'lea.petit@example.com', 'Léa'),
  ('terre-et-bocal', 'hugo.mercier@example.com', 'Hugo'),
  ('kodama', 'nadia.mercier@example.com', 'Nadia'),
  ('atlas-food', 'yasmine.haddad@example.com', 'Yasmine')
on conflict (projet, email) do nothing;

select * from public.abonnes_par_projet;
