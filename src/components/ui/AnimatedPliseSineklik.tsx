"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "@/lib/motion-lite";

/**
 * Animated Duble Plise Sineklik Component
 * Creates a realistic interactive sliding animation for pleated screen door
 * Two panels meet in the center with magnetic closure - no center divider
 */
export default function AnimatedPliseSineklik() {
    const [isOpen, setIsOpen] = useState(false);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // Auto-play animation loop
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setIsOpen((prev) => !prev);
        }, 3000);

        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    // Number of pleats for realistic effect
    const pleatsCount = 20;

    return (
        <div className="relative w-full max-w-lg mx-auto">
            {/* Title */}
            <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-neutral-900">Duble Plise Sineklik</h3>
                <p className="text-sm text-neutral-500">Ortadan açılıp kapanan çift taraflı sistem</p>
            </div>

            {/* Animation Container */}
            <div
                className="relative bg-gradient-to-b from-sky-100 via-sky-50 to-amber-50 rounded-lg overflow-hidden cursor-pointer shadow-xl border-[6px] border-amber-700"
                style={{ aspectRatio: "4/3" }}
                onClick={() => {
                    setIsAutoPlaying(false);
                    setIsOpen(!isOpen);
                }}
            >
                {/* Window View Background - Sky/Nature */}
                <div className="absolute inset-0 bg-gradient-to-b from-sky-200 via-sky-100 to-green-100" />
                
                {/* Frame - Top Rail */}
                <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-amber-600 to-amber-700 z-20 shadow-md">
                    {/* Rail groove */}
                    <div className="absolute bottom-1 left-2 right-2 h-1 bg-amber-800/30 rounded-full" />
                </div>

                {/* Frame - Bottom Rail */}
                <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-amber-600 to-amber-700 z-20 shadow-md">
                    {/* Rail groove */}
                    <div className="absolute top-1 left-2 right-2 h-1 bg-amber-800/30 rounded-full" />
                </div>

                {/* Frame - Left */}
                <div className="absolute top-0 left-0 bottom-0 w-4 bg-gradient-to-r from-amber-600 to-amber-700 z-20" />

                {/* Frame - Right */}
                <div className="absolute top-0 right-0 bottom-0 w-4 bg-gradient-to-l from-amber-600 to-amber-700 z-20" />

                {/* LEFT SCREEN PANEL with realistic pleats */}
                <motion.div
                    className="absolute top-4 bottom-4 left-4 z-10 overflow-hidden"
                    initial={{ width: "calc(50% - 16px)" }}
                    animate={{
                        width: isOpen ? "20px" : "calc(50% - 16px)",
                    }}
                    transition={{
                        duration: 1.5,
                        ease: [0.25, 0.1, 0.25, 1],
                    }}
                >
                    {/* Pleats Container */}
                    <div className="relative h-full w-full flex">
                        {[...Array(pleatsCount)].map((_, i) => (
                            <motion.div
                                key={`left-pleat-${i}`}
                                className="h-full flex-shrink-0 relative"
                                style={{
                                    minWidth: isOpen ? "1px" : `${100 / pleatsCount}%`,
                                }}
                                animate={{
                                    minWidth: isOpen ? "1px" : `${100 / pleatsCount}%`,
                                }}
                                transition={{
                                    duration: 1.5,
                                    ease: [0.25, 0.1, 0.25, 1],
                                    delay: i * 0.02,
                                }}
                            >
                                {/* Pleat fold - light side */}
                                <div 
                                    className="absolute inset-y-0 left-0 w-1/2"
                                    style={{
                                        background: `linear-gradient(90deg, 
                                            rgba(180, 180, 180, 0.9) 0%, 
                                            rgba(200, 200, 200, 0.85) 50%,
                                            rgba(160, 160, 160, 0.9) 100%)`,
                                    }}
                                />
                                {/* Pleat fold - shadow side */}
                                <div 
                                    className="absolute inset-y-0 right-0 w-1/2"
                                    style={{
                                        background: `linear-gradient(90deg, 
                                            rgba(140, 140, 140, 0.9) 0%, 
                                            rgba(120, 120, 120, 0.85) 50%,
                                            rgba(150, 150, 150, 0.9) 100%)`,
                                    }}
                                />
                                {/* Mesh texture overlay */}
                                <div 
                                    className="absolute inset-0 opacity-30"
                                    style={{
                                        backgroundImage: `
                                            linear-gradient(0deg, transparent 50%, rgba(0,0,0,0.1) 50%),
                                            linear-gradient(90deg, transparent 50%, rgba(0,0,0,0.1) 50%)
                                        `,
                                        backgroundSize: '4px 4px',
                                    }}
                                />
                            </motion.div>
                        ))}
                    </div>
                    
                    {/* Left Handle/Profile */}
                    <motion.div 
                        className="absolute top-0 bottom-0 right-0 w-3 bg-gradient-to-l from-amber-800 to-amber-700 z-10 flex items-center justify-center shadow-lg"
                        animate={{
                            opacity: 1,
                        }}
                    >
                        {/* Handle grip */}
                        <div className="w-1.5 h-16 bg-amber-900 rounded-full shadow-inner" />
                        {/* Magnet indicator */}
                        <div className="absolute top-1/2 -translate-y-1/2 right-0 w-1 h-8 bg-gray-600 rounded-l-sm" />
                    </motion.div>
                </motion.div>

                {/* RIGHT SCREEN PANEL with realistic pleats */}
                <motion.div
                    className="absolute top-4 bottom-4 right-4 z-10 overflow-hidden"
                    initial={{ width: "calc(50% - 16px)" }}
                    animate={{
                        width: isOpen ? "20px" : "calc(50% - 16px)",
                    }}
                    transition={{
                        duration: 1.5,
                        ease: [0.25, 0.1, 0.25, 1],
                    }}
                >
                    {/* Pleats Container */}
                    <div className="relative h-full w-full flex flex-row-reverse">
                        {[...Array(pleatsCount)].map((_, i) => (
                            <motion.div
                                key={`right-pleat-${i}`}
                                className="h-full flex-shrink-0 relative"
                                style={{
                                    minWidth: isOpen ? "1px" : `${100 / pleatsCount}%`,
                                }}
                                animate={{
                                    minWidth: isOpen ? "1px" : `${100 / pleatsCount}%`,
                                }}
                                transition={{
                                    duration: 1.5,
                                    ease: [0.25, 0.1, 0.25, 1],
                                    delay: i * 0.02,
                                }}
                            >
                                {/* Pleat fold - shadow side */}
                                <div 
                                    className="absolute inset-y-0 left-0 w-1/2"
                                    style={{
                                        background: `linear-gradient(90deg, 
                                            rgba(150, 150, 150, 0.9) 0%, 
                                            rgba(120, 120, 120, 0.85) 50%,
                                            rgba(140, 140, 140, 0.9) 100%)`,
                                    }}
                                />
                                {/* Pleat fold - light side */}
                                <div 
                                    className="absolute inset-y-0 right-0 w-1/2"
                                    style={{
                                        background: `linear-gradient(90deg, 
                                            rgba(160, 160, 160, 0.9) 0%, 
                                            rgba(200, 200, 200, 0.85) 50%,
                                            rgba(180, 180, 180, 0.9) 100%)`,
                                    }}
                                />
                                {/* Mesh texture overlay */}
                                <div 
                                    className="absolute inset-0 opacity-30"
                                    style={{
                                        backgroundImage: `
                                            linear-gradient(0deg, transparent 50%, rgba(0,0,0,0.1) 50%),
                                            linear-gradient(90deg, transparent 50%, rgba(0,0,0,0.1) 50%)
                                        `,
                                        backgroundSize: '4px 4px',
                                    }}
                                />
                            </motion.div>
                        ))}
                    </div>
                    
                    {/* Right Handle/Profile */}
                    <motion.div 
                        className="absolute top-0 bottom-0 left-0 w-3 bg-gradient-to-r from-amber-800 to-amber-700 z-10 flex items-center justify-center shadow-lg"
                        animate={{
                            opacity: 1,
                        }}
                    >
                        {/* Handle grip */}
                        <div className="w-1.5 h-16 bg-amber-900 rounded-full shadow-inner" />
                        {/* Magnet indicator */}
                        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-1 h-8 bg-gray-600 rounded-r-sm" />
                    </motion.div>
                </motion.div>

                {/* Magnetic Connection Indicator - shows when closed */}
                <AnimatePresence>
                    {!isOpen && (
                        <motion.div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            transition={{ delay: 1.2, duration: 0.3 }}
                        >
                            <div className="flex items-center gap-0.5">
                                <div className="w-1 h-10 bg-gray-700 rounded-l-sm shadow-md" />
                                <div className="w-1 h-10 bg-gray-700 rounded-r-sm shadow-md" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Status Indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold shadow-lg transition-colors duration-500 ${isOpen
                            ? "bg-green-500 text-white"
                            : "bg-amber-700 text-white"
                        }`}>
                        {isOpen ? "AÇIK" : "KAPALI"}
                    </span>
                </motion.div>
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-3 mt-4">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsAutoPlaying(false);
                        setIsOpen(false);
                    }}
                    className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-all ${!isOpen
                            ? "bg-amber-600 text-white shadow-lg shadow-amber-500/30"
                            : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                        }`}
                >
                    Kapat
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsAutoPlaying(false);
                        setIsOpen(true);
                    }}
                    className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-all ${isOpen
                            ? "bg-green-600 text-white shadow-lg shadow-green-500/30"
                            : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                        }`}
                >
                    Aç
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsAutoPlaying(!isAutoPlaying);
                    }}
                    className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-all ${isAutoPlaying
                            ? "bg-primary-600 text-white shadow-lg shadow-primary-500/30"
                            : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                        }`}
                >
                    {isAutoPlaying ? "⏸ Durdur" : "▶ Otomatik"}
                </button>
            </div>

            {/* Info Text */}
            <p className="text-center text-xs text-neutral-500 mt-3">
                * Kullandığınız animasyon duble plise sinekliklerimizin nasıl ortadan açılıp kapandığını göstermektedir
            </p>
        </div>
    );
}
