# Module System Documentation

## 1. Database Structure

### Module Templates Table
```sql
CREATE TABLE module_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL,
  props JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Key Points:
- Each module is stored as a template in the database
- `props` is stored as JSONB for flexible schema
- UUID is used for unique identification
- Timestamps track creation time

## 2. Module Types and Interfaces

### Base Module Interface
```typescript
interface Module {
  id: string
  type: 'hero' | 'form'  // Extensible for new module types
  props: HeroProps | FormProps
}
```

### Current Module Types:

#### Hero Module
```typescript
interface HeroProps {
  heading: string
  subheading: string
}
```

#### Form Module
```typescript
interface FormProps {
  title: string
  fields: FormField[]
  submitText: string
}

interface FormField {
  id: string
  label: string
  type: 'text' | 'email' | 'textarea'
  required: boolean
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
const addModule = (type: 'hero' | 'form', relativeTo: string, position: 'above' | 'below') => {
  const newModule: Module = {
    id: `mod-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    type,
    props: type === 'hero'
      ? { heading: 'New Hero', subheading: 'Subheading here' }
      : { title: 'New Form', submitText: 'Submit', fields: [] }
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