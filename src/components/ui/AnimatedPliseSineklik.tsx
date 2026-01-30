"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OptimizedImage from "./OptimizedImage";

/**
 * Animated Duble Plise Sineklik Component
 * Creates an interactive sliding animation effect for the pleated screen door
 * Shows the opening/closing motion of double pleated screen system
 */
export default function AnimatedPliseSineklik() {
    const [isOpen, setIsOpen] = useState(false);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // Auto-play animation loop
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setIsOpen((prev) => !prev);
        }, 2500);

        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    return (
        <div className="relative w-full max-w-lg mx-auto">
            {/* Title */}
            <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-neutral-900">Duble Plise Sineklik</h3>
                <p className="text-sm text-neutral-500">Ortadan açılıp kapanan çift taraflı sistem</p>
            </div>

            {/* Animation Container */}
            <div
                className="relative bg-gradient-to-b from-amber-100 to-amber-50 rounded-lg overflow-hidden cursor-pointer shadow-lg border-4 border-amber-600"
                style={{ aspectRatio: "4/3" }}
                onClick={() => {
                    setIsAutoPlaying(false);
                    setIsOpen(!isOpen);
                }}
            >
                {/* Frame - Top */}
                <div className="absolute top-0 left-0 right-0 h-3 bg-amber-600 z-20" />

                {/* Frame - Bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-3 bg-amber-600 z-20" />

                {/* Frame - Left */}
                <div className="absolute top-0 left-0 bottom-0 w-3 bg-amber-600 z-20" />

                {/* Frame - Right */}
                <div className="absolute top-0 right-0 bottom-0 w-3 bg-amber-600 z-20" />

                {/* Center Divider */}
                <div className="absolute top-3 bottom-3 left-1/2 -translate-x-1/2 w-4 bg-amber-700 z-30 flex flex-col justify-center">
                    {/* Handle */}
                    <div className="w-2 h-8 bg-amber-900 mx-auto rounded-sm" />
                </div>

                {/* Left Screen Panel */}
                <motion.div
                    className="absolute top-3 bottom-3 left-3 bg-gradient-to-r from-gray-400/80 to-gray-300/60 z-10 origin-right"
                    style={{
                        backgroundImage: `repeating-linear-gradient(
                            90deg,
                            transparent,
                            transparent 2px,
                            rgba(0,0,0,0.1) 2px,
                            rgba(0,0,0,0.1) 3px
                        )`,
                    }}
                    initial={{ width: "calc(50% - 14px)" }}
                    animate={{
                        width: isOpen ? "12px" : "calc(50% - 14px)",
                    }}
                    transition={{
                        duration: 1.2,
                        ease: [0.4, 0, 0.2, 1],
                    }}
                >
                    {/* Pleats */}
                    <div className="absolute inset-0 flex justify-end">
                        {[...Array(12)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="h-full bg-gray-500/20"
                                style={{ width: "2px", marginRight: "6px" }}
                                animate={{
                                    opacity: isOpen ? (i < 2 ? 1 : 0) : 1,
                                }}
                                transition={{ duration: 0.5, delay: i * 0.05 }}
                            />
                        ))}
                    </div>
                </motion.div>

                {/* Right Screen Panel */}
                <motion.div
                    className="absolute top-3 bottom-3 right-3 bg-gradient-to-l from-gray-400/80 to-gray-300/60 z-10 origin-left"
                    style={{
                        backgroundImage: `repeating-linear-gradient(
                            90deg,
                            transparent,
                            transparent 2px,
                            rgba(0,0,0,0.1) 2px,
                            rgba(0,0,0,0.1) 3px
                        )`,
                    }}
                    initial={{ width: "calc(50% - 14px)" }}
                    animate={{
                        width: isOpen ? "12px" : "calc(50% - 14px)",
                    }}
                    transition={{
                        duration: 1.2,
                        ease: [0.4, 0, 0.2, 1],
                    }}
                >
                    {/* Pleats */}
                    <div className="absolute inset-0 flex justify-start">
                        {[...Array(12)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="h-full bg-gray-500/20"
                                style={{ width: "2px", marginLeft: "6px" }}
                                animate={{
                                    opacity: isOpen ? (i < 2 ? 1 : 0) : 1,
                                }}
                                transition={{ duration: 0.5, delay: i * 0.05 }}
                            />
                        ))}
                    </div>
                </motion.div>

                {/* Status Indicator */}
                <AnimatePresence>
                    <motion.div
                        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                    >
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${isOpen
                                ? "bg-green-500 text-white"
                                : "bg-gray-600 text-white"
                            }`}>
                            {isOpen ? "AÇIK" : "KAPALI"}
                        </span>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-4 mt-4">
                <button
                    onClick={() => {
                        setIsAutoPlaying(false);
                        setIsOpen(false);
                    }}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${!isOpen
                            ? "bg-primary-600 text-white shadow-md"
                            : "bg-neutral-200 text-neutral-600 hover:bg-neutral-300"
                        }`}
                >
                    Kapat
                </button>
                <button
                    onClick={() => {
                        setIsAutoPlaying(false);
                        setIsOpen(true);
                    }}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${isOpen
                            ? "bg-green-600 text-white shadow-md"
                            : "bg-neutral-200 text-neutral-600 hover:bg-neutral-300"
                        }`}
                >
                    Aç
                </button>
                <button
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${isAutoPlaying
                            ? "bg-secondary-500 text-white shadow-md"
                            : "bg-neutral-200 text-neutral-600 hover:bg-neutral-300"
                        }`}
                >
                    {isAutoPlaying ? "⏸️ Durdur" : "▶️ Otomatik"}
                </button>
            </div>

            {/* Info Text */}
            <p className="text-center text-xs text-neutral-500 mt-3">
                Tıklayarak veya butonları kullanarak animasyonu kontrol edin
            </p>
        </div>
    );
}
