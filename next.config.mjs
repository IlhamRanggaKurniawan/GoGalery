/** @type {import('next').NextConfig} */
const nextConfig = {
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
