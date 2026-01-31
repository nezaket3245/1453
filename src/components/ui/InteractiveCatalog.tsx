"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { businessConfig } from "@/config/business.config";

/**
 * InteractiveCatalog Component
 * 
 * Fast-loading digital catalog viewer for Egepen products.
 * Features:
 * - Image grid layout for quick browsing
 * - PDF download links for detailed specs
 * - Product category filtering
 * - WhatsApp integration for instant quotes
 * 
 * SEO: Targets "Egepen katalog", "PVC pencere katalog", "cam balkon modelleri"
 */

interface CatalogItem {
    id: string;
    title: string;
    series: string;
    category: "pvc" | "cam-balkon" | "sineklik" | "panjur" | "dusakabin";
    image: string;
    pdfUrl?: string;
    features: string[];
    priceRange: string;
}

const catalogItems: CatalogItem[] = [
    {
        id: "legend-6",
        title: "Legend 6 Serisi",
        series: "Legend",
        category: "pvc",
        image: "/images/products/legend-catalog.png",
        pdfUrl: "/catalogs/legend-6.pdf",
        features: ["6 Odacık", "Uw: 1.0 W/m²K", "80mm Genişlik"],
        priceRange: "₺₺₺",
    },
    {
        id: "legend-art",
        title: "Legend Art 70 Serisi",
        series: "Legend Art",
        category: "pvc",
        image: "/images/products/legend-art-catalog.png",
        pdfUrl: "/catalogs/legend-art.pdf",
        features: ["Estetik Kanat", "Uw: 1.1 W/m²K", "70mm Genişlik"],
        priceRange: "₺₺₺",
    },
    {
        id: "fusion-85",
        title: "Fusion 85 Serisi",
        series: "Fusion",
        category: "pvc",
        image: "/images/products/fusion-catalog.png",
        pdfUrl: "/catalogs/fusion-85.pdf",
        features: ["Ultra Yalıtım", "Uw: 0.8 W/m²K", "85mm Genişlik"],
        priceRange: "₺₺₺₺₺",
    },
    {
        id: "zen-spirit",
        title: "Zen Spirit Sürme",
        series: "Zen Spirit",
        category: "pvc",
        image: "/images/products/zen-spirit-catalog.png",
        pdfUrl: "/catalogs/zen-spirit.pdf",
        features: ["Minimal Tasarım", "Geniş Cam Alanı", "Sessiz Sürme"],
        priceRange: "₺₺₺₺",
    },
    {
        id: "tiara-max",
        title: "Tiara Max Isıcamlı",
        series: "Tiara",
        category: "cam-balkon",
        image: "/images/cam-balkon/tiara-catalog.png",
        pdfUrl: "/catalogs/tiara-max.pdf",
        features: ["8mm Temperli", "Low-E Cam", "%100 Açılım"],
        priceRange: "₺₺₺",
    },
    {
        id: "twin-surme",
        title: "Twin Sürme Sistem",
        series: "Twin",
        category: "cam-balkon",
        image: "/images/cam-balkon/twin-catalog.png",
        pdfUrl: "/catalogs/twin-surme.pdf",
        features: ["Eşiksiz Model", "Kolay Temizlik", "Rüzgar Dayanıklı"],
        priceRange: "₺₺₺",
    },
    {
        id: "pileli-sineklik",
        title: "Pileli Sineklik",
        series: "Premium",
        category: "sineklik",
        image: "/images/sineklik/yatay-plise-sineklik.png",
        features: ["UV Dayanıklı", "Kolay Açılım", "Renk Seçenekleri"],
        priceRange: "₺₺",
    },
    {
        id: "storbox-monoblok",
        title: "Egepen Storbox Panjur",
        series: "Storbox",
        category: "panjur",
        image: "/images/panjur/panjur-modern-villa.jpg",
        pdfUrl: "/catalogs/storbox.pdf",
        features: ["Pencere Üstü", "%45 Tasarruf", "Lamine Renkler"],
        priceRange: "₺₺₺",
    },
    {
        id: "motorlu-panjur",
        title: "Motorlu Alüminyum Panjur",
        series: "Somfy/Becker",
        category: "panjur",
        image: "/images/panjur/panjur-motorlu-villa.jpg",
        pdfUrl: "/catalogs/motorlu-panjur.pdf",
        features: ["Uzaktan Kumanda", "Köpük Dolgulu", "Sessiz Çalışma"],
        priceRange: "₺₺₺",
    },
    {
        id: "black-edition-square",
        title: "Black Edition Siyah Kare",
        series: "Premium",
        category: "dusakabin",
        image: "/images/dusakabin/dusakabin-siyah-kose.jpg",
        features: ["10mm Temperli Cam", "Mat Siyah Profil", "Nano Kaplama"],
        priceRange: "₺₺₺",
    },
    {
        id: "walk-in-panel",
        title: "Walk-in Panel Duş",
        series: "Modern",
        category: "dusakabin",
        image: "/images/dusakabin/hero-black-frameless.jpg",
        features: ["Çerçevesiz Tasarım", "Engelsiz Giriş", "Kolay Temizlik"],
        priceRange: "₺₺",
    },
];

