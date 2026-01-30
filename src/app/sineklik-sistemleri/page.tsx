/**
 * Sineklik & Panjur Systems Main Page
 * SEO-optimized landing page for fly screen and shutter systems
 * Target: Beylikdüzü, İstanbul Avrupa Yakası
 * Enhanced: Material science focus, decision assistant, mesh visibility demo
 */

import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
    sineklikSystems,
    meshTypes,
    sineklikComparisonCriteria,
    sineklikComparisonMatrix,
    maintenanceGuide,
    sineklikSeoKeywords,
    sineklikColorOptions,
    advancedSystemMechanics,
    decisionMatrixCriteria,
} from '@/lib/sineklikData';
import { CTASection } from '@/components/sections/CTASection';
import SineklikComparisonTable from './SineklikComparisonTable';
import MeshComparisonSection from './MeshComparisonSection';
import MaintenanceGuideSection from './MaintenanceGuideSection';
import PetScreenHighlight from './PetScreenHighlight';
import QuickQuoteForm from './QuickQuoteForm';
import SineklikDecisionAssistant from './SineklikDecisionAssistant';
import MeshVisibilitySlider from './MeshVisibilitySlider';
import AnimatedPliseSineklik from '@/components/ui/AnimatedPliseSineklik';

// SEO Metadata
export const metadata: Metadata = {
    title: 'Sineklik Sistemleri | Kedi Sinekliği | Plise Sineklik | Beylikdüzü',
    description: 'Beylikdüzü sineklik montajı, kedi sinekliği, plise sineklik, sürme sineklik. Yırtılmaz tül, TuffScreen pet screen. İstanbul Avrupa Yakası ücretsiz keşif.',
    keywords: [
        ...sineklikSeoKeywords.core,
        ...sineklikSeoKeywords.pet,
        ...sineklikSeoKeywords.local,
    ].join(', '),
    openGraph: {
        title: 'Sineklik Sistemleri | Egepen Akçayapı',
        description: 'Kedi sinekliği, plise sineklik, sürme ve menteşeli sineklik. İstanbul Avrupa Yakası ücretsiz keşif ve montaj.',
        type: 'website',
        locale: 'tr_TR',
    },
    alternates: {
        canonical: 'https://www.egepenakcayapi.com.tr/sineklik-sistemleri',
    },
};

// JSON-LD Schema for Local Service
const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Sineklik Montaj ve Tamiratı',
    description: 'Profesyonel sineklik montajı, tamiri ve bakımı. Plise, kedi sinekliği, sürme, menteşeli ve stor sineklik sistemleri.',
    provider: {
        '@type': 'LocalBusiness',
        name: 'Egepen Akçayapı',
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'Gürpınar Mahallesi',
            addressLocality: 'Beylikdüzü',
            addressRegion: 'İstanbul',
            postalCode: '34528',
            addressCountry: 'TR',
        },
        telephone: '+90-532-000-0000',
        priceRange: '₺₺',
    },
    areaServed: {
        '@type': 'City',
        name: 'İstanbul',
    },
    serviceType: ['Sineklik Montajı', 'Sineklik Tamiri'],
};

// Category cards data
const categories = [
    {
        id: 'plise',
        title: 'Plise (Pileli) Sineklik',
        description: 'Akordiyon katlama, alan tasarrufu, ip gerginlik sistemi',
        icon: '🔄',
        href: '#plise',
        highlight: 'En Popüler',
    },
    {
        id: 'kedi',
        title: 'Kedi Sinekliği',
        description: '7x dayanıklı TuffScreen, yırtılmaz, emniyet kilidi',
        icon: '🐱',
        href: '#kedi-sinekligi',
        highlight: 'Yüksek Talep',
    },
    {
        id: 'surme-menteseli',
        title: 'Sürme & Menteşeli',
        description: 'Klasik güvenilirlik, kolay temizlik, kapılar için ideal',
        icon: '🚪',
        href: '#surme-menteseli',
        highlight: 'Ekonomik',
    },
    {
        id: 'stor',
        title: 'Stor Sineklik',
        description: 'Gizli kutu, otomatik sarım, modern tasarım',
        icon: '📜',
        href: '#stor',
        highlight: 'Minimal',
    },
];

