-- ============================================================
-- PETTO CURA — MASTER CONSOLIDATED DATABASE SETUP
-- This script replaces all previous setups. Run this ONCE in your 
-- Supabase SQL Editor to initialize/update everything.
-- ============================================================

-- 1. EXTENSIONS & STORAGE
-- ============================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('site-media', 'site-media', true, 10485760, ARRAY['image/webp', 'image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'])
ON CONFLICT (id) DO NOTHING;

-- 2. TABLE DEFINITIONS
-- ============================================================

CREATE TABLE IF NOT EXISTS public.site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.site_content (
  id TEXT PRIMARY KEY,
  section TEXT NOT NULL,
  page TEXT NOT NULL,
  field_type TEXT NOT NULL DEFAULT 'text',
  label TEXT NOT NULL,
  value TEXT NOT NULL DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.page_seo (
  page TEXT PRIMARY KEY,
  meta_title TEXT NOT NULL DEFAULT '',
  meta_description TEXT NOT NULL DEFAULT '',
  meta_keywords TEXT NOT NULL DEFAULT '',
  og_title TEXT NOT NULL DEFAULT '',
  og_description TEXT NOT NULL DEFAULT '',
  og_image TEXT NOT NULL DEFAULT '',
  canonical_url TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.stores (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  address TEXT NOT NULL,
  lat DOUBLE PRECISION NOT NULL DEFAULT 0,
  lng DOUBLE PRECISION NOT NULL DEFAULT 0,
  phone TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'open',
  hours TEXT NOT NULL DEFAULT '',
  photos TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.visibility_settings (
  key TEXT PRIMARY KEY,
  visible BOOLEAN NOT NULL DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. RLS POLICIES (Public Read + Full Operations)
-- ============================================================
DO $$ 
DECLARE 
  t text;
  tables text[] := ARRAY['site_settings', 'site_content', 'page_seo', 'stores', 'visibility_settings'];
BEGIN
  FOREACH t IN ARRAY tables LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = t AND policyname = 'public_read') THEN
      EXECUTE format('CREATE POLICY public_read ON public.%I FOR SELECT USING (true)', t);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = t AND policyname = 'full_ops') THEN
      EXECUTE format('CREATE POLICY full_ops ON public.%I FOR ALL USING (true) WITH CHECK (true)', t);
    END IF;
  END LOOP;
END $$;

-- 4. SEED DATA — CORE SETTINGS
-- ============================================================

INSERT INTO public.site_settings (key, value) VALUES
  ('maintenance_mode', 'false'),
  ('admin_password', 'pettocura2024')
ON CONFLICT (key) DO NOTHING;

INSERT INTO public.stores (id, title, address, lat, lng, phone, status, hours) VALUES
  ('store-1', 'Petto Cura — Nolambur', 'Plot.No.6, Door.No.4, M.C.K Layout, Nolambur, Chennai - 600095', 13.068643, 80.162437, '+91 95662 42236', 'open', '9:00 AM to 8:00 PM')
ON CONFLICT (id) DO UPDATE SET address = EXCLUDED.address, phone = EXCLUDED.phone;

-- 5. SEED DATA — COMPLETE SITE CONTENT
-- ============================================================

INSERT INTO public.site_content (id, section, page, field_type, label, value, sort_order) VALUES

-- GLOBAL & COMMON (NAV, FOOTER, POPUP, STRIP)
('global_whatsapp_number', 'global_contact', 'global', 'text', 'WhatsApp Number', '919566242236', 1),
('contact_email', 'global_contact', 'global', 'text', 'Business Email', 'hello@pettocura.com', 2),
('contact_phone', 'global_contact', 'global', 'text', 'Business Phone', '+91 95662 42236', 3),
('contact_address', 'global_contact', 'global', 'textarea', 'Business Address', 'Plot.No.6, Door.No.4, M.C.K Layout, Nolambur, Chennai - 600095', 4),
('contact_hours', 'global_contact', 'global', 'text', 'Operating Hours', '9:00 AM to 8:00 PM, 7 days/week', 5),
('nav_cta_text', 'global_ui', 'global', 'text', 'Navbar CTA Text', 'Book Appointment', 6),
('footer_description', 'global_ui', 'global', 'textarea', 'Footer Brand Description', 'Premium pet grooming and boarding services in Chennai. Where every tail wags with joy and every whisker shines with care.', 7),
('lead_popup_title', 'global_popup', 'global', 'text', 'Popup Title', 'Get 20% OFF Your First Visit!', 8),
('lead_popup_discount', 'global_popup', 'global', 'text', 'Discount Code', 'WELCOMEOFFER', 9),
('service_strip_data', 'global_ui', 'global', 'textarea', 'Service Strip JSON', '[{"name": "Pet Grooming", "icon": "/icons/pet-grooming.png", "href": "/grooming"},{"name": "Pet Boarding", "icon": "/icons/pet-boarding.png", "href": "/boarding"},{"name": "Doorstep Pickup", "icon": "/icons/pet-pickup.png", "href": "/contact"}]', 10),

-- HOME PAGE
('home_hero_title', 'home_hero', 'home', 'text', 'Hero Title', 'Where Every Tail Wags With', 1),
('home_hero_highlight', 'home_hero', 'home', 'text', 'Hero Highlight', 'Joy', 2),
('home_hero_subtitle', 'home_hero', 'home', 'textarea', 'Hero Subtitle', 'Experience professional pet grooming & cage-free boarding in Nolambur, Chennai.', 3),
('home_svc_1_title', 'home_services', 'home', 'text', 'Service 1 Title', 'Pet Grooming', 10),
('home_svc_1_desc', 'home_services', 'home', 'textarea', 'Service 1 Desc', 'Full body grooming and spa treatments by certified professionals.', 11),
('home_svc_2_title', 'home_services', 'home', 'text', 'Service 2 Title', 'Pet Boarding', 12),
('home_svc_2_desc', 'home_services', 'home', 'textarea', 'Service 2 Desc', 'Safe, CCTV-monitored boarding with climate control.', 13),

-- ABOUT PAGE
('about_hero_title', 'about_hero', 'about', 'text', 'Hero Title', 'Passion for Pets, Built with', 1),
('about_hero_highlight', 'about_hero', 'about', 'text', 'Hero Highlight', 'Care', 2),
('about_mission_title', 'about_mission', 'about', 'text', 'Mission Title', 'Redefining Pet Care in Chennai', 10),

-- GROOMING PAGE
('grooming_hero_title', 'grooming_hero', 'grooming', 'text', 'Hero Title', 'Premium Pet Grooming Studio in', 1),
('grooming_hero_highlight', 'grooming_hero', 'grooming', 'text', 'Hero Highlight', 'Nolambur, Chennai', 2),
('grooming_hero_badge', 'grooming_hero', 'grooming', 'text', 'Grooming Badge', 'GRAND OPENING OFFER - 20% OFF', 0),

-- BOARDING PAGE
('boarding_hero_title', 'boarding_hero', 'boarding', 'text', 'Hero Title', 'Safe Pet Boarding for', 1),
('boarding_hero_highlight', 'boarding_hero', 'boarding', 'text', 'Hero Highlight', 'All Breeds', 2),
('boarding_live_phone_icon_1', 'boarding_live', 'boarding', 'text', 'Phone Mockup Icon 1', '🐕', 10),
('boarding_live_phone_icon_3', 'boarding_live', 'boarding', 'text', 'Phone Mockup Icon 3', '😴🐕', 11),

-- CONTACT PAGE
('contact_header_badge', 'contact_header', 'contact', 'text', 'Header Badge', 'Get In Touch', 1),
('contact_header_title', 'contact_header', 'contact', 'text', 'Header Title', 'Book an Appointment', 2),

-- FRANCHISE PAGE
('f_hero_title', 'franchise_hero', 'franchise', 'text', 'Hero Title', 'Own a Petto Cura', 1),
('f_hero_highlight', 'franchise_hero', 'franchise', 'text', 'Hero Highlight', 'Franchise', 2),
('f_cta_title', 'franchise_cta', 'franchise', 'text', 'CTA Title', 'Ready to Start Your Pet Care Empire?', 20)

ON CONFLICT (id) DO UPDATE SET 
  value = EXCLUDED.value, 
  page = EXCLUDED.page, 
  section = EXCLUDED.section,
  label = EXCLUDED.label,
  field_type = EXCLUDED.field_type;

-- 6. DEFAULT VISIBILITY
-- ============================================================
INSERT INTO public.visibility_settings (key, visible) VALUES
  ('home', true), ('grooming', true), ('boarding', true), ('find-a-center', true), ('contact', true), ('franchise', true)
ON CONFLICT (key) DO NOTHING;

-- 7. PAGE SEO
-- ============================================================
INSERT INTO public.page_seo (page, meta_title, meta_description, canonical_url) VALUES
  ('home', 'Petto Cura — Premium Pet Grooming & Boarding in Chennai', 'Best pet grooming in Nolambur, Chennai. 20% Grand Opening Discount.', 'https://pettocura.com'),
  ('grooming', 'Pet Grooming in Nolambur | Petto Cura', 'Expert pet grooming by certified experts. 20% OFF Grand Opening Offer.', 'https://pettocura.com/grooming')
ON CONFLICT (page) DO NOTHING;
