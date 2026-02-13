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
// SEO Metadata — Google'da en çok aranan pencere/cam balkon tamir aramaları
// ---------------------------------------------------------------------------
export const metadata: Metadata = {
  title:
    "Pencere Tamiri Rehberi | Mekanizma · Kilit · Menteşe · Cam Çıtası · Kol Değişimi — 0212 880 15 07",
  description:
    "Pencere mekanizması boşa mı dönüyor? Kilit kitlenmiyor mu? Cam çıtası nasıl sökülür? PVC pencere kolu nasıl değiştirilir? Adım adım tamir rehberi + profesyonel servis. Beylikdüzü ☎ 0212 880 15 07",
  keywords: [
    // Mekanizma & kilit aramaları
    "pencere mekanizması boşa dönüyor",
    "pencere kilidi kitlenmiyor",
    "pencere kapanmıyor ne yapmalıyım",
    "pvc pencere kilit arızası",
    "pencere kolu boşa dönüyor",
    "espanyolet mekanizma tamiri",
    "pencere mekanizması nasıl çalışır",
    "kilit dili çıkmıyor pencere",
    // Karşılık ayarı aramaları
    "pencere karşılığı nasıl ayarlanır",
    "kilit karşılığı ayarı nasıl yapılır",
    "pencere karşılık vidası ayarı",
    "pencere kapanınca hava alıyor karşılık",
    // WC kilidi aramaları
    "WC kilidi nasıl kitlenir",
    "tuvalet kapısı kilidi tamiri",
    "WC kilit mekanizması arızası",
    "banyo kapısı kilitlemiyor",
    // Menteşe aramaları
    "pencere menteşesi nasıl sökülür",
    "PVC pencere menteşe değişimi",
    "menteşe ayarı nasıl yapılır",
    "pencere menteşesi gevşedi",
    "vasistas menteşe tamiri",
    // Pencere kolu aramaları
    "pencere kolu nasıl sökülür",
    "pencere kolu nasıl takılır",
    "pencere kolu değişimi",
    "pencere kolu kırıldı ne yapmalıyım",
    "PVC pencere kolu fiyatı",
    // Cam söküm/çıta aramaları
    "cam çıtası nasıl sökülür",
    "PVC pencere camı nasıl çıkar",
    "çift cam değişimi nasıl yapılır",
    "cam çıtası nasıl çıkartılır",
    "pencere camı kırıldı ne yapmalıyım",
    "ısıcam buğulanması çözümü",
    // Conta & bakım aramaları
    "pencere contası nasıl değiştirilir",
    "PVC pencere conta değişimi",
    "pencereden hava giriyor çözümü",
    "pencere bakımı nasıl yapılır",
    // Genel tamir aramaları
    "Beylikdüzü pencere tamiri",
    "İstanbul PVC pencere servisi",
    "pencere tamircisi ara",
    "cam balkon tamiri",
    "sineklik tamiri",
    "panjur tamiri",
    "alüminyum doğrama tamiri",
    "duşakabin tamiri",
  ],
  alternates: {
    canonical: `${businessConfig.siteUrl}/tamir-bakim`,
  },
  openGraph: {
    title: "Pencere Tamiri Rehberi + Profesyonel Servis — Egepen Akçayapı",
    description:
      "Mekanizma, kilit, menteşe, cam çıtası, pencere kolu sorunları için adım adım rehber. Kendiniz çözemezseniz biz geliyoruz. ☎ 0212 880 15 07",
    type: "website",
    locale: "tr_TR",
    url: `${businessConfig.siteUrl}/tamir-bakim`,
  },
};

// ---------------------------------------------------------------------------
// Structured Data
// ---------------------------------------------------------------------------
function buildServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Pencere & Doğrama Tamir Bakım Hizmetleri",
    description:
      "PVC pencere mekanizma tamiri, kilit onarımı, menteşe değişimi, cam çıtası ve cam değişimi, pencere kolu takma, sineklik, cam balkon, panjur, alüminyum doğrama, duşakabin servisi.",
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
  };
}

// ---------------------------------------------------------------------------
// HowTo Guides data — Google'da en çok aranan pencere tamir soruları
// ---------------------------------------------------------------------------
interface HowToGuide {
  id: string;
  title: string;
  seoTitle: string;
  description: string;
  difficulty: "Kolay" | "Orta" | "Zor";
  duration: string;
  tools: string[];
  steps: { title: string; detail: string }[];
  warning: string;
  proTip: string;
}

