// ===========================================================================
// TamiratTadilat Data Layer — PVC Window & Door Repair/Renovation Records
// ===========================================================================
// Provides typed repair-service records for the PVC-specific repair module.
// Each record represents a professional repair/renovation service offered by
// Egepen Akçayapı for PVC window and door systems.
//
// Architecture notes:
//   • Follows the same data-file convention as solutionsData.ts / pvcData.ts
//   • All helpers are pure functions (no side-effects)
//   • Exported arrays are readonly at the type-level to prevent mutations
// ===========================================================================

// ---------------------------------------------------------------------------
// Enums & unions
// ---------------------------------------------------------------------------

/** Repair service category taxonomy */
export type RepairCategory =
  | "glass"       // Cam işlemleri
  | "mechanism"   // Mekanizma tamiri
  | "seal"        // Conta ve fitil
  | "profile"     // Profil onarımı
  | "hardware"    // Aksesuar değişimi
  | "renovation"; // Yenileme / tadilat

/** Urgency classification for repair services */
export type UrgencyLevel = "low" | "medium" | "high";

/** Service availability / popularity indicator */
export type ServiceStatus = "available" | "popular" | "seasonal";

/** Visual badge displayed on the repair card */
export type RepairBadge = "En Sık" | "Acil" | "Mevsimsel" | "Yeni" | "Kampanya";

// ---------------------------------------------------------------------------
// Interfaces
// ---------------------------------------------------------------------------

/** Single step within a repair process */
export interface ProcessStep {
  /** 1-based ordering */
  order: number;
  /** Step title (Turkish) */
  title: string;
  /** Step description */
  description: string;
}

/** Form-field validation rule (used by RepairRequestForm) */
export interface ValidationRule {
  /** Pure predicate – returns true when the value is VALID */
  validate: (value: string) => boolean;
  /** Human-readable error message (Turkish) */
  message: string;
}

/** Repair-request form field state */
export interface FormFieldState {
  value: string;
  error: string | null;
  touched: boolean;
}

/** Shape of the full repair-request form */
export interface RepairRequestFormData {
  name: FormFieldState;
  phone: FormFieldState;
  district: FormFieldState;
  brand: FormFieldState;
  category: FormFieldState;
  description: FormFieldState;
  urgency: FormFieldState;
  preferredDate: FormFieldState;
}

/** Complete repair / renovation service record */
export interface RepairRecord {
  /** Unique machine-readable id (e.g. "cam-degisimi") */
  id: string;
  /** URL-safe slug — equals id for now, kept separate for flexibility */
  slug: string;
  /** Service title (Turkish) */
  title: string;
  /** Repair category */
  category: RepairCategory;
  /** Optional visual badge */
  badge?: RepairBadge;
  /** One-liner description */
  description: string;
  /** Extended description rendered in the detail modal */
  detailedDescription: string;
  /** Common issues / symptoms this service addresses */
  commonIssues: string[];
  /** Human-readable estimated duration */
  estimatedDuration: string;
  /** Urgency level */
  urgencyLevel: UrgencyLevel;
  /** Availability tag */
  status: ServiceStatus;
  /** Step-by-step process */
  processSteps: ProcessStep[];
  /** Warranty blurb */
  warranty: string;
  /** SEO keywords */
  keywords: string[];
  /** SVG icon key (looked up via iconMap in the UI) */
  icon: string;
}

// ---------------------------------------------------------------------------
// Category metadata (label + color token for badges)
// ---------------------------------------------------------------------------

export const categoryMeta: Record<
  RepairCategory,
  { label: string; color: string }
> = {
  glass:      { label: "Cam İşlemleri",        color: "bg-sky-100 text-sky-700" },
  mechanism:  { label: "Mekanizma Tamiri",      color: "bg-amber-100 text-amber-700" },
  seal:       { label: "Conta & Fitil",         color: "bg-emerald-100 text-emerald-700" },
  profile:    { label: "Profil Onarımı",        color: "bg-rose-100 text-rose-700" },
  hardware:   { label: "Aksesuar Değişimi",     color: "bg-violet-100 text-violet-700" },
  renovation: { label: "Yenileme & Tadilat",    color: "bg-indigo-100 text-indigo-700" },
};

