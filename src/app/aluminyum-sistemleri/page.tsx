/**
 * Aluminum Systems & Façade Engineering Main Page
 * SEO: ısı yalıtımlı alüminyum, cephe giydirme, ofis bölme
 * Technical focus: Thermal break, curtain wall, HBŞB systems
 */

import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
    aluminumSystems,
    pvcVsAluminumMatrix,
    thermalBreakTechnology,
    aluminumFinishes,
    aluminumSeoKeywords,
} from '@/lib/aluminumData';
import { CTASection } from '@/components/sections/CTASection';

// SEO Metadata
export const metadata: Metadata = {
    title: 'Isı Yalıtımlı Alüminyum Doğrama | Cephe Giydirme | Ofis Bölme | Beylikdüzü',
    description:
        'Polyamide thermal break alüminyum pencere, silikon cephe giydirme, cam ofis bölme sistemleri. A1 yangın sınıfı, 40+ yıl ömür. Beylikdüzü İstanbul ücretsiz keşif.',
    keywords: [...aluminumSeoKeywords.primary, ...aluminumSeoKeywords.technical].join(', '),
    openGraph: {
        title: 'Alüminyum Doğrama & Cephe Sistemleri | Egepen Akçayapı',
        description:
            'Isı yalıtımlı alüminyum pencere, curtain wall cephe, ofis cam bölme. A1 yangın sınıfı, premium kalite.',
        type: 'website',
        locale: 'tr_TR',
    },
    alternates: {
        canonical: 'https://www.egepenakcayapi.com.tr/aluminyum-sistemleri',
    },
};

// JSON-LD Schema
const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Alüminyum Doğrama ve Cephe Sistemleri',
    description:
        'Isı yalıtımlı alüminyum pencere, cephe giydirme, ofis cam bölme montajı. Polyamide thermal break teknolojisi.',
    provider: {
        '@type': 'LocalBusiness',
        name: 'Egepen Akçayapı',
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Beylikdüzü',
            addressRegion: 'İstanbul',
            addressCountry: 'TR',
        },
        telephone: '+90-532-000-0000',
    },
    areaServed: { '@type': 'City', name: 'İstanbul' },
    serviceType: ['Alüminyum Doğrama Montajı', 'Cephe Giydirme', 'Ofis Bölme Sistemleri'],
};

// Category navigation data
const categories = [
    {
        id: 'thermal-break',
        title: 'Isı Yalıtımlı Pencere',
        description: 'Polyamide thermal break, %35 enerji tasarrufu',
        icon: '🌡️',
        color: 'from-orange-500 to-red-600',
        count: aluminumSystems.filter((s) => s.category === 'thermal-break').length,
    },
    {
        id: 'curtain-wall',
        title: 'Cephe Giydirme',
        description: 'Kapaklı cephe, silikon structural glazing',
        icon: '🏢',
        color: 'from-blue-500 to-indigo-600',
        count: aluminumSystems.filter((s) => s.category === 'curtain-wall').length,
    },
    {
        id: 'office-partition',
        title: 'Ofis Cam Bölme',
        description: 'Slim line profil, 45 dB ses yalıtımı',
        icon: '🪟',
        color: 'from-emerald-500 to-teal-600',
        count: aluminumSystems.filter((s) => s.category === 'office-partition').length,
    },
    {
        id: 'hebe-schiebe',
        title: 'HBŞB Kaldırmalı Sürme',
        description: '400kg taşıma, panoramik açıklık',
        icon: '↔️',
        color: 'from-purple-500 to-pink-600',
        count: aluminumSystems.filter((s) => s.category === 'hebe-schiebe').length,
    },
];

