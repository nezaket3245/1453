'use client';

import { useState, useEffect } from 'react';
import { businessConfig } from '@/config/business.config';

interface WhatsAppCTAProps {
    /** System name to pre-fill in WhatsApp message */
    systemName?: string;
    /** Custom message override */
    customMessage?: string;
    /** Whether to show pulse animation */
    showPulse?: boolean;
    /** Position of the button */
    position?: 'bottom-right' | 'bottom-left';
}

/**
 * Sticky WhatsApp CTA Button
 * Pre-filled message for quick quote requests
 * SEO: Conversion-optimized floating action button
 */
export function WhatsAppCTA({
    systemName = 'Cam Balkon',
    customMessage,
    showPulse = true,
    position = 'bottom-right',
}: WhatsAppCTAProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Show button after scroll
    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 300);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        // Initial check
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Pre-filled WhatsApp message
    const message =
        customMessage ||
        `Merhaba, ${systemName} için ölçü ve fiyat bilgisi almak istiyorum.`;

    const whatsappUrl = `https://wa.me/${businessConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`;

    const positionClasses = position === 'bottom-right' ? 'right-6' : 'left-6';

    if (!isVisible) return null;

    return (
        <div
            className={`fixed bottom-6 ${positionClasses} z-50 flex flex-col items-end gap-3`}
            style={{ zIndex: 9999 }}
        >
            {/* Tooltip on hover */}
            <div
                className={`
                    transform transition-all duration-300 origin-bottom-right
                    ${isHovered ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95 pointer-events-none'}
                `}
            >
                <div className="bg-neutral-900 text-white text-sm px-4 py-2 rounded-lg shadow-xl max-w-[200px]">
                    <p className="font-medium">Hızlı Teklif Al</p>
                    <p className="text-neutral-400 text-xs mt-1">WhatsApp ile anında iletişim</p>
                </div>
            </div>

            {/* Main Button */}
            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`
                    group relative flex items-center justify-center
                    w-16 h-16 rounded-full
                    bg-gradient-to-br from-green-500 to-green-600
                    shadow-2xl shadow-green-500/30
                    hover:shadow-green-500/50 hover:scale-110
                    transform transition-all duration-300
                    ${showPulse ? 'animate-pulse-whatsapp' : ''}
                `}
                aria-label={`WhatsApp ile ${systemName} için teklif al`}
            >
                {/* Pulse ring */}
                {showPulse && (
                    <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-25" aria-hidden="true" />
                )}

                {/* WhatsApp Icon */}
                <svg
                    className="w-8 h-8 text-white relative z-10 group-hover:scale-110 transition-transform duration-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>

                {/* Badge */}
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center" aria-hidden="true">
                    <span className="text-white text-xs font-bold">1</span>
                </span>
            </a>

            {/* Quick Actions */}
            <a
                href={`tel:${businessConfig.contact.mobileRaw}`}
                className={`
                    flex items-center justify-center
                    w-12 h-12 rounded-full
                    bg-white border-2 border-neutral-200
                    shadow-lg hover:shadow-xl
                    hover:border-primary-500 hover:scale-110
                    transform transition-all duration-300
                `}
                aria-label="Hemen telefon ile arayın"
            >
                <svg
                    className="w-5 h-5 text-primary-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                </svg>
            </a>
        </div>
    );
}

export default WhatsAppCTA;
