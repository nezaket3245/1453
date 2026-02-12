/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ANALYTICS UTILITY - GA4 & META PIXEL INTEGRATION
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Modular analytics utility for tracking user interactions.
 * Supports Google Analytics 4 (GA4) and Meta Pixel (Facebook).
 * 
 * Usage:
 * - analytics.trackPageView('/pvc-sistemleri')
 * - analytics.trackEvent('button_click', { button_name: 'Fiyat Teklifi Al' })
 * - analytics.trackLead({ source: 'contact_form', product: 'Legend' })
 */

// Type definitions for analytics events
export interface AnalyticsEvent {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  [key: string]: string | number | boolean | undefined;
}

export interface LeadData {
  source: string;
  product?: string;
  city?: string;
  phone?: string;
  name?: string;
}

// GA4 Configuration — Set NEXT_PUBLIC_GA4_ID env variable to enable
const GA4_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_ID || '';

// Meta Pixel Configuration — Set NEXT_PUBLIC_META_PIXEL_ID env variable to enable
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || '';

/**
 * Check if window is available (client-side)
 */
const isClient = typeof window !== 'undefined';

/**
 * Google Analytics 4 tracking functions
 */
const ga4 = {
  /**
   * Initialize GA4 (called once on app load)
   */
  init: () => {
    if (!isClient) return;
    
    // GA4 is loaded via script tag in layout.tsx
    window.dataLayer = window.dataLayer || [];
  },

  /**
   * Track page view
   */
  pageView: (url: string, title?: string) => {
    if (!isClient || !window.gtag) return;
    
    window.gtag('config', GA4_MEASUREMENT_ID, {
      page_path: url,
      page_title: title,
    });
  },

  /**
   * Track custom event
   */
  event: (eventName: string, params?: Record<string, unknown>) => {
    if (!isClient || !window.gtag) return;
    
    window.gtag('event', eventName, params);
  },
};

/**
 * Meta Pixel (Facebook) tracking functions
 */
const metaPixel = {
  /**
   * Initialize Meta Pixel
   */
  init: () => {
    if (!isClient) return;
    
    // Skip if already initialized
    if (window.fbq) return;

    // Meta Pixel base code
    const fbq = function(...args: unknown[]) {
      if ((fbq as FacebookPixel).callMethod) {
        (fbq as FacebookPixel).callMethod!.apply(fbq, args);
      } else {
        (fbq as FacebookPixel).queue.push(args);
      }
    } as FacebookPixel;
    
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = '2.0';
    fbq.queue = [];
    
    window.fbq = fbq;
    
    // Initialize with Pixel ID
    window.fbq('init', META_PIXEL_ID);
    window.fbq('track', 'PageView');
  },

  /**
   * Track page view
   */
  pageView: () => {
    if (!isClient || !window.fbq) return;
    window.fbq('track', 'PageView');
  },

  /**
   * Track custom event
   */
  event: (eventName: string, params?: Record<string, unknown>) => {
    if (!isClient || !window.fbq) return;
    window.fbq('track', eventName, params);
  },

  /**
   * Track lead event
   */
  lead: (data: LeadData) => {
    if (!isClient || !window.fbq) return;
    window.fbq('track', 'Lead', {
      content_name: data.product || 'Egepen PVC',
      content_category: data.source,
      city: data.city,
    });
  },
};

/**
 * Unified Analytics API
 */
export const analytics = {
  /**
   * Initialize all analytics services
   */
  init: () => {
    ga4.init();
    metaPixel.init();
  },

  /**
   * Track page view across all platforms
   */
  trackPageView: (url: string, title?: string) => {
    ga4.pageView(url, title);
    metaPixel.pageView();
  },

  /**
   * Track custom event across all platforms
   */
  trackEvent: (eventName: string, params?: Record<string, unknown>) => {
    // GA4 event
    ga4.event(eventName, params);
    
    // Meta Pixel event (map to standard events where applicable)
    const metaEventMap: Record<string, string> = {
      'button_click': 'ViewContent',
      'form_start': 'InitiateCheckout',
      'form_submit': 'Lead',
      'catalog_download': 'ViewContent',
      'whatsapp_click': 'Contact',
      'phone_click': 'Contact',
    };
    
    const metaEvent = metaEventMap[eventName] || eventName;
    metaPixel.event(metaEvent, params);
  },

  /**
   * Track lead generation (form submissions, quote requests)
   */
  trackLead: (data: LeadData) => {
    // GA4 lead event
    ga4.event('generate_lead', {
      lead_source: data.source,
      product_interest: data.product,
      city: data.city,
    });

    // Meta Pixel lead event
    metaPixel.lead(data);
  },

  /**
   * Track "Fiyat Teklifi Al" button click
   */
  trackQuoteRequest: (product?: string, location?: string) => {
    const params = {
      button_name: 'Fiyat Teklifi Al',
      product_category: product || 'Genel',
      page_location: location || window?.location?.pathname,
    };

    ga4.event('quote_request_click', params);
    metaPixel.event('Lead', params);
  },

  /**
   * Track catalog download
   */
  trackCatalogDownload: (catalogName: string, productLine?: string) => {
    const params = {
      catalog_name: catalogName,
      product_line: productLine,
      file_type: 'PDF',
    };

    ga4.event('file_download', params);
    metaPixel.event('ViewContent', params);
  },

};

// TypeScript declarations for global objects
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: FacebookPixel;
  }
}

interface FacebookPixel {
  (...args: unknown[]): void;
  push: (...args: unknown[]) => void;
  callMethod?: (...args: unknown[]) => void;
  loaded: boolean;
  version: string;
  queue: unknown[];
}

export default analytics;
