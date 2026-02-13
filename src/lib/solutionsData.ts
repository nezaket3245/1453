// ---------------------------------------------------------------------------
// Solution Center (Çözüm Merkezi) — Enriched article data
// Each article is a self-contained knowledge unit designed for:
//   1. SEO — long-tail keywords, rich metadata, HowTo/FAQPage schema
//   2. Fuzzy search — title + excerpt + keywords indexed by Fuse.js
//   3. Static generation — slug-based routing via generateStaticParams
// ---------------------------------------------------------------------------

export type SolutionCategory =
  | "troubleshooting"
  | "product-info"
  | "maintenance"
  | "comparison"
  | "guide";

export interface ContentBlock {
  type: "paragraph" | "heading" | "list" | "tip" | "warning" | "steps";
  /** For heading blocks */
  level?: 2 | 3;
  text?: string;
  items?: string[];
  /** For steps block */
  steps?: { title: string; detail: string }[];
}

export interface TechSpec {
  label: string;
  value: string;
}

export interface Solution {
  slug: string;
  title: string;
  excerpt: string;
  category: SolutionCategory;
  badge: string;
  keywords: string[];
  content: ContentBlock[];
  relatedSlugs: string[];
  techSpecs?: TechSpec[];
  publishedAt: string;
  updatedAt: string;
}

// ---------------------------------------------------------------------------
// Category metadata (used on index page for filtering)
// ---------------------------------------------------------------------------
export const categoryMeta: Record<
  SolutionCategory,
  { label: string; color: string; bgColor: string }
> = {
  troubleshooting: {
    label: "Sorun / Çözüm",
    color: "text-red-700",
    bgColor: "bg-red-50 border-red-200",
  },
  "product-info": {
    label: "Ürün Bilgisi",
    color: "text-blue-700",
    bgColor: "bg-blue-50 border-blue-200",
  },
  maintenance: {
    label: "Bakım Rehberi",
    color: "text-green-700",
    bgColor: "bg-green-50 border-green-200",
  },
  comparison: {
    label: "Karşılaştırma",
    color: "text-purple-700",
    bgColor: "bg-purple-50 border-purple-200",
  },
  guide: {
    label: "Rehber",
    color: "text-amber-700",
    bgColor: "bg-amber-50 border-amber-200",
  },
};

