/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        allowedDevOrigins: [
            '192.168.0.13:3000',
            '192.168.0.13',
            'localhost:3000'
        ]
    },
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '8000',
                pathname: '/uploads/**',
            },
            {
                protocol: 'http',
                hostname: '127.0.0.1',
                port: '8000',
                pathname: '/uploads/**',
            },
            {
                protocol: 'http',
                hostname: '192.168.0.13',
                port: '8000',
                pathname: '/uploads/**',
            },
        ],
    },
};

export default nextConfig;
