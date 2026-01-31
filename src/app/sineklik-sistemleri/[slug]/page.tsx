/**
 * Dynamic Detail Page for Sineklik & Panjur Systems
 * Individual product pages with full SEO optimization
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
    sineklikSystems,
    getSystemBySlug,
    getRelatedSystems,
} from '@/lib/sineklikData';
import { CTASection } from '@/components/sections/CTASection';
import { businessConfig } from '@/config/business.config';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

// Generate static params for all systems
export async function generateStaticParams() {
    return sineklikSystems.map((system) => ({
        slug: system.slug,
    }));
}

// Generate metadata for each system page
export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const system = getSystemBySlug(slug);

    if (!system) {
        return {
            title: 'Sistem Bulunamadı',
        };
    }

    return {
        title: `${system.name} | Fiyat ve Özellikler | Beylikdüzü`,
        description: `${system.description} ${system.warranty}. Beylikdüzü ve İstanbul Avrupa Yakası ücretsiz keşif.`,
        keywords: system.seoKeywords.join(', '),
        openGraph: {
            title: `${system.name} | Egepen Akçayapı`,
            description: system.tagline,
            images: [system.image],
            type: 'website',
            locale: 'tr_TR',
        },
        alternates: {
            canonical: `https://www.egepenakcayapi.com.tr/sineklik-sistemleri/${system.slug}`,
        },
    };
}

export default async function SineklikDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const system = getSystemBySlug(slug);

    if (!system) {
        notFound();
    }

    const relatedSystems = getRelatedSystems(system.id, 3);

    // Product Schema
    const productSchema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: system.name,
        description: system.description,
        image: `https://www.egepenakcayapi.com.tr${system.image}`,
        brand: {
            '@type': 'Brand',
            name: system.schema.brand,
        },
        model: system.schema.model,
        offers: {
            '@type': 'Offer',
            priceCurrency: system.schema.offers.priceCurrency,
            availability: system.schema.offers.availability,
            seller: {
                '@type': 'LocalBusiness',
                name: 'Egepen Akçayapı',
                address: {
                    '@type': 'PostalAddress',
                    addressLocality: 'Beylikdüzü',
                    addressRegion: 'İstanbul',
                },
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

    return (
        <>
            {/* JSON-LD Schemas */}
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
                            <Link href="/" className="hover:text-emerald-600">
                                Ana Sayfa
                            </Link>
                            <span className="mx-2">/</span>
                            <Link
                                href="/sineklik-sistemleri"
                                className="hover:text-emerald-600"
                            >
                                Sineklik Sistemleri
                            </Link>
                            <span className="mx-2">/</span>
                            <span className="text-gray-900 font-medium">{system.name}</span>
                        </nav>
                    </div>
                </div>

                {/* Hero Section */}
                <section className="py-12 lg:py-20">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                            {/* Product Image */}
                            <div className="sticky top-24">
                                <div className="relative h-[400px] lg:h-[500px] bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl overflow-hidden shadow-lg">
                                    <Image
                                        src={system.image}
                                        alt={system.name}
                                        fill
                                        className="object-contain p-8"
                                        priority
                                    />
                                    {/* Badges */}
                                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${system.priceRange === 'premium'
                                                ? 'bg-amber-500 text-white'
                                                : system.priceRange === 'orta'
                                                    ? 'bg-blue-500 text-white'
                                                    : 'bg-green-500 text-white'
                                                }`}
                                        >
                                            {system.priceRange === 'premium'
                                                ? 'Premium'
                                                : system.priceRange === 'orta'
                                                    ? 'Orta Segment'
                                                    : 'Ekonomik'}
                                        </span>
                                        {system.category === 'kedi' && (
                                            <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                                                🐱 Pet Screen
                                            </span>
                                        )}
                                    </div>
                                    <div className="absolute bottom-4 right-4">
                                        <span className="px-4 py-2 bg-white/90 text-emerald-700 rounded-xl font-semibold shadow-lg">
                                            {system.warranty}
                                        </span>
                                    </div>
                                </div>

                                {/* Gallery Thumbnails */}
                                {system.gallery.length > 1 && (
                                    <div className="flex gap-3 mt-4">
                                        {system.gallery.slice(0, 4).map((img, idx) => (
                                            <div
                                                key={idx}
                                                className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:ring-2 ring-emerald-500"
                                            >
                                                <Image
                                                    src={img}
                                                    alt={`${system.name} ${idx + 1}`}
                                                    width={80}
                                                    height={80}
                                                    className="object-cover"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Product Info */}
                            <div>
                                <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
                                    {system.category === 'plise'
                                        ? 'Plise Sineklik'
                                        : system.category === 'kedi'
                                            ? 'Kedi Sinekliği'
                                            : system.category === 'surme'
                                                ? 'Sürme Sineklik'
                                                : system.category === 'menteseli'
                                                    ? 'Menteşeli Sineklik'
                                                    : system.category === 'stor'
                                                        ? 'Stor Sineklik'
                                                        : 'Panjur Sistemi'}
                                </span>

                                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                    {system.name}
                                </h1>
                                <p className="text-xl text-emerald-600 font-medium mb-4">
                                    {system.tagline}
                                </p>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    {system.description}
                                </p>

                                {/* Technical Specs */}
                                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                                    <h2 className="text-lg font-bold text-gray-900 mb-4">
                                        📋 Teknik Özellikler
                                    </h2>
                                    <div className="grid grid-cols-2 gap-4">
                                        {system.technicalSpecs.map((spec, idx) => (
                                            <div key={idx} className="flex flex-col">
                                                <span className="text-xs text-gray-500">
                                                    {spec.label}
                                                </span>
                                                <span className="font-semibold text-gray-900">
                                                    {spec.value}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Features */}
                                <div className="mb-6">
                                    <h2 className="text-lg font-bold text-gray-900 mb-4">
                                        ✨ Özellikler
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        {system.features.map((feature, idx) => (
                                            <div
                                                key={idx}
                                                className="flex items-center text-gray-700"
                                            >
                                                <span className="w-5 h-5 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mr-2 text-xs">
                                                    ✓
                                                </span>
                                                {feature}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Color Options */}
                                {system.colorOptions.length > 0 && (
                                    <div className="mb-6">
                                        <h2 className="text-lg font-bold text-gray-900 mb-4">
                                            🎨 Renk Seçenekleri
                                        </h2>
                                        <div className="flex flex-wrap gap-3">
                                            {system.colorOptions.map((color) => (
                                                <div
                                                    key={color.name}
                                                    className="flex items-center bg-gray-50 rounded-lg px-3 py-2"
                                                >
                                                    <div
                                                        className="w-6 h-6 rounded-full border border-gray-200 mr-2"
                                                        style={{
                                                            backgroundColor: color.hex,
                                                        }}
                                                    />
                                                    <span className="text-sm text-gray-700">
                                                        {color.name}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* CTA Buttons */}
                                <div className="flex flex-wrap gap-4">
                                    <Link
                                        href="/teklif-al"
                                        className="inline-flex items-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-all shadow-lg"
                                    >
                                        <span className="mr-2">💰</span>
                                        Fiyat Teklifi Al
                                    </Link>
                                    <a
                                        href={`https://wa.me/${businessConfig.contact.whatsapp}?text=${encodeURIComponent(
                                            `${system.name} hakkında bilgi almak istiyorum`
                                        )}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-all"
                                    >
                                        <span className="mr-2">📱</span>
                                        WhatsApp
                                    </a>
                                    <a
                                        href={`tel:${businessConfig.contact.mobileRaw}`}
                                        className="inline-flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all"
                                    >
                                        <span className="mr-2">📞</span>
                                        Hemen Arayın
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Long Description */}
                <section className="py-12 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                {system.name} Hakkında Detaylı Bilgi
                            </h2>
                            <div className="prose prose-emerald max-w-none">
                                {system.longDescription.split('\n\n').map((paragraph, idx) => (
                                    <p key={idx} className="text-gray-600 mb-4 leading-relaxed">
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Ideal For & Benefits */}
                <section className="py-12">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            {/* Ideal For */}
                            <div className="bg-emerald-50 rounded-2xl p-6">
                                <h3 className="text-lg font-bold text-emerald-800 mb-4">
                                    🎯 Kimler İçin İdeal?
                                </h3>
                                <ul className="space-y-2">
                                    {system.idealFor.map((item, idx) => (
                                        <li
                                            key={idx}
                                            className="flex items-center text-emerald-700"
                                        >
                                            <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Benefits */}
                            <div className="bg-blue-50 rounded-2xl p-6">
                                <h3 className="text-lg font-bold text-blue-800 mb-4">
                                    💪 Avantajları
                                </h3>
                                <ul className="space-y-2">
                                    {system.benefits.map((benefit, idx) => (
                                        <li
                                            key={idx}
                                            className="flex items-center text-blue-700"
                                        >
                                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                                            {benefit}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Mesh Options */}
                {system.meshOptions.length > 0 && (
                    <section className="py-12 bg-gray-50">
                        <div className="container mx-auto px-4">
                            <div className="max-w-4xl mx-auto">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                                    🔬 Tül Seçenekleri
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {system.meshOptions.map((mesh, idx) => (
                                        <div
                                            key={idx}
                                            className="bg-white rounded-xl p-6 shadow-sm"
                                        >
                                            <h4 className="font-bold text-gray-900 mb-1">
                                                {mesh.type}
                                            </h4>
                                            <p className="text-sm text-emerald-600 mb-2">
                                                {mesh.material}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {mesh.description}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* FAQ Section */}
                {system.faq.length > 0 && (
                    <section className="py-12">
                        <div className="container mx-auto px-4">
                            <div className="max-w-3xl mx-auto">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                                    ❓ Sık Sorulan Sorular
                                </h2>
                                <div className="space-y-4">
                                    {system.faq.map((item, idx) => (
                                        <details
                                            key={idx}
                                            className="bg-gray-50 rounded-xl overflow-hidden group"
                                        >
                                            <summary className="px-6 py-4 cursor-pointer font-medium text-gray-900 hover:bg-gray-100 flex justify-between items-center">
                                                {item.question}
                                                <svg
                                                    className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M19 9l-7 7-7-7"
                                                    />
                                                </svg>
                                            </summary>
                                            <div className="px-6 pb-4 text-gray-600">
                                                {item.answer}
                                            </div>
                                        </details>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* Related Systems */}
                <section className="py-12 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                            🔗 İlgili Sistemler
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                            {relatedSystems.map((related) => (
                                <Link
                                    key={related.id}
                                    href={`/sineklik-sistemleri/${related.slug}`}
                                    className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all group"
                                >
                                    <div className="relative h-32 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg mb-4 overflow-hidden">
                                        <Image
                                            src={related.image}
                                            alt={related.name}
                                            fill
                                            className="object-contain p-4 group-hover:scale-105 transition-transform"
                                        />
                                    </div>
                                    <h3 className="font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors">
                                        {related.name}
                                    </h3>
                                    <p className="text-sm text-gray-500">{related.tagline}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <CTASection />
            </main>

            <Footer />
        </>
    );
}
