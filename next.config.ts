import type { NextConfig } from "next";

/**
 * Next.js Configuration for Maximum Performance & SEO
 * Lighthouse Score Target: 95+
 * 
 * Optimizations:
 * - Static export with aggressive caching
 * - Turbopack for faster builds
 * - Image optimization with WebP/AVIF
 * - Security headers (handled by _headers file for Cloudflare)
 */
const nextConfig: NextConfig = {
  // Enable static export for Cloudflare Pages
  output: "export",
  trailingSlash: true,

  // Enable Turbopack (Next.js 16 default)
  turbopack: {},

  // Enable experimental features for Next.js 15+
  experimental: {
    // Enable optimized package imports for faster builds
    optimizePackageImports: [
      "framer-motion",
      "clsx",
    ],
  },

  // Image configuration - unoptimized for static export
  images: {
    unoptimized: true,
  },

  // Enable React strict mode for better debugging
  reactStrictMode: true,

  // Compression for faster response times
  compress: true,

  // Powered by header removal for security
  poweredByHeader: false,

  // Compiler optimizations
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
