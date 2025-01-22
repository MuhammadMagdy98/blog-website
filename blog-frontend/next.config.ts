import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    API_URL: process.env.API_URL || "https://default-api.example.com",
  },
};

export default nextConfig;
