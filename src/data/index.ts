/**
 * ═══════════════════════════════════════════════════════════════════════════
 * EGEPEN AKÇAYAPI - MERKEZİ VERİ BANKASI
 * ═══════════════════════════════════════════════════════════════════════════
 * Tüm ürün, hizmet, blog, SSS ve müşteri yorumları verileri
 * Son Güncelleme: 29 Ocak 2026
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
        description: "Katlanır, sürme ve panoramik cam balkon sistemleri.",
        icon: "🏠",
        image: "/images/cam-balkon/cam-balkon-sehir-manzara.jpg",
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
        id: "evolution",
        categoryId: "pvc-pencere",
        name: "Evolution Serisi",
        slug: "evolution-pvc-pencere",
        tagline: "Estetik Tasarım, Güçlü Performans",
        description: "76mm profil genişliği ile modern estetik ve yüksek yalıtım.",
        longDescription: `Evolution Serisi, görsel estetiği ön plana çıkaran tasarımıyla dikkat çeker. İnce çerçeve tasarımı ile daha fazla cam alanı sağlar.`,
        image: "/images/products/evolution-series.png",
        gallery: [],
        features: ["76mm profil genişliği", "5 odacıklı yapı", "İnce çerçeve tasarımı", "Modern görünüm"],
        benefits: ["Daha fazla doğal ışık", "Uygun fiyat/performans", "Geniş renk seçenekleri"],
        specs: {
            "Profil Genişliği": "76 mm",
            "Odacık Sayısı": "5",
            "Isı Yalıtımı": "Uw ≤ 1.1 W/m²K",
            "Ses Yalıtımı": "42 dB",
        },
        seoKeywords: ["Evolution PVC", "76mm profil", "modern pencere"],
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
    // CAM BALKON
    {
        id: "katlanir-cam-balkon",
        categoryId: "cam-balkon",
        name: "Katlanır Cam Balkon",
        slug: "katlanir-cam-balkon",
        tagline: "Tam Açılım, Maksimum Manzara",
        description: "8mm veya 10mm temperli cam ile tam katlanır sistem.",
        longDescription: `Katlanır cam balkon sistemleri, balkonunuzu tamamen açmanıza olanak tanır. Panoramik manzara keyfi yaşayın.`,
        image: "/images/cam-balkon/cam-balkon-bahce-manzara.jpg",
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
        image: "/images/dusakabin/dusakabin-siyah-profil-genis.jpg",
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
        id: "3",
        title: "Egepen Legend vs Evolution: Hangisi Size Uygun?",
        slug: "legend-vs-evolution",
        excerpt: "İki popüler Egepen serisini karşılaştırarak ihtiyaçlarınıza en uygun olanı seçin.",
        content: `Legend ve Evolution serileri arasındaki farkları detaylı inceledik...`,
        image: "/images/products/evolution-series.png",
        category: "Karşılaştırma",
        author: "Akçayapı Ekibi",
        date: "2026-01-05",
        readTime: "6 dk",
        tags: ["Legend", "Evolution", "karşılaştırma"],
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
        id: "2",
        question: "Legend ve Evolution serisi arasındaki fark nedir?",
        answer: "Legend serisi 80mm profil genişliği ve 6 odacık ile maksimum ısı yalıtımı sağlarken, Evolution serisi 76mm profil ile daha ince görünüm ve ekonomik fiyat sunar.",
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
        image: "/images/cam-balkon/cam-balkon-sehir-manzara.jpg",
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
        description: "300+ daire için Evolution serisi toplu montaj projesi.",
        image: "/images/pvc/pvc-pencere-yemek-odasi.jpg",
        category: "pvc-pencere",
        location: "Esenyurt",
        date: "2023-12",
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