const howToGuides: HowToGuide[] = [
  {
    id: "mekanizma-bosa-donuyor",
    title: "Pencere Mekanizması Boşa Dönüyor — Ne Yapmalı?",
    seoTitle: "Pencere mekanizması boşa dönüyor çözümü",
    description:
      "Pencere kolunu çevirdiğinizde mekanizma boşa dönüyor ve pencere kitlenmiyorsa, genellikle espanyolet mekanizmasında bir kopukluk veya kol bağlantısında bir arıza vardır. Bu sorun pencereyi açık/kapalı konumda kilitleyememek anlamına gelir ve güvenlik riski oluşturur.",
    difficulty: "Orta",
    duration: "20-40 dk",
    tools: ["Torx tornavida (T15/T20)", "Düz tornavida", "Pense"],
    steps: [
      {
        title: "Kolu çıkartın",
        detail: "Kolun altındaki plastik kapağı 90° çevirerek açın. Altındaki 2 adet vidayı sökerek kolu çıkartın.",
      },
      {
        title: "Kare mil (spindle) kontrolü",
        detail: "Kol deliğinden içeri bakın. 7×7 mm kare milin yerinde olup olmadığını kontrol edin. Mil kırılmışsa yenisiyle değiştirin.",
      },
      {
        title: "Espanyolet bağlantısını kontrol edin",
        detail: "Pencere kanadını açın ve kenar profildeki espanyolet mekanizmasını inceleyin. Mekanizmanın kol milinin oturduğu dişli kısma bağlı olup olmadığını kontrol edin.",
      },
      {
        title: "Kırık/aşınmış parçayı belirleyin",
        detail: "Espanyolet dişlisi kırılmışsa tüm mekanizma değiştirilmelidir. Sadece kol mili aşınmışsa mil yeterlidir.",
      },
      {
        title: "Parça değişimi yapın",
        detail: "Eski mekanizmayı sökün (yan profil boyunca tespit vidaları vardır). Aynı marka/model yeni espanyoleti takın ve vidaları sıkın.",
      },
      {
        title: "Test edin",
        detail: "Kolu takıp tüm pozisyonlarda (kapalı, aralık, vasistas) test edin. Her pozisyonda mekanizma düzgün çalışmalı.",
      },
    ],
    warning:
      "Espanyolet mekanizması pencere boyutuna göre özel üretilir. Yanlış ölçü takarsanız pencere tamamen kitlenmez. Ölçüyü bilmiyorsanız mutlaka profesyonel destek alın.",
    proTip:
      "Mekanizma boşa dönüyorsa pencereyi kapalı pozisyonda bırakın ve kolu zorlamayın. Zorlamak iç dişlileri daha fazla aşındırır.",
  },
  {
    id: "kilit-kitlenmiyor",
    title: "Pencere Kilidi Kitlenmiyor / Kapanmıyor — Çözüm Rehberi",
    seoTitle: "Pencere kilidi kitlenmiyor kapanmıyor çözümü",
    description:
      "Pencereyi kapattığınızda kol tam dönmüyor, kilit dili karşılığa girmiyor veya pencere tam kapanmıyorsa, bunun birden fazla nedeni olabilir: karşılık ayarsızlığı, ekspanyolet arızası, menteşe düşmesi veya conta şişmesi.",
    difficulty: "Orta",
    duration: "15-30 dk",
    tools: ["Torx tornavida (T15/T20)", "4 mm Allen anahtar", "Yağlama spreyi"],
    steps: [
      {
        title: "Sorunu teşhis edin",
        detail: "Pencereyi yavaşça kapatın ve kolun nerede takıldığını gözlemleyin. Kilit dili karşılığa girmiyor mu? Kanat kasaya değmiyor mu? Kol tam dönmüyor mu?",
      },
      {
        title: "Karşılık ayarını kontrol edin",
        detail: "Kasa üzerindeki kilit karşılıklarının vidalarını bulun. Karşılık plakasının üst/alt ve iç/dış yönde ayarlanabilir olduğunu göreceksiniz. Karşılığı kilit diline hizalayın.",
      },
      {
        title: "Menteşe ayarı yapın",
        detail: "Kanat aşağı düşmüşse, alt menteşedeki dikey ayar vidasını (üstten Allen anahtarıyla) saat yönünde çevirerek kanadı yukarı kaldırın.",
      },
      {
        title: "Espanyoleti yağlayın",
        detail: "Mekanizmanın tüm hareketli noktalarına silikon bazlı yağlama spreyi sıkın. WD-40 kullanmayın, toz çeker.",
      },
      {
        title: "Contayı kontrol edin",
        detail: "Conta şişmiş veya yerinden çıkmışsa pencere düzgün kapanmaz. Gerekirse contayı düzeltin veya değiştirin.",
      },
      {
        title: "Test edin",
        detail: "Pencereyi kapatıp kolu tüm pozisyonlarda deneyin. Sürtünme olmadan, zorlanmadan dönmeli ve her pozisyonda kitlenmelidir.",
      },
    ],
    warning:
      "Kolu zorla çevirmeye çalışmayın. Mekanizma içindeki dişliler kırılabilir ve tamiri çok daha pahalıya gelir.",
    proTip:
      "Kış aylarında pencere kapanmama sorunu artar çünkü soğukta profil hafifçe büzülür, yaz sıcağında genleşir. Mevsimsel karşılık ayarı yapılmalıdır.",
  },
  {
    id: "karsılik-ayari",
    title: "Pencere Karşılığı Nasıl Ayarlanır? (Kilit Karşılık Ayarı)",
    seoTitle: "Pencere karşılığı nasıl ayarlanır kilit karşılık ayarı",
    description:
      "Pencere tam kapanmıyorsa veya rüzgârda çıtırdıyorsa genellikle karşılık ayarı bozulmuştur. Karşılık plakası, kilit dilinin oturduğu kasa üzerindeki metal parçadır. Doğru ayar yapıldığında pencere sımsıkı kapanır ve hava/su sızıntısı durur.",
    difficulty: "Kolay",
    duration: "10-15 dk",
    tools: ["Torx tornavida (T15)", "4 mm Allen anahtar"],
    steps: [
      {
        title: "Karşılık plakalarını bulun",
        detail: "Pencere kasasının kanat tarafına bakın. Kilit dillerinin temas ettiği noktada metal plakalar göreceksiniz. Genelde her pencerede 2-4 adet karşılık vardır.",
      },
      {
        title: "Mevcut hizalamayı kontrol edin",
        detail: "Pencereyi kapatın ve kolu yavaşça çevirin. Kilit dilinin karşılık plakasının ortasına girip girmediğini gözlemleyin. Dil plakanın dışında kalıyorsa ayar gereklidir.",
      },
      {
        title: "Karşılık vidasını gevşetin",
        detail: "Karşılık plakasının tespit vidasını (genelde Torx) yarım tur gevşetin. Tam çıkarmayın.",
      },
      {
        title: "Plakayı kaydırarak ayarlayın",
        detail: "Plakayı kilit diline doğru (içeri veya dışarı) kaydırın. Bazı karşılıklarda eksantrik (döndürmeli) ayar mekanizması vardır — Allen anahtarıyla çevirin.",
      },
      {
        title: "Sıkma ve test",
        detail: "Ayar sonrası vidayı sıkıca sıkın. Pencereyi kapatıp-açın, kol rahat dönmeli ve kilit dili karşılığa tam oturmalıdır.",
      },
    ],
    warning:
      "Her karşılığı bağımsız ayarlayın. Aynı anda tüm vidaları gevşetirseniz referans noktanızı kaybedersiniz.",
    proTip:
      "Pencere kasa ile kanat arasında eşit boşluk bırakılmalıdır. Boşluk bir tarafta fazlaysa, sorun karşılıkta değil menteşe ayarındadır.",
  },
  {
    id: "wc-kilidi-tamiri",
    title: "WC Kilidi Nasıl Kitlenir? Tuvalet Kapısı Kilit Tamiri",
    seoTitle: "WC kilidi nasıl kitlenir tuvalet kapısı kilit tamiri",
    description:
      "WC (tuvalet/banyo) kapısı kilidi, döner topuz ile kilitlenen özel bir mekanizmadır. Topuz döndüğünde kilit dili çıkar ve kapıyı kilitler. Kilit arızalandığında topuz boşa döner, dil çıkmaz veya geri çekilmez. Bu durum genelde iç mekanizma aşınmasından kaynaklanır.",
    difficulty: "Kolay",
    duration: "15-25 dk",
    tools: ["Yıldız tornavida", "Düz tornavida", "Yeni WC kilit gövdesi (gerekirse)"],
    steps: [
      {
        title: "Topuz/rozeti sökün",
        detail: "WC kilidi topuzunun kenarındaki veya altındaki küçük tespit vidasını bulun. Vidayı sökerek topuzu çıkartın. Altındaki rozet plakasını da çıkartın.",
      },
      {
        title: "Kilit gövdesini çıkartın",
        detail: "Kapının boy tarafındaki (dar kenar) 2 adet tespit vidasını sökün. Kilit gövdesi kapının içinden çıkar.",
      },
      {
        title: "Mekanizmayı kontrol edin",
        detail: "Kilit gövdesindeki dili parmağınızla ileri-geri itin. Sert dönüyor, takılıyor veya geri yay yapmıyorsa mekanizma aşınmıştır. Dili döndüren cam (profil) parçası kırılmış olabilir.",
      },
      {
        title: "Yeni kilit gövdesi takın",
        detail: "Aynı ölçüde (backset: 40 mm veya 50 mm) yeni WC kilit gövdesi alın. Ters yönde (dil kapanma tarafına bakmalı) takmamaya dikkat edin. Vidalarla kilidi sabitleyin.",
      },
      {
        title: "Topuz ve rozeti geri takın",
        detail: "Kare mili (spindle) kilit gövdesine geçirin, topuzu takın ve tespit vidasını sıkın. Her iki taraftan topuzu döndürerek test edin.",
      },
    ],
    warning:
      "WC kilidi backset (mandal mesafesi) ölçüsü önemlidir. Ölçmeyi bilmiyorsanız eski kilidi yanınıza alarak nalburiye gidin.",
    proTip:
      "WC kilit mekanizmasını yılda bir kez grafit tozu veya silikon sprey ile yağlayın. Banyo neminden dolayı iç parçalar paslanır.",
  },
  {
    id: "mentese-nasil-sokulur",
    title: "Pencere Menteşesi Nasıl Sökülür ve Değiştirilir?",
    seoTitle: "Pencere menteşesi nasıl sökülür değiştirilir ayarlanır",
    description:
      "PVC pencere menteşeleri (alt menteşe, üst makas menteşe) zamanla aşınır. Kanat sarkar, pencere zorlanır veya tam kapanmaz. Menteşe söküm ve değişimi dikkat gerektirir çünkü ağır cam kanat düşebilir.",
    difficulty: "Zor",
    duration: "30-60 dk",
    tools: [
      "Torx tornavida seti",
      "4-5 mm Allen anahtar",
      "Çekiç (küçük)",
      "Düz tornavida (kaldıraç)",
      "Yardımcı kişi (kanat tutmak için)",
    ],
    steps: [
      {
        title: "Kanadı destekleyin",
        detail: "Pencere kanadını 90° açın. Birinin kanadı tutması veya altına destekleme koymak gerekir. Kanat ağırdır (çift cam ~ 25-40 kg).",
      },
      {
        title: "Üst makas menteşeyi ayırın",
        detail: "Üst menteşe (makas) bağlantı pimini bulun. Pimin üstünden düz tornavida ile bastırarak veya alttan çekiçle vurarak pimi aşağı itin. Pim çıkınca kanat üst taraftan serbest kalır.",
      },
      {
        title: "Kanadı kaldırarak alt menteşeden çıkartın",
        detail: "Kanadı düz yukarı kaldırın. Alt menteşenin pim üzerinden kayarak çıkmasını sağlayın. Kanat artık tamamen serbest.",
      },
      {
        title: "Eski menteşeyi sökün",
        detail: "Kasa ve kanat üzerindeki menteşe vidalarını sökün. Menteşe marka ve modelini not alın.",
      },
      {
        title: "Yeni menteşeyi takın",
        detail: "Aynı marka/model (Roto, Siegenia, Maco vb.) yeni menteşeyi kanata ve kasaya vidalayla sabitleyin.",
      },
      {
        title: "Kanadı geri takın",
        detail: "Kanadı alt menteşe pimine oturtun, üst makas pimini geri itin. Tüm pozisyonlarda test edin.",
      },
    ],
    warning:
      "Pencere kanadı çok ağırdır. Tek başınıza çıkarmayı denemeyin. Kanat düşerse hem cam kırılır hem yaralanabilirsiniz. Bu işlem için profesyonel çağırmanızı öneriyoruz.",
    proTip:
      "Menteşe ayarı (aşağı düşme, yana kayma) genellikle menteşedeki Allen vidalarıyla yapılabilir. Değişim gerekmeyebilir — önce ayarı deneyin.",
  },
  {
    id: "pencere-kolu-degisimi",
    title: "Pencere Kolu Nasıl Sökülür ve Nasıl Takılır?",
    seoTitle: "Pencere kolu nasıl sökülür takılır değiştirilir",
    description:
      "PVC pencere kolu değişimi en basit pencere tamir işlemlerinden biridir. Kol kırıldığında, gevşediğinde veya estetik olarak değiştirmek istediğinizde 5 dakikada kendiniz yapabilirsiniz.",
    difficulty: "Kolay",
    duration: "5-10 dk",
    tools: ["Yıldız tornavida (PH2)"],
    steps: [
      {
        title: "Kapak plakasını açın",
        detail: "Pencere kolunun tabanındaki plastik kapak plakasını bulun. Bu plaka dikdörtgen şeklindedir. Parmağınızla veya düz tornavida ile 90° döndürün — altında 2 vida görünecektir.",
      },
      {
        title: "Vidaları sökün",
        detail: "2 adet vidayı tornavida ile sökün. Vidalar uzun olabilir, sabırla çevirmeye devam edin.",
      },
      {
        title: "Eski kolu çıkartın",
        detail: "Vidalar çıktıktan sonra kolu kendine doğru çekerek çıkartın. İçerdeki kare mil (7×7 mm) görünecek.",
      },
      {
        title: "Yeni kolu takın",
        detail: "Yeni kolu kare mil üzerine oturtun. Kolun yönüne dikkat edin — aşağı baktığında kapalı pozisyonda olmalıdır.",
      },
      {
        title: "Vidaları sıkın ve kapağı kapatın",
        detail: "Vidaları tekrar sıkın (aşırı sıkmayın, profil çatlayabilir). Kapak plakasını geri döndürerek kapatın. Tüm pozisyonlarda test edin.",
      },
    ],
    warning:
      "Kol alırken kare mil ölçüsünü (7×7 mm standart) ve pin aralığını (vida deliği mesafesi: genelde 43 mm) kontrol edin. Yanlış ölçü uyum sağlamaz.",
    proTip:
      "Kilitli pencere kolu (anahtarlı) almak çocuk güvenliği için çok önemlidir. Özellikle yüksek katlarda mutlaka kilitli kol kullanın.",
  },
  {
    id: "cam-citasi-nasil-sokulur",
    title: "Cam Çıtası Nasıl Sökülür ve Çıkartılır?",
    seoTitle: "Cam çıtası nasıl sökülür çıkartılır PVC pencere",
    description:
      "PVC pencere cam çıtaları, camı profil içinde tutan plastik parçalardır. Cam değişimi, çift cam buğulanması veya conta yenileme için çıtaların sökülmesi gerekir. Çıtalar klipsli (snap-in) sisteme sahiptir.",
    difficulty: "Orta",
    duration: "10-20 dk (pencere başına)",
    tools: [
      "Plastik spatula veya çıta sökme aleti",
      "Lastik çekiç (isteğe bağlı)",
      "Koruyucu eldiven",
    ],
    steps: [
      {
        title: "Uzun çıtayla başlayın",
        detail: "Her zaman en uzun çıtayla (genelde yan çıtalar) başlayın. Kısa çıtalar eğilmeye daha dayanıklıdır.",
      },
      {
        title: "Spatulayı çıta ile profil arasına sokun",
        detail: "Çıtanın ortasına doğru plastik spatulayı hafifçe sokun. Metal tornavida kullanmayın — profili çizer.",
      },
      {
        title: "Çıtayı kaldırın",
        detail: "Spatulayı hafifçe kaldırarak çıtayı klipsten ayırın. 'Klik' sesiyle çıkacaktır. Bir ucundan diğerine doğru ilerleyin.",
      },
      {
        title: "Tüm çıtaları sırayla çıkartın",
        detail: "Uzun → kısa sırasıyla tüm 4 çıtayı çıkartın. Çıtaları karıştırmamak için hangi kenardan çıktığını işaretleyin.",
      },
      {
        title: "Camı çıkartın (gerekirse)",
        detail: "Çıtalar söküldükten sonra cam, lastik takozlar üzerinde durmaktadır. Camı dikkatli şekilde öne doğru eğiterek çıkartın. Çift cam ağırdır (4+16+4 mm ~ 20 kg/m²).",
      },
      {
        title: "Geri takma",
        detail: "Cam takozlarını yerleştirdikten sonra camı oturtun. Kısa çıtaları önce, uzun çıtaları en son takın. Çıtayı profil kanalına bastırarak klipslere oturtun.",
      },
    ],
    warning:
      "Cam çıtasını sökerken asla metal alet kullanmayın. PVC profilde kalıcı çizik ve hasar oluşur. Cam ağırdır — düşürürseniz kırılır ve yaralanma riski vardır.",
    proTip:
      "Çift cam buğulanıyorsa (cam arasında nem/buğu) cam ünitesi ömrünü tamamlamış demektir. Sadece cam ünitesi değiştirilerek sorun çözülür — tüm pencereyi değiştirmeye gerek yoktur.",
  },
  {
    id: "cam-nasil-sokulur",
    title: "PVC Pencere Camı Nasıl Sökülür ve Değiştirilir?",
    seoTitle: "Pencere camı nasıl sökülür değiştirilir kırık cam ne yapılır",
    description:
      "Pencere camınız kırıldıysa veya çift cam buğulanıyorsa cam değişimi gerekir. İşlem: çıtaları sök → eski camı çıkar → yeni camı tak → çıtaları geri tak. Ancak cam çok ağır ve kırılgandır, profesyonel yardım önerilir.",
    difficulty: "Zor",
    duration: "30-45 dk",
    tools: [
      "Plastik çıta sökme aleti",
      "Cam taşıma vantuzları",
      "Cam takozları (plastik)",
      "Koruyucu eldiven ve gözlük",
      "Yardımcı kişi",
    ],
    steps: [
      {
        title: "Güvenlik önlemleri alın",
        detail: "Koruyucu eldiven ve gözlük takın. Kırık cam varsa parçaları dikkatli toplayın. Çalışma alanını temizleyin.",
      },
      {
        title: "Cam çıtalarını sökün",
        detail: "Plastik spatula ile çıtaları tek tek çıkartın (detay için 'Cam çıtası nasıl sökülür' rehberine bakın).",
      },
      {
        title: "Eski camı çıkartın",
        detail: "Vantuzları cam yüzeyine yapıştırın. Camı hafifçe öne doğru eğiterek profil yuvasından çıkartın. Cam ağırdır — mutlaka iki kişi taşıyın.",
      },
      {
        title: "Cam yuvasını temizleyin",
        detail: "Profil içindeki cam yuvasını temizleyin. Eski takozları çıkartın. Drenaj deliklerinin açık olduğunu kontrol edin.",
      },
      {
        title: "Yeni camı ölçülendirin",
        detail: "Yeni cam siparişi için iç ölçüleri milimetrik doğrulukla alın. Cam kalınlığını (4+16+4 mm, 4+12+4 mm vb.) not edin.",
      },
      {
        title: "Yeni camı yerleştirin",
        detail: "Plastik takozları doğru pozisyonlara yerleştirin (köşelere ve ortalara). Camı takozlar üzerine oturtun. Çıtaları kısa → uzun sırasıyla geri takın.",
      },
    ],
    warning:
      "Cam değişimi tehlikeli bir iştir. Çift cam çok ağır ve kaygan olabilir. Düşen cam ağır yaralanmaya neden olur. Bu işlemi profesyonele bırakmanızı şiddetle öneriyoruz.",
    proTip:
      "Kırık cam acil durum değilse pencereyi kapatıp bantla sabitleyin ve profesyonel ekip gelene kadar bekleyin. Geçici cam filmi veya mukavva ile kapatamazsınız — hava/su sızar.",
  },
  {
    id: "pencere-conta-degisimi",
    title: "PVC Pencere Contası Nasıl Değiştirilir?",
    seoTitle: "Pencere contası nasıl değiştirilir PVC pencere conta değişimi",
    description:
      "Pencerenizden hava giriyor, rüzgâr sesi duyuluyor veya su sızıyorsa büyük ihtimalle conta ömrünü tamamlamıştır. PVC pencere contaları 5-8 yılda bir yenilenmeli. Conta değişimi kendiniz yapabileceğiniz basit bir işlemdir.",
    difficulty: "Kolay",
    duration: "15-30 dk (pencere başına)",
    tools: ["Düz tornavida (ince)", "Makas", "Yeni EPDM conta (metraj)"],
    steps: [
      {
        title: "Eski contayı çıkartın",
        detail: "Conta köşelerinden birini düz tornavida ile kaldırarak başlatın. Contayı tüm çevre boyunca çekerek çıkartın. Genelde tek parça halinde çıkar.",
      },
      {
        title: "Conta kanalını temizleyin",
        detail: "Profildeki conta kanalında biriken toz ve kiri ıslak bezle silin. Kanal tamamen temiz ve kuru olmalıdır.",
      },
      {
        title: "Doğru conta profilini belirleyin",
        detail: "PVC pencere contaları farklı profillerde gelir: E profil, D profil, P profil. Eski contanın kesit şeklini not alın ve aynısından alın.",
      },
      {
        title: "Yeni contayı takın",
        detail: "Köşeden başlayarak yeni contanın fitil dudağını kanala itin. Contayı germeyin — doğal uzunluğuyla ilerleyin. Köşelerde düzgün döndürün.",
      },
      {
        title: "Birleşim noktası ve test",
        detail: "Contanın başlangıç ve bitiş noktasını köşede birleştirin. Fazla contayı kesin. Pencereyi kapatıp test edin — kağıt testi yapın (kapata arasında kağıt sıkışmazsa conta yeterli basınç yapmıyor).",
      },
    ],
    warning:
      "Yanlış profilde conta takarsanız pencere tam kapanmaz veya conta yeterli sızdırmazlık sağlamaz. Eski bir parça contayı nalburiyeye götürüp eşleştirin.",
    proTip:
      "Contaları yılda 2 kez silikon bazlı bakım spreyi ile silin. Bu conta esnekliğini korur, sertleşmeyi geciktirir ve ömrünü uzatır.",
  },
];

