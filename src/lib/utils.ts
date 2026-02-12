/**
 * Utility Functions for the Application
 */

import { type ClassValue, clsx } from "clsx";
import { Product } from "@/types";


/**
 * Combines class names conditionally
 * Lightweight alternative to clsx when tailwind-merge isn't needed
 */
export function cn(...inputs: ClassValue[]) {
    return clsx(inputs);
}

/**
 * Formats a phone number for display
 */
export function formatPhoneNumber(phone: string): string {
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length === 10) {
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)} ${cleaned.slice(6, 8)} ${cleaned.slice(8)}`;
    }
    if (cleaned.length === 11 && cleaned.startsWith("0")) {
        return `(${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)} ${cleaned.slice(7, 9)} ${cleaned.slice(9)}`;
    }
    return phone;
}

/**
 * Formats a price for Turkish Lira display
 */
export function formatPrice(amount: number): string {
    return new Intl.NumberFormat("tr-TR", {
        style: "currency",
        currency: "TRY",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

/**
 * Truncates text to a specified length with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + "...";
}

/**
 * Generates a slug from a string
 */
export function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/ğ/g, "g")
        .replace(/ü/g, "u")
        .replace(/ş/g, "s")
        .replace(/ı/g, "i")
        .replace(/ö/g, "o")
        .replace(/ç/g, "c")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

/**
 * Calculates reading time for text content
 */
export function calculateReadingTime(text: string): number {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
}

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout | null = null;

    return function executedFunction(...args: Parameters<T>) {
        const later = () => {
            timeout = null;
            func(...args);
        };

        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(later, wait);
    };
}

/**
 * Validates an email address
 */
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validates a Turkish phone number
 */
export function isValidTurkishPhone(phone: string): boolean {
    const cleaned = phone.replace(/\D/g, "");
    // Turkish phone numbers: 10 digits starting with 5 (mobile) or 11 digits starting with 0
    return (
        (cleaned.length === 10 && /^5\d{9}$/.test(cleaned)) ||
        (cleaned.length === 11 && /^05\d{9}$/.test(cleaned)) ||
        (cleaned.length === 10 && /^[2-4]\d{9}$/.test(cleaned)) ||
        (cleaned.length === 11 && /^0[2-4]\d{9}$/.test(cleaned))
    );
}

/**
 * Gets relative time string (e.g., "2 gün önce")
 */
export function getRelativeTime(date: Date | string): string {
    const now = new Date();
    const then = new Date(date);
    const diffInSeconds = Math.floor((now.getTime() - then.getTime()) / 1000);

    const intervals = [
        { label: "yıl", seconds: 31536000 },
        { label: "ay", seconds: 2592000 },
        { label: "hafta", seconds: 604800 },
        { label: "gün", seconds: 86400 },
        { label: "saat", seconds: 3600 },
        { label: "dakika", seconds: 60 },
    ];

    for (const interval of intervals) {
        const count = Math.floor(diffInSeconds / interval.seconds);
        if (count >= 1) {
            return `${count} ${interval.label} önce`;
        }
    }

    return "Az önce";
}

/**
 * Smooth scroll to element by ID
 */
export function scrollToElement(elementId: string, offset = 80): void {
    const element = document.getElementById(elementId);
    if (element) {
        const top = element.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({
            top,
            behavior: "smooth",
        });
    }
}

/**
 * Generates SEO-friendly breadcrumb JSON-LD
 */
export function generateBreadcrumbSchema(
    items: { name: string; url: string }[]
) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };
}

/**
 * Generates SEO-friendly product JSON-LD
 */

export function generateProductSchema(product: Product) {
    return {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.name,
        "image": product.image,
        "description": product.description,
        "brand": {
            "@type": "Brand",
            "name": "Egepen"
        },
        "offers": {
            "@type": "AggregateOffer",
            "availability": "https://schema.org/InStock",
            "priceCurrency": "TRY"
        }
    };
}

/**
 * Preloads an image for better LCP
 */
export function preloadImage(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = reject;
        img.src = src;
    });
}
