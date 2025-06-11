/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['xkpxwcrxjgjmbxgupkhq.supabase.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'xkpxwcrxjgjmbxgupkhq.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
}

module.exports = nextConfig 