/**
 * Sineklik Testimonials Component
 * Customer reviews specific to fly screen products
 * High-conversion social proof section
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
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
        avatar: 'AK',
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
        avatar: 'MA',
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
        avatar: 'FS',
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
        avatar: 'AR',
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
        avatar: 'ZB',
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
        avatar: 'HD',
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
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium mb-4">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    Müşteri Yorumları
                </span>
                <h2 id="testimonials-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Sineklik Müşterilerimiz Ne Diyor?
                </h2>
                <p className="text-gray-700 max-w-2xl mx-auto">
                    Beylikdüzü ve çevresinde yüzlerce eve sineklik montajı yaptık. 
                    İşte müşterilerimizin yorumları.
                </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-8" role="group" aria-label="Ürüne göre filtrele">
                {products.map((product) => (
                    <button
                        key={product}
                        onClick={() => setFilter(product)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
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
                                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-sm font-bold text-emerald-700">
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
                                        <p className="text-sm text-gray-600">{testimonial.location}</p>
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
                            <div className="text-xs text-neutral-600">
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
                        <p className="text-emerald-100 text-sm">Detaylı bilgi için bize ulaşın</p>
                    </div>
                    <Link
                        href="/iletisim"
                        className="px-6 py-3 bg-white text-emerald-600 font-bold rounded-xl hover:bg-emerald-50 transition-colors"
                    >
                        İletişim
                    </Link>
                </div>
            </div>
        </div>
    );
}
