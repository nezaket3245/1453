'use client';

import { useState } from 'react';

/**
 * Glass Safety Comparison Component
 * Interactive comparison between Tempered vs Laminated glass
 * SEO: Targets "8mm mi 10mm mi", "temperli cam mı lamine cam mı güvenli" keywords
 */

interface GlassType {
    id: string;
    name: string;
    thickness: string;
    safety: number; // 1-5 scale
    thermal: number;
    sound: number;
    price: number;
    breakPattern: string;
    idealFor: string[];
    description: string;
}

const glassComparison: GlassType[] = [
    {
        id: 'tempered-8mm',
        name: '8mm Temperli Cam',
        thickness: '8mm',
        safety: 3,
        thermal: 2,
        sound: 2,
        price: 1,
        breakPattern: 'Küçük, küt kenarlı parçalara ayrılır',
        idealFor: ['Alt katlar', 'Kapalı balkonlar', 'Bütçe odaklı projeler'],
        description: 'Standart güvenlik camı. Normal camdan 5 kat daha dayanıklı.',
    },
    {
        id: 'tempered-10mm',
        name: '10mm Temperli Cam',
        thickness: '10mm',
        safety: 4,
        thermal: 3,
        sound: 3,
        price: 2,
        breakPattern: 'Küçük, küt kenarlı parçalara ayrılır',
        idealFor: ['Yüksek katlar', 'Rüzgarlı bölgeler', 'Geniş panel açıklıkları'],
        description: 'Artırılmış dayanıklılık. Yüksek katlarda tercih edilir.',
    },
    {
        id: 'laminated-8-8',
        name: '8+8mm Lamine Cam',
        thickness: '16mm (8+0.76+8)',
        safety: 5,
        thermal: 4,
        sound: 4,
        price: 3,
        breakPattern: 'Kırılsa bile PVB film parçaları tutar, dağılmaz',
        idealFor: ['Çocuklu evler', 'Güvenlik öncelikli mekanlar', 'Ticari alanlar'],
        description: 'İki cam arasında PVB film. Kırıldığında parçalar yerinde kalır.',
    },
    {
        id: 'laminated-10-10',
        name: '10+10mm Lamine Cam',
        thickness: '20mm (10+0.76+10)',
        safety: 5,
        thermal: 4,
        sound: 5,
        price: 4,
        breakPattern: 'Kırılsa bile PVB film parçaları tutar, dağılmaz',
        idealFor: ['Mağaza vitrinleri', 'Kurşun geçirmez ihtiyaç', 'Maksimum güvenlik'],
        description: 'Premium güvenlik camı. Zorla girişe karşı maksimum koruma.',
    },
    {
        id: 'insulated-24mm',
        name: '24mm Isıcamlı Ünite',
        thickness: '24mm (4+16+4)',
        safety: 4,
        thermal: 5,
        sound: 4,
        price: 4,
        breakPattern: 'Dış cam kırılabilir, iç cam korumaya devam eder',
        idealFor: ['Kış bahçeleri', 'Enerji tasarrufu', 'Isıtmalı balkonlar'],
        description: 'Çift cam arası Argon gazlı. Üstün ısı yalıtımı.',
    },
];

// Rating bar component
function RatingBar({ value, maxValue = 5, color = 'primary' }: { value: number; maxValue?: number; color?: string }) {
    const colorClasses = {
        primary: 'bg-primary-500',
        green: 'bg-green-500',
        amber: 'bg-amber-500',
        red: 'bg-red-500',
    };

    return (
        <div className="flex gap-1">
            {[...Array(maxValue)].map((_, i) => (
                <div
                    key={i}
                    className={`h-2 w-6 rounded-full transition-colors ${i < value ? colorClasses[color as keyof typeof colorClasses] || colorClasses.primary : 'bg-neutral-200'
                        }`}
                />
            ))}
        </div>
    );
}

