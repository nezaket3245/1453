import { Metadata } from "next";
import Link from "next/link";
import { HeaderOptimized } from "@/components/layout/HeaderOptimized";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { ProductCard } from "@/components/ui/ProductCard";
import { businessConfig } from "@/config/business.config";
import { glassSystems } from "@/lib/camBalkonData";

export const metadata: Metadata = {
    title: "Cam Balkon Fiyatları 2026 | Isıcamlı Sistem",
    description:
        "Isıcamlı cam balkon sistemleri, sürme ve giyotin cam çözümleri. Isı yalıtımı, şık tasarım ve ücretsiz keşif için hemen arayın.",
    keywords: [
        "cam balkon fiyatları 2026",
        "ısıcamlı cam balkon",
        "sürme cam balkon",
        "giyotin cam sistemleri",
        "katlanır cam balkon",
    ],
    alternates: {
        canonical: "https://egepenakcayapi.com/cam-balkon-sistemleri",
    },
    openGraph: {
        title: `Cam Balkon Sistemleri | ${businessConfig.name}`,
        description:
            "Isı yalıtımlı cam balkon ve sürme sistemlerinde uzman çözüm ortağınız.",
        url: "https://egepenakcayapi.com/cam-balkon-sistemleri",
        type: "website",
        locale: "tr_TR",
    },
};

function generateSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Cam Balkon Sistemleri",
        numberOfItems: glassSystems.length,
        itemListElement: glassSystems.map((product, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `https://egepenakcayapi.com/cam-balkon-sistemleri/${product.slug}`,
            item: {
                "@type": "Product",
                name: product.name,
                description: product.description,
                brand: { "@type": "Brand", name: businessConfig.name },
            },
        })),
    };
}

export default function CamBalkonPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(generateSchema()) }}
            />

            <HeaderOptimized />

            <main id="main-content" className="min-h-screen bg-neutral-50">
                <PageHero
                    title="Cam Balkon Sistemleri"
                    subtitle="Isıcamlı cam balkon, sürme, giyotin ve katlanır cam sistemleri. Enerji tasarruflu, profesyonel montajlı çözümler."
                    breadcrumbs={[{ label: "Cam Balkon Sistemleri" }]}
                />

                {/* Ürünler */}
                <section className="py-12 md:py-16 bg-white">
                    <div className="container-custom">
                        <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-2">
                            Ürünlerimiz
                        </h2>
                        <p className="text-neutral-500 mb-8 max-w-xl">
                            İhtiyacınıza uygun cam balkon sistemini seçin. Her sistem farklı yalıtım ve konfor sunar.
                        </p>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {glassSystems.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    name={product.name}
                                    slug={product.slug}
                                    basePath="/cam-balkon-sistemleri"
                                    image={product.image}
                                    tagline={product.tagline}
                                    description={product.description}
                                    specs={product.technicalSpecs.slice(0, 3).map((s) => ({
                                        label: s.label,
                                        value: s.value,
                                    }))}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Subtle text CTA */}
                <section className="py-14 md:py-16 bg-neutral-50 text-center">
                    <div className="container-custom max-w-xl">
                        <p className="text-neutral-600 leading-relaxed mb-4">
                            Cam balkon ihtiyacınız için ücretsiz keşif randevusu almak veya
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
