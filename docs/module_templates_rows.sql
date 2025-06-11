-- Hero Module Templates
INSERT INTO module_templates (id, type, name, description, category, props) VALUES
-- Classic Overlay Hero
(gen_random_uuid(), 'classic_overlay_hero', 'Classic Overlay Hero', 'A full-screen hero with a background image and centered text overlay', 'hero', '{
  "heading": "Welcome to Our Platform",
  "subheading": "Create beautiful pages with our intuitive editor",
  "background": {
    "type": "image",
    "image": "https://placehold.co/1920x1080/1a1a1a/ffffff?text=Hero+Background",
    "overlay": {
      "color": "#000000",
      "opacity": 0.5
    }
  }
}'::jsonb),

-- Top Image Center Text Hero
(gen_random_uuid(), 'top_image_center_text_hero', 'Top Image Center Text Hero', 'Hero section with a top image and centered text below', 'hero', '{
  "heading": "Build Something Amazing",
  "subheading": "Start your journey with us today",
  "background": {
    "type": "image",
    "image": "https://placehold.co/1200x800/1a1a1a/ffffff?text=Top+Image"
  }
}'::jsonb),

-- Split Layout Hero
(gen_random_uuid(), 'split_layout_hero', 'Split Layout Hero', 'Hero section with split layout for image and text', 'hero', '{
  "heading": "Innovative Solutions",
  "subheading": "Transform your ideas into reality",
  "background": {
    "type": "image",
    "image": "https://placehold.co/800x1200/1a1a1a/ffffff?text=Split+Image"
  }
}'::jsonb),

-- Basic Hero
(gen_random_uuid(), 'hero', 'Basic Hero', 'Simple hero section with background color', 'hero', '{
  "heading": "Simple and Effective",
  "subheading": "Get started in minutes",
  "background": {
    "type": "color",
    "color": "#1a1a1a",
    "opacity": 1
  }
}'::jsonb),

-- Hero2
(gen_random_uuid(), 'hero2', 'Hero2', 'Alternative hero layout with gradient background', 'hero', '{
  "heading": "Modern Design",
  "subheading": "Create stunning pages effortlessly",
  "background": {
    "type": "gradient",
    "color": "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)",
    "opacity": 1
  }
}'::jsonb);

-- Other module templates...
INSERT INTO "public"."module_templates" ("id", "type", "props", "created_at", "category") VALUES ('06d1e7d5-b8be-44b7-92ea-53254ca5eb25', 'top_image_center_text_hero', '{"heading":"Top Image + Center Text","background":{"type":"color","color":"#ffffff","opacity":1},"subheading":"Use Case: Clear product intros, coaching, services"}', '2025-06-09 18:06:38.983719+00', 'hero'), ('1113faf5-6779-46b6-86bd-c8a7f1b39d3c', 'hero', '{"heading":"Page.one","subheading":"Genesis Ready."}', '2025-06-09 09:19:39.002948+00', 'hero'), ('195bc031-6c2d-405a-a427-042ab8c8f4b0', 'contact_form', '{"heading":"Get in Touch","background":{"type":"gradient","color":"#000000","opacity":1,"gradient":{"to":"#000000","from":"#1a1a1a","angle":135}},"subheading":"Let''s create something amazing together"}', '2025-06-09 14:29:35.581883+00', 'form'), ('1b19f50f-67c0-4a9a-9bf4-6be1ef1d2b65', 'form', '{"title":"Let''s talk","fields":[{"id":"name","type":"text","label":"Name","required":true},{"id":"email","type":"email","label":"Email","required":true},{"id":"message","type":"textarea","label":"Message","required":true}],"submitText":"Send Message"}', '2025-06-09 09:19:39.002948+00', 'form'), ('2e84075c-ebbe-47d2-bf9c-d1c7721ebde3', 'split_layout_hero', '{"heading":"Jane Doe","background":{"type":"color","color":"#ffffff","opacity":1},"subheading":"Expert Legal Advisor"}', '2025-06-10 04:23:35.004233+00', 'hero'), ('7d8a2e7a-5149-4a47-90b7-be52729b8054', 'OurProcess', '{"heading":"Launch Your Page","background":{"type":"color","color":"#FFFFFF","opacity":1},"subheading":"From Anywhere, On Any Device"}', '2025-06-09 10:49:03.980572+00', 'process'), ('8956e674-f3ec-4789-8c5d-f64a4db0973b', 'classic_overlay_hero', '{"heading":"Classic Overlay Hero","background":{"type":"image","color":"#000000","opacity":0.6,"overlay":{"color":"#000000","opacity":0.6}},"subheading":"High-impact visual services (e.g., automotive, fitness, travel)"}', '2025-06-09 18:00:30.240337+00', 'hero'), ('f00c2c06-e6d8-4d24-92b7-67487a26b390', 'hero2', '{"heading":"Page.One","background":{"type":"gradient","color":"#000000","opacity":0.8,"gradient":{"to":"#000000","from":"#1a1a1a","angle":135}},"subheading":"Your story begins here..."}', '2025-06-09 09:19:39.002948+00', 'hero');