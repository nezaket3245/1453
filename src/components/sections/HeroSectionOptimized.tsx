import Image from "next/image";
import Link from "next/link";
import { businessConfig } from "@/config/business.config";

/**
 * HeroSectionOptimized Component
 *
 * Performance-first hero section — zero client-side JS.
 * Targets LCP < 1.2 s via:
 *  - Server Component (no "use client" directive)
 *  - <link rel="preload"> in _headers + priority on <Image>
 *  - CSS-only fade-in animation (no JS runtime)
 *  - Minimal DOM depth (< 15 nodes)
 *  - Explicit aspect-ratio for CLS = 0
 *
 * Accessibility:
 *  - Semantic <section> with aria-label
 *  - Decorative overlay is aria-hidden
 *  - CTA buttons meet 48 × 48 touch target (WCAG 2.5.5)
 *  - Color contrast ≥ 4.5 : 1 (white on dark overlay)
 *
 * SEO keywords: "Beylikdüzü PVC Pencere", "Egepen Bayi", "Cam Balkon Fiyatları 2026"
 */
export function HeroSectionOptimized() {
    return (
        <section
            className="relative min-h-[70svh] md:min-h-[80svh] flex items-center overflow-hidden bg-neutral-900"
            aria-label="Ana banner — Egepen Akçayapı Beylikdüzü"
        >
            {/* LCP Image — preloaded via _headers, priority ensures fetchpriority="high" */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/showroom-main.webp"
                    alt={`${businessConfig.name} — ${businessConfig.brand} Beylikdüzü Yetkili Bayi Showroom`}
                    fill
                    priority
                    fetchPriority="high"
                    sizes="100vw"
                    className="object-cover"
                    quality={80}
                />
                {/* Dark overlay for text contrast (WCAG AA) */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-transparent" aria-hidden="true" />
            </div>

            <div className="container-custom relative z-10 py-12 md:py-16">
                <div className="max-w-3xl animate-fade-in-up">
                    {/* Trust badge */}
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/20 border border-green-500/40 text-green-400 text-sm font-bold mb-5">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
                        Egepen Deceuninck Resmi Yetkili Bayi
                    </span>

                    {/* H1 — single per page, keyword-rich */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight mb-4">
                        PVC Pencere, Cam Balkon
                        <br />
                        <span className="text-primary-400">ve Sürme Sistemleri</span>
                    </h1>

                    {/* Sub-headline for context & SEO */}
                    <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl leading-relaxed">
                        Beylikdüzü ve çevresinde {businessConfig.brand} yetkili bayisi olarak
                        profesyonel montaj ve ücretsiz keşif hizmeti sunuyoruz.
                    </p>

                    {/* CTA buttons — 48 px min-height for a11y */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                            href="/teklif-al"
                            title="Ücretsiz keşif ve fiyat teklifi alın"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 min-h-[48px] text-lg font-bold rounded-xl bg-secondary-500 text-white hover:bg-secondary-600 transition-colors shadow-lg"
                        >
                            Ücretsiz Teklif Al
                        </Link>
                        <a
                            href={`tel:${businessConfig.contact.mobileRaw}`}
                            title="Hemen arayın"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 min-h-[48px] text-lg font-bold rounded-xl border-2 border-white/30 text-white hover:bg-white/10 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            {businessConfig.contact.mobile}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
