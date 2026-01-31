"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { businessConfig } from "@/config/business.config";

/**
 * GoogleReviewsWidget Component
 * 
 * Displays Google Reviews rating with floating animation.
 * Builds social proof for local market trust.
 * 
 * Note: In production, integrate with Google Places API for real reviews.
 */

interface Review {
    id: string;
    author: string;
    rating: number;
    text: string;
    date: string;
    avatar?: string;
}

// Sample reviews - Replace with actual Google Places API data
const reviews: Review[] = [
    {
        id: "1",
        author: "Ahmet Y.",
        rating: 5,
        text: "Harika hizmet, profesyonel ekip. Pencerelerimiz mükemmel oldu!",
        date: "2 hafta önce",
    },
    {
        id: "2",
        author: "Fatma D.",
        rating: 5,
        text: "Cam balkon yaptırdık, çok memnunuz. Tavsiye ederim.",
        date: "1 ay önce",
    },
    {
        id: "3",
        author: "Mehmet K.",
        rating: 5,
        text: "Zamanında montaj, kaliteli ürün. Teşekkürler Akçayapı!",
        date: "3 hafta önce",
    },
    {
        id: "4",
        author: "Ayşe Ö.",
        rating: 5,
        text: "Fiyat performans oranı çok iyi. Kesinlikle önerilir.",
        date: "1 hafta önce",
    },
];

export function GoogleReviewsWidget() {
    const [currentReview, setCurrentReview] = useState(0);
    const [isExpanded, setIsExpanded] = useState(false);

    // Auto-rotate reviews
    useEffect(() => {
        if (isExpanded) return;

        const interval = setInterval(() => {
            setCurrentReview((prev) => (prev + 1) % reviews.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isExpanded]);

    return (
        <div className="fixed bottom-24 right-4 z-40 hidden md:block">
            <AnimatePresence mode="wait">
                {isExpanded ? (
                    <motion.div
                        key="expanded"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="w-80 bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                                        <svg className="w-6 h-6 text-primary-600" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-1">
                                            <span className="text-white font-bold text-xl">4.9</span>
                                            <div className="flex">
                                                {[...Array(5)].map((_, i) => (
                                                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-white/80 text-sm">127 Google Yorumu</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsExpanded(false)}
                                    className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                                    aria-label="Kapat"
                                >
                                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Reviews List */}
                        <div className="max-h-64 overflow-y-auto p-4 space-y-4">
                            {reviews.map((review) => (
                                <div key={review.id} className="p-3 bg-neutral-50 rounded-xl">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-bold text-sm">
                                            {review.author.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-medium text-neutral-900 text-sm">{review.author}</p>
                                            <div className="flex items-center gap-1">
                                                {[...Array(review.rating)].map((_, i) => (
                                                    <svg key={i} className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-sm text-neutral-600">&ldquo;{review.text}&rdquo;</p>
                                    <p className="text-xs text-neutral-400 mt-1">{review.date}</p>
                                </div>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="p-4 border-t border-neutral-100">
                            <a
                                href={businessConfig.social.googleMaps}
                                target="_blank"
                                rel="noopener noreferrer nofollow"
                                className="block w-full text-center py-2 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
                            >
                                Google&apos;da Tüm Yorumları Gör →
                            </a>
                        </div>
                    </motion.div>
                ) : (
                    <motion.button
                        key="collapsed"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        onClick={() => setIsExpanded(true)}
                        className="bg-white rounded-2xl shadow-lg border border-neutral-200 p-4 hover:shadow-xl transition-shadow cursor-pointer"
                    >
                        <div className="flex items-center gap-3">
                            {/* Google Logo */}
                            <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                            </div>

                            {/* Rating */}
                            <div>
                                <div className="flex items-center gap-1">
                                    <span className="font-bold text-neutral-900">4.9</span>
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                </div>
                                <p className="text-xs text-neutral-500">127 yorum</p>
                            </div>
                        </div>

                        {/* Current Review Preview */}
                        <motion.div
                            key={currentReview}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-3 pt-3 border-t border-neutral-100"
                        >
                            <p className="text-sm text-neutral-600 line-clamp-2">
                                &ldquo;{reviews[currentReview].text}&rdquo;
                            </p>
                            <p className="text-xs text-neutral-400 mt-1">
                                - {reviews[currentReview].author}
                            </p>
                        </motion.div>
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
}
