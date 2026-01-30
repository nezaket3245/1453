/**
 * Aluminum Systems & Façade Engineering Data
 * Comprehensive technical specifications for aluminum products
 * Focus: Thermal break technology, curtain walls, office partitions
 * SEO: Alüminyum doğrama, ısı yalıtımlı alüminyum, cephe giydirme
 */

export interface AluminumSystem {
    id: string;
    slug: string;
    name: string;
    category: 'thermal-break' | 'curtain-wall' | 'office-partition' | 'sliding' | 'hebe-schiebe';
    tagline: string;
    description: string;
    longDescription: string;
    image: string;
    gallery: string[];
    technicalSpecs: {
        label: string;
        value: string;
        icon?: string;
        highlight?: boolean;
    }[];
    features: string[];
    benefits: string[];
    applications: string[];
    thermalData?: {
        uValue: number; // W/m²K
        airTightness: string;
        waterTightness: string;
        soundInsulation: number; // dB
    };
    colorOptions: {
        name: string;
        type: 'ral' | 'anodic' | 'wood-effect';
        code?: string;
        hex: string;
    }[];
    warranty: string;
    certifications: string[];
    priceRange: 'ekonomik' | 'orta' | 'premium';
    seoKeywords: string[];
    faq: { question: string; answer: string }[];
}

// PVC vs Aluminum Performance Matrix
export const pvcVsAluminumMatrix = {
    criteria: [
        {
            id: 'lifespan',
            label: 'Ömür',
            pvc: { value: '25-30 yıl', score: 4 },
            aluminum: { value: '40-50 yıl', score: 5 },
            winner: 'aluminum',
        },
        {
            id: 'thermal',
            label: 'Isı Yalıtımı',
            pvc: { value: 'Çok İyi (0.8-1.2 W/m²K)', score: 5 },
            aluminum: { value: 'İyi (1.5-2.5 W/m²K)', score: 4 },
            winner: 'pvc',
        },
        {
            id: 'fireResistance',
            label: 'Yangın Dayanımı',
            pvc: { value: 'B2 Sınıfı', score: 3 },
            aluminum: { value: 'A1 Yanmaz', score: 5 },
            winner: 'aluminum',
        },
        {
            id: 'largeSpans',
            label: 'Geniş Açıklık',
            pvc: { value: 'Max 2.5m', score: 3 },
            aluminum: { value: 'Max 6m+', score: 5 },
            winner: 'aluminum',
        },
        {
            id: 'weight',
            label: 'Hafiflik',
            pvc: { value: 'Orta', score: 4 },
            aluminum: { value: 'Çok Hafif', score: 5 },
            winner: 'aluminum',
        },
        {
            id: 'maintenance',
            label: 'Bakım Kolaylığı',
            pvc: { value: 'Çok Kolay', score: 5 },
            aluminum: { value: 'Kolay', score: 4 },
            winner: 'pvc',
        },
        {
            id: 'price',
            label: 'Fiyat',
            pvc: { value: 'Ekonomik', score: 5 },
            aluminum: { value: 'Orta-Yüksek', score: 3 },
            winner: 'pvc',
        },
        {
            id: 'aesthetics',
            label: 'Slim Profil Estetiği',
            pvc: { value: '70-80mm', score: 3 },
            aluminum: { value: '35-50mm', score: 5 },
            winner: 'aluminum',
        },
    ],
    recommendation: {
        pvc: ['Konut projeleri', 'Isı yalıtımı öncelikli', 'Bütçe odaklı', 'Standart boyutlar'],
        aluminum: ['Ticari projeler', 'Geniş cephe açıklıkları', 'Modern mimari', 'Yüksek binalar', 'Yangın güvenliği'],
    },
};

