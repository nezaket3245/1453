/**
 * Sineklik Testimonials Component
 * Customer reviews specific to fly screen products
 * High-conversion social proof section
 */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Testimonial {
    id: number;
    name: string;
    location: string;
    product: string;
    rating: number;
    text: string;
    highlight: string;
    date: string;
    avatar: string;
    verified: boolean;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: 'Ayşe K.',
        location: 'Beylikdüzü, Yakuplu',
        product: 'Kedi Sinekliği',
        rating: 5,
        text: 'Kedimiz Pamuk sürekli balkona çıkmak istiyordu, çok korkuyordum. TuffScreen sineklik taktırdık, artık balkonu güvenle açık bırakabiliyorum. Pamuk tırmalamaya çalıştı ama hiç zarar vermedi. Harika!',
        highlight: 'Kedim artık güvende',
        date: '2 hafta önce',
        avatar: '👩',
        verified: true,
    },
    {
        id: 2,
        name: 'Mehmet A.',
        location: 'Büyükçekmece, Beykent',
        product: 'Plise Sineklik',
        rating: 5,
        text: '3 balkon kapısına plise sineklik yaptırdık. Önceki sinekliklerimiz rüzgarda çok sallanıyordu, ip gerginlik sistemi bu sorunu tamamen çözmüş. Montaj ekibi çok profesyoneldi.',
        highlight: 'Rüzgarda sallanmıyor',
        date: '1 ay önce',
        avatar: '👨',
        verified: true,
    },
    {
        id: 3,
        name: 'Fatma S.',
        location: 'Esenyurt',
        product: 'Poll-tex Alerji Tülü',
        rating: 5,
        text: 'Oğlumun bahar alerjisi var, her yıl çok zorlanıyorduk. Poll-tex tül öneren Akçayapı ekibine teşekkürler. Bu ilkbahar ilk kez hapşırmadan geçti! Polen filtresi gerçekten işe yarıyor.',
        highlight: 'Alerji belirtileri azaldı',
        date: '3 hafta önce',
        avatar: '👩',
        verified: true,
    },
    {
        id: 4,
        name: 'Ali R.',
        location: 'Beylikdüzü, Gürpınar',
        product: 'Stor Sineklik',
        rating: 5,
        text: 'Mutfak penceresine stor sineklik taktırdım. Kullanmadığım zaman yukarıda toplanıyor, hiç yer kaplamıyor. Modern görünümü evin tarzına çok uydu. Fiyatı da uygundu.',
        highlight: 'Minimal ve şık',
        date: '2 ay önce',
        avatar: '👨',
        verified: true,
    },
    {
        id: 5,
        name: 'Zeynep B.',
        location: 'Avcılar',
        product: 'Menteşeli Kapı Sinekliği',
        rating: 5,
        text: 'Bahçe katında oturuyoruz, sinekler çok fazlaydı. Kapıya menteşeli sineklik taktırdık, hem hava alıyoruz hem de böcek girmiyor. Çocuklar da kolayca açıp kapatabiliyor.',
        highlight: 'Çocuklar kolayca kullanıyor',
        date: '1 hafta önce',
        avatar: '👩',
        verified: true,
    },
    {
        id: 6,
        name: 'Hüseyin D.',
        location: 'Beylikdüzü, Adnan Kahveci',
        product: 'Sürme Sineklik',
        rating: 4,
        text: '12. katta oturuyoruz, balkon camlarına sürme sineklik yaptırdık. Ekonomik bir çözüm oldu. Tek eleştirim montaj tarihini 2 gün ertelediler ama sonuç güzel.',
        highlight: 'Ekonomik çözüm',
        date: '1 ay önce',
        avatar: '👨',
        verified: true,
    },
];

export default function SineklikTestimonials() {
    const [filter, setFilter] = useState<string>('all');

    const products = ['all', 'Kedi Sinekliği', 'Plise Sineklik', 'Stor Sineklik', 'Menteşeli Kapı Sinekliği'];

    const filteredTestimonials = filter === 'all'
        ? testimonials
        : testimonials.filter((t) => t.product === filter);

    return (
        <div>
            <div className="text-center mb-10">
                <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium mb-4">
                    ⭐ Müşteri Yorumları
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Sineklik Müşterilerimiz Ne Diyor?
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Beylikdüzü ve çevresinde yüzlerce eve sineklik montajı yaptık. 
                    İşte müşterilerimizin yorumları.
                </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
                {products.map((product) => (
                    <button
                        key={product}
                        onClick={() => setFilter(product)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                            filter === product
                                ? 'bg-emerald-500 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                    >
                        {product === 'all' ? 'Tümü' : product}
                    </button>
                ))}
            </div>

            {/* Testimonials Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                    {filteredTestimonials.map((testimonial) => (
                        <motion.div
                            key={testimonial.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
                        >
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-2xl">
                                        {testimonial.avatar}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold text-gray-900">
                                                {testimonial.name}
                                            </span>
                                            {testimonial.verified && (
                                                <span className="text-emerald-500 text-sm" title="Doğrulanmış Müşteri">
                                                    ✓
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-500">{testimonial.location}</p>
                                    </div>
                                </div>
                                <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full">
                                    {testimonial.product}
                                </span>
                            </div>

                            {/* Rating */}
                            <div className="flex items-center gap-1 mb-3">
                                {Array.from({ length: 5 }).map((_, idx) => (
                                    <span
                                        key={idx}
                                        className={idx < testimonial.rating ? 'text-amber-400' : 'text-gray-300'}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>

                            {/* Highlight */}
                            <div className="bg-emerald-50 rounded-lg px-3 py-2 mb-4">
                                <p className="text-emerald-700 font-semibold text-sm">
                                    &quot;{testimonial.highlight}&quot;
                                </p>
                            </div>

                            {/* Text */}
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                {testimonial.text}
                            </p>

                            {/* Footer */}
                            <div className="text-xs text-gray-400">
                                {testimonial.date}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* CTA */}
            <div className="mt-10 text-center">
                <div className="inline-flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl text-white">
                    <div className="text-left">
                        <p className="font-bold text-lg">Siz de memnun müşterilerimiz arasına katılın!</p>
                        <p className="text-emerald-100 text-sm">Ücretsiz keşif için hemen arayın</p>
                    </div>
                    <a
                        href="tel:+902128801507"
                        className="px-6 py-3 bg-white text-emerald-600 font-bold rounded-xl hover:bg-emerald-50 transition-colors"
                    >
                        📞 Ara
                    </a>
                </div>
            </div>
        </div>
    );
}
