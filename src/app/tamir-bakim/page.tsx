import { Metadata } from "next";
import Link from "next/link";
import { HeaderOptimized } from "@/components/layout/HeaderOptimized";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/PageHero";
import OptimizedImage from "@/components/ui/OptimizedImage";
import {
  ExpandableSection,
  ExpandableGroup,
} from "@/components/ui/ExpandableSection";
import { businessConfig } from "@/config/business.config";

// ---------------------------------------------------------------------------
// SEO Metadata
// ---------------------------------------------------------------------------
export const metadata: Metadata = {
  title:
    "Tamir & Bakım Hizmetleri | Sineklik · PVC Pencere · Cam Balkon · Alüminyum · Panjur — Beylikdüzü",
  description:
    "Beylikdüzü sineklik tamiri, PVC pencere conta değişimi, cam balkon tekerlek onarımı, alüminyum doğrama bakımı, panjur-kepenk servisi, duşakabin onarımı. Aynı gün ücretsiz keşif, orijinal yedek parça. ☎ 0212 880 15 07",
  keywords: [
    "Beylikdüzü sineklik tamiri",
    "sineklik tel değişimi",
    "plise sineklik tamiri",
    "kedi sinekliği onarımı",
    "PVC pencere tamiri",
    "PVC pencere conta değişimi",
    "pencere kol tamiri Beylikdüzü",
    "pencere kilit değişimi",
    "Egepen servis",
    "Egepen Legend pencere tamiri",
    "cam balkon onarımı",
    "cam balkon tekerlek değişimi",
    "cam balkon fitil değişimi",
    "ısıcamlı cam balkon servisi",
    "Beylikdüzü cam balkon tamiri",
    "pvc pencere bakım hizmeti",
    "pencere menteşe tamiri",
    "cam balkon ray değişimi",
    "alüminyum doğrama tamiri",
    "alüminyum pencere bakımı",
    "panjur tamiri Beylikdüzü",
    "kepenk tamiri İstanbul",
    "stor panjur arızası",
    "duşakabin tamiri",
    "duşakabin cam değişimi",
    "duşakabin conta tamiri",
    "Esenyurt pencere tamiri",
    "Büyükçekmece cam balkon servisi",
    "Avcılar sineklik tamiri",
    "Küçükçekmece pencere onarımı",
  ],
  alternates: {
    canonical: `${businessConfig.siteUrl}/tamir-bakim`,
  },
  openGraph: {
    title:
      "Tamir & Bakım | Sineklik · PVC · Cam Balkon · Alüminyum · Panjur — Egepen Akçayapı",
    description:
      "Sineklik, PVC pencere, cam balkon, alüminyum doğrama, panjur-kepenk ve duşakabin tamir & bakım hizmeti. Orijinal yedek parça, aynı gün keşif.",
    type: "website",
    locale: "tr_TR",
    url: `${businessConfig.siteUrl}/tamir-bakim`,
  },
};

// ---------------------------------------------------------------------------
// Structured Data — Service + FAQPage + BreadcrumbList
// ---------------------------------------------------------------------------
function buildServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Tamir & Bakım Hizmetleri",
    description:
      "Sineklik tamiri, PVC pencere onarımı, cam balkon servisi, alüminyum doğrama bakımı, panjur-kepenk tamiri, duşakabin onarımı — Beylikdüzü ve çevresi.",
    serviceType: "Pencere, Cam Balkon ve Doğrama Tamir Bakım",
    provider: {
      "@type": "LocalBusiness",
      name: businessConfig.name,
      telephone: businessConfig.contact.landline,
      address: {
        "@type": "PostalAddress",
        streetAddress: businessConfig.address.street,
        addressLocality: businessConfig.address.district,
        addressRegion: businessConfig.address.city,
        postalCode: businessConfig.address.zip,
        addressCountry: "TR",
      },
    },
    areaServed: [
      { "@type": "City", name: "Beylikdüzü" },
      { "@type": "City", name: "Büyükçekmece" },
      { "@type": "City", name: "Esenyurt" },
      { "@type": "City", name: "Avcılar" },
      { "@type": "City", name: "Küçükçekmece" },
      { "@type": "City", name: "Başakşehir" },
      { "@type": "City", name: "Bakırköy" },
      { "@type": "City", name: "Bahçelievler" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Tamir & Bakım Kategorileri",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Sineklik Tamiri",
            description: "Plise, kedi sinekliği ve renkli sineklik onarımı & tel değişimi.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "PVC Pencere Onarımı",
            description: "Egepen Legend / Zendow conta, kol ve kilit tamiri.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Cam Balkon Servisi",
            description: "Isıcamlı cam balkon tekerlek, fitil ve ray değişimi.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Alüminyum Doğrama Tamiri",
            description: "Alüminyum pencere ve kapı mekanizma onarımı, fitil değişimi.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Panjur & Kepenk Servisi",
            description: "Stor panjur, alüminyum kepenk ve motorlu panjur tamiri.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Duşakabin Onarımı",
            description: "Duşakabin cam, profil, menteşe ve conta tamiri.",
          },
        },
      ],
    },
  };
}

