import { Metadata } from "next";
import Link from "next/link";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { businessConfig } from "@/config/business.config";
import { blogPosts, blogCategories, formatDate } from "@/lib/blogData";

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
                <section className="relative bg-gradient-to-br from-primary-800 to-primary-900 text-white py-16 lg:py-24 overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                            }}
                        />
                    </div>
                    <div className="container-custom relative z-10">
                        <nav aria-label="Breadcrumb" className="mb-6">
                            <ol className="flex items-center gap-2 text-sm text-white/60">
                                <li>
                                    <Link href="/" className="hover:text-white transition-colors">
                                        Ana Sayfa
                                    </Link>
                                </li>
                                <li>/</li>
                                <li className="text-white">Blog</li>
                            </ol>
                        </nav>
                        <div className="max-w-3xl">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
                                Blog <span className="text-secondary-400">&</span> İpuçları
                            </h1>
                            <p className="text-xl text-white/80 leading-relaxed">
                                PVC pencere seçimi, cam balkon bakımı, enerji tasarrufu ve ev dekorasyonu
                                hakkında uzman yazılarımız. Evinizdeki konforunuzu artıracak pratik bilgiler.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Categories */}
                <section className="py-8 bg-white border-b border-neutral-100 sticky top-[72px] z-30">
                    <div className="container-custom">
                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                            {blogCategories.map((category) => (
                                <button
                                    key={category.id}
                                    className="flex-shrink-0 px-5 py-2.5 rounded-full bg-neutral-100 hover:bg-primary-100 hover:text-primary-700 font-medium text-sm transition-colors flex items-center gap-2"
                                >
                                    <span>{category.icon}</span>
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Featured Post */}
                <section className="section">
                    <div className="container-custom">
                        <div className="mb-12">
                            <span className="text-primary-600 font-bold uppercase tracking-widest text-sm">
                                Öne Çıkan Yazı
                            </span>
                        </div>
                        <article className="grid lg:grid-cols-2 gap-8 items-center bg-white rounded-3xl overflow-hidden shadow-lg border border-neutral-100">
                            <div className="relative aspect-[4/3] lg:aspect-square">
                                <OptimizedImage
                                    src={blogPosts[0].image}
                                    alt={blogPosts[0].title}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                            <div className="p-8 lg:p-12">
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="px-3 py-1 bg-primary-50 text-primary-600 rounded-full text-sm font-medium">
                                        {blogCategories.find((c) => c.id === blogPosts[0].category)?.name}
                                    </span>
                                    <span className="text-neutral-400 text-sm">
                                        {formatDate(blogPosts[0].date)}
                                    </span>
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4 leading-tight">
                                    {blogPosts[0].title}
                                </h2>
                                <p className="text-neutral-600 mb-6 leading-relaxed">
                                    {blogPosts[0].excerpt}
                                </p>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold">
                                            A
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-neutral-900">
                                                {blogPosts[0].author}
                                            </p>
                                            <p className="text-xs text-neutral-400">
                                                {blogPosts[0].readTime} okuma
                                            </p>
                                        </div>
                                    </div>
                                    <Link
                                        href={`/blog/${blogPosts[0].slug}`}
                                        className="inline-flex items-center gap-2 text-primary-600 font-bold hover:gap-3 transition-all"
                                    >
                                        Devamını Oku
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </article>
                    </div>
                </section>

                {/* All Posts Grid */}
                <section className="section bg-neutral-50 pt-0">
                    <div className="container-custom">
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold text-neutral-900">Tüm Yazılar</h2>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogPosts.slice(1).map((post) => (
                                <article
                                    key={post.id}
                                    className="group bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                                >
                                    <Link href={`/blog/${post.slug}`}>
                                        <div className="relative aspect-video overflow-hidden">
                                            <OptimizedImage
                                                src={post.image}
                                                alt={post.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute top-4 left-4">
                                                <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-neutral-700 rounded-full text-xs font-medium">
                                                    {blogCategories.find((c) => c.id === post.category)?.name}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <div className="flex items-center gap-3 text-sm text-neutral-400 mb-3">
                                                <span>{formatDate(post.date)}</span>
                                                <span>•</span>
                                                <span>{post.readTime}</span>
                                            </div>
                                            <h3 className="text-lg font-bold text-neutral-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors">
                                                {post.title}
                                            </h3>
                                            <p className="text-neutral-600 text-sm line-clamp-2 mb-4">
                                                {post.excerpt}
                                            </p>
                                            <div className="flex flex-wrap gap-2">
                                                {post.tags.slice(0, 3).map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="px-2 py-1 bg-neutral-100 text-neutral-500 rounded text-xs"
                                                    >
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </Link>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Newsletter CTA */}
                <section className="py-16 bg-primary-600 text-white">
                    <div className="container-custom text-center">
                        <h2 className="text-3xl font-bold mb-4">
                            Yeni Yazılardan Haberdar Olun
                        </h2>
                        <p className="text-white/80 mb-8 max-w-xl mx-auto">
                            PVC pencere, cam balkon ve ev bakımı hakkında pratik ipuçlarını kaçırmayın.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                            <Link
                                href={`https://wa.me/${businessConfig.contact.whatsapp}?text=Merhaba, blog yazılarınızı takip etmek istiyorum.`}
                                className="px-8 py-4 bg-white text-primary-600 font-bold rounded-xl hover:bg-neutral-100 transition-colors"
                            >
                                WhatsApp ile Takip Et
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