// ---------------------------------------------------------------------------
// Repair records (12 PVC-specific services)
// ---------------------------------------------------------------------------

export const repairRecords: readonly RepairRecord[] = [
  // 1 ── Glass ──────────────────────────────────────────────────────────────
  {
    id: "cift-cam-unitesi-degisimi",
    slug: "cift-cam-unitesi-degisimi",
    title: "Çift Cam Ünitesi Değişimi",
    category: "glass",
    badge: "En Sık",
    description:
      "Buğulanan, çatlayan veya ısı yalıtımını kaybeden çift cam ünitelerin profesyonel değişimi.",
    detailedDescription:
      "Çift cam ünitesi (IGU — Insulated Glass Unit) zamanla kenar sızdırmazlığını kaybeder ve araya nem girer. Bu durum buğulanma, kötü görüntü ve ısı kaybına neden olur. Tüm pencereyi değiştirmeye gerek yoktur — sadece cam ünitesi değiştirilerek pencere ilk günkü performansına kavuşur. Egepen orijinal cam ünitesi veya eşdeğer kalitede ısı camlı ünite kullanıyoruz.",
    commonIssues: [
      "Cam arası buğulanma (nem / su damlacıkları)",
      "Çift cam arası beyazlaşma",
      "Cam ünitesinde çatlak veya kırık",
      "Isı yalıtımı kaybı — pencere soğuk geliyor",
      "Dışarıdan gelen ses artışı",
    ],
    estimatedDuration: "45-90 dk (pencere başına)",
    urgencyLevel: "medium",
    status: "popular",
    processSteps: [
      { order: 1, title: "Ölçü Alma", description: "Cam ünitesinin iç ölçüleri ve kalınlığı (örn. 4+16+4 mm) milimetrik doğrulukla alınır." },
      { order: 2, title: "Cam Siparişi", description: "Ölçülere uygun Low-E kaplamalı çift cam ünitesi sipariş edilir (1-3 iş günü)." },
      { order: 3, title: "Çıta Söküm", description: "Pencere cam çıtaları plastik spatula ile hasar vermeden sökülür." },
      { order: 4, title: "Eski Cam Çıkarma", description: "Eski cam ünitesi cam vantuzları ile güvenli şekilde çıkartılır." },
      { order: 5, title: "Yeni Cam Montaj", description: "Plastik takozlar yerleştirildikten sonra yeni cam ünitesi oturtulur." },
      { order: 6, title: "Çıta ve Test", description: "Çıtalar klipslere oturtulur. Sızdırmazlık ve kanat dengesi kontrol edilir." },
    ],
    warranty: "Cam ünitesi: 2 yıl üretici garantisi. İşçilik: 1 yıl.",
    keywords: ["çift cam değişimi", "cam buğulanması", "ısı camı değişimi", "cam ünitesi", "pencere camı değişimi"],
    icon: "glass",
  },
  {
    id: "tekli-cam-degisimi",
    slug: "tekli-cam-degisimi",
    title: "Tekli Cam Değişimi (Kırık Cam)",
    category: "glass",
    badge: "Acil",
    description:
      "Kırılan veya çatlayan tek camların güvenli şekilde sökülmesi ve yeni cam montajı.",
    detailedDescription:
      "Kırık cam hem güvenlik hem de hava/su yalıtımı açısından acil müdahale gerektirir. Ekibimiz aynı gün adresinize gelir, kırık cam parçalarını güvenle temizler ve uygun kalınlıkta yeni cam takar. Temperli cam, buzlu cam veya dekoratif cam seçenekleri mevcuttur.",
    commonIssues: [
      "Kırık veya çatlak cam",
      "Darbe sonucu cam hasarı",
      "Çocuk güvenliği için temperli cam talebi",
      "Cam değişimi sonrası fitil yenileme",
    ],
    estimatedDuration: "30-60 dk",
    urgencyLevel: "high",
    status: "available",
    processSteps: [
      { order: 1, title: "Güvenlik Önlemi", description: "Koruyucu eldiven ve gözlük ile kırık parçalar güvenle temizlenir." },
      { order: 2, title: "Çıta Söküm", description: "Cam çıtaları hasar vermeden sökülür." },
      { order: 3, title: "Ölçü ve Kesim", description: "Yeni cam ölçülere göre kesilir veya stoktan temin edilir." },
      { order: 4, title: "Montaj ve Sızdırmazlık", description: "Cam takozlar üzerine oturtulur, çıtalar ve fitiller takılır." },
    ],
    warranty: "Cam: Darbe hariç 1 yıl. İşçilik: 1 yıl.",
    keywords: ["kırık cam değişimi", "cam tamiri", "pencere camı kırıldı", "acil cam değişimi", "temperli cam"],
    icon: "broken-glass",
  },

  // 2 ── Mechanism ──────────────────────────────────────────────────────────
  {
    id: "espanyolet-tamiri",
    slug: "espanyolet-tamiri",
    title: "Espanyolet Mekanizması Tamiri",
    category: "mechanism",
    badge: "En Sık",
    description:
      "Boşa dönen, sıkışan veya kitlenmeyen pencere mekanizmalarının onarımı ve değişimi.",
    detailedDescription:
      "Espanyolet (espagnolette) mekanizması pencerenin kilit ve açma-kapama sistemini kontrol eder. Kol boşa dönüyor, pencere kapanmıyor veya kol tam dönmüyorsa mekanizmada arıza var demektir. Marka ve model farkı gözetmeksizin tüm PVC pencere mekanizmalarının tamiri ve değişimini yapıyoruz. Roto, Siegenia, Maco, GU ve Winkhaus yedek parça stoku bulunduruyoruz.",
    commonIssues: [
      "Pencere kolu boşa dönüyor",
      "Kol tam dönmüyor / takılıyor",
      "Pencere kilitlenmiyor",
      "Mekanizma sesi — çıtırtı, gıcırtı",
      "Pencere vasistas pozisyonda kaldı",
    ],
    estimatedDuration: "30-60 dk",
    urgencyLevel: "medium",
    status: "popular",
    processSteps: [
      { order: 1, title: "Arıza Teşhis", description: "Kol, mil ve espanyolet dişlisi kontrol edilerek arızanın kaynağı tespit edilir." },
      { order: 2, title: "Mekanizma Söküm", description: "Yan profil boyunca tespit vidaları sökülerek eski mekanizma çıkartılır." },
      { order: 3, title: "Parça Eşleştirme", description: "Ölçüye uygun yeni espanyolet (aynı marka/model) temin edilir." },
      { order: 4, title: "Montaj", description: "Yeni mekanizma vidalanır, kol takılır ve tüm pozisyonlarda test edilir." },
    ],
    warranty: "Mekanizma: 2 yıl. İşçilik: 1 yıl.",
    keywords: ["espanyolet tamiri", "pencere mekanizması", "pencere kilitlenmiyor", "kol boşa dönüyor", "pencere mekanizma değişimi"],
    icon: "mechanism",
  },

  // 3 ── Seal ───────────────────────────────────────────────────────────────
  {
    id: "pencere-contasi-degisimi",
    slug: "pencere-contasi-degisimi",
    title: "Pencere Contası (Fitil) Değişimi",
    category: "seal",
    badge: "En Sık",
    description:
      "Sertleşen, çatlayan veya yırtılan pencere contalarının EPDM kalitesinde yenilenmesi.",
    detailedDescription:
      "PVC pencere contaları (fitiller) ortalama 5-8 yılda sertleşir ve esnekliğini kaybeder. Sert conta rüzgâr sızıntısına, ses geçişine ve toz girişine neden olur. Tüm çevrede (kanat ve kasa) uyumlu EPDM conta profili ile değişim yapıyoruz. Işlem sırasında pencere sökülmez, yerinde yapılır.",
    commonIssues: [
      "Pencereden hava/rüzgâr sızıntısı",
      "Rüzgârda ıslık sesi",
      "Conta sertleşmesi veya çatlama",
      "Pencere kenarında toz birikimi",
      "Ses yalıtımı düşüşü",
    ],
    estimatedDuration: "15-30 dk (pencere başına)",
    urgencyLevel: "medium",
    status: "popular",
    processSteps: [
      { order: 1, title: "Eski Conta Söküm", description: "Eski conta köşeden başlayarak tamamı çekilir." },
      { order: 2, title: "Kanal Temizliği", description: "Conta kanalı ıslak bezle temizlenir, kuru bırakılır." },
      { order: 3, title: "Profil Eşleştirme", description: "Doğru kesit profilinde (E, D veya P) yeni EPDM conta seçilir." },
      { order: 4, title: "Yeni Conta Montajı", description: "Yeni conta germeye bırakmadan kanala oturtulur, köşe birleşimi yapılır." },
      { order: 5, title: "Kağıt Testi", description: "Kanat arasına kağıt sıkıştırarak sızdırmazlık doğrulanır." },
    ],
    warranty: "Conta malzeme: 2 yıl. İşçilik: 1 yıl.",
    keywords: ["pencere contası değişimi", "fitil değişimi", "EPDM conta", "pencere rüzgâr sızıntısı", "conta yenileme"],
    icon: "seal",
  },
  {
    id: "kapi-fitili-yenileme",
    slug: "kapi-fitili-yenileme",
    title: "PVC Kapı Fitili Yenileme",
    category: "seal",
    description:
      "PVC giriş kapısı ve balkon kapısı fitillerinin profesyonel değişimi.",
    detailedDescription:
      "Kapı fitilleri pencere contalarına göre daha kalın ve daha fazla baskıya maruz kalır. Kapanma zorluğu, hava sızıntısı veya kapı kenarındaki gıcırtı genellikle fitil yıpranmasından kaynaklanır. Orijinal profille uyumlu fitil kullanarak kapı sızdırmazlığını sağlıyoruz.",
    commonIssues: [
      "Kapı zorla kapanıyor",
      "Kapı kenarından hava geçişi",
      "Kapı gıcırtısı (fitil basıncı düzensiz)",
      "Alt eşik fitili yırtılmış",
    ],
    estimatedDuration: "20-40 dk",
    urgencyLevel: "low",
    status: "available",
    processSteps: [
      { order: 1, title: "Fitil Durumu Kontrolü", description: "Kasa ve kanat fitilleri ayrı ayrı kontrol edilir." },
      { order: 2, title: "Eski Fitil Söküm", description: "Eski fitiller çekilerek çıkartılır." },
      { order: 3, title: "Kanal Temizliği", description: "Fitil kanalları temizlenir." },
      { order: 4, title: "Yeni Fitil Montajı", description: "Kapı profil ölçüsüne uygun yeni fitil takılır." },
      { order: 5, title: "Kapanış Testi", description: "Kapı açılıp kapatılarak sızdırmazlık ve kolay kapanma kontrol edilir." },
    ],
    warranty: "Fitil malzeme: 2 yıl. İşçilik: 1 yıl.",
    keywords: ["kapı fitili değişimi", "PVC kapı contası", "balkon kapısı fitili", "kapı sızıntısı"],
    icon: "door-seal",
  },

  // 4 ── Hardware ───────────────────────────────────────────────────────────
  {
    id: "pencere-kolu-degisimi",
    slug: "pencere-kolu-degisimi",
    title: "Pencere Kolu Değişimi",
    category: "hardware",
    description:
      "Kırılan, gevşeyen veya estetik olarak yenilemek istediğiniz pencere kollarının değişimi.",
    detailedDescription:
      "PVC pencere kolu değişimi en basit ve hızlı pencere onarım işlemlerinden biridir. Kilitli (anahtarlı) kol seçeneği çocuk güvenliği için önemlidir. Hoppe, Roto ve GU marka dekoratif kol seçenekleri sunuyoruz. Tüm kollar 7×7 mm standart kare miline uygundur.",
    commonIssues: [
      "Kırık pencere kolu",
      "Gevşeyen kol — vidalar tutumuyor",
      "Çocuk güvenliği için kilitli kol talebi",
      "Estetik yenileme — renk/model değişimi",
    ],
    estimatedDuration: "5-10 dk (kol başına)",
    urgencyLevel: "low",
    status: "available",
    processSteps: [
      { order: 1, title: "Kapak Plaka Açma", description: "Kol tabanındaki plastik kapak 90° döndürülür." },
      { order: 2, title: "Eski Kolu Söküm", description: "2 vida sökülerek eski kol çıkartılır." },
      { order: 3, title: "Yeni Kol Montajı", description: "Yeni kol kare mile oturtulur ve vidalanır." },
      { order: 4, title: "Test", description: "Tüm pozisyonlarda (kapalı, aralık, vasistas) test edilir." },
    ],
    warranty: "Kol: 2 yıl üretici garantisi.",
    keywords: ["pencere kolu değişimi", "kilitli pencere kolu", "pencere aksesuar", "Hoppe kol"],
    icon: "handle",
  },
  {
    id: "mentese-degisimi-ayari",
    slug: "mentese-degisimi-ayari",
    title: "Menteşe Değişimi ve Ayarı",
    category: "hardware",
    description:
      "Sarkan, zorla açılan veya gıcırdayan pencere menteşelerinin ayarı ve gerekirse değişimi.",
    detailedDescription:
      "PVC pencere menteşeleri (alt menteşe + üst makas menteşe) zamanla aşınır ve kanat sarkar. Bu durum pencereyi kapatmayı zorlaştırır, contaya zarar verir ve kilit hizasını bozar. Çoğu durumda menteşe ayarı yeterlidir — Allen anahtarıyla yükseklik ve yanalık ayarı yapılır. Menteşe aşırı yıpranmışsa aynı marka-model yenisiyle değiştirilir.",
    commonIssues: [
      "Pencere kanadı sarkmış — alta sürünüyor",
      "Pencere açılırken zorlanma",
      "Menteşe gıcırtısı",
      "Kanat bir tarafa kayıyor — eşit boşluk yok",
      "Vasistas konumda kanat düşüyor",
    ],
    estimatedDuration: "15-45 dk",
    urgencyLevel: "medium",
    status: "available",
    processSteps: [
      { order: 1, title: "Durum Tespiti", description: "Kanat-kasa boşluk dengesi ve menteşe durumu kontrol edilir." },
      { order: 2, title: "Allen Ayarı", description: "Yükseklik (dikey) ve yanalık (yatay) ayarları yapılır." },
      { order: 3, title: "Yağlama", description: "Menteşe hareketli noktaları silikon bazlı sprey ile yağlanır." },
      { order: 4, title: "Değişim (Gerekirse)", description: "Aşırı yıpranmışsa kanat sökülür ve yeni menteşe takılır." },
      { order: 5, title: "Kapanış Testi", description: "Tüm pozisyonlarda rahat çalışma doğrulanır." },
    ],
    warranty: "Menteşe: 2 yıl. Ayar işçiliği: 6 ay.",
    keywords: ["pencere menteşe ayarı", "menteşe değişimi", "pencere sarkmış", "PVC pencere ayarı"],
    icon: "hinge",
  },

  // 5 ── Profile ────────────────────────────────────────────────────────────
  {
    id: "profil-kaynak-tamiri",
    slug: "profil-kaynak-tamiri",
    title: "PVC Profil Kaynak Tamiri",
    category: "profile",
    description:
      "Köşe kaynağı açılmış veya çatlamış PVC profillerin profesyonel onarımı.",
    detailedDescription:
      "PVC pencere profilleri köşelerde kaynak (termal füzyon) ile birleştirilir. Zaman, darbe veya yanlış montaj sonucu bu kaynak noktaları açılabilir. Açılan köşeden hava ve su sızar, profilin yapısal bütünlüğü zayıflar. Profesyonel kaynak makinesi ile yerinde kaynak tamiri yapıyoruz. Kaynak sonrası köşe temizleme ve boyama dahildir.",
    commonIssues: [
      "Köşe kaynağı açılmış — profil ayrılıyor",
      "Profil çatlağı — darbe hasarı",
      "Köşeden su sızıntısı",
      "Profil birleşim noktasında gevşeme",
    ],
    estimatedDuration: "30-60 dk (köşe başına)",
    urgencyLevel: "medium",
    status: "available",
    processSteps: [
      { order: 1, title: "Hasar Tespiti", description: "Kaynak açılma derecesi ve profil durumu kontrol edilir." },
      { order: 2, title: "Yüzey Hazırlığı", description: "Açılmış köşe temizlenir ve kaynak için hazırlanır." },
      { order: 3, title: "Kaynak İşlemi", description: "Taşınabilir kaynak makinesi ile köşe yeniden kaynaklanır." },
      { order: 4, title: "Temizleme ve Boyama", description: "Kaynak fazlalığı alınır, köşe düzeltilir ve boyası yapılır." },
      { order: 5, title: "Sızdırmazlık Testi", description: "Köşenin hava ve su geçirmezliği doğrulanır." },
    ],
    warranty: "Kaynak işçiliği: 2 yıl.",
    keywords: ["PVC profil kaynak", "köşe kaynağı tamiri", "profil çatlağı", "PVC kaynak makinesi"],
    icon: "welding",
  },
  {
    id: "darbe-hasari-onarimi",
    slug: "darbe-hasari-onarimi",
    title: "Darbe Hasarı Onarımı",
    category: "profile",
    badge: "Acil",
    description:
      "Çarpma, düşme veya hırsızlık girişimi sonucu hasar gören pencere ve kapıların acil onarımı.",
    detailedDescription:
      "Darbe sonucu profil kırılması, cam çatlağı, menteşe kopması veya kilit bozulması oluşabilir. Acil ekibimiz hasar tespiti yaparak profil, cam, mekanizma veya tüm kanetin değişimini gerçekleştirir. Hırsızlık girişimi sonrası güçlendirilmiş kilit ve cam seçenekleri sunuyoruz.",
    commonIssues: [
      "Profil kırılması — darbe / çarpma",
      "Hırsızlık girişimi sonrası hasar",
      "Inşaat / taşınma sırasında oluşan hasarlar",
      "Fırtına sonrası pencere hasarı",
    ],
    estimatedDuration: "1-3 saat (hasara göre değişir)",
    urgencyLevel: "high",
    status: "available",
    processSteps: [
      { order: 1, title: "Acil Değerlendirme", description: "Hasar kapsamı yerinde tespit edilir, güvenlik önlemi alınır." },
      { order: 2, title: "Geçici Koruma", description: "Açıklık geçici olarak kapatılır (plaka / nylon)." },
      { order: 3, title: "Parça Temini", description: "Gerekli profil, cam veya mekanizma temin edilir." },
      { order: 4, title: "Onarım / Değişim", description: "Hasarlı bileşenler onarılır veya yenisiyle değiştirilir." },
      { order: 5, title: "Güvenlik Testi", description: "Pencere/kapının güvenliği, sızdırmazlığı ve işlevselliği doğrulanır." },
    ],
    warranty: "Değişen parçaya göre 1-2 yıl.",
    keywords: ["pencere darbe hasarı", "acil pencere tamiri", "hırsızlık sonrası onarım", "pencere kırıldı"],
    icon: "impact",
  },

  // 6 ── Renovation ─────────────────────────────────────────────────────────
  {
    id: "pencere-folyo-kaplama",
    slug: "pencere-folyo-kaplama",
    title: "Pencere Folyo Kaplama (Renk Değişimi)",
    category: "renovation",
    badge: "Yeni",
    description:
      "Beyaz PVC pencerelerinize ahşap, antrasit veya özel renk görünümü kazandıran folyo kaplama.",
    detailedDescription:
      "PVC pencerelerinizi değiştirmeden dış görünümü tamamen yenileyebilirsiniz. Dış cephe dayanımlı RENOLIT veya Hornschuch folyo ile pencerelerinize ahşap (meşe, ceviz, maun), antrasit gri, krem veya özel renk uygulaması yapıyoruz. Folyo UV dayanımlıdır ve 10+ yıl renk solmasına karşı koruma sağlar.",
    commonIssues: [
      "Beyaz pencere görünümünü değiştirmek istiyorum",
      "Dış cephe yenileme — ahşap görünüm",
      "Bina yönetimi dış cephe renk uyumu talebi",
      "Eski sararmış pencere görüntüsü",
    ],
    estimatedDuration: "2-4 saat (pencere başına)",
    urgencyLevel: "low",
    status: "seasonal",
    processSteps: [
      { order: 1, title: "Renk Seçimi", description: "RENOLIT renk kataloğundan istenen renk/desen seçilir." },
      { order: 2, title: "Yüzey Hazırlığı", description: "Profil yüzeyi temizlenir, primer uygulanır." },
      { order: 3, title: "Folyo Kaplama", description: "Folyo ısıtılarak profil yüzeyine yapıştırılır ve köşeler katlanır." },
      { order: 4, title: "Detay ve Finisaj", description: "Kenarlar, köşeler ve fitil bölgeleri detaylandırılır." },
      { order: 5, title: "Kalite Kontrol", description: "Tüm yüzeyler kabarcık ve kırışık kontrolünden geçirilir." },
    ],
    warranty: "Folyo: 5 yıl renk garantisi. İşçilik: 2 yıl.",
    keywords: ["pencere folyo kaplama", "PVC renk değişimi", "ahşap görünüm pencere", "RENOLIT folyo", "pencere kaplama"],
    icon: "paint",
  },
  {
    id: "esik-denizlik-yenileme",
    slug: "esik-denizlik-yenileme",
    title: "Eşik ve Denizlik Yenileme",
    category: "renovation",
    description:
      "Çatlayan, sararan veya su sızdıran pencere eşikleri ve denizliklerin değişimi.",
    detailedDescription:
      "Pencere alt eşiği (iç denizlik) ve dış denizlik zamanla UV etkisi, darbe ve ısı değişimlerinden çatlayabilir veya sararabilir. Su biriktiren denizlik nem ve küf sorunlarına yol açar. Alüminyum, mermer veya PVC denizlik seçenekleri ile yenileme yapıyoruz.",
    commonIssues: [
      "Pencere alt eşiğinde çatlak",
      "Denizlik sararması / renk solması",
      "Denizlik altından su sızması",
      "Dış denizlik kopmuş veya eğilmiş",
    ],
    estimatedDuration: "30-60 dk (denizlik başına)",
    urgencyLevel: "low",
    status: "available",
    processSteps: [
      { order: 1, title: "Ölçü ve Malzeme Seçimi", description: "Denizlik ölçüleri alınır, malzeme seçimi yapılır (alüminyum, mermer, PVC)." },
      { order: 2, title: "Eski Denizlik Söküm", description: "Eski denizlik dikkatli şekilde sökülür." },
      { order: 3, title: "Yüzey Hazırlığı", description: "Alt zemin temizlenir, gerekirse yalıtım malzemesi uygulanır." },
      { order: 4, title: "Yeni Denizlik Montajı", description: "Yeni denizlik montaj köpüğü ve silikon ile sabitlenir." },
      { order: 5, title: "Silikon ve Finish", description: "Kenar silikonları çekilir, temizleme yapılır." },
    ],
    warranty: "Denizlik: 3 yıl. İşçilik: 1 yıl.",
    keywords: ["pencere denizlik değişimi", "eşik yenileme", "alüminyum denizlik", "pencere sızdırıyor"],
    icon: "sill",
  },
  {
    id: "komple-pencere-revizyonu",
    slug: "komple-pencere-revizyonu",
    title: "Komple Pencere Revizyonu",
    category: "renovation",
    badge: "Kampanya",
    description:
      "Pencerelerinizin tüm aksesuarlarını — conta, kol, mekanizma, menteşe — tek seferde yeniliyoruz.",
    detailedDescription:
      "15 yaş üzeri pencerelerde conta sertleşir, mekanizma yıpranır, menteşe gevşer ve kol kırılır. Tüm bu sorunları tek tek çözmek yerine Komple Revizyon Paketi ile pencerelerinizin tüm hareketli parçalarını bir seferde yeniliyoruz. Sonuç: ilk günkü performans, daha az enerji kaybı, sessiz çalışma. Pencere profili sağlamsa değişime gerek yoktur — sadece aksesuar yenileme yeterlidir.",
    commonIssues: [
      "Eski pencere — birden fazla sorun var",
      "Pencereyi değiştirmeden yenilemek istiyorum",
      "Kiracı/satış öncesi pencere bakımı",
      "Enerji performansını iyileştirmek istiyorum",
    ],
    estimatedDuration: "1-2 saat (pencere başına)",
    urgencyLevel: "low",
    status: "popular",
    processSteps: [
      { order: 1, title: "Ücretsiz Keşif", description: "Tüm pencereler kontrol edilir, hasar raporu çıkartılır." },
      { order: 2, title: "Parça Listesi", description: "Her pencere için gerekli parçalar listelenir ve sipariş edilir." },
      { order: 3, title: "Conta Değişimi", description: "Tüm fitiller yeni EPDM conta ile değiştirilir." },
      { order: 4, title: "Mekanizma ve Kol", description: "Espanyolet mekanizmaları ve kollar yenilenir." },
      { order: 5, title: "Menteşe ve Ayar", description: "Menteşeler kontrol/değişim yapılır, kanat ayarları yapılır." },
      { order: 6, title: "Final Test", description: "Her pencere tüm pozisyonlarda test edilir, sızdırmazlık doğrulanır." },
    ],
    warranty: "Tüm parçalar: 2 yıl. İşçilik: 1 yıl.",
    keywords: ["pencere revizyonu", "komple pencere bakımı", "pencere yenileme", "PVC pencere tadilat", "pencere aksesuar değişimi"],
    icon: "overhaul",
  },
];

