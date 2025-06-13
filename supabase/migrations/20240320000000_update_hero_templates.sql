-- Update classic_overlay_hero template
UPDATE module_templates
SET props = jsonb_build_object(
  'variant', 'classic_overlay_hero',
  'background', jsonb_build_object(
    'image', 'https://x.supabase.co/storage/v1/object/public/public-images/modules/hero/classic_overlay_hero/default-bg.webp'
  )
)
WHERE type = 'hero' AND props->>'variant' = 'classic_overlay_hero';

-- Update top_image_center_text_hero template
UPDATE module_templates
SET props = jsonb_build_object(
  'variant', 'top_image_center_text_hero',
  'topBackground', jsonb_build_object(
    'url', 'https://x.supabase.co/storage/v1/object/public/public-images/modules/hero/top_image_center_text_hero/default-bg.webp',
    'type', 'image'
  )
)
WHERE type = 'hero' AND props->>'variant' = 'top_image_center_text_hero';

-- Insert new hero module template example
INSERT INTO module_templates (type, props)
VALUES (
  'hero',
  jsonb_build_object(
    'variant', 'new_hero_module',
    'background', jsonb_build_object(
      'image', 'https://x.supabase.co/storage/v1/object/public/public-images/modules/hero/new_hero_module/default-bg.webp'
    )
  )
)
ON CONFLICT (type, (props->>'variant')) DO UPDATE
SET props = EXCLUDED.props; 