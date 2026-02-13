import { MetadataRoute } from "next";

export const dynamic = "force-static";
import { pvcProductSeries } from "@/lib/pvcData";
import { blogPosts } from "@/lib/blogData";
import { products } from "@/lib/data";
import { glassSystems } from "@/lib/camBalkonData";
import { sineklikSystems } from "@/lib/sineklikData";
import { aluminumSystems } from "@/lib/aluminumData";
import { panjurSystems } from "@/lib/panjurData";
import { dusakabinSystems } from "@/lib/dusakabinData";
import { businessConfig } from "@/config/business.config";

const baseUrl = businessConfig.siteUrl;
const lastMod = new Date('2026-02-12');

export default function sitemap(): MetadataRoute.Sitemap {
    // Ana sayfalar
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: lastMod,
            changeFrequency: "weekly",
            priority: 1.0,
        },
        {
            url: `${baseUrl}/hakkimizda`,
            lastModified: lastMod,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/hizmetler`,
            lastModified: lastMod,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/tamir-bakim`,
            lastModified: lastMod,
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/urunler`,
            lastModified: lastMod,
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/projeler`,
            lastModified: lastMod,
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: lastMod,
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/sss`,
            lastModified: lastMod,
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/iletisim`,
            lastModified: lastMod,
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/teklif-al`,
            lastModified: lastMod,
            changeFrequency: "monthly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/gizlilik-politikasi`,
            lastModified: lastMod,
            changeFrequency: "yearly",
            priority: 0.3,
        },
        // Kategori hub sayfaları
        {
            url: `${baseUrl}/pvc-sistemleri`,
            lastModified: lastMod,
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/cam-balkon-sistemleri`,
            lastModified: lastMod,
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/sineklik-sistemleri`,
            lastModified: lastMod,
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/aluminyum-sistemleri`,
            lastModified: lastMod,
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/panjur-kepenk-sistemleri`,
            lastModified: lastMod,
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/dusakabin-sistemleri`,
            lastModified: lastMod,
            changeFrequency: "weekly",
            priority: 0.9,
        },
    ];

    // PVC Ürün Detay Sayfaları
    const pvcProductPages: MetadataRoute.Sitemap = pvcProductSeries.map((product) => ({
        url: `${baseUrl}/pvc-sistemleri/${product.slug}`,
        lastModified: lastMod,
        changeFrequency: "monthly" as const,
        priority: 0.8,
    }));

    // Genel Ürün Kategori Sayfaları (slug'lar doğrudan rota ile eşleşiyor)
    const productPages: MetadataRoute.Sitemap = products.map((product) => ({
        url: `${baseUrl}/${product.slug}`,
        lastModified: lastMod,
        changeFrequency: "weekly" as const,
        priority: 0.9,
    }));

    // Blog Sayfaları
    const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "monthly" as const,
        priority: 0.6,
    }));

    // Cam Balkon Sistemleri Detay Sayfaları
    const glassSystemPages: MetadataRoute.Sitemap = glassSystems.map((system) => ({
        url: `${baseUrl}/cam-balkon-sistemleri/${system.slug}`,
        lastModified: lastMod,
        changeFrequency: "monthly" as const,
        priority: 0.8,
    }));

    // Sineklik Sistemleri Detay Sayfaları
    const sineklikPages: MetadataRoute.Sitemap = sineklikSystems.map((system) => ({
        url: `${baseUrl}/sineklik-sistemleri/${system.slug}`,
        lastModified: lastMod,
        changeFrequency: "monthly" as const,
        priority: 0.8,
    }));

    // Alüminyum Detay Sayfaları
    const aluminumDetailPages: MetadataRoute.Sitemap = aluminumSystems.map((system) => ({
        url: `${baseUrl}/aluminyum-sistemleri/${system.slug}`,
        lastModified: lastMod,
        changeFrequency: "monthly" as const,
        priority: 0.8,
    }));

    // Panjur & Kepenk Detay Sayfaları
    const panjurDetailPages: MetadataRoute.Sitemap = panjurSystems.map((system) => ({
        url: `${baseUrl}/panjur-kepenk-sistemleri/${system.slug}`,
        lastModified: lastMod,
        changeFrequency: "monthly" as const,
        priority: 0.8,
    }));

    // Duşakabin Detay Sayfaları
    const dusakabinDetailPages: MetadataRoute.Sitemap = dusakabinSystems.map((system) => ({
        url: `${baseUrl}/dusakabin-sistemleri/${system.slug}`,
        lastModified: lastMod,
        changeFrequency: "monthly" as const,
        priority: 0.8,
    }));

    return [
        ...staticPages,
        ...productPages,
        ...pvcProductPages,
        ...blogPages,
        ...glassSystemPages,
        ...sineklikPages,
        ...aluminumDetailPages,
        ...panjurDetailPages,
        ...dusakabinDetailPages
    ];
}
