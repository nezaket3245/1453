/**
 * Panjur & Kepenk Engineering Systems Data
 * Focus: Intelligent shutters, Somfy automation, industrial roller shutters
 * SEO: Motorlu panjur, kepenk, otomasyon, enerji tasarrufu
 */

export interface PanjurSystem {
    id: string;
    slug: string;
    name: string;
    category: 'panjur-aluminyum' | 'panjur-pvc' | 'kepenk-ticari' | 'kepenk-endustriyel' | 'smart-home';
    tagline: string;
    description: string;
    longDescription: string;
    image: string;
    gallery: string[];
    technicalSpecs: {
        label: string;
        value: string;
        highlight?: boolean;
    }[];
    features: string[];
    benefits: string[];
    lamelOptions?: LamelOption[];
    motorOptions?: MotorOption[];
    automationFeatures?: string[];
    energyEfficiency?: {
        summerCooling: number; // % reduction
        winterHeating: number; // % reduction
        soundReduction: number; // dB
    };
    securityRating?: 'basic' | 'enhanced' | 'high-security' | 'industrial';
    warranty: string;
    certifications: string[];
    priceRange: 'ekonomik' | 'orta' | 'premium';
    seoKeywords: string[];
    faq: { question: string; answer: string }[];
}

export interface LamelOption {
    id: string;
    name: string;
    material: 'aluminium' | 'pvc' | 'steel';
    width: number; // mm
    thickness: number; // mm
    foamFilled: boolean;
    uValue?: number; // W/m²K
    description: string;
}

export interface MotorOption {
    brand: 'somfy' | 'mosel' | 'nice' | 'bft' | 'generic';
    model: string;
    torque: number; // Nm
    speed: string;
    smartHome: boolean;
    features: string[];
    warranty: string;
}

// Lamel Types Library
export const lamelLibrary: LamelOption[] = [
    {
        id: 'alu-37',
        name: 'Alüminyum 37mm Lamel',
        material: 'aluminium',
        width: 37,
        thickness: 8,
        foamFilled: false,
        description: 'Standart alüminyum lamel, hafif ve ekonomik',
    },
    {
        id: 'alu-45-foam',
        name: 'Alüminyum 45mm Köpük Dolgulu',
        material: 'aluminium',
        width: 45,
        thickness: 9,
        foamFilled: true,
        uValue: 3.2,
        description: 'Polyüretan köpük dolgulu, üstün ısı yalıtımı',
    },
    {
        id: 'alu-55-foam',
        name: 'Alüminyum 55mm Premium',
        material: 'aluminium',
        width: 55,
        thickness: 14,
        foamFilled: true,
        uValue: 2.8,
        description: 'Maksimum yalıtım, geniş açıklıklar için ideal',
    },
    {
        id: 'pvc-standard',
        name: 'PVC Lamel Standart',
        material: 'pvc',
        width: 40,
        thickness: 8,
        foamFilled: false,
        description: 'Ekonomik PVC lamel, kolay temizlik',
    },
    {
        id: 'steel-security',
        name: 'Çelik Güvenlik Lameli',
        material: 'steel',
        width: 77,
        thickness: 19,
        foamFilled: true,
        description: 'Yüksek güvenlikli çelik lamel, delinmez yapı',
    },
    {
        id: 'steel-perforated',
        name: 'Çelik Perforeli Lamel',
        material: 'steel',
        width: 77,
        thickness: 19,
        foamFilled: false,
        description: 'Havalandırmalı güvenlik lameli, mağaza vitrin',
    },
];

// Motor Options Library
export const motorLibrary: MotorOption[] = [
    {
        brand: 'somfy',
        model: 'Somfy Oximo 50 io',
        torque: 15,
        speed: '12 devir/dk',
        smartHome: true,
        features: [
            'TaHoma uyumlu',
            'Alexa/Google Home',
            'Otomatik engel algılama',
            'Sessiz çalışma',
            'Güneş sensörü uyumlu',
        ],
        warranty: '5 Yıl',
    },
    {
        brand: 'somfy',
        model: 'Somfy Oximo 50 RTS',
        torque: 20,
        speed: '14 devir/dk',
        smartHome: false,
        features: [
            'Uzaktan kumanda',
            'Programlanabilir timer',
            'Grup kontrol',
        ],
        warranty: '5 Yıl',
    },
    {
        brand: 'mosel',
        model: 'Mosel SEL Plus',
        torque: 20,
        speed: '12 devir/dk',
        smartHome: true,
        features: [
            'WiFi modülü',
            'Mobil uygulama',
            'Manuel override',
        ],
        warranty: '3 Yıl',
    },
    {
        brand: 'nice',
        model: 'Nice Era M',
        torque: 30,
        speed: '16 devir/dk',
        smartHome: true,
        features: [
            'Bi-directional iletişim',
            'Akıllı ev entegrasyonu',
            'Otomatik limit ayarı',
        ],
        warranty: '4 Yıl',
    },
    {
        brand: 'generic',
        model: 'Standart Tüp Motor',
        torque: 10,
        speed: '10 devir/dk',
        smartHome: false,
        features: [
            'Ekonomik çözüm',
            'Manuel kumanda',
        ],
        warranty: '2 Yıl',
    },
];

