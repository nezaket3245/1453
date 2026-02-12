import Link from "next/link";
import { HeaderOptimized } from '@/components/layout/HeaderOptimized';
import { Footer } from "@/components/layout/Footer";

/**
 * 404 Not Found Page
 * 
 * User-friendly 404 page with helpful navigation options.
 * Includes quick links to main sections and contact info.
 */
export default function NotFound() {
    return (
        <>
            <HeaderOptimized />
            <main id="main-content" className="min-h-[70vh] flex items-center justify-center bg-gradient-to-b from-neutral-50 to-white">
                <div className="container-custom py-20">
                    <div className="max-w-2xl mx-auto text-center">
                        {/* 404 Illustration */}
                        <div className="mb-8">
                            <div className="relative inline-block">
                                <span className="text-[150px] md:text-[200px] font-black text-neutral-100 leading-none">
                                    404
                                </span>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-6xl" aria-hidden="true">🔍</div>
                                </div>
                            </div>
                        </div>

                        {/* Message */}
                        <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                            Sayfa Bulunamadı
                        </h1>
                        <p className="text-lg text-neutral-600 mb-8 max-w-lg mx-auto">
                            Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir.
                            Aşağıdaki bağlantılardan devam edebilirsiniz.
                        </p>

                        {/* Quick Links */}
                        <div className="flex flex-wrap justify-center gap-4 mb-12">
                            <Link
                                href="/"
                                title="Egepen Akçayapı Ana Sayfa"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" aria-hidden="true" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                Ana Sayfa
                            </Link>
                            <Link
                                href="/urunler"
                                title="Tüm Ürünleri Görüntüle"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-neutral-700 font-bold rounded-xl border border-neutral-200 hover:border-primary-500 hover:text-primary-600 transition-colors"
                            >
                                Ürünler
                            </Link>
                            <Link
                                href="/iletisim"
                                title="Bize Ulaşın"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-neutral-700 font-bold rounded-xl border border-neutral-200 hover:border-primary-500 hover:text-primary-600 transition-colors"
                            >
                                İletişim
                            </Link>
                        </div>

                        {/* Popular Pages */}
                        <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-100">
                            <h2 className="text-sm font-bold text-neutral-500 uppercase tracking-wider mb-4">
                                Popüler Sayfalar
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[
                                    { label: "PVC Pencere", href: "/pvc-sistemleri", title: "Egepen PVC Pencere Sistemleri" },
                                    { label: "Cam Balkon", href: "/cam-balkon-sistemleri", title: "Isıcamlı Cam Balkon Sistemleri" },
                                    { label: "Sineklik", href: "/sineklik-sistemleri", title: "Sineklik Sistemleri" },
                                    { label: "Panjur", href: "/panjur-kepenk-sistemleri", title: "Panjur ve Kepenk Sistemleri" },
                                    { label: "Duşakabin", href: "/dusakabin-sistemleri", title: "Premium Cam Duşakabin" },
                                    { label: "Projeler", href: "/projeler", title: "Tamamlanan Projeler" },
                                    { label: "Blog", href: "/blog", title: "Blog Yazıları" },
                                    { label: "İletişim", href: "/iletisim", title: "Bize Ulaşın" },
                                ].map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        title={link.title}
                                        className="text-neutral-600 hover:text-primary-600 transition-colors text-sm font-medium"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Contact */}
                        <div className="mt-8 pt-8 border-t border-neutral-100">
                            <p className="text-neutral-500 mb-2">Yardıma mı ihtiyacınız var?</p>
                            <Link
                                href="/iletisim"
                                title="Bize Ulaşın"
                                className="inline-flex items-center gap-2 text-primary-600 font-bold hover:text-primary-700 transition-colors"
                            >
                                İletişim sayfamızdan bize ulaşın
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
