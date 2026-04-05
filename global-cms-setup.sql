-- GLOBAL & COMMON CONTENT SETUP (ALIGNED WITH useSiteContent SCHEMA)
-- This enables dashboard control for global elements across all pages.

INSERT INTO public.site_content (page, section, content_key, label, value, field_type, sort_order) VALUES
-- Lead Popup
('global', 'global_popup', 'global_popup_badge', 'Popup Badge', '🐾 Special Offer', 'text', 1),
('global', 'global_popup', 'global_popup_title', 'Popup Title', 'Book Your Pet''s First Session!', 'text', 2),
('global', 'global_popup', 'global_popup_subtitle', 'Popup Subtitle', 'Get 20% off on your first grooming or boarding', 'textarea', 3),
('global', 'global_popup', 'global_popup_services', 'Service Options (JSON)', '["Pet Grooming","Pet Boarding","Pet Walking","Pet Sitting","Pet Taxi","Pet Accessories","Pet Cake & Treats"]', 'textarea', 4),

-- Service Strip
('global', 'global_service_strip', 'global_service_strip', 'Service Strip Items (JSON)', '[
  {"name": "Pet Grooming", "icon": "/icons/pet-grooming.png", "href": "/grooming"},
  {"name": "Pet Boarding", "icon": "/icons/pet-boarding.png", "href": "/boarding"},
  {"name": "Pet Walking", "icon": "/icons/pet-walking.png", "href": "/contact"},
  {"name": "Pet Sitting", "icon": "/icons/pet-sitting.png", "href": "/contact"},
  {"name": "Pet Taxi", "icon": "/icons/pet-taxi.png", "href": "/contact"},
  {"name": "Pet Accessories", "icon": "/icons/pet-accessories.png", "href": "/contact"},
  {"name": "Pet Cake & Treats", "icon": "/icons/pet-cake-treats.png", "href": "/contact"}
]', 'textarea', 5),

-- WhatsApp & Global UI
('global', 'global_contact', 'global_whatsapp_number', 'WhatsApp Number', '9566242236', 'text', 6),
('global', 'global_ui', 'nav_cta_text', 'Navbar CTA Text', 'Book Appointment', 'text', 7),
('global', 'global_ui', 'footer_description', 'Footer Brand Description', 'Premium pet grooming and boarding services in Chennai. Where every tail wags with joy and every whisker shines with care.', 'textarea', 8),

-- Find Center Page
('find-a-center', 'center_header', 'center_header_badge', 'Header Badge', 'Our Locations', 'text', 1),
('find-a-center', 'center_header', 'center_header_title', 'Header Title', 'Find a Center Near You', 'text', 2),
('find-a-center', 'center_header', 'center_header_subtitle', 'Header Subtitle', 'Visit our premium pet care center in Nolambur, Chennai. Walk-ins welcome!', 'textarea', 3)
ON CONFLICT (content_key) DO UPDATE SET 
  value = EXCLUDED.value, 
  page = EXCLUDED.page, 
  section = EXCLUDED.section,
  label = EXCLUDED.label,
  field_type = EXCLUDED.field_type;
