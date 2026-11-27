# Businesseur

L'oasis des entrepreneurs, mentors et investisseurs. Site Next.js relié à une base de données Supabase.

## Pages

| Adresse | Contenu |
| --- | --- |
| `/` | Page d'accueil (newsletter et formulaire de contact) |
| `/connexion` | Connexion et inscription (entrepreneur, mentor, investisseur) |
| `/compte` | Espace membre : modifier son profil, se déconnecter |
| `/don` | Faire un don |

## Base de données (dossier `supabase/`)

Dans Supabase > **SQL Editor**, lancer dans l'ordre :

1. `supabase/migrations/20261126000001_victoria_init.sql` : table `profiles` et sécurité (RLS)
2. `supabase/migrations/20261126000002_businesseur.sql` : profil Businesseur, `contact_messages`, `newsletter_subscribers`
3. `supabase/migrations/20261126000003_questions_inscription.sql` : stade du projet (entrepreneur), spécialités (mentor)
4. `supabase/seed.sql` (facultatif) : faux abonnés et faux messages pour tester

## Lancer le site sur son ordinateur

1. Copier `.env.example` en `.env` et y mettre ses clés Supabase.
2. `npm install`
3. `npm run dev`, puis ouvrir http://localhost:3000

## Mettre en ligne sur Vercel

1. Sur vercel.com : **Add New → Project**, choisir ce dépôt GitHub.
2. Dans **Environment Variables**, ajouter `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.
3. **Deploy**.
4. Dans Supabase > Authentication > URL Configuration : mettre l'adresse Vercel dans *Site URL* et ajouter `https://<adresse-vercel>/compte` dans *Redirect URLs*.
