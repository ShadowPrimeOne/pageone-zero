-- UPDATE Classic Overlay Hero Template
UPDATE module_templates
SET props = jsonb_build_object(
  'heading', 'Welcome to Classic Overlay Hero',
  'subheading', 'This is the subheading content.',
  'background', jsonb_build_object(
    'image', 'https://xkpxwcrxjgjmbxgupkhq.supabase.co/storage/v1/object/public/public-images/modules/hero/classic_overlay_hero/1749617291214-hero-background.webp'
  )
)
WHERE type = 'classic_overlay_hero';

-- INSERT Top Center Hero (if needed)
INSERT INTO module_templates (type, props)
VALUES (
  'hero',
  jsonb_build_object(
    'heading', 'Centered Power Statement',
    'subheading', 'Strong subline for brand or service',
    'background', jsonb_build_object(
      'image', 'https://xkpxwcrxjgjmbxgupkhq.supabase.co/storage/v1/object/public/public-images/modules/hero/top_image_center_text_hero/Example%20Hero2%20Product..webp'
    )
  )
)
ON CONFLICT DO NOTHING;

-- Insert template if it doesn't exist
INSERT INTO module_templates (type, props)
VALUES (
  'classic_overlay_hero',
  jsonb_build_object(
    'heading', 'Welcome to Classic Overlay Hero',
    'subheading', 'This is the subheading content.',
    'background', jsonb_build_object(
      'image', 'https://xkpxwcrxjgjmbxgupkhq.supabase.co/storage/v1/object/public/public-images/modules/hero/classic_overlay_hero/1749617291214-hero-background.webp'
    )
  )
)
ON CONFLICT (type) DO UPDATE
SET props = EXCLUDED.props; 