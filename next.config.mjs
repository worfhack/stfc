/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // coupe ESLint en build
  },
  typescript: {
    ignoreBuildErrors: true, // coupe le type-check TS en build
  },
  reactStrictMode: true,
output: "export", // 🔥 clé du build 100% statique

  images: {
    domains: ['readdy.ai', 'startrek.local.fr', "demo.startrekfrenchclub.fr"],

  },
};

export default nextConfig;
