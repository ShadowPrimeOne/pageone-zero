# Module System Documentation

## 1. Database Structure

### Module Templates Table
```sql
CREATE TABLE module_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL,
  props JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  category module_category NOT NULL DEFAULT 'hero'
);

-- Module category enum type
CREATE TYPE module_category AS ENUM (
  'hero',
  'content',
  'form',
  'process',
  'contact'
);
```

### Pages Table
```sql
CREATE TABLE pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  key TEXT NOT NULL,
  modules JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  phone_number TEXT,
  "key-2" UUID,
  "key-3" UUID
);
```

### Key Points:
- Each module is stored as a template in the database with a specific category
- `props` is stored as JSONB for flexible schema
- UUID is used for unique identification
- Timestamps track creation time
- Pages table is specifically for saved pages with slugs
- Modules in pages table are stored as JSONB array
- Environment variables are configured in .env.local:
  ```
  NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
  ```

## 2. Module Types and Interfaces

### Base Module Interface
```typescript
interface Module {
  id: string
  type: 'classic_overlay_hero' | 'top_image_center_text_hero' | 'split_layout_hero' | 'hero' | 'hero2' | 'form' | 'OurProcess' | 'contact_form'
  category: 'hero' | 'content' | 'form' | 'process' | 'contact'
  props: HeroProps | Hero2Props | ClassicOverlayHeroProps | TopImageCenterTextHeroProps | SplitLayoutHeroProps | FormProps | OurProcessProps | ContactFormProps
  background?: ModuleBackground
}

interface ModuleBackground {
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
```

### Current Module Types:

#### Hero Modules
```typescript
interface HeroProps {
  heading: string
  subheading: string
  ctaText?: string
  background?: ModuleBackground
}

interface ClassicOverlayHeroProps extends HeroProps {
  background?: ModuleBackground
}

interface TopImageCenterTextHeroProps extends HeroProps {
  background?: ModuleBackground
}

interface SplitLayoutHeroProps extends HeroProps {
  background?: ModuleBackground
}

interface Hero2Props extends HeroProps {
  background?: ModuleBackground
}
```

#### Form Modules
```typescript
interface FormProps {
  title: string
  fields: FormField[]
  submitText: string
  background?: ModuleBackground
}

interface FormField {
  id: string
  label: string
  type: 'text' | 'email' | 'textarea'
  required: boolean
  placeholder?: string
}

interface ContactFormProps {
  heading: string
  subheading: string
  background?: ModuleBackground
}
```

#### Process Module
```typescript
interface OurProcessProps {
  heading: string
  subheading: string
  background?: ModuleBackground
}
```

## 3. Module Container Rules

### Layout Guidelines
1. **Container Width**
   - Maximum width: `max-w-4xl` (896px)
   - Centered with `mx-auto`
   - Padding: `px-4` (16px) on mobile

2. **Spacing**
   - Vertical gap between modules: `gap-4` (16px)
   - Module padding: `py-8` (32px) vertical
   - Consistent horizontal padding within modules

3. **Responsive Design**
   - Mobile-first approach
   - Breakpoints:
     - Mobile: < 640px
     - Tablet: 640px - 1024px
     - Desktop: > 1024px

### Module Wrapper
```typescript
<div className="relative w-full group transition-all">
  {/* Module content */}
</div>
```

## 4. Module Development Guidelines

### 1. Structure
- Each module must be a client component (`'use client'`)
- Must implement the base Module interface
- Must be wrapped in ModuleWrapper component
- Must include proper TypeScript types

### 2. Styling Rules
- Use Tailwind CSS for styling
- Follow mobile-first approach
- Maintain consistent spacing
- Use semantic HTML elements
- Implement proper focus states
- Include hover states for interactive elements

### 3. Responsive Design
- Start with mobile layout
- Use responsive classes (sm:, md:, lg:)
- Test on multiple screen sizes
- Ensure touch targets are at least 44x44px

### 4. Accessibility
- Include proper ARIA labels
- Maintain proper heading hierarchy
- Ensure sufficient color contrast
- Support keyboard navigation
- Include focus indicators

## 5. Module Builder Tool Requirements

### 1. Validation Rules
```typescript
interface ModuleValidation {
  required: {
    type: string
    props: Record<string, any>
  }
  optional: {
    props: Record<string, any>
  }
  constraints: {
    maxLength?: number
    minLength?: number
    pattern?: RegExp
  }
}
```

### 2. Database Safety Checks
- Validate JSON structure
- Check for required fields
- Verify data types
- Sanitize user input
- Prevent SQL injection

### 3. Module Testing
- Visual regression testing
- Responsive design testing
- Accessibility testing
- Performance testing
- Cross-browser testing

