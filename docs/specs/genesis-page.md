# 🧬 Genesis Page Specification

## Summary
The Genesis page is the root editable shell of Page.one. It is never saved to the database and spawns all forked user pages.

## Core Features
- Always-editable root page
- Module-based content system
- Client-side encryption
- Password-protected publishing

## Modules Used
- HeroModule
  - Title, subtitle, CTA
  - Centered layout
- FormModule
  - Customizable fields
  - Text, email, textarea inputs
  - Required field support

## Core Functions
- `useEditorState` → handles module state
- `PublishModal` → encrypts and saves slug
- `SaveKeyModal` → stores encryption key
- `UnlockKeyModal` → recovers encryption key

## Technical Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- libsodium-wrappers (encryption)
- Supabase (storage)

## Future Enhancements
- Swipeable fork preview UI
- Genesis changelog graph
- Image upload support
- Module drag-and-drop
- Real-time collaboration 