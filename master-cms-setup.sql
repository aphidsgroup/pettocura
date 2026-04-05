-- MASTER CMS SETUP FOR PETTO CURA MODERNIZATION
-- Run this in your Supabase SQL Editor

-- 1. Ensure the site_content table exists
CREATE TABLE IF NOT EXISTS public.site_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_key TEXT NOT NULL, -- 'home', 'about', 'grooming', 'boarding', 'franchise', 'global'
  content_key TEXT NOT NULL UNIQUE,
  content_value TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable RLS
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- 3. Setup Policies (Public Read, Admin Write)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public read access') THEN
        CREATE POLICY "Public read access" ON public.site_content FOR SELECT USING (true);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Admin write access') THEN
        CREATE POLICY "Admin write access" ON public.site_content FOR ALL USING (
            auth.role() = 'authenticated'
        );
    END IF;
END $$;

-- 4. Populate HOME Page Content
INSERT INTO public.site_content (page_key, content_key, content_value) VALUES
-- Services Grid
('home', 'home_svc_1_title', 'Pet Grooming'),
('home', 'home_svc_1_desc', 'Full body grooming, spa treatments, and puppy-first grooms by certified professionals in Nolambur, Chennai.'),
('home', 'home_svc_1_image', '/pet-grooming-card.png'),
('home', 'home_svc_2_title', 'Pet Boarding'),
('home', 'home_svc_2_desc', 'Safe, CCTV-monitored boarding with climate control and 24/7 vet access in Nolambur.'),
('home', 'home_svc_2_image', '/pet-boarding-card.png'),
('home', 'home_svc_3_title', 'Doorstep Pickup'),
('home', 'home_svc_3_desc', 'Free doorstep pickup & drop for grooming sessions. We come to you in Nolambur & nearby areas.'),
('home', 'home_svc_3_image', '/pet-pickup-card.png'),
('home', 'home_svc_4_title', 'Find a Center'),
('home', 'home_svc_4_desc', 'Visit our pet care center in Nolambur, Chennai for premium pet services.'),
('home', 'home_svc_4_image', '/pet-center-card.png'),
-- Sections
('home', 'home_services_badge', 'Our Services'),
('home', 'home_services_title', 'Everything Your Pet Needs'),
('home', 'home_services_subtitle', 'From head-to-paw grooming to safe overnight boarding, we provide comprehensive pet care with love.'),
('home', 'home_whyus_badge', 'Why Choose Us'),
('home', 'home_whyus_title', 'The Petto Cura Difference'),
('home', 'home_whyus_subtitle', 'We don''t just care for pets — we treat them like family.'),
('home', 'home_testimonials_badge', 'What Pet Parents Say'),
('home', 'home_testimonials_title', 'Loved by Pets & Their Humans'),
('home', 'home_testimonials_subtitle', 'Real reviews from pet parents who trust Petto Cura for pet grooming in Nolambur, Chennai.'),
('home', 'home_cta_title', 'Ready to Give Your Pet the Best Care?'),
('home', 'home_cta_subtitle', 'Book a grooming session or boarding stay today. Your pet will thank you with extra tail wags! 🐾'),
('home', 'home_cta_primary', 'Book Now'),
('home', 'home_cta_secondary', 'Find Nearest Center')
ON CONFLICT (content_key) DO UPDATE SET content_value = EXCLUDED.content_value, page_key = EXCLUDED.page_key;

