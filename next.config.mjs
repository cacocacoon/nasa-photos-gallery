/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "apod.nasa.gov",
      },
      {
        protocol: "https",
        hostname: "images-api.nasa.gov",
      },
      {
        protocol: "http",
        hostname: "images-assets.nasa.gov",
      },
    ],
  },
};

export default nextConfig;
