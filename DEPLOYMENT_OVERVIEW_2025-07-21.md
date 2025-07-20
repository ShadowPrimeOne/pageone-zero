# Pageone Project: Layout & Deployment Overview
**Date:** 2025-07-21

---

## 1. Project Structure (Key Directories)

- **src/app/**: Main Next.js App Router directory
  - **page.tsx**: Root index page (shows a list of all main routes for testing)
  - **demo/**: Contains demo landing pages (trades, trades2, health, professional)
  - **page/**: Contains custom pages (e.g., adwords-boost-au-electrician)
  - **profile/, campaigns/, clients/, leads/, dashboard/**: Main app sections
  - **WhitePaper001/**: White paper page
  - **oauth2callback/**: OAuth callback handler
- **src/components/**: All React components (landing modules, UI, editor, etc.)
- **public/**: Static assets (images, icons, etc.)
- **vercel.json**: Vercel deployment config (no root redirect as of this date)

---

## 2. Routing & Pages

- **Root (`/`)**: Shows a simple index page with hyperlinks to all main routes for live testing.
- **/demo/trades**: Main trades landing page (electrician/plumber/builder demo)
- **/demo/trades2**: Clean, modern agency-grade version of trades page
- **/demo/health**: Health/dental landing page demo
- **/demo/professional**: Professional services landing page demo
- **/page/adwords-boost-au-electrician**: AdWords Boost campaign landing page
- **/profile, /campaigns, /clients, /leads, /dashboard**: Main app sections
- **/WhitePaper001**: White paper/long-form content
- **/oauth2callback**: OAuth2 callback endpoint

---

## 3. Deployment Process

- **Vercel is used for hosting and CI/CD.**
- **Production branch:** `main` (ensure all changes are merged here for live deployment)
- **vercel.json**: No root redirect; headers set for security; Next.js output directory is `.next`.
- **To deploy:**
  1. Commit and push to `main` branch.
  2. Vercel auto-detects and deploys.
  3. Manual deploy possible with `vercel --prod`.
- **Custom domain:** `https://pageone.live/` (root now shows index page, not a redirect)

---

## 4. Troubleshooting & Notes

- If root (`/`) redirects, check for a `redirects` block in `vercel.json` or dashboard settings.
- All new pages must be in the `src/app/[route]/page.tsx` format for Next.js App Router.
- For static assets, use the `public/` directory.
- For new features, create a new branch, PR to `main`, and merge for deployment.

---

## 5. Contact & Handover

- This document is current as of **2025-07-21**.
- For further deployment or development, follow the above structure and process.
- All code and deployment settings are up to date as of this date. 