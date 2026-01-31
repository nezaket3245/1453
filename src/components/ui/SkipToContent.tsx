"use client";

/**
 * SkipToContent Component
 * 
 * Accessibility feature for keyboard users.
 * Allows skipping directly to main content.
 */
export function SkipToContent() {
    return (
        <a
            href="#main-content"
            title="Ana içeriğe atla"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-lg focus:shadow-lg focus:outline-none"
        >
            Ana içeriğe geç
        </a>
    );
}
