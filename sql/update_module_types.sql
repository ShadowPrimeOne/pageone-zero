-- Update module types to use consistent naming
UPDATE module_templates
SET type = 'classic_overlay_hero'
WHERE type ILIKE '%classicoverlayhero%';

-- Ensure the template exists with correct type
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