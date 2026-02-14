/**
 * Centralized Product Categories Data
 * 
 * Single source of truth for all product categories used in
 * navigation, services grid, SEO product grid, and forms.
 * 
 * Replaces scattered category definitions across the codebase
 * to enforce DRY principle.
 */

import type { ProductCategory } from "@/types";

export interface ProductCategoryData {
    id: string;
    slug: string;
    href: string;
    name: string;
    shortName: string;
    description: string;
    icon: string;
    image: string;
    imageAlt: string;
    badge?: string;
    features: string[];
    cta: string;
    /** SEO-optimized keywords for this category */
    keywords: string[];
}

/**
 * All product categories — authoritative source
 */
export const productCategories: ProductCategoryData[] = [
    {
        id: "pvc-pencere",
        slug: "pvc-sistemleri",
        href: "/pvc-sistemleri",
        name: "PVC Doğrama & Pencere Sistemleri",
        shortName: "PVC Pencere & Kapı",
        description:
            "Egepen Deceuninck Legend ve Zen Spirit serileriyle A+ enerji sınıfı PVC doğrama çözümleri. 80mm profil, 6 odacık, üçlü cam seçeneği.",
        icon: "🪟",
        image: "/images/projeler/pvc-pencere-apartman.png",
        imageAlt:
            "PVC doğrama pencere sistemleri - Egepen Deceuninck Legend serisi Beylikdüzü montaj",
        badge: "Egepen Yetkili Bayi",
        features: [
            "Legend Serisi: 80mm, 6 odacıklı profil",
            "Isı yalıtımı: Uw 0.78 W/m²K",
            "Egepen resmi yetkili bayi güvencesi",
        ],
        cta: "PVC Doğrama Çözümlerini İncele",
        keywords: [
            "pvc pencere fiyatları",
            "egepen pvc pencere",
            "pvc doğrama",
        ],
    },
    {
        id: "cam-balkon",
        slug: "cam-balkon-sistemleri",
        href: "/cam-balkon-sistemleri",
        name: "Cam Balkon Sistemleri",
        shortName: "Cam Balkon",
        description:
            "Isıcamlı, sürme ve katlanır cam balkon modelleri. Temperli güvenlik camı, paslanmaz profil ve rüzgar kilidi ile 4 mevsim konfor.",
        icon: "🏠",
        image: "/images/projeler/cam-balkon-rezidans.png",
        imageAlt:
            "Cam balkon sistemleri - ısıcamlı sürme ve katlanır cam balkon Beylikdüzü",
        badge: "En Çok Tercih Edilen",
        features: [
            "Eşikli & eşiksiz sürme seçenekleri",
            "8mm / 10mm temperli Şişecam",
            "Su tahliye kanallı & rüzgar kilitli",
        ],
        cta: "Cam Balkon Modellerini Gör",
        keywords: [
            "cam balkon fiyatları",
            "ısıcamlı cam balkon",
            "cam balkon m2 fiyat",
        ],
    },
    {
        id: "sineklik",
        slug: "sineklik-sistemleri",
        href: "/sineklik-sistemleri",
        name: "Sineklik Sistemleri",
        shortName: "Sineklik",
        description:
            "Plise (pileli), menteşeli, sürme ve stor sineklik çözümleri. Kedi sinekliği (Pet Screen) ile evcil hayvan güvenliği.",
        icon: "🦟",
        image: "/images/sineklik/yatay-plise-sineklik.png",
        imageAlt:
            "Sineklik sistemleri - plise pileli sineklik ve kedi sinekliği Beylikdüzü montaj",
        features: [
            "Plise, sürme ve menteşeli modeller",
            "Kedi sinekliği: 7x dayanıklı tül",
            "Fiberglass & Anti-Dust tül seçenekleri",
        ],
        cta: "Sineklik Çeşitlerini İncele",
        keywords: [
            "sineklik fiyatları",
            "plise sineklik",
            "kedi sinekliği",
        ],
    },
    {
        id: "panjur-kepenk",
        slug: "panjur-kepenk-sistemleri",
        href: "/panjur-kepenk-sistemleri",
        name: "Panjur & Kepenk Sistemleri",
        shortName: "Panjur",
        description:
            "Motorlu alüminyum panjur, Egepen Storbox monoblok ve çelik kepenk. Somfy motor, güvenlik kilidi ve tam karartma özelliği.",
        icon: "🌤️",
        image: "/images/projeler/panjur-villa-montaj.png",
        imageAlt:
            "Panjur kepenk sistemleri - motorlu alüminyum panjur ve Egepen Storbox Beylikdüzü",
        features: [
            "Somfy / Mosel motorlu otomasyon",
            "Poliüretan dolgulu alüminyum lamel",
            "Hırsızlığa karşı emniyet kilidi",
        ],
        cta: "Panjur Modellerini Gör",
        keywords: [
            "panjur fiyatları",
            "motorlu panjur",
            "egepen storbox",
        ],
    },
    {
        id: "dusakabin",
        slug: "dusakabin-sistemleri",
        href: "/dusakabin-sistemleri",
        name: "Duşakabin Sistemleri",
        shortName: "Duşakabin",
        description:
            "Özel ölçü temperli cam duşakabin montajı. Siyah, gold ve krom profil seçenekleri. Walk-in, köşe giriş ve pivot kapı modelleri.",
        icon: "🚿",
        image: "/images/projeler/dusakabin-lux-banyo.png",
        imageAlt:
            "Duşakabin sistemleri - özel ölçü temperli cam duşakabin modern banyo tasarımı",
        features: [
            "6mm / 8mm temperli güvenlik camı",
            "ClearShield leke tutmaz teknoloji",
            "Siyah, gold ve krom profil seçeneği",
        ],
        cta: "Duşakabin Modellerini İncele",
        keywords: [
            "duşakabin fiyatları",
            "temperli cam duşakabin",
            "cam duş kabini",
        ],
    },
    {
        id: "aluminyum",
        slug: "aluminyum-sistemleri",
        href: "/aluminyum-sistemleri",
        name: "Alüminyum Doğrama Sistemleri",
        shortName: "Alüminyum Doğrama",
        description:
            "Isı yalıtımlı alüminyum pencere, giydirme cephe, ofis bölme ve sürme sistemleri. Ticari ve endüstriyel projeler için ideal.",
        icon: "🔧",
        image: "/images/aluminyum/curtain-wall-giydirme.png",
        imageAlt:
            "Alüminyum doğrama sistemleri - ısı yalıtımlı pencere ve giydirme cephe İstanbul",
        features: [
            "Thermal break ısı yalıtımlı profil",
            "Giydirme cephe & yapısal silikon",
            "Hebe-Schiebe sürme sistemleri",
        ],
        cta: "Alüminyum Sistemleri İncele",
        keywords: [
            "alüminyum doğrama",
            "giydirme cephe",
            "alüminyum pencere",
        ],
    },
];

/**
 * Returns category by ID
 */
export function getCategoryById(id: string): ProductCategoryData | undefined {
    return productCategories.find((c) => c.id === id);
}

/**
 * Returns category by slug
 */
export function getCategoryBySlug(slug: string): ProductCategoryData | undefined {
    return productCategories.find((c) => c.slug === slug);
}

/**
 * Returns categories for form dropdowns (id + label pairs)
 */
export function getCategoryOptions(): { id: string; label: string; icon: string }[] {
    return productCategories.map((c) => ({
        id: c.id,
        label: c.shortName,
        icon: c.icon,
    }));
}
