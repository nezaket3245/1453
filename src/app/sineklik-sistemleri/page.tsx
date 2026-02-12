/**
 * Sineklik Systems Main Page — v3.0 Visual Redesign
 * SEO-optimized landing page for fly screen systems
 * Target: Beylikdüzü, İstanbul Avrupa Yakası
 * Enhanced: Vibrant visual design, wave dividers, gradient accents
 */

import { Metadata } from 'next';
import Link from 'next/link';
import {
    sineklikSystems,
    sineklikSeoKeywords,
    sineklikColorOptions,
} from '@/lib/sineklikData';
import { businessConfig } from '@/config/business.config';
import SineklikTestimonials from './SineklikTestimonials';
import PetScreenHighlight from './PetScreenHighlight';
import AnimatedPliseSineklik from '@/components/ui/AnimatedPliseSineklik';
import OptimizedImage from "@/components/ui/OptimizedImage";
import { HeaderOptimized } from '@/components/layout/HeaderOptimized';
import { Footer } from '@/components/layout/Footer';
import SineklikProductCard from './SineklikProductCard';

/* ── Reusable Wave Dividers ─────────────────────────────── */
function WaveDivider({ flip = false, color = '#f9fafb' }: { flip?: boolean; color?: string }) {
    return (
        <div className={`w-full overflow-hidden leading-none ${flip ? 'rotate-180' : ''}`} aria-hidden="true">
            <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-12 md:h-16 lg:h-20">
                <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,40 1440,40 L1440,80 L0,80 Z" fill={color} />
            </svg>
        </div>
    );
}

// SEO Metadata — keyword-rich title & description
export const metadata: Metadata = {
    title: 'Sineklik Sistemleri 2026 Plise ve Kedi',
    description: 'Sineklik sistemleri: plise sineklik, kedi sinekliği, sürme ve menteşeli modeller. Pimapen sineklik özel ölçü imalat, hızlı montaj. Ücretsiz keşif için arayın.',
    keywords: [
        'sineklik sistemleri',
        'sineklik sistemleri 2026',
        'plise sineklik',
        'pileli sineklik fiyatları 2026',
        'pimapen sineklik',
        'yırtılmaz kedi sinekliği',
        'sürme kayır sineklik sistemleri',
        'pencere ve kapı sineklik çözümleri',
        'mıknatıslı sineklik montajı',
        ...sineklikSeoKeywords.core,
        ...sineklikSeoKeywords.pet,
        ...sineklikSeoKeywords.local,
    ].join(', '),
    openGraph: {
        title: 'Sineklik Sistemleri | Plise & Kedi Sinekliği | Egepen Akçayapı',
        description: 'Sineklik sistemleri: plise sineklik, kedi sinekliği, pimapen sineklik modelleri. İstanbul Avrupa Yakası ücretsiz keşif ve montaj.',
        type: 'website',
        locale: 'tr_TR',
    },
    alternates: {
        canonical: `${businessConfig.siteUrl}/sineklik-sistemleri`,
    },
};

// JSON-LD Schema for Local Service + AggregateRating
const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Sineklik Sistemleri Montaj ve Tamiratı',
    description: 'Pileli sineklik, yırtılmaz kedi sinekliği, sürme ve menteşeli sineklik sistemleri. Özel ölçü imalat, hızlı montaj ve ücretsiz keşif.',
    provider: {
        '@type': 'LocalBusiness',
        name: 'Egepen Akçayapı',
        image: `${businessConfig.siteUrl}/images/showroom-main.png`,
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'Gürpınar Mahallesi',
            addressLocality: 'Beylikdüzü',
            addressRegion: 'İstanbul',
            postalCode: '34528',
            addressCountry: 'TR',
        },
        telephone: businessConfig.contact.mobile,
        priceRange: '₺₺',
        url: businessConfig.siteUrl,
    },
    areaServed: {
        '@type': 'City',
        name: 'İstanbul',
    },
    serviceType: ['Sineklik Montajı', 'Sineklik Tamiri', 'Kedi Sinekliği', 'Pileli Sineklik', 'Sürme Sineklik'],
};

