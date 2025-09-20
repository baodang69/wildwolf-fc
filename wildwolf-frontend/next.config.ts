import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable React strict mode
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
};

export default nextConfig;
