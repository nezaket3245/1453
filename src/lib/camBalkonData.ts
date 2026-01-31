/**
 * Glass Balcony & Sliding Systems Data
 * Comprehensive product specifications for SEO-optimized content
 * Keywords: Beylikdüzü cam balkon, İstanbul sürme sistemleri, ısıcamlı cam balkon
 */

export interface GlassSystem {
    id: string;
    slug: string;
    name: string;
    category: 'isicamli' | 'surme' | 'giyotin' | 'katlanir';
    subCategory?: string;
    tagline: string;
    description: string;
    longDescription: string;
    image: string;
    videoUrl?: string;
    gallery: string[];
    technicalSpecs: { label: string; value: string; icon?: string }[];
    features: string[];
    benefits: string[];
    idealFor: string[];
    glassOptions: {
        type: string;
        thickness: string;
        description: string;
    }[];
    colorOptions: {
        name: string;
        ral?: string;
        hex: string;
    }[];
    warranty: string;
    priceRange: 'ekonomik' | 'orta' | 'premium';
    seoKeywords: string[];
    faq: { question: string; answer: string }[];
    schema: {
        brand: string;
        model: string;
        offers: {
            priceCurrency: string;
            priceRange: string;
            availability: string;
        };
    };
}

export interface ComparisonCriteria {
    id: string;
    label: string;
    description: string;
}

// Comparison criteria for the interactive matrix
export const comparisonCriteria: ComparisonCriteria[] = [
    { id: 'insulation', label: 'Isı Yalıtımı', description: 'Termal performans seviyesi' },
    { id: 'cleaning', label: 'Temizlik Kolaylığı', description: 'Bakım ve temizlik pratikliği' },
    { id: 'windResistance', label: 'Rüzgar Dayanımı', description: 'Yüksek kat ve deniz kenarı uyumu' },
    { id: 'pricePoint', label: 'Fiyat Aralığı', description: 'Yatırım maliyeti' },
    { id: 'aesthetics', label: 'Estetik', description: 'Görsel çekicilik ve modern tasarım' },
    { id: 'spaceEfficiency', label: 'Alan Verimliliği', description: 'Açık/kapalı durumda alan kullanımı' },
];

// Glass options available across systems
export const glassTypes = [
    {
        id: 'tempered-8mm',
        name: '8mm Temperli Cam',
        description: 'Standart güvenlik camı, kırıldığında küçük parçalara ayrılır',
        thickness: '8mm',
        safety: 'Orta',
        thermal: 'Standart',
        idealFor: ['Kapalı balkonlar', 'İç mekanlar'],
    },
    {
        id: 'tempered-10mm',
        name: '10mm Temperli Cam',
        description: 'Artırılmış dayanıklılık, yüksek katlarda tercih edilir',
        thickness: '10mm',
        safety: 'Yüksek',
        thermal: 'İyi',
        idealFor: ['Yüksek katlar', 'Rüzgarlı bölgeler', 'Geniş açıklıklar'],
    },
    {
        id: 'laminated',
        name: 'Lamine (Katmanlı) Cam',
        description: 'PVB film katmanlı, kırıldığında dağılmaz, maksimum güvenlik',
        thickness: '8+8mm / 10+10mm',
        safety: 'Maksimum',
        thermal: 'Çok İyi',
        idealFor: ['Çocuklu evler', 'Güvenlik öncelikli mekanlar', 'Ticari alanlar'],
    },
    {
        id: 'insulated-24mm',
        name: '24mm Isıcamlı Ünite',
        description: 'Çift cam arası Argon gazlı, üstün ısı yalıtımı',
        thickness: '4+16+4mm',
        safety: 'Yüksek',
        thermal: 'Mükemmel',
        idealFor: ['Kışın kullanım', 'Enerji tasarrufu', 'Isıtmalı balkonlar'],
    },
    {
        id: 'insulated-28mm',
        name: '28mm Isıcamlı Ünite',
        description: 'Low-E kaplamalı, maksimum termal performans',
        thickness: '4+20+4mm',
        safety: 'Yüksek',
        thermal: 'Üstün',
        idealFor: ['Kış bahçeleri', 'Dört mevsim kullanım', 'Premium projeler'],
    },
];

// RAL color options
export const colorOptions = [
    { name: 'Beyaz', ral: 'RAL 9016', hex: '#F7F9FA', popular: true },
    { name: 'Antrasit Gri', ral: 'RAL 7016', hex: '#383E42', popular: true },
    { name: 'Bronz', ral: 'RAL 8022', hex: '#1A1718', popular: true },
    { name: 'Altın Meşe', ral: 'Wood Grain', hex: '#B8860B', popular: false },
    { name: 'Ceviz', ral: 'Wood Grain', hex: '#5D432C', popular: false },
    { name: 'Gümüş Gri', ral: 'RAL 9006', hex: '#A5A5A5', popular: false },
    { name: 'Krem', ral: 'RAL 1015', hex: '#E6D2B5', popular: false },
    { name: 'Siyah', ral: 'RAL 9005', hex: '#0A0A0A', popular: true },
];

