import { Metadata } from 'next';
import Link from 'next/link';
import OptimizedImage from '@/components/ui/OptimizedImage';
import { HeaderOptimized } from '@/components/layout/HeaderOptimized';
import { Footer } from '@/components/layout/Footer';
import { businessConfig } from '@/config/business.config';
import { glassSystems, glassTypes, colorOptions, seoKeywordClusters } from '@/lib/camBalkonData';
import { ComparisonMatrix } from '@/components/sections/ComparisonMatrix';
import { GlassSafetyComparison } from '@/components/sections/GlassSafetyComparison';
import { TechnicalFAQSection, camBalkonFAQs } from '@/components/sections/TechnicalFAQSection';

/**
 * Cam Balkon Sistemleri Hub Page
 * SEO targets: "cam balkon fiyatları 2026", "ısıcamlı cam balkon sistemleri",
 * "sürme cam balkon", "giyotin cam sistemleri", "katlanır cam balkon metrekare fiyatı"
 */
export const metadata: Metadata = {
    title: 'Cam Balkon Fiyatları 2026 Isıcamlı Sistem',
    description: 'Isıcamlı cam balkon sistemleri, sürme ve giyotin cam çözümleri. Isı yalıtımı, şık tasarım ve ücretsiz keşif için hemen arayın.',
    keywords: [
        'cam balkon fiyatları 2026',
        'ısıcamlı cam balkon sistemleri',
        'sürme cam balkon',
        'giyotin cam sistemleri',
        'katlanır cam balkon metrekare fiyatı',
        ...seoKeywordClusters.local,
        ...seoKeywordClusters.transactional,
        ...seoKeywordClusters.problemSolving.slice(0, 5),
    ],
    openGraph: {
        title: `Cam Balkon Fiyatları 2026 | ${businessConfig.name}`,
        description: 'Isı yalıtımlı cam balkon ve sürme sistemlerinde 40 yıllık uzman çözüm ortağınız. Ücretsiz keşif ile başlayın.',
        url: 'https://egepenakcayapi.com/cam-balkon-sistemleri',
        images: [{ url: '/images/cam-balkon/hero-bg.png', width: 1200, height: 630, alt: 'Modern Isıcamlı Cam Balkon Sistemleri' }],
    },
    alternates: {
        canonical: 'https://egepenakcayapi.com/cam-balkon-sistemleri',
    },
};

/* Service + BreadcrumbList JSON-LD schemas for rich snippets */
const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Cam Balkon Montajı ve Satışı',
    description: 'Isıcamlı cam balkon sistemleri, sürme cam balkon, giyotin cam sistemleri ve katlanır cam balkon montajı. Cam balkon fiyatları 2026 için ücretsiz keşif.',
    provider: {
        '@type': 'LocalBusiness',
        name: businessConfig.name,
        telephone: businessConfig.contact.mobile,
        address: {
            '@type': 'PostalAddress',
            streetAddress: businessConfig.address.street,
            addressLocality: businessConfig.address.district,
            addressRegion: businessConfig.address.city,
            addressCountry: 'TR',
        },
    },
    areaServed: { '@type': 'City', name: 'İstanbul' },
    serviceType: ['Cam Balkon Montajı', 'Isıcamlı Cam Balkon', 'Sürme Cam Balkon', 'Giyotin Cam Sistemleri'],
};

const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: 'https://egepenakcayapi.com' },
        { '@type': 'ListItem', position: 2, name: 'Cam Balkon Sistemleri', item: 'https://egepenakcayapi.com/cam-balkon-sistemleri' },
    ],
};

