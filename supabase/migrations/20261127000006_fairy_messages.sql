-- =========================================================
-- BUSINESSEUR — migration 6 : messages du chat avec Fairy
-- À coller dans Supabase > SQL Editor > Run (après les migrations 1, 2 et 3).
-- La page /fairy enregistre ici chaque message écrit par un visiteur,
-- avec le thème détecté par Fairy (entrepreneur, levee, gazette…).
-- =========================================================

create table if not exists public.fairy_messages (
  id          uuid primary key default gen_random_uuid(),
  session_id  uuid not null,              -- une conversation = un même session_id
  contenu     text not null check (char_length(contenu) between 1 and 1000),
  sujet       text check (sujet is null or char_length(sujet) <= 60),
  created_at  timestamptz not null default now()
);

create index if not exists fairy_messages_session_idx on public.fairy_messages (session_id, created_at);

alter table public.fairy_messages enable row level security;

-- Tout visiteur peut envoyer un message à Fairy.
-- Personne ne peut relire les messages depuis le site : on les consulte dans Supabase.
drop policy if exists "Écrire à Fairy" on public.fairy_messages;
create policy "Écrire à Fairy" on public.fairy_messages
  for insert to anon, authenticated with check (true);

-- Vue pratique pour la démo : de quoi parlent les visiteurs avec Fairy ?
create or replace view public.fairy_sujets
with (security_invoker = true) as
select coalesce(sujet, 'autre') as sujet,
       count(*) as nombre_messages,
       count(distinct session_id) as nombre_conversations,
       max(created_at) as dernier_message
from public.fairy_messages
group by 1
order by nombre_messages desc;

revoke all on public.fairy_sujets from anon, authenticated;

-- Quelques conversations de démonstration.
insert into public.fairy_messages (session_id, contenu, sujet) values
  ('11111111-1111-4111-8111-111111111111', 'Bonjour !', 'salutation'),
  ('11111111-1111-4111-8111-111111111111', 'Je suis entrepreneur, je lance une marque de cosmétiques', 'entrepreneur'),
  ('11111111-1111-4111-8111-111111111111', 'Comment lever des fonds ?', 'levee'),
  ('22222222-2222-4222-8222-222222222222', 'Je suis mentor en marketing', 'mentor'),
  ('22222222-2222-4222-8222-222222222222', 'Voir les projets', 'projets'),
  ('33333333-3333-4333-8333-333333333333', 'Je suis investisseur', 'investisseur'),
  ('33333333-3333-4333-8333-333333333333', 'Parle-moi de Wouf''Home', 'projet:woufhome'),
  ('44444444-4444-4444-8444-444444444444', 'Quel statut choisir pour ma boîte ?', 'statut'),
  ('44444444-4444-4444-8444-444444444444', 'Télécharger l''appli', 'application');

select * from public.fairy_sujets;
