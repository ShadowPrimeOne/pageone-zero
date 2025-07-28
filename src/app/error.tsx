"use client";

import React from "react";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <html>
      <body style={{ fontFamily: 'monospace', background: '#fff', color: '#b00', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: 16 }}>Something went wrong</h1>
        <pre style={{ background: '#f6f6f6', padding: 16, borderRadius: 8, color: '#222', maxWidth: 600, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{error?.message || String(error)}</pre>
        <button onClick={() => reset()} style={{ marginTop: 24, padding: '8px 24px', fontSize: '1rem', borderRadius: 6, border: 'none', background: '#b00', color: '#fff', cursor: 'pointer' }}>
          Try Again
        </button>
      </body>
    </html>
  );
}