export default function AluminumSystemsPage() {
    const thermalBreakSystems = aluminumSystems.filter((s) => s.category === 'thermal-break');
    const curtainWallSystems = aluminumSystems.filter((s) => s.category === 'curtain-wall');
    const officePartitionSystems = aluminumSystems.filter((s) => s.category === 'office-partition');
    const hebeSchiebeSystems = aluminumSystems.filter((s) => s.category === 'hebe-schiebe');

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />

            <main className="min-h-screen bg-white">
                {/* Hero Section */}
                <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 py-20 lg:py-28 overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                        <Image
                            src="/images/cam-balkon/cam-balkon-sehir-manzara.jpg"
                            alt="Alüminyum Sistemleri"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <div className="absolute inset-0 bg-grid-white/5" />

                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-4xl mx-auto text-center">
                            <span className="inline-block px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium mb-6">
                                🏗️ Mimari Alüminyum Çözümleri
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                                Alüminyum Doğrama &
                                <span className="text-blue-400"> Cephe Sistemleri</span>
                            </h1>
                            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                                <strong className="text-blue-300">Polyamide thermal break</strong> teknolojisi ile
                                ısı yalıtımlı alüminyum pencereler.{' '}
                                <strong className="text-blue-300">Structural glazing</strong> cephe sistemleri.{' '}
                                <strong className="text-blue-300">A1 yangın sınıfı</strong> güvenliği.
                            </p>

                            <div className="flex flex-wrap justify-center gap-4 mb-12">
                                <Link
                                    href="/teklif-al"
                                    className="inline-flex items-center px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-blue-500/25"
                                >
                                    <span className="mr-2">📐</span>
                                    Ücretsiz Proje Teklifi
                                </Link>
                                <a
                                    href="tel:+905320000000"
                                    className="inline-flex items-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all border border-white/20"
                                >
                                    <span className="mr-2">📞</span>
                                    Hemen Arayın
                                </a>
                            </div>

                            {/* Trust Badges */}
                            <div className="flex flex-wrap justify-center items-center gap-6 text-gray-400 text-sm">
                                <span className="flex items-center gap-2">
                                    <span className="text-green-400">✓</span> A1 Yangın Sınıfı
                                </span>
                                <span className="flex items-center gap-2">
                                    <span className="text-green-400">✓</span> 40+ Yıl Ömür
                                </span>
                                <span className="flex items-center gap-2">
                                    <span className="text-green-400">✓</span> CE Belgeli
                                </span>
                                <span className="flex items-center gap-2">
                                    <span className="text-green-400">✓</span> 10 Yıl Garanti
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Category Navigation */}
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {categories.map((cat) => (
                                <a
                                    key={cat.id}
                                    href={`#${cat.id}`}
                                    className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                                >
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-5 transition-opacity`}
                                    />
                                    <div className="relative">
                                        <div className="text-4xl mb-4">{cat.icon}</div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">{cat.title}</h3>
                                        <p className="text-sm text-gray-500 mb-3">{cat.description}</p>
                                        <span className="text-xs text-blue-600 font-medium">
                                            {cat.count} sistem →
                                        </span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Thermal Break Technology Section */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-5xl mx-auto">
                            <div className="text-center mb-12">
                                <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium mb-4">
                                    🔬 Teknoloji Odak
                                </span>
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                    {thermalBreakTechnology.title}
                                </h2>
                                <p className="text-gray-600 max-w-2xl mx-auto">
                                    {thermalBreakTechnology.description}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                                {thermalBreakTechnology.components.map((comp, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-gradient-to-br from-gray-50 to-orange-50 rounded-xl p-6 border border-orange-100"
                                    >
                                        <h4 className="font-bold text-gray-900 mb-2">{comp.name}</h4>
                                        <p className="text-sm text-gray-600 mb-3">{comp.description}</p>
                                        <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
                                            ✓ {comp.benefit}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Energy Savings Highlight */}
                            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-8 text-white text-center">
                                <div className="text-6xl font-bold mb-2">
                                    %{thermalBreakTechnology.energySavings.percentage}
                                </div>
                                <p className="text-orange-100 text-lg">
                                    {thermalBreakTechnology.energySavings.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* PVC vs Aluminum Comparison */}
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
                                ⚖️ Karşılaştırma Matrisi
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                PVC mi Alüminyum mu?
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Doğru malzeme seçimi projenizin başarısını belirler. Objektif
                                karşılaştırma ile karar verin.
                            </p>
                        </div>

                        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                                Kriter
                                            </th>
                                            <th className="px-6 py-4 text-center text-sm font-semibold text-emerald-700">
                                                PVC
                                            </th>
                                            <th className="px-6 py-4 text-center text-sm font-semibold text-blue-700">
                                                Alüminyum
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pvcVsAluminumMatrix.criteria.map((item, idx) => (
                                            <tr key={item.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                    {item.label}
                                                </td>
                                                <td
                                                    className={`px-6 py-4 text-center text-sm ${item.winner === 'pvc'
                                                            ? 'text-emerald-700 font-semibold bg-emerald-50'
                                                            : 'text-gray-600'
                                                        }`}
                                                >
                                                    {item.pvc.value}
                                                    {item.winner === 'pvc' && (
                                                        <span className="ml-2 text-emerald-500">✓</span>
                                                    )}
                                                </td>
                                                <td
                                                    className={`px-6 py-4 text-center text-sm ${item.winner === 'aluminum'
                                                            ? 'text-blue-700 font-semibold bg-blue-50'
                                                            : 'text-gray-600'
                                                        }`}
                                                >
                                                    {item.aluminum.value}
                                                    {item.winner === 'aluminum' && (
                                                        <span className="ml-2 text-blue-500">✓</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Recommendations */}
                            <div className="grid grid-cols-1 md:grid-cols-2 border-t">
                                <div className="p-6 bg-emerald-50">
                                    <h4 className="font-bold text-emerald-800 mb-3">PVC Önerilir:</h4>
                                    <ul className="space-y-2">
                                        {pvcVsAluminumMatrix.recommendation.pvc.map((item, idx) => (
                                            <li key={idx} className="text-sm text-emerald-700 flex items-center">
                                                <span className="mr-2">✓</span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="p-6 bg-blue-50">
                                    <h4 className="font-bold text-blue-800 mb-3">Alüminyum Önerilir:</h4>
                                    <ul className="space-y-2">
                                        {pvcVsAluminumMatrix.recommendation.aluminum.map((item, idx) => (
                                            <li key={idx} className="text-sm text-blue-700 flex items-center">
                                                <span className="mr-2">✓</span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Thermal Break Windows */}
                <section id="thermal-break" className="py-20 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium mb-4">
                                🌡️ Enerji Verimli
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Isı Yalıtımlı Alüminyum Pencereler
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                PA66 Polyamide ısı köprüsü kesici teknolojisi ile maksimum enerji verimliliği
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
                            {thermalBreakSystems.map((system) => (
                                <div
                                    key={system.id}
                                    className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl overflow-hidden shadow-lg"
                                >
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                                        <div>
                                            <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full mb-4">
                                                {system.warranty}
                                            </span>
                                            <h3 className="text-2xl font-bold text-gray-900 mb-3">{system.name}</h3>
                                            <p className="text-orange-600 font-medium mb-4">{system.tagline}</p>
                                            <p className="text-gray-600 mb-6">{system.description}</p>

                                            {/* Technical Specs Grid */}
                                            <div className="grid grid-cols-2 gap-3 mb-6">
                                                {system.technicalSpecs.slice(0, 6).map((spec, idx) => (
                                                    <div
                                                        key={idx}
                                                        className={`p-3 rounded-lg ${spec.highlight
                                                                ? 'bg-orange-100 border border-orange-200'
                                                                : 'bg-white'
                                                            }`}
                                                    >
                                                        <div className="text-xs text-gray-500">{spec.label}</div>
                                                        <div
                                                            className={`font-semibold ${spec.highlight ? 'text-orange-700' : 'text-gray-900'
                                                                }`}
                                                        >
                                                            {spec.value}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <Link
                                                href={`/aluminyum-sistemleri/${system.slug}`}
                                                className="inline-flex items-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-all"
                                            >
                                                Detaylar ve Teknik Döküman
                                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </Link>
                                        </div>

                                        <div className="relative h-64 lg:h-auto min-h-[300px] rounded-xl overflow-hidden bg-gradient-to-br from-orange-600 to-red-700">
                                            <Image
                                                src={system.image}
                                                alt={system.name}
                                                fill
                                                className="object-contain p-8"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Curtain Wall Systems */}
                <section id="curtain-wall" className="py-20 bg-gradient-to-br from-slate-100 to-blue-50">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
                                🏢 Ticari Projeler
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Cephe Giydirme Sistemleri
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Kapaklı cephe ve silikon structural glazing sistemleri ile modern mimari çözümler
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {curtainWallSystems.map((system) => (
                                <div
                                    key={system.id}
                                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group"
                                >
                                    <div className="relative h-56 bg-gradient-to-br from-blue-600 to-indigo-700">
                                        <Image
                                            src={system.image}
                                            alt={system.name}
                                            fill
                                            className="object-contain p-6 group-hover:scale-105 transition-transform"
                                        />
                                        <div className="absolute top-4 right-4">
                                            <span className="px-3 py-1 bg-white/90 text-blue-700 text-xs font-medium rounded-full">
                                                {system.priceRange === 'premium' ? '💎 Premium' : 'Standart'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{system.name}</h3>
                                        <p className="text-blue-600 text-sm font-medium mb-3">{system.tagline}</p>
                                        <p className="text-gray-600 text-sm mb-4">{system.description}</p>

                                        {/* Key Specs */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {system.technicalSpecs
                                                .filter((s) => s.highlight)
                                                .map((spec, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-lg"
                                                    >
                                                        {spec.label}: {spec.value}
                                                    </span>
                                                ))}
                                        </div>

                                        <Link
                                            href={`/aluminyum-sistemleri/${system.slug}`}
                                            className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700"
                                        >
                                            Detaylı Bilgi
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

                {/* Office Partitions */}
                <section id="office-partition" className="py-20 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
                                🪟 Ofis Çözümleri
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Cam Ofis Bölme Sistemleri
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Ultra ince profil, maksimum şeffaflık, üstün ses yalıtımı
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-8">
                            {officePartitionSystems.map((system) => (
                                <div
                                    key={system.id}
                                    className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 shadow-lg"
                                >
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                                        <div className="lg:col-span-2">
                                            <h3 className="text-2xl font-bold text-gray-900 mb-3">{system.name}</h3>
                                            <p className="text-emerald-600 font-medium mb-4">{system.tagline}</p>
                                            <p className="text-gray-600 mb-6">{system.description}</p>

                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                                                {system.technicalSpecs.map((spec, idx) => (
                                                    <div
                                                        key={idx}
                                                        className={`p-3 rounded-lg ${spec.highlight ? 'bg-emerald-100' : 'bg-white'
                                                            }`}
                                                    >
                                                        <div className="text-xs text-gray-500">{spec.label}</div>
                                                        <div className="font-semibold text-gray-900">{spec.value}</div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {system.features.slice(0, 5).map((feature, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="px-3 py-1 bg-emerald-100 text-emerald-700 text-sm rounded-full"
                                                    >
                                                        ✓ {feature}
                                                    </span>
                                                ))}
                                            </div>

                                            <Link
                                                href={`/aluminyum-sistemleri/${system.slug}`}
                                                className="inline-flex items-center px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-all"
                                            >
                                                Proje Teklifi Al
                                            </Link>
                                        </div>

                                        <div className="relative h-64 rounded-xl overflow-hidden bg-gradient-to-br from-emerald-600 to-teal-700">
                                            <Image
                                                src={system.image}
                                                alt={system.name}
                                                fill
                                                className="object-contain p-6"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Hebe-Schiebe Section */}
                <section id="hebe-schiebe" className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
                                ↔️ Premium Sürme
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Hebe-Schiebe Kaldırmalı Sürme
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                400kg taşıma kapasitesi, panoramik açıklıklar, parmak ucuyla kontrol
                            </p>
                        </div>

                        {hebeSchiebeSystems.map((system) => (
                            <div
                                key={system.id}
                                className="bg-white rounded-2xl overflow-hidden shadow-xl"
                            >
                                <div className="grid grid-cols-1 lg:grid-cols-2">
                                    <div className="relative h-80 lg:h-auto bg-gradient-to-br from-purple-600 to-pink-700">
                                        <Image
                                            src={system.image}
                                            alt={system.name}
                                            fill
                                            className="object-contain p-8"
                                        />
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <div className="bg-white/90 backdrop-blur rounded-xl p-4">
                                                <div className="text-center">
                                                    <div className="text-3xl font-bold text-purple-700">400kg</div>
                                                    <div className="text-sm text-gray-600">Panel Taşıma Kapasitesi</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-8">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-3">{system.name}</h3>
                                        <p className="text-purple-600 font-medium mb-4">{system.tagline}</p>
                                        <p className="text-gray-600 mb-6">{system.description}</p>

                                        <div className="grid grid-cols-2 gap-3 mb-6">
                                            {system.technicalSpecs.map((spec, idx) => (
                                                <div
                                                    key={idx}
                                                    className={`p-3 rounded-lg ${spec.highlight
                                                            ? 'bg-purple-100 border border-purple-200'
                                                            : 'bg-gray-50'
                                                        }`}
                                                >
                                                    <div className="text-xs text-gray-500">{spec.label}</div>
                                                    <div className="font-semibold text-gray-900">{spec.value}</div>
                                                </div>
                                            ))}
                                        </div>

                                        <Link
                                            href={`/aluminyum-sistemleri/${system.slug}`}
                                            className="inline-flex items-center px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-xl transition-all"
                                        >
                                            Detaylar ve Fiyat Teklifi
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Color & Finish Options */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mb-4">
                                🎨 Renk Seçenekleri
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                RAL, Anodize & Ahşap Dekor
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                200+ RAL renk, anodize kaplama ve ahşap efekt seçenekleri
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* RAL Colors */}
                            <div className="bg-gray-50 rounded-2xl p-6">
                                <h4 className="font-bold text-gray-900 mb-4">RAL Renkleri</h4>
                                <div className="flex flex-wrap gap-3">
                                    {aluminumFinishes.ral.map((color, idx) => (
                                        <div key={idx} className="text-center">
                                            <div
                                                className="w-12 h-12 rounded-lg shadow-md mb-1 border border-gray-200"
                                                style={{ backgroundColor: color.hex }}
                                            />
                                            <div className="text-xs text-gray-600">{color.name}</div>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-xs text-gray-500 mt-4">+ 200 RAL renk seçeneği</p>
                            </div>

                            {/* Anodic */}
                            <div className="bg-gray-50 rounded-2xl p-6">
                                <h4 className="font-bold text-gray-900 mb-4">Anodize Kaplama</h4>
                                <div className="flex flex-wrap gap-3">
                                    {aluminumFinishes.anodic.map((color, idx) => (
                                        <div key={idx} className="text-center">
                                            <div
                                                className="w-12 h-12 rounded-lg shadow-md mb-1 border border-gray-200"
                                                style={{ backgroundColor: color.hex }}
                                            />
                                            <div className="text-xs text-gray-600">{color.name}</div>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-xs text-gray-500 mt-4">20+ yıl dayanım</p>
                            </div>

                            {/* Wood Effect */}
                            <div className="bg-gray-50 rounded-2xl p-6">
                                <h4 className="font-bold text-gray-900 mb-4">Ahşap Dekor</h4>
                                <div className="flex flex-wrap gap-3">
                                    {aluminumFinishes.woodEffect.map((color, idx) => (
                                        <div key={idx} className="text-center">
                                            <div
                                                className="w-12 h-12 rounded-lg shadow-md mb-1 border border-gray-200"
                                                style={{ backgroundColor: color.hex }}
                                            />
                                            <div className="text-xs text-gray-600">{color.name}</div>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-xs text-gray-500 mt-4">Doğal ahşap görünümü</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <CTASection />

                {/* Local SEO Footer */}
                <section className="py-12 bg-gray-100">
                    <div className="container mx-auto px-4">
                        <div className="text-center text-sm text-gray-600">
                            <p className="mb-4">
                                <strong>Alüminyum Doğrama Hizmet Bölgelerimiz:</strong>
                            </p>
                            <p>
                                Beylikdüzü Alüminyum Doğrama | Esenyurt Alüminyum Pencere | Büyükçekmece
                                Cephe Giydirme | Avcılar Ofis Bölme | Bahçeşehir Alüminyum | Küçükçekmece
                                Doğrama | İstanbul Avrupa Yakası Alüminyum Sistemleri
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
