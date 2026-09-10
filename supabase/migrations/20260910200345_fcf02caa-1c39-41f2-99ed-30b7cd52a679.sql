CREATE TABLE public.nfc_cards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE,
  merchant_name text,
  target_url text,
  active boolean NOT NULL DEFAULT false,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.nfc_cards TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.nfc_cards TO authenticated;
GRANT ALL ON public.nfc_cards TO service_role;

ALTER TABLE public.nfc_cards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Cartes lisibles publiquement" ON public.nfc_cards FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admin connecte peut modifier" ON public.nfc_cards FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin connecte peut inserer" ON public.nfc_cards FOR INSERT TO authenticated WITH CHECK (true);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_nfc_cards_updated_at BEFORE UPDATE ON public.nfc_cards
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.nfc_cards (code)
SELECT 'GW' || lpad(i::text, 3, '0') FROM generate_series(1, 40) AS i;