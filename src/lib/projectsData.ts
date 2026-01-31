/**
 * Projects/Gallery Data
 * Showcase of completed projects for portfolio and social proof
 */

export interface Project {
    id: string;
    slug: string;
    title: string;
    description: string;
    category: "pvc-pencere" | "cam-balkon" | "dusakabin" | "panjur" | "sineklik" | "komple";
    location: string;
    year: string;
    images: string[];
    features: string[];
    testimonial?: {
        text: string;
        author: string;
    };
}

export const projects: Project[] = [
    {
        id: "1",
        slug: "beylikduzu-villa-pvc",
        title: "Beylikdüzü Villa - Komple PVC Doğrama",
        description: "350 m² villa için Legend serisi 80mm profil ile komple PVC pencere ve kapı montajı. Üçlü cam sistemi ile maksimum enerji verimliliği sağlandı.",
        category: "pvc-pencere",
        location: "Beylikdüzü, İstanbul",
        year: "2025",
        images: [
            "/images/projeler/pvc-pencere-apartman.png",
            "/images/pvc/pvc-pencere-yemek-odasi.jpg",
            "/images/products/legend-series.png",
        ],
        features: [
            "Legend Serisi 80mm Profil",
            "Üçlü Cam Sistemi",
            "RAL 7016 Antrasit Renk",
            "Motorlu Panjur Entegrasyonu",
            "Akıllı Ev Uyumlu",
        ],
        testimonial: {
            text: "Evimizin ısınma maliyeti yarıya düştü. Ses yalıtımı mükemmel, artık dışarıdan hiçbir ses duyulmuyor.",
            author: "Ahmet B.",
        },
    },
    {
        id: "2",
        slug: "gurpinar-cam-balkon",
        title: "Gürpınar Sitesi - Cam Balkon Projesi",
        description: "120 daireli site için katlanır cam balkon sistemi uygulaması. Tüm balkonlar aynı anda 3 ay içinde tamamlandı.",
        category: "cam-balkon",
        location: "Gürpınar, Beylikdüzü",
        year: "2025",
        images: [
            "/images/projeler/cam-balkon-rezidans.png",
            "/images/cam-balkon/cam-balkon-site-manzara.jpg",
            "/images/cam-balkon/cam-balkon-gunbatimi.jpg",
        ],
        features: [
            "8mm Temperli Cam",
            "5 Raylı Katlanır Sistem",
            "Paslanmaz Çelik Aksesuarlar",
            "Rüzgar Kilidi",
            "Çocuk Emniyet Kilidi",
        ],
        testimonial: {
            text: "Site yönetimi olarak çok memnun kaldık. Profesyonel ekip ve zamanında teslimat.",
            author: "Site Yönetimi",
        },
    },
    {
        id: "3",
        slug: "esenyurt-rezidans",
        title: "Esenyurt Rezidans - HST Sürme Sistem",
        description: "Lüks rezidans projesi için HST (Hebe-Schiebe-Tür) kaldırma-sürme kapı sistemleri. 3 metre yüksekliğinde cam paneller.",
        category: "pvc-pencere",
        location: "Esenyurt, İstanbul",
        year: "2024",
        images: [
            "/images/products/hst-series.png",
            "/images/products/zen-spirit-series.png",
        ],
        features: [
            "HST Kaldırma-Sürme Sistem",
            "3 Metre Yükseklik",
            "Motorlu Açılım",
            "Gömme Eşik",
            "Panoramik Manzara",
        ],
    },
    {
        id: "4",
        slug: "buyukcekmece-dusakabin",
        title: "Büyükçekmece Konut - Özel Duşakabin",
        description: "Modern banyo renovasyonu kapsamında özel ölçü cam duşakabin montajı. ClearShield kaplama ile kolay temizlik.",
        category: "dusakabin",
        location: "Büyükçekmece, İstanbul",
        year: "2025",
        images: [
            "/images/projeler/dusakabin-lux-banyo.png",
            "/images/dusakabin/dusakabin-siyah-kose.jpg",
            "/images/dusakabin/dusakabin-kose-buzlu-cam.jpg",
        ],
        features: [
            "8mm Temperli Güvenlik Camı",
            "ClearShield Kaplama",
            "Siyah Mat Profil",
            "Manyetik Fitil Sistemi",
            "Özel Ölçü Üretim",
        ],
        testimonial: {
            text: "Banyomuz tamamen değişti. Cam duşakabin çok şık duruyor ve temizliği çok kolay.",
            author: "Fatma H.",
        },
    },
    {
        id: "5",
        slug: "avcilar-panjur-projesi",
        title: "Avcılar Toplu Konut - Motorlu Panjur",
        description: "45 daireli toplu konut projesi için Somfy motorlu alüminyum panjur sistemi. Uzaktan kumanda ve zamanlayıcı özellikli.",
        category: "panjur",
        location: "Avcılar, İstanbul",
        year: "2024",
        images: [
            "/images/projeler/panjur-villa-montaj.png",
            "/images/panjur/panjur-motorlu-villa.jpg",
            "/images/panjur/panjur-modern-villa.jpg",
        ],
        features: [
            "Somfy Motorlu Sistem",
            "Alüminyum Dolgulu Lamel",
            "Uzaktan Kumanda",
            "Zamanlayıcı Özelliği",
            "Gizli Kutu Montaj",
        ],
    },
    {
        id: "6",
        slug: "yakuplu-ofis-cam-bolme",
        title: "Yakuplu Ofis - Cam Bölme Sistemi",
        description: "500 m² ofis alanı için modern cam bölme sistemi. Açık ofis konseptinde şeffaf ve yarı şeffaf bölmeler.",
        category: "komple",
        location: "Yakuplu, Beylikdüzü",
        year: "2025",
        images: [
            "/images/projeler/aluminyum-cephe-ofis.png",
            "/images/aluminyum/ofis-bolme-cam.png",
            "/images/aluminyum/curtain-wall-giydirme.png",
        ],
        features: [
            "10mm Temperli Cam",
            "Alüminyum Profil Sistem",
            "Akustik Yalıtım",
            "Kapı Entegrasyonu",
            "Stor Perde Opsiyonu",
        ],
    },
];

export const projectCategories = [
    { id: "all", name: "Tüm Projeler", icon: "🏗️" },
    { id: "pvc-pencere", name: "PVC Pencere", icon: "🪟" },
    { id: "cam-balkon", name: "Cam Balkon", icon: "🏠" },
    { id: "dusakabin", name: "Duşakabin", icon: "🚿" },
    { id: "panjur", name: "Panjur", icon: "🌤️" },
    { id: "komple", name: "Komple Projeler", icon: "🏢" },
];

/**
 * Helper Functions
 */
export function getProjectBySlug(slug: string): Project | undefined {
    return projects.find((project) => project.slug === slug);
}

export function getProjectsByCategory(category: string): Project[] {
    if (category === "all") return projects;
    return projects.filter((project) => project.category === category);
}
