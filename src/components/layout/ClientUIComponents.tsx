"use client";

import dynamic from "next/dynamic";

/**
 * ClientUIComponents
 * 
 * Global client-side UI widgets loaded with ssr: false.
 * Floating WhatsApp & Sticky CTA removed — all communication
 * funneled through the dedicated İletişim page.
 */

const BackToTopButton = dynamic(
  () => import("@/components/ui/BackToTopButton").then((mod) => ({ default: mod.BackToTopButton })),
  { ssr: false }
);

const CookieConsent = dynamic(
  () => import("@/components/ui/CookieConsent").then((mod) => ({ default: mod.CookieConsent })),
  { ssr: false }
);

const AnalyticsProvider = dynamic(
  () => import("@/components/providers/AnalyticsProvider").then((mod) => ({ default: mod.AnalyticsProvider })),
  { ssr: false }
);

export function ClientUIComponents() {
  return (
    <>
      {/* Analytics Provider */}
      <AnalyticsProvider />

      {/* Global UI Components */}
      <BackToTopButton />
      <CookieConsent />
    </>
  );
}
