import { Metadata } from "next";
import { notFound } from "next/navigation";
import OptimizedImage from "@/components/ui/OptimizedImage";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { businessConfig } from "@/config/business.config";
import {
    blogPosts,
    blogCategories,
    getBlogPostBySlug,
    getRelatedPosts,
    formatDate,
    BlogPost,
} from "@/lib/blogData";

interface BlogPostPageProps {
    params: Promise<{ slug: string }>;
}

/**
 * Generate Static Params for all blog posts
 */
export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }));
}

/**
 * Generate Metadata for Blog Post
 */
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = getBlogPostBySlug(slug);

    if (!post) return { title: "Yazı Bulunamadı" };

    return {
        title: `${post.title} | Blog | ${businessConfig.name}`,
        description: post.excerpt,
        keywords: post.seoKeywords,
        authors: [{ name: post.author }],
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: "article",
            publishedTime: post.date,
            authors: [post.author],
            images: [{ url: post.image }],
            locale: "tr_TR",
        },
        alternates: {
            canonical: `https://egepenakcayapi.com.tr/blog/${post.slug}`,
        },
    };
}

/**
 * Generate Article Schema JSON-LD
 */
function generateArticleSchema(post: BlogPost) {
    return {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: post.excerpt,
        image: `https://egepenakcayapi.com.tr${post.image}`,
        author: {
            "@type": "Organization",
            name: businessConfig.name,
        },
        publisher: {
            "@type": "Organization",
            name: businessConfig.name,
            logo: {
                "@type": "ImageObject",
                url: "https://egepenakcayapi.com.tr/logo.png",
            },
        },
        datePublished: post.date,
        dateModified: post.date,
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://egepenakcayapi.com.tr/blog/${post.slug}`,
        },
    };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const post = getBlogPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const relatedPosts = getRelatedPosts(slug, 3);
    const category = blogCategories.find((c) => c.id === post.category);
    const schema = generateArticleSchema(post);

    return (
        <>
            {/* JSON-LD Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />

            <Header />

            <main className="min-h-screen bg-white">
                {/* Hero */}
                <section className="relative bg-gradient-to-br from-neutral-900 to-neutral-800 text-white py-16 lg:py-24">
                    <div className="container-custom">
                        <nav aria-label="Breadcrumb" className="mb-6">
                            <ol className="flex items-center gap-2 text-sm text-white/60">
                                <li>
                                    <Link href="/" className="hover:text-white transition-colors">
                                        Ana Sayfa
                                    </Link>
                                </li>
                                <li>/</li>
                                <li>
                                    <Link href="/blog" className="hover:text-white transition-colors">
                                        Blog
                                    </Link>
                                </li>
                                <li>/</li>
                                <li className="text-white/80 truncate max-w-[200px]">{post.title}</li>
                            </ol>
                        </nav>

                        <div className="max-w-4xl">
                            <div className="flex items-center gap-4 mb-6">
                                <span className="px-4 py-1.5 bg-white/10 text-secondary-400 rounded-full text-sm font-medium border border-white/20">
                                    {category?.icon} {category?.name}
                                </span>
                                <span className="text-white/60 text-sm">
                                    {formatDate(post.date)}
                                </span>
                                <span className="text-white/60 text-sm">
                                    ⏱️ {post.readTime} okuma
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-6">
                                {post.title}
                            </h1>
                            <p className="text-xl text-white/70 mb-8">
                                {post.excerpt}
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold text-lg">
                                    A
                                </div>
                                <div>
                                    <p className="font-medium text-white">{post.author}</p>
                                    <p className="text-sm text-white/50">{businessConfig.brand} Uzman Yazarı</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Featured Image */}
                <section className="container-custom -mt-6 mb-12 relative z-10">
                    <div className="relative aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl">
                        <OptimizedImage
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </section>

                {/* Content */}
                <section className="pb-16">
                    <div className="container-custom">
                        <div className="grid lg:grid-cols-12 gap-12">
                            {/* Main Content */}
                            <article className="lg:col-span-8">
                                <div className="prose prose-lg max-w-none prose-headings:text-neutral-900 prose-p:text-neutral-600 prose-p:leading-relaxed prose-a:text-primary-600 prose-strong:text-neutral-900 prose-ul:text-neutral-600 prose-li:marker:text-primary-600">
                                    {post.content.split("\n").map((paragraph, index) => {
                                        if (paragraph.startsWith("## ")) {
                                            return (
                                                <h2 key={index} className="text-2xl font-bold mt-12 mb-6">
                                                    {paragraph.replace("## ", "")}
                                                </h2>
                                            );
                                        }
                                        if (paragraph.startsWith("### ")) {
                                            return (
                                                <h3 key={index} className="text-xl font-bold mt-8 mb-4">
                                                    {paragraph.replace("### ", "")}
                                                </h3>
                                            );
                                        }
                                        if (paragraph.startsWith("- ")) {
                                            return (
                                                <li key={index} className="ml-6">
                                                    {paragraph.replace("- ", "")}
                                                </li>
                                            );
                                        }
                                        if (paragraph.startsWith("1. ") || paragraph.startsWith("2. ") || paragraph.startsWith("3. ")) {
                                            return (
                                                <li key={index} className="ml-6 list-decimal">
                                                    {paragraph.replace(/^\d+\. /, "")}
                                                </li>
                                            );
                                        }
                                        if (paragraph.startsWith("✓ ") || paragraph.startsWith("✗ ")) {
                                            return (
                                                <div key={index} className="flex items-center gap-2 my-2">
                                                    <span className={paragraph.startsWith("✓") ? "text-green-600" : "text-red-600"}>
                                                        {paragraph.charAt(0)}
                                                    </span>
                                                    <span>{paragraph.slice(2)}</span>
                                                </div>
                                            );
                                        }
                                        if (paragraph.startsWith("|")) {
                                            return null; // Skip table rows for now
                                        }
                                        if (paragraph.startsWith("---")) {
                                            return <hr key={index} className="my-8 border-neutral-200" />;
                                        }
                                        if (paragraph.startsWith("*") && paragraph.endsWith("*")) {
                                            return (
                                                <p key={index} className="italic text-neutral-500 bg-neutral-50 p-4 rounded-lg border-l-4 border-primary-500">
                                                    {paragraph.replace(/\*/g, "")}
                                                </p>
                                            );
                                        }
                                        if (paragraph.trim()) {
                                            return (
                                                <p key={index} className="mb-4">
                                                    {paragraph}
                                                </p>
                                            );
                                        }
                                        return null;
                                    })}
                                </div>

                                {/* Tags */}
                                <div className="mt-12 pt-8 border-t border-neutral-200">
                                    <h4 className="font-bold text-neutral-900 mb-4">Etiketler</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {post.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-4 py-2 bg-neutral-100 text-neutral-600 rounded-full text-sm hover:bg-primary-100 hover:text-primary-700 transition-colors cursor-pointer"
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Share */}
                                <div className="mt-8 p-6 bg-neutral-50 rounded-2xl">
                                    <h4 className="font-bold text-neutral-900 mb-4">Bu Yazıyı Paylaşın</h4>
                                    <div className="flex gap-3">
                                        <a
                                            href={`https://wa.me/?text=${encodeURIComponent(post.title + " - " + "https://egepenakcayapi.com.tr/blog/" + post.slug)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
                                        >
                                            WhatsApp
                                        </a>
                                        <a
                                            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent("https://egepenakcayapi.com.tr/blog/" + post.slug)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-4 py-2 bg-neutral-800 text-white rounded-lg font-medium hover:bg-neutral-900 transition-colors"
                                        >
                                            Twitter
                                        </a>
                                        <a
                                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://egepenakcayapi.com.tr/blog/" + post.slug)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                                        >
                                            Facebook
                                        </a>
                                    </div>
                                </div>
                            </article>

                            {/* Sidebar */}
                            <aside className="lg:col-span-4">
                                <div className="sticky top-28 space-y-8">
                                    {/* CTA */}
                                    <div className="bg-primary-600 text-white p-8 rounded-2xl">
                                        <h3 className="text-xl font-bold mb-4">
                                            Ücretsiz Keşif Hizmeti
                                        </h3>
                                        <p className="text-white/80 mb-6 text-sm">
                                            PVC pencere, cam balkon veya tamir ihtiyacınız için uzman ekibimiz evinize gelsin.
                                        </p>
                                        <Button variant="secondary" fullWidth href="/teklif-al">
                                            Hemen Randevu Al
                                        </Button>
                                    </div>

                                    {/* Related Posts */}
                                    {relatedPosts.length > 0 && (
                                        <div className="bg-neutral-50 p-6 rounded-2xl">
                                            <h3 className="text-lg font-bold text-neutral-900 mb-6">
                                                İlgili Yazılar
                                            </h3>
                                            <div className="space-y-4">
                                                {relatedPosts.map((related) => (
                                                    <Link
                                                        key={related.id}
                                                        href={`/blog/${related.slug}`}
                                                        className="block group"
                                                    >
                                                        <div className="flex gap-4">
                                                            <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                                                                <OptimizedImage
                                                                    src={related.image}
                                                                    alt={related.title}
                                                                    fill
                                                                    className="object-cover group-hover:scale-110 transition-transform"
                                                                />
                                                            </div>
                                                            <div>
                                                                <h4 className="font-medium text-neutral-900 group-hover:text-primary-600 transition-colors line-clamp-2 text-sm">
                                                                    {related.title}
                                                                </h4>
                                                                <p className="text-xs text-neutral-400 mt-1">
                                                                    {related.readTime}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Contact Info */}
                                    <div className="bg-neutral-900 text-white p-6 rounded-2xl">
                                        <h3 className="text-lg font-bold mb-4">Bize Ulaşın</h3>
                                        <div className="space-y-3 text-sm">
                                            <a
                                                href={`tel:${businessConfig.contact.mobileRaw}`}
                                                className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
                                            >
                                                <span>📞</span>
                                                {businessConfig.contact.mobile}
                                            </a>
                                            <a
                                                href={`https://wa.me/${businessConfig.contact.whatsapp}`}
                                                className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
                                            >
                                                <span>💬</span>
                                                WhatsApp Destek
                                            </a>
                                            <div className="flex items-center gap-3 text-white/60">
                                                <span>📍</span>
                                                {businessConfig.address.district}, {businessConfig.address.city}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </div>
                </section>

                {/* More Posts */}
                <section className="py-16 bg-neutral-50">
                    <div className="container-custom">
                        <div className="flex justify-between items-center mb-12">
                            <h2 className="text-2xl font-bold text-neutral-900">Diğer Yazılar</h2>
                            <Link
                                href="/blog"
                                className="text-primary-600 font-medium hover:underline"
                            >
                                Tüm Yazılar →
                            </Link>
                        </div>
                        <div className="grid md:grid-cols-3 gap-8">
                            {blogPosts
                                .filter((p) => p.slug !== slug)
                                .slice(0, 3)
                                .map((otherPost) => (
                                    <Link
                                        key={otherPost.id}
                                        href={`/blog/${otherPost.slug}`}
                                        className="group bg-white rounded-xl overflow-hidden border border-neutral-100 hover:shadow-lg transition-all"
                                    >
                                        <div className="relative aspect-video overflow-hidden">
                                            <OptimizedImage
                                                src={otherPost.image}
                                                alt={otherPost.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="p-5">
                                            <p className="text-xs text-neutral-400 mb-2">
                                                {formatDate(otherPost.date)}
                                            </p>
                                            <h3 className="font-bold text-neutral-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                                                {otherPost.title}
                                            </h3>
                                        </div>
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