// Main glass systems data
export const glassSystems: GlassSystem[] = [
    // =====================================================
    // ISICAMLI (THERMAL INSULATED) SYSTEMS
    // =====================================================
    {
        id: 'tiara-max',
        slug: 'tiara-max-isicamli-sistem',
        name: 'Tiara Max Isıcamlı Sistem',
        category: 'isicamli',
        subCategory: 'premium',
        tagline: 'Maksimum Isı Yalıtımı, Premium Konfor',
        description: 'Tiara Max, 28mm ısıcamlı ünite ve termal break profilleriyle kışın sıcak, yazın serin balkonlar sunar. Beylikdüzü ve çevresinde enerji tasarruflu yaşam için ideal seçim.',
        longDescription: `Tiara Max Isıcamlı Cam Balkon Sistemi, Türkiye'nin en gelişmiş termal yalıtım teknolojisini balkonlarınıza taşır. 28mm kalınlığındaki çift camlı ünite, aralarında Argon gaz dolgusu ve Low-E kaplama ile birlikte çalışarak evinizin ısı kaybını %70'e kadar azaltır.

Özellikle Beylikdüzü ve Gürpınar gibi deniz kenarı bölgelerinde, sert kış rüzgarlarına ve nemli havaya karşı mükemmel koruma sağlar. Termal break (ısı köprüsü kesici) profil teknolojisi sayesinde, alüminyum profillerin iç ve dış yüzeyleri arasında ısı geçişi engellenir.

Sistem, Somfy ve Becker motorları ile entegre çalışabilir, akıllı ev sistemlerine bağlanabilir ve uzaktan kumanda ile kontrol edilebilir. Yüksek katlarda yaşayanlar için rüzgar sensörleri opsiyonel olarak eklenebilir.`,
        image: "/images/cam-balkon/tiara-max-isicamli-yeni.jpg",
        gallery: [
            '/images/cam-balkon/tiara-max-isicamli-yeni.jpg',
            '/images/cam-balkon/cam-balkon-gunbatimi.jpg',
            '/images/cam-balkon/cam-balkon-kose.jpg',
        ],
        technicalSpecs: [
            { label: 'Cam Kalınlığı', value: '28mm (4+20+4mm)', icon: 'glass' },
            { label: 'Isı İletim Katsayısı', value: 'Ug = 1.0 W/m²K', icon: 'thermal' },
            { label: 'Ses Yalıtımı', value: '38 dB', icon: 'sound' },
            { label: 'Gaz Dolgu', value: 'Argon %90', icon: 'gas' },
            { label: 'Profil Yapısı', value: 'Termal Break Alüminyum', icon: 'profile' },
            { label: 'Max Panel Yüksekliği', value: '3200mm', icon: 'height' },
            { label: 'Rüzgar Dayanımı', value: 'C4 Sınıfı (2000 Pa)', icon: 'wind' },
            { label: 'Su Sızdırmazlık', value: 'E1200 Sınıfı', icon: 'water' },
        ],
        features: [
            '28mm Argon gazlı çift cam ünitesi',
            'Low-E (düşük emisyonlu) cam kaplama',
            'Termal break alüminyum profiller',
            'Çift sıra EPDM conta sistemi',
            'Gizli su tahliye kanalları',
            'Paslanmaz çelik rulman mekanizması',
            'Çocuk güvenlik kilidi standart',
            'Akıllı ev entegrasyonu opsiyonu',
        ],
        benefits: [
            'Isınma faturalarında %40-60 tasarruf',
            'Kışın dahi balkonunuzu yaşam alanı olarak kullanın',
            'Toz ve polen girişini %99 engeller',
            'Sessiz bir yaşam alanı oluşturur',
            'Evinizin değerini artırır',
        ],
        idealFor: [
            'Kış bahçesi oluşturmak isteyenler',
            'Enerji tasarrufu arayanlar',
            'Yüksek katlarda oturanlar',
            'Sessizlik ve konfor arayanlar',
            'Premium yaşam alanı isteyenler',
        ],
        glassOptions: [
            { type: 'Isıcamlı', thickness: '24mm', description: '4+16+4mm Argon dolgu' },
            { type: 'Isıcamlı Premium', thickness: '28mm', description: '4+20+4mm Argon + Low-E' },
            { type: 'Isıcamlı Ultra', thickness: '32mm', description: '6+20+6mm Triple Silver' },
        ],
        colorOptions: [
            { name: 'Beyaz', ral: 'RAL 9016', hex: '#F7F9FA' },
            { name: 'Antrasit Gri', ral: 'RAL 7016', hex: '#383E42' },
            { name: 'Bronz', ral: 'RAL 8022', hex: '#1A1718' },
            { name: 'Altın Meşe', ral: 'Wood Grain', hex: '#B8860B' },
        ],
        warranty: '10 Yıl Üretici Garantisi',
        priceRange: 'premium',
        seoKeywords: [
            'Beylikdüzü ısıcamlı cam balkon',
            'İstanbul termal cam balkon',
            'ısı yalıtımlı cam balkon fiyatları',
            'Tiara Max cam balkon',
            'argon gazlı cam balkon',
            'kış bahçesi cam balkon',
            'enerji tasarruflu cam balkon',
        ],
        faq: [
            {
                question: 'Isıcamlı cam balkon kışın ısıtır mı?',
                answer: 'Isıcamlı sistemler kendi başına ısıtma yapmaz ancak dışarıdan gelen soğuğu engelleyerek iç mekanın sıcaklığını korur. Evinizin ısısı balkona sızar ve ısıcam bu ısıyı dışarıya kaçırmaz. Bu sayede balkonunuz kışın bile 10-15°C daha sıcak kalır.',
            },
            {
                question: 'Argon gazı zamanla boşalır mı?',
                answer: 'Kaliteli üretilmiş ısıcamlı ünitelerde Argon kaybı yılda %1\'den azdır. 20 yıl sonra bile camlarınız etkili şekilde çalışmaya devam eder. Akçayapı olarak tüm ısıcamlı sistemlerimizde 10 yıl gaz garantisi sunuyoruz.',
            },
            {
                question: 'Cam balkon su sızdırır mı?',
                answer: 'Profesyonel montaj yapılan cam balkon sistemleri su sızdırmaz. Tiara Max sistemimizde çift sıra EPDM conta ve gizli su tahliye kanalları bulunur. Olası yoğuşma suyu kontrollü şekilde dışarıya tahliye edilir.',
            },
        ],
        schema: {
            brand: 'Tiara',
            model: 'Max Isıcamlı Sistem',
            offers: {
                priceCurrency: 'TRY',
                priceRange: '₺₺₺',
                availability: 'https://schema.org/InStock',
            },
        },
    },
    {
        id: 'twin-system',
        slug: 'twin-isicamli-sistem',
        name: 'Twin Isıcamlı Sistem',
        category: 'isicamli',
        subCategory: 'standard',
        tagline: 'Çift Cam Teknolojisi, Ekonomik Çözüm',
        description: 'Twin sistem, 24mm ısıcamlı ünite ile mükemmel fiyat/performans dengesi sunar. Beylikdüzü bölgesinde en çok tercih edilen ısı yalıtımlı cam balkon çözümü.',
        longDescription: `Twin Isıcamlı Cam Balkon Sistemi, bütçe dostu fiyatıyla üst düzey ısı yalıtımı arayanlar için ideal seçimdir. 24mm kalınlığındaki çift cam ünitesi, 16mm Argon gaz boşluğu ile evinizin ısı kaybını önemli ölçüde azaltır.

Standart termal profil yapısı sayesinde, klasik cam balkon sistemlerine göre %50'ye varan enerji tasarrufu sağlar. Beylikdüzü, Esenyurt ve Büyükçekmece gibi İstanbul'un batı yakasında yoğun talep gören bu sistem, kalite ve ekonomiyi bir arada sunar.

Kolay kullanımı ve düşük bakım maliyeti ile uzun yıllar sorunsuz hizmet verir. 8mm temperli camlardan oluşan yapısı güvenliği, çift conta sistemi ise hava sızdırmazlığı garanti eder.`,
        image: "/images/cam-balkon/twin-isicamli-yeni.jpg",
        gallery: [
            '/images/cam-balkon/twin-isicamli-yeni.jpg',
            '/images/cam-balkon/tiara-max-isicamli-yeni.jpg',
        ],
        technicalSpecs: [
            { label: 'Cam Kalınlığı', value: '24mm (4+16+4mm)', icon: 'glass' },
            { label: 'Isı İletim Katsayısı', value: 'Ug = 1.4 W/m²K', icon: 'thermal' },
            { label: 'Ses Yalıtımı', value: '32 dB', icon: 'sound' },
            { label: 'Gaz Dolgu', value: 'Argon %90', icon: 'gas' },
            { label: 'Profil Yapısı', value: 'Standart Alüminyum', icon: 'profile' },
            { label: 'Max Panel Yüksekliği', value: '2800mm', icon: 'height' },
            { label: 'Rüzgar Dayanımı', value: 'C3 Sınıfı (1600 Pa)', icon: 'wind' },
        ],
        features: [
            '24mm Argon gazlı çift cam ünitesi',
            'Standart koruyucu cam kaplama',
            'Yüksek kalite alüminyum profiller',
            'Tek sıra EPDM conta sistemi',
            'Pratik kol mekanizması',
            'Kolay temizlenebilir yapı',
        ],
        benefits: [
            'Uygun fiyatlı ısı yalıtımı',
            'Hızlı montaj süreci',
            'Düşük bakım maliyeti',
            'Enerji faturalarında tasarruf',
        ],
        idealFor: [
            'Bütçe odaklı müşteriler',
            'İlk kez cam balkon yaptıracaklar',
            'Kiralık daireler',
            'Orta ve alt kat daireler',
        ],
        glassOptions: [
            { type: 'Isıcamlı', thickness: '24mm', description: '4+16+4mm Argon dolgu' },
        ],
        colorOptions: [
            { name: 'Beyaz', ral: 'RAL 9016', hex: '#F7F9FA' },
            { name: 'Antrasit Gri', ral: 'RAL 7016', hex: '#383E42' },
        ],
        warranty: '5 Yıl Üretici Garantisi',
        priceRange: 'orta',
        seoKeywords: [
            'ekonomik ısıcamlı cam balkon',
            'Twin cam balkon sistemi',
            'uygun fiyat cam balkon',
            'Beylikdüzü cam balkon fiyat',
            'çift cam balkon',
        ],
        faq: [
            {
                question: 'Twin ve Tiara Max arasındaki fark nedir?',
                answer: 'Tiara Max daha kalın cam ünitesi (28mm vs 24mm), Low-E kaplama ve termal break profil kullanır. Isı yalıtımı %30 daha iyidir ancak fiyatı da buna göre yüksektir. Bütçeniz kısıtlıysa Twin mükemmel bir alternatiftir.',
            },
        ],
        schema: {
            brand: 'Twin',
            model: 'Isıcamlı Sistem',
            offers: {
                priceCurrency: 'TRY',
                priceRange: '₺₺',
                availability: 'https://schema.org/InStock',
            },
        },
    },

    // =====================================================
    // SÜRME (SLIDING) SYSTEMS
    // =====================================================
    {
        id: 'esikli-surme',
        slug: 'esikli-surme-cam-balkon',
        name: 'Eşikli Sürme Cam Balkon',
        category: 'surme',
        subCategory: 'esikli',
        tagline: 'Maksimum Yalıtım, Geleneksel Güvenilirlik',
        description: 'Eşikli sürme sistemleri, yüksek eşik yapısı sayesinde su ve hava sızdırmazlığında en üst seviye performans sunar. Gürpınar ve Beylikdüzü bölgesinde fırtınalı havalara karşı tercih edilen çözüm.',
        longDescription: `Eşikli Sürme Cam Balkon Sistemi, geleneksel ve kanıtlanmış yapısıyla maksimum hava ve su yalıtımı sağlar. Alt ray üzerindeki 2-3cm yüksekliğindeki eşik, rüzgar ve yağmur suyunun balkonunuza girmesini fiziksel olarak engeller.

Özellikle Marmara Denizi'ne yakın Beylikdüzü, Gürpınar ve Avcılar gibi rüzgarlı bölgelerde, fırtına ve sağanak yağışlara karşı mükemmel koruma sağlar. Çift rulmanlı sürme mekanizması yumuşak ve sessiz çalışır.

3'lü veya 5'li ray sistemi ile geniş balkonlarda bile estetik görünüm korunur. Her panel bağımsız olarak hareket eder ve istenilen konumda kilitlenebilir.`,
        image: '/images/cam-balkon/cam-balkon-kose.jpg',
        gallery: [
            '/images/cam-balkon/cam-balkon-kose.jpg',
            '/images/cam-balkon/cam-balkon-sehir-manzara.jpg',
        ],
        technicalSpecs: [
            { label: 'Cam Kalınlığı', value: '8mm / 10mm Temperli', icon: 'glass' },
            { label: 'Eşik Yüksekliği', value: '25mm', icon: 'height' },
            { label: 'Ray Sistemi', value: '3\'lü veya 5\'li Ray', icon: 'rail' },
            { label: 'Max Panel Yüksekliği', value: '3000mm', icon: 'height' },
            { label: 'Rüzgar Dayanımı', value: 'C4 Sınıfı', icon: 'wind' },
            { label: 'Su Sızdırmazlık', value: 'E1500 Sınıfı', icon: 'water' },
            { label: 'Mekanizma', value: 'Çift Rulmanlı Paslanmaz', icon: 'mechanism' },
        ],
        features: [
            'Yüksek eşikli alt ray sistemi',
            '8mm veya 10mm temperli güvenlik camı',
            'Çift EPDM conta ile mükemmel sızdırmazlık',
            'Paslanmaz çelik rulman mekanizması',
            'Su tahliye kanalları',
            'Kolay açılır/kapanır kol sistemi',
            'İsteğe bağlı çocuk kilidi',
        ],
        benefits: [
            'Fırtınada bile su almaz',
            'Rüzgar sesi minimuma iner',
            'Uzun ömürlü dayanıklı yapı',
            'Kolay temizlik ve bakım',
        ],
        idealFor: [
            'Deniz kenarı daireler',
            'Fırtınalı bölgeler',
            'Su yalıtımı öncelikli mekanlar',
            'Yüksek güvenlik isteyenler',
        ],
        glassOptions: [
            { type: 'Temperli', thickness: '8mm', description: 'Standart güvenlik camı' },
            { type: 'Temperli', thickness: '10mm', description: 'Yüksek dayanıklılık' },
            { type: 'Lamine', thickness: '8+8mm', description: 'Maksimum güvenlik' },
        ],
        colorOptions: [
            { name: 'Beyaz', ral: 'RAL 9016', hex: '#F7F9FA' },
            { name: 'Antrasit Gri', ral: 'RAL 7016', hex: '#383E42' },
            { name: 'Bronz', ral: 'RAL 8022', hex: '#1A1718' },
        ],
        warranty: '5 Yıl Üretici Garantisi',
        priceRange: 'orta',
        seoKeywords: [
            'eşikli cam balkon',
            'eşikli sürme cam balkon',
            'su sızdırmaz cam balkon',
            'Beylikdüzü eşikli cam balkon',
            'rüzgar geçirmez cam balkon',
        ],
        faq: [
            {
                question: 'Eşikli sistemde ayak takılır mı?',
                answer: 'Eşik yüksekliği sadece 2.5cm olup normal yürüyüşte fark edilmez. Ancak yaşlı veya engelli bireyler için eşiksiz sistem daha uygun olabilir. Profesyonel montajda eşik köşeleri yuvarlatılır.',
            },
            {
                question: 'Hangi cam balkon sistemi daha güvenli?',
                answer: 'Güvenlik açısından eşikli sistemler daha üstündür çünkü fiziksel bariyer oluşturur. Ancak cam kalınlığı ve tipi asıl güvenlik faktörüdür. 10mm temperli veya lamine cam seçeneğini öneririz.',
            },
        ],
        schema: {
            brand: 'Akçayapı',
            model: 'Eşikli Sürme',
            offers: {
                priceCurrency: 'TRY',
                priceRange: '₺₺',
                availability: 'https://schema.org/InStock',
            },
        },
    },
    {
        id: 'esiksiz-surme',
        slug: 'esiksiz-surme-cam-balkon',
        name: 'Eşiksiz Sürme Cam Balkon',
        category: 'surme',
        subCategory: 'esiksiz',
        tagline: 'Kesintisiz Zemin, Modern Estetik',
        description: 'Eşiksiz sürme sistemleri, zemin ile balkon arasında kesintisiz geçiş sağlar. Kafe, restoran ve modern teraslar için mükemmel. İstanbul\'da eşiksiz sürme sistemleri uzmanı.',
        longDescription: `Eşiksiz Sürme Cam Balkon Sistemi, iç mekan ile dış mekan arasındaki sınırı ortadan kaldırır. Alt rayın zemin seviyesine gömülmesiyle, balkonunuz evinizin doğal bir uzantısı haline gelir.

Özellikle kafeler, restoranlar ve butik oteller için ideal olan bu sistem, tekerlekli sandalye ve bebek arabası erişimine de uygundur. Modern minimalist mimari tarzıyla mükemmel uyum sağlar.

Gizli drenaj sistemi sayesinde yağmur suyu kontrollü şekilde tahliye edilir. Özel contalama teknolojisi ile eşiksiz olmasına rağmen iyi bir hava sızdırmazlığı elde edilir.`,
        image: '/images/cam-balkon/cam-balkon-bahce-manzara.jpg',
        gallery: [
            '/images/cam-balkon/cam-balkon-bahce-manzara.jpg',
            '/images/cam-balkon/cam-balkon-sehir-manzara.jpg',
        ],
        technicalSpecs: [
            { label: 'Cam Kalınlığı', value: '8mm / 10mm Temperli', icon: 'glass' },
            { label: 'Eşik Yüksekliği', value: '0mm (Gömme Ray)', icon: 'height' },
            { label: 'Ray Sistemi', value: 'Gömme Ray Teknolojisi', icon: 'rail' },
            { label: 'Max Panel Yüksekliği', value: '2800mm', icon: 'height' },
            { label: 'Rüzgar Dayanımı', value: 'C3 Sınıfı', icon: 'wind' },
            { label: 'Su Sızdırmazlık', value: 'E900 Sınıfı', icon: 'water' },
            { label: 'Drenaj', value: 'Gizli Kanal Sistemi', icon: 'drain' },
        ],
        features: [
            'Sıfır eşik gömme ray sistemi',
            'Zemin ile aynı seviyede geçiş',
            'Gizli su tahliye kanalları',
            'Premium silikon conta sistemi',
            'Minimalist görünüm',
            'Engelli erişimine uygun',
            'Kafe/restoran lisanslı',
        ],
        benefits: [
            'Kesintisiz iç-dış mekan geçişi',
            'Modern ve şık görünüm',
            'Engelli ve yaşlı dostu',
            'Ticari mekanlara uygun',
        ],
        idealFor: [
            'Kafe ve restoranlar',
            'Modern villalar',
            'Engelli erişimli mekanlar',
            'Teras katlar',
            'Minimalist tasarım sevenler',
        ],
        glassOptions: [
            { type: 'Temperli', thickness: '8mm', description: 'Standart güvenlik camı' },
            { type: 'Temperli', thickness: '10mm', description: 'Yüksek dayanıklılık' },
        ],
        colorOptions: [
            { name: 'Antrasit Gri', ral: 'RAL 7016', hex: '#383E42' },
            { name: 'Siyah', ral: 'RAL 9005', hex: '#0A0A0A' },
            { name: 'Beyaz', ral: 'RAL 9016', hex: '#F7F9FA' },
        ],
        warranty: '5 Yıl Üretici Garantisi',
        priceRange: 'premium',
        seoKeywords: [
            'eşiksiz cam balkon',
            'eşiksiz sürme sistemleri',
            'İstanbul eşiksiz sürme sistemleri',
            'kafe cam balkon',
            'restoran cam balkon',
            'engelli uyumlu cam balkon',
            'teras cam balkon',
        ],
        faq: [
            {
                question: 'Eşiksiz sistem su sızdırır mı?',
                answer: 'Profesyonel montajda gömme ray sistemi ve gizli drenaj kanalları sayesinde yağmur suyu kontrollü şekilde tahliye edilir. Ancak çok şiddetli yağışlarda eşikli sisteme göre minimal su girişi olabilir.',
            },
        ],
        schema: {
            brand: 'Akçayapı',
            model: 'Eşiksiz Sürme',
            offers: {
                priceCurrency: 'TRY',
                priceRange: '₺₺₺',
                availability: 'https://schema.org/InStock',
            },
        },
    },

    // =====================================================
    // GİYOTİN (VERTICAL SLIDING) SYSTEMS
    // =====================================================
    {
        id: 'giyotin-motorlu',
        slug: 'motorlu-giyotin-cam-balkon',
        name: 'Motorlu Giyotin Cam Sistemi',
        category: 'giyotin',
        subCategory: 'motorlu',
        tagline: 'Tek Tuşla Kontrol, Premium Konfor',
        description: 'Somfy ve Becker motorları ile donatılmış dikey sürme (giyotin) cam sistemleri. Uzaktan kumanda, rüzgar sensörü ve akıllı ev entegrasyonu. Yüksek katlarda maksimum güvenlik.',
        longDescription: `Motorlu Giyotin Cam Sistemi, cam panellerin dikey olarak yukarı kaymasını sağlayan premium bir çözümdür. Dünya lideri Somfy ve Becker motorları ile donatılan sistem, tek tuşla veya uzaktan kumanda ile kontrol edilir.

Yüksek katlarda oturanlar için özel olarak tasarlanan rüzgar sensörü, belirli bir rüzgar hızına ulaşıldığında camları otomatik olarak kapatır. Bu özellik özellikle Beylikdüzü'ndeki yüksek rezidanslarda büyük önem taşır.

Akıllı ev sistemleriyle (Google Home, Alexa, Apple HomeKit) entegre çalışabilir. Güneş sensörü opsiyonu ile gün batımında otomatik kapanma programlanabilir. Çocuk güvenlik modu aktifken camlar uzaktan kontrol edilemez.`,
        image: "/images/panjur/panjur-motorlu-villa.jpg",
        videoUrl: 'https://www.youtube.com/embed/Ptzlx_tHdzQ',
        gallery: [
            '/images/cam-balkon/cam-balkon-gunbatimi.jpg',
            '/images/cam-balkon/cam-balkon-site-manzara.jpg',
            '/images/cam-balkon/cam-balkon-kose.jpg',
        ],
        technicalSpecs: [
            { label: 'Cam Kalınlığı', value: '8mm / 10mm Temperli', icon: 'glass' },
            { label: 'Motor Markası', value: 'Somfy / Becker', icon: 'motor' },
            { label: 'Kontrol Tipi', value: 'Uzaktan Kumanda / WiFi', icon: 'control' },
            { label: 'Sensörler', value: 'Rüzgar / Güneş / Yağmur', icon: 'sensor' },
            { label: 'Max Panel Yüksekliği', value: '2500mm', icon: 'height' },
            { label: 'Max Panel Genişliği', value: '1200mm', icon: 'width' },
            { label: 'Motor Gücü', value: '100 Nm / 150 Nm', icon: 'power' },
            { label: 'Çalışma Sesi', value: '<35 dB', icon: 'sound' },
        ],
        features: [
            'Somfy veya Becker motor seçeneği',
            'Şarjlı uzaktan kumanda',
            'WiFi entegrasyon modülü',
            'Rüzgar sensörü (otomatik kapama)',
            'Güneş sensörü opsiyonu',
            'Yağmur sensörü opsiyonu',
            'Çocuk güvenlik modu',
            'Akıllı ev uyumluluğu',
            'Kesintisiz güç kaynağı (UPS) opsiyonu',
        ],
        benefits: [
            'Tek tuşla tüm camları kontrol edin',
            'Rüzgarlı havalarda otomatik koruma',
            'Yüksek katlarda güvenli kullanım',
            'Modern ve prestijli görünüm',
            '"Eller serbest" konfor',
        ],
        idealFor: [
            'Yüksek kat rezidanslar',
            'Lüks villalar',
            'Akıllı ev sistemleri kullananlar',
            'Fiziksel zorluğu olanlar',
            'Prestij arayanlar',
        ],
        glassOptions: [
            { type: 'Temperli', thickness: '8mm', description: 'Standart güvenlik camı' },
            { type: 'Temperli', thickness: '10mm', description: 'Yüksek dayanıklılık' },
            { type: 'Lamine', thickness: '10+10mm', description: 'Maksimum güvenlik' },
        ],
        colorOptions: [
            { name: 'Antrasit Gri', ral: 'RAL 7016', hex: '#383E42' },
            { name: 'Siyah', ral: 'RAL 9005', hex: '#0A0A0A' },
            { name: 'Beyaz', ral: 'RAL 9016', hex: '#F7F9FA' },
            { name: 'Bronz', ral: 'RAL 8022', hex: '#1A1718' },
        ],
        warranty: '7 Yıl Motor Garantisi + 5 Yıl Sistem Garantisi',
        priceRange: 'premium',
        seoKeywords: [
            'motorlu cam balkon',
            'giyotin cam balkon',
            'uzaktan kumandalı cam balkon',
            'Somfy motorlu cam balkon',
            'Becker motorlu cam balkon',
            'akıllı cam balkon',
            'rüzgar sensörlü cam balkon',
            'yüksek kat cam balkon',
        ],
        faq: [
            {
                question: 'Elektrik kesilince camlar açık mı kalır?',
                answer: 'Hayır. Sistemimizde manuel override mekanizması bulunur. Elektrik kesildiğinde camları elle kapatabilirsiniz. Opsiyonel UPS (kesintisiz güç kaynağı) ile 24 saat bağımsız çalışma da mümkündür.',
            },
            {
                question: 'Rüzgar sensörü ne zaman devreye girer?',
                answer: 'Somfy rüzgar sensörümüz 45 km/saat rüzgar hızında otomatik olarak camları kapatır. Bu değer 30-60 km/saat arasında ayarlanabilir. Yüksek katlarda 35 km/saat önerilir.',
            },
        ],
        schema: {
            brand: 'Somfy/Becker',
            model: 'Motorlu Giyotin',
            offers: {
                priceCurrency: 'TRY',
                priceRange: '₺₺₺₺',
                availability: 'https://schema.org/InStock',
            },
        },
    },
    {
        id: 'giyotin-manuel',
        slug: 'manuel-giyotin-cam-balkon',
        name: 'Manuel Giyotin Cam Sistemi',
        category: 'giyotin',
        subCategory: 'manuel',
        tagline: 'Pratik Dikey Açılım, Ekonomik Çözüm',
        description: 'Manuel giyotin cam sistemleri, dikey sürme mekanizmasını ekonomik fiyatlarla sunar. Gaz pistonu destekli kolay kullanım. Beylikdüzü ve çevresinde uygun fiyatlı giyotin cam çözümleri.',
        longDescription: `Manuel Giyotin Cam Sistemi, motorlu sistemin sunduğu dikey açılım avantajını daha ekonomik bir fiyat noktasında sunar. Gaz pistonu (amortisör) destekli mekanizma sayesinde camları yukarı kaldırmak sadece tek parmakla yapılabilir.

Özellikle bütçe odaklı müşteriler için ideal olan bu sistem, motorlu versiyona göre %40-50 daha uygun fiyatlıdır. Elektrik bağlantısı gerektirmez, bu da montaj maliyetini düşürür ve bakım ihtiyacını minimuma indirir.

Sistemde kullanılan gaz pistonları otomotiv sektöründen (bagaj kapağı amortisörü) adapte edilmiştir ve 50.000+ açma/kapama döngüsü garanti edilir. Yavaş kapanma özelliği ile çarpma ve parmak sıkışma riski yoktur.`,
        image: "/images/panjur/panjur-modern-villa.jpg",
        gallery: [
            '/images/cam-balkon/cam-balkon-sehir-manzara.jpg',
            '/images/cam-balkon/cam-balkon-gunbatimi.jpg',
        ],
        technicalSpecs: [
            { label: 'Cam Kalınlığı', value: '8mm / 10mm Temperli', icon: 'glass' },
            { label: 'Mekanizma', value: 'Gaz Pistonlu Amortisör', icon: 'mechanism' },
            { label: 'Açma Kuvveti', value: '<5 kg (Tek Elle)', icon: 'force' },
            { label: 'Yavaş Kapanma', value: 'Evet (Soft Close)', icon: 'safety' },
            { label: 'Max Panel Yüksekliği', value: '2200mm', icon: 'height' },
            { label: 'Max Panel Genişliği', value: '1000mm', icon: 'width' },
            { label: 'Piston Ömrü', value: '50.000+ Döngü', icon: 'durability' },
        ],
        features: [
            'Gaz pistonu destekli kolay açılım',
            'Soft-close yavaş kapanma',
            'Elektrik gerektirmez',
            '8mm veya 10mm temperli cam',
            'Paslanmaz çelik aksesuar',
            'Kilitleme mekanizması',
            'Düşük bakım maliyeti',
            'Kompakt profil tasarımı',
        ],
        benefits: [
            'Motorlu sisteme göre %50 daha ekonomik',
            'Elektrik kesintisinden etkilenmez',
            'Minimal bakım gerektirir',
            'Pratik ve hızlı kullanım',
        ],
        idealFor: [
            'Bütçe odaklı projeler',
            'Kiralık daireler',
            'Küçük/orta boy balkonlar',
            'Elektrik bağlantısı olmayan alanlar',
            'Basit kullanım isteyenler',
        ],
        glassOptions: [
            { type: 'Temperli', thickness: '8mm', description: 'Standart güvenlik camı' },
            { type: 'Temperli', thickness: '10mm', description: 'Artırılmış dayanıklılık' },
        ],
        colorOptions: [
            { name: 'Beyaz', ral: 'RAL 9016', hex: '#F7F9FA' },
            { name: 'Antrasit Gri', ral: 'RAL 7016', hex: '#383E42' },
            { name: 'Siyah', ral: 'RAL 9005', hex: '#0A0A0A' },
        ],
        warranty: '5 Yıl Sistem Garantisi',
        priceRange: 'orta',
        seoKeywords: [
            'manuel giyotin cam balkon',
            'ekonomik giyotin cam',
            'gaz pistonlu cam balkon',
            'ucuz giyotin cam sistemi',
            'dikey sürme cam balkon',
            'amortisörlü cam balkon',
        ],
        faq: [
            {
                question: 'Manuel giyotin ağır mı kullanılıyor?',
                answer: 'Hayır. Gaz pistonu desteği sayesinde 10 yaşındaki bir çocuk bile camları kolayca kaldırabilir. Açma kuvveti 5 kg\'ın altındadır ve tek elle rahatça yapılır.',
            },
            {
                question: 'Gaz pistonu ne zaman değiştirilmeli?',
                answer: 'Kaliteli gaz pistonları 8-10 yıl sorunsuz çalışır. Camın kendiliğinden düşmesi veya açmada zorlanma hissederseniz piston değişimi gerekir. Değişim maliyeti oldukça düşüktür.',
            },
        ],
        schema: {
            brand: 'Akçayapı',
            model: 'Manuel Giyotin',
            offers: {
                priceCurrency: 'TRY',
                priceRange: '₺₺',
                availability: 'https://schema.org/InStock',
            },
        },
    },

    // =====================================================
    // KATLANIR (FOLDING) SYSTEMS
    // =====================================================
    {
        id: 'katlanir-8li',
        slug: 'katlanir-cam-balkon-sistemi',
        name: 'Katlanır Cam Balkon Sistemi',
        category: 'katlanir',
        subCategory: 'standart',
        tagline: '%100 Açılım, Sınırsız Manzara',
        description: 'Katlanır cam balkon sistemleri ile balkonunuzun tamamını açın. 8\'li, 10\'lu veya 12\'li panel seçenekleriyle her boyut balkona uygun çözümler. Panoramik görüntü için ideal.',
        longDescription: `Katlanır Cam Balkon Sistemi, cam panellerin akordeon gibi katlanarak bir kenara toplanmasını sağlar. Bu sayede balkonunuzun %90-100'ünü açabilir, dışarıyla bütünleşme hissini yaşayabilirsiniz.

Özel tasarım menteşe sistemi sayesinde paneller hem iç hem dış yöne katlanabilir. 3'lü, 4'lü veya daha fazla panel grupları halinde çalışan sistem, geniş balkonlarda bile estetik bir görünüm sunar.

Alt ve üst ray arası maksimum panel yüksekliği 3200mm'ye kadar çıkabilir. Özel sipariş ile 3500mm'ye kadar üretim yapılabilir. Tüm paneller temperli güvenlik camından üretilir.`,
        image: '/images/cam-balkon/cam-balkon-site-manzara.jpg',
        gallery: [
            '/images/cam-balkon/cam-balkon-site-manzara.jpg',
            '/images/cam-balkon/cam-balkon-bahce-manzara.jpg',
            '/images/cam-balkon/cam-balkon-kose.jpg',
        ],
        technicalSpecs: [
            { label: 'Cam Kalınlığı', value: '8mm / 10mm Temperli', icon: 'glass' },
            { label: 'Panel Sayısı', value: '4-12 Panel', icon: 'panel' },
            { label: 'Açılım Oranı', value: '%90-100', icon: 'open' },
            { label: 'Max Panel Yüksekliği', value: '3200mm', icon: 'height' },
            { label: 'Max Panel Genişliği', value: '900mm', icon: 'width' },
            { label: 'Katlama Yönü', value: 'İç / Dış / Çift Yön', icon: 'direction' },
            { label: 'Menteşe Tipi', value: '180° Paslanmaz', icon: 'hinge' },
        ],
        features: [
            '8mm veya 10mm temperli güvenlik camı',
            'Paslanmaz çelik menteşe sistemi',
            'Çift yönlü katlama opsiyonu',
            '%100\'e yakın açılım',
            'Kolay tek elle kullanım',
            'Çocuk güvenlik kilidi',
            'Su tahliye kanalları',
            'EPDM conta sistemi',
        ],
        benefits: [
            'Balkonun tamamı açılabilir',
            'Manzara engelsiz görünür',
            'Temizlik çok kolay',
            'Estetik ve modern görünüm',
        ],
        idealFor: [
            'Manzaralı daireler',
            'Geniş balkonlar',
            'Açıklık isteyenler',
            'Teras katlar',
        ],
        glassOptions: [
            { type: 'Temperli', thickness: '8mm', description: 'Standart güvenlik camı' },
            { type: 'Temperli', thickness: '10mm', description: 'Yüksek katlarda önerilen' },
            { type: 'Lamine', thickness: '8+8mm', description: 'Maksimum güvenlik' },
        ],
        colorOptions: [
            { name: 'Beyaz', ral: 'RAL 9016', hex: '#F7F9FA' },
            { name: 'Antrasit Gri', ral: 'RAL 7016', hex: '#383E42' },
            { name: 'Bronz', ral: 'RAL 8022', hex: '#1A1718' },
            { name: 'Ceviz', ral: 'Wood Grain', hex: '#5D432C' },
        ],
        warranty: '5 Yıl Üretici Garantisi',
        priceRange: 'orta',
        seoKeywords: [
            'katlanır cam balkon',
            'katlanır cam balkon fiyatları',
            'akordeon cam balkon',
            'panoramik cam balkon',
            'Beylikdüzü katlanır cam balkon',
            'geniş açılımlı cam balkon',
        ],
        faq: [
            {
                question: 'Katlanır sistem rüzgarda sallanır mı?',
                answer: 'Kaliteli menteşe ve kilit sistemi olan katlanır cam balkonlar rüzgarda sallanmaz. Sistemimizde her panel üst ve alt rayda sabitlenir, ayrıca kapalı konumda merkezi kilitleme bulunur.',
            },
        ],
        schema: {
            brand: 'Akçayapı',
            model: 'Katlanır Sistem',
            offers: {
                priceCurrency: 'TRY',
                priceRange: '₺₺',
                availability: 'https://schema.org/InStock',
            },
        },
    },
];

