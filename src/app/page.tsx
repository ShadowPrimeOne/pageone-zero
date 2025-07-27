import Link from 'next/link';

export default function HomePage() {
  return (
    <main style={{ maxWidth: 600, margin: '3rem auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem' }}>Test Index</h1>
      <ul style={{ lineHeight: 2, fontSize: '1.1rem' }}>
        <li><Link href="/demo/horse-transport"><b>Premium Horse Transport Demo</b></Link></li>
        <li><Link href="/demo/professional"><b>Professional Accountant Demo (PerthPro)</b></Link></li>
        <li><Link href="/demo/trades">/demo/trades</Link></li>
        <li><Link href="/demo/trades2">/demo/trades2</Link></li>
        <li><Link href="/demo/health">/demo/health</Link></li>
        <li><Link href="/demo/professional">/demo/professional</Link></li>
        <li><Link href="/page/adwords-boost-au-electrician">/page/adwords-boost-au-electrician</Link></li>
        <li><Link href="/profile">/profile</Link></li>
        <li><Link href="/campaigns">/campaigns</Link></li>
        <li><Link href="/clients">/clients</Link></li>
        <li><Link href="/leads">/leads</Link></li>
        <li><Link href="/dashboard">/dashboard</Link></li>
        <li><Link href="/WhitePaper001">/WhitePaper001</Link></li>
        <li><Link href="/oauth2callback">/oauth2callback</Link></li>
      </ul>
    </main>
  );
}
