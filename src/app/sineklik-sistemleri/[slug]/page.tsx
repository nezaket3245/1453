/**
 * Dynamic Detail Page for Sineklik & Panjur Systems
 * Individual product pages with full SEO optimization
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
    sineklikSystems,
    getSystemBySlug,
    getRelatedSystems,
} from '@/lib/sineklikData';
import { businessConfig } from '@/config/business.config';
import { HeaderOptimized } from '@/components/layout/HeaderOptimized';
import { Footer } from '@/components/layout/Footer';
import OptimizedImage from '@/components/ui/OptimizedImage';

// Generate static params for all systems
export async function generateStaticParams() {
    return sineklikSystems.map((system) => ({
        slug: system.slug,
    }));
}

// Generate SEO-optimized metadata for each system page
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

    const categoryLabel = system.category === 'plise' ? 'Pileli Sineklik' : system.category === 'kedi' ? 'Kedi Sinekliği' : system.category === 'surme' ? 'Sürme Sineklik' : system.category === 'menteseli' ? 'Menteşeli Sineklik' : 'Stor Sineklik';
    const title = `${system.name} | ${categoryLabel} Fiyatı | Beylikdüzü`;
    const desc = `${system.name}: ${categoryLabel} fiyatları ve özellikleri. ${system.warranty}. Özel ölçü imalat ve hızlı montaj ile Beylikdüzü ücretsiz keşif.`;

    return {
        title,
        description: desc.slice(0, 155),
        keywords: [
            ...system.seoKeywords,
        ].join(', '),
        openGraph: {
            title: `${system.name} | Sineklik Fiyatları`,
            description: system.tagline,
            images: [{ url: system.image, width: 800, height: 600, alt: `${system.name} - ${categoryLabel} Uygulaması` }],
            type: 'website',
            locale: 'tr_TR',
        },
        alternates: {
            canonical: `${businessConfig.siteUrl}/sineklik-sistemleri/${system.slug}`,
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

    // Product Schema — enhanced with url and category
    const productSchema = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: system.name,
        description: system.description,
        image: `${businessConfig.siteUrl}${system.image}`,
        url: `${businessConfig.siteUrl}/sineklik-sistemleri/${system.slug}`,
        category: system.category === 'plise' ? 'Pileli Sineklik' : system.category === 'kedi' ? 'Kedi Sinekliği' : system.category === 'surme' ? 'Sürme Sineklik' : system.category === 'menteseli' ? 'Menteşeli Sineklik' : 'Stor Sineklik',
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

    // BreadcrumbList schema for sub-page
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: `${businessConfig.siteUrl}` },
            { '@type': 'ListItem', position: 2, name: 'Sineklik Sistemleri', item: `${businessConfig.siteUrl}/sineklik-sistemleri` },
            { '@type': 'ListItem', position: 3, name: system.name, item: `${businessConfig.siteUrl}/sineklik-sistemleri/${system.slug}` },
        ],
    };

    return (
        <>
            {/* JSON-LD Schemas: Product + FAQ + Breadcrumb */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify([productSchema, faqSchema, breadcrumbSchema]) }}
            />

            <HeaderOptimized />

            <main id="main-content" className="min-h-screen bg-white">
                {/* Breadcrumb */}
                <div className="bg-gray-50 py-4 border-b">
                    <div className="container mx-auto px-4">
                        <nav className="flex items-center text-sm text-gray-500" aria-label="Breadcrumb">
                            <Link href="/" title="Ana Sayfa" className="hover:text-emerald-600">
                                Ana Sayfa
                            </Link>
                            <span className="mx-2">/</span>
                            <Link
                                href="/sineklik-sistemleri"
                                title="Sineklik Sistemleri"
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
                <section className="py-10 lg:py-16">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                            {/* Product Image */}
                            <div>
                                <div className="relative h-[350px] lg:h-[450px] bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl overflow-hidden shadow-md">
                                    <OptimizedImage
                                        src={system.image}
                                        alt={`${system.name} - ${system.category === 'plise' ? 'Pileli' : system.category === 'kedi' ? 'Kedi Sinekliği' : system.category === 'surme' ? 'Sürme' : system.category === 'menteseli' ? 'Menteşeli' : 'Stor'} Sineklik Uygulaması`}
                                        fill
                                        className="object-contain p-8"
                                        priority
                                    />
                                    {/* Badges */}
                                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                                        <span
                                            className="px-3 py-1 rounded-full text-sm font-medium bg-emerald-500 text-white"
                                        >
                                            Fiyat İçin Arayın
                                        </span>
                                        {system.category === 'kedi' && (
                                            <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286z" /></svg>
                                                Pet Screen
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
                                                <OptimizedImage
                                                    src={img}
                                                    alt={`${system.name} detay görünüm ${idx + 1}`}
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
                                    {system.description} Özel ölçü imalat ve hızlı montaj için bize ulaşın.
                                </p>

                                {/* Technical Specs */}
                                <div className="bg-gray-50 rounded-xl p-6 mb-6">
                                    <h2 className="text-lg font-bold text-gray-900 mb-4">
                                        Teknik Özellikler
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
                                        Özellikler
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
                                            Profil Renkleri
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

                            </div>
                        </div>
                    </div>
                </section>

                {/* Long Description */}
                <section className="py-10 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">
                                {system.name} Detayları
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
                <section className="py-10">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                            {/* Ideal For */}
                            <div className="bg-emerald-50 rounded-2xl p-6">
                                <h3 className="text-lg font-bold text-emerald-800 mb-4 flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" /></svg>
                                    Kimler İçin İdeal?
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
                                <h3 className="text-lg font-bold text-blue-800 mb-4 flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>
                                    Avantajları
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
                    <section className="py-10 bg-gray-50">
                        <div className="container mx-auto px-4">
                            <div className="max-w-4xl mx-auto">
                                <h2 className="text-xl font-bold text-gray-900 mb-5 text-center">
                                    Tül Seçenekleri
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
                    <section className="py-10">
                        <div className="container mx-auto px-4">
                            <div className="max-w-3xl mx-auto">
                                <h2 className="text-xl font-bold text-gray-900 mb-5 text-center">
                                    Sık Sorulan Sorular
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
                                                    className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform"
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
                <section className="py-10 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <h2 className="text-xl font-bold text-gray-900 mb-5 text-center">
                            İlgili Sineklik Sistemleri
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                            {relatedSystems.map((related) => (
                                <Link
                                    key={related.id}
                                    href={`/sineklik-sistemleri/${related.slug}`}
                                    className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow group focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                                    aria-label={`${related.name} detaylarına git`}
                                >
                                    <div className="relative h-32 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg mb-4 overflow-hidden">
                                        <OptimizedImage
                                            src={related.image}
                                            alt={`${related.name} - Sineklik Uygulaması`}
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

            </main>

            <Footer />
        </>
    );
}
