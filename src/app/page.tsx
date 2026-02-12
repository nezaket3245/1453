import { Metadata } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { HeaderOptimized } from "@/components/layout/HeaderOptimized";
import { Footer } from "@/components/layout/Footer";
import { HeroSectionOptimized } from "@/components/sections/HeroSectionOptimized";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { LazyBelowFold } from "@/components/sections/LazyBelowFold";
import { businessConfig } from "@/config/business.config";

/**
 * Section Skeleton for loading states
 */
function SectionSkeleton() {
  return (
    <div className="py-16 animate-pulse">
      <div className="container-custom">
        <div className="h-8 bg-neutral-200 rounded w-1/3 mx-auto mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 bg-neutral-100 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Dynamic imports for above-fold and mid-page components (SSR for SEO)
 * Below-fold sections are in LazyBelowFold (ssr: false, ~200KB JS savings)
 */

// High priority - visible soon after scroll
const SEOProductGrid = dynamic(
  () => import("@/components/sections/SEOProductGrid").then(mod => ({ default: mod.SEOProductGrid })),
  { ssr: true, loading: () => <SectionSkeleton /> }
);

const EgepenShowroom = dynamic(
  () => import("@/components/sections/EgepenShowroom").then(mod => ({ default: mod.EgepenShowroom })),
  { ssr: true, loading: () => <SectionSkeleton /> }
);


/**
 * Homepage Metadata
 * SEO-optimized with high-value Turkish keywords from businessConfig
 * Targeting: "PVC pencere fiyatları", "Cam balkon fiyatları", "Egepen Bayi"
 */
export const metadata: Metadata = {
  title: { absolute: 'PVC Pencere Fiyatları 2026 | Egepen Akçayapı Beylikdüzü' },
  description:
    `PVC pencere fiyatları 2026, cam balkon m2 fiyat, sineklik ve panjur. Egepen Deceuninck yetkili bayisi Beylikdüzü. Ücretsiz keşif ve garantili montaj.`,
  keywords: [
    // En çok aranan kelimeler
    "pvc pencere fiyatları",
    "pvc pencere fiyatları 2026",
    "cam balkon fiyatları",
    "cam balkon m2 fiyat",
    "egepen pvc pencere",
    "egepen cam balkon",
    "egepen deceuninck",
    "istanbul pvc pencere",
    "beylikdüzü pvc pencere",
    "beylikdüzü cam balkon",
    "ısıcamlı cam balkon",
    "sineklik fiyatları",
    "panjur fiyatları",
    "pvc pencere montajı",
    "ücretsiz keşif"
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: `PVC Pencere Fiyatları 2026 | Egepen Akçayapı Beylikdüzü`,
    description:
      `PVC pencere, cam balkon, sineklik ve panjur fiyatları. Egepen Deceuninck yetkili bayisi.`,
    url: businessConfig.siteUrl,
    images: [
      {
        url: `${businessConfig.siteUrl}/images/og-home.jpg`,
        width: 1200,
        height: 630,
        alt: `Egepen Akçayapı - PVC Pencere ve Cam Balkon Fiyatları 2026`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@egepenakcayapi",
    creator: "@egepenakcayapi",
    title: `PVC Pencere Fiyatları 2026 | Egepen Akçayapı`,
    description: `PVC pencere, cam balkon fiyatları. Egepen yetkili bayisi.`,
    images: [`${businessConfig.siteUrl}/images/og-home.jpg`],
  },
  alternates: {
    canonical: businessConfig.siteUrl,
  },
};

/**
 * JSON-LD Schema for Homepage
 * Enhanced for Local SEO dominance
 */
const homePageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${businessConfig.siteUrl}/#webpage`,
  url: businessConfig.siteUrl,
  name: `${businessConfig.name} | Beylikdüzü Egepen Deceuninck Yetkili Bayi`,
  description:
    `${businessConfig.address.district} Egepen yetkili bayisi. PVC pencere, kapı, cam balkon ve profesyonel montaj hizmeti.`,
  isPartOf: {
    "@id": `${businessConfig.siteUrl}/#website`,
  },
  about: {
    "@id": `${businessConfig.siteUrl}/#organization`,
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Ana Sayfa",
        item: businessConfig.siteUrl,
      },
    ],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${businessConfig.siteUrl}/#website`,
  url: businessConfig.siteUrl,
  name: businessConfig.name,
  description: `${businessConfig.brand} yetkili bayisi - Beylikdüzü`,
  publisher: {
    "@id": `${businessConfig.siteUrl}/#organization`,
  },
  /* SearchAction removed — site has no /ara search route */
};

/**
 * SpecialtyContractor Schema for enhanced local SEO
 * Targets: construction, PVC installation, glass balcony
 */
const specialtyContractorSchema = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": `${businessConfig.siteUrl}/#contractor`,
  name: businessConfig.name,
  alternateName: "Egepen Akçayapı Beylikdüzü",
  description: "Beylikdüzü ve İstanbul genelinde Egepen Deceuninck yetkili bayisi olarak PVC pencere, cam balkon, sineklik, panjur ve duşakabin montaj hizmeti.",
  url: businessConfig.siteUrl,
  telephone: businessConfig.contact.mobile,
  email: businessConfig.contact.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: businessConfig.address.street,
    addressLocality: businessConfig.address.district,
    addressRegion: businessConfig.address.city,
    postalCode: businessConfig.address.zip,
    addressCountry: "TR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: businessConfig.address.coordinates.latitude,
    longitude: businessConfig.address.coordinates.longitude,
  },
  areaServed: businessConfig.seo.regions.map((region) => ({
    "@type": "City",
    name: region,
  })),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "PVC ve Cam Balkon Hizmetleri",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "PVC Pencere Montajı",
          description: "Egepen Deceuninck Legend, Legend Art ve Zen Spirit serisi PVC pencere satış ve montajı",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Cam Balkon Sistemleri",
          description: "Isıcamlı, sürme ve katlanır cam balkon sistemleri montajı",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Sineklik Montajı",
          description: "Menteşeli, sürgülü ve pileli sineklik sistemleri",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Panjur ve Kepenk",
          description: "Motorlu ve manuel panjur sistemleri montajı",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Duşakabin Sistemleri",
          description: "Premium cam duşakabin, siyah çerçeveli ve çerçevesiz modeller",
        },
      },
    ],
  },
  priceRange: "₺₺",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:30",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "18:00",
    },
  ],
  sameAs: [
    businessConfig.social.instagram,
    businessConfig.social.youtube
  ],

};

