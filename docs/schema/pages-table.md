# 📌 Phase 1D: Publish Modal – Supabase Schema Update

## 🔄 Table Affected: `pages`

### 🧩 Context:
As part of Phase 1D, the `publishPage` API endpoint saves user-edited modules to the `pages` table. The schema must support:

- `slug` — user-friendly unique identifier
- `modules` — JSONB array of editable content blocks
- `owner_key` — UUID used to secure ownership of the page

### 🔧 Migration Commands Executed:

```sql
-- Ensure `slug` field exists
ALTER TABLE pages ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE NOT NULL;

-- Ensure `modules` is JSONB
ALTER TABLE pages ADD COLUMN IF NOT EXISTS modules JSONB;
ALTER TABLE pages ALTER COLUMN modules TYPE JSONB USING modules::jsonb;

-- Ensure `owner_key` exists as UUID
ALTER TABLE pages ADD COLUMN IF NOT EXISTS owner_key UUID NOT NULL DEFAULT gen_random_uuid();
```

### 📋 Notes:

* These commands are idempotent and safe to rerun.
* `gen_random_uuid()` assumes the `pgcrypto` extension is enabled.
* This schema enables frontend publishing and unique page access via QR code / owner key. 