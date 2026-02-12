/**
 * Dynamic Panjur & Kepenk Detail Page
 * SEO: Individual product pages with Schema.org markup
 */

import { Metadata } from 'next';
import Link from 'next/link';
import OptimizedImage from '@/components/ui/OptimizedImage';
import { notFound } from 'next/navigation';
import { panjurSystems, getPanjurSystemBySlug, somfyEcosystem } from '@/lib/panjurData';
import { businessConfig } from '@/config/business.config';
import { HeaderOptimized } from '@/components/layout/HeaderOptimized';
import { Footer } from '@/components/layout/Footer';

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
    return panjurSystems.map((system) => ({
        slug: system.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const system = getPanjurSystemBySlug(slug);

    if (!system) {
        return { title: 'Sistem Bulunamadı' };
    }

    return {
        title: `${system.name} Panjur ve Kepenk`,
        description: `${system.description.slice(0, 120)}. Güvenlik, ısı tasarrufu ve otomasyon.`,
        keywords: [
            ...system.seoKeywords,
            'Otomatik panjur metrekare fiyatları',
            'Motorlu panjur tamiri',
            'Poliüretan dolgulu alüminyum panjur',
            'Dükkan kepenk sistemleri',
            'Akıllı ev uyumlu panjur motoru',
        ].join(', '),
        openGraph: {
            title: `${system.name} | Egepen Akçayapı`,
            description: system.tagline,
            type: 'website',
            locale: 'tr_TR',
        },
        alternates: {
            canonical: `${businessConfig.siteUrl}/panjur-kepenk-sistemleri/${system.slug}`,
        },
    };
}

export default async function PanjurDetailPage({ params }: Props) {
    const { slug } = await params;
    const system = getPanjurSystemBySlug(slug);

    if (!system) {
        notFound();
    }

    // JSON-LD Schema — enhanced Product with URL and category
    const productSchema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: system.name,
        description: system.description,
        image: system.image,
        url: `${businessConfig.siteUrl}/panjur-kepenk-sistemleri/${system.slug}`,
        category: system.category.includes('kepenk') ? 'Kepenk Sistemi' : 'Panjur Sistemi',
        brand: { '@type': 'Brand', name: 'Egepen Akçayapı' },
        offers: {
            '@type': 'AggregateOffer',
            priceCurrency: 'TRY',
            availability: 'https://schema.org/InStock',
        },
    };

    // BreadcrumbList for SERP breadcrumbs
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: `${businessConfig.siteUrl}/` },
            { '@type': 'ListItem', position: 2, name: 'Panjur & Kepenk', item: `${businessConfig.siteUrl}/panjur-kepenk-sistemleri` },
            { '@type': 'ListItem', position: 3, name: system.name, item: `${businessConfig.siteUrl}/panjur-kepenk-sistemleri/${system.slug}` },
        ],
    };

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: system.faq.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
    };

    // Category color
    const getCategoryStyle = () => {
        switch (system.category) {
            case 'panjur-aluminyum':
            case 'panjur-pvc':
                return { gradient: 'from-blue-500 to-indigo-600', accent: 'indigo' };
            case 'kepenk-ticari':
                return { gradient: 'from-gray-700 to-slate-900', accent: 'gray' };
            case 'kepenk-endustriyel':
                return { gradient: 'from-orange-500 to-red-600', accent: 'orange' };
            default:
                return { gradient: 'from-gray-500 to-slate-600', accent: 'gray' };
        }
    };

    const style = getCategoryStyle();

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify([productSchema, breadcrumbSchema, faqSchema]) }}
            />

            <HeaderOptimized />

            <main id="main-content" className="min-h-screen bg-white">
                {/* Breadcrumb */}
                <div className="bg-gray-50 py-4 border-b">
                    <div className="container mx-auto px-4">
                        <nav className="flex items-center text-sm text-gray-500" aria-label="Breadcrumb">
                            <Link href="/" title="Ana Sayfa" className="hover:text-indigo-600 focus:ring-2 focus:ring-indigo-400 focus:outline-none rounded">Ana Sayfa</Link>
                            <span className="mx-2">/</span>
                            <Link href="/panjur-kepenk-sistemleri" title="Panjur ve Kepenk Sistemleri" className="hover:text-indigo-600 focus:ring-2 focus:ring-indigo-400 focus:outline-none rounded">
                                Panjur & Kepenk
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
                                {/* <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm font-medium mb-4">
                                    {system.warranty}
                                </span> */}
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                                    {system.name}
                                </h1>
                                <p className="text-xl text-white/90 font-medium mb-4">{system.tagline}</p>
                                <p className="text-white/80 mb-8">{system.description}</p>
                            </div>

                            <div className="relative h-80 lg:h-[400px]">
                                <OptimizedImage
                                    src={system.image}
                                    alt={`${system.name} - ${system.category.includes('kepenk') ? 'Kepenk Sistemi' : 'Panjur Sistemi'} - Beylikdüzü`}
                                    fill
                                    className="object-contain drop-shadow-2xl"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Energy Efficiency (if available) */}
                {system.energyEfficiency && (
                    <section className="py-12 bg-gradient-to-r from-green-500 to-emerald-600">
                        <div className="container mx-auto px-4">
                            <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6 text-white text-center">
                                <div>
                                    <div className="text-4xl font-bold">%{system.energyEfficiency.summerCooling}</div>
                                    <div className="text-green-100">Yaz Soğutma Tasarrufu</div>
                                </div>
                                <div>
                                    <div className="text-4xl font-bold">%{system.energyEfficiency.winterHeating}</div>
                                    <div className="text-green-100">Kış Isıtma Tasarrufu</div>
                                </div>
                                <div>
                                    <div className="text-4xl font-bold">{system.energyEfficiency.soundReduction} dB</div>
                                    <div className="text-green-100">Ses Azaltma</div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Technical Specs */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-5xl mx-auto">
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
                                Teknik Özellikler
                            </h2>

                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {system.technicalSpecs.map((spec, idx) => (
                                    <div
                                        key={idx}
                                        className={`p-4 rounded-xl border ${spec.highlight
                                            ? 'bg-indigo-50 border-indigo-200'
                                            : 'bg-gray-50 border-gray-200'
                                            }`}
                                    >
                                        <div className="text-sm text-gray-500 mb-1">{spec.label}</div>
                                        <div className={`font-bold ${spec.highlight ? 'text-indigo-700' : 'text-gray-900'}`}>
                                            {spec.value}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Motor Options (if available) */}
                {system.motorOptions && system.motorOptions.length > 0 && (
                    <section className="py-16 bg-gray-50">
                        <div className="container mx-auto px-4">
                            <div className="max-w-5xl mx-auto">
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
                                    Motor Seçenekleri
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {system.motorOptions.map((motor, idx) => (
                                        <div key={idx} className="bg-white rounded-xl p-6 shadow-sm">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h4 className="font-bold text-gray-900">{motor.model}</h4>
                                                    <p className="text-sm text-gray-500">{motor.speed}</p>
                                                </div>
                                                {motor.smartHome && (
                                                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                                                        Akıllı Ev
                                                    </span>
                                                )}
                                            </div>

                                            <div className="mb-4">
                                                <span className="text-2xl font-bold text-indigo-600">{motor.torque}</span>
                                                <span className="text-gray-500 text-sm ml-1">Nm</span>
                                            </div>

                                            <ul className="space-y-1 mb-4">
                                                {motor.features.slice(0, 3).map((feature, fidx) => (
                                                    <li key={fidx} className="text-sm text-gray-600 flex items-center">
                                                        <span className="text-green-500 mr-2">✓</span>
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>

                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Lamel Options (if available) */}
                {system.lamelOptions && system.lamelOptions.length > 0 && (
                    <section className="py-16 bg-white">
                        <div className="container mx-auto px-4">
                            <div className="max-w-5xl mx-auto">
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
                                    Lamel Seçenekleri
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {system.lamelOptions.map((lamel, idx) => (
                                        <div key={idx} className="bg-gray-50 rounded-xl p-6">
                                            <div className="flex justify-between items-start mb-3">
                                                <h4 className="font-bold text-gray-900">{lamel.name}</h4>
                                                {lamel.foamFilled && (
                                                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                                                        Köpük Dolgulu
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-gray-600 mb-4">{lamel.description}</p>
                                            <div className="grid grid-cols-3 gap-2 text-sm">
                                                <div>
                                                    <span className="text-gray-500">Genişlik:</span>
                                                    <span className="font-medium ml-1">{lamel.width}mm</span>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500">Kalınlık:</span>
                                                    <span className="font-medium ml-1">{lamel.thickness}mm</span>
                                                </div>
                                                {lamel.uValue && (
                                                    <div>
                                                        <span className="text-gray-500">U:</span>
                                                        <span className="font-medium text-green-600 ml-1">{lamel.uValue}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Automation Features (if available) */}
                {system.automationFeatures && system.automationFeatures.length > 0 && (
                    <section className="py-16 bg-gradient-to-br from-indigo-50 to-purple-50">
                        <div className="container mx-auto px-4">
                            <div className="max-w-5xl mx-auto">
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
                                    Otomasyon Özellikleri
                                </h2>

                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                    {system.automationFeatures.map((feature, idx) => (
                                        <div
                                            key={idx}
                                            className="bg-white rounded-xl p-4 text-center shadow-sm"
                                        >
                                            <div className="text-2xl mb-2">
                                                {idx === 0 ? '🌅' : idx === 1 ? '🌡️' : idx === 2 ? '✈️' : idx === 3 ? '🏠' : '📱'}
                                            </div>
                                            <p className="text-sm text-gray-700">{feature}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Features & Benefits */}
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-white rounded-2xl p-8 shadow-sm">
                                <h3 className="text-xl font-bold text-gray-900 mb-6">Teknik Özellikler</h3>
                                <ul className="space-y-3">
                                    {system.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start">
                                            <span className="text-indigo-500 mr-3">✓</span>
                                            <span className="text-gray-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="bg-white rounded-2xl p-8 shadow-sm">
                                <h3 className="text-xl font-bold text-gray-900 mb-6">Avantajlar</h3>
                                <ul className="space-y-3">
                                    {system.benefits.map((benefit, idx) => (
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

                {/* Long Description */}
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto">
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
                                Detaylı Bilgi
                            </h2>
                            <div className="prose prose-lg max-w-none">
                                {system.longDescription.split('\n\n').map((para, idx) => (
                                    <p key={idx} className="text-gray-700 mb-4">{para}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                {system.faq.length > 0 && (
                    <section className="py-16 bg-gray-50">
                        <div className="container mx-auto px-4">
                            <div className="max-w-3xl mx-auto">
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
                                    Sıkça Sorulan Sorular
                                </h2>
                                <div className="space-y-4">
                                    {system.faq.map((item, idx) => (
                                        <details key={idx} className="group bg-white rounded-xl overflow-hidden shadow-sm">
                                            <summary className="flex justify-between items-center cursor-pointer p-6 font-semibold text-gray-900 hover:bg-gray-50">
                                                {item.question}
                                                <span className="ml-4 text-gray-500 group-open:rotate-180 transition-transform">▼</span>
                                            </summary>
                                            <div className="px-6 pb-6 text-gray-700">{item.answer}</div>
                                        </details>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                )}

            </main>

            <Footer />
        </>
    );
}
