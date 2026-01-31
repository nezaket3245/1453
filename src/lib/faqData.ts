/**
 * FAQ Data - Sıkça Sorulan Sorular
 * SEO optimized FAQ content for Egepen Akçayapı
 */

export interface FAQItem {
    id: string;
    question: string;
    answer: string;
    category: "genel" | "pvc-pencere" | "cam-balkon" | "fiyat" | "montaj" | "garanti";
}

export const faqCategories = [
    { id: "all", name: "Tüm Sorular", icon: "❓" },
    { id: "genel", name: "Genel", icon: "📋" },
    { id: "pvc-pencere", name: "PVC Pencere", icon: "🪟" },
    { id: "cam-balkon", name: "Cam Balkon", icon: "🏠" },
    { id: "fiyat", name: "Fiyat & Ödeme", icon: "💰" },
    { id: "montaj", name: "Montaj & Teslimat", icon: "🔧" },
    { id: "garanti", name: "Garanti & Servis", icon: "✅" },
];

export const faqs: FAQItem[] = [
    // Genel Sorular
    {
        id: "1",
        question: "Egepen Deceuninck nedir? Neden bu markayı tercih etmeliyim?",
        answer: "Egepen Deceuninck, Belçika kökenli Deceuninck grubunun Türkiye'deki üretim ortaklığıdır. 50 yılı aşkın tecrübesiyle Avrupa'nın en büyük PVC profil üreticilerinden biridir. Yüksek kalite standartları, geniş renk seçenekleri ve üstün ısı yalıtımı performansıyla Türkiye'nin en çok tercih edilen PVC profil markasıdır. Akçayapı olarak Beylikdüzü bölgesinde yetkili bayi olarak hizmet vermekteyiz.",
        category: "genel",
    },
    {
        id: "2",
        question: "Ücretsiz keşif hizmeti nasıl çalışıyor?",
        answer: "Randevu oluşturduğunuzda, uzman ekibimiz belirlenen tarihte evinize veya iş yerinize gelir. Mevcut pencere ve kapılarınızı inceler, ölçü alır ve ihtiyaçlarınızı dinler. Ardından size en uygun ürün ve fiyat teklifini sunarız. Bu hizmet tamamen ücretsiz ve bağlayıcı değildir. Keşif sonrası teklifi kabul edip etmemek tamamen size kalmıştır.",
        category: "genel",
    },
    {
        id: "3",
        question: "Hangi bölgelere hizmet veriyorsunuz?",
        answer: "Öncelikli hizmet bölgemiz İstanbul Avrupa yakasıdır. Özellikle Beylikdüzü, Gürpınar, Yakuplu, Kavaklı, Büyükçekmece, Esenyurt, Avcılar, Küçükçekmece, Başakşehir, Bahçeşehir ve Silivri bölgelerinde aktif olarak hizmet vermekteyiz. Diğer bölgeler için lütfen bizimle iletişime geçin.",
        category: "genel",
    },

    // PVC Pencere Soruları
    {
        id: "4",
        question: "Legend, Legend Art ve Zendow serileri arasındaki fark nedir?",
        answer: "Legend Serisi (80mm, 6 odacık): Maksimum ısı ve ses yalıtımı, Uw ≤ 0.95 değeriyle A+ enerji sınıfı. Legend Art Serisi (70mm, 5-6 odacık): Estetik ve yüksek izolasyon odaklı tasarım. Zendow Serisi (70mm, 5 odacık): Klasik tasarım ve güvenilir yalıtım performansı. Her üç seri de Egepen kalitesiyle üretilmektedir.",
        category: "pvc-pencere",
    },
    {
        id: "5",
        question: "PVC pencere kaç yıl dayanır?",
        answer: "Kaliteli PVC pencereler düzgün bakımla 30-50 yıl dayanabilir. Egepen profilleri UV stabilizatörlü formülasyonlarıyla güneş ışığında solmaz ve sararma yapmaz. Cam, fitil ve aksesuar parçaları belirli aralıklarla bakım gerektirir. Örneğin fitiller 7-10 yılda bir değiştirilmelidir.",
        category: "pvc-pencere",
    },
    {
        id: "6",
        question: "Çift cam mı yoksa üçlü cam mı tercih etmeliyim?",
        answer: "Çift cam günümüz standartlarını karşılar, ancak üçlü cam %30-40 daha iyi ısı yalıtımı sağlar. Kuzey cephe, gürültülü bölgeler veya enerji verimliliğine önem verenler için üçlü cam önerilir. Legend serisi profilleri, üçlü cam desteğiyle birlikte pasif ev standardına yakın performans sunar.",
        category: "pvc-pencere",
    },
    {
        id: "7",
        question: "PVC pencere renk seçenekleri nelerdir?",
        answer: "Egepen profilleri 40'tan fazla renk ve dokuya sahiptir. Standart beyaz dışında, RAL 7016 antrasit gri, altın meşe, ceviz, mahogany gibi ahşap desenler, ayrıca mat siyah, krem ve özel RAL kodlu renkler mevcuttur. Dış ve iç yüzeyde farklı renkler de seçilebilir.",
        category: "pvc-pencere",
    },
    {
        id: "8",
        question: "Eski pencerelerimi sökerken duvar hasar görür mü?",
        answer: "Profesyonel söküm işleminde duvar hasarı minimumda tutulur. Ekibimiz özenli çalışarak mevcut sıvayı korur. Küçük rötuşlar montaj sürecinde yapılır. Büyük onarımlar gerekirse sizi önceden bilgilendiririz. Tüm moloz ve eski pencereler tarafımızca kaldırılır.",
        category: "pvc-pencere",
    },

    // Cam Balkon Soruları
    {
        id: "9",
        question: "Cam balkon kış aylarında soğuk yapar mı?",
        answer: "Cam balkon sistemleri ana yaşam alanı kadar yalıtım yapmaz, ancak dış ortama göre 5-10°C daha sıcak ortam oluşturur. Rüzgar ve yağmuru tamamen keser. Ilık iklim bölgelerinde kışın bile kullanılabilir. Daha fazla ısı yalıtımı için PVC sürme sistemleri (Legend Slide) tercih edilebilir.",
        category: "cam-balkon",
    },
    {
        id: "10",
        question: "Cam balkon temperli cam olmak zorunda mı?",
        answer: "Evet, güvenlik nedeniyle cam balkon sistemlerinde temperli (sertleştirilmiş) cam kullanılması zorunludur. Temperli cam, normal cama göre 4-5 kat daha dayanıklıdır ve kırıldığında keskin parçalar yerine küçük granüller şeklinde dağılır. Genellikle 8mm veya 10mm kalınlık kullanılır.",
        category: "cam-balkon",
    },
    {
        id: "11",
        question: "Cam balkon sistemi rüzgarda sallanır mı?",
        answer: "Kaliteli cam balkon sistemleri rüzgar yüküne göre tasarlanır. Rüzgar kilitleri ve sabitleyiciler sayesinde cam paneller yerinde durur. Özellikle yüksek katlarda veya rüzgarlı bölgelerde ek güvenlik önlemleri alınır. Sistemlerimiz Class C5 rüzgar direncine sahiptir.",
        category: "cam-balkon",
    },

    // Fiyat Soruları
    {
        id: "12",
        question: "PVC pencere metrekare fiyatı ne kadardır?",
        answer: "PVC pencere fiyatları profil serisi, cam tipi, aksesuar kalitesi ve renk seçimine göre değişir. Güncel fiyatlar için ücretsiz keşif talep etmenizi öneririz. Keşif sonrası detaylı fiyat teklifi hazırlarız. Fiyat teklifi bağlayıcı değildir.",
        category: "fiyat",
    },
    {
        id: "13",
        question: "Taksit veya kredi kartı ile ödeme yapabilir miyim?",
        answer: "Evet, tüm kredi kartlarına 12 aya kadar taksit imkanı sunmaktayız. Ayrıca banka kredisi kullanmak isteyenler için gerekli evrakları hazırlıyoruz. Peşin ödemelerde özel indirimler uygulanmaktadır. Detaylı ödeme koşulları için satış temsilcimizle görüşebilirsiniz.",
        category: "fiyat",
    },
    {
        id: "14",
        question: "Fiyat teklifinin geçerlilik süresi ne kadardır?",
        answer: "Fiyat tekliflerimiz genellikle 30 gün geçerlidir. Döviz kurlarına bağlı olan alüminyum ve cam fiyatları değişkenlik gösterebilir. Uzun vadeli projeler için fiyat sabitleme imkanı sunuyoruz. Teklifi kabul ettiğinizde fiyat sabitlenir.",
        category: "fiyat",
    },

    // Montaj Soruları
    {
        id: "15",
        question: "Montaj ne kadar sürer?",
        answer: "Standart bir daire için (5-8 pencere) montaj 1-2 gün sürer. Villa veya iş yeri projeleri daha uzun sürebilir. Montaj süresi önceden bildirilir ve program dahilinde çalışılır. Hafta sonu montaj için ek ücret alınmaz.",
        category: "montaj",
    },
    {
        id: "16",
        question: "Montaj sırasında evde olmam gerekiyor mu?",
        answer: "Montaj başlangıcında ve bitişinde evinizde olmanız yeterlidir. Gün boyunca evde olmanıza gerek yoktur. Temiz ve profesyonel bir ekiple çalışıyoruz. Montaj bitiminde tüm atıklar tarafımızca temizlenir.",
        category: "montaj",
    },
    {
        id: "17",
        question: "Sipariş verdikten sonra teslimat ne kadar sürer?",
        answer: "Standart ürünlerde üretim 7-10 iş günü, özel renk ve ebatlarda 15-20 iş gününe kadar çıkabilir. Montaj tarihi sipariş onayı sırasında belirlenir. Acil projeler için ekspres üretim seçeneği mevcuttur (ek ücretli).",
        category: "montaj",
    },

    // Garanti & Servis
    {
        id: "18",
        question: "Garanti kapsamı nedir?",
        answer: "Egepen profiller 10 yıl, cam 2 yıl, aksesuar ve fitiller 2 yıl garanti kapsamındadır. İşçilik garantisi 2 yıldır. Garanti, kullanım hatası ve dış etkenlerden kaynaklanan hasarları kapsamaz. Garanti süresi boyunca ücretsiz servis hizmeti sunuyoruz.",
        category: "garanti",
    },
    {
        id: "19",
        question: "Garanti sonrası servis hizmeti var mı?",
        answer: "Evet, ürünlerimize ömür boyu servis hizmeti sunuyoruz. Fitil değişimi, cam değişimi, ispanyolet tamiri, kol değişimi gibi bakım ve onarım işlemleri için 7/24 servis hattımızı arayabilirsiniz. Orijinal yedek parça garantisi veriyoruz.",
        category: "garanti",
    },
    {
        id: "20",
        question: "Başka firmadan aldığım PVC pencereleri tamir edebilir misiniz?",
        answer: "Evet, tüm marka PVC pencere ve kapılara tamir ve bakım hizmeti veriyoruz. Fitil değişimi, ispanyolet tamiri, cam değişimi, kol değişimi gibi işlemler yapılmaktadır. Ancak orijinal olmayan parçalar garanti kapsamına alınamaz.",
        category: "garanti",
    },
];

/**
 * Get FAQs by category
 */
export function getFaqsByCategory(category: string): FAQItem[] {
    if (category === "all") return faqs;
    return faqs.filter((faq) => faq.category === category);
}

/**
 * Generate FAQ Schema for SEO
 */
export function generateFAQSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
            },
        })),
    };
}
