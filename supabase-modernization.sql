-- ============================================================
-- 🐾 PETTO CURA — ULTIMATE MASTER SETUP & MODERNIZATION (UNIFIED)
-- Run this entire script in your Supabase SQL Editor
-- This script handles Tables, RLS, Storage, and Premium Content Sync.
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

-- 2. CORE TABLES INITIALIZATION
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
  category TEXT NOT NULL DEFAULT 'grooming', 
  icon TEXT NOT NULL DEFAULT '',
  features TEXT[] NOT NULL DEFAULT '{}',
  image_url TEXT DEFAULT '',
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog Posts (Enhanced for Modernization)
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

-- Ensure modernization columns exist for existing tables
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS featured_image TEXT;

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

-- Site Content (Primary CMS Table)
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

-- Reels/Shorts Player
CREATE TABLE IF NOT EXISTS public.reels (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  video_url TEXT NOT NULL,
  platform TEXT NOT NULL DEFAULT 'youtube', 
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. RLS POLICIES (Allow Public Read + All for Admin)
-- ============================================================

DO $$ 
DECLARE 
  t text;
  tables text[] := ARRAY['site_settings', 'stores', 'services', 'blog_posts', 'testimonials', 'visibility_settings', 'reels', 'site_content', 'page_seo'];
BEGIN
  FOREACH t IN ARRAY tables LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
    
    -- Public Read
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = t AND policyname = 'public_read') THEN
      EXECUTE format('CREATE POLICY public_read ON public.%I FOR SELECT USING (true)', t);
    END IF;
    
    -- Full Ops for Admin (Simplified)
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = t AND policyname = 'full_ops') THEN
      EXECUTE format('CREATE POLICY full_ops ON public.%I FOR ALL USING (true) WITH CHECK (true)', t);
    END IF;
  END LOOP;
END $$;

-- 4. VISUAL MODERNIZATION DATA (IMAGE SYNC)
-- ============================================================

-- A. Homepage Service Images (Unique Assets)
INSERT INTO public.site_content (id, section, page, field_type, label, value, sort_order) VALUES
  ('home_svc_1_image', 'home_services', 'home', 'image', 'Grooming Image', '/pet-grooming.png', 10),
  ('home_svc_2_image', 'home_services', 'home', 'image', 'Boarding Image', '/pet-boarding.png', 11),
  ('home_svc_3_image', 'home_services', 'home', 'image', 'Pickup Image', '/pet-pickup.png', 12),
  ('home_svc_4_image', 'home_services', 'home', 'image', 'Center Image', '/pet-center.png', 13)
ON CONFLICT (id) DO UPDATE SET value = EXCLUDED.value;

-- B. About Page Mission Image
INSERT INTO public.site_content (id, section, page, field_type, label, value, sort_order) VALUES
  ('about_mission_image', 'about_mission', 'about', 'image', 'Mission Section Image', '/pet-mission.png', 20)
ON CONFLICT (id) DO UPDATE SET value = EXCLUDED.value;

-- C. Global Brand Settings
INSERT INTO public.site_content (id, section, page, field_type, label, value, sort_order) VALUES
  ('footer_description', 'brand', 'global', 'textarea', 'Footer Brand Bio', 'Premium pet care studio in Nolambur, Chennai. We provide stress-free grooming, safe boarding, and doorstep pickup services for your beloved pets.', 100),
  ('whatsapp_number', 'contact', 'global', 'text', 'WhatsApp Contact', '919566242236', 101),
  ('navbar_cta_text', 'contact', 'global', 'text', 'Navbar Action Button', 'Book Now', 102)
ON CONFLICT (id) DO UPDATE SET value = EXCLUDED.value;

-- 5. BLOG POSTS WITH NEW VISUALS
-- ============================================================

-- Clean up and Insert/Update default blog posts with premium images
DELETE FROM public.blog_posts WHERE slug IN ('grooming-guide', 'boarding-tips', 'nutrition-guide', 'grooming-signs');

INSERT INTO public.blog_posts (slug, title, excerpt, category, author, date, read_time, featured_image, content) VALUES
  ('grooming-guide', 'The Essential Pet Grooming Guide', 'Everything you need to know about keeping your pet clean and healthy.', 'Grooming', 'Petto Cura Team', 'Mar 25, 2024', '5 min', '/blog-grooming.png', 'Initial grooming content...'),
  ('boarding-tips', 'Boarding Your Pet: A Stress-Free Guide', 'How to prepare your furry friend for their first boarding experience.', 'Boarding', 'Petto Cura Team', 'Mar 24, 2024', '4 min', '/blog-boarding.png', 'Initial boarding content...'),
  ('nutrition-guide', 'The Ultimate Guide to Pet Nutrition', 'Unlocking the secrets to a long, healthy life for your dogs and cats.', 'Health', 'Petto Cura Team', 'Mar 23, 2024', '6 min', '/blog-nutrition.png', 'Initial nutrition content...'),
  ('grooming-signs', '5 Signs Your Pet Needs Professional Grooming', 'Don''t ignore these critical signs that your pet needs a spa day.', 'Grooming', 'Petto Cura Team', 'Mar 22, 2024', '3 min', '/blog-signs.png', 'Initial signs content...')
ON CONFLICT (slug) DO UPDATE SET featured_image = EXCLUDED.featured_image;

-- 6. ADDITIONAL BASE SEED DATA (IF MISSING)
-- ============================================================

INSERT INTO public.site_settings (key, value) VALUES
  ('maintenance_mode', 'false'),
  ('admin_password', 'pettocura2024')
ON CONFLICT (key) DO NOTHING;

INSERT INTO public.stores (id, title, address, lat, lng, phone, status, hours) VALUES
  ('store-1', 'Petto Cura — Nolambur', 'Plot.No.6, Door.No.4, M.C.K Layout, Nolambur, Chennai - 600095', 13.068643, 80.162437, '+91 95662 42236', 'open', '9:00 AM to 8:00 PM')
ON CONFLICT (id) DO NOTHING;

-- Visibility Settings
INSERT INTO public.visibility_settings (key, visible) VALUES
  ('home', true), ('grooming', true), ('boarding', true), ('find-a-center', true), ('blog', true), ('contact', true),
  ('home-hero', true), ('home-services', true), ('home-trust', true), ('home-whyus', true), ('home-cta', true), ('home-testimonials', true), ('home-franchise', true)
ON CONFLICT (key) DO NOTHING;

-- ============================================================
-- ✅ MASTER SETUP COMPLETED SUCCESSFULLY!
-- Your Petto Cura environment is now officially modernized.
-- ============================================================
