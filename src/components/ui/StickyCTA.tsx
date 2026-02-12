"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { businessConfig } from "@/config/business.config";

/**
 * StickyCTA — Sabit alt bar
 * Sayfa kaydırılınca görünür, dönüşümü artırır.
 * WhatsApp + Teklif Al butonları.
 */
export function StickyCTA() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setVisible(window.scrollY > 400);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const whatsappUrl = `https://wa.me/${businessConfig.contact.whatsapp}?text=${encodeURIComponent("Merhaba, bilgi almak istiyorum.")}`;

    return (
        <div aria-live="polite">
            {visible && (
                <div
                    className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-neutral-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] animate-slide-up"
                    role="complementary"
                    aria-label="Hızlı iletişim"
                >
                    <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-3">
                        {/* Sol: Kısa bilgi */}
                        <p className="hidden sm:block text-sm text-neutral-600 font-medium">
                            Ücretsiz keşif ve fiyat teklifi alın
                        </p>

                        {/* Sağ: CTA butonları */}
                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            {/* WhatsApp */}
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors text-sm"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                <span className="hidden xs:inline">WhatsApp</span>
                            </a>

                            {/* Teklif Al */}
                            <Link
                                href="/teklif-al"
                                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors text-sm"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Ücretsiz Teklif Al
                            </Link>

                            {/* Telefon */}
                            <a
                                href={`tel:${businessConfig.contact.landlineRaw}`}
                                className="hidden md:inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-neutral-100 text-neutral-800 font-semibold rounded-lg hover:bg-neutral-200 transition-colors text-sm"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                </svg>
                                {businessConfig.contact.landline}
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
