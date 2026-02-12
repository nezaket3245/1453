/**
 * Premium Duşakabin (Shower Enclosure) Main Page
 * SEO-optimized with Schema.org, Interactive Configurator, Authority Content
 * Target Keywords: Duşakabin fiyatları Beylikdüzü, Siyah çerçeveli duşakabin, etc.
 */

import { Metadata } from 'next';
import Link from 'next/link';
// Unused Image import removed — all images use OptimizedImage
// import Image from 'next/image';
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
import DusakabinConfigurator from './DusakabinConfigurator';
import { businessConfig } from '@/config/business.config';
import OptimizedImage from "@/components/ui/OptimizedImage";
import { HeaderOptimized } from '@/components/layout/HeaderOptimized';
import { Footer } from '@/components/layout/Footer';

// SEO Metadata - Optimized with target keywords
export const metadata: Metadata = {
    title: 'Duşakabin Modelleri ve Fiyatları 2026',
    description:
        'Temperli cam duşakabin modelleri ve uygun fiyatlar. Teknesiz duşakabin kurulumu, anti-kireç kolay temizlenen cam. Su sızdırmazlık, modern banyo tasarımları.',
    keywords: [
        ...dusakabinSeoKeywords.core,
        ...dusakabinSeoKeywords.blackEdition,
        ...dusakabinSeoKeywords.frameless,
        ...dusakabinSeoKeywords.local,
        ...dusakabinSeoKeywords.technical,
        'Duşakabin fiyatları 2026',
        'Siyah profilli duşakabin modelleri',
        'Temperli cam duşakabin',
        'Teknesiz duşakabin kurulumu',
        'Kolay temizlenen anti-kireç duşakabin camı',
    ].join(', '),
    openGraph: {
        title: 'Premium Duşakabin Sistemleri | Egepen Akçayapı',
        description: 'Siyah çerçeveli, çerçevesiz, walk-in duşakabin modelleri. Temperli cam, nano kaplama, profesyonel montaj.',
        type: 'website',
        locale: 'tr_TR',
    },
    alternates: {
        canonical: `${businessConfig.siteUrl}/dusakabin-sistemleri`,
    },
};

