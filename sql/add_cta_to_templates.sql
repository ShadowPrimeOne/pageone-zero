-- Add CTA fields to existing module templates

-- Update classic_overlay_hero template
UPDATE module_templates
SET props = props || '{"ctaText": "Get Started", "ctaLink": "#"}'::jsonb
WHERE type = 'classic_overlay_hero';

-- Update top_image_center_text_hero template
UPDATE module_templates
SET props = props || '{"ctaText": "Learn More", "ctaLink": "#"}'::jsonb
WHERE type = 'top_image_center_text_hero';

-- Update split_layout_hero template
UPDATE module_templates
SET props = props || '{"ctaText": "Book a Call", "ctaLink": "#"}'::jsonb
WHERE type = 'split_layout_hero';

-- Update hero template
UPDATE module_templates
SET props = props || '{"ctaText": "Get Started", "ctaLink": "#"}'::jsonb
WHERE type = 'hero';

-- Update hero2 template
UPDATE module_templates
SET props = props || '{"ctaText": "Get Started", "ctaLink": "#"}'::jsonb
WHERE type = 'hero2';

-- Show updated templates
SELECT type, props FROM module_templates WHERE type IN ('classic_overlay_hero', 'top_image_center_text_hero', 'split_layout_hero', 'hero', 'hero2'); 