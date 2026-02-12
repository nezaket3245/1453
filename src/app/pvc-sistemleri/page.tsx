import { Metadata } from "next";
import OptimizedImage from "@/components/ui/OptimizedImage";
import Link from "next/link";
import { HeaderOptimized } from '@/components/layout/HeaderOptimized';
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { businessConfig } from "@/config/business.config";
import {
    pvcProductSeries,
    repairServices,
    lsiKeywords,
    getProductsByCategory,
} from "@/lib/pvcData";
import { ComparisonTable, SlidingComparisonTable } from "./ComparisonTable";
import { RepairRequestForm } from "./RepairRequestForm";

/* =======================================================================
 * SEO & Performance Notes (English)
 * -----------------------------------------------------------------------
 * - Title: max 60 chars, includes primary keyword + brand + location.
 * - Description: max 155 chars, includes CTA + differentiator.
 * - JSON-LD: LocalBusiness + ItemList + Service schemas injected.
 * - Images: OptimizedImage auto-converts to WebP with lazy loading.
 *   Hero image uses priority + fetchpriority="high" via Next.js.
 * - Accessibility: All interactive elements have aria-labels;
 *   CTA buttons meet WCAG AA contrast ratio (≥4.5:1).
 * - Semantic: Strict H1 > H2 > H3 hierarchy; <article>/<section> used.
 * ======================================================================= */

/**
 * SEO Metadata for PVC Systems Hub Page
 * Optimized for local SEO with primary and LSI keywords
 */
export const metadata: Metadata = {
    title: 'PVC Pencere Modelleri ve Fiyatları 2026',
    description: "Egepen Deceuninck PVC pencere fiyatları, ısı yalıtımlı kapı sistemleri ve sürgülü balkon kapısı modelleri. Legend, Legend Art, Zendow serileri. Ücretsiz keşif!",
    keywords: [
        "PVC pencere fiyatları",
        "PVC pencere fiyatları 2026",
        "ısı yalıtımlı kapı sistemleri",
        "Egepen yetkili bayi",
        "sürgülü balkon kapısı",
        "ısıcam konfor",
        ...lsiKeywords.primary,
        ...lsiKeywords.secondary,
        ...lsiKeywords.repair,
        ...lsiKeywords.local,
        "Legend PVC pencere",
        "Legend Art pencere",
        "Zendow pencere",
        "HS76 sürme sistem",
        "Slimslide sürme",
        "PVC pencere tamiri",
    ],
    alternates: {
        canonical: "https://egepenakcayapi.com/pvc-sistemleri",
    },
    openGraph: {
        title: "Egepen PVC Pencere Fiyatları | Akçayapı Beylikdüzü",
        description: "Isı yalıtımlı PVC pencere ve sürgülü balkon kapısı sistemleri. Legend, Legend Art, Zendow. Profesyonel montaj.",
        url: "https://egepenakcayapi.com/pvc-sistemleri",
        type: "website",
        locale: "tr_TR",
        images: [{ url: "/images/pvc/pvc-surme-deniz-manzara.jpg", width: 1200, height: 630, alt: "Egepen PVC Pencere Sistemleri" }],
    },
};

/**
 * JSON-LD Structured Data for Product List
 */
/**
 * JSON-LD: ItemList schema for product series rich snippets.
 * Each item links to its canonical detail page for enhanced crawlability.
 */
function generateProductListSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Egepen Deceuninck PVC Pencere Sistemleri",
        description: "Egepen Deceuninck yetkili bayisi Akçayapı — PVC pencere fiyatları, ısı yalıtımlı kapı sistemleri ve sürgülü balkon kapısı modelleri",
        numberOfItems: pvcProductSeries.length,
        itemListElement: pvcProductSeries.map((product, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `https://egepenakcayapi.com/pvc-sistemleri/${product.slug}`,
            item: {
                "@type": "Product",
                name: product.name,
                description: product.description,
                image: `https://egepenakcayapi.com${product.image}`,
                url: `https://egepenakcayapi.com/pvc-sistemleri/${product.slug}`,
                brand: {
                    "@type": "Brand",
                    name: "Egepen Deceuninck",
                },
                offers: {
                    "@type": "Offer",
                    availability: "https://schema.org/InStock",
                    priceCurrency: "TRY",
                    seller: {
                        "@type": "LocalBusiness",
                        name: businessConfig.name,
                        address: {
                            "@type": "PostalAddress",
                            streetAddress: businessConfig.address.street,
                            addressLocality: businessConfig.address.district,
                            addressRegion: businessConfig.address.city,
                            addressCountry: "TR",
                        },
                    },
                },
            },
        })),
    };
}

/**
 * JSON-LD for Repair Services
 */
/**
 * JSON-LD: Service schema for repair services with areaServed details.
 */
function generateServiceSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "PVC Pencere Tamir ve Tadilat",
        provider: {
            "@type": "LocalBusiness",
            name: businessConfig.name,
            telephone: businessConfig.contact.mobile,
            address: {
                "@type": "PostalAddress",
                streetAddress: businessConfig.address.street,
                addressLocality: businessConfig.address.district,
                addressRegion: businessConfig.address.city,
                addressCountry: "TR",
            },
        },
        areaServed: {
            "@type": "City",
            name: "İstanbul",
        },
        hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "PVC Tamirat Hizmetleri",
            itemListElement: repairServices.map((service) => ({
                "@type": "Offer",
                itemOffered: {
                    "@type": "Service",
                    name: service.name,
                    description: service.description,
                },
            })),
        },
    };
}

/**
 * JSON-LD: LocalBusiness schema for rich local search visibility.
 * Covers NAP consistency, service areas, and opening hours.
 */
function generateLocalBusinessSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": "https://egepenakcayapi.com/#organization",
        name: businessConfig.name,
        description: "Beylikdüzü Egepen Deceuninck yetkili bayisi. PVC pencere fiyatları, ısı yalıtımlı kapı sistemleri, sürgülü balkon kapısı montajı.",
        url: "https://egepenakcayapi.com",
        telephone: businessConfig.contact.mobile,
        email: businessConfig.contact.email,
        image: "https://egepenakcayapi.com/images/pvc/pvc-surme-deniz-manzara.jpg",
        priceRange: "₺₺",
        address: {
            "@type": "PostalAddress",
            streetAddress: businessConfig.address.street,
            addressLocality: businessConfig.address.district,
            addressRegion: businessConfig.address.city,
            postalCode: businessConfig.address.zip,
            addressCountry: "TR",
        },
        geo: {
            "@type": "GeoCoordinates",
            latitude: businessConfig.address.coordinates.latitude,
            longitude: businessConfig.address.coordinates.longitude,
        },
        areaServed: [
            { "@type": "City", name: "İstanbul" },
            { "@type": "Place", name: "Beylikdüzü" },
            { "@type": "Place", name: "Büyükçekmece" },
            { "@type": "Place", name: "Esenyurt" },
            { "@type": "Place", name: "Avcılar" },
        ],
        openingHoursSpecification: [
            { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:30", closes: "19:00" },
            { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "18:00" },
        ],
    };
}

/**
 * JSON-LD: BreadcrumbList for structured navigation in SERPs.
 */
function generateBreadcrumbSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: "https://egepenakcayapi.com" },
            { "@type": "ListItem", position: 2, name: "PVC Pencere Sistemleri", item: "https://egepenakcayapi.com/pvc-sistemleri" },
        ],
    };
}

