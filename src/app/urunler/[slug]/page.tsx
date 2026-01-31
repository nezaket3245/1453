import { Metadata } from "next";
import { notFound } from "next/navigation";
import OptimizedImage from "@/components/ui/OptimizedImage";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { products } from "@/lib/data";
import { generateProductSchema } from "@/lib/utils";
import { businessConfig } from "@/config/business.config";

interface ProductPageProps {
    params: Promise<{ slug: string }>;
}

/**
 * Generate Metadata for Product Page
 */
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
    const { slug } = await params;
    const product = products.find((p) => p.slug === slug);

    if (!product) return { title: "Ürün Bulunamadı" };

    return {
        title: `${product.name} | ${businessConfig.name}`,
        description: product.description,
        keywords: product.features.map(f => f.slice(0, 20)),
        openGraph: {
            title: product.name,
            description: product.description,
            images: [{ url: product.image }],
        },
        alternates: {
            canonical: `https://egepenakcayapi.com.tr/urunler/${product.slug}`,
        },
    };
}

/**
 * Generate Static Params for all products
 */
export async function generateStaticParams() {
    return products.map((product) => ({
        slug: product.slug,
    }));
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
    const { slug } = await params;
    const product = products.find((p) => p.slug === slug);

    if (!product) {
        notFound();
    }

    const schema = generateProductSchema(product);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
            <Header />
            <main id="main-content" className="min-h-screen bg-white">
                {/* Breadcrumb & Hero */}
                <section className="bg-neutral-50 border-b border-neutral-100 py-8 lg:py-12">
                    <div className="container-custom">
                        <nav aria-label="Breadcrumb" className="mb-6">
                            <ol className="flex items-center gap-2 text-sm text-neutral-500">
                                <li><Link href="/" title="Ana Sayfa" className="hover:text-primary-600">Ana Sayfa</Link></li>
                                <li>/</li>
                                <li><Link href="/urunler" title="Tüm Ürünler" className="hover:text-primary-600">Ürünler</Link></li>
                                <li>/</li>
                                <li className="text-neutral-900 font-medium">{product.name}</li>
                            </ol>
                        </nav>

                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
                                    {product.name}
                                </h1>
                                <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                                    {product.longDescription || product.description}
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <Button variant="primary" size="lg" href="/teklif-al">
                                        Fiyat Teklifi Al
                                    </Button>
                                    <Button variant="outline" size="lg" href={`https://wa.me/${businessConfig.contact.whatsapp}`} external>
                                        WhatsApp Destek
                                    </Button>
                                </div>
                            </div>
                            <div className="relative aspect-video lg:aspect-square rounded-2xl overflow-hidden shadow-2xl border border-neutral-200 bg-white">
                                <OptimizedImage
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features & Specs */}
                <section className="section">
                    <div className="container-custom">
                        <div className="grid lg:grid-cols-3 gap-12">
                            {/* Features */}
                            <div className="lg:col-span-2">
                                <h2 className="text-2xl font-bold text-neutral-900 mb-8 border-b pb-4">
                                    Öne Çıkan Özellikler
                                </h2>
                                <div className="grid sm:grid-cols-2 gap-6">
                                    {product.features.map((feature, index) => (
                                        <div key={index} className="flex gap-4">
                                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mt-1">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" aria-hidden="true" stroke="currentColor" strokeWidth={3}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <span className="text-neutral-700 leading-snug">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <h2 className="text-2xl font-bold text-neutral-900 mb-8 mt-16 border-b pb-4">
                                    Avantajlar
                                </h2>
                                <div className="space-y-4">
                                    {product.benefits?.map((benefit, index) => (
                                        <div key={index} className="flex gap-4 items-center p-4 bg-primary-50 rounded-xl border border-primary-100">
                                            <div className="text-2xl">✨</div>
                                            <p className="text-neutral-800 font-medium">{benefit}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Technical Specs Sidebar */}
                            <div className="lg:col-span-1">
                                <div className="bg-neutral-900 text-white rounded-2xl p-8 sticky top-28 shadow-xl">
                                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                        <svg className="w-6 h-6 text-secondary-400" fill="none" viewBox="0 0 24 24" aria-hidden="true" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                        Teknik Özellikler
                                    </h3>
                                    <div className="space-y-4">
                                        {product.technicalSpecs?.map((spec, index) => (
                                            <div key={index} className="flex justify-between items-center py-3 border-b border-white/10 last:border-0">
                                                <span className="text-white/60 text-sm">{spec.label}</span>
                                                <span className="font-semibold text-white">{spec.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-8 pt-8 border-t border-white/10">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-12 h-12 rounded-full bg-secondary-500/20 flex items-center justify-center">
                                                <svg className="w-6 h-6 text-secondary-400" fill="none" viewBox="0 0 24 24" aria-hidden="true" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold">10 Yıl Garanti</p>
                                                <p className="text-xs text-white/40">{businessConfig.brand} Güvencesiyle</p>
                                            </div>
                                        </div>
                                        <Button variant="secondary" fullWidth href="/teklif-al">
                                            Hemen Ölçüm İsteyin
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Other Products Section */}
                <section className="section bg-neutral-50 mb-[-4rem]">
                    <div className="container-custom">
                        <h2 className="text-3xl font-bold text-neutral-900 mb-12 text-center">Diğer Çözümlerimiz</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {products.filter(p => p.slug !== slug).map(other => (
                                <Link key={other.id} href={`/urunler/${other.slug}`} className="group bg-white p-4 rounded-xl border border-neutral-200 hover:shadow-lg transition-all">
                                    <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                                        <OptimizedImage src={other.image} alt={other.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                                    </div>
                                    <h3 className="font-bold text-neutral-900 group-hover:text-primary-600 transition-colors">{other.name}</h3>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
