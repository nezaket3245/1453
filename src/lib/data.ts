import { Product } from "@/types";

export const products: Product[] = [
    {
        id: "pvc-pencere",
        slug: "pvc-pencere",
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
            { label: "Rüzgar Dayımı", value: "C5 Sınıfı" }
        ],
        benefits: [
            "Isınma faturalarında %40 tasarruf.",
            "Deniz kenarı rüzgarları için tam sızdırmazlık.",
            "10 Yıl Egepen fabrika garantisi.",
            "Hırsızlığa karşı WK2 güvenlik seviyesi."
        ]
    },
    {
        id: "cam-balkon",
        slug: "cam-balkon",
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
        slug: "sineklik",
        name: "Sineklik & Panjur Sistemleri",
        category: "sineklik",
        description: "Pileli (plise), menteşeli ve stor sineklikler. Otomatik motorlu ve güvenlikli panjur sistemleri.",
        longDescription: "Gürpınar ve Beylikdüzü bölgelerindeki rüzgarlı havalarda bile rayından çıkmayan özel pileli sineklik sistemleri ve evinizi güneşten ve yabancı müdahalelerden koruyan motorlu alüminyum panjur sistemlerini Akçayapı kalitesiyle sunuyoruz.",
        image: "/images/projeler/panjur-villa-montaj.png",
        features: [
            "Plise (Pileli) Sineklik Sistemleri",
            "Otomatik Motorlu Uzaktan Kumandalı Panjur",
            "Poliüretan Dolgulu Alüminyum Lameller",
            "Özel Renk Seçenekli Profiller",
            "Hırsızlığa Karşı Emniyet Kilitli Panjur"
        ],
        technicalSpecs: [
            { label: "Sineklik Tül", value: "Fiberglass / Anti-Dust" },
            { label: "Panjur Motoru", value: "Somfy / Mosel" },
            { label: "Kutu Tipi", value: "Gizli Kutu veya Dıştan Takma" }
        ],
        benefits: [
            "Haşerelerden 7/24 kesintisiz koruma.",
            "Güneş ısısını %70 oranında kesen panjurlar.",
            "Tam karartma ile konforlu uyku ortamı."
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
    }
];