export default function SineklikPage() {
    // Group systems by category
    const pliseSystems = sineklikSystems.filter((s) => s.category === 'plise');
    const kediSystem = sineklikSystems.find((s) => s.category === 'kedi');
    const surmeMenteseliSystems = sineklikSystems.filter(
        (s) => s.category === 'surme' || s.category === 'menteseli'
    );
    const storSystem = sineklikSystems.find((s) => s.category === 'stor');

    return (
        <>
            {/* JSON-LD Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(localBusinessSchema),
                }}
            />

            <main className="min-h-screen bg-white">
                {/* Hero Section */}
                <section className="relative bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-800 py-20 lg:py-28">
                    <div className="absolute inset-0 bg-[url('/images/sineklik/duble-plise-sineklik.jpg')] bg-cover bg-center opacity-10" />
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-4xl mx-auto text-center">
                            <span className="inline-block px-4 py-2 bg-emerald-500/20 text-emerald-300 rounded-full text-sm font-medium mb-6">
                                🏆 Beylikdüzü&apos;nde 25+ Yıl Tecrübe
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                                Sineklik
                                <span className="text-emerald-400"> Sistemleri</span>
                            </h1>
                            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                                Kedi sinekliği, plise sineklik, sürme ve menteşeli sineklik sistemleri.
                                <strong className="text-emerald-300"> Yırtılmaz TuffScreen tül</strong> ve
                                <strong className="text-emerald-300"> RAL renk seçenekleri</strong> ile
                                profesyonel çözümler.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Link
                                    href="/teklif-al"
                                    className="inline-flex items-center px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-emerald-500/25"
                                >
                                    <span className="mr-2">📐</span>
                                    Ücretsiz Keşif
                                </Link>
                                <a
                                    href="tel:+905320000000"
                                    className="inline-flex items-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all border border-white/20"
                                >
                                    <span className="mr-2">📞</span>
                                    Hemen Arayın
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Quick Navigation Categories */}
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                Sineklik Modelleri
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                İhtiyacınıza uygun sineklik sistemini seçin. Her model için
                                detaylı teknik özellikler ve fiyat bilgisi.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {categories.map((category) => (
                                <a
                                    key={category.id}
                                    href={category.href}
                                    className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-emerald-200"
                                >
                                    <div className="relative">
                                        {category.highlight && (
                                            <span className="absolute -top-2 -right-2 px-2 py-1 bg-emerald-500 text-white text-xs font-medium rounded-full">
                                                {category.highlight}
                                            </span>
                                        )}
                                        <div className="text-4xl mb-4">{category.icon}</div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                                            {category.title}
                                        </h3>
                                        <p className="text-sm text-gray-500">{category.description}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                {/* NEW: Mesh Visibility Comparison */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-10">
                            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
                                🔬 Bilimsel Karşılaştırma
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Premium Siyah Tül vs. Ucuz Gri Tül
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Tül rengi ve kalitesi, manzara netliğinizi doğrudan etkiler.
                                Kaydırarak farkı görün!
                            </p>
                        </div>
                        <MeshVisibilitySlider />
                    </div>
                </section>

                {/* NEW: Decision Assistant Section */}
                <section className="py-16 bg-gradient-to-br from-slate-50 to-emerald-50">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-10">
                            <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
                                🎯 Akıllı Öneri Sistemi
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Size Uygun Sinekliği Bulun
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                4 basit soruya cevap verin, evinize en uygun sineklik sistemini
                                ve tül tipini belirleyelim.
                            </p>
                        </div>
                        <SineklikDecisionAssistant />
                    </div>
                </section>

                {/* Kedi Sinekliği - HIGH PRIORITY SECTION */}
                <section id="kedi-sinekligi" className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
                    <div className="container mx-auto px-4">
                        <PetScreenHighlight system={kediSystem!} />
                    </div>
                </section>

                {/* Plise Systems Section */}
                <section id="plise" className="py-20 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
                                En Çok Tercih Edilen
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Plise (Pileli) Sineklik Sistemleri
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto mb-10">
                                Akordiyon katlama teknolojisi ile kullanılmadığında görünmez. İp gerginlik
                                sistemi sayesinde rüzgarda sallanmaz.
                            </p>

                            {/* New: Animated Interactive Component */}
                            <div className="max-w-2xl mx-auto bg-amber-50 rounded-3xl p-8 border border-amber-100 shadow-inner mb-20">
                                <h3 className="text-2xl font-bold text-amber-900 mb-6">İnteraktif Mekanizma Deneyimi</h3>
                                <AnimatedPliseSineklik />
                                <div className="mt-8 text-amber-800 text-sm italic">
                                    * Yukarıdaki animasyon, duble plise sineklik sistemimizin nasıl ortadan açılıp kapandığını göstermektedir.
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {pliseSystems.map((system) => (
                                <div
                                    key={system.id}
                                    className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all group"
                                >
                                    <div className="relative h-64 bg-gradient-to-br from-emerald-600 to-teal-700">
                                        <Image
                                            src={system.image}
                                            alt={system.name}
                                            fill
                                            className="object-contain p-8 group-hover:scale-105 transition-transform"
                                        />
                                        <div className="absolute bottom-4 left-4">
                                            <span className="px-3 py-1 bg-white/90 text-emerald-700 text-sm font-medium rounded-full">
                                                {system.warranty}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                                            {system.name}
                                        </h3>
                                        <p className="text-emerald-600 font-medium text-sm mb-3">
                                            {system.tagline}
                                        </p>
                                        <p className="text-gray-600 text-sm mb-4">
                                            {system.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {system.features.slice(0, 4).map((feature, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-lg"
                                                >
                                                    {feature}
                                                </span>
                                            ))}
                                        </div>
                                        <Link
                                            href={`/sineklik-sistemleri/${system.slug}`}
                                            className="inline-flex items-center text-emerald-600 font-semibold hover:text-emerald-700"
                                        >
                                            Detaylar ve Fiyat
                                            <svg
                                                className="w-4 h-4 ml-2"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 5l7 7-7 7"
                                                />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Plise Technical Detail - IP Gerginlik */}
                        <div className="mt-12 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                                <div className="md:col-span-2">
                                    <h3 className="text-2xl font-bold mb-4">
                                        🎯 Rüzgarda Sallanma Yok: İp Gerginlik Sistemi
                                    </h3>
                                    <p className="text-emerald-100 mb-4">
                                        Plise sinekliklerimizde özel ip gerginlik ayarı bulunur. Bu sistem
                                        tülün her zaman gergin kalmasını sağlar ve rüzgarda bile sallanma
                                        yapmaz. Alt ve üst kılavuz raylar tülü sabit tutar.
                                    </p>
                                    <ul className="space-y-2">
                                        <li className="flex items-center">
                                            <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-3 text-sm">
                                                ✓
                                            </span>
                                            IP gerginlik ayarı ile sabit tül
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-3 text-sm">
                                                ✓
                                            </span>
                                            Çift kılavuz ray sistemi
                                        </li>
                                        <li className="flex items-center">
                                            <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center mr-3 text-sm">
                                                ✓
                                            </span>
                                            10+ yıl mekanizma ömrü
                                        </li>
                                    </ul>
                                </div>
                                <div className="text-center">
                                    <div className="text-8xl opacity-50">🌀</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Sürme & Menteşeli Section */}
                <section id="surme-menteseli" className="py-20 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Sürme & Menteşeli Sineklik
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Klasik güvenilirlik, kolay temizlik ve ekonomik fiyat. Pencere ve kapılar
                                için ideal çözümler.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {surmeMenteseliSystems.map((system) => (
                                <div
                                    key={system.id}
                                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
                                >
                                    <div className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900">
                                                    {system.name}
                                                </h3>
                                                <p className="text-emerald-600 font-medium">
                                                    {system.tagline}
                                                </p>
                                            </div>
                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-medium ${system.priceRange === 'ekonomik'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-blue-100 text-blue-700'
                                                    }`}
                                            >
                                                {system.priceRange === 'ekonomik' ? 'Ekonomik' : 'Orta Segment'}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 text-sm mb-4">{system.description}</p>

                                        {/* Technical Specs Grid */}
                                        <div className="grid grid-cols-2 gap-3 mb-4">
                                            {system.technicalSpecs.slice(0, 4).map((spec, idx) => (
                                                <div
                                                    key={idx}
                                                    className="bg-gray-50 rounded-lg p-3"
                                                >
                                                    <p className="text-xs text-gray-500">{spec.label}</p>
                                                    <p className="text-sm font-semibold text-gray-900">
                                                        {spec.value}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>

                                        <Link
                                            href={`/sineklik-sistemleri/${system.slug}`}
                                            className="inline-flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors"
                                        >
                                            Detayları İncele
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Stor Section */}
                <section id="stor" className="py-20 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
                                    Minimal Tasarım
                                </span>
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                    {storSystem?.name}
                                </h2>
                                <p className="text-emerald-600 font-medium text-lg mb-4">
                                    {storSystem?.tagline}
                                </p>
                                <p className="text-gray-600 mb-6">{storSystem?.longDescription}</p>

                                <div className="space-y-3 mb-6">
                                    {storSystem?.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-center">
                                            <span className="w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mr-3 text-sm">
                                                ✓
                                            </span>
                                            <span className="text-gray-700">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <Link
                                    href={`/sineklik-sistemleri/${storSystem?.slug}`}
                                    className="inline-flex items-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors"
                                >
                                    Fiyat ve Detaylar
                                </Link>
                            </div>
                            <div className="relative h-96 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl">
                                <Image
                                    src={storSystem?.image || '/images/sineklik/yatay-plise-sineklik.png'}
                                    alt={storSystem?.name || 'Stor Sineklik'}
                                    fill
                                    className="object-contain p-8"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Panjur Section */}
                {/* Mesh Comparison Section */}
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <MeshComparisonSection meshTypes={meshTypes} />
                    </div>
                </section>

                {/* System Comparison Table */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-4">
                        <SineklikComparisonTable
                            systems={sineklikComparisonMatrix.systems}
                            criteria={sineklikComparisonCriteria}
                        />
                    </div>
                </section>

                {/* Color Options Section */}
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                🎨 RAL Renk Seçenekleri
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                Sadece beyaz değil! Antrasit, ahşap desenli ve özel RAL renklerle PVC
                                pencerelerinizle %100 uyumlu sineklik profilleri.
                            </p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-4">
                            {sineklikColorOptions.map((color) => (
                                <div
                                    key={color.name}
                                    className="flex flex-col items-center"
                                >
                                    <div
                                        className="w-16 h-16 rounded-full border-4 border-white shadow-lg mb-2"
                                        style={{ backgroundColor: color.hex }}
                                    />
                                    <span className="text-sm font-medium text-gray-900">
                                        {color.name}
                                    </span>
                                    {color.ral && (
                                        <span className="text-xs text-gray-500">{color.ral}</span>
                                    )}
                                    {color.popular && (
                                        <span className="text-xs text-emerald-600 font-medium">
                                            Popüler
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Maintenance Guide Section */}
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-4">
                        <MaintenanceGuideSection guide={maintenanceGuide} />
                    </div>
                </section>

                {/* Quick Quote Form */}
                <section className="py-20 bg-gradient-to-br from-emerald-600 to-teal-700">
                    <div className="container mx-auto px-4">
                        <QuickQuoteForm />
                    </div>
                </section>

                {/* CTA Section */}
                <CTASection />
            </main>
        </>
    );
}
