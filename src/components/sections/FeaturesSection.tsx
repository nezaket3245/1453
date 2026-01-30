"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Features Data
 * High-value keywords for SEO
 */
const features = [
    {
        id: "isi-yalitim",
        title: "Üstün Isı Yalıtımı",
        description:
            "6 odalı profil yapısı ve çift cam sayesinde %40&apos;a varan enerji tasarrufu sağlayın. Kışın sıcak, yazın serin kalın.",

        icon: ThermometerIcon,
        stat: "%40",
        statLabel: "Enerji Tasarrufu",
        color: "bg-red-500",
    },
    {
        id: "ses-izolasyonu",
        title: "Mükemmel Ses İzolasyonu",
        description:
            "42dB'e kadar ses yalıtımı ile dış gürültüden tamamen izole olun. Huzurlu ve sessiz yaşam alanları oluşturun.",
        icon: VolumeOffIcon,
        stat: "42dB",
        statLabel: "Ses Yalıtımı",
        color: "bg-purple-500",
    },
    {
        id: "guvenlik",
        title: "Yüksek Güvenlik",
        description:
            "Çok noktalı kilit sistemi ve güvenlik camı seçenekleri ile evinizi koruyun. Zorlanmaya karşı maksimum direnç.",
        icon: ShieldIcon,
        stat: "A++",
        statLabel: "Güvenlik Sınıfı",
        color: "bg-green-500",
    },
    {
        id: "dayaniklilik",
        title: "Uzun Ömürlü Dayanıklılık",
        description:
            "UV ışınlarına, yağmura ve sert hava koşullarına dayanıklı. 50 yıl boyunca ilk günkü görünümünü korur.",
        icon: ClockIcon,
        stat: "50 Yıl",
        statLabel: "Kullanım Ömrü",
        color: "bg-blue-500",
    },
    {
        id: "kolay-bakim",
        title: "Kolay Bakım",
        description:
            "Özel yüzey kaplama sayesinde kir tutmaz ve kolay temizlenir. Yıllık bakım gerektirmez, boya istemez.",
        icon: SparklesIcon,
        stat: "0",
        statLabel: "Bakım Maliyeti",
        color: "bg-cyan-500",
    },
    {
        id: "cevre-dostu",
        title: "Çevre Dostu",
        description:
            "Kurşunsuz profil formülasyonu ve %100 geri dönüştürülebilir malzeme. Doğaya duyarlı tercih.",
        icon: LeafIcon,
        stat: "%100",
        statLabel: "Geri Dönüşüm",
        color: "bg-emerald-500",
    },
];

/**
 * Features Section Component
 */
export function FeaturesSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section
            ref={ref}
            className="section bg-white relative overflow-hidden"
            aria-labelledby="features-heading"
        >
            {/* Background Decorations */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/4 -left-48 w-96 h-96 bg-primary-100/50 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-secondary-100/50 rounded-full blur-3xl" />
            </div>

            <div className="container-custom">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-primary-600 bg-primary-50 rounded-full">
                        Neden Akcapen?
                    </span>
                    <h2
                        id="features-heading"
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6"
                    >
                        Egepen Kalitesiyle{" "}
                        <span className="text-gradient">Fark Yaratan</span>{" "}
                        Özellikler
                    </h2>
                    <p className="text-lg text-neutral-600 leading-relaxed">
                        25 yıllık tecrübemiz ve Egepen&apos;in dünya standartlarındaki ürünleriyle
                        evinize değer katıyoruz.
                    </p>

                </motion.div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <FeatureCard feature={feature} />
                        </motion.div>
                    ))}
                </div>

                {/* Certification Badges */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mt-16 pt-12 border-t border-neutral-200"
                >
                    <p className="text-center text-neutral-500 text-sm mb-8">
                        Tüm ürünlerimiz ulusal ve uluslararası standartlara uygundur
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
                        {[
                            { name: "TSE", label: "TSE Belgeli" },
                            { name: "CE", label: "CE Sertifikalı" },
                            { name: "ISO", label: "ISO 9001" },
                            { name: "EGEPEN", label: "Egepen Yetkili Bayi" },
                        ].map((cert) => (
                            <div
                                key={cert.name}
                                className="flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity"
                            >
                                <div className="w-16 h-16 bg-neutral-100 rounded-xl flex items-center justify-center">
                                    <span className="text-lg font-bold text-neutral-600">{cert.name}</span>
                                </div>
                                <span className="text-xs text-neutral-500">{cert.label}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

/**
 * Feature Card Component
 */
function FeatureCard({ feature }: { feature: (typeof features)[0] }) {
    const Icon = feature.icon;

    return (
        <article className="group relative bg-white rounded-2xl p-6 lg:p-8 border border-neutral-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            {/* Icon */}
            <div
                className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center mb-6",
                    feature.color
                )}
            >
                <Icon className="w-7 h-7 text-white" />
            </div>

            {/* Content */}
            <h3 className="text-xl font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors">
                {feature.title}
            </h3>
            <p className="text-neutral-600 text-sm leading-relaxed mb-6">
                {feature.description}
            </p>

            {/* Stat */}
            <div className="flex items-end gap-2 pt-4 border-t border-neutral-100">
                <span className="text-3xl font-bold text-primary-600">{feature.stat}</span>
                <span className="text-sm text-neutral-500 pb-1">{feature.statLabel}</span>
            </div>

            {/* Hover Effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/5 to-secondary-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </article>
    );
}

// Icon Components
function ThermometerIcon({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286zm0 13.036h.008v.008H12v-.008z" />
        </svg>
    );
}

function VolumeOffIcon({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
        </svg>
    );
}

function ShieldIcon({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.75h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
    );
}

function ClockIcon({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    );
}

function SparklesIcon({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
        </svg>
    );
}

function LeafIcon({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.545 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
        </svg>
    );
}
