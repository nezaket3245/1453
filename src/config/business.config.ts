/**
 * ═══════════════════════════════════════════════════════════════════════════
 * EGEPEN AKÇAYAPI - GLOBAL İŞLETME YAPILANDIRMASI
 * ═══════════════════════════════════════════════════════════════════════════
 * SEO, Schema.org, UI tutarlılığı ve yerel arama optimizasyonu için
 * Son Güncelleme: 31 Ocak 2026
 */

export const businessConfig = {
    name: "Egepen Akçayapı",
    brand: "Egepen Deceuninck",
    legalName: "Akçayapı PVC ve Cam Balkon Sistemleri",
    slogan: "Beylikdüzü'nün Yetkili Egepen Bayisi",
    foundingYear: 1999,

    address: {
        street: "Gürpınar Mah. Gürpınar Cad. No: 26A",
        district: "Beylikdüzü",
        city: "İSTANBUL",
        zip: "34528",
        full: "Gürpınar Mah. Gürpınar Cad. No: 26A, 34528 Beylikdüzü/İSTANBUL",
        coordinates: {
            latitude: "40.9942125",
            longitude: "28.6079794",
            cid: "0x14b55f98edadb64f:0x2f92fd58ab8cca21"
        }
    },

    contact: {
        landline: "0212 880 15 07",
        landlineRaw: "+902128801507",
        mobile: "0536 640 53 11",
        mobileRaw: "+905366405311",
        whatsapp: "902128801507",
        email: "info@egepenakcayapi.com.tr"
    },

    social: {
        facebook: "https://facebook.com/egepenakcayapi",
        instagram: "https://instagram.com/egepenakcayapi",
        googleMaps: "https://www.google.com/maps/place/Egepen,+Ak%C3%A7ayap%C4%B1,Sineklik,Cam+balkon,Giyotin,panjur+sistemleri/@40.9942165,28.6054045,17z/data=!3m1!4b1!4m6!3m5!1s0x14b55f98edadb64f:0x2f92fd58ab8cca21!8m2!3d40.9942125!4d28.6079794!16s%2Fg%2F11svqx1d4t?hl=tr&entry=ttu"
    },

    // ═══════════════════════════════════════════════════════════════════════
    // HİZMET BÖLGELERİ - YEREL SEO İÇİN KRİTİK
    // ═══════════════════════════════════════════════════════════════════════
    serviceAreas: {
        // Beylikdüzü Mahalleleri
        beylikduzu: {
            name: "Beylikdüzü",
            neighborhoods: [
                "Adnan Kahveci", "Barış", "Büyükşehir", "Cumhuriyet",
                "Dereağzı", "Gürpınar", "Kavaklı", "Marmara", "Sahil", "Yakuplu"
            ]
        },

        // Büyükçekmece Mahalleleri (TÜM MAHALLELER)
        buyukcekmece: {
            name: "Büyükçekmece",
            neighborhoods: [
                // Merkez Mahalleler
                "Atatürk", "Bahçelievler", "Batıköy", "Beykent", "Celaliye",
                "Cumhuriyet", "Dizdariye", "Fatih", "Fevzi Çakmak", "Hürriyet",
                "Kamiloba", "Karaağaç", "Kumburgaz", "Mimarsinan", "Muratbey",
                // Sahil ve Kuzey Mahalleler
                "Pınartepe", "Ulus", "Yenimahalle", "19 Mayıs", "Alkent 2000",
                "Beykent Üniversitesi", "Boğaziçi", "Çakmaklı", "Güzelce",
                // Kırsal ve Dış Mahalleler
                "Ahmediye", "Bahçelievler", "Balkanlı", "Çatalca Sınırı",
                "Eskice", "Hoşdere", "Karaca Murat", "Karaçaallı", "Muratbey",
                "Örencik", "Tepecik", "Türkoba", "Yeniköy", "Zekeriyaköy"
            ]
        },

        // Yakın İlçeler
        nearbyDistricts: [
            "Esenyurt", "Avcılar", "Küçükçekmece", "Başakşehir",
            "Bahçeşehir", "Hadımköy", "Silivri", "Çatalca"
        ]
    },

    // ═══════════════════════════════════════════════════════════════════════
    // SEO YAPILANDIRMASI - ANAHTAR KELİME KÜMELERİ
    // ═══════════════════════════════════════════════════════════════════════
    seo: {
        // Ana Anahtar Kelimeler (Yüksek Hacim)
        primaryKeywords: [
            "Egepen Deceuninck yetkili bayi",
            "Egepen Deceuninck İstanbul",
            "PVC pencere İstanbul",
            "PVC pencere fiyatları 2026",
            "Cam balkon sistemleri",
            "Isıcamlı cam balkon",
            "Beylikdüzü PVC pencere",
            "Beylikdüzü cam balkon",
            "Büyükçekmece PVC pencere",
            "Büyükçekmece cam balkon"
        ],

        // Ürün Bazlı Anahtar Kelimeler
        productKeywords: [
            // PVC Pencere
            "Legend serisi PVC pencere",
            "Legend Art 70 pencere sistemi",
            "Zendow ısı yalıtımlı pencere",
            "Fusion 85 ultra yalıtım",
            "Zen Spirit sürme sistemleri",
            "6 odacıklı PVC profil",
            "A+ enerji sınıfı pencere",

            // Cam Balkon
            "Tiara Max ısıcamlı sistem",
            "Twin sürme cam balkon",
            "Giyotin cam balkon",
            "Katlanır cam balkon",
            "Eşiksiz sürme sistem",
            "8mm temperli cam balkon",
            "Low-E camlı balkon",

            // Sineklik
            "Plise sineklik sistemleri",
            "Menteşeli sineklik",
            "Sürme sineklik",
            "Kedi sinekliği pet screen",
            "Pileli sineklik fiyat",

            // Panjur
            "Egepen Storbox monoblok panjur",
            "Motorlu alüminyum panjur",
            "Somfy motorlu panjur",
            "Kepenk sistemleri",
            "Otomatik panjur fiyat",

            // Duşakabin
            "Temperli cam duşakabin",
            "Siyah profil duşakabin",
            "Walk-in duş kabini",
            "Köşe giriş duşakabin",
            "Özel ölçü duşakabin"
        ],

        // Hizmet Bazlı Anahtar Kelimeler
        serviceKeywords: [
            "PVC pencere montajı",
            "Cam balkon montajı",
            "PVC pencere tamiri",
            "Pencere cam değişimi",
            "PVC kasa değişimi",
            "Conta değişimi",
            "Pencere bakım onarım",
            "Ücretsiz keşif hizmeti",
            "Profesyonel montaj ekibi"
        ],

        // Yerel SEO Anahtar Kelimeleri
        localKeywords: [
            "Beylikdüzü PVC pencere ustası",
            "Beylikdüzü cam balkon fiyatları",
            "Büyükçekmece PVC pencere montajı",
            "Büyükçekmece cam balkon ustası",
            "Gürpınar Egepen bayisi",
            "Yakuplu PVC pencere",
            "Kavaklı cam balkon",
            "Esenyurt PVC pencere fiyat",
            "Avcılar cam balkon montaj",
            "Küçükçekmece ısıcamlı pencere",
            "Başakşehir PVC pencere"
        ],

        // Soru Bazlı Anahtar Kelimeler (Featured Snippets için)
        questionKeywords: [
            "PVC pencere fiyatları ne kadar?",
            "Cam balkon metrekare fiyatı 2026",
            "Isıcamlı cam balkon avantajları",
            "PVC pencere mi alüminyum mu?",
            "En iyi PVC pencere markası hangisi?",
            "Egepen pencere garantisi kaç yıl?",
            "Cam balkon kaç günde yapılır?",
            "Panjur fiyatları ne kadar?",
            "Sineklik çeşitleri nelerdir?"
        ],

        // LSI (Latent Semantic Indexing) Anahtar Kelimeler
        lsiKeywords: [
            "ısı yalıtımı", "ses izolasyonu", "enerji tasarrufu",
            "çift cam", "üç cam", "Low-E kaplama", "argon gazı",
            "EPDM conta", "TPE conta", "çelik takviye",
            "antrasit gri", "altın meşe", "ceviz renk",
            "villa tipi", "daire penceresi", "balkon kapısı"
        ],

        // Tüm Hizmet Bölgeleri (Düz liste - SEO meta için)
        regions: [
            // Beylikdüzü
            "Beylikdüzü", "Gürpınar", "Yakuplu", "Kavaklı", "Adnan Kahveci",
            "Barış", "Büyükşehir", "Cumhuriyet", "Dereağzı", "Marmara", "Sahil",
            // Büyükçekmece
            "Büyükçekmece", "Atatürk", "Bahçelievler", "Batıköy", "Beykent",
            "Celaliye", "Dizdariye", "Fatih", "Hürriyet", "Kamiloba", "Karaağaç",
            "Kumburgaz", "Mimarsinan", "Muratbey", "Pınartepe", "Ulus",
            // Yakın İlçeler
            "Esenyurt", "Avcılar", "Küçükçekmece", "Başakşehir", "Bahçeşehir",
            "Hadımköy", "Silivri", "Çatalca"
        ],

        // Eski format uyumluluğu için (deprecated, regions kullanılmalı)
        mainKeywords: [
            "Egepen Deceuninck yetkili bayi",
            "Beylikdüzü PVC pencere",
            "Gürpınar cam balkon",
            "İstanbul ısı yalıtımlı profil",
            "Legend serisi montaj",
            "Legend Art serisi pencere",
            "Zen Spirit sürme sistemleri",
            "Beylikdüzü panjur montajı",
            "Beylikdüzü duşakabin",
            "Beylikdüzü sineklik sistemleri",
            "PVC pencere tamiri İstanbul",
            "Cam balkon fiyatları 2026",
            "Isıcamlı cam balkon Beylikdüzü",
            "Motorlu panjur fiyat",
            "Egepen bayi İstanbul",
            "Büyükçekmece PVC pencere",
            "Büyükçekmece cam balkon"
        ]
    }
};
