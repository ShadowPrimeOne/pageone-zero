-- Create module category enum type
DO $$ BEGIN
    CREATE TYPE module_category AS ENUM (
        'hero',
        'content',
        'form',
        'process',
        'contact'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Add category column to module_templates
ALTER TABLE module_templates 
ADD COLUMN IF NOT EXISTS category module_category NOT NULL DEFAULT 'hero';

-- Update existing templates with categories
UPDATE module_templates 
SET category = 'hero' 
WHERE type IN ('hero', 'hero2', 'classic_overlay_hero', 'top_image_center_text_hero', 'split_layout_hero');

UPDATE module_templates 
SET category = 'form' 
WHERE type IN ('form', 'contact_form');

UPDATE module_templates 
SET category = 'process' 
WHERE type = 'OurProcess';

-- Add category to pages.modules JSONB array
-- Note: This is a no-op as the category will be added when new modules are created
-- Existing modules will get their category from the template when loaded 