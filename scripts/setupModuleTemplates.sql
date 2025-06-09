-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create module_templates table
CREATE TABLE IF NOT EXISTS module_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL,
  props JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Clear existing templates to avoid duplicates
TRUNCATE TABLE module_templates;

-- Insert default templates
INSERT INTO module_templates (type, props) VALUES
-- Hero template
('hero', '{
  "heading": "Page.one",
  "subheading": "Genesis Ready."
}'::jsonb),

-- Hero 2 template (full screen)
('hero2', '{
  "heading": "Welcome to Page.one",
  "subheading": "Create something amazing",
  "background": {
    "type": "gradient",
    "color": "#000000",
    "opacity": 0.8,
    "gradient": {
      "from": "#1a1a1a",
      "to": "#000000",
      "angle": 135
    }
  }
}'::jsonb),

-- Form template
('form', '{
  "title": "Let''s talk",
  "submitText": "Send Message",
  "fields": [
    {
      "id": "name",
      "label": "Name",
      "type": "text",
      "required": true
    },
    {
      "id": "email",
      "label": "Email",
      "type": "email",
      "required": true
    },
    {
      "id": "message",
      "label": "Message",
      "type": "textarea",
      "required": true
    }
  ]
}'::jsonb); 