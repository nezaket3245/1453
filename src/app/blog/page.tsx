import { Metadata } from "next";
import { HeaderOptimized } from "@/components/layout/HeaderOptimized";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/PageHero";
import OptimizedImage from "@/components/ui/OptimizedImage";
import Link from "next/link";
import { blogPosts, blogCategories, formatDate } from "@/lib/blogData";
import { businessConfig } from "@/config/business.config";

// ---------------------------------------------------------------------------
// SEO Metadata — top searched blog keywords for PVC, cam balkon, sineklik
// ---------------------------------------------------------------------------
export const metadata: Metadata = {
  title:
    "Blog | PVC Pencere Rehberi · Cam Balkon İpuçları · Enerji Tasarrufu — Egepen Akçayapı",
  description:
    "PVC pencere nasıl seçilir, cam balkon m2 fiyatları 2026, sineklik çeşitleri, enerji tasarrufu ipuçları ve bakım rehberleri. Beylikdüzü Egepen yetkili bayisinden uzman bilgiler.",
  keywords: [
    "PVC pencere seçimi rehberi",
    "cam balkon m2 fiyatları 2026",
    "cam balkon bakımı",
    "sineklik çeşitleri karşılaştırma",
    "pencere ısı yalıtımı",
    "kışlık pencere yalıtımı",
    "motorlu panjur akıllı ev",
    "duşakabin bakımı temizliği",
    "ispanyolet nedir",
    "Beylikdüzü cam balkon montajı",
    "enerji tasarruflu pencere",
    "PVC pencere bakımı kış",
    "alüminyum doğrama PVC farkı",
    "balkon cam kapama izin ruhsat",
    "panjur çeşitleri seçimi",
  ],
  alternates: {
    canonical: `${businessConfig.siteUrl}/blog`,
  },
  openGraph: {
    title: "Blog — PVC Pencere · Cam Balkon · Enerji Tasarrufu | Egepen Akçayapı",
    description:
      "PVC pencere, cam balkon, sineklik ve panjur hakkında uzman rehberler ve bakım ipuçları.",
    type: "website",
    locale: "tr_TR",
    url: `${businessConfig.siteUrl}/blog`,
  },
};

// ---------------------------------------------------------------------------
// Structured Data — CollectionPage + BreadcrumbList
// ---------------------------------------------------------------------------
function buildCollectionSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Egepen Akçayapı Blog",
    description:
      "PVC pencere, cam balkon, sineklik, panjur ve enerji tasarrufu hakkında uzman blog yazıları.",
    url: `${businessConfig.siteUrl}/blog`,
    publisher: {
      "@type": "Organization",
      name: businessConfig.name,
      url: businessConfig.siteUrl,
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: blogPosts.length,
      itemListElement: blogPosts.map((post, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${businessConfig.siteUrl}/blog/${post.slug}`,
        name: post.title,
      })),
    },
  };
}

function buildBreadcrumbSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Ana Sayfa",
        item: businessConfig.siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${businessConfig.siteUrl}/blog`,
      },
    ],
  };
}

