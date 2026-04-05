-- ============================================================
-- PETTO CURA — MASTER CMS DATABASE SETUP (UNIFIED)
-- Run this entire script in your Supabase SQL Editor
-- ============================================================

-- 1. EXTENSIONS & STORAGE SETUP
-- ============================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create Supabase Storage Bucket (if not exists)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'site-media',
  'site-media',
  true,
  10485760, -- 10MB
  ARRAY['image/webp', 'image/jpeg', 'image/png', 'image/gif', 'image/svg+xml']
)
ON CONFLICT (id) DO NOTHING;

-- 2. CORE TABLES
-- ============================================================

-- Site Settings (maintenance mode, admin password)
CREATE TABLE IF NOT EXISTS public.site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Stores/Locations
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

-- Services
CREATE TABLE IF NOT EXISTS public.services (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  price TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT 'grooming', -- 'grooming' or 'boarding'
  icon TEXT NOT NULL DEFAULT '',
  features TEXT[] NOT NULL DEFAULT '{}',
  image_url TEXT DEFAULT '',
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog Posts
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT '',
  author TEXT NOT NULL DEFAULT '',
  date TEXT NOT NULL DEFAULT '',
  read_time TEXT NOT NULL DEFAULT '',
  image TEXT NOT NULL DEFAULT '', -- legacy field
  featured_image TEXT DEFAULT '', -- modern WebP field
  meta_title TEXT DEFAULT '',
  meta_description TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Testimonials
CREATE TABLE IF NOT EXISTS public.testimonials (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  pet TEXT NOT NULL DEFAULT '',
  text TEXT NOT NULL,
  rating INT NOT NULL DEFAULT 5,
  photo_url TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Visibility Settings (Toggle sections on/off)
CREATE TABLE IF NOT EXISTS public.visibility_settings (
  key TEXT PRIMARY KEY,
  visible BOOLEAN NOT NULL DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. CMS & MODERNIZATION TABLES
-- ============================================================

-- Reels/Shorts Player
CREATE TABLE IF NOT EXISTS public.reels (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  video_url TEXT NOT NULL,
  platform TEXT NOT NULL DEFAULT 'youtube', -- 'youtube', 'vimeo', 'instagram'
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Site Content (Section-by-section dynamic content)
CREATE TABLE IF NOT EXISTS public.site_content (
  id TEXT PRIMARY KEY,
  section TEXT NOT NULL,
  page TEXT NOT NULL,
  field_type TEXT NOT NULL DEFAULT 'text', -- 'text', 'textarea', 'url', 'image'
  label TEXT NOT NULL,
  value TEXT NOT NULL DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Page SEO Metadata
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

-- Media Library (Asset Tracker)
CREATE TABLE IF NOT EXISTS public.media_library (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size INTEGER DEFAULT 0,
  mime_type TEXT DEFAULT 'image/webp',
  alt_text TEXT DEFAULT '',
  folder TEXT DEFAULT 'general',
  uploaded_at TIMESTAMPTZ DEFAULT now()
);

-- 4. RLS POLICIES (Allow Public Read + All for Admin via Key)
-- ============================================================

-- TABLES RLS
DO $$ 
DECLARE 
  t text;
  tables text[] := ARRAY['site_settings', 'stores', 'services', 'blog_posts', 'testimonials', 'visibility_settings', 'reels', 'site_content', 'page_seo', 'media_library'];
BEGIN
  FOREACH t IN ARRAY tables LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
    
    -- Public Read
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = t AND policyname = 'public_read') THEN
      EXECUTE format('CREATE POLICY public_read ON public.%I FOR SELECT USING (true)', t);
    END IF;
    
    -- Full Ops (Simplified for CMS - assumes key usage)
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = t AND policyname = 'full_ops') THEN
      EXECUTE format('CREATE POLICY full_ops ON public.%I FOR ALL USING (true) WITH CHECK (true)', t);
    END IF;
  END LOOP;
END $$;

-- STORAGE RLS
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND policyname = 'Public read site-media') THEN
    CREATE POLICY "Public read site-media" ON storage.objects FOR SELECT USING (bucket_id = 'site-media');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND policyname = 'Allow upload site-media') THEN
    CREATE POLICY "Allow upload site-media" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'site-media');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND policyname = 'Allow update site-media') THEN
    CREATE POLICY "Allow update site-media" ON storage.objects FOR UPDATE USING (bucket_id = 'site-media');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND policyname = 'Allow delete site-media') THEN
    CREATE POLICY "Allow delete site-media" ON storage.objects FOR DELETE USING (bucket_id = 'site-media');
  END IF;
END $$;

-- 5. SEED DATA
-- ============================================================

-- Admin settings
INSERT INTO public.site_settings (key, value) VALUES
  ('maintenance_mode', 'false'),
  ('admin_password', 'pettocura2024')
ON CONFLICT (key) DO NOTHING;

