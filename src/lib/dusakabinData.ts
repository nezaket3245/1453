/**
 * Duşakabin (Shower Enclosure) Premium Data Library
 * SEO Focus: Beylikdüzü, İstanbul - Glass technology, hygiene coatings
 * Categories: Black Edition, Sliding/Corner, Hinged Luxury, Walk-in
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface GlassType {
    id: string;
    name: string;
    nameTR: string;
    thickness: number[];
    description: string;
    properties: string[];
    priceMultiplier: number;
}

export interface ProfileColor {
    id: string;
    name: string;
    nameTR: string;
    hex: string;
    coating: string;
    popular: boolean;
}

export interface ShowerShape {
    id: string;
    name: string;
    nameTR: string;
    icon: string;
    minWidth: number;
    maxWidth: number;
    description: string;
}

export interface HygieneCoating {
    id: string;
    name: string;
    technology: string;
    description: string;
    benefits: string[];
    cleaningFrequency: string;
    lifespan: string;
}

export interface DusakabinSystem {
    id: string;
    slug: string;
    name: string;
    tagline: string;
    category: 'black-edition' | 'sliding-corner' | 'hinged-luxury' | 'walk-in';
    description: string;
    longDescription: string;
    image: string;
    gallery: string[];
    features: string[];
    benefits: string[];
    technicalSpecs: { label: string; value: string; highlight?: boolean }[];
    availableGlass: string[];
    availableProfiles: string[];
    availableShapes: string[];
    priceRange: { min: number; max: number };
    installationTime: string;
    warranty: string;
    certifications: string[];
    seoKeywords: string[];
    faq: { question: string; answer: string }[];
}

// ============================================================================
// GLASS TYPE LIBRARY - Cam Tipleri
// ============================================================================

export const glassTypes: GlassType[] = [
    {
        id: 'clear',
        name: 'Clear Tempered',
        nameTR: 'Şeffaf Temperli',
        thickness: [5, 6, 8, 10],
        description: 'Kristal berraklığında, maksimum ışık geçirgenliği sağlayan premium temperli cam.',
        properties: ['%92 ışık geçirgenliği', 'UV dirençli', 'Çizilmeye karşı dayanıklı'],
        priceMultiplier: 1.0,
    },
    {
        id: 'frosted',
        name: 'Frosted (Sandblasted)',
        nameTR: 'Buzlu (Kumlama)',
        thickness: [6, 8, 10],
        description: 'Mahremiyet sağlayan mat yüzey, ışığı yumuşak bir şekilde dağıtır.',
        properties: ['Tam mahremiyet', 'Parmak izi görünmez', 'Kolay temizlik'],
        priceMultiplier: 1.15,
    },
    {
        id: 'patterned',
        name: 'Patterned Glass',
        nameTR: 'Desenli Cam',
        thickness: [6, 8],
        description: 'Dekoratif desenlerle estetik ve mahremiyet bir arada.',
        properties: ['Çeşitli desen seçenekleri', 'Yarı mahremiyet', 'Dekoratif görünüm'],
        priceMultiplier: 1.2,
    },
    {
        id: 'grey-tinted',
        name: 'Grey Tinted',
        nameTR: 'Füme Cam',
        thickness: [6, 8, 10],
        description: 'Şık gri tonlarıyla modern ve sofistike bir atmosfer.',
        properties: ['Modern görünüm', '%60 ışık geçirgenliği', 'Anti-glare özellik'],
        priceMultiplier: 1.25,
    },
    {
        id: 'bronze-tinted',
        name: 'Bronze Tinted',
        nameTR: 'Bronz Cam',
        thickness: [6, 8, 10],
        description: 'Sıcak bronz tonları ile lüks ve şık banyo tasarımları.',
        properties: ['Sıcak tonlar', 'Lüks görünüm', 'UV filtreli'],
        priceMultiplier: 1.3,
    },
    {
        id: 'extra-clear',
        name: 'Extra Clear (Low-Iron)',
        nameTR: 'Ekstra Şeffaf (Düşük Demir)',
        thickness: [8, 10],
        description: 'Yeşil ton içermeyen, kristal berraklığında ultra premium cam.',
        properties: ['Yeşilimsi ton yok', '%95 ışık geçirgenliği', 'Gerçek renk yansıtma'],
        priceMultiplier: 1.4,
    },
];

// ============================================================================
// PROFILE COLOR OPTIONS - Profil Renkleri
// ============================================================================

export const profileColors: ProfileColor[] = [
    { id: 'matte-black', name: 'Matte Black', nameTR: 'Mat Siyah', hex: '#1a1a1a', coating: 'Elektrostatik toz boya', popular: true },
    { id: 'chrome', name: 'Chrome', nameTR: 'Krom', hex: '#C0C0C0', coating: 'Galvanik krom kaplama', popular: true },
    { id: 'brushed-nickel', name: 'Brushed Nickel', nameTR: 'Fırçalanmış Nikel', hex: '#9A9A9A', coating: 'PVD kaplama', popular: false },
    { id: 'gold', name: 'Gold', nameTR: 'Altın', hex: '#D4AF37', coating: 'PVD titanyum kaplama', popular: false },
    { id: 'rose-gold', name: 'Rose Gold', nameTR: 'Rose Gold', hex: '#B76E79', coating: 'PVD bakır kaplama', popular: false },
    { id: 'white', name: 'White', nameTR: 'Beyaz', hex: '#FFFFFF', coating: 'Elektrostatik toz boya', popular: false },
    { id: 'anthracite', name: 'Anthracite', nameTR: 'Antrasit', hex: '#383838', coating: 'Elektrostatik toz boya', popular: true },
];

// ============================================================================
// SHOWER SHAPES - Duşakabin Formları
// ============================================================================

export const showerShapes: ShowerShape[] = [
    { id: 'square', name: 'Square', nameTR: 'Kare', icon: '◻️', minWidth: 70, maxWidth: 100, description: 'Kompakt banyolar için ideal' },
    { id: 'rectangular', name: 'Rectangular', nameTR: 'Dikdörtgen', icon: '▭', minWidth: 80, maxWidth: 160, description: 'Geniş hareket alanı' },
    { id: 'corner-entry', name: 'Corner Entry', nameTR: 'Köşe Girişli', icon: '◢', minWidth: 80, maxWidth: 120, description: 'Köşe kullanımı optimize' },
    { id: 'quadrant', name: 'Quadrant', nameTR: 'Oval / Yay', icon: '◠', minWidth: 80, maxWidth: 100, description: 'Yumuşak hatlar' },
    { id: 'walk-in', name: 'Walk-in', nameTR: 'Walk-in (Açık)', icon: '🚿', minWidth: 100, maxWidth: 200, description: 'Kapısız modern tasarım' },
    { id: 'niche', name: 'Niche', nameTR: 'Niş Tipi', icon: '🚪', minWidth: 70, maxWidth: 150, description: 'Üç duvar arasına montaj' },
];

// ============================================================================
// HYGIENE COATINGS - Hijyen Kaplamaları
// ============================================================================

export const hygieneCoatings: HygieneCoating[] = [
    {
        id: 'nano-clear',
        name: 'Nano-Clear Pro',
        technology: 'Hidrofobik nano-kaplama',
        description: 'Su damlalarını iten, kireç birikmesini %90 azaltan görünmez kaplama.',
        benefits: ['Su itici yüzey', '%90 daha az kireç', 'Sadece su ile silme', 'Parmak izi tutmaz'],
        cleaningFrequency: 'Haftada 1 kez basit silme',
        lifespan: '5+ yıl',
    },
    {
        id: 'anti-calc',
        name: 'Anti-Calc Shield',
        technology: 'Kireç önleyici iyon kaplama',
        description: 'Sert sulara karşı özel formül, kalsiyum birikmesini engeller.',
        benefits: ['Kireç tutmaz yüzey', 'Bakteri azaltır', 'Cam parlaklığı korunur', 'Çevre dostu'],
        cleaningFrequency: 'Ayda 2 kez',
        lifespan: '7+ yıl',
    },
    {
        id: 'antibacterial',
        name: 'BacShield Plus',
        technology: 'Gümüş iyon antibakteriyel',
        description: '%99.9 bakteri öldürücü gümüş iyon teknolojisi.',
        benefits: ['%99.9 bakteri eliminasyonu', 'Küf önleme', 'Koku engelleme', 'Çocuklu aileler için ideal'],
        cleaningFrequency: 'Haftada 1 kez',
        lifespan: '10+ yıl',
    },
];

// ============================================================================
// DUŞAKABIN SYSTEMS - Ana Ürün Kataloğu
// ============================================================================

export const dusakabinSystems: DusakabinSystem[] = [
    // ========== BLACK EDITION SERIES ==========
    {
        id: 'black-square-frameless',
        slug: 'siyah-kare-cercevesiz-dusakabin',
        name: 'Siyah Kare (Black Edition) Çerçevesiz',
        tagline: 'Modern endüstriyel tasarımın zirvesi',
        category: 'black-edition',
        description: 'Mat siyah elektrostatik toz boya profiller ve çerçevesiz temperli cam ile minimalist lüks. Kontrast estetiği modern banyolarda öne çıkarır.',
        longDescription: `Siyah Kare (Black Edition) serisi, endüstriyel tasarım ve minimalizmi bir araya getiren cesur bir tercihtir. Mat siyah elektrostatik toz boya kaplama, yüksek korozyon direnci ve çizilmeye karşı dayanıklılık sağlar.

8mm veya 10mm temperli cam seçenekleri ile güvenlik ve estetik bir arada sunulur. Siyah profiller, beyaz veya gri tonlu banyolarda dramatik bir kontrast yaratırken, koyu tonlu banyolarda bütünleşik bir görünüm sağlar.

Dorma veya Bohle premium aksesuar seçenekleri ile soft-close kapanış, 180° açılım ve 10 yıla kadar garanti imkanı sunar. Kireç tutmayan Nano-Clear kaplama opsiyonu ile minimum bakım, maksimum hijyen.`,
        image: "/images/dusakabin/dusakabin-siyah-kose.jpg",
        gallery: ['/images/dusakabin/dusakabin-siyah-kose.jpg', '/images/dusakabin/dusakabin-siyah-profil-genis.jpg'],
        features: [
            'Mat siyah elektrostatik toz boya profil',
            '8mm veya 10mm temperli güvenlik camı',
            'Soft-close menteşe sistemi',
            'Manyetik mıknatıslı fitil',
            '180° tam açılım kapasitesi',
            'Ayarlanabilir duvar profili (±15mm)',
        ],
        benefits: [
            'Modern endüstriyel estetik',
            'Parmak izi tutmayan mat yüzey',
            'Yüksek korozyon direnci',
            '10 yıl profil garantisi',
            'Özel ölçü üretim imkanı',
        ],
        technicalSpecs: [
            { label: 'Cam Kalınlığı', value: '8mm / 10mm', highlight: true },
            { label: 'Profil Malzeme', value: 'Alüminyum 6063-T5' },
            { label: 'Kaplama', value: 'Elektrostatik toz boya' },
            { label: 'Menteşe', value: 'Paslanmaz 316L' },
            { label: 'Max. Kapı', value: '100cm genişlik' },
            { label: 'Max. Yükseklik', value: '200cm' },
            { label: 'Garanti', value: '10 yıl', highlight: true },
        ],
        availableGlass: ['clear', 'grey-tinted', 'extra-clear'],
        availableProfiles: ['matte-black', 'anthracite'],
        availableShapes: ['square', 'rectangular', 'niche'],
        priceRange: { min: 12000, max: 28000 },
        installationTime: '3-4 saat',
        warranty: '10 yıl profil + 5 yıl cam garantisi',
        certifications: ['EN 12150-1 Temperli Cam', 'EN 14428 Duşakabin', 'CE', 'TSE'],
        seoKeywords: ['siyah çerçeveli duşakabin', 'black edition duşakabin', 'mat siyah duşakabin', 'modern duşakabin'],
        faq: [
            { question: 'Mat siyah kaplama çizilir mi?', answer: 'Elektrostatik toz boya kaplama, normal kullanımda çizilmeye karşı yüksek direnç gösterir.' },
            { question: 'Siyah profillerde kireç lekesi görünür mü?', answer: 'Mat siyah yüzeylerde kireç lekeleri krom kadar belirgin değildir. Nano-Clear kaplama ile bu sorun tamamen ortadan kalkar.' },
        ],
    },
    {
        id: 'black-sliding-corner',
        slug: 'siyah-surme-kose-girisli-dusakabin',
        name: 'Siyah Sürme Köşe Girişli',
        tagline: 'Alan tasarrufu, stil kaybı yok',
        category: 'black-edition',
        description: 'Köşe kullanımını optimize eden çift sürme kapılı sistem. Mat siyah profiller ve sessiz tekerlek mekanizması.',
        longDescription: `Köşe girişli sürme sistem, sınırlı banyo alanlarında maksimum kullanım sağlar. Çift taraflı sürme kapılar, geniş giriş alanı açarken kapı açılım alanı gerektirmez.

Paslanmaz çelik rulman sistemi, on binlerce açılış-kapanış döngüsüne dayanıklıdır. Sessiz çalışma için özel tasarlanmış tekerlek sistemi, gece kullanımında bile rahatsızlık vermez.`,
        image: "/images/dusakabin/dusakabin-siyah-kose.jpg",
        gallery: ['/images/dusakabin/dusakabin-kose-banyo.jpg', '/images/dusakabin/dusakabin-siyah-profil-genis.jpg'],
        features: [
            'Çift sürme kapı sistemi',
            'Paslanmaz çelik rulman tekerlekler',
            'Sessiz açılış-kapanış',
            'Manyetik kapanış fitili',
            'Alt ve üst ray sistemi',
        ],
        benefits: ['Kapı açılım alanı gerektirmez', 'Geniş giriş açıklığı', 'Kompakt banyolar için ideal'],
        technicalSpecs: [
            { label: 'Cam Kalınlığı', value: '6mm / 8mm', highlight: true },
            { label: 'Tekerlek Tipi', value: 'Paslanmaz rulman' },
            { label: 'Max. Boyut', value: '120x120cm' },
            { label: 'Garanti', value: '7 yıl', highlight: true },
        ],
        availableGlass: ['clear', 'frosted', 'grey-tinted'],
        availableProfiles: ['matte-black', 'anthracite', 'chrome'],
        availableShapes: ['corner-entry', 'quadrant'],
        priceRange: { min: 8000, max: 18000 },
        installationTime: '2-3 saat',
        warranty: '7 yıl',
        certifications: ['EN 12150-1', 'EN 14428', 'CE'],
        seoKeywords: ['köşe girişli duşakabin', 'sürme kapılı duşakabin', 'siyah sürme duşakabin'],
        faq: [{ question: 'Sürme sistem zamanla zorlaşır mı?', answer: 'Kaliteli rulman sistemleri 100.000+ döngü için test edilmiştir.' }],
    },

    // ========== SLIDING & CORNER ENTRY ==========
    {
        id: 'premium-sliding-double',
        slug: 'premium-cift-surme-dusakabin',
        name: 'Premium Çift Sürme Sistem',
        tagline: 'Sessiz mekanik, geniş geçiş',
        category: 'sliding-corner',
        description: 'Çift yönlü sürme kapılar ile merkezi giriş. Alman mühendisliği tekerlek sistemi, 100.000 döngü garantisi.',
        longDescription: `Premium Çift Sürme sistem, büyük banyo alanları için tasarlanmış lüks bir çözümdür. İki cam panel birbirinin üzerinden kayarak merkezi giriş açıklığı oluşturur.

Alman Häfele tekerlek sistemi, sessiz ve akıcı hareket sağlar. Magnetic seal teknolojisi, %100 su sızdırmazlık garantisi verir.`,
        image: "/images/dusakabin/dusakabin-krom-surme.jpg",
        gallery: ['/images/dusakabin/dusakabin-krom-surme.jpg', '/images/dusakabin/dusakabin-siyah-profil-genis.jpg'],
        features: [
            'Çift yönlü sürme mekanizma',
            'Häfele sessiz tekerlek sistemi',
            'Magnetic seal su fitili',
            'Üst askı + alt kılavuz ray',
            'Easy-release temizlik modu',
        ],
        benefits: ['Ultra sessiz çalışma (<30dB)', '100.000 döngü mekanik garanti', 'Kolay temizlik için çıkarılabilir panel'],
        technicalSpecs: [
            { label: 'Cam Kalınlığı', value: '6mm - 10mm' },
            { label: 'Ray Sistemi', value: 'Çift ray (üst+alt)' },
            { label: 'Ses Seviyesi', value: '<30dB', highlight: true },
            { label: 'Garanti', value: '10 yıl mekanik', highlight: true },
        ],
        availableGlass: ['clear', 'frosted', 'grey-tinted', 'bronze-tinted'],
        availableProfiles: ['chrome', 'matte-black', 'brushed-nickel'],
        availableShapes: ['rectangular', 'niche'],
        priceRange: { min: 15000, max: 35000 },
        installationTime: '4-5 saat',
        warranty: '10 yıl mekanik + 5 yıl cam',
        certifications: ['EN 12150-1', 'EN 14428', 'CE', 'TÜV'],
        seoKeywords: ['çift sürme duşakabin', 'sessiz duşakabin sistemi', 'premium duşakabin'],
        faq: [{ question: 'Tekerlek sistemi arızalanırsa ne olur?', answer: '10 yıl mekanik garanti kapsamında ücretsiz değişim yapılır.' }],
    },
    {
        id: 'corner-quadrant-curved',
        slug: 'oval-kose-dusakabin-sistemi',
        name: 'Oval Köşe (Quadrant) Sistem',
        tagline: 'Yumuşak hatlar, modern estetik',
        category: 'sliding-corner',
        description: 'Eğimli temperli cam ile yumuşak geçişler. R550 kavis yarıçapı, kompakt köşe kullanımı.',
        longDescription: `Oval (Quadrant) sistem, köşe alanları değerlendirmek için tasarlanmış zarif bir çözümdür. Eğimli temperli cam, yumuşak hatlarıyla modern banyo tasarımlarına mükemmel uyum sağlar.`,
        image: '/images/dusakabin/dusakabin-kose-banyo.jpg',
        gallery: ['/images/dusakabin/dusakabin-kose-buzlu-cam.jpg', '/images/dusakabin/dusakabin-siyah-kose.jpg'],
        features: [
            'R550 / R800 kavis yarıçapı',
            'Eğimli temperli cam (6mm/8mm)',
            'Sürme veya pivot kapı seçeneği',
            'Silikon mıknatıslı fitil',
        ],
        benefits: ['Köşe alanını maksimum değerlendirir', 'Yumuşak modern estetik', 'Darbe emici yuvarlak form'],
        technicalSpecs: [
            { label: 'Kavis Yarıçapı', value: 'R550 / R800mm' },
            { label: 'Cam Kalınlığı', value: '6mm / 8mm' },
            { label: 'Standart Boyut', value: '80x80, 90x90cm' },
            { label: 'Garanti', value: '5 yıl', highlight: true },
        ],
        availableGlass: ['clear', 'frosted', 'patterned'],
        availableProfiles: ['chrome', 'matte-black', 'white', 'gold'],
        availableShapes: ['quadrant'],
        priceRange: { min: 6000, max: 14000 },
        installationTime: '2-3 saat',
        warranty: '5 yıl',
        certifications: ['EN 12150-1', 'EN 14428', 'CE'],
        seoKeywords: ['oval duşakabin', 'kavisli duşakabin', 'köşe duşakabin modelleri'],
        faq: [{ question: 'Eğimli cam düz camdan daha zayıf mı?', answer: 'Hayır, eğimli temperli cam aynı güvenlik standardına sahiptir.' }],
    },

    // ========== HINGED LUXURY ==========
    {
        id: 'frameless-pivot-luxury',
        slug: 'cercevesiz-menteseli-luks-dusakabin',
        name: 'Çerçevesiz Menteşeli Lüks',
        tagline: '10mm temperli cam, minimalist zarafet',
        category: 'hinged-luxury',
        description: 'Boy menteşe ile 180° açılım, 10mm ekstra şeffaf temperli cam. Dorma premium aksesuar ile ultimate lüks.',
        longDescription: `Çerçevesiz Menteşeli Lüks seri, duşakabin dünyasının en üst segmentini temsil eder. 10mm ekstra şeffaf (low-iron) temperli cam, yeşilimsi ton içermez ve kristal berraklık sağlar.

Boy menteşe (continuous hinge) sistemi, cam ağırlığını tüm yükseklik boyunca dağıtarak ultra akıcı açılış sağlar. 180° tam açılım özelliği, banyo temizliğini kolaylaştırır.`,
        image: '/images/dusakabin/dusakabin-siyah-profil-genis.jpg',
        gallery: ['/images/dusakabin/dusakabin-siyah-kose.jpg', '/images/dusakabin/dusakabin-kose-buzlu-cam.jpg'],
        features: [
            '10mm ekstra şeffaf temperli cam',
            'Dorma Tensor boy menteşe',
            '180° tam açılım',
            'Tamamen çerçevesiz tasarım',
            'Soft-close kapanış (opsiyonel)',
        ],
        benefits: ['Kristal berraklık (yeşil ton yok)', 'Showroom görünümü', 'Lüks otel standardı'],
        technicalSpecs: [
            { label: 'Cam Kalınlığı', value: '10mm', highlight: true },
            { label: 'Cam Tipi', value: 'Extra Clear (Low-Iron)' },
            { label: 'Menteşe', value: 'Dorma Tensor', highlight: true },
            { label: 'Açılım Açısı', value: '180°' },
            { label: 'Garanti', value: '10 yıl', highlight: true },
        ],
        availableGlass: ['extra-clear', 'clear', 'grey-tinted'],
        availableProfiles: ['chrome', 'matte-black', 'brushed-nickel', 'gold'],
        availableShapes: ['niche', 'rectangular', 'square'],
        priceRange: { min: 20000, max: 45000 },
        installationTime: '4-6 saat',
        warranty: '10 yıl',
        certifications: ['EN 12150-1', 'EN 14428', 'CE', 'TÜV', 'Dorma Partner'],
        seoKeywords: ['çerçevesiz duşakabin', 'lüks duşakabin modelleri', '10mm temperli cam duşakabin', 'frameless duşakabin'],
        faq: [
            { question: 'Çerçevesiz sistem güvenli mi?', answer: '10mm temperli cam, standart camdan 5 kat daha güçlüdür. Kırılma durumunda küçük küp parçalara ayrılır.' },
            { question: 'Boy menteşe neden önemli?', answer: 'Ağırlığı tek noktada değil tüm boy boyunca dağıtır. Daha akıcı hareket ve uzun ömür sağlar.' },
        ],
    },
    {
        id: 'semi-frameless-hinged',
        slug: 'yari-cerceveli-menteseli-dusakabin',
        name: 'Yarı Çerçeveli Menteşeli',
        tagline: 'Denge: Estetik ve ekonomi',
        category: 'hinged-luxury',
        description: 'Üst ve yan profilli, kapı çerçevesiz. 8mm temperli cam ile optimal maliyet-performans dengesi.',
        longDescription: `Yarı Çerçeveli sistem, tam çerçevesiz ve tam çerçeveli sistemlerin avantajlarını birleştirir. Sabit paneller ince profillerle desteklenirken, kapı tamamen çerçevesizdir.

Bu hibrit yaklaşım, yapısal stabilite sağlarken minimalist görünümü korur. 8mm temperli cam standart, isteğe bağlı 10mm upgrade mevcuttur.`,
        image: '/images/dusakabin/dusakabin-kose-buzlu-cam.jpg',
        gallery: ['/images/dusakabin/dusakabin-krom-surme.jpg', '/images/dusakabin/dusakabin-siyah-kose.jpg'],
        features: [
            'Çerçevesiz kapı, profilli sabit panel',
            '8mm (opsiyonel 10mm) temperli cam',
            'Pivot veya standart menteşe seçeneği',
            'İnce 20mm duvar profili',
            'Manyetik kapanış',
        ],
        benefits: ['Maliyet-performans optimizasyonu', 'Yapısal güvenlik + minimal estetik', 'Hızlı montaj'],
        technicalSpecs: [
            { label: 'Cam Kalınlığı', value: '8mm (10mm opt.)' },
            { label: 'Profil Genişliği', value: '20mm' },
            { label: 'Menteşe Tipi', value: 'Pivot / Standart' },
            { label: 'Garanti', value: '5 yıl', highlight: true },
        ],
        availableGlass: ['clear', 'frosted', 'grey-tinted', 'patterned'],
        availableProfiles: ['chrome', 'matte-black', 'white', 'anthracite'],
        availableShapes: ['niche', 'rectangular', 'corner-entry'],
        priceRange: { min: 7000, max: 16000 },
        installationTime: '2-3 saat',
        warranty: '5 yıl',
        certifications: ['EN 12150-1', 'EN 14428', 'CE'],
        seoKeywords: ['yarı çerçeveli duşakabin', 'ekonomik duşakabin', 'duşakabin fiyatları'],
        faq: [{ question: 'Yarı çerçeveli mi çerçevesiz mi tercih etmeliyim?', answer: 'Bütçe önceliği varsa yarı çerçeveli mükemmel seçim. Ultra minimalist görünüm istiyorsanız tam çerçevesiz önerilir.' }],
    },

    // ========== WALK-IN & FIXED PANELS ==========
    {
        id: 'walk-in-single-panel',
        slug: 'walk-in-tek-panel-dusakabin',
        name: 'Walk-in Tek Panel',
        tagline: 'Kapısız özgürlük, wet-room konsepti',
        category: 'walk-in',
        description: 'Kapısız açık tasarım, 10mm sabit temperli panel. Engelsiz giriş, kolay temizlik, modern mimari.',
        longDescription: `Walk-in tek panel, banyo tasarımının en modern ifadesidir. Kapı yerine açık geçiş alanı bırakan bu sistem, wet-room (ıslak hacim) konseptinin temelidir.

10mm temperli cam panel, duvardan veya tavandan stabilizatör kolu ile desteklenir. Açık tasarım, engelsiz giriş-çıkış sağlar ve banyo temizliğini kolaylaştırır.

Özellikle engelli erişimi veya yaşlı dostu banyolar için idealdir.`,
        image: "/images/dusakabin/hero-black-frameless.jpg",
        gallery: ['/images/dusakabin/dusakabin-siyah-profil-genis.jpg', '/images/dusakabin/dusakabin-kose-banyo.jpg'],
        features: [
            '10mm sabit temperli panel',
            'Duvar veya tavan stabilizatör kolu',
            'Kapısız açık tasarım',
            '200-220cm yükseklik seçenekleri',
            'Paslanmaz çelik bağlantı elemanları',
        ],
        benefits: ['Engelsiz giriş-çıkış', 'Kolay temizlik', 'Modern mimari estetik', 'Yaşlı/engelli dostu'],
        technicalSpecs: [
            { label: 'Cam Kalınlığı', value: '10mm', highlight: true },
            { label: 'Min. Genişlik', value: '80cm' },
            { label: 'Önerilen Genişlik', value: '100cm+' },
            { label: 'Yükseklik', value: '200-220cm' },
            { label: 'Garanti', value: '10 yıl', highlight: true },
        ],
        availableGlass: ['clear', 'extra-clear', 'grey-tinted', 'frosted'],
        availableProfiles: ['chrome', 'matte-black', 'brushed-nickel'],
        availableShapes: ['walk-in'],
        priceRange: { min: 8000, max: 20000 },
        installationTime: '2-3 saat',
        warranty: '10 yıl',
        certifications: ['EN 12150-1', 'EN 14428', 'CE'],
        seoKeywords: ['walk-in duşakabin', 'kapısız duşakabin', 'tek panel duşakabin', 'teknesiz duşakabin'],
        faq: [
            { question: 'Walk-in sistem su sıçratır mı?', answer: 'Minimum 100cm genişlik ve doğru şelale kafa konumu ile sıçrama minimize edilir.' },
            { question: 'Teknesiz kullanım zorunlu mu?', answer: 'Hayır, isterseniz sığ tekne (5-10cm) ile de kullanılabilir.' },
        ],
    },
    {
        id: 'walk-in-corner-double',
        slug: 'walk-in-kose-cift-panel-dusakabin',
        name: 'Walk-in Köşe Çift Panel',
        tagline: 'L-şeklinde açık tasarım',
        category: 'walk-in',
        description: 'İki sabit panel ile köşe walk-in çözümü. Geniş giriş alanı, maksimum mahremiyet.',
        longDescription: `Köşe Çift Panel walk-in, L-şeklinde iki cam panel ile köşe alanında genişlik hissi yaratır. İki panel birbirini destekleyerek ek stabilizatör ihtiyacını azaltır.

10mm temperli cam paneller, cam-cam köşe bağlantı klipsi ile birleştirilir. Bu sistem, hem estetik hem de fonksiyonel açıdan üstün çözüm sunar.`,
        image: '/images/dusakabin/dusakabin-siyah-kose.jpg',
        gallery: ['/images/dusakabin/dusakabin-kose-buzlu-cam.jpg', '/images/dusakabin/dusakabin-siyah-profil-genis.jpg'],
        features: [
            'L-şeklinde çift panel tasarım',
            '10mm temperli cam (her iki panel)',
            'Cam-cam köşe klipsi',
            'Tek stabilizatör kolu yeterli',
            'Geniş giriş açıklığı',
        ],
        benefits: ['Köşe alanını etkin kullanım', 'Kendi kendini destekleyen yapı', 'Lüks otel görünümü'],
        technicalSpecs: [
            { label: 'Cam Kalınlığı', value: '10mm', highlight: true },
            { label: 'Min. Boyut', value: '90x90cm' },
            { label: 'Önerilen Boyut', value: '100x140cm+' },
            { label: 'Garanti', value: '10 yıl', highlight: true },
        ],
        availableGlass: ['clear', 'extra-clear', 'grey-tinted'],
        availableProfiles: ['chrome', 'matte-black'],
        availableShapes: ['walk-in'],
        priceRange: { min: 14000, max: 30000 },
        installationTime: '3-4 saat',
        warranty: '10 yıl',
        certifications: ['EN 12150-1', 'EN 14428', 'CE'],
        seoKeywords: ['köşe walk-in duşakabin', 'çift panel duşakabin', 'l şeklinde duşakabin'],
        faq: [{ question: 'İki panel gerekli mi?', answer: 'Köşe alanlarında çift panel hem su kontrolü hem de mahremiyet için idealdir.' }],
    },
    {
        id: 'bathtub-screen-pivot',
        slug: 'kuvet-ustu-pivot-cam-perde',
        name: 'Küvet Üstü Pivot Cam Perde',
        tagline: 'Küvetinizi duşakabine dönüştürün',
        category: 'walk-in',
        description: 'Mevcut küvet üzerine monte edilen pivot cam panel. Hem küvet hem duşakabin kullanımı.',
        longDescription: `Küvet Üstü Cam Perde, mevcut küvetinizi bozmadan duşakabin konforu sunar. Pivot menteşe sistemi ile kapı içeri veya dışarı açılabilir.

6mm veya 8mm temperli cam, küvet boyunca su sıçramasını engeller. Özellikle hem küvet hem duş kullanımı isteyenler için idealdir.`,
        image: '/images/dusakabin/dusakabin-kose-banyo.jpg',
        gallery: ['/images/dusakabin/dusakabin-krom-surme.jpg', '/images/dusakabin/dusakabin-kose-buzlu-cam.jpg'],
        features: [
            'Pivot menteşe (içe/dışa açılım)',
            '6mm veya 8mm temperli cam',
            'Küvet kenarına montaj',
            'Su sızdırmaz silikon fitil',
            '180° katlanabilir (opsiyonel)',
        ],
        benefits: ['Küveti korur, duşakabin ekler', 'Hem banyo hem duş kullanımı', 'Ekonomik çözüm'],
        technicalSpecs: [
            { label: 'Cam Kalınlığı', value: '6mm / 8mm' },
            { label: 'Panel Genişliği', value: '80-120cm' },
            { label: 'Panel Yüksekliği', value: '140-150cm' },
            { label: 'Garanti', value: '5 yıl', highlight: true },
        ],
        availableGlass: ['clear', 'frosted', 'patterned'],
        availableProfiles: ['chrome', 'matte-black', 'white'],
        availableShapes: ['niche'],
        priceRange: { min: 4000, max: 10000 },
        installationTime: '1-2 saat',
        warranty: '5 yıl',
        certifications: ['EN 12150-1', 'CE'],
        seoKeywords: ['küvet üstü cam', 'küvet duşakabin', 'banyo cam perde'],
        faq: [{ question: 'Her küvete uyar mı?', answer: 'Evet, özel ölçü üretim ile her standart küvete uygulanabilir.' }],
    },
];

// ============================================================================
// SEO KEYWORD CLUSTERS
// ============================================================================

export const dusakabinSeoKeywords = {
    core: ['duşakabin fiyatları', 'duşakabin modelleri', 'cam duşakabin', 'temperli cam duşakabin', 'özel ölçü duşakabin'],
    blackEdition: ['siyah çerçeveli duşakabin', 'siyah duşakabin', 'black edition duşakabin', 'mat siyah duşakabin'],
    sliding: ['sürme duşakabin', 'köşe girişli duşakabin', 'kompakt duşakabin'],
    frameless: ['çerçevesiz duşakabin', 'frameless duşakabin', 'minimalist duşakabin'],
    walkIn: ['walk-in duşakabin', 'kapısız duşakabin', 'teknesiz duşakabin', 'wet-room'],
    local: ['Beylikdüzü duşakabin', 'Esenyurt duşakabin', 'İstanbul duşakabin montaj'],
    technical: ['anti-calc cam kaplama', 'kireç tutmayan duşakabin', 'nano kaplama', 'manyetik fitil'],
};

// ============================================================================
// AUTHORITY CONTENT GUIDES
// ============================================================================

export const authorityGuides = [
    {
        id: 'glass-thickness-guide',
        title: 'Duşakabin Alırken Cam Kalınlığı Neden Önemlidir?',
        slug: 'dusakabin-cam-kalinligi-rehberi',
        summary: '5mm, 6mm, 8mm ve 10mm temperli cam arasındaki farklar.',
        sections: [
            { heading: 'Cam Kalınlığı ve Güvenlik', content: 'Temperli cam, normal camdan 4-5 kat daha dayanıklıdır. Kalınlık arttıkça titreşim azalır.' },
            { heading: '5mm-6mm: Ekonomik Seçim', content: 'Dar banyolar ve sürme sistemler için yeterli.' },
            { heading: '8mm: Standart Premium', content: 'En popüler kalınlık. Güvenlik, estetik ve maliyet dengesi optimal.' },
            { heading: '10mm: Ultimate Lüks', content: 'Çerçevesiz sistemlerde standart. Otel kalitesi için şart.' },
        ],
    },
    {
        id: 'tray-vs-wetroom',
        title: 'Tekneli mi Teknesiz mi? Doğru Seçimi Yapın',
        slug: 'tekneli-teknesiz-dusakabin-karsilastirma',
        summary: 'Duş teknesi vs zemine gömülü wet-room karşılaştırması.',
        sections: [
            { heading: 'Duş Teknesi Avantajları', content: 'Kolay montaj, su yalıtımı garantisi. Kiralık evlerde tercih edilir.' },
            { heading: 'Teknesiz Avantajları', content: 'Modern görünüm, engelsiz giriş. Yeni yapılarda idealdir.' },
        ],
    },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function getDusakabinSystemBySlug(slug: string): DusakabinSystem | undefined {
    return dusakabinSystems.find((system) => system.slug === slug);
}

export function getDusakabinSystemsByCategory(category: DusakabinSystem['category']): DusakabinSystem[] {
    return dusakabinSystems.filter((system) => system.category === category);
}

export function getGlassTypeById(id: string): GlassType | undefined {
    return glassTypes.find((glass) => glass.id === id);
}

export function getProfileColorById(id: string): ProfileColor | undefined {
    return profileColors.find((color) => color.id === id);
}

export function formatPriceRange(min: number, max: number): string {
    const formatter = new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 });
    return `${formatter.format(min)} - ${formatter.format(max)}`;
}
