import { Product } from "@/types";

/**
 * Merkezi Ürün Veritabanı
 * Tüm ürün kategorileri, slug'lar ve teknik bilgiler
 * Slug'lar site URL yapısıyla birebir eşleşmelidir
 * Son Güncelleme: 7 Şubat 2026
 */
export const products: Product[] = [
    {
        id: "pvc-pencere",
        slug: "pvc-sistemleri",
        name: "PVC Pencere & Kapı Sistemleri",
        category: "pvc-pencere",
        description: "Beylikdüzü Egepen yetkili bayisi olarak Legend ve Zen Spirit serileriyle en yüksek ısı ve ses yalıtımı sağlıyoruz.",
        longDescription: "Egepen Deceuninck kalitesini Akçayapı güvencesiyle İstanbul'un her noktasına taşıyoruz. Özellikle Beylikdüzü ve Gürpınar bölgelerindeki deniz havası ve sert rüzgarlara karşı dayanıklı, Legend serisi 80mm profil genişliği ve 6 odacıklı yapısıyla %40'a varan enerji tasarrufu sağlar.",
        image: "/images/projeler/pvc-pencere-apartman.png",
        features: [
            "Legend Serisi: 80 mm Genişlik, 6 Odacıklı",
            "Zen Spirit: Minimalist Sürme Sistemleri",
            "A Sınıfı Et Kalınlığı (TS EN 12608-1)",
            "Üçlü Cam Opsiyonu ile Maksimum Sessizlik"
        ],
        technicalSpecs: [
            { label: "Profil Serisi", value: "Legend / Zen Spirit" },
            { label: "Isı İletim", value: "Uf = 0.92 W/m²K" },
            { label: "Hava Sızdırmazlık", value: "4. Sınıf (Maksimum)" },
            { label: "Rüzgar Dayanımı", value: "C5 Sınıfı" }
        ],
        benefits: [
            "Isınma faturalarında %40 tasarruf.",
            "Deniz kenarı rüzgarları için tam sızdırmazlık.",
            "Hırsızlığa karşı WK2 güvenlik seviyesi."
        ]
    },
    {
        id: "cam-balkon",
        slug: "cam-balkon-sistemleri",
        name: "Cam Balkon & Sürme Sistemleri",
        category: "cam-balkon",
        description: "Eşikli ve eşiksiz sürme sistemleri, katlanır cam balkon çözümleri ile balkonlarınızı dört mevsim yaşam alanına dönüştürün.",
        longDescription: "Beylikdüzü cam balkon ihtiyaçlarınızda, paslanmaz tekerlek mekanizmalı ve temperli güvenli camlı sistemlerimizle hizmetinizdeyiz. İster eşikli sürme ister katlanır model olsun, tüm sistemlerimiz su tahliye kanallı ve rüzgar kilitli olarak monte edilir.",
        image: "/images/projeler/cam-balkon-rezidans.png",
        features: [
            "Eşikli ve Eşiksiz Sürme Seçenekleri",
            "Temperli 8mm veya 10mm Şişecam",
            "Paslanmaz Alüminyum Profil Gövdesi",
            "Çift Rulmanlı Yürütme Mekanizması",
            "Gizli Su Tahliye Sistemleri"
        ],
        technicalSpecs: [
            { label: "Cam Tipi", value: "Temperli Konfor Cam" },
            { label: "Ray Sayısı", value: "3'lü veya 5'li Ray" },
            { label: "Maksimum Panel", value: "3000 mm Yükseklik" }
        ],
        benefits: [
            "Yağmur ve rüzgar sızdırmaz yapı.",
            "Panoramik Beylikdüzü manzarası kesintisiz.",
            "Çocuk ve evcil hayvan için güvenlik kilidi."
        ]
    },
    {
        id: "sineklik",
        slug: "sineklik-sistemleri",
        name: "Sineklik Sistemleri",
        category: "sineklik",
        description: "Plise (pileli), menteşeli, sürme ve stor sineklik çözümleri. Kedi sinekliği (Pet Screen) ile evcil hayvan güvenliği.",
        longDescription: "Gürpınar ve Beylikdüzü bölgelerindeki rüzgarlı havalarda bile rayından çıkmayan özel pileli sineklik sistemleri. Fiberglass, Anti-Dust ve Pet Screen tül seçenekleriyle her eve uygun çözümler sunuyoruz.",
        image: "/images/sineklik/yatay-plise-sineklik.png",
        features: [
            "Plise (Pileli) Sineklik Sistemleri",
            "Menteşeli Kapı Tipi Sineklik",
            "Sürme ve Stor Sineklik Modelleri",
            "Kedi Sinekliği (Pet Screen) - 7x Dayanıklı",
            "Fiberglass & Anti-Dust Tül Seçenekleri"
        ],
        technicalSpecs: [
            { label: "Tül Malzeme", value: "Fiberglass / Anti-Dust / Pet Screen" },
            { label: "Profil", value: "Alüminyum - RAL Renk Seçenekli" },
            { label: "Profil", value: "Alüminyum - RAL Renk Seçenekli" }
        ],
        benefits: [
            "Haşerelerden 7/24 kesintisiz koruma.",
            "Evcil hayvanlar için yırtılmaz tül.",
            "Kolay sökülebilir ve yıkanabilir yapı."
        ]
    },
    {
        id: "panjur",
        slug: "panjur-kepenk-sistemleri",
        name: "Panjur & Kepenk Sistemleri",
        category: "panjur",
        description: "Motorlu alüminyum panjur, Egepen Storbox monoblok ve çelik kepenk. Somfy motor, güvenlik kilidi ve tam karartma özelliği.",
        longDescription: "Evinizi güneşten ve yabancı müdahalelerden koruyan motorlu alüminyum panjur sistemlerini Akçayapı kalitesiyle sunuyoruz. Somfy ve Mosel motorlu otomasyon, poliüretan dolgulu lamellerle üstün ısı yalıtımı.",
        image: "/images/projeler/panjur-villa-montaj.png",
        features: [
            "Somfy / Mosel Motorlu Otomasyon",
            "Poliüretan Dolgulu Alüminyum Lamel",
            "Egepen Storbox Monoblok Sistem",
            "Hırsızlığa Karşı Emniyet Kilidi",
            "Akıllı Ev Entegrasyonu (WiFi)"
        ],
        technicalSpecs: [
            { label: "Motor", value: "Somfy / Mosel" },
            { label: "Lamel", value: "Alüminyum 45mm Köpük Dolgulu" },
            { label: "Kutu Tipi", value: "Gizli Kutu veya Dıştan Takma" }
        ],
        benefits: [
            "Güneş ısısını %70 oranında keser.",
            "Tam karartma ile konforlu uyku ortamı.",
            "Uzaktan kumanda ve zamanlayıcı özelliği."
        ]
    },
    {
        id: "dusakabin",
        slug: "dusakabin-sistemleri",
        name: "Özel Tasarım Duşakabin",
        category: "dusakabin",
        description: "Özel ölçü duşakabin montajı, modern banyo çözümleri ve lüks cam tasarımları.",
        longDescription: "Banyonuzun ölçüsüne uygun, leke tutmayan temperli camlı ve kararma yapmayan alüminyum profilli duşakabin sistemlerimiz Beylikdüzü'ndeki banyolarınıza estetik katıyor.",
        image: "/images/projeler/dusakabin-lux-banyo.png",
        features: [
            "Özel Ölçü ve Yerinde Keşif",
            "ClearShield Leke Tutmayan Cam Teknolojisi",
            "Siyah, Gold ve Krom Profil Seçenekleri",
            "Sızdırmaz Manyetik Fitil Sistemi"
        ],
        technicalSpecs: [
            { label: "Cam Kalınlığı", value: "6 mm / 8 mm" },
            { label: "Profil Yapısı", value: "Paslanmaz Eloksal Kaplama" }
        ],
        benefits: [
            "Kolay temizlenebilir cam yüzeyler.",
            "Modern ve ferah banyo tasarımları.",
            "Hızlı ve temiz montaj süreci."
        ]
    },
    {
        id: "aluminyum",
        slug: "aluminyum-sistemleri",
        name: "Alüminyum Doğrama Sistemleri",
        category: "aluminyum",
        description: "Isı yalıtımlı alüminyum pencere, giydirme cephe, ofis bölme ve sürme sistemleri. Ticari ve endüstriyel projeler için ideal.",
        longDescription: "Thermal break teknolojisiyle ısı yalıtımlı alüminyum pencere, kapı ve cephe sistemleri. Geniş açıklıklar, yüksek katlı binalar ve ticari projeler için hafif ama dayanıklı alüminyum çözümler sunuyoruz.",
        image: "/images/aluminyum/curtain-wall-giydirme.png",
        features: [
            "Thermal Break Isı Yalıtımlı Profil",
            "Giydirme Cephe & Yapısal Silikon",
            "Hebe-Schiebe Sürme Sistemleri",
            "Ofis Bölme ve Cam Kapı Sistemleri",
            "6 Metreye Kadar Geniş Açıklık"
        ],
        technicalSpecs: [
            { label: "Profil Tipi", value: "Thermal Break Alüminyum" },
            { label: "Isı İletim", value: "Uf = 1.5-2.5 W/m²K" },
            { label: "Yangın Sınıfı", value: "A1 Yanmaz" }
        ],
        benefits: [
            "Geniş açıklıklar için yüksek statik dayanım.",
            "40-50 yıl ürün ömrü.",
            "Ticari ve endüstriyel projelere uygun."
        ]
    }
];
