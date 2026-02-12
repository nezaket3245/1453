"use client";

import dynamic from "next/dynamic";

/**
 * ClientUIComponents
 * 
 * Wraps all client-side UI components that need ssr: false.
 */

const BackToTopButton = dynamic(
  () => import("@/components/ui/BackToTopButton").then((mod) => ({ default: mod.BackToTopButton })),
  { ssr: false }
);

const CookieConsent = dynamic(
  () => import("@/components/ui/CookieConsent").then((mod) => ({ default: mod.CookieConsent })),
  { ssr: false }
);

const StickyCTA = dynamic(
  () => import("@/components/ui/StickyCTA").then((mod) => ({ default: mod.StickyCTA })),
  { ssr: false }
);

export function ClientUIComponents() {
  return (
    <>
      {/* Global UI Components */}
      <BackToTopButton />
      <CookieConsent />
      <StickyCTA />
    </>
  );
}
