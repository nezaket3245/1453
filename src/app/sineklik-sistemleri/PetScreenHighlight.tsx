/**
 * Pet Screen Highlight Component
 * High-priority section for cat/pet fly screens
 * High margin product with maximum conversion focus
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { SineklikSystem } from '@/lib/sineklikData';

interface PetScreenHighlightProps {
    system: SineklikSystem;
}

export default function PetScreenHighlight({ system }: PetScreenHighlightProps) {
    const [activeTab, setActiveTab] = useState<'features' | 'safety' | 'faq'>('features');

    if (!system) return null;

    const safetyFeatures = [
        {
            icon: '🛡️',
            title: 'TuffScreen Teknolojisi',
            description: 'Vinil kaplı polyester ve çelik takviye ile 7x daha dayanıklı',
        },
        {
            icon: '🔒',
            title: 'Pet-Proof Emniyet Kilidi',
            description: 'Hayvanların açamayacağı, insanların tek elle açabileceği kilit',
        },
        {
            icon: '💪',
            title: '25kg Basınç Dayanımı',
            description: 'Kedilerin atlamasına ve köpeklerin yaslanmasına karşı test edildi',
        },
        {
            icon: '🔩',
            title: 'Güçlendirilmiş Çerçeve',
            description: 'Köşe takviye plakası ve kalın profil ile ekstra güç',
        },
    ];

    return (
        <div className="relative">
            {/* Badge */}
            <div className="flex justify-center mb-8">
                <span className="inline-flex items-center px-4 py-2 bg-amber-500 text-white rounded-full font-semibold text-sm shadow-lg">
                    <span className="mr-2">🐱</span>
                    Evcil Hayvan Sahiplerine Özel
                </span>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left: Product Image & Visual */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    <div className="relative h-[500px] bg-gradient-to-br from-amber-100 to-orange-100 rounded-3xl overflow-hidden shadow-2xl">
                        <Image
                            src={system.image}
                            alt={system.name}
                            fill
                            className="object-contain p-8"
                        />
                        {/* Durability Badge */}
                        <div className="absolute top-4 left-4 px-4 py-2 bg-red-500 text-white rounded-xl font-bold">
                            7x Daha Dayanıklı
                        </div>
                        {/* Warranty Badge */}
                        <div className="absolute bottom-4 right-4 px-4 py-2 bg-white/90 text-amber-700 rounded-xl font-semibold shadow-lg">
                            {system.warranty}
                        </div>
                    </div>

                    {/* Trust Badges */}
                    <div className="flex justify-center gap-4 mt-6">
                        <div className="flex items-center px-4 py-2 bg-white rounded-lg shadow">
                            <span className="text-2xl mr-2">🐈</span>
                            <span className="text-sm text-gray-600">Kedi Güvenli</span>
                        </div>
                        <div className="flex items-center px-4 py-2 bg-white rounded-lg shadow">
                            <span className="text-2xl mr-2">🐕</span>
                            <span className="text-sm text-gray-600">Köpek Güvenli</span>
                        </div>
                        <div className="flex items-center px-4 py-2 bg-white rounded-lg shadow">
                            <span className="text-2xl mr-2">👶</span>
                            <span className="text-sm text-gray-600">Çocuk Güvenli</span>
                        </div>
                    </div>
                </motion.div>

                {/* Right: Content */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        {system.name}
                    </h2>
                    <p className="text-xl text-amber-600 font-semibold mb-4">{system.tagline}</p>
                    <p className="text-gray-600 mb-6">{system.description}</p>

                    {/* Tab Navigation */}
                    <div className="flex border-b border-gray-200 mb-6">
                        {[
                            { id: 'features', label: 'Özellikler' },
                            { id: 'safety', label: 'Güvenlik' },
                            { id: 'faq', label: 'Sık Sorulan' },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`px-4 py-3 font-medium text-sm transition-colors ${
                                    activeTab === tab.id
                                        ? 'text-amber-600 border-b-2 border-amber-500'
                                        : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="min-h-[200px]">
                        {activeTab === 'features' && (
                            <div className="space-y-3">
                                {system.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-center">
                                        <span className="w-6 h-6 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mr-3 text-sm">
                                            ✓
                                        </span>
                                        <span className="text-gray-700">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'safety' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {safetyFeatures.map((feature, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-white rounded-xl p-4 shadow-sm"
                                    >
                                        <div className="text-2xl mb-2">{feature.icon}</div>
                                        <h4 className="font-semibold text-gray-900 mb-1">
                                            {feature.title}
                                        </h4>
                                        <p className="text-sm text-gray-500">{feature.description}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'faq' && (
                            <div className="space-y-4">
                                {system.faq.map((item, idx) => (
                                    <details
                                        key={idx}
                                        className="bg-white rounded-xl shadow-sm overflow-hidden group"
                                    >
                                        <summary className="px-4 py-3 cursor-pointer font-medium text-gray-900 hover:bg-amber-50 flex justify-between items-center">
                                            {item.question}
                                            <svg
                                                className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M19 9l-7 7-7-7"
                                                />
                                            </svg>
                                        </summary>
                                        <div className="px-4 pb-4 text-gray-600 text-sm">
                                            {item.answer}
                                        </div>
                                    </details>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap gap-4 mt-8">
                        <Link
                            href={`/sineklik-sistemleri/${system.slug}`}
                            className="inline-flex items-center px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-amber-500/25"
                        >
                            <span className="mr-2">📋</span>
                            Detaylı Bilgi
                        </Link>
                        <Link
                            href="/teklif-al"
                            className="inline-flex items-center px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl transition-all"
                        >
                            <span className="mr-2">💰</span>
                            Fiyat Teklifi Al
                        </Link>
                        <a
                            href="https://wa.me/905320000000?text=Kedi%20sinekli%C4%9Fi%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-all"
                        >
                            <span className="mr-2">📱</span>
                            WhatsApp
                        </a>
                    </div>
                </motion.div>
            </div>

            {/* Bottom Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="bg-white rounded-xl p-6 shadow-lg border-t-4 border-amber-500">
                    <div className="text-3xl mb-3">🪟</div>
                    <h3 className="font-bold text-gray-900 mb-2">Pencere Tipi</h3>
                    <p className="text-sm text-gray-600">
                        Sabit çerçeve + menteşeli kapak. Kolay sökülebilir yapı, temizlik için pratik.
                    </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border-t-4 border-amber-500">
                    <div className="text-3xl mb-3">🚪</div>
                    <h3 className="font-bold text-gray-900 mb-2">Kapı Tipi</h3>
                    <p className="text-sm text-gray-600">
                        Menteşeli kapı sistemi + otomatik kapanma. Eşikli veya eşiksiz montaj.
                    </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border-t-4 border-amber-500">
                    <div className="text-3xl mb-3">🏠</div>
                    <h3 className="font-bold text-gray-900 mb-2">Balkon Tipi</h3>
                    <p className="text-sm text-gray-600">
                        Geniş açıklıklar için çift kanat seçeneği. Cam balkon sistemleriyle tam uyum.
                    </p>
                </div>
            </div>
        </div>
    );
}
