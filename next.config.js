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
    // Add this section
    async headers() {
        return [
            {
                source: '/api/:path*',
                headers: [
                    { key: 'Access-Control-Allow-Credentials', value: 'true' },
                    { key: 'Access-Control-Allow-Origin', value: '*' },
                    { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT' },
                    { key: 'Access-Control-Allow-Headers', value: 'Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date' },
                ],
            },
        ];
    }
};

module.exports = nextConfig;