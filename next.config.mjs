/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "connect-verse-bucket.s3.ap-southeast-1.amazonaws.com",
        pathname: "/**"
      }
    ],
  },
};

export default nextConfig;
