'use client';

import { useState } from 'react';
import { businessConfig } from '@/config/business.config';

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
        answer: 'Kaliteli motorlar (Somfy, Becker) çok nadiren arıza yapar. Bu markalar 50.000+ açma/kapama döngüsü garanti eder. Olası arızalar genellikle elektrik kesintisi, kumanda pil bitimi veya sensör kalibrasyonu kaynaklıdır. Sistemimizde manuel override bulunur, elektrik kesilse bile camları elle kapatabilirsiniz. Opsiyonel UPS ile 24 saat kesintisiz çalışma sağlanır.',
        category: 'technical',
    },
    {
        question: '8mm mi 10mm cam mı daha iyi?',
        answer: '10mm cam, 8mm\'ye göre %25 daha kalın ve daha dayanıklıdır. Yüksek katlar (5. kat ve üzeri), rüzgarlı bölgeler ve geniş panel açıklıkları (90cm üzeri) için 10mm önerilir. Alt katlar ve standart balkonlar için 8mm yeterlidir. Fiyat farkı metrekarede %15-20 civarındadır.',
        category: 'technical',
    },
    {
        question: 'Temperli cam mı lamine cam mı güvenli?',
        answer: 'Her ikisi de güvenlik camıdır ancak farklı özelliklere sahiptir. Temperli cam kırıldığında küçük, küt kenarlı parçalara ayrılır (yaralanma riski düşük). Lamine cam ise kırıldığında PVB film parçaları yerinde tutar, dağılmaz. Çocuklu evlerde ve güvenlik öncelikli mekanlarda lamine cam önerilir. Fiyat olarak lamine cam %40-50 daha pahalıdır.',
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
        answer: 'Cam balkon fiyatları sisteme, cam kalınlığına ve profil kalitesine göre değişir. 2026 yılı ortalama fiyatları: Katlanır sistem 3.500-5.500 ₺/m², Eşikli sürme 4.000-6.000 ₺/m², Eşiksiz sürme 5.000-7.500 ₺/m², Isıcamlı sistem 7.000-12.000 ₺/m², Motorlu giyotin 10.000-18.000 ₺/m². Montaj dahil, KDV hariç fiyatlardır. Kesin fiyat için ücretsiz keşif gereklidir.',
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
    { id: 'pricing', label: 'Fiyat', icon: '💰' },
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
                    <div className="flex flex-wrap justify-center gap-3 mb-12">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all ${activeCategory === cat.id
                                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30'
                                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
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
                                className="group border border-neutral-200 rounded-2xl overflow-hidden hover:border-primary-300 transition-all bg-white shadow-sm hover:shadow-md"
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
                                    <span className="flex-shrink-0 w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center group-open:rotate-180 group-open:bg-primary-100 transition-all duration-300">
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

                    {/* More Questions CTA */}
                    <div className="mt-12 text-center">
                        <p className="text-neutral-500 mb-4">Aradığınız cevabı bulamadınız mı?</p>
                        <a
                            href={`https://wa.me/${businessConfig.contact.whatsapp}?text=${encodeURIComponent("Merhaba, cam balkon hakkında bir sorum var.")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-bold rounded-full hover:bg-green-600 transition-colors shadow-lg shadow-green-500/30"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            WhatsApp ile Sorun
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}