export function GlassSafetyComparison() {
    const [selectedGlass, setSelectedGlass] = useState<string | null>(null);

    return (
        <div className="w-full">
            {/* Header */}
            <div className="text-center mb-12">
                <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 text-xs font-bold rounded-full uppercase tracking-widest mb-4">
                    Teknik Karşılaştırma
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                    Temperli mi, Lamine mi?
                </h2>
                <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                    Projeniz için doğru cam seçimi güvenlik, ısı yalıtımı ve bütçe dengesinde kritik öneme sahiptir.
                </p>
            </div>

            {/* Comparison Table */}
            <div className="overflow-x-auto rounded-2xl border border-neutral-200 shadow-xl bg-white">
                <table className="w-full min-w-[900px]">
                    <thead>
                        <tr className="bg-neutral-900 text-white">
                            <th className="p-5 text-left font-bold">Cam Tipi</th>
                            <th className="p-5 text-center font-bold">Kalınlık</th>
                            <th className="p-5 text-center font-bold">
                                <div className="flex flex-col items-center gap-1">
                                    <span>🛡️ Güvenlik</span>
                                    <span className="text-[10px] font-normal opacity-60">Darbe dayanımı</span>
                                </div>
                            </th>
                            <th className="p-5 text-center font-bold">
                                <div className="flex flex-col items-center gap-1">
                                    <span>❄️ Isı Yalıtımı</span>
                                    <span className="text-[10px] font-normal opacity-60">Termal performans</span>
                                </div>
                            </th>
                            <th className="p-5 text-center font-bold">
                                <div className="flex flex-col items-center gap-1">
                                    <span>🔇 Ses Yalıtımı</span>
                                    <span className="text-[10px] font-normal opacity-60">Akustik performans</span>
                                </div>
                            </th>
                            <th className="p-5 text-center font-bold">
                                <div className="flex flex-col items-center gap-1">
                                    <span>� Fiyat</span>
                                    <span className="text-[10px] font-normal opacity-60">Fiyat için arayın</span>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                        {glassComparison.map((glass) => (
                            <tr
                                key={glass.id}
                                onClick={() => setSelectedGlass(selectedGlass === glass.id ? null : glass.id)}
                                className={`cursor-pointer transition-colors ${selectedGlass === glass.id
                                        ? 'bg-primary-50 border-l-4 border-l-primary-500'
                                        : 'hover:bg-neutral-50'
                                    }`}
                            >
                                <td className="p-5">
                                    <div className="font-bold text-neutral-900">{glass.name}</div>
                                    <div className="text-sm text-neutral-500 mt-1">{glass.description}</div>
                                </td>
                                <td className="p-5 text-center">
                                    <span className="px-3 py-1 bg-neutral-100 rounded-lg text-sm font-bold text-neutral-700">
                                        {glass.thickness}
                                    </span>
                                </td>
                                <td className="p-5">
                                    <div className="flex justify-center">
                                        <RatingBar value={glass.safety} color="green" />
                                    </div>
                                </td>
                                <td className="p-5">
                                    <div className="flex justify-center">
                                        <RatingBar value={glass.thermal} color="primary" />
                                    </div>
                                </td>
                                <td className="p-5">
                                    <div className="flex justify-center">
                                        <RatingBar value={glass.sound} color="amber" />
                                    </div>
                                </td>
                                <td className="p-5">
                                    <div className="flex justify-center">
                                        <span className="text-sm text-amber-600 font-medium">Fiyat İçin Arayın</span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Selected Glass Details */}
            {selectedGlass && (
                <div className="mt-8 p-8 bg-primary-50 rounded-2xl border border-primary-200 animate-fade-in">
                    {(() => {
                        const glass = glassComparison.find(g => g.id === selectedGlass);
                        if (!glass) return null;
                        return (
                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-xl font-bold text-neutral-900 mb-4">{glass.name}</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-sm font-bold text-neutral-500 uppercase mb-1">Kırılma Davranışı</p>
                                            <p className="text-neutral-700">{glass.breakPattern}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-neutral-500 uppercase mb-1">Açıklama</p>
                                            <p className="text-neutral-700">{glass.description}</p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-neutral-500 uppercase mb-3">İdeal Kullanım Alanları</p>
                                    <div className="flex flex-wrap gap-2">
                                        {glass.idealFor.map((item, i) => (
                                            <span
                                                key={i}
                                                className="px-4 py-2 bg-white rounded-full text-sm font-medium text-primary-700 border border-primary-200"
                                            >
                                                ✓ {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })()}
                </div>
            )}

            {/* Safety Info Box */}
            <div className="mt-8 p-6 bg-green-50 rounded-2xl border border-green-200">
                <div className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-700 rounded-xl flex items-center justify-center text-white text-2xl">
                        ✓
                    </div>
                    <div>
                        <h4 className="font-bold text-green-900 mb-2">Tüm Camlarımız Şişecam & Türk Standartlarına Uygun</h4>
                        <p className="text-green-800 text-sm">
                            Kullandığımız tüm camlar TS EN 12150 (Temperli) ve TS EN ISO 12543 (Lamine) standartlarına uygundur.
                            Her projede orijinal Şişecam ürünleri kullanılır ve sertifika belgesi teslim edilir.
                        </p>
                    </div>
                </div>
            </div>

            {/* Legend */}
            <div className="mt-6 p-4 bg-neutral-50 rounded-xl">
                <p className="text-sm text-neutral-500 text-center">
                    <strong>Puanlama:</strong> 1 bar = Düşük | 5 bar = Mükemmel | Satıra tıklayarak detayları görüntüleyebilirsiniz
                </p>
            </div>
        </div>
    );
}