export default function PVCSystemsPage() {
    const windowProducts = getProductsByCategory("pencere");
    const slidingProducts = getProductsByCategory("surme");

    return (
        <>
            {/* Structured Data: Product List, Service, LocalBusiness, Breadcrumb */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify([generateProductListSchema(), generateServiceSchema(), generateLocalBusinessSchema(), generateBreadcrumbSchema()]),
                }}
            />

            <HeaderOptimized />

            <main id="main-content" className="min-h-screen bg-neutral-50">
                {/* ==================== HERO SECTION ==================== */}
                <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white py-20 lg:py-32 overflow-hidden min-h-[50vh] lg:min-h-[60vh] flex items-center" aria-labelledby="hero-title">
                    <div className="absolute inset-0">
                        <OptimizedImage
                            src="/images/showroom-main.png"
                            alt=""
                            fill
                            sizes="100vw"
                            priority
                            className="object-cover"
                            role="presentation"
                        />
                    </div>
                    <div className="container-custom relative z-10">
                        {/* Breadcrumb Navigation (visible + structured) */}
                        <nav aria-label="Breadcrumb" className="mb-6">
                            <ol className="flex items-center gap-2 text-sm text-white/50 font-medium">
                                <li><Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link></li>
                                <li className="text-white/30" aria-hidden="true">/</li>
                                <li aria-current="page" className="text-white">PVC Pencere Sistemleri</li>
                            </ol>
                        </nav>

                        <div className="max-w-4xl">
                            <span className="sr-only">
                                {businessConfig.brand} Yetkili Bayi
                            </span>
                            <h1 id="hero-title" className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
                                Egepen Deceuninck PVC Pencere ve Isı Yalıtımlı Kapı Sistemleri
                            </h1>
                            <h2 className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl">
                                PVC pencere fiyatları 2026 — Legend, Legend Art ve Zendow serileriyle
                                enerji tasarruflu, ısıcam konforlu yaşam alanları.
                                Sürgülü balkon kapısı ve profesyonel montaj hizmeti.
                            </h2>
                            <div className="hidden">
                                <Button variant="secondary" size="xl" href="#seriler" aria-label="PVC pencere serilerini incele">
                                    Serileri İncele
                                </Button>
                                <Button
                                    variant="outline"
                                    size="xl"
                                    href="#tamirat"
                                    className="text-white border-white/30 hover:bg-white hover:text-primary-700"
                                    aria-label="PVC pencere tamir talebi oluştur"
                                >
                                    Tamir Talebi
                                </Button>
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

                {/* ==================== PVC GALLERY SHOWCASE ==================== */}
                <section className="section bg-neutral-100" aria-labelledby="gallery-title">
                    <div className="container-custom">
                        <div className="text-center max-w-3xl mx-auto mb-12">
                            <span className="inline-block px-4 py-1 rounded-full bg-primary-50 text-primary-600 text-sm font-bold uppercase tracking-widest mb-4">
                                Projelerimizden
                            </span>
                            <h2 id="gallery-title" className="text-3xl md:text-4xl font-black text-neutral-900 mb-4">
                                PVC Pencere ve Kapı <span className="text-primary-600">Montaj Uygulamalarımız</span>
                            </h2>
                            <p className="text-lg text-neutral-600">
                                Beylikdüzü ve çevre ilçelerde gerçekleştirdiğimiz ısı yalıtımlı PVC pencere, sürgülü balkon kapısı ve ısıcam konfor montajlarından örnekler.
                            </p>
                        </div>

                        {/* Gallery Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Large Featured Image */}
                            <div className="md:col-span-2 lg:col-span-2 relative aspect-video rounded-2xl overflow-hidden group">
                                <OptimizedImage
                                    src="/images/pvc/pvc-surme-deniz-manzara.jpg"
                                    alt="PVC Sürme Sistem Montajı - Deniz Manzaralı Teras"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 66vw"
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-6 left-6 right-6 text-white">
                                    <span className="inline-block px-3 py-1 bg-primary-600 text-xs font-bold rounded-full mb-2">Sürme Sistem</span>
                                    <h3 className="text-xl font-bold">Panoramik Manzara Keyfi</h3>
                                    <p className="text-white/80 text-sm">Deniz manzaralı teras için geniş açıklıklı PVC sürme sistem</p>
                                </div>
                            </div>

                            {/* Gallery Item */}
                            <div className="relative aspect-square rounded-2xl overflow-hidden group">
                                <OptimizedImage
                                    src="/images/pvc/pvc-kis-bahcesi.jpg"
                                    alt="PVC Pencere Montajı - Kış Bahçesi"
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4 text-white">
                                    <span className="inline-block px-3 py-1 bg-secondary-500 text-xs font-bold rounded-full mb-2">Pencere</span>
                                    <h3 className="font-bold">Kış Bahçesi Penceresi</h3>
                                </div>
                            </div>

                            {/* Gallery Item */}
                            <div className="relative aspect-square rounded-2xl overflow-hidden group">
                                <OptimizedImage
                                    src="/images/pvc/pvc-villa-surme-gece.jpg"
                                    alt="PVC Sürme Sistem - Villa Gece"
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4 text-white">
                                    <span className="inline-block px-3 py-1 bg-primary-600 text-xs font-bold rounded-full mb-2">Villa</span>
                                    <h3 className="font-bold">Villa Sürme Sistemi</h3>
                                </div>
                            </div>

                            {/* Gallery Item */}
                            <div className="relative aspect-square rounded-2xl overflow-hidden group">
                                <OptimizedImage
                                    src="/images/pvc/pvc-kapi-bahce.jpg"
                                    alt="PVC Kapı Sistemi - Bahçe Çıkışı"
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4 text-white">
                                    <span className="inline-block px-3 py-1 bg-orange-500 text-xs font-bold rounded-full mb-2">Kapı</span>
                                    <h3 className="font-bold">Bahçe Kapısı Sistemi</h3>
                                </div>
                            </div>

                            {/* Gallery Item with CTA */}
                            <div className="relative aspect-square rounded-2xl overflow-hidden group">
                                <OptimizedImage
                                    src="/images/pvc/legend-reklam.jpg"
                                    alt="Egepen Legend Serisi - 80mm genişlik, 6 odacık, A+ enerji sınıfı PVC pencere"
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 to-primary-900/40" />
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
                                    <span className="text-4xl mb-3" aria-hidden="true">🏆</span>
                                    <h3 className="text-xl font-bold mb-2">Legend Serisi</h3>
                                    <p className="text-white/80 text-sm mb-4">80mm genişlik, 6 odacık, 3 conta ile ısı yalıtımında son nokta</p>
                                    <Link href="/pvc-sistemleri/legend-pvc-pencere" title="Legend PVC Pencere Serisi - Detaylı Bilgi ve Fiyat" className="px-4 py-2 bg-secondary-600 text-white font-bold rounded-lg hover:bg-secondary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-secondary-300 focus:ring-offset-2" aria-label="Legend PVC Pencere serisi hakkında detaylı bilgi alın">
                                        Detaylı Bilgi →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                {/* ==================== PRODUCT SERIES SECTION ==================== */}
                <section id="seriler" className="section bg-white scroll-mt-20" aria-labelledby="series-title">
                    <div className="container-custom">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <span className="inline-block px-4 py-1 rounded-full bg-primary-50 text-primary-600 text-sm font-bold uppercase tracking-widest mb-4">
                                Pencere Sistemleri
                            </span>
                            <h2 id="series-title" className="text-3xl md:text-4xl lg:text-5xl font-black text-neutral-900 mb-6">
                                PVC Pencere Fiyatları ve <span className="text-primary-600">Egepen Seri Ailesi</span>
                            </h2>
                            <p className="text-lg text-neutral-600 leading-relaxed">
                                Belçika kökenli Deceuninck&apos;in 60 yıllık tecrübesiyle üretilen, ısı yalıtımlı kapı sistemleri ve
                                PVC pencere modelleri. Her seri, farklı ihtiyaçlara özel ısıcam konfor çözümleri sunar.
                            </p>
                        </div>

                        {/* Window Products Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                            {windowProducts.map((product) => (
                                <article
                                    key={product.id}
                                    className="group bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-xl transition-shadow duration-300"
                                    aria-label={`${product.name} - ${product.tagline}`}
                                >
                                    <div className="relative aspect-video bg-gradient-to-br from-primary-100 to-primary-50 overflow-hidden">
                                        <OptimizedImage
                                            src={product.image}
                                            alt={`${product.name} - ${product.technicalSpecs.profileWidth}mm, ${product.technicalSpecs.chambers} odacık PVC pencere sistemi`}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        {product.featured && (
                                            <div className="absolute top-4 right-4 bg-secondary-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                                                Öne Çıkan
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                                            {product.name}
                                        </h3>
                                        <p className="text-sm text-primary-600 font-medium mb-3">
                                            {product.tagline}
                                        </p>
                                        <p className="text-neutral-600 mb-4 line-clamp-2">
                                            {product.description}
                                        </p>

                                        {/* Quick Specs */}
                                        <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                                            <div className="flex items-center gap-1 text-neutral-500">
                                                <span>📏</span>
                                                <span>{product.technicalSpecs.profileWidth}mm</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-neutral-500">
                                                <span>🔲</span>
                                                <span>{product.technicalSpecs.chambers} Odacık</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-neutral-500">
                                                <span>🌡️</span>
                                                <span>{product.technicalSpecs.thermalInsulation}</span>
                                            </div>
                                            <div className="flex items-center gap-1 text-neutral-500">
                                                <span>🔇</span>
                                                <span>{product.technicalSpecs.acousticInsulation}</span>
                                            </div>
                                        </div>

                                        <Link
                                            href={`/pvc-sistemleri/${product.slug}`}
                                            className="inline-flex items-center gap-2 text-primary-600 font-bold hover:gap-3 transition-shadow focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2 rounded-lg px-1"
                                            aria-label={`${product.name} detaylı bilgi ve PVC pencere fiyatları`}
                                        >
                                            Detaylı Bilgi
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" aria-hidden="true" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>

                    </div>
                </section>

                {/* ==================== SLIDING SYSTEMS SECTION ==================== */}
                <section className="section bg-neutral-900 text-white" aria-labelledby="sliding-title">
                    <div className="container-custom">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <span className="inline-block px-4 py-1 rounded-full bg-white/10 text-secondary-400 text-sm font-bold uppercase tracking-widest mb-4">
                                Sürme Sistemleri
                            </span>
                            <h2 id="sliding-title" className="text-3xl md:text-4xl lg:text-5xl font-black mb-6">
                                Sürgülü Balkon Kapısı ve <span className="text-secondary-400">Sürme Pencere Sistemleri</span>
                            </h2>
                            <p className="text-lg text-white/70 leading-relaxed">
                                Legend Sürme, HS76 ve Slimslide sistemleriyle iç ve dış mekan arasındaki sınırları kaldırın.
                                Geniş açıklıklar, motorlu opsiyonlar ve üstün ısıcam konfor performansı.
                            </p>
                        </div>

                        {/* Sliding Products Grid */}
                        <div className="grid md:grid-cols-3 gap-8 mb-12">
                            {slidingProducts.map((product) => (
                                <article
                                    key={product.id}
                                    className="group bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:border-secondary-500/50 transition-shadow"
                                    aria-label={`${product.name} - sürgülü balkon kapısı sistemi`}
                                >
                                    <div className="relative aspect-video bg-gradient-to-br from-white/5 to-white/0 overflow-hidden">
                                        <OptimizedImage
                                            src={product.image}
                                            alt={`${product.name} - ${product.technicalSpecs.profileWidth}mm sürme PVC pencere sistemi`}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-shadow duration-500"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-white mb-2">
                                            {product.name}
                                        </h3>
                                        <p className="text-secondary-400 text-sm font-medium mb-3">
                                            {product.tagline}
                                        </p>
                                        <p className="text-white/60 mb-4 line-clamp-2">
                                            {product.description}
                                        </p>
                                        <ul className="space-y-1 mb-4">
                                            {product.features.slice(0, 3).map((feature, i) => (
                                                <li key={i} className="flex items-center gap-2 text-sm text-white/70">
                                                    <span className="text-secondary-400">✓</span>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                        <Link
                                            href={`/pvc-sistemleri/${product.slug}`}
                                            className="inline-flex items-center gap-2 text-secondary-400 font-bold hover:gap-3 transition-shadow focus:outline-none focus:ring-2 focus:ring-secondary-300 focus:ring-offset-2 focus:ring-offset-neutral-900 rounded-lg px-1"
                                            aria-label={`${product.name} detaylı bilgi ve fiyat`}
                                        >
                                            Detaylı Bilgi →
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>

                    </div>
                </section>

                {/* ==================== REPAIR & MAINTENANCE SECTION ==================== */}
                <section id="tamirat" className="section bg-white scroll-mt-20" aria-labelledby="repair-title">
                    <div className="container-custom">
                        <div className="grid lg:grid-cols-2 gap-16 items-start">
                            {/* Left: Content */}
                            <div>
                                <span className="inline-block px-4 py-1 rounded-full bg-orange-50 text-orange-600 text-sm font-bold uppercase tracking-widest mb-4">
                                    Tamirat & Tadilat
                                </span>
                                <h2 id="repair-title" className="text-3xl md:text-4xl font-black text-neutral-900 mb-6">
                                    PVC Pencere ve Isı Yalıtımlı Kapı <span className="text-orange-600">Onarım Hizmetleri</span>
                                </h2>
                                <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                                    İstanbul Beylikdüzü ve çevresinde profesyonel PVC tamirat hizmeti.
                                    İspanyolet değişimi, fitil yenileme, ısıcam değişimi ve mekanizma onarımı işlemlerini
                                    uzman ekibimizle aynı gün gerçekleştiriyoruz. Egepen yetkili bayi güvencesiyle.
                                </p>

                                {/* Repair Services Grid */}
                                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                                    {repairServices.map((service) => (
                                        <div
                                            key={service.id}
                                            className="p-4 rounded-xl bg-neutral-50 border border-neutral-100 hover:border-orange-200 hover:bg-orange-50/50 transition-shadow"
                                        >
                                            <div className="flex items-start gap-3">
                                                <span className="text-2xl">{service.icon}</span>
                                                <div>
                                                    <h4 className="font-bold text-neutral-900 mb-1">
                                                        {service.name}
                                                    </h4>
                                                    <p className="text-sm text-neutral-600 mb-2 line-clamp-2">
                                                        {service.description}
                                                    </p>
                                                    <div className="flex items-center gap-3 text-xs text-neutral-500">
                                                        <span className="font-medium text-orange-600">Fiyat İçin Arayın</span>
                                                        <span>•</span>
                                                        <span>{service.duration}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Why Choose Us */}
                                <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-6">
                                    <h4 className="font-bold text-neutral-900 mb-4">
                                        Neden Akçayapı Tamirat Hizmeti?
                                    </h4>
                                    <ul className="space-y-2">
                                        {[
                                            "Orijinal Egepen yedek parça",
                                            "Aynı gün servis imkanı",
                                            "40 yıllık tecrübeli ekip",
                                            "Şeffaf fiyatlandırma, sürpriz yok",
                                            "İşçilik güvencesi",
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-center gap-2 text-neutral-700">
                                                <span className="w-5 h-5 rounded-full bg-primary-600 text-white flex items-center justify-center text-xs">✓</span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Right: Form */}
                            <div className="lg:sticky lg:top-24">
                                <RepairRequestForm />
                            </div>
                        </div>
                    </div>
                </section>

                {/* ==================== WHY EGEPEN SECTION ==================== */}
                <section className="section bg-neutral-50" aria-labelledby="why-egepen-title">
                    <div className="container-custom">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 id="why-egepen-title" className="text-3xl md:text-4xl font-black text-neutral-900 mb-6">
                                Neden <span className="text-primary-600">Egepen Deceuninck</span> Yetkili Bayi?
                            </h2>
                            <p className="text-lg text-neutral-600">
                                60 yılı aşkın tecrübe, Avrupa kalite standartları ve çevre dostu üretim anlayışı.
                                PVC pencere fiyatlarında en iyi değeri sunan ısı yalıtımlı kapı sistemleri.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                {
                                    icon: "🏆",
                                    title: "A+ Enerji Sınıfı",
                                    desc: "En yüksek enerji verimliliği sertifikasına sahip profiller.",
                                },
                                {
                                    icon: "🌿",
                                    title: "Çevre Dostu",
                                    desc: "%100 geri dönüştürülebilir PVC, kurşunsuz formülasyon.",
                                },
                                {
                                    icon: "🔒",
                                    title: "Egepen Kalitesi",
                                    desc: "Orijinal profil ve yüzey kalitesi, güvenle kullanım.",
                                },
                                {
                                    icon: "🇧🇪",
                                    title: "Belçika Teknolojisi",
                                    desc: "Deceuninck ana üretim tesisi Belçika'da.",
                                },
                            ].map((item, i) => (
                                <div key={i} className="text-center p-6 bg-white rounded-2xl shadow-sm border border-neutral-100">
                                    <div className="text-4xl mb-4">{item.icon}</div>
                                    <h3 className="text-lg font-bold text-neutral-900 mb-2">{item.title}</h3>
                                    <p className="text-neutral-600 text-sm">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ==================== LOCAL SEO CONTENT ==================== */}
                <section className="py-12 bg-white" aria-labelledby="local-seo-title">
                    <div className="container-custom">
                        <div className="prose prose-lg max-w-4xl mx-auto text-neutral-600">
                            <h2 id="local-seo-title" className="text-2xl font-bold text-neutral-900 mb-4">
                                İstanbul Beylikdüzü’de PVC Pencere Fiyatları ve Profesyonel Montaj
                            </h2>
                            <p>
                                {businessConfig.name}, İstanbul&apos;un Avrupa yakasında Beylikdüzü, Gürpınar, Yakuplu, Kavaklı,
                                Büyükçekmece, Esenyurt ve Avcılar bölgelerinde <strong>Egepen yetkili bayi</strong> olarak
                                hizmet vermektedir. Legend, Legend Art ve Zendow serilerinden oluşan
                                geniş ürün yelpazemizle, her bütçeye ve ihtiyaca uygun <strong>PVC pencere fiyatları</strong> sunuyoruz.
                            </p>
                            <p>
                                <strong>Isı yalıtımlı kapı sistemleri</strong>, <strong>sürgülü balkon kapısı</strong> modelleri, cam balkon, sineklik, panjur ve duşakabin
                                ürünlerimizle yaşam alanlarınızı dönüştürüyoruz. 40 yılı aşkın sektör deneyimimiz ve
                                profesyonel montaj ekibimizle, <strong>ısıcam konfor</strong> performansını en üst seviyede tutuyoruz.
                            </p>
                            <p>
                                PVC pencere tamiri, ispanyolet değişimi, fitil yenileme, ısıcam değişimi ve mekanizma
                                onarımı gibi tamirat hizmetlerimizle, mevcut pencerelerinizi de yeniliyoruz. Orijinal
                                {businessConfig.brand} yedek parçaları ve işçilik güvencemizle güvenle hizmet alabilirsiniz.
                            </p>
                        </div>
                    </div>
                </section>

            </main>

            <Footer />
        </>
    );
}