// ---------------------------------------------------------------------------
// Process / status flow (informational — shown as a visual timeline)
// ---------------------------------------------------------------------------

export interface StatusFlowStep {
  id: string;
  label: string;
  description: string;
  icon: string;
}

export const repairStatusFlow: readonly StatusFlowStep[] = [
  { id: "talep",  label: "Talep",   description: "Telefon, WhatsApp veya form ile bize ulaşın.", icon: "phone" },
  { id: "kesif",  label: "Keşif",   description: "Uzman teknisyenimiz aynı gün adresinize gelir.", icon: "search" },
  { id: "teklif", label: "Teklif",  description: "Yerinde fiyat teklifi — ücretsiz.", icon: "document" },
  { id: "onarim", label: "Onarım",  description: "Orijinal yedek parça ile profesyonel onarım.", icon: "wrench" },
  { id: "teslim", label: "Teslim",  description: "Test, temizlik ve garanti belgesi teslimi.", icon: "check" },
];

// ---------------------------------------------------------------------------
// PVC brand options (for repair-request form)
// ---------------------------------------------------------------------------

export const pvcBrandOptions: readonly string[] = [
  "Egepen (Deceuninck)",
  "Pimapen",
  "Winsa",
  "Rehau",
  "Kömmerling",
  "Veka",
  "Schüco",
  "Profine",
  "Diğer / Bilmiyorum",
];

