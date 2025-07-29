"use client";

import React from "react";

export default function NotFound() {
  return (
    <html>
      <body style={{ fontFamily: 'monospace', background: '#fff', color: '#b00', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: 16 }}>404 - Page Not Found</h1>
        <p style={{ background: '#f6f6f6', padding: 16, borderRadius: 8, color: '#222', maxWidth: 600 }}>
          The page you are looking for does not exist.
        </p>
        <a href="/" style={{ marginTop: 24, padding: '8px 24px', fontSize: '1rem', borderRadius: 6, border: 'none', background: '#b00', color: '#fff', cursor: 'pointer', textDecoration: 'none' }}>
          Go Home
        </a>
      </body>
    </html>
  );
}
