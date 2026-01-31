/**
 * ═══════════════════════════════════════════════════════════════════════════
 * EGEPEN AKÇAYAPI - MERKEZİ VERİ BANKASI
 * ═══════════════════════════════════════════════════════════════════════════
 * Tüm ürün, hizmet, blog, SSS ve müşteri yorumları verileri
 * Son Güncelleme: 31 Ocak 2026
 */

// ═══════════════════════════════════════════════════════════════════════════
// TİP TANIMLARI
// ═══════════════════════════════════════════════════════════════════════════

export interface ProductCategory {
    id: string;
    name: string;
    slug: string;
    description: string;
    icon: string;
    image: string;
    color: string;
    featured: boolean;
}

export interface Product {
    id: string;
    categoryId: string;
    name: string;
    slug: string;
    tagline: string;
    description: string;
    longDescription: string;
    image: string;
    gallery: string[];
    features: string[];
    benefits: string[];
    specs: Record<string, string>;
    price?: string;
    seoKeywords: string[];
}

export interface Service {
    id: string;
    name: string;
    slug: string;
    description: string;
    icon: string;
    price: string;
    duration: string;
    keywords: string[];
}

export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    image: string;
    category: string;
    author: string;
    date: string;
    readTime: string;
    tags: string[];
}

export interface FAQ {
    id: string;
    question: string;
    answer: string;
    category: string;
}

export interface Testimonial {
    id: string;
    name: string;
    location: string;
    rating: number;
    comment: string;
    date: string;
    product: string;
    avatar?: string;
}

