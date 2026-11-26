-- =========================================================
-- BUSINESSEUR — Profils classés par catégorie
-- Un seul fichier à coller dans Supabase > SQL Editor > Run,
-- APRÈS les migrations 1, 2 et 3. On peut le relancer sans doublons.
--
-- 1. Crée 4 "vues" (des tableaux toujours à jour, calculés à partir de profiles) :
--      entrepreneurs, mentors, investisseurs, inscrits_par_categorie
--    Chaque nouvel inscrit apparaît automatiquement dans la bonne vue.
-- 2. Ajoute 15 profils fictifs (5 par catégorie) en @example.com.
--    Ces comptes de démo n'ont pas de mot de passe : on ne peut pas s'y connecter.
-- =========================================================


-- ---------- 1. LES VUES PAR CATÉGORIE ----------

create or replace view public.entrepreneurs
with (security_invoker = true) as
select
  p.full_name  as nom,
  p.email,
  p.phone      as telephone,
  case p.stade_projet
    when 'idee'           then 'J''ai une idée'
    when 'prototype'      then 'Prototype / premier produit'
    when 'lancement'      then 'Lancé, premiers clients'
    when 'croissance'     then 'En croissance'
    when 'levee_de_fonds' then 'Je lève des fonds'
  end          as stade_du_projet,
  p.created_at as inscrit_le
from public.profiles p
where p.profil = 'entrepreneur'
order by p.created_at desc;

create or replace view public.mentors
with (security_invoker = true) as
select
  p.full_name  as nom,
  p.email,
  p.phone      as telephone,
  array_to_string(array(
    select case s
      when 'strategie'     then 'Stratégie & business model'
      when 'marketing'     then 'Marketing & communication'
      when 'vente'         then 'Vente & distribution'
      when 'finance'       then 'Finance & levée de fonds'
      when 'juridique'     then 'Juridique'
      when 'tech'          then 'Tech & produit'
      when 'rh'            then 'RH & management'
      when 'international' then 'International'
      when 'impact'        then 'Impact & RSE'
      else s end
    from unnest(p.specialites) as s
  ), ', ')     as specialites,
  p.created_at as inscrit_le
from public.profiles p
where p.profil = 'mentor'
order by p.created_at desc;

create or replace view public.investisseurs
with (security_invoker = true) as
select
  p.full_name  as nom,
  p.email,
  p.phone      as telephone,
  p.created_at as inscrit_le
from public.profiles p
where p.profil = 'investisseur'
order by p.created_at desc;

create or replace view public.inscrits_par_categorie
with (security_invoker = true) as
select
  case p.profil
    when 'entrepreneur' then 'Entrepreneurs'
    when 'mentor'       then 'Mentors'
    when 'investisseur' then 'Investisseurs'
  end              as categorie,
  count(*)         as nombre_inscrits,
  max(p.created_at) as derniere_inscription
from public.profiles p
group by p.profil
order by nombre_inscrits desc;

-- Ces vues sont pour toi (dans Supabase), pas pour les visiteurs du site.
revoke all on public.entrepreneurs, public.mentors, public.investisseurs,
              public.inscrits_par_categorie from anon, authenticated;


-- ---------- 2. 15 PROFILS FICTIFS POUR LA DÉMO ----------
-- On crée de faux comptes : le profil (avec sa catégorie) est créé
-- automatiquement par le déclencheur des migrations.

insert into auth.users (
  instance_id, id, aud, role, email, encrypted_password, email_confirmed_at,
  raw_app_meta_data, raw_user_meta_data, created_at, updated_at,
  confirmation_token, recovery_token, email_change_token_new, email_change
)
select
  '00000000-0000-0000-0000-000000000000', gen_random_uuid(), 'authenticated', 'authenticated',
  d.email, '', now(),
  '{"provider":"email","providers":["email"]}'::jsonb,
  d.meta::jsonb,
  now() - (d.jours || ' days')::interval, now(),
  '', '', '', ''
from (values
  -- Entrepreneurs
  ('ines.benali@example.com',     '{"full_name":"Inès Benali","profil":"entrepreneur","stade_projet":"lancement"}', 3),
  ('karim.haddad@example.com',    '{"full_name":"Karim Haddad","profil":"entrepreneur","stade_projet":"levee_de_fonds"}', 8),
  ('amina.diallo@example.com',    '{"full_name":"Amina Diallo","profil":"entrepreneur","stade_projet":"idee"}', 12),
  ('lucas.nguyen@example.com',    '{"full_name":"Lucas Nguyen","profil":"entrepreneur","stade_projet":"prototype"}', 17),
  ('manon.robin@example.com',     '{"full_name":"Manon Robin","profil":"entrepreneur","stade_projet":"croissance"}', 25),
  -- Mentors
  ('claire.lefevre@example.com',  '{"full_name":"Claire Lefèvre","profil":"mentor","specialites":["marketing","strategie"]}', 2),
  ('marc.delorme@example.com',    '{"full_name":"Marc Delorme","profil":"mentor","specialites":["vente","international"]}', 6),
  ('julien.girard@example.com',   '{"full_name":"Julien Girard","profil":"mentor","specialites":["juridique"]}', 14),
  ('fatou.traore@example.com',    '{"full_name":"Fatou Traoré","profil":"mentor","specialites":["finance","impact"]}', 20),
  ('antoine.chevalier@example.com','{"full_name":"Antoine Chevalier","profil":"mentor","specialites":["tech","rh"]}', 30),
  -- Investisseurs
  ('thomas.bernard@example.com',  '{"full_name":"Thomas Bernard","profil":"investisseur"}', 4),
  ('nadia.mercier@example.com',   '{"full_name":"Nadia Mercier","profil":"investisseur"}', 9),
  ('paul.faure@example.com',      '{"full_name":"Paul Faure","profil":"investisseur"}', 15),
  ('yasmine.kone@example.com',    '{"full_name":"Yasmine Koné","profil":"investisseur"}', 22),
  ('hugo.fontaine@example.com',   '{"full_name":"Hugo Fontaine","profil":"investisseur"}', 28)
) as d(email, meta, jours)
where not exists (select 1 from auth.users u where u.email = d.email);

-- Les profils prennent la même date d'inscription que leur compte.
update public.profiles p
set created_at = u.created_at
from auth.users u
where u.id = p.id and p.email like '%@example.com';


-- ---------- Vérification ----------
select * from public.inscrits_par_categorie;

-- Pour SUPPRIMER plus tard les 15 profils de démo (leurs profils partent avec) :
-- delete from auth.users where email like '%@example.com';
