# Module Templates Schema

## Database Structure

### Module Templates Table
```sql
-- Create module category enum type
CREATE TYPE module_category AS ENUM (
  'hero',
  'content',
  'form',
  'process',
  'contact'
);

-- Create module templates table
CREATE TABLE module_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL,
  props JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  category module_category NOT NULL DEFAULT 'hero'
);
```

## Module Categories and Types

### Hero Category
- `classic_overlay_hero`: High-impact visual services (e.g., automotive, fitness, travel)
- `top_image_center_text_hero`: Clear product intros, coaching, services
- `split_layout_hero`: Personal brands, consultants, lawyers
- `hero`: Basic hero module
- `hero2`: Enhanced hero module with gradient support

### Form Category
- `form`: Basic form module
- `contact_form`: Contact form with heading and subheading

### Process Category
- `OurProcess`: Process/step-by-step module

## Module Properties

### Hero Modules
```typescript
interface HeroProps {
  heading: string
  subheading: string
  ctaText?: string
  background?: {
    type: 'image' | 'color' | 'gradient'
    color: string
    opacity: number
    image?: string
    parallax?: boolean
    overlay?: {
      color: string
      opacity: number
    }
    gradient?: {
      from: string
      to: string
      angle: number
    }
  }
}
```

### Form Modules
```typescript
interface FormProps {
  title: string
  fields: Array<{
    id: string
    label: string
    type: 'text' | 'email' | 'textarea'
    required: boolean
    placeholder?: string
  }>
  submitText: string
  background?: ModuleBackground
}

interface ContactFormProps {
  heading: string
  subheading: string
  background?: ModuleBackground
}
```

### Process Module
```typescript
interface OurProcessProps {
  heading: string
  subheading: string
  background?: ModuleBackground
}
```

## Environment Setup

The module system requires the following environment variables in `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Database Operations

### Adding New Module Template
```typescript
async function addModuleTemplate(template: {
  type: string
  props: Record<string, any>
  category: 'hero' | 'content' | 'form' | 'process' | 'contact'
}) {
  const { error } = await supabase
    .from('module_templates')
    .insert([template])
    .select()

  if (error) {
    console.error('[AddModuleTemplate] Supabase error:', error)
    throw new Error('Failed to add module template')
  }
}
```

### Loading Module Templates
```typescript
async function getModuleTemplates() {
  const { data, error } = await supabase
    .from('module_templates')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) {
    console.error('[GetModuleTemplates] Supabase error:', error)
    throw new Error('Failed to load module templates')
  }

  return data || []
}
```

## Notes

1. Module templates are used as the base for creating new modules in the editor
2. Each template has a specific category that determines its placement in the module picker
3. The `props` field is stored as JSONB to allow for flexible schema changes
4. All modules support background customization with color, image, or gradient options
5. The schema is designed to be extensible for future module types 