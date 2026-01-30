"use client";

import Image, { ImageProps } from "next/image";
import { useState, useEffect } from "react";
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
}

/**
 * OptimizedImage Component
 * 
 * Features:
 * - Automatic broken image handling with fallback mechanism
 * - Double-fault protection for fallbacks
 * - Performance optimization (lazy loading by default, fetchpriority for high priority)
 * - Layout stability (aspect-ratio and reserved space)
 * - Modern format support (handled by next/image)
 */
export default function OptimizedImage({
    src,
    alt,
    fallbackSrc = "/images/pvc/pvc-pencere-yemek-odasi.jpg", // Default context-relevant fallback
    className,
    containerClassName,
    priority = false,
    width,
    height,
    fill,
    ...props
}: OptimizedImageProps) {
    const [imgSrc, setImgSrc] = useState(src);
    const [errorCount, setErrorCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    // Update internal state if src prop changes
    useEffect(() => {
        setImgSrc(src);
        setErrorCount(0);
        setIsLoading(true);
    }, [src]);

    const handleError = () => {
        if (errorCount === 0) {
            // First error: try the provided fallback
            setImgSrc(fallbackSrc);
            setErrorCount(1);
        } else if (errorCount === 1) {
            // Second error (double-fault): use a guaranteed local asset OR a transparent pixel
            setImgSrc("data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7");
            setErrorCount(2);
        }
        setIsLoading(false);
    };

    return (
        <div
            className={cn(
                "relative overflow-hidden transition-all duration-300",
                isLoading && "bg-slate-100 animate-pulse",
                containerClassName
            )}
            style={{
                aspectRatio: width && height ? `${width} / ${height}` : "auto",
            }}
        >
            <Image
                {...props}
                src={imgSrc}
                alt={alt || "Egepen Akçayapı"}
                width={width}
                height={height}
                fill={fill}
                priority={priority}
                // fetchpriority is not a standard prop in NextImage type yet but browser supports it
                // We can pass it via unoptimized or just rely on priority={true} which sets fetchPriority="high"
                // Actually priority={true} in Next.js already sets fetchPriority="high".
                loading={priority ? undefined : "lazy"}
                className={cn(
                    "transition-opacity duration-300",
                    className
                )}
                onLoad={() => setIsLoading(false)}
                onError={handleError}
            />
        </div>
    );
}