const faqsData = [
  {
    q: "Sineklik teli nasıl değişir?",
    a: "Eski tel çıkartılır, kasaya uygun ölçüde yeni fiberglass veya paslanmaz çelik tel kesilir, fitil kanalına yerleştirilir ve gergin şekilde sabitlenir. İşlem ortalama 15-20 dakika sürer.",
  },
  {
    q: "PVC pencere contası ne zaman değiştirilmeli?",
    a: "Conta sertleştiğinde, çatladığında veya pencereden hava/su sızıntısı hissedildiğinde değiştirilmelidir. Ortalama 5-7 yılda bir yenilenmesi önerilir.",
  },
  {
    q: "Cam balkon tekerleği nasıl değiştirilir?",
    a: "Cam panel raydan çıkartılır, eski tekerlek sökülür ve orijinal ölçüde yeni tekerlek takılır. Panel tekrar raya yerleştirilip test edilir.",
  },
  {
    q: "Tamir için ne kadar süre beklenir?",
    a: "Stokta bulunan parçalar için aynı gün servis sağlanır. Özel sipariş gerektiren parçalarda 2-3 iş günü içinde müdahale edilir.",
  },
  {
    q: "Ücretsiz keşif nasıl çalışır?",
    a: "Bizi aradığınızda uygun randevu saati belirlenir. Uzman teknisyenimiz adresinize gelerek arızayı tespit eder ve yerinde fiyat teklifi sunar — keşif ücretsizdir.",
  },
  {
    q: "Alüminyum doğrama neden zorlanıyor?",
    a: "Genellikle ray kirlenmesi, tekerlek aşınması veya mekanizma paslanması nedeniyle olur. Profesyonel temizlik ve parça değişimiyle sorun çözülür.",
  },
  {
    q: "Panjur motoru arızalandığında ne yapılır?",
    a: "Önce kumanda ve elektrik bağlantısı kontrol edilir. Sorun motordaysa, motor kapasitesine uygun yeni motor takılır ve limit ayarları yapılır.",
  },
  {
    q: "Duşakabin camı kırıldığında değiştirilir mi?",
    a: "Evet, temperli cam kırıldığında güvenlik riski oluşur. Ölçü alınarak aynı kalınlıkta yeni temperli cam üretilir ve monte edilir.",
  },
  {
    q: "Kış aylarında bakım yaptırmak gerekli mi?",
    a: "Evet. Kış öncesi PVC pencere contaları, cam balkon fitilleri ve panjur mekanizmaları kontrol edilmelidir. Soğuk havada sertleşen contalar hava sızıntısına neden olur.",
  },
  {
    q: "Hangi marka ürünlerin tamirini yapıyorsunuz?",
    a: "Egepen (Deceuninck), Pimapen, Winsa, Rehau ve tüm PVC/alüminyum markalarının tamirini yapıyoruz. Orijinal veya eşdeğer yedek parça kullanıyoruz.",
  },
];

function buildFAQSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqsData.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

function buildBreadcrumbSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Ana Sayfa",
        item: businessConfig.siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tamir & Bakım",
        item: `${businessConfig.siteUrl}/tamir-bakim`,
      },
    ],
  };
}

// ---------------------------------------------------------------------------
// Data — repair categories (6 categories)
// ---------------------------------------------------------------------------
interface RepairStep {
  step: number;
  title: string;
  desc: string;
}

interface RepairCategory {
  id: string;
  title: string;
  subtitle: string;
  intro: string;
  problems: string[];
  steps: RepairStep[];
  parts: string[];
  image: string;
  imageAlt: string;
}