// Somfy Smart Home Ecosystem
export const somfyEcosystem = {
    hub: {
        name: 'TaHoma Switch',
        description: 'Merkezi kontrol ünitesi - tüm Somfy cihazları tek noktadan',
        features: [
            'WiFi bağlantı',
            '200+ cihaz kontrolü',
            'Senaryo oluşturma',
            'Uzaktan erişim',
        ],
    },
    sensors: [
        { name: 'Güneş Sensörü', function: 'Güneş ışığına göre otomatik kapanma' },
        { name: 'Rüzgar Sensörü', function: 'Fırtınada otomatik açılma (tente için)' },
        { name: 'Sıcaklık Sensörü', function: 'Oda sıcaklığına göre pozisyon' },
    ],
    voiceControl: ['Amazon Alexa', 'Google Home', 'Apple HomeKit (io)'],
    scenarios: [
        { name: 'Sabah Rutini', description: 'Alarm ile tüm panjurlar açılır' },
        { name: 'Akşam Modu', description: 'Gün batımında otomatik kapanma' },
        { name: 'Tatil Modu', description: 'Rastgele açılıp kapanma (güvenlik)' },
        { name: 'Film Modu', description: 'Tek tuşla tam karartma' },
    ],
};

// Energy Efficiency Calculator Data
export const energyEfficiencyData = {
    withoutShutter: {
        summerCooling: 100, // baseline
        winterHeating: 100, // baseline
    },
    withAluminumShutter: {
        summerCooling: 70, // 30% reduction
        winterHeating: 80, // 20% reduction
    },
    withFoamFilledShutter: {
        summerCooling: 55, // 45% reduction
        winterHeating: 65, // 35% reduction
    },
    description: 'Köpük dolgulu panjur ile yaz aylarında %45, kış aylarında %35\'e varan enerji tasarrufu',
};

