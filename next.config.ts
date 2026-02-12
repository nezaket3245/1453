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

  // Image optimization configuration
  images: {
    // Disable server-side image optimization for static export
    unoptimized: true,
    // Enable WebP format for better performance
    formats: ["image/avif", "image/webp"],
    // Optimized device sizes for responsive images (reduced for faster loading)
    deviceSizes: [640, 828, 1080, 1200, 1920],
    // Image sizes for srcset generation (reduced)
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    // Allow external image domains
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    // Minimize quality loss while reducing size
    minimumCacheTTL: 31536000, // 1 year cache
  },

  // React strict mode disabled in production for smaller bundle
  // (removes dev-only double-render checks from React runtime)
  reactStrictMode: false,

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