-- Default store
INSERT INTO public.stores (id, title, address, lat, lng, phone, status, hours) VALUES
  ('store-1', 'Petto Cura — Nolambur', 'Plot.No.6, Door.No.4, M.C.K Layout, Nolambur, Chennai - 600095', 13.068643, 80.162437, '+91 95662 42236', 'open', '9:00 AM to 8:00 PM')
ON CONFLICT (id) DO UPDATE SET hours = EXCLUDED.hours;

-- Default services
INSERT INTO public.services (id, name, description, price, category, icon, features, sort_order) VALUES
  ('svc-1', 'Spa Bath', 'Perfect for regular hygiene care. Includes premium shampoo & conditioner bath, blow dry, nail clipping, and more.', '₹960', 'grooming', '🛁', ARRAY['Shampoo & conditioner bath', 'Blow dry', 'Nail clipping', 'Ear cleaning', 'Paw cleaning & cream', 'Brushing & combing', 'Mouth spray'], 1),
  ('svc-2', 'Bath + Basic Grooming', 'A step up for thorough care. Includes all Spa Bath features plus sanitary trim and face trimming.', '₹1440', 'grooming', '✂️', ARRAY['Bath with shampoo & conditioner', 'Blow Dry & sanitary trim', 'Nail clipping & face trimming', 'Paw massage', 'Combing / brushing', 'Mouth spray'], 2),
  ('svc-3', 'Full Service', 'The ultimate royal treatment. Complete body haircut, styling, and relaxing body massage.', '₹2000', 'grooming', '👑', ARRAY['Full grooming', 'Full body haircut / styling', 'Blow Dry & sanitary trim', 'Paw massage', 'Body massage', 'Combing / brushing', 'Mouth spray'], 3),
  ('svc-4', 'Overnight Boarding', 'Safe, comfortable & cage-free stay for all breeds with 2-3 walks daily and playtime.', '₹1300/night', 'boarding', '🏠', ARRAY['Comfortable & Hygienic Stay', '2-3 Walks Daily', 'Playtime & Supervision', 'Fresh Water & Clean Space', 'Stress-Free Environment', 'Personalized Care'], 4),
  ('svc-5', 'Grooming Add-ons', 'Extra care treatments to supplement your pet''s grooming session.', 'Starts ₹300', 'grooming', '✨', ARRAY['Tick Treatment (₹600+)', 'Dematting (₹500+)', 'Pet Taxi (₹300+)', 'Medication Care (on request)'], 5),
  ('svc-6', 'Boarding Food Options', 'Choose between bringing your own pet food or using our premium meals.', '₹200/day', 'boarding', '🍖', ARRAY['Owner Food - No Extra Charge', 'Our Food - ₹200 / Day', 'Fresh Water & Clean Space', 'Special Dietary Handling'], 6)
ON CONFLICT (id) DO UPDATE SET 
  name = EXCLUDED.name, 
  description = EXCLUDED.description, 
  price = EXCLUDED.price, 
  features = EXCLUDED.features;

-- Default testimonials
INSERT INTO public.testimonials (id, name, pet, text, rating) VALUES
  ('t-1', 'Priya S.', 'Bruno (Golden Retriever)', 'Amazing grooming service! Bruno came back looking like a show dog. The team is so gentle and caring. Best pet grooming in Nolambur!', 5),
  ('t-2', 'Karthik R.', 'Milo (Labrador)', 'The boarding facility is spotless and Milo loves it there. Live CCTV updates gave me complete peace of mind during my trip.', 5),
  ('t-3', 'Swetha M.', 'Cookie (Shih Tzu)', 'Doorstep pickup is a game changer! They picked up Cookie, groomed her beautifully, and brought her back. So convenient!', 5),
  ('t-4', 'Arjun K.', 'Rocky (German Shepherd)', 'Professional, punctual, and passionate about pets. Rocky actually gets excited when he sees the Petto Cura van arrive!', 5)
ON CONFLICT (id) DO NOTHING;

