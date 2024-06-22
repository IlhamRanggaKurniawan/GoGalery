/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['https://8wd140mr-3000.asse.devtunnels.ms', `8wd140mr-3000.asse.devtunnels.ms`, 'http://localhost:3000'],
      allowedForwardedHosts: ["localhost:3000", 'https://8wd140mr-3000.asse.devtunnels.ms', `8wd140mr-3000.asse.devtunnels.ms`, 'http://localhost:3000'],

    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'gsjjcfotrvkfpibhnnji.supabase.co',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
