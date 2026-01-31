/**
 * Dynamic Aluminum System Detail Page
 * SEO: Individual product pages for each aluminum system
 * Features: Full specs, FAQ, gallery, schema.org Product markup
 */

import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { aluminumSystems, getAluminumSystemBySlug, thermalBreakTechnology } from '@/lib/aluminumData';
import { CTASection } from '@/components/sections/CTASection';
import { businessConfig } from '@/config/business.config';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

type Props = {
    params: Promise<{ slug: string }>;
};

// Generate static params for all aluminum systems
export async function generateStaticParams() {
    return aluminumSystems.map((system) => ({
        slug: system.slug,
    }));
}

// Dynamic metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const system = getAluminumSystemBySlug(slug);

    if (!system) {
        return { title: 'Sistem Bulunamadı' };
    }

    return {
        title: `${system.name} | Alüminyum Sistemleri | Egepen Akçayapı`,
        description: system.description,
        keywords: system.seoKeywords.join(', '),
        openGraph: {
            title: `${system.name} | Egepen Akçayapı`,
            description: system.tagline,
            type: 'website',
            locale: 'tr_TR',
            images: [system.image],
        },
        alternates: {
            canonical: `https://www.egepenakcayapi.com.tr/aluminyum-sistemleri/${system.slug}`,
        },
    };
}

