/**
 * Seasonal Guide Component
 * Shows which fly screen type is best for each season
 * Helps users understand year-round benefits
 */

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Season {
    id: string;
    name: string;
    icon: string;
    color: string;
    bgGradient: string;
    recommendations: {
        title: string;
        description: string;
        tip: string;
    }[];
    pests: string[];
    idealSystem: string;
}

function SeasonIcon({ name, className = 'w-6 h-6' }: { name: string; className?: string }) {
    const icons: Record<string, React.ReactNode> = {
        spring: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
        summer: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
        autumn: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>,
        winter: <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>,
    };
    return <>{icons[name] || null}</>;
}

const seasons: Season[] = [
    {
        id: 'spring',
        name: 'İlkbahar',
        icon: 'spring',
        color: 'text-pink-600',
        bgGradient: 'from-pink-50 to-rose-50',
        recommendations: [
            {
                title: 'Polen Mevsimi Başlıyor',
                description: 'İlkbaharda artan polen oranı, alerji hastalarını olumsuz etkiler.',
                tip: 'Poll-tex® anti-alerjik tül ile polenlerin %99\'unu filtreleyin.',
            },
            {
                title: 'İlk Sinekler Beliriyor',
                description: 'Mart ayından itibaren karasinekler aktifleşir.',
                tip: 'Erken montaj yaparak yaz öncesi hazır olun.',
            },
        ],
        pests: ['Karasinek', 'Arı', 'Kelebek'],
        idealSystem: 'Plise veya Stor Sineklik',
    },
    {
        id: 'summer',
        name: 'Yaz',
        icon: 'summer',
        color: 'text-amber-600',
        bgGradient: 'from-amber-50 to-yellow-50',
        recommendations: [
            {
                title: 'Sivrisinek Yoğunluğu',
                description: 'Haziran-Ağustos arası sivrisinek popülasyonu zirve yapar.',
                tip: 'Sık dokulu fiberglass tül tercih edin (18x16 mesh).',
            },
            {
                title: 'Havalandırma İhtiyacı',
                description: 'Sıcak gecelerde pencereler açık kalır.',
                tip: 'Geniş açıklıklar için plise sineklik ideal.',
            },
            {
                title: 'Kedi Güvenliği',
                description: 'Kediler açık pencerelere atlamak ister.',
                tip: 'Yüksek katlarda TuffScreen kedi sinekliği şart!',
            },
        ],
        pests: ['Sivrisinek', 'Karasinek', 'Güve', 'Arı', 'Eşek Arısı'],
        idealSystem: 'Kedi Sinekliği + Plise',
    },
    {
        id: 'autumn',
        name: 'Sonbahar',
        icon: 'autumn',
        color: 'text-orange-600',
        bgGradient: 'from-orange-50 to-amber-50',
        recommendations: [
            {
                title: 'Son Sivrisinekler',
                description: 'Eylül-Ekim arası sivrisinekler son kez aktifleşir.',
                tip: 'Sinekliğinizi sökmeden önce Kasım\'ı bekleyin.',
            },
            {
                title: 'Yaprak ve Toz',
                description: 'Rüzgarla gelen yaprak parçacıkları ve toz artar.',
                tip: 'Nano-Clear® anti-toz tül ile daha az temizlik.',
            },
        ],
        pests: ['Sivrisinek', 'Örümcek', 'Uğur Böceği'],
        idealSystem: 'Nano-Clear® Tüllü Sistem',
    },
    {
        id: 'winter',
        name: 'Kış',
        icon: 'winter',
        color: 'text-blue-600',
        bgGradient: 'from-blue-50 to-cyan-50',
        recommendations: [
            {
                title: 'Bakım Zamanı',
                description: 'Kış aylarında sineklik kullanımı azalır.',
                tip: 'Plise sineklikleri kapatıp depolayabilirsiniz.',
            },
            {
                title: 'Montaj Planlaması',
                description: 'Bahar öncesi kampanyalar başlar.',
                tip: 'Şubat-Mart arası montaj randevusu alın.',
            },
            {
                title: 'Güneş Işığı',
                description: 'Kısa günlerde maksimum ışık gerekli.',
                tip: 'Siyah premium tül %30 daha fazla ışık geçirir.',
            },
        ],
        pests: [],
        idealSystem: 'Bakım ve Planlama Dönemi',
    },
];

export default function SeasonalGuide() {
    const [activeSeason, setActiveSeason] = useState('summer');

    const currentSeason = seasons.find((s) => s.id === activeSeason)!;

    return (
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            {/* Season Tabs */}
            <div className="flex border-b border-gray-100">
                {seasons.map((season) => (
                    <button
                        key={season.id}
                        onClick={() => setActiveSeason(season.id)}
                        className={`flex-1 py-4 px-4 flex flex-col items-center gap-1 transition-colors ${
                            activeSeason === season.id
                                ? `bg-gradient-to-b ${season.bgGradient} ${season.color} font-bold`
                                : 'bg-white text-gray-500 hover:bg-gray-50'
                        }`}
                    >
                        <span className="text-2xl"><SeasonIcon name={season.id} /></span>
                        <span className="text-sm">{season.name}</span>
                    </button>
                ))}
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeSeason}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`p-6 bg-gradient-to-br ${currentSeason.bgGradient}`}
                >
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Recommendations */}
                        <div className="space-y-4">
                            <h3 className={`text-lg font-bold ${currentSeason.color} flex items-center gap-2`}>
                                <SeasonIcon name={currentSeason.id} className="w-5 h-5" /> {currentSeason.name} Tavsiyeleri
                            </h3>
                            {currentSeason.recommendations.map((rec, idx) => (
                                <div
                                    key={idx}
                                    className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm"
                                >
                                    <h4 className="font-semibold text-gray-900 mb-1">{rec.title}</h4>
                                    <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                                    <div className="flex items-start gap-2 text-sm">
                                        <svg className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                                        <span className="text-emerald-700 font-medium">{rec.tip}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Side Info */}
                        <div className="space-y-4">
                            {/* Pests */}
                            {currentSeason.pests.length > 0 && (
                                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm">
                                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
                                        Bu Mevsim Dikkat Edilecek Böcekler
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {currentSeason.pests.map((pest, idx) => (
                                            <span
                                                key={idx}
                                                className="px-3 py-1 bg-red-100 text-red-700 text-sm rounded-full"
                                            >
                                                {pest}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Ideal System */}
                            <div className="bg-emerald-500 text-white rounded-xl p-4 shadow-lg">
                                <h4 className="font-semibold mb-2 flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    Önerilen Sistem
                                </h4>
                                <p className="text-emerald-100 text-lg font-bold">
                                    {currentSeason.idealSystem}
                                </p>
                            </div>

                            {/* Quick Stat */}
                            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm text-center">
                                <p className="text-4xl font-black text-gray-900 mb-1">
                                    {activeSeason === 'summer' ? '70%' : activeSeason === 'spring' ? '40%' : activeSeason === 'autumn' ? '30%' : '5%'}
                                </p>
                                <p className="text-sm text-gray-600">
                                    Yıllık sineklik satışlarının bu mevsime düşen oranı
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
