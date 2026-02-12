/**
 * Pet Screen Highlight Component
 * High-priority section for cat/pet fly screens
 * High margin product with maximum conversion focus
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import OptimizedImage from '@/components/ui/OptimizedImage';
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
            icon: 'shield',
            title: 'TuffScreen Teknolojisi',
            description: 'Vinil kaplı polyester ve çelik takviye ile 7x daha dayanıklı',
        },
        {
            icon: 'lock',
            title: 'Pet-Proof Emniyet Kilidi',
            description: 'Hayvanların açamayacağı, insanların tek elle açabileceği kilit',
        },
        {
            icon: 'strength',
            title: '25kg Basınç Dayanımı',
            description: 'Kedilerin atlamasına ve köpeklerin yaslanmasına karşı test edildi',
        },
        {
            icon: 'bolt',
            title: 'Güçlendirilmiş Çerçeve',
            description: 'Köşe takviye plakası ve kalın profil ile ekstra güç',
        },
    ];

    const safetyIconMap: Record<string, React.ReactNode> = {
        shield: <svg className="w-7 h-7 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
        lock: <svg className="w-7 h-7 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
        strength: <svg className="w-7 h-7 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
        bolt: <svg className="w-7 h-7 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    };

    return (
        <div className="relative">
            {/* Badge */}
            <div className="flex justify-center mb-8">
                <span className="inline-flex items-center px-4 py-2 bg-amber-500 text-white rounded-full font-semibold text-sm shadow-lg">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
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
                        <OptimizedImage
                            src={system.image}
                            alt={`${system.name} - Evcil Hayvan Güvenli Sineklik Sistemi`}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-contain p-8"
                            loading="lazy"
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
                            <svg className="w-6 h-6 text-amber-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg>
                            <span className="text-sm text-gray-700">Kedi Güvenli</span>
                        </div>
                        <div className="flex items-center px-4 py-2 bg-white rounded-lg shadow">
                            <svg className="w-6 h-6 text-amber-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                            <span className="text-sm text-gray-700">Köpek Güvenli</span>
                        </div>
                        <div className="flex items-center px-4 py-2 bg-white rounded-lg shadow">
                            <svg className="w-6 h-6 text-amber-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                            <span className="text-sm text-gray-700">Çocuk Güvenli</span>
                        </div>
                    </div>
                </motion.div>

                {/* Right: Content */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 id="kedi-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        {system.name}
                    </h2>
                    <p className="text-xl text-amber-600 font-semibold mb-4">{system.tagline}</p>
                    <p className="text-gray-700 mb-6">{system.description}</p>

                    {/* Tab Navigation */}
                    <div className="flex border-b border-gray-200 mb-6" role="tablist" aria-label="Ürün bilgi sekmeleri">
                        {[
                            { id: 'features', label: 'Özellikler' },
                            { id: 'safety', label: 'Güvenlik' },
                            { id: 'faq', label: 'Sık Sorulan' },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as 'features' | 'safety' | 'faq')}
                                role="tab"
                                aria-selected={activeTab === tab.id}
                                aria-controls={`tabpanel-${tab.id}`}
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
                    <div className="min-h-[200px]" role="tabpanel" id={`tabpanel-${activeTab}`} aria-label={activeTab === 'features' ? 'Özellikler' : activeTab === 'safety' ? 'Güvenlik' : 'Sık Sorulan'}>
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
                                        <div className="mb-2">{safetyIconMap[feature.icon]}</div>
                                        <h4 className="font-semibold text-gray-900 mb-1">
                                            {feature.title}
                                        </h4>
                                        <p className="text-sm text-gray-600">{feature.description}</p>
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
                                                className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform"
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
                            className="inline-flex items-center px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition-colors shadow-lg hover:shadow-amber-500/25"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                            Detaylı Bilgi
                        </Link>
                        <Link
                            href="/iletisim"
                            className="inline-flex items-center px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-semibold rounded-xl transition-colors"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            Bize Ulaşın
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Bottom Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="bg-white rounded-xl p-6 shadow-lg border-t-4 border-amber-500">
                    <div className="mb-3"><svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" /></svg></div>
                    <h3 className="font-bold text-gray-900 mb-2">Pencere Tipi</h3>
                    <p className="text-sm text-gray-700">
                        Sabit çerçeve + menteşeli kapak. Kolay sökülebilir yapı, temizlik için pratik.
                    </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border-t-4 border-amber-500">
                    <div className="mb-3"><svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" /></svg></div>
                    <h3 className="font-bold text-gray-900 mb-2">Kapı Tipi</h3>
                    <p className="text-sm text-gray-700">
                        Menteşeli kapı sistemi + otomatik kapanma. Eşikli veya eşiksiz montaj.
                    </p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg border-t-4 border-amber-500">
                    <div className="mb-3"><svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg></div>
                    <h3 className="font-bold text-gray-900 mb-2">Balkon Tipi</h3>
                    <p className="text-sm text-gray-700">
                        Geniş açıklıklar için çift kanat seçeneği. Cam balkon sistemleriyle tam uyum.
                    </p>
                </div>
            </div>
        </div>
    );
}
