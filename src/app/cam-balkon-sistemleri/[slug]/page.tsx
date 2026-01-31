import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { businessConfig } from '@/config/business.config';
import { getSystemBySlug, glassSystems, getRelatedSystems } from '@/lib/camBalkonData';
import { WhatsAppCTA } from '@/components/ui/WhatsAppCTA';

interface PageProps {
    params: Promise<{ slug: string }>;
}

/**
 * Generate Dynamic Metadata for each Glass System
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const system = getSystemBySlug(slug);

    if (!system) return { title: 'Sistem Bulunamadı' };

    return {
        title: `${system.name} | Cam Balkon Çözümleri | ${businessConfig.name}`,
        description: system.description,
        keywords: system.seoKeywords,
        openGraph: {
            title: system.name,
            description: system.description,
            images: [{ url: system.image }],
            url: `https://egepenakcayapi.com.tr/cam-balkon-sistemleri/${system.slug}`,
        },
        alternates: {
            canonical: `https://egepenakcayapi.com.tr/cam-balkon-sistemleri/${system.slug}`,
        },
    };
}

/**
 * Static paths for all glass systems
 */
export async function generateStaticParams() {
    return glassSystems.map((s) => ({ slug: s.slug }));
}

export default async function GlassSystemDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const system = getSystemBySlug(slug);

    if (!system) notFound();

    const related = getRelatedSystems(system.id);

    // Schema.org implementation
    const productSchema = {
        '@context': 'https://schema.org/',
        '@type': 'Product',
        'name': system.name,
        'image': `https://egepenakcayapi.com.tr${system.image}`,
        'description': system.description,
        'brand': {
            '@type': 'Brand',
            'name': system.category === 'isicamli' ? 'Tiara / Twin' : 'Akçayapı'
        },
        'offers': {
            '@type': 'AggregateOffer',
            'priceCurrency': system.schema.offers.priceCurrency,
            'availability': system.schema.offers.availability,
            'lowPrice': system.priceRange === 'premium' ? '5000' : '3000',
            'highPrice': system.priceRange === 'premium' ? '15000' : '8000',
            'offerCount': '5'
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
            />
            <Header />
            <main id="main-content" className="min-h-screen bg-white">
                {/* Hero / Header Section */}
                <section className="bg-neutral-50 border-b border-neutral-100 pt-32 pb-16 lg:pt-40 lg:pb-24">
                    <div className="container-custom">
                        <nav aria-label="Breadcrumb" className="mb-10 animate-fade-in">
                            <ol className="flex items-center gap-2 text-sm text-neutral-500 font-medium">
                                <li><Link href="/" title="Ana Sayfa" className="hover:text-primary-600 transition-colors">Ana Sayfa</Link></li>
                                <li>
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" aria-hidden="true" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </li>
                                <li><Link href="/cam-balkon-sistemleri" title="Cam Balkon Sistemleri" className="hover:text-primary-600 transition-colors">Cam Balkon</Link></li>
                                <li>
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" aria-hidden="true" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </li>
                                <li className="text-neutral-900">{system.name}</li>
                            </ol>
                        </nav>

                        <div className="grid lg:grid-cols-2 gap-16 items-start">
                            {/* Product Images */}
                            <div className="space-y-6">
                                <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border border-neutral-200 bg-black group">
                                    {system.videoUrl ? (
                                        <iframe
                                            src={system.videoUrl}
                                            title={system.name}
                                            className="absolute inset-0 w-full h-full"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowFullScreen
                                        />
                                    ) : (
                                        <>
                                            <Image
                                                src={system.image}
                                                alt={system.name}
                                                fill
                                                className="object-cover"
                                                priority
                                            />
                                            <div className="absolute top-6 left-6 flex flex-col gap-2">
                                                <span className="px-4 py-2 bg-neutral-900/80 backdrop-blur-md text-white text-xs font-bold rounded-full uppercase tracking-widest border border-white/10">
                                                    {system.category === 'isicamli' ? 'Isı Yalıtım Teknolojisi' : 'Premium Sistem'}
                                                </span>
                                            </div>
                                        </>
                                    )}
                                </div>
                                <div className="grid grid-cols-3 gap-6">
                                    {system.gallery.map((img, idx) => (
                                        <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden border border-neutral-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                                            <Image src={img} alt={`${system.name} detay ${idx + 1}`} fill className="object-cover" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Product Info */}
                            <div className="lg:sticky lg:top-32">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <svg key={s} className="w-5 h-5 text-amber-500 fill-current" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <span className="text-sm font-bold text-neutral-500 uppercase tracking-widest">Yüksek Müşteri Memnuniyeti</span>
                                </div>

                                <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6 leading-tight">
                                    {system.name}
                                </h1>
                                <p className="text-xl text-primary-600 font-medium mb-8">
                                    {system.tagline}
                                </p>
                                <p className="text-lg text-neutral-600 mb-10 leading-relaxed">
                                    {system.longDescription}
                                </p>

                                <div className="grid grid-cols-2 gap-4 mb-12">
                                    <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm">
                                        <p className="text-xs font-bold text-neutral-400 uppercase mb-2">Garanti</p>
                                        <p className="text-lg font-bold text-neutral-900">{system.warranty}</p>
                                    </div>
                                    <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm">
                                        <p className="text-xs font-bold text-neutral-400 uppercase mb-2">Fiyat Segmenti</p>
                                        <p className="text-lg font-bold text-neutral-900 capitalize">{system.priceRange}</p>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link href="/teklif-al" className="btn btn-primary btn-lg flex-1">
                                        Ücretsiz Ölçüm Randevusu
                                    </Link>
                                    <a
                                        href={`https://wa.me/${businessConfig.contact.whatsapp}?text=${encodeURIComponent(`Merhaba, ${system.name} için fiyat teklifi almak istiyorum.`)}`}
                                        className="btn btn-outline btn-lg flex-1"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        WhatsApp’tan Sor
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Technical Specs Deep Dive */}
                <section className="section bg-white">
                    <div className="container-custom">
                        <div className="grid lg:grid-cols-3 gap-16">
                            {/* Detailed Specs Card */}
                            <div className="lg:col-span-1">
                                <div className="bg-neutral-900 rounded-[2rem] p-8 lg:p-10 text-white sticky top-32 shadow-2xl">
                                    <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                                        <svg className="w-6 h-6 text-primary-500" fill="none" viewBox="0 0 24 24" aria-hidden="true" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                        Teknik Veriler
                                    </h3>
                                    <div className="space-y-6">
                                        {system.technicalSpecs.map((spec, i) => (
                                            <div key={i} className="flex justify-between items-center py-4 border-b border-white/10 last:border-0">
                                                <span className="text-neutral-400 font-medium">{spec.label}</span>
                                                <span className="font-bold text-white">{spec.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-10 pt-10 border-t border-white/10">
                                        <div className="flex items-center gap-4 p-5 bg-white/5 rounded-2xl border border-white/10">
                                            <div className="text-3xl">🛡️</div>
                                            <div>
                                                <p className="font-bold text-white">Full Güvenlik</p>
                                                <p className="text-xs text-neutral-400">Şişecam Temperli Cam</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Features list */}
                            <div className="lg:col-span-2">
                                <h2 className="text-3xl font-bold text-neutral-900 mb-10 border-b-2 border-neutral-100 pb-6 uppercase tracking-tight">Kullanılan Teknolojiler & Özellikler</h2>
                                <div className="grid md:grid-cols-2 gap-8 mb-16">
                                    {system.features.map((feature, i) => (
                                        <div key={i} className="flex gap-5 p-6 rounded-2xl bg-neutral-50 hover:bg-white hover:shadow-xl transition-all border border-neutral-100 group">
                                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-colors font-bold">
                                                {i + 1}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-neutral-900 mb-2">{feature}</h4>
                                                <p className="text-sm text-neutral-500 leading-relaxed">Sistem performansını artıran özel mühendislik çözümü.</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <h2 className="text-3xl font-bold text-neutral-900 mb-10 border-b-2 border-neutral-100 pb-6 uppercase tracking-tight">Temel Avantajlar</h2>
                                <div className="space-y-6 mb-16">
                                    {system.benefits.map((benefit, i) => (
                                        <div key={i} className="flex gap-4 items-center p-6 bg-green-50 rounded-2xl border border-green-100">
                                            <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg shadow-green-200">
                                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" aria-hidden="true" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <p className="text-green-900 font-bold text-lg">{benefit}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="p-10 rounded-[2.5rem] bg-neutral-900 text-white relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/20 blur-[100px]" />
                                    <h3 className="text-2xl font-bold mb-4 relative z-10">Kullanım Alanları</h3>
                                    <div className="flex flex-wrap gap-3 relative z-10">
                                        {system.idealFor.map((item, i) => (
                                            <span key={i} className="px-5 py-2 rounded-full bg-white/10 border border-white/20 text-neutral-300 text-sm font-medium">
                                                # {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Glass & Color Options for this system */}
                <section className="section bg-neutral-50">
                    <div className="container-custom">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Sistemi Kişiselleştirin</h2>
                            <p className="text-neutral-600">Projenize en uygun cam tipini ve dış cephenizle uyumlu profil rengini seçin.</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12">
                            {/* Glass types for this system */}
                            <div className="bg-white p-8 lg:p-12 rounded-[2.5rem] shadow-xl border border-neutral-200">
                                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                                    <span className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
                                        🪟
                                    </span>
                                    Uyumlu Cam Seçenekleri
                                </h3>
                                <div className="space-y-6">
                                    {system.glassOptions.map((glass, i) => (
                                        <div key={i} className="flex justify-between items-center p-5 rounded-2xl border border-neutral-100 bg-neutral-50 group hover:border-primary-300 transition-colors">
                                            <div>
                                                <p className="font-bold text-neutral-900">{glass.type}</p>
                                                <p className="text-sm text-neutral-500">{glass.description}</p>
                                            </div>
                                            <span className="px-3 py-1 bg-white rounded-lg text-primary-600 font-bold text-xs shadow-sm">
                                                {glass.thickness}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Color options for this system */}
                            <div className="bg-white p-8 lg:p-12 rounded-[2.5rem] shadow-xl border border-neutral-200 text-center">
                                <h3 className="text-2xl font-bold mb-4">Profil Renkleri</h3>
                                <p className="text-neutral-500 mb-10 italic">Popüler seçimlere göz atın, binlerce RAL seçeneği mevcuttur.</p>
                                <div className="grid grid-cols-4 gap-6">
                                    {system.colorOptions.map((color) => (
                                        <div key={color.name} className="flex flex-col items-center gap-3 group">
                                            <div
                                                className="w-full aspect-square rounded-2xl shadow-lg border border-neutral-200 group-hover:scale-110 transition-transform"
                                                style={{ backgroundColor: color.hex }}
                                            />
                                            <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-tighter">{color.name}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-12 p-6 rounded-2xl bg-neutral-900 text-white text-sm font-bold animate-pulse-glow">
                                    Özel Proje Renkleri İçin Katalog İsteyin
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ for this specific system */}
                <section className="section bg-white">
                    <div className="container-custom">
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-3xl font-bold text-neutral-900 mb-10 text-center">Teknik Soru-Cevap</h2>
                            <div className="space-y-4">
                                {system.faq.map((item, i) => (
                                    <details key={i} className="group border border-neutral-200 rounded-2xl overflow-hidden hover:border-primary-300 transition-colors bg-neutral-50">
                                        <summary className="flex items-center justify-between p-6 cursor-pointer list-none bg-white hover:bg-neutral-50 font-bold text-neutral-900 group-open:bg-neutral-50 transition-colors">
                                            <span>{item.question}</span>
                                            <span className="flex-shrink-0 ml-4 w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center group-open:rotate-180 transition-transform duration-300">
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" aria-hidden="true" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </span>
                                        </summary>
                                        <div className="p-8 pt-2 text-neutral-700 leading-relaxed border-t border-neutral-200">
                                            {item.answer}
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Related Systems / Alternatives */}
                <section className="section bg-neutral-50 mb-[-5rem]">
                    <div className="container-custom">
                        <h2 className="text-3xl font-bold text-neutral-900 mb-12">Alternatif Çözümler</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {related.map((item) => (
                                <Link key={item.id} href={`/cam-balkon-sistemleri/${item.slug}`} className="group bg-white rounded-3xl overflow-hidden shadow-lg border border-neutral-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                                    <div className="relative aspect-video">
                                        <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        <div className="absolute bottom-4 left-4 right-4 text-white">
                                            <h3 className="text-xl font-bold leading-tight">{item.name}</h3>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <p className="text-sm text-neutral-600 line-clamp-2 mb-6">{item.description}</p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-bold text-primary-600 uppercase tracking-widest">Detaylı İncele</span>
                                            <svg className="w-5 h-5 text-primary-600 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" aria-hidden="true" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <WhatsAppCTA systemName={system.name} />
            <Footer />
        </>
    );
}
