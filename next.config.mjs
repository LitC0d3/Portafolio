/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/Portafolio' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Portafolio/' : '',
  trailingSlash: true,
};

export default nextConfig;

