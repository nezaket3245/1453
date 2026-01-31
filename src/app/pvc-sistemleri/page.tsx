import { Metadata } from "next";
import OptimizedImage from "@/components/ui/OptimizedImage";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
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

/**
 * SEO Metadata for PVC Systems Hub Page
 * Optimized for local SEO with primary and LSI keywords
 */
export const metadata: Metadata = {
    title: `Egepen PVC Pencere Serileri | Akçayapı Beylikdüzü Bayi`,
    description: `Beylikdüzü Egepen Akçayapı: Legend, Legend Art ve Zendow PVC pencere sistemleri. Profesyonel montaj ve tamir hizmetleri için teklif alın.`,
    keywords: [
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
        canonical: "https://egepenakcayapi.com.tr/pvc-sistemleri",
    },
    openGraph: {
        title: `Egepen PVC Sistemleri | ${businessConfig.name}`,
        description: `Beylikdüzü Egepen yetkili bayisi. Legend, Legend Art, Zendow PVC pencere ve sürme sistemleri. Profesyonel montaj ve tamir hizmeti.`,
        url: "https://egepenakcayapi.com.tr/pvc-sistemleri",
        type: "website",
        locale: "tr_TR",
    },
};

/**
 * JSON-LD Structured Data for Product List
 */
function generateProductListSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Egepen Deceuninck PVC Pencere Sistemleri",
        description: "Egepen Deceuninck yetkili bayisi Akçayapı'nın sunduğu PVC pencere ve sürme sistem serileri",
        numberOfItems: pvcProductSeries.length,
        itemListElement: pvcProductSeries.map((product, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
                "@type": "Product",
                name: product.name,
                description: product.description,
                image: `https://egepenakcayapi.com.tr${product.image}`,
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
                    },
                },
            },
        })),
    };
}

