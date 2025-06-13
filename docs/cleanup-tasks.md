# Image Handling System Cleanup Tasks

## 1. Storage Policy Consolidation
- [ ] Remove `scripts/setupStoragePolicies.sql` as it's superseded by the migration
- [ ] Update `scripts/setupStoragePolicies.ts` to use the new policies
- [ ] Add migration rollback scripts for the new policies

## 2. Image Path Standardization
- [ ] Standardize image path casing to lowercase
- [ ] Update `scripts/migrateAssets.ts` with consistent paths
- [ ] Move all default images to `public/images/` directory
- [ ] Update asset mappings with correct paths

## 3. Module Template Updates
- [ ] Replace placeholder URLs with actual Supabase storage URLs
- [ ] Update `docs/module_templates_rows.sql` with new image paths
- [ ] Add migration script to update existing templates
- [ ] Verify all template images are properly stored

## 4. File Type and Size Consistency
- [ ] Update `BackgroundSettings.tsx` to match documented file types
- [ ] Align file size limits across all components
- [ ] Add file type validation in upload API
- [ ] Update documentation to reflect actual limits

## 5. Code Cleanup
- [ ] Remove unused image-related code
- [ ] Consolidate duplicate type definitions
- [ ] Update error handling to be consistent
- [ ] Add proper TypeScript types for all image-related functions

## 6. Documentation Updates
- [ ] Update README with new image handling system
- [ ] Add troubleshooting guide for common issues
- [ ] Document migration process for existing images
- [ ] Add API documentation for image endpoints

## 7. Testing
- [ ] Add unit tests for image upload
- [ ] Add integration tests for image processing
- [ ] Test file type validation
- [ ] Test size limits
- [ ] Test error handling

## 8. Performance Optimization
- [ ] Implement image lazy loading
- [ ] Add proper caching headers
- [ ] Optimize image processing pipeline
- [ ] Add CDN configuration

## 9. Security
- [ ] Review and update access policies
- [ ] Add file content validation
- [ ] Implement rate limiting
- [ ] Add audit logging for uploads

## 10. Monitoring
- [ ] Add upload success/failure tracking
- [ ] Monitor storage usage
- [ ] Track image processing performance
- [ ] Set up alerts for issues 