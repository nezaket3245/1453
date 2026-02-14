import { MetadataRoute } from "next";

export const dynamic = "force-static";

/**
 * Robots.txt Configuration
 * Optimized for SEO crawling and indexing
 */
export default function robots(): MetadataRoute.Robots {
    const baseUrl = "https://egepenakcayapi.com";

    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: [
                    "/api/",
                    "/_next/",
                    "/admin/",
                    "/private/",
                    "/*.json$",
                    "/404",
                    "/500",
                ],
            },
            {
                // Google gets full access
                userAgent: "Googlebot",
                allow: "/",
                crawlDelay: 1,
            },
            {
                // Google Images
                userAgent: "Googlebot-Image",
                allow: ["/images/", "/"],
            },
            {
                userAgent: "Bingbot",
                allow: "/",
                crawlDelay: 2,
            },
            {
                userAgent: "Yandex",
                allow: "/",
                crawlDelay: 2,
            },
            {
                // Block AI scrapers that don't respect robots.txt properly
                userAgent: "GPTBot",
                disallow: "/",
            },
            {
                userAgent: "ChatGPT-User",
                disallow: "/",
            },
            {
                userAgent: "CCBot",
                disallow: "/",
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
        host: baseUrl,
    };
}
