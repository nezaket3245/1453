/**
 * Egepen Deceuninck PVC Product Data
 * Comprehensive technical specifications for all product series
 * Source: egepen.com.tr official product catalog (Ocak 2026)
 * Son Güncelleme: 30 Ocak 2026
 */

export interface PVCProductSeries {
    id: string;
    name: string;
    slug: string;
    tagline: string;
    description: string;
    longDescription: string;
    image: string;
    category: "pencere" | "surme" | "kapi";
    featured: boolean;
    technicalSpecs: {
        profileWidth: number; // mm
        chambers: number; // Odacık sayısı
        gasketSystem: string; // Conta sistemi
        thermalInsulation: string; // Uw value W/m²K
        airTightness: string; // Class
        waterTightness: string; // Pa
        windResistance: string; // Class
        acousticInsulation: string; // dB
        glassThickness?: string; // Cam kalınlıkları
        standard?: string; // Standart
    };
    features: string[];
    benefits: string[];
    applications: string[];
    seoKeywords: string[];
    officialUrl?: string; // Egepen resmi sayfa linki
}

export interface RepairService {
    id: string;
    name: string;
    slug: string;
    description: string;
    icon: string;
    keywords: string[];
    price: string;
    duration: string;
}

/**
 * Egepen Product Series Data
 * Complete catalog based on official Egepen Deceuninck website
 * PVC Pencere ve Kapı Sistemleri: Legend, Legend Art, Zendow
 * PVC Sürme Sistemleri: Legend Sürme, Legend Sürme Plus, Sürme, HS76 Sürme, Slimslide
 */
