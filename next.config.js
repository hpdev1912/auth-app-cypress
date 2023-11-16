/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        destination: '/dashboard',
        source: '/',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