// ---------------------------------------------------------------------------
// HowTo Schema builder — Google Arama için
// ---------------------------------------------------------------------------
function buildHowToSchemas() {
  return howToGuides.map((guide) => ({
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: guide.title,
    description: guide.description,
    totalTime: `PT${parseInt(guide.duration)}M`,
    tool: guide.tools.map((t) => ({ "@type": "HowToTool", name: t })),
    step: guide.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.detail,
    })),
  }));
}

// ---------------------------------------------------------------------------
// FAQ data — Google'da aranan sorular
// ---------------------------------------------------------------------------
const faqsData = [
  {
    q: "Pencere mekanizması boşa dönüyor, ne yapmalıyım?",
    a: "Kol mili veya espanyolet dişlisi kırılmış olabilir. Kolu çıkartarak kare mili kontrol edin. Mil sağlamsa espanyolet mekanizması değiştirilmelidir. İşlem uzmanlık gerektirir, profesyonel desteği öneriyoruz.",
  },
  {
    q: "Pencere kilidi kitlenmiyor, kapanmıyor — çözüm nedir?",
    a: "Genellikle karşılık ayarı bozuktur. Kasa üzerindeki karşılık plakasını kilit diline hizalayın. Menteşe düşmesi de neden olabilir — alt menteşedeki Allen vidasıyla kanat yüksekliğini ayarlayın.",
  },
  {
    q: "Pencere karşılığı nasıl ayarlanır?",
    a: "Karşılık plakasının tespit vidasını yarım tur gevşetin, plakayı kilit diline hizalayarak kaydırın, sonra vidayı sıkın. Bazı karşılıklarda eksantrik ayar mekanizması vardır.",
  },
  {
    q: "WC kilidi nasıl kitlenir ve tamiri nasıl yapılır?",
    a: "WC kilidi topuzla döndürülerek kilitlenir. Topuz boşa dönüyorsa iç mekanizma aşınmıştır. Kapının yan tarafındaki 2 vidayı sökerek kilit gövdesini çıkartın, aynı ölçüde (backset 40/50 mm) yenisiyle değiştirin.",
  },
  {
    q: "Pencere menteşesi nasıl sökülür?",
    a: "Önce üst makas menteşesinin bağlantı pimini çekiçle aşağı iterek çıkartın, sonra kanadı yukarı kaldırarak alt menteşeden ayırın. İşlem iki kişi ile yapılmalıdır — kanat ağırdır.",
  },
  {
    q: "Pencere kolu nasıl değiştirilir?",
    a: "Kolun tabanındaki plastik kapak plakasını 90° döndürün, altındaki 2 vidayı sökün, kolu çekin. Yeni kolu kare mile oturtun, vidalayın, kapağı kapatın. 5 dakikalık iştir.",
  },
  {
    q: "Cam çıtası nasıl sökülür?",
    a: "Plastik spatulayı çıta ile profil arasına sokun, hafifçe kaldırın — çıta klipsten ayrılacaktır. En uzun çıtayla başlayın, kısa çıtaları en son çıkartın. Metal alet kullanmayın.",
  },
  {
    q: "Pencere camı kırıldı, ne yapmalıyım?",
    a: "Kırık cam parçalarını güvenli şekilde temizleyin. Pencereyi bantla sabitleyin. Profesyonel ekip gelene kadar açıklığı kapatın. Cam değişimi tehlikeli iştir — mutlaka uzman çağırın. ☎ 0212 880 15 07",
  },
  {
    q: "Çift cam buğulanması neden olur?",
    a: "Cam ünitesinin kenar sızdırmazlığı bozulmuşsa aradaki boşluğa nem girer ve buğulanma oluşur. Tek çözüm cam ünitesinin değiştirilmesidir — tüm pencereyi değiştirmeye gerek yoktur.",
  },
  {
    q: "Pencere contası ne zaman değiştirilmeli?",
    a: "Conta sertleştiğinde, çatladığında veya pencereden hava/su sızıntısı hissedildiğinde değiştirilmelidir. Ortalama 5-7 yılda bir yenilenmesi önerilir. Kağıt testi ile kontrol edebilirsiniz.",
  },
  {
    q: "Pencereden rüzgâr sesi geliyor, nasıl çözülür?",
    a: "Genellikle conta yıpranması veya karşılık ayarsızlığından kaynaklanır. Önce conta durumunu kontrol edin, sonra karşılık ayarını yapın. Her ikisi de çözmezse menteşe ayarı gerekebilir.",
  },
  {
    q: "Hangi marka ürünlerin tamirini yapıyorsunuz?",
    a: "Egepen (Deceuninck), Pimapen, Winsa, Rehau, Kömmerling ve tüm PVC/alüminyum markalarının tamirini yapıyoruz. Orijinal veya eşdeğer yedek parça kullanıyoruz.",
  },
  {
    q: "Tamir için ne kadar süre beklenir?",
    a: "Stokta bulunan parçalar için aynı gün servis sağlanır. Özel sipariş gerektiren parçalarda 2-3 iş günü içinde müdahale edilir.",
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
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: businessConfig.siteUrl },
      { "@type": "ListItem", position: 2, name: "Tamir & Bakım", item: `${businessConfig.siteUrl}/tamir-bakim` },
    ],
  };
}

