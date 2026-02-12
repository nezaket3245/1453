/**
 * Aluminum Systems & Façade Engineering Main Page
 * SEO: ısı yalıtımlı alüminyum, cephe giydirme, ofis bölme
 * Technical focus: Thermal break, curtain wall, HBŞB systems
 */

import { Metadata } from 'next';
import Link from 'next/link';
import { aluminumSeoKeywords, aluminumFinishes, thermalBreakTechnology, pvcVsAluminumMatrix, aluminumSystems } from '@/lib/aluminumData';
import OptimizedImage from "@/components/ui/OptimizedImage";
import { businessConfig } from '@/config/business.config';
import { HeaderOptimized } from '@/components/layout/HeaderOptimized';
import { Footer } from '@/components/layout/Footer';

// SEO Metadata
export const metadata: Metadata = {
    title: 'Alüminyum Doğrama ve Cephe Sistemleri',
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
        canonical: `${businessConfig.siteUrl}/aluminyum-sistemleri`,
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
        telephone: businessConfig.contact.mobile,
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

            <HeaderOptimized />

            <main id="main-content" className="min-h-screen bg-white">
                {/* Hero Section */}
                <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 py-20 lg:py-28 overflow-hidden min-h-[50vh] lg:min-h-[60vh] flex items-center">
                    <div className="absolute inset-0">
                        <OptimizedImage
                            src="/images/showroom-main.png"
                            alt=""
                            fill
                            sizes="100vw"
                            className="object-cover"
                            priority
                            role="presentation"
                        />
                    </div>


                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-4xl mx-auto text-center">
                            <span className="sr-only">
                                🏗️ Mimari Alüminyum Çözümleri
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
                                Alüminyum Doğrama & Cephe Sistemleri
                            </h1>
                            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
                                <strong>Polyamide thermal break</strong> teknolojisi ile
                                ısı yalıtımlı alüminyum pencereler.
                                <strong>Structural glazing</strong> cephe sistemleri.
                                <strong>A1 yangın sınıfı</strong> güvenliği.
                            </p>

                            {/* Trust Badges — hidden */}
                            <div className="hidden">
                                <span>A1 Yangın Sınıfı</span>
                                <span>40+ Yıl Ömür</span>
                                <span>CE Belgeli</span>
                                <span>10 Yıl Dayanıklılık</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Sineklik Kampanya Reklamı */}
                <div className="bg-rose-600 text-white py-2.5">
                    <div className="container mx-auto px-4 flex items-center justify-center gap-3 text-sm">
                        <span className="font-bold bg-white/20 px-2 py-0.5 rounded text-xs">KAMPANYA</span>
                        <span>Sineklikte tüm renkli profiller <strong className="text-yellow-300">beyaz fiyatına!</strong></span>
                        <Link href="/sineklik-sistemleri" className="underline font-semibold hover:text-yellow-200 transition-colors">Detaylar →</Link>
                    </div>
                </div>

                {/* Category Navigation */}
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {categories.map((cat) => (
                                <a
                                    key={cat.id}
                                    href={`#${cat.id}`}
                                    className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden"
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
                                                className="inline-flex items-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-shadow"
                                            >
                                                Detaylar ve Teknik Döküman
                                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </Link>
                                        </div>

                                        <div className="relative h-64 lg:h-auto min-h-[300px] rounded-xl overflow-hidden bg-gradient-to-br from-orange-600 to-red-700">
                                            <OptimizedImage
                                                src={system.image}
                                                alt={system.name}
                                                fill
                                                sizes="(max-width: 1024px) 100vw, 50vw"
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
                                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
                                >
                                    <div className="relative h-56 bg-gradient-to-br from-blue-600 to-indigo-700">
                                        <OptimizedImage
                                            src={system.image}
                                            alt={system.name}
                                            fill
                                            sizes="(max-width: 1024px) 100vw, 50vw"
                                            className="object-contain p-6 group-hover:scale-105 transition-transform"
                                        />
                                        <div className="absolute top-4 right-4">
                                            <span className="px-3 py-1 bg-white/90 text-blue-700 text-xs font-medium rounded-full">
                                                Fiyat İçin Arayın
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
                                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
                                                className="inline-flex items-center px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-shadow"
                                            >
                                                Proje Teklifi Al
                                            </Link>
                                        </div>

                                        <div className="relative h-64 rounded-xl overflow-hidden bg-gradient-to-br from-emerald-600 to-teal-700">
                                            <OptimizedImage
                                                src={system.image}
                                                alt={system.name}
                                                fill
                                                sizes="(max-width: 1024px) 100vw, 50vw"
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
                                        <OptimizedImage
                                            src={system.image}
                                            alt={system.name}
                                            fill
                                            sizes="(max-width: 1024px) 100vw, 50vw"
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
                                            className="inline-flex items-center px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-xl transition-shadow"
                                        >
                                            Detayları İncele
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

            <Footer />
        </>
    );
}
