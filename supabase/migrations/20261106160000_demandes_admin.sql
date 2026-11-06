-- Le compte du studio peut lire les demandes et les marquer comme traitées.
drop policy if exists "Admin peut lire les demandes" on public.demandes;
create policy "Admin peut lire les demandes" on public.demandes
  for select to authenticated
  using ((auth.jwt() ->> 'email') = 'gwada.web.studio@gmail.com');

drop policy if exists "Admin peut marquer les demandes" on public.demandes;
create policy "Admin peut marquer les demandes" on public.demandes
  for update to authenticated
  using ((auth.jwt() ->> 'email') = 'gwada.web.studio@gmail.com')
  with check ((auth.jwt() ->> 'email') = 'gwada.web.studio@gmail.com');

grant select on public.demandes to authenticated;
grant update (traitee) on public.demandes to authenticated;