// ---------------------------------------------------------------------------
// Repair categories data (6 categories — unchanged from before)
// ---------------------------------------------------------------------------
interface RepairStep { step: number; title: string; desc: string; }
interface RepairCategory {
  id: string; title: string; subtitle: string; intro: string;
  problems: string[]; steps: RepairStep[]; parts: string[];
  image: string; imageAlt: string;
}

const repairCategories: RepairCategory[] = [
  {
    id: "sineklik", title: "Sineklik Tamiri",
    subtitle: "Plise, kedi sinekliği ve renkli sineklik onarımı",
    intro: "Yırtılmış sineklik teli, bozulmuş plise mekanizması veya hasar görmüş kedi sinekliği çerçevesi mi var? Orijinal malzeme ve profesyonel işçilikle sinekliklerinizi yeniliyoruz.",
    image: "/images/sineklik/sineklik-tamiri.jpg",
    imageAlt: "Plise sineklik tel değişimi — Beylikdüzü sineklik tamiri hizmeti",
    problems: ["Tel yırtılması veya delinmesi", "Plise sineklik katlama mekanizması arızası", "Kedi sinekliği çerçeve deformasyonu", "Ray ve kılavuz kanal hasarı", "Tül gevşemesi veya sarkması", "Mıknatıs ve klips kopması"],
    steps: [
      { step: 1, title: "Arıza Tespiti", desc: "Sineklik kasası ve tel durumu incelenir, hasar tipi belirlenir." },
      { step: 2, title: "Söküm", desc: "Hasarlı tel veya mekanizma dikkatli şekilde sökülür." },
      { step: 3, title: "Yeni Parça Montajı", desc: "Orijinal ölçüde fiberglass veya paslanmaz çelik tel takılır." },
      { step: 4, title: "Test & Teslim", desc: "Açma-kapama mekanizması test edilir, müşteriye teslim edilir." },
    ],
    parts: ["Fiberglass sineklik teli", "Paslanmaz çelik kedi teli", "Plise sineklik ipi", "Ray ve kılavuz profili", "Mıknatıs seti"],
  },
  {
    id: "pvc-pencere", title: "PVC Pencere Onarımı",
    subtitle: "Egepen Legend / Zendow conta, kol ve kilit tamiri",
    intro: "Pencerelerinizden rüzgâr mı giriyor, kol mu gevşedi ya da kilit mekanizması mı arızalandı? Egepen orijinal yedek parça ile pencerelerinizi ilk günkü performansına kavuşturuyoruz.",
    image: "/images/pvc/pvc-pencere-tamiri.jpg",
    imageAlt: "PVC pencere conta ve kilit değişimi — Egepen Legend servis",
    problems: ["Pencereden hava ve su sızıntısı", "Conta sertleşmesi veya çatlama", "Pencere kolu gevşemesi veya kırılması", "Kilit mekanizması arızası", "Menteşe yıpranması — pencere düşmesi", "Çift cam buğulanması (cam arası nem)"],
    steps: [
      { step: 1, title: "Durum Analizi", desc: "Pencere profili, conta, aksesuar ve cam durumu kontrol edilir." },
      { step: 2, title: "Parça Temini", desc: "Egepen orijinal conta, kol veya kilit yedek parçası temin edilir." },
      { step: 3, title: "Değişim İşlemi", desc: "Eskiyen parça sökülür, profil temizlenir ve yeni parça monte edilir." },
      { step: 4, title: "Ayar & Test", desc: "Pencere ayarı yapılır, hava sızdırmazlık testi uygulanır." },
    ],
    parts: ["Egepen orijinal EPDM conta", "Pencere kolu (Hoppe / Roto)", "Espanyolet kilit mekanizması", "Menteşe / makas seti", "Cam macunu / silikon"],
  },
  {
    id: "cam-balkon", title: "Cam Balkon Servisi",
    subtitle: "Isıcamlı cam balkon tekerlek, fitil ve ray değişimi",
    intro: "Cam balkon panelleriniz zorlanarak mı kayıyor, rüzgâr sesi mi geliyor? Tekerlek, fitil ve ray onarımı ile cam balkonunuzu yeniden sorunsuz kullanın.",
    image: "/images/cam-balkon/cam-balkon-bakim.jpg",
    imageAlt: "Cam balkon tekerlek ve fitil değişimi — ısıcamlı sistem bakımı",
    problems: ["Tekerlek aşınması — paneller sürülemiyor", "Fitil yıpranması — hava ve su geçişi", "Ray deformasyonu", "Kilit mekanizması arızası", "Cam panel çatlağı veya kırılması", "Alt ray su biriktirmesi / drenaj tıkanıklığı"],
    steps: [
      { step: 1, title: "Keşif & İnceleme", desc: "Tüm cam paneller, tekerlekler ve raylar detaylı incelenir." },
      { step: 2, title: "Panel Çıkarma", desc: "Arızalı cam panel güvenli şekilde raydan çıkartılır." },
      { step: 3, title: "Parça Değişimi", desc: "Tekerlek, fitil veya kilit parçası orijinal ürünle değiştirilir." },
      { step: 4, title: "Montaj & Kalite Kontrol", desc: "Panel raya yerleştirilir, kayma testi ve sızdırmazlık kontrolü yapılır." },
    ],
    parts: ["Cam balkon tekerlek seti", "EPDM fitil (8 mm / 10 mm)", "Alüminyum ray profili", "Cam balkon kilidi", "Drenaj kapağı"],
  },
  {
    id: "aluminyum", title: "Alüminyum Doğrama Tamiri",
    subtitle: "Alüminyum pencere, kapı ve doğrama sistemleri bakımı",
    intro: "Alüminyum doğramalarınız zorlanıyor, sızdırıyor veya kilitleri çalışmıyor mu? Profesyonel ekibimizle alüminyum pencere, kapı ve sürme sistemlerinizi onarıyoruz.",
    image: "/images/aluminyum/aluminyum-surme-sistem.jpg",
    imageAlt: "Alüminyum doğrama pencere ve kapı tamiri — sürme sistem bakımı",
    problems: ["Alüminyum sürme sistem zorlanması", "Doğrama fitil yıpranması — hava/su sızıntısı", "Kilit ve kol mekanizması arızası", "Ray ve tekerlek aşınması", "Profil birleşim noktalarında gevşeme", "Termal köprü bozulması — enerji kaybı"],
    steps: [
      { step: 1, title: "Detaylı İnceleme", desc: "Doğrama profili, mekanizma ve fitiller kontrol edilir." },
      { step: 2, title: "Arıza Tespiti", desc: "Sorunun kaynağı belirlenir ve müşteriye bilgi verilir." },
      { step: 3, title: "Onarım / Değişim", desc: "Fitil, tekerlek, kilit veya mekanizma değiştirilir ya da onarılır." },
      { step: 4, title: "Ayar & Test", desc: "Doğrama ayarlanır, açma-kapama ve sızdırmazlık testi yapılır." },
    ],
    parts: ["Alüminyum doğrama fitili", "Sürme tekerlek seti", "Çok noktalı kilit mekanizması", "Kol ve aksesuar seti", "Profil birleşim elemanı"],
  },
  {
    id: "panjur-kepenk", title: "Panjur & Kepenk Servisi",
    subtitle: "Stor panjur, alüminyum kepenk ve motorlu sistem tamiri",
    intro: "Panjurunuz açılmıyor mu, motorlu sistem kumandaya tepki vermiyor mu? Manuel ve motorlu panjur/kepenk sistemlerinin onarım, bakım ve motor değişimi hizmetini sunuyoruz.",
    image: "/images/panjur/panjur-kepenk-tamiri.jpg",
    imageAlt: "Panjur ve kepenk motor değişimi — stor panjur tamiri",
    problems: ["Motor arızası — panjur açılmıyor/kapanmıyor", "Kumanda veya şalter tepki vermemesi", "Lamel kırılması veya eğilmesi", "Kayış / şerit kopması", "Kutu içi mekanizma sıkışması", "Alt ve üst limit ayarı bozulması"],
    steps: [
      { step: 1, title: "Arıza Tespiti", desc: "Motor, kumanda, lamel ve mekanizma kontrol edilir." },
      { step: 2, title: "Söküm", desc: "Arızalı motor, lamel veya mekanizma güvenli şekilde sökülür." },
      { step: 3, title: "Değişim & Onarım", desc: "Yeni motor takılır veya hasarlı parçalar değiştirilir." },
      { step: 4, title: "Limit Ayarı & Test", desc: "Alt/üst limit ayarları yapılır, tam açılıp kapanma test edilir." },
    ],
    parts: ["Boru motor (Somfy / Nice)", "Kumanda alıcısı ve verici", "Alüminyum lamel", "Panjur kayışı / şeridi", "Mil ve yatak seti"],
  },
  {
    id: "dusakabin", title: "Duşakabin Onarımı",
    subtitle: "Duşakabin cam, profil, menteşe ve conta bakımı",
    intro: "Duşakabin camınız çatlak mı, kapı menteşesi mi gevşedi ya da su mu sızıyor? Temperli cam değişiminden conta ve profil onarımına kadar komple duşakabin servisi veriyoruz.",
    image: "/images/dusakabin/dusakabin-onarim.jpg",
    imageAlt: "Duşakabin cam ve profil tamiri — menteşe değişimi",
    problems: ["Duşakabin camı kırılması / çatlağı", "Menteşe gevşemesi — kapı sarkması", "Conta / fitil yıpranması — su sızıntısı", "Profil paslanması veya oksidasyonu", "Silikon çürümesi — küf oluşumu", "Tekerlek arızası (sürgülü model)"],
    steps: [
      { step: 1, title: "Durum Tespiti", desc: "Duşakabin camı, profilleri, contaları ve mekanizmaları incelenir." },
      { step: 2, title: "Ölçü & Sipariş", desc: "Kırık cam veya hasarlı parça için uygun ölçüde sipariş verilir." },
      { step: 3, title: "Değişim İşlemi", desc: "Cam, menteşe, conta veya profil değişimi yapılır." },
      { step: 4, title: "Silikon & Test", desc: "Birleşim noktaları silikonlanır, su sızdırmazlık testi yapılır." },
    ],
    parts: ["8 mm / 10 mm temperli cam", "Paslanmaz çelik menteşe", "Duşakabin fitili (manyetik / dudak)", "Krom profil seti", "Silikon mastik"],
  },
];

