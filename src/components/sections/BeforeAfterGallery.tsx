"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OptimizedImage from "@/components/ui/OptimizedImage";

/**
 * BeforeAfterGallery Component
 * 
 * Interactive before/after comparison slider for completed projects.
 * Showcases transformations in Beylikdüzü neighborhoods.
 * 
 * SEO: Targets "Beylikdüzü PVC montaj örnekleri", "cam balkon sonrası"
 */

interface BeforeAfterItem {
    id: string;
    title: string;
    location: string;
    before: string;
    after: string;
    category: string;
}

const galleryItems: BeforeAfterItem[] = [
    {
        id: "1",
        title: "Gürpınar Villa PVC Dönüşümü",
        location: "Gürpınar, Beylikdüzü",
        before: "/images/gallery/gurpinar-before.png",
        after: "/images/gallery/gurpinar-after.png",
        category: "PVC Pencere",
    },
    {
        id: "2",
        title: "Kavaklı Apartman Cam Balkon",
        location: "Kavaklı, Beylikdüzü",
        before: "/images/gallery/kavakli-before.png",
        after: "/images/gallery/kavakli-after.png",
        category: "Cam Balkon",
    },
    {
        id: "3",
        title: "Yakuplu Site Pencere Yenileme",
        location: "Yakuplu, Beylikdüzü",
        before: "/images/gallery/yakuplu-before.png",
        after: "/images/gallery/yakuplu-after.png",
        category: "PVC Pencere",
    },
];

export function BeforeAfterGallery() {
    const [activeItem, setActiveItem] = useState(galleryItems[0]);
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);

    const handleMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
        if (!isDragging) return;

        const container = e.currentTarget;
        const rect = container.getBoundingClientRect();

        let clientX: number;
        if ('touches' in e) {
            clientX = e.touches[0].clientX;
        } else {
            clientX = e.clientX;
        }

        const x = clientX - rect.left;
        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
        setSliderPosition(percentage);
    };

    return (
        <section className="section bg-neutral-900" aria-labelledby="before-after-heading">
            <div className="container-custom">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1.5 rounded-full bg-secondary-500/20 text-secondary-400 text-sm font-bold uppercase tracking-widest mb-4"
                    >
                        Önce & Sonra
                    </motion.span>
                    <motion.h2
                        id="before-after-heading"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6"
                    >
                        Beylikdüzü&apos;nde{" "}
                        <span className="text-secondary-400">Dönüşümler</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-white/70"
                    >
                        Kaydırıcıyı hareket ettirerek projelerimizin öncesi ve sonrasını karşılaştırın.
                    </motion.p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Comparison Slider */}
                    <div className="lg:col-span-2">
                        <div
                            className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-ew-resize select-none"
                            onMouseDown={() => setIsDragging(true)}
                            onMouseUp={() => setIsDragging(false)}
                            onMouseLeave={() => setIsDragging(false)}
                            onMouseMove={handleMove}
                            onTouchStart={() => setIsDragging(true)}
                            onTouchEnd={() => setIsDragging(false)}
                            onTouchMove={handleMove}
                        >
                            {/* After Image (Background) */}
                            <div className="absolute inset-0">
                                <OptimizedImage
                                    src={activeItem.after}
                                    alt={`${activeItem.title} - Sonra`}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-green-500 text-white text-sm font-bold rounded-lg">
                                    SONRA
                                </div>
                            </div>

                            {/* Before Image (Clipped) */}
                            <div
                                className="absolute inset-0 overflow-hidden"
                                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                            >
                                <OptimizedImage
                                    src={activeItem.before}
                                    alt={`${activeItem.title} - Önce`}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-neutral-700 text-white text-sm font-bold rounded-lg">
                                    ÖNCE
                                </div>
                            </div>

                            {/* Slider Handle */}
                            <div
                                className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10"
                                style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
                            >
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-neutral-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                    </svg>
                                </div>
                            </div>

                            {/* Instructions */}
                            <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 backdrop-blur-sm text-white text-sm rounded-full pointer-events-none">
                                ← Kaydırın →
                            </div>
                        </div>

                        {/* Active Item Info */}
                        <div className="mt-4 flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-bold text-white">{activeItem.title}</h3>
                                <p className="text-white/60">{activeItem.location}</p>
                            </div>
                            <span className="px-3 py-1 bg-secondary-500/20 text-secondary-400 text-sm font-medium rounded-full">
                                {activeItem.category}
                            </span>
                        </div>
                    </div>

                    {/* Project Selector */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-white mb-4">Diğer Projeler</h3>
                        {galleryItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => {
                                    setActiveItem(item);
                                    setSliderPosition(50);
                                }}
                                className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all ${activeItem.id === item.id
                                    ? "bg-white/10 border border-white/20"
                                    : "bg-white/5 border border-transparent hover:bg-white/10"
                                    }`}
                            >
                                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 relative">
                                    <OptimizedImage
                                        src={item.after}
                                        alt={item.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="text-left">
                                    <p className="font-medium text-white">{item.title}</p>
                                    <p className="text-sm text-white/60">{item.location}</p>
                                </div>
                            </button>
                        ))}

                        {/* CTA */}
                        <a
                            href="/projeler"
                            className="block w-full text-center py-4 bg-secondary-500 text-neutral-900 font-bold rounded-xl hover:bg-secondary-400 transition-colors mt-6"
                        >
                            Tüm Projeleri Gör →
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
