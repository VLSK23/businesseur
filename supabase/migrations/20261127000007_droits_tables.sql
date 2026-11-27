-- =========================================================
-- BUSINESSEUR — migration 7 : droits d'accès aux tables
-- À coller dans Supabase > SQL Editor > Run (on peut la relancer sans risque).
--
-- Corrige l'erreur « permission denied for table … ».
-- Les règles RLS décident QUELLES lignes on peut écrire ; les GRANT ci-dessous
-- donnent le droit de base d'utiliser la table. Il faut les deux.
-- Les visiteurs (anon) peuvent seulement AJOUTER une ligne : ils ne peuvent
-- ni lire, ni modifier, ni supprimer les données des autres.
-- =========================================================

-- Formulaires du site : ajout seulement
grant insert on public.newsletter_subscribers to anon, authenticated;
grant insert on public.contact_messages      to anon, authenticated;
grant insert on public.projet_abonnes        to anon, authenticated;
grant insert on public.fairy_messages        to anon, authenticated;

-- Page « Mon compte » : chaque membre lit et modifie SON profil (limité par RLS)
grant select, update on public.profiles to authenticated;

-- RLS reste activé partout (sécurité) :
alter table public.newsletter_subscribers enable row level security;
alter table public.contact_messages      enable row level security;
alter table public.projet_abonnes        enable row level security;
alter table public.fairy_messages        enable row level security;
alter table public.profiles              enable row level security;

-- Les statistiques restent privées (visibles seulement dans le Table Editor)
revoke all on public.abonnes_par_projet from anon, authenticated;
revoke all on public.fairy_sujets       from anon, authenticated;
