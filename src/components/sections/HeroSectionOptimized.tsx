import Image from "next/image";
import Link from "next/link";
import { businessConfig } from "@/config/business.config";

/**
 * HeroSectionOptimized Component
 * 
 * Modern, high-conversion hero section with:
 * - Background video support with image fallback
 * - Dual CTA buttons (Products + Request Quote)
 * - Trust indicators (stats bar)
 * - CSS-only animations for performance
 * 
 * Performance:
 * - Server Component (no "use client")
 * - Native <Image> with priority for LCP
 * - Video poster for instant visual
 * - Minimal DOM nodes
 * 
 * SEO: Targets "Beylikdüzü PVC", "Egepen Bayi", "yetkili bayi"
 */
export function HeroSectionOptimized() {
    return (
        <section
            className="relative min-h-[92svh] flex items-center overflow-hidden bg-neutral-900"
            aria-label="Ana banner - Egepen Akçayapı"
            style={{ containIntrinsicSize: "0 92vh", contentVisibility: "visible" }}
        >
            {/* Hero Background - Image with optional video overlay */}
            <div className="absolute inset-0 z-0">
                {/* Primary background image — always visible as LCP element */}
                <Image
                    src="/images/showroom-main.webp"
                    alt={`${businessConfig.name} - ${businessConfig.brand} Beylikdüzü Yetkili Bayi Showroom`}
                    fill
                    priority
                    fetchPriority="high"
                    sizes="100vw"
                    className="object-cover"
                    quality={85}
                />
                {/* Optional background video — loaded lazily after image */}
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="none"
                    poster="/images/showroom-main.webp"
                    className="absolute inset-0 w-full h-full object-cover opacity-0 animate-fade-in"
                    style={{ animationDelay: "2s", animationFillMode: "forwards" }}
                    aria-hidden="true"
                >
                    <source src="/videos/pvc/pvc-hero.mp4" type="video/mp4" />
                </video>
                {/* Multi-layer gradient — removed for clear image */}
            </div>

            <div className="container-custom relative z-10 py-20 md:py-28">
                <div className="max-w-4xl animate-fade-in-up">
                    {/* Authority Badges — hidden */}
                    <div className="sr-only">
                        <span>Resmi Yetkili Bayi</span>
                        <span>{businessConfig.brand}</span>
                        <span>40 Yıllık Tecrübe</span>
                    </div>

                    {/* Main Headline - Visible but subtle for SEO compliance */}
                    <h1
                        className="text-2xl md:text-3xl lg:text-4xl font-bold text-white/90 leading-tight mb-3"
                        style={{ textShadow: '0 2px 6px rgba(0,0,0,0.7), 0 1px 2px rgba(0,0,0,0.5)' }}
                    >
                        Beylikdüzü&apos;nün Yetkili Egepen Bayisi: Akçayapı
                    </h1>

                    {/* Subheadline - Visible but understated */}
                    <p
                        className="text-base md:text-lg text-white/80 mb-8 max-w-xl"
                        style={{ textShadow: '0 2px 4px rgba(0,0,0,0.6)' }}
                    >
                        PVC pencere, cam balkon, sineklik ve panjur sistemlerinde profesyonel çözümler. Ücretsiz keşif ve garantili montaj.
                    </p>

                    {/* Dual CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-12">
                        {/* Ücretsiz Teklif Al — hidden */}
                        <Link
                            href="/urunler"
                            title="Egepen Ürünlerini İnceleyin"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/15 text-white font-bold rounded-xl hover:bg-white/25 transition-[color,background-color,transform] border border-white/20 min-h-[52px] text-lg hover:scale-[1.02] active:scale-[0.98]"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                            ÜRÜNLERİ İNCELE
                        </Link>
                        {/* WhatsApp — hidden */}
                    </div>

                    {/* Trust Stats Bar — hidden */}
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 motion-safe:animate-bounce hidden md:block" aria-hidden="true">
                <svg className="w-6 h-6 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>
        </section>
    );
}
