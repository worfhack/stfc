/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.wp.com",   // ← wildcard OK ici
      },
      {
        protocol: "https",
        hostname: "wp.com",
      },
      {
        protocol: "https",
        hostname: "readdy.ai",
      },
      {
        protocol: "https",
        hostname: "startrek.local.fr",
      },
      {
        protocol: "https",
        hostname: "api.startrekfrenchclub.fr",
      },
    ],
  },
};

export default nextConfig;