export interface GalleryItem {
    id: string;
    title: string;
    description: string;
    image: string;
    category: string;
    location: string;
    date: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// ÜRÜN KATEGORİLERİ
// ═══════════════════════════════════════════════════════════════════════════

export const productCategories: ProductCategory[] = [
    {
        id: "pvc-pencere",
        name: "PVC Pencere & Kapı",
        slug: "pvc-pencere",
        description: "Egepen Deceuninck kalitesiyle ısı ve ses yalıtımlı PVC pencere ve kapı sistemleri.",
        icon: "🪟",
        image: "/images/pvc/pvc-pencere-yemek-odasi.jpg",
        color: "from-blue-500 to-blue-600",
        featured: true,
    },
    {
        id: "cam-balkon",
        name: "Cam Balkon Sistemleri",
        slug: "cam-balkon",
        description: "Katlanır, sürme ve Isıcamlı (Tiara Max) panoramik cam balkon sistemleri.",
        icon: "🏠",
        image: "/images/cam-balkon/tiara-max-isicamli-yeni.jpg",
        color: "from-cyan-500 to-cyan-600",
        featured: true,
    },
    {
        id: "aluminyum",
        name: "Alüminyum Doğrama",
        slug: "aluminyum",
        description: "Dayanıklı ve modern alüminyum pencere, kapı ve cephe sistemleri.",
        icon: "🔲",
        image: "/images/aluminyum/thermal-break-pencere.png",
        color: "from-slate-500 to-slate-600",
        featured: true,
    },
    {
        id: "sineklik",
        name: "Sineklik Sistemleri",
        slug: "sineklik",
        description: "Pileli, sürme ve menteşeli sineklik sistemleri.",
        icon: "🦟",
        image: "/images/sineklik/menteseli-sineklik.png",
        color: "from-green-500 to-green-600",
        featured: true,
    },
    {
        id: "panjur",
        name: "Panjur Sistemleri",
        slug: "panjur",
        description: "Motorlu ve manuel alüminyum panjur sistemleri.",
        icon: "🌤️",
        image: "/images/panjur/panjur-modern-villa.jpg",
        color: "from-amber-500 to-amber-600",
        featured: false,
    },
    {
        id: "dusakabin",
        name: "Duşakabin",
        slug: "dusakabin",
        description: "Özel ölçü temperli cam duşakabin sistemleri.",
        icon: "🚿",
        image: "/images/dusakabin/dusakabin-kose-banyo.jpg",
        color: "from-indigo-500 to-indigo-600",
        featured: false,
    },
];

// ═══════════════════════════════════════════════════════════════════════════
// ÜRÜNLER
// ═══════════════════════════════════════════════════════════════════════════

export const products: Product[] = [
    // PVC PENCERE SERİLERİ
    {
        id: "legend",
        categoryId: "pvc-pencere",
        name: "Legend Serisi",
        slug: "legend-pvc-pencere",
        tagline: "Maksimum Isı Yalıtımı, Premium Performans",
        description: "80mm profil genişliği ve 6 odacıklı yapısıyla en üstün ısı yalıtımı.",
        longDescription: `Legend Serisi, Egepen Deceuninck'in amiral gemisi ürünüdür. 80mm profil genişliği ve 6 odacıklı iç yapısı sayesinde, piyasadaki en yüksek ısı yalıtım değerlerini sunar.`,
        image: "/images/products/legend-series.png",
        gallery: ["/images/pvc/pvc-surme-manzara.jpg", "/images/pvc/pvc-pencere-yemek-odasi.jpg"],
        features: ["80mm profil genişliği", "6 odacıklı yapı", "3 sıra TPE conta", "A+ enerji sınıfı", "Çelik takviyeli", "40+ renk seçeneği"],
        benefits: ["Enerji faturalarında %45 tasarruf", "Üstün ses yalıtımı", "10 yıl Egepen garantisi"],
        specs: {
            "Profil Genişliği": "80 mm",
            "Odacık Sayısı": "6",
            "Conta Sistemi": "3 Conta (TPE)",
            "Isı Yalıtımı": "Uw ≤ 0.95 W/m²K",
            "Hava Sızdırmazlık": "Class 4",
            "Su Sızdırmazlık": "9A (600 Pa)",
            "Rüzgar Dayanımı": "Class C5",
            "Ses Yalıtımı": "45 dB",
        },
        seoKeywords: ["Legend PVC pencere", "80mm profil", "6 odacık PVC", "enerji tasarruflu pencere"],
    },

    {
        id: "fusion",
        categoryId: "pvc-pencere",
        name: "Fusion Serisi",
        slug: "fusion-pvc-pencere",
        tagline: "Ekonomik Çözüm, Kaliteli Performans",
        description: "70mm profil genişliği ile ekonomik ancak kaliteli seçenek.",
        longDescription: `Fusion Serisi, bütçe dostu fiyatıyla kaliteden ödün vermeyen projeler için ideal çözümdür.`,
        image: "/images/products/fusion-series.png",
        gallery: [],
        features: ["70mm kompakt profil", "5 odacıklı yapı", "Ekonomik seçenek", "Kolay montaj"],
        benefits: ["Uygun bütçe", "Yeterli ısı yalıtımı", "Hızlı teslimat"],
        specs: {
            "Profil Genişliği": "70 mm",
            "Odacık Sayısı": "5",
            "Isı Yalıtımı": "Uw ≤ 1.2 W/m²K",
            "Ses Yalıtımı": "38 dB",
        },
        seoKeywords: ["Fusion PVC", "ekonomik pencere", "70mm profil"],
    },
    {
        id: "legend-art",
        categoryId: "pvc-pencere",
        name: "Legend Art Sistemi",
        slug: "legend-art-pvc-pencere",
        tagline: "Zarif Tasarımın Mükemmel Performans ile Buluşması",
        description: "70mm profil genişliği ve modern çizgileriyle estetik ve şıklığı ön plana çıkaran sistem.",
        longDescription: `LegendArt Pencere ve Kapı Sistemi, en ince ayrıntısına kadar düşünülmüş mükemmel tasarımıyla mekanlarınızın tarzına uyum sağlayarak estetik ve şıklığı ön plana çıkartmaktadır. Zarif ince kulak tasarımı sayesinde kalın cam kullanımına olanak sağlayarak pencere ısı yalıtımında 0,9 W/m²K'nin altında performans sunmaktadır.`,
        image: "/images/pvc/pvc-pencere-yemek-odasi.jpg",
        gallery: [],
        features: ["70mm profil genişliği", "5 odacıklı yapı", "Zarif ince kulak tasarımı", "Modern ve zarif çizgiler"],
        benefits: ["Pencere ısı yalıtımında 0.9 W/m²K altı performans", "Estetik ve şık görünüm", "Yüksek akustik yalıtım"],
        specs: {
            "Profil Genişliği": "70 mm",
            "Odacık Sayısı": "5",
            "Isı Yalıtımı": "Uf: 1.1 - 1.3 W/m²K",
            "Ses Yalıtımı": "42 dB",
        },
        seoKeywords: ["Legend Art PVC", "Zarif pencere", "Egepen Legend Art"],
    },
    {
        id: "zendow",
        categoryId: "pvc-pencere",
        name: "Zendow Sistemi",
        slug: "zendow-pvc-pencere",
        tagline: "Geleceğin Pencere ve Kapı Sistemi",
        description: "70mm profil genişliği ve 5 odacıklı yapısıyla mükemmel tasarım ve çevre dostu üretim.",
        longDescription: `Zendow PVC Pencere ve Kapı Sistemi, mükemmel tasarımı ve estetik özellikleriyle mekanlarınızın tarzına zahmetsizce uyum sağlar. 5 odacıklı tasarımı ve 70 mm genişliği ile ısı yalıtımı açısından mükemmel bir performansa sahiptir.`,
        image: "/images/pvc/pvc-kis-bahcesi.jpg",
        gallery: [],
        features: ["70mm profil genişliği", "5 odacıklı yapı", "Üstün ses yalıtımı", "%100 geri dönüştürülebilir"],
        benefits: ["Yüksek ısı yalıtımı", "Estetik görünüm", "Çevre dostu", "10 yıl garanti"],
        specs: {
            "Profil Genişliği": "70 mm",
            "Odacık Sayısı": "5",
            "Isı Yalıtımı": "Uf: 1.3 - 1.4 W/m²K",
            "Ses Yalıtımı": "40 dB",
        },
        seoKeywords: ["Zendow PVC", "Egepen Zendow", "70mm pencere"],
    },
    {
        id: "zen-spirit",
        categoryId: "pvc-pencere",
        name: "Zen Spirit Serisi",
        slug: "zen-spirit-pvc-pencere",
        tagline: "Minimal Estetik, Maksimum Işık",
        description: "Ultra ince çerçeve tasarımı ile maksimum cam alanı ve doğal ışık.",
        longDescription: `Zen Spirit Serisi, minimal tasarım anlayışını benimseyen modern evler için ideal çözümdür. Ultra ince görünür çerçeveleri sayesinde daha fazla doğal ışık sağlar ve panoramik görünüm sunar.`,
        image: "/images/products/zen-spirit-series.png",
        gallery: ["/images/pvc/pvc-surme-manzara.jpg", "/images/pvc/pvc-villa-surme-gece.jpg"],
        features: ["Ultra ince çerçeve", "Panoramik görünüm", "Modern tasarım", "Yüksek cam alanı", "Minimal profil"],
        benefits: ["Daha fazla doğal ışık", "Modern ve şık görünüm", "Geniş manzara keyfi"],
        specs: {
            "Profil Genişliği": "72 mm",
            "Odacık Sayısı": "5",
            "Görünür Çerçeve": "Ultra İnce",
            "Isı Yalıtımı": "Uw ≤ 1.1 W/m²K",
            "Ses Yalıtımı": "40 dB",
        },
        seoKeywords: ["Zen Spirit PVC", "minimal pencere", "ince çerçeve pencere", "modern tasarım"],
    },
    {
        id: "hst-surme",
        categoryId: "pvc-pencere",
        name: "HST Sürme Sistem",
        slug: "hst-surme-pvc-kapi",
        tagline: "Büyük Açıklıklar, Kolay Kullanım",
        description: "Kaldır-Kaydır sistemi ile büyük cam panelleri zahmetsizce sürdürün.",
        longDescription: `HST (Hebe-Schiebe-Tür) Sürme Sistemi, büyük cam panellerini kolayca açıp kapama imkanı sunar. Balkon kapıları, teras geçişleri ve geniş açıklıklar için ideal çözümdür.`,
        image: "/images/products/hst-series.png",
        gallery: ["/images/pvc/pvc-surme-salon.jpg", "/images/pvc/pvc-kis-bahcesi.jpg"],
        features: ["Kaldır-Kaydır mekanizma", "Büyük panel boyutları", "Kolay kullanım", "Hava sızdırmaz", "Çocuk kilidi"],
        benefits: ["Geniş geçiş alanı", "İç-dış bütünleşme", "Ergonomik kullanım"],
        specs: {
            "Panel Genişliği": "Maks. 3000 mm",
            "Panel Yüksekliği": "Maks. 2700 mm",
            "Panel Ağırlığı": "Maks. 400 kg",
            "Isı Yalıtımı": "Uw ≤ 1.3 W/m²K",
        },
        seoKeywords: ["HST sürme kapı", "kaldır kaydır sistem", "büyük cam kapı"],
    },
    {
        id: "legend-slide",
        categoryId: "pvc-pencere",
        name: "Legend Slide Serisi",
        slug: "legend-slide-pvc-surme",
        tagline: "Premium Sürme, Premium Performans",
        description: "Legend serisinin sürme versiyonu ile üstün yalıtım ve kolay kullanım.",
        longDescription: `Legend Slide, Legend serisinin tüm üstün özelliklerini sürme sistemler için sunar. Büyük cam panelleri, kolay kullanım ve mükemmel yalıtım bir arada.`,
        image: "/images/products/legend-slide-series.png",
        gallery: [],
        features: ["80mm profil", "Sürme mekanizma", "6 odacık", "Maksimum yalıtım"],
        benefits: ["Alan tasarrufu", "Kolay kullanım", "Enerji tasarrufu"],
        specs: {
            "Profil Genişliği": "80 mm",
            "Odacık Sayısı": "6",
            "Isı Yalıtımı": "Uw ≤ 1.1 W/m²K",
        },
        seoKeywords: ["Legend Slide", "sürme PVC pencere", "premium sürme sistem"],
    },
    // ALÜMİNYUM DOĞRAMA
    {
        id: "thermal-break-aluminyum",
        categoryId: "aluminyum",
        name: "Thermal Break Alüminyum",
        slug: "thermal-break-aluminyum",
        tagline: "Isı Yalıtımlı Alüminyum Performansı",
        description: "Polyamid köprü ile termal kırılma sağlayan alüminyum profil sistemi.",
        longDescription: `Thermal Break teknolojisi, alüminyum profilin iç ve dış yüzeyleri arasına polyamid köprü yerleştirerek ısı geçişini minimuma indirir.`,
        image: "/images/aluminyum/thermal-break-pencere.png",
        gallery: [],
        features: ["Polyamid köprü", "Yüksek ısı yalıtımı", "RAL renk seçenekleri", "Geniş cam alanı"],
        benefits: ["Enerji tasarrufu", "Modern estetik", "Dayanıklılık"],
        specs: {
            "Profil Tipi": "Thermal Break",
            "Isı Yalıtımı": "Uw ≤ 1.4 W/m²K",
            "Renk Seçenekleri": "RAL kataloğu",
        },
        seoKeywords: ["thermal break alüminyum", "ısı yalıtımlı alüminyum", "alüminyum pencere"],
    },
    {
        id: "giydirme-cephe",
        categoryId: "aluminyum",
        name: "Giydirme Cephe Sistemi",
        slug: "giydirme-cephe",
        tagline: "Modern Bina Cephelerinin Tercihi",
        description: "Cam ve alüminyum ile modern mimari cephe çözümleri.",
        longDescription: `Giydirme cephe (Curtain Wall) sistemleri, modern binaların dış cephelerinde kullanılan, yapısal olmayan cephe kaplama sistemleridir.`,
        image: "/images/aluminyum/curtain-wall-giydirme.png",
        gallery: [],
        features: ["Yapısal silikon", "Görünür çerçevesiz", "Su drenaj sistemi", "Modüler tasarım"],
        benefits: ["Estetik görünüm", "Hızlı montaj", "Bakım kolaylığı"],
        specs: {
            "Cam Kalınlığı": "24mm - 40mm",
            "Panel Boyutu": "Projeye özel",
            "Rüzgar Dayanımı": "Hesaplanır",
        },
        seoKeywords: ["giydirme cephe", "curtain wall", "cam cephe"],
    },
    // CAM BALKON
    {
        id: "katlanir-cam-balkon",
        categoryId: "cam-balkon",
        name: "Katlanır Cam Balkon",
        slug: "katlanir-cam-balkon",
        tagline: "Tam Açılım, Maksimum Manzara",
        description: "8mm veya 10mm temperli cam ile tam katlanır sistem.",
        longDescription: `Katlanır cam balkon sistemleri, balkonunuzu tamamen açmanıza olanak tanır. Panoramik manzara keyfi yaşayın.`,
        image: "/images/cam-balkon/tiara-max-isicamli-yeni.jpg",
        gallery: [],
        features: ["Temiz hava", "Kolay kullanım", "Paslanmaz aksesuarlar", "Rüzgar kilidi"],
        benefits: ["Balkonunuzu 4 mevsim kullanın", "Panoramik görüş", "Kolay temizlik"],
        specs: {
            "Cam Kalınlığı": "8mm / 10mm",
            "Cam Tipi": "Temperli Güvenlik Camı",
            "Ray Sistemi": "Paslanmaz Çelik",
            "Maks. Panel Yüksekliği": "3000 mm",
        },
        seoKeywords: ["katlanır cam balkon", "cam balkon Beylikdüzü", "temperli cam balkon"],
    },
    // SİNEKLİK
    {
        id: "pileli-sineklik",
        categoryId: "sineklik",
        name: "Pileli (Plise) Sineklik",
        slug: "pileli-sineklik",
        tagline: "Şık Tasarım, Kolay Kullanım",
        description: "Akordeon tarzı katlanan, şık ve modern sineklik sistemi.",
        longDescription: `Pileli sineklik, kullanılmadığında minimal alan kaplar ve şık görünümüyle evinize değer katar.`,
        image: "/images/sineklik/yatay-plise-sineklik.png",
        gallery: [],
        features: ["Akordeon katlanma", "Raydan çıkmaz", "Şık tasarım", "Kolay temizlik"],
        benefits: ["Minimum alan kaplar", "Her pencereye uygun", "Uzun ömürlü"],
        specs: {
            "Tül Tipi": "Fiberglass",
            "Profil": "Alüminyum",
            "Maks. Genişlik": "2500 mm",
        },
        seoKeywords: ["pileli sineklik", "plise sineklik", "sineklik montajı"],
    },
    {
        id: "menteseli-sineklik",
        categoryId: "sineklik",
        name: "Menteşeli Sineklik",
        slug: "menteseli-sineklik",
        tagline: "Klasik Çözüm, Kolay Geçiş",
        description: "Kapı gibi açılır kapanır, balkon ve giriş kapıları için ideal sineklik.",
        longDescription: `Menteşeli sineklik, balkon kapıları ve sık kullanılan geçiş alanları için pratik çözümdür. Güçlü yapısı ile uzun ömürlü kullanım sağlar.`,
        image: "/images/sineklik/menteseli-sineklik.png",
        gallery: [],
        features: ["Kapı tipi açılım", "Güçlü yapı", "Otomatik kapanma", "Mıknatıslı kilitleme"],
        benefits: ["Kolay geçiş", "Sağlam ve dayanıklı", "Sık kullanıma uygun"],
        specs: {
            "Tül Tipi": "Fiberglass",
            "Profil": "Alüminyum",
            "Maks. Genişlik": "1200 mm",
        },
        seoKeywords: ["menteşeli sineklik", "kapı sineklik", "balkon sinekliği"],
    },
    {
        id: "surme-sineklik",
        categoryId: "sineklik",
        name: "Sürme Sineklik",
        slug: "surme-sineklik",
        tagline: "Yana Kayan Pratik Çözüm",
        description: "Sürme pencere ve kapılar için ray üzerinde kayan sineklik sistemi.",
        longDescription: `Sürme sineklik, sürme pencere ve kapılarla mükemmel uyum sağlar. Ray sistemi üzerinde kayarak açılıp kapanır.`,
        image: "/images/sineklik/surme-sineklik.jpg",
        gallery: [],
        features: ["Ray sistemi", "Kolay kaydırma", "Uyumlu tasarım", "Hava geçişi"],
        benefits: ["Sürme sistemlerle uyumlu", "Sessiz kullanım", "Uzun ömür"],
        specs: {
            "Tül Tipi": "Fiberglass",
            "Profil": "Alüminyum",
            "Ray Tipi": "Alt-üst ray",
        },
        seoKeywords: ["sürme sineklik", "kayar sineklik", "pencere sinekliği"],
    },
    {
        id: "kedi-sinekligi",
        categoryId: "sineklik",
        name: "Kedi Sinekliği (Pet Screen)",
        slug: "kedi-sinekligi",
        tagline: "Evcil Dostlarınız İçin Güvenli",
        description: "Yırtılmaya dayanıklı, evcil hayvan dostu özel tül sineklik.",
        longDescription: `Kedi sinekliği, evcil hayvan sahipleri için tasarlanmış, yırtılmaya karşı ekstra dayanıklı tül yapısına sahiptir. Kedilerin tırmalamalarına karşı koruma sağlar.`,
        image: "/images/sineklik/kedi-sinekligi.jpg",
        gallery: [],
        features: ["Yırtılmaz tül", "Pet-proof malzeme", "UV dayanımı", "Kolay temizlik"],
        benefits: ["Evcil hayvan güvenliği", "Uzun ömürlü", "Hava geçirgen"],
        specs: {
            "Tül Tipi": "Pet Screen (Polyester)",
            "Dayanıklılık": "7x güçlü",
            "UV Dayanımı": "Yüksek",
        },
        seoKeywords: ["kedi sinekliği", "pet screen", "evcil hayvan sineklik"],
    },
    // PANJUR
    {
        id: "motorlu-panjur",
        categoryId: "panjur",
        name: "Motorlu Panjur",
        slug: "motorlu-panjur",
        tagline: "Tek Tuşla Konfor",
        description: "Uzaktan kumandalı motorlu alüminyum panjur sistemi.",
        longDescription: `Motorlu panjur sistemleri, tek tuşla güneş kontrolü ve mahremiyet sağlar. Akıllı ev sistemleriyle entegre edilebilir.`,
        image: "/images/panjur/panjur-motorlu-villa.jpg",
        gallery: [],
        features: ["Uzaktan kumanda", "Somfy/Mosel motor", "Poliüretan dolgulu lamel", "Gürültüsüz çalışma"],
        benefits: ["Enerji tasarrufu", "Güvenlik", "Rahatlık"],
        specs: {
            "Motor": "Somfy / Mosel",
            "Lamel": "Alüminyum + Poliüretan",
            "Kontrol": "Uzaktan Kumanda / Akıllı Ev",
        },
        seoKeywords: ["motorlu panjur", "otomatik panjur", "Somfy panjur"],
    },
    // DUŞAKABİN
    {
        id: "kose-dusakabin",
        categoryId: "dusakabin",
        name: "Köşe Duşakabin",
        slug: "kose-dusakabin",
        tagline: "Modern Banyo, Şık Tasarım",
        description: "90x90 veya özel ölçü köşe duşakabin sistemleri.",
        longDescription: `Temperli cam ve paslanmaz profil ile üretilen köşe duşakabinler, banyonuza modern bir dokunuş katar.`,
        image: "/images/dusakabin/dusakabin-siyah-kose.jpg",
        gallery: [],
        features: ["Temperli cam", "Özel ölçü", "Siyah/Krom/Gold profil", "Kolay temizlik"],
        benefits: ["Modern görünüm", "Su sızdırmaz", "Hijyenik"],
        specs: {
            "Cam Kalınlığı": "6mm / 8mm",
            "Profil": "Paslanmaz Eloksal",
            "Ölçüler": "Özel üretim",
        },
        seoKeywords: ["duşakabin", "köşe duşakabin", "temperli cam duşakabin"],
    },
];

// ═══════════════════════════════════════════════════════════════════════════
// TAMİRAT HİZMETLERİ
// ═══════════════════════════════════════════════════════════════════════════

export const repairServices: Service[] = [
    {
        id: "ispanyolet-degisimi",
        name: "İspanyolet Değişimi",
        slug: "ispanyolet-degisimi",
        description: "Pencere ve kapı kilit mekanizmalarının profesyonel değişimi.",
        icon: "🔐",
        price: "250₺'den başlayan",
        duration: "30-45 dakika",
        keywords: ["ispanyolet değişimi", "pencere kilidi tamiri", "PVC kilit"],
    },
    {
        id: "fitil-yenileme",
        name: "Fitil Yenileme",
        slug: "fitil-yenileme",
        description: "Sertleşen veya çatlayan pencere contalarının yenilenmesi.",
        icon: "🧊",
        price: "150₺/metre",
        duration: "1-2 saat",
        keywords: ["fitil yenileme", "pencere contası", "yalıtım fitili"],
    },
    {
        id: "isi-cam-degisimi",
        name: "Isı Cam Değişimi",
        slug: "isi-cam-degisimi",
        description: "Kırık veya buğulanan çift camların değişimi.",
        icon: "🪟",
        price: "300₺/m²",
        duration: "1-3 saat",
        keywords: ["ısı cam değişimi", "çift cam tamiri", "cam buğulanması"],
    },
    {
        id: "mekanizma-onarimi",
        name: "Mekanizma Onarımı",
        slug: "mekanizma-onarimi",
        description: "Menteşe, kol ve açma-kapama mekanizması tamiri.",
        icon: "⚙️",
        price: "200₺'den başlayan",
        duration: "30-60 dakika",
        keywords: ["pencere mekanizması", "menteşe değişimi", "kol tamiri"],
    },
    {
        id: "panjur-tamiri",
        name: "Panjur Tamiri",
        slug: "panjur-tamiri",
        description: "Panjur kayışı, motor ve lamel değişimi.",
        icon: "🌤️",
        price: "150₺'den başlayan",
        duration: "30 dk - 2 saat",
        keywords: ["panjur tamiri", "panjur kayışı", "motorlu panjur servisi"],
    },
];

// ═══════════════════════════════════════════════════════════════════════════
// BLOG YAZILARI
// ═══════════════════════════════════════════════════════════════════════════

export const blogPosts: BlogPost[] = [
    {
        id: "1",
        title: "PVC Pencere Alırken Nelere Dikkat Etmeli?",
        slug: "pvc-pencere-secimi",
        excerpt: "Evinize yeni pencere alırken sadece fiyata değil, ısı yalıtımı ve profil kalınlığına da bakmalısınız.",
        content: `PVC pencere seçerken dikkat etmeniz gereken en önemli faktörler...`,
        image: "/images/blog/blog-pvc-enerji.png",
        category: "Rehber",
        author: "Akçayapı Ekibi",
        date: "2026-01-25",
        readTime: "5 dk",
        tags: ["PVC pencere", "pencere seçimi", "ısı yalıtımı"],
    },
    {
        id: "2",
        title: "Cam Balkon Bakımı Nasıl Yapılır?",
        slug: "cam-balkon-bakimi",
        excerpt: "Cam balkon sistemlerinizin ömrünü uzatmak için yapmanız gereken basit bakım ipuçları.",
        content: `Cam balkon sistemlerinizin uzun ömürlü olması için düzenli bakım şart...`,
        image: "/images/cam-balkon/cam-balkon-sehir-manzara.jpg",
        category: "Bakım",
        author: "Akçayapı Ekibi",
        date: "2026-01-12",
        readTime: "4 dk",
        tags: ["cam balkon", "bakım", "temizlik"],
    },
    {
        id: "4",
        title: "Kışa Hazırlık: Pencere Yalıtımı Kontrol Listesi",
        slug: "kis-pencere-yalitimi",
        excerpt: "Kış gelmeden önce pencerelerinizi kontrol edin, enerji tasarrufu sağlayın.",
        content: `Kış aylarında enerji faturalarınızı düşürmek için pencere yalıtımı kritik öneme sahip...`,
        image: "/images/pvc/pvc-servis-egepen.jpg",
        category: "Mevsimsel",
        author: "Akçayapı Ekibi",
        date: "2025-11-15",
        readTime: "4 dk",
        tags: ["kış", "yalıtım", "enerji tasarrufu"],
    },
    {
        id: "5",
        title: "Sineklik Seçerken Bilmeniz Gerekenler",
        slug: "sineklik-secimi-rehberi",
        excerpt: "Pileli mi, sürme mi, menteşeli mi? Evinize en uygun sineklik sistemini belirleyin.",
        content: `Sineklik sistemleri arasındaki farkları ve hangisinin size uygun olduğunu anlatıyoruz...`,
        image: "/images/sineklik/yatay-plise-sineklik.png",
        category: "Rehber",
        author: "Akçayapı Ekibi",
        date: "2025-05-20",
        readTime: "5 dk",
        tags: ["sineklik", "pileli sineklik", "rehber"],
    },
];

// ═══════════════════════════════════════════════════════════════════════════
// SSS (SIKÇA SORULAN SORULAR)
// ═══════════════════════════════════════════════════════════════════════════

export const faqs: FAQ[] = [
    {
        id: "1",
        question: "PVC pencere ömrü ne kadardır?",
        answer: "Kaliteli bir PVC pencere, doğru bakımla 30-40 yıl sorunsuz kullanılabilir. Egepen Deceuninck profilleri özellikle UV dayanımı ve renk kalıcılığı açısından üstün performans gösterir.",
        category: "PVC Pencere",
    },

    {
        id: "3",
        question: "Cam balkon kışın kullanılabilir mi?",
        answer: "Evet, cam balkon sistemleri kışın rüzgar ve yağmuru engeller, balkonunuzu bir oda havasında kullanmanızı sağlar. Isıtılmış cam seçeneği ile daha da konforlu olabilir.",
        category: "Cam Balkon",
    },
    {
        id: "4",
        question: "Montaj süresi ne kadar?",
        answer: "Standart bir daire için PVC pencere montajı 1-2 gün, cam balkon montajı ise yarım gün ile 1 gün arasında tamamlanır.",
        category: "Montaj",
    },
    {
        id: "5",
        question: "Ödeme seçenekleri nelerdir?",
        answer: "Nakit, kredi kartı ve 12 aya varan taksit seçenekleri sunuyoruz. Projenize özel ödeme planı için bizimle iletişime geçin.",
        category: "Ödeme",
    },
    {
        id: "6",
        question: "Garanti kapsamı nedir?",
        answer: "Egepen Deceuninck profilleri 10 yıl fabrika garantisi ile gelir. Montaj işçiliğimiz için 2 yıl garanti sağlıyoruz.",
        category: "Garanti",
    },
    {
        id: "7",
        question: "Ücretsiz keşif yapıyor musunuz?",
        answer: "Evet, Beylikdüzü, Büyükçekmece, Esenyurt ve çevre ilçelerde ücretsiz keşif ve fiyat teklifi hizmeti sunuyoruz.",
        category: "Hizmet",
    },
    {
        id: "8",
        question: "Eski pencerelerimi ne yapıyorsunuz?",
        answer: "Sökülen eski pencerelerinizi ücretsiz olarak kaldırıyoruz. Çevreye duyarlı geri dönüşüm politikamız gereği uygun şekilde bertaraf ediyoruz.",
        category: "Hizmet",
    },
];

// ═══════════════════════════════════════════════════════════════════════════
// MÜŞTERİ YORUMLARI
// ═══════════════════════════════════════════════════════════════════════════

export const testimonials: Testimonial[] = [
    {
        id: "1",
        name: "Ahmet Yılmaz",
        location: "Gürpınar, Beylikdüzü",
        rating: 5,
        comment: "Legend serisi PVC pencereler evi bambaşka yaptı. Kış aylarında fark hemen hissediliyor, hem ısınma faturası düştü hem de ses yalıtımı mükemmel.",
        date: "2024-01-15",
        product: "PVC Pencere - Legend",
    },
    {
        id: "2",
        name: "Fatma Demir",
        location: "Yakuplu, Beylikdüzü",
        rating: 5,
        comment: "Cam balkon montajı çok hızlı ve temiz yapıldı. Artık balkonumuzu kış aylarında da kullanabiliyoruz. Teşekkürler Akçayapı!",
        date: "2024-02-20",
        product: "Cam Balkon",
    },
    {
        id: "3",
        name: "Mehmet Kaya",
        location: "Büyükçekmece",
        rating: 5,
        comment: "Alüminyum doğrama istedik, hem kaliteli hem de uygun fiyatlı bir çözüm sundular. Ekip çok profesyonel.",
        date: "2024-03-10",
        product: "Alüminyum Doğrama",
    },
    {
        id: "4",
        name: "Ayşe Özkan",
        location: "Gürpınar, Beylikdüzü",
        rating: 5,
        comment: "Motorlu panjur sistemleri hayatımı kolaylaştırdı. Uzaktan kumandayla kontrol edebilmek harika. Bakımı da çok kolay.",
        date: "2024-05-12",
        product: "Panjur",
    },
    {
        id: "5",
        name: "Ali Çelik",
        location: "Esenyurt",
        rating: 4,
        comment: "Pileli sineklik taktırdık, hem şık hem de kullanışlı. Yaz aylarında haşerelerden korunuyoruz.",
        date: "2024-06-18",
        product: "Sineklik",
    },
    {
        id: "6",
        name: "Zeynep Arslan",
        location: "Kavaklı, Beylikdüzü",
        rating: 5,
        comment: "Duşakabin montajı için geldiler, özel ölçü olmasına rağmen çok güzel oldu. Banyo artık çok modern görünüyor.",
        date: "2024-07-25",
        product: "Duşakabin",
    },
    {
        id: "7",
        name: "Hasan Yıldırım",
        location: "Gürpınar, Beylikdüzü",
        rating: 5,
        comment: "Zen Spirit serisi pencereleri tercih ettik. Minimal tasarımı çok beğendik, evimiz artık çok daha aydınlık.",
        date: "2025-01-10",
        product: "PVC Pencere - Zen Spirit",
    },
    {
        id: "8",
        name: "Selin Acar",
        location: "Büyükçekmece",
        rating: 5,
        comment: "HST sürme kapı sistemi teras geçişimizi muhteşem yaptı. Büyük cam paneller sayesinde iç dış bütünleşmesi harika.",
        date: "2025-02-14",
        product: "HST Sürme Kapı",
    },
    {
        id: "9",
        name: "Murat Öztürk",
        location: "Yakuplu, Beylikdüzü",
        rating: 5,
        comment: "Giydirme cephe projemizi Akçayapı ile tamamladık. Profesyonel ekip, zamanında teslimat. Kesinlikle tavsiye ederim.",
        date: "2025-03-22",
        product: "Alüminyum Doğrama",
    },
    {
        id: "10",
        name: "Elif Tan",
        location: "Avcılar",
        rating: 5,
        comment: "Kedi sinekliği taktırdık, kedilerimiz artık güvende. Yırtılmaz tül gerçekten çok kaliteli.",
        date: "2025-08-05",
        product: "Sineklik",
    },
    {
        id: "11",
        name: "Burak Şahin",
        location: "Esenyurt",
        rating: 5,
        comment: "Legend Slide sürme sistemi ile salonumuz bambaşka oldu. Hem pratik hem de çok şık görünüyor.",
        date: "2026-01-08",
        product: "PVC Pencere - Legend Slide",
    },
    {
        id: "12",
        name: "Deniz Korkmaz",
        location: "Kavaklı, Beylikdüzü",
        rating: 5,
        comment: "Çelik kepenk sistemimiz mükemmel çalışıyor. Güvenlik konusunda artık içimiz rahat.",
        date: "2026-01-15",
        product: "Panjur",
    },
];

// ═══════════════════════════════════════════════════════════════════════════
// GALERİ
// ═══════════════════════════════════════════════════════════════════════════

export const galleryItems: GalleryItem[] = [
    {
        id: "1",
        title: "Villa Projesi - Legend Serisi",
        description: "Beylikdüzü'nde lüks villa projesi için Legend serisi PVC pencere uygulaması.",
        image: "/images/pvc/pvc-surme-manzara.jpg",
        category: "pvc-pencere",
        location: "Beylikdüzü",
        date: "2024-03",
    },
    {
        id: "2",
        title: "Panoramik Cam Balkon",
        description: "Marmara manzaralı daire için panoramik cam balkon uygulaması.",
        image: "/images/cam-balkon/tiara-max-isicamli-yeni.jpg",
        category: "cam-balkon",
        location: "Gürpınar",
        date: "2024-02",
    },
    {
        id: "3",
        title: "Modern Ofis Cephesi",
        description: "Büyükçekmece'de modern ofis binası alüminyum cephe uygulaması.",
        image: "/images/aluminyum/curtain-wall-giydirme.png",
        category: "aluminyum",
        location: "Büyükçekmece",
        date: "2024-01",
    },
    {
        id: "4",
        title: "Rezidans Projesi",
        description: "300+ daire için Legend Art serisi toplu montaj projesi.",
        image: "/images/pvc/pvc-pencere-yemek-odasi.jpg",
        category: "pvc-pencere",
        location: "Esenyurt",
        date: "2023-12",
    },
    {
        id: "5",
        title: "Villa Cam Balkon",
        description: "Müstakil villa için full katlanır cam balkon sistemi.",
        image: "/images/cam-balkon/tiara-max-isicamli-yeni.jpg",
        category: "cam-balkon",
        location: "Beylikdüzü",
        date: "2024-04",
    },
    {
        id: "6",
        title: "Motorlu Panjur Uygulaması",
        description: "Somfy motorlu panjur sistemi ile akıllı ev entegrasyonu.",
        image: "/images/panjur/panjur-motorlu-villa.jpg",
        category: "panjur",
        location: "Yakuplu",
        date: "2024-05",
    },
    {
        id: "7",
        title: "Pileli Sineklik Montajı",
        description: "10 daire için toplu pileli sineklik montajı.",
        image: "/images/sineklik/yatay-plise-sineklik.png",
        category: "sineklik",
        location: "Kavaklı",
        date: "2024-06",
    },
    {
        id: "8",
        title: "Modern Duşakabin",
        description: "Siyah profilli frameless duşakabin uygulaması.",
        image: "/images/dusakabin/dusakabin-siyah-kose.jpg",
        category: "dusakabin",
        location: "Gürpınar",
        date: "2024-07",
    },
    {
        id: "9",
        title: "HST Sürme Kapı",
        description: "Teras geçişi için HST sürme kapı sistemi montajı.",
        image: "/images/products/hst-series.png",
        category: "pvc-pencere",
        location: "Büyükçekmece",
        date: "2024-08",
    },
    {
        id: "10",
        title: "Köşe Cam Balkon",
        description: "90 derece köşe uygulamalı özel cam balkon projesi.",
        image: "/images/cam-balkon/cam-balkon-kose.jpg",
        category: "cam-balkon",
        location: "Avcılar",
        date: "2024-09",
    },
];

// ═══════════════════════════════════════════════════════════════════════════
// YARDIMCI FONKSİYONLAR
// ═══════════════════════════════════════════════════════════════════════════

export const getProductById = (id: string) => products.find(p => p.id === id);
export const getProductBySlug = (slug: string) => products.find(p => p.slug === slug);
export const getProductsByCategory = (categoryId: string) => products.filter(p => p.categoryId === categoryId);
export const getCategoryById = (id: string) => productCategories.find(c => c.id === id);
export const getCategoryBySlug = (slug: string) => productCategories.find(c => c.slug === slug);
export const getFeaturedCategories = () => productCategories.filter(c => c.featured);
export const getBlogPostBySlug = (slug: string) => blogPosts.find(p => p.slug === slug);
export const getFAQsByCategory = (category: string) => faqs.filter(f => f.category === category);
export const getTestimonialsByProduct = (product: string) => testimonials.filter(t => t.product.includes(product));
export const getGalleryByCategory = (category: string) => galleryItems.filter(g => g.category === category);
