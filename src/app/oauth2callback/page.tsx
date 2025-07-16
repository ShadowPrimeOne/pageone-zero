import { cookies } from 'next/headers';

export default async function OAuth2CallbackPage({ searchParams }: { searchParams: { code?: string; state?: string } }) {
  const code = searchParams.code;
  let tokenResult = null;
  let error = null;

  if (code) {
    try {
      // Exchange code for tokens
      const params = new URLSearchParams();
      params.append('code', code);
      params.append('client_id', process.env.GOOGLE_CLIENT_ID!);
      params.append('client_secret', process.env.GOOGLE_CLIENT_SECRET!);
      params.append('redirect_uri', process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI!);
      params.append('grant_type', 'authorization_code');

      const res = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      });
      tokenResult = await res.json();
      if (!res.ok) {
        error = tokenResult.error_description || tokenResult.error || 'Unknown error';
      } else {
        // Optionally, set tokens in cookies or session here
      }
    } catch (e: any) {
      error = e.message || String(e);
    }
  }

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', fontFamily: 'monospace' }}>
      <h1>Google OAuth2 Callback</h1>
      {code ? (
        error ? (
          <div style={{ color: 'red' }}>Error: {error}</div>
        ) : (
          <pre style={{ background: '#f4f4f4', padding: 16, borderRadius: 8 }}>
            {JSON.stringify(tokenResult, null, 2)}
          </pre>
        )
      ) : (
        <div>No code parameter found in URL.</div>
      )}
    </div>
  );
} 