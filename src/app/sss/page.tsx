import { Metadata } from "next";
import { HeaderOptimized } from '@/components/layout/HeaderOptimized';
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { ExpandableSection, ExpandableGroup } from "@/components/ui/ExpandableSection";
import { faqs, faqCategories } from "@/lib/faqData";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Sıkça Sorulan Sorular - Egepen Akçayapı",
    description: "PVC pencere, cam balkon, sineklik ve panjur hakkında sıkça sorulan sorular ve cevapları.",
};

export default function FAQPage() {
    const categories = faqCategories.filter(c => c.id !== 'all');

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    mainEntity: faqs.map((faq) => ({
                        "@type": "Question",
                        name: faq.question,
                        acceptedAnswer: { "@type": "Answer", text: faq.answer },
                    })),
                }),
            }} />
            <HeaderOptimized />
            <main id="main-content" className="min-h-screen bg-neutral-50">
                <PageHero
                    title="Sıkça Sorulan Sorular"
                    subtitle="Merak ettiğiniz tüm soruların cevapları burada."
                    breadcrumbs={[{ label: "SSS" }]}
                    compact
                />

                <section className="py-12 md:py-16 bg-white">
                    <div className="container-custom max-w-3xl">
                        {categories.map((category) => {
                            const categoryFaqs = faqs.filter(faq => faq.category === category.id);
                            if (categoryFaqs.length === 0) return null;
                            return (
                                <div key={category.id} className="mb-8 last:mb-0">
                                    <h2 className="text-lg font-bold text-neutral-900 mb-4">{category.name}</h2>
                                    <ExpandableGroup>
                                        {categoryFaqs.map((faq, i) => (
                                            <ExpandableSection key={i} title={faq.question} variant="card">
                                                <p className="text-sm text-neutral-600 leading-relaxed">{faq.answer}</p>
                                            </ExpandableSection>
                                        ))}
                                    </ExpandableGroup>
                                </div>
                            );
                        })}

                        {/* Still have questions */}
                        <div className="mt-10 text-center p-8 bg-primary-50 rounded-2xl">
                            <h3 className="text-lg font-bold text-neutral-900 mb-2">Sorunuz mu var?</h3>
                            <p className="text-sm text-neutral-600 mb-4">Aradığınız cevabı bulamadıysanız iletişim sayfamızdan bize ulaşabilirsiniz.</p>
                            <Link href="/iletisim" className="inline-flex items-center gap-2 text-primary-600 font-bold hover:text-primary-700 transition-colors">
                                İletişim Sayfasına Git
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
