import { Metadata } from "next";
import { HeaderOptimized } from "@/components/layout/HeaderOptimized";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { SolutionSearch } from "@/components/ui/SolutionSearch";
import { solutions, categoryMeta } from "@/lib/solutionsData";
import { businessConfig } from "@/config/business.config";

// ---------------------------------------------------------------------------
// SEO Metadata
// ---------------------------------------------------------------------------
export const metadata: Metadata = {
  title: "Çözüm Merkezi — PVC Pencere, Cam Balkon, Yalıtım Sorunlarına Cevap",
  description:
    "Pencere terleme, kilit arızası, cam balkon bakımı, ısı yalıtımı ve daha fazlası. Egepen Akçayapı Çözüm Merkezi'nde sorunlarınıza adım adım çözümler bulun.",
  keywords: [
    "pencere sorunları çözüm",
    "PVC pencere yardım",
    "cam balkon sorun",
    "pencere terleme çözüm",
    "pencere bakım rehberi",
    "Egepen yardım merkezi",
    "panjur motor arızası",
    "sineklik seçimi",
    "ısı yalıtımı rehber",
  ],
  alternates: {
    canonical: `${businessConfig.siteUrl}/cozumler`,
  },
  openGraph: {
    title: "Çözüm Merkezi — Egepen Akçayapı",
    description:
      "PVC pencere, cam balkon, panjur ve sineklik sorunlarına profesyonel çözüm rehberleri.",
    type: "website",
    locale: "tr_TR",
    url: `${businessConfig.siteUrl}/cozumler`,
  },
};

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------
export default function SolutionCenterPage() {
  // Category counts for the summary badges
  const categoryCounts = solutions.reduce<Record<string, number>>((acc, s) => {
    acc[s.category] = (acc[s.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <>
      <HeaderOptimized />

      <main id="main-content" className="min-h-screen bg-neutral-50">
        {/* ── Hero ────────────────────────────────────────── */}
        <PageHero
          title="Çözüm Merkezi"
          subtitle="Pencere, cam balkon, panjur ve sineklik sorunlarınıza adım adım çözümler. Aradığınız konuyu aşağıdan arayın."
          breadcrumbs={[{ label: "Çözüm Merkezi" }]}
        />

        {/* ── Category badges summary ──────────────────────── */}
        <section className="py-6 bg-white border-b border-neutral-100" aria-label="Kategoriler">
          <div className="container-custom">
            <ul className="flex flex-wrap justify-center gap-2">
              {(Object.keys(categoryMeta) as Array<keyof typeof categoryMeta>).map(
                (cat) => {
                  const meta = categoryMeta[cat];
                  const count = categoryCounts[cat] || 0;
                  if (count === 0) return null;
                  return (
                    <li key={cat}>
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border ${meta.bgColor} ${meta.color}`}
                      >
                        {meta.label}
                        <span className="opacity-60">({count})</span>
                      </span>
                    </li>
                  );
                }
              )}
            </ul>
          </div>
        </section>

        {/* ── Search + Results ─────────────────────────────── */}
        <section className="py-10 md:py-16" aria-label="Çözüm arama ve listesi">
          <div className="container-custom">
            <SolutionSearch solutions={solutions} />
          </div>
        </section>

        {/* ── Bottom CTA ──────────────────────────────────── */}
        <section className="py-12 bg-primary-600 text-white text-center" aria-label="Destek hattı">
          <div className="container-custom max-w-xl">
            <h2 className="text-xl md:text-2xl font-bold mb-2">
              Aradığınızı bulamadınız mı?
            </h2>
            <p className="text-primary-100 text-sm mb-5">
              Bizi arayın — ücretsiz teknik danışmanlık sunuyoruz.
            </p>
            <a
              href={`tel:${businessConfig.contact.landlineRaw}`}
              className="inline-flex items-center gap-2 px-7 py-3 bg-white text-primary-700 font-bold rounded-xl hover:bg-primary-50 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {businessConfig.contact.landline}
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