// Product ItemList schema for rich SERP snippets
const productListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Sineklik Sistemleri',
    numberOfItems: sineklikSystems.length,
    itemListElement: sineklikSystems.map((system, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        item: {
            '@type': 'Product',
            name: system.name,
            description: system.description,
            image: `${businessConfig.siteUrl}${system.image}`,
            url: `${businessConfig.siteUrl}/sineklik-sistemleri/${system.slug}`,
            brand: { '@type': 'Brand', name: 'Egepen Akçayapı' },
            offers: {
                '@type': 'Offer',
                availability: 'https://schema.org/InStock',
                priceCurrency: 'TRY',
                seller: { '@type': 'Organization', name: 'Egepen Akçayapı' },
            },
        },
    })),
};

// BreadcrumbList JSON-LD for sineklik section
const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: `${businessConfig.siteUrl}` },
        { '@type': 'ListItem', position: 2, name: 'Sineklik Sistemleri', item: `${businessConfig.siteUrl}/sineklik-sistemleri` },
    ],
};

// FAQPage JSON-LD for common sineklik questions
const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'Kedi sinekliği tülü dayanıklı mı?',
            acceptedAnswer: { '@type': 'Answer', text: 'Evet, kedi sinekliğinde kullanılan TuffScreen tül standart tüllere göre 7 kat daha dayanıklıdır. Tırmalama ve ısırmaya karşı dirençlidir.' },
        },
        {
            '@type': 'Question',
            name: 'Pileli sineklik temizliği nasıl yapılır?',
            acceptedAnswer: { '@type': 'Answer', text: 'Pileli sineklik tülü nemli bir bezle silinebilir. Plise akordiyon mekanizması 6 ayda bir silikon bazlı sprey ile yağlanmalıdır.' },
        },
        {
            '@type': 'Question',
            name: 'Mıknatıslı sineklik montajı nasıl yapılır?',
            acceptedAnswer: { '@type': 'Answer', text: 'Mıknatıslı sineklik montajı vida veya yapıştırma yöntemiyle yapılır. Profesyonel ekibimiz 15-30 dakikada montajı tamamlar.' },
        },
        {
            '@type': 'Question',
            name: 'Sürme (kayar) sineklik hangi pencereler için uygundur?',
            acceptedAnswer: { '@type': 'Answer', text: 'Sürme sineklik sistemleri geniş pencereler, balkon kapıları ve teras çıkışları için idealdir. Ray sistemi ile kolay açılıp kapanır.' },
        },
    ],
};

