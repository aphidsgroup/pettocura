-- FINAL MODERNIZATION CMS SETUP
-- This script adds all remaining hardcoded strings and settings to the CMS.

INSERT INTO public.site_content (page, section, content_key, label, value, field_type, sort_order) VALUES
-- Global / Common
('global', 'global_ui', 'nav_cta_text', 'Navbar CTA Text', 'Book Appointment', 'text', 1),
('global', 'global_ui', 'footer_description', 'Footer Brand Description', 'Premium pet grooming and boarding services in Chennai. Where every tail wags with joy and every whisker shines with care.', 'textarea', 2),
('global', 'global_contact', 'global_whatsapp_number', 'WhatsApp Number', '9566242236', 'text', 3),
('global', 'global_contact', 'contact_email', 'Business Email', 'hello@pettocura.com', 'text', 4),
('global', 'global_contact', 'contact_phone', 'Business Phone', '+91 95662 42236', 'text', 5),
('global', 'global_contact', 'contact_address', 'Business Address', 'Plot.No.6, Door.No.4, M.C.K Layout, Nolambur, Chennai - 600095', 'textarea', 6),
('global', 'global_contact', 'contact_hours', 'Operating Hours', '9:00 AM to 8:00 PM, 7 days/week', 'text', 7),

-- Boarding Page (Phone Mockup Visuals)
('boarding', 'boarding_live', 'boarding_live_phone_icon_1', 'Phone Mockup Icon 1', '🐕', 'text', 10),
('boarding', 'boarding_live', 'boarding_live_phone_icon_2', 'Phone Mockup Icon 2', '😋', 'text', 11),
('boarding', 'boarding_live', 'boarding_live_phone_icon_3', 'Phone Mockup Icon 3', '😴🐕', 'text', 12),

-- Contact Page
('contact', 'contact_header', 'contact_header_badge', 'Header Badge', 'Get In Touch', 'text', 1),
('contact', 'contact_header', 'contact_header_title', 'Header Title', 'Book an Appointment', 'text', 2),
('contact', 'contact_header', 'contact_header_subtitle', 'Header Subtitle', 'Fill out the form below and we''ll get back to you within 30 minutes during business hours.', 'textarea', 3)

ON CONFLICT (content_key) DO UPDATE SET 
  value = EXCLUDED.value, 
  page = EXCLUDED.page, 
  section = EXCLUDED.section,
  label = EXCLUDED.label,
  field_type = EXCLUDED.field_type;
