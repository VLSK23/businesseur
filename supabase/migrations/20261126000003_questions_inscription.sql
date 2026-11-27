-- =========================================================
-- BUSINESSEUR — migration 3 : questions d'inscription
-- À coller dans Supabase > SQL Editor > Run,
-- APRÈS les migrations 1 et 2.
-- =========================================================

-- Entrepreneur : à quel stade est le projet ?
alter table public.profiles
  add column if not exists stade_projet text;

alter table public.profiles drop constraint if exists profiles_stade_projet_check;
alter table public.profiles
  add constraint profiles_stade_projet_check
  check (stade_projet is null or stade_projet in
    ('idee', 'prototype', 'lancement', 'croissance', 'levee_de_fonds'));

-- Mentor : quelles spécialités accompagner ? (plusieurs choix possibles)
alter table public.profiles
  add column if not exists specialites text[] not null default '{}';

alter table public.profiles drop constraint if exists profiles_specialites_check;
alter table public.profiles
  add constraint profiles_specialites_check
  check (specialites <@ array['strategie', 'marketing', 'vente', 'finance', 'juridique',
                              'tech', 'rh', 'international', 'impact']::text[]);

-- À l'inscription, on enregistre aussi ces réponses.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  meta jsonb := coalesce(new.raw_user_meta_data, '{}'::jsonb);
  choix text := meta ->> 'profil';
  stade text := meta ->> 'stade_projet';
  specs text[] := '{}';
begin
  if choix is null or choix not in ('entrepreneur', 'mentor', 'investisseur') then
    choix := 'entrepreneur';
  end if;

  if choix <> 'entrepreneur'
     or stade not in ('idee', 'prototype', 'lancement', 'croissance', 'levee_de_fonds') then
    stade := null;
  end if;

  if choix = 'mentor' and jsonb_typeof(meta -> 'specialites') = 'array' then
    select coalesce(array_agg(s), '{}') into specs
    from jsonb_array_elements_text(meta -> 'specialites') as s
    where s in ('strategie', 'marketing', 'vente', 'finance', 'juridique',
                'tech', 'rh', 'international', 'impact');
  end if;

  insert into public.profiles (id, email, full_name, profil, stade_projet, specialites)
  values (new.id, new.email, meta ->> 'full_name', choix, stade, specs);
  return new;
end;
$$;
