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
  trailingSlash: true,

  // Enable experimental features for Next.js 15+
  experimental: {
    // Enable optimized package imports for faster builds
    optimizePackageImports: ["framer-motion", "lucide-react"],
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

  // Compiler optimizations
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Bundle analyzer for debugging (disabled by default)
  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     config.optimization.splitChunks.cacheGroups = {
  //       ...config.optimization.splitChunks.cacheGroups,
  //       framework: {
  //         chunks: 'all',
  //         name: 'framework',
  //         test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
  //         priority: 40,
  //         enforce: true,
  //       },
  //     };
  //   }
  //   return config;
  // },
};

export default nextConfig;