const repairCategories: RepairCategory[] = [
  {
    id: "sineklik",
    title: "Sineklik Tamiri",
    subtitle: "Plise, kedi sinekliği ve renkli sineklik onarımı",
    intro:
      "Yırtılmış sineklik teli, bozulmuş plise mekanizması veya hasar görmüş kedi sinekliği çerçevesi mi var? Orijinal malzeme ve profesyonel işçilikle sinekliklerinizi yeniliyoruz.",
    image: "/images/sineklik/sineklik-tamiri.jpg",
    imageAlt: "Plise sineklik tel değişimi — Beylikdüzü sineklik tamiri hizmeti",
    problems: [
      "Tel yırtılması veya delinmesi",
      "Plise sineklik katlama mekanizması arızası",
      "Kedi sinekliği çerçeve deformasyonu",
      "Ray ve kılavuz kanal hasarı",
      "Tül gevşemesi veya sarkması",
      "Mıknatıs ve klips kopması",
    ],
    steps: [
      { step: 1, title: "Arıza Tespiti", desc: "Sineklik kasası ve tel durumu incelenir, hasar tipi belirlenir." },
      { step: 2, title: "Söküm", desc: "Hasarlı tel veya mekanizma dikkatli şekilde sökülür." },
      { step: 3, title: "Yeni Parça Montajı", desc: "Orijinal ölçüde fiberglass veya paslanmaz çelik tel takılır." },
      { step: 4, title: "Test & Teslim", desc: "Açma-kapama mekanizması test edilir, müşteriye teslim edilir." },
    ],
    parts: [
      "Fiberglass sineklik teli",
      "Paslanmaz çelik kedi teli",
      "Plise sineklik ipi",
      "Ray ve kılavuz profili",
      "Mıknatıs seti",
    ],
  },
  {
    id: "pvc-pencere",
    title: "PVC Pencere Onarımı",
    subtitle: "Egepen Legend / Zendow conta, kol ve kilit tamiri",
    intro:
      "Pencerelerinizden rüzgâr mı giriyor, kol mu gevşedi ya da kilit mekanizması mı arızalandı? Egepen orijinal yedek parça ile pencerelerinizi ilk günkü performansına kavuşturuyoruz.",
    image: "/images/pvc/pvc-pencere-tamiri.jpg",
    imageAlt: "PVC pencere conta ve kilit değişimi — Egepen Legend servis",
    problems: [
      "Pencereden hava ve su sızıntısı",
      "Conta sertleşmesi veya çatlama",
      "Pencere kolu gevşemesi veya kırılması",
      "Kilit mekanizması arızası",
      "Menteşe yıpranması — pencere düşmesi",
      "Çift cam buharlanması (cam arası nem)",
    ],
    steps: [
      { step: 1, title: "Durum Analizi", desc: "Pencere profili, conta, aksesuar ve cam durumu kontrol edilir." },
      { step: 2, title: "Parça Temini", desc: "Egepen orijinal conta, kol veya kilit yedek parçası temin edilir." },
      { step: 3, title: "Değişim İşlemi", desc: "Eskiyen parça sökülür, profil temizlenir ve yeni parça monte edilir." },
      { step: 4, title: "Ayar & Test", desc: "Pencere ayarı yapılır, hava sızdırmazlık testi uygulanır." },
    ],
    parts: [
      "Egepen orijinal EPDM conta",
      "Pencere kolu (Hoppe / Roto)",
      "Espanyolet kilit mekanizması",
      "Menteşe / makas seti",
      "Cam macunu / silikon",
    ],
  },
  {
    id: "cam-balkon",
    title: "Cam Balkon Servisi",
    subtitle: "Isıcamlı cam balkon tekerlek, fitil ve ray değişimi",
    intro:
      "Cam balkon panelleriniz zorlanarak mı kayıyor, rüzgâr sesi mi geliyor? Tekerlek, fitil ve ray onarımı ile cam balkonunuzu yeniden sorunsuz kullanın.",
    image: "/images/cam-balkon/cam-balkon-bakim.jpg",
    imageAlt: "Cam balkon tekerlek ve fitil değişimi — ısıcamlı sistem bakımı",
    problems: [
      "Tekerlek aşınması — paneller sürülemiyor",
      "Fitil yıpranması — hava ve su geçişi",
      "Ray deformasyonu",
      "Kilit mekanizması arızası",
      "Cam panel çatlağı veya kırılması",
      "Alt ray su biriktirmesi / drenaj tıkanıklığı",
    ],
    steps: [
      { step: 1, title: "Keşif & İnceleme", desc: "Tüm cam paneller, tekerlekler ve raylar detaylı incelenir." },
      { step: 2, title: "Panel Çıkarma", desc: "Arızalı cam panel güvenli şekilde raydan çıkartılır." },
      { step: 3, title: "Parça Değişimi", desc: "Tekerlek, fitil veya kilit parçası orijinal ürünle değiştirilir." },
      { step: 4, title: "Montaj & Kalite Kontrol", desc: "Panel raya yerleştirilir, kayma testi ve sızdırmazlık kontrolü yapılır." },
    ],
    parts: [
      "Cam balkon tekerlek seti",
      "EPDM fitil (8 mm / 10 mm)",
      "Alüminyum ray profili",
      "Cam balkon kilidi",
      "Drenaj kapağı",
    ],
  },
  {
    id: "aluminyum",
    title: "Alüminyum Doğrama Tamiri",
    subtitle: "Alüminyum pencere, kapı ve doğrama sistemleri bakımı",
    intro:
      "Alüminyum doğramalarınız zorlanıyor, sızdırıyor veya kilitleri çalışmıyor mu? Profesyonel ekibimizle alüminyum pencere, kapı ve sürme sistemlerinizi onarıyoruz.",
    image: "/images/aluminyum/aluminyum-surme-sistem.jpg",
    imageAlt: "Alüminyum doğrama pencere ve kapı tamiri — sürme sistem bakımı",
    problems: [
      "Alüminyum sürme sistem zorlanması",
      "Doğrama fitil yıpranması — hava/su sızıntısı",
      "Kilit ve kol mekanizması arızası",
      "Ray ve tekerlek aşınması",
      "Profil birleşim noktalarında gevşeme",
      "Termal köprü bozulması — enerji kaybı",
    ],
    steps: [
      { step: 1, title: "Detaylı İnceleme", desc: "Doğrama profili, mekanizma ve fitiller kontrol edilir." },
      { step: 2, title: "Arıza Tespiti", desc: "Sorunun kaynağı belirlenir ve müşteriye bilgi verilir." },
      { step: 3, title: "Onarım / Değişim", desc: "Fitil, tekerlek, kilit veya mekanizma değiştirilir ya da onarılır." },
      { step: 4, title: "Ayar & Test", desc: "Doğrama ayarlanır, açma-kapama ve sızdırmazlık testi yapılır." },
    ],
    parts: [
      "Alüminyum doğrama fitili",
      "Sürme tekerlek seti",
      "Çok noktalı kilit mekanizması",
      "Kol ve aksesuar seti",
      "Profil birleşim elemanı",
    ],
  },
  {
    id: "panjur-kepenk",
    title: "Panjur & Kepenk Servisi",
    subtitle: "Stor panjur, alüminyum kepenk ve motorlu sistem tamiri",
    intro:
      "Panjurunuz açılmıyor mu, motorlu sistem kumandaya tepki vermiyor mu? Manuel ve motorlu panjur/kepenk sistemlerinin onarım, bakım ve motor değişimi hizmetini sunuyoruz.",
    image: "/images/panjur/panjur-kepenk-tamiri.jpg",
    imageAlt: "Panjur ve kepenk motor değişimi — stor panjur tamiri",
    problems: [
      "Motor arızası — panjur açılmıyor/kapanmıyor",
      "Kumanda veya şalter tepki vermemesi",
      "Lamel kırılması veya eğilmesi",
      "Kayış / şerit kopması",
      "Kutu içi mekanizma sıkışması",
      "Alt ve üst limit ayarı bozulması",
    ],
    steps: [
      { step: 1, title: "Arıza Tespiti", desc: "Motor, kumanda, lamel ve mekanizma kontrol edilir." },
      { step: 2, title: "Söküm", desc: "Arızalı motor, lamel veya mekanizma güvenli şekilde sökülür." },
      { step: 3, title: "Değişim & Onarım", desc: "Yeni motor takılır veya hasarlı parçalar değiştirilir." },
      { step: 4, title: "Limit Ayarı & Test", desc: "Alt/üst limit ayarları yapılır, tam açılıp kapanma test edilir." },
    ],
    parts: [
      "Boru motor (Somfy / Nice)",
      "Kumanda alıcısı ve verici",
      "Alüminyum lamel",
      "Panjur kayışı / şeridi",
      "Mil ve yatak seti",
    ],
  },
  {
    id: "dusakabin",
    title: "Duşakabin Onarımı",
    subtitle: "Duşakabin cam, profil, menteşe ve conta bakımı",
    intro:
      "Duşakabin camınız çatlak mı, kapı menteşesi mi gevşedi ya da su mu sızıyor? Temperli cam değişiminden conta ve profil onarımına kadar komple duşakabin servisi veriyoruz.",
    image: "/images/dusakabin/dusakabin-onarim.jpg",
    imageAlt: "Duşakabin cam ve profil tamiri — menteşe değişimi",
    problems: [
      "Duşakabin camı kırılması / çatlağı",
      "Menteşe gevşemesi — kapı sarkması",
      "Conta / fitil yıpranması — su sızıntısı",
      "Profil paslanması veya oksidasyonu",
      "Silikon çürümesi — küf oluşumu",
      "Tekerlek arızası (sürgülü model)",
    ],
    steps: [
      { step: 1, title: "Durum Tespiti", desc: "Duşakabin camı, profilleri, contaları ve mekanizmaları incelenir." },
      { step: 2, title: "Ölçü & Sipariş", desc: "Kırık cam veya hasarlı parça için uygun ölçüde sipariş verilir." },
      { step: 3, title: "Değişim İşlemi", desc: "Cam, menteşe, conta veya profil değişimi yapılır." },
      { step: 4, title: "Silikon & Test", desc: "Birleşim noktaları silikonlanır, su sızdırmazlık testi yapılır." },
    ],
    parts: [
      "8 mm / 10 mm temperli cam",
      "Paslanmaz çelik menteşe",
      "Duşakabin fitili (manyetik / dudak)",
      "Krom profil seti",
      "Silikon mastik",
    ],
  },
];

