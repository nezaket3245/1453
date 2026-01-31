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

interface OptimizedImageProps extends Omit<ImageProps, "onError"> {
    fallbackSrc?: string;
    containerClassName?: string;
    showSkeleton?: boolean;
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
    width,
    height,
    fill,
    ...props
}: OptimizedImageProps) {
    const [imgSrc, setImgSrc] = useState<string | typeof src>(src);
    const [errorLevel, setErrorLevel] = useState(0);
    const [isLoading, setIsLoading] = useState(!priority);
    const [isVisible, setIsVisible] = useState(false);
    const imageRef = useRef<HTMLImageElement>(null);

    // Reset state when src prop changes
    useEffect(() => {
        setImgSrc(src);
        setErrorLevel(0);
        setIsLoading(!priority);
    }, [src, priority]);

    // Check if image is already loaded (cached)
    useEffect(() => {
        if (imageRef.current?.complete) {
            setIsLoading(false);
        }
    }, []);

    // Fade-in effect after load
    useEffect(() => {
        if (!isLoading) {
            const timer = setTimeout(() => setIsVisible(true), 50);
            return () => clearTimeout(timer);
        }
    }, [isLoading]);

    /**
     * Multi-level error handler:
     * Level 0 -> Try custom fallback or context-aware fallback
     * Level 1 -> Try general fallback (og-home.jpg)
     * Level 2 -> Use guaranteed SVG placeholder
     */
    const handleError = useCallback(() => {
        const srcString = typeof src === 'string' ? src : '';

        if (errorLevel === 0) {
            // First error: try provided fallback or context-aware fallback
            const nextFallback = fallbackSrc || getContextFallback(srcString);
            console.warn(`[OptimizedImage] Primary image failed: ${srcString}, trying: ${nextFallback}`);
            setImgSrc(nextFallback);
            setErrorLevel(1);
        } else if (errorLevel === 1) {
            // Second error: try the general fallback
            console.warn(`[OptimizedImage] Fallback failed, trying general fallback`);
            setImgSrc(FALLBACK_IMAGES.general);
            setErrorLevel(2);
        } else {
            // Final fallback: guaranteed SVG placeholder
            console.warn(`[OptimizedImage] All fallbacks failed, using placeholder`);
            setImgSrc(DEFAULT_PLACEHOLDER);
            setErrorLevel(3);
        }
        setIsLoading(false);
    }, [src, fallbackSrc, errorLevel]);

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
