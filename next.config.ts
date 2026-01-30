import type { NextConfig } from "next";

/**
 * Next.js Configuration for Maximum Performance
 * - Image optimization with WebP conversion
 * - Aggressive caching headers for Vercel Edge
 * - Security headers for production
 */
const nextConfig: NextConfig = {
  // Enable experimental features for Next.js 15+
  experimental: {
    // Enable optimized package imports for faster builds
    optimizePackageImports: ["framer-motion"],
  },

  // Image optimization configuration
  images: {
    // Enable WebP format for better performance
    formats: ["image/avif", "image/webp"],
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Image sizes for srcset generation
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Minimize layout shift
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year cache
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

  // Headers for caching and security
  async headers() {
    return [
      {
        // Apply to all routes
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
      {
        // Cache static assets aggressively
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Cache fonts aggressively
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Redirects for SEO
  async redirects() {
    return [
      // Add trailing slash redirect for consistency
      {
        source: "/:path+/",
        destination: "/:path+",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
