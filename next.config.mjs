/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // coupe ESLint en build
  },
  typescript: {
    ignoreBuildErrors: true, // coupe le type-check TS en build
  },
  reactStrictMode: true,

  images: {
    domains: ['readdy.ai', 'startrek.local.fr', "demo.startrekfrenchclub.fr"],

  },
 experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
