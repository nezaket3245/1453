import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CTASection } from "@/components/sections/CTASection";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { LocalShowroomSection } from "@/components/sections/LocalShowroomSection";
import { ProjectsGallerySection } from "@/components/sections/ProjectsGallerySection";
import { HomepageFAQSection } from "@/components/sections/FAQAccordion";
import { StickyQuoteCTA } from "@/components/ui/StickyQuoteCTA";
import { BeforeAfterGallery } from "@/components/sections/BeforeAfterGallery";
import { GoogleReviewsWidget } from "@/components/ui/GoogleReviewsWidget";
import { InteractiveCatalog } from "@/components/ui/InteractiveCatalog";
import { ServiceCards } from "@/components/sections/ServiceCards";
import { EgepenShowroom } from "@/components/sections/EgepenShowroom";
import { businessConfig } from "@/config/business.config";



/**
 * Homepage Metadata
 * SEO-optimized with high-value Turkish keywords from businessConfig
 * Targeting: "Beylikdüzü PVC", "Egepen Bayi", "Cam Balkon"
 */
export const metadata: Metadata = {
  title: `Egepen Akçayapı | Beylikdüzü PVC Pencere & Cam Balkon`,
  description:
    `Beylikdüzü Egepen yetkili bayisi. PVC pencere, cam balkon, sineklik, panjur. 10 yıl garanti, ücretsiz keşif. ${businessConfig.contact.mobile}`,
  keywords: [
    ...businessConfig.seo.mainKeywords,
    "Beylikdüzü cam balkon",
    "Gürpınar PVC pencere",
    "İstanbul Egepen bayi",
    "ısı yalıtımlı pencere",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: `Egepen Akçayapı | Beylikdüzü PVC & Cam Balkon`,
    description:
      `Beylikdüzü Egepen bayisi. PVC pencere, cam balkon montajı. 10 yıl garanti.`,
    url: "https://akcapen-pvc.pages.dev",
    images: [
      {
        url: "https://akcapen-pvc.pages.dev/images/og-home.jpg",
        width: 1200,
        height: 630,
        alt: `${businessConfig.name} - Egepen Bayi Beylikdüzü`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@egepenakcayapi",
    creator: "@egepenakcayapi",
    title: `Egepen Akçayapı | Beylikdüzü PVC & Cam Balkon`,
    description: `Beylikdüzü Egepen bayisi. PVC pencere, cam balkon. 10 yıl garanti.`,
    images: ["https://akcapen-pvc.pages.dev/images/og-home.jpg"],
  },
  alternates: {
    canonical: "https://akcapen-pvc.pages.dev",
  },
};

/**
 * JSON-LD Schema for Homepage
 * Enhanced for Local SEO dominance
 */
const homePageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://akcapen-pvc.pages.dev/#webpage",
  url: "https://akcapen-pvc.pages.dev",
  name: `${businessConfig.name} | Beylikdüzü Egepen Deceuninck Yetkili Bayi`,
  description:
    `${businessConfig.address.district} Egepen yetkili bayisi. PVC pencere, kapı, cam balkon ve profesyonel montaj hizmeti.`,
  isPartOf: {
    "@id": "https://akcapen-pvc.pages.dev/#website",
  },
  about: {
    "@id": "https://akcapen-pvc.pages.dev/#organization",
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Ana Sayfa",
        item: "https://akcapen-pvc.pages.dev",
      },
    ],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://akcapen-pvc.pages.dev/#website",
  url: "https://akcapen-pvc.pages.dev",
  name: businessConfig.name,
  description: `${businessConfig.brand} yetkili bayisi - Beylikdüzü`,
  publisher: {
    "@id": "https://akcapen-pvc.pages.dev/#organization",
  },
  potentialAction: {
    "@type": "SearchAction",
    target: "https://akcapen-pvc.pages.dev/ara?q={search_term_string}",
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
  "@id": "https://akcapen-pvc.pages.dev/#contractor",
  name: businessConfig.name,
  alternateName: "Egepen Akçayapı Beylikdüzü",
  description: "Beylikdüzü ve İstanbul genelinde Egepen Deceuninck yetkili bayisi olarak PVC pencere, cam balkon, sineklik, panjur ve duşakabin montaj hizmeti.",
  url: "https://akcapen-pvc.pages.dev",
  telephone: businessConfig.contact.mobile,
  email: businessConfig.contact.email,
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
    businessConfig.social.facebook,
    businessConfig.social.instagram,
    businessConfig.social.youtube,
    businessConfig.social.linkedin,
    businessConfig.social.twitter
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
 * Optimized for Lighthouse 90+ score
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
          __html: JSON.stringify(homePageSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(specialtyContractorSchema),
        }}
      />

      {/* Header */}
      <Header />

      {/* Main Content - F-Pattern optimized */}
      <main id="main-content" role="main">
        {/* Hero Section - Above the fold, critical for LCP */}
        {/* Contains: Clear headline "Beylikdüzü Yetkili Egepen Bayisi" */}
        {/* Contains: "Ücretsiz Keşif" CTA button prominently */}
        <HeroSection />

        {/* Services Section - Quick overview */}
        <ServicesSection />

        {/* Egepen Product Showroom - Premium product showcase */}
        <EgepenShowroom />

        {/* Service Cards - Detailed with Features, Warranty, Get Price CTA */}
        <ServiceCards />

        {/* Interactive Catalog - Digital PDF viewer & product grid */}
        <InteractiveCatalog />

        {/* Why Choose Us - Competitive Edge */}
        <WhyChooseUsSection />

        {/* Features Section */}
        <FeaturesSection />

        {/* Before/After Gallery - Visual proof for Beylikdüzü */}
        <BeforeAfterGallery />

        {/* Projects Gallery - Visual Trust */}
        <ProjectsGallerySection />

        {/* Testimonials Section */}
        <TestimonialsSection />

        {/* Local Showroom & Map */}
        <LocalShowroomSection />

        {/* FAQ Section */}
        <HomepageFAQSection />

        {/* CTA Section */}
        <CTASection />
      </main>

      {/* Footer with Service Areas */}
      <Footer />

      {/* Sticky CTA - High Conversion */}
      <StickyQuoteCTA />

      {/* Google Reviews Widget - Floating social proof */}
      <GoogleReviewsWidget />
    </>
  );
}