export const pvcProductSeries: PVCProductSeries[] = [
    // ==================== PVC PENCERE VE KAPI SİSTEMLERİ ====================
    {
        id: "legend",
        name: "Legend Sistemi",
        slug: "legend-pvc-pencere",
        tagline: "Isı ve Ses Yalıtımında Yüksek Performans",
        description: "80mm profil genişliği ve 6 odacıklı yapısıyla ısı yalıtımında en üstün performans sunan premium seri.",
        longDescription: `Legend PVC Pencere ve Kapı Sistemi, 80 mm oturma genişliğine göre, 6 odalı olarak tasarlanmıştır. Sistemin tasarımında özellikle yüksek performans kriterleri göz önünde bulundurularak, profiller en uygun yapı taşlarının bir araya getirilmesi ile oluşturulmuştur.

Tasarım süreci, profilin yanı sıra, pencere performansı olarak, yalıtım (ısı ve ses), mukavemet, sızdırmazlık özellikleri bütünsel olarak değerlendirilmiştir. Sistemdeki profiller, EN12608-1 standardına uygun olarak üretilmektedir.

Legend PVC Pencere ve Kapı Sistemi, pencerenin mekanınıza en iyi ısı yalıtımını sağlaması amacı ile birçok önemli yapı taşını bir araya getirecek şekilde tasarlanmıştır. Sistemin, 80 mm platformunda olması, 6 odacıklı, 3 conta (orta conta) konseptleri bir araya getirilmesi ile daha düşük ısı ve iletkenlik katsayısı (Uf) hedeflenmiştir.

Özellikle sistemin 80 mm genişlik üzerinde yapılandırılması, 52 mm cam kalınlığına sahip düşük Ug değerindeki üçlü cam uygulamalarına olanak sağlamaktadır. Böylelikle pencerenize ait ısı iletkenlik değeri, profil kesiti ve cama ait ısıl değerlerin bir araya gelmesi ile üstün Uw pencere değerini oluşturmaktadır (Uw: 0.78 W/m²K).`,
        image: "/images/pvc/legend-reklam.jpg",
        category: "pencere",
        featured: true,
        technicalSpecs: {
            profileWidth: 80,
            chambers: 6,
            gasketSystem: "3 Conta (Orta Contalı) - TPE Gri/Siyah",
            thermalInsulation: "Uf: 0.92 W/m²K",
            airTightness: "Class 4",
            waterTightness: "9A (600 Pa)",
            windResistance: "Class C5",
            acousticInsulation: "45 dB",
            glassThickness: "24, 30, 36, 44, 52 mm",
            standard: "EN 12608-1",
        },
        features: [
            "80mm profil genişliği",
            "6 odacıklı yapı",
            "3 sıra TPE conta (Orta Contalı)",
            "52mm'e kadar cam desteği",
            "Çelik takviyeli profil",
            "Tek Tırnaklı PCE Contalı çıta",
            "UV dayanımlı yüzey",
            "40+ renk seçeneği",
            "Gizli drenaj sistemi",
        ],
        benefits: [
            "IFT-Rosenheim onaylı Uw: 0.78 W/m²K pencere değeri",
            "Enerji faturalarında %45'e varan tasarruf",
            "Üstün ses yalıtımı ile sessiz yaşam alanları",
            "Yüksek statik güç ile geniş ebatlı pencere imkanı",
            "10 yıl Egepen garantisi",
        ],
        applications: [
            "Lüks konutlar",
            "Villa projeleri",
            "Yüksek katlı binalar",
            "Enerji verimli yapılar",
            "Pasif ev projeleri",
        ],
        seoKeywords: [
            "Legend PVC pencere",
            "Egepen Legend",
            "80mm profil pencere",
            "6 odacık PVC",
            "A+ enerji pencere",
            "en iyi ısı yalıtımlı pencere",
            "Beylikdüzü Legend pencere",
        ],
        officialUrl: "https://www.egepen.com.tr/legend-sistemi-42",
    },
    {
        id: "legend-art",
        name: "Legend Art Sistemi",
        slug: "legend-art-pvc-pencere",
        tagline: "Zarif Tasarımın Mükemmel Performans ile Buluşması",
        description: "70mm profil genişliği ve modern çizgileriyle estetik ve şıklığı ön plana çıkaran, mekanların mimarisiyle uyum içinde tasarlanmış sistem.",
        longDescription: `LegendArt Pencere ve Kapı Sistemi, en ince ayrıntısına kadar düşünülmüş mükemmel tasarımıyla mekanlarınızın tarzına uyum sağlayarak estetik ve şıklığı ön plana çıkartmaktadır. 

Modern ve zarif çizgileri ile mekanların mimarisiyle ve dekorasyonuyla uyum içinde olan, akustik yalıtımı ve statik güç özelliği ile her mekânı mükemmel yaşam alanlarına dönüştüren LegendArt Sistemi, doğa dostu ürünler sunuyor.

5 odacıklı tasarımı ve 70 mm genişliği ile mükemmel bir ısı yalıtımına sahip olan LegendArt Sistemi'ne ait ısı iletim katsayısı (Uf), değeri 1,1 - 1,3 W/m²K olarak belirlenmiştir. Zarif ince kulak tasarımı sayesinde kalın cam kullanımına olanak sağlayarak pencere ısı yalıtımında 0,9 W/m²K'nin altında performans sunmaktadır.

LegendArt Sistemi, içerisinde yer alan ürün çeşitliliği ile her detaya uygunluk sağlamaktadır. Rüzgârın fazla olduğu bölgelerde bile, statik ortakayıt ve cephe profilleri ile en uygun çözümlere kolaylıkla ulaşılabilir.`,
        image: "/images/pvc/pvc-kapi-bahce.jpg",
        category: "pencere",
        featured: true,
        technicalSpecs: {
            profileWidth: 70,
            chambers: 5,
            gasketSystem: "2/3 Conta (Orta Contalı) - TPE Gri/Siyah",
            thermalInsulation: "Uf: 1.1 - 1.3 W/m²K",
            airTightness: "Class 4",
            waterTightness: "7A (450 Pa)",
            windResistance: "Class C4",
            acousticInsulation: "42 dB",
            glassThickness: "4, 24, 30, 36, 38, 44, 46, 48 mm",
            standard: "TS EN 12608-1",
        },
        features: [
            "70mm profil genişliği",
            "5 odacıklı yapı",
            "Zarif ince kulak tasarımı",
            "48mm'e kadar cam desteği",
            "Statik ortakayıt ve cephe profilleri",
            "Modern ve zarif çizgiler",
            "Doğa dostu üretim",
            "Geniş renk seçenekleri",
        ],
        benefits: [
            "Pencere ısı yalıtımında 0.9 W/m²K altı performans",
            "Estetik ve şık görünüm",
            "Yüksek akustik yalıtım performansı",
            "Rüzgarlı bölgelerde bile mükemmel çözüm",
            "10 yıl Egepen garantisi",
        ],
        applications: [
            "Modern konutlar",
            "Lüks apartmanlar",
            "Ofis binaları",
            "Butik oteller",
            "Renovasyon projeleri",
        ],
        seoKeywords: [
            "Legend Art PVC pencere",
            "Egepen Legend Art",
            "70mm profil pencere",
            "zarif pencere tasarımı",
            "modern PVC pencere",
            "Beylikdüzü Legend Art",
        ],
        officialUrl: "https://www.egepen.com.tr/legend-art-sistemi-43",
    },
    {
        id: "zendow",
        name: "Zendow Sistemi",
        slug: "zendow-pvc-pencere",
        tagline: "Size ve Çevreye Karşılığını Ödeyen Bir Yatırım",
        description: "70mm profil genişliği ve 5 odacıklı yapısıyla mükemmel tasarım, estetik özellikler ve çevre dostu üretim sunan sistem.",
        longDescription: `Zendow PVC Pencere ve Kapı Sistemi, mükemmel tasarımı ve estetik özellikleriyle mekanlarınızın tarzına zahmetsizce uyum sağlar. Her detayında özenle düşünülmüş bu sistem, hem işlevsellik hem de görsellik açısından yüksek standartlar sunar.

Modern çizgileri, zarif detayları ve uyumlu yapısıyla farklı mimari stillere kusursuz bir şekilde adapte olur. Zendow, yalnızca şıklığıyla değil, aynı zamanda dayanıklılığı ve uzun ömürlü yapısıyla da mekanlarınıza değer katmak için tasarlanmıştır.

5 odacıklı tasarımı ve 70 mm genişliği ile ısı yalıtımı açısından mükemmel bir performansa sahiptir. Sisteme ait ısı iletim katsayısı (Uf), IFT Rosenheim'da yapılan testler sonucunda 1,3 - 1,4 W/m²K olarak belirlenmiştir.

Günümüzün gürültülü yaşam alanlarında, mekanların akustik yalıtımı büyük önem taşımaktadır. Zendow PVC Pencere ve Kapı Sistemi, elle yerleştirilen fitillere göre daha iyi akustik yalıtım sunan 2 bölmeli fitilleri bünyesinde barındırır.

Zendow PVC Pencere ve Kapı Sistemi'nin pencere ve kapıları yüksek yalıtım değerleriyle daha sağlıklı bir çevre ortamı yaratmanın yanı sıra uzun ömrü, az bakım gereksinimi ve kullanım ömürlerinin sonunda %100 geri dönüştürülebilirlik ve yeniden işlenebilirlik özellikleriyle de öne çıkmaktadır.`,
        image: "/images/pvc/pvc-kis-bahcesi.jpg",
        category: "pencere",
        featured: true,
        technicalSpecs: {
            profileWidth: 70,
            chambers: 5,
            gasketSystem: "2/3 Conta (Orta Conta opsiyonel) - TPE Gri/Siyah",
            thermalInsulation: "Uf: 1.3 - 1.4 W/m²K",
            airTightness: "Class 4",
            waterTightness: "7A (450 Pa)",
            windResistance: "Class C4",
            acousticInsulation: "40 dB",
            glassThickness: "4, 20, 24, 30, 36, 44 mm",
            standard: "TS EN 12608-1 B Sınıfı",
        },
        features: [
            "70mm profil genişliği",
            "5 odacıklı yapı",
            "2 bölmeli fitil sistemi",
            "44mm'e kadar cam desteği",
            "Statik ortakayıt ve cephe profilleri",
            "%100 geri dönüştürülebilir",
            "Az bakım gereksinimi",
            "Uzun ömürlü yapı",
        ],
        benefits: [
            "IFT Rosenheim onaylı ısı yalıtımı",
            "Üstün akustik performans",
            "Çevre dostu ve sürdürülebilir",
            "Konforu ve estetiği bir arada sunar",
            "10 yıl Egepen garantisi",
        ],
        applications: [
            "Konutlar",
            "Apartmanlar",
            "Ofis binaları",
            "Ticari yapılar",
            "Çevre dostu yapılar",
        ],
        seoKeywords: [
            "Zendow PVC pencere",
            "Egepen Zendow",
            "70mm profil pencere",
            "çevre dostu pencere",
            "sürdürülebilir pencere",
            "Beylikdüzü Zendow",
        ],
        officialUrl: "https://www.egepen.com.tr/zendow-sistemi-115",
    },

    // ==================== PVC SÜRME SİSTEMLERİ ====================
    {
        id: "legend-surme",
        name: "Legend Sürme Sistemi",
        slug: "legend-surme-sistem",
        tagline: "Ses ve Hava Yalıtımında Üst Düzey Performans",
        description: "Legend serisinin üstün yalıtım özelliklerini sürme sistem formatına aktaran premium çözüm.",
        longDescription: `Deceuninck Legend Sürme Kapı ve Pencere Sistemleri ile ses ve hava yalıtımında üst düzey bir performans sunuyor.

Legend Sürme, Legend serisinin tüm avantajlarını sürme sistemlere taşıyan premium bir çözümdür. Geniş açıklıkları sorunsuzca kapatabilir ve ağır cam panelleri bile tek parmakla hareket ettirebilen patentli rulmanlı taşıyıcı sistemiyle dikkat çeker.

Özellikle balkon, teras ve kış bahçesi uygulamalarında tercih edilen Legend Sürme, modern yaşam alanlarının vazgeçilmez çözümüdür.`,
        image: "/images/pvc/pvc-villa-surme-gece.jpg",
        category: "surme",
        featured: true,
        technicalSpecs: {
            profileWidth: 80,
            chambers: 6,
            gasketSystem: "Fırça + TPE Hibrit",
            thermalInsulation: "Uw ≤ 1.4 W/m²K",
            airTightness: "Class 3",
            waterTightness: "5A (250 Pa)",
            windResistance: "Class C3",
            acousticInsulation: "38 dB",
        },
        features: [
            "6 metreye kadar açıklık",
            "Patentli rulmanlı taşıyıcı",
            "Motorlu opsiyon",
            "Eşiksiz geçiş",
            "Çocuk kilidi standardı",
            "Yüksek hava yalıtımı",
        ],
        benefits: [
            "İç ve dış mekan bağlantısı",
            "Kolay kullanım",
            "Geniş cam yüzeyi",
            "Modern yaşam alanları",
        ],
        applications: [
            "Balkon sistemleri",
            "Teras kapıları",
            "Kış bahçeleri",
            "Villa çıkışları",
        ],
        seoKeywords: [
            "Legend Sürme",
            "Egepen sürme pencere",
            "sürme PVC pencere",
            "balkon sürme sistemi",
            "Beylikdüzü sürme pencere",
        ],
        officialUrl: "https://www.egepen.com.tr/legend-surme-sistemi-127",
    },
    {
        id: "legend-surme-plus",
        name: "Legend Sürme Plus Sistemi",
        slug: "legend-surme-plus-sistem",
        tagline: "Geliştirilmiş Ses ve Hava Yalıtımı",
        description: "Legend Sürme sisteminin geliştirilmiş versiyonu - daha üstün ses ve hava yalıtımı özellikleri.",
        longDescription: `Deceuninck Legend Sürme Plus Kapı ve Pencere Sistemleri ile ses ve hava yalıtımında üst düzey bir performans sunuyor.

Legend Sürme Plus, standart Legend Sürme sisteminin tüm özelliklerini korurken, geliştirilmiş conta sistemi ve optimize edilmiş profil geometrisi sayesinde daha yüksek ses ve hava yalıtımı değerleri sunmaktadır.`,
        image: "/images/pvc/pvc-surme-salon.jpg",
        category: "surme",
        featured: true,
        technicalSpecs: {
            profileWidth: 80,
            chambers: 6,
            gasketSystem: "Geliştirilmiş TPE + Fırça Hibrit",
            thermalInsulation: "Uw ≤ 1.3 W/m²K",
            airTightness: "Class 4",
            waterTightness: "6A (300 Pa)",
            windResistance: "Class C4",
            acousticInsulation: "42 dB",
        },
        features: [
            "Geliştirilmiş conta sistemi",
            "Üstün hava sızdırmazlık",
            "6 metreye kadar açıklık",
            "Motorlu opsiyon",
            "Eşiksiz geçiş",
        ],
        benefits: [
            "Premium yalıtım performansı",
            "Sessiz yaşam alanları",
            "Enerji tasarrufu",
            "Modern görünüm",
        ],
        applications: [
            "Lüks konutlar",
            "Villa projeleri",
            "Penthouse daireler",
            "Otel projeleri",
        ],
        seoKeywords: [
            "Legend Sürme Plus",
            "premium sürme pencere",
            "üstün yalıtımlı sürme",
            "Beylikdüzü sürme pencere",
        ],
        officialUrl: "https://www.egepen.com.tr/legend-surme-plus-295",
    },
    {
        id: "surme-sistemi",
        name: "Sürme Sistemi",
        slug: "standart-surme-sistem",
        tagline: "Bırakın, Görüş Açınız Daha da Genişlesin",
        description: "Ekonomik fiyatıyla geniş görüş açısı ve kolay kullanım sunan standart sürme sistem.",
        longDescription: `Sürme Sistemi, ekonomik fiyatıyla geniş görüş açısı sunar. Balkon ve teras kapıları için ideal bir çözüm olan bu sistem, kolay kullanımı ve uygun fiyatı ile tercih edilmektedir.

Geniş cam yüzeyleri ile iç mekanlarınıza bolca doğal ışık girmesini sağlar ve dış manzarayla bağlantı kurar.`,
        image: "/images/pvc/pvc-surme-manzara.jpg",
        category: "surme",
        featured: false,
        technicalSpecs: {
            profileWidth: 70,
            chambers: 5,
            gasketSystem: "Fırça Conta",
            thermalInsulation: "Uw ≤ 1.6 W/m²K",
            airTightness: "Class 2",
            waterTightness: "4A (150 Pa)",
            windResistance: "Class C2",
            acousticInsulation: "35 dB",
        },
        features: [
            "Ekonomik fiyat",
            "Kolay kullanım",
            "Geniş görüş alanı",
            "Hafif yapı",
            "Kompakt mekanizma",
        ],
        benefits: [
            "Uygun bütçe",
            "Doğal ışık bolluğu",
            "Basit bakım",
            "Hızlı montaj",
        ],
        applications: [
            "Balkon kapıları",
            "Teras çıkışları",
            "Standart konutlar",
            "Bütçe odaklı projeler",
        ],
        seoKeywords: [
            "sürme pencere",
            "ekonomik sürme sistem",
            "balkon kapısı",
            "Beylikdüzü sürme",
        ],
        officialUrl: "https://www.egepen.com.tr/surme-sistemi-129",
    },
    {
        id: "hs76-surme",
        name: "HS76 Sürme Sistemi",
        slug: "hs76-kaldirma-surme-sistem",
        tagline: "Mimari Sınırları Aşan Kaldırma-Sürme",
        description: "Devasa cam panelleri tek parmakla hareket ettiren, en gelişmiş kaldırma-sürme teknolojisi.",
        longDescription: `HS76 Sürme Sistemi (Hebe-Schiebe-Tür), Almanca'da "Kaldırma-Sürme Kapı" anlamına gelir. Bu sistem, standart sürme sistemlerden farklı olarak, önce kanat kaldırılır, ardından sürgü hareketi gerçekleştirilir.

Bu mekanizma sayesinde, 400 kg'a kadar ağırlıktaki cam paneller bile minimum eforla hareket ettirilebilir. 3 metreye kadar yükseklik ve geniş açıklık desteği sunan HS76, lüks konut ve otel projelerinin vazgeçilmezidir.

Bırakın, görüş açınız daha da genişlesin...`,
        image: "/images/pvc/pvc-surme-deniz-manzara.jpg",
        category: "surme",
        featured: true,
        technicalSpecs: {
            profileWidth: 76,
            chambers: 5,
            gasketSystem: "3 Conta Çepeçevre",
            thermalInsulation: "Uw ≤ 1.2 W/m²K",
            airTightness: "Class 4",
            waterTightness: "9A (600 Pa)",
            windResistance: "Class C4",
            acousticInsulation: "42 dB",
        },
        features: [
            "400 kg taşıma kapasitesi",
            "Kaldırma-sürme mekanizması",
            "3 metre yükseklik desteği",
            "Çepeçevre sızdırmazlık",
            "Gömme eşik opsiyonu",
            "Motorlu versiyon mevcut",
        ],
        benefits: [
            "Ultra büyük açıklıklar",
            "Lüks görünüm",
            "Profesyonel mekanizma",
            "Uzun ömürlü kullanım",
        ],
        applications: [
            "Lüks villalar",
            "5 yıldızlı oteller",
            "Penthouse daireler",
            "Mimari projeler",
        ],
        seoKeywords: [
            "HS76 sürme",
            "kaldırma sürme kapı",
            "HST sistemi",
            "lüks sürme pencere",
            "villa sürme sistemi",
        ],
        officialUrl: "https://www.egepen.com.tr/hs76-surme-sistemi-128",
    },
    {
        id: "slimslide",
        name: "Slimslide Sistemi",
        slug: "slimslide-surme-sistem",
        tagline: "Geniş Görüş Açısı, Tek Hamleyle Açılım",
        description: "Ultra-ince profilleriyle panoramik manzara sunan yenilikçi sürme sistem.",
        longDescription: `Slimslide, geniş bir görüş açısı sağlayarak, teras, balkon ve bahçelerinize açılan kapılarınızı manzaranızı bölmeden dış dünya ile birleştirebilir, tek hamle ile hiç zorlanmadan açıp kapatabilirsiniz.

Minimal profil tasarımı sayesinde neredeyse görünmez bir çerçeve efekti yaratır. Özellikle deniz, orman veya şehir manzaralı mekanlarda tercih edilen Slimslide, iç mekanla dış mekan arasındaki sınırları ortadan kaldırır.`,
        image: "/images/pvc/pvc-surme-manzara.jpg",
        category: "surme",
        featured: false,
        technicalSpecs: {
            profileWidth: 70,
            chambers: 4,
            gasketSystem: "2 Conta (Silikon)",
            thermalInsulation: "Uw ≤ 1.6 W/m²K",
            airTightness: "Class 2",
            waterTightness: "4A (150 Pa)",
            windResistance: "Class C2",
            acousticInsulation: "35 dB",
        },
        features: [
            "Ultra-ince görünür profil",
            "Panoramik görüş",
            "Tek hamleyle açılım",
            "Hafif yapı",
            "Kolay montaj",
            "Kompakt mekanizma",
        ],
        benefits: [
            "Engelsiz manzara",
            "Modern estetik",
            "Hafif kullanım",
            "Aydınlık mekanlar",
        ],
        applications: [
            "Manzaralı daireler",
            "Kafe ve restoranlar",
            "Showroom",
            "Yazlık evler",
            "Teras kapıları",
        ],
        seoKeywords: [
            "Slimslide sürme",
            "ince profil sürme",
            "panoramik sürme sistem",
            "minimal sürme pencere",
            "Beylikdüzü Slimslide",
        ],
        officialUrl: "https://www.egepen.com.tr/slimslide-247",
    },
];

