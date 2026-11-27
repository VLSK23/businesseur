-- =========================================================
-- BUSINESSEUR — données de simulation (seed)
-- Remplit la base avec de faux abonnés et de faux messages pour tester.
-- À coller dans Supabase > SQL Editor > Run, APRÈS les migrations 1, 2 et 3.
-- On peut le relancer sans créer de doublons d'abonnés.
-- Toutes les adresses sont en @example.com (domaine réservé aux tests).
-- =========================================================

-- ---------- 25 abonnés à la gazette ----------
insert into public.newsletter_subscribers (email, created_at) values
  ('sarah.martin@example.com', now() - interval '21 days'),
  ('ines.benali@example.com', now() - interval '10 days'),
  ('thomas.durand@example.com', now() - interval '26 days'),
  ('claire.lefevre@example.com', now() - interval '42 days'),
  ('marc.moreau@example.com', now() - interval '4 days'),
  ('yasmine.haddad@example.com', now() - interval '5 days'),
  ('julien.girard@example.com', now() - interval '53 days'),
  ('amina.diallo@example.com', now() - interval '35 days'),
  ('lucas.bernard@example.com', now() - interval '7 days'),
  ('camille.rousseau@example.com', now() - interval '24 days'),
  ('karim.nguyen@example.com', now() - interval '38 days'),
  ('lea.petit@example.com', now() - interval '4 days'),
  ('hugo.garcia@example.com', now() - interval '59 days'),
  ('nadia.mercier@example.com', now() - interval '33 days'),
  ('paul.faure@example.com', now() - interval '14 days'),
  ('emma.traore@example.com', now() - interval '3 days'),
  ('samir.blanc@example.com', now() - interval '6 days'),
  ('chloe.roux@example.com', now() - interval '28 days'),
  ('antoine.chevalier@example.com', now() - interval '27 days'),
  ('fatou.kone@example.com', now() - interval '5 days'),
  ('louis.robin@example.com', now() - interval '16 days'),
  ('manon.morel@example.com', now() - interval '6 days'),
  ('rayan.mbaye@example.com', now() - interval '36 days'),
  ('zoe.fontaine@example.com', now() - interval '28 days'),
  ('malik.bonnet@example.com', now() - interval '4 days')
on conflict (email) do nothing;

-- ---------- 8 messages du formulaire de contact ----------
-- (n'ajoute rien si ces messages de test existent déjà)
insert into public.contact_messages (nom, email, profil, message, created_at)
select v.nom, v.email, v.profil, v.message, v.created_at
from (values
  ('Sarah Martin', 'sarah.martin@example.com', 'entrepreneur', 'Bonjour, je lance une marque de cosmétiques solides et je cherche un mentor en distribution.', now() - interval '53 days'),
  ('Thomas Durand', 'thomas.durand@example.com', 'investisseur', 'Je suis business angel, comment accéder aux projets en levée de fonds ?', now() - interval '37 days'),
  ('Claire Lefèvre', 'claire.lefevre@example.com', 'mentor', 'Ancienne directrice marketing, je souhaite accompagner 2 à 3 projets par trimestre.', now() - interval '8 days'),
  ('Karim Haddad', 'karim.haddad@example.com', 'entrepreneur', 'Notre application de covoiturage rural cherche des investisseurs pour un premier tour.', now() - interval '15 days'),
  ('Amina Diallo', 'amina.diallo@example.com', 'entrepreneur', 'Est-ce que Fairy peut m''aider à préparer mon pitch avant un concours ?', now() - interval '41 days'),
  ('Julien Girard', 'julien.girard@example.com', 'mentor', 'Expert juridique startups, disponible pour des sessions sur les pactes d''associés.', now() - interval '41 days'),
  ('Nadia Mercier', 'nadia.mercier@example.com', 'autre', 'Je suis journaliste et j''aimerais écrire un article sur Businesseur.', now() - interval '38 days'),
  ('Paul Faure', 'paul.faure@example.com', 'investisseur', 'Quels secteurs sont les plus représentés sur la plateforme ?', now() - interval '4 days')
) as v(nom, email, profil, message, created_at)
where not exists (
  select 1 from public.contact_messages m
  where m.email = v.email and m.message = v.message
);

-- ---------- Vérification ----------
select
  (select count(*) from public.newsletter_subscribers) as abonnes,
  (select count(*) from public.contact_messages)       as messages;

-- Pour SUPPRIMER toutes les données de test plus tard, lance seulement ces 2 lignes :
-- delete from public.newsletter_subscribers where email like '%@example.com';
-- delete from public.contact_messages where email like '%@example.com';
