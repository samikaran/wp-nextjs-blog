/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'secure.gravatar.com',
                pathname: '/avatar/**',
            },
            {
                protocol: process.env.WORDPRESS_PROTOCOL || 'http',
                hostname: process.env.WORDPRESS_HOST || '',
                pathname: '/wp-content/uploads/**',
            }
        ],
    },
}

module.exports = nextConfig