DROP POLICY IF EXISTS "Redirection publique" ON public.nfc_cards;

CREATE POLICY "Redirection publique"
ON public.nfc_cards
FOR SELECT
TO anon
USING (active = true AND target_url IS NOT NULL);