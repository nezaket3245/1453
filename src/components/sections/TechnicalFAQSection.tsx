'use client';

import { useState } from 'react';

/**
 * Technical FAQ Section with Schema.org FAQPage markup
 * SEO: Targets Google Featured Snippets with <details>/<summary> semantic HTML
 * Keywords: "Cam balkon su sızdırır mı?", "Isıcamlı cam balkon kışın ısıtır mı?"
 */

export interface FAQItem {
    question: string;
    answer: string;
    category?: 'technical' | 'pricing' | 'maintenance' | 'safety';
}

interface TechnicalFAQSectionProps {
    faqs: FAQItem[];
    title?: string;
    subtitle?: string;
    showSchema?: boolean;
}

// Comprehensive FAQ data for cam balkon systems
export const camBalkonFAQs: FAQItem[] = [
    // Technical Questions
    {
        question: 'Cam balkon su sızdırır mı?',
        answer: 'Profesyonel montaj yapılan cam balkon sistemleri su sızdırmaz. Sistemlerimizde çift sıra EPDM conta, gizli su tahliye kanalları ve silikon fitil kullanılır. Yağmur suyu kontrollü şekilde dışarıya tahliye edilir. Ancak ucuz ve kalitesiz montajlarda conta eksikliği veya hatalı eğim nedeniyle su sızıntısı yaşanabilir. Akçayapı olarak tüm montajlarımızda su testi yapıyoruz.',
        category: 'technical',
    },
    {
        question: 'Isıcamlı cam balkon kışın ısıtır mı?',
        answer: 'Isıcamlı sistemler kendi başına ısıtma yapmaz ancak dışarıdan gelen soğuğu engelleyerek iç mekanın sıcaklığını korur. 24-28mm Argon gazlı çift cam ünitesi, dışarıdaki soğuk havayı izole eder. Evinizin ısısı balkona sızar ve ısıcam bu ısıyı dışarıya kaçırmaz. Bu sayede balkonunuz kışın bile 10-15°C daha sıcak kalır. Ek ısıtıcı (elektrikli radyatör) kullanırsanız kış bahçesi olarak kullanabilirsiniz.',
        category: 'technical',
    },
    {
        question: 'Hangi cam balkon sistemi daha güvenli?',
        answer: 'Güvenlik açısından en önemli faktör cam kalınlığı ve tipidir. 10mm temperli cam, 8mm\'ye göre daha dayanıklıdır. Lamine (katmanlı) cam ise kırıldığında dağılmadığı için çocuklu evlerde önerilir. Sistem bazında, eşikli sürme sistemler fiziksel bariyer oluşturduğu için daha güvenlidir. Yüksek katlarda motorlu giyotin sistemler rüzgar sensörü ile otomatik kapanır.',
        category: 'safety',
    },
    {
        question: 'Cam balkon kaç yıl dayanır?',
        answer: 'Kaliteli alüminyum profilli cam balkon sistemleri 25-30 yıl dayanır. Camların ömrü pratik olarak sınırsızdır. Contalar 8-10 yılda bir değiştirilmelidir. Rulmanlı mekanizmalar 15-20 yıl sorunsuz çalışır. Motorlu sistemlerde motor ömrü 10-15 yıldır. Düzenli bakım (yılda 1-2 kez silikon yağlama) ömrü uzatır.',
        category: 'maintenance',
    },
    {
        question: 'Motorlu cam balkon arıza yapar mı?',
        answer: 'Kaliteli motorlar (Somfy, Becker) çok nadiren arıza yapar. Bu markalar 50.000+ açma/kapama döngüsü için test edilmiştir. Olası arızalar genellikle elektrik kesintisi, kumanda pil bitimi veya sensör kalibrasyonu kaynaklıdır. Sistemimizde manuel override bulunur, elektrik kesilse bile camları elle kapatabilirsiniz. Opsiyonel UPS ile 24 saat kesintisiz çalışma sağlanır.',
        category: 'technical',
    },
    {
        question: '8mm mi 10mm cam mı daha iyi?',
        answer: '10mm cam, 8mm\'ye göre %25 daha kalın ve daha dayanıklıdır. Yüksek katlar (5. kat ve üzeri), rüzgarlı bölgeler ve geniş panel açıklıkları (90cm üzeri) için 10mm önerilir. Alt katlar ve standart balkonlar için 8mm yeterlidir. Detaylı bilgi için bizi arayın.',
        category: 'technical',
    },
    {
        question: 'Temperli cam mı lamine cam mı güvenli?',
        answer: 'Her ikisi de güvenlik camıdır ancak farklı özelliklere sahiptir. Temperli cam kırıldığında küçük, küt kenarlı parçalara ayrılır (yaralanma riski düşük). Lamine cam ise kırıldığında PVB film parçaları yerinde tutar, dağılmaz. Çocuklu evlerde ve güvenlik öncelikli mekanlarda lamine cam önerilir. Detaylı bilgi için bizi arayın.',
        category: 'safety',
    },
    {
        question: 'Cam balkon yoğuşma yapar mı?',
        answer: 'Tek camlı sistemlerde kış aylarında yoğuşma (buğulanma) normal bir fizik olayıdır. Isıcamlı sistemlerde çift cam arasındaki Argon gazı iç cam yüzeyini sıcak tuttuğu için yoğuşma önemli ölçüde azalır. Yoğuşmayı tamamen önlemek için havalandırma önemlidir. Bazı sistemlerde havalandırma menfezi veya açılır pencere opsiyonu bulunur.',
        category: 'technical',
    },
    {
        question: 'Eşikli mi eşiksiz mi cam balkon?',
        answer: 'Eşikli sistemler: Su ve rüzgar yalıtımında üstün, fırtınalı bölgelerde tercih edilir, eşik yüksekliği 2-3cm. Eşiksiz sistemler: Zemin ile aynı seviyede, modern görünüm, kafe/restoran için ideal, engelli erişimine uygun. Deniz kenarı ve yüksek katlarda eşikli, iç mekanlarda ve ticari alanlarda eşiksiz sistem önerilir.',
        category: 'technical',
    },
    {
        question: 'Argon gazlı cam ne işe yarar?',
        answer: 'Argon gazı, ısıcamlı ünitelerde iki cam arasına doldurulur. Havadan %34 daha yoğun olan Argon, ısı transferini yavaşlatarak yalıtım performansını artırır. Argon gazlı camlar, hava dolgulu camlara göre %15-20 daha iyi ısı yalıtımı sağlar. Ug değeri (ısı geçirgenlik katsayısı) düşer, enerji tasarrufu artar. Kaliteli üretimde Argon kaybı yılda %1\'den azdır.',
        category: 'technical',
    },
    {
        question: 'Cam balkon metrekare fiyatı 2026 ne kadar?',
        answer: 'Cam balkon fiyatları sisteme, cam kalınlığına ve profil kalitesine göre değişir. Kesin fiyat bilgisi için ücretsiz keşif gereklidir. Bizi arayın, size özel teklif hazırlayalım.',
        category: 'pricing',
    },
    {
        question: 'Cam balkon nasıl temizlenir?',
        answer: 'Düzenli temizlik için yumuşak bez ve cam temizleyici yeterlidir. Asla aşındırıcı maddeler veya metal fırça kullanmayın. Profiller için silikon bazlı temizleyiciler uygundur. Rayları 3 ayda bir vakumla temizleyin ve silikon sprey uygulayın. Contaları yılda bir kez silikon koruyucu ile bakım yapın. Yüksek katlarda dış yüzey için profesyonel temizlik önerilir.',
        category: 'maintenance',
    },
];

// Generate FAQPage Schema.org markup
function generateFAQSchema(faqs: FAQItem[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    };
}

// Category filter tabs
const categories = [
    { id: 'all', label: 'Tümü', icon: '📋' },
    { id: 'technical', label: 'Teknik', icon: '⚙️' },
    { id: 'safety', label: 'Güvenlik', icon: '🛡️' },
    { id: 'pricing', label: 'Bilgi', icon: '📞' },
    { id: 'maintenance', label: 'Bakım', icon: '🔧' },
];

export function TechnicalFAQSection({
    faqs = camBalkonFAQs,
    title = 'Cam Balkon Hakkında Sık Sorulan Sorular',
    subtitle = 'Teknik ekibimiz en çok merak edilen soruları yanıtladı',
    showSchema = true,
}: TechnicalFAQSectionProps) {
    const [activeCategory, setActiveCategory] = useState<string>('all');
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const filteredFAQs = activeCategory === 'all'
        ? faqs
        : faqs.filter((faq) => faq.category === activeCategory);

    return (
        <>
            {/* FAQPage Schema for SEO */}
            {showSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(generateFAQSchema(faqs)),
                    }}
                />
            )}

            <section className="section bg-white" id="sss">
                <div className="container-custom">
                    {/* Header */}
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 text-xs font-bold rounded-full uppercase tracking-widest mb-4">
                            Bilgi Bankası
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                            {title}
                        </h2>
                        <p className="text-lg text-neutral-600">
                            {subtitle}
                        </p>
                    </div>

                    {/* Category Filters */}
                    <div className="flex flex-wrap justify-center gap-3 mb-12" role="tablist" aria-label="SSS kategorileri">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                aria-pressed={activeCategory === cat.id}
                                aria-label={`${cat.label} kategorisi`}
                                className={`px-5 py-2.5 rounded-full font-medium text-sm transition-colors ${activeCategory === cat.id
                                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30'
                                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                                    }`}
                            >
                                <span className="mr-2">{cat.icon}</span>
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    {/* FAQ List with Semantic HTML */}
                    <div className="max-w-4xl mx-auto space-y-4">
                        {filteredFAQs.map((faq, index) => (
                            <details
                                key={index}
                                className="group border border-neutral-200 rounded-2xl overflow-hidden hover:border-primary-300 transition-colors bg-white shadow-sm hover:shadow-md"
                                open={openIndex === index}
                                onToggle={(e) => {
                                    if ((e.target as HTMLDetailsElement).open) {
                                        setOpenIndex(index);
                                    } else if (openIndex === index) {
                                        setOpenIndex(null);
                                    }
                                }}
                            >
                                <summary className="flex items-center justify-between p-6 cursor-pointer list-none font-bold text-neutral-900 hover:bg-neutral-50 transition-colors">
                                    <span className="pr-8">{faq.question}</span>
                                    <span className="flex-shrink-0 w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center group-open:rotate-180 group-open:bg-primary-100 transition-colors duration-300">
                                        <svg
                                            className="w-5 h-5 text-neutral-500 group-open:text-primary-600"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </span>
                                </summary>
                                <div className="px-6 pb-6 pt-2 text-neutral-700 leading-relaxed border-t border-neutral-100 bg-neutral-50">
                                    <p>{faq.answer}</p>
                                    {faq.category && (
                                        <div className="mt-4 pt-4 border-t border-neutral-200">
                                            <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
                                                Kategori: {categories.find(c => c.id === faq.category)?.label}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </details>
                        ))}
                    </div>

                    {/* More Questions */}
                    <div className="mt-12 text-center">
                        <p className="text-neutral-500 mb-4">Aradığınız cevabı bulamadınız mı?</p>
                        <a
                            href="/iletisim"
                            title="İletişim Sayfasına Git"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-bold rounded-full hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/30"
                        >
                            Bize Ulaşın
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}