// Comparison matrix data for interactive table
export const comparisonMatrix = {
    systems: [
        {
            id: 'katlanir',
            name: 'Katlanır Sistem',
            insulation: 2,
            cleaning: 5,
            windResistance: 3,
            pricePoint: 2,
            aesthetics: 4,
            spaceEfficiency: 5,
        },
        {
            id: 'esikli-surme',
            name: 'Eşikli Sürme',
            insulation: 4,
            cleaning: 3,
            windResistance: 5,
            pricePoint: 2,
            aesthetics: 3,
            spaceEfficiency: 3,
        },
        {
            id: 'esiksiz-surme',
            name: 'Eşiksiz Sürme',
            insulation: 3,
            cleaning: 3,
            windResistance: 3,
            pricePoint: 3,
            aesthetics: 5,
            spaceEfficiency: 3,
        },
        {
            id: 'giyotin-motorlu',
            name: 'Motorlu Giyotin',
            insulation: 4,
            cleaning: 4,
            windResistance: 4,
            pricePoint: 5,
            aesthetics: 5,
            spaceEfficiency: 4,
        },
        {
            id: 'giyotin-manuel',
            name: 'Manuel Giyotin',
            insulation: 4,
            cleaning: 4,
            windResistance: 4,
            pricePoint: 3,
            aesthetics: 4,
            spaceEfficiency: 4,
        },
        {
            id: 'isicamli',
            name: 'Isıcamlı Sistem',
            insulation: 5,
            cleaning: 3,
            windResistance: 5,
            pricePoint: 4,
            aesthetics: 4,
            spaceEfficiency: 2,
        },
    ],
    legend: {
        1: 'Düşük',
        2: 'Orta-Düşük',
        3: 'Orta',
        4: 'İyi',
        5: 'Mükemmel',
    },
};