// ---------------------------------------------------------------------------
// Articles
// ---------------------------------------------------------------------------
export const solutions: Solution[] = [
  // ─── 1. Condensation / Terleme ────────────────────────────────────────
  {
    slug: "pencere-terleme-bugulanma-sorunu",
    title: "Pencere Terleme (Buğulanma) Sorunu Neden Olur, Nasıl Çözülür?",
    excerpt:
      "Kış aylarında camlarınız terliyorsa nedenini ve kalıcı çözüm yollarını bu rehberde bulabilirsiniz. Havalandırma, yalıtım ve cam seçimi önerileri.",
    category: "troubleshooting",
    badge: "Sorun / Çözüm",
    keywords: [
      "pencere terleme",
      "cam buğulanması",
      "pencere terlemesi çözümü",
      "kış pencere terleme",
      "yoğuşma nedir",
      "çift cam terleme",
      "ısıcam buğulanma",
      "pencere camı neden terler",
      "terleme önleme",
      "havalandırma",
      "nem oranı",
      "iç ortam nem",
    ],
    content: [
      {
        type: "heading",
        level: 2,
        text: "Pencere Terleme Nedir?",
      },
      {
        type: "paragraph",
        text: "Pencere terlemesi (yoğuşma), iç ortamdaki nemli havanın soğuk cam yüzeyine temas ettiğinde su damlacıklarına dönüşmesidir. Bu fiziksel bir olaydır ve genellikle pencerenin hatalı olduğu anlamına gelmez. Ancak sürekli terleme pencere çerçevesinde küf, boya dökülmesi ve sağlık sorunlarına yol açabilir.",
      },
      {
        type: "heading",
        level: 3,
        text: "Terlemenin Başlıca Nedenleri",
      },
      {
        type: "list",
        items: [
          "Yüksek iç ortam nem oranı (mutfak buharı, banyo, çamaşır kurutma)",
          "Yetersiz havalandırma — sürekli kapalı pencereler",
          "Tek camlı veya eski çift cam üniteleri (düşük Uw değeri)",
          "Kalın perde veya mobilyanın cam önünü kapatması (hava sirkülasyonu engelleniyor)",
          "Radyatörün pencere altında olmaması veya kapalı olması",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "Çözüm Yolları",
      },
      {
        type: "steps",
        steps: [
          {
            title: "Günlük havalandırma yapın",
            detail:
              "Sabah ve akşam 5-10 dakika çapraz havalandırma yaparak iç nemi dışarı atın. Vasistas pozisyonu idealdir.",
          },
          {
            title: "Nem kaynağını kontrol edin",
            detail:
              "Mutfak aspiratörünü kullanın, banyoda fan çalıştırın, çamaşırları kapalı alanda kurutmayın.",
          },
          {
            title: "Cam önünü açık tutun",
            detail:
              "Kalın perdeleri camdan 10 cm uzakta tutun. Radyatörün sıcak havasının cama ulaşmasını sağlayın.",
          },
          {
            title: "Cam ünitesini yükseltin",
            detail:
              "Tek cam yerine çift cam (4+16+4), daha iyisi Low-E kaplamalı ısıcam kullanın. Cam iç yüzey sıcaklığı artar, terleme azalır.",
          },
          {
            title: "Profil kalitesini kontrol edin",
            detail:
              "Egepen Legend (7 hava odacığı, 80 mm genişlik) veya Zendow (6 odacığı, 70 mm) gibi yüksek yalıtımlı profiller tercih edin.",
          },
        ],
      },
      {
        type: "tip",
        text: "Oda nem oranını %40-60 arasında tutmak terlemeyi büyük ölçüde önler. Ucuz bir higrometre ile nem ölçümü yapabilirsiniz.",
      },
      {
        type: "warning",
        text: "Cam arasında (çift camın içinde) buğulanma varsa cam ünitesinin sızdırmazlığı bozulmuştur. Bu durumda cam ünitesi değiştirilmelidir — havalandırma ile çözülmez.",
      },
    ],
    relatedSlugs: [
      "isi-yalitimi-nasil-artirilir",
      "egepen-legend-teknik-ozellikler",
      "pencere-contasi-ne-zaman-degismeli",
    ],
    publishedAt: "2026-01-15",
    updatedAt: "2026-02-10",
  },

  // ─── 2. Sliding Systems ───────────────────────────────────────────────
  {
    slug: "pvc-surme-sistemleri-rehberi",
    title: "PVC Sürme Sistemleri Rehberi — Çeşitleri, Avantajları ve Seçim Kriterleri",
    excerpt:
      "Balkon kapısı, geniş teras açıklıkları veya dar alanlara sürme sistem düşünüyorsanız bu rehber tüm seçenekleri karşılaştırarak anlatıyor.",
    category: "guide",
    badge: "Rehber",
    keywords: [
      "sürme sistem",
      "PVC sürme pencere",
      "sürme kapı",
      "paralel sürme",
      "sürme balkon kapısı",
      "kaldırma sürme",
      "lift and slide",
      "PSK sürme",
      "tilt and slide",
      "sürgülü pencere",
      "sürme sistem fiyatları",
      "geniş açıklık pencere",
    ],
    content: [
      {
        type: "paragraph",
        text: "Sürme sistemler, kanat açma alanı gerektirmeden geniş açıklıklar oluşturmanızı sağlar. Balkon kapıları, teras geçişleri ve dar alanlarda menteşeli sistemlere göre çok daha pratiktir. PVC sürme sistemler yalıtım performansını korurken şık bir görünüm sunar.",
      },
      {
        type: "heading",
        level: 2,
        text: "Sürme Sistem Çeşitleri",
      },
      {
        type: "heading",
        level: 3,
        text: "1. Paralel Sürme (PSK — Parallel Schiebe Kipp)",
      },
      {
        type: "paragraph",
        text: "Kanat önce hafifçe öne açılır (tilt), sonra ray üzerinde kaydırılır. Kapandığında çok noktalı kilit ile sıkıca kapanır. Yalıtım değerleri yüksektir. Balkon kapıları için en yaygın sürme tiptir.",
      },
      {
        type: "heading",
        level: 3,
        text: "2. Kaldır-Kaydır (Hebeschiebe — HS)",
      },
      {
        type: "paragraph",
        text: "Kol çevrilerek kanat hafifçe yükseltilir ve ray üzerinde kayar. Çok büyük açıklıklara (3 m+) uygulanabilir. Ağır camlar (üçlü cam) taşıyabilir. Premium segmenttir.",
      },
      {
        type: "heading",
        level: 3,
        text: "3. İnce Ray Sürme (Slim-Slide)",
      },
      {
        type: "paragraph",
        text: "Dar profil görünümüyle maksimum cam alanı sunar. Isı yalıtım değerleri PSK kadar yüksek olmayabilir ancak estetik öncelikli projelerde tercih edilir.",
      },
      {
        type: "heading",
        level: 2,
        text: "Hangi Sürme Sistemi Seçmeliyim?",
      },
      {
        type: "list",
        items: [
          "Standart balkon kapısı → PSK (Paralel Sürme) en uygun maliyet/performans",
          "Geniş teras açıklığı (3 m+) → Kaldır-Kaydır (HS)",
          "Estetik / minimum profil görünümü → İnce Ray Sürme",
          "Dar alan, tek kanat yeterli → Standart sürme veya PSK",
        ],
      },
      {
        type: "tip",
        text: "Sürme sistemlerde ray içi drenaj kanalı olduğundan emin olun. Yağmur suyu birikmesi pist ve tekerlek ömrünü kısaltır.",
      },
    ],
    relatedSlugs: [
      "pvc-aluminyum-karsilastirma",
      "isi-yalitimi-nasil-artirilir",
      "egepen-legend-teknik-ozellikler",
    ],
    publishedAt: "2026-01-20",
    updatedAt: "2026-02-10",
  },

  // ─── 3. Door hinge noise ──────────────────────────────────────────────
  {
    slug: "kapi-gicirtisi-nasil-giderilir",
    title: "Kapı Gıcırtısı Nasıl Giderilir? 5 Pratik Yöntem",
    excerpt:
      "Kapınız her açıldığında gıcırdıyor ve komşularınızı rahatsız mı ediyor? Menteşe yağlama, ayar ve değişim ile gıcırtıyı kalıcı olarak giderin.",
    category: "troubleshooting",
    badge: "Sorun / Çözüm",
    keywords: [
      "kapı gıcırtısı",
      "menteşe gıcırdıyor",
      "kapı sesi nasıl giderilir",
      "menteşe yağlama",
      "kapı gıcırtısı çözümü",
      "menteşe bakımı",
      "gıcırdayan kapı",
      "WD-40",
      "silikon sprey",
      "kapı menteşesi",
      "hinge",
      "lubricant",
      "door noise",
      "maintenance",
    ],
    content: [
      {
        type: "paragraph",
        text: "Kapı gıcırtısı, menteşe pimi ile menteşe gövdesi arasındaki sürtünmeden kaynaklanır. Zamanla yağ kuruması, toz birikmesi veya paslanma bu sürtünmeyi artırır. İşte kalıcı çözüm yolları:",
      },
      {
        type: "steps",
        steps: [
          {
            title: "1. Silikon bazlı sprey uygulayın",
            detail:
              "WD-40 geçici bir çözümdür ve toz çeker. Bunun yerine silikon bazlı yağlama spreyi kullanın — menteşe pimine ve oynak noktalara sıkın. Kapıyı birkaç kez açıp kapayarak yayılmasını sağlayın.",
          },
          {
            title: "2. Menteşe pimini çıkarıp yağlayın",
            detail:
              "Menteşe pimini alttan bir çivi ile iterek çıkartın. Pimi ince zımpara ile temizleyin, vazelin veya makine yağıyla yağlayın, tekrar takın.",
          },
          {
            title: "3. Menteşe vidalarını sıkın",
            detail:
              "Gevşemiş menteşe vidaları kapının sarkmasına neden olur ve gıcırtı artırır. Tüm vidaları kontrol edip sıkın. Vida yuvası genişlemişse bir numara büyük vida veya dübel+vida kullanın.",
          },
          {
            title: "4. Menteşe hizalamasını kontrol edin",
            detail:
              "Kapı çerçeveye sürtüyorsa menteşe hizası bozulmuştur. Üst veya alt menteşeyi söküp altına ince karton veya shim ekleyerek hizalayın.",
          },
          {
            title: "5. Menteşeyi değiştirin",
            detail:
              "Paslanan veya aşınan menteşeler kalıcı gıcırtı yapar. Aynı ölçüde yeni paslanmaz çelik menteşe takarak sorunu kökten çözün.",
          },
        ],
      },
      {
        type: "tip",
        text: "Menteşelere yılda 2 kez silikon sprey uygulayarak gıcırtıyı önleyebilirsiniz. Bu rutini pencere ve dolap menteşelerine de uygulayın.",
      },
    ],
    relatedSlugs: [
      "pencere-contasi-ne-zaman-degismeli",
      "pencere-bakim-takvimi",
    ],
    publishedAt: "2026-01-22",
    updatedAt: "2026-02-10",
  },

  // ─── 4. Egepen Legend ─────────────────────────────────────────────────
  {
    slug: "egepen-legend-teknik-ozellikler",
    title: "Egepen Legend PVC Pencere — Teknik Özellikler ve Avantajlar",
    excerpt:
      "Egepen'in amiral gemisi Legend serisi: 80 mm profil genişliği, 7 hava odacığı, 52 dB ses yalıtımı. Detaylı teknik bilgi ve performans değerleri.",
    category: "product-info",
    badge: "Ürün Bilgisi",
    keywords: [
      "Egepen Legend",
      "Legend PVC pencere",
      "80mm profil",
      "7 odacıklı profil",
      "Egepen Legend teknik",
      "Legend pencere fiyat",
      "Deceuninck Legend",
      "PVC pencere özellikleri",
      "ısı yalıtım değeri",
      "ses yalıtım pencere",
    ],
    content: [
      {
        type: "paragraph",
        text: "Egepen Legend, Deceuninck'in Avrupa'da 'Elegant' olarak bilinen premium profilinin Türkiye versiyonudur. 80 mm profil genişliği ve 7 bağımsız hava odacığı ile Türkiye'deki en yüksek yalıtım performanslarından birini sunar.",
      },
      {
        type: "heading",
        level: 2,
        text: "Neden Legend Tercih Edilmeli?",
      },
      {
        type: "list",
        items: [
          "7 hava odacığı — Rakip profillerin çoğu 5-6 odacıklıdır",
          "80 mm profil genişliği — Daha geniş profil = daha fazla yalıtım alanı",
          "3 EPDM kauçuk conta hattı — Üç aşamalı sızdırmazlık",
          "Uf = 1.0 W/m²K profil ısı iletim katsayısı (cam hariç)",
          "52 dB ses yalıtımı — Ana yol kenarında bile sessiz ortam",
          "Çelik takviyeli yapı — Profile sağlamlık ve uzun ömür kazandırır",
          "Geri dönüşüme uygun Linktrusion® hammaddesi",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "Legend Hangi Durumlarda Önerilir?",
      },
      {
        type: "list",
        items: [
          "Yoğun trafikli caddelere bakan daireler (ses yalıtımı kritik)",
          "Soğuk iklim bölgeleri — yüksek ısı yalıtımı ihtiyacı",
          "Enerji maliyetini düşürmek isteyen bilinçli tüketiciler",
          "Büyük pencere açıklıkları — güçlü profil yapısı şart",
        ],
      },
      {
        type: "tip",
        text: "Legend profille birlikte Low-E kaplamalı argon gazlı çift cam kullanırsanız toplam pencere Uw değeri 0.9 W/m²K'ya kadar düşürülebilir — pasif ev standartlarına yakın performans.",
      },
    ],
    techSpecs: [
      { label: "Profil Genişliği", value: "80 mm" },
      { label: "Hava Odacığı Sayısı", value: "7" },
      { label: "Conta Hattı", value: "3 (EPDM kauçuk)" },
      { label: "Profil Uf Değeri", value: "1.0 W/m²K" },
      { label: "Ses Yalıtımı", value: "≤ 52 dB (Rw)" },
      { label: "Cam Kalınlığı (maks.)", value: "52 mm" },
      { label: "Çelik Takviye", value: "1.5 mm galvaniz çelik" },
      { label: "Renk Seçeneği", value: "Beyaz + RAL kaplama (laminasyon)" },
      { label: "Kanat Tipi", value: "Açılır, vasistas, sürme, PSK" },
      { label: "Yangın Sınıfı", value: "B2 (normal yanıcı)" },
    ],
    relatedSlugs: [
      "egepen-zendow-teknik-ozellikler",
      "pvc-aluminyum-karsilastirma",
      "isi-yalitimi-nasil-artirilir",
    ],
    publishedAt: "2026-01-10",
    updatedAt: "2026-02-10",
  },

  // ─── 5. Egepen Zendow ────────────────────────────────────────────────
  {
    slug: "egepen-zendow-teknik-ozellikler",
    title: "Egepen Zendow PVC Pencere — Teknik Özellikler ve Avantajlar",
    excerpt:
      "Egepen Zendow serisi: 70 mm profil, 6 hava odacığı, uygun fiyat/performans dengesi. Standart konut projeleri için ideal çözüm.",
    category: "product-info",
    badge: "Ürün Bilgisi",
    keywords: [
      "Egepen Zendow",
      "Zendow PVC pencere",
      "70mm profil",
      "6 odacıklı profil",
      "Zendow teknik özellikler",
      "Zendow fiyat",
      "Deceuninck Zendow",
      "ekonomik PVC pencere",
    ],
    content: [
      {
        type: "paragraph",
        text: "Egepen Zendow, yüksek performansı makul fiyatla sunan orta-üst segment PVC pencere profilidir. 70 mm genişlik ve 6 hava odacığı ile Türkiye konut pazarında en çok tercih edilen profillerden biridir.",
      },
      {
        type: "heading",
        level: 2,
        text: "Zendow Profil Avantajları",
      },
      {
        type: "list",
        items: [
          "6 hava odacığı — Çoğu standart profilden üstün yalıtım",
          "70 mm genişlik — Makul maliyet, yeterli yalıtım",
          "2 EPDM conta hattı — Çift kademeli sızdırmazlık",
          "Uf = 1.3 W/m²K — Sınıfının en iyileri arasında",
          "46 dB ses yalıtımı — Konut konforu için yeterli",
          "Uyumlu cam kalınlığı: 24 mm — 40 mm arası",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "Zendow Ne Zaman Tercih Edilmeli?",
      },
      {
        type: "list",
        items: [
          "Standart konut projeleri — yeterli yalıtım, makul bütçe",
          "Ara katlardaki sessiz ortam (ana caddeye bakmayan cepheler)",
          "Toplu konut ve müteahhit projeleri (fiyat/adet optimizasyonu)",
          "Bina yenileme projeleri — mevcut açıklıklara kolay uyum",
        ],
      },
      {
        type: "tip",
        text: "Zendow ile Legend arasında kararsızsanız: sokağa bakan cephede Legend, arka cephede Zendow kullanarak bütçe optimizasyonu yapabilirsiniz.",
      },
    ],
    techSpecs: [
      { label: "Profil Genişliği", value: "70 mm" },
      { label: "Hava Odacığı Sayısı", value: "6" },
      { label: "Conta Hattı", value: "2 (EPDM kauçuk)" },
      { label: "Profil Uf Değeri", value: "1.3 W/m²K" },
      { label: "Ses Yalıtımı", value: "≤ 46 dB (Rw)" },
      { label: "Cam Kalınlığı (maks.)", value: "40 mm" },
      { label: "Çelik Takviye", value: "1.5 mm galvaniz çelik" },
      { label: "Renk Seçeneği", value: "Beyaz + RAL kaplama" },
      { label: "Kanat Tipi", value: "Açılır, vasistas, sürme" },
      { label: "Yangın Sınıfı", value: "B2 (normal yanıcı)" },
    ],
    relatedSlugs: [
      "egepen-legend-teknik-ozellikler",
      "pvc-aluminyum-karsilastirma",
      "pencere-terleme-bugulanma-sorunu",
    ],
    publishedAt: "2026-01-10",
    updatedAt: "2026-02-10",
  },

  // ─── 6. PVC vs Aluminium ─────────────────────────────────────────────
  {
    slug: "pvc-aluminyum-karsilastirma",
    title: "PVC mi Alüminyum mu? Pencere ve Doğrama Karşılaştırması",
    excerpt:
      "Hangi profil malzemesi size uygun? Isı yalıtımı, fiyat, dayanıklılık, estetik ve bakım açısından PVC ve alüminyum karşılaştırması.",
    category: "comparison",
    badge: "Karşılaştırma",
    keywords: [
      "PVC mi alüminyum mü",
      "pencere malzemesi seçimi",
      "PVC pencere avantajları",
      "alüminyum pencere avantajları",
      "PVC alüminyum fark",
      "doğrama karşılaştırma",
      "alüminyum termal köprü",
      "PVC pencere ömrü",
      "alüminyum pencere fiyat",
    ],
    content: [
      {
        type: "paragraph",
        text: "PVC ve alüminyum, doğrama sektörünün iki ana profil malzemesidir. Her birinin güçlü yönleri farklıdır. Doğru seçim, projenin ihtiyaçlarına göre değişir.",
      },
      {
        type: "heading",
        level: 2,
        text: "Isı Yalıtımı",
      },
      {
        type: "paragraph",
        text: "PVC profiller doğal yapıları gereği düşük ısı iletkenliğine sahiptir. Egepen Legend Uf=1.0 W/m²K iken standart alüminyum profil Uf=3-5 W/m²K'dır. Termal köprü kesikli (polyamid bariyerli) alüminyum profiller 1.5-2.5 W/m²K'ya iner ancak PVC kadar düşük değere ulaşamaz.",
      },
      {
        type: "heading",
        level: 2,
        text: "Ses Yalıtımı",
      },
      {
        type: "paragraph",
        text: "PVC profillerin hava odacıklı yapısı ses yalıtımında da avantaj sağlar. Legend profil 52 dB'e kadar ses yalıtımı sunarken, standart alüminyum 35-42 dB civarındadır.",
      },
      {
        type: "heading",
        level: 2,
        text: "Dayanıklılık ve Ömür",
      },
      {
        type: "paragraph",
        text: "Her iki malzeme de 30+ yıl ömür sunar. Alüminyum paslanmaz ancak eloksal/boya kaplaması zamanla matlaşabilir. PVC UV stabilizatör sayesinde sararmaya dayanıklıdır. Her iki profilde de conta ve mekanizma bakımı gerekir.",
      },
      {
        type: "heading",
        level: 2,
        text: "Fiyat",
      },
      {
        type: "paragraph",
        text: "PVC profil genellikle alüminyumdan %20-40 daha ekonomiktir. Ancak termal köprü kesikli premium alüminyum profiller PVC'nin 2-3 katına çıkabilir. Büyük cam açıklık gerektiren ticari projeler için alüminyumun statik dayanımı avantajdır.",
      },
      {
        type: "heading",
        level: 2,
        text: "Özet Tablo",
      },
      {
        type: "list",
        items: [
          "Isı yalıtımı → PVC üstün ✓",
          "Ses yalıtımı → PVC üstün ✓",
          "Fiyat → PVC daha ekonomik ✓",
          "Büyük açıklık (5 m+) → Alüminyum üstün ✓",
          "Tasarım esnekliği → Alüminyum üstün ✓",
          "Bakım kolaylığı → Eşit",
          "Geri dönüşüm → Her ikisi de uygun",
        ],
      },
      {
        type: "tip",
        text: "Konut projelerinde PVC, ticari/büyük açıklık projelerinde alüminyum tercih edilmesi en doğru yaklaşımdır. Cepheye göre farklı malzeme kullanmak da mümkündür.",
      },
    ],
    relatedSlugs: [
      "egepen-legend-teknik-ozellikler",
      "egepen-zendow-teknik-ozellikler",
      "isi-yalitimi-nasil-artirilir",
    ],
    publishedAt: "2026-01-25",
    updatedAt: "2026-02-10",
  },

  // ─── 7. Seal / Conta replacement ─────────────────────────────────────
  {
    slug: "pencere-contasi-ne-zaman-degismeli",
    title: "Pencere Contası Ne Zaman Değiştirilmeli? Belirtiler ve Çözüm",
    excerpt:
      "Pencereden hava giriyor, rüzgâr sesi duyuluyor? Contanız ömrünü tamamlamış olabilir. Değişim zamanı belirtileri ve yapılması gerekenler.",
    category: "maintenance",
    badge: "Bakım Rehberi",
    keywords: [
      "pencere contası değişimi",
      "conta ne zaman değişir",
      "EPDM conta ömrü",
      "pencerem hava alıyor",
      "pencere conta bakımı",
      "conta sertleşmesi",
      "rüzgar sesi pencere",
      "kağıt testi pencere",
    ],
    content: [
      {
        type: "heading",
        level: 2,
        text: "Conta Değişimi Gerektiğini Gösteren Belirtiler",
      },
      {
        type: "list",
        items: [
          "Pencere kapalıyken hava akımı veya rüzgâr sesi hissediyorsunuz",
          "Conta üzerinde çatlak, ezilme veya sertleşme var",
          "Conta basıldığında geri yaylanmıyor — esnekliğini kaybetmiş",
          "Kağıt testi: Kapalı pencere arasına kağıt koyun — kolayca çekiliyorsa conta basınçsız",
          "Contada renk değişikliği, küf veya yapışma var",
          "Pencere contası 7 yıldan eski",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "Conta Ömrünü Uzatma İpuçları",
      },
      {
        type: "steps",
        steps: [
          {
            title: "Yılda 2 kez silikon bakım spreyi",
            detail:
              "Contalar üzerine silikon bazlı bakım spreyi sıkın ve yumuşak bezle yayın. Esnekliği korur, sertleşmeyi geciktirir.",
          },
          {
            title: "Contayı düzenli temizleyin",
            detail:
              "Ilık su ve yumuşak sabunla conta yüzeyini silin. Toz ve kiri temizlemek conta ömrünü artırır.",
          },
          {
            title: "Pencereyi sert kapatmayın",
            detail:
              "Rüzgârda sert kapanan pencereler contayı ezer. Pencereyi kontrollü kapatın.",
          },
        ],
      },
      {
        type: "warning",
        text: "Her PVC profil markasının conta profili farklıdır. Yanlış kesit contası takarsanız sızdırmazlık sağlanmaz. Eski contadan bir parça keserek nalburiyeye götürün veya servisi arayın.",
      },
    ],
    relatedSlugs: [
      "pencere-terleme-bugulanma-sorunu",
      "pencere-bakim-takvimi",
      "kapi-gicirtisi-nasil-giderilir",
    ],
    publishedAt: "2026-01-28",
    updatedAt: "2026-02-10",
  },

  // ─── 8. Glass balcony maintenance ─────────────────────────────────────
  {
    slug: "cam-balkon-bakim-rehberi",
    title: "Cam Balkon Bakım Rehberi — Uzun Ömür İçin 8 Altın Kural",
    excerpt:
      "Cam balkonunuzun tekerlek, fitil ve kilit mekanizmasını uzun yıllar sorunsuz kullanmak için düzenli bakım şart. İşte 8 altın kural.",
    category: "maintenance",
    badge: "Bakım Rehberi",
    keywords: [
      "cam balkon bakımı",
      "cam balkon temizliği",
      "cam balkon tekerlek bakımı",
      "cam balkon fitil",
      "cam balkon yağlama",
      "cam balkon kilit",
      "ısıcamlı cam balkon bakım",
      "cam balkon ray temizliği",
    ],
    content: [
      {
        type: "paragraph",
        text: "Cam balkon sistemleri, doğru bakım yapıldığında 15-20 yıl sorunsuz kullanılır. Bakımsızlıkta ise 3-5 yıl içinde tekerlek aşınması, fitil yıpranması ve kilit arızaları başlar. İşte uzun ömür için uygulamanız gereken 8 altın kural:",
      },
      {
        type: "steps",
        steps: [
          {
            title: "Rayları düzenli temizleyin",
            detail:
              "Alt ve üst rayda biriken toz, kum ve yaprak parçacıklarını süpürgelik ile temizleyin. Birikim tekerlek aşınmasını hızlandırır.",
          },
          {
            title: "Tekerlekleri yılda 2 kez yağlayın",
            detail:
              "Her tekerleğe 1-2 damla silikon bazlı yağ damlatın. Panel kaymasını kolaylaştırır ve tekerlek ömrünü uzatır.",
          },
          {
            title: "Fitilleri kontrol edin",
            detail:
              "Fitil dudağının cam ve profile tam oturup oturmadığını kontrol edin. Sertleşmiş veya çatlamış fitil su/hava sızıntısı yapar.",
          },
          {
            title: "Cam yüzeylerini doğru temizleyin",
            detail:
              "Çizilmeyi önlemek için abrazif temizlik malzemesi kullanmayın. Cam temizleme spreyi ve mikrofiber bez kullanın.",
          },
          {
            title: "Kilit mekanizmasını kontrol edin",
            detail:
              "Kildi çevirirken zorlanma olmamalı. Zorlanıyorsa karşılık ayarı yapın veya kildi yağlayın.",
          },
          {
            title: "Drenaj deliklerini açık tutun",
            detail:
              "Alt raydaki drenaj deliklerini iğne veya ince tel ile temizleyin. Tıkanan drenaj balkon zemininde su biriktirmesine neden olur.",
          },
          {
            title: "Profil temizliği yapın",
            detail:
              "Alüminyum profilleri ılık sabunlu su ile silin. Asidik veya alkalin temizleyiciler profil yüzeyini aşındırır.",
          },
          {
            title: "Mevsimlik genel kontrol",
            detail:
              "Kış öncesi ve yaz sonrası tüm panellerin, tekerleklerin ve fitillerin genel kontrolünü yapın. Erken tespit masraf önler.",
          },
        ],
      },
      {
        type: "tip",
        text: "Cam balkon bakımını yapamıyorsanız yılda 1 kez profesyonel bakım servisi çağırın. Toplu bakım tek pencere onarımından çok daha ekonomiktir.",
      },
    ],
    relatedSlugs: [
      "pencere-contasi-ne-zaman-degismeli",
      "pencere-bakim-takvimi",
    ],
    publishedAt: "2026-02-01",
    updatedAt: "2026-02-10",
  },

  // ─── 9. Thermal insulation ────────────────────────────────────────────
  {
    slug: "isi-yalitimi-nasil-artirilir",
    title: "Evinizin Isı Yalıtımını Pencereden Nasıl Artırırsınız?",
    excerpt:
      "Isıtma faturanız yüksek mi? Evdeki ısı kaybının %25-30'u pencerelerden olur. Cam, profil ve montaj ile yalıtımı iyileştirme rehberi.",
    category: "guide",
    badge: "Rehber",
    keywords: [
      "ısı yalıtımı",
      "pencere yalıtım",
      "enerji tasarrufu pencere",
      "Low-E cam",
      "argon gazlı cam",
      "Uw değeri",
      "ısı kaybı pencere",
      "ısıtma faturası düşürme",
      "enerji verimliliği",
      "profil yalıtım değeri",
    ],
    content: [
      {
        type: "paragraph",
        text: "Bir evin toplam ısı kaybının %25-30'u pencere ve kapılardan gerçekleşir. Pencere yalıtımını iyileştirmek hem konforu artırır hem de ısıtma/soğutma faturalarından tasarruf sağlar.",
      },
      {
        type: "heading",
        level: 2,
        text: "Pencere Isı Yalıtımını Etkileyen 3 Faktör",
      },
      {
        type: "heading",
        level: 3,
        text: "1. Cam Ünitesi",
      },
      {
        type: "paragraph",
        text: "Cam, pencerenin en geniş yüzeyidir. Tek cam Ug ≈ 5.8 W/m²K, standart çift cam ≈ 2.8 W/m²K, Low-E kaplamalı argon gazlı çift cam ≈ 1.1 W/m²K, üçlü cam ≈ 0.6 W/m²K. Her kademe faturanızdan %10-15 tasarruf sağlar.",
      },
      {
        type: "heading",
        level: 3,
        text: "2. Profil",
      },
      {
        type: "paragraph",
        text: "Profil genişliği ve hava odacığı sayısı arttıkça ısı yalıtımı iyileşir. Egepen Legend (80 mm, 7 odacık) Uf=1.0, Zendow (70 mm, 6 odacık) Uf=1.3. Toplam pencere Uw değeri = cam + profil + kenar spacer toplamıdır.",
      },
      {
        type: "heading",
        level: 3,
        text: "3. Montaj Kalitesi",
      },
      {
        type: "paragraph",
        text: "En kaliteli pencereyi bile kötü montajla taktırırsanız yalıtım sağlayamazsınız. Kasa-duvar arası PU köpük + buhar bariyeri bantı ile yalıtılmalı, iç ve dış sıva ile kapatılmalıdır.",
      },
      {
        type: "tip",
        text: "Pencere yenilemede tek başına profili değil, toplam Uw değerine bakın. Uw ≤ 1.4 W/m²K A enerji sınıfı, Uw ≤ 1.0 A+ enerji sınıfıdır.",
      },
    ],
    relatedSlugs: [
      "pencere-terleme-bugulanma-sorunu",
      "egepen-legend-teknik-ozellikler",
      "ses-yalitimi-cozumleri",
    ],
    publishedAt: "2026-02-03",
    updatedAt: "2026-02-10",
  },

  // ─── 10. Sound insulation ─────────────────────────────────────────────
  {
    slug: "ses-yalitimi-cozumleri",
    title: "Pencere Ses Yalıtımı Çözümleri — dB Değerleri ile Karşılaştırma",
    excerpt:
      "Trafik gürültüsü, inşaat sesleri sizi rahatsız mı ediyor? Pencere ses yalıtım sınıfları, cam seçenekleri ve profil karşılaştırması.",
    category: "guide",
    badge: "Rehber",
    keywords: [
      "ses yalıtımı",
      "gürültü azaltma pencere",
      "dB değeri pencere",
      "akustik cam",
      "lamine cam",
      "trafik gürültüsü çözüm",
      "ses yalıtımlı pencere",
      "Rw değeri",
      "sessiz uyku",
    ],
    content: [
      {
        type: "paragraph",
        text: "Şehir yaşamında gürültü kirliliği ciddi bir konfor ve sağlık sorunudur. Dünya Sağlık Örgütü, gece 40 dB üzeri ortam sesinin uyku kalitesini bozduğunu raporlamıştır. Doğru pencere seçimi ile evinizin içini 25-30 dB sessizleştirebilirsiniz.",
      },
      {
        type: "heading",
        level: 2,
        text: "Pencere Ses Yalıtımını Etkileyen Faktörler",
      },
      {
        type: "list",
        items: [
          "Cam kalınlığı ve türü — Asimetrik cam (4+16+6 mm) simetriğe göre daha iyi ses yalıtır",
          "Lamine (PVB interpayer) cam — Orta filmi titreşimi emer, 3-5 dB ekstra yalıtım",
          "Cam arası boşluk — 16-20 mm optimum, daha geniş boşluk düşük frekansta daha etkili",
          "Profil genişliği — Geniş profil = daha fazla hava odacığı = daha iyi yalıtım",
          "Conta sayısı ve kalitesi — 3 kademeli conta (Legend) 2 kademeliye göre üstün",
          "Montaj sızdırmazlığı — Kasa-duvar arası ses boşluğu bırakılmamalı",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "Ses Yalıtım Sınıfları (Rw değeri)",
      },
      {
        type: "list",
        items: [
          "Sınıf 1 (25-29 dB) — Sakin çevre, iç mahalle",
          "Sınıf 2 (30-34 dB) — Normal sokak, az trafik",
          "Sınıf 3 (35-39 dB) — Yoğun trafik, kavşak",
          "Sınıf 4 (40-44 dB) — Ana cadde, toplu taşıma hattı",
          "Sınıf 5 (45-49 dB) — Otoyol, havalimanı yakını",
          "Sınıf 6 (50+ dB) — Endüstriyel bölge, demiryolu",
        ],
      },
      {
        type: "tip",
        text: "Evinizde ses ölçümü için akıllı telefonunuzdaki dB ölçer uygulamalarını kullanabilirsiniz. Pencere kapalıyken 40 dB üzerindeyse yalıtım yetersizdir.",
      },
    ],
    relatedSlugs: [
      "egepen-legend-teknik-ozellikler",
      "isi-yalitimi-nasil-artirilir",
      "pvc-aluminyum-karsilastirma",
    ],
    publishedAt: "2026-02-05",
    updatedAt: "2026-02-10",
  },

  // ─── 11. Roller shutter motor ─────────────────────────────────────────
  {
    slug: "panjur-motor-arizasi-cozumleri",
    title: "Panjur Motor Arızası — Teşhis ve Çözüm Rehberi",
    excerpt:
      "Motorlu panjurunuz açılmıyor veya yarıda kalıyor mu? Motor, kumanda, limit ayarı ve elektrik bağlantısı kontrol rehberi.",
    category: "troubleshooting",
    badge: "Sorun / Çözüm",
    keywords: [
      "panjur motor arızası",
      "panjur açılmıyor",
      "panjur kumanda çalışmıyor",
      "panjur limit ayarı",
      "panjur motoru değişimi",
      "Somfy motor arıza",
      "Nice motor",
      "panjur şalter",
      "motorlu panjur tamiri",
    ],
    content: [
      {
        type: "paragraph",
        text: "Motorlu panjur arızaları genellikle motor, kumanda/şalter, limit ayarı veya elektrik bağlantısından kaynaklanır. Sorunu doğru teşhis etmek gereksiz masraftan kurtarır.",
      },
      {
        type: "heading",
        level: 2,
        text: "Arıza Teşhis Tablosu",
      },
      {
        type: "list",
        items: [
          "Panjur hiç hareket etmiyor + motor sesi yok → Elektrik yok veya şalter/kumanda arızası",
          "Motor sesi var ama panjur hareket etmiyor → Mil bağlantısı kopmuş veya motor dişlisi kırılmış",
          "Panjur yarıda duruyor → Limit ayarı bozulmuş veya panjur bir yere takılıyor",
          "Panjur açılıyor ama kapanmıyor (veya tersi) → Tek yönlü kondansatör arızası olabilir",
          "Kumanda tepki vermiyor → Pil kontrol edin, kumanda-alıcı eşleştirmesini yenileyin",
          "Panjur titreyerek açılıyor → Lamel ray içinde sıkışma veya tekerlek hasarı",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "Kendiniz Yapabileceğiniz Kontroller",
      },
      {
        type: "steps",
        steps: [
          {
            title: "Elektrik kontrolü",
            detail:
              "Sigorta kutusunu kontrol edin. Panjur devresi ayrı mı? Sigortayı kapatıp açın. Şaltere/düğmeye gelen elektriği voltmetre ile kontrol edin.",
          },
          {
            title: "Kumanda pil değişimi",
            detail:
              "Uzaktan kumandanın pilini yeni pille değiştirin. Bazı kumandalarda eşleştirme (pairing) işlemi gerekir.",
          },
          {
            title: "Manuel açma kontrolü",
            detail:
              "Çoğu motorlu panjurda acil durum manuel açma mekanizması vardır. Kanca veya kayış ile panjuru açıp motorun takılı olup olmadığını anlayabilirsiniz.",
          },
        ],
      },
      {
        type: "warning",
        text: "Panjur kutusu içindeki elektrik bağlantılarına dokunmak elektrik çarpması riski taşır. Motor değişimi ve kablo bağlantısı mutlaka profesyonel tarafından yapılmalıdır.",
      },
    ],
    relatedSlugs: [
      "kapi-gicirtisi-nasil-giderilir",
      "pencere-bakim-takvimi",
    ],
    publishedAt: "2026-02-07",
    updatedAt: "2026-02-10",
  },

  // ─── 12. Fly screen selection ─────────────────────────────────────────
  {
    slug: "sineklik-secim-rehberi",
    title: "Sineklik Seçim Rehberi — Plise, Menteşeli, Sürgülü, Kedi Sinekliği",
    excerpt:
      "Eviniz için doğru sineklik tipini nasıl seçersiniz? Plise, menteşeli, sürgülü ve kedi sinekliği karşılaştırması, avantajları ve fiyat bilgisi.",
    category: "guide",
    badge: "Rehber",
    keywords: [
      "sineklik seçimi",
      "plise sineklik",
      "menteşeli sineklik",
      "sürgülü sineklik",
      "kedi sinekliği",
      "sineklik fiyatları",
      "sineklik çeşitleri",
      "pencere sineklik",
      "kapı sineklik",
      "fiberglass sineklik",
      "paslanmaz sineklik tel",
    ],
    content: [
      {
        type: "paragraph",
        text: "Sineklik, sinek ve böceklerden korunurken doğal havalandırmayı sürdürmenin en pratik yoludur. Evinizin pencere ve kapı tipine göre farklı sineklik modelleri mevcuttur.",
      },
      {
        type: "heading",
        level: 2,
        text: "Sineklik Tipleri ve Özellikleri",
      },
      {
        type: "heading",
        level: 3,
        text: "Plise Sineklik (Akordiyon)",
      },
      {
        type: "paragraph",
        text: "Katlanır yapısı ile kullanılmadığında neredeyse görünmez olur. Yatay ve dikey modelleri vardır. Geniş balkon kapıları ve sürme sistemler için idealdir. En şık ve modern sineklik çözümüdür.",
      },
      {
        type: "heading",
        level: 3,
        text: "Menteşeli Sineklik (Çerçeveli)",
      },
      {
        type: "paragraph",
        text: "Kapı gibi açılıp kapanan sabit çerçeveli sinekliktir. Giriş kapıları ve sık kullanılan çıkışlar için uygundur. Mıknatıs veya kilitle kapanır. Alüminyum çerçeve üzerine fiberglass tel gerilir.",
      },
      {
        type: "heading",
        level: 3,
        text: "Sürgülü Sineklik",
      },
      {
        type: "paragraph",
        text: "Ray üzerinde kaydırılır. Sürme pencere ve cam balkon uygulamalarında kullanılır. Sabit çerçeve içinde tek veya çift kanatlı olabilir.",
      },
      {
        type: "heading",
        level: 3,
        text: "Kedi Sinekliği (Pet Screen)",
      },
      {
        type: "paragraph",
        text: "Paslanmaz çelik tel ile güçlendirilmiş, evcil hayvan tırmalama ve itme dayanımına sahip özel sinekliktir. Kedi ve köpek olan evlerde standart fiberglass sinekliğin yırtılmasını önler.",
      },
      {
        type: "heading",
        level: 2,
        text: "Hangi Sineklik Nerede Kullanılır?",
      },
      {
        type: "list",
        items: [
          "Yaşam alanı pencereleri → Plise (estetik) veya sürgülü (ekonomik)",
          "Giriş/balkon kapısı → Menteşeli (sık açıp-kapanma) veya plise (şıklık)",
          "Sürme cam kapı/balkon → Sürgülü veya plise (yatay)",
          "Evcil hayvan olan ev → Kedi sinekliği (pet screen)",
          "Bütçe sınırlı → Sürgülü veya menteşeli (en ekonomik)",
        ],
      },
      {
        type: "tip",
        text: "Sineklik teli seçiminde fiberglass en yaygın seçenektir. Ancak deniz kenarı veya yüksek nem bölgelerinde paslanmaz çelik tel 3 kat daha fazla dayanır.",
      },
    ],
    relatedSlugs: [
      "cam-balkon-bakim-rehberi",
      "pencere-bakim-takvimi",
    ],
    publishedAt: "2026-02-08",
    updatedAt: "2026-02-10",
  },

  // ─── 13. Maintenance calendar ─────────────────────────────────────────
  {
    slug: "pencere-bakim-takvimi",
    title: "Pencere ve Doğrama Bakım Takvimi — Yıllık Plan",
    excerpt:
      "Pencere, cam balkon, panjur ve sineklikleriniz için mevsimsel bakım takvimi. Yılda 4 kontrol ile arızaları önleyin, ömrü uzatın.",
    category: "maintenance",
    badge: "Bakım Rehberi",
    keywords: [
      "pencere bakım takvimi",
      "mevsimsel pencere bakımı",
      "yıllık bakım planı",
      "pencere yağlama",
      "conta bakımı",
      "mekanizma bakımı",
      "kış pencere hazırlık",
      "yaz pencere bakım",
    ],
    content: [
      {
        type: "heading",
        level: 2,
        text: "İlkbahar (Mart-Nisan)",
      },
      {
        type: "list",
        items: [
          "Kış boyunca biriken tozu pencere çerçevesi ve raylardan temizleyin",
          "Tüm menteşe ve mekanizma noktalarını silikon sprey ile yağlayın",
          "Contaları ılık sabunlu suyla temizleyin — silikon bakım spreyi uygulayın",
          "Drenaj deliklerini kontrol edin — tıkanıklık varsa açın",
          "Sineklikleri takın, tel durumunu kontrol edin",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "Yaz (Haziran-Temmuz)",
      },
      {
        type: "list",
        items: [
          "Panjur mekanizmasını (motor/kayış) test edin",
          "Cam balkon tekerlek ve ray durumunu kontrol edin",
          "Güneş koruma filmlerini / dış güneşlikleri gözden geçirin",
          "Karşılık ayarlarını gevşetin — yazın profil genleşir",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "Sonbahar (Eylül-Ekim)",
      },
      {
        type: "list",
        items: [
          "Kış öncesi genel kontrol — tüm pencere kollarını çevirerek test edin",
          "Contaları tekrar kontrol edin — kağıt testi yapın",
          "Cam arası buğulanma var mı kontrol edin",
          "Sineklikleri çıkartın ve temizleyerek saklayın",
          "Karşılık ayarlarını sıkın — kışın profil büzülür, sızdırmazlık artmalı",
        ],
      },
      {
        type: "heading",
        level: 2,
        text: "Kış (Aralık-Ocak)",
      },
      {
        type: "list",
        items: [
          "Günlük havalandırma rutini uygulayın (terleme önleme)",
          "Pencere kanatlarını zorlamadan açıp kapatarak mekanizma donmasını önleyin",
          "Buz tutmuş pencereyi asla zorla açmayın — ılık su ile çözün",
          "Panjurların doğru kapandığını kontrol edin — gece ısı kaybı %30 azalır",
        ],
      },
      {
        type: "tip",
        text: "Bu bakımları kendiniz yapmak 15-20 dakika sürer. Profesyonel bakım hizmeti almak isterseniz bizi arayabilirsiniz — yıllık bakım sözleşmesi de mevcuttur.",
      },
    ],
    relatedSlugs: [
      "pencere-contasi-ne-zaman-degismeli",
      "cam-balkon-bakim-rehberi",
      "panjur-motor-arizasi-cozumleri",
    ],
    publishedAt: "2026-02-09",
    updatedAt: "2026-02-10",
  },
];

// Helper: get a solution by slug (used by [slug] page)
export function getSolutionBySlug(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}

// Helper: get all slugs (used by generateStaticParams)
export function getAllSolutionSlugs(): string[] {
  return solutions.map((s) => s.slug);
}

// Helper: get related solutions
export function getRelatedSolutions(slugs: string[]): Solution[] {
  return solutions.filter((s) => slugs.includes(s.slug));
}
