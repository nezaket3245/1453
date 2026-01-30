/**
 * Blog Data - SEO optimized blog posts for Egepen Akçayapı
 * Rich content for local SEO and user engagement
 */

export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    category: "pvc-pencere" | "cam-balkon" | "bakim" | "enerji-tasarrufu" | "dekorasyon";
    image: string;
    author: string;
    date: string;
    readTime: string;
    tags: string[];
    seoKeywords: string[];
}

export const blogPosts: BlogPost[] = [
    {
        id: "1",
        slug: "pvc-pencere-secimi-rehberi",
        title: "PVC Pencere Alırken Nelere Dikkat Etmeli? Kapsamlı Rehber",
        excerpt: "Evinize yeni pencere alırken sadece fiyata değil, ısı yalıtımı, profil kalınlığı ve cam seçimine de dikkat etmelisiniz. Bu rehberde tüm detayları bulabilirsiniz.",
        content: `
## PVC Pencere Seçiminde Dikkat Edilmesi Gerekenler

PVC pencere almak, eviniz için yapacağınız en önemli yatırımlardan biridir. Doğru seçim yaparsanız, yıllarca enerji tasarrufu sağlar ve konforlu bir yaşam alanı elde edersiniz. İşte dikkat etmeniz gereken temel noktalar:

### 1. Profil Genişliği ve Odacık Sayısı

Profil genişliği, pencerenizin ısı yalıtım performansını doğrudan etkiler:

- **60-65mm Profiller**: Ekonomik sınıf, temel yalıtım
- **70-76mm Profiller**: Orta sınıf, iyi yalıtım (Evolution serisi)
- **80mm+ Profiller**: Premium sınıf, en üstün yalıtım (Legend serisi)

Odacık sayısı da önemlidir. 6 odacıklı profiller, 3-4 odacıklılara göre çok daha iyi ısı yalıtımı sağlar.

### 2. Cam Seçimi

Çift cam artık standart olsa da, üçlü cam (triple glazing) enerji verimliliğini önemli ölçüde artırır:

- **Çift Cam (4-16-4)**: Standart yalıtım
- **Çift Cam Low-E**: Gelişmiş ısı kontrolü
- **Üçlü Cam**: Maksimum enerji tasarrufu

### 3. U-Değeri (Uw)

U-değeri ne kadar düşükse, pencere o kadar iyi yalıtım yapar. Günümüzde:

- Uw > 1.4: Kabul edilebilir
- Uw ≤ 1.2: İyi
- Uw ≤ 1.0: Çok iyi
- Uw ≤ 0.8: Mükemmel (Pasif ev standardı)

### 4. Marka ve Garanti

Türkiye'de Egepen Deceuninck gibi köklü markalar, 10 yıla kadar profil garantisi sunmaktadır. Marka seçerken şunlara dikkat edin:

- Yetkili bayi ağı
- Yedek parça bulunabilirliği
- Satış sonrası servis hizmeti

### 5. Montaj Kalitesi

En kaliteli pencere bile kötü montaj edilirse performans gösteremez. Profesyonel montaj ekibi:

- Doğru ölçü alır
- Köpük ve silikon izolasyonu yapar
- Su tahliye kanallarını açık bırakır
- Montaj sonrası ayar yapar

## Beylikdüzü'de PVC Pencere

İstanbul Beylikdüzü bölgesinde deniz havası ve rüzgar etkisi nedeniyle özellikle yüksek hava sızdırmazlık değerlerine sahip pencereler tercih edilmelidir. Legend serisi 80mm profilleri, bu koşullar için ideal performans sunar.

---

*Egepen Akçayapı olarak Beylikdüzü, Gürpınar ve çevresinde ücretsiz keşif hizmeti sunuyoruz. Detaylı bilgi için bizimle iletişime geçin.*
        `,
        category: "pvc-pencere",
        image: "/images/pvc/pvc-pencere-yemek-odasi.jpg",
        author: "Akçayapı Uzman Ekibi",
        date: "2026-01-25",
        readTime: "8 dk",
        tags: ["PVC Pencere", "Pencere Seçimi", "Isı Yalıtımı", "Legend Serisi"],
        seoKeywords: ["PVC pencere nasıl seçilir", "pencere alırken dikkat edilmesi gerekenler", "Egepen pencere", "80mm profil pencere"],
    },
    {
        id: "2",
        slug: "cam-balkon-bakimi-ipuclari",
        title: "Cam Balkon Bakımı Nasıl Yapılır? 10 Altın Kural",
        excerpt: "Cam balkon sistemlerinizin ömrünü uzatmak için yapmanız gereken basit bakım ipuçlarını bu yazımızda bulabilirsiniz.",
        content: `
## Cam Balkon Bakımında 10 Altın Kural

Cam balkonunuzun yıllarca sorunsuz çalışması için düzenli bakım şarttır. İşte cam balkon bakımında dikkat etmeniz gereken 10 önemli nokta:

### 1. Haftalık Temizlik

Cam yüzeylerini haftada en az bir kez yumuşak bir bezle silerek toz ve kiri temizleyin. Sirke ve su karışımı doğal bir temizleyici olarak kullanılabilir.

### 2. Ray Temizliği

Alt raylar zamanla toz ve kir biriktirir. Ayda bir kez yumuşak fırça ile rayları temizleyin. Biriken kir, panellerin kaymasını zorlaştırır.

### 3. Tekerlek Kontrolü

6 ayda bir tekerlekleri kontrol edin. Aşınmış veya kırık tekerlekler zamanında değiştirilmelidir.

### 4. Yağlama

Raylara ve hareketli parçalara yılda 2 kez silikon sprey uygulayın. Asla motor yağı kullanmayın!

### 5. Conta Bakımı

Contaları düzenli olarak kontrol edin. Çatlamış veya sertleşmiş contalar su sızıntısına neden olabilir.

### 6. Kilit Mekanizması

Kilitleri düzenli yağlayın ve zorlanma durumunda hemen servise başvurun.

### 7. Temperli Cam Kontrolü

Camlarda çizik veya çatlak olup olmadığını kontrol edin. En küçük hasar bile güvenlik riski oluşturabilir.

### 8. Su Tahliye Kanalları

Yağmur suyunun tahliye edildiği kanalların tıkanık olmadığından emin olun.

### 9. Profil Temizliği

Alüminyum profilleri özel temizleyicilerle silin. Aşındırıcı maddeler kullanmayın.

### 10. Profesyonel Bakım

Yılda en az bir kez profesyonel bakım yaptırın. Uzmanlar göremediğiniz sorunları tespit edebilir.

## Bakım Takvimi

| Dönem | Yapılacak İşlem |
|-------|-----------------|
| Haftalık | Cam silme |
| Aylık | Ray temizliği |
| 3 Aylık | Genel kontrol |
| 6 Aylık | Tekerlek kontrolü |
| Yıllık | Profesyonel bakım |

---

*Cam balkon bakım ve onarım hizmetlerimiz hakkında bilgi almak için Akçayapı ile iletişime geçin.*
        `,
        category: "bakim",
        image: "/images/cam-balkon/cam-balkon-gunbatimi.jpg",
        author: "Akçayapı Uzman Ekibi",
        date: "2026-01-12",
        readTime: "6 dk",
        tags: ["Cam Balkon", "Bakım", "Temizlik", "Onarım"],
        seoKeywords: ["cam balkon bakımı", "cam balkon temizliği", "cam balkon tekerlek değişimi", "Beylikdüzü cam balkon servisi"],
    },
    {
        id: "3",
        slug: "kislik-pencere-yalitimi",
        title: "Kışa Hazırlık: Pencerelerinizden Isı Kaybını Önleyin",
        excerpt: "Kış aylarında enerji faturalarınızı düşürmek için pencerelerinizi nasıl yalıtabileceğinizi öğrenin.",
        content: `
## Pencerelerden Isı Kaybını Önleme Yöntemleri

Evlerdeki ısı kaybının yaklaşık %30'u pencerelerden gerçekleşir. İşte ısı kaybını minimize etmek için yapabilecekleriniz:

### 1. Fitil Kontrolü ve Değişimi

Pencere fitilleri zamanla sertleşir ve etkisini kaybeder. 5-7 yılda bir fitil değişimi önerilir. Sertleşmiş fitiller:

- Hava sızıntısına neden olur
- Ses yalıtımını azaltır
- Toz ve böcek girişine yol açar

### 2. Cam Değişimi

Eski tek camlı pencereleriniz varsa, ısı camlı (çift veya üçlü cam) sisteme geçiş büyük fark yaratır:

- Tek cam: Uw ≈ 5.8 W/m²K
- Çift cam: Uw ≈ 2.8 W/m²K
- Üçlü cam Low-E: Uw ≈ 0.8 W/m²K

### 3. Termal Perde Kullanımı

Kalın ve yalıtımlı perdeler, pencerelerden gelen soğuğu azaltır. Özellikle gece perdeleri kapatmak önemlidir.

### 4. Pencere Filmi

Isı kontrol filmleri, camlardan giren soğuğu reduce edebilir. Ancak profesyonel cam değişimi kadar etkili değildir.

### 5. İspanyolet Ayarı

Kış aylarında ispanyoleti daha sıkı konuma ayarlayın. Bu, contaların cama daha iyi basmasını sağlar.

## Enerji Tasarruf Hesabı

Örnek bir hesaplama:

| Pencere Tipi | Yıllık Isı Kaybı | Tasarruf |
|--------------|------------------|----------|
| Tek Cam | 100 birim | - |
| Çift Cam | 48 birim | %52 |
| Üçlü Cam Low-E | 14 birim | %86 |

### Legend Serisi ile Maksimum Tasarruf

Egepen Deceuninck Legend serisi, Uw ≤ 0.95 W/m²K değeriyle premium ısı yalıtımı sunar. 80mm profil genişliği ve 6 odacıklı yapısıyla:

- %45'e varan enerji tasarrufu
- Üstün ses yalıtımı
- Yoğuşma problemi yok

---

*Beylikdüzü ve çevresinde ücretsiz enerji analizi için Akçayapı'yı arayın.*
        `,
        category: "enerji-tasarrufu",
        image: "/images/products/legend-series.png",
        author: "Akçayapı Uzman Ekibi",
        date: "2026-01-05",
        readTime: "7 dk",
        tags: ["Isı Yalıtımı", "Enerji Tasarrufu", "Kış Hazırlığı", "Fitil Değişimi"],
        seoKeywords: ["pencere ısı yalıtımı", "enerji tasarrufu pencere", "fitil değişimi", "kış için pencere yalıtımı"],
    },
    {
        id: "4",
        slug: "ispanyolet-nedir-nasil-calisir",
        title: "İspanyolet Nedir? PVC Pencere Kilit Sistemi Rehberi",
        excerpt: "PVC pencere ve kapıların vazgeçilmez parçası ispanyoletin ne olduğunu ve nasıl çalıştığını öğrenin.",
        content: `
## İspanyolet: Pencere ve Kapıların Kalbi

İspanyolet, PVC pencere ve kapıların kilitlenme mekanizmasını oluşturan temel parçadır. Kolu çevirdiğinizde, tüm çevredeki kilitler aynı anda kapanır ve açılır.

### İspanyolet Nasıl Çalışır?

İspanyolet sistemi şu parçalardan oluşur:

1. **Ana Kilit Kutusu**: Kol bağlantısı burada
2. **Köşe Aktarıcılar**: Hareketi köşelere iletir
3. **Kilit Dilleri**: Kasaya kilitlenen parçalar
4. **Menteşe Tarafı Kilitleri**: Menteşe tarafını sabitler

Kolu çevirdiğinizde, tüm bu parçalar senkronize hareket eder ve pencere 3-5 noktadan kilitlenir.

### İspanyolet Arızası Belirtileri

Şu durumlarda ispanyolet değişimi gerekebilir:

- Kol zorla dönüyor
- Pencere tam kapanmıyor
- Kilit dilleri çıkmıyor
- Kol gevşek veya sallanıyor
- Tuhaf sesler geliyor

### İspanyolet Değişimi

İspanyolet değişimi profesyonel ekip tarafından yapılmalıdır:

1. Eski ispanyolet sökümlür
2. Yeni ispanyolet monte edilir
3. Ayar yapılır
4. Test edilir

İşlem süresi: 30-45 dakika

### Orijinal Yedek Parça Önemi

Kalitesiz ispanyoletler:

- Çabuk bozulur
- Güvenlik riski oluşturur
- Pencereye zarar verebilir

Egepen orijinal yedek parçalar, 5 yıl garanti kapsamındadır.

---

*Akçayapı olarak orijinal Egepen ispanyolet değişimi hizmeti sunuyoruz. Aynı gün servis için bizi arayın.*
        `,
        category: "bakim",
        image: "/images/sineklik/menteseli-sineklik.png",
        author: "Akçayapı Servis Ekibi",
        date: "2025-12-28",
        readTime: "5 dk",
        tags: ["İspanyolet", "Pencere Kilidi", "Tamir", "Yedek Parça"],
        seoKeywords: ["ispanyolet nedir", "ispanyolet değişimi", "PVC pencere kilit tamiri", "pencere kolu tamiri"],
    },
    {
        id: "5",
        slug: "panjur-cesitleri-ve-secimi",
        title: "Panjur Çeşitleri: Evime Hangisi Uygun?",
        excerpt: "Motorlu, manuel, alüminyum ve PVC panjur sistemleri arasındaki farkları ve hangisini seçmeniz gerektiğini öğrenin.",
        content: `
## Panjur Sistemleri Karşılaştırması

Panjurlar, güneş kontrolü, mahremiyet ve güvenlik sağlayan önemli yapı elemanlarıdır. İşte farklı panjur türlerinin karşılaştırması:

### 1. Manuel Panjurlar

**Avantajları:**
- Ekonomik fiyat
- Elektrik gerektirmez
- Basit mekanizma

**Dezavantajları:**
- Fiziksel efor gerektirir
- Kayış zamanla aşınır

### 2. Motorlu Panjurlar

**Avantajları:**
- Tek tuşla kontrol
- Akıllı ev entegrasyonu
- Zamanlayıcı özelliği

**Dezavantajları:**
- Daha yüksek maliyet
- Elektrik bağımlılığı

### 3. Alüminyum Lamel Panjurlar

**Avantajları:**
- Hafif ve dayanıklı
- Pas tutmaz
- Poliüretan dolgulu modeller ısı yalıtır

**Dezavantajları:**
- Darbelere karşı ezilme riski

### 4. PVC Lamel Panjurlar

**Avantajları:**
- Çok ekonomik
- Hafif

**Dezavantajları:**
- Güneşte renk solabilir
- Daha az dayanıklı

## Hangi Panjuru Seçmeliyim?

| Durum | Öneri |
|-------|-------|
| Villa, müstakil ev | Motorlu alüminyum |
| Apartman dairesi | Manuel alüminyum |
| Bütçe sınırlı | Manuel PVC |
| Akıllı ev sistemi | Motorlu + WiFi |

### Kurulum Yeri

Panjur kutusu iki şekilde monte edilebilir:

1. **Gizli Kutu**: Pencere ile duvar arasına gömülü
2. **Dıştan Takma**: Duvar üzerine monteli kutu

Gizli kutu estetik açıdan daha iyi görünür ancak renovasyonlarda uygulanması zor olabilir.

---

*Beylikdüzü'de panjur montajı ve tamiri için Akçayapı'yı tercih edin.*
        `,
        category: "dekorasyon",
        image: "/images/panjur/panjur-motorlu-villa.jpg",
        author: "Akçayapı Uzman Ekibi",
        date: "2025-12-15",
        readTime: "6 dk",
        tags: ["Panjur", "Motorlu Panjur", "Alüminyum Panjur", "Güneş Kontrolü"],
        seoKeywords: ["panjur çeşitleri", "motorlu panjur fiyatları", "alüminyum panjur", "panjur montajı Beylikdüzü"],
    },
    {
        id: "6",
        slug: "dusakabin-temizlik-bakimi",
        title: "Duşakabin Temizliği ve Bakımı: Parlaklığı Koruyun",
        excerpt: "Duşakabininizin ilk günkü parlaklığını koruması için uygulayabileceğiniz pratik temizlik yöntemlerini keşfedin.",
        content: `
## Duşakabin Bakımında Altın Kurallar

Temperli cam duşakabinler zamanla kireç ve sabun artığı ile kaplanabilir. İşte duşakabininizi her zaman parlak tutmanın yolları:

### Günlük Bakım

Her duştan sonra:

1. Camları lastik silici (çekpas) ile kurulayın
2. Su birikintilerini alın
3. Kapıyı açık bırakarak havalandırın

Bu basit adımlar, kireç oluşumunu %80 oranında azaltır.

### Haftalık Temizlik

Sirke ve su karışımı (1:1 oranında) doğal ve etkili bir temizleyicidir:

1. Karışımı sprey şişesine doldurun
2. Camlara püskürtün
3. 5-10 dakika bekletin
4. Mikrofiber bezle silin

### Aylık Derin Temizlik

Ağır kireç birikintileri için:

1. Sitrik asit bazlı temizleyici kullanın
2. Tüm yüzeylere uygulayın
3. 15-20 dakika bekletin
4. Fırçalayın ve durulayın

### Profil Bakımı

Alüminyum veya paslanmaz profiller için:

- Aşındırıcı kullanmayın
- Yumuşak bezle silin
- Krom parlatıcı uygulayın

### Manyetik Fitil Bakımı

Fitiller kapı sızdırmazlığını sağlar:

- Düzenli kontrol edin
- Silikon sprey ile koruyun
- Sertleşince değiştirin

## ClearShield Teknolojisi

Akçayapı duşakabinlerinde kullanılan ClearShield kaplama:

✓ Kir ve kireç tutmaz
✓ Temizlik süresini %50 azaltır
✓ 5 yıla kadar etkili

---

*Duşakabin montajı ve bakımı için Beylikdüzü Akçayapı'yı arayın.*
        `,
        category: "bakim",
        image: "/images/dusakabin/dusakabin-siyah-profil-genis.jpg",
        author: "Akçayapı Uzman Ekibi",
        date: "2025-12-01",
        readTime: "5 dk",
        tags: ["Duşakabin", "Temizlik", "Bakım", "Kireç Temizliği"],
        seoKeywords: ["duşakabin temizliği", "duşakabin kireç temizliği", "cam duşakabin bakımı", "temperli cam temizliği"],
    },
];

export const blogCategories = [
    { id: "all", name: "Tümü", icon: "📚" },
    { id: "pvc-pencere", name: "PVC Pencere", icon: "🪟" },
    { id: "cam-balkon", name: "Cam Balkon", icon: "🏠" },
    { id: "bakim", name: "Bakım & Onarım", icon: "🔧" },
    { id: "enerji-tasarrufu", name: "Enerji Tasarrufu", icon: "⚡" },
    { id: "dekorasyon", name: "Dekorasyon", icon: "🎨" },
];

/**
 * Helper Functions
 */
export function getBlogPostBySlug(slug: string): BlogPost | undefined {
    return blogPosts.find((post) => post.slug === slug);
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
    if (category === "all") return blogPosts;
    return blogPosts.filter((post) => post.category === category);
}

export function getRelatedPosts(currentSlug: string, limit: number = 3): BlogPost[] {
    const currentPost = getBlogPostBySlug(currentSlug);
    if (!currentPost) return blogPosts.slice(0, limit);

    return blogPosts
        .filter((post) => post.slug !== currentSlug && post.category === currentPost.category)
        .slice(0, limit);
}

export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("tr-TR", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}
