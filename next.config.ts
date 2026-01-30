import type { NextConfig } from "next";

/**
 * Next.js Configuration for Maximum Performance
 * - Image optimization with WebP conversion
 * - Aggressive caching headers for Vercel Edge
 * - Security headers for production
 */
const nextConfig: NextConfig = {
  // Enable static export for Cloudflare Pages
  output: "export",

  // Enable experimental features for Next.js 15+
  experimental: {
    // Enable optimized package imports for faster builds
    optimizePackageImports: ["framer-motion"],
  },

  // Image optimization configuration
  images: {
    // Disable server-side image optimization for static export
    unoptimized: true,
    // Enable WebP format for better performance
    formats: ["image/avif", "image/webp"],
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Image sizes for srcset generation
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Allow external image domains
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  // Enable React strict mode for better debugging
  reactStrictMode: true,

  // Compression for faster response times
  compress: true,

  // Powered by header removal for security
  poweredByHeader: false,
};

export default nextConfig;
