"use client";

import Link from "next/link";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { products } from "@/lib/data";

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
                        const getDirectLink = (slug: string) => {
                            switch (slug) {
                                case 'pvc-pencere': return '/pvc-sistemleri';
                                case 'cam-balkon': return '/cam-balkon-sistemleri';
                                case 'sineklik': return '/sineklik-sistemleri';
                                case 'dusakabin-sistemleri': return '/dusakabin-sistemleri';
                                default: return `/urunler/${slug}`;
                            }
                        };
                        return (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group"
                            >
                                <Link href={getDirectLink(product.slug)} title={`${product.name} - Detaylı Bilgi ve Fiyatlar`} className="block">
                                    <div className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-6 bg-neutral-100 shadow-sm group-hover:shadow-2xl transition-all duration-500">
                                        <OptimizedImage
                                            src={product.image}
                                            alt={product.name}
                                            fill
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
                            </motion.div>
                        );
                    })}
                </div>

                {/* Local Keywords Cloud for SEO (Hidden visually but available for crawlers if needed, but better to use it in text) */}
                <div className="mt-20 p-8 rounded-3xl bg-primary-50 border border-primary-100 grid md:grid-cols-3 gap-8">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-primary-600 shadow-sm">🏆</div>
                        <div>
                            <p className="font-bold text-neutral-900">Legend Serisi</p>
                            <p className="text-xs text-neutral-500">80mm Genişlik & 6 Odacık</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-primary-600 shadow-sm">⚡</div>
                        <div>
                            <p className="font-bold text-neutral-900">Hızlı Montaj</p>
                            <p className="text-xs text-neutral-500">Kendi Profesyonel Ekibimiz</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-primary-600 shadow-sm">📍</div>
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
