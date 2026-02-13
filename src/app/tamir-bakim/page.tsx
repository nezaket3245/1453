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
    "Tamir & Bakım Hizmetleri | Sineklik · PVC Pencere · Cam Balkon Onarımı — Beylikdüzü",
  description:
    "Beylikdüzü sineklik tamiri, PVC pencere conta değişimi, cam balkon tekerlek onarımı. Aynı gün ücretsiz keşif, orijinal yedek parça, 5 yıl garanti. Egepen yetkili servis ☎ 0212 880 15 07",
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
    "Esenyurt pencere tamiri",
    "Büyükçekmece cam balkon servisi",
  ],
  alternates: {
    canonical: `${businessConfig.siteUrl}/tamir-bakim`,
  },
  openGraph: {
    title: "Tamir & Bakım | Sineklik · PVC Pencere · Cam Balkon — Egepen Akçayapı",
    description:
      "Sineklik, PVC pencere ve cam balkon tamiri. Orijinal yedek parça, aynı gün ücretsiz keşif, 5 yıl garanti.",
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
      "Sineklik tamiri, PVC pencere onarımı, cam balkon servisi — Beylikdüzü ve çevresi.",
    serviceType: "Pencere ve Cam Balkon Tamir Bakım",
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
            description:
              "Plise, kedi sinekliği ve renkli sineklik onarımı & tel değişimi.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "PVC Pencere Onarımı",
            description:
              "Egepen Legend / Zendow conta, kol ve kilit tamiri.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Cam Balkon Servisi",
            description:
              "Isıcamlı cam balkon tekerlek, fitil ve ray değişimi.",
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
    q: "Garanti kapsamı nedir?",
    a: "Tüm tamir ve bakım hizmetlerimiz 5 yıl işçilik garantisi kapsamındadır. Kullanılan yedek parçalar orijinal üretici garantilidir.",
  },
  {
    q: "Ücretsiz keşif nasıl çalışır?",
    a: "Bizi aradığınızda uygun randevu saati belirlenir. Uzman teknisyenimiz adresinize gelerek arızayı tespit eder ve yerinde fiyat teklifi sunar — keşif ücretsizdir.",
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
// Data — repair categories
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
];

/* ── Highlights — why choose us ────────────────────────────── */
const highlights = [
  { label: "Aynı Gün Keşif", desc: "Aradığınız gün adresinize geliyoruz." },
  { label: "Orijinal Parça", desc: "Egepen ve üretici orijinal yedek parça." },
  { label: "5 Yıl Garanti", desc: "İşçilik ve parça garantisi." },
  { label: "Ücretsiz Teklif", desc: "Keşif ve fiyat teklifi tamamen ücretsiz." },
];

