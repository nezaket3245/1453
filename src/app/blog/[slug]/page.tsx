import { Metadata } from "next";
import { notFound } from "next/navigation";
import OptimizedImage from "@/components/ui/OptimizedImage";
import Link from "next/link";
import { HeaderOptimized } from "@/components/layout/HeaderOptimized";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { businessConfig } from "@/config/business.config";
import {
    blogPosts,
    blogCategories,
    getBlogPostBySlug,
    getRelatedPosts,
    formatDate,
} from "@/lib/blogData";

interface BlogPostPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = getBlogPostBySlug(slug);
    if (!post) return { title: "Yazı Bulunamadı" };

    const catLabel = blogCategories.find((c) => c.id === post.category)?.name ?? post.category;

    return {
        title: `${post.title} | ${catLabel} — ${businessConfig.name}`,
        description: post.excerpt,
        keywords: post.seoKeywords,
        alternates: { canonical: `${businessConfig.siteUrl}/blog/${slug}` },
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: "article",
            locale: "tr_TR",
            url: `${businessConfig.siteUrl}/blog/${slug}`,
            images: post.image ? [{ url: post.image }] : undefined,
        },
    };
}

// ---------------------------------------------------------------------------
// Structured Data builders
// ---------------------------------------------------------------------------
function buildArticleSchema(post: (typeof blogPosts)[0]) {
    return {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        image: post.image,
        datePublished: post.date,
        dateModified: post.date,
        author: { "@type": "Person", name: post.author },
        publisher: {
            "@type": "Organization",
            name: businessConfig.name,
            url: businessConfig.siteUrl,
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${businessConfig.siteUrl}/blog/${post.slug}`,
        },
        keywords: post.seoKeywords?.join(", "),
    };
}

function buildBreadcrumbSchema(post: (typeof blogPosts)[0]) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: businessConfig.siteUrl },
            { "@type": "ListItem", position: 2, name: "Blog", item: `${businessConfig.siteUrl}/blog` },
            { "@type": "ListItem", position: 3, name: post.title, item: `${businessConfig.siteUrl}/blog/${post.slug}` },
        ],
    };
}

// ---------------------------------------------------------------------------
// Content renderer — fixes: inline markdown (bold, italic, links),
// numbered lists, horizontal rules, italic-vs-bullet disambiguation
// ---------------------------------------------------------------------------
function processInlineMarkdown(text: string): React.ReactNode[] {
    // Pattern: **bold**, *italic*, [text](url)
    const parts: React.ReactNode[] = [];
    const regex = /\*\*(.+?)\*\*|\*(.+?)\*|\[([^\]]+)\]\(([^)]+)\)/g;
    let lastIdx = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
        // Push plain text before this match
        if (match.index > lastIdx) {
            parts.push(text.slice(lastIdx, match.index));
        }
        if (match[1]) {
            // **bold**
            parts.push(<strong key={match.index} className="font-semibold text-neutral-800">{match[1]}</strong>);
        } else if (match[2]) {
            // *italic*
            parts.push(<em key={match.index}>{match[2]}</em>);
        } else if (match[3] && match[4]) {
            // [text](url)
            parts.push(
                <Link key={match.index} href={match[4]} className="text-primary-600 hover:underline">
                    {match[3]}
                </Link>
            );
        }
        lastIdx = match.index + match[0].length;
    }

    if (lastIdx < text.length) {
        parts.push(text.slice(lastIdx));
    }

    return parts.length > 0 ? parts : [text];
}

function renderContent(content: string) {
    const blocks = content.split("\n\n").filter(Boolean);

    return blocks.map((block, i) => {
        const trimmed = block.trim();

        // Horizontal rule
        if (/^---+$/.test(trimmed)) {
            return <hr key={i} className="my-6 border-neutral-200" />;
        }

        // h2
        if (trimmed.startsWith("## ")) {
            return (
                <h2 key={i} className="text-xl font-bold text-neutral-900 mt-8 mb-3">
                    {processInlineMarkdown(trimmed.replace("## ", ""))}
                </h2>
            );
        }

        // h3
        if (trimmed.startsWith("### ")) {
            return (
                <h3 key={i} className="text-lg font-semibold text-neutral-800 mt-6 mb-2">
                    {processInlineMarkdown(trimmed.replace("### ", ""))}
                </h3>
            );
        }

        // Unordered list — but NOT italic (*text* on single line)
        if (/^[-]\s/.test(trimmed) || (/^\*\s/.test(trimmed) && !trimmed.endsWith("*"))) {
            const items = trimmed.split("\n").filter((line) => line.trim());
            return (
                <ul key={i} className="space-y-1.5 my-3 ml-4" role="list">
                    {items.map((item, j) => (
                        <li key={j} className="text-neutral-600 text-sm flex items-start gap-2">
                            <span className="text-primary-500 mt-0.5 shrink-0" aria-hidden="true">&bull;</span>
                            <span>{processInlineMarkdown(item.replace(/^[-*]\s/, ""))}</span>
                        </li>
                    ))}
                </ul>
            );
        }

        // Numbered list
        if (/^\d+\.\s/.test(trimmed)) {
            const items = trimmed.split("\n").filter((line) => line.trim());
            return (
                <ol key={i} className="space-y-1.5 my-3 ml-4 list-decimal list-inside" role="list">
                    {items.map((item, j) => (
                        <li key={j} className="text-neutral-600 text-sm">
                            <span>{processInlineMarkdown(item.replace(/^\d+\.\s/, ""))}</span>
                        </li>
                    ))}
                </ol>
            );
        }

        // Default paragraph — with inline markdown support
        return (
            <p key={i} className="text-neutral-600 leading-relaxed mb-4">
                {processInlineMarkdown(trimmed)}
            </p>
        );
    });
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------
export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const post = getBlogPostBySlug(slug);
    if (!post) notFound();

    const relatedPosts = getRelatedPosts(slug, 3);
    const catLabel = blogCategories.find((c) => c.id === post.category)?.name ?? post.category;

    return (
        <>
            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify([
                        buildArticleSchema(post),
                        buildBreadcrumbSchema(post),
                    ]),
                }}
            />

            <HeaderOptimized />

            <main id="main-content" className="min-h-screen bg-neutral-50">
                <PageHero
                    title={post.title}
                    compact
                    breadcrumbs={[
                        { label: "Blog", href: "/blog" },
                        { label: post.title },
                    ]}
                />

                <article className="container-custom py-10 md:py-14">
                    <div className="max-w-3xl mx-auto">
                        {/* Meta info */}
                        <div className="flex flex-wrap items-center gap-3 mb-6 text-sm text-neutral-500">
                            <span className="bg-primary-50 text-primary-600 px-3 py-1 rounded-full text-xs font-medium uppercase">
                                {catLabel}
                            </span>
                            <time dateTime={post.date}>{formatDate(post.date)}</time>
                            <span aria-hidden="true">&bull;</span>
                            <span>{post.readTime} dk okuma</span>
                        </div>

                        {/* Featured Image */}
                        <div className="relative aspect-video rounded-2xl overflow-hidden bg-neutral-100 mb-8">
                            <OptimizedImage
                                src={post.image}
                                alt={post.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 768px"
                                className="object-cover"
                                priority
                            />
                        </div>

                        {/* Content */}
                        <div className="prose-container">{renderContent(post.content)}</div>

                        {/* Tags */}
                        {post.tags && post.tags.length > 0 && (
                            <footer className="mt-8 pt-6 border-t border-neutral-200">
                                <p className="sr-only">Etiketler</p>
                                <ul className="flex flex-wrap gap-2" role="list" aria-label="Yazı etiketleri">
                                    {post.tags.map((tag, i) => (
                                        <li key={i}>
                                            <span className="text-xs bg-neutral-100 text-neutral-600 px-3 py-1.5 rounded-full">
                                                {tag}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </footer>
                        )}

                        {/* Related Posts */}
                        {relatedPosts.length > 0 && (
                            <aside className="mt-12 pt-8 border-t border-neutral-200" aria-labelledby="related-heading">
                                <h2 id="related-heading" className="text-xl font-bold text-neutral-900 mb-6">
                                    İlgili Yazılar
                                </h2>
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {relatedPosts.map((p) => (
                                        <Link
                                            key={p.id}
                                            href={`/blog/${p.slug}`}
                                            className="group block bg-white rounded-xl border border-neutral-200 overflow-hidden hover:shadow-md transition-all"
                                        >
                                            <div className="relative aspect-video bg-neutral-100">
                                                <OptimizedImage
                                                    src={p.image}
                                                    alt={p.title}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, 33vw"
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="p-4">
                                                <h3 className="font-semibold text-neutral-800 group-hover:text-primary-600 transition-colors line-clamp-2">
                                                    {p.title}
                                                </h3>
                                                <time dateTime={p.date} className="block text-xs text-neutral-500 mt-1">
                                                    {formatDate(p.date)}
                                                </time>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </aside>
                        )}
                    </div>
                </article>
            </main>

            <Footer />
        </>
    );
}