-- 5. Populate ABOUT Page Content (Corrected Milestones)
INSERT INTO public.site_content (page_key, content_key, content_value) VALUES
-- Hero
('about', 'about_hero_badge', 'OUR STORY'),
('about', 'about_hero_title', 'Passion for Pets, Built with'),
('about', 'about_hero_highlight', 'Care'),
('about', 'about_hero_subtitle', 'Petto Cura started with a simple belief: every pet deserves a grooming and boarding experience that feels like their second home.'),
-- Mission
('about', 'about_mission_badge', 'Our Mission'),
('about', 'about_mission_title', 'Redefining Pet Care in Chennai'),
('about', 'about_mission_subtitle', 'We are not just a pet salon; we are a community of pet lovers dedicated to the health and happiness of your furry family members. Every service we provide is rooted in compassion and professional excellence.'),
('about', 'about_mission_quote', 'At Petto Cura, we don''t just groom pets; we provide a stress-free environment where they can thrive and feel loved.'),
('about', 'about_mission_image', '/pet-mission.png'),
-- Milestones (Corrected to Start April 2026)
('about', 'about_milestone_1_year', 'April 2026'),
('about', 'about_milestone_1_title', 'The First Spark'),
('about', 'about_milestone_1_desc', 'After welcoming our first pet home, we realized the need for premium, professional pet care in Nolambur. This sparked the vision for Petto Cura.'),
('about', 'about_milestone_2_year', 'June 2026'),
('about', 'about_milestone_2_title', 'Grand Opening'),
('about', 'about_milestone_2_desc', 'Petto Cura officially launched its flagship studio in Nolambur, Chennai with state-of-the-art grooming equipment.'),
('about', 'about_milestone_3_year', 'Nov 2026'),
('about', 'about_milestone_3_title', 'Boarding Launch'),
('about', 'about_milestone_3_desc', 'Expanded our services to include cage-free, safe pet boarding for all breeds.'),
('about', 'about_milestone_4_year', '2027 & Beyond'),
('about', 'about_milestone_4_title', 'The Future of Pet Care'),
('about', 'about_milestone_4_desc', 'Growing our community and expanding our doorstep services to pet parents across Chennai.')
ON CONFLICT (content_key) DO UPDATE SET content_value = EXCLUDED.content_value, page_key = EXCLUDED.page_key;

-- 6. Populate GROOMING Page Content
INSERT INTO public.site_content (page_key, content_key, content_value) VALUES
('grooming', 'grooming_hero_badge', 'GRAND OPENING OFFER - 20% OFF'),
('grooming', 'grooming_hero_title', 'Premium Pet Grooming Studio in'),
('grooming', 'grooming_hero_highlight', 'Nolambur, Chennai'),
('grooming', 'grooming_hero_subtitle', 'Experience professional grooming by certified experts using premium products. Enjoy a 20% discount on all packages during our Grand Opening season.'),
('grooming', 'grooming_qa_1_q', 'What is the cost of pet grooming at Petto Cura, Chennai?'),
('grooming', 'grooming_qa_1_a', 'Our grooming services currently feature a 20% Grand Opening Discount. Prices start at ₹960 for Spa Bath, ₹1440 for Bath + Basic Grooming, and ₹2000 for Full Service.'),
('grooming', 'grooming_kf_title', 'Petto Cura Grooming — Key Facts'),
('grooming', 'grooming_kf_1_l', 'Primary Services'), ('grooming', 'grooming_kf_1_v', 'Spa Bath, Bath + Basic Grooming, Full Service'),
('grooming', 'grooming_kf_2_l', 'Price Range'), ('grooming', 'grooming_kf_2_v', '₹960 – ₹2000 (Grand Opening Offer)'),
('grooming', 'grooming_services_badge', 'Our Grooming Packages'),
('grooming', 'grooming_services_title', 'Choose the Perfect Groom'),
('grooming', 'grooming_services_subtitle', 'Every grooming package includes a health check, ear inspection, and breed-appropriate styling.'),
('grooming', 'grooming_faq_badge', 'Got Questions?'),
('grooming', 'grooming_faq_title', 'Frequently Asked Questions'),
('grooming', 'grooming_faq_1_q', 'What is the Grand Opening Offer?'),
('grooming', 'grooming_faq_1_a', 'We are currently offering 20% OFF on all grooming services as part of our Grand Opening!')
ON CONFLICT (content_key) DO UPDATE SET content_value = EXCLUDED.content_value, page_key = EXCLUDED.page_key;

