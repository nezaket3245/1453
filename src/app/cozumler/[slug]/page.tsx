import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HeaderOptimized } from "@/components/layout/HeaderOptimized";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { FeedbackWidget } from "@/components/ui/FeedbackWidget";
import { TechSpecsTable } from "@/components/ui/TechSpecsTable";
import {
  ExpandableSection,
  ExpandableGroup,
} from "@/components/ui/ExpandableSection";
import {
  solutions,
  getSolutionBySlug,
  getAllSolutionSlugs,
  getRelatedSolutions,
  categoryMeta,
  type ContentBlock,
} from "@/lib/solutionsData";
import { businessConfig } from "@/config/business.config";

// ---------------------------------------------------------------------------
// Static params (generateStaticParams for static export)
// ---------------------------------------------------------------------------
export function generateStaticParams() {
  return getAllSolutionSlugs().map((slug) => ({ slug }));
}

// ---------------------------------------------------------------------------
// Dynamic metadata per article
// ---------------------------------------------------------------------------
interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const sol = getSolutionBySlug(slug);
  if (!sol) return {};

  return {
    title: sol.title,
    description: sol.excerpt,
    keywords: sol.keywords,
    alternates: {
      canonical: `${businessConfig.siteUrl}/cozumler/${sol.slug}`,
    },
    openGraph: {
      title: sol.title,
      description: sol.excerpt,
      type: "article",
      locale: "tr_TR",
      url: `${businessConfig.siteUrl}/cozumler/${sol.slug}`,
      publishedTime: sol.publishedAt,
      modifiedTime: sol.updatedAt,
    },
  };
}