## 6. Module Integration

### 1. Adding New Modules
```typescript
const addModule = (type: 'classic_overlay_hero' | 'top_image_center_text_hero' | 'split_layout_hero', relativeTo: string, position: 'above' | 'below') => {
  const newModule: Module = {
    id: crypto.randomUUID(),
    type,
    category: 'hero',
    props: {
      heading: 'New Module',
      subheading: 'Add your content here',
      background: {
        type: 'color',
        color: '#ffffff',
        opacity: 1
      }
    }
  }
  // Insert module logic
}
```

### 2. Module Rendering
```typescript
<ModuleRenderer
  modules={modules}
  selectedModuleId={selectedModuleId}
  onSelect={selectModule}
  onDelete={deleteModule}
  onMoveUp={moveModuleUp}
  onMoveDown={moveModuleDown}
  onDuplicate={duplicateModule}
  onEdit={editModule}
  onAddRequest={onAddRequest}
  onUpdate={updateModule}
/>
```

## 7. Best Practices

### 1. Module Development
- Keep modules focused and single-purpose
- Implement proper error handling
- Use TypeScript for type safety
- Follow consistent naming conventions
- Document props and interfaces

### 2. Performance
- Lazy load modules when possible
- Optimize images and assets
- Minimize CSS and JavaScript
- Use proper caching strategies
- Monitor performance metrics

### 3. Security
- Validate all user input
- Sanitize data before storage
- Implement proper access controls
- Use secure communication
- Follow security best practices

## 8. Module Builder Tool Implementation

### 1. Development Environment
```typescript
interface ModuleBuilderConfig {
  validation: ModuleValidation
  preview: boolean
  responsive: boolean
  accessibility: boolean
}
```

### 2. Testing Environment
- Visual preview
- Responsive testing
- Accessibility testing
- Performance testing
- Cross-browser testing

### 3. Deployment Process
1. Validate module structure
2. Run automated tests
3. Check accessibility
4. Verify responsive design
5. Deploy to staging
6. Final review
7. Deploy to production

## 9. Asset Management

### 1. Image Storage
- Images are stored in Supabase Storage
- Each module category has its own bucket:
  - Hero modules: `public-images/modules/hero`
  - Content modules: `public-images/modules/content`
  - Form modules: `public-images/modules/form`
  - Process modules: `public-images/modules/process`
  - Contact modules: `public-images/modules/contact`

### 2. Image Upload Process
1. User selects an image in the module editor
2. Image is uploaded to the appropriate bucket based on module type
3. File path format: `modules/{category}/{moduleType}/{timestamp}-{filename}`
4. Public URL is generated and stored in the module's background properties

### 3. Image Optimization
- Images are automatically optimized for web delivery
- Supported formats: PNG, JPG, GIF
- Maximum file size: 10MB
- Recommended dimensions:
  - Hero images: 1920x1080px
  - Content images: 1200x800px
  - Form/Process images: 800x600px

### 4. Image Access Control
- All module images are publicly accessible
- Images are served through Supabase CDN
- Cache control is set to 3600 seconds (1 hour)
- No authentication required for image access

## Image Requirements

### Hero Module Images
Each hero module type requires specific image dimensions and formats:

1. Classic Overlay Hero
   - Dimensions: 1920x1080px (16:9)
   - Format: WebP (preferred) or JPG
   - Location: `public/images/hero-background.webp`
   - Purpose: Full-screen background with text overlay

2. Top Image Center Text Hero
   - Dimensions: 1200x800px (3:2)
   - Format: JPG or WebP
   - Location: `public/images/top-image-hero.jpg`
   - Purpose: Top banner image with centered text below

3. Split Layout Hero
   - Dimensions: 800x1200px (2:3)
   - Format: JPG or WebP
   - Location: `public/images/split-hero.jpg`
   - Purpose: Split layout with image on one side

4. Basic Hero
   - Dimensions: 1920x1080px (16:9)
   - Format: JPG or WebP
   - Location: `public/images/basic-hero.jpg`
   - Purpose: Simple background with centered text

5. Hero2
   - Dimensions: 1920x1080px (16:9)
   - Format: JPG or WebP
   - Location: `public/images/hero2.jpg`
   - Purpose: Alternative hero layout with gradient

### Image Placeholders
Until actual images are provided, use placeholder services:
```typescript
// Example placeholder URLs
const placeholders = {
  classicOverlay: 'https://placehold.co/1920x1080/1a1a1a/ffffff?text=Hero+Background',
  topImage: 'https://placehold.co/1200x800/1a1a1a/ffffff?text=Top+Image',
  splitLayout: 'https://placehold.co/800x1200/1a1a1a/ffffff?text=Split+Image',
  basic: 'https://placehold.co/1920x1080/1a1a1a/ffffff?text=Basic+Hero',
  hero2: 'https://placehold.co/1920x1080/1a1a1a/ffffff?text=Hero+2'
}
```