-- 7. Populate BOARDING Page Content
INSERT INTO public.site_content (page_key, content_key, content_value) VALUES
('boarding', 'boarding_hero_badge', 'Cage-Free Pet Boarding Studio'),
('boarding', 'boarding_hero_title', 'Safe Pet Boarding for'),
('boarding', 'boarding_hero_highlight', 'All Breeds'),
('boarding', 'boarding_hero_subtitle', 'Experienced handlers providing a comfortable, hygienic, and stress-free stay in Nolambur, Chennai. Starting from ₹1300/night with daily walks and updates.'),
('boarding', 'boarding_kf_title', 'Petto Cura Boarding — Key Facts'),
('boarding', 'boarding_kf_1_l', 'Pricing'), ('boarding', 'boarding_kf_1_v', 'Starting ₹1300 / Night'),
('boarding', 'boarding_safety_badge', 'Safety First'),
('boarding', 'boarding_safety_title', 'Your Pet''s Safety, Guaranteed'),
('boarding', 'boarding_safety_subtitle', 'We''ve invested in the best safety infrastructure so you can rest easy.'),
('boarding', 'boarding_live_badge', 'Live Pet Updates'),
('boarding', 'boarding_live_title', 'Never Miss a Moment'),
('boarding', 'boarding_live_subtitle', 'Get real-time WhatsApp updates with photos and videos of your pet throughout their stay.'),
('boarding', 'boarding_live_phone_msg_1', 'Your buddy just finished his morning playtime! He made a new friend today 🐾'),
('boarding', 'boarding_live_phone_msg_2', 'Lunch time! He ate all his kibble + the special treat you packed 😋'),
('boarding', 'boarding_live_phone_msg_3', 'Nap time in his cozy suite. Such a good boy! 💤'),
('boarding', 'boarding_pkg_1_title', 'With Food Package'),
('boarding', 'boarding_pkg_1_price', '₹1300'),
('boarding', 'boarding_pkg_2_title', 'Without Food Package'),
('boarding', 'boarding_pkg_2_price', '₹900'),
('boarding', 'boarding_faq_title', 'Boarding FAQs')
ON CONFLICT (content_key) DO UPDATE SET content_value = EXCLUDED.content_value, page_key = EXCLUDED.page_key;

-- 8. Populate FRANCHISE Page Content
INSERT INTO public.site_content (page_key, content_key, content_value) VALUES
('franchise', 'franchise_badge', 'Franchise Opportunity'),
('franchise', 'franchise_title_pre', 'Own a'),
('franchise', 'franchise_title_post', 'Franchise'),
('franchise', 'franchise_subtitle', 'Join India''s fastest-growing pet care brand. Low investment, high returns, and complete training & support.'),
('franchise', 'franchise_tag_1', 'Training & Support'),
('franchise', 'franchise_tag_2', 'Low Investment'),
('franchise', 'franchise_tag_3', 'Proven Model'),
('franchise', 'franchise_tag_4', 'Growing Market'),
('franchise', 'franchise_sidebar_title', 'Start Your Journey'),
('franchise', 'franchise_sidebar_desc', 'Connect with us to learn more about the franchise opportunity.'),
('franchise', 'franchise_whatsapp_msg', 'Hi! I am interested in a Petto Cura franchise opportunity. Please share more details.'),
('franchise', 'f_hero_badge', 'Franchise Opportunity'),
('franchise', 'f_hero_title', 'Own a Petto Cura'),
('franchise', 'f_hero_highlight', 'Franchise'),
('franchise', 'f_hero_subtitle', 'Join India''s fastest-growing pet care brand. Low investment, complete training, and a proven business model.'),
('franchise', 'f_why_title', 'Built for Your Success'),
('franchise', 'f_step_title', 'How It Works'),
('franchise', 'f_faq_title', 'Franchise FAQs'),
('franchise', 'f_cta_title', 'Ready to Start Your Pet Care Empire?')
ON CONFLICT (content_key) DO UPDATE SET content_value = EXCLUDED.content_value, page_key = EXCLUDED.page_key;