/* ── Service areas for SEO ─────────────────────────────────── */
const serviceAreas = [
  "Beylikdüzü",
  "Büyükçekmece",
  "Esenyurt",
  "Avcılar",
  "Küçükçekmece",
  "Başakşehir",
  "Silivri",
  "Çatalca",
  "Bakırköy",
  "Bahçelievler",
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
          subtitle="Sineklik tamiri, PVC pencere onarımı ve cam balkon servisi. Beylikdüzü ve çevresinde aynı gün ücretsiz keşif."
          breadcrumbs={[{ label: "Tamir & Bakım" }]}
        />

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
                <a
                  href="#sss"
                  className="inline-block px-4 py-2 text-sm font-medium text-neutral-600 bg-neutral-50 rounded-full hover:bg-primary-50 hover:text-primary-600 transition-colors"
                >
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
                <div key={h.label} className="text-center">
                  <h3 className="text-base font-bold text-neutral-900 mb-1">{h.label}</h3>
                  <p className="text-sm text-neutral-500">{h.desc}</p>
                </div>
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
              className={`py-14 md:py-20 scroll-mt-32 ${isEven ? "bg-neutral-50" : "bg-white"}`}
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
                    <p className="text-sm font-medium text-primary-600 mb-4">
                      {cat.subtitle}
                    </p>
                    <p className="text-neutral-600 leading-relaxed mb-6">
                      {cat.intro}
                    </p>

                    <ExpandableGroup>
                      <ExpandableSection
                        title="Sık Karşılaşılan Arızalar"
                        variant="minimal"
                        defaultOpen
                      >
                        <ul
                          className="grid sm:grid-cols-2 gap-x-6 gap-y-2"
                          role="list"
                        >
                          {cat.problems.map((problem, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm text-neutral-600"
                            >
                              <svg
                                className="w-3.5 h-3.5 text-red-400 mt-0.5 shrink-0"
                                fill="currentColor"
                                viewBox="0 0 8 8"
                                aria-hidden="true"
                              >
                                <circle cx="4" cy="4" r="4" />
                              </svg>
                              {problem}
                            </li>
                          ))}
                        </ul>
                      </ExpandableSection>

                      <ExpandableSection
                        title="Tamir Süreci (Adım Adım)"
                        variant="minimal"
                      >
                        <ol className="space-y-3" role="list">
                          {cat.steps.map((s) => (
                            <li key={s.step} className="flex gap-3">
                              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary-50 text-primary-600 font-bold text-xs shrink-0">
                                {s.step}
                              </span>
                              <div>
                                <p className="font-semibold text-neutral-800 text-sm">
                                  {s.title}
                                </p>
                                <p className="text-sm text-neutral-500 mt-0.5">
                                  {s.desc}
                                </p>
                              </div>
                            </li>
                          ))}
                        </ol>
                      </ExpandableSection>

                      <ExpandableSection
                        title="Kullanılan Yedek Parçalar"
                        variant="minimal"
                      >
                        <ul className="flex flex-wrap gap-2" role="list">
                          {cat.parts.map((part) => (
                            <li
                              key={part}
                              className="px-3 py-1.5 bg-neutral-100 text-neutral-700 text-xs font-medium rounded-full"
                            >
                              {part}
                            </li>
                          ))}
                        </ul>
                      </ExpandableSection>
                    </ExpandableGroup>
                  </div>

                  {/* Image column */}
                  <div
                    className={`relative rounded-2xl overflow-hidden shadow-lg aspect-[4/3] ${
                      isEven ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <OptimizedImage
                      src={cat.image}
                      alt={cat.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      {...(catIndex === 0 ? { priority: true } : {})}
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-neutral-900/15 to-transparent"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        {/* ── FAQ Section ────────────────────────────────────── */}
        <section
          id="sss"
          className="py-14 md:py-20 bg-white scroll-mt-32"
          aria-labelledby="faq-heading"
        >
          <div className="container-custom max-w-3xl">
            <h2
              id="faq-heading"
              className="text-2xl md:text-3xl font-bold text-neutral-900 text-center mb-3"
            >
              Sıkça Sorulan Sorular
            </h2>
            <p className="text-neutral-500 text-center mb-8 max-w-lg mx-auto">
              Tamir & bakım hizmetlerimiz hakkında en çok merak edilen sorular
              ve cevapları.
            </p>
            <ExpandableGroup>
              {faqsData.map((faq, i) => (
                <ExpandableSection key={i} title={faq.q} variant="card">
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {faq.a}
                  </p>
                </ExpandableSection>
              ))}
            </ExpandableGroup>
          </div>
        </section>

        {/* ── CTA — points to İletişim ────────────────────────── */}
        <section className="py-12 md:py-16 bg-neutral-50 text-center" aria-label="İletişim yönlendirmesi">
          <div className="container-custom max-w-xl">
            <p className="text-neutral-600 leading-relaxed mb-4">
              Tamir & bakım hizmetlerimiz hakkında detaylı bilgi almak veya
              ücretsiz keşif randevusu oluşturmak için iletişim sayfamızı
              ziyaret edin.
            </p>
            <Link
              href="/iletisim"
              className="inline-flex items-center gap-2 text-primary-600 font-bold hover:text-primary-700 transition-colors"
            >
              İletişim Sayfasına Git
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </section>

        {/* ── Service Areas — SEO keyword section ─────────────── */}
        <section className="py-10 md:py-14 bg-white" aria-labelledby="area-heading">
          <div className="container-custom max-w-3xl text-center">
            <h2
              id="area-heading"
              className="text-lg font-bold text-neutral-900 mb-2"
            >
              Hizmet Bölgelerimiz
            </h2>
            <p className="text-sm text-neutral-500 mb-6">
              Sineklik tamiri, PVC pencere onarımı ve cam balkon servisi için
              ücretsiz keşif sunduğumuz bölgeler:
            </p>
            <ul className="flex flex-wrap justify-center gap-2" role="list">
              {serviceAreas.map((area) => (
                <li
                  key={area}
                  className="inline-block text-sm bg-primary-50 text-primary-700 font-medium px-4 py-2 rounded-full border border-primary-100"
                >
                  {area}
                </li>
              ))}
            </ul>
            <p className="text-xs text-neutral-400 mt-4">
              Bölgeniz listede yok mu?{" "}
              <Link
                href="/iletisim"
                className="text-primary-600 hover:underline"
              >
                Bize ulaşın
              </Link>
              , hizmet alanımızı kontrol edelim.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