// ---------------------------------------------------------------------------
// Validation helpers (lightweight alternative to Zod — no extra dependency)
// ---------------------------------------------------------------------------

/** Pre-built validation rules re-exported for the form component */
export const validationRules = {
  required: (label: string): ValidationRule => ({
    validate: (v) => v.trim().length > 0,
    message: `${label} zorunludur.`,
  }),
  minLength: (label: string, min: number): ValidationRule => ({
    validate: (v) => v.trim().length >= min,
    message: `${label} en az ${min} karakter olmalıdır.`,
  }),
  maxLength: (label: string, max: number): ValidationRule => ({
    validate: (v) => v.trim().length <= max,
    message: `${label} en fazla ${max} karakter olmalıdır.`,
  }),
  turkishPhone: (): ValidationRule => ({
    validate: (v) => /^(05\d{2}[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}|0\d{3}[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2})$/.test(v.trim()),
    message: "Geçerli bir telefon numarası giriniz (ör. 0536 640 53 11).",
  }),
};

// ---------------------------------------------------------------------------
// Pure query helpers (DRY — single source of truth for filtering)
// ---------------------------------------------------------------------------

/** Get a single repair record by slug */
export function getRepairBySlug(slug: string): RepairRecord | undefined {
  return repairRecords.find((r) => r.slug === slug);
}

/** Get all repair records for a given category */
export function getRepairsByCategory(category: RepairCategory): RepairRecord[] {
  return repairRecords.filter((r) => r.category === category);
}

/** Get all unique categories that have at least one record */
export function getActiveCategories(): RepairCategory[] {
  return [...new Set(repairRecords.map((r) => r.category))];
}

/** Get all records sorted by urgency (high → medium → low) */
export function getRepairsByUrgency(): RepairRecord[] {
  const order: Record<UrgencyLevel, number> = { high: 0, medium: 1, low: 2 };
  return [...repairRecords].sort((a, b) => order[a.urgencyLevel] - order[b.urgencyLevel]);
}

/** Count records per category */
export function getRecordCountByCategory(): Record<RepairCategory, number> {
  const counts = {} as Record<RepairCategory, number>;
  for (const r of repairRecords) {
    counts[r.category] = (counts[r.category] || 0) + 1;
  }
  return counts;
}