export default function DusakabinPage() {
    // Get systems by category
    const blackEditionSystems = getDusakabinSystemsByCategory('black-edition');
    const slidingCornerSystems = getDusakabinSystemsByCategory('sliding-corner');
    const hingedLuxurySystems = getDusakabinSystemsByCategory('hinged-luxury');
    const walkInSystems = getDusakabinSystemsByCategory('walk-in');

    // JSON-LD Schema - Service with AggregateRating and enriched description
    const serviceSchema = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Duşakabin Sistemleri ve Montaj',
        provider: {
            '@type': 'LocalBusiness',
            name: 'Egepen Akçayapı',
            address: {
                '@type': 'PostalAddress',
                streetAddress: 'Gürpınar Mah. Gürpınar Cad. No: 26A',
                addressLocality: 'Beylikdüzü',
                addressRegion: 'İstanbul',
                postalCode: '34528',
                addressCountry: 'TR',
            },
            telephone: '+902128801507',
            geo: {
                '@type': 'GeoCoordinates',
                latitude: '40.9942125',
                longitude: '28.6079794',
            },
        },
        areaServed: ['Beylikdüzü', 'Esenyurt', 'Büyükçekmece', 'Avcılar', 'Küçükçekmece'],
        description:
            'Duşakabin fiyatları, siyah profilli duşakabin modelleri, temperli cam duşakabin, teknesiz duşakabin kurulumu. Su sızdırmazlık, profesyonel montaj.',
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

    // FAQ Schema for authority content — with target questions
    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
            {
                '@type': 'Question',
                name: 'Duşakabin camı nasıl temizlenir?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Sirke-su karışımı veya anti-kireç sprey kullanın. Nano kaplamalı camlarda sadece ıslak bez yeterlidir. Her kullanımdan sonra camı silecek ile kurulayın.',
                },
            },
            {
                '@type': 'Question',
                name: 'Temperli cam patlar mı?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Temperli cam normal camdan 4-5 kat daha dayanıklıdır. Kırılma durumunda küçük küp parçalara ayrılarak yaralanma riskini minimize eder. EN 12150-1 standardına uygun üretilir.',
                },
            },
            {
                '@type': 'Question',
                name: 'Teknesiz duşakabin avantajları nelerdir?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Teknesiz (wet-room) duşakabin modern görünüm, kolay temizlik ve engelli/yaşlı dostu erişilebilirlik sağlar. Zemin eğimi ve fayans seçimi ile su sızdırmazlık sağlanır.',
                },
            },
        ],
    };

    return (
        <>
            {/* JSON-LD: Service + ProductList + FAQ + Breadcrumb schemas */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify([serviceSchema, productListSchema, faqSchema, {
                    '@context': 'https://schema.org',
                    '@type': 'BreadcrumbList',
                    itemListElement: [
                        { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: `${businessConfig.siteUrl}/` },
                        { '@type': 'ListItem', position: 2, name: 'Duşakabin Sistemleri', item: `${businessConfig.siteUrl}/dusakabin-sistemleri` },
                    ],
                }]) }}
            />

            <HeaderOptimized />

            <main id="main-content" className="min-h-screen bg-white">
                {/* Hero Section */}
                <section className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20 lg:py-28 overflow-hidden min-h-[50vh] lg:min-h-[60vh] flex items-center">
                    {/* Decorative Elements */}
                    <div className="absolute inset-0">
                        <OptimizedImage
                            src="/images/showroom-main.png"
                            alt=""
                            fill
                            className="object-cover"
                            priority
                            role="presentation"
                        />
                    </div>


                    <div className="container mx-auto px-4 relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                {/* Breadcrumb navigation */}
                                <nav aria-label="Breadcrumb" className="mb-6">
                                    <ol className="flex items-center gap-2 text-sm text-white/60">
                                        <li><Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link></li>
                                        <li className="text-white/40">/</li>
                                        <li className="text-white font-medium">Duşakabin Sistemleri</li>
                                    </ol>
                                </nav>

                                <div className="sr-only">
                                    <span>⭐ 4.9/5 Müşteri Puanı</span>
                                    <span>10 Yıla Kadar Dayanıklılık</span>
                                </div>

                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
                                    Şık ve Fonksiyonel Duşakabin Sistemleri
                                </h1>

                                <p className="text-lg md:text-xl text-white/80 mb-8 max-w-xl">
                                    Siyah profilli duşakabin modelleri, çerçevesiz lüks sistemler, walk-in açık konseptler.
                                    Temperli cam duşakabin, kolay temizlenen (anti-kireç) duşakabin camı,
                                    özel ölçü imalat. Teknesiz duşakabin kurulumu için ücretsiz keşif.
                                </p>

                                {/* Trust Badges — hidden */}
                                <div className="hidden">
                                    <span>Ücretsiz Keşif</span>
                                    <span>Özel Ölçü İmalat</span>
                                    <span>CE & TSE Sertifikalı</span>
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

                {/* Sineklik Kampanya Reklamı */}
                <div className="bg-rose-600 text-white py-2.5">
                    <div className="container mx-auto px-4 flex items-center justify-center gap-3 text-sm">
                        <span className="font-bold bg-white/20 px-2 py-0.5 rounded text-xs">KAMPANYA</span>
                        <span>Sineklikte tüm renkli profiller <strong className="text-yellow-300">beyaz fiyatına!</strong></span>
                        <Link href="/sineklik-sistemleri" className="underline font-semibold hover:text-yellow-200 transition-colors">Detaylar →</Link>
                    </div>
                </div>

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
                                    className="px-5 py-2.5 bg-white rounded-xl font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-shadow shadow-sm border"
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
                                    Temperli Cam Duşakabin: Güvenlik ve Estetik
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
                                        className="bg-gray-50 rounded-2xl p-5 text-center hover:shadow-lg hover:bg-white transition-shadow border border-gray-100"
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
                                    Siyah Profilli Duşakabin Modelleri — Black Edition
                                </h2>
                                <p className="text-gray-500 max-w-2xl mx-auto">
                                    Modern endüstriyel tasarımın zirvesi. <strong className="text-white">Mat siyah elektrostatik toz boya</strong> profiller,
                                    kontrast estetiği ve minimalist zarafet.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {blackEditionSystems.map((system) => (
                                    <Link
                                        key={system.id}
                                        href={`/dusakabin-sistemleri/${system.slug}`}
                                        className="group bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-shadow hover:shadow-2xl hover:shadow-purple-500/20 focus:ring-2 focus:ring-purple-400 focus:outline-none"
                                        aria-label={`${system.name} duşakabin detaylarına git`}
                                    >
                                        <div className="relative h-56 bg-gradient-to-br from-gray-800 to-gray-900">
                                            <OptimizedImage
                                                src={system.image}
                                                alt={`${system.name} - Siyah Profilli Duşakabin Modeli`}
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
                                            <p className="text-gray-500 text-sm mb-4">{system.tagline}</p>
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {system.features.slice(0, 3).map((feature, idx) => (
                                                    <span key={idx} className="px-2 py-1 bg-white/10 text-gray-300 text-xs rounded-lg">
                                                        {feature}
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-purple-400 font-bold">
                                                    Fiyat İçin Arayın
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
                                    Sürme & Köşe Girişli Duşakabin Sistemleri
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
                                        className="group bg-gray-50 rounded-3xl overflow-hidden border border-gray-200 hover:border-blue-500 transition-shadow hover:shadow-xl focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                        aria-label={`${system.name} duşakabin detaylarına git`}
                                    >
                                        <div className="relative h-56 bg-gradient-to-br from-blue-50 to-cyan-50">
                                            <OptimizedImage
                                                src={system.image}
                                                alt={`${system.name} - Sürme Duşakabin Sistemi`}
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
                                                    Fiyat İçin Arayın
                                                </span>
                                                <span className="text-gray-500 text-sm group-hover:text-blue-600 transition-colors">
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
                                    Kolay Temizlenen Duşakabin Camı: Anti-Kireç ve Nano Kaplama
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
                                        className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
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
                                    Menteşeli Lüks Duşakabin Serisi — Teknesiz Duşakabin Kurulumu
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
                                        className="group bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl overflow-hidden border border-purple-100 hover:border-purple-400 transition-shadow hover:shadow-xl focus:ring-2 focus:ring-purple-400 focus:outline-none"
                                        aria-label={`${system.name} duşakabin detaylarına git`}
                                    >
                                        <div className="relative h-60 bg-gradient-to-br from-purple-100 to-pink-100">
                                            <OptimizedImage
                                                src={system.image}
                                                alt={`${system.name} - Menteşeli Lüks Duşakabin`}
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
                                                    Fiyat İçin Arayın
                                                </span>
                                                <span className="text-gray-500 text-sm group-hover:text-purple-600 transition-colors">
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
                                    Walk-in Duşakabin ve Sabit Paneller
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
                                        className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-emerald-500 transition-shadow hover:shadow-lg focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                                        aria-label={`${system.name} walk-in duşakabin detaylarına git`}
                                    >
                                        <div className="relative h-48 bg-gradient-to-br from-emerald-50 to-teal-50">
                                            <OptimizedImage
                                                src={system.image}
                                                alt={`${system.name} - Walk-in Duşakabin Sistemi`}
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
                                                    Fiyat İçin Arayın
                                                </span>
                                                <span className="text-gray-500 text-xs">→</span>
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
                                    Profil Renk Seçenekleri
                                </h2>
                                <p className="text-gray-600">
                                    Elektrostatik toz boya ve PVD kaplama ile uzun ömürlü, çizilmeye dayanıklı yüzeyler
                                </p>
                            </div>

                            <div className="flex flex-wrap justify-center gap-4">
                                {profileColors.map((color) => (
                                    <div
                                        key={color.id}
                                        className="flex flex-col items-center p-4 bg-gray-50 rounded-xl hover:bg-white hover:shadow-lg transition-shadow"
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
                                        className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow border border-gray-100"
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
                                Teknesiz duşakabin çözümleri | Manyetik mıknatıslı fitil | Paslanmaz profil
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
