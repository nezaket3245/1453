import Image from "next/image";
import { businessConfig } from "@/config/business.config";

/**
 * HeroSectionOptimized Component
 * 
 * Performance-optimized hero section without client-side JavaScript.
 * Uses CSS animations instead of Framer Motion for better LCP.
 * 
 * Optimizations:
 * - Server Component (no "use client")
 * - Native <Image> with priority for LCP
 * - CSS-only animations (no JS blocking)
 * - Preloaded WebP image
 * - Minimal DOM nodes
 * 
 * SEO: Targets "Beylikdüzü PVC", "Egepen Bayi", "yetkili bayi"
 */
export function HeroSectionOptimized() {
    return (
        <section
            className="relative min-h-[70svh] md:min-h-[80svh] flex items-center overflow-hidden bg-neutral-900"
            aria-label="Ana banner - Egepen Akçayapı"
        >
            {/* Hero Background Image */}
            <div className="absolute inset-0 z-0">
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
                <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-transparent" />
            </div>

            <div className="container-custom relative z-10 py-12 md:py-16">
                <div className="max-w-3xl animate-fade-in-up">
                    {/* Badge */}
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/20 border border-green-500/40 text-green-400 text-sm font-bold mb-5">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
                        Egepen Deceuninck Resmi Yetkili Bayi
                    </span>

                    {/* Headline */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight mb-4">
                        PVC Pencere, Cam Balkon<br />
                        <span className="text-primary-400">ve Sürme Sistemleri</span>
                    </h1>


                </div>
            </div>
        </section>
    );
}