/**
 * Homepage Component
 * Server Component for optimal performance
 * Optimized for Lighthouse 95+ score
 * 
 * F-Pattern Layout:
 * 1. Hero with headline + CTA (top horizontal scan)
 * 2. Services overview (left vertical scan)
 * 3. Trust elements (right column)
 * 4. Social proof, gallery, FAQ (bottom conversion zone)
 */
export default function HomePage() {
  return (
    <>
      {/* JSON-LD Schema Scripts - Combined for fewer DOM nodes */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([homePageSchema, websiteSchema, specialtyContractorSchema]),
        }}
      />

      {/* Header - Optimized without Framer Motion */}
      <HeaderOptimized />

      {/* Main Content - F-Pattern optimized */}
      <main id="main-content">
        {/* Hero Section - Above the fold, critical for LCP */}
        <HeroSectionOptimized />

        {/* Sineklik Kampanya Reklamı */}
        <div className="bg-rose-600 text-white py-2.5">
          <div className="container mx-auto px-4 flex items-center justify-center gap-3 text-sm">
            <span className="font-bold bg-white/20 px-2 py-0.5 rounded text-xs">KAMPANYA</span>
            <span>Sineklikte tüm renkli profiller <strong className="text-yellow-300">beyaz fiyatına!</strong></span>
            <Link href="/sineklik-sistemleri" className="underline font-semibold hover:text-yellow-200 transition-colors" aria-label="Sineklik kampanyası detayları">Detaylar →</Link>
          </div>
        </div>

        {/* Services Section - Quick overview */}
        <ServicesSection />

        {/* SEO Product Grid - Category cards with keyword-rich content */}
        <SEOProductGrid />

        {/* Egepen Product Showroom - Premium product showcase */}
        <EgepenShowroom />

        {/* Below-fold sections - lazy loaded (ssr: false) for ~200KB JS savings */}
        <LazyBelowFold />

      </main>

      {/* Footer with Service Areas */}
      <Footer />
    </>
  );
}

