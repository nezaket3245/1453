import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { businessConfig } from "@/config/business.config";
import { SkipToContent } from "@/components/ui/SkipToContent";
import { ClientUIComponents } from "@/components/layout/ClientUIComponents";

// Optimize font loading with subset and preload
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

const outfit = Outfit({
  subsets: ["latin", "latin-ext"],
  variable: "--font-outfit",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

// Viewport configuration for SEO and mobile
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0055a5",
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://akcapen-pvc.pages.dev"),
  title: {
    default: `PVC Pencere Fiyatları 2026 | Egepen Akçayapı Beylikdüzü - Resmi Yetkili Bayi`,
    template: `%s | Egepen Akçayapı - PVC Pencere & Cam Balkon Beylikdüzü`,
  },
  description: `✓ Beylikdüzü Egepen Deceuninck yetkili bayisi. PVC pencere fiyatları 2026, cam balkon m2 fiyat, sineklik ve panjur sistemleri. Ücretsiz keşif ve profesyonel montaj. ☎ 0212 880 15 07`,
  keywords: [
    // Ana anahtar kelimeler
    "pvc pencere fiyatları",
    "pvc pencere fiyatları 2026",
    "cam balkon fiyatları",
    "cam balkon m2 fiyat",
    "egepen pvc pencere",
    "egepen cam balkon",
    "egepen deceuninck bayileri",
    "istanbul pvc pencere",
    "beylikdüzü pvc pencere",
    "beylikdüzü cam balkon",
    "ısıcamlı cam balkon",
    "sineklik fiyatları",
    "panjur fiyatları",
    "duşakabin fiyatları",
    "pvc pencere montajı",
    "cam balkon montajı",
    // Long-tail anahtar kelimeler
    "egepen yetkili bayi istanbul",
    "pvc pencere değişimi",
    "cam balkon kapatma fiyatları",
  ],
  applicationName: "Egepen Akçayapı",
  authors: [{ name: businessConfig.name, url: "https://akcapen-pvc.pages.dev" }],
  creator: businessConfig.name,
  publisher: businessConfig.name,
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://akcapen-pvc.pages.dev",
    siteName: "Egepen Akçayapı - PVC Pencere & Cam Balkon",
    title: "PVC Pencere Fiyatları 2026 | Egepen Akçayapı Beylikdüzü",
    description: `Beylikdüzü Egepen Deceuninck yetkili bayisi. PVC pencere, cam balkon, sineklik ve panjur fiyatları. Ücretsiz keşif, profesyonel montaj.`,
    images: [
      {
        url: "https://akcapen-pvc.pages.dev/images/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Egepen Akçayapı - PVC Pencere ve Cam Balkon Sistemleri Beylikdüzü",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@egepenakcayapi",
    creator: "@egepenakcayapi",
    title: `PVC Pencere Fiyatları 2026 | Egepen Akçayapı Beylikdüzü`,
    description: `Beylikdüzü Egepen yetkili bayisi. PVC pencere, cam balkon, sineklik ve panjur. Ücretsiz keşif, profesyonel montaj.`,
    images: {
      url: "https://akcapen-pvc.pages.dev/images/og-home.jpg",
      alt: "Egepen Akçayapı PVC Pencere ve Cam Balkon",
    },
  },
  alternates: {
    canonical: "https://akcapen-pvc.pages.dev",
    languages: {
      "tr-TR": "https://akcapen-pvc.pages.dev",
    },
  },
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
  },
  category: "Home Improvement",
  classification: "Business",
  other: {
    "msvalidate.01": "bing-verification-code",
    "apple-mobile-web-app-title": "Egepen Akçayapı",
    "mobile-web-app-capable": "yes",
  },
};

/**
 * LocalBusiness Schema - Enhanced for Local SEO
 * Targets: "Beylikdüzü PVC", "Egepen Bayi", "Cam Balkon"
 */
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
  "@id": "https://akcapen-pvc.pages.dev/#organization",
  "name": businessConfig.name,
  "legalName": businessConfig.legalName,
  "alternateName": ["Egepen Akçayapı", "Akçayapı PVC", "Egepen Beylikdüzü"],
  "description": "Beylikdüzü ve İstanbul Avrupa yakasında Egepen Deceuninck yetkili bayisi. PVC pencere, cam balkon, sineklik, panjur ve duşakabin sistemleri satış ve montaj hizmeti.",
  "image": "https://akcapen-pvc.pages.dev/images/hero-bg.jpg",
  "logo": "https://akcapen-pvc.pages.dev/images/logo.svg",
  "url": "https://akcapen-pvc.pages.dev",
  "telephone": businessConfig.contact.mobile,
  "email": businessConfig.contact.email,
  "priceRange": "₺₺",
  "currenciesAccepted": "TRY",
  "paymentAccepted": "Cash, Credit Card, Bank Transfer",
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": businessConfig.contact.mobile,
      "contactType": "sales",
      "areaServed": "TR",
      "availableLanguage": "Turkish"
    },
    {
      "@type": "ContactPoint",
      "telephone": businessConfig.contact.landline,
      "contactType": "customer service",
      "areaServed": "TR",
      "availableLanguage": "Turkish"
    }
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": businessConfig.address.street,
    "addressLocality": businessConfig.address.district,
    "addressRegion": businessConfig.address.city,
    "postalCode": (businessConfig.address as any).zip || "34528",
    "addressCountry": "TR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": businessConfig.address.coordinates.latitude,
    "longitude": businessConfig.address.coordinates.longitude
  },
  "areaServed": [
    // Ana İlçeler
    { "@type": "City", "name": "Beylikdüzü" },
    { "@type": "City", "name": "Büyükçekmece" },
    { "@type": "City", "name": "Esenyurt" },
    { "@type": "City", "name": "Avcılar" },
    { "@type": "City", "name": "Küçükçekmece" },
    { "@type": "City", "name": "Başakşehir" },
    { "@type": "City", "name": "Silivri" },
    { "@type": "City", "name": "Çatalca" },
    // Beylikdüzü Mahalleleri
    { "@type": "Place", "name": "Gürpınar, Beylikdüzü" },
    { "@type": "Place", "name": "Yakuplu, Beylikdüzü" },
    { "@type": "Place", "name": "Kavaklı, Beylikdüzü" },
    { "@type": "Place", "name": "Adnan Kahveci, Beylikdüzü" },
    // Büyükçekmece Mahalleleri
    { "@type": "Place", "name": "Beykent, Büyükçekmece" },
    { "@type": "Place", "name": "Kumburgaz, Büyükçekmece" },
    { "@type": "Place", "name": "Mimarsinan, Büyükçekmece" },
    { "@type": "Place", "name": "Bahçelievler, Büyükçekmece" },
    { "@type": "Place", "name": "Batıköy, Büyükçekmece" },
    { "@type": "Place", "name": "Güzelce, Büyükçekmece" },
    { "@type": "Place", "name": "Alkent 2000, Büyükçekmece" },
    // Diğer Bölgeler
    { "@type": "Place", "name": "Bahçeşehir, Başakşehir" },
    { "@type": "Place", "name": "Hadımköy, Arnavutköy" }
  ],
  "hasMap": businessConfig.social.googleMaps,
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:30",
      "closes": "19:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "09:00",
      "closes": "18:00"
    }
  ],
  "sameAs": [
    businessConfig.social.instagram,
    businessConfig.social.youtube,
    businessConfig.social.googleMaps,
  ],
  "knowsAbout": [
    "PVC Pencere",
    "PVC Pencere Montajı",
    "Cam Balkon",
    "Isıcamlı Cam Balkon",
    "Egepen Deceuninck",
    "Isı Yalıtımı",
    "Sineklik Sistemleri",
    "Panjur Sistemleri",
    "Motorlu Panjur",
    "Duşakabin",
    "Alüminyum Doğrama"
  ],
  "slogan": "Beylikdüzü ve Büyükçekmece'nin Yetkili Egepen Bayisi",
  "foundingDate": "1986",
  "numberOfEmployees": {
    "@type": "QuantitativeValue",
    "value": "15-25"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "127",
    "bestRating": "5",
    "worstRating": "1"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" dir="ltr" className={`${outfit.variable} ${inter.variable}`}>
      <head>
        <meta charSet="utf-8" />
        
        {/* PWA & Mobile App Meta */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="mobile-web-app-capable" content="yes" />
        
        {/* Author & Business Info */}
        <meta name="author" content="Egepen Akçayapı" />
        <meta name="copyright" content="Egepen Akçayapı - Akçayapı PVC ve Cam Balkon Sistemleri" />
        
        {/* Geo Tags for Local SEO */}
        <meta name="geo.region" content="TR-34" />
        <meta name="geo.placename" content="Beylikdüzü, İstanbul" />
        <meta name="geo.position" content="40.9942125;28.6079794" />
        <meta name="ICBM" content="40.9942125, 28.6079794" />
        
        {/* Content Classification */}
        <meta name="rating" content="general" />
        <meta name="revisit-after" content="3 days" />
        <meta name="language" content="Turkish" />
        <meta httpEquiv="content-language" content="tr" />

        {/* Favicon Links - Optimized */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" type="image/svg+xml" href="/images/icon-192x192.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/icon-192x192.svg" />
        <link rel="manifest" href="/manifest.json" />

        {/* DNS Prefetch & Preconnect for Performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Preload LCP Image - Critical for Performance */}
        <link
          rel="preload"
          as="image"
          href="/images/showroom-main.webp"
          type="image/webp"
          fetchPriority="high"
        />

        {/* Structured Data - Critical for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />

        {/* Critical CSS for Above-the-Fold Content */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              /* Critical CSS - Minimal above-the-fold styles */
              *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
              html{scroll-behavior:smooth;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;text-size-adjust:100%}
              body{min-height:100vh;background:#fff;color:#0f172a;font-family:var(--font-outfit),var(--font-inter),system-ui,-apple-system,sans-serif;line-height:1.5;overflow-x:hidden}
              img,picture,video,canvas,svg{display:block;max-width:100%;height:auto}
              .container-custom{width:100%;max-width:1280px;margin:0 auto;padding-left:1rem;padding-right:1rem}
              @media(min-width:640px){.container-custom{padding-left:1.5rem;padding-right:1.5rem}}
              /* Focus visible for accessibility */
              :focus-visible{outline:2px solid #0055a5;outline-offset:2px}
              /* Skip link styles */
              .skip-link{position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden}
              .skip-link:focus{position:fixed;top:0;left:0;width:auto;height:auto;padding:1rem;background:#0055a5;color:#fff;z-index:9999}
              /* Prevent layout shift */
              img[loading="lazy"]{content-visibility:auto}
            `,
          }}
        />
      </head>
      <body className="antialiased selection:bg-primary-500 selection:text-white">
        {/* Skip to Content - Accessibility */}
        <SkipToContent />

        {children}

        {/* Client-side UI Components - All lazy loaded */}
        <ClientUIComponents />

        {/* Deferred Analytics - Loads after user interaction */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Defer analytics loading until after user interaction
              (function(){
                var loaded=false;
                function loadAnalytics(){
                  if(loaded)return;
                  loaded=true;
                  var s=document.createElement('script');
                  s.src='https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
                  s.async=true;
                  document.head.appendChild(s);
                  window.dataLayer=window.dataLayer||[];
                  function gtag(){dataLayer.push(arguments)}
                  window.gtag=gtag;
                  gtag('js',new Date());
                  gtag('config','G-XXXXXXXXXX',{send_page_view:true,anonymize_ip:true});
                }
                ['scroll','click','touchstart'].forEach(function(e){
                  window.addEventListener(e,loadAnalytics,{once:true,passive:true});
                });
                // Fallback: load after 4 seconds if no interaction
                setTimeout(loadAnalytics,4000);
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
