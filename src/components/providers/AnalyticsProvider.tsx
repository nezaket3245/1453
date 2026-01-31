"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { analytics } from "@/lib/analytics";

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ANALYTICS PROVIDER COMPONENT
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Self-contained component for automatic page view tracking
 * and analytics initialization. Does not require children.
 */

function AnalyticsTracking() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize analytics on mount
  useEffect(() => {
    analytics.init();
  }, []);

  // Track page views on route change
  useEffect(() => {
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");
    analytics.trackPageView(url);
  }, [pathname, searchParams]);

  return null;
}

export function AnalyticsProvider() {
  return (
    <Suspense fallback={null}>
      <AnalyticsTracking />
    </Suspense>
  );
}

export default AnalyticsProvider;
