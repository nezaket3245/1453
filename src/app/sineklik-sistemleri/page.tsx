import { Metadata } from "next";
import Link from "next/link";
import { HeaderOptimized } from "@/components/layout/HeaderOptimized";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { ProductCard } from "@/components/ui/ProductCard";
import { businessConfig } from "@/config/business.config";
import { sineklikSystems } from "@/lib/sineklikData";

export const metadata: Metadata = {
    title: "Sineklik Modelleri ve Fiyatları | Kedi Sinekliği",
    description:
        "Plise sineklik, kedi sinekliği, sürme ve menteşeli sineklik sistemleri. Yırtılmaz tül teknolojisi, RAL renk seçenekleri. Ücretsiz keşif.",
    keywords: [
        "sineklik fiyatları",
        "plise sineklik",
        "kedi sinekliği",
        "sürme sineklik",
        "menteşeli sineklik",
    ],
    alternates: {
        canonical: `${businessConfig.siteUrl}/sineklik-sistemleri`,
    },
    openGraph: {
        title: `Sineklik Sistemleri | ${businessConfig.name}`,
        description:
            "Kedi sinekliği, plise sineklik, sürme ve menteşeli sineklik. Ücretsiz keşif ve montaj.",
        type: "website",
        locale: "tr_TR",
    },
};

function generateSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Sineklik Sistemleri",
        numberOfItems: sineklikSystems.length,
        itemListElement: sineklikSystems.map((product, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `${businessConfig.siteUrl}/sineklik-sistemleri/${product.slug}`,
            item: {
                "@type": "Product",
                name: product.name,
                description: product.description,
                brand: { "@type": "Brand", name: businessConfig.name },
            },
        })),
    };
}

export default function SineklikPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(generateSchema()) }}
            />

            <HeaderOptimized />

            <main id="main-content" className="min-h-screen bg-neutral-50">
                <PageHero
                    title="Sineklik Sistemleri"
                    subtitle="Plise, kedi sinekliği, sürme ve menteşeli sineklik modelleri. Yırtılmaz tül ve RAL renk seçenekleri ile profesyonel çözümler."
                    breadcrumbs={[{ label: "Sineklik Sistemleri" }]}
                />

                {/* Ürünler */}
                <section className="py-12 md:py-16 bg-white">
                    <div className="container-custom">
                        <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-2">
                            Ürünlerimiz
                        </h2>
                        <p className="text-neutral-500 mb-8 max-w-xl">
                            İhtiyacınıza uygun sineklik modelini seçin. Her model farklı kullanım ve dayanıklılık sunar.
                        </p>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {sineklikSystems.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    name={product.name}
                                    slug={product.slug}
                                    basePath="/sineklik-sistemleri"
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
                            Sineklik ihtiyacınız için ücretsiz keşif randevusu almak veya
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