// Main Panjur & Kepenk Systems
export const panjurSystems: PanjurSystem[] = [
    // =====================================================
    // ALÜMİNYUM PANJUR SİSTEMLERİ
    // =====================================================
    {
        id: 'aluminium-panjur-motorlu',
        slug: 'motorlu-aluminyum-panjur',
        name: 'Motorlu Alüminyum Panjur',
        category: 'panjur-aluminyum',
        tagline: 'Somfy Motor ile Akıllı Ev Uyumlu Premium Panjur',
        description: 'Köpük dolgulu alüminyum lamel, Somfy io motor, TaHoma akıllı ev entegrasyonu. %35 enerji tasarrufu, tam karartma, sessiz çalışma.',
        longDescription: `Motorlu Alüminyum Panjur Sistemimiz, günlük konforu yükselten premium bir çözümdür. Somfy io motorları sayesinde evinizin tüm panjurlarını tek bir uygulamadan kontrol edebilirsiniz.

Akıllı Ev Entegrasyonu:
- TaHoma Switch hub ile merkezi kontrol
- Amazon Alexa ve Google Home sesli komut desteği
- Güneş sensörü ile otomatik pozisyon ayarı
- Tatil modunda rastgele açılıp kapanarak güvenlik

Enerji Verimliliği:
- Polyüretan köpük dolgulu lameller
- Kış aylarında %35'e varan ısı tasarrufu
- Yaz aylarında %45'e varan serinlik
- Karanlık odada uyku kalitesi artışı

Sessiz Çalışma:
- Somfy motorları 35 dB altı çalışma sesi
- Gece modu ile daha da sessiz
- Bebek odası için ideal`,
        image: '/images/panjur/panjur-motorlu-villa.jpg',
        gallery: ['/images/panjur/panjur-motorlu-villa.jpg', '/images/panjur/panjur-modern-villa.jpg'],
        technicalSpecs: [
            { label: 'Lamel Genişliği', value: '45mm / 55mm', highlight: false },
            { label: 'Lamel Dolgusu', value: 'Polyüretan Köpük', highlight: true },
            { label: 'Max Genişlik', value: '3500mm', highlight: false },
            { label: 'Max Yükseklik', value: '3000mm', highlight: false },
            { label: 'Motor', value: 'Somfy io / RTS', highlight: true },
            { label: 'Akıllı Ev', value: 'TaHoma Uyumlu', highlight: true },
            { label: 'Enerji Tasarrufu', value: '%35\'e kadar', highlight: true },
            { label: 'Çalışma Sesi', value: '<35 dB', highlight: false },
        ],
        features: [
            'Köpük dolgulu alüminyum lamel',
            'Somfy io / RTS motor seçenekleri',
            'TaHoma akıllı ev entegrasyonu',
            'Güneş/rüzgar sensörü uyumu',
            'Alexa & Google Home kontrolü',
            'Programlanabilir timer',
            'Manuel override sistemi',
            'RAL renk seçenekleri',
        ],
        benefits: [
            '%35\'e varan enerji tasarrufu',
            'Akıllı ev kontrolü',
            'Tam karartma imkanı',
            'Sessiz çalışma (<35dB)',
            '5 yıl motor garantisi',
        ],
        lamelOptions: [
            lamelLibrary.find((l) => l.id === 'alu-45-foam')!,
            lamelLibrary.find((l) => l.id === 'alu-55-foam')!,
        ],
        motorOptions: [
            motorLibrary.find((m) => m.model === 'Somfy Oximo 50 io')!,
            motorLibrary.find((m) => m.model === 'Somfy Oximo 50 RTS')!,
            motorLibrary.find((m) => m.model === 'Mosel SEL Plus')!,
        ],
        automationFeatures: [
            'Gün doğumu/batımı otomasyonu',
            'Sıcaklık bazlı kontrol',
            'Tatil modu (rastgele hareket)',
            'Grup/oda bazlı kontrol',
            'Senaryo oluşturma',
        ],
        energyEfficiency: {
            summerCooling: 45,
            winterHeating: 35,
            soundReduction: 8,
        },
        securityRating: 'enhanced',
        warranty: '10 Yıl Panjur + 5 Yıl Motor',
        certifications: ['CE', 'EN 13659', 'TÜV'],
        priceRange: 'premium',
        seoKeywords: [
            'motorlu panjur',
            'somfy panjur',
            'akıllı panjur',
            'otomatik panjur',
            'alüminyum panjur fiyatları',
            'Beylikdüzü panjur montaj',
        ],
        faq: [
            {
                question: 'Somfy motor ne kadar dayanır?',
                answer: 'Somfy motorları 100.000+ çalışma döngüsü için test edilmiştir. Günde 4 kez kullanımda 70+ yıl ömür anlamına gelir. 5 yıl üretici garantisi vardır.',
            },
            {
                question: 'Elektrik kesilirse panjur açılır mı?',
                answer: 'Manuel override sistemi sayesinde elektrik kesintisinde panjuru el ile açabilirsiniz. Ayrıca UPS (kesintisiz güç kaynağı) bağlantısı da yapılabilir.',
            },
            {
                question: 'Mevcut panjuruma motor takılabilir mi?',
                answer: 'Evet, mevcut manuel panjurların çoğuna motor ekleme (retrofit) mümkündür. Keşif sonrasında uygunluk değerlendirilir.',
            },
        ],
    },
    {
        id: 'aluminium-panjur-manuel',
        slug: 'manuel-aluminyum-panjur',
        name: 'Manuel Alüminyum Panjur',
        category: 'panjur-aluminyum',
        tagline: 'Ekonomik ve Güvenilir Klasik Çözüm',
        description: 'Kayış veya krankla çalışan klasik alüminyum panjur. Köpük dolgulu lamel opsiyonu, 200+ RAL renk, 10 yıl garanti.',
        longDescription: `Manuel Alüminyum Panjur, güvenilirlik ve ekonomiyi bir araya getirir. Kayış (şerit) veya krank (çevirmeli) mekanizma seçenekleri ile elektrik gerektirmeden çalışır.

Avantajları:
- Elektrik bağımsız çalışma
- Basit mekanizma, düşük arıza oranı
- Ekonomik fiyat
- Sonradan motorize edilebilir

Lamel Seçenekleri:
- Standart alüminyum lamel (ekonomik)
- Köpük dolgulu lamel (yalıtımlı)
- Perforeli lamel (havalandırmalı)`,
        image: '/images/panjur/panjur-modern-villa.jpg',
        gallery: ['/images/panjur/panjur-modern-villa.jpg', '/images/panjur/panjur-montaj.jpg'],
        technicalSpecs: [
            { label: 'Lamel Genişliği', value: '37mm / 45mm', highlight: false },
            { label: 'Mekanizma', value: 'Kayış / Krank', highlight: false },
            { label: 'Max Genişlik', value: '3000mm', highlight: false },
            { label: 'Max Yükseklik', value: '2800mm', highlight: false },
            { label: 'Köpük Dolgu', value: 'Opsiyonel', highlight: false },
        ],
        features: [
            'Kayış veya krank mekanizma',
            'Alüminyum lamel',
            'Köpük dolgu opsiyonu',
            '200+ RAL renk',
            'Motorize upgrade imkanı',
        ],
        benefits: [
            'Ekonomik fiyat',
            'Elektrik gerektirmez',
            'Düşük bakım',
            '10 yıl garanti',
        ],
        lamelOptions: [
            lamelLibrary.find((l) => l.id === 'alu-37')!,
            lamelLibrary.find((l) => l.id === 'alu-45-foam')!,
        ],
        securityRating: 'basic',
        warranty: '10 Yıl Panjur',
        certifications: ['CE', 'EN 13659'],
        priceRange: 'ekonomik',
        seoKeywords: [
            'manuel panjur',
            'kayışlı panjur',
            'ekonomik panjur',
            'alüminyum panjur',
        ],
        faq: [
            {
                question: 'Manuel panjura sonradan motor takılabilir mi?',
                answer: 'Evet, manuel panjurların büyük çoğunluğuna sonradan motor eklenebilir. Kutu boyutu ve mil çapı kontrol edilmelidir.',
            },
        ],
    },

    // =====================================================
    // TİCARİ KEPENK SİSTEMLERİ
    // =====================================================
    {
        id: 'kepenk-galvaniz',
        slug: 'galvaniz-celik-kepenk',
        name: 'Galvaniz Çelik Kepenk',
        category: 'kepenk-ticari',
        tagline: 'Mağaza ve İşyeri için Ekonomik Güvenlik',
        description: 'Sıcak daldırma galvaniz çelik kepenk. Manuel veya motorlu, geniş açıklıklar, yüksek dayanım. Dükkan ve mağazalar için ideal.',
        longDescription: `Galvaniz Çelik Kepenk, ticari mekanların güvenliği için tasarlanmış ekonomik çözümdür.

Malzeme Özellikleri:
- Sıcak daldırma galvaniz kaplama
- Korozyona dayanıklı
- 15+ yıl ömür

Kullanım Alanları:
- Mağaza girişleri
- Depo kapıları
- Otopark girişleri
- Servis alanları`,
        image: '/images/panjur/panjur-celik-kepenk.jpg',
        gallery: ['/images/panjur/panjur-celik-kepenk.jpg', '/images/panjur/panjur-motorlu-villa.jpg'],
        technicalSpecs: [
            { label: 'Malzeme', value: 'Galvaniz Çelik', highlight: false },
            { label: 'Lamel Kalınlığı', value: '0.8mm - 1.2mm', highlight: false },
            { label: 'Max Genişlik', value: '6000mm', highlight: true },
            { label: 'Max Yükseklik', value: '5000mm', highlight: true },
            { label: 'Motor Opsiyonu', value: 'Mevcut', highlight: false },
        ],
        features: [
            'Sıcak daldırma galvaniz',
            'Geniş açıklık kapasitesi',
            'Manuel veya motorlu',
            'Kilitleme sistemi',
        ],
        benefits: [
            'Ekonomik çözüm',
            'Yüksek dayanım',
            'Kolay bakım',
            'Hızlı montaj',
        ],
        securityRating: 'enhanced',
        warranty: '5 Yıl',
        certifications: ['CE'],
        priceRange: 'ekonomik',
        seoKeywords: [
            'kepenk fiyatları',
            'galvaniz kepenk',
            'dükkan kepenk',
            'mağaza kepenk',
        ],
        faq: [
            {
                question: 'Kepenk ne kadar sürede monte edilir?',
                answer: 'Standart bir kepenk montajı 1 gün içinde tamamlanır. Elektrik bağlantısı için ayrıca elektrikçi gerekebilir.',
            },
        ],
    },
    {
        id: 'kepenk-perforeli',
        slug: 'perforeli-celik-kepenk',
        name: 'Perforeli Çelik Kepenk',
        category: 'kepenk-ticari',
        tagline: 'Görünürlük + Güvenlik = Vitrin Kepenki',
        description: 'Delikli (perforeli) çelik lamel ile kapalıyken de vitrin görünürlüğü. Mağaza, banka, showroom için ideal.',
        longDescription: `Perforeli Çelik Kepenk, güvenlik ve görünürlüğü bir arada sunar. Perforasyon oranı özelleştirilebilir.

Avantajları:
- Kapalıyken içerisi görünür (vitrin etkisi)
- Havalandırma sağlar
- Gece aydınlatması dışarıdan görünür
- Marka/logo baskı imkanı`,
        image: '/images/panjur/panjur-celik-kepenk.jpg',
        gallery: ['/images/panjur/panjur-celik-kepenk.jpg', '/images/panjur/panjur-montaj.jpg'],
        technicalSpecs: [
            { label: 'Malzeme', value: 'Çelik', highlight: false },
            { label: 'Perforasyon', value: '%25 - %50', highlight: true },
            { label: 'Lamel Genişliği', value: '77mm', highlight: false },
            { label: 'Max Genişlik', value: '8000mm', highlight: true },
        ],
        features: [
            'Özelleştirilebilir perforasyon',
            'Havalandırma',
            'Vitrin görünürlüğü',
            'Logo baskı opsiyonu',
        ],
        benefits: [
            'Gece görünürlüğü',
            'Havalandırma',
            'Estetik görünüm',
        ],
        securityRating: 'enhanced',
        warranty: '5 Yıl',
        certifications: ['CE'],
        priceRange: 'orta',
        seoKeywords: [
            'perforeli kepenk',
            'vitrin kepenk',
            'mağaza kepenk',
        ],
        faq: [
            {
                question: 'Perforasyon oranı güvenliği etkiler mi?',
                answer: 'Perforasyon oranı arttıkça görünürlük artar ancak fiziksel dayanım azalır. Güvenlik öncelikli alanlar için %25 oranı önerilir.',
            },
        ],
    },

    // =====================================================
    // ENDÜSTRİYEL KEPENK SİSTEMLERİ
    // =====================================================
    {
        id: 'kepenk-endustriyel-izoleli',
        slug: 'izoleli-endustriyel-kepenk',
        name: 'İzoleli Endüstriyel Seksiyonel Kapı',
        category: 'kepenk-endustriyel',
        tagline: 'Fabrika ve Depo için Yüksek Yalıtımlı Kapı',
        description: '42mm köpük dolgulu panel, U değeri 1.0 W/m²K. Yükleme rampaları, soğuk hava depoları, üretim tesisleri için.',
        longDescription: `İzoleli Endüstriyel Seksiyonel Kapı, üretim tesisleri ve depoların enerji verimliliği için kritik öneme sahiptir.

Panel Yapısı:
- 42mm sandwich panel
- CFC-free polyüretan köpük dolgu
- Çelik sac kaplama (0.5mm)
- EPDM ara conta sistemi

Uygulama Alanları:
- Fabrika giriş kapıları
- Soğuk hava depoları
- Yükleme rampaları
- Lojistik merkezleri`,
        image: '/images/panjur/panjur-celik-kepenk.jpg',
        gallery: ['/images/panjur/panjur-celik-kepenk.jpg', '/images/panjur/panjur-motorlu-villa.jpg'],
        technicalSpecs: [
            { label: 'Panel Kalınlığı', value: '42mm', highlight: true },
            { label: 'Isı İletimi (U)', value: '1.0 W/m²K', highlight: true },
            { label: 'Max Genişlik', value: '8000mm', highlight: false },
            { label: 'Max Yükseklik', value: '6000mm', highlight: false },
            { label: 'Açılış Hızı', value: '0.3 m/s', highlight: false },
            { label: 'Rüzgar Dayanımı', value: 'Class 3 (EN 12424)', highlight: false },
        ],
        features: [
            '42mm sandwich panel',
            'CFC-free PU köpük',
            'EPDM conta sistemi',
            'Fotosel güvenlik',
            'Frekans invertör motor',
        ],
        benefits: [
            'Üstün ısı yalıtımı',
            'Enerji tasarrufu',
            'Sessiz çalışma',
            'Yüksek dayanım',
        ],
        energyEfficiency: {
            summerCooling: 50,
            winterHeating: 45,
            soundReduction: 25,
        },
        securityRating: 'industrial',
        warranty: '5 Yıl',
        certifications: ['CE', 'EN 13241-1', 'ISO 9001'],
        priceRange: 'premium',
        seoKeywords: [
            'endüstriyel kapı',
            'seksiyonel kapı',
            'fabrika kapısı',
            'depo kapısı',
            'izoleli kapı',
        ],
        faq: [
            {
                question: 'Seksiyonel kapının avantajı nedir?',
                answer: 'Seksiyonel kapılar tavana açıldığı için iç ve dış alanda yer kaplamaz. Ayrıca tam kontakt yüzeyi sayesinde mükemmel sızdırmazlık sağlar.',
            },
        ],
    },
    {
        id: 'kepenk-hizli-kapi',
        slug: 'hizli-pvc-kapi',
        name: 'Hızlı PVC Kapı (Rapid Door)',
        category: 'kepenk-endustriyel',
        tagline: 'Yüksek Trafik Alanları için Ultra Hızlı Geçiş',
        description: 'Saniyede 2 metreye varan açılış hızı. Forklift trafiği, temiz oda, soğuk oda geçişleri için.',
        longDescription: `Hızlı PVC Kapı (Rapid Door), yoğun araç ve personel trafiğinin olduğu alanlarda enerji kaybını minimize eder.

Hız Avantajı:
- Açılış hızı: 2.0 m/s
- Kapanış hızı: 0.8 m/s
- Bekleme süresi yok

Güvenlik Sistemleri:
- Fotosel bariyer
- Çarpma algılama
- Otomatik geri sarım
- Acil durum manuel açma`,
        image: '/images/panjur/panjur-montaj.jpg',
        gallery: ['/images/panjur/panjur-montaj.jpg', '/images/panjur/panjur-modern-villa.jpg'],
        technicalSpecs: [
            { label: 'Açılış Hızı', value: '2.0 m/s', highlight: true },
            { label: 'Kapanış Hızı', value: '0.8 m/s', highlight: false },
            { label: 'Branda Kalınlığı', value: '1.2mm PVC', highlight: false },
            { label: 'Rüzgar Dayanımı', value: 'Class 2', highlight: false },
            { label: 'Çevrim Ömrü', value: '500.000+', highlight: true },
        ],
        features: [
            '2.0 m/s açılış hızı',
            'PVC branda gövde',
            'Fotosel güvenlik',
            'Radar sensör aktivasyon',
            'Self-repair sistem',
        ],
        benefits: [
            'Minimum enerji kaybı',
            'Yüksek trafik kapasitesi',
            'Düşük bakım',
            'Hijyenik ortam',
        ],
        securityRating: 'industrial',
        warranty: '3 Yıl',
        certifications: ['CE', 'EN 13241-1'],
        priceRange: 'premium',
        seoKeywords: [
            'hızlı kapı',
            'rapid door',
            'pvc kapı',
            'fabrika kapısı',
        ],
        faq: [
            {
                question: 'PVC branda yırtılırsa ne olur?',
                answer: 'Modern hızlı kapılarda "self-repair" sistemi bulunur. Hafif çarpmalarda branda otomatik olarak kılavuzlara geri oturur. Ağır hasarlarda branda değişimi 1 saat içinde yapılabilir.',
            },
        ],
    },
];

// SEO Keywords
export const panjurSeoKeywords = {
    primary: [
        'motorlu panjur fiyatları',
        'somfy panjur',
        'kepenk fiyatları',
        'alüminyum panjur',
        'akıllı panjur',
    ],
    technical: [
        'köpük dolgulu lamel',
        'polyüretan panjur',
        'io homecontrol',
        'tahoma akıllı ev',
    ],
    local: [
        'Beylikdüzü panjur montaj',
        'İstanbul kepenk',
        'Esenyurt panjur',
    ],
};

// Helper functions
export function getPanjurSystemBySlug(slug: string): PanjurSystem | undefined {
    return panjurSystems.find((system) => system.slug === slug);
}

export function getPanjurSystemsByCategory(category: PanjurSystem['category']): PanjurSystem[] {
    return panjurSystems.filter((system) => system.category === category);
}
