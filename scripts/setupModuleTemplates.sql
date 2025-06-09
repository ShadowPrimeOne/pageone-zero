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