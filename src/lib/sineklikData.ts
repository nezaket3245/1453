/**
 * Sineklik (Fly Screen) Systems Data
 * Comprehensive product specifications for SEO-optimized content
 * Keywords: Beylikdüzü sineklik, kedi sinekliği, plise sineklik, İstanbul sineklik montajı
 */

export interface SineklikSystem {
    id: string;
    slug: string;
    name: string;
    category: 'plise' | 'kedi' | 'surme' | 'menteseli' | 'stor';
    subCategory?: string;
    tagline: string;
    description: string;
    longDescription: string;
    image: string;
    gallery: string[];
    technicalSpecs: { label: string; value: string; icon?: string }[];
    features: string[];
    benefits: string[];
    idealFor: string[];
    meshOptions: {
        type: string;
        material: string;
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

export interface MeshType {
    id: string;
    name: string;
    material: string;
    description: string;
    durability: number; // 1-5
    visibility: number; // 1-5
    petResistant: boolean;
    dustResistant: boolean;
    pollenFilter?: boolean;
    pollenFilterRate?: number;
    uvResistance?: number;
    meshDensity?: string;
    airflow?: number; // percentage
    strengthMultiplier?: number;
    noSagTechnology?: boolean;
    securityRated?: boolean;
    selfCleaning?: boolean;
    idealFor: string[];
}

export interface ComparisonCriteria {
    id: string;
    label: string;
    description: string;
}

// Comparison criteria for interactive matrix
export const sineklikComparisonCriteria: ComparisonCriteria[] = [
    { id: 'durability', label: 'Dayanıklılık', description: 'Uzun ömür ve aşınma direnci' },
    { id: 'easeOfUse', label: 'Kullanım Kolaylığı', description: 'Açma/kapama pratikliği' },
    { id: 'cleaning', label: 'Temizlik Kolaylığı', description: 'Bakım ve temizlik pratikliği' },
    { id: 'aesthetics', label: 'Estetik', description: 'Görsel çekicilik ve modern tasarım' },
    { id: 'pricePoint', label: 'Fiyat', description: 'Bütçe dostu olma seviyesi' },
    { id: 'spaceEfficiency', label: 'Alan Verimliliği', description: 'Kapalı durumda kapladığı alan' },
];

// Advanced Mesh Technology Types - Material Science Focus
export const meshTypes: MeshType[] = [
    {
        id: 'standard-fiberglass',
        name: 'Fiberglass Standard Mesh (18x16)',
        material: 'Fiberglass (Cam Elyaf) - UV Stabilized',
        description: 'UV dirençli, 18x16 mesh yoğunluğu ile optimum hava akışı. Standart konut kullanımı için ekonomik ve güvenilir seçenek. 5+ yıl UV dayanımı.',
        durability: 3,
        visibility: 4,
        petResistant: false,
        dustResistant: false,
        pollenFilter: false,
        uvResistance: 5,
        meshDensity: '18x16',
        airflow: 85,
        idealFor: ['Genel kullanım', 'Bütçe odaklı projeler', 'Kiralık daireler', 'Düşük katlı binalar'],
    },
    {
        id: 'petscreen-vinyl',
        name: 'PetScreen® (Pençe Dayanıklı)',
        material: 'Vinil Kaplı Polyester (VCP Technology)',
        description: 'Vinil kaplı polyester teknolojisi ile standart tülden 7 kat daha güçlü. Kedi ve köpek pençelerine karşı yırtılmaz, delinmez yapı. Özel dokuma tekniği ile maksimum dayanıklılık.',
        durability: 5,
        visibility: 3,
        petResistant: true,
        dustResistant: true,
        pollenFilter: false,
        uvResistance: 5,
        meshDensity: '17x14',
        airflow: 75,
        strengthMultiplier: 7,
        idealFor: ['Kedi sahipleri', 'Köpek sahipleri', 'Çocuklu aileler', 'Yüksek kat balkonları', 'Güvenlik öncelikli mekanlar'],
    },
    {
        id: 'poll-tex-allergy',
        name: 'Poll-tex® (Anti-Alerjik Polen Filtresi)',
        material: 'Pollentec Technology - Elektrostatik Polyester',
        description: 'Patentli Pollentec teknolojisi ile çim ve ağaç polenlerinin %99\'unu filtreler. Astım ve alerji hastaları için tıbbi seviyede koruma. Elektrostatik yüklü lifler poleni yakalar.',
        durability: 4,
        visibility: 3,
        petResistant: false,
        dustResistant: true,
        pollenFilter: true,
        pollenFilterRate: 99,
        uvResistance: 4,
        meshDensity: '20x20',
        airflow: 65,
        idealFor: ['Alerji hastaları', 'Astım hastaları', 'Çocuk odaları', 'Yatak odaları', 'Sağlık merkezleri'],
    },
    {
        id: 'tuffscreen-heavy',
        name: 'TuffScreen® (No-Sag Heavy Duty)',
        material: 'Triple-Weave Vinyl Coated Polyester',
        description: 'Yoğun trafikli alanlar için tasarlanmış No-Sag (sarkmaz) teknolojisi. Üçlü dokuma yapısı ile maksimum stabilite. Geniş açıklıklarda bile deforme olmaz.',
        durability: 5,
        visibility: 4,
        petResistant: true,
        dustResistant: true,
        pollenFilter: false,
        uvResistance: 5,
        meshDensity: '18x14',
        airflow: 70,
        noSagTechnology: true,
        idealFor: ['Geniş kapılar', 'Yoğun kullanımlı alanlar', 'Ticari mekanlar', 'Restoranlar', 'Büyük balkonlar'],
    },
    {
        id: 'steel-mesh-security',
        name: 'Paslanmaz Çelik Güvenlik Tülü',
        material: '316 Marine Grade Paslanmaz Çelik',
        description: 'Deniz suyu korozyonuna dayanıklı 316 kalite çelik. Kesilemez, delinemez yapı. Hırsızlık caydırıcı özellik ile güvenlik sınıfı koruma.',
        durability: 5,
        visibility: 3,
        petResistant: true,
        dustResistant: true,
        pollenFilter: false,
        uvResistance: 5,
        meshDensity: '14x14',
        airflow: 80,
        securityRated: true,
        idealFor: ['Zemin katlar', 'Villa bahçe katları', 'Güvenlik gereken alanlar', 'Sahil evleri', 'Ticari depolar'],
    },
    {
        id: 'nano-clear-antidust',
        name: 'Nano-Clear® Anti-Dust',
        material: 'Nano-Kaplı Premium Polyester',
        description: 'Lotus etkisi yaratan nano kaplama ile toz ve kir tutmaz. Yağmur suyu ile kendi kendini temizler. Minimum bakım, maksimum şeffaflık.',
        durability: 4,
        visibility: 5,
        petResistant: false,
        dustResistant: true,
        pollenFilter: true,
        pollenFilterRate: 85,
        uvResistance: 4,
        meshDensity: '18x18',
        airflow: 80,
        selfCleaning: true,
        idealFor: ['Ana cadde kenarı evler', 'Tozlu bölgeler', 'Temizlik zorluğu yaşayanlar', 'Modern villalar'],
    },
];

// Advanced System Mechanics Configuration
export const advancedSystemMechanics = {
    pliseV2: {
        name: 'Plise V2 - Japon Teknolojisi',
        features: [
            {
                id: 'japanese-cord',
                name: 'Japanese Technology Cord System',
                description: 'Sıfır sürtünmeli Japon kordon teknolojisi ile ultra-yumuşak hareket',
            },
            {
                id: 'wind-lock',
                name: 'Wind-Lock Pins',
                description: 'Rüzgar kilitleme pimleri - Tülün dışarı üflenmesini önler',
            },
            {
                id: 'tension-adjust',
                name: 'Micro Tension Adjustment',
                description: 'Mikro gerginlik ayarı - Her koşulda ideal gerginlik',
            },
        ],
    },
    doubleSideSliding: {
        name: 'Çift Yönlü Sürme (Fransız Balkon)',
        features: [
            {
                id: 'center-magnetic',
                name: 'Center-Closing Magnetic System',
                description: 'Ortadan kapanan manyetik sistem - Geniş balkonlar için ideal',
            },
            {
                id: 'soft-close',
                name: 'Soft-Close Dampers',
                description: 'Yumuşak kapanma damperleri - Sessiz ve güvenli',
            },
        ],
    },
    inFrameIntegration: {
        name: 'In-Frame Integration (Kasa İçi)',
        description: 'Egepen profili içine entegre sineklik - Mimari bütünlük için görünmez çözüm',
        compatibleProfiles: ['Legend', 'Legend Art', 'Premium'],
    },
};

// Decision Matrix for "Sineklik Seçim Asistanı"
export const decisionMatrixCriteria = {
    petOwnership: {
        label: 'Evcil Hayvan',
        options: [
            { value: 'none', label: 'Yok', recommendedMesh: ['standard-fiberglass', 'poll-tex-allergy'] },
            { value: 'cat', label: 'Kedi', recommendedMesh: ['petscreen-vinyl', 'tuffscreen-heavy'] },
            { value: 'dog', label: 'Köpek', recommendedMesh: ['petscreen-vinyl', 'steel-mesh-security'] },
            { value: 'both', label: 'Her İkisi', recommendedMesh: ['steel-mesh-security', 'petscreen-vinyl'] },
        ],
    },
    floorLevel: {
        label: 'Kat Seviyesi (Rüzgar Faktörü)',
        options: [
            { value: 'ground', label: 'Zemin/Bahçe Katı', windFactor: 1, recommendedSystem: ['menteseli', 'surme'] },
            { value: 'low', label: '1-3. Kat', windFactor: 2, recommendedSystem: ['plise', 'surme'] },
            { value: 'mid', label: '4-8. Kat', windFactor: 3, recommendedSystem: ['plise', 'stor'] },
            { value: 'high', label: '9+ Kat', windFactor: 4, recommendedSystem: ['plise', 'stor'] },
        ],
    },
    usageFrequency: {
        label: 'Kullanım Sıklığı',
        options: [
            { value: 'low', label: 'Nadiren (Mevsimlik)', recommendedSystem: ['menteseli', 'surme'] },
            { value: 'medium', label: 'Orta (Haftada Birkaç)', recommendedSystem: ['plise', 'surme'] },
            { value: 'high', label: 'Yoğun (Her Gün)', recommendedSystem: ['plise', 'stor'] },
            { value: 'constant', label: 'Sürekli Açık', recommendedSystem: ['menteseli', 'surme'] },
        ],
    },
    allergyStatus: {
        label: 'Alerji Durumu',
        options: [
            { value: 'none', label: 'Alerji Yok', recommendedMesh: ['standard-fiberglass'] },
            { value: 'mild', label: 'Hafif Alerji', recommendedMesh: ['nano-clear-antidust'] },
            { value: 'severe', label: 'Ağır Alerji/Astım', recommendedMesh: ['poll-tex-allergy'] },
        ],
    },
};

// RAL color options for profiles
export const sineklikColorOptions = [
    { name: 'Beyaz', ral: 'RAL 9016', hex: '#F7F9FA', popular: true },
    { name: 'Antrasit Gri', ral: 'RAL 7016', hex: '#383E42', popular: true },
    { name: 'Kahverengi', ral: 'RAL 8014', hex: '#4A3728', popular: true },
    { name: 'Altın Meşe', ral: 'Wood Grain', hex: '#B8860B', popular: true },
    { name: 'Ceviz', ral: 'Wood Grain', hex: '#5D432C', popular: false },
    { name: 'Krem', ral: 'RAL 1015', hex: '#E6D2B5', popular: false },
    { name: 'Siyah', ral: 'RAL 9005', hex: '#0A0A0A', popular: false },
    { name: 'Gümüş Gri', ral: 'RAL 9006', hex: '#A5A5A5', popular: false },
];

// Main sineklik systems data
export const sineklikSystems: SineklikSystem[] = [
    // =====================================================
    // PLİSE (PLEATED) SYSTEMS - High Search Volume
    // =====================================================
    {
        id: 'plise-dikey',
        slug: 'plise-sineklik-dikey',
        name: 'Plise (Pileli) Sineklik - Dikey',
        category: 'plise',
        subCategory: 'dikey',
        tagline: 'Akordiyon Tasarım, Maksimum Alan Tasarrufu',
        description: 'Dikey plise sineklik sistemleri, akordiyon gibi katlanan yapısıyla kullanılmadığında neredeyse görünmez. Beylikdüzü ve İstanbul genelinde en çok tercih edilen modern sineklik çözümü.',
        longDescription: `Plise (Pileli) Sineklik Sistemi, özel akordiyon katlama teknolojisi ile tasarlanmış modern bir sineklik çözümüdür. Dikey hareket eden sistem, pencere veya kapı kenarında sadece 2-3cm yer kaplar.

İthal polyester tül kullanılan sistemimiz, görüşü engellemeden maksimum hava sirkülasyonu sağlar. Özel ip gerginlik sistemi sayesinde rüzgarda bile sabit kalır ve sallanma yapmaz.

Çift taraflı kullanım özelliği ile hem içeriden hem dışarıdan rahatça açılıp kapatılabilir. Özellikle geniş kapılar ve balkon çıkışları için ideal olan bu sistem, Egepen Akçayapı'nın en çok satan sineklik modelidir.`,
        image: "/images/projeler/sineklik-daire-montaj.png",
        gallery: [
            '/images/sineklik/yatay-plise-sineklik.png',
            '/images/sineklik/duble-plise-sineklik-2.jpg',
        ],
        technicalSpecs: [
            { label: 'Hareket Yönü', value: 'Dikey (Sağ-Sol)', icon: 'direction' },
            { label: 'Tül Malzemesi', value: 'İthal Polyester', icon: 'mesh' },
            { label: 'Profil Genişliği', value: '22mm / 32mm', icon: 'profile' },
            { label: 'Maksimum Genişlik', value: '3000mm', icon: 'width' },
            { label: 'Maksimum Yükseklik', value: '2800mm', icon: 'height' },
            { label: 'Kapalı Profil', value: '25mm', icon: 'closed' },
            { label: 'Renk Seçeneği', value: '8+ RAL Renk', icon: 'color' },
        ],
        features: [
            'Akordiyon (plise) katlama sistemi',
            'İthal polyester tül - görüşü engellemez',
            'İp gerginlik ayar sistemi',
            'Rüzgarda sallanma yapmaz',
            'Çift taraflı kullanım',
            'Manyetik veya mekanik kilit',
            'Kılavuz ray sistemi',
            'UV dayanımlı profil',
        ],
        benefits: [
            'Kullanılmadığında neredeyse görünmez',
            'Tek elle kolay kullanım',
            'Pencere görünümünü bozmaz',
            'Uzun ömürlü mekanizma',
        ],
        idealFor: [
            'Geniş balkon kapıları',
            'Sürgülü cam balkonlar',
            'Modern daireler',
            'Alan kısıtlı mekanlar',
        ],
        meshOptions: [
            { type: 'Standart', material: 'Fiberglass', description: 'Ekonomik seçenek' },
            { type: 'Premium', material: 'İthal Polyester', description: 'Net görüş, toz tutmaz' },
            { type: 'Pet Screen', material: 'TuffScreen', description: 'Evcil hayvan dayanıklı' },
        ],
        colorOptions: [
            { name: 'Beyaz', ral: 'RAL 9016', hex: '#F7F9FA' },
            { name: 'Antrasit Gri', ral: 'RAL 7016', hex: '#383E42' },
            { name: 'Altın Meşe', ral: 'Wood Grain', hex: '#B8860B' },
            { name: 'Kahverengi', ral: 'RAL 8014', hex: '#4A3728' },
        ],
        warranty: '3 Yıl',
        priceRange: 'orta',
        seoKeywords: [
            'plise sineklik',
            'pileli sineklik',
            'akordiyon sineklik',
            'dikey sineklik',
            'plise sineklik fiyatları',
            'Beylikdüzü plise sineklik',
            'katlanır sineklik',
        ],
        faq: [
            {
                question: 'Plise sineklik rüzgarda sallanır mı?',
                answer: 'Hayır. Sistemimizde özel ip gerginlik ayarı bulunur. Bu sayede tül her zaman gergin kalır ve rüzgarda bile sallanma yapmaz. Ayrıca alt ve üst kılavuz raylar tülü sabit tutar.',
            },
            {
                question: 'Plise sineklik temizliği nasıl yapılır?',
                answer: 'Plise sineklikler çok kolay temizlenir. Kuru veya nemli yumuşak bez ile silebilirsiniz. Tülü çıkarmaya gerek yoktur. Yılda 1-2 kez hafif sabunlu su ile yıkayabilirsiniz.',
            },
        ],
        schema: {
            brand: 'Akçayapı',
            model: 'Plise Sineklik Dikey',
            offers: {
                priceCurrency: 'TRY',
                priceRange: '₺₺',
                availability: 'https://schema.org/InStock',
            },
        },
    },
    {
        id: 'plise-yatay',
        slug: 'plise-sineklik-yatay',
        name: 'Plise (Pileli) Sineklik - Yatay',
        category: 'plise',
        subCategory: 'yatay',
        tagline: 'Yukarı-Aşağı Hareket, Pencereler İçin İdeal',
        description: 'Yatay plise sineklik, yukarıdan aşağıya doğru açılır ve pencereler için mükemmel uyum sağlar. Vasistas ve düşey pencereler için en pratik çözüm.',
        longDescription: `Yatay Plise Sineklik Sistemi, yukarıdan aşağıya doğru açılan akordiyon mekanizmasıyla pencereleriniz için ideal çözüm sunar. Özellikle vasistas pencereler, tavan pencereleri ve düşey açılımlı pencereler için tasarlanmıştır.

Sistem kapalıyken üst kasada toplanır ve pencere görünümünü hiç bozmaz. Yerçekimi etkisini dengeleyen özel yay mekanizması sayesinde tül istenilen yükseklikte sabit kalır.

Çift yönlü plise opsiyonu ile hem üstten hem alttan ayarlanabilir yapı sunulur. Bu özellik özellikle gündüz güneş kontrolü yapıp gece havalandırma isteyen kullanıcılar için idealdir.`,
        image: '/images/sineklik/duble-plise-sineklik-2.jpg',
        gallery: [
            '/images/sineklik/duble-plise-sineklik-2.jpg',
            '/images/sineklik/yatay-plise-sineklik.png',
        ],
        technicalSpecs: [
            { label: 'Hareket Yönü', value: 'Yatay (Yukarı-Aşağı)', icon: 'direction' },
            { label: 'Tül Malzemesi', value: 'İthal Polyester', icon: 'mesh' },
            { label: 'Profil Genişliği', value: '22mm', icon: 'profile' },
            { label: 'Maksimum Genişlik', value: '1800mm', icon: 'width' },
            { label: 'Maksimum Yükseklik', value: '2400mm', icon: 'height' },
            { label: 'Yay Sistemi', value: 'Dengeleme Yayı', icon: 'spring' },
        ],
        features: [
            'Yatay akordiyon katlama',
            'Dengeleme yay mekanizması',
            'İstenilen yükseklikte sabitleme',
            'Çift yönlü kullanım opsiyonu',
            'Vasistas pencere uyumlu',
            'Gizli üst kasa',
        ],
        benefits: [
            'Pencere görünümünü korur',
            'Hassas yükseklik ayarı',
            'Yerçekimine karşı dengeli',
            'Tavan pencereleri için uygun',
        ],
        idealFor: [
            'Vasistas pencereler',
            'Tavan pencereleri',
            'Çatı katı daireleri',
            'Düşey açılımlı pencereler',
        ],
        meshOptions: [
            { type: 'Standart', material: 'Fiberglass', description: 'Ekonomik seçenek' },
            { type: 'Premium', material: 'İthal Polyester', description: 'Net görüş' },
        ],
        colorOptions: [
            { name: 'Beyaz', ral: 'RAL 9016', hex: '#F7F9FA' },
            { name: 'Antrasit Gri', ral: 'RAL 7016', hex: '#383E42' },
        ],
        warranty: '3 Yıl',
        priceRange: 'orta',
        seoKeywords: [
            'yatay plise sineklik',
            'vasistas sineklik',
            'tavan pencere sineklik',
            'yukarı aşağı sineklik',
        ],
        faq: [
            {
                question: 'Yatay plise sineklik kendiliğinden düşer mi?',
                answer: 'Hayır. Özel dengeleme yay mekanizması sayesinde tül istenilen yükseklikte sabit kalır. Yay sistemi yerçekimini dengeler ve sineklik bıraktığınız yerde durur.',
            },
        ],
        schema: {
            brand: 'Akçayapı',
            model: 'Plise Sineklik Yatay',
            offers: {
                priceCurrency: 'TRY',
                priceRange: '₺₺',
                availability: 'https://schema.org/InStock',
            },
        },
    },

    // =====================================================
    // KEDİ SİNEKLİĞİ (PET SCREEN) - HIGH PRIORITY / HIGH MARGIN
    // =====================================================
    {
        id: 'kedi-sinekligi',
        slug: 'kedi-sinekligi-pet-screen',
        name: 'Kedi Sinekliği (Pet Screen)',
        category: 'kedi',
        subCategory: 'premium',
        tagline: 'Patilere Dayanıklı, Dostlarınıza Güvenli',
        description: 'Kedi sinekliği, evcil hayvan tırnaklarına karşı 7 kat daha dayanıklı özel TuffScreen tül ile üretilir. Yırtılmaz, deforme olmaz ve evcil dostlarınızı güvende tutar.',
        longDescription: `Kedi Sinekliği (Pet Screen), evcil hayvan sahipleri için özel olarak geliştirilmiş premium sineklik sistemidir. Standart sineklik tüllerinin aksine, vinil kaplı polyester ve çelik takviyeli özel TuffScreen tül kullanılır.

Bu özel tül, normal sinekliklere göre 7 kat daha dayanıklıdır. Kedi ve köpek tırnakları tarafından yırtılamaz, delinemez ve deforme olmaz. Pencereden atlama riski olan kediler için hayat kurtarıcı bir çözümdür.

Sistemde ayrıca özel emniyet kilidi bulunur. Bu kilit, evcil hayvanların sinekliği itip açmasını engeller. Kilit mekanizması tek elle açılabilir ancak hayvanlar tarafından açılamayacak şekilde tasarlanmıştır.

Hem menteşeli kapı tipi hem de sürme pencere tipi üretimi yapılmaktadır. Beylikdüzü ve İstanbul genelinde ücretsiz keşif hizmeti sunuyoruz.`,
        image: "/images/sineklik/kedi-sinekligi.jpg",
        gallery: [
            '/images/sineklik/kedi-sinekligi.jpg',
            '/images/sineklik/menteseli-sineklik.png',
        ],
        technicalSpecs: [
            { label: 'Tül Malzemesi', value: 'TuffScreen (Çelik Takviyeli)', icon: 'mesh' },
            { label: 'Dayanıklılık', value: '7x Standart Sineklik', icon: 'durability' },
            { label: 'Tırnak Dayanımı', value: 'Yırtılmaz / Delinmez', icon: 'claw' },
            { label: 'Kilit Tipi', value: 'Pet-Proof Emniyet Kilidi', icon: 'lock' },
            { label: 'Profil Yapısı', value: 'Güçlendirilmiş Alüminyum', icon: 'profile' },
            { label: 'Maksimum Boyut', value: '1500x2500mm', icon: 'size' },
            { label: 'Ağırlık Kapasitesi', value: '25kg Basınca Dayanır', icon: 'weight' },
        ],
        features: [
            'TuffScreen yırtılmaz tül',
            '7 kat artırılmış dayanıklılık',
            'Çelik tel takviyeli yapı',
            'Pet-proof emniyet kilidi',
            'Güçlendirilmiş alüminyum çerçeve',
            'Köşe takviye plakası',
            'UV ve nem dayanımlı',
            'Görüşü engellemez (siyah tül)',
        ],
        benefits: [
            'Kedilerin pencereden düşmesini önler',
            'Tırnak hasarına karşı tam koruma',
            'Hayvan güvenliği için emniyet kilidi',
            'Standart sineklik kadar estetik',
            'Hem kedi hem köpek için uygun',
        ],
        idealFor: [
            'Kedi sahipleri',
            'Köpek sahipleri',
            'Yüksek kat daireler',
            'Balkonlu evler',
            'Çocuklu aileler',
            'Güvenlik öncelikli mekanlar',
        ],
        meshOptions: [
            { type: 'TuffScreen Standard', material: 'Vinil Kaplı Polyester', description: '5x dayanıklı' },
            { type: 'TuffScreen Pro', material: 'Çelik Takviyeli', description: '7x dayanıklı' },
            { type: 'Steel Mesh', material: 'Paslanmaz Çelik', description: 'Maksimum güvenlik' },
        ],
        colorOptions: [
            { name: 'Siyah Tül + Beyaz Profil', ral: 'RAL 9016', hex: '#F7F9FA' },
            { name: 'Siyah Tül + Antrasit Profil', ral: 'RAL 7016', hex: '#383E42' },
            { name: 'Siyah Tül + Kahverengi Profil', ral: 'RAL 8014', hex: '#4A3728' },
        ],
        warranty: '5 Yıl (Tül dahil)',
        priceRange: 'premium',
        seoKeywords: [
            'kedi sinekliği',
            'kedi sinekliği fiyatları',
            'pet screen',
            'evcil hayvan sinekliği',
            'yırtılmaz sineklik',
            'kedi güvenlik sinekliği',
            'köpek sinekliği',
            'tuffscreen sineklik',
            'kedi pencere güvenliği',
            'Beylikdüzü kedi sinekliği',
            'İstanbul kedi sinekliği montaj',
        ],
        faq: [
            {
                question: 'Kedi sinekliği gerçekten yırtılmaz mı?',
                answer: 'Evet. TuffScreen tül, vinil kaplı polyester ve çelik takviye ile üretilir. Normal ev kedisi tırnakları bu tülü yırtamaz. Ancak çok büyük köpekler için paslanmaz çelik tül öneriyoruz.',
            },
            {
                question: 'Kedi sinekliği fiyatları ne kadar?',
                answer: 'Kedi sinekliği fiyatları standart sinekliklere göre %30-50 daha yüksektir. Ancak yırtılma sorunu yaşamadığınız için uzun vadede daha ekonomiktir. Kesin fiyat için ücretsiz keşif yaptırmanızı öneriyoruz.',
            },
            {
                question: 'Kilit mekanizması kediler tarafından açılabilir mi?',
                answer: 'Hayır. Pet-proof emniyet kilidi, pati veya burun ile açılamayacak şekilde tasarlanmıştır. İnsan eli ile tek hareketle açılır ancak hayvanlar mekanizmayı kavrayamaz.',
            },
        ],
        schema: {
            brand: 'Akçayapı',
            model: 'Kedi Sinekliği TuffScreen',
            offers: {
                priceCurrency: 'TRY',
                priceRange: '₺₺₺',
                availability: 'https://schema.org/InStock',
            },
        },
    },

    // =====================================================
    // SÜRME & MENTEŞELİ SYSTEMS
    // =====================================================
    {
        id: 'surme-sineklik',
        slug: 'surme-sineklik-sistemi',
        name: 'Sürme Sineklik Sistemi',
        category: 'surme',
        subCategory: 'standard',
        tagline: 'Klasik Güvenilirlik, Kolay Kullanım',
        description: 'Sürme sineklik sistemleri, yatay ray üzerinde kayarak açılır. Geniş pencereler ve balkon kapıları için ekonomik ve pratik çözüm. Beylikdüzü\'nde en çok tercih edilen model.',
        longDescription: `Sürme Sineklik Sistemi, klasik ve kanıtlanmış yapısıyla yıllardır en çok tercih edilen sineklik modelidir. Alt ve üst ray sistemi üzerinde yatay olarak kayar, pencere veya kapının bir tarafına park eder.

Dayanıklı alüminyum çerçeve ve yüksek görünürlük sağlayan fiberglass tül kombinasyonu, hem estetik hem de fonksiyonel bir çözüm sunar. Çift tekerlek sistemi yumuşak ve sessiz çalışma sağlar.

Özellikle yan yana iki veya daha fazla kanat kullanılarak geniş açıklıklarda uygulanabilir. PVC pencere ve cam balkon sistemlerimizle tam uyumlu profil renkleri mevcuttur.`,
        image: '/images/sineklik/surme-sineklik.jpg',
        gallery: [
            '/images/sineklik/surme-sineklik.jpg',
            '/images/sineklik/yatay-plise-sineklik.png',
        ],
        technicalSpecs: [
            { label: 'Hareket Tipi', value: 'Yatay Sürme', icon: 'slide' },
            { label: 'Ray Sistemi', value: 'Çift Ray Alüminyum', icon: 'rail' },
            { label: 'Tekerlek', value: 'Çift Rulmanlı PVC', icon: 'wheel' },
            { label: 'Profil Genişliği', value: '25mm', icon: 'profile' },
            { label: 'Maksimum Panel', value: '1200x2400mm', icon: 'size' },
        ],
        features: [
            'Çift ray sistemi',
            'Yumuşak sürme mekanizması',
            'Kolay sökülebilir panel',
            'Yüksek görünürlük tül',
            'Toz tutucu fırça fitil',
            'Ayarlanabilir tekerlek yüksekliği',
        ],
        benefits: [
            'Ekonomik fiyat',
            'Kolay temizlik',
            'Basit montaj/demontaj',
            'Uzun ömürlü yapı',
        ],
        idealFor: [
            'Geniş pencereler',
            'Balkon kapıları',
            'Bütçe odaklı projeler',
            'Kiralık daireler',
        ],
        meshOptions: [
            { type: 'Standart', material: 'Fiberglass', description: 'Ekonomik seçenek' },
            { type: 'Anti-Dust', material: 'Nano Kaplı', description: 'Toz tutmaz' },
        ],
        colorOptions: [
            { name: 'Beyaz', ral: 'RAL 9016', hex: '#F7F9FA' },
            { name: 'Kahverengi', ral: 'RAL 8014', hex: '#4A3728' },
            { name: 'Antrasit', ral: 'RAL 7016', hex: '#383E42' },
        ],
        warranty: '2 Yıl',
        priceRange: 'ekonomik',
        seoKeywords: [
            'sürme sineklik',
            'sürgülü sineklik',
            'pencere sineklik modelleri',
            'balkon sinekliği',
            'ekonomik sineklik',
        ],
        faq: [
            {
                question: 'Sürme sineklik raydan çıkar mı?',
                answer: 'Kaliteli montajda raydan çıkmaz. Sistemimizde anti-lift (kaldırmayı önleyen) mekanizma bulunur. Ayrıca tekerlekler ray içinde kilitlenir.',
            },
        ],
        schema: {
            brand: 'Akçayapı',
            model: 'Sürme Sineklik',
            offers: {
                priceCurrency: 'TRY',
                priceRange: '₺',
                availability: 'https://schema.org/InStock',
            },
        },
    },
    {
        id: 'menteseli-sineklik',
        slug: 'menteseli-kapi-sinekligi',
        name: 'Menteşeli Kapı Sinekliği',
        category: 'menteseli',
        subCategory: 'kapi',
        tagline: 'Kapılar İçin Profesyonel Çözüm',
        description: 'Menteşeli sineklik kapılar, giriş kapıları ve balkon kapıları için ideal. Otomatik kapanma mekanizması ve dayanıklı alüminyum çerçeve ile uzun ömürlü kullanım.',
        longDescription: `Menteşeli Sineklik Kapı, ana giriş kapıları, mutfak çıkışları ve balkon kapıları için tasarlanmış profesyonel bir çözümdür. Normal bir kapı gibi menteşe üzerinde açılır ve otomatik kapanma mekanizması ile kendiliğinden kapanır.

3 noktalı menteşe sistemi ile ağır kullanıma dayanıklıdır. Ayarlanabilir kapama hızı sayesinde sert kapanma önlenir. Manyetik veya mekanik kilit seçenekleri mevcuttur.

Özel köpek/kedi kapısı opsiyonu ile evcil hayvanlarınız bağımsız olarak giriş-çıkış yapabilir. Bu özellik menteşeli sinekliği kedi sahipleri için de ideal kılar.`,
        image: '/images/sineklik/menteseli-sineklik.png',
        gallery: [
            '/images/sineklik/menteseli-sineklik.png',
            '/images/sineklik/surme-sineklik.jpg',
        ],
        technicalSpecs: [
            { label: 'Açılım Tipi', value: 'Menteşeli (Tek/Çift Kanat)', icon: 'hinge' },
            { label: 'Menteşe Sayısı', value: '3 Adet Paslanmaz', icon: 'hinge' },
            { label: 'Kapanma', value: 'Otomatik Yaylı', icon: 'close' },
            { label: 'Profil Kalınlığı', value: '30mm', icon: 'profile' },
            { label: 'Köşe Birleşim', value: '45° Kaynak', icon: 'corner' },
        ],
        features: [
            '3 noktalı menteşe sistemi',
            'Otomatik kapanma mekanizması',
            'Ayarlanabilir kapama hızı',
            'Manyetik kilit opsiyonu',
            'Pet kapısı opsiyonu',
            'Eşik veya eşiksiz montaj',
            'Çift kanat seçeneği',
        ],
        benefits: [
            'Kapı gibi rahat kullanım',
            'Eller dolu olsa bile geçiş',
            'Evcil hayvan kapısı opsiyonu',
            'Sağlam yapı',
        ],
        idealFor: [
            'Ana giriş kapıları',
            'Mutfak çıkışları',
            'Balkon kapıları',
            'Bahçe kapıları',
            'Evcil hayvan sahipleri',
        ],
        meshOptions: [
            { type: 'Standart', material: 'Fiberglass', description: 'Ekonomik seçenek' },
            { type: 'Pet Screen', material: 'TuffScreen', description: 'Evcil hayvan dayanıklı' },
            { type: 'Güvenlik', material: 'Çelik Tül', description: 'Maksimum dayanıklılık' },
        ],
        colorOptions: [
            { name: 'Beyaz', ral: 'RAL 9016', hex: '#F7F9FA' },
            { name: 'Antrasit Gri', ral: 'RAL 7016', hex: '#383E42' },
            { name: 'Kahverengi', ral: 'RAL 8014', hex: '#4A3728' },
            { name: 'Altın Meşe', ral: 'Wood Grain', hex: '#B8860B' },
        ],
        warranty: '3 Yıl',
        priceRange: 'orta',
        seoKeywords: [
            'menteşeli sineklik',
            'kapı sinekliği',
            'kapı sinekliği Beylikdüzü',
            'sineklik kapı',
            'otomatik kapanan sineklik',
        ],
        faq: [
            {
                question: 'Menteşeli sineklik sert kapanır mı?',
                answer: 'Hayır. Ayarlanabilir yaylı kapama mekanizması sayesinde kapanma hızını kontrol edebilirsiniz. Yavaş ve sessiz kapanma için ayar yapılır.',
            },
        ],
        schema: {
            brand: 'Akçayapı',
            model: 'Menteşeli Kapı Sinekliği',
            offers: {
                priceCurrency: 'TRY',
                priceRange: '₺₺',
                availability: 'https://schema.org/InStock',
            },
        },
    },

    // =====================================================
    // STOR (ROLLER) SYSTEMS
    // =====================================================
    {
        id: 'stor-sineklik',
        slug: 'stor-sineklik-sistemi',
        name: 'Stor (Rulo) Sineklik Sistemi',
        category: 'stor',
        subCategory: 'standard',
        tagline: 'Gizli Kutu, Otomatik Sarım',
        description: 'Stor sineklik sistemleri, kullanılmadığında kasaya sarılarak tamamen gizlenir. Otomatik geri sarım mekanizması ile modern ve pratik kullanım. İstanbul\'da stor sineklik montajı.',
        longDescription: `Stor (Rulo) Sineklik Sistemi, tülün üst kasada ruloya sarılmasıyla çalışan modern bir sistemdir. Kullanılmadığında sineklik tamamen kasanın içinde gizlenir, pencere görünümü hiç bozulmaz.

Yaylı otomatik geri sarım mekanizması sayesinde bıraktığınızda yavaşça sarılır. Yavaş sarım (soft close) özelliği ani hareketleri ve sesi önler. Alt ray veya manyetik tutma sistemi ile tül çerçeveye sabitlenir.

Özellikle modern mimariler ve minimal tasarım sevenler için ideal olan stor sineklik, hem dikey (pencere) hem yatay (kapı) versiyonlarında üretilir.`,
        image: "/images/projeler/sineklik-daire-montaj.png",
        gallery: [
            '/images/sineklik/yatay-plise-sineklik.png',
            '/images/sineklik/duble-plise-sineklik-2.jpg',
        ],
        technicalSpecs: [
            { label: 'Sarım Tipi', value: 'Otomatik Yaylı', icon: 'roll' },
            { label: 'Kasa Boyutu', value: '42mm / 52mm', icon: 'box' },
            { label: 'Geri Sarım', value: 'Soft Close', icon: 'soft' },
            { label: 'Tutma Sistemi', value: 'Manyetik / Ray', icon: 'hold' },
            { label: 'Maksimum Genişlik', value: '1600mm', icon: 'width' },
            { label: 'Maksimum Yükseklik', value: '2400mm', icon: 'height' },
        ],
        features: [
            'Gizli kasa tasarımı',
            'Otomatik yaylı sarım',
            'Soft close (yavaş sarım)',
            'Manyetik tutma sistemi',
            'Dikey ve yatay versiyon',
            'UV dayanımlı tül',
            'Sessiz çalışma',
        ],
        benefits: [
            'Kullanılmadığında tamamen gizli',
            'Otomatik geri sarım',
            'Modern ve şık görünüm',
            'Pencere estetiğini korur',
        ],
        idealFor: [
            'Modern daireler',
            'Minimal tasarım sevenler',
            'Estetik öncelikli projeler',
            'Küçük pencereler',
        ],
        meshOptions: [
            { type: 'Standart', material: 'Fiberglass', description: 'Ekonomik' },
            { type: 'Premium', material: 'Polyester', description: 'Daha dayanıklı' },
        ],
        colorOptions: [
            { name: 'Beyaz', ral: 'RAL 9016', hex: '#F7F9FA' },
            { name: 'Antrasit Gri', ral: 'RAL 7016', hex: '#383E42' },
        ],
        warranty: '2 Yıl',
        priceRange: 'orta',
        seoKeywords: [
            'stor sineklik',
            'rulo sineklik',
            'otomatik sineklik',
            'gizli sineklik',
            'sarılır sineklik',
        ],
        faq: [
            {
                question: 'Stor sineklik yayı bozulur mu?',
                answer: 'Kaliteli stor sinekliklerde yay sistemi 10.000+ açma/kapama döngüsü için tasarlanmıştır. Normal kullanımda 10+ yıl sorunsuz çalışır. Yay gerginliği zamanla azalırsa ayarlanabilir.',
            },
        ],
        schema: {
            brand: 'Akçayapı',
            model: 'Stor Sineklik',
            offers: {
                priceCurrency: 'TRY',
                priceRange: '₺₺',
                availability: 'https://schema.org/InStock',
            },
        },
    },
];

// Comparison matrix data
export const sineklikComparisonMatrix = {
    systems: [
        {
            id: 'plise',
            name: 'Plise (Pileli)',
            durability: 4,
            easeOfUse: 5,
            cleaning: 4,
            aesthetics: 5,
            pricePoint: 3,
            spaceEfficiency: 5,
        },
        {
            id: 'stor',
            name: 'Stor (Rulo)',
            durability: 3,
            easeOfUse: 5,
            cleaning: 3,
            aesthetics: 5,
            pricePoint: 3,
            spaceEfficiency: 5,
        },
        {
            id: 'menteseli',
            name: 'Menteşeli',
            durability: 5,
            easeOfUse: 4,
            cleaning: 5,
            aesthetics: 3,
            pricePoint: 3,
            spaceEfficiency: 2,
        },
        {
            id: 'surme',
            name: 'Sürme',
            durability: 4,
            easeOfUse: 4,
            cleaning: 5,
            aesthetics: 3,
            pricePoint: 5,
            spaceEfficiency: 3,
        },
        {
            id: 'kedi',
            name: 'Kedi Sinekliği',
            durability: 5,
            easeOfUse: 4,
            cleaning: 4,
            aesthetics: 4,
            pricePoint: 2,
            spaceEfficiency: 3,
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

// SEO Keyword Clusters
export const sineklikSeoKeywords = {
    core: [
        'sineklik',
        'sineklik modelleri',
        'pencere sineklik',
        'kapı sinekliği',
        'balkon sinekliği',
        'sineklik fiyatları',
        'sineklik montajı',
    ],
    plise: [
        'plise sineklik',
        'pileli sineklik',
        'akordiyon sineklik',
        'katlanır sineklik',
        'plise sineklik fiyatları',
        'plise sineklik tamiri',
    ],
    pet: [
        'kedi sinekliği',
        'kedi sinekliği fiyatları',
        'pet screen',
        'evcil hayvan sinekliği',
        'yırtılmaz sineklik',
        'köpek sinekliği',
    ],
    local: [
        'Beylikdüzü sineklik',
        'İstanbul sineklik montajı',
        'İstanbul Avrupa Yakası sineklik',
        'Gürpınar sineklik',
        'kapı sinekliği Beylikdüzü',
    ],
    features: [
        'yırtılmaz tül',
        'görüşü engellemeyen sineklik',
        'toz tutmayan sineklik',
        'RAL renk sineklik',
        'antrasit sineklik',
    ],
    informational: [
        'sineklik temizliği nasıl yapılır',
        'sineklik tülü nasıl değiştirilir',
        'plise sineklik tamiri',
        'sineklik ölçü alma',
    ],
};

// Maintenance Guide Content
export const maintenanceGuide = {
    title: 'Sineklik Temizliği Nasıl Yapılır?',
    intro: 'Sinekliklerinizin uzun ömürlü olması ve temiz görünümü koruması için düzenli bakım önemlidir.',
    steps: [
        {
            title: 'Kuru Temizlik',
            description: 'Yumuşak bir fırça veya mikrofiber bez ile toz ve kiri alın. Elektrikli süpürgenin fırça ucu da kullanılabilir.',
            tip: 'Haftada bir kuru temizlik yeterlidir.',
        },
        {
            title: 'Islak Temizlik',
            description: 'Ilık su ve az miktarda bulaşık deterjanı karışımıyla tülü nazikçe silin. Sert fırça kullanmayın.',
            tip: 'Ayda bir islak temizlik yapın.',
        },
        {
            title: 'Profil Temizliği',
            description: 'Alüminyum profilleri nemli bezle silin. Ray ve mekanizma kısımlarını kuru tutun.',
            tip: 'Profillerde aşındırıcı madde kullanmayın.',
        },
        {
            title: 'Mekanizma Bakımı',
            description: 'Plise sistemlerde ip gerginliğini kontrol edin. Sürme sistemlerde tekerlekleri silikon sprey ile yağlayın.',
            tip: 'Yılda bir kez mekanizma bakımı yapın.',
        },
    ],
    warnings: [
        'Asla basınçlı su kullanmayın',
        'Çamaşır suyu veya asitli temizleyici kullanmayın',
        'Sıcak su (60°C üzeri) kullanmayın',
        'Tülü çekiştirmeyin veya zorlamayın',
    ],
};

// Helper functions
export function getSystemBySlug(slug: string): SineklikSystem | undefined {
    return sineklikSystems.find((system) => system.slug === slug);
}

export function getSystemsByCategory(category: SineklikSystem['category']): SineklikSystem[] {
    return sineklikSystems.filter((system) => system.category === category);
}

export function getRelatedSystems(currentId: string, limit: number = 3): SineklikSystem[] {
    const current = sineklikSystems.find((s) => s.id === currentId);
    if (!current) return sineklikSystems.slice(0, limit);

    return sineklikSystems
        .filter((s) => s.id !== currentId)
        .slice(0, limit);
}