/**
 * Repair and Maintenance Services
 * Common PVC window/door repair operations
 */
export const repairServices: RepairService[] = [
    {
        id: "ispanyolet-degisimi",
        name: "İspanyolet Değişimi",
        slug: "ispanyolet-degisimi",
        description: "Pencere ve kapılarınızın kilit mekanizmasının (ispanyolet) tamamen yenilenmesi. Kapanmayan, gevşeyen veya kırılan ispanyoletlerin profesyonel değişimi.",
        icon: "🔐",
        keywords: ["ispanyolet değişimi", "pencere kilidi tamiri", "kapı kilidi değişimi", "PVC kilit mekanizması"],
        price: "250₺'den başlayan",
        duration: "30-45 dakika",
    },
    {
        id: "fitil-yenileme",
        name: "Fitil Yenileme",
        slug: "fitil-yenileme",
        description: "Zamanla sertleşen, çatlayan veya etkisini kaybeden pencere fitillerinin (contaların) tamamen yenilenmesi. Isı ve ses yalıtımınızı geri kazandırır.",
        icon: "🧊",
        keywords: ["fitil yenileme", "pencere contası", "PVC conta değişimi", "yalıtım fitili"],
        price: "150₺/metre'den başlayan",
        duration: "1-2 saat",
    },
    {
        id: "isi-cam-degisimi",
        name: "Isı Cam Değişimi",
        slug: "isi-cam-degisimi",
        description: "Kırılan, buğulanan veya arasına su giren ısı camlarının (çift cam, üçlü cam) profesyonel değişimi. Cam arası buğulanma sorununu tamamen çözer.",
        icon: "🪟",
        keywords: ["ısı cam değişimi", "çift cam tamiri", "cam buğulanması", "pencere camı değişimi"],
        price: "300₺/m²'den başlayan",
        duration: "1-3 saat",
    },
    {
        id: "mekanizma-onarimi",
        name: "Mekanizma Onarımı",
        slug: "mekanizma-onarimi",
        description: "Menteşe, kol, açma-kapama mekanizması, kilitlenme sistemi gibi tüm hareketli parçaların bakımı, yağlanması ve gerekirse değişimi.",
        icon: "⚙️",
        keywords: ["pencere mekanizması tamiri", "menteşe değişimi", "kol tamiri", "PVC mekanizma"],
        price: "200₺'den başlayan",
        duration: "30 dakika - 1 saat",
    },
    {
        id: "pvc-profil-temizligi",
        name: "PVC Profil Temizliği",
        slug: "pvc-profil-temizligi",
        description: "Profesyonel kimyasallarla derinlemesine profil temizliği, sararmış yüzeylerin beyazlatılması, leke çıkarma ve koruyucu cila uygulaması.",
        icon: "✨",
        keywords: ["PVC temizliği", "pencere temizliği", "profil beyazlatma", "pencere bakımı"],
        price: "50₺/pencere'den başlayan",
        duration: "15-20 dakika/pencere",
    },
    {
        id: "sineklik-montaji",
        name: "Sineklik Montajı",
        slug: "sineklik-montaji",
        description: "Menteşeli, sürme veya pileli sineklik sistemlerinin profesyonel montajı. Mevcut pencerelerinize uyumlu özel ölçü üretim.",
        icon: "🦟",
        keywords: ["sineklik montajı", "pileli sineklik", "sürme sineklik", "pencere sinekliği"],
        price: "200₺/m²'den başlayan",
        duration: "30-45 dakika/pencere",
    },
    {
        id: "panjur-tamiri",
        name: "Panjur Tamiri",
        slug: "panjur-tamiri",
        description: "Manuel ve motorlu panjur sistemlerinin arıza tespiti, kayış değişimi, motor tamiri ve lamel değişimi işlemleri.",
        icon: "🌤️",
        keywords: ["panjur tamiri", "panjur kayışı değişimi", "motorlu panjur tamiri", "panjur servisi"],
        price: "150₺'den başlayan",
        duration: "30 dakika - 2 saat",
    },
];

