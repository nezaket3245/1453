import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { businessConfig } from "@/config/business.config";
import { blogPosts } from "@/lib/blogData";
import { BlogListing } from "@/components/sections/BlogListing";

export const metadata: Metadata = {
    title: `Blog | PVC Pencere, Cam Balkon İpuçları | ${businessConfig.name}`,
    description: `${businessConfig.brand} PVC pencere seçimi, cam balkon bakımı, enerji tasarrufu ve ev dekorasyonu hakkında uzman yazıları. Beylikdüzü Egepen yetkili bayisi.`,
    keywords: [
        "PVC pencere blog",
        "cam balkon bakımı",
        "pencere seçimi rehberi",
        "enerji tasarrufu pencere",
        "Beylikdüzü PVC ipuçları",
    ],
    openGraph: {
        title: `Blog | ${businessConfig.name}`,
        description: `PVC pencere ve cam balkon hakkında uzman ipuçları`,
        url: "https://egepenakcayapi.com.tr/blog",
    },
    alternates: {
        canonical: "https://egepenakcayapi.com.tr/blog",
    },
};

export default function BlogPage() {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-neutral-50">
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
                            <ol className="flex items-center gap-2 text-sm text-white/40 font-bold uppercase tracking-widest">
                                <li>
                                    <Link href="/" className="hover:text-white transition-colors">
                                        Ana Sayfa
                                    </Link>
                                </li>
                                <li className="text-white/20">/</li>
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
                            <p className="text-xl md:text-2xl text-neutral-400 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                PVC pencere seçimi, cam balkon bakımı ve enerji tasarrufu
                                hakkında Beylikdüzü&apos;nün en kapsamlı bilgi kaynağına hoş geldiniz.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Interactive Blog Listing */}
                <BlogListing posts={blogPosts} />

                {/* Newsletter & WhatsApp Support */}
                <section className="py-24 bg-white relative overflow-hidden">
                    <div className="container-custom relative z-10">
                        <div className="bg-neutral-900 rounded-[3rem] p-8 md:p-16 lg:p-20 text-center relative overflow-hidden border border-white/5">
                            {/* Inner Decoration */}
                            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.1),transparent_50%)]" />

                            <div className="relative z-10 max-w-3xl mx-auto">
                                <span className="text-primary-500 font-black text-xs uppercase tracking-[0.3em] mb-6 block">
                                    Hızlı Destek & Bilgilendirme
                                </span>
                                <h2 className="text-3xl md:text-5xl font-black text-white mb-8 leading-tight">
                                    Aklınıza Takılan Soruları <br /> <span className="text-primary-400">WhatsApp&apos;tan</span> Sorun
                                </h2>
                                <p className="text-xl text-neutral-400 mb-10 leading-relaxed">
                                    Yazılarımızda bulamadığınız teknik detaylar veya fiyatlandırma bilgisi için
                                    uzman ekibimiz bir mesaj uzağınızda.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-5 justify-center">
                                    <Link
                                        href={`https://wa.me/${businessConfig.contact.whatsapp}?text=Merhaba, blog yazınız hakkında bir sorum olacaktı.`}
                                        className="inline-flex items-center justify-center gap-3 px-10 h-16 bg-primary-600 text-white font-black rounded-full hover:bg-primary-700 transition-all shadow-2xl shadow-primary-600/40"
                                    >
                                        WhatsApp ile Yazın
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
