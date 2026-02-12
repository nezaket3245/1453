import { Metadata } from "next";
import Link from "next/link";
import { HeaderOptimized } from '@/components/layout/HeaderOptimized';
import { Footer } from "@/components/layout/Footer";
import { businessConfig } from "@/config/business.config";
import { blogPosts } from "@/lib/blogData";
import { BlogListing } from "@/components/sections/BlogListing";

export const metadata: Metadata = {
title: 'PVC ve Cam Balkon Blog Rehberleri 2026',
  description: 'PVC pencere temizliği, cam balkon trendleri 2026, kış bahçesi dekorasyon fikirleri. Enerji tasarrufu ve sineklik seçimi rehberleri. Uzman ipuçları.',
    keywords: [
        'PVC pencere blog',
        'cam balkon bakımı',
        'pencere seçimi rehberi',
        'enerji tasarrufu pencere',
        'Beylikdüzü PVC ipuçları',
        'PVC pencere temizliği nasıl yapılır?',
        '2026 cam balkon modelleri ve trendleri',
        'Enerji tasarrufu sağlayan cam sistemleri',
        'Sineklik seçerken dikkat edilmesi gerekenler',
        'Kış bahçesi dekorasyon fikirleri',
        'Isı yalıtımı için en iyi cam hangisi?',
        'Sürgülü sistem bakımı nasıl yapılır?',
    ],
    openGraph: {
        title: `Blog | ${businessConfig.name}`,
        description: `PVC pencere ve cam balkon hakkında uzman ipuçları`,
        url: `${businessConfig.siteUrl}/blog`,
    },
    alternates: {
        canonical: `${businessConfig.siteUrl}/blog`,
    },
};

export default function BlogPage() {
    // BreadcrumbList schema for SERP breadcrumbs
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: `${businessConfig.siteUrl}/` },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: `${businessConfig.siteUrl}/blog` },
        ],
    };

    return (
        <>
            {/* BreadcrumbList JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />

            <HeaderOptimized />
            <main id="main-content" className="min-h-screen bg-neutral-50">
                {/* Hero Section */}
                <section className="relative bg-neutral-900 text-white py-20 lg:py-32 overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                            }}
                        />
                    </div>
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-primary-600/20 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-secondary-600/10 rounded-full blur-[100px]" />

                    <div className="container-custom relative z-10 text-center lg:text-left">
                        <nav aria-label="Breadcrumb" className="mb-8 flex justify-center lg:justify-start">
                            <ol className="flex items-center gap-2 text-sm text-white/60 font-bold uppercase tracking-widest">
                                <li>
                                    <Link href="/" className="hover:text-white transition-colors focus:ring-2 focus:ring-white/50 focus:outline-none rounded">
                                        Ana Sayfa
                                    </Link>
                                </li>
                                <li className="text-white/40">/</li>
                                <li className="text-white">Blog</li>
                            </ol>
                        </nav>
                        <div className="max-w-4xl mx-auto lg:mx-0">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-600 text-white text-[10px] font-black uppercase tracking-widest mb-6 border border-white/10 shadow-xl">
                                Bilgi Paylaştıkça Çoğalır
                            </span>
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-[1.1]">
                                Uzmanından <span className="text-primary-500">Rehberler</span> <br className="hidden lg:block" />& Pratik Çözümler
                            </h1>
                            <p className="text-xl md:text-2xl text-neutral-500 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                <strong className="text-white">PVC pencere temizliği</strong> püf noktaları, <strong className="text-white">2026 cam balkon trendleri</strong>,
                                <strong className="text-white"> kış bahçesi dekorasyon fikirleri</strong> ve <strong className="text-white">enerji tasarrufu sağlayan cam sistemleri</strong>
                                hakkında Beylikdüzü&apos;nün en kapsamlı bilgi kaynağına hoş geldiniz.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Interactive Blog Listing */}
                <BlogListing posts={blogPosts} />
            </main>
            <Footer />
        </>
    );
}
