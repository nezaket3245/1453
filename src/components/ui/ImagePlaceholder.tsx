"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * HIGH-PERFORMANCE IMAGE PLACEHOLDER COMPONENT
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Lighthouse 100 Performance Requirements:
 * - Zero Cumulative Layout Shift (CLS)
 * - Blur-up placeholder technique
 * - Explicit width/height dimensions
 * - WebP/AVIF format support
 * - Lazy loading for below-fold images
 */

interface ImagePlaceholderProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  objectFit?: "cover" | "contain" | "fill";
  blurDataURL?: string;
}

/**
 * Generate a simple blur placeholder SVG
 * This ensures CLS = 0 by reserving exact space
 */
const generateBlurPlaceholder = (width: number, height: number): string => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#0055a5;stop-opacity:0.1"/>
          <stop offset="100%" style="stop-color:#00417d;stop-opacity:0.2"/>
        </linearGradient>
      </defs>
      <rect fill="url(#grad)" width="${width}" height="${height}"/>
    </svg>
  `;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
};

/**
 * Predefined placeholder URLs for different aspect ratios
 * Using placehold.co for high-performance placeholders
 */
export const placeholderUrls = {
  hero: "https://placehold.co/1920x1080/0055a5/ffffff?text=Egepen+PVC",
  product: "https://placehold.co/800x600/0055a5/ffffff?text=Egepen+Urun",
  thumbnail: "https://placehold.co/400x300/0055a5/ffffff?text=Egepen",
  square: "https://placehold.co/600x600/0055a5/ffffff?text=Egepen",
  portrait: "https://placehold.co/600x800/0055a5/ffffff?text=Egepen",
};

export function ImagePlaceholder({
  src,
  alt,
  width,
  height,
  priority = false,
  className = "",
  objectFit = "cover",
  blurDataURL,
}: ImagePlaceholderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Use provided blur or generate one
  const placeholder = blurDataURL || generateBlurPlaceholder(width, height);

  // Fallback to placehold.co on error
  const fallbackSrc = `https://placehold.co/${width}x${height}/0055a5/ffffff?text=Egepen`;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      <Image
        src={hasError ? fallbackSrc : src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        placeholder="blur"
        blurDataURL={placeholder}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setHasError(true);
          setIsLoading(false);
        }}
        className={`
          transition-opacity duration-300
          ${isLoading ? "opacity-0" : "opacity-100"}
          ${objectFit === "cover" ? "object-cover" : ""}
          ${objectFit === "contain" ? "object-contain" : ""}
          ${objectFit === "fill" ? "object-fill" : ""}
        `}
        style={{ width: "100%", height: "100%" }}
      />
      
      {/* Loading skeleton overlay */}
      {isLoading && (
        <div 
          className="absolute inset-0 bg-gradient-to-br from-primary-100 to-primary-200 animate-pulse"
          aria-hidden="true"
        />
      )}
    </div>
  );
}

/**
 * Responsive image with automatic srcset generation
 * Prevents CLS with aspect-ratio
 */
interface ResponsiveImageProps {
  src: string;
  alt: string;
  aspectRatio: "16/9" | "4/3" | "1/1" | "3/4" | "21/9";
  priority?: boolean;
  className?: string;
  sizes?: string;
}

export function ResponsiveImage({
  src,
  alt,
  aspectRatio,
  priority = false,
  className = "",
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
}: ResponsiveImageProps) {
  const [hasError, setHasError] = useState(false);

  // Calculate dimensions based on aspect ratio
  const getDimensions = () => {
    const ratioMap: Record<string, { w: number; h: number }> = {
      "16/9": { w: 1600, h: 900 },
      "4/3": { w: 1200, h: 900 },
      "1/1": { w: 800, h: 800 },
      "3/4": { w: 600, h: 800 },
      "21/9": { w: 2100, h: 900 },
    };
    return ratioMap[aspectRatio] || { w: 1200, h: 800 };
  };

  const { w, h } = getDimensions();
  const fallback = `https://placehold.co/${w}x${h}/0055a5/ffffff?text=Egepen`;

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{ aspectRatio }}
    >
      <Image
        src={hasError ? fallback : src}
        alt={alt}
        fill
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        sizes={sizes}
        onError={() => setHasError(true)}
        className="object-cover"
      />
    </div>
  );
}

export default ImagePlaceholder;
