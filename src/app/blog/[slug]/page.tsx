import { Metadata } from "next";
import { notFound } from "next/navigation";
import OptimizedImage from "@/components/ui/OptimizedImage";
import Link from "next/link";
import { HeaderOptimized } from '@/components/layout/HeaderOptimized';
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
        title: `${post.title.slice(0, 50)} | ${businessConfig.name}`,
        description: post.excerpt.slice(0, 155),
        keywords: [
            ...post.seoKeywords,
            'PVC pencere temizliği püf noktaları',
            '2026 cam balkon trendleri',
            'Kış bahçesi dekorasyon fikirleri',
            'Isı yalıtımı için en iyi cam hangisi?',
            'Sürgülü sistem bakımı nasıl yapılır?',
        ],
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
            canonical: `https://egepenakcayapi.com/blog/${post.slug}`,
        },
    };
}

/**
 * Generate BlogPosting + BreadcrumbList JSON-LD schemas
 */
function generateArticleSchema(post: BlogPost) {
    return {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        image: `${businessConfig.siteUrl}${post.image}`,
        author: {
            "@type": "Organization",
            name: businessConfig.name,
        },
        publisher: {
            "@type": "Organization",
            name: businessConfig.name,
            logo: {
                "@type": "ImageObject",
                url: `${businessConfig.siteUrl}/logo.png`,
            },
        },
        datePublished: post.date,
        dateModified: post.date,
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${businessConfig.siteUrl}/blog/${post.slug}`,
        },
    };
}

function generateBreadcrumbSchema(post: BlogPost) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: `${businessConfig.siteUrl}/` },
            { "@type": "ListItem", position: 2, name: "Blog", item: `${businessConfig.siteUrl}/blog` },
            { "@type": "ListItem", position: 3, name: post.title, item: `${businessConfig.siteUrl}/blog/${post.slug}` },
        ],
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
    const breadcrumbSchema = generateBreadcrumbSchema(post);

    return (
        <>
            {/* BlogPosting + BreadcrumbList JSON-LD Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify([schema, breadcrumbSchema]) }}
            />

            <HeaderOptimized />

            <main id="main-content" className="min-h-screen bg-white">
                {/* Hero */}
                <section className="relative bg-gradient-to-br from-neutral-900 to-neutral-800 text-white py-16 lg:py-24">
                    <div className="container-custom">
                        <nav aria-label="Breadcrumb" className="mb-6">
                            <ol className="flex items-center gap-2 text-sm text-white/60">
                                <li>
                                    <Link href="/" className="hover:text-white transition-colors focus:ring-2 focus:ring-white/50 focus:outline-none rounded py-1.5 px-1.5 inline-flex items-center min-h-[24px]">
                                        Ana Sayfa
                                    </Link>
                                </li>
                                <li aria-hidden="true">/</li>
                                <li>
                                    <Link href="/blog" className="hover:text-white transition-colors focus:ring-2 focus:ring-white/50 focus:outline-none rounded py-1.5 px-1.5 inline-flex items-center min-h-[24px]">
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
                                    {(() => {
                                        const lines = post.content.split("\n");
                                        const elements: React.ReactNode[] = [];
                                        let i = 0;
                                        while (i < lines.length) {
                                            const paragraph = lines[i];
                                            if (paragraph.startsWith("## ")) {
                                                elements.push(<h2 key={i} className="text-2xl font-bold mt-12 mb-6">{paragraph.replace("## ", "")}</h2>);
                                            } else if (paragraph.startsWith("### ")) {
                                                elements.push(<h3 key={i} className="text-xl font-bold mt-8 mb-4">{paragraph.replace("### ", "")}</h3>);
                                            } else if (paragraph.startsWith("- ")) {
                                                // Group consecutive unordered list items
                                                const items: { key: number; text: string }[] = [];
                                                while (i < lines.length && lines[i].startsWith("- ")) {
                                                    items.push({ key: i, text: lines[i].replace("- ", "") });
                                                    i++;
                                                }
                                                elements.push(
                                                    <ul key={`ul-${items[0].key}`} className="ml-6 list-disc">
                                                        {items.map(item => <li key={item.key}>{item.text}</li>)}
                                                    </ul>
                                                );
                                                continue; // i already advanced
                                            } else if (/^\d+\. /.test(paragraph)) {
                                                // Group consecutive ordered list items
                                                const items: { key: number; text: string }[] = [];
                                                while (i < lines.length && /^\d+\. /.test(lines[i])) {
                                                    items.push({ key: i, text: lines[i].replace(/^\d+\. /, "") });
                                                    i++;
                                                }
                                                elements.push(
                                                    <ol key={`ol-${items[0].key}`} className="ml-6 list-decimal">
                                                        {items.map(item => <li key={item.key}>{item.text}</li>)}
                                                    </ol>
                                                );
                                                continue; // i already advanced
                                            } else if (paragraph.startsWith("✓ ") || paragraph.startsWith("✗ ")) {
                                                elements.push(
                                                    <div key={i} className="flex items-center gap-2 my-2">
                                                        <span className={paragraph.startsWith("✓") ? "text-green-600" : "text-red-600"}>{paragraph.charAt(0)}</span>
                                                        <span>{paragraph.slice(2)}</span>
                                                    </div>
                                                );
                                            } else if (paragraph.startsWith("|")) {
                                                // Skip table rows
                                            } else if (paragraph.startsWith("---")) {
                                                elements.push(<hr key={i} className="my-8 border-neutral-200" />);
                                            } else if (paragraph.startsWith("*") && paragraph.endsWith("*")) {
                                                elements.push(
                                                    <p key={i} className="italic text-neutral-500 bg-neutral-50 p-4 rounded-lg border-l-4 border-primary-500">
                                                        {paragraph.replace(/\*/g, "")}
                                                    </p>
                                                );
                                            } else if (paragraph.trim()) {
                                                elements.push(<p key={i} className="mb-4">{paragraph}</p>);
                                            }
                                            i++;
                                        }
                                        return elements;
                                    })()}
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
                                            href={`https://wa.me/?text=${encodeURIComponent(post.title + " - " + "https://egepenakcayapi.com/blog/" + post.slug)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-4 py-2 bg-green-700 text-white rounded-lg font-medium hover:bg-green-800 transition-colors"
                                        >
                                            WhatsApp
                                        </a>
                                        <a
                                            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent("https://egepenakcayapi.com/blog/" + post.slug)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-4 py-2 bg-neutral-800 text-white rounded-lg font-medium hover:bg-neutral-900 transition-colors"
                                        >
                                            Twitter
                                        </a>
                                        <a
                                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://egepenakcayapi.com/blog/" + post.slug)}`}
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
                                        <Button variant="secondary" fullWidth href="/iletisim">
                                            Bize Ulaşın
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
                                                        className="block group focus:ring-2 focus:ring-primary-400 focus:outline-none rounded-lg"
                                                        aria-label={`${related.title} yazısını oku`}
                                                    >
                                                        <div className="flex gap-4">
                                                            <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                                                                <OptimizedImage
                                                                    src={related.image}
                                                                    alt={`${related.title} - Blog Görseli`}
                                                                    fill
                                                                    className="object-cover group-hover:scale-110 transition-transform"
                                                                />
                                                            </div>
                                                            <div>
                                                                <h4 className="font-medium text-neutral-900 group-hover:text-primary-600 transition-colors line-clamp-2 text-sm">
                                                                    {related.title}
                                                                </h4>
                                                                <p className="text-xs text-neutral-500 mt-1">
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
                                            <div className="flex items-center gap-3 text-white/60">
                                                <span>📍</span>
                                                {businessConfig.address.district}, {businessConfig.address.city}
                                            </div>
                                            <Link
                                                href="/iletisim"
                                                className="flex items-center gap-3 text-primary-400 hover:text-primary-300 transition-colors font-semibold"
                                            >
                                                <span>📧</span>
                                                İletişim Sayfası
                                            </Link>
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
                                        className="group bg-white rounded-xl overflow-hidden border border-neutral-100 hover:shadow-lg transition-shadow focus:ring-2 focus:ring-primary-400 focus:outline-none"
                                        aria-label={`${otherPost.title} yazısını oku`}
                                    >
                                        <div className="relative aspect-video overflow-hidden">
                                            <OptimizedImage
                                                src={otherPost.image}
                                                alt={`${otherPost.title} - Blog Görseli`}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="p-5">
                                            <p className="text-xs text-neutral-500 mb-2">
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