// ---------------------------------------------------------------------------
// Category label map for Turkish display names
// ---------------------------------------------------------------------------
const categoryLabelMap: Record<string, string> = Object.fromEntries(
  blogCategories.map((c) => [c.id, c.name])
);

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------
export default function BlogPage() {
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            buildCollectionSchema(),
            buildBreadcrumbSchema(),
          ]),
        }}
      />

      <HeaderOptimized />

      <main id="main-content" className="min-h-screen bg-neutral-50">
        {/* ── Hero ─────────────────────────────────────────── */}
        <PageHero
          title="Blog & Rehberler"
          subtitle="PVC pencere seçimi, cam balkon fiyatları, sineklik karşılaştırması ve enerji tasarrufu hakkında uzman rehberler."
          breadcrumbs={[{ label: "Blog" }]}
          compact
        />

        {/* ── Category Filter Pills ────────────────────────── */}
        <nav
          className="py-5 bg-white border-b border-neutral-100 sticky top-16 lg:top-20 z-30"
          aria-label="Blog kategorileri"
        >
          <div className="container-custom">
            <ul className="flex flex-wrap justify-center gap-2" role="list">
              {blogCategories
                .filter((c) => c.id !== "all")
                .map((cat) => {
                  const count = blogPosts.filter(
                    (p) => p.category === cat.id
                  ).length;
                  return (
                    <li key={cat.id}>
                      <a
                        href={`#cat-${cat.id}`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-neutral-600 bg-neutral-50 rounded-full hover:bg-primary-50 hover:text-primary-600 transition-colors"
                      >
                        {cat.name}
                        <span className="text-xs text-neutral-400">
                          ({count})
                        </span>
                      </a>
                    </li>
                  );
                })}
            </ul>
          </div>
        </nav>

        {/* ── Posts by Category ─────────────────────────────── */}
        {blogCategories
          .filter((c) => c.id !== "all")
          .map((cat) => {
            const posts = blogPosts.filter((p) => p.category === cat.id);
            if (posts.length === 0) return null;
            return (
              <section
                key={cat.id}
                id={`cat-${cat.id}`}
                className="py-12 md:py-16 bg-white scroll-mt-32"
                aria-labelledby={`heading-${cat.id}`}
              >
                <div className="container-custom">
                  <h2
                    id={`heading-${cat.id}`}
                    className="text-xl md:text-2xl font-bold text-neutral-900 mb-6"
                  >
                    {cat.name}
                  </h2>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post, i) => (
                      <article key={post.id}>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="group block bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-lg transition-all h-full"
                        >
                          <div className="relative aspect-video bg-neutral-100">
                            <OptimizedImage
                              src={post.image}
                              alt={post.title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-cover"
                              {...(cat.id === "pvc-pencere" && i === 0
                                ? { priority: true }
                                : {})}
                            />
                          </div>
                          <div className="p-5">
                            <p className="text-xs text-primary-600 font-medium uppercase mb-1">
                              {categoryLabelMap[post.category] ?? post.category}
                            </p>
                            <h3 className="font-bold text-neutral-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                              {post.title}
                            </h3>
                            <p className="text-sm text-neutral-500 mt-2 line-clamp-2">
                              {post.excerpt}
                            </p>
                            <div
                              className="flex items-center gap-3 mt-3 text-xs text-neutral-400"
                              aria-label={`${formatDate(post.date)}, ${post.readTime} dakika okuma süresi`}
                            >
                              <time dateTime={post.date}>
                                {formatDate(post.date)}
                              </time>
                              <span aria-hidden="true">&bull;</span>
                              <span>{post.readTime} dk okuma</span>
                            </div>
                          </div>
                        </Link>
                      </article>
                    ))}
                  </div>
                </div>
              </section>
            );
          })}

        {/* ── All Posts fallback — single grid ─────────────── */}
        <section
          className="py-12 md:py-16 bg-neutral-50"
          aria-labelledby="all-posts-heading"
        >
          <div className="container-custom">
            <h2
              id="all-posts-heading"
              className="text-xl md:text-2xl font-bold text-neutral-900 mb-2"
            >
              Tüm Yazılar
            </h2>
            <p className="text-neutral-500 text-sm mb-8">
              {blogPosts.length} yazı — PVC pencere, cam balkon, sineklik,
              panjur ve enerji tasarrufu konularında rehberler.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {blogPosts.map((post) => (
                <article key={post.id}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block bg-white rounded-xl border border-neutral-200 overflow-hidden hover:shadow-md transition-all h-full"
                  >
                    <div className="relative aspect-video bg-neutral-100">
                      <OptimizedImage
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-primary-600 font-medium uppercase mb-1">
                        {categoryLabelMap[post.category] ?? post.category}
                      </p>
                      <h3 className="text-sm font-bold text-neutral-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <time
                        dateTime={post.date}
                        className="block text-xs text-neutral-400 mt-2"
                      >
                        {formatDate(post.date)}
                      </time>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
