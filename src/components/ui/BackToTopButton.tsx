"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "@/lib/motion-lite";

/**
 * BackToTopButton Component
 * 
 * Smooth scroll back to top button that appears after scrolling down.
 * Accessible with keyboard support.
 */
export function BackToTopButton() {
    const [isVisible, setIsVisible] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;

            // Show after 500px scroll
            setIsVisible(scrollY > 500);

            // Calculate scroll progress percentage
            setScrollProgress((scrollY / docHeight) * 100);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({
            top: 0,
            behavior: prefersReducedMotion ? "auto" : "smooth",
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={scrollToTop}
                    className="fixed bottom-24 left-4 z-40 w-12 h-12 bg-white rounded-full shadow-lg border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 transition-colors group"
                    aria-label="Sayfanın başına dön"
                    title="Yukarı çık"
                >
                    {/* Progress Ring */}
                    <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 48 48" aria-hidden="true">
                        <circle
                            cx="24"
                            cy="24"
                            r="20"
                            fill="none"
                            stroke="#e5e5e5"
                            strokeWidth="2"
                        />
                        <circle
                            cx="24"
                            cy="24"
                            r="20"
                            fill="none"
                            stroke="#3b82f6"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeDasharray={`${2 * Math.PI * 20}`}
                            strokeDashoffset={`${2 * Math.PI * 20 * (1 - scrollProgress / 100)}`}
                            className="transition-[stroke-dashoffset] duration-150"
                        />
                    </svg>

                    {/* Arrow Icon */}
                    <svg
                        className="w-5 h-5 text-neutral-600 group-hover:text-primary-600 transition-colors relative z-10"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden="true"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                </motion.button>
            )}
        </AnimatePresence>
    );
}
