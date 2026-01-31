"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

/**
 * CookieConsent Component
 * 
 * GDPR/KVKK compliant cookie consent banner.
 * Stores preference in localStorage.
 */
export function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already made a choice
        const consent = localStorage.getItem("cookie-consent");
        if (!consent) {
            // Show banner after a short delay
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const acceptAll = () => {
        localStorage.setItem("cookie-consent", "accepted");
        setIsVisible(false);
    };

    const acceptNecessary = () => {
        localStorage.setItem("cookie-consent", "necessary");
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.aside
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed bottom-0 left-0 right-0 z-[60] p-4 md:p-6 pointer-events-none"
                    role="dialog"
                    aria-labelledby="cookie-consent-title"
                    aria-describedby="cookie-consent-desc"
                    aria-modal="false"
                >
                    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-neutral-200 p-6 pointer-events-auto">
                        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                            {/* Icon */}
                            <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-primary-50 flex-shrink-0" aria-hidden="true">
                                <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>

                            {/* Text */}
                            <div className="flex-1">
                                <h3 id="cookie-consent-title" className="font-bold text-neutral-900 mb-2">
                                    🍪 Çerez Kullanımı
                                </h3>
                                <p id="cookie-consent-desc" className="text-sm text-neutral-600 leading-relaxed">
                                    Web sitemizde deneyiminizi iyileştirmek için çerezler kullanıyoruz.
                                    Sitemizi kullanarak{" "}
                                    <Link href="/gizlilik-politikasi" title="KVKK ve Gizlilik Politikası" className="text-primary-600 hover:underline">
                                        Gizlilik Politikamızı
                                    </Link>
                                    {" "}kabul etmiş olursunuz.
                                </p>
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                                <button
                                    onClick={acceptNecessary}
                                    className="px-5 py-2.5 text-sm font-medium text-neutral-600 bg-neutral-100 rounded-lg hover:bg-neutral-200 transition-colors"
                                    aria-label="Sadece gerekli çerezleri kabul et"
                                >
                                    Sadece Gerekli
                                </button>
                                <button
                                    onClick={acceptAll}
                                    className="px-5 py-2.5 text-sm font-bold text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors"
                                    aria-label="Tüm çerezleri kabul et"
                                >
                                    Tümünü Kabul Et
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.aside>
            )}
        </AnimatePresence>
    );
}
