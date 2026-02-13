import { Metadata } from "next";
import Link from "next/link";
import { HeaderOptimized } from '@/components/layout/HeaderOptimized';
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { ProductCard } from "@/components/ui/ProductCard";
import {
    pvcProductSeries,
    lsiKeywords,
    getProductsByCategory,
} from "@/lib/pvcData";

export const metadata: Metadata = {
    title: 'PVC Pencere Modelleri ve Fiyatları 2026',
    description: "Egepen Deceuninck PVC pencere fiyatları, ısı yalıtımlı kapı sistemleri ve sürgülü balkon kapısı modelleri. Legend, Legend Art, Zendow serileri. Ücretsiz keşif!",
    keywords: [
        "PVC pencere fiyatları",
        "PVC pencere fiyatları 2026",
        "ısı yalıtımlı kapı sistemleri",
        "Egepen yetkili bayi",
        "sürgülü balkon kapısı",
        ...lsiKeywords.primary,
        ...lsiKeywords.secondary,
    ],
    alternates: {
        canonical: "https://egepenakcayapi.com/pvc-sistemleri",
    },
    openGraph: {
        title: "Egepen PVC Pencere Fiyatları | Akçayapı Beylikdüzü",
        description: "Isı yalıtımlı PVC pencere ve sürgülü balkon kapısı sistemleri.",
        url: "https://egepenakcayapi.com/pvc-sistemleri",
        type: "website",
        locale: "tr_TR",
    },
};

function generateProductListSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Egepen Deceuninck PVC Pencere Sistemleri",
        numberOfItems: pvcProductSeries.length,
        itemListElement: pvcProductSeries.map((product, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `https://egepenakcayapi.com/pvc-sistemleri/${product.slug}`,
            item: {
                "@type": "Product",
                name: product.name,
                description: product.description,
                brand: { "@type": "Brand", name: "Egepen Deceuninck" },
            },
        })),
    };
}

export default function PVCSystemsPage() {
    const windowProducts = getProductsByCategory("pencere");
    const slidingProducts = getProductsByCategory("surme");

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(generateProductListSchema()) }}
            />

            <HeaderOptimized />

            <main id="main-content" className="min-h-screen bg-neutral-50">
                <PageHero
                    title="PVC Pencere Sistemleri"
                    subtitle="Egepen Deceuninck Legend, Legend Art ve Zendow serileri. Enerji tasarruflu, profesyonel montajlı PVC pencere çözümleri."
                    breadcrumbs={[{ label: "PVC Pencere Sistemleri" }]}
                />

                {/* Pencere Sistemleri */}
                <section className="py-12 md:py-16 bg-white">
                    <div className="container-custom">
                        <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-2">
                            Pencere Sistemleri
                        </h2>
                        <p className="text-neutral-500 mb-8 max-w-xl">
                            İhtiyacınıza uygun PVC pencere serisini seçin. Her seri farklı ısı yalıtımı ve konfor sunar.
                        </p>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {windowProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    name={product.name}
                                    slug={product.slug}
                                    basePath="/pvc-sistemleri"
                                    image={product.image}
                                    tagline={product.tagline}
                                    description={product.description}
                                    badge={product.featured ? "Öne Çıkan" : undefined}
                                    specs={[
                                        { label: "Profil", value: `${product.technicalSpecs.profileWidth}mm` },
                                        { label: "Odacık", value: `${product.technicalSpecs.chambers}` },
                                        { label: "Isı", value: product.technicalSpecs.thermalInsulation },
                                    ]}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Sürme Sistemleri */}
                {slidingProducts.length > 0 && (
                    <section className="py-12 md:py-16 bg-neutral-50">
                        <div className="container-custom">
                            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-2">
                                Sürme Sistemleri
                            </h2>
                            <p className="text-neutral-500 mb-8 max-w-xl">
                                Geniş açıklıklı sürgülü balkon kapısı ve sürme pencere modelleri.
                            </p>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {slidingProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        name={product.name}
                                        slug={product.slug}
                                        basePath="/pvc-sistemleri"
                                        image={product.image}
                                        tagline={product.tagline}
                                        description={product.description}
                                        specs={[
                                            { label: "Profil", value: `${product.technicalSpecs.profileWidth}mm` },
                                            { label: "Odacık", value: `${product.technicalSpecs.chambers}` },
                                        ]}
                                    />
                                ))}
                            </div>
                        </div>
                    </section>
                )}



                {/* Subtle text CTA */}
                <section className="py-14 md:py-16 bg-neutral-50 text-center">
                    <div className="container-custom max-w-xl">
                        <p className="text-neutral-600 leading-relaxed mb-4">
                            PVC pencere ihtiyacınız için ücretsiz keşif randevusu almak veya
                            detaylı bilgi edinmek isterseniz iletişim sayfamızı ziyaret edin.
                        </p>
                        <Link
                            href="/iletisim"
                            className="inline-flex items-center gap-2 text-primary-600 font-bold hover:text-primary-700 transition-colors"
                        >
                            İletişim Sayfasına Git
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
