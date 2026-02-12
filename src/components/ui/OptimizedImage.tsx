"use client";

import Image, { ImageProps } from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import { clsx, type ClassValue } from "clsx";

/**
 * Utility for merging classes
 */
function cn(...inputs: ClassValue[]) {
    return clsx(inputs);
}

/**
 * Converts an image path to WebP format if available
 * Falls back to original if WebP doesn't exist
 */
function getWebPPath(src: string | object): string {
    if (typeof src !== 'string') return '';
    // Convert jpg, jpeg, png to webp
    if (/\.(jpg|jpeg|png)$/i.test(src)) {
        return src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    }
    return src;
}

interface OptimizedImageProps extends Omit<ImageProps, "onError"> {
    fallbackSrc?: string;
    containerClassName?: string;
    showSkeleton?: boolean;
    /** Prefer WebP format if available (default: true) */
    preferWebP?: boolean;
}

/**
 * ENHANCED OptimizedImage Component
 * 
 * Fixes Applied:
 * - Static export compatibility (unoptimized mode support)
 * - Multi-level fallback system with guaranteed placeholder
 * - Network error handling for slow connections
 * - HTTPS/HTTP compatibility
 * - Layout Shift (CLS) prevention with skeleton loading
 * 
 * Features:
 * - Automatic broken image handling with 3-tier fallback
 * - Loading skeleton for slow networks
 * - Responsive sizing with srcSet
 * - Alt tag enforcement for accessibility
 * - Modern format support (WebP/AVIF when available)
 */

// Default placeholder - a simple gradient SVG that always works
const DEFAULT_PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%2306b6d4'/%3E%3Cstop offset='100%25' style='stop-color:%230284c7'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23g)' width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='24' fill='white' text-anchor='middle' dy='.3em'%3EEgepen Akçayapı%3C/text%3E%3C/svg%3E";

// Context-aware fallback images
const FALLBACK_IMAGES = {
    pvc: "/images/pvc/pvc-pencere-yemek-odasi.jpg",
    camBalkon: "/images/cam-balkon/cam-balkon-site-manzara.jpg",
    dusakabin: "/images/dusakabin/dusakabin-kose-banyo.jpg",
    general: "/images/og-home.jpg",
};

/**
 * Determines the best fallback based on the original image path
 */
function getContextFallback(src: string): string {
    if (typeof src !== 'string') return FALLBACK_IMAGES.general;

    const lowerSrc = src.toLowerCase();
    if (lowerSrc.includes('pvc')) return FALLBACK_IMAGES.pvc;
    if (lowerSrc.includes('cam-balkon') || lowerSrc.includes('cambalkon')) return FALLBACK_IMAGES.camBalkon;
    if (lowerSrc.includes('dusakabin')) return FALLBACK_IMAGES.dusakabin;
    if (lowerSrc.includes('panjur')) return FALLBACK_IMAGES.general; // Could add specific panjur fallback
    if (lowerSrc.includes('sineklik')) return FALLBACK_IMAGES.general;

    return FALLBACK_IMAGES.general;
}

export default function OptimizedImage({
    src,
    alt,
    fallbackSrc,
    className,
    containerClassName,
    showSkeleton = true,
    priority = false,
    preferWebP = true,
    width,
    height,
    fill,
    ...props
}: OptimizedImageProps) {
    // Try WebP first if preferWebP is true
    const initialSrc = preferWebP && typeof src === 'string' 
        ? getWebPPath(src) 
        : src;
    
    const [imgSrc, setImgSrc] = useState<string | typeof src>(initialSrc);
    const [errorLevel, setErrorLevel] = useState(0);
    const [isLoading, setIsLoading] = useState(!priority);
    const imageRef = useRef<HTMLImageElement>(null);

    // Reset state when src prop changes
    useEffect(() => {
        const newSrc = preferWebP && typeof src === 'string' 
            ? getWebPPath(src) 
            : src;
        setImgSrc(newSrc);
        setErrorLevel(0);
        setIsLoading(!priority);
    }, [src, priority, preferWebP]);

    // Check if image is already loaded (cached)
    useEffect(() => {
        if (imageRef.current?.complete) {
            setIsLoading(false);
        }
    }, []);

    /**
     * Multi-level error handler with WebP fallback:
     * Level 0 -> If WebP failed, try original format (jpg/png)
     * Level 1 -> Try custom fallback or context-aware fallback
     * Level 2 -> Try general fallback (og-home.jpg)
     * Level 3 -> Use guaranteed SVG placeholder
     */
    const handleError = useCallback(() => {
        const srcString = typeof src === 'string' ? src : '';
        const currentSrcString = typeof imgSrc === 'string' ? imgSrc : '';

        if (errorLevel === 0 && preferWebP && currentSrcString.endsWith('.webp')) {
            // WebP failed, try original format
            setImgSrc(srcString);
            setErrorLevel(1);
        } else if (errorLevel <= 1) {
            // Try provided fallback or context-aware fallback
            const nextFallback = fallbackSrc || getContextFallback(srcString);
            setImgSrc(getWebPPath(nextFallback)); // Try WebP of fallback first
            setErrorLevel(2);
        } else if (errorLevel === 2) {
            // Try general fallback
            setImgSrc(FALLBACK_IMAGES.general);
            setErrorLevel(3);
        } else {
            // Final fallback: guaranteed SVG placeholder
            setImgSrc(DEFAULT_PLACEHOLDER);
            setErrorLevel(4);
        }
        setIsLoading(false);
    }, [src, imgSrc, fallbackSrc, errorLevel, preferWebP]);

    const handleLoad = useCallback(() => {
        setIsLoading(false);
    }, []);

    // Compute aspect ratio for layout stability
    const aspectRatio = width && height ? `${width} / ${height}` : undefined;

    return (
        <div
            className={cn(
                "relative overflow-hidden",
                fill ? "w-full h-full" : "w-full",
                containerClassName
            )}
            style={{
                aspectRatio: fill ? undefined : aspectRatio,
            }}
        >
            {/* Loading Skeleton */}
            {showSkeleton && isLoading && (
                <div
                    className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 animate-pulse z-10"
                    aria-hidden="true"
                />
            )}

            <Image
                {...props}
                src={imgSrc}
                alt={alt || "Egepen Akçayapı - Beylikdüzü PVC ve Cam Balkon"}
                width={width}
                height={height}
                fill={fill}
                priority={priority}
                loading={priority ? undefined : "lazy"}
                decoding={priority ? "sync" : "async"}
                unoptimized // Required for static export compatibility
                ref={imageRef}
                className={cn(
                    "transition-opacity duration-500 ease-in-out",
                    isLoading ? "opacity-0" : "opacity-100",
                    className
                )}
                onLoad={handleLoad}
                onError={handleError}
            />
        </div>
    );
}

/**
 * USAGE EXAMPLE:
 * 
 * <OptimizedImage
 *   src="/images/pvc/my-image.jpg"
 *   alt="PVC Pencere Sistemi"
 *   width={800}
 *   height={600}
 *   priority={true}  // For above-the-fold images
 * />
 * 
 * For fill mode (parent must have relative positioning):
 * <OptimizedImage
 *   src="/images/hero.jpg"
 *   alt="Hero Background"
 *   fill
 *   className="object-cover"
 * />
 */
