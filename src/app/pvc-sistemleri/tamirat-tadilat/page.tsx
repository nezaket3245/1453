// ===========================================================================
// PVC Tamirat & Tadilat — page.tsx
// ===========================================================================
// Server component: renders metadata, JSON-LD schema, static sections,
// and embeds client sub-components (search grid, detail modal, form).
// ===========================================================================

import { Metadata } from "next";
import { HeaderOptimized } from "@/components/layout/HeaderOptimized";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/PageHero";
import RepairStatusTracker from "@/components/ui/RepairStatusTracker";
import { repairRecords, categoryMeta, getActiveCategories } from "@/lib/tamiratData";
import { businessConfig } from "@/config/business.config";
import TamiratPageClient from "./TamiratPageClient";

// ---------------------------------------------------------------------------
// Metadata (SEO)
// ---------------------------------------------------------------------------

const pageTitle = "PVC Pencere Tamirat & Tadilat Hizmetleri | Egepen Akçayapı";
const pageDescription =
  "PVC pencere ve kapı tamiri: cam değişimi, conta yenileme, espanyolet mekanizma tamiri, menteşe ayarı, folyo kaplama. İstanbul Beylikdüzü — aynı gün servis. 0212 880 15 07";
const pageUrl = `${businessConfig.siteUrl}/pvc-sistemleri/tamirat-tadilat`;

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    "PVC pencere tamiri",
    "PVC kapı tamiri",
    "pencere cam değişimi",
    "conta değişimi",
    "espanyolet tamiri",
    "pencere mekanizma tamiri",
    "pencere menteşe ayarı",
    "pencere kolu değişimi",
    "PVC profil kaynak tamiri",
    "pencere folyo kaplama",
    "pencere revizyon",
    "pencere tamir İstanbul",
    "PVC pencere bakım",
    "pencere fitil değişimi",
    "EPDM conta",
    "pencere denizlik değişimi",
    "Beylikdüzü pencere tamiri",
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: pageUrl,
    type: "website",
    locale: "tr_TR",
  },
};

// ---------------------------------------------------------------------------
// JSON-LD: Service + BreadcrumbList + FAQPage (partial)
// ---------------------------------------------------------------------------

function generateSchema() {
  const categoryLabels = getActiveCategories().map((c) => categoryMeta[c].label);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "PVC Pencere Tamirat & Tadilat",
    description: pageDescription,
    provider: {
      "@type": "LocalBusiness",
      name: businessConfig.name,
      telephone: businessConfig.contact.landline,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Beylikdüzü",
        addressRegion: "İstanbul",
        addressCountry: "TR",
      },
    },
    serviceType: categoryLabels,
    areaServed: {
      "@type": "City",
      name: "İstanbul",
    },
    url: pageUrl,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "PVC Tamirat Hizmetleri",
      itemListElement: repairRecords.map((r) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: r.title,
          description: r.description,
        },
      })),
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: businessConfig.siteUrl },
      { "@type": "ListItem", position: 2, name: "PVC Sistemleri", item: `${businessConfig.siteUrl}/pvc-sistemleri` },
      { "@type": "ListItem", position: 3, name: "Tamirat & Tadilat", item: pageUrl },
    ],
  };

  return [serviceSchema, breadcrumbSchema];
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function TamiratTadilatPage() {
  const schemas = generateSchema();

  return (
    <>
      {/* JSON-LD structured data */}
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}

      <HeaderOptimized />

      <main id="main-content" className="min-h-screen bg-neutral-50">
        {/* Hero */}
        <PageHero
          title="PVC Tamirat & Tadilat"
          subtitle={`${repairRecords.length} farklı PVC pencere ve kapı tamir hizmeti. İstanbul genelinde aynı gün servis.`}
          breadcrumbs={[
            { label: "PVC Sistemleri", href: "/pvc-sistemleri" },
            { label: "Tamirat & Tadilat" },
          ]}
        />

        {/* Status tracker — how we work */}
        <section className="py-14 md:py-20 bg-white">
          <div className="container-custom">
            <RepairStatusTracker />
          </div>
        </section>

        {/* Search grid + detail modal (client boundary) */}
        <section className="py-14 md:py-20 bg-neutral-50">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 text-center mb-2">
              Tamirat Hizmetlerimiz
            </h2>
            <p className="text-neutral-600 text-center mb-10 max-w-xl mx-auto">
              İhtiyacınıza uygun hizmeti arayın veya kategoriye göre filtreleyin.
              Detay için karta tıklayın.
            </p>
            <TamiratPageClient />
          </div>
        </section>

        {/* Repair request form */}
        <section id="tamir-formu" className="py-14 md:py-20 bg-white">
          <div className="container-custom max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 text-center mb-2">
              Tamir Talebi Oluşturun
            </h2>
            <p className="text-neutral-600 text-center mb-8 max-w-lg mx-auto">
              Sorununuzu kısaca anlatın, size en kısa sürede dönüş yapalım.
              Acil durumlar için{" "}
              <a
                href="tel:+902128801507"
                className="text-blue-600 font-medium hover:underline"
              >
                0212 880 15 07
              </a>{" "}
              numarasını arayınız.
            </p>
            {/* Dynamically import form client component */}
            <RepairRequestFormWrapper />
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-14 md:py-16 bg-neutral-50 text-center">
          <div className="container-custom max-w-xl">
            <p className="text-neutral-600 leading-relaxed mb-4">
              PVC pencere ve kapı tamiratı ile ilgili sorularınız mı var?
              Ücretsiz keşif için bizi arayın veya iletişim sayfamızı ziyaret edin.
            </p>
            <a
              href="/iletisim"
              className="inline-flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700 transition-colors"
            >
              İletişim Sayfasına Git
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

// ---------------------------------------------------------------------------
// Lazy-loaded form wrapper (code-split the form client component)
// ---------------------------------------------------------------------------
import dynamic from "next/dynamic";

const RepairRequestFormLazy = dynamic(
  () => import("@/components/ui/RepairRequestForm"),
  {
    loading: () => (
      <div className="animate-pulse space-y-4">
        <div className="h-10 bg-neutral-200 rounded-xl" />
        <div className="h-10 bg-neutral-200 rounded-xl" />
        <div className="h-24 bg-neutral-200 rounded-xl" />
        <div className="h-12 bg-neutral-200 rounded-xl" />
      </div>
    ),
  },
);

function RepairRequestFormWrapper() {
  return <RepairRequestFormLazy />;
}