export default function GlassSystemsPage() {
    return (
        <>
            {/* JSON-LD: Service + BreadcrumbList schemas */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([serviceSchema, breadcrumbSchema]) }} />

            <HeaderOptimized />
            <main id="main-content" className="min-h-screen bg-white">
                {/* Hero Section — single H1, keyword-rich intro */}
                <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-neutral-900 text-white overflow-hidden min-h-[50vh] lg:min-h-[60vh] flex items-center" aria-labelledby="hero-title">
                    <div className="absolute inset-0">
                        <OptimizedImage
                            src="/images/showroom-main.png"
                            alt=""
                            fill
                            priority
                            sizes="100vw"
                            className="object-cover"
                            role="presentation"
                        />
                    </div>
                    <div className="container-custom relative z-10">
                        {/* Breadcrumb navigation */}
                        <nav aria-label="Breadcrumb" className="mb-8">
                            <ol className="flex items-center gap-2 text-sm text-white/60">
                                <li><Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link></li>
                                <li>/</li>
                                <li className="text-white font-medium">Cam Balkon Sistemleri</li>
                            </ol>
                        </nav>
                        <div className="max-w-3xl">
                            <span className="sr-only">
                                Mimari Cam Çözümleri
                            </span>
                            <h1 id="hero-title" className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
                                Modern ve Isı Yalıtımlı Cam Balkon Sistemleri
                            </h1>
                            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl">
                                <strong>Cam balkon fiyatları 2026</strong> karşılaştırmaları ile en uygun ısıcamlı cam balkon sistemleri, sürme cam balkon ve giyotin cam sistemleri.
                                Beylikdüzü&apos;nde Tiara Max ve Twin teknolojileriyle %60&apos;a varan enerji tasarrufu sağlayın.
                                <strong> Ücretsiz keşif</strong> ile şık tasarım ve ısı yalıtımı bir arada.
                            </p>
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

                {/* ==================== CAM BALKON GALLERY SHOWCASE ==================== */}
                <section className="section bg-neutral-100" aria-labelledby="gallery-heading">
                    <div className="container-custom">
                        <div className="text-center max-w-3xl mx-auto mb-12">
                            <span className="inline-block px-4 py-1 rounded-full bg-primary-50 text-primary-600 text-sm font-bold uppercase tracking-widest mb-4">
                                Projelerimizden
                            </span>
                            <h2 id="gallery-heading" className="text-3xl md:text-4xl font-black text-neutral-900 mb-4">
                                Isıcamlı Cam Balkon <span className="text-primary-600">Uygulama Galerisi</span>
                            </h2>
                            <p className="text-lg text-neutral-600">
                                Sürme cam balkon, giyotin cam sistemleri ve katlanır cam balkon metrekare fiyatı için Beylikdüzü ve çevre ilçelerdeki projelerimizi inceleyin.
                            </p>
                        </div>

                        {/* Gallery Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Large Featured Image */}
                            <div className="md:col-span-2 lg:col-span-2 relative aspect-video rounded-2xl overflow-hidden group">
                                <OptimizedImage
                                    src="/images/cam-balkon/cam-balkon-site-manzara.jpg"
                                    alt="Tiara Max - Isıcamlı Sistem - Cam Balkon Uygulaması"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 66vw"
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-6 left-6 right-6 text-white">
                                    <span className="inline-block px-3 py-1 bg-primary-600 text-xs font-bold rounded-full mb-2">Isıcamlı Sistem</span>
                                    <h3 className="text-xl font-bold">Modern Site Manzarası</h3>
                                    <p className="text-white/80 text-sm">Rezidans dairesi için ısıcamlı cam balkon uygulaması</p>
                                </div>
                            </div>

                            {/* Gallery Item */}
                            <div className="relative aspect-square rounded-2xl overflow-hidden group">
                                <OptimizedImage
                                    src="/images/cam-balkon/cam-balkon-kose.jpg"
                                    alt="L-Tipi Köşe - Sürme Cam Balkon - Cam Balkon Uygulaması"
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4 text-white">
                                    <span className="inline-block px-3 py-1 bg-secondary-500 text-xs font-bold rounded-full mb-2">Köşe Sistem</span>
                                    <h3 className="font-bold">L Tipi Köşe Balkon</h3>
                                </div>
                            </div>

                            {/* Gallery Item */}
                            <div className="relative aspect-square rounded-2xl overflow-hidden group">
                                <OptimizedImage
                                    src="/images/cam-balkon/cam-balkon-sehir-manzara.jpg"
                                    alt="Sürme Cam Balkon - Şehir Manzara - Cam Balkon Uygulaması"
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4 text-white">
                                    <span className="inline-block px-3 py-1 bg-primary-600 text-xs font-bold rounded-full mb-2">Sürme</span>
                                    <h3 className="font-bold">Şehir Manzaralı Balkon</h3>
                                </div>
                            </div>

                            {/* Gallery Item */}
                            <div className="relative aspect-square rounded-2xl overflow-hidden group">
                                <OptimizedImage
                                    src="/images/cam-balkon/cam-balkon-gunbatimi.jpg"
                                    alt="Teras Tipi - Katlanır Cam Balkon - Cam Balkon Uygulaması"
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4 text-white">
                                    <span className="inline-block px-3 py-1 bg-orange-500 text-xs font-bold rounded-full mb-2">Teras</span>
                                    <h3 className="font-bold">Gün Batımı Keyfi</h3>
                                </div>
                            </div>

                            {/* Gallery Item with CTA */}
                            <div className="relative aspect-square rounded-2xl overflow-hidden group">
                                <OptimizedImage
                                    src="/images/cam-balkon/cam-balkon-bahce-manzara.jpg"
                                    alt="Bahçe Manzaralı - Giyotin Cam Sistemi - Cam Balkon Uygulaması"
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 to-primary-900/40" />
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
                                    <span className="text-4xl mb-3">🏠</span>
                                    <h3 className="text-xl font-bold mb-2">Sizin Balkonunuz da Bu Kadar Güzel Olabilir!</h3>
                                    <p className="text-white/80 text-sm mb-4">Ücretsiz keşif ile başlayın</p>
                                    <Link href="/iletisim" className="px-4 py-2 bg-secondary-600 text-white font-bold rounded-lg hover:bg-secondary-700 transition-colors focus:ring-2 focus:ring-secondary-400 focus:outline-none" aria-label="Ücretsiz cam balkon keşfi için bize ulaşın">
                                        Bize Ulaşın →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Technical Overview Categories — keyword-rich headings */}
                <section className="section bg-white" id="sistemler" aria-labelledby="systems-heading">
                    <div className="container-custom">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 id="systems-heading" className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">Cam Balkon Fiyatları ve Sistem Seçenekleri</h2>
                            <p className="text-lg text-neutral-600">
                                Isıcamlı cam balkon sistemleri, sürme cam balkon, giyotin cam sistemleri ve katlanır cam balkon metrekare fiyatı karşılaştırmaları.
                                Tüm sistemlerimizde 8-10mm Şişecam temperli camlar kullanılır.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { id: 'isicamli', title: 'Isıcamlı Cam Balkon Sistemleri', tags: 'Tiara Max / Twin', icon: '❄️', desc: 'Cam balkon fiyatları 2026 için en çok tercih edilen ısıcamlı cam balkon sistemleri. 24-28mm çift camlı, Argon gazlı ve Low-E kaplamalı.' },
                                { id: 'surme', title: 'Sürme Cam Balkon', tags: 'Eşikli / Eşiksiz', icon: '↔️', desc: 'Sürme cam balkon sistemleri: eşikli modeller maksimum su yalıtımı, eşiksiz modeller kafe ve teraslar için kesintisiz geçiş.' },
                                { id: 'giyotin', title: 'Giyotin Cam Sistemleri', tags: 'Motorlu / Manuel', icon: '↕️', desc: 'Giyotin cam sistemleri: dikey sürme mekanizmalı. Somfy/Becker motorlu veya gaz pistonlu ekonomik seçenekler.' },
                                { id: 'katlanir', title: 'Katlanır Cam Balkon', tags: 'Tam Açılım', icon: '📁', desc: 'Katlanır cam balkon metrekare fiyatı ile panoramik görüntü. %100 açılım, köşe dahil katlanabilen camlar.' },
                            ].map((cat) => (
                                <div key={cat.id} className="group p-8 rounded-3xl bg-neutral-50 border border-neutral-100 hover:bg-white hover:shadow-2xl transition-[background-color,box-shadow] duration-500">
                                    <div className="text-4xl mb-6" aria-hidden="true">{cat.icon}</div>
                                    <h3 className="text-xl font-bold mb-2">{cat.title}</h3>
                                    <span className="text-xs font-bold text-primary-600 bg-primary-50 px-2 py-1 rounded inline-block mb-4">{cat.tags}</span>
                                    <p className="text-neutral-600 text-sm mb-6 leading-relaxed">{cat.desc}</p>
                                    <Link href={`#${cat.id}`} className="inline-flex items-center text-sm font-bold text-black border-b-2 border-neutral-200 hover:border-primary-500 transition-colors focus:ring-2 focus:ring-primary-500 focus:outline-none" aria-label={`${cat.title} modellerini incele`}>
                                        Modelleri İncele
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Product Deep Dive (SSR-ready loops) */}
                {glassSystems.map((system, index) => (
                    <section
                        key={system.id}
                        id={system.category}
                        className={`section ${index % 2 === 1 ? 'bg-neutral-50' : 'bg-white'}`}
                    >
                        <div className="container-custom">
                            <div className={`flex flex-col lg:flex-row gap-16 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                                {/* Image side */}
                                <div className="flex-1 w-full relative">
                                    <div className="aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl bg-neutral-200 relative">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />
                                        <OptimizedImage
                                            src={system.image}
                                            alt={`${system.name} - ${system.category === 'isicamli' ? 'Isıcamlı Sistem' : system.category === 'surme' ? 'Sürme Sistem' : system.category === 'giyotin' ? 'Giyotin Sistem' : 'Katlanır Sistem'} - Cam Balkon Uygulaması`}
                                            fill
                                            sizes="(max-width: 1024px) 100vw, 50vw"
                                            className="object-cover"
                                        />
                                    </div>
                                    {/* Features badge */}
                                    <div className="absolute -bottom-6 -right-6 lg:-right-10 bg-white p-6 rounded-3xl shadow-xl border border-neutral-100 max-w-[240px] hidden md:block">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                            <span className="text-xs font-bold text-neutral-500 uppercase">Özet Teknik</span>
                                        </div>
                                        <p className="text-sm font-bold text-neutral-900 leading-tight">
                                            {system.technicalSpecs[0].label}: {system.technicalSpecs[0].value}
                                        </p>
                                    </div>
                                </div>

                                {/* Content side */}
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-6">
                                        <span className="px-3 py-1 bg-primary-100 text-primary-700 text-xs font-bold rounded-full uppercase tracking-wider">
                                            {system.category === 'isicamli' ? 'Isı Yalıtımlı' : system.category.charAt(0).toUpperCase() + system.category.slice(1)}
                                        </span>
                                        <div className="flex gap-1">
                                        <span className="text-emerald-600 font-medium text-sm">Fiyat İçin Arayın</span>
                                    </div>
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">{system.name}</h2>
                                    <p className="text-xl text-primary-600 font-medium mb-6">{system.tagline}</p>
                                    <p className="text-lg text-neutral-600 mb-10 leading-relaxed">{system.description}</p>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                                        {system.features.slice(0, 6).map((feature, fIdx) => (
                                            <div key={fIdx} className="flex items-center gap-3">
                                                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" aria-hidden="true" stroke="currentColor" strokeWidth={4}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                                <span className="text-neutral-700 font-medium">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex flex-wrap gap-4">
                                        <Link href={`/cam-balkon-sistemleri/${system.slug}`} className="btn btn-primary focus:ring-2 focus:ring-primary-500 focus:outline-none" aria-label={`${system.name} hakkında detaylı bilgi`}>
                                            Uygulama Detayları
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                ))}

                {/* Color and Glass Customization */}
                <section className="section bg-neutral-900 text-white" aria-labelledby="customize-heading">
                    <div className="container-custom">
                        <div className="grid lg:grid-cols-2 gap-20 items-center">
                            <div>
                                <h2 id="customize-heading" className="text-3xl md:text-5xl font-bold mb-8">Sınırsız <span className="text-primary-400">Özelleştirme</span> Seçenekleri</h2>
                                <p className="text-lg text-neutral-500 mb-12 leading-relaxed">
                                    Cam balkon fiyatları 2026 için mimari tarzınıza uygun yüzlerce RAL renk seçeneği ve farklı cam kalınlıkları sunuyoruz.
                                    Isıcamlı cam balkon sistemleri için Antrasit Gri&apos;den Wood Grain dokulara kadar geniş bir yelpaze.
                                </p>

                                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                                    <span className="w-8 h-px bg-primary-500"></span>
                                    Popüler Profil Renkleri
                                </h3>
                                <div className="grid grid-cols-4 sm:grid-cols-8 gap-4 mb-16">
                                    {colorOptions.map((color) => (
                                        <div key={color.name} className="flex flex-col items-center gap-2 group cursor-help">
                                            <div
                                                className="w-full aspect-square rounded-full border border-white/20 shadow-lg group-hover:scale-110 transition-transform"
                                                style={{ backgroundColor: color.hex }}
                                                title={`${color.name} (${color.ral})`}
                                            />
                                            <span className="text-[10px] uppercase font-bold text-neutral-500">{color.ral?.split(' ')[1] || 'Color'}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-6">
                                    {glassTypes.slice(2, 5).map((gt) => (
                                        <div key={gt.id} className="p-6 bg-white/5 rounded-2xl border border-white/10 flex gap-6 items-center">
                                            <div className="w-16 h-16 rounded-xl bg-primary-500/20 flex items-center justify-center flex-shrink-0">
                                                <svg className="w-8 h-8 text-primary-400" fill="none" viewBox="0 0 24 24" aria-hidden="true" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a2 2 0 00-1.96 1.414l-.7.7a2 2 0 01-2.828 0l-.7-.7a2 2 0 00-1.96-1.414l-2.387.477a2 2 0 00-1.022.547l-3.856 3.856a2 2 0 000 2.828l3.856 3.856a2 2 0 002.828 0l3.856-3.856a2 2 0 00.547-1.022l.477-2.387a2 2 0 00-1.414-1.96l-.7-.7a2 2 0 010-2.828l.7-.7a2 2 0 001.414-1.96l-.477-2.387a2 2 0 00-.547-1.022L11 4" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-lg mb-1">{gt.name}</h4>
                                                <p className="text-sm text-neutral-500">{gt.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="relative">
                                <div className="relative aspect-[3/4] rounded-[3rem] overflow-hidden border-8 border-white/10 shadow-2xl">
                                    <OptimizedImage
                                        src="/images/cam-balkon/cam-balkon-gunbatimi.jpg"
                                        alt="RAL Renk Seçenekleri - Cam Balkon Profilleri - Cam Balkon Uygulaması"
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                        className="object-cover"
                                    />
                                </div>
                                {/* Technical stats overlay */}
                                <div className="absolute top-10 -left-10 bg-primary-600 p-8 rounded-3xl shadow-xl max-w-[200px]">
                                    <p className="text-5xl font-bold text-white mb-2">250+</p>
                                    <p className="text-sm font-bold text-primary-100 uppercase tracking-widest leading-tight">Mevcut RAL Renk Seçeneği</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA / Final Conversion */}
            </main>

            <Footer />
        </>
    );
}