/**
 * Technical Specifications Comparison Matrix
 * For dynamic table rendering
 */
export const comparisonMetrics = [
    { key: "profileWidth", label: "Profil Genişliği", unit: "mm", icon: "📏" },
    { key: "chambers", label: "Odacık Sayısı", unit: "adet", icon: "🔲" },
    { key: "gasketSystem", label: "Conta Sistemi", unit: "", icon: "🔒" },
    { key: "thermalInsulation", label: "Isı Yalıtımı (Uf)", unit: "", icon: "🌡️" },
    { key: "airTightness", label: "Hava Sızdırmazlık", unit: "", icon: "💨" },
    { key: "waterTightness", label: "Su Sızdırmazlık", unit: "", icon: "💧" },
    { key: "windResistance", label: "Rüzgar Dayanımı", unit: "", icon: "🌬️" },
    { key: "acousticInsulation", label: "Akustik Yalıtım", unit: "", icon: "🔇" },
];

/**
 * LSI Keywords for SEO
 * Latent Semantic Indexing keywords for content optimization
 */
export const lsiKeywords = {
    primary: [
        "Egepen Deceuninck yetkili bayi",
        "Beylikdüzü PVC doğrama",
        "Isı yalıtımlı pencere sistemleri",
        "Enerji tasarruflu kapı sistemleri",
    ],
    secondary: [
        "U-Değeri",
        "Akustik yalıtım",
        "Rüzgar yükü dayanımı",
        "Egepen servis",
        "PVC sineklik montajı",
    ],
    local: [
        "İstanbul Beylikdüzü PVC",
        "Gürpınar pencere montajı",
        "Büyükçekmece PVC servisi",
        "Esenyurt cam balkon",
    ],
    repair: [
        "PVC pencere tamiri",
        "ispanyolet değişimi",
        "fitil yenileme",
        "ısı cam değişimi",
        "mekanizma onarımı",
    ],
};

/**
 * Helper function to get product by slug
 */
export function getProductBySlug(slug: string): PVCProductSeries | undefined {
    return pvcProductSeries.find((p) => p.slug === slug);
}

/**
 * Helper function to get products by category
 */
export function getProductsByCategory(category: PVCProductSeries["category"]): PVCProductSeries[] {
    return pvcProductSeries.filter((p) => p.category === category);
}

/**
 * Helper function to get featured products
 */
export function getFeaturedProducts(): PVCProductSeries[] {
    return pvcProductSeries.filter((p) => p.featured);
}

/**
 * Helper function to get repair service by slug
 */
export function getRepairServiceBySlug(slug: string): RepairService | undefined {
    return repairServices.find((s) => s.slug === slug);
}

/**
 * Helper function to get window systems only
 */
export function getWindowSystems(): PVCProductSeries[] {
    return pvcProductSeries.filter((p) => p.category === "pencere");
}

/**
 * Helper function to get sliding systems only
 */
export function getSlidingSystems(): PVCProductSeries[] {
    return pvcProductSeries.filter((p) => p.category === "surme");
}
