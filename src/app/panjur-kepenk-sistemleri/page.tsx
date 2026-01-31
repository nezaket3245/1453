/**
 * Panjur & Kepenk Systems Main Page
 * SEO: Motorlu panjur, Somfy akıllı panjur, ticari kepenk
 * Features: Energy simulator, smart home ecosystem, motor comparison
 */

import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
    panjurSystems,
    lamelLibrary,
    motorLibrary,
    somfyEcosystem,
    energyEfficiencyData,
    panjurSeoKeywords,
} from '@/lib/panjurData';
import { CTASection } from '@/components/sections/CTASection';
import { businessConfig } from '@/config/business.config';

// SEO Metadata
export const metadata: Metadata = {
    title: 'Motorlu Panjur & Kepenk Sistemleri | Somfy | Akıllı Ev | Beylikdüzü',
    description:
        'Somfy motorlu panjur, TaHoma akıllı ev entegrasyonu, ticari kepenk sistemleri. %35 enerji tasarrufu, Alexa/Google Home uyumlu. Beylikdüzü ücretsiz keşif.',
    keywords: [...panjurSeoKeywords.primary, ...panjurSeoKeywords.technical].join(', '),
    openGraph: {
        title: 'Panjur & Kepenk Sistemleri | Egepen Akçayapı',
        description: 'Somfy motorlu panjur ve ticari kepenk çözümleri. Akıllı ev uyumlu.',
        type: 'website',
        locale: 'tr_TR',
    },
    alternates: {
        canonical: 'https://www.egepenakcayapi.com.tr/panjur-kepenk-sistemleri',
    },
};

// JSON-LD Schema
const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Panjur ve Kepenk Montajı',
    description: 'Motorlu panjur, akıllı panjur ve ticari kepenk sistemleri montajı.',
    provider: {
        '@type': 'LocalBusiness',
        name: 'Egepen Akçayapı',
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Beylikdüzü',
            addressRegion: 'İstanbul',
            addressCountry: 'TR',
        },
    },
    areaServed: { '@type': 'City', name: 'İstanbul' },
};

// Category cards
const categories = [
    {
        id: 'panjur-pvc',
        title: 'Egepen Storbox',
        description: 'Monoblok (Pencere Üstü) sistemler',
        icon: '🍱',
        color: 'from-indigo-500 to-blue-600',
        highlight: 'Egepen Kalitesi',
    },
    {
        id: 'panjur-aluminyum',
        title: 'Alüminyum Panjur',
        description: 'Somfy motorlu, akıllı ev uyumlu',
        icon: '🏠',
        color: 'from-blue-500 to-indigo-600',
        highlight: 'Premium',
    },
    {
        id: 'kepenk-ticari',
        title: 'Ticari Kepenk',
        description: 'Mağaza, dükkan, showroom',
        icon: '🏪',
        color: 'from-gray-600 to-slate-800',
        highlight: 'Ekonomik',
    },
    {
        id: 'kepenk-endustriyel',
        title: 'Endüstriyel Kapı',
        description: 'Fabrika, depo, lojistik',
        icon: '🏭',
        color: 'from-orange-500 to-red-600',
        highlight: 'Heavy Duty',
    },
];