// SEO keyword clusters - Updated January 2026
export const seoKeywordClusters = {
    local: [
        'Beylikdüzü ısıcamlı cam balkon',
        'İstanbul eşiksiz sürme sistemleri',
        'Gürpınar cam balkon tamiri',
        'Büyükçekmece cam balkon fiyatları',
        'Esenyurt cam balkon montaj',
        'Avcılar cam balkon ustası',
        'Beylikdüzü cam balkon ustası',
        'İstanbul motorlu giyotin cam',
        'Gürpınar ısı yalıtımlı balkon',
    ],
    problemSolving: [
        'Cam balkon su sızdırır mı?',
        'Isıcamlı cam balkon kışın ısıtır mı?',
        'Hangi cam balkon sistemi daha güvenli?',
        'Cam balkon kaç yıl dayanır?',
        'Motorlu cam balkon arıza yapar mı?',
        '8mm mi 10mm cam mı daha iyi?',
        'Temperli cam mı lamine cam mı güvenli?',
        'Cam balkon yoğuşma yapar mı?',
        'Eşikli mi eşiksiz mi cam balkon?',
        'Argon gazlı cam ne işe yarar?',
    ],
    transactional: [
        'cam balkon fiyat teklifi',
        'cam balkon montaj ücreti',
        'cam balkon metrekare fiyat 2026',
        'en ucuz cam balkon',
        'kaliteli cam balkon markası',
        'cam balkon ücretsiz keşif',
        'cam balkon kampanya',
        'taksitli cam balkon',
    ],
    informational: [
        'cam balkon nasıl temizlenir',
        'cam balkon bakımı nasıl yapılır',
        'cam balkon ömrü ne kadar',
        'cam balkon belediye izni gerekir mi',
        'cam balkon kat mülkiyeti sorunu',
    ],
};

// Helper function to get system by slug
export function getSystemBySlug(slug: string): GlassSystem | undefined {
    return glassSystems.find((system) => system.slug === slug);
}

// Helper function to get systems by category
export function getSystemsByCategory(category: GlassSystem['category']): GlassSystem[] {
    return glassSystems.filter((system) => system.category === category);
}

// Helper function to get related systems
export function getRelatedSystems(currentId: string, limit: number = 3): GlassSystem[] {
    const current = glassSystems.find((s) => s.id === currentId);
    if (!current) return glassSystems.slice(0, limit);

    return glassSystems
        .filter((s) => s.id !== currentId && s.category === current.category)
        .slice(0, limit);
}
