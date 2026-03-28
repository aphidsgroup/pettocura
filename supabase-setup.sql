-- ============================================
-- Petto Cura CMS — Full Database Setup
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. Site Settings (maintenance mode, admin password)
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Stores
CREATE TABLE IF NOT EXISTS stores (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  address TEXT NOT NULL,
  lat DOUBLE PRECISION NOT NULL DEFAULT 0,
  lng DOUBLE PRECISION NOT NULL DEFAULT 0,
  phone TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'open',
  hours TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Services
CREATE TABLE IF NOT EXISTS services (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  price TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT 'grooming',
  icon TEXT NOT NULL DEFAULT '',
  features TEXT[] NOT NULL DEFAULT '{}',
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Blog Posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT '',
  author TEXT NOT NULL DEFAULT '',
  date TEXT NOT NULL DEFAULT '',
  read_time TEXT NOT NULL DEFAULT '',
  image TEXT NOT NULL DEFAULT '',
  meta_title TEXT NOT NULL DEFAULT '',
  meta_description TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  pet TEXT NOT NULL DEFAULT '',
  text TEXT NOT NULL,
  rating INT NOT NULL DEFAULT 5,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Visibility Settings
CREATE TABLE IF NOT EXISTS visibility_settings (
  key TEXT PRIMARY KEY,
  visible BOOLEAN NOT NULL DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Enable RLS on all tables
-- ============================================
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE visibility_settings ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS Policies — Allow public read + write via anon key
-- ============================================
CREATE POLICY "public_read" ON site_settings FOR SELECT USING (true);
CREATE POLICY "public_write" ON site_settings FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "public_read" ON stores FOR SELECT USING (true);
CREATE POLICY "public_write" ON stores FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "public_read" ON services FOR SELECT USING (true);
CREATE POLICY "public_write" ON services FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "public_read" ON blog_posts FOR SELECT USING (true);
CREATE POLICY "public_write" ON blog_posts FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "public_read" ON testimonials FOR SELECT USING (true);
CREATE POLICY "public_write" ON testimonials FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "public_read" ON visibility_settings FOR SELECT USING (true);
CREATE POLICY "public_write" ON visibility_settings FOR ALL USING (true) WITH CHECK (true);

-- ============================================
-- Seed Default Data
-- ============================================

-- Admin settings
INSERT INTO site_settings (key, value) VALUES
  ('maintenance_mode', 'false'),
  ('admin_password', 'pettocura2024')
ON CONFLICT (key) DO NOTHING;

-- Default store
INSERT INTO stores (id, title, address, lat, lng, phone, status, hours) VALUES
  ('store-1', 'Petto Cura — Nolambur', 'Plot.No.6, Door.No.4, M.C.K Layout, Nolambur, Chennai - 600095', 13.068643, 80.162437, '+91 95662 42236', 'open', '8:00 AM – 8:00 PM')
ON CONFLICT (id) DO NOTHING;

-- Default services
INSERT INTO services (id, name, description, price, category, icon, features, sort_order) VALUES
  ('svc-1', 'Full Body Grooming', 'Complete grooming package including bath, haircut, ear cleaning, nail trimming, and blowdry with premium shampoo.', '₹1,499', 'grooming', '✂️', ARRAY['Premium Shampoo Bath', 'Breed-specific Haircut', 'Ear Cleaning', 'Nail Trimming & Filing', 'Blow Dry & Brushing'], 1),
  ('svc-2', 'Spa & De-shedding', 'Luxurious spa treatment with deep conditioning, de-shedding therapy, and aromatherapy for a calm, happy pet.', '₹1,999', 'grooming', '🧖', ARRAY['Deep Conditioning Mask', 'De-shedding Therapy', 'Aromatherapy Massage', 'Paw Moisturizing', 'Teeth Brushing'], 2),
  ('svc-3', 'Basic Bath & Brush', 'A quick refresher including a warm bath, gentle brushing, and ear check for your furry friend.', '₹799', 'grooming', '🛁', ARRAY['Warm Bath', 'Gentle Brushing', 'Ear Check', 'Towel & Blow Dry', 'Cologne Spritz'], 3),
  ('svc-4', 'Puppy First Groom', 'Gentle introduction to grooming for puppies aged 3-6 months. A trust-building experience for your little one.', '₹599', 'grooming', '🐾', ARRAY['Gentle Handling', 'Puppy-safe Shampoo', 'Light Trim', 'Nail Trim', 'Positive Reinforcement'], 4),
  ('svc-5', 'Overnight Boarding', 'Safe, climate-controlled overnight stay with CCTV monitoring, regular feeding, and playtime sessions.', '₹999/night', 'boarding', '🏠', ARRAY['Climate Controlled Room', '24/7 CCTV Monitoring', '3 Meals/Day', 'Daily Playtime', 'Photo Updates'], 5),
  ('svc-6', 'Premium Suite Boarding', 'Luxury private suite with personal attention, webcam access, daily grooming touch-ups, and vet on-call.', '₹1,799/night', 'boarding', '👑', ARRAY['Private Suite', 'Live Webcam Access', 'Personal Caretaker', 'Daily Grooming', 'Vet On-Call 24/7'], 6),
  ('svc-7', 'Daycare', 'Full-day supervised play and socialization for your dog while you are at work. Includes meals and naps.', '₹599/day', 'boarding', '☀️', ARRAY['Supervised Play', 'Social Groups', '2 Meals Included', 'Nap Time', 'Activity Report'], 7),
  ('svc-8', 'Extended Stay (7+ Days)', 'Long-term boarding with discounted rates, routine wellness checks, and consistent daily structure.', '₹799/night', 'boarding', '📅', ARRAY['Discounted Nightly Rate', 'Weekly Wellness Check', 'Consistent Routine', 'Exercise Sessions', 'Weekly Grooming'], 8)
ON CONFLICT (id) DO NOTHING;

-- Default testimonials
INSERT INTO testimonials (id, name, pet, text, rating) VALUES
  ('t-1', 'Priya S.', 'Bruno (Golden Retriever)', 'Amazing grooming service! Bruno came back looking like a show dog. The team is so gentle and caring. Best pet grooming in Nolambur!', 5),
  ('t-2', 'Karthik R.', 'Milo (Labrador)', 'The boarding facility is spotless and Milo loves it there. Live CCTV updates gave me complete peace of mind during my trip.', 5),
  ('t-3', 'Swetha M.', 'Cookie (Shih Tzu)', 'Doorstep pickup is a game changer! They picked up Cookie, groomed her beautifully, and brought her back. So convenient!', 5),
  ('t-4', 'Arjun K.', 'Rocky (German Shepherd)', 'Professional, punctual, and passionate about pets. Rocky actually gets excited when he sees the Petto Cura van arrive!', 5)
ON CONFLICT (id) DO NOTHING;

-- Default visibility (all visible)
INSERT INTO visibility_settings (key, visible) VALUES
  ('home', true), ('grooming', true), ('boarding', true), ('find-a-center', true), ('blog', true), ('contact', true),
  ('home-hero', true), ('home-services', true), ('home-trust', true), ('home-whyus', true), ('home-cta', true), ('home-testimonials', true), ('home-franchise', true),
  ('grooming-hero', true), ('grooming-quick-answers', true), ('grooming-key-facts', true), ('grooming-services', true), ('grooming-faq', true), ('grooming-franchise', true),
  ('boarding-hero', true), ('boarding-safety', true), ('boarding-live-update', true), ('boarding-services', true), ('boarding-quick-answers', true), ('boarding-key-facts', true), ('boarding-faq', true), ('boarding-franchise', true),
  ('center-header', true), ('center-map', true), ('center-cards', true), ('center-franchise', true),
  ('blog-header', true), ('blog-filters', true), ('blog-grid', true),
  ('contact-header', true), ('contact-form', true), ('contact-info', true), ('contact-map', true), ('contact-franchise', true)
ON CONFLICT (key) DO NOTHING;
