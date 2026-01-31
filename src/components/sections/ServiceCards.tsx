"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { businessConfig } from "@/config/business.config";

/**
 * ServiceCards Component
 * 
 * Feature-rich service cards following F-Pattern layout.
 * Each card includes: Features, Warranty, "Get Price" CTA.
 * 
 * SEO: Targets individual service keywords for local market.
 */

interface ServiceCardData {
    id: string;
    title: string;
    subtitle: string;
    image: string;
    href: string;
    features: string[];
    warranty: string;
    badge?: string;
    priceRange?: string;
}

const services: ServiceCardData[] = [
    {
        id: "pvc",
        title: "PVC Pencere & Kapı",
        subtitle: "Egepen Legend, Legend Art, Zendow Serisi",
        image: "/images/pvc/pvc-surme-manzara.jpg",
        href: "/pvc-sistemleri",
        features: [
            "6 odacık ısı yalıtımı",
            "Üçlü cam seçeneği",
            "Antrasit & Ahşap kaplama",
            "Gürültü izolasyonu",
        ],
        warranty: "10 Yıl Garanti",
        badge: "En Popüler",
        priceRange: "₺₺₺",
    },
    {
        id: "cam-balkon",
        title: "Cam Balkon Sistemleri",
        subtitle: "Isıcamlı, Katlanır, Sürme Sistemler",
        image: "/images/cam-balkon/cam-balkon-site-manzara.jpg",
        href: "/cam-balkon-sistemleri",
        features: [
            "8mm temperli cam",
            "Argon gazlı Low-E",
            "%100 açılım özelliği",
            "Kış bahçesi çözümü",
        ],
        warranty: "5 Yıl Garanti",
        badge: "Yüksek Talep",
        priceRange: "₺₺",
    },
    {
        id: "sineklik",
        title: "Sineklik Sistemleri",
        subtitle: "Pileli, Menteşeli, Sürgülü",
        image: "/images/sineklik/duble-plise-sineklik.jpg",
        href: "/sineklik-sistemleri",
        features: [
            "UV dayanımlı file",
            "Kolay temizlik",
            "Alüminyum çerçeve",
            "Özel ölçü üretim",
        ],
        warranty: "2 Yıl Garanti",
        priceRange: "₺",
    },
    {
        id: "panjur",
        title: "Panjur & Kepenk",
        subtitle: "Egepen Storbox & Somfy Akıllı Sistemler",
        image: "/images/panjur/panjur-motorlu-villa.jpg",
        href: "/panjur-kepenk-sistemleri",
        features: [
            "Egepen Storbox Monoblok",
            "Somfy io Akıllı Motor",
            "TaHoma Akıllı Ev Uyumu",
            "%45 Isı ve Ses Yalıtımı",
        ],
        warranty: "10 Yıl Sistem Garantisi",
        badge: "Egepen Kalitesi",
        priceRange: "₺₺",
    },
    {
        id: "dusakabin",
        title: "Duşakabin & Küvet Üstü",
        subtitle: "Çerçeveli & Çerçevesiz Modeller",
        image: "/images/dusakabin/dusakabin-siyah-profil-genis.jpg",
        href: "/dusakabin-sistemleri",
        features: [
            "10mm temperli cam",
            "Nano kaplama",
            "Paslanmaz aksesuar",
            "Kolay montaj",
        ],
        warranty: "5 Yıl Garanti",
        priceRange: "₺₺",
    },
    {
        id: "aluminyum",
        title: "Alüminyum Doğrama",
        subtitle: "Isı Yalıtımlı Profesyonel Sistemler",
        image: "/images/aluminyum/thermal-break-pencere.png",
        href: "/aluminyum-sistemleri",
        features: [
            "Thermal break teknoloji",
            "RAL renk seçenekleri",
            "Yüksek dayanıklılık",
            "Ticari çözümler",
        ],
        warranty: "10 Yıl Garanti",
        priceRange: "₺₺₺",
    },
];

export function ServiceCards() {
    const whatsappBase = `https://wa.me/${businessConfig.contact.whatsapp}`;

    return (
        <section className="section bg-white" aria-labelledby="services-heading">
            <div className="container-custom">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-primary-600 text-sm font-bold uppercase tracking-widest mb-4"
                    >
                        Hizmetlerimiz
                    </motion.span>
                    <motion.h2
                        id="services-heading"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-4xl lg:text-5xl font-black text-neutral-900 mb-6"
                    >
                        Beylikdüzü&apos;nde{" "}
                        <span className="text-primary-600">Profesyonel Çözümler</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-neutral-600"
                    >
                        Her biri Egepen kalitesiyle, yerel ekibimiz tarafından profesyonelce monte edilen sistemler.
                    </motion.p>
                </div>

                {/* Service Cards Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <motion.article
                            key={service.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:border-primary-300 hover:shadow-xl transition-all duration-300"
                        >
                            {/* Image Header */}
                            <div className="relative aspect-[16/10] bg-gradient-to-br from-primary-50 to-accent-50 overflow-hidden">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className={`absolute inset-0 w-full h-full object-cover ${service.id === 'panjur' || service.id === 'dusakabin' || service.id === 'aluminyum' ? 'object-contain' : ''} p-0 group-hover:scale-110 transition-transform duration-500`}
                                />
                                {/* Badge */}
                                {service.badge && (
                                    <div className="absolute top-4 left-4 px-3 py-1 bg-secondary-500 text-neutral-900 text-xs font-bold rounded-full">
                                        {service.badge}
                                    </div>
                                )}
                                {/* Price Range */}
                                {service.priceRange && (
                                    <div className="absolute top-4 right-4 px-2 py-1 bg-white/90 backdrop-blur-sm text-neutral-700 text-xs font-medium rounded">
                                        {service.priceRange}
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                {/* Title */}
                                <h3 className="text-xl font-bold text-neutral-900 mb-1 group-hover:text-primary-600 transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-sm text-neutral-500 mb-4">{service.subtitle}</p>

                                {/* Features */}
                                <ul className="space-y-2 mb-4">
                                    {service.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-neutral-600">
                                            <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                {/* Warranty Badge */}
                                <div className="flex items-center gap-2 mb-4 py-2 px-3 bg-green-50 rounded-lg">
                                    <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.75h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                                    </svg>
                                    <span className="text-sm font-medium text-green-700">{service.warranty}</span>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-3">
                                    <Link
                                        href={service.href}
                                        className="flex-1 text-center py-2.5 text-sm font-bold text-primary-600 border border-primary-200 rounded-lg hover:bg-primary-50 transition-colors"
                                    >
                                        Detaylar
                                    </Link>
                                    <a
                                        href={`${whatsappBase}?text=${encodeURIComponent(`Merhaba, ${service.title} hakkında fiyat bilgisi almak istiyorum.`)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 text-center py-2.5 text-sm font-bold text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors"
                                    >
                                        Fiyat Al
                                    </a>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
