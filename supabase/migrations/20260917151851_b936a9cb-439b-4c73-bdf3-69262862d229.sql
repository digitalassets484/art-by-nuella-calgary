CREATE TABLE public.contact_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  contact TEXT NOT NULL,
  city TEXT,
  project_type TEXT,
  timeline TEXT,
  message TEXT NOT NULL,
  source_page TEXT NOT NULL DEFAULT 'home',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT INSERT ON public.contact_leads TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.contact_leads TO authenticated;
GRANT ALL ON public.contact_leads TO service_role;

ALTER TABLE public.contact_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can send an inquiry"
ON public.contact_leads
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(trim(name)) BETWEEN 2 AND 120
  AND length(trim(contact)) BETWEEN 5 AND 180
  AND length(trim(message)) BETWEEN 8 AND 2000
);

CREATE POLICY "Signed-in users can manage inquiries"
ON public.contact_leads
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);