/* ── Highlights — why choose us ────────────────────────────── */
const highlights = [
  { icon: "⚡", label: "Aynı Gün Keşif", desc: "Aradığınız gün adresinize geliyoruz." },
  { icon: "🔧", label: "Orijinal Parça", desc: "Egepen ve üretici orijinal yedek parça." },
  { icon: "📋", label: "Ücretsiz Teklif", desc: "Keşif ve fiyat teklifi tamamen ücretsiz." },
  { icon: "🏠", label: "Yerinde Servis", desc: "Evinize veya iş yerinize gelerek onarım yapıyoruz." },
];

/* ── Pricing info items ────────────────────────────────────── */
const pricingInfo = [
  { category: "Sineklik Tamiri", range: "Tel değişimi, mekanizma onarımı", note: "Sineklik tipine göre değişir" },
  { category: "PVC Pencere Onarımı", range: "Conta, kol, kilit, menteşe değişimi", note: "Parça adedine göre değişir" },
  { category: "Cam Balkon Servisi", range: "Tekerlek, fitil, ray değişimi", note: "Panel sayısına göre değişir" },
  { category: "Alüminyum Doğrama", range: "Fitil, tekerlek, kilit değişimi", note: "Doğrama boyutuna göre değişir" },
  { category: "Panjur & Kepenk", range: "Motor, lamel, kayış değişimi", note: "Motor markasına göre değişir" },
  { category: "Duşakabin Onarımı", range: "Cam, menteşe, conta değişimi", note: "Cam boyutuna göre değişir" },
];

