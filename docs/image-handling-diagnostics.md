# Image Handling Diagnostics
**Documentation Generated:** March 19, 2024 15:30:00 UTC

## System Information
- **OS:** Windows 10 (win32 10.0.26100)
- **Workspace:** C:\Pageone\root
- **Shell:** C:\windows\System32\WindowsPowerShell\v1.0\powershell.exe

## Problem Description
The image handling system was experiencing issues with temporary image previews and persistence. The main problems were:

1. **Live Preview Issues**
   - Images were not displaying immediately after selection
   - Temporary URLs were not being properly created and managed
   - Background updates were not being properly propagated through the state management system

2. **State Management Problems**
   - The `_tempFile` property was not properly typed in the `Background` interface
   - Background updates in `useEditorState` were not preserving temporary files
   - Module updates were not properly handling background property changes

3. **Type System Issues**
   - Missing `_tempFile` property in the `Background` interface
   - Inconsistent type handling between `ModuleBackground` and `Background`
   - Type safety issues in the update functions

## Solution Implementation

### 1. Type System Updates
```typescript
// src/lib/editor/types.ts
export interface Background {
  type: 'color' | 'image';
  color?: string;
  opacity?: number;
  image?: string;
  overlay?: boolean;
  _tempFile?: File;  // Added for temporary file handling
}
```

### 2. State Management Improvements
```typescript
// src/lib/editor/useEditorState.tsx
const updateModule = (id: string, updates: Partial<Module>) => {
  setModules(prevModules => {
    const updatedModules = prevModules.map(module => {
      if (module.id === id) {
        // Special handling for background updates
        if (updates.props?.background) {
          const currentBackground = module.props.background || {};
          return {
            ...module,
            props: {
              ...module.props,
              background: {
                ...currentBackground,
                ...updates.props.background,
                // Preserve _tempFile if it exists
                _tempFile: updates.props.background._tempFile || currentBackground._tempFile
              }
            }
          };
        }
        // ... rest of the update logic
      }
      return module;
    });
    return updatedModules;
  });
};
```

### 3. Component Updates
```typescript
// src/components/modules/ModuleWrapper.tsx
const backgroundStyle = {
  backgroundColor: module.background.type === 'color' ? module.background.color : undefined,
  backgroundImage: module.background.type === 'image' 
    ? `url(${module.background.image || (module.background._tempFile ? URL.createObjectURL(module.background._tempFile) : undefined)})` 
    : undefined,
  // ... other style properties
};
```

## Flow of Image Handling

1. **Image Selection**
   ```typescript
   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     const file = e.target.files?.[0];
     if (file) {
       const tempUrl = URL.createObjectURL(file);
       setTempImageUrl(tempUrl);
       onChange({
         type: 'image',
         image: tempUrl,
         _tempFile: file,
         overlay: true
       });
     }
   };
   ```

2. **Temporary Preview**
   - Creates temporary URL using `URL.createObjectURL()`
   - Stores file in component state
   - Updates background with temporary URL
   - Cleans up URL on component unmount

3. **State Updates**
   - Preserves `_tempFile` through state updates
   - Maintains temporary URL for preview
   - Properly merges background properties

4. **Persistence**
   - Images are only uploaded to Supabase when publishing
   - Temporary files are processed during publish
   - Final URLs are stored in the database

## Current Status

### Working Features
- ✅ Live image preview
- ✅ Temporary file storage
- ✅ Background property updates
- ✅ Type safety improvements

### Pending Testing
- ⏳ Image persistence on publish
- ⏳ Cleanup of temporary URLs
- ⏳ Error handling during upload

## Recommendations

1. **Testing**
   - Test image upload with various file types
   - Verify cleanup of temporary URLs
   - Check error handling scenarios

2. **Monitoring**
   - Add logging for image processing
   - Track temporary URL creation/cleanup
   - Monitor memory usage

3. **Future Improvements**
   - Add image optimization before upload
   - Implement retry mechanism for failed uploads
   - Add progress indicators for uploads

## Debugging Tips

1. **Check Temporary URLs**
   ```typescript
   console.log('Temp URL:', tempImageUrl);
   console.log('Background:', module.background);
   ```

2. **Verify State Updates**
   ```typescript
   console.log('Before update:', module);
   console.log('Updates:', updates);
   console.log('After update:', updatedModule);
   ```

3. **Monitor File Handling**
   ```typescript
   console.log('File:', file);
   console.log('File type:', file.type);
   console.log('File size:', file.size);
   ```

## Commit History
- **Latest Commit:** feat: implement temporary image handling [UNSTABLE]
  - Added temporary image preview using URL.createObjectURL()
  - Updated Background type to include _tempFile property
  - Modified useEditorState to preserve temporary files
  - Images now show live preview but not persisted until publish
  - TODO: Test persistence on publish

## Notes
- This documentation was generated as part of the image handling system debugging process
- All timestamps are in UTC
- System information reflects the development environment at the time of documentation 