/* ── Highlights ─────────────────────────────────────────────── */
const highlights = [
  { icon: "⚡", label: "Aynı Gün Keşif", desc: "Aradığınız gün adresinize geliyoruz." },
  { icon: "🔧", label: "Orijinal Parça", desc: "Egepen ve üretici orijinal yedek parça." },
  { icon: "📋", label: "Ücretsiz Teklif", desc: "Keşif ve fiyat teklifi tamamen ücretsiz." },
  { icon: "🏠", label: "Yerinde Servis", desc: "Evinize veya iş yerinize gelerek onarım." },
];

/* ── Common symptoms — genişletilmiş ───────────────────────── */
const commonSymptoms = [
  { symptom: "Pencere kolu boşa dönüyor", solution: "Espanyolet/mil arızası → Mekanizma rehberi", category: "mekanizma-bosa-donuyor" },
  { symptom: "Pencere kapanmıyor / kitlenmiyor", solution: "Karşılık veya menteşe ayarı → Kilit rehberi", category: "kilit-kitlenmiyor" },
  { symptom: "Pencereden hava / rüzgâr giriyor", solution: "Conta değişimi veya karşılık ayarı", category: "pencere-conta-degisimi" },
  { symptom: "Cam kırıldı / çatladı", solution: "Cam çıtası çıkart → cam değişimi", category: "cam-nasil-sokulur" },
  { symptom: "Cam buğulanıyor (çift cam arası)", solution: "Cam ünitesi değişimi gerekli", category: "cam-citasi-nasil-sokulur" },
  { symptom: "Pencere kolu kırıldı", solution: "5 dk'da kendiniz değiştirebilirsiniz", category: "pencere-kolu-degisimi" },
  { symptom: "WC/banyo kilidi kitlenmiyor", solution: "Kilit gövdesi değişimi", category: "wc-kilidi-tamiri" },
  { symptom: "Pencere aşağı düştü/sarktı", solution: "Menteşe ayarı veya değişimi", category: "mentese-nasil-sokulur" },
  { symptom: "Sineklik teli yırtık", solution: "Tel değişimi yapılır", category: "sineklik" },
  { symptom: "Panjur açılmıyor / kapanmıyor", solution: "Motor veya kayış arızası olabilir", category: "panjur-kepenk" },
  { symptom: "Cam balkon paneli kaymıyor", solution: "Tekerlek değişimi", category: "cam-balkon" },
  { symptom: "Duşakabin su sızdırıyor", solution: "Conta / silikon yenilemesi gerekir", category: "dusakabin" },
];

/* ── Service areas ──────────────────────────────────────────── */
const serviceAreas = [
  "Beylikdüzü", "Büyükçekmece", "Esenyurt", "Avcılar",
  "Küçükçekmece", "Başakşehir", "Silivri", "Çatalca",
  "Bakırköy", "Bahçelievler", "Bağcılar", "Güngören",
];

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------
export default function RepairMaintenancePage() {
  const difficultyColor = (d: string) =>
    d === "Kolay" ? "bg-green-100 text-green-700" : d === "Orta" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700";

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
            ...buildHowToSchemas(),
          ]),
        }}
      />

      <HeaderOptimized />

      <main id="main-content" className="min-h-screen bg-neutral-50">
        {/* ── Hero ────────────────────────────────────────────── */}
        <PageHero
          title="Pencere Tamiri & Bakım Rehberi"
          subtitle="Mekanizma, kilit, menteşe, cam çıtası, pencere kolu sorunları için adım adım rehber. Kendiniz çözemezseniz biz geliyoruz."
          breadcrumbs={[{ label: "Tamir & Bakım" }]}
        />

        {/* ── Emergency Banner ────────────────────────────────── */}
        <section className="bg-primary-600 text-white py-4" aria-label="Acil servis hattı">
          <div className="container-custom">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-center">
              <p className="text-sm sm:text-base font-medium">
                Kendiniz çözemiyorsanız hemen arayın — aynı gün müdahale.
              </p>
              <a
                href={`tel:${businessConfig.contact.landlineRaw}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-primary-700 font-bold rounded-full hover:bg-primary-50 transition-colors text-sm"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {businessConfig.contact.landline}
              </a>
            </div>
          </div>
        </section>

        {/* ── Quick Nav ───────────────────────────────────────── */}
        <nav className="py-5 bg-white border-b border-neutral-100 sticky top-16 lg:top-20 z-30" aria-label="Hızlı erişim">
          <div className="container-custom">
            <ul className="flex flex-wrap justify-center gap-2 sm:gap-3">
              <li><a href="#rehberler" className="inline-block px-4 py-2 text-sm font-bold text-primary-600 bg-primary-50 rounded-full border border-primary-200">Nasıl Yapılır?</a></li>
              {repairCategories.map((cat) => (
                <li key={cat.id}><a href={`#${cat.id}`} className="inline-block px-4 py-2 text-sm font-medium text-neutral-600 bg-neutral-50 rounded-full hover:bg-primary-50 hover:text-primary-600 transition-colors">{cat.title}</a></li>
              ))}
              <li><a href="#sss" className="inline-block px-4 py-2 text-sm font-medium text-neutral-600 bg-neutral-50 rounded-full hover:bg-primary-50 hover:text-primary-600 transition-colors">SSS</a></li>
            </ul>
          </div>
        </nav>

        {/* ── Highlights ──────────────────────────────────────── */}
        <section className="py-10 md:py-14 bg-white" aria-label="Avantajlar">
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

        {/* ── Quick Symptom Finder ────────────────────────────── */}
        <section className="py-10 md:py-14 bg-neutral-50" aria-labelledby="symptom-heading">
          <div className="container-custom max-w-5xl">
            <h2 id="symptom-heading" className="text-xl md:text-2xl font-bold text-neutral-900 text-center mb-2">
              Sorununuz Ne?
            </h2>
            <p className="text-neutral-500 text-center mb-8 text-sm">
              Aşağıdaki arıza belirtinize tıklayın — ilgili rehbere veya servise yönlendirelim.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {commonSymptoms.map((item) => (
                <a key={item.symptom} href={`#${item.category}`} className="group p-4 bg-white rounded-xl border border-neutral-200 hover:border-primary-300 hover:shadow-sm transition-all">
                  <p className="font-semibold text-neutral-800 text-sm group-hover:text-primary-600 transition-colors mb-1">{item.symptom}</p>
                  <p className="text-xs text-neutral-500">→ {item.solution}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            HOW-TO GUIDES — Nasıl Yapılır Rehberleri (SEO)
            ═══════════════════════════════════════════════════════ */}
        <section id="rehberler" className="py-14 md:py-20 bg-white scroll-mt-32" aria-labelledby="guides-heading">
          <div className="container-custom max-w-4xl">
            <div className="text-center mb-10">
              <h2 id="guides-heading" className="text-2xl md:text-3xl font-bold text-neutral-900 mb-3">
                Nasıl Yapılır? — Adım Adım Tamir Rehberleri
              </h2>
              <p className="text-neutral-500 max-w-2xl mx-auto text-sm">
                Pencere, kilit, menteşe, cam ve kol sorunları için detaylı rehberler. Her rehberde zorluk seviyesi, gereken aletler ve adım adım talimatlar var.
              </p>
            </div>

            <div className="space-y-8">
              {howToGuides.map((guide) => (
                <article
                  key={guide.id}
                  id={guide.id}
                  className="scroll-mt-32 bg-neutral-50 rounded-2xl border border-neutral-200 overflow-hidden"
                >
                  {/* Guide header */}
                  <div className="p-6 md:p-8 border-b border-neutral-200">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${difficultyColor(guide.difficulty)}`}>
                        {guide.difficulty}
                      </span>
                      <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-neutral-200 text-neutral-600">
                        ⏱ {guide.duration}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-neutral-900 mb-3">
                      {guide.title}
                    </h3>
                    <p className="text-neutral-600 text-sm leading-relaxed">
                      {guide.description}
                    </p>
                  </div>

                  {/* Guide body */}
                  <div className="p-6 md:p-8">
                    <ExpandableGroup>
                      {/* Tools */}
                      <ExpandableSection title="Gereken Aletler" variant="minimal" defaultOpen>
                        <ul className="flex flex-wrap gap-2">
                          {guide.tools.map((tool) => (
                            <li key={tool} className="px-3 py-1.5 bg-white text-neutral-700 text-xs font-medium rounded-full border border-neutral-200">
                              🔧 {tool}
                            </li>
                          ))}
                        </ul>
                      </ExpandableSection>

                      {/* Steps */}
                      <ExpandableSection title={`Adım Adım Talimatlar (${guide.steps.length} adım)`} variant="minimal" defaultOpen>
                        <ol className="space-y-4">
                          {guide.steps.map((s, i) => (
                            <li key={i} className="flex gap-3">
                              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-50 text-primary-600 font-bold text-sm shrink-0">
                                {i + 1}
                              </span>
                              <div>
                                <p className="font-bold text-neutral-900 text-sm">{s.title}</p>
                                <p className="text-sm text-neutral-600 mt-1 leading-relaxed">{s.detail}</p>
                              </div>
                            </li>
                          ))}
                        </ol>
                      </ExpandableSection>

                      {/* Warning */}
                      <ExpandableSection title="⚠️ Dikkat" variant="minimal">
                        <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                          <p className="text-sm text-amber-800 leading-relaxed">{guide.warning}</p>
                        </div>
                      </ExpandableSection>

                      {/* Pro tip */}
                      <ExpandableSection title="💡 Uzman Tavsiyesi" variant="minimal">
                        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <p className="text-sm text-blue-800 leading-relaxed">{guide.proTip}</p>
                        </div>
                      </ExpandableSection>
                    </ExpandableGroup>

                    {/* Guide CTA */}
                    <div className="mt-6 pt-4 border-t border-neutral-200 flex flex-col sm:flex-row gap-3">
                      <a
                        href={`tel:${businessConfig.contact.landlineRaw}`}
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors text-sm"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                        Profesyonel Yardım İste
                      </a>
                      <a
                        href={`https://wa.me/${businessConfig.contact.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-neutral-700 font-semibold rounded-xl hover:bg-neutral-100 transition-colors text-sm border border-neutral-300"
                      >
                        WhatsApp ile Sor
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            SERVICE CATEGORIES — Zig-Zag Layout
            ═══════════════════════════════════════════════════════ */}
        {repairCategories.map((cat, catIndex) => {
          const isEven = catIndex % 2 === 0;
          return (
            <section key={cat.id} id={cat.id} className={`py-14 md:py-20 scroll-mt-32 ${isEven ? "bg-neutral-50" : "bg-white"}`} aria-labelledby={`heading-${cat.id}`}>
              <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
                  <div className={isEven ? "lg:order-1" : "lg:order-2"}>
                    <h2 id={`heading-${cat.id}`} className="text-2xl md:text-3xl font-bold text-neutral-900 mb-2">{cat.title}</h2>
                    <p className="text-sm font-medium text-primary-600 mb-4">{cat.subtitle}</p>
                    <p className="text-neutral-600 leading-relaxed mb-6">{cat.intro}</p>
                    <ExpandableGroup>
                      <ExpandableSection title="Sık Karşılaşılan Arızalar" variant="minimal" defaultOpen>
                        <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2" role="list">
                          {cat.problems.map((p, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-neutral-600">
                              <svg className="w-3.5 h-3.5 text-red-400 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" /></svg>
                              {p}
                            </li>
                          ))}
                        </ul>
                      </ExpandableSection>
                      <ExpandableSection title="Tamir Süreci (Adım Adım)" variant="minimal">
                        <ol className="space-y-3">
                          {cat.steps.map((s) => (
                            <li key={s.step} className="flex gap-3">
                              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary-50 text-primary-600 font-bold text-xs shrink-0">{s.step}</span>
                              <div><p className="font-semibold text-neutral-800 text-sm">{s.title}</p><p className="text-sm text-neutral-500 mt-0.5">{s.desc}</p></div>
                            </li>
                          ))}
                        </ol>
                      </ExpandableSection>
                      <ExpandableSection title="Kullanılan Yedek Parçalar" variant="minimal">
                        <ul className="flex flex-wrap gap-2">{cat.parts.map((part) => (<li key={part} className="px-3 py-1.5 bg-neutral-100 text-neutral-700 text-xs font-medium rounded-full">{part}</li>))}</ul>
                      </ExpandableSection>
                    </ExpandableGroup>
                    <div className="mt-6">
                      <a href={`tel:${businessConfig.contact.landlineRaw}`} className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors text-sm">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                        {cat.title} İçin Ara
                      </a>
                    </div>
                  </div>
                  <div className={`relative rounded-2xl overflow-hidden shadow-lg aspect-[4/3] ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                    <OptimizedImage src={cat.image} alt={cat.imageAlt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" {...(catIndex === 0 ? { priority: true } : {})} />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/15 to-transparent" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        {/* ── FAQ Section ────────────────────────────────────── */}
        <section id="sss" className="py-14 md:py-20 bg-white scroll-mt-32" aria-labelledby="faq-heading">
          <div className="container-custom max-w-3xl">
            <h2 id="faq-heading" className="text-2xl md:text-3xl font-bold text-neutral-900 text-center mb-3">Sıkça Sorulan Sorular</h2>
            <p className="text-neutral-500 text-center mb-8 max-w-lg mx-auto">Pencere tamiri, kilit, mekanizma, cam ve menteşe hakkında en çok merak edilen sorular.</p>
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
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Profesyonel Yardım Gerekiyor mu?</h2>
            <p className="text-primary-100 leading-relaxed mb-6">
              Rehberlerdeki işlemler karmaşık geliyorsa veya doğru parçayı bulamıyorsanız — biz geliyoruz. Ücretsiz keşif, orijinal parça, aynı gün müdahale.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={`tel:${businessConfig.contact.landlineRaw}`} className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-primary-700 font-bold rounded-xl hover:bg-primary-50 transition-colors text-lg">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                {businessConfig.contact.landline}
              </a>
              <a href={`https://wa.me/${businessConfig.contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary-700 text-white font-bold rounded-xl hover:bg-primary-800 transition-colors border border-primary-500">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.347 0-4.518-.802-6.238-2.147l-.436-.348-2.647.887.887-2.647-.348-.436A9.935 9.935 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" /></svg>
                WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* ── Service Areas ───────────────────────────────────── */}
        <section className="py-10 md:py-14 bg-white" aria-labelledby="area-heading">
          <div className="container-custom max-w-3xl text-center">
            <h2 id="area-heading" className="text-lg font-bold text-neutral-900 mb-2">Hizmet Bölgelerimiz</h2>
            <p className="text-sm text-neutral-500 mb-6">
              Pencere tamiri, cam değişimi, kilit onarımı, sineklik, cam balkon, panjur ve duşakabin servisi için ücretsiz keşif sunduğumuz bölgeler:
            </p>
            <ul className="flex flex-wrap justify-center gap-2" role="list">
              {serviceAreas.map((area) => (
                <li key={area} className="inline-block text-sm bg-primary-50 text-primary-700 font-medium px-4 py-2 rounded-full border border-primary-100">{area}</li>
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