// Category cards data
const categories = [
    {
        id: 'plise',
        title: 'Plise (Pileli) Sineklik',
        description: 'Akordiyon katlama, alan tasarrufu, ip gerginlik sistemi',
        icon: 'plise',
        href: '#plise',
        highlight: 'En Popüler',
    },
    {
        id: 'kedi',
        title: 'Kedi Sinekliği',
        description: '7x dayanıklı TuffScreen, yırtılmaz, emniyet kilidi',
        icon: 'kedi',
        href: '#kedi-sinekligi',
        highlight: 'Yüksek Talep',
    },
    {
        id: 'surme-menteseli',
        title: 'Sürme & Menteşeli',
        description: 'Klasik güvenilirlik, kolay temizlik, kapılar için ideal',
        icon: 'surme',
        href: '#surme-menteseli',
        highlight: 'Ekonomik',
    },
    {
        id: 'stor',
        title: 'Stor Sineklik',
        description: 'Gizli kutu, otomatik sarım, modern tasarım',
        icon: 'stor',
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
            {/* JSON-LD: Service + Breadcrumb + FAQ + ProductList schemas */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify([localBusinessSchema, breadcrumbSchema, faqSchema, productListSchema]),
                }}
            />

            <HeaderOptimized />

            <main id="main-content" className="min-h-screen bg-white">

                {/* ═══════════════════════════════════════════════════════
                    HERO SECTION — Full-bleed image with subtle overlay
                ═══════════════════════════════════════════════════════ */}
                <section className="relative bg-gradient-to-br from-emerald-950 via-teal-900 to-slate-900 min-h-[55vh] lg:min-h-[65vh] flex items-center" aria-labelledby="hero-title">
                    <div className="absolute inset-0">
                        <OptimizedImage src="/images/showroom-main.png" alt="" fill className="object-cover" role="presentation" priority />
                        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/60 via-transparent to-transparent" />
                    </div>
                    <div className="container mx-auto px-4 relative z-10 py-20">
                        <nav aria-label="Breadcrumb" className="mb-8 max-w-4xl mx-auto">
                            <ol className="flex items-center gap-2 text-sm text-white/70 justify-center">
                                <li><Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link></li>
                                <li className="text-white/60">/</li>
                                <li className="text-white font-medium">Sineklik Sistemleri</li>
                            </ol>
                        </nav>
                        <div className="max-w-4xl mx-auto text-center">
                            <span className="sr-only">Beylikdüzü&apos;nde 40 Yıl Tecrübe</span>
                            <h1 id="hero-title" className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">Modern ve Dayanıklı Sineklik Sistemleri</h1>
                            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">Plise, sürme ve kedi sinekliği dahil tüm modellerde özel ölçü imalat ve hızlı montaj. Beylikdüzü ve çevresinde ücretsiz keşif.</p>
                        </div>
                    </div>
                    {/* Bottom wave transition */}
                    <div className="absolute bottom-0 left-0 right-0">
                        <WaveDivider color="#f0fdf4" />
                    </div>
                </section>

                {/* KAMPANYA UYARI BARI */}
                <div className="bg-rose-600 text-white py-2.5">
                    <div className="container mx-auto px-4 flex items-center justify-center gap-3 text-sm">
                        <span className="font-bold bg-white/20 px-2 py-0.5 rounded text-xs">KAMPANYA</span>
                        <span>Tüm renkli sineklik profilleri <strong className="text-yellow-300">beyaz fiyatına!</strong></span>
                        <a href="tel:+902128755036" className="underline font-semibold hover:text-yellow-200 transition-colors">Hemen Ara →</a>
                    </div>
                </div>

                {/* QUICK STATS BAR */}
                <section className="bg-emerald-50 py-10 lg:py-12" aria-label="İstatistikler">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
                            {[
                                { value: '10.000+', label: 'Başarılı Montaj', icon: '🏠' },
                                { value: '40 Yıl', label: 'Sektör Tecrübesi', icon: '⭐' },
                                { value: '2 Yıl', label: 'Garanti Süresi', icon: '🛡️' },
                                { value: '%100', label: 'Müşteri Memnuniyeti', icon: '💚' },
                            ].map((stat) => (
                                <div key={stat.label} className="text-center group">
                                    <div className="text-3xl mb-2">{stat.icon}</div>
                                    <div className="text-2xl md:text-3xl font-extrabold text-emerald-700 mb-1">{stat.value}</div>
                                    <div className="text-sm text-emerald-700 font-medium">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════
                    MODEL CATEGORIES — Colorful card grid
                ═══════════════════════════════════════════════════════ */}
                <section id="models" className="py-16 lg:py-20 bg-white" aria-labelledby="models-heading">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 id="models-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Sineklik Sistemleri &mdash; Tüm Modeller
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">
                                Evinize en uygun sineklik modelini seçin.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6" role="navigation" aria-label="Sineklik kategorileri">
                            {categories.map((category, idx) => {
                                const gradients = [
                                    'from-emerald-500 to-teal-600',
                                    'from-amber-500 to-orange-600',
                                    'from-blue-500 to-indigo-600',
                                    'from-purple-500 to-pink-600',
                                ];
                                const iconBgs = [
                                    'bg-emerald-400/20',
                                    'bg-amber-400/20',
                                    'bg-blue-400/20',
                                    'bg-purple-400/20',
                                ];
                                return (
                                    <a
                                        key={category.id}
                                        href={category.href}
                                        className={`group relative bg-gradient-to-br ${gradients[idx]} rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-[box-shadow,transform] duration-300 hover:-translate-y-1 text-white overflow-hidden`}
                                    >
                                        <div className="relative z-10">
                                            {category.highlight && (
                                                <span className="inline-block px-2.5 py-0.5 bg-white/20 backdrop-blur-sm text-white text-xs font-bold rounded-full mb-3 border border-white/20">
                                                    {category.highlight}
                                                </span>
                                            )}
                                            <div className={`w-12 h-12 ${iconBgs[idx]} rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm`}>
                                                {category.icon === 'plise' && <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>}
                                                {category.icon === 'kedi' && <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286z" /></svg>}
                                                {category.icon === 'surme' && <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" /></svg>}
                                                {category.icon === 'stor' && <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21l3.75-3.75" /></svg>}
                                            </div>
                                            <h3 className="text-lg font-bold mb-2 group-hover:translate-x-1 transition-transform">
                                                {category.title}
                                            </h3>
                                            <p className="text-sm text-white/80 leading-relaxed">{category.description}</p>
                                        </div>
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </section>



                {/* ═══════════════════════════════════════════════════════
                    KEDİ SİNEKLİĞİ — High priority, warm palette
                ═══════════════════════════════════════════════════════ */}
                <section id="kedi-sinekligi" className="py-16 lg:py-20 bg-amber-50" aria-labelledby="kedi-heading">
                    <div className="container mx-auto px-4">
                        <PetScreenHighlight system={kediSystem!} />
                    </div>
                </section>

                <section id="plise" className="py-16 lg:py-20 bg-white" aria-labelledby="plise-heading">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
                                ⭐ En Çok Tercih Edilen
                            </span>
                            <h2 id="plise-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Plise Sineklik Sistemleri
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">
                                Akordiyon katlama teknolojisi ile kullanılmadığında görünmez.
                            </p>
                        </div>

                        {/* Interactive Plise Animation */}
                        <div className="max-w-sm mx-auto bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-5 border border-amber-200/50 shadow-lg mb-16">
                            <h3 className="text-lg font-bold text-amber-900 mb-4 text-center flex items-center justify-center gap-2">
                                <span className="w-7 h-7 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 text-xs">▶</span>
                                İnteraktif Mekanizma
                            </h3>
                            <AnimatedPliseSineklik />
                            <div className="mt-4 text-amber-700/70 text-xs italic text-center">
                                * Duble plise sineklik sistemimizin ortadan açılıp kapanma animasyonu
                            </div>
                        </div>

                        {/* Product Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {pliseSystems.map((system) => (
                                <SineklikProductCard
                                    key={system.id}
                                    name={system.name}
                                    slug={system.slug}
                                    tagline={system.tagline}
                                    description={system.description}
                                    image={system.image}
                                    features={system.features}
                                    priceRange={system.priceRange as "ekonomik" | "orta" | "premium"}
                                    accent="emerald"
                                />
                            ))}
                        </div>

                        {/* IP Gerginlik Özelliği */}
                        <div className="mt-10 bg-emerald-600 rounded-2xl p-8 text-white">
                            <div className="max-w-3xl">
                                <h3 className="text-xl md:text-2xl font-bold mb-4">
                                    Rüzgarda Sallanma Yok: İp Gerginlik Sistemi
                                </h3>
                                <p className="text-emerald-100 mb-5 leading-relaxed">
                                    Plise sinekliklerimizde özel ip gerginlik ayarı bulunur. Bu sistem tülün her zaman gergin kalmasını sağlar.
                                </p>
                                <ul className="space-y-2">
                                    {['IP gerginlik ayarı ile sabit tül', 'Çift kılavuz ray sistemi', '10+ yıl mekanizma ömrü'].map((item, i) => (
                                        <li key={i} className="flex items-center">
                                            <span className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center mr-3 text-xs flex-shrink-0">✓</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="surme-menteseli" className="py-16 lg:py-20 bg-gray-50" aria-labelledby="surme-heading">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
                                Klasik Güvenilirlik
                            </span>
                            <h2 id="surme-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Sürme ve Menteşeli Sineklik Sistemleri
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">
                                Pencere ve kapı sineklik çözümleri: kolay temizlik ve uzun ömürlü kullanım.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {surmeMenteseliSystems.map((system) => (
                                <SineklikProductCard
                                    key={system.id}
                                    name={system.name}
                                    slug={system.slug}
                                    tagline={system.tagline}
                                    description={system.description}
                                    image={system.image}
                                    features={system.features}
                                    priceRange={system.priceRange as "ekonomik" | "orta" | "premium"}
                                    accent="blue"
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* STOR */}
                <section id="stor" className="py-16 lg:py-20 bg-white" aria-labelledby="stor-heading">
                    <div className="container mx-auto px-4">
                        {/* Stok Uyarısı */}
                        <div className="bg-red-50 border-2 border-red-400 text-red-800 rounded-xl px-6 py-4 mb-10 flex items-center justify-center gap-3 text-base font-bold shadow-sm">
                            <svg className="w-7 h-7 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>
                            <span>⚠️ Stor sineklik şu an <strong className="text-red-900 underline">STOKTA BULUNMAMAKTADIR.</strong> Alternatif olarak plise sineklik modellerimizi inceleyebilirsiniz.</span>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
                                    ✨ Minimal Tasarım
                                </span>
                                <h2 id="stor-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                    {storSystem?.name}
                                </h2>
                                <p className="text-purple-600 font-semibold text-lg mb-4">
                                    {storSystem?.tagline}
                                </p>
                                <p className="text-gray-600 mb-8 leading-relaxed text-lg">{storSystem?.longDescription}</p>

                                <div className="space-y-3 mb-8">
                                    {storSystem?.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-center group/item">
                                            <span className="w-8 h-8 bg-gradient-to-br from-purple-100 to-pink-100 text-purple-600 rounded-xl flex items-center justify-center mr-3 text-sm flex-shrink-0 group-hover/item:scale-110 transition-transform">✓</span>
                                            <span className="text-gray-700">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <Link
                                    href={`/sineklik-sistemleri/${storSystem?.slug}`}
                                    className="inline-flex items-center gap-2 px-7 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-2xl transition-[box-shadow,transform] shadow-lg hover:shadow-xl focus:ring-2 focus:ring-purple-500 focus:outline-none min-h-[48px]"
                                    aria-label={`${storSystem?.name} detaylarını incele`}
                                >
                                    Detayları İncele
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                                </Link>
                            </div>
                            <div className="relative h-80 md:h-96 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl overflow-hidden shadow-md">
                                <OptimizedImage
                                    src={storSystem?.image || '/images/sineklik/yatay-plise-sineklik.png'}
                                    alt={`${storSystem?.name || 'Stor Sineklik'} - Pencere Sineklik Uygulaması`}
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    className="object-contain p-8"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* KAMPANYA HATIRLATMA */}
                <div className="bg-rose-600 text-white py-3">
                    <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm">
                        <span className="flex items-center gap-2">
                            <span className="font-bold bg-white/20 px-2 py-0.5 rounded text-xs">KAMPANYA</span>
                            Renkli profiller <strong className="text-yellow-300">beyaz fiyatına</strong> — Aşağıdaki renk seçeneklerinin hepsi aynı fiyat!
                        </span>
                        <a href="tel:+902128755036" className="underline font-semibold hover:text-yellow-200">📞 Ara</a>
                    </div>
                </div>

                {/* RENK SEÇENEKLERİ */}
                <section id="renkler" className="py-16 lg:py-20 bg-pink-50" aria-labelledby="renkler-heading">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-10">
                            <span className="inline-block px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-medium mb-4">
                                🎨 Renk Paleti
                            </span>
                            <h2 id="renkler-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Sineklik Profil Renkleri
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto text-base leading-relaxed">
                                Antrasit, ahşap desenli ve özel RAL renklerle PVC pencerelerinizle %100 uyumlu profiller.
                            </p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-6">
                            {sineklikColorOptions.map((color) => (
                                <div key={color.name} className="flex flex-col items-center">
                                    <div
                                        className="w-16 h-16 rounded-xl border-2 border-white shadow-md mb-2"
                                        style={{ backgroundColor: color.hex }}
                                    />
                                    <span className="text-sm font-medium text-gray-800">{color.name}</span>
                                    {color.ral && <span className="text-xs text-gray-600">{color.ral}</span>}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* MÜŞTERİ YORUMLARI */}
                <section className="py-16 lg:py-20 bg-emerald-50" aria-labelledby="testimonials-heading">
                    <div className="container mx-auto px-4">
                        <SineklikTestimonials />
                    </div>
                </section>

                {/* TEKLİF FORMU - gizlendi */}

            </main>

            <Footer />
        </>
    );
}
