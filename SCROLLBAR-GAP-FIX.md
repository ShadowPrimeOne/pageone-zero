# Fixing the Persistent Right-Side Scrollbar Gap in Demo Pages

## Problem
- A persistent white gap or visible scrollbar appeared on the right side of demo pages (trades, health, professional).
- This gap was the browser's vertical scrollbar area, which showed the background color or image of the `body`/`html`.
- The issue was especially visible when the page was scrollable (tall content).

## Root Cause
- The gap is caused by the browser reserving space for the vertical scrollbar.
- If the page background is white (or different from the hero/content background), the gap is visible.
- Using `100vw` or `w-screen` for content containers can also cause overflow, but in this case, the main issue was the visible scrollbar itself.

## Solution: Hide the Scrollbar Globally
To make the page appear scroll bar free (no gap, no visible scroll bar), add the following CSS to your global stylesheet (e.g., `globals.css`):

```css
html, body {
  scrollbar-width: none !important; /* Firefox */
  -ms-overflow-style: none !important; /* IE and Edge */
}

body::-webkit-scrollbar, html::-webkit-scrollbar {
  display: none !important; /* Chrome, Safari, Opera */
}
```

- This hides the vertical scrollbar in all major browsers.
- No gap or scroll bar will be visible, even when the page is scrollable.

## Notes
- This approach is for landing/demo pages where a scroll bar is not desired for visual reasons.
- For accessibility or usability, consider keeping the scroll bar visible on content-heavy or interactive pages.
- Do **not** use `100vw` or `w-screen` for content containers; always use `w-full` or `width: 100%` for layout.

## How to Revert
- Remove or comment out the above CSS if you want to restore the default scrollbar behavior.

---

**This fix was applied globally in `src/app/globals.css` as of [DATE].** 