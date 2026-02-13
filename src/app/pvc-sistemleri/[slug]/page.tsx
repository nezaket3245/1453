import { Metadata } from "next";
import { notFound } from "next/navigation";
import OptimizedImage from "@/components/ui/OptimizedImage";
import Link from "next/link";
import { HeaderOptimized } from "@/components/layout/HeaderOptimized";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { ExpandableSection, ExpandableGroup, DetailRow } from "@/components/ui/ExpandableSection";
import { businessConfig } from "@/config/business.config";
import { pvcProductSeries, getProductBySlug } from "@/lib/pvcData";

interface PVCProductPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return pvcProductSeries.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PVCProductPageProps): Promise<Metadata> {
    const { slug } = await params;
    const product = getProductBySlug(slug);
    if (!product) return { title: "Ürün Bulunamadı" };
    return {
        title: `${product.name} - PVC Pencere Fiyatları`,
        description: product.description,
        alternates: { canonical: `https://egepenakcayapi.com/pvc-sistemleri/${slug}` },
    };
}

export default async function PVCProductPage({ params }: PVCProductPageProps) {
    const { slug } = await params;
    const product = getProductBySlug(slug);
    if (!product) notFound();

    const relatedProducts = pvcProductSeries.filter(p => p.slug !== slug).slice(0, 3);

    return (
        <>
            <HeaderOptimized />
            <main id="main-content" className="min-h-screen bg-neutral-50">
                <PageHero
                    title={product.name}
                    subtitle={product.tagline}
                    compact
                    breadcrumbs={[
                        { label: "PVC Sistemleri", href: "/pvc-sistemleri" },
                        { label: product.name },
                    ]}
                />

                <div className="container-custom py-10 md:py-14">
                    <div className="grid lg:grid-cols-5 gap-8">
                        {/* Sol: Resim + Açıklama */}
                        <div className="lg:col-span-3">
                            <div className="relative aspect-video rounded-2xl overflow-hidden bg-neutral-100 mb-6">
                                <OptimizedImage src={product.image} alt={product.name} fill sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover" priority />
                            </div>
                            <p className="text-neutral-600 leading-relaxed mb-6">{product.description}</p>

                            <ExpandableGroup>
                                <ExpandableSection title="Teknik Özellikler" variant="card">
                                    <div className="space-y-0">
                                        <DetailRow label="Profil Genişliği" value={`${product.technicalSpecs.profileWidth}mm`} />
                                        <DetailRow label="Odacık Sayısı" value={`${product.technicalSpecs.chambers}`} />
                                        <DetailRow label="Isı Yalıtımı" value={product.technicalSpecs.thermalInsulation} />
                                        <DetailRow label="Ses Yalıtımı" value={product.technicalSpecs.acousticInsulation} />
                                    </div>
                                </ExpandableSection>

                                {product.features.length > 0 && (
                                    <ExpandableSection title="Öne Çıkan Özellikler" variant="card">
                                        <ul className="space-y-2">
                                            {product.features.map((f: string, i: number) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-neutral-600">
                                                    <span className="text-primary-500 mt-0.5">✓</span>{f}
                                                </li>
                                            ))}
                                        </ul>
                                    </ExpandableSection>
                                )}

                                {product.benefits.length > 0 && (
                                    <ExpandableSection title="Avantajlar" variant="card">
                                        <ul className="space-y-2">
                                            {product.benefits.map((b: string, i: number) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-neutral-600">
                                                    <span className="text-green-500 mt-0.5">●</span>{b}
                                                </li>
                                            ))}
                                        </ul>
                                    </ExpandableSection>
                                )}

                                {product.applications.length > 0 && (
                                    <ExpandableSection title="Kullanım Alanları" variant="card">
                                        <div className="flex flex-wrap gap-2">
                                            {product.applications.map((a: string, i: number) => (
                                                <span key={i} className="inline-block text-xs bg-neutral-100 text-neutral-600 px-3 py-1.5 rounded-full">{a}</span>
                                            ))}
                                        </div>
                                    </ExpandableSection>
                                )}

                                {product.longDescription && (
                                    <ExpandableSection title="Detaylı Bilgi" variant="card">
                                        <p className="text-sm text-neutral-600 leading-relaxed">{product.longDescription}</p>
                                    </ExpandableSection>
                                )}
                            </ExpandableGroup>
                        </div>

                        {/* Sağ: Sidebar */}
                        <div className="lg:col-span-2">
                            <div className="sticky top-24 space-y-4">
                                <div className="bg-white rounded-2xl border border-neutral-200 p-6">
                                    <h3 className="font-bold text-neutral-900 mb-4">Hızlı Bilgi</h3>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between"><span className="text-neutral-500">Profil</span><span className="font-medium">{product.technicalSpecs.profileWidth}mm</span></div>
                                        <div className="flex justify-between"><span className="text-neutral-500">Odacık</span><span className="font-medium">{product.technicalSpecs.chambers}</span></div>
                                        <div className="flex justify-between"><span className="text-neutral-500">Garanti</span><span className="font-medium">10 Yıl</span></div>
                                    </div>
                                </div>

                                <div className="bg-primary-600 rounded-2xl p-6 text-white">
                                    <h3 className="font-bold mb-2">Fiyat Teklifi Alın</h3>
                                    <p className="text-sm text-white/80 mb-4">Bu ürün için ücretsiz keşif ve fiyat teklifi alın.</p>
                                    <Link href="/iletisim" className="block w-full text-center px-4 py-3 bg-white text-primary-600 font-bold rounded-xl hover:bg-neutral-100 transition-colors">
                                        İletişime Geçin
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {relatedProducts.length > 0 && (
                        <div className="mt-12 pt-8 border-t border-neutral-200">
                            <h2 className="text-xl font-bold text-neutral-900 mb-6">Diğer PVC Sistemleri</h2>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {relatedProducts.map(p => (
                                    <Link key={p.id} href={`/pvc-sistemleri/${p.slug}`} className="group block bg-white rounded-xl border border-neutral-200 overflow-hidden hover:shadow-md transition-all">
                                        <div className="relative aspect-video bg-neutral-100">
                                            <OptimizedImage src={p.image} alt={p.name} fill sizes="33vw" className="object-cover" />
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-semibold text-neutral-800 group-hover:text-primary-600 transition-colors">{p.name}</h3>
                                            <p className="text-sm text-neutral-500 mt-1">{p.tagline}</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
}