/**
 * JSON-LD for Repair Services
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

export default function PVCSystemsPage() {
    const windowProducts = getProductsByCategory("pencere");
    const slidingProducts = getProductsByCategory("surme");

    return (
        <>
            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(generateProductListSchema()),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(generateServiceSchema()),
                }}
            />

            <Header />

            <main className="min-h-screen bg-neutral-50">
                {/* ==================== HERO SECTION ==================== */}
                <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white py-20 lg:py-32 overflow-hidden">
                    <div className="absolute inset-0 opacity-40">
                        <OptimizedImage
                            src="/images/showroom-main.png"
                            alt="PVC Sistemleri - Egepen Deceuninck"
                            fill
                            priority
                            className="object-cover"
                        />
                    </div>
                    <div className="container-custom relative z-10">
                        <div className="max-w-4xl">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white text-sm font-bold uppercase tracking-widest mb-6 border border-white/20">
                                {businessConfig.brand} Yetkili Bayi
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6">
                                Premium <span className="text-secondary-400">PVC Pencere</span> ve{" "}
                                <span className="text-secondary-400">Sürme Sistemleri</span>
                            </h1>
                            <h2 className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed">
                                İstanbul Beylikdüzü ve çevresinde profesyonel PVC montaj ve tamirat hizmeti.
                                Legend, Legend Art ve Zendow serileriyle enerji tasarruflu yaşam alanları.
                            </h2>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button variant="secondary" size="xl" href="#seriler">
                                    Serileri İncele
                                </Button>
                                <Button
                                    variant="outline"
                                    size="xl"
                                    href="#tamirat"
                                    className="text-white border-white/30 hover:bg-white hover:text-primary-700"
                                >
                                    Tamir Talebi
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ==================== PVC GALLERY SHOWCASE ==================== */}
                <section className="section bg-neutral-100">
                    <div className="container-custom">
                        <div className="text-center max-w-3xl mx-auto mb-12">
                            <span className="inline-block px-4 py-1 rounded-full bg-primary-50 text-primary-600 text-sm font-bold uppercase tracking-widest mb-4">
                                Projelerimizden
                            </span>
                            <h2 className="text-3xl md:text-4xl font-black text-neutral-900 mb-4">
                                PVC Montaj <span className="text-primary-600">Uygulamalarımız</span>
                            </h2>
                            <p className="text-lg text-neutral-600">
                                Beylikdüzü ve çevre ilçelerde gerçekleştirdiğimiz PVC pencere ve sürme sistem montajlarından örnekler.
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
                                    alt="Egepen Legend - 80mm 6 Odacık"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 to-primary-900/40" />
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
                                    <span className="text-4xl mb-3">🏆</span>
                                    <h3 className="text-xl font-bold mb-2">Legend Serisi</h3>
                                    <p className="text-white/80 text-sm mb-4">80mm genişlik, 6 odacık, 3 conta ile yalıtımda son nokta</p>
                                    <Link href="/pvc-sistemleri/legend-pvc-pencere" title="Legend PVC Pencere Serisi - Detaylı Bilgi" className="px-4 py-2 bg-secondary-500 text-white font-bold rounded-lg hover:bg-secondary-600 transition-colors">
                                        Detaylı Bilgi →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                {/* ==================== PRODUCT SERIES SECTION ==================== */}
                <section id="seriler" className="section bg-white scroll-mt-20">
                    <div className="container-custom">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <span className="inline-block px-4 py-1 rounded-full bg-primary-50 text-primary-600 text-sm font-bold uppercase tracking-widest mb-4">
                                Pencere Sistemleri
                            </span>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-neutral-900 mb-6">
                                Egepen Deceuninck <span className="text-primary-600">Seri Ailesi</span>
                            </h2>
                            <p className="text-lg text-neutral-600 leading-relaxed">
                                Belçika kökenli Deceuninck&apos;in 60 yıllık tecrübesiyle üretilen, Avrupa&apos;nın en prestijli
                                PVC profil sistemleri. Her seri, farklı ihtiyaçlara özel çözümler sunar.
                            </p>
                        </div>

                        {/* Window Products Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                            {windowProducts.map((product) => (
                                <article
                                    key={product.id}
                                    className="group bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-xl transition-all duration-300"
                                >
                                    <div className="relative aspect-video bg-gradient-to-br from-primary-100 to-primary-50 overflow-hidden">
                                        <OptimizedImage
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        {product.featured && (
                                            <div className="absolute top-4 right-4 bg-secondary-500 text-white px-3 py-1 rounded-full text-xs font-bold">
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
                                            className="inline-flex items-center gap-2 text-primary-600 font-bold hover:gap-3 transition-all"
                                        >
                                            Detaylı Bilgi
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {/* Comparison Table */}
                        <div className="bg-neutral-50 rounded-2xl p-6 lg:p-8">
                            <h3 className="text-2xl font-bold text-neutral-900 mb-6 text-center">
                                📊 Teknik Karşılaştırma Tablosu
                            </h3>
                            <ComparisonTable />
                            <p className="text-center text-sm text-neutral-500 mt-4">
                                <strong>Not:</strong> Düşük U-Değeri = Daha iyi ısı yalıtımı. Yüksek odacık sayısı = Daha iyi performans.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ==================== SLIDING SYSTEMS SECTION ==================== */}
                <section className="section bg-neutral-900 text-white">
                    <div className="container-custom">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <span className="inline-block px-4 py-1 rounded-full bg-white/10 text-secondary-400 text-sm font-bold uppercase tracking-widest mb-4">
                                Sürme Sistemleri
                            </span>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6">
                                Geniş Açıklıklar, <span className="text-secondary-400">Sınırsız Görüş</span>
                            </h2>
                            <p className="text-lg text-white/70 leading-relaxed">
                                Legend Sürme, HS76 ve Slimslide sistemleriyle iç ve dış mekan arasındaki sınırları kaldırın.
                                Geniş açıklıklar, motorlu opsiyonlar ve üstün yalıtım performansı.
                            </p>
                        </div>

                        {/* Sliding Products Grid */}
                        <div className="grid md:grid-cols-3 gap-8 mb-12">
                            {slidingProducts.map((product) => (
                                <article
                                    key={product.id}
                                    className="group bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:border-secondary-500/50 transition-all"
                                >
                                    <div className="relative aspect-video bg-gradient-to-br from-white/5 to-white/0 overflow-hidden">
                                        <OptimizedImage
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
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
                                            className="inline-flex items-center gap-2 text-secondary-400 font-bold hover:gap-3 transition-all"
                                        >
                                            Detaylı Bilgi →
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {/* Sliding Comparison */}
                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/10">
                            <h3 className="text-2xl font-bold text-white mb-6 text-center">
                                📊 Sürme Sistemleri Karşılaştırması
                            </h3>
                            <SlidingComparisonTable />
                        </div>
                    </div>
                </section>

                {/* ==================== REPAIR & MAINTENANCE SECTION ==================== */}
                <section id="tamirat" className="section bg-white scroll-mt-20">
                    <div className="container-custom">
                        <div className="grid lg:grid-cols-2 gap-16 items-start">
                            {/* Left: Content */}
                            <div>
                                <span className="inline-block px-4 py-1 rounded-full bg-orange-50 text-orange-600 text-sm font-bold uppercase tracking-widest mb-4">
                                    Tamirat & Tadilat
                                </span>
                                <h2 className="text-3xl md:text-4xl font-black text-neutral-900 mb-6">
                                    PVC Pencere ve Kapı <span className="text-orange-600">Onarım Hizmetleri</span>
                                </h2>
                                <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                                    İstanbul Beylikdüzü ve çevresinde profesyonel PVC tamirat hizmeti.
                                    İspanyolet değişimi, fitil yenileme, ısı cam değişimi ve mekanizma onarımı işlemlerini
                                    uzman ekibimizle aynı gün gerçekleştiriyoruz.
                                </p>

                                {/* Repair Services Grid */}
                                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                                    {repairServices.map((service) => (
                                        <div
                                            key={service.id}
                                            className="p-4 rounded-xl bg-neutral-50 border border-neutral-100 hover:border-orange-200 hover:bg-orange-50/50 transition-all"
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
                                                        <span className="font-medium text-orange-600">{service.price}</span>
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
                                            "Orijinal Egepen yedek parça garantisi",
                                            "Aynı gün servis imkanı",
                                            "40 yıllık tecrübeli ekip",
                                            "Şeffaf fiyatlandırma, sürpriz yok",
                                            "İşçilik garantisi",
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
                <section className="section bg-neutral-50">
                    <div className="container-custom">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-3xl md:text-4xl font-black text-neutral-900 mb-6">
                                Neden <span className="text-primary-600">Egepen Deceuninck</span>?
                            </h2>
                            <p className="text-lg text-neutral-600">
                                60 yılı aşkın tecrübe, Avrupa kalite standartları ve çevre dostu üretim anlayışı.
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
                                    title: "10 Yıl Garanti",
                                    desc: "Profil ve yüzey garantisi, güvenle kullanım.",
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
                <section className="py-12 bg-white">
                    <div className="container-custom">
                        <div className="prose prose-lg max-w-4xl mx-auto text-neutral-600">
                            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                                İstanbul Beylikdüzü ve Çevresinde Profesyonel PVC Montaj ve Tamirat Hizmeti
                            </h2>
                            <p>
                                {businessConfig.name}, İstanbul&apos;un Avrupa yakasında Beylikdüzü, Gürpınar, Yakuplu, Kavaklı,
                                Büyükçekmece, Esenyurt ve Avcılar bölgelerinde {businessConfig.brand} yetkili bayisi olarak
                                hizmet vermektedir. Legend, Legend Art ve Zendow serilerinden oluşan
                                geniş ürün yelpazemizle, her bütçeye ve ihtiyaca uygun çözümler sunuyoruz.
                            </p>
                            <p>
                                Isı yalıtımlı PVC pencere ve kapı sistemleri, cam balkon, sineklik, panjur ve duşakabin
                                ürünlerimizle yaşam alanlarınızı dönüştürüyoruz. 40 yılı aşkın sektör deneyimimiz ve
                                profesyonel montaj ekibimizle, müşteri memnuniyetini en üst seviyede tutuyoruz.
                            </p>
                            <p>
                                PVC pencere tamiri, ispanyolet değişimi, fitil yenileme, ısı cam değişimi ve mekanizma
                                onarımı gibi tamirat hizmetlerimizle, mevcut pencerelerinizi de yeniliyoruz. Orijinal
                                {businessConfig.brand} yedek parçaları ve işçilik garantimizle güvenle hizmet alabilirsiniz.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ==================== FINAL CTA ==================== */}
                <section className="py-20 bg-primary-600 text-white text-center">
                    <div className="container-custom">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Ücretsiz Keşif ve Fiyat Teklifi Alın
                        </h2>
                        <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                            Uzman ekibimiz evinize gelerek ölçüm yapsın, size özel fiyat teklifi hazırlasın.
                            Hiçbir yükümlülük yok!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button variant="secondary" size="xl" href="/teklif-al">
                                Ücretsiz Keşif Talep Et
                            </Button>
                            <Button
                                variant="outline"
                                size="xl"
                                href={`https://wa.me/${businessConfig.contact.whatsapp}?text=Merhaba, PVC pencere için bilgi almak istiyorum.`}
                                external
                                className="text-white border-white/30 hover:bg-white hover:text-primary-600"
                            >
                                WhatsApp ile Ulaşın
                            </Button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