### Image Optimization
1. Use WebP format when possible
2. Compress images before upload
3. Maintain aspect ratios
4. Use responsive images with srcset
5. Implement lazy loading

### Image Storage
1. All module images are stored in Supabase storage
2. Path structure: `public-images/modules/{category}/{module_type}/`
3. Naming convention: `{timestamp}-{filename}`
4. Public URLs are stored in module templates

### Image Migration
1. Place images in `public/images/` directory
2. Update `scripts/migrateAssets.ts` with new mappings
3. Run migration script: `npx ts-node scripts/migrateAssets.ts`
4. Verify uploads in Supabase storage
5. Update module templates with new URLs

## Creating New Modules

### 1. Module Structure
```typescript
// src/components/modules/NewModule.tsx
'use client'

import type { ModuleProps } from '@/lib/editor/types'

interface Props extends ModuleProps {
  onUpdate?: (updates: Partial<ModuleProps>) => void
}

export function NewModule({ heading, subheading, background, onUpdate }: Props) {
  return (
    <div className="relative w-full">
      {/* Background */}
      {background?.type === 'image' && background.image ? (
        <img
          src={background.image}
          alt="Background"
          className="w-full h-full object-cover"
        />
      ) : (
        <div 
          className="w-full h-full"
          style={{
            backgroundColor: background?.color || '#000000',
            opacity: background?.opacity || 1
          }}
        />
      )}
      
      {/* Content */}
      <div className="relative z-10">
        <h2>{heading}</h2>
        <p>{subheading}</p>
      </div>
    </div>
  )
}
```

### 2. Module Registration
1. Add module type to `ModuleType` enum in `src/lib/editor/types.ts`:
```typescript
export enum ModuleType {
  NEW_MODULE = 'new_module',
  // ... other types
}
```

2. Add module interface in `src/lib/editor/types.ts`:
```typescript
export interface NewModuleProps extends ModuleProps {
  // Add any module-specific props
}
```

3. Register module in `src/components/modules/ModuleRenderer.tsx`:
```typescript
import { NewModule } from './NewModule'

// In the renderModule function:
case ModuleType.NEW_MODULE:
  return <NewModule {...props} />
```

### 3. Database Setup
1. Create module template in `module_templates` table:
```sql
INSERT INTO module_templates (
  type,
  name,
  description,
  category,
  props
) VALUES (
  'new_module',
  'New Module',
  'Description of the new module',
  'content', -- or appropriate category
  '{
    "heading": "Default Heading",
    "subheading": "Default Subheading",
    "background": {
      "type": "color",
      "color": "#000000",
      "opacity": 1
    }
  }'::jsonb
);
```

### 4. Asset Management
1. Create module-specific folder in Supabase storage:
   - Path: `public-images/modules/{category}/{module_type}/`
   - Example: `public-images/modules/content/new_module/`

2. Add image mapping to `scripts/migrateAssets.ts`:
```typescript
{
  localPath: 'public/images/new-module.jpg',
  moduleType: 'new_module',
  category: 'content'
}
```

### 5. Testing
1. Create test page with new module
2. Verify module rendering
3. Test editor functionality
4. Verify image uploads
5. Test responsive design

### 6. Documentation
1. Add module to `docs/module_templates_rows.sql`
2. Update module documentation
3. Add usage examples
4. Document any special features or requirements

## Module Development Checklist

### Required Files
- [ ] Component file (`src/components/modules/NewModule.tsx`)
- [ ] Type definitions (`src/lib/editor/types.ts`)
- [ ] Module registration (`src/components/modules/ModuleRenderer.tsx`)
- [ ] Database template (`docs/module_templates_rows.sql`)
- [ ] Asset mappings (`scripts/migrateAssets.ts`)

### Required Features
- [ ] Responsive design
- [ ] Editor support
- [ ] Background handling (image/color)
- [ ] Proper TypeScript types
- [ ] Accessibility support
- [ ] Error handling
- [ ] Loading states

### Testing Requirements
- [ ] Visual testing
- [ ] Editor functionality
- [ ] Image uploads
- [ ] Responsive behavior
- [ ] Accessibility
- [ ] Error states

### Documentation Requirements
- [ ] Module description
- [ ] Props documentation
- [ ] Usage examples
- [ ] Asset requirements
- [ ] Special features
- [ ] Known limitations 