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
- **70-76mm Profiller**: Orta sınıf, iyi yalıtım (Legend Art serisi)
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

### 4. Marka Seçimi

Marka seçerken şunlara dikkat edin:

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

*Egepen Akçayapı olarak Beylikdüzü, Gürpınar ve çevresinde ücretsiz keşif hizmeti sunuyoruz. Detaylı bilgi için [iletişim sayfamızı](/iletisim) ziyaret edin.*
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

*Cam balkon bakım ve onarım hizmetlerimiz hakkında bilgi almak için [iletişim sayfamızı](/iletisim) ziyaret edin.*
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

*Beylikdüzü ve çevresinde ücretsiz enerji analizi için [iletişim sayfamızı](/iletisim) ziyaret edin.*
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

Egepen orijinal yedek parçalar ile uzun ömürlü kullanım sağlanır.

---

*Akçayapı olarak orijinal Egepen ispanyolet değişimi hizmeti sunuyoruz. Aynı gün servis için [iletişim sayfamızı](/iletisim) ziyaret edin.*
        `,
        category: "bakim",
        image: "/images/pvc/pvc-servis-egepen.jpg",
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

*Beylikdüzü'de panjur montajı ve tamiri için [iletişim sayfamızı](/iletisim) ziyaret edin.*
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

*Duşakabin montajı ve bakımı için [iletişim sayfamızı](/iletisim) ziyaret edin.*
        `,
        category: "bakim",
        image: "/images/dusakabin/dusakabin-siyah-profil-genis.jpg",
        author: "Akçayapı Uzman Ekibi",
        date: "2025-12-01",
        readTime: "5 dk",
        tags: ["Duşakabin", "Temizlik", "Bakım", "Kireç Temizliği"],
        seoKeywords: ["duşakabin temizliği", "duşakabin kireç temizliği", "cam duşakabin bakımı", "temperli cam temizliği"],
    },
    {
        id: "7",
        slug: "beylikduzu-cam-balkon-montaji",
        title: "Beylikdüzü Cam Balkon Montajı Nasıl Yapılır? Adım Adım Süreç",
        excerpt: "Cam balkon montajı profesyonel ekip gerektirir. Keşiften montaja kadar tüm süreci, dikkat edilmesi gerekenleri ve Beylikdüzü'ne özel ipuçlarını anlattık.",
        content: `
## Cam Balkon Montajı: Baştan Sona Süreç

Cam balkon yaptırmayı düşünüyorsanız, montaj sürecini bilmek hem beklentilerinizi yönetmenize hem de doğru firmayı seçmenize yardımcı olur.

### 1. Ücretsiz Keşif ve Ölçü

Her şey bir telefon aramasıyla başlar. Uzman ekibimiz evinize gelerek:

- Balkon ölçülerini milimetrik hassasiyetle alır
- Binanın rüzgar yüküne göre sistem önerir
- Kat yüksekliğine uygun cam kalınlığını belirler
- Isıcamlı mı, tek cam mı ihtiyacınıza göre seçim yapar

### 2. Sistem Seçimi

Beylikdüzü'nde denize yakın binalarda rüzgar direnci kritiktir:

- **Katlanır Sistem**: Tam açılabilir, manzara kaybı yok
- **Sürme Sistem**: Raylı, pratik kullanım
- **Isıcamlı Sistem**: Kış aylarında tam yalıtım

### 3. Profil ve Cam Üretimi

Ölçüler fabrikaya gönderilir. Üretim süresi genellikle **7-10 iş günüdür**. Bu sürede:

- Alüminyum profiller özel ölçüde kesilir
- Camlar temperli olarak üretilir (güvenlik standardı)
- Aksesuar ve fitiller hazırlanır

### 4. Montaj Günü

Profesyonel montaj genellikle **1-2 gün** sürer:

- Eski korkuluklar gerekirse sökülebilir
- Su tahliye kanalları açılır
- Profiller sabitlenir, camlar takılır
- Silikon ve fitil uygulaması yapılır
- Temizlik ve son kontrol

### 5. Beylikdüzü'ne Özel Dikkat Noktaları

- **Rüzgar**: Yüksek katlarda mutlaka 8mm temperli cam tercih edin
- **Tuz**: Denize yakın konumlarda korozyona dayanıklı aksesuar şart
- **Yönetmelik**: Bazı sitelerde cam balkon için yönetim kurulu izni gerekir

---

*Beylikdüzü'nde ücretsiz keşif için [hemen arayın](/iletisim).*
        `,
        category: "cam-balkon",
        image: "/images/cam-balkon/cam-balkon-hero.jpg",
        author: "Akçayapı Uzman Ekibi",
        date: "2026-01-15",
        readTime: "6 dk",
        tags: ["Cam Balkon", "Montaj", "Beylikdüzü", "Isıcamlı"],
        seoKeywords: ["cam balkon montajı", "beylikdüzü cam balkon", "cam balkon nasıl yapılır", "cam balkon montaj süreci"],
    },
    {
        id: "8",
        slug: "pvc-pencere-bakimi-kis-aylari",
        title: "Kış Aylarında PVC Pencere Bakımı: 7 Altın Kural",
        excerpt: "Kış soğuklarında pencerelerinizin performansını en üst düzeyde tutmak için yapmanız gereken 7 kritik bakım adımını açıklıyoruz.",
        content: `
## Kışa Hazır Pencereler İçin 7 Altın Kural

Kış ayları PVC pencereler için en zorlu dönemdir. Doğru bakımla hem enerji tasarrufu sağlar hem de pencerelerin ömrünü uzatırsınız.

### 1. Conta Kontrolü

Contalar pencerenin hava ve su sızdırmazlığını sağlayan en kritik parçadır:

- **Görsel kontrol**: Contaları parmaklarınızla kontrol edin, çatlak veya sertleşme var mı?
- **Kağıt testi**: Pencereyi kapatıp arasına kağıt sıkıştırın. Kağıt kolayca çıkıyorsa conta değişimi gerekebilir
- **Yağlama**: Silikon bazlı sprey ile contaları yumuşak tutun

### 2. İspanyolet Bakımı

İspanyolet (kilitleme mekanizması) pencerenin sıkıca kapanmasını sağlar:

- Her 6 ayda bir yağlayın (silikon sprey veya hafif makine yağı)
- Kilit noktalarını kontrol edin
- Sert açma-kapama varsa menteşe ayarı yaptırın

### 3. Drenaj Kanalları

PVC profillerin altında su tahliye delikleri bulunur:

- Bu delikleri düzenli kontrol edin
- Tıkanmışsa ince bir tel veya çubukla açın
- Tıkalı drenaj → profil içinde su birikimi → küf ve korozyon

### 4. Cam Temizliği

Temiz camlar güneş ışığının içeri girmesini artırır:

- Hafif sabunlu su ve yumuşak bez kullanın
- Asla jilet veya aşındırıcı temizleyici kullanmayın
- Low-E kaplamalı camlarda özel cam temizleyicisi tercih edin

### 5. Profil Temizliği

- Beyaz profilleri sabunlu suyla silin
- Renk değişimine yol açacak çamaşır suyu veya aseton kullanmayın
- Laminasyon kaplamalı profillerde sadece nemli bez yeterlidir

### 6. Menteşe Ayarı

Kış soğuğunda profiller hafifçe büzüşebilir:

- Pencere iyi oturmuyorsa menteşe ayarı yaptırın
- Allen anahtar ile basit ayar yapılabilir (her yöne 1-2mm)
- Emin değilseniz profesyonel çağırın

### 7. Isıcam Kontrolü

- Camların arasında buğu oluşuyorsa ısıcam sızdırıyor demektir
- Bu durumda cam ünitesinin değişmesi gerekir (profil değişmez)
- Egepen kaliteli ısıcamlarda bu sorun çok nadir yaşanır

---

*Pencere bakımı için profesyonel destek almak isterseniz [bize ulaşın](/iletisim).*
        `,
        category: "bakim",
        image: "/images/pvc/pvc-pencere-beyaz.jpg",
        author: "Akçayapı Uzman Ekibi",
        date: "2026-01-25",
        readTime: "5 dk",
        tags: ["PVC Pencere", "Bakım", "Kış", "Conta", "İspanyolet"],
        seoKeywords: ["pvc pencere bakımı", "kış pencere bakımı", "pencere conta değişimi", "ispanyolet bakımı"],
    },
    {
        id: "9",
        slug: "sineklik-cesitleri-hangisi-secilmeli",
        title: "Sineklik Çeşitleri: Evinize Hangisi Uygun?",
        excerpt: "Plise, sürme, menteşeli ve kedi sinekliği arasında seçim yapmak zor olabilir. Her modelin avantaj ve dezavantajlarını karşılaştırdık.",
        content: `
## Doğru Sineklik Nasıl Seçilir?

Sineklik alırken pencere tipiniz, kullanım alışkanlıklarınız ve evcil hayvan durumunuz belirleyicidir.

### Plise Sineklik

Akordeon gibi katlanarak açılır-kapanır. En estetik modeldir.

**Avantajları:**
- Açıkken neredeyse görünmez
- Dikey ve yatay modeller mevcut
- Kapı ve pencerede kullanılabilir
- Renk seçenekleri çok geniş

**Dezavantajları:**
- Fiyatı diğerlerine göre yüksek
- Tül kumaşı zamanla değişim gerektirebilir

**İdeal kullanım:** Modern daireler, geniş kapı açıklıkları, estetik hassasiyeti olanlar.

### Sürme Sineklik

Pencere rayında kayarak açılır-kapanır.

**Avantajları:**
- Ekonomik fiyat
- Basit mekanizma, bozulması zor
- Kolay temizlenir

**Dezavantajları:**
- Tam kapanmayabilir (milimetrik boşluklar)
- Estetik olarak plise kadar şık değil

**İdeal kullanım:** Bütçe dostu çözüm arayanlar, sürme pencere sahipleri.

### Menteşeli Sineklik

Kapı gibi açılır-kapanır, mıknatıslı kapanma.

**Avantajları:**
- Sık geçiş yapılan kapılarda pratik
- İyi sızdırmazlık
- Dayanıklı yapı

**Dezavantajları:**
- Açık kaldığında yer kaplar
- Rüzgarda çarpabilir

**İdeal kullanım:** Balkon kapıları, mutfak kapıları.

### Kedi Sinekliği (Pet Screen)

Evcil hayvan sahipleri için güçlendirilmiş örgü.

**Avantajları:**
- Kedi tırmalamasına dayanıklı (PVC kaplı polyester)
- Standart sineklik örgüsünden 7 kat daha güçlü
- Evcil hayvanınız güvende kalır

**Dezavantajları:**
- Görüş netliği standart örgüye göre biraz düşer
- Fiyatı biraz daha yüksek

**İdeal kullanım:** Kedi ve küçük köpek sahipleri, yüksek katlarda yaşayanlar.

---

*Hangi sineklik size uygun? [Ücretsiz keşif ile yerinde görelim](/teklif-al).*
        `,
        category: "bakim",
        image: "/images/sineklik/sineklik-plise-genis.jpg",
        author: "Akçayapı Uzman Ekibi",
        date: "2026-02-01",
        readTime: "7 dk",
        tags: ["Sineklik", "Plise", "Kedi Sinekliği", "Sürme Sineklik"],
        seoKeywords: ["sineklik çeşitleri", "plise sineklik", "kedi sinekliği", "sürme sineklik", "sineklik fiyatları"],
    },
    {
        id: "10",
        slug: "enerji-tasarrufu-pencere-yalitim",
        title: "Pencere Yalıtımı ile Enerji Tasarrufu: Faturalarınızı %40 Düşürün",
        excerpt: "Isı kaybının %25-30'u pencerelerden olur. Doğru pencere seçimi ve yalıtımıyla faturalarınızı ciddi oranda düşürebilirsiniz.",
        content: `
## Pencerelerden Kaçan Isıyı Durdurun

Bir evin toplam ısı kaybının yaklaşık **%25-30'u pencerelerden** gerçekleşir. Eski, tek camlı veya contası bozulmuş pencereler, kışın ısıtma maliyetinizi ciddi şekilde artırır.

### Pencere Yalıtımında Kritik Faktörler

#### 1. Uw Değeri (Isı Geçirgenlik Katsayısı)

Pencere performansını ölçen en önemli değer:

| Pencere Tipi | Uw Değeri | Yalıtım Kalitesi |
|---|---|---|
| Eski tek cam | 5.0+ W/m²K | Çok kötü |
| Çift cam, eski profil | 2.5-3.0 | Orta |
| Egepen Legend Art | 1.0-1.2 | İyi |
| Egepen Legend (80mm) | 0.8-1.0 | Mükemmel |
| Üçlü cam + Legend | 0.6-0.8 | En üstün |

**Kural:** Uw değeri ne kadar düşükse, yalıtım o kadar iyi.

#### 2. Profil Genişliği ve Odacık Sayısı

- **60mm, 3 odacık**: Temel yalıtım
- **70mm, 5 odacık** (Legend Art): Gelişmiş yalıtım, en popüler
- **80mm, 7 odacık** (Legend): Premium yalıtım

#### 3. Cam Teknolojisi

- **Low-E Kaplama**: Isıyı içeri yansıtır, güneşi geçirir
- **Argon Gazı**: Cam arasında hava yerine argon → %15 daha iyi yalıtım
- **Üçlü Cam**: İki hava boşluğu, maksimum yalıtım

### Gerçek Tasarruf Hesabı

Tipik bir 100m² Beylikdüzü dairesinde eski pencereden yeniye geçişte:

- **Doğalgaz faturası**: Aylık ~₺800 → ~₺500 (kış ayları)
- **Yıllık tasarruf**: ~₺2.400
- **Yatırımın geri dönüşü**: 3-5 yıl

### Bonus: Ses Yalıtımı

Beylikdüzü'nde E-5'e veya Metrobüs hattına yakın yaşayanlar için:

- Çift cam: 25-30 dB azaltma
- Üçlü cam: 35-40 dB azaltma
- Lamine cam: 40+ dB azaltma (en sessiz)

---

*Eviniz için enerji raporu almak isterseniz [ücretsiz keşif talep edin](/teklif-al).*
        `,
        category: "enerji-tasarrufu",
        image: "/images/pvc/legend-reklam.jpg",
        author: "Akçayapı Uzman Ekibi",
        date: "2026-02-05",
        readTime: "6 dk",
        tags: ["Enerji Tasarrufu", "Pencere Yalıtımı", "Isı Yalıtımı", "Uw Değeri"],
        seoKeywords: ["pencere yalıtımı", "enerji tasarrufu pencere", "pvc pencere ısı yalıtımı", "uw değeri nedir"],
    },
    {
        id: "11",
        slug: "motorlu-panjur-akilli-ev-entegrasyonu",
        title: "Motorlu Panjur ve Akıllı Ev: Evinizi Telefondan Yönetin",
        excerpt: "Motorlu panjur sistemleri, akıllı ev entegrasyonuyla güvenlik, enerji tasarrufu ve konfor sağlar. Alexa, Google Home ve Somfy ile uyumlu çözümler.",
        content: `
## Motorlu Panjur: Lüks Değil, İhtiyaç

Motorlu panjur artık sadece villalar için değil. Apartman dairelerinde de güvenlik, konfor ve enerji verimliliği sağlayan akıllı bir yatırım.

### Motorlu Panjur Nasıl Çalışır?

Panjur lamelleri içine yerleştirilen elektrik motoru ile:

- **Kumanda ile**: Her odadan bağımsız kontrol
- **Zamanlayıcı ile**: Sabah otomatik açılır, akşam kapanır
- **Akıllı ev ile**: Telefonunuzdan veya sesli komutla kontrol

### Akıllı Ev Entegrasyonu

#### Somfy TaHoma Sistemi

Akçayapı olarak Somfy yetkili bayisiyiz. TaHoma hub ile:

- **Alexa**: "Alexa, yatak odası panjurunu kapat"
- **Google Home**: "Hey Google, tüm panjurları aç"
- **Apple HomeKit**: iPhone veya iPad ile kontrol
- **Senaryo**: Güneş batınca otomatik kapanma, sabah alarm saatinizle açılma

#### Sensör Desteği

- **Güneş sensörü**: Sıcak günlerde otomatik kapanır, evi serin tutar
- **Rüzgar sensörü**: Fırtınada otomatik kapanarak hasarı önler
- **Yağmur sensörü**: Yağmur başlayınca panjurlar kapanır

### Güvenlik Avantajları

- **Tatil modu**: Evde yokken rastgele açılıp kapanarak evde biri varmış izlenimi yaratır
- **Hırsız caydırıcı**: Kapalı panjur → fiziksel bariyer
- **Yangın önlemi**: Poliüretan dolgulu lameller yalıtım sağlar

### Enerji Tasarrufu

Panjurlar pencere önünde ek bir yalıtım katmanı oluşturur:

- **Kışın**: %20-35 ısı kaybı azalır
- **Yazın**: Doğrudan güneş ışığını keser, klimaya %25 daha az ihtiyaç
- **Gürültü**: 10-15 dB ek ses yalıtımı

### Fiyat Karşılaştırması

| Sistem | Avantaj | Fiyat Aralığı |
|---|---|---|
| Manuel alüminyum panjur | Ekonomik, basit | Uygun |
| Motorlu alüminyum panjur | Konfor, uzaktan kontrol | Orta |
| Motorlu + Somfy TaHoma | Tam akıllı ev | Premium |

### Montaj Süreci

1. Ücretsiz keşif (pencere ölçüleri + elektrik altyapısı kontrolü)
2. Panjur kasası ve lamellerin üretimi (5-7 gün)
3. Montaj (pencere başına 1-2 saat)
4. Motor ayarı ve limitleme
5. Akıllı ev kurulumu (opsiyonel)

---

*Motorlu panjur ve akıllı ev çözümleri için [teklif alın](/teklif-al).*
        `,
        category: "dekorasyon",
        image: "/images/panjur/panjur-motorlu-villa.jpg",
        author: "Akçayapı Uzman Ekibi",
        date: "2026-02-10",
        readTime: "7 dk",
        tags: ["Motorlu Panjur", "Akıllı Ev", "Somfy", "Otomasyon"],
        seoKeywords: ["motorlu panjur", "akıllı ev panjur", "somfy panjur", "otomatik panjur fiyatları", "alexa panjur"],
    },
    {
        id: "12",
        slug: "cam-balkon-m2-fiyatlari-2026",
        title: "Cam Balkon M2 Fiyatları 2026: Isıcamlı ve Katlanır Sistemler",
        excerpt: "2026 yılı güncel cam balkon m2 fiyatları, ısıcamlı cam balkon maliyeti ve katlanır sistem karşılaştırması. Beylikdüzü'nde ücretsiz keşif ile net fiyat alın.",
        content: `
## 2026 Cam Balkon Fiyatları Ne Kadar?

Cam balkon yaptırmak isteyen ev sahiplerinin en çok merak ettiği konu fiyatlandırmadır. 2026 yılında cam balkon m2 fiyatları, kullanılan sisteme, cam tipine ve montaj koşullarına göre değişkenlik göstermektedir.

### Cam Balkon Fiyatlarını Etkileyen Faktörler

- Cam tipi (tek cam, ısıcamlı, lamine)
- Sistem türü (katlanır, sürme, sabit)
- Balkon ölçüleri ve şekli (düz, L, köşe)
- Kat yüksekliği ve ulaşılabilirlik
- Profil kalitesi (alüminyum kalınlığı)
- Montaj zorluğu

### Sistem Bazında Fiyat Karşılaştırması

| Sistem | Özellik | Fiyat Aralığı (m2) |
|---|---|---|
| Katlanır cam balkon | Tamamen açılır, ekonomik | Uygun |
| Isıcamlı cam balkon | Yalıtım sağlar, 4 mevsim | Orta-Premium |
| Sabit cam balkon | Manzara odaklı, temizlenmesi kolay | Orta |
| Köşe cam balkon | L ve U balkonlara özel | Premium |

### Isıcamlı Cam Balkon Neden Daha Pahalı?

Isıcamlı cam balkon, çift camlı yapısıyla kış aylarında balkonu yaşam alanına çevirir. Tek camlı sisteme göre fark:

- Kış aylarında 8-12°C daha sıcak balkon
- Dışarıdan gelen gürültüyü %40 azaltır
- Toz ve rüzgardan tam koruma
- Yoğuşma (buğulanma) problemi yaşanmaz

### Beylikdüzü'nde Cam Balkon Montajı

Beylikdüzü, Büyükçekmece ve çevre ilçelerde cam balkon montajı yaparken dikkat edilmesi gerekenler:

- Belediye izni: Bazı sitelerde yönetim kararı gerekir
- Rüzgar yükü: Yüksek katlarda güçlendirilmiş profil tercih edilmeli
- Yön: Güneye bakan balkonlarda güneş kontrol cam düşünülmeli
- Drenaj: Yağmur suyu tahliye sistemi planlanmalı

### Cam Balkon Ödeme Seçenekleri

Egepen Akçayapı olarak müşterilerimize esnek ödeme imkanları sunuyoruz:

- Nakit ödemede özel indirim
- Kredi kartına taksit imkanı (6-12 ay)
- Ücretsiz keşif ve ölçüm

---

*Balkonunuzun tam fiyatını öğrenmek için [ücretsiz keşif talep edin](/teklif-al). Aynı gün dönüş yapıyoruz.*
        `,
        category: "cam-balkon",
        image: "/images/cam-balkon/cam-balkon-sehir-manzara.jpg",
        author: "Akçayapı Uzman Ekibi",
        date: "2026-02-11",
        readTime: "5 dk",
        tags: ["Cam Balkon Fiyatları", "Isıcamlı Cam Balkon", "M2 Fiyat", "Beylikdüzü"],
        seoKeywords: ["cam balkon m2 fiyatları", "cam balkon m2 fiyat 2026", "ısıcamlı cam balkon fiyatları", "cam balkon fiyatları istanbul", "katlanır cam balkon fiyat"],
    },
    {
        id: "13",
        slug: "aluminyum-dograma-pvc-farki",
        title: "Alüminyum Doğrama mı PVC Pencere mi? Karşılaştırma Rehberi",
        excerpt: "Alüminyum doğrama ve PVC pencere arasındaki farkları, avantaj ve dezavantajlarını detaylı karşılaştırıyoruz. Hangi durumlarda hangisi tercih edilmeli?",
        content: `
## Alüminyum vs PVC: Hangisi Sizin İçin Doğru?

Pencere ve kapı seçiminde en sık karşılaşılan soru: "Alüminyum mı PVC mi?" Her iki malzemenin kendine özgü avantajları vardır. Bu rehberde objektif bir karşılaştırma yaparak doğru kararı vermenize yardımcı olacağız.

### Isı Yalıtımı Karşılaştırması

- PVC pencere Uw değeri: 0.8-1.3 W/m2K (mükemmel yalıtım)
- Alüminyum (thermal break) Uw değeri: 1.4-2.0 W/m2K (iyi yalıtım)
- Alüminyum (thermal break'siz) Uw değeri: 5.0+ W/m2K (zayıf yalıtım)

PVC pencere, ısı yalıtımında açık ara liderdir. Ancak thermal break teknolojili alüminyum doğramalar da kabul edilebilir yalıtım değerlerine ulaşabilmektedir.

### Ses Yalıtımı

Her iki sistem de cam kalınlığına bağlı olarak iyi ses yalıtımı sağlar:

- PVC + çift cam: 30-35 dB azaltma
- PVC + üçlü cam: 38-42 dB azaltma
- Alüminyum (thermal break) + çift cam: 28-32 dB azaltma

### Dayanıklılık ve Ömür

- PVC pencere ömrü: 30-50 yıl
- Alüminyum doğrama ömrü: 40-60 yıl
- PVC bakım: Düşük (yılda 2 kez silme yeterli)
- Alüminyum bakım: Düşük (eloksal kaplama ile)

### Hangi Durumlarda Alüminyum Tercih Edilmeli?

1. Geniş açıklıklar (4 metre üzeri)
2. Ticari projeler (mağaza, ofis cephe)
3. Minimal görünüm istenen yerler
4. Endüstriyel yapılar
5. Yüksek rüzgar yüküne maruz alanlar

### Hangi Durumlarda PVC Tercih Edilmeli?

1. Konut projeleri (ev, daire)
2. Maksimum enerji tasarrufu hedefi
3. Bütçe odaklı projeler
4. Ses yalıtımı öncelikli alanlar (yatak odaları)
5. Standart pencere ölçüleri

### Maliyet Karşılaştırması

| Kriter | PVC | Alüminyum (Thermal Break) |
|---|---|---|
| Başlangıç maliyeti | Uygun | Yüksek |
| Enerji tasarruf | Yüksek | Orta |
| Bakım maliyeti | Düşük | Düşük |
| 10 yıllık toplam maliyet | En ekonomik | Orta |

### Egepen Akçayapı'da Her İki Seçenek

Egepen Akçayapı olarak hem Egepen Deceuninck PVC pencere sistemleri hem de Alumil alüminyum doğrama çözümleri sunuyoruz. Projenize en uygun seçimi yapmak için:

- Ücretsiz keşif ile ölçü alıyoruz
- Her iki alternatifi fiyatlandırıyoruz
- Uzman önerimizi sunuyoruz

---

*PVC ve alüminyum seçeneklerini karşılaştırmak için [ücretsiz keşif randevusu alın](/teklif-al).*
        `,
        category: "pvc-pencere",
        image: "/images/aluminyum/thermal-break-pencere.webp",
        author: "Akçayapı Uzman Ekibi",
        date: "2026-02-12",
        readTime: "6 dk",
        tags: ["Alüminyum Doğrama", "PVC Pencere", "Karşılaştırma", "Pencere Seçimi"],
        seoKeywords: ["alüminyum doğrama mı pvc mi", "aluminyum pencere pvc pencere farkı", "pencere seçimi rehberi", "thermal break alüminyum", "pvc pencere avantajları"],
    },
    {
        id: "14",
        slug: "balkon-cam-kapama-izin-ve-ruhsat",
        title: "Cam Balkon İçin İzin Gerekli mi? Ruhsat ve Belediye Kuralları",
        excerpt: "Cam balkon yaptırmadan önce belediye izni, site yönetimi kararı ve imar kurallarını öğrenin. Beylikdüzü ve Büyükçekmece'deki güncel uygulama rehberi.",
        content: `
## Cam Balkon Yaptırmak İçin İzin Gerekli mi?

Cam balkon yaptırma kararı aldığınızda akla gelen ilk soru: "İzin almam gerekiyor mu?" Bu konuda net bilgi sahibi olmak, ileride yaşanabilecek sorunları önler.

### Yasal Durum

Kat Mülkiyeti Kanunu'na göre balkon kapatma, binanın dış cephesini ilgilendiren bir değişikliktir. Bu nedenle:

- Apartmanlarda: Kat maliklerinin oy birliği gerekir
- Sitelerde: Site yönetim kurulu kararı gerekir
- Müstakil evlerde: Belediye imar mevzuatına uygunluk yeterlidir

### Belediye Başvurusu Gerekli mi?

Mevcut mevzuata göre cam balkon uygulaması:

- Balkonun kapalı alana dönüştürülmesi durumunda: Ruhsat gereklidir
- Katlanır/açılır cam balkon sistemi: Genellikle ruhsat gerektirmez
- Isıcamlı sabit sistemler: Belediyeye göre değişir

### Beylikdüzü ve Büyükçekmece'de Uygulama

Beylikdüzü ve Büyükçekmece belediyelerinde cam balkon uygulamaları için:

- Katlanır cam balkon (açılır-kapanır): Çoğu durumda izin gerekmez
- Site yönetiminden yazılı izin almanız önerilir
- Binanın dış görünümüyle uyumlu renk ve tasarım tercih edilmeli
- Tüm daireler aynı sistemi kullanmalıdır (cephe bütünlüğü)

### Dikkat Edilmesi Gerekenler

1. Montaj öncesi mutlaka site yönetimine bilgi verin
2. Komşularınızla uyum sağlayın (aynı sistem, aynı renk)
3. Montaj sırasında apartman ortak alanlarına zarar vermeyin
4. Profesyonel ekiple çalışın (garanti ve sigorta kapsamı)
5. Montaj fotoğraflarını ve faturayı saklayın

### Cam Balkon Sigorta Kapsamı

- Profesyonel montaj yapılmışsa: Konut sigortası kapsamına alınabilir
- Cam kırılması: Ek teminat ile sigortalanabilir
- Doğal afet hasarı: Poliçe kapsamına göre değişir

### Egepen Akçayapı Güvencesi

Egepen Akçayapı olarak tüm cam balkon montajlarımızda:

- Montaj garantisi veriyoruz
- Site yönetimi ile koordinasyon sağlıyoruz
- Gerekli evrakları hazırlıyoruz
- Montaj sonrası kontrol raporu düzenliyoruz

---

*Cam balkon izin süreci hakkında detaylı bilgi ve ücretsiz keşif için [bize ulaşın](/iletisim).*
        `,
        category: "cam-balkon",
        image: "/images/cam-balkon/cam-balkon-site-manzara.jpg",
        author: "Akçayapı Uzman Ekibi",
        date: "2026-02-08",
        readTime: "5 dk",
        tags: ["Cam Balkon İzin", "Belediye Ruhsat", "Site Yönetimi", "Kat Mülkiyeti"],
        seoKeywords: ["cam balkon izin", "cam balkon ruhsat", "balkon kapatma izin", "cam balkon belediye izni", "apartman cam balkon kuralları"],
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
