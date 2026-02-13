import { Metadata } from "next";
import { notFound } from "next/navigation";
import OptimizedImage from "@/components/ui/OptimizedImage";
import Link from "next/link";
import { HeaderOptimized } from "@/components/layout/HeaderOptimized";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { ExpandableSection, ExpandableGroup, DetailRow } from "@/components/ui/ExpandableSection";
import { businessConfig } from "@/config/business.config";
import { panjurSystems, getPanjurSystemBySlug } from "@/lib/panjurData";

interface PanjurPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return panjurSystems.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PanjurPageProps): Promise<Metadata> {
    const { slug } = await params;
    const system = getPanjurSystemBySlug(slug);
    if (!system) return { title: "Ürün Bulunamadı" };
    return {
        title: `${system.name} - Panjur & Kepenk Fiyatları`,
        description: system.description,
        alternates: { canonical: `https://egepenakcayapi.com/panjur-kepenk-sistemleri/${slug}` },
    };
}

export default async function PanjurProductPage({ params }: PanjurPageProps) {
    const { slug } = await params;
    const system = getPanjurSystemBySlug(slug);
    if (!system) notFound();

    const relatedSystems = panjurSystems.filter(s => s.slug !== slug).slice(0, 3);

    return (
        <>
            <HeaderOptimized />
            <main id="main-content" className="min-h-screen bg-neutral-50">
                <PageHero
                    title={system.name}
                    subtitle={system.tagline}
                    compact
                    breadcrumbs={[
                        { label: "Panjur & Kepenk Sistemleri", href: "/panjur-kepenk-sistemleri" },
                        { label: system.name },
                    ]}
                />

                <div className="container-custom py-10 md:py-14">
                    <div className="grid lg:grid-cols-5 gap-8">
                        <div className="lg:col-span-3">
                            <div className="relative aspect-video rounded-2xl overflow-hidden bg-neutral-100 mb-6">
                                <OptimizedImage src={system.image} alt={system.name} fill sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover" priority />
                            </div>
                            <p className="text-neutral-600 leading-relaxed mb-6">{system.description}</p>

                            <ExpandableGroup>
                                {system.technicalSpecs.length > 0 && (
                                    <ExpandableSection title="Teknik Özellikler" variant="card">
                                        <div className="space-y-0">
                                            {system.technicalSpecs.map((spec, i) => (
                                                <DetailRow key={i} label={spec.label} value={spec.value} />
                                            ))}
                                        </div>
                                    </ExpandableSection>
                                )}

                                {system.features.length > 0 && (
                                    <ExpandableSection title="Öne Çıkan Özellikler" variant="card">
                                        <ul className="space-y-2">
                                            {system.features.map((f, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-neutral-600">
                                                    <span className="text-primary-500 mt-0.5">✓</span>{f}
                                                </li>
                                            ))}
                                        </ul>
                                    </ExpandableSection>
                                )}

                                {system.benefits.length > 0 && (
                                    <ExpandableSection title="Avantajlar" variant="card">
                                        <ul className="space-y-2">
                                            {system.benefits.map((b, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-neutral-600">
                                                    <span className="text-green-500 mt-0.5">●</span>{b}
                                                </li>
                                            ))}
                                        </ul>
                                    </ExpandableSection>
                                )}

                                {system.motorOptions && system.motorOptions.length > 0 && (
                                    <ExpandableSection title="Motor Seçenekleri" variant="card">
                                        <div className="space-y-3">
                                            {system.motorOptions.map((m, i) => (
                                                <div key={i} className="text-sm">
                                                    <span className="font-medium text-neutral-800 capitalize">{m.brand} {m.model}</span>
                                                    <span className="text-neutral-400 mx-2">·</span>
                                                    <span className="text-neutral-500">{m.torque}Nm</span>
                                                    <p className="text-neutral-500 mt-0.5">{m.features.join(', ')}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </ExpandableSection>
                                )}

                                {system.lamelOptions && system.lamelOptions.length > 0 && (
                                    <ExpandableSection title="Lamel Seçenekleri" variant="card">
                                        <div className="space-y-3">
                                            {system.lamelOptions.map((l, i) => (
                                                <div key={i} className="text-sm">
                                                    <span className="font-medium text-neutral-800">{l.name}</span>
                                                    <span className="text-neutral-400 mx-2">·</span>
                                                    <span className="text-neutral-500">{l.width}mm × {l.thickness}mm</span>
                                                    <p className="text-neutral-500 mt-0.5">{l.description}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </ExpandableSection>
                                )}

                                {system.automationFeatures && system.automationFeatures.length > 0 && (
                                    <ExpandableSection title="Otomasyon Özellikleri" variant="card">
                                        <ul className="space-y-2">
                                            {system.automationFeatures.map((a, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-neutral-600">
                                                    <span className="text-primary-500 mt-0.5">⚡</span>{a}
                                                </li>
                                            ))}
                                        </ul>
                                    </ExpandableSection>
                                )}

                                {system.faq.length > 0 && (
                                    <ExpandableSection title="Sıkça Sorulan Sorular" variant="card">
                                        <div className="space-y-4">
                                            {system.faq.map((item, i) => (
                                                <div key={i}>
                                                    <h4 className="text-sm font-semibold text-neutral-800 mb-1">{item.question}</h4>
                                                    <p className="text-sm text-neutral-600">{item.answer}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </ExpandableSection>
                                )}

                                {system.longDescription && (
                                    <ExpandableSection title="Detaylı Bilgi" variant="card">
                                        <p className="text-sm text-neutral-600 leading-relaxed">{system.longDescription}</p>
                                    </ExpandableSection>
                                )}
                            </ExpandableGroup>
                        </div>

                        <div className="lg:col-span-2">
                            <div className="sticky top-24 space-y-4">
                                <div className="bg-white rounded-2xl border border-neutral-200 p-6">
                                    <h3 className="font-bold text-neutral-900 mb-4">Hızlı Bilgi</h3>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between"><span className="text-neutral-500">Garanti</span><span className="font-medium">{system.warranty}</span></div>
                                        <div className="flex justify-between"><span className="text-neutral-500">Segment</span><span className="font-medium capitalize">{system.priceRange}</span></div>
                                        {system.technicalSpecs.slice(0, 2).map((spec, i) => (
                                            <div key={i} className="flex justify-between"><span className="text-neutral-500">{spec.label}</span><span className="font-medium">{spec.value}</span></div>
                                        ))}
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

                    {relatedSystems.length > 0 && (
                        <div className="mt-12 pt-8 border-t border-neutral-200">
                            <h2 className="text-xl font-bold text-neutral-900 mb-6">Diğer Panjur & Kepenk Sistemleri</h2>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {relatedSystems.map(s => (
                                    <Link key={s.id} href={`/panjur-kepenk-sistemleri/${s.slug}`} className="group block bg-white rounded-xl border border-neutral-200 overflow-hidden hover:shadow-md transition-all">
                                        <div className="relative aspect-video bg-neutral-100">
                                            <OptimizedImage src={s.image} alt={s.name} fill sizes="33vw" className="object-cover" />
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-semibold text-neutral-800 group-hover:text-primary-600 transition-colors">{s.name}</h3>
                                            <p className="text-sm text-neutral-500 mt-1">{s.tagline}</p>
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
