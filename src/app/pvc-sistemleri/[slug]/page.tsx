import { Metadata } from "next";
import { notFound } from "next/navigation";
import OptimizedImage from "@/components/ui/OptimizedImage";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { businessConfig } from "@/config/business.config";
import {
    pvcProductSeries,
    getProductBySlug,
    comparisonMetrics,
    PVCProductSeries,
} from "@/lib/pvcData";

interface PVCProductPageProps {
    params: Promise<{ slug: string }>;
}

/**
 * Generate Static Params for all PVC products
 */
export async function generateStaticParams() {
    return pvcProductSeries.map((product) => ({
        slug: product.slug,
    }));
}

/**
 * Generate Metadata for PVC Product Page
 */
export async function generateMetadata({ params }: PVCProductPageProps): Promise<Metadata> {
    const { slug } = await params;
    const product = getProductBySlug(slug);

    if (!product) return { title: "Ürün Bulunamadı" };

    return {
        title: `${product.name} | Egepen Deceuninck | ${businessConfig.name}`,
        description: `${product.description} İstanbul Beylikdüzü Egepen yetkili bayisi. ${businessConfig.contact.mobile}`,
        keywords: [
            ...product.seoKeywords,
            "Egepen Deceuninck",
            "Beylikdüzü PVC",
            businessConfig.name,
        ],
        openGraph: {
            title: `${product.name} | Egepen Deceuninck`,
            description: product.description,
            images: [{ url: product.image }],
            type: "website",
            locale: "tr_TR",
        },
        alternates: {
            canonical: `https://egepenakcayapi.com.tr/pvc-sistemleri/${product.slug}`,
        },
    };
}

/**
 * Generate Product Schema JSON-LD
 */