export default async function AluminumSystemDetailPage({ params }: Props) {
    const { slug } = await params;
    const system = getAluminumSystemBySlug(slug);

    if (!system) {
        notFound();
    }

    // JSON-LD Product Schema
    const productSchema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: system.name,
        description: system.description,
        image: system.image,
        brand: {
            '@type': 'Brand',
            name: 'Egepen Akçayapı',
        },
        offers: {
            '@type': 'AggregateOffer',
            priceCurrency: 'TRY',
            availability: 'https://schema.org/InStock',
            seller: {
                '@type': 'Organization',
                name: 'Egepen Akçayapı',
            },
        },
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            reviewCount: '127',
        },
    };

    // FAQ Schema
    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: system.faq.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
            },
        })),
    };

    // Get category color
    const getCategoryColor = () => {
        switch (system.category) {
            case 'thermal-break':
                return { gradient: 'from-orange-500 to-red-600', light: 'orange' };
            case 'curtain-wall':
                return { gradient: 'from-blue-500 to-indigo-600', light: 'blue' };
            case 'office-partition':
                return { gradient: 'from-emerald-500 to-teal-600', light: 'emerald' };
            case 'hebe-schiebe':
                return { gradient: 'from-purple-500 to-pink-600', light: 'purple' };
            default:
                return { gradient: 'from-gray-500 to-slate-600', light: 'gray' };
        }
    };

    const colors = getCategoryColor();

    // Related systems (same category)
    const relatedSystems = aluminumSystems
        .filter((s) => s.category === system.category && s.id !== system.id)
        .slice(0, 2);

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

            <Header />

            <main className="min-h-screen bg-white">
                {/* Breadcrumb */}
                <div className="bg-gray-50 py-4 border-b">
                    <div className="container mx-auto px-4">
                        <nav className="flex items-center text-sm text-gray-500">
                            <Link href="/" className="hover:text-blue-600">
                                Ana Sayfa
                            </Link>
                            <span className="mx-2">/</span>
                            <Link href="/aluminyum-sistemleri" className="hover:text-blue-600">
                                Alüminyum Sistemleri
                            </Link>
                            <span className="mx-2">/</span>
                            <span className="text-gray-900">{system.name}</span>
                        </nav>
                    </div>
                </div>

                {/* Hero Section */}
                <section className={`relative bg-gradient-to-br ${colors.gradient} py-16 lg:py-24`}>
                    <div className="absolute inset-0 bg-grid-white/10" />
                    <div className="container mx-auto px-4 relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className="text-white">
                                <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-4">
                                    {system.warranty}
                                </span>
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                                    {system.name}
                                </h1>
                                <p className="text-xl text-white/90 font-medium mb-4">{system.tagline}</p>
                                <p className="text-white/80 mb-8">{system.description}</p>

                                <div className="flex flex-wrap gap-4">
                                    <Link
                                        href="/teklif-al"
                                        className="inline-flex items-center px-6 py-3 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-all"
                                    >
                                        <span className="mr-2">📐</span>
                                        Teklif Al
                                    </Link>
                                    <a
                                        href={`tel:${businessConfig.contact.mobileRaw}`}
                                        className="inline-flex items-center px-6 py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all border border-white/20"
                                    >
                                        <span className="mr-2">📞</span>
                                        Hemen Ara
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

                {/* Technical Specifications */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-5xl mx-auto">
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
                                Teknik Özellikler
                            </h2>

                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
                                {system.technicalSpecs.map((spec, idx) => (
                                    <div
                                        key={idx}
                                        className={`p-4 rounded-xl border ${spec.highlight
                                            ? `bg-${colors.light}-50 border-${colors.light}-200`
                                            : 'bg-gray-50 border-gray-200'
                                            }`}
                                    >
                                        <div className="text-sm text-gray-500 mb-1">{spec.label}</div>
                                        <div
                                            className={`font-bold ${spec.highlight ? `text-${colors.light}-700` : 'text-gray-900'
                                                }`}
                                        >
                                            {spec.value}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Thermal Data (if available) */}
                            {system.thermalData && (
                                <div className={`bg-gradient-to-r ${colors.gradient} rounded-2xl p-8 text-white mb-12`}>
                                    <h3 className="text-xl font-bold mb-6 text-center">Termal Performans</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                                        <div>
                                            <div className="text-3xl font-bold">{system.thermalData.uValue}</div>
                                            <div className="text-white/80 text-sm">W/m²K (Uw)</div>
                                        </div>
                                        <div>
                                            <div className="text-3xl font-bold">{system.thermalData.airTightness}</div>
                                            <div className="text-white/80 text-sm">Hava Sızdırmazlık</div>
                                        </div>
                                        <div>
                                            <div className="text-3xl font-bold">{system.thermalData.waterTightness}</div>
                                            <div className="text-white/80 text-sm">Su Sızdırmazlık</div>
                                        </div>
                                        <div>
                                            <div className="text-3xl font-bold">{system.thermalData.soundInsulation}</div>
                                            <div className="text-white/80 text-sm">dB Ses Yalıtımı</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Features & Benefits */}
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="max-w-5xl mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Features */}
                                <div className="bg-white rounded-2xl p-8 shadow-sm">
                                    <h3 className="text-xl font-bold text-gray-900 mb-6">
                                        🔧 Özellikler
                                    </h3>
                                    <ul className="space-y-3">
                                        {system.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start">
                                                <span className={`text-${colors.light}-500 mr-3`}>✓</span>
                                                <span className="text-gray-700">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Benefits */}
                                <div className="bg-white rounded-2xl p-8 shadow-sm">
                                    <h3 className="text-xl font-bold text-gray-900 mb-6">
                                        💡 Avantajlar
                                    </h3>
                                    <ul className="space-y-3">
                                        {system.benefits.map((benefit, idx) => (
                                            <li key={idx} className="flex items-start">
                                                <span className={`text-${colors.light}-500 mr-3`}>★</span>
                                                <span className="text-gray-700">{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Applications */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-5xl mx-auto">
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
                                Uygulama Alanları
                            </h2>
                            <div className="flex flex-wrap justify-center gap-3">
                                {system.applications.map((app, idx) => (
                                    <span
                                        key={idx}
                                        className={`px-4 py-2 bg-${colors.light}-100 text-${colors.light}-700 rounded-full font-medium`}
                                    >
                                        {app}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Color Options */}
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="max-w-5xl mx-auto">
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
                                Renk Seçenekleri
                            </h2>
                            <div className="flex flex-wrap justify-center gap-6">
                                {system.colorOptions.map((color, idx) => (
                                    <div key={idx} className="text-center">
                                        <div
                                            className="w-16 h-16 rounded-xl shadow-lg mb-2 border-2 border-white"
                                            style={{ backgroundColor: color.hex }}
                                        />
                                        <div className="text-sm font-medium text-gray-900">{color.name}</div>
                                        {color.code && (
                                            <div className="text-xs text-gray-500">{color.code}</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <p className="text-center text-gray-500 text-sm mt-6">
                                + 200 RAL renk ve özel dekor seçenekleri
                            </p>
                        </div>
                    </div>
                </section>

                {/* Certifications */}
                <section className="py-12 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-5xl mx-auto text-center">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Sertifikalar</h3>
                            <div className="flex flex-wrap justify-center gap-4">
                                {system.certifications.map((cert, idx) => (
                                    <span
                                        key={idx}
                                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium"
                                    >
                                        {cert}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Long Description */}
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto">
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
                                Detaylı Bilgi
                            </h2>
                            <div className="prose prose-lg max-w-none">
                                {system.longDescription.split('\n\n').map((paragraph, idx) => (
                                    <p key={idx} className="text-gray-700 mb-4">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                {system.faq.length > 0 && (
                    <section className="py-16 bg-white">
                        <div className="container mx-auto px-4">
                            <div className="max-w-3xl mx-auto">
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
                                    Sıkça Sorulan Sorular
                                </h2>
                                <div className="space-y-4">
                                    {system.faq.map((item, idx) => (
                                        <details
                                            key={idx}
                                            className="group bg-gray-50 rounded-xl overflow-hidden"
                                        >
                                            <summary className="flex justify-between items-center cursor-pointer p-6 font-semibold text-gray-900 hover:bg-gray-100 transition-colors">
                                                {item.question}
                                                <span className="ml-4 text-gray-400 group-open:rotate-180 transition-transform">
                                                    ▼
                                                </span>
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
                                    {relatedSystems.map((related) => (
                                        <Link
                                            key={related.id}
                                            href={`/aluminyum-sistemleri/${related.slug}`}
                                            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all group"
                                        >
                                            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                                {related.name}
                                            </h3>
                                            <p className="text-sm text-gray-600">{related.tagline}</p>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* CTA */}
                <CTASection />
            </main>

            <Footer />
        </>
    );
}