// Thermal Break Technology Explanation
export const thermalBreakTechnology = {
    title: 'Polyamide Thermal Break Teknolojisi',
    description: 'Isı köprüsünü keserek enerji kaybını önleyen ileri teknoloji',
    components: [
        {
            name: 'Polyamide (PA66) Bar',
            description: 'Cam elyaf takviyeli polyamide profil - Isı iletkenliği alüminyumun 1/1000\'i',
            benefit: 'Maksimum ısı yalıtımı',
        },
        {
            name: 'Kondens Kanalları',
            description: 'Profilin içindeki özel yoğuşma drenaj sistemi',
            benefit: 'Su birikmesini ve korozyonu önler',
        },
        {
            name: 'EPDM Contalar',
            description: 'UV ve ozona dayanıklı premium contalar',
            benefit: 'Hava ve su sızdırmazlığı',
        },
        {
            name: 'Köşe Birleşim Mukavemeti',
            description: 'Özel köşe bağlantı sistemleri',
            benefit: 'Yapısal bütünlük ve dayanıklılık',
        },
    ],
    energySavings: {
        percentage: 35,
        description: 'Isı yalıtımlı alüminyum ile %35\'e varan enerji tasarrufu',
    },
};

// Color & Finish Library
export const aluminumFinishes = {
    ral: [
        { name: 'Beyaz', code: 'RAL 9016', hex: '#F7F9FA', popular: true },
        { name: 'Antrasit Gri', code: 'RAL 7016', hex: '#383E42', popular: true },
        { name: 'Siyah', code: 'RAL 9005', hex: '#0A0A0A', popular: true },
        { name: 'Bronz', code: 'RAL 8014', hex: '#4A3728', popular: false },
        { name: 'Gümüş Metalik', code: 'RAL 9006', hex: '#A5A5A5', popular: false },
    ],
    anodic: [
        { name: 'Doğal Anodize', code: 'C0', hex: '#C0C0C0', description: 'Mat gümüş görünüm' },
        { name: 'Bronz Anodize', code: 'C32', hex: '#8B7355', description: 'Klasik bronz ton' },
        { name: 'Siyah Anodize', code: 'C35', hex: '#2F2F2F', description: 'Derin siyah mat' },
        { name: 'Şampanya', code: 'C31', hex: '#D4AF37', description: 'Altın-şampanya ton' },
    ],
    woodEffect: [
        { name: 'Altın Meşe', code: 'Golden Oak', hex: '#B8860B', texture: 'wood' },
        { name: 'Ceviz', code: 'Walnut', hex: '#5D432C', texture: 'wood' },
        { name: 'Maun', code: 'Mahogany', hex: '#4A2C2A', texture: 'wood' },
        { name: 'Açık Meşe', code: 'Light Oak', hex: '#C4A35A', texture: 'wood' },
    ],
    specialty: [
        { name: 'Eloksal Kaplama', description: 'Elektroliz ile oksit tabakası - 20+ yıl dayanım' },
        { name: 'Elektrostatik Toz Boya', description: 'Çevre dostu, solvent içermeyen kaplama' },
        { name: 'PVDF Kaplama', description: 'Ultra dayanıklı flor bazlı kaplama - Deniz kenarı projeler' },
    ],
};

