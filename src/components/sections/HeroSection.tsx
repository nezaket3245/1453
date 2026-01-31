"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { businessConfig } from "@/config/business.config";

/**
 * HeroSection Component
 * 
 * High-conversion hero with:
 * - Clear value proposition: "Beylikdüzü'nün Yetkili Egepen Bayisi"
 * - WhatsApp integration for quick mobile contact
 * - Mobile-first CTA buttons
 * - Trust indicators for credibility
 * 
 * SEO: Targets "Beylikdüzü PVC", "Egepen Bayi", "yetkili bayi"
 */
export function HeroSection() {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const whatsappUrl = `https://wa.me/${businessConfig.contact.whatsapp}?text=${encodeURIComponent(
        "Merhaba, ücretsiz keşif ve fiyat teklifi almak istiyorum."
    )}`;

    return (
        <section
            className="relative min-h-[90svh] flex items-center overflow-hidden bg-neutral-900"
            aria-label="Ana banner - Egepen Akçayapı"
        >
            {/* Background with Parallax */}
            <motion.div style={{ y }} className="absolute inset-0 z-0">
                <OptimizedImage
                    src="/images/showroom-main.png"
                    alt={`${businessConfig.name} - ${businessConfig.brand} Beylikdüzü Yetkili Bayi Showroom`}
                    fill
                    priority
                    className="object-cover"
                />
                {/* Lighter overlay to keep image visible while maintaining text readability */}
                <div className="absolute inset-0 bg-black/40" />
            </motion.div>

            <div className="container-custom relative z-10 py-20">
                <div className="max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        style={{ opacity }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Authority Badge */}
                        <div className="flex flex-wrap items-center gap-3 mb-6">
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/20 border border-green-500/40 text-green-400 text-sm font-bold">
                                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                Resmi Yetkili Bayi
                            </span>
                            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/30 text-primary-400 text-sm font-bold uppercase tracking-widest">
                                {businessConfig.brand}
                            </span>
                        </div>

                        {/* Main Headline - Clear Value Proposition */}
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tighter mb-6">
                            Beylikdüzü&apos;nün Yetkili<br />
                            <span className="text-primary-500">Egepen Bayisi:</span>{" "}
                            <span className="text-secondary-400">Akçayapı</span>
                        </h1>

                        {/* Subheadline */}
                        <p className="text-lg sm:text-xl md:text-2xl text-neutral-300 max-w-2xl mb-8 leading-relaxed font-medium">
                            PVC pencere, cam balkon ve sürme sistemlerinde <strong className="text-white">10 yıl garanti</strong>.
                            Gürpınar showroom&apos;umuzda ürünleri yerinde görün.
                        </p>

                        {/* CTA Buttons - Mobile First */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <Button
                                variant="primary"
                                size="xl"
                                href="/teklif-al"
                                className="px-8 shadow-xl shadow-primary-500/30"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Ücretsiz Keşif İste
                            </Button>
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-colors shadow-xl shadow-green-500/30"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                                WhatsApp ile Ulaşın
                            </a>
                        </div>

                        {/* Quick Call - Mobile Optimized */}
                        <a
                            href={`tel:${businessConfig.contact.mobileRaw}`}
                            className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors text-sm"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            Hemen Ara: <strong className="text-white">{businessConfig.contact.mobile}</strong>
                        </a>

                        {/* Trust Indicators */}
                        <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6">
                            {[
                                { label: "Yıllık Tecrübe", val: "25+", icon: "🏆" },
                                { label: "Mutlu Müşteri", val: "10K+", icon: "👨‍👩‍👧‍👦" },
                                { label: "Garanti Süresi", val: "10 Yıl", icon: "🛡️" },
                                { label: "Aynı Gün Montaj", val: "✓", icon: "⚡" },
                            ].map((stat, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <span className="text-2xl">{stat.icon}</span>
                                    <div>
                                        <p className="text-xl md:text-2xl font-black text-white">{stat.val}</p>
                                        <p className="text-xs uppercase tracking-wider text-neutral-500 font-bold">{stat.label}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