function generateProductSchema(product: PVCProductSeries) {
    return {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        description: product.longDescription,
        image: `https://egepenakcayapi.com.tr${product.image}`,
        brand: {
            "@type": "Brand",
            name: "Egepen Deceuninck",
        },
        manufacturer: {
            "@type": "Organization",
            name: "Deceuninck",
            url: "https://www.deceuninck.com",
        },
        offers: {
            "@type": "Offer",
            availability: "https://schema.org/InStock",
            priceCurrency: "TRY",
            seller: {
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
        },
        additionalProperty: [
            {
                "@type": "PropertyValue",
                name: "Profil Genişliği",
                value: `${product.technicalSpecs.profileWidth}mm`,
            },
            {
                "@type": "PropertyValue",
                name: "Odacık Sayısı",
                value: product.technicalSpecs.chambers,
            },
            {
                "@type": "PropertyValue",
                name: "Isı Yalıtımı",
                value: product.technicalSpecs.thermalInsulation,
            },
        ],
    };
}

/**
 * PVC Product Detail Page Component
 */
export default async function PVCProductDetailPage({ params }: PVCProductPageProps) {
    const { slug } = await params;
    const product = getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    const schema = generateProductSchema(product);
    const relatedProducts = pvcProductSeries
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 3);

    return (
        <>
            {/* JSON-LD Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />

            <Header />

            <main id="main-content" className="min-h-screen bg-white">
                {/* Hero Section */}
                <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white py-16 lg:py-24 overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <OptimizedImage
                            src="/images/pvc/pvc-surme-manzara.jpg"
                            alt="Arka Plan"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="container-custom relative z-10">
                        {/* Breadcrumb */}
                        <nav aria-label="Breadcrumb" className="mb-8">
                            <ol className="flex items-center gap-2 text-sm text-white/60">
                                <li>
                                    <Link href="/" title="Ana Sayfa" className="hover:text-white transition-colors">
                                        Ana Sayfa
                                    </Link>
                                </li>
                                <li>/</li>
                                <li>
                                    <Link href="/pvc-sistemleri" title="PVC Pencere Sistemleri" className="hover:text-white transition-colors">
                                        PVC Sistemleri
                                    </Link>
                                </li>
                                <li>/</li>
                                <li className="text-white font-medium">{product.name}</li>
                            </ol>
                        </nav>

                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            {/* Content */}
                            <div>
                                <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-secondary-400 text-sm font-bold uppercase tracking-widest mb-4 border border-white/20">
                                    {product.category === "pencere" ? "Pencere Sistemi" : "Sürme Sistemi"}
                                </span>
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-4">
                                    {product.name}
                                </h1>
                                <p className="text-xl text-secondary-400 font-medium mb-6">
                                    {product.tagline}
                                </p>
                                <p className="text-lg text-white/80 mb-8 leading-relaxed">
                                    {product.description}
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <Button variant="secondary" size="lg" href="/teklif-al">
                                        Ücretsiz Keşif Talep Et
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        href={`https://wa.me/${businessConfig.contact.whatsapp}?text=Merhaba, ${product.name} hakkında bilgi almak istiyorum.`}
                                        external
                                        className="text-white border-white/30 hover:bg-white hover:text-primary-700"
                                    >
                                        WhatsApp ile Ulaşın
                                    </Button>
                                </div>
                            </div>

                            {/* Image or Video */}
                            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-primary-900/50">
                                {product.heroVideo ? (
                                    <video
                                        src={product.heroVideo}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                ) : (
                                    <OptimizedImage
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        priority
                                        className="object-cover"
                                    />
                                )}
                                {product.featured && (
                                    <div className="absolute top-4 right-4 bg-secondary-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg z-10">
                                        ⭐ Öne Çıkan Seri
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Long Description */}
                <section className="section bg-neutral-50">
                    <div className="container-custom">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-8 text-center">
                                {product.name} Hakkında Detaylı Bilgi
                            </h2>
                            <div className="prose prose-lg max-w-none text-neutral-600 leading-relaxed">
                                {product.longDescription.split("\n\n").map((paragraph, i) => (
                                    <p key={i} className="mb-6">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Technical Specs & Features Grid */}
                <section className="section">
                    <div className="container-custom">
                        <div className="grid lg:grid-cols-3 gap-12">
                            {/* Technical Specifications */}
                            <div className="lg:col-span-1">
                                <div className="bg-neutral-900 text-white rounded-2xl p-8 sticky top-28 shadow-xl">
                                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                        <span className="text-2xl">📊</span>
                                        Teknik Özellikler
                                    </h3>
                                    <div className="space-y-4">
                                        {comparisonMetrics.map((metric) => {
                                            const value = product.technicalSpecs[metric.key as keyof typeof product.technicalSpecs];
                                            return (
                                                <div
                                                    key={metric.key}
                                                    className="flex justify-between items-center py-3 border-b border-white/10 last:border-0"
                                                >
                                                    <span className="text-white/60 text-sm flex items-center gap-2">
                                                        <span>{metric.icon}</span>
                                                        {metric.label}
                                                    </span>
                                                    <span className="font-semibold text-white">
                                                        {value}
                                                        {metric.unit && ` ${metric.unit}`}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Warranty Badge */}
                                    <div className="mt-8 pt-8 border-t border-white/10">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-12 h-12 rounded-full bg-secondary-500/20 flex items-center justify-center">
                                                <span className="text-2xl">🛡️</span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold">10 Yıl Garanti</p>
                                                <p className="text-xs text-white/40">Egepen Deceuninck Güvencesiyle</p>
                                            </div>
                                        </div>
                                        <Button variant="secondary" fullWidth href="/teklif-al">
                                            Hemen Ölçüm İsteyin
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            {/* Features & Benefits */}
                            <div className="lg:col-span-2">
                                {/* Features */}
                                <div className="mb-12">
                                    <h2 className="text-2xl font-bold text-neutral-900 mb-8 border-b pb-4">
                                        ✨ Öne Çıkan Özellikler
                                    </h2>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {product.features.map((feature, index) => (
                                            <div
                                                key={index}
                                                className="flex gap-4 p-4 bg-neutral-50 rounded-xl border border-neutral-100"
                                            >
                                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center">
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" aria-hidden="true" stroke="currentColor" strokeWidth={3}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                                <span className="text-neutral-700 font-medium">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Benefits */}
                                <div className="mb-12">
                                    <h2 className="text-2xl font-bold text-neutral-900 mb-8 border-b pb-4">
                                        💎 Avantajlar
                                    </h2>
                                    <div className="space-y-4">
                                        {product.benefits.map((benefit, index) => (
                                            <div
                                                key={index}
                                                className="flex gap-4 items-center p-5 bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl border border-primary-200"
                                            >
                                                <div className="text-3xl">⭐</div>
                                                <p className="text-neutral-800 font-medium text-lg">{benefit}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Applications */}
                                <div>
                                    <h2 className="text-2xl font-bold text-neutral-900 mb-8 border-b pb-4">
                                        🏠 Kullanım Alanları
                                    </h2>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {product.applications.map((application, index) => (
                                            <div
                                                key={index}
                                                className="text-center p-4 bg-neutral-50 rounded-xl border border-neutral-100"
                                            >
                                                <div className="text-3xl mb-2">🏢</div>
                                                <p className="text-sm font-medium text-neutral-700">{application}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <section className="section bg-neutral-50">
                        <div className="container-custom">
                            <h2 className="text-3xl font-bold text-neutral-900 mb-12 text-center">
                                Benzer Ürünler
                            </h2>
                            <div className="grid md:grid-cols-3 gap-8">
                                {relatedProducts.map((related) => (
                                    <Link
                                        key={related.id}
                                        href={`/pvc-sistemleri/${related.slug}`}
                                        className="group bg-white p-4 rounded-xl border border-neutral-200 hover:shadow-lg transition-all hover:-translate-y-1"
                                    >
                                        <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                                            <OptimizedImage
                                                src={related.image}
                                                alt={related.name}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                        <h3 className="font-bold text-neutral-900 group-hover:text-primary-600 transition-colors mb-2">
                                            {related.name}
                                        </h3>
                                        <p className="text-sm text-neutral-500 line-clamp-2">{related.tagline}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Local SEO Content */}
                <section className="py-12 bg-white border-t border-neutral-100">
                    <div className="container-custom">
                        <div className="prose prose-lg max-w-4xl mx-auto text-neutral-600">
                            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                                İstanbul Beylikdüzü&apos;de {product.name}
                            </h2>
                            <p>
                                {businessConfig.name}, İstanbul&apos;un Avrupa yakasında Beylikdüzü, Gürpınar, Yakuplu,
                                Büyükçekmece ve Esenyurt bölgelerinde {product.name} montaj ve satış hizmeti
                                sunmaktadır. Egepen Deceuninck yetkili bayisi olarak, {product.name} için
                                orijinal yedek parça ve profesyonel montaj garantisi veriyoruz.
                            </p>
                            <p>
                                25 yılı aşkın sektör deneyimimizle, {product.name} kurulumu ve bakımında
                                uzmanlaşmış ekibimiz, müşteri memnuniyetini ön planda tutmaktadır.
                                Ücretsiz keşif ve fiyat teklifi için bizimle iletişime geçin.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="py-20 bg-primary-600 text-white text-center">
                    <div className="container-custom">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            {product.name} için Ücretsiz Keşif
                        </h2>
                        <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                            Uzman ekibimiz evinize gelerek ölçüm yapsın, {product.name} için
                            size özel fiyat teklifi hazırlasın.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button variant="secondary" size="xl" href="/teklif-al">
                                Ücretsiz Keşif Talep Et
                            </Button>
                            <Button
                                variant="outline"
                                size="xl"
                                href={`tel:${businessConfig.contact.mobileRaw}`}
                                className="text-white border-white/30 hover:bg-white hover:text-primary-600"
                            >
                                {businessConfig.contact.mobile}
                            </Button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