// Main Aluminum Systems Data
export const aluminumSystems: AluminumSystem[] = [
    // =====================================================
    // ISI YALITIMLI ALÜMİNYUM DOĞRAMA
    // =====================================================
    {
        id: 'thermal-break-window',
        slug: 'isi-yalitimli-aluminyum-pencere',
        name: 'Isı Yalıtımlı Alüminyum Pencere',
        category: 'thermal-break',
        tagline: 'Polyamide Thermal Break ile Maksimum Enerji Verimliliği',
        description: 'Polyamide (PA66) ısı köprüsü kesici teknolojisi ile üretilen ısı yalıtımlı alüminyum pencereler. %35\'e varan enerji tasarrufu, A1 yangın sınıfı ve 40+ yıl ömür.',
        longDescription: `Isı Yalıtımlı Alüminyum Pencere Sistemleri, modern yapı teknolojisinin en ileri noktasını temsil eder. Polyamide (PA66) cam elyaf takviyeli ısı köprüsü kesici barlar sayesinde, alüminyumun doğal ısı iletkenliği ortadan kaldırılır.

Bu teknoloji sayesinde:
- İç ve dış profiller birbirinden termal olarak izole edilir
- Kış aylarında içeriden dışarıya ısı kaçışı engellenir
- Yaz aylarında dış sıcaklığın içeri girişi önlenir
- Kondens (buğu) oluşumu minimize edilir

Kondens kanallı profil yapısı, olası yoğuşma suyunu kontrollü şekilde dışarı atar. EPDM contalar ile Class 4 hava sızdırmazlığı ve 9A su sızdırmazlığı sağlanır.

Özel köşe birleşim sistemleri ile yapısal mukavemet EN standardlarını aşar. Geniş açıklıklar ve ağır camlar için ideal yapısal dayanım sunar.`,
        image: '/images/aluminyum/thermal-break-pencere.png',
        gallery: ['/images/aluminyum/thermal-break-pencere.png', '/images/aluminyum/surme-sistem-kapi.png'],
        technicalSpecs: [
            { label: 'Isı İletim Katsayısı (Uf)', value: '1.8 - 2.4 W/m²K', icon: 'thermal', highlight: true },
            { label: 'Profil Derinliği', value: '60mm / 70mm / 85mm', icon: 'depth' },
            { label: 'Isı Köprüsü Kesici', value: 'PA66 GF25 Polyamide', icon: 'break' },
            { label: 'Hava Sızdırmazlık', value: 'Class 4 (EN 12207)', icon: 'air' },
            { label: 'Su Sızdırmazlık', value: '9A (EN 12208)', icon: 'water' },
            { label: 'Ses Yalıtımı', value: '45 dB\'e kadar', icon: 'sound' },
            { label: 'Yangın Sınıfı', value: 'A1 (Yanmaz)', icon: 'fire', highlight: true },
            { label: 'Max Cam Kalınlığı', value: '52mm\'e kadar', icon: 'glass' },
        ],
        thermalData: {
            uValue: 2.0,
            airTightness: 'Class 4',
            waterTightness: '9A',
            soundInsulation: 45,
        },
        features: [
            'PA66 Polyamide ısı köprüsü kesici',
            'Kondens kanallı profil yapısı',
            '3 kademeli EPDM conta sistemi',
            'Gizli drenaj kanalları',
            'Güçlendirilmiş köşe birleşimleri',
            'CE ve TSE belgeli',
            'Elektrostatik toz boya kaplama',
            'Multipoint kilit sistemi',
        ],
        benefits: [
            '%35\'e varan enerji tasarrufu',
            'Buğulanma ve kondensi önler',
            '40+ yıl kullanım ömrü',
            'A1 yangın sınıfı güvenliği',
            'Çevre dostu üretim',
        ],
        applications: [
            'Konut projeleri',
            'Ofis binaları',
            'Hastaneler ve sağlık kuruluşları',
            'Eğitim binaları',
            'Lüks villalar',
            'Pasif ev projeleri',
        ],
        colorOptions: [
            { name: 'Beyaz', type: 'ral', code: 'RAL 9016', hex: '#F7F9FA' },
            { name: 'Antrasit', type: 'ral', code: 'RAL 7016', hex: '#383E42' },
            { name: 'Doğal Anodize', type: 'anodic', code: 'C0', hex: '#C0C0C0' },
            { name: 'Altın Meşe', type: 'wood-effect', code: 'Golden Oak', hex: '#B8860B' },
        ],
        warranty: '10 Yıl Profil + 5 Yıl Aksesuar Garantisi',
        certifications: ['CE', 'TSE', 'EN 14351-1', 'ISO 9001'],
        priceRange: 'orta',
        seoKeywords: [
            'ısı yalıtımlı alüminyum pencere',
            'thermal break alüminyum',
            'alüminyum doğrama fiyatları',
            'polyamide alüminyum',
            'enerji tasarruflu pencere',
            'Beylikdüzü alüminyum doğrama',
        ],
        faq: [
            {
                question: 'Isı yalıtımlı alüminyum ile normal alüminyum arasındaki fark nedir?',
                answer: 'Isı yalıtımlı alüminyumda profillerin ortasında polyamide (PA66) ısı köprüsü kesici barlar bulunur. Bu barlar, iç ve dış profilleri termal olarak izole eder ve ısı geçişini %60\'a kadar azaltır. Normal alüminyum profillerde bu bölme olmadığından ısı doğrudan iletilir.',
            },
            {
                question: 'Alüminyum pencere mi PVC pencere mi daha iyi?',
                answer: 'Her ikisinin de avantajları vardır. Alüminyum: Daha ince profil, geniş açıklıklar, A1 yangın sınıfı, 40+ yıl ömür. PVC: Daha iyi ısı yalıtımı, ekonomik fiyat, kolay bakım. Ticari projeler ve geniş cepheler için alüminyum, konutlar için PVC önerilir.',
            },
        ],
    },

    // =====================================================
    // CEPHE SİSTEMLERİ (CURTAIN WALL)
    // =====================================================
    {
        id: 'curtain-wall-capped',
        slug: 'kapakli-cephe-sistemi',
        name: 'Kapaklı Cephe Sistemi (Capped Curtain Wall)',
        category: 'curtain-wall',
        tagline: 'Modern Plazalar için Profesyonel Cephe Çözümü',
        description: 'Dışarıdan görünür alüminyum kapaklarla cam panellerin tutulduğu klasik cephe giydirme sistemi. Yüksek yapısal mukavemet ve kolay bakım imkanı.',
        longDescription: `Kapaklı Cephe Sistemi (Capped Curtain Wall), ticari ve kurumsal binalarda en yaygın kullanılan cephe giydirme teknolojisidir. Dışarıdan görünür alüminyum kapaklar (pressure plates), cam panelleri güvenli bir şekilde yerinde tutar.

Sistem Avantajları:
- Cam değişimi için cephenin tamamını sökmek gerekmez
- Her panel bağımsız olarak değiştirilebilir
- Bakım ve onarım maliyetleri düşüktür
- Yüksek rüzgar yüklerine dayanır

Yapısal Özellikler:
- Dikey ve yatay profiller (mullion & transom) modüler yapıdadır
- Isı yalıtımlı profil seçenekleri mevcuttur
- 4 taraftan basınçlı conta sistemi tam sızdırmazlık sağlar
- Geniş cam kalınlıkları (8mm - 36mm) desteklenir`,
        image: '/images/aluminyum/curtain-wall-giydirme.png',
        gallery: ['/images/aluminyum/curtain-wall-giydirme.png', '/images/aluminyum/thermal-break-pencere.png'],
        technicalSpecs: [
            { label: 'Profil Sistemi', value: 'Mullion & Transom', icon: 'profile' },
            { label: 'Max Cam Kalınlığı', value: '8mm - 36mm', icon: 'glass' },
            { label: 'Rüzgar Yükü Kapasitesi', value: '3000 Pa\'ya kadar', icon: 'wind', highlight: true },
            { label: 'Hava Sızdırmazlık', value: 'Class A4', icon: 'air' },
            { label: 'Su Sızdırmazlık', value: 'RE 1200', icon: 'water' },
            { label: 'Isı Yalıtımı (Uw)', value: '1.4 - 2.2 W/m²K', icon: 'thermal' },
            { label: 'Yangın Performansı', value: 'EI60 opsiyonu', icon: 'fire' },
        ],
        features: [
            'Modüler mullion-transom sistemi',
            'Kolay cam değişimi imkanı',
            '4 taraftan basınçlı conta',
            'Isı yalıtımlı profil opsiyonu',
            'Entegre drenaj sistemi',
            'Çeşitli kapak genişlikleri (50-65mm)',
            'Yangın dayanımlı versiyon',
        ],
        benefits: [
            'Düşük bakım maliyeti',
            'Bağımsız panel değişimi',
            'Yüksek yapısal güvenlik',
            'Estetik profil görünümü',
            'Uzun süreli garanti',
        ],
        applications: [
            'Ofis plazaları',
            'Alışveriş merkezleri',
            'Havalimanları',
            'Oteller',
            'Kurumsal binalar',
            'Yüksek binalar',
        ],
        colorOptions: [
            { name: 'Antrasit', type: 'ral', code: 'RAL 7016', hex: '#383E42' },
            { name: 'Siyah', type: 'ral', code: 'RAL 9005', hex: '#0A0A0A' },
            { name: 'Bronz Anodize', type: 'anodic', code: 'C32', hex: '#8B7355' },
        ],
        warranty: '15 Yıl Sistem Garantisi',
        certifications: ['CE', 'EN 13830', 'CWCT'],
        priceRange: 'premium',
        seoKeywords: [
            'cephe giydirme',
            'kapaklı cephe sistemi',
            'curtain wall',
            'alüminyum cephe',
            'cam cephe sistemleri',
            'plaza cephe',
        ],
        faq: [
            {
                question: 'Kapaklı cephe ile silikon cephe arasındaki fark nedir?',
                answer: 'Kapaklı cephede cam paneller dışarıdan görünür alüminyum kapaklarla tutulur, daha geleneksel bir görünüm sunar. Silikon cephede ise camlar yapısal silikon ile tutulur, dışarıdan sadece cam görünür ve tamamen pürüzsüz bir yüzey elde edilir.',
            },
        ],
    },
    {
        id: 'structural-glazing',
        slug: 'silikon-cephe-structural-glazing',
        name: 'Silikon Cephe (Structural Glazing)',
        category: 'curtain-wall',
        tagline: 'Kesintisiz Cam Görünümü için İleri Teknoloji',
        description: 'Yapısal silikon ile cam panellerin tutulduğu modern cephe sistemi. Dışarıdan sadece cam görünür, tamamen pürüzsüz ve kesintisiz estetik.',
        longDescription: `Silikon Cephe (Structural Glazing), çağdaş mimarinin en prestijli cephe çözümüdür. Cam paneller, yüksek mukavemetli yapısal silikon ile alüminyum alt yapıya yapıştırılır. Sonuç: Dışarıdan bakıldığında sadece cam görünen, kesintisiz ve etkileyici bir cephe.

Teknolojik Üstünlükler:
- Yapısal silikon 25+ yıl UV ve hava koşullarına dayanır
- Cam ve alüminyum arasındaki termal hareket absorbe edilir
- Rüzgar yükü tüm cepheye eşit dağılır
- Ses ve ısı yalıtımı üst düzeydedir

Estetik Avantajlar:
- Görünür profil yoktur
- Gece aydınlatmalı binalarda dramatik etki
- Modern mimari projelerin ilk tercihi
- Geniş cam panellerle panoramik görüntü`,
        image: '/images/aluminyum/curtain-wall-giydirme.png',
        gallery: ['/images/aluminyum/curtain-wall-giydirme.png', '/images/aluminyum/ofis-bolme-cam.png'],
        technicalSpecs: [
            { label: 'Cam Tutuş Yöntemi', value: 'Yapısal Silikon', icon: 'silicone', highlight: true },
            { label: 'Max Panel Boyutu', value: '3000 x 6000mm', icon: 'size' },
            { label: 'Silikon Dayanımı', value: '25+ Yıl', icon: 'durability' },
            { label: 'Rüzgar Dayanımı', value: '4000 Pa', icon: 'wind' },
            { label: 'Isı Yalıtımı (Uw)', value: '1.2 - 1.8 W/m²K', icon: 'thermal' },
            { label: 'Ses Yalıtımı', value: '42 dB\'e kadar', icon: 'sound' },
        ],
        features: [
            'Yapısal silikon cam tutma',
            'Dışarıdan görünür profil yok',
            'Fabrikada panel üretimi',
            '4 kenar silikon yapıştırma',
            'EPDM ikincil conta sistemi',
            'Entegre havalandırma opsiyonu',
        ],
        benefits: [
            'Kesintisiz cam estetik',
            'Modern mimari uyum',
            'Üstün hava sızdırmazlığı',
            'Minimum bakım',
            'Yüksek prestij',
        ],
        applications: [
            'Lüks plazalar',
            'Banka genel merkezleri',
            '5 yıldızlı oteller',
            'Marka mağazaları',
            'Müzeler ve kültür merkezleri',
        ],
        colorOptions: [
            { name: 'Görünmez (Cam Only)', type: 'ral', hex: '#87CEEB' },
            { name: 'İç Profil Antrasit', type: 'ral', code: 'RAL 7016', hex: '#383E42' },
        ],
        warranty: '15 Yıl Sistem + 25 Yıl Silikon Garantisi',
        certifications: ['CE', 'EN 13830', 'ETAG 002', 'ASTM C1401'],
        priceRange: 'premium',
        seoKeywords: [
            'silikon cephe',
            'structural glazing',
            'yapısal cephe',
            'cam cephe',
            'modern cephe sistemleri',
        ],
        faq: [
            {
                question: 'Yapısal silikon güvenli mi? Cam düşer mi?',
                answer: 'Yapısal silikonlar, uçak sanayiinde de kullanılan ultra yüksek mukavemetli malzemelerdir. 25+ yıl UV, sıcaklık ve rüzgar yüklerine dayanacak şekilde test edilir. Ayrıca ikincil mekanik tutucu sistemler ek güvenlik sağlar.',
            },
        ],
    },

    // =====================================================
    // OFİS BÖLME SİSTEMLERİ
    // =====================================================
    {
        id: 'office-partition-slim',
        slug: 'cam-ofis-bolme-sistemi',
        name: 'Slim Line Cam Ofis Bölme',
        category: 'office-partition',
        tagline: 'Minimalist Tasarım, Maksimum Şeffaflık',
        description: 'Ultra ince profilli cam bölme sistemi. 20mm\'ye kadar incelen profiller ile maksimum görsel açıklık. Ses yalıtımı 45 dB\'e kadar.',
        longDescription: `Slim Line Cam Ofis Bölme Sistemi, modern iş yerlerinin açık ofis konseptini korurken gizlilik ve ses yalıtımı ihtiyacını karşılar. Sadece 20mm genişliğindeki ultra ince profiller sayesinde cam yüzeyler neredeyse çerçevesiz görünür.

Akustik Performans:
- Tek cam: 35 dB ses yalıtımı
- Çift cam: 45 dB ses yalıtımı
- Akustik lamine cam opsiyonu

Modüler Esneklik:
- Ofis düzeni değişikliklerinde kolayca söküp takılabilir
- Panel bazlı sistem hızlı montaj sağlar
- Kapı entegrasyonu (menteşeli/sürgülü)
- Store/perde entegrasyonu`,
        image: '/images/aluminyum/ofis-bolme-cam.png',
        gallery: ['/images/aluminyum/ofis-bolme-cam.png', '/images/aluminyum/curtain-wall-giydirme.png'],
        technicalSpecs: [
            { label: 'Profil Genişliği', value: '20mm - 50mm', icon: 'profile', highlight: true },
            { label: 'Ses Yalıtımı', value: '35 - 45 dB', icon: 'sound', highlight: true },
            { label: 'Cam Kalınlığı', value: '8mm - 12mm', icon: 'glass' },
            { label: 'Max Yükseklik', value: '3500mm', icon: 'height' },
            { label: 'Yangın Dayanımı', value: 'EI30 / EI60 opsiyonu', icon: 'fire' },
        ],
        features: [
            'Ultra ince 20mm profil',
            'Modüler panel sistemi',
            'Kolay montaj/demontaj',
            'Entegre kapı sistemleri',
            'Store/perde opsiyonu',
            'Yangın dayanımlı versiyon',
            'Akustik cam seçenekleri',
        ],
        benefits: [
            'Maksimum görsel açıklık',
            'Ofis düzeni esnekliği',
            'Yüksek ses yalıtımı',
            'Hızlı kurulum',
            'Kolay bakım',
        ],
        applications: [
            'Açık ofisler',
            'Toplantı odaları',
            'Yönetici ofisleri',
            'Banka şubeleri',
            'Showroomlar',
            'Sağlık kuruluşları',
        ],
        colorOptions: [
            { name: 'Mat Siyah', type: 'ral', code: 'RAL 9005', hex: '#0A0A0A' },
            { name: 'Antrasit', type: 'ral', code: 'RAL 7016', hex: '#383E42' },
            { name: 'Beyaz', type: 'ral', code: 'RAL 9016', hex: '#F7F9FA' },
            { name: 'Krom Efekt', type: 'anodic', hex: '#C0C0C0' },
        ],
        warranty: '5 Yıl Sistem Garantisi',
        certifications: ['CE', 'EN 10077', 'ISO 717-1'],
        priceRange: 'orta',
        seoKeywords: [
            'cam ofis bölme',
            'ofis bölme sistemleri',
            'cam bölme fiyatları',
            'ses yalıtımlı bölme',
            'modüler ofis duvarı',
        ],
        faq: [
            {
                question: 'Cam ofis bölme ses yalıtımı sağlar mı?',
                answer: 'Evet. Çift camlı sistemlerde 45 dB\'e kadar ses yalıtımı sağlanır. Bu seviye, normal konuşma sesini tamamen bloke eder. Akustik lamine cam ile 50 dB\'e kadar çıkılabilir.',
            },
        ],
    },

    // =====================================================
    // ALÜMİNYUM SÜRME & HEBE-SCHIEBE
    // =====================================================
    {
        id: 'hebe-schiebe-lift-slide',
        slug: 'hebe-schiebe-kaldirmali-surme',
        name: 'HBŞB - Kaldırmalı Sürme Sistemi (Hebe-Schiebe)',
        category: 'hebe-schiebe',
        tagline: 'Geniş Açıklıklar için Panoramik Çözüm',
        description: 'Kaldır-kaydır mekanizması ile 400kg\'a kadar cam taşıma kapasitesi. 6 metre genişliğe kadar kesintisiz açıklık. Villa ve lüks konutların vazgeçilmezi.',
        longDescription: `HBŞB (Hebe-Schiebe) Kaldırmalı Sürme Sistemi, büyük cam panellerin zahmetsizce hareket ettirilmesini sağlayan Alman mühendislik harikasıdır. Kolu çevirdiğinizde panel birkaç milimetre yükselir, ardından parmak ucuyla bile kaydırılabilir.

Mekanik Üstünlük:
- 400kg\'a kadar panel ağırlığı taşır
- Tek parmakla açılıp kapanır
- Yüksek hassasiyetli rulmanlı taşıyıcılar
- 100.000+ açma/kapama döngüsü test edilmiş

Termal Performans:
- Isı yalıtımlı polyamide profiller
- 3 kademeli EPDM conta sistemi
- Kış aylarında bile kondens yok
- Uf değeri: 1.6 W/m²K\'ya kadar`,
        image: '/images/aluminyum/hebe-schiebe-kapi.png',
        gallery: ['/images/aluminyum/hebe-schiebe-kapi.png', '/images/aluminyum/surme-sistem-kapi.png'],
        technicalSpecs: [
            { label: 'Max Panel Genişliği', value: '3000mm', icon: 'width' },
            { label: 'Max Sistem Genişliği', value: '6000mm+', icon: 'span', highlight: true },
            { label: 'Taşıma Kapasitesi', value: '400kg/panel', icon: 'weight', highlight: true },
            { label: 'Profil Derinliği', value: '120mm - 160mm', icon: 'depth' },
            { label: 'Isı İletimi (Uf)', value: '1.6 - 2.2 W/m²K', icon: 'thermal' },
            { label: 'Hava Sızdırmazlık', value: 'Class 4', icon: 'air' },
            { label: 'Su Sızdırmazlık', value: '9A', icon: 'water' },
            { label: 'Max Cam Kalınlığı', value: '52mm', icon: 'glass' },
        ],
        features: [
            'Kaldır-kaydır mekanizması',
            '400kg taşıma kapasitesi',
            'Rulmanlı taşıyıcı sistem',
            '3 kademeli conta',
            'Eşik seviyesi ayarı',
            'Motorize opsiyon',
            '2, 3 veya 4 kanat seçeneği',
            'Köşe çözümü uygulanabilir',
        ],
        benefits: [
            'Panoramik manzara kesintisiz',
            'Parmak ucuyla kolay kullanım',
            'Üstün ısı ve ses yalıtımı',
            'Maksimum hava ve su sızdırmazlığı',
            'Uzun ömürlü mekanizma',
        ],
        applications: [
            'Lüks villalar',
            'Deniz manzaralı evler',
            'Penthouse daireler',
            'Butik oteller',
            'Restoran teras kapatma',
        ],
        colorOptions: [
            { name: 'Antrasit', type: 'ral', code: 'RAL 7016', hex: '#383E42' },
            { name: 'Siyah', type: 'ral', code: 'RAL 9005', hex: '#0A0A0A' },
            { name: 'Beyaz', type: 'ral', code: 'RAL 9016', hex: '#F7F9FA' },
            { name: 'Corten Efekt', type: 'wood-effect', hex: '#8B4513' },
        ],
        warranty: '10 Yıl Sistem Garantisi',
        certifications: ['CE', 'EN 14351-1', 'RAL Gütezeichen'],
        priceRange: 'premium',
        seoKeywords: [
            'hebe schiebe',
            'kaldırmalı sürme',
            'alüminyum sürme kapı',
            'panoramik sürme sistem',
            'villa kapı sistemleri',
        ],
        faq: [
            {
                question: 'Hebe-Schiebe sistemi nasıl çalışır?',
                answer: 'Kapı kolunu 180° çevirdiğinizde, özel bir mekanizma cam paneli birkaç milimetre yukarı kaldırır. Bu sayede panel, contalardan ve eşikten ayrılır ve parmak ucuyla bile kaydırılabilir hale gelir. Kolonu geri çevirdiğinizde panel iner ve contalar devreye girerek tam sızdırmazlık sağlar.',
            },
        ],
    },
];

// SEO Keywords for entire Aluminum section
export const aluminumSeoKeywords = {
    primary: [
        'alüminyum doğrama fiyatları',
        'ısı yalıtımlı alüminyum pencere',
        'alüminyum cephe giydirme',
        'Beylikdüzü alüminyum bayi',
        'ofis cam bölme sistemleri',
    ],
    technical: [
        'kondens kanallı profiller',
        'elektrostatik toz boya',
        'eloksal kaplama',
        'köşe birleşim mukavemeti',
        'polyamide thermal break',
        'structural glazing',
    ],
    longTail: [
        'İstanbul alüminyum doğrama montaj',
        'ticari bina cephe kaplama',
        'ses yalıtımlı cam bölme',
        'hebe schiebe sürme kapı fiyat',
    ],
};

// Helper functions
export function getAluminumSystemBySlug(slug: string): AluminumSystem | undefined {
    return aluminumSystems.find((system) => system.slug === slug);
}

export function getAluminumSystemsByCategory(category: AluminumSystem['category']): AluminumSystem[] {
    return aluminumSystems.filter((system) => system.category === category);
}