// ---------------------------------------------------------------------------
// Schema builders
// ---------------------------------------------------------------------------
function buildArticleSchema(sol: (typeof solutions)[0]) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: sol.title,
    description: sol.excerpt,
    datePublished: sol.publishedAt,
    dateModified: sol.updatedAt,
    author: {
      "@type": "Organization",
      name: businessConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: businessConfig.name,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${businessConfig.siteUrl}/cozumler/${sol.slug}`,
    },
    keywords: sol.keywords.join(", "),
  };
}

function buildBreadcrumbSchema(sol: (typeof solutions)[0]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: businessConfig.siteUrl },
      { "@type": "ListItem", position: 2, name: "Çözüm Merkezi", item: `${businessConfig.siteUrl}/cozumler` },
      { "@type": "ListItem", position: 3, name: sol.title, item: `${businessConfig.siteUrl}/cozumler/${sol.slug}` },
    ],
  };
}

// Build HowTo schema for articles that have steps content
function buildHowToSchema(sol: (typeof solutions)[0]) {
  const stepsBlock = sol.content.find((b) => b.type === "steps");
  if (!stepsBlock?.steps) return null;
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: sol.title,
    description: sol.excerpt,
    step: stepsBlock.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.detail,
    })),
  };
}

// ---------------------------------------------------------------------------
// Content block renderer
// ---------------------------------------------------------------------------
function RenderBlock({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "heading":
      if (block.level === 3)
        return (
          <h3 className="text-lg font-bold text-neutral-800 mt-6 mb-2">
            {block.text}
          </h3>
        );
      return (
        <h2 className="text-xl md:text-2xl font-bold text-neutral-900 mt-8 mb-3">
          {block.text}
        </h2>
      );

    case "paragraph":
      return (
        <p className="text-neutral-600 leading-relaxed mb-4">{block.text}</p>
      );

    case "list":
      return (
        <ul className="space-y-2 mb-5 pl-1" role="list">
          {block.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-neutral-600 leading-relaxed">
              <svg className="w-3.5 h-3.5 text-primary-400 mt-1 shrink-0" fill="currentColor" viewBox="0 0 8 8">
                <circle cx="4" cy="4" r="4" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      );

    case "steps":
      return (
        <ol className="space-y-4 mb-6">
          {block.steps?.map((s, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-50 text-primary-600 font-bold text-sm shrink-0">
                {i + 1}
              </span>
              <div>
                <p className="font-bold text-neutral-900 text-sm">{s.title}</p>
                <p className="text-sm text-neutral-600 mt-1 leading-relaxed">
                  {s.detail}
                </p>
              </div>
            </li>
          ))}
        </ol>
      );

    case "tip":
      return (
        <div className="p-4 bg-blue-50 rounded-xl border border-blue-200 mb-4">
          <p className="text-sm text-blue-800 leading-relaxed">
            <span className="font-bold">💡 Uzman Tavsiyesi: </span>
            {block.text}
          </p>
        </div>
      );

    case "warning":
      return (
        <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 mb-4">
          <p className="text-sm text-amber-800 leading-relaxed">
            <span className="font-bold">⚠️ Dikkat: </span>
            {block.text}
          </p>
        </div>
      );

    default:
      return null;
  }
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default async function SolutionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const sol = getSolutionBySlug(slug);
  if (!sol) notFound();

  const meta = categoryMeta[sol.category];
  const related = getRelatedSolutions(sol.relatedSlugs);
  const howToSchema = buildHowToSchema(sol);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const schemas: any[] = [buildArticleSchema(sol), buildBreadcrumbSchema(sol)];
  if (howToSchema) schemas.push(howToSchema);

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />

      <HeaderOptimized />

      <main id="main-content" className="min-h-screen bg-neutral-50">
        {/* ── Hero ───────────────────────────────────────── */}
        <PageHero
          title={sol.title}
          breadcrumbs={[
            { label: "Çözüm Merkezi", href: "/cozumler" },
            { label: sol.badge },
          ]}
          compact
        />

        {/* ── Article body ───────────────────────────────── */}
        <article className="py-10 md:py-16">
          <div className="container-custom max-w-3xl">
            {/* Badge + date */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span
                className={`inline-block text-xs font-bold px-3 py-1.5 rounded-full border ${meta.bgColor} ${meta.color}`}
              >
                {meta.label}
              </span>
              <time
                className="text-xs text-neutral-400"
                dateTime={sol.updatedAt}
              >
                Güncelleme:{" "}
                {new Date(sol.updatedAt).toLocaleDateString("tr-TR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
            </div>

            {/* Excerpt */}
            <p className="text-lg text-neutral-700 leading-relaxed mb-8 font-medium">
              {sol.excerpt}
            </p>

            {/* Content blocks */}
            <section aria-label="Makale içeriği">
              {sol.content.map((block, i) => (
                <RenderBlock key={i} block={block} />
              ))}
            </section>

            {/* Tech Specs (for product-info articles) */}
            {sol.techSpecs && sol.techSpecs.length > 0 && (
              <section className="mt-8" aria-label="Teknik özellikler">
                <TechSpecsTable specs={sol.techSpecs} productName={sol.title.split("—")[0]?.trim()} />
              </section>
            )}

            {/* Keywords as tags */}
            <div className="mt-8 pt-6 border-t border-neutral-200">
              <p className="text-xs text-neutral-400 mb-2">Etiketler:</p>
              <ul className="flex flex-wrap gap-1.5" role="list">
                {sol.keywords.slice(0, 8).map((kw) => (
                  <li key={kw}>
                    <span className="inline-block text-xs text-neutral-500 bg-neutral-100 px-2.5 py-1 rounded-full">
                      {kw}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Feedback */}
            <div className="mt-8">
              <FeedbackWidget articleSlug={sol.slug} />
            </div>

            {/* Article CTA */}
            <div className="mt-8 p-6 bg-primary-50 rounded-2xl border border-primary-100 text-center">
              <p className="text-sm font-semibold text-primary-800 mb-1">
                Profesyonel yardıma mı ihtiyacınız var?
              </p>
              <p className="text-xs text-primary-600 mb-4">
                Ücretsiz keşif ve teknik danışmanlık için hemen arayın.
              </p>
              <a
                href={`tel:${businessConfig.contact.landlineRaw}`}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors text-sm"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {businessConfig.contact.landline}
              </a>
            </div>
          </div>
        </article>

        {/* ── Related articles ───────────────────────────── */}
        {related.length > 0 && (
          <section className="py-10 md:py-14 bg-white border-t border-neutral-100" aria-labelledby="related-heading">
            <div className="container-custom max-w-3xl">
              <h2 id="related-heading" className="text-lg font-bold text-neutral-900 mb-6">
                İlgili Çözümler
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {related.map((r) => {
                  const rMeta = categoryMeta[r.category];
                  return (
                    <Link
                      key={r.slug}
                      href={`/cozumler/${r.slug}`}
                      className="group p-4 bg-neutral-50 rounded-xl border border-neutral-200 hover:border-primary-300 hover:shadow-sm transition-all"
                    >
                      <span
                        className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border mb-2 ${rMeta.bgColor} ${rMeta.color}`}
                      >
                        {rMeta.label}
                      </span>
                      <p className="text-sm font-semibold text-neutral-800 group-hover:text-primary-600 transition-colors leading-snug">
                        {r.title}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
