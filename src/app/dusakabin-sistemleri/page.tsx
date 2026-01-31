/**
 * Premium Duşakabin (Shower Enclosure) Main Page
 * SEO-optimized with Schema.org, Interactive Configurator, Authority Content
 * Target Keywords: Duşakabin fiyatları Beylikdüzü, Siyah çerçeveli duşakabin, etc.
 */

import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
    dusakabinSystems,
    glassTypes,
    profileColors,
    hygieneCoatings,
    showerShapes,
    dusakabinSeoKeywords,
    authorityGuides,
    getDusakabinSystemsByCategory,
} from '@/lib/dusakabinData';
import { CTASection } from '@/components/sections/CTASection';
import DusakabinConfigurator from './DusakabinConfigurator';
import { businessConfig } from '@/config/business.config';
import OptimizedImage from "@/components/ui/OptimizedImage";

// SEO Metadata - Optimized for local + product searches
export const metadata: Metadata = {
    title: 'Duşakabin Modelleri & Fiyatları 2026 | Siyah Çerçeveli | Çerçevesiz | Beylikdüzü',
    description: 'Beylikdüzü duşakabin fiyatları, siyah çerçeveli duşakabin, çerçevesiz cam duşakabin, walk-in sistemler. 5mm-10mm temperli cam, nano kaplama, özel ölçü imalat. Ücretsiz keşif!',
    keywords: [
        ...dusakabinSeoKeywords.core,
        ...dusakabinSeoKeywords.blackEdition,
        ...dusakabinSeoKeywords.frameless,
        ...dusakabinSeoKeywords.local,
        ...dusakabinSeoKeywords.technical,
    ].join(', '),
    openGraph: {
        title: 'Premium Duşakabin Sistemleri | Egepen Akçayapı',
        description: 'Siyah çerçeveli, çerçevesiz, walk-in duşakabin modelleri. Temperli cam, nano kaplama, profesyonel montaj.',
        type: 'website',
        locale: 'tr_TR',
    },
    alternates: {
        canonical: 'https://www.egepenakcayapi.com.tr/dusakabin-sistemleri',
    },
};

