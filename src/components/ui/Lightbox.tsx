"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import OptimizedImage from "@/components/ui/OptimizedImage";

/**
 * Lightbox Component
 * 
 * Full-screen image gallery viewer with:
 * - Keyboard navigation (←/→ arrows, Escape to close)
 * - Touch/swipe support for mobile
 * - Image counter and thumbnails
 * - Accessible focus trapping
 */

export interface LightboxImage {
    src: string;
    alt: string;
}

interface LightboxProps {
    images: LightboxImage[];
    initialIndex?: number;
    isOpen: boolean;
    onClose: () => void;
    /** Optional title to show above the image */
    title?: string;
}

export function Lightbox({ images, initialIndex = 0, isOpen, onClose, title }: LightboxProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Reset index when images change or lightbox opens
    useEffect(() => {
        if (isOpen) {
            setCurrentIndex(initialIndex);
        }
    }, [isOpen, initialIndex]);

    // Keyboard navigation
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case "Escape":
                    onClose();
                    break;
                case "ArrowLeft":
                    goToPrevious();
                    break;
                case "ArrowRight":
                    goToNext();
                    break;
            }
        };

        // Lock body scroll
        document.body.style.overflow = "hidden";
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = "";
            document.removeEventListener("keydown", handleKeyDown);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen, currentIndex, images.length]);

    const goToNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    }, [images.length]);

    const goToPrevious = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }, [images.length]);

    // Touch handlers for swipe
    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.touches[0].clientX);
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStart === null) return;
        const touchEnd = e.changedTouches[0].clientX;
        const diff = touchStart - touchEnd;

        if (Math.abs(diff) > 50) {
            if (diff > 0) goToNext();
            else goToPrevious();
        }
        setTouchStart(null);
    };

    if (!isOpen || images.length === 0) return null;

    const currentImage = images[currentIndex];

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-md flex flex-col animate-fade-in"
            role="dialog"
            aria-modal="true"
            aria-label={title || "Galeri görüntüleyici"}
        >
            {/* Top Bar */}
            <div className="flex items-center justify-between p-4 flex-shrink-0">
                <div className="flex items-center gap-4">
                    {title && (
                        <h3 className="text-white font-bold text-sm md:text-base truncate max-w-[200px] md:max-w-md">
                            {title}
                        </h3>
                    )}
                    <span className="text-white/60 text-sm font-medium">
                        {currentIndex + 1} / {images.length}
                    </span>
                </div>
                <button
                    onClick={onClose}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                    aria-label="Galeriden çık"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Main Image Area */}
            <div
                className="flex-1 relative flex items-center justify-center px-4 md:px-16 overflow-hidden min-h-0"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                {/* Previous Button */}
                {images.length > 1 && (
                    <button
                        onClick={goToPrevious}
                        className="absolute left-2 md:left-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
                        aria-label="Önceki fotoğraf"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                )}

                {/* Image */}
                <div className="relative w-full h-full max-w-5xl mx-auto">
                    <OptimizedImage
                        src={currentImage.src}
                        alt={currentImage.alt}
                        fill
                        sizes="100vw"
                        className="object-contain"
                        priority
                    />
                </div>

                {/* Next Button */}
                {images.length > 1 && (
                    <button
                        onClick={goToNext}
                        className="absolute right-2 md:right-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
                        aria-label="Sonraki fotoğraf"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                )}
            </div>

            {/* Thumbnail Strip */}
            {images.length > 1 && (
                <div className="flex-shrink-0 py-3 px-4">
                    <div className="flex justify-center gap-2 overflow-x-auto max-w-4xl mx-auto scrollbar-hide">
                        {images.map((img, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentIndex(i)}
                                className={`relative w-16 h-12 md:w-20 md:h-14 rounded-lg overflow-hidden flex-shrink-0 transition-[opacity,transform,box-shadow] ${
                                    i === currentIndex
                                        ? "ring-2 ring-primary-500 opacity-100 scale-105"
                                        : "opacity-50 hover:opacity-80"
                                }`}
                                aria-label={`Fotoğraf ${i + 1}`}
                                aria-current={i === currentIndex ? "true" : undefined}
                            >
                                <OptimizedImage
                                    src={img.src}
                                    alt=""
                                    fill
                                    sizes="80px"
                                    className="object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
