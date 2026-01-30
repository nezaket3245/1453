import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { businessConfig } from "@/config/business.config";
import { SkipToContent } from "@/components/ui/SkipToContent";
import { BackToTopButton } from "@/components/ui/BackToTopButton";
import { QuickContactBar } from "@/components/ui/QuickContactBar";
import { CookieConsent } from "@/components/ui/CookieConsent";



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
  title: {
    default: `${businessConfig.name} | Beylikdüzü Egepen Deceuninck Yetkili Bayi`,
    template: `%s | ${businessConfig.name}`,
  },
  description: `${businessConfig.address.district} ve çevresinde ${businessConfig.brand} kalitesiyle PVC pencere, cam balkon ve panjur sistemleri. Ücretsiz keşif için: ${businessConfig.contact.mobile}`,
  keywords: businessConfig.seo.mainKeywords,
  authors: [{ name: businessConfig.name }],
  creator: businessConfig.name,
  publisher: businessConfig.name,
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://egepenakcayapi.com.tr",
    siteName: businessConfig.name,
    title: businessConfig.name,
    description: `${businessConfig.address.district} Egepen Yetkili Bayi - Akçayapı`,
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: businessConfig.name,
      },
    ],
  },
};

/**
 * LocalBusiness Schema - Enhanced for Local SEO
 * Targets: "Beylikdüzü PVC", "Egepen Bayi", "Cam Balkon"
 */
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
  "@id": "https://egepenakcayapi.com.tr/#organization",
  "name": businessConfig.name,
  "legalName": businessConfig.legalName,
  "alternateName": ["Egepen Akçayapı", "Akçayapı PVC", "Egepen Beylikdüzü"],
  "description": "Beylikdüzü ve İstanbul Avrupa yakasında Egepen Deceuninck yetkili bayisi. PVC pencere, cam balkon, sineklik, panjur ve duşakabin sistemleri satış ve montaj hizmeti. 25 yıllık tecrübe, 10 yıl garanti.",
  "image": "https://egepenakcayapi.com.tr/images/hero-bg.jpg",
  "logo": "https://egepenakcayapi.com.tr/images/logo.svg",
  "url": "https://egepenakcayapi.com.tr",
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
    "postalCode": "34520",
    "addressCountry": "TR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": businessConfig.address.coordinates.latitude,
    "longitude": businessConfig.address.coordinates.longitude
  },
  "areaServed": [
    { "@type": "City", "name": "Beylikdüzü" },
    { "@type": "City", "name": "Gürpınar" },
    { "@type": "City", "name": "Büyükçekmece" },
    { "@type": "City", "name": "Esenyurt" },
    { "@type": "City", "name": "Avcılar" },
    { "@type": "City", "name": "Küçükçekmece" },
    { "@type": "City", "name": "Başakşehir" }
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
    businessConfig.social.instagram
  ],
  "knowsAbout": [
    "PVC Pencere",
    "Cam Balkon",
    "Egepen Deceuninck",
    "Isı Yalıtımı",
    "Sineklik Sistemleri",
    "Panjur Sistemleri",
    "Duşakabin"
  ],
  "slogan": "Beylikdüzü'nün Yetkili Egepen Bayisi",
  "foundingDate": "1999",
  "numberOfEmployees": {
    "@type": "QuantitativeValue",
    "value": "15-25"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`${outfit.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="antialiased selection:bg-primary-500 selection:text-white">
        {/* Skip to Content - Accessibility */}
        <SkipToContent />

        {children}

        {/* Global UI Components */}
        <BackToTopButton />
        <QuickContactBar />
        <CookieConsent />

        <Analytics />
      </body>
    </html>
  );
}
