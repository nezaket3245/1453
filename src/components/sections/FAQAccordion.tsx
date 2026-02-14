"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * FAQAccordion Component
 * 
 * SEO-optimized FAQ accordion with Schema.org markup.
 * Improves user experience with smooth animations.
 */

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQAccordionProps {
    faqs: FAQItem[];
    title?: string;
    subtitle?: string;
}

export function FAQAccordion({ faqs, title, subtitle }: FAQAccordionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    // Schema.org FAQPage
    const schemaData = {
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

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
            />

            <div className="max-w-3xl mx-auto">
                {title && (
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                            {title}
                        </h2>
                        {subtitle && (
                            <p className="text-lg text-neutral-600">{subtitle}</p>
                        )}
                    </div>
                )}

                <div className="space-y-3" role="list">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm"
                            role="listitem"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-5 text-left hover:bg-neutral-50 transition-colors"
                                aria-expanded={openIndex === index}
                                aria-controls={`faq-answer-${index}`}
                                id={`faq-question-${index}`}
                            >
                                <span className="font-semibold text-neutral-900 pr-4">
                                    {faq.question}
                                </span>
                                <span
                                    className={cn(
                                        "flex-shrink-0 w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center transition-transform duration-200",
                                        openIndex === index && "rotate-180"
                                    )}
                                    aria-hidden="true"
                                >
                                    <svg
                                        className="w-4 h-4 text-neutral-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        aria-hidden="true"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </span>
                            </button>
                            {/* Panel always in DOM for aria-controls validity */}
                            <div
                                id={`faq-answer-${index}`}
                                role="region"
                                aria-labelledby={`faq-question-${index}`}
                                className={cn(
                                    "grid transition-[grid-template-rows] duration-200 ease-out",
                                    openIndex === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                                )}
                            >
                                <div className="overflow-hidden">
                                    <div className="px-5 pb-5 pt-0">
                                        <div className="border-t border-neutral-100 pt-4 text-neutral-600 leading-relaxed">
                                            {faq.answer}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

// Homepage FAQ Section with predefined questions
const homepageFAQs: FAQItem[] = [
    {
        question: "Egepen Akçayapı yetkili bayi mi?",
        answer: "Evet, Egepen Akçayapı, Beylikdüzü ve çevresinde Egepen Deceuninck'in resmi yetkili bayisidir. Tüm ürünlerimiz orijinal Egepen kalitesindedir.",
    },
    {
        question: "Ücretsiz keşif nasıl yapılır?",
        answer: "Telefon, WhatsApp veya web sitemizdeki teklif formunu doldurarak ücretsiz keşif talep edebilirsiniz. Teknik ekibimiz en uygun zamanda adresinize gelerek ölçü alır ve sizinle en uygun çözümü belirler.",
    },
    {
        question: "Montaj süresi ne kadar?",
        answer: "Standart pencere ve cam balkon montajları genellikle 1 gün içinde tamamlanır. Daha büyük projeler için detaylı süre bilgisi keşif sonrası verilir. Montaj süresince yaşam alanınız minimum düzeyde etkilenir.",
    },
    {
        question: "Taksitli ödeme seçeneği var mı?",
        answer: "Evet, tüm kredi kartlarına 12 aya kadar taksit imkanı sunuyoruz. Ayrıca peşin ödemelerde özel indirimler de uygulanmaktadır. Detaylı ödeme seçenekleri için bizimle iletişime geçebilirsiniz.",
    },
    {
        question: "Hangi bölgelere hizmet veriyorsunuz?",
        answer: "Beylikdüzü, Gürpınar, Yakuplu, Kavaklı, Büyükçekmece, Esenyurt, Avcılar, Küçükçekmece, Başakşehir, Bahçeşehir, Hadımköy ve Silivri bölgelerinde hizmet vermekteyiz.",
    },
];

export function HomepageFAQSection() {
    return (
        <section id="sss" className="section bg-neutral-50">
            <div className="container-custom">
                <div className="text-center mb-12 animate-fade-in-up">
                    <span
                        className="inline-block px-4 py-1.5 rounded-full bg-primary-50 text-primary-600 text-sm font-bold uppercase tracking-widest mb-4"
                    >
                        Sık Sorulan Sorular
                    </span>
                    <h2
                        className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4"
                    >
                        Merak Edilenler
                    </h2>
                    <p
                        className="text-lg text-neutral-600 max-w-2xl mx-auto"
                    >
                        En sık sorulan soruların cevaplarını buradan bulabilirsiniz.
                        Başka sorularınız için bizimle iletişime geçin.
                    </p>
                </div>

                <FAQAccordion faqs={homepageFAQs} />

                <div
                    className="text-center mt-10 animate-fade-in-up"
                    style={{ animationDelay: '200ms' }}
                >
                    <a
                        href="/sss"
                        title="Tüm Sıkça Sorulan Soruları Görüntüle"
                        className="inline-flex items-center gap-2 text-primary-600 font-bold hover:text-primary-700 transition-colors"
                    >
                        Tüm Soruları Görüntüle
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" aria-hidden="true" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}