/* ── Service areas for SEO ──────────────────────────────────── */
const serviceAreas = [
  "Beylikdüzü", "Büyükçekmece", "Esenyurt", "Avcılar",
  "Küçükçekmece", "Başakşehir", "Silivri", "Çatalca",
  "Bakırköy", "Bahçelievler", "Bağcılar", "Güngören",
];

/* ── Common symptoms for quick-help ────────────────────────── */
const commonSymptoms = [
  { symptom: "Pencereden hava giriyor", solution: "Conta değişimi gerekebilir", category: "pvc-pencere" },
  { symptom: "Cam balkon paneli kaymıyor", solution: "Tekerlek değişimi gerekebilir", category: "cam-balkon" },
  { symptom: "Sineklik teli yırtık", solution: "Tel değişimi yapılır", category: "sineklik" },
  { symptom: "Panjur açılmıyor", solution: "Motor veya kayış arızası olabilir", category: "panjur-kepenk" },
  { symptom: "Duşakabin su sızdırıyor", solution: "Conta / silikon yenilemesi gerekir", category: "dusakabin" },
  { symptom: "Alüminyum kapı zorlanıyor", solution: "Ray temizliği ve tekerlek değişimi", category: "aluminyum" },
];

/* ── Maintenance tips ──────────────────────────────────────── */
const maintenanceTips = [
  { title: "PVC Pencere Bakımı", tip: "Yılda 2 kez contaları silikon sprey ile yağlayın. Drenaj kanallarını temizleyin. Kolu tam kapalı pozisyona getirip kapatın." },
  { title: "Cam Balkon Bakımı", tip: "Tekerlekleri 6 ayda bir yağlayın. Rayları yumuşak bezle silin. Fitilleri kuru tutun, deterjan kullanmayın." },
  { title: "Sineklik Bakımı", tip: "Teli yumuşak fırça ile temizleyin. Plise mekanizmasını zorlamayın. Kış aylarında kapalı tutun." },
  { title: "Panjur Bakımı", tip: "Lamelleri nemli bezle silin. Motor sesinde anormallik varsa hemen müdahale edin. Kayışı 3-5 yılda bir kontrol ettirin." },
];

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------
export default function RepairMaintenancePage() {
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            buildServiceSchema(),
            buildFAQSchema(),
            buildBreadcrumbSchema(),
          ]),
        }}
      />

      <HeaderOptimized />

      <main id="main-content" className="min-h-screen bg-neutral-50">
        {/* ── Hero ────────────────────────────────────────────── */}
        <PageHero
          title="Tamir & Bakım Hizmetleri"
          subtitle="Sineklik, PVC pencere, cam balkon, alüminyum doğrama, panjur ve duşakabin tamiri. Beylikdüzü ve çevresinde aynı gün ücretsiz keşif."
          breadcrumbs={[{ label: "Tamir & Bakım" }]}
        />

        {/* ── Emergency Banner ────────────────────────────────── */}
        <section className="bg-primary-600 text-white py-4" aria-label="Acil servis hattı">
          <div className="container-custom">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-center">
              <p className="text-sm sm:text-base font-medium">
                Acil tamir mi gerekiyor? Hemen arayın, aynı gün müdahale edelim.
              </p>
              <a
                href={`tel:${businessConfig.contact.landlineRaw}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-primary-700 font-bold rounded-full hover:bg-primary-50 transition-colors text-sm"
                aria-label={`Hemen arayın: ${businessConfig.contact.landline}`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {businessConfig.contact.landline}
              </a>
            </div>
          </div>
        </section>

        {/* ── Quick Nav (anchor links) ────────────────────────── */}
        <nav
          className="py-6 bg-white border-b border-neutral-100 sticky top-16 lg:top-20 z-30"
          aria-label="Tamir kategorileri hızlı erişim"
        >
          <div className="container-custom">
            <ul className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {repairCategories.map((cat) => (
                <li key={cat.id}>
                  <a
                    href={`#${cat.id}`}
                    className="inline-block px-4 py-2 text-sm font-medium text-neutral-600 bg-neutral-50 rounded-full hover:bg-primary-50 hover:text-primary-600 transition-colors"
                  >
                    {cat.title}
                  </a>
                </li>
              ))}
              <li>
                <a href="#sss" className="inline-block px-4 py-2 text-sm font-medium text-neutral-600 bg-neutral-50 rounded-full hover:bg-primary-50 hover:text-primary-600 transition-colors">
                  SSS
                </a>
              </li>
            </ul>
          </div>
        </nav>

        {/* ── Highlights Strip ─────────────────────────────────── */}
        <section className="py-10 md:py-14 bg-white" aria-label="Neden bizi tercih etmelisiniz">
          <div className="container-custom">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {highlights.map((h) => (
                <div key={h.label} className="text-center p-4 rounded-xl bg-neutral-50 border border-neutral-100">
                  <span className="text-2xl mb-2 block" aria-hidden="true">{h.icon}</span>
                  <h3 className="text-base font-bold text-neutral-900 mb-1">{h.label}</h3>
                  <p className="text-sm text-neutral-500">{h.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Quick Symptom Finder ──────────────────────────── */}
        <section className="py-10 md:py-14 bg-neutral-50" aria-labelledby="symptom-heading">
          <div className="container-custom max-w-4xl">
            <h2 id="symptom-heading" className="text-xl md:text-2xl font-bold text-neutral-900 text-center mb-2">
              Sorununuz Ne?
            </h2>
            <p className="text-neutral-500 text-center mb-8 text-sm">
              Aşağıdaki arıza belirtilerinden size uygun olanı bulun — ilgili servise yönlendirelim.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {commonSymptoms.map((item) => (
                <a
                  key={item.symptom}
                  href={`#${item.category}`}
                  className="group p-4 bg-white rounded-xl border border-neutral-200 hover:border-primary-300 hover:shadow-sm transition-all"
                >
                  <p className="font-semibold text-neutral-800 text-sm group-hover:text-primary-600 transition-colors mb-1">
                    {item.symptom}
                  </p>
                  <p className="text-xs text-neutral-500">→ {item.solution}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── Service Categories — Zig-Zag Layout ─────────────── */}
        {repairCategories.map((cat, catIndex) => {
          const isEven = catIndex % 2 === 0;
          return (
            <section
              key={cat.id}
              id={cat.id}
              className={`py-14 md:py-20 scroll-mt-32 ${isEven ? "bg-white" : "bg-neutral-50"}`}
              aria-labelledby={`heading-${cat.id}`}
            >
              <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
                  {/* Text column */}
                  <div className={isEven ? "lg:order-1" : "lg:order-2"}>
                    <h2
                      id={`heading-${cat.id}`}
                      className="text-2xl md:text-3xl font-bold text-neutral-900 mb-2"
                    >
                      {cat.title}
                    </h2>
                    <p className="text-sm font-medium text-primary-600 mb-4">{cat.subtitle}</p>
                    <p className="text-neutral-600 leading-relaxed mb-6">{cat.intro}</p>

                    <ExpandableGroup>
                      <ExpandableSection title="Sık Karşılaşılan Arızalar" variant="minimal" defaultOpen>
                        <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2" role="list">
                          {cat.problems.map((problem, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-neutral-600">
                              <svg className="w-3.5 h-3.5 text-red-400 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 8 8" aria-hidden="true">
                                <circle cx="4" cy="4" r="4" />
                              </svg>
                              {problem}
                            </li>
                          ))}
                        </ul>
                      </ExpandableSection>

                      <ExpandableSection title="Tamir Süreci (Adım Adım)" variant="minimal">
                        <ol className="space-y-3" role="list">
                          {cat.steps.map((s) => (
                            <li key={s.step} className="flex gap-3">
                              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary-50 text-primary-600 font-bold text-xs shrink-0">
                                {s.step}
                              </span>
                              <div>
                                <p className="font-semibold text-neutral-800 text-sm">{s.title}</p>
                                <p className="text-sm text-neutral-500 mt-0.5">{s.desc}</p>
                              </div>
                            </li>
                          ))}
                        </ol>
                      </ExpandableSection>

                      <ExpandableSection title="Kullanılan Yedek Parçalar" variant="minimal">
                        <ul className="flex flex-wrap gap-2" role="list">
                          {cat.parts.map((part) => (
                            <li key={part} className="px-3 py-1.5 bg-neutral-100 text-neutral-700 text-xs font-medium rounded-full">
                              {part}
                            </li>
                          ))}
                        </ul>
                      </ExpandableSection>
                    </ExpandableGroup>

                    {/* Per-category CTA */}
                    <div className="mt-6">
                      <a
                        href={`tel:${businessConfig.contact.landlineRaw}`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors text-sm"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        {cat.title} İçin Ara
                      </a>
                    </div>
                  </div>

                  {/* Image column */}
                  <div className={`relative rounded-2xl overflow-hidden shadow-lg aspect-[4/3] ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                    <OptimizedImage
                      src={cat.image}
                      alt={cat.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      {...(catIndex === 0 ? { priority: true } : {})}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/15 to-transparent" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        {/* ── Maintenance Tips ──────────────────────────────── */}
        <section className="py-14 md:py-20 bg-white" aria-labelledby="tips-heading">
          <div className="container-custom max-w-4xl">
            <h2 id="tips-heading" className="text-2xl md:text-3xl font-bold text-neutral-900 text-center mb-3">
              Bakım İpuçları
            </h2>
            <p className="text-neutral-500 text-center mb-8 max-w-lg mx-auto text-sm">
              Ürünlerinizin ömrünü uzatmak için uygulayabileceğiniz basit bakım önerileri.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              {maintenanceTips.map((item) => (
                <div key={item.title} className="p-5 bg-neutral-50 rounded-xl border border-neutral-100">
                  <h3 className="font-bold text-neutral-900 text-sm mb-2">{item.title}</h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">{item.tip}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pricing Transparency ────────────────────────────── */}
        <section className="py-14 md:py-20 bg-neutral-50" aria-labelledby="pricing-heading">
          <div className="container-custom max-w-4xl">
            <h2 id="pricing-heading" className="text-2xl md:text-3xl font-bold text-neutral-900 text-center mb-3">
              Fiyat Bilgisi
            </h2>
            <p className="text-neutral-500 text-center mb-8 max-w-lg mx-auto text-sm">
              Net fiyat için ücretsiz keşif gereklidir. Aşağıda hizmet kategorilerine göre genel bilgi bulabilirsiniz.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {pricingInfo.map((item) => (
                <div key={item.category} className="p-5 bg-white rounded-xl border border-neutral-100">
                  <h3 className="font-bold text-neutral-900 text-sm mb-2">{item.category}</h3>
                  <p className="text-sm text-neutral-600 mb-1">{item.range}</p>
                  <p className="text-xs text-neutral-400 italic">{item.note}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-neutral-500 mt-6">
              Kesin fiyat, arızanın türüne ve kullanılacak parçaya göre belirlenir.{" "}
              <a href={`tel:${businessConfig.contact.landlineRaw}`} className="text-primary-600 font-semibold hover:underline">
                Ücretsiz keşif için arayın →
              </a>
            </p>
          </div>
        </section>

        {/* ── FAQ Section ────────────────────────────────────── */}
        <section id="sss" className="py-14 md:py-20 bg-white scroll-mt-32" aria-labelledby="faq-heading">
          <div className="container-custom max-w-3xl">
            <h2 id="faq-heading" className="text-2xl md:text-3xl font-bold text-neutral-900 text-center mb-3">
              Sıkça Sorulan Sorular
            </h2>
            <p className="text-neutral-500 text-center mb-8 max-w-lg mx-auto">
              Tamir & bakım hizmetlerimiz hakkında en çok merak edilen sorular ve cevapları.
            </p>
            <ExpandableGroup>
              {faqsData.map((faq, i) => (
                <ExpandableSection key={i} title={faq.q} variant="card">
                  <p className="text-sm text-neutral-600 leading-relaxed">{faq.a}</p>
                </ExpandableSection>
              ))}
            </ExpandableGroup>
          </div>
        </section>

        {/* ── CTA — Direct Call ────────────────────────────────── */}
        <section className="py-14 md:py-20 bg-primary-600 text-white text-center" aria-label="Hemen arayın">
          <div className="container-custom max-w-xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Hemen Arayın</h2>
            <p className="text-primary-100 leading-relaxed mb-6">
              Tamir & bakım hizmetlerimiz hakkında detaylı bilgi almak veya ücretsiz keşif randevusu oluşturmak için bizi arayın.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`tel:${businessConfig.contact.landlineRaw}`}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-primary-700 font-bold rounded-xl hover:bg-primary-50 transition-colors text-lg"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {businessConfig.contact.landline}
              </a>
              <a
                href={`https://wa.me/${businessConfig.contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary-700 text-white font-bold rounded-xl hover:bg-primary-800 transition-colors border border-primary-500"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.347 0-4.518-.802-6.238-2.147l-.436-.348-2.647.887.887-2.647-.348-.436A9.935 9.935 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* ── Service Areas — SEO keyword section ─────────────── */}
        <section className="py-10 md:py-14 bg-white" aria-labelledby="area-heading">
          <div className="container-custom max-w-3xl text-center">
            <h2 id="area-heading" className="text-lg font-bold text-neutral-900 mb-2">
              Hizmet Bölgelerimiz
            </h2>
            <p className="text-sm text-neutral-500 mb-6">
              Sineklik tamiri, PVC pencere onarımı, cam balkon servisi, alüminyum doğrama bakımı, panjur-kepenk tamiri ve duşakabin onarımı için ücretsiz keşif sunduğumuz bölgeler:
            </p>
            <ul className="flex flex-wrap justify-center gap-2" role="list">
              {serviceAreas.map((area) => (
                <li key={area} className="inline-block text-sm bg-primary-50 text-primary-700 font-medium px-4 py-2 rounded-full border border-primary-100">
                  {area}
                </li>
              ))}
            </ul>
            <p className="text-xs text-neutral-400 mt-4">
              Bölgeniz listede yok mu?{" "}
              <Link href="/iletisim" className="text-primary-600 hover:underline">Bize ulaşın</Link>, hizmet alanımızı kontrol edelim.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
