# Image Handling System Documentation

## Overview
The image handling system in PageOne manages different types of images: temporary preview images, default module images, and user-uploaded images. This document provides a detailed explanation of the system's architecture, storage structure, and implementation details.

## Storage Structure

### Supabase Storage Buckets
1. **public-images**
   - Main bucket for all image storage
   - Public access enabled
   - 50MB file size limit
   - Accepts only image files
   - Organized into subfolders:
     - `/modules/` - Default module images
     - `/user/` - User-uploaded images

### Folder Structure
```
public-images/
├── modules/
│   ├── hero/
│   │   ├── classic_overlay_hero/
│   │   ├── top_image_center_text_hero/
│   │   └── split_layout_hero/
│   └── [other-module-types]/
└── user/
    └── [page-slug]/
        └── [timestamp]-[filename].webp
```

## Image Types and Handling

### 1. Temporary Images
- Used for preview during image upload
- Stored in browser memory using `URL.createObjectURL()`
- Automatically cleaned up when component unmounts
- Never persisted to storage

### 2. Default Module Images
- Pre-uploaded images for module templates
- Stored in `/modules/[category]/[module-type]/`
- Referenced in module templates database
- Immutable after initial setup

### 3. User-Uploaded Images
- Stored in `/user/[page-slug]/`
- Optimized and converted to WebP format
- Unique filenames using timestamp
- Associated with specific pages via slug

## Database Schema

### Module Templates Table
```sql
create table module_templates (
  id uuid default uuid_generate_v4() primary key,
  type text not null,
  category text not null,
  title text not null,
  description text,
  default_image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

### Storage Policies
```sql
-- Allow public read access
create policy "Public Access"
on storage.objects for select
using ( bucket_id = 'public-images' );

-- Allow authenticated uploads
create policy "Authenticated Uploads"
on storage.objects for insert
with check (
  bucket_id = 'public-images'
  and auth.role() = 'authenticated'
);

-- Allow users to update their own files
create policy "User Update Access"
on storage.objects for update
using (
  bucket_id = 'public-images'
  and (storage.foldername(name))[1] = 'user'
  and (storage.foldername(name))[2] = auth.uid()::text
);
```

## API Routes

### 1. Image Upload (`/api/upload`)
```typescript
POST /api/upload
Content-Type: multipart/form-data

Parameters:
- file: File (required)
- moduleType: string (required)
- pageSlug: string (required)

Response:
{
  success: boolean,
  url: string,
  path: string
}
```

### 2. Slug Check (`/api/checkSlug`)
```typescript
GET /api/checkSlug?slug={slug}

Response:
{
  available: boolean
}
```

## Image Processing Pipeline

1. **Upload Initiation**
   - User selects image in UI
   - Temporary preview created
   - File stored in component state

2. **Image Optimization**
   - Convert to WebP format
   - Resize to max 1920x1080
   - Maintain aspect ratio
   - Quality set to 90%

3. **Storage**
   - Generate unique filename
   - Create user folder if needed
   - Upload to Supabase
   - Return public URL

## Implementation Details

### Frontend Components
1. **BackgroundSettings**
   - Handles image selection
   - Manages temporary preview
   - Triggers upload process

2. **PublishModal**
   - Coordinates image uploads
   - Updates module data
   - Handles error states

### Backend Services
1. **Upload API**
   - Validates input
   - Processes images
   - Manages storage
   - Returns URLs

## Error Handling

1. **Upload Failures**
   - Network errors
   - Storage quota exceeded
   - Invalid file types
   - Processing errors

2. **Recovery Strategies**
   - Automatic retries
   - User notifications
   - Fallback options

## Security Considerations

1. **Access Control**
   - Public read access
   - Authenticated uploads
   - User-specific folders

2. **File Validation**
   - Type checking
   - Size limits
   - Content scanning

## Performance Optimization

1. **Image Processing**
   - WebP conversion
   - Size optimization
   - Lazy loading

2. **Storage Management**
   - Efficient folder structure
   - Cleanup routines
   - Cache control

## Future Improvements

1. **Planned Features**
   - Image cropping
   - Multiple format support
   - CDN integration

2. **Technical Debt**
   - Batch processing
   - Error recovery
   - Monitoring

## Usage Examples

### Uploading an Image
```typescript
const formData = new FormData();
formData.append('file', imageFile);
formData.append('moduleType', 'classic_overlay_hero');
formData.append('pageSlug', 'my-page');

const response = await fetch('/api/upload', {
  method: 'POST',
  body: formData
});

const { url } = await response.json();
```

### Checking Slug Availability
```typescript
const response = await fetch(`/api/checkSlug?slug=${slug}`);
const { available } = await response.json();
```

## Troubleshooting

1. **Common Issues**
   - Upload failures
   - Processing errors
   - Access denied

2. **Solutions**
   - Check permissions
   - Verify file types
   - Clear cache

## Maintenance

1. **Regular Tasks**
   - Storage cleanup
   - Policy updates
   - Performance monitoring

2. **Backup Strategy**
   - Regular backups
   - Disaster recovery
   - Version control 