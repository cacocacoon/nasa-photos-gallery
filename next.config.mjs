/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["epic.gsfc.nasa.gov", "images-assets.nasa.gov", "apod.nasa.gov"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  compiler: {
    styledComponents: {
      ssr: true,
    },
  },
};

export default nextConfig;