export default function DusakabinPage() {
    // Get systems by category
    const blackEditionSystems = getDusakabinSystemsByCategory('black-edition');
    const slidingCornerSystems = getDusakabinSystemsByCategory('sliding-corner');
    const hingedLuxurySystems = getDusakabinSystemsByCategory('hinged-luxury');
    const walkInSystems = getDusakabinSystemsByCategory('walk-in');

    // JSON-LD Schema - Service with AggregateRating
    const serviceSchema = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Duşakabin Sistemleri ve Montaj',
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
        areaServed: ['Beylikdüzü', 'Esenyurt', 'Büyükçekmece', 'Avcılar', 'Küçükçekmece'],
        description: 'Premium duşakabin sistemleri: Siyah çerçeveli, çerçevesiz, walk-in, sürme sistemler. Temperli cam, nano kaplama, profesyonel montaj.',
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            reviewCount: '127',
            bestRating: '5',
        },
    };

    // Product List Schema for rich snippets
    const productListSchema = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Duşakabin Modelleri',
        itemListElement: dusakabinSystems.slice(0, 6).map((system, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            item: {
                '@type': 'Product',
                name: system.name,
                description: system.description,
                image: system.image,
                brand: { '@type': 'Brand', name: 'Egepen Akçayapı' },
                offers: {
                    '@type': 'AggregateOffer',
                    priceCurrency: 'TRY',
                    lowPrice: system.priceRange.min,
                    highPrice: system.priceRange.max,
                    availability: 'https://schema.org/InStock',
                },
            },
        })),
    };

    // FAQ Schema for authority content
    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
            {
                '@type': 'Question',
                name: 'Duşakabin cam kalınlığı ne olmalı?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Sürme sistemlerde 6mm yeterlidir. Menteşeli sistemlerde 8mm standart, çerçevesiz lüks sistemlerde 10mm önerilir. Kalın cam daha az titreşir ve daha sağlam hissettirir.',
                },
            },
            {
                '@type': 'Question',
                name: 'Tekneli mi teknesiz duşakabin mi tercih etmeliyim?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Kiralık evlerde veya eski binalarda tekneli sistem pratiktir. Yeni yapılarda veya komple renovasyonda teknesiz (wet-room) modern görünüm sağlar. Engelli/yaşlı erişimi için teknesiz önerilir.',
                },
            },
            {
                '@type': 'Question',
                name: 'Nano kaplama gerçekten işe yarıyor mu?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Evet, kaliteli nano kaplama (hidrofobik) su damlalarını iter ve kireç birikmesini %90 azaltır. 5-10 yıl etkili kalır ve temizlik süresini yarıya indirir.',
                },
            },
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productListSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            <main className="min-h-screen bg-white">
                {/* Hero Section */}
                <section className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20 lg:py-28 overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute inset-0 opacity-50">
                        <OptimizedImage
                            src="/images/showroom-main.png"
                            alt="Duşakabin Sistemleri"
                            fill
                            className="object-cover"
                        />
                    </div>


                    <div className="container mx-auto px-4 relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-sm font-medium rounded-full border border-purple-500/30">
                                        ⭐ 4.9/5 Müşteri Puanı
                                    </span>
                                    {/* <span className="px-3 py-1 bg-green-500/20 text-green-300 text-sm font-medium rounded-full border border-green-500/30">
                                        10 Yıla Kadar Garanti
                                    </span> */}
                                </div>

                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
                                    Premium{' '}
                                    <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                                        Duşakabin
                                    </span>{' '}
                                    Sistemleri
                                </h1>

                                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                                    Siyah çerçeveli modern tasarımlar, çerçevesiz lüks sistemler, walk-in açık konseptler.{' '}
                                    <strong className="text-white">5mm-10mm temperli cam</strong>, nano kaplama teknolojisi, özel ölçü imalat.
                                </p>

                                <div className="flex flex-wrap gap-4">
                                    <Link
                                        href="#konfigurator"
                                        className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-2xl hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg shadow-purple-500/30"
                                    >
                                        🛁 Tasarımını Oluştur
                                    </Link>
                                    <a
                                        href={`https://wa.me/${businessConfig.contact.whatsapp}?text=${encodeURIComponent("Merhaba, duşakabin hakkında bilgi almak istiyorum.")}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-8 py-4 bg-white/10 text-white font-bold rounded-2xl hover:bg-white/20 transition-all border border-white/20"
                                    >
                                        📸 Fotoğraf Gönder, Fiyat Al
                                    </a>
                                </div>

                                {/* Trust Badges */}
                                <div className="mt-10 flex flex-wrap items-center gap-6 text-sm text-gray-400">
                                    <span className="flex items-center gap-2">
                                        <span className="text-green-400">✓</span> Ücretsiz Keşif
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <span className="text-green-400">✓</span> Özel Ölçü İmalat
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <span className="text-green-400">✓</span> CE & TSE Sertifikalı
                                    </span>
                                </div>
                            </div>

                            <div className="relative">
                                <div className="relative h-[400px] lg:h-[500px]">
                                    <OptimizedImage
                                        src="/images/dusakabin/hero-black-frameless.jpg"
                                        alt="Siyah Çerçeveli Premium Duşakabin"
                                        fill
                                        className="object-contain drop-shadow-2xl"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Category Navigation */}
                <section className="py-8 bg-gray-50 border-b sticky top-16 z-40">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-wrap justify-center gap-3">
                            {[
                                { id: 'black-edition', label: '🖤 Siyah Kare (Black Edition)', count: blackEditionSystems.length },
                                { id: 'sliding-corner', label: '🔄 Sürme & Köşe Girişli', count: slidingCornerSystems.length },
                                { id: 'hinged-luxury', label: '🚪 Menteşeli Lüks', count: hingedLuxurySystems.length },
                                { id: 'walk-in', label: '🚿 Walk-in & Sabit Panel', count: walkInSystems.length },
                            ].map((cat) => (
                                <a
                                    key={cat.id}
                                    href={`#${cat.id}`}
                                    className="px-5 py-2.5 bg-white rounded-xl font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-all shadow-sm border"
                                >
                                    {cat.label}
                                    <span className="ml-2 px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-full">
                                        {cat.count}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Glass Technology Section */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-5xl mx-auto">
                            <div className="text-center mb-12">
                                <span className="inline-block px-4 py-1 bg-cyan-100 text-cyan-700 text-sm font-bold rounded-full mb-4">
                                    CAM TEKNOLOJİSİ
                                </span>
                                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                                    Temperli Cam: Güvenlik ve Estetik
                                </h2>
                                <p className="text-gray-600 max-w-2xl mx-auto">
                                    EN 12150-1 standardında üretilen temperli cam, normal camdan 4-5 kat daha güçlüdür.
                                    Kırılma durumunda küçük küp parçalara ayrılarak yaralanma riskini minimize eder.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                                {glassTypes.map((glass) => (
                                    <div
                                        key={glass.id}
                                        className="bg-gray-50 rounded-2xl p-5 text-center hover:shadow-lg hover:bg-white transition-all border border-gray-100"
                                    >
                                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-200 to-gray-300 mx-auto mb-3 shadow-inner" />
                                        <h4 className="font-bold text-gray-900 text-sm mb-1">{glass.nameTR}</h4>
                                        <p className="text-xs text-gray-500">{glass.thickness.join('/')}mm</p>
                                        {glass.priceMultiplier > 1.2 && (
                                            <span className="inline-block mt-2 px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full">
                                                Premium
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* BLACK EDITION SECTION */}
                <section id="black-edition" className="py-20 bg-gradient-to-br from-gray-900 to-slate-800">
                    <div className="container mx-auto px-4">
                        <div className="max-w-6xl mx-auto">
                            <div className="text-center mb-12">
                                <span className="inline-block px-4 py-1 bg-white/10 text-white text-sm font-bold rounded-full mb-4 border border-white/20">
                                    BLACK EDITION
                                </span>
                                <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                                    Siyah Kare Serisi
                                </h2>
                                <p className="text-gray-400 max-w-2xl mx-auto">
                                    Modern endüstriyel tasarımın zirvesi. <strong className="text-white">Mat siyah elektrostatik toz boya</strong> profiller,
                                    kontrast estetiği ve minimalist zarafet.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {blackEditionSystems.map((system) => (
                                    <Link
                                        key={system.id}
                                        href={`/dusakabin-sistemleri/${system.slug}`}
                                        className="group bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all hover:shadow-2xl hover:shadow-purple-500/20"
                                    >
                                        <div className="relative h-56 bg-gradient-to-br from-gray-800 to-gray-900">
                                            <OptimizedImage
                                                src={system.image}
                                                alt={system.name}
                                                fill
                                                className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                            />
                                            {/* <div className="absolute top-4 right-4">
                                                <span className="px-3 py-1 bg-black/50 text-white text-xs font-bold rounded-full backdrop-blur-sm">
                                                    {system.warranty}
                                                </span>
                                            </div> */}
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                                                {system.name}
                                            </h3>
                                            <p className="text-gray-400 text-sm mb-4">{system.tagline}</p>
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {system.features.slice(0, 3).map((feature, idx) => (
                                                    <span key={idx} className="px-2 py-1 bg-white/10 text-gray-300 text-xs rounded-lg">
                                                        {feature}
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-purple-400 font-bold">
                                                    ₺{system.priceRange.min.toLocaleString('tr-TR')}+
                                                </span>
                                                <span className="text-white/60 text-sm group-hover:text-purple-400 transition-colors">
                                                    Detayları Gör →
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* SLIDING & CORNER ENTRY SECTION */}
                <section id="sliding-corner" className="py-20 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-6xl mx-auto">
                            <div className="text-center mb-12">
                                <span className="inline-block px-4 py-1 bg-blue-100 text-blue-700 text-sm font-bold rounded-full mb-4">
                                    SÜRME SİSTEMLER
                                </span>
                                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                                    Sürme & Köşe Girişli Sistemler
                                </h2>
                                <p className="text-gray-600 max-w-2xl mx-auto">
                                    Alan tasarrufu sağlayan sürme mekanizmalar. <strong>Paslanmaz çelik rulman tekerlekler</strong>,
                                    sessiz çalışma, manyetik su fitili.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {slidingCornerSystems.map((system) => (
                                    <Link
                                        key={system.id}
                                        href={`/dusakabin-sistemleri/${system.slug}`}
                                        className="group bg-gray-50 rounded-3xl overflow-hidden border border-gray-200 hover:border-blue-500 transition-all hover:shadow-xl"
                                    >
                                        <div className="relative h-56 bg-gradient-to-br from-blue-50 to-cyan-50">
                                            <OptimizedImage
                                                src={system.image}
                                                alt={system.name}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                                {system.name}
                                            </h3>
                                            <p className="text-gray-600 text-sm mb-4">{system.tagline}</p>
                                            <div className="flex justify-between items-center">
                                                <span className="text-blue-600 font-bold">
                                                    ₺{system.priceRange.min.toLocaleString('tr-TR')}+
                                                </span>
                                                <span className="text-gray-400 text-sm group-hover:text-blue-600 transition-colors">
                                                    Detayları Gör →
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Hygiene Coatings Section */}
                <section className="py-16 bg-gradient-to-br from-cyan-50 to-blue-50">
                    <div className="container mx-auto px-4">
                        <div className="max-w-5xl mx-auto">
                            <div className="text-center mb-12">
                                <span className="inline-block px-4 py-1 bg-cyan-500 text-white text-sm font-bold rounded-full mb-4">
                                    💧 HİJYEN TEKNOLOJİSİ
                                </span>
                                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                                    Anti-Calc & Nano Kaplama
                                </h2>
                                <p className="text-gray-600 max-w-2xl mx-auto">
                                    Kireç tutmayan, kolay temizlenen cam yüzeyler. <strong>Su itici (hidrofobik)</strong> teknoloji ile
                                    minimum bakım, maksimum hijyen.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {hygieneCoatings.map((coating) => (
                                    <div
                                        key={coating.id}
                                        className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
                                    >
                                        <div className="text-4xl mb-4">
                                            {coating.id === 'nano-clear' ? '💧' : coating.id === 'anti-calc' ? '🧊' : '🛡️'}
                                        </div>
                                        <h4 className="font-bold text-gray-900 text-lg mb-2">{coating.name}</h4>
                                        <p className="text-xs text-cyan-600 font-medium mb-3">{coating.technology}</p>
                                        <p className="text-sm text-gray-600 mb-4">{coating.description}</p>
                                        <div className="space-y-2">
                                            {coating.benefits.map((benefit, idx) => (
                                                <div key={idx} className="flex items-center text-sm text-gray-700">
                                                    <span className="text-green-500 mr-2">✓</span>
                                                    {benefit}
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-4 pt-4 border-t flex justify-between text-xs text-gray-500">
                                            <span>Temizlik: {coating.cleaningFrequency}</span>
                                            <span>Ömür: {coating.lifespan}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* HINGED LUXURY SECTION */}
                <section id="hinged-luxury" className="py-20 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-6xl mx-auto">
                            <div className="text-center mb-12">
                                <span className="inline-block px-4 py-1 bg-purple-100 text-purple-700 text-sm font-bold rounded-full mb-4">
                                    LÜKS SERİ
                                </span>
                                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                                    Menteşeli (Boy Menteşe) Lüks Serisi
                                </h2>
                                <p className="text-gray-600 max-w-2xl mx-auto">
                                    <strong>10mm ekstra şeffaf temperli cam</strong>, 180° tam açılım, Dorma/Bohle premium aksesuarlar.
                                    Otel kalitesinde minimalist zarafet.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {hingedLuxurySystems.map((system) => (
                                    <Link
                                        key={system.id}
                                        href={`/dusakabin-sistemleri/${system.slug}`}
                                        className="group bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl overflow-hidden border border-purple-100 hover:border-purple-400 transition-all hover:shadow-xl"
                                    >
                                        <div className="relative h-60 bg-gradient-to-br from-purple-100 to-pink-100">
                                            <OptimizedImage
                                                src={system.image}
                                                alt={system.name}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            {system.id === 'frameless-pivot-luxury' && (
                                                <div className="absolute top-4 left-4">
                                                    <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full">
                                                        ⭐ En Çok Satan
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                                                {system.name}
                                            </h3>
                                            <p className="text-gray-600 text-sm mb-4">{system.tagline}</p>
                                            <div className="flex justify-between items-center">
                                                <span className="text-purple-600 font-bold">
                                                    ₺{system.priceRange.min.toLocaleString('tr-TR')}+
                                                </span>
                                                <span className="text-gray-400 text-sm group-hover:text-purple-600 transition-colors">
                                                    Detayları Gör →
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* WALK-IN SECTION */}
                <section id="walk-in" className="py-20 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="max-w-6xl mx-auto">
                            <div className="text-center mb-12">
                                <span className="inline-block px-4 py-1 bg-emerald-100 text-emerald-700 text-sm font-bold rounded-full mb-4">
                                    WALK-IN SİSTEMLER
                                </span>
                                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                                    Walk-in & Sabit Paneller
                                </h2>
                                <p className="text-gray-600 max-w-2xl mx-auto">
                                    Kapısız açık tasarım, <strong>wet-room konsepti</strong>. Engelsiz giriş, kolay temizlik, modern mimari.
                                    Yaşlı/engelli dostu erişilebilir çözümler.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {walkInSystems.map((system) => (
                                    <Link
                                        key={system.id}
                                        href={`/dusakabin-sistemleri/${system.slug}`}
                                        className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-emerald-500 transition-all hover:shadow-lg"
                                    >
                                        <div className="relative h-48 bg-gradient-to-br from-emerald-50 to-teal-50">
                                            <OptimizedImage
                                                src={system.image}
                                                alt={system.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="p-5">
                                            <h3 className="font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors">
                                                {system.name}
                                            </h3>
                                            <p className="text-gray-500 text-sm mb-3">{system.tagline}</p>
                                            <div className="flex justify-between items-center">
                                                <span className="text-emerald-600 font-bold text-sm">
                                                    ₺{system.priceRange.min.toLocaleString('tr-TR')}+
                                                </span>
                                                <span className="text-gray-400 text-xs">→</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Profile Colors Section */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-5xl mx-auto">
                            <div className="text-center mb-10">
                                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4">
                                    🎨 Profil Renk Seçenekleri
                                </h2>
                                <p className="text-gray-600">
                                    Elektrostatik toz boya ve PVD kaplama ile uzun ömürlü, çizilmeye dayanıklı yüzeyler
                                </p>
                            </div>

                            <div className="flex flex-wrap justify-center gap-4">
                                {profileColors.map((color) => (
                                    <div
                                        key={color.id}
                                        className="flex flex-col items-center p-4 bg-gray-50 rounded-xl hover:bg-white hover:shadow-lg transition-all"
                                    >
                                        <div
                                            className="w-12 h-12 rounded-full shadow-lg border-2 border-white mb-2"
                                            style={{ backgroundColor: color.hex }}
                                        />
                                        <span className="font-medium text-gray-900 text-sm">{color.nameTR}</span>
                                        {color.popular && (
                                            <span className="text-xs text-purple-600 font-medium">⭐ Popüler</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Interactive Configurator Section */}
                <section id="konfigurator" className="py-20 bg-gradient-to-br from-purple-900 to-indigo-900">
                    <div className="container mx-auto px-4">
                        <div className="max-w-xl mx-auto">
                            <div className="text-center mb-10">
                                <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                                    🛁 Duşakabin Tasarlayın
                                </h2>
                                <p className="text-purple-200">
                                    4 adımda size özel duşakabin konfigürasyonu oluşturun, WhatsApp ile teklif alın
                                </p>
                            </div>

                            <DusakabinConfigurator />
                        </div>
                    </div>
                </section>

                {/* Authority Content - Guides */}
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="max-w-5xl mx-auto">
                            <div className="text-center mb-10">
                                <span className="inline-block px-4 py-1 bg-amber-100 text-amber-700 text-sm font-bold rounded-full mb-4">
                                    📚 REHBERLER
                                </span>
                                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4">
                                    Duşakabin Alırken Bilmeniz Gerekenler
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {authorityGuides.map((guide) => (
                                    <div
                                        key={guide.id}
                                        className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all border border-gray-100"
                                    >
                                        <h3 className="font-bold text-gray-900 text-lg mb-2">{guide.title}</h3>
                                        <p className="text-gray-600 text-sm mb-4">{guide.summary}</p>
                                        <div className="space-y-3">
                                            {guide.sections.map((section, idx) => (
                                                <div key={idx} className="pl-4 border-l-2 border-purple-200">
                                                    <h4 className="font-medium text-gray-900 text-sm">{section.heading}</h4>
                                                    <p className="text-xs text-gray-500">{section.content.slice(0, 100)}...</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* WhatsApp CTA Section */}
                <section className="py-16 bg-gradient-to-r from-green-500 to-emerald-600">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                            📸 Banyonuzun Fotoğrafını Gönderin
                        </h2>
                        <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
                            WhatsApp üzerinden banyo fotoğrafınızı gönderin, size özel tasarım ve fiyat çalışalım.
                            <strong className="text-white">Ücretsiz keşif + özel ölçü üretim.</strong>
                        </p>
                        <a
                            href={`https://wa.me/${businessConfig.contact.whatsapp}?text=${encodeURIComponent("Merhaba, banyomun fotoğrafını göndermek istiyorum. Duşakabin fiyat teklifi alabilir miyim?")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-green-600 font-bold text-lg rounded-2xl hover:bg-green-50 transition-all shadow-xl"
                        >
                            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            WhatsApp ile Fiyat Al
                        </a>
                    </div>
                </section>

                {/* CTA Section */}
                <CTASection />

                {/* Local SEO Footer */}
                <section className="py-12 bg-gray-100">
                    <div className="container mx-auto px-4">
                        <div className="text-center text-sm text-gray-600">
                            <p className="mb-4">
                                <strong>Duşakabin Hizmet Bölgelerimiz:</strong>
                            </p>
                            <p className="mb-2">
                                Beylikdüzü Duşakabin | Esenyurt Cam Duşakabin | Büyükçekmece Çerçevesiz Duşakabin |
                                Avcılar Walk-in Duşakabin | Bahçeşehir Siyah Duşakabin | Küçükçekmece Duşakabin Montaj
                            </p>
                            <p className="text-gray-500">
                                Duşakabin fiyatları 2026 | Temperli cam duşakabin modelleri | Özel ölçü duşakabin imalatı |
                                Teknesiz duşakabin çözümleri | Manyetik mıknatıslı fitil | Paslanmaz profil garantisi
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
