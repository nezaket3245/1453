"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";

/**
 * ImageLightbox — click-to-zoom image gallery with swipe/keyboard navigation.
 * Lightweight: no external dependencies, CSS-only transitions.
 */

interface ImageLightboxProps {
    images: string[];
    alt: string;
    /** Show the first image as the main display */
    className?: string;
}

export function ImageLightbox({ images, alt, className = "" }: ImageLightboxProps) {
    const [open, setOpen] = useState(false);
    const [current, setCurrent] = useState(0);
    const touchStartX = useRef(0);

    const close = useCallback(() => setOpen(false), []);

    const prev = useCallback(() => {
        setCurrent((c) => (c - 1 + images.length) % images.length);
    }, [images.length]);

    const next = useCallback(() => {
        setCurrent((c) => (c + 1) % images.length);
    }, [images.length]);

    /* Keyboard navigation */
    useEffect(() => {
        if (!open) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") close();
            if (e.key === "ArrowLeft") prev();
            if (e.key === "ArrowRight") next();
        };
        document.addEventListener("keydown", handler);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", handler);
            document.body.style.overflow = "";
        };
    }, [open, close, prev, next]);

    const openAt = (index: number) => {
        setCurrent(index);
        setOpen(true);
    };

    return (
        <>
            {/* Thumbnail grid */}
            <div className={`grid gap-2 ${images.length > 1 ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4" : ""} ${className}`}>
                {images.map((src, i) => (
                    <button
                        key={i}
                        type="button"
                        onClick={() => openAt(i)}
                        className={`relative overflow-hidden rounded-xl bg-neutral-100 cursor-zoom-in group ${i === 0 && images.length > 1 ? "col-span-2 sm:col-span-2 row-span-2" : ""}`}
                        aria-label={`${alt} — Görseli büyüt (${i + 1}/${images.length})`}
                    >
                        <div className={`relative ${i === 0 && images.length > 1 ? "aspect-[4/3]" : "aspect-video"}`}>
                            <Image
                                src={src}
                                alt={`${alt} ${i + 1}`}
                                fill
                                sizes={i === 0 ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>
                        {/* Zoom indicator */}
                        <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" /></svg>
                            Büyüt
                        </span>
                    </button>
                ))}
            </div>

            {/* Lightbox overlay */}
            {open && (
                <div
                    className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center"
                    onClick={close}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Görsel büyütücü"
                    onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
                    onTouchEnd={(e) => {
                        const diff = touchStartX.current - e.changedTouches[0].clientX;
                        if (Math.abs(diff) > 50) {
                            diff > 0 ? next() : prev();
                        }
                    }}
                >
                    {/* Close button */}
                    <button
                        onClick={close}
                        className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                        aria-label="Kapat"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>

                    {/* Counter */}
                    {images.length > 1 && (
                        <div className="absolute top-4 left-4 z-10 text-white/70 text-sm bg-black/40 px-3 py-1 rounded-full">
                            {current + 1} / {images.length}
                        </div>
                    )}

                    {/* Prev / Next arrows */}
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={(e) => { e.stopPropagation(); prev(); }}
                                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                                aria-label="Önceki görsel"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                            </button>
                            <button
                                onClick={(e) => { e.stopPropagation(); next(); }}
                                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                                aria-label="Sonraki görsel"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                            </button>
                        </>
                    )}

                    {/* Main image */}
                    <div
                        className="relative w-[90vw] h-[85vh] max-w-5xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={images[current]}
                            alt={`${alt} ${current + 1}`}
                            fill
                            sizes="90vw"
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>
            )}
        </>
    );
}