export default function PanjurKepenkPage() {
    const pvcPanjur = panjurSystems.filter((s) => s.category === 'panjur-pvc');
    const aluminiumPanjur = panjurSystems.filter((s) => s.category === 'panjur-aluminyum');
    const ticariKepenk = panjurSystems.filter((s) => s.category === 'kepenk-ticari');
    const endustriyelKepenk = panjurSystems.filter((s) => s.category === 'kepenk-endustriyel');

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />

            <main className="min-h-screen bg-white">
                {/* Hero Section */}
                <section className="relative bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 py-20 lg:py-28 overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                        <Image
                            src="/images/cam-balkon/cam-balkon-bahce-manzara.jpg"
                            alt="Panjur ve Kepenk Sistemleri"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <div className="absolute inset-0 bg-grid-white/5" />

                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-4xl mx-auto text-center">
                            <span className="inline-block px-4 py-2 bg-indigo-500/20 text-indigo-300 rounded-full text-sm font-medium mb-6">
                                🏠 Akıllı Ev Uyumlu Sistemler
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                                Panjur & Kepenk
                                <span className="text-indigo-400"> Sistemleri</span>
                            </h1>
                            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                                <strong className="text-indigo-300">Somfy motorlu panjur</strong> ile akıllı ev kontrolü.
                                <strong className="text-indigo-300"> %35 enerji tasarrufu</strong>.
                                Ticari ve endüstriyel <strong className="text-indigo-300">kepenk çözümleri</strong>.
                            </p>

                            <div className="flex flex-wrap justify-center gap-4 mb-12">
                                <Link
                                    href="/teklif-al"
                                    className="inline-flex items-center px-8 py-4 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-xl transition-all shadow-lg"
                                >
                                    <span className="mr-2">📐</span>
                                    Ücretsiz Keşif Al
                                </Link>
                                <a
                                    href={`tel:${businessConfig.contact.mobileRaw}`}
                                    className="inline-flex items-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all border border-white/20"
                                >
                                    <span className="mr-2">📞</span>
                                    {businessConfig.contact.mobile}
                                </a>
                            </div>

                            {/* Trust badges */}
                            <div className="flex flex-wrap justify-center items-center gap-6 text-gray-400 text-sm">
                                <span className="flex items-center gap-2">
                                    <span className="text-green-400">✓</span> Somfy Yetkili Bayi
                                </span>
                                <span className="flex items-center gap-2">
                                    <span className="text-green-400">✓</span> 5 Yıl Motor Garantisi
                                </span>
                                <span className="flex items-center gap-2">
                                    <span className="text-green-400">✓</span> Alexa/Google Uyumlu
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Category Navigation */}
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {categories.map((cat) => (
                                <a
                                    key={cat.id}
                                    href={`#${cat.id}`}
                                    className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all overflow-hidden"
                                >
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-5 transition-opacity`}
                                    />
                                    <div className="relative">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="text-4xl">{cat.icon}</div>
                                            <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-medium rounded-full">
                                                {cat.highlight}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">{cat.title}</h3>
                                        <p className="text-sm text-gray-500">{cat.description}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Energy Efficiency Section */}
                <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4">
                                💡 Enerji Tasarrufu
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Köpük Dolgulu Panjur ile Tasarruf
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Polyüretan köpük dolgulu lameller ile yaz ve kış aylarında ciddi enerji tasarrufu
                            </p>
                        </div>

                        <div className="max-w-4xl mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* Without Shutter */}
                                <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
                                    <div className="text-4xl mb-4">🏠</div>
                                    <h4 className="font-bold text-gray-900 mb-2">Panjursuz</h4>
                                    <div className="space-y-2">
                                        <div className="text-sm text-gray-500">Yaz Soğutma: Baz değer</div>
                                        <div className="text-sm text-gray-500">Kış Isıtma: Baz değer</div>
                                    </div>
                                </div>

                                {/* Standard Shutter */}
                                <div className="bg-white rounded-2xl p-6 text-center shadow-sm border-2 border-green-200">
                                    <div className="text-4xl mb-4">🟢</div>
                                    <h4 className="font-bold text-gray-900 mb-2">Standart Alüminyum</h4>
                                    <div className="space-y-2">
                                        <div className="text-sm">
                                            <span className="text-green-600 font-bold">%30</span>{' '}
                                            <span className="text-gray-500">Yaz Soğutma Tasarrufu</span>
                                        </div>
                                        <div className="text-sm">
                                            <span className="text-green-600 font-bold">%20</span>{' '}
                                            <span className="text-gray-500">Kış Isıtma Tasarrufu</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Foam Filled */}
                                <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-center text-white shadow-lg">
                                    <div className="text-4xl mb-4">⭐</div>
                                    <h4 className="font-bold mb-2">Köpük Dolgulu</h4>
                                    <div className="space-y-2">
                                        <div className="text-sm">
                                            <span className="font-bold text-2xl">%45</span>{' '}
                                            <span className="text-green-100">Yaz Soğutma</span>
                                        </div>
                                        <div className="text-sm">
                                            <span className="font-bold text-2xl">%35</span>{' '}
                                            <span className="text-green-100">Kış Isıtma</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <p className="text-center text-gray-500 text-sm mt-8">
                                * Hesaplamalar EN ISO 10077-1 standardına göre yapılmıştır
                            </p>
                        </div>
                    </div>
                </section>

                {/* Somfy Ecosystem Section */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
                                🏠 Akıllı Ev
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Somfy Akıllı Ev Ekosistemi
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                TaHoma ile tüm panjurlarınızı tek noktadan kontrol edin
                            </p>
                        </div>

                        <div className="max-w-5xl mx-auto">
                            {/* Hub */}
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 mb-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                            {somfyEcosystem.hub.name}
                                        </h3>
                                        <p className="text-gray-600 mb-6">{somfyEcosystem.hub.description}</p>
                                        <div className="grid grid-cols-2 gap-3">
                                            {somfyEcosystem.hub.features.map((feature, idx) => (
                                                <div key={idx} className="flex items-center text-sm text-gray-700">
                                                    <span className="text-blue-500 mr-2">✓</span>
                                                    {feature}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-8xl">📱</div>
                                    </div>
                                </div>
                            </div>

                            {/* Voice Control */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                {somfyEcosystem.voiceControl.map((vc, idx) => (
                                    <div key={idx} className="bg-gray-50 rounded-xl p-6 text-center">
                                        <div className="text-3xl mb-3">
                                            {vc.includes('Alexa') ? '🔵' : vc.includes('Google') ? '🟢' : '⚪'}
                                        </div>
                                        <h4 className="font-bold text-gray-900">{vc}</h4>
                                        <p className="text-sm text-gray-500 mt-2">Sesli Kontrol</p>
                                    </div>
                                ))}
                            </div>

                            {/* Scenarios */}
                            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white">
                                <h4 className="text-xl font-bold mb-6 text-center">Hazır Senaryolar</h4>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {somfyEcosystem.scenarios.map((scenario, idx) => (
                                        <div key={idx} className="bg-white/10 rounded-xl p-4 text-center backdrop-blur">
                                            <div className="text-2xl mb-2">
                                                {idx === 0 ? '🌅' : idx === 1 ? '🌆' : idx === 2 ? '✈️' : '🎬'}
                                            </div>
                                            <h5 className="font-semibold text-sm mb-1">{scenario.name}</h5>
                                            <p className="text-xs text-white/70">{scenario.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Egepen Storbox PVC Panjur Section */}
                <section id="panjur-pvc" className="py-20 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-4">
                                🍱 Egepen Deceuninck
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Storbox Monoblok Panjur
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Pencere ile bütünleşik, yüksek yalıtımlı ve estetik PVC panjur çözümleri.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
                            {pvcPanjur.map((system) => (
                                <div
                                    key={system.id}
                                    className="bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100 group"
                                >
                                    <div className="grid md:grid-cols-2">
                                        <div className="relative h-64 md:h-auto bg-gray-100">
                                            <Image
                                                src={system.image}
                                                alt={system.name}
                                                fill
                                                className="object-contain p-8 group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="p-8">
                                            <div className="flex justify-between items-start mb-4">
                                                <h3 className="text-2xl font-bold text-gray-900">{system.name}</h3>
                                                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                                                    Egepen Resmi Ürün
                                                </span>
                                            </div>
                                            <p className="text-indigo-600 font-medium mb-4">{system.tagline}</p>
                                            <p className="text-gray-600 mb-6">{system.description}</p>

                                            <div className="grid grid-cols-2 gap-4 mb-6">
                                                {system.technicalSpecs.slice(0, 4).map((spec, sidx) => (
                                                    <div key={sidx} className="bg-gray-50 p-3 rounded-lg text-center">
                                                        <div className="text-xs text-gray-500 uppercase tracking-wider">{spec.label}</div>
                                                        <div className="font-bold text-gray-900">{spec.value}</div>
                                                    </div>
                                                ))}
                                            </div>

                                            <Link
                                                href={`/panjur-kepenk-sistemleri/${system.slug}`}
                                                className="inline-flex items-center justify-center w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-lg"
                                            >
                                                Detayları İncele
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Aluminium Panjur Section */}
                <section id="panjur-aluminyum" className="py-20 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
                                🏠 Konut Panjurları
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Alüminyum Panjur Sistemleri
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {aluminiumPanjur.map((system) => (
                                <div
                                    key={system.id}
                                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
                                >
                                    <div className="relative h-48 bg-gradient-to-br from-blue-600 to-indigo-700">
                                        <Image
                                            src={system.image}
                                            alt={system.name}
                                            fill
                                            className="object-contain p-6"
                                        />
                                        <div className="absolute top-4 right-4">
                                            <span className="px-3 py-1 bg-white/90 text-indigo-700 text-xs font-medium rounded-full">
                                                {system.warranty}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{system.name}</h3>
                                        <p className="text-indigo-600 text-sm font-medium mb-3">{system.tagline}</p>
                                        <p className="text-gray-600 text-sm mb-4">{system.description}</p>

                                        {/* Energy Efficiency */}
                                        {system.energyEfficiency && (
                                            <div className="flex gap-4 mb-4">
                                                <div className="flex-1 bg-green-50 rounded-lg p-3 text-center">
                                                    <div className="text-green-600 font-bold">
                                                        %{system.energyEfficiency.summerCooling}
                                                    </div>
                                                    <div className="text-xs text-gray-500">Yaz Tasarruf</div>
                                                </div>
                                                <div className="flex-1 bg-orange-50 rounded-lg p-3 text-center">
                                                    <div className="text-orange-600 font-bold">
                                                        %{system.energyEfficiency.winterHeating}
                                                    </div>
                                                    <div className="text-xs text-gray-500">Kış Tasarruf</div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Key specs */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {system.technicalSpecs
                                                .filter((s) => s.highlight)
                                                .slice(0, 3)
                                                .map((spec, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-lg"
                                                    >
                                                        {spec.value}
                                                    </span>
                                                ))}
                                        </div>

                                        <Link
                                            href={`/panjur-kepenk-sistemleri/${system.slug}`}
                                            className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-700"
                                        >
                                            Detaylar ve Fiyat
                                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Motor Comparison */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mb-4">
                                ⚙️ Motor Seçenekleri
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Motor Karşılaştırma
                            </h2>
                        </div>

                        <div className="max-w-5xl mx-auto overflow-x-auto">
                            <table className="w-full bg-white rounded-xl shadow-lg overflow-hidden">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="px-4 py-4 text-left text-sm font-semibold text-gray-700">Marka/Model</th>
                                        <th className="px-4 py-4 text-center text-sm font-semibold text-gray-700">Tork</th>
                                        <th className="px-4 py-4 text-center text-sm font-semibold text-gray-700">Akıllı Ev</th>
                                        <th className="px-4 py-4 text-center text-sm font-semibold text-gray-700">Garanti</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {motorLibrary.slice(0, 4).map((motor, idx) => (
                                        <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                            <td className="px-4 py-4">
                                                <div className="font-semibold text-gray-900">{motor.model}</div>
                                                <div className="text-xs text-gray-500">{motor.speed}</div>
                                            </td>
                                            <td className="px-4 py-4 text-center font-medium">{motor.torque} Nm</td>
                                            <td className="px-4 py-4 text-center">
                                                {motor.smartHome ? (
                                                    <span className="text-green-500">✓</span>
                                                ) : (
                                                    <span className="text-gray-300">—</span>
                                                )}
                                            </td>
                                            <td className="px-4 py-4 text-center text-sm">{motor.warranty}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* Commercial Shutters */}
                <section id="kepenk-ticari" className="py-20 bg-gray-100">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <span className="inline-block px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm font-medium mb-4">
                                🏪 Ticari Çözümler
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Ticari Kepenk Sistemleri
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {ticariKepenk.map((system) => (
                                <div
                                    key={system.id}
                                    className="bg-white rounded-2xl overflow-hidden shadow-lg"
                                >
                                    <div className="relative h-40 bg-gradient-to-br from-gray-700 to-slate-900">
                                        <Image
                                            src={system.image}
                                            alt={system.name}
                                            fill
                                            className="object-contain p-6 opacity-80"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{system.name}</h3>
                                        <p className="text-gray-500 text-sm font-medium mb-3">{system.tagline}</p>
                                        <p className="text-gray-600 text-sm mb-4">{system.description}</p>

                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {system.technicalSpecs
                                                .filter((s) => s.highlight)
                                                .map((spec, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg"
                                                    >
                                                        {spec.label}: {spec.value}
                                                    </span>
                                                ))}
                                        </div>

                                        <Link
                                            href={`/panjur-kepenk-sistemleri/${system.slug}`}
                                            className="inline-flex items-center text-gray-700 font-semibold hover:text-gray-900"
                                        >
                                            Detaylar →
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Industrial Section */}
                <section id="kepenk-endustriyel" className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium mb-4">
                                🏭 Endüstriyel Çözümler
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Endüstriyel Kapı Sistemleri
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {endustriyelKepenk.map((system) => (
                                <div
                                    key={system.id}
                                    className="bg-white rounded-2xl overflow-hidden shadow-lg"
                                >
                                    <div className="relative h-48 bg-gradient-to-br from-orange-600 to-red-700">
                                        <Image
                                            src={system.image}
                                            alt={system.name}
                                            fill
                                            className="object-contain p-6"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{system.name}</h3>
                                        <p className="text-orange-600 text-sm font-medium mb-3">{system.tagline}</p>
                                        <p className="text-gray-600 text-sm mb-4">{system.description}</p>

                                        <div className="grid grid-cols-2 gap-2 mb-4">
                                            {system.technicalSpecs.slice(0, 4).map((spec, idx) => (
                                                <div key={idx} className="bg-gray-50 rounded-lg p-2">
                                                    <div className="text-xs text-gray-500">{spec.label}</div>
                                                    <div className="font-semibold text-sm text-gray-900">{spec.value}</div>
                                                </div>
                                            ))}
                                        </div>

                                        <Link
                                            href={`/panjur-kepenk-sistemleri/${system.slug}`}
                                            className="inline-flex items-center px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-all"
                                        >
                                            Proje Teklifi Al
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Lamel Options */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Lamel Seçenekleri
                            </h2>
                            <p className="text-gray-600">İhtiyacınıza göre lamel tipi seçin</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                            {lamelLibrary.slice(0, 6).map((lamel) => (
                                <div key={lamel.id} className="bg-gray-50 rounded-xl p-6">
                                    <div className="flex justify-between items-start mb-3">
                                        <h4 className="font-bold text-gray-900">{lamel.name}</h4>
                                        {lamel.foamFilled && (
                                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                                                Köpük Dolgulu
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-600 mb-4">{lamel.description}</p>
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                        <div>
                                            <span className="text-gray-500">Genişlik:</span>{' '}
                                            <span className="font-medium">{lamel.width}mm</span>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">Kalınlık:</span>{' '}
                                            <span className="font-medium">{lamel.thickness}mm</span>
                                        </div>
                                        {lamel.uValue && (
                                            <div className="col-span-2">
                                                <span className="text-gray-500">U Değeri:</span>{' '}
                                                <span className="font-medium text-green-600">{lamel.uValue} W/m²K</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <CTASection />

                {/* Local SEO */}
                <section className="py-12 bg-gray-100">
                    <div className="container mx-auto px-4">
                        <div className="text-center text-sm text-gray-600">
                            <p className="mb-4">
                                <strong>Panjur & Kepenk Hizmet Bölgelerimiz:</strong>
                            </p>
                            <p>
                                Beylikdüzü Motorlu Panjur | Esenyurt Kepenk Montaj | Büyükçekmece Somfy Panjur |
                                Avcılar Otomatik Kepenk | Bahçeşehir Akıllı Panjur | Küçükçekmece Endüstriyel Kapı
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