const categories = [
    { id: "all", label: "Tüm Ürünler" },
    { id: "pvc", label: "PVC Pencere & Kapı" },
    { id: "cam-balkon", label: "Cam Balkon" },
    { id: "sineklik", label: "Sineklik" },
    { id: "panjur", label: "Panjur & Kepenk" },
    { id: "dusakabin", label: "Duşakabin" },
];

export function InteractiveCatalog() {
    const [activeCategory, setActiveCategory] = useState("all");
    const [selectedItem, setSelectedItem] = useState<CatalogItem | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Simulate loading for progressive enhancement
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 300);
        return () => clearTimeout(timer);
    }, []);

    const filteredItems = activeCategory === "all"
        ? catalogItems
        : catalogItems.filter(item => item.category === activeCategory);

    const whatsappBase = `https://wa.me/${businessConfig.contact.whatsapp}`;

    return (
        <section className="section bg-neutral-50" aria-labelledby="catalog-heading">
            <div className="container-custom">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1.5 rounded-full bg-primary-100 text-primary-600 text-sm font-bold uppercase tracking-widest mb-4"
                    >
                        Dijital Katalog
                    </motion.span>
                    <motion.h2
                        id="catalog-heading"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-4xl lg:text-5xl font-black text-neutral-900 mb-6"
                    >
                        Egepen Ürün{" "}
                        <span className="text-primary-600">Kataloğu</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-neutral-600"
                    >
                        Legend, Legend Art, Zendow ve Zen Spirit serilerini keşfedin.
                        Detaylı teknik bilgi için PDF katalogları indirin.
                    </motion.p>
                </div>

                {/* Category Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-wrap justify-center gap-3 mb-10"
                >
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${activeCategory === cat.id
                                ? "bg-primary-600 text-white shadow-lg shadow-primary-500/30"
                                : "bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200"
                                }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </motion.div>

                {/* Product Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <AnimatePresence mode="popLayout">
                        {filteredItems.map((item, index) => (
                            <motion.article
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ delay: index * 0.05 }}
                                className="group bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:border-primary-300 hover:shadow-xl transition-all duration-300"
                            >
                                {/* Product Image */}
                                <div
                                    className="relative aspect-[4/3] bg-gradient-to-br from-primary-50 to-accent-50 overflow-hidden cursor-pointer"
                                    onClick={() => setSelectedItem(item)}
                                >
                                    {isLoading ? (
                                        <div className="absolute inset-0 skeleton" />
                                    ) : (
                                        <OptimizedImage
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className={`${item.category === 'panjur' ? 'object-contain p-6' : 'object-cover'} group-hover:scale-110 transition-transform duration-500`}
                                        />
                                    )}
                                    {/* Series Badge */}
                                    <div className="absolute top-3 left-3 px-2.5 py-1 bg-primary-600 text-white text-xs font-bold rounded-full">
                                        {item.series}
                                    </div>
                                    {/* Price Range */}
                                    <div className="absolute top-3 right-3 px-2 py-1 bg-white/90 backdrop-blur-sm text-neutral-700 text-xs font-medium rounded">
                                        {item.priceRange}
                                    </div>
                                    {/* Quick View Overlay */}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <span className="px-4 py-2 bg-white text-neutral-900 font-bold rounded-lg text-sm">
                                            Detay Görüntüle
                                        </span>
                                    </div>
                                </div>

                                {/* Product Info */}
                                <div className="p-5">
                                    <h3 className="text-lg font-bold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                                        {item.title}
                                    </h3>

                                    {/* Features */}
                                    <ul className="flex flex-wrap gap-2 mb-4">
                                        {item.features.map((feature, i) => (
                                            <li
                                                key={i}
                                                className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs rounded"
                                            >
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Actions */}
                                    <div className="flex gap-2">
                                        {item.pdfUrl && (
                                            <a
                                                href={item.pdfUrl}
                                                download
                                                className="flex-1 text-center py-2 text-sm font-bold text-primary-600 border border-primary-200 rounded-lg hover:bg-primary-50 transition-colors"
                                            >
                                                📄 PDF İndir
                                            </a>
                                        )}
                                        <a
                                            href={`${whatsappBase}?text=${encodeURIComponent(`Merhaba, ${item.title} hakkında fiyat bilgisi almak istiyorum.`)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 text-center py-2 text-sm font-bold text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors"
                                        >
                                            Fiyat Al
                                        </a>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </AnimatePresence>
                </div>

                {/* View All CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-12"
                >
                    <a
                        href="/urunler"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/30"
                    >
                        <span>Tüm Ürünleri Keşfet</span>
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </a>
                </motion.div>
            </div>

            {/* Product Detail Modal */}
            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setSelectedItem(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="relative aspect-video bg-gradient-to-br from-primary-50 to-accent-50">
                                <OptimizedImage
                                    src={selectedItem.image}
                                    alt={selectedItem.title}
                                    fill
                                    className={selectedItem.category === 'panjur' ? 'object-contain p-8' : 'object-cover'}
                                />
                                <button
                                    onClick={() => setSelectedItem(null)}
                                    className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-neutral-100 transition-colors"
                                    aria-label="Kapat"
                                >
                                    <svg className="w-5 h-5 text-neutral-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-bold rounded-full">
                                        {selectedItem.series}
                                    </span>
                                    <span className="text-neutral-500">{selectedItem.priceRange}</span>
                                </div>
                                <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                                    {selectedItem.title}
                                </h3>

                                {/* Features List */}
                                <div className="mb-6">
                                    <h4 className="text-sm font-bold text-neutral-700 uppercase tracking-wider mb-3">
                                        Özellikler
                                    </h4>
                                    <ul className="grid grid-cols-2 gap-2">
                                        {selectedItem.features.map((feature, i) => (
                                            <li key={i} className="flex items-center gap-2 text-neutral-600">
                                                <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-3">
                                    {selectedItem.pdfUrl && (
                                        <a
                                            href={selectedItem.pdfUrl}
                                            download
                                            className="flex-1 text-center py-3 text-sm font-bold text-primary-600 border-2 border-primary-500 rounded-xl hover:bg-primary-50 transition-colors"
                                        >
                                            📄 Teknik PDF İndir
                                        </a>
                                    )}
                                    <a
                                        href={`${whatsappBase}?text=${encodeURIComponent(`Merhaba, ${selectedItem.title} hakkında detaylı fiyat ve montaj bilgisi almak istiyorum.`)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 text-center py-3 text-sm font-bold text-white bg-green-500 rounded-xl hover:bg-green-600 transition-colors"
                                    >
                                        💬 WhatsApp ile Teklif Al
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