-- Default content for Site Editor
INSERT INTO public.site_content (id, section, page, field_type, label, value, sort_order) VALUES
  ('home_hero_badge', 'home_hero', 'home', 'text', 'Hero Badge Text', 'GRAND OPENING OFFER - 20% OFF', 0),
  ('home_hero_title', 'home_hero', 'home', 'text', 'Hero Title', 'Where Every Tail Wags With', 1),
  ('home_hero_highlight', 'home_hero', 'home', 'text', 'Hero Highlight Word', 'Joy', 2),
  ('home_hero_subtitle', 'home_hero', 'home', 'textarea', 'Hero Subtitle', 'Experience professional pet grooming & cage-free boarding in Nolambur, Chennai. Enjoy 20% off grooming during our Grand Opening!', 3),
  ('home_hero_cta_text', 'home_hero', 'home', 'text', 'Primary CTA Text', 'Book Slot Now', 4),
  ('home_hero_secondary_text', 'home_hero', 'home', 'text', 'Secondary CTA Text', 'New Prices', 6),
  ('home_services_title', 'home_services', 'home', 'text', 'Services Section Title', 'Everything Your Pet Needs', 10),
  ('home_services_subtitle', 'home_services', 'home', 'textarea', 'Services Section Subtitle', 'From head-to-paw grooming to safe overnight boarding, we provide comprehensive pet care with love.', 11),
  ('home_cta_title', 'home_cta', 'home', 'text', 'CTA Section Title', 'Ready to Pamper Your Pet?', 30),
  ('grooming_hero_title', 'grooming_hero', 'grooming', 'text', 'Hero Title', 'Premium Pet Grooming Studio in', 1),
  ('boarding_hero_title', 'boarding_hero', 'boarding', 'text', 'Hero Title', 'Safe Pet Boarding for', 1),
  ('boarding_pkg_with_food_price', 'boarding_packages', 'boarding', 'text', 'Our Food Price', '₹200/day', 10),
  ('boarding_pkg_without_food_price', 'boarding_packages', 'boarding', 'text', 'Owner Food Price', '₹0', 11),
  ('contact_phone', 'contact_info', 'contact', 'text', 'Phone', '+91 95662 42236', 3),
  ('contact_hours', 'contact_info', 'contact', 'text', 'Business Hours', '9:00 AM to 8:00 PM, 7 days/week', 5),
  ('franchise_hero_title', 'franchise_hero', 'franchise', 'text', 'Hero Title', 'Own a Petto Cura', 0),
  ('franchise_hero_highlight', 'franchise_hero', 'franchise', 'text', 'Hero Highlight', 'Franchise', 1)
ON CONFLICT (id) DO UPDATE SET value = EXCLUDED.value;

-- Default SEO data
INSERT INTO public.page_seo (page, meta_title, meta_description, meta_keywords, og_title, og_description, canonical_url) VALUES
  ('home', 'Petto Cura — Premium Pet Grooming & Boarding in Chennai', 'Best pet grooming in Nolambur, Chennai. 20% Grand Opening Discount. Professional dog grooming, cage-free boarding, doorstep pickup.', 'pet grooming Nolambur, pet boarding Chennai, dog grooming near me, Petto Cura', 'Petto Cura — Premium Pet Grooming & Boarding', 'Where every tail wags with joy. Premium pet care in Chennai.', 'https://pettocura.com'),
  ('grooming', 'Pet Grooming Services in Nolambur, Chennai | Petto Cura', 'Expert pet grooming by certified groomers. 20% OFF Grand Opening Offer. Spa bath, full service grooming available.', 'pet grooming Chennai, dog grooming Nolambur', 'Pet Grooming — Petto Cura', 'Professional grooming services for your furry friend.', 'https://pettocura.com/grooming'),
  ('boarding', 'Pet Boarding in Nolambur, Chennai | Petto Cura', 'Safe cage-free pet boarding with daily updates. Starting ₹1300/night.', 'pet boarding Chennai, dog boarding Nolambur', 'Pet Boarding — Petto Cura', 'Safe and comfortable boarding for your pet.', 'https://pettocura.com/boarding'),
  ('contact', 'Book Appointment — Petto Cura, Nolambur Chennai', 'Book your pet grooming or boarding appointment at Petto Cura Nolambur.', 'book pet grooming, pet appointment Chennai, Petto Cura contact', 'Book Appointment — Petto Cura', 'Get in touch with us for pet care services.', 'https://pettocura.com/contact'),
  ('blog', 'Pet Care Blog — Tips & Guides | Petto Cura', 'Read expert pet care tips, grooming guides, health advice and more.', 'pet care blog, dog grooming tips, pet health', 'Pet Care Blog — Petto Cura', 'Expert tips for pet parents.', 'https://pettocura.com/blog'),
  ('franchise', 'Franchise Opportunity — Own a Petto Cura Pet Care Center', 'Start your own pet care business with Petto Cura franchise.', 'pet franchise India, pet care franchise', 'Franchise — Petto Cura', 'Own a Petto Cura franchise.', 'https://pettocura.com/franchise'),
  ('find-a-center', 'Find a Petto Cura Center Near You | Chennai', 'Locate the nearest Petto Cura pet care center in Chennai.', 'Petto Cura location, pet grooming near me', 'Find a Center — Petto Cura', 'Find our locations in Chennai.', 'https://pettocura.com/find-a-center')
ON CONFLICT (page) DO NOTHING;

-- Default Visibility (all components enabled)
INSERT INTO public.visibility_settings (key, visible) VALUES
  ('home', true), ('grooming', true), ('boarding', true), ('find-a-center', true), ('blog', true), ('contact', true),
  ('home-hero', true), ('home-services', true), ('home-trust', true), ('home-whyus', true), ('home-cta', true), ('home-testimonials', true), ('home-franchise', true),
  ('grooming-hero', true), ('grooming-services', true), ('boarding-hero', true), ('boarding-services', true),
  ('center-map', true), ('blog-grid', true), ('contact-form', true)
ON CONFLICT (key) DO NOTHING;

-- ============================================================
-- ✅ MASTER SETUP COMPLETE! 
-- Run this in Supabase SQL Editor to initialize/update everything.
-- ============================================================
