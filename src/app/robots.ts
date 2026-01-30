import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
    const baseUrl = "https://egepenakcayapi.com.tr";

    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: [
                    "/api/",
                    "/_next/",
                    "/admin/",
                    "/*.json$",
                ],
            },
            {
                userAgent: "Googlebot",
                allow: "/",
                crawlDelay: 1,
            },
            {
                userAgent: "Bingbot",
                allow: "/",
                crawlDelay: 2,
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
        host: baseUrl,
    };
}
