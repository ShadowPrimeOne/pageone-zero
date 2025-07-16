# Using Two Supabase Projects in Your App

This project is configured to use **two separate Supabase projects**:

---

## 1. Main App Supabase Project
- **Purpose:** Handles all primary app data (users, pages, leads, etc.)
- **Environment Variables:**
  - `NEXT_PUBLIC_SUPABASE_URL` — Public URL for the main Supabase project (used on client and server)
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Public anon key for the main project (used on client and server)
  - `SUPABASE_SERVICE_ROLE_KEY` — Service role key for the main project (server-side only, for admin actions)

**Usage:**
- Used throughout the main app for all user-facing features and data storage.
- Example: `src/lib/supabase.ts` and `src/lib/supabase/server.ts` use these variables.

---

## 2. Ambassador Toolkit Supabase Project
- **Purpose:** Dedicated to the Ambassador Toolkit MVP (separate data, permissions, or experimental features)
- **Environment Variables:**
  - `SUPABASE_URL` — Public URL for the Ambassador Toolkit Supabase project
  - `SUPABASE_KEY` — Public anon key (or service key) for the Ambassador Toolkit project

**Usage:**
- Used only in the Ambassador Toolkit MVP code (not in the main app logic).
- Keeps ambassador data, experiments, or workflows isolated from the main app.
- Example: You might have a separate `src/lib/supabaseAmbassador.ts` or similar for this connection.

---

## Best Practices
- **Keep service keys server-side only.** Never expose `SUPABASE_SERVICE_ROLE_KEY` or any service key to the client.
- **Use separate Supabase projects for clear data boundaries** (e.g., production vs. MVP/experimental features).
- **Document which code uses which project** to avoid confusion.
- **Set all required environment variables in `.env.local`** for local development, and in your deployment environment for production.

---

## Example `.env.local` Structure
```env
# Main App Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-main-app.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-main-app-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-main-app-service-role-key

# Ambassador Toolkit Supabase
SUPABASE_URL=https://your-ambassador-toolkit.supabase.co
SUPABASE_KEY=your-ambassador-toolkit-anon-or-service-key
```

---

**Summary:**
- The main app and the Ambassador Toolkit MVP are fully separated at the database level for security, clarity, and future scalability.
- You can add more Supabase projects in the future by following this pattern. 