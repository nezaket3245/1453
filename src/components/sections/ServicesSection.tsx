import Link from "next/link";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { Button } from "@/components/ui/Button";
import { products } from "@/lib/data";

/**
 * ServicesSection - Server Component (No "use client")
 * 
 * Performance optimized:
 * - Removed Framer Motion for faster initial render
 * - Uses CSS animations instead of JS-based animations
 * - Above-the-fold section, critical for LCP
 */
export function ServicesSection() {
    return (
        <section className="section bg-white" id="urunler" aria-labelledby="services-title">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div className="max-w-2xl">
                        <span className="text-primary-600 font-bold uppercase tracking-widest text-sm mb-4 block">
                            Profesyonel Çözümler
                        </span>
                        <h2 id="services-title" className="text-4xl md:text-5xl font-black text-neutral-900 leading-tight">
                            Beylikdüzü&apos;nün En Güçlü <br />
                            <span className="text-primary-500">PVC & Cam Balkon</span> Filosu

                        </h2>
                    </div>
                    <Button variant="primary" size="lg" href="/urunler" title="Tüm Ürün Kataloğumuzu İnceleyin">
                        Tüm Kataloğu Gör
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.slice(0, 4).map((product, index) => {
                        return (
                            <div
                                key={product.id}
                                className="group animate-fade-in-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <Link href={`/${product.slug}`} title={`${product.name} - Detaylı Bilgi ve Fiyatlar`} className="block">
                                    <div className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-6 bg-neutral-100 shadow-sm group-hover:shadow-2xl transition-shadow duration-500">
                                        <OptimizedImage
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
                                        <div className="absolute bottom-6 left-6 right-6">
                                            <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                                            <p className="text-white/70 text-sm line-clamp-2 group-hover:text-white transition-colors">
                                                {product.description}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </div>

                {/* Local Keywords Cloud for SEO (Hidden visually but available for crawlers if needed, but better to use it in text) */}
                <div className="mt-20 p-8 rounded-3xl bg-primary-50 border border-primary-100 grid md:grid-cols-3 gap-8">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-primary-600 shadow-sm" aria-hidden="true">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.023 6.023 0 01-2.77.896m5.25-6.388a6.003 6.003 0 00-5.25 3.436m0 0a6.036 6.036 0 00-2.48 0" /></svg>
                        </div>
                        <div>
                            <p className="font-bold text-neutral-900">Legend Serisi</p>
                            <p className="text-xs text-neutral-500">80mm Genişlik & 6 Odacık</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-primary-600 shadow-sm" aria-hidden="true">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
                        </div>
                        <div>
                            <p className="font-bold text-neutral-900">Hızlı Montaj</p>
                            <p className="text-xs text-neutral-500">Kendi Profesyonel Ekibimiz</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-primary-600 shadow-sm" aria-hidden="true">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                        </div>
                        <div>
                            <p className="font-bold text-neutral-900">Yerel Servis</p>
                            <p className="text-xs text-neutral-500">Beylikdüzü & Gürpınar Bölgesi</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
