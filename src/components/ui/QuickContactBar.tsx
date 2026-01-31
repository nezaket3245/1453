"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { businessConfig } from "@/config/business.config";

/**
 * QuickContactBar Component
 * 
 * A floating quick contact bar for mobile users.
 * Provides instant access to call, WhatsApp, and directions.
 */
export function QuickContactBar() {
    const [isExpanded, setIsExpanded] = useState(false);

    const whatsappUrl = `https://wa.me/${businessConfig.contact.whatsapp}?text=${encodeURIComponent(
        "Merhaba, bilgi almak istiyorum."
    )}`;

    const contactOptions = [
        {
            label: "Ara",
            title: "Egepen Akçayapı'yı Hemen Arayın",
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
            ),
            href: `tel:${businessConfig.contact.mobileRaw}`,
            color: "bg-blue-500 hover:bg-blue-600",
        },
        {
            label: "WhatsApp",
            title: "WhatsApp ile Hemen İletişime Geçin",
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
            ),
            href: whatsappUrl,
            color: "bg-green-500 hover:bg-green-600",
            target: "_blank",
        },
        {
            label: "Yol Tarifi",
            title: "Google Maps ile Yol Tarifi Alın",
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            href: businessConfig.social.googleMaps,
            color: "bg-orange-500 hover:bg-orange-600",
            target: "_blank",
        },
        {
            label: "Teklif",
            title: "Ücretsiz Teklif Formu",
            icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
            href: "/teklif-al",
            color: "bg-primary-500 hover:bg-primary-600",
        },
    ];

    return (
        <>
            {/* Mobile Bottom Bar - Only visible on mobile */}
            <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden" aria-label="Hızlı iletişim menüsü">
                <div className="bg-white border-t border-neutral-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
                    <div className="grid grid-cols-4 gap-0" role="menubar">
                        {contactOptions.map((option) => (
                            <a
                                key={option.label}
                                href={option.href}
                                target={option.target}
                                rel={option.target ? "noopener noreferrer nofollow" : undefined}
                                title={option.title}
                                aria-label={option.title}
                                role="menuitem"
                                className="flex flex-col items-center justify-center py-3 text-neutral-600 hover:text-primary-600 hover:bg-neutral-50 transition-colors"
                            >
                                <span className={`w-10 h-10 rounded-full ${option.color} text-white flex items-center justify-center shadow-lg mb-1`} aria-hidden="true">
                                    {option.icon}
                                </span>
                                <span className="text-xs font-medium">{option.label}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Desktop Floating Bar */}
            <aside className="fixed left-0 top-1/2 -translate-y-1/2 z-40 hidden md:block" aria-label="Masaüstü iletişim paneli">
                <AnimatePresence>
                    {isExpanded ? (
                        <motion.nav
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -100, opacity: 0 }}
                            className="bg-white rounded-r-2xl shadow-xl border border-l-0 border-neutral-200 overflow-hidden"
                            role="navigation"
                            aria-label="Hızlı iletişim seçenekleri"
                        >
                            <div className="p-2 space-y-2" role="menu">
                                {contactOptions.map((option) => (
                                    <a
                                        key={option.label}
                                        href={option.href}
                                        target={option.target}
                                        rel={option.target ? "noopener noreferrer" : undefined}
                                        aria-label={option.title}
                                        role="menuitem"
                                        className={`flex items-center gap-3 px-4 py-3 ${option.color} text-white rounded-xl transition-colors`}
                                    >
                                        <span aria-hidden="true">{option.icon}</span>
                                        <span className="font-medium text-sm whitespace-nowrap">{option.label}</span>
                                    </a>
                                ))}
                            </div>
                            <button
                                onClick={() => setIsExpanded(false)}
                                className="w-full py-2 text-center text-neutral-600 hover:text-neutral-800 text-sm font-medium border-t border-neutral-100"
                                aria-label="İletişim menüsünü kapat"
                            >
                                Kapat
                            </button>
                        </motion.nav>
                    ) : (
                        <motion.button
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -50, opacity: 0 }}
                            onClick={() => setIsExpanded(true)}
                            className="bg-primary-600 text-white px-3 py-4 rounded-r-xl shadow-lg hover:bg-primary-700 transition-colors"
                            aria-label="İletişim seçeneklerini aç"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        </motion.button>
                    )}
                </AnimatePresence>
            </aside>
        </>
    );
}
