/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'zevicapital-directus-backend-lc-inmobiliaria.up.railway.app',
        pathname: '/assets/**',
      },
    ],
  },
}

module.exports = nextConfig
; 
