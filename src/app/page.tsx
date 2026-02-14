import { Metadata } from "next";
import dynamic from "next/dynamic";
import { HeaderOptimized } from "@/components/layout/HeaderOptimized";
import { Footer } from "@/components/layout/Footer";
import { HeroSectionOptimized } from "@/components/sections/HeroSectionOptimized";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { CTASection } from "@/components/sections/CTASection";
import { businessConfig } from "@/config/business.config";

/**
 * Dynamic imports - sadece önemli bölümler
 */
const ServiceCards = dynamic(
  () => import("@/components/sections/ServiceCards").then(mod => ({ default: mod.ServiceCards })),
  { ssr: true }
);

const TestimonialsSection = dynamic(
  () => import("@/components/sections/TestimonialsSection").then(mod => ({ default: mod.TestimonialsSection })),
  { ssr: true }
);

const HomepageFAQSection = dynamic(
  () => import("@/components/sections/FAQAccordion").then(mod => ({ default: mod.HomepageFAQSection })),
  { ssr: true }
);



/**
 * Homepage Metadata
 * SEO-optimized with high-value Turkish keywords from businessConfig
 * Targeting: "PVC pencere fiyatları", "Cam balkon fiyatları", "Egepen Bayi"
 */
export const metadata: Metadata = {
  title: `PVC Pencere Fiyatları 2026 | Egepen Akçayapı Beylikdüzü`,
  description:
    `✅ PVC pencere fiyatları 2026, cam balkon m2 fiyat, sineklik ve panjur. Egepen Deceuninck yetkili bayisi. Ücretsiz keşif ve profesyonel montaj. ☎️ ${businessConfig.contact.mobile}`,
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
    type: "website",
    locale: "tr_TR",
    siteName: "Egepen Akçayapı - PVC Pencere & Cam Balkon",
    title: `PVC Pencere Fiyatları 2026 | Egepen Akçayapı Beylikdüzü`,
    description:
      `PVC pencere, cam balkon, sineklik ve panjur fiyatları. Egepen Deceuninck yetkili bayisi. Ücretsiz keşif.`,
    url: "https://egepenakcayapi.com",
    images: [
      {
        url: "https://egepenakcayapi.com/images/og-home.jpg",
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
    description: `PVC pencere, cam balkon fiyatları. Egepen yetkili bayisi. Profesyonel montaj.`,
    images: ["https://egepenakcayapi.com/images/og-home.jpg"],
  },
  alternates: {
    canonical: "https://egepenakcayapi.com",
  },
};

/**
 * JSON-LD Schema for Homepage
 * Enhanced for Local SEO dominance
 */
const homePageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://egepenakcayapi.com/#webpage",
  url: "https://egepenakcayapi.com",
  name: `${businessConfig.name} | Beylikdüzü Egepen Deceuninck Yetkili Bayi`,
  description:
    `${businessConfig.address.district} Egepen yetkili bayisi. PVC pencere, kapı, cam balkon ve profesyonel montaj hizmeti.`,
  isPartOf: {
    "@id": "https://egepenakcayapi.com/#website",
  },
  about: {
    "@id": "https://egepenakcayapi.com/#organization",
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Ana Sayfa",
        item: "https://egepenakcayapi.com",
      },
    ],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://egepenakcayapi.com/#website",
  url: "https://egepenakcayapi.com",
  name: businessConfig.name,
  description: `${businessConfig.brand} yetkili bayisi - Beylikdüzü`,
  publisher: {
    "@id": "https://egepenakcayapi.com/#organization",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: "https://egepenakcayapi.com/ara?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

/**
 * SpecialtyContractor Schema for enhanced local SEO
 * Targets: construction, PVC installation, glass balcony
 */
const specialtyContractorSchema = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": "https://egepenakcayapi.com/#contractor",
  name: businessConfig.name,
  alternateName: "Egepen Akçayapı Beylikdüzü",
  description: "Beylikdüzü ve İstanbul genelinde Egepen Deceuninck yetkili bayisi olarak PVC pencere, cam balkon, sineklik, panjur ve duşakabin montaj hizmeti.",
  url: "https://egepenakcayapi.com",
  telephone: businessConfig.contact.mobile,
  address: {
    "@type": "PostalAddress",
    streetAddress: businessConfig.address.street,
    addressLocality: businessConfig.address.district,
    addressRegion: businessConfig.address.city,
    postalCode: (businessConfig.address as any).zip || "34528",
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
    businessConfig.social.youtube,
    businessConfig.social.googleMaps,
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "127",
    bestRating: "5",
    worstRating: "1",
  },
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
      {/* JSON-LD Schema Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([homePageSchema, websiteSchema, specialtyContractorSchema]),
        }}
      />

      <HeaderOptimized />

      <main id="main-content">
        {/* Hero - Ana Banner */}
        <HeroSectionOptimized />

        {/* Ürünler - Hızlı bakış */}
        <ServicesSection />

        {/* Hizmet Kartları - Detaylı */}
        <ServiceCards />

        {/* Müşteri Yorumları */}
        <TestimonialsSection />

        {/* SSS */}
        <HomepageFAQSection />

        {/* CTA */}
        <CTASection />
      </main>

      <Footer />
    </>
  );
}

