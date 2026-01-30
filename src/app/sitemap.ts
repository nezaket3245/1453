import { MetadataRoute } from "next";
import { pvcProductSeries } from "@/lib/pvcData";
import { blogPosts } from "@/lib/blogData";
import { products } from "@/lib/data";
import { glassSystems } from "@/lib/camBalkonData";
import { sineklikSystems } from "@/lib/sineklikData";
import { aluminumSystems } from "@/lib/aluminumData";
import { panjurSystems } from "@/lib/panjurData";
import { dusakabinSystems } from "@/lib/dusakabinData";

const baseUrl = "https://egepenakcayapi.com.tr";

export default function sitemap(): MetadataRoute.Sitemap {
    // Ana sayfalar
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1.0,
        },
        {
            url: `${baseUrl}/hakkimizda`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/hizmetler`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/urunler`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/pvc-sistemleri`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${baseUrl}/projeler`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${baseUrl}/sss`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/iletisim`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: `${baseUrl}/teklif-al`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.9,
        },
    ];

    // PVC Ürün Detay Sayfaları
    const pvcProductPages: MetadataRoute.Sitemap = pvcProductSeries.map((product) => ({
        url: `${baseUrl}/pvc-sistemleri/${product.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.8,
    }));

    // Genel Ürün Detay Sayfaları
    const productPages: MetadataRoute.Sitemap = products.map((product) => ({
        url: `${baseUrl}/urunler/${product.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
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
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.8,
    }));

    // Sineklik Sistemleri Detay Sayfaları
    const sineklikPages: MetadataRoute.Sitemap = sineklikSystems.map((system) => ({
        url: `${baseUrl}/sineklik-sistemleri/${system.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.8,
    }));

    // Sineklik Ana Sayfa
    const sineklikMainPage: MetadataRoute.Sitemap = [
        {
            url: `${baseUrl}/sineklik-sistemleri`,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: 0.9,
        },
    ];

    // Alüminyum Ana Sayfa ve Detay Sayfaları
    const aluminumMainPage: MetadataRoute.Sitemap = [
        {
            url: `${baseUrl}/aluminyum-sistemleri`,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: 0.9,
        },
    ];

    const aluminumDetailPages: MetadataRoute.Sitemap = aluminumSystems.map((system) => ({
        url: `${baseUrl}/aluminyum-sistemleri/${system.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.8,
    }));

    // Panjur & Kepenk Ana Sayfa ve Detay Sayfaları
    const panjurMainPage: MetadataRoute.Sitemap = [
        {
            url: `${baseUrl}/panjur-kepenk-sistemleri`,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: 0.9,
        },
    ];

    const panjurDetailPages: MetadataRoute.Sitemap = panjurSystems.map((system) => ({
        url: `${baseUrl}/panjur-kepenk-sistemleri/${system.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.8,
    }));

    // Duşakabin Ana Sayfa ve Detay Sayfaları
    const dusakabinMainPage: MetadataRoute.Sitemap = [
        {
            url: `${baseUrl}/dusakabin-sistemleri`,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: 0.9,
        },
    ];

    const dusakabinDetailPages: MetadataRoute.Sitemap = dusakabinSystems.map((system) => ({
        url: `${baseUrl}/dusakabin-sistemleri/${system.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.8,
    }));

    return [
        ...staticPages, 
        ...pvcProductPages, 
        ...productPages, 
        ...blogPages, 
        ...glassSystemPages, 
        ...sineklikMainPage, 
        ...sineklikPages,
        ...aluminumMainPage,
        ...aluminumDetailPages,
        ...panjurMainPage,
        ...panjurDetailPages,
        ...dusakabinMainPage,
        ...dusakabinDetailPages
    ];
}
