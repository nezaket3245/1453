import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { businessConfig } from "@/config/business.config";
import { SkipToContent } from "@/components/ui/SkipToContent";
import { BackToTopButton } from "@/components/ui/BackToTopButton";
import { QuickContactBar } from "@/components/ui/QuickContactBar";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { FloatingWhatsAppCTA, StickyBottomCTA } from "@/components/cta/FloatingWhatsAppCTA";
import { AnalyticsProvider } from "@/components/providers/AnalyticsProvider";



const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://akcapen-pvc.pages.dev"),
  title: {
    default: `Egepen Akçayapı | Beylikdüzü PVC Pencere & Cam Balkon`,
    template: `%s | Egepen Akçayapı`,
  },
  description: `Beylikdüzü Egepen yetkili bayisi. PVC pencere, cam balkon, sineklik ve panjur. 10 yıl garanti, ücretsiz keşif.`,
  keywords: businessConfig.seo.mainKeywords,
  authors: [{ name: businessConfig.name, url: "https://egepenakcayapi.com.tr" }],
  creator: businessConfig.name,
  publisher: businessConfig.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
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
    siteName: businessConfig.name,
    title: businessConfig.name,
    description: `${businessConfig.address.district} Egepen Yetkili Bayi - Akçayapı`,
    images: [
      {
        url: "https://akcapen-pvc.pages.dev/images/og-home.jpg",
        width: 1200,
        height: 630,
        alt: businessConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@egepenakcayapi",
    creator: "@egepenakcayapi",
    title: `${businessConfig.name} | Beylikdüzü Egepen Yetkili Bayi`,
    description: `Beylikdüzü Egepen Yetkili Bayi Akçayapı: PVC pencere, cam balkon, sineklik ve panjurda 10 yıl garanti.`,
    images: ["https://akcapen-pvc.pages.dev/images/og-home.jpg"],
  },
  alternates: {
    canonical: "https://akcapen-pvc.pages.dev",
    languages: {
      'tr-TR': 'https://akcapen-pvc.pages.dev',
    },
  },
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
  },
  other: {
    'msvalidate.01': 'bing-verification-code',
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
  "description": "Beylikdüzü ve İstanbul Avrupa yakasında Egepen Deceuninck yetkili bayisi. PVC pencere, cam balkon, sineklik, panjur ve duşakabin sistemleri satış ve montaj hizmeti. 40 yıllık tecrübe, 10 yıl garanti.",
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
    businessConfig.social.facebook,
    businessConfig.social.instagram,
    businessConfig.social.youtube,
    businessConfig.social.linkedin,
    businessConfig.social.twitter
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
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#0055a5" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="author" content="Egepen Akçayapı" />
        <meta name="copyright" content="Egepen Akçayapı - Akçayapı PVC ve Cam Balkon Sistemleri" />
        <meta name="geo.region" content="TR-34" />
        <meta name="geo.placename" content="Beylikdüzü, İstanbul" />
        <meta name="geo.position" content="40.9942125;28.6079794" />
        <meta name="ICBM" content="40.9942125, 28.6079794" />
        <meta name="rating" content="general" />
        <meta name="revisit-after" content="7 days" />
        <meta name="language" content="Turkish" />
        <meta httpEquiv="content-language" content="tr" />

        {/* Favicon Links */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />

        {/* DNS Prefetch for Performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Preload LCP Image for faster rendering */}
        <link
          rel="preload"
          as="image"
          href="/images/showroom-main.png"
          type="image/png"
          fetchPriority="high"
        />

        {/* Preload critical fonts for faster text rendering */}
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href="https://fonts.gstatic.com/s/outfit/v11/QGYyz_MVcBeNP4NjuGObqx1XmO1I4TC1C4G-EiAou6Y.woff2"
          crossOrigin="anonymous"
        />

        {/* Structured Data - Critical for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="antialiased selection:bg-primary-500 selection:text-white">
        {/* Skip to Content - Accessibility */}
        <SkipToContent />

        {/* Analytics Provider for Page Tracking */}
        <AnalyticsProvider />

        {children}

        {/* Global UI Components */}
        <BackToTopButton />
        <QuickContactBar />
        <CookieConsent />

        {/* Floating WhatsApp CTA */}
        <FloatingWhatsAppCTA />

        {/* Sticky Bottom CTA for Mobile */}
        <StickyBottomCTA />

        {/* Analytics loaded after page interaction for better performance */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Defer analytics loading until after user interaction or 3 seconds
              function loadAnalytics() {
                if (window.analyticsLoaded) return;
                window.analyticsLoaded = true;
                
                var script = document.createElement('script');
                script.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
                script.async = true;
                document.head.appendChild(script);
                
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                window.gtag = gtag;
                gtag('js', new Date());
                gtag('config', 'G-XXXXXXXXXX', { 'send_page_view': true });
              }
              
              // Load on user interaction or after 3 seconds
              ['scroll', 'click', 'touchstart', 'keydown'].forEach(function(event) {
                window.addEventListener(event, loadAnalytics, { once: true, passive: true });
              });
              setTimeout(loadAnalytics, 3000);
            `,
          }}
        />
      </body>
    </html>
  );
}
