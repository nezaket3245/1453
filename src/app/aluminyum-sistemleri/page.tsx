import { Metadata } from "next";
import Link from "next/link";
import { HeaderOptimized } from "@/components/layout/HeaderOptimized";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { ProductCard } from "@/components/ui/ProductCard";
import { businessConfig } from "@/config/business.config";
import { aluminumSystems } from "@/lib/aluminumData";

export const metadata: Metadata = {
    title: "Alüminyum Doğrama ve Cephe Sistemleri",
    description:
        "Isı yalıtımlı alüminyum pencere, cephe giydirme, cam ofis bölme sistemleri. A1 yangın sınıfı, 40+ yıl ömür. Ücretsiz keşif.",
    keywords: [
        "alüminyum doğrama",
        "ısı yalıtımlı alüminyum pencere",
        "cephe giydirme",
        "ofis cam bölme",
        "thermal break alüminyum",
    ],
    alternates: {
        canonical: `${businessConfig.siteUrl}/aluminyum-sistemleri`,
    },
    openGraph: {
        title: `Alüminyum Doğrama & Cephe Sistemleri | ${businessConfig.name}`,
        description:
            "Isı yalıtımlı alüminyum pencere, curtain wall cephe, ofis cam bölme.",
        type: "website",
        locale: "tr_TR",
    },
};

function generateSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Alüminyum Doğrama ve Cephe Sistemleri",
        numberOfItems: aluminumSystems.length,
        itemListElement: aluminumSystems.map((product, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `${businessConfig.siteUrl}/aluminyum-sistemleri/${product.slug}`,
            item: {
                "@type": "Product",
                name: product.name,
                description: product.description,
                brand: { "@type": "Brand", name: businessConfig.name },
            },
        })),
    };
}

export default function AluminumSystemsPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(generateSchema()) }}
            />

            <HeaderOptimized />

            <main id="main-content" className="min-h-screen bg-neutral-50">
                <PageHero
                    title="Alüminyum Sistemleri"
                    subtitle="Thermal break alüminyum pencere, cephe giydirme ve ofis bölme sistemleri. A1 yangın sınıfı güvenliği."
                    breadcrumbs={[{ label: "Alüminyum Sistemleri" }]}
                />

                {/* Ürünler */}
                <section className="py-12 md:py-16 bg-white">
                    <div className="container-custom">
                        <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-2">
                            Ürünlerimiz
                        </h2>
                        <p className="text-neutral-500 mb-8 max-w-xl">
                            İhtiyacınıza uygun alüminyum sistemi seçin. Her sistem farklı performans ve estetik sunar.
                        </p>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {aluminumSystems.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    name={product.name}
                                    slug={product.slug}
                                    basePath="/aluminyum-sistemleri"
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
                            Alüminyum doğrama ihtiyacınız için ücretsiz keşif randevusu almak veya
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
