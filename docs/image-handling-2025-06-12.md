# Image Handling System Documentation (2025-06-12)

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

## API Routes

### 1. Secure Image Upload (`/api/uploadImage`)
```typescript
POST /api/uploadImage
Content-Type: application/json

Request Body:
{
  base64: string,    // Base64-encoded image data
  name: string,      // Original filename
  type: string,      // MIME type (image/jpeg, image/png, etc.)
  slug: string       // Page slug for folder organization
}

Response:
{
  url: string        // Public URL of uploaded image
}
```

Features:
- Server-side processing using `supabaseAdmin` client
- Automatic image optimization via Sharp
- WebP conversion for better performance
- Secure filename sanitization
- Proper error handling and validation
- Content-Disposition headers for safe downloads

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
   - Server-side uploads via `supabaseAdmin`
   - User-specific folders

2. **File Validation**
   - Type checking
   - Size limits
   - Content scanning
   - Filename sanitization

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
const response = await fetch('/api/uploadImage', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    base64: imageData,
    name: 'example.jpg',
    type: 'image/jpeg',
    slug: 'my-page'
  })
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