-- Demandes envoyées par les formulaires du site : démo gratuite et contact.
-- Le site peut seulement en déposer : personne ne peut les relire avec la clé publique.
create table if not exists public.demandes (
  id uuid primary key default gen_random_uuid(),
  recue_le timestamptz not null default now(),
  formulaire text not null check (formulaire in ('demo', 'contact')),
  source text check (char_length(source) <= 60),
  entreprise text not null check (char_length(entreprise) between 1 and 200),
  telephone text check (char_length(telephone) <= 60),
  email text check (char_length(email) <= 200),
  details jsonb not null default '{}'::jsonb check (pg_column_size(details) <= 8000),
  traitee boolean not null default false
);

alter table public.demandes enable row level security;

drop policy if exists "Le site peut déposer une demande" on public.demandes;
create policy "Le site peut déposer une demande" on public.demandes
  for insert to anon, authenticated
  with check (traitee = false);

revoke all on public.demandes from anon, authenticated;
grant insert (formulaire, source, entreprise, telephone, email, details)
  on public.demandes to anon, authenticated;
