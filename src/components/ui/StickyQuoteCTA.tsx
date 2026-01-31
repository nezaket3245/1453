"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { businessConfig } from "@/config/business.config";

/**
 * StickyQuoteCTA Component
 * 
 * A high-conversion sticky CTA button that appears on scroll.
 * Mobile-first design with WhatsApp and direct call integration.
 * Optimized for construction site visits and quick mobile interactions.
 */
export function StickyQuoteCTA() {
    const [isVisible, setIsVisible] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling 300px
            const scrollY = window.scrollY;
            setIsVisible(scrollY > 300);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const whatsappUrl = `https://wa.me/${businessConfig.contact.whatsapp}?text=${encodeURIComponent(
        "Merhaba, ücretsiz keşif ve fiyat teklifi almak istiyorum."
    )}`;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3"
                >
                    {/* Expanded Options */}
                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                className="flex flex-col gap-2"
                            >
                                {/* WhatsApp Button */}
                                <a
                                    href={whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer nofollow"
                                    title="WhatsApp ile Hemen İletişime Geçin"
                                    className="flex items-center gap-3 px-5 py-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors font-bold text-sm"
                                    aria-label="WhatsApp ile iletişime geç"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                    </svg>
                                    WhatsApp
                                </a>

                                {/* Direct Call Button */}
                                <a
                                    href={`tel:${businessConfig.contact.mobileRaw}`}
                                    title="Egepen Akçayapı'yı Hemen Arayın"
                                    className="flex items-center gap-3 px-5 py-3 bg-primary-600 text-white rounded-full shadow-lg hover:bg-primary-700 transition-colors font-bold text-sm"
                                    aria-label="Hemen ara"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    Hemen Ara
                                </a>

                                {/* Quote Form Button */}
                                <a
                                    href="/teklif-al"
                                    title="Ücretsiz Teklif Formu"
                                    className="flex items-center gap-3 px-5 py-3 bg-secondary-500 text-white rounded-full shadow-lg hover:bg-secondary-600 transition-colors font-bold text-sm"
                                    aria-label="Teklif formu"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Teklif Formu
                                </a>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Main Toggle Button */}
                    <motion.button
                        onClick={() => setIsExpanded(!isExpanded)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        title={isExpanded ? "Menüyü Kapat" : "Hızlı Teklif Seçenekleri"}
                        className={`
                            flex items-center gap-3 px-6 py-4 rounded-full shadow-2xl font-bold text-base
                            transition-all duration-300
                            ${isExpanded
                                ? "bg-neutral-800 text-white"
                                : "bg-gradient-to-r from-primary-600 to-primary-500 text-white"
                            }
                        `}
                        aria-label={isExpanded ? "Menüyü kapat" : "Hızlı teklif al"}
                    >
                        {isExpanded ? (
                            <>
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Kapat
                            </>
                        ) : (
                            <>
                                <svg className="w-5 h-5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                Hızlı Teklif
                            </>
                        )}
                    </motion.button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
