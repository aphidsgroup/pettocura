-- ============================================================
-- PETTO CURA — EXTREME CMS EXPANSION (PHASE 2)
-- Run this in your Supabase SQL Editor
-- ============================================================

-- 1. ABOUT PAGE CONTENT
-- ============================================================
INSERT INTO public.site_content (id, section, page, field_type, label, value, sort_order) VALUES
  ('about_hero_badge', 'about_hero', 'about', 'text', 'Hero Badge', 'OUR STORY', 0),
  ('about_hero_title', 'about_hero', 'about', 'text', 'Hero Title', 'Passion for Pets,', 1),
  ('about_hero_highlight', 'about_hero', 'about', 'text', 'Hero Highlight', 'Experts in Care', 2),
  ('about_hero_subtitle', 'about_hero', 'about', 'textarea', 'Hero Subtitle', 'At Petto Cura, we believe every pet deserves to look and feel their best. Our mission is to provide premium, safe, and stress-free grooming and boarding services in Chennai.', 3),
  
  ('about_mission_badge', 'about_mission', 'about', 'text', 'Mission Badge', 'Our Mission', 10),
  ('about_mission_title', 'about_mission', 'about', 'text', 'Mission Title', 'Setting New Standards in Pet Care', 11),
  ('about_mission_subtitle', 'about_mission', 'about', 'textarea', 'Mission Subtitle', 'Petto Cura started with a simple goal: to eliminate the stress of pet grooming and boarding. We saw too many "caged" boarding facilities and "rushed" grooming sessions. We decided to build a studio that prioritizes empathy, patience, and professional expertise.', 12),
  ('about_mission_quote', 'about_mission', 'about', 'text', 'Mission Quote', '"Our mission is to treat every pet as if they were our own."', 13),
  ('about_mission_image', 'about_mission', 'about', 'image', 'Mission Side Image', '', 14),

  ('about_milestone_1_year', 'about_milestones', 'about', 'text', 'MS 1 Year', 'April 2026', 20),
  ('about_milestone_1_title', 'about_milestones', 'about', 'text', 'MS 1 Title', 'The Beginning', 21),
  ('about_milestone_1_desc', 'about_milestones', 'about', 'textarea', 'MS 1 Desc', 'Petto Cura was born after the joyful arrival of our own furry family member inspired us to create a better standard of pet care.', 22),
  
  ('about_milestone_2_year', 'about_milestones', 'about', 'text', 'MS 2 Year', 'May 2026', 23),
  ('about_milestone_2_title', 'about_milestones', 'about', 'text', 'MS 2 Title', 'Vision to Reality', 24),
  ('about_milestone_2_desc', 'about_milestones', 'about', 'textarea', 'MS 2 Desc', 'We launched our flagship studio in Nolambur with a focus on cage-free, stress-free environments.', 25),
  
  ('about_milestone_3_year', 'about_milestones', 'about', 'text', 'MS 3 Year', '2026+', '26'),
  ('about_milestone_3_title', 'about_milestones', 'about', 'text', 'MS 3 Title', 'Growing Community', 27),
  ('about_milestone_3_desc', 'about_milestones', 'about', 'textarea', 'MS 3 Desc', 'Quickly becoming the most trusted name for pet parents in Chennai looking for premium services.', 28),

  ('about_milestone_4_year', 'about_milestones', 'about', 'text', 'MS 4 Year', 'Present', 29),
  ('about_milestone_4_title', 'about_milestones', 'about', 'text', 'MS 4 Title', 'Excellence', 30),
  ('about_milestone_4_desc', 'about_milestones', 'about', 'textarea', 'MS 4 Desc', 'Continuing to innovate and provide a 4.9/5 star experience for every tail that wags through our doors.', 31)
ON CONFLICT (id) DO UPDATE SET value = EXCLUDED.value;

-- 2. HOME PAGE SERVICE CARDS
-- ============================================================
INSERT INTO public.site_content (id, section, page, field_type, label, value, sort_order) VALUES
  ('home_svc_1_title', 'home_services', 'home', 'text', 'Svc 1 Title', 'Pet Grooming', 50),
  ('home_svc_1_desc', 'home_services', 'home', 'textarea', 'Svc 1 Desc', 'Full body grooming, spa treatments, and puppy-first grooms by certified professionals.', 51),
  ('home_svc_1_image', 'home_services', 'home', 'image', 'Svc 1 Image', '', 52),
  
  ('home_svc_2_title', 'home_services', 'home', 'text', 'Svc 2 Title', 'Pet Boarding', 53),
  ('home_svc_2_desc', 'home_services', 'home', 'textarea', 'Svc 2 Desc', 'Safe, CCTV-monitored boarding with climate control and 24/7 vet access.', 54),
  ('home_svc_2_image', 'home_services', 'home', 'image', 'Svc 2 Image', '', 55),
  
  ('home_svc_3_title', 'home_services', 'home', 'text', 'Svc 3 Title', 'Doorstep Pickup', 56),
  ('home_svc_3_desc', 'home_services', 'home', 'textarea', 'Svc 3 Desc', 'Free doorstep pickup & drop for grooming sessions in Nolambur & nearby areas.', 57),
  ('home_svc_3_image', 'home_services', 'home', 'image', 'Svc 3 Image', '', 58),
  
  ('home_svc_4_title', 'home_services', 'home', 'text', 'Svc 4 Title', 'Find a Center', 59),
  ('home_svc_4_desc', 'home_services', 'home', 'textarea', 'Svc 4 Desc', 'Visit our flagship pet care center in Nolambur for a premium experience.', 60),
  ('home_svc_4_image', 'home_services', 'home', 'image', 'Svc 4 Image', '', 61)
ON CONFLICT (id) DO UPDATE SET value = EXCLUDED.value;

-- 3. BOARDING SAFETY & LIVE UPDATES
-- ============================================================
INSERT INTO public.site_content (id, section, page, field_type, label, value, sort_order) VALUES
  ('boarding_live_title', 'boarding_live_update', 'boarding', 'text', 'Live Update Title', 'Never Miss a Moment', 100),
  ('boarding_live_subtitle', 'boarding_live_update', 'boarding', 'textarea', 'Live Update Subtitle', 'Get real-time WhatsApp updates with photos and videos of your pet throughout their stay.', 101),
  ('boarding_live_phone_msg_1', 'boarding_live_update', 'boarding', 'textarea', 'Phone Message 1', 'Your buddy just finished his morning playtime! He made a new friend today 🐾', 102),
  ('boarding_live_phone_msg_2', 'boarding_live_update', 'boarding', 'textarea', 'Phone Message 2', 'Lunch time! He ate all his kibble + the special treat you packed 😋', 103)
ON CONFLICT (id) DO UPDATE SET value = EXCLUDED.value;
