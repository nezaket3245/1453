"use client";

import { useRef, useState } from "react";


import { motion, useInView, AnimatePresence } from "@/lib/motion-lite";
import { cn } from "@/lib/utils";

/**
 * Testimonials Data
 */
const testimonials = [
    {
        id: "1",
        name: "Ahmet Yılmaz",
        location: "Gürpınar, Beylikdüzü",
        rating: 5,
        comment:
            "3 yıl önce tüm evimizin pencerelerini Akçayapı&apos;ya yaptırdık. Kış aylarında ısı yalıtımının farkını çok net hissettik. Doğalgaz faturamız %35 düştü. Montaj ekibi son derece profesyoneldi.",
        date: "2024-01-15",
        product: "PVC Pencere",
        avatar: "/images/testimonials/avatar-1.jpg",
    },
    {
        id: "2",
        name: "Fatma Demir",
        location: "Kavaklı, Beylikdüzü",
        rating: 5,
        comment:
            "Cam balkon yaptırdık ve balkonumuz artık 4 mevsim kullanılabilir durumda. Panoramik sistemi tercih ettik, manzaramız hiç kapanmıyor. Çok memnunuz!",
        date: "2024-02-20",
        product: "Cam Balkon",
        avatar: "/images/testimonials/avatar-2.jpg",
    },
    {
        id: "3",
        name: "Mehmet Kaya",
        location: "Yakuplu, Beylikdüzü",
        rating: 5,
        comment:
            "Dükkanımın tüm doğramalarını alüminyum yaptırdım. Hem modern görünüm kazandı hem de çok dayanıklı. 2 yıldır hiç problem yaşamadık. Tavsiye ederim.",
        date: "2024-03-10",
        product: "Alüminyum Doğrama",
        avatar: "/images/testimonials/avatar-3.jpg",
    },
    {
        id: "4",
        name: "Ayşe Özkan",
        location: "Gürpınar, Beylikdüzü",
        rating: 5,
        comment:
            "Sineklik sistemlerini tüm eve yaptırdık. Pileli modeli çok kullanışlı, istediğimiz zaman kaldırabiliyoruz. Yazın böcek sorunu yaşamadık.",
        date: "2024-04-05",
        product: "Sineklik",
        avatar: "/images/testimonials/avatar-4.jpg",
    },
    {
        id: "5",
        name: "Mustafa Çelik",
        location: "Mimaroba, Büyükçekmece",
        rating: 5,
        comment:
            "Motorlu panjur sistemi hayatımızı çok kolaylaştırdı. Uzaktan kumandayla kontrol edebiliyoruz. Özellikle yaz aylarında güneş kontrolü mükemmel.",
        date: "2024-05-12",
        product: "Panjur",
        avatar: "/images/testimonials/avatar-5.jpg",
    },

];

/**
 * Testimonials Section Component
 */
export function TestimonialsSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section
            ref={ref}
            className="section bg-gradient-to-b from-primary-900 via-primary-800 to-primary-900 relative overflow-hidden"
            aria-labelledby="testimonials-heading"
        >
            {/* Background Decorations */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
                {/* Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                />
            </div>

            <div className="container-custom">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-secondary-400 bg-secondary-400/10 rounded-full">
                        Müşteri Yorumları
                    </span>
                    <h2
                        id="testimonials-heading"
                        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
                    >
                        Mutlu Müşterilerimiz{" "}
                        <span className="text-secondary-400">Ne Diyor?</span>
                    </h2>
                    <p className="text-lg text-white/70 leading-relaxed">
                        5000&apos;den fazla mutlu müşterimizin deneyimlerini dinleyin.
                    </p>

                </motion.div>

                {/* Testimonials Carousel - Mobile */}
                <div className="lg:hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.3 }}
                        >
                            <TestimonialCard testimonial={testimonials[activeIndex]} />
                        </motion.div>
                    </AnimatePresence>

                    {/* Dots Navigation */}
                    <div className="flex items-center justify-center gap-2 mt-8">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className={cn(
                                    "w-2.5 h-2.5 rounded-full transition-[width,background-color] duration-300",
                                    index === activeIndex
                                        ? "w-8 bg-secondary-500"
                                        : "bg-white/30 hover:bg-white/50"
                                )}
                                aria-label={`Yorum ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Testimonials Grid - Desktop */}
                <div className="hidden lg:grid grid-cols-3 gap-6">
                    {testimonials.slice(0, 3).map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <TestimonialCard testimonial={testimonial} />
                        </motion.div>
                    ))}
                </div>

                {/* Stats Row */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {[
                        { value: "4.9/5", label: "Müşteri Memnuniyeti" },
                        { value: "5000+", label: "Tamamlanan Proje" },
                        { value: "127", label: "Google Yorumu" },
                        { value: "%98", label: "Tavsiye Oranı" },
                    ].map((stat) => (
                        <div
                            key={stat.label}
                            className="text-center p-6 bg-white/5 rounded-2xl border border-white/10"
                        >
                            <div className="text-3xl lg:text-4xl font-bold text-secondary-400 mb-2">
                                {stat.value}
                            </div>
                            <div className="text-sm text-white/60">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

/**
 * Testimonial Card Component
 */
function TestimonialCard({
    testimonial,
}: {
    testimonial: (typeof testimonials)[0];
}) {
    return (
        <article className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/10 h-full flex flex-col">
            {/* Rating */}
            <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                    <StarIcon
                        key={i}
                        className={cn(
                            "w-5 h-5",
                            i < testimonial.rating ? "text-yellow-400" : "text-white/20"
                        )}
                        filled={i < testimonial.rating}
                        aria-hidden="true"
                    />
                ))}
            </div>

            {/* Comment */}
            <blockquote className="text-white/90 leading-relaxed mb-6 flex-grow">
                &ldquo;{testimonial.comment}&rdquo;
            </blockquote>

            {/* Product Badge */}
            <div className="mb-4">
                <span className="inline-block px-3 py-1 text-xs font-medium bg-secondary-500/20 text-secondary-300 rounded-full">
                    {testimonial.product}
                </span>
            </div>

            {/* Author */}
            <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name.charAt(0)}
                </div>
                <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-white/60">{testimonial.location}</div>
                </div>
            </div>
        </article>
    );
}

// Star Icon Component
function StarIcon({
    className,
    filled = false,
}: {
    className?: string;
    filled?: boolean;
}) {
    return (
        <svg
            className={className}
            fill={filled ? "currentColor" : "none"}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={filled ? 0 : 1.5}
            aria-hidden="true"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            />
        </svg>
    );
}
