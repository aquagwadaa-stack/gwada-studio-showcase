-- Restrict write access to the Gwada Web Studio admin account only
DROP POLICY IF EXISTS "Admin connecte peut inserer" ON public.nfc_cards;
DROP POLICY IF EXISTS "Admin connecte peut modifier" ON public.nfc_cards;
DROP POLICY IF EXISTS "Cartes lisibles publiquement" ON public.nfc_cards;

CREATE POLICY "Admin peut tout lire"
  ON public.nfc_cards FOR SELECT TO authenticated
  USING ((auth.jwt() ->> 'email') = 'gwada.web.studio@gmail.com');

CREATE POLICY "Admin peut inserer"
  ON public.nfc_cards FOR INSERT TO authenticated
  WITH CHECK ((auth.jwt() ->> 'email') = 'gwada.web.studio@gmail.com');

CREATE POLICY "Admin peut modifier"
  ON public.nfc_cards FOR UPDATE TO authenticated
  USING ((auth.jwt() ->> 'email') = 'gwada.web.studio@gmail.com')
  WITH CHECK ((auth.jwt() ->> 'email') = 'gwada.web.studio@gmail.com');

-- Public redirection only needs the routing columns
CREATE POLICY "Redirection publique"
  ON public.nfc_cards FOR SELECT TO anon
  USING (true);

REVOKE ALL ON public.nfc_cards FROM anon;
GRANT SELECT (code, target_url, active) ON public.nfc_cards TO anon;
GRANT SELECT, INSERT, UPDATE ON public.nfc_cards TO authenticated;
GRANT ALL ON public.nfc_cards TO service_role;

CREATE INDEX IF NOT EXISTS nfc_cards_code_idx ON public.nfc_cards (code);