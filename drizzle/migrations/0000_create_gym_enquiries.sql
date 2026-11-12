CREATE TABLE public.gym_enquiries (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 reference uuid NOT NULL UNIQUE,
 created_at timestamptz NOT NULL DEFAULT now(),
 name text NOT NULL CHECK (char_length(name) BETWEEN 2 AND 100),
 contact text NOT NULL CHECK (char_length(contact) BETWEEN 5 AND 255),
 program text NOT NULL DEFAULT '' CHECK (char_length(program) <= 100),
 context text NOT NULL DEFAULT '' CHECK (char_length(context) <= 300),
 preferred_date date,
 method text NOT NULL CHECK (method IN ('WhatsApp','Call','Email')),
 message text NOT NULL DEFAULT '' CHECK (char_length(message) <= 2000),
 consent boolean NOT NULL CHECK (consent = true)
);
GRANT INSERT ON public.gym_enquiries TO anon, authenticated;
GRANT ALL ON public.gym_enquiries TO service_role;
ALTER TABLE public.gym_enquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Visitors may submit enquiries" ON public.gym_enquiries FOR INSERT TO anon, authenticated WITH CHECK (consent = true);