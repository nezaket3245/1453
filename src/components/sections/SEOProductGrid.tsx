import Link from "next/link";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { businessConfig } from "@/config/business.config";
import { productCategories } from "@/data/categories";

/**
 * SEO Product Grid Component
 * 
 * Mobile-first responsive grid targeting high-volume Turkish search keywords:
 * - PVC Doğrama, Egepen, Cam Balkon, Sineklik, Panjur, Duşakabin
 * 
 * SEO Optimizations:
 * - Semantic HTML (<section>, <article>, <h2>, <h3>)
 * - Keyword-rich alt tags on all images
 * - Schema.org ItemList structured data
 * - Internal linking to category landing pages
 * - Mobile-first grid layout (1 col → 2 col → 3 col)
 * 
 * Data: Imports from centralized `@/data/categories` (DRY principle)
 * 
 * Performance:
 * - Server Component (no "use client")
 * - Lazy-loaded images below the fold
 * - CSS-only hover effects (no JS animations)
 */

/**
 * Generates Schema.org ItemList structured data for the product grid
 * Helps search engines understand the product catalog structure
 */
function generateProductGridSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Egepen Akçayapı Ürün ve Hizmet Kategorileri",
        description:
            "PVC doğrama, cam balkon, sineklik, panjur, duşakabin ve alüminyum sistemleri - Beylikdüzü yetkili Egepen bayisi",
        numberOfItems: productCategories.length,
        itemListElement: productCategories.map((cat, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
                "@type": "Product",
                name: cat.name,
                description: cat.description,
                image: `${businessConfig.siteUrl}${cat.image}`,
                url: `${businessConfig.siteUrl}${cat.href}`,
                brand: {
                    "@type": "Brand",
                    name: "Egepen Deceuninck",
                },
                offers: {
                    "@type": "AggregateOffer",
                    priceCurrency: "TRY",
                    availability: "https://schema.org/InStock",
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
 * SEOProductGrid - Server Component
 * 
 * Renders a responsive product category grid with:
 * - Mobile: 1 column
 * - Tablet: 2 columns
 * - Desktop: 3 columns
 * 
 * Each card is an <article> with proper heading hierarchy,
 * keyword-rich alt tags, and internal links to category pages.
 */
export function SEOProductGrid() {
    const schema = generateProductGridSchema();

    return (
        <section
            className="section bg-neutral-50"
            id="urun-kategorileri"
            aria-labelledby="product-grid-title"
        >
            {/* Schema.org Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />

            <div className="container-custom">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="text-primary-600 font-bold uppercase tracking-widest text-sm mb-4 block">
                        Ürün & Hizmet Kategorileri
                    </span>
                    <h2
                        id="product-grid-title"
                        className="text-3xl md:text-4xl lg:text-5xl font-black text-neutral-900 leading-tight mb-4"
                    >
                        PVC Doğrama, Cam Balkon ve{" "}
                        <span className="text-primary-500">Daha Fazlası</span>
                    </h2>
                    <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                        {businessConfig.brand} yetkili bayisi olarak Beylikdüzü ve çevre ilçelerde
                        profesyonel montaj ve ücretsiz keşif hizmetleri sunuyoruz.
                    </p>
                </div>

                {/* Product Grid - Mobile-first: 1 → 2 → 3 columns */}
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    role="list"
                    aria-label="Ürün kategorileri"
                >
                    {productCategories.map((category) => (
                        <article
                            key={category.id}
                            className="group bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
                            role="listitem"
                        >
                            {/* Product Image */}
                            <Link
                                href={category.href}
                                title={`${category.name} - Detaylı Bilgi ve Fiyat`}
                                className="block"
                            >
                                <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
                                    <OptimizedImage
                                        src={category.image}
                                        alt={category.imageAlt}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />
                                    {/* Gradient overlay for text readability */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                    {/* Badge */}
                                    {category.badge && (
                                        <span className="absolute top-4 left-4 px-3 py-1 bg-primary-600 text-white text-xs font-bold rounded-full shadow-lg">
                                            {category.badge}
                                        </span>
                                    )}
                                </div>
                            </Link>

                            {/* Card Content */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                                    <Link
                                        href={category.href}
                                        title={category.name}
                                    >
                                        {category.name}
                                    </Link>
                                </h3>

                                <p className="text-neutral-600 text-sm mb-4 leading-relaxed">
                                    {category.description}
                                </p>

                                {/* Feature List */}
                                <ul className="space-y-2 mb-6" aria-label={`${category.name} özellikleri`}>
                                    {category.features.map((feature, i) => (
                                        <li
                                            key={i}
                                            className="flex items-start gap-2 text-sm text-neutral-700"
                                        >
                                            <svg
                                                className="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={2.5}
                                                aria-hidden="true"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA Button */}
                                <Link
                                    href={category.href}
                                    title={category.cta}
                                    className="inline-flex items-center gap-2 w-full justify-center px-5 py-3 bg-primary-600 text-white text-sm font-bold rounded-xl hover:bg-primary-700 transition-colors min-h-[48px]"
                                >
                                    {category.cta}
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                                        />
                                    </svg>
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Bottom Info */}
                <div className="mt-16 text-center bg-primary-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent_50%)]" />
                    <div className="relative z-10">
                        <h3 className="text-2xl md:text-3xl font-black mb-4">
                            Hangi Ürünü Seçeceğinize Karar Veremediniz mi?
                        </h3>
                        <p className="text-neutral-300 mb-8 max-w-xl mx-auto">
                            Uzman ekibimiz evinize en uygun çözümü belirlemenizde yardımcı olsun.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/iletisim"
                                title="İletişim Sayfasına Git"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-900 font-bold rounded-xl hover:bg-neutral-100 transition-colors min-h-[48px]"
                            >
                                Bize Ulaşın
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
