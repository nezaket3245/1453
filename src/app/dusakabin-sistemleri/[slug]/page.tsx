/**
 * Dynamic Duşakabin Detail Page - Updated for new data structure
 * SEO: Individual product pages with Schema.org markup
 */

import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
    dusakabinSystems,
    getDusakabinSystemBySlug,
    getDusakabinSystemsByCategory,
    glassTypes,
    profileColors,
    hygieneCoatings,
    DusakabinSystem,
    GlassType,
} from '@/lib/dusakabinData';
import { CTASection } from '@/components/sections/CTASection';
import { businessConfig } from '@/config/business.config';

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
    return dusakabinSystems.map((system: DusakabinSystem) => ({
        slug: system.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const system = getDusakabinSystemBySlug(slug);

    if (!system) {
        return { title: 'Sistem Bulunamadı' };
    }

    return {
        title: `${system.name} | Duşakabin | Egepen Akçayapı`,
        description: system.description,
        keywords: system.seoKeywords.join(', '),
        openGraph: {
            title: `${system.name} | Egepen Akçayapı`,
            description: system.tagline,
            type: 'website',
            locale: 'tr_TR',
        },
        alternates: {
            canonical: `https://www.egepenakcayapi.com.tr/dusakabin-sistemleri/${system.slug}`,
        },
    };
}

export default async function DusakabinDetailPage({ params }: Props) {
    const { slug } = await params;
    const system = getDusakabinSystemBySlug(slug);

    if (!system) {
        notFound();
    }

    // JSON-LD Schema
    const productSchema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: system.name,
        description: system.description,
        image: system.image,
        brand: { '@type': 'Brand', name: 'Egepen Akçayapı' },
        offers: {
            '@type': 'AggregateOffer',
            priceCurrency: 'TRY',
            lowPrice: system.priceRange.min,
            highPrice: system.priceRange.max,
            availability: 'https://schema.org/InStock',
        },
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            reviewCount: '89',
        },
    };

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: system.faq.map((item: { question: string; answer: string }) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
    };

    // Category styling - Updated for new category types
    const getCategoryStyle = () => {
        switch (system.category) {
            case 'black-edition':
                return { gradient: 'from-slate-800 to-gray-900', accent: 'slate', label: 'Black Edition', bg: 'bg-slate-100' };
            case 'sliding-corner':
                return { gradient: 'from-blue-500 to-cyan-600', accent: 'blue', label: 'Sürme & Köşe Girişli', bg: 'bg-blue-50' };
            case 'hinged-luxury':
                return { gradient: 'from-purple-500 to-pink-600', accent: 'purple', label: 'Menteşeli Lüks', bg: 'bg-purple-50' };
            case 'walk-in':
                return { gradient: 'from-emerald-500 to-teal-600', accent: 'emerald', label: 'Walk-in', bg: 'bg-emerald-50' };
            default:
                return { gradient: 'from-gray-500 to-slate-600', accent: 'gray', label: 'Duşakabin', bg: 'bg-gray-50' };
        }
    };

    const style = getCategoryStyle();

    // Related systems
    const relatedSystems = getDusakabinSystemsByCategory(system.category)
        .filter((s: DusakabinSystem) => s.id !== system.id)
        .slice(0, 2);

    // Get available glass details
    const availableGlassDetails = system.availableGlass
        .map((glassId: string) => glassTypes.find((g: GlassType) => g.id === glassId))
        .filter(Boolean) as GlassType[];

    // Get available profile details
    const availableProfileDetails = system.availableProfiles
        .map((profileId: string) => profileColors.find((p) => p.id === profileId))
        .filter(Boolean);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            <main className="min-h-screen bg-white">
                {/* Breadcrumb */}
                <div className="bg-gray-50 py-4 border-b">
                    <div className="container mx-auto px-4">
                        <nav className="flex items-center text-sm text-gray-500">
                            <Link href="/" className="hover:text-purple-600">Ana Sayfa</Link>
                            <span className="mx-2">/</span>
                            <Link href="/dusakabin-sistemleri" className="hover:text-purple-600">
                                Duşakabin
                            </Link>
                            <span className="mx-2">/</span>
                            <span className="text-gray-900">{system.name}</span>
                        </nav>
                    </div>
                </div>

                {/* Hero */}
                <section className={`relative bg-gradient-to-br ${style.gradient} py-16 lg:py-24`}>
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className="text-white">
                                <div className="flex flex-wrap items-center gap-3 mb-4">
                                    <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                                        {style.label}
                                    </span>
                                    {/* <span className="inline-block px-3 py-1 bg-green-500/20 text-green-200 rounded-full text-sm font-medium border border-green-500/30">
                                        {system.warranty}
                                    </span> */}
                                </div>
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                                    {system.name}
                                </h1>
                                <p className="text-xl text-white/90 font-medium mb-4">{system.tagline}</p>
                                <p className="text-white/80 mb-6">{system.description}</p>

                                {/* Price Range */}
                                <div className="mb-8 p-4 bg-white/10 rounded-xl border border-white/20">
                                    <span className="text-white/70 text-sm">Fiyat Aralığı:</span>
                                    <div className="text-2xl font-bold text-white">
                                        ₺{system.priceRange.min.toLocaleString('tr-TR')} - ₺{system.priceRange.max.toLocaleString('tr-TR')}
                                    </div>
                                    <span className="text-xs text-white/60">*Ölçü ve seçeneklere göre değişir</span>
                                </div>

                                <div className="flex flex-wrap gap-4">
                                    <Link
                                        href="/teklif-al"
                                        className="inline-flex items-center px-6 py-3 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-all"
                                    >
                                        📐 Teklif Al
                                    </Link>
                                    <a
                                        href={`https://wa.me/${businessConfig.contact.whatsapp}?text=Merhaba,%20${encodeURIComponent(system.name)}%20hakkında%20bilgi%20almak%20istiyorum.`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-6 py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 border border-white/20"
                                    >
                                        💬 WhatsApp Bilgi Al
                                    </a>
                                </div>
                            </div>

                            <div className="relative h-80 lg:h-[400px]">
                                <Image
                                    src={system.image}
                                    alt={system.name}
                                    fill
                                    className="object-contain drop-shadow-2xl"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Technical Specs */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-5xl mx-auto">
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
                                Teknik Özellikler
                            </h2>

                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {system.technicalSpecs.map((spec: { label: string; value: string; highlight?: boolean }, idx: number) => (
                                    <div
                                        key={idx}
                                        className={`p-4 rounded-xl border ${spec.highlight
                                            ? 'bg-purple-50 border-purple-200'
                                            : 'bg-gray-50 border-gray-200'
                                            }`}
                                    >
                                        <div className="text-sm text-gray-500 mb-1">{spec.label}</div>
                                        <div className={`font-bold ${spec.highlight ? 'text-purple-700' : 'text-gray-900'}`}>
                                            {spec.value}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Available Glass Types */}
                {availableGlassDetails.length > 0 && (
                    <section className="py-16 bg-gray-50">
                        <div className="container mx-auto px-4">
                            <div className="max-w-5xl mx-auto">
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
                                    Uygun Cam Seçenekleri
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {availableGlassDetails.map((glass: GlassType) => (
                                        <div key={glass.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow">
                                            <div className="flex justify-between items-start mb-3">
                                                <h4 className="font-bold text-gray-900">{glass.nameTR}</h4>
                                                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                                                    {glass.thickness.join('/')}mm
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600 mb-4">{glass.description}</p>
                                            <div className="space-y-1">
                                                {glass.properties.map((prop: string, idx: number) => (
                                                    <div key={idx} className="flex items-center text-xs text-gray-500">
                                                        <span className="text-green-500 mr-2">✓</span>
                                                        {prop}
                                                    </div>
                                                ))}
                                            </div>
                                            {glass.priceMultiplier > 1.2 && (
                                                <div className="mt-3 pt-3 border-t">
                                                    <span className="text-xs text-amber-600 font-medium">Premium Seçenek (+{Math.round((glass.priceMultiplier - 1) * 100)}%)</span>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Available Profile Colors */}
                {availableProfileDetails.length > 0 && (
                    <section className="py-16 bg-white">
                        <div className="container mx-auto px-4">
                            <div className="max-w-5xl mx-auto">
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
                                    Profil Renk Seçenekleri
                                </h2>

                                <div className="flex flex-wrap justify-center gap-6">
                                    {availableProfileDetails.map((profile) => profile && (
                                        <div key={profile.id} className="flex flex-col items-center p-4 bg-gray-50 rounded-xl hover:shadow-lg transition-all min-w-[120px]">
                                            <div
                                                className="w-16 h-16 rounded-full shadow-lg border-4 border-white mb-3"
                                                style={{ backgroundColor: profile.hex }}
                                            />
                                            <span className="font-medium text-gray-900 text-sm text-center">{profile.nameTR}</span>
                                            <span className="text-xs text-gray-500 mt-1">{profile.coating}</span>
                                            {profile.popular && (
                                                <span className="text-xs text-purple-600 font-medium mt-1">⭐ Popüler</span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Features & Benefits */}
                <section className={`py-16 ${style.bg}`}>
                    <div className="container mx-auto px-4">
                        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-white rounded-2xl p-8 shadow-sm">
                                <h3 className="text-xl font-bold text-gray-900 mb-6">🔧 Özellikler</h3>
                                <ul className="space-y-3">
                                    {system.features.map((feature: string, idx: number) => (
                                        <li key={idx} className="flex items-start">
                                            <span className="text-purple-500 mr-3">✓</span>
                                            <span className="text-gray-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-white rounded-2xl p-8 shadow-sm">
                                <h3 className="text-xl font-bold text-gray-900 mb-6">💡 Avantajlar</h3>
                                <ul className="space-y-3">
                                    {system.benefits.map((benefit: string, idx: number) => (
                                        <li key={idx} className="flex items-start">
                                            <span className="text-green-500 mr-3">★</span>
                                            <span className="text-gray-700">{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Hygiene Coating Options */}
                <section className="py-16 bg-gradient-to-br from-cyan-50 to-blue-50">
                    <div className="container mx-auto px-4">
                        <div className="max-w-5xl mx-auto">
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 text-center">
                                Opsiyonel Nano Kaplama
                            </h2>
                            <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
                                Kolay temizlik ve uzun ömürlü hijyen için nano kaplama seçenekleri
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {hygieneCoatings.map((coating) => (
                                    <div key={coating.id} className="bg-white rounded-xl p-6 shadow-lg">
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="text-3xl">
                                                {coating.id === 'nano-clear' ? '💧' : coating.id === 'anti-calc' ? '🧊' : '🛡️'}
                                            </div>
                                            <h4 className="font-bold text-gray-900">{coating.name}</h4>
                                        </div>
                                        <p className="text-xs text-cyan-600 font-medium mb-2">{coating.technology}</p>
                                        <p className="text-sm text-gray-600 mb-4">{coating.description}</p>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="bg-cyan-50 rounded-lg p-3 text-center">
                                                <div className="text-cyan-600 font-bold text-sm">{coating.cleaningFrequency}</div>
                                                <div className="text-xs text-gray-500">Temizlik</div>
                                            </div>
                                            <div className="bg-cyan-50 rounded-lg p-3 text-center">
                                                <div className="text-cyan-600 font-bold text-sm">{coating.lifespan}</div>
                                                <div className="text-xs text-gray-500">Etki Süresi</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Long Description */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto">
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
                                Detaylı Bilgi
                            </h2>
                            <div className="prose prose-lg max-w-none">
                                {system.longDescription.split('\n\n').map((para: string, idx: number) => (
                                    <p key={idx} className="text-gray-700 mb-4">{para}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Installation & Warranty Info */}
                <section className="py-12 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="max-w-5xl mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                                    <div className="text-3xl mb-3">⏱️</div>
                                    <div className="font-bold text-gray-900 mb-1">Montaj Süresi</div>
                                    <div className="text-purple-600 font-medium">{system.installationTime}</div>
                                </div>
                                {/* <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                                    <div className="text-3xl mb-3">🛡️</div>
                                    <div className="font-bold text-gray-900 mb-1">Garanti</div>
                                    <div className="text-green-600 font-medium">{system.warranty}</div>
                                </div> */}
                                <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                                    <div className="text-3xl mb-3">📜</div>
                                    <div className="font-bold text-gray-900 mb-1">Sertifikalar</div>
                                    <div className="flex flex-wrap justify-center gap-1">
                                        {system.certifications.map((cert: string, idx: number) => (
                                            <span key={idx} className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">
                                                {cert}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                {system.faq.length > 0 && (
                    <section className="py-16 bg-white">
                        <div className="container mx-auto px-4">
                            <div className="max-w-3xl mx-auto">
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
                                    Sıkça Sorulan Sorular
                                </h2>
                                <div className="space-y-4">
                                    {system.faq.map((item: { question: string; answer: string }, idx: number) => (
                                        <details key={idx} className="group bg-gray-50 rounded-xl overflow-hidden">
                                            <summary className="flex justify-between items-center cursor-pointer p-6 font-semibold text-gray-900 hover:bg-gray-100">
                                                {item.question}
                                                <span className="ml-4 text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                                            </summary>
                                            <div className="px-6 pb-6 text-gray-700">{item.answer}</div>
                                        </details>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Related Systems */}
                {relatedSystems.length > 0 && (
                    <section className="py-16 bg-gray-50">
                        <div className="container mx-auto px-4">
                            <div className="max-w-5xl mx-auto">
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
                                    Benzer Sistemler
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {relatedSystems.map((related: DusakabinSystem) => (
                                        <Link
                                            key={related.id}
                                            href={`/dusakabin-sistemleri/${related.slug}`}
                                            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all group"
                                        >
                                            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                                                {related.name}
                                            </h3>
                                            <p className="text-sm text-gray-600 mb-3">{related.tagline}</p>
                                            <div className="flex justify-between items-center">
                                                <span className="text-purple-600 font-bold">
                                                    ₺{related.priceRange.min.toLocaleString('tr-TR')}+
                                                </span>
                                                <span className="text-gray-400 text-sm group-hover:text-purple-600 transition-colors">
                                                    İncele →
                                                </span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* WhatsApp Float CTA */}
                <section className="py-12 bg-gradient-to-r from-green-500 to-emerald-600">
                    <div className="container mx-auto px-4 text-center">
                        <h3 className="text-2xl font-bold text-white mb-4">
                            {system.name} Hakkında Detaylı Bilgi Alın
                        </h3>
                        <p className="text-green-100 mb-6">
                            Banyonuzun fotoğrafını gönderin, size özel ölçü ve fiyat çalışalım
                        </p>
                        <a
                            href={`https://wa.me/${businessConfig.contact.whatsapp}?text=Merhaba,%20${encodeURIComponent(system.name)}%20için%20fiyat%20teklifi%20almak%20istiyorum.%20Banyo%20fotoğrafımı%20göndereceğim.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-green-600 font-bold rounded-2xl hover:bg-green-50 transition-all shadow-xl"
                        >
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            WhatsApp ile Fiyat Al
                        </a>
                    </div>
                </section>

                {/* CTA */}
                <CTASection />
            </main>
        </>
    );
}
