import { Metadata } from "next";
import Link from "next/link";
import { HeaderOptimized } from '@/components/layout/HeaderOptimized';
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { QuoteForm } from "./QuoteForm";

export const metadata: Metadata = {
    title: "Teklif Al - Egepen Akçayapı",
    description: "Ücretsiz keşif ve fiyat teklifi alın. PVC pencere, cam balkon, sineklik ve panjur için hemen formu doldurun.",
};

export default function QuotePage() {
    return (
        <>
            <HeaderOptimized />
            <main id="main-content" className="min-h-screen bg-neutral-50">
                <PageHero
                    title="Teklif Al"
                    subtitle="Ücretsiz keşif ve fiyat teklifi için formu doldurun."
                    breadcrumbs={[{ label: "Teklif Al" }]}
                    compact
                />

                <section className="py-12 md:py-16 bg-white">
                    <div className="container-custom">
                        <div className="grid lg:grid-cols-5 gap-8">
                            {/* Form */}
                            <div className="lg:col-span-3">
                                <QuoteForm />
                            </div>

                            {/* Sidebar */}
                            <div className="lg:col-span-2">
                                <div className="sticky top-24 space-y-4">
                                    {/* Quick Contact */}
                                    <div className="bg-neutral-50 rounded-2xl p-6">
                                        <h3 className="font-bold text-neutral-900 mb-3">Alternatif İletişim</h3>
                                        <p className="text-sm text-neutral-600 leading-relaxed mb-4">
                                            Form yerine doğrudan görüşmek isterseniz iletişim sayfamızdan
                                            bize ulaşabilirsiniz.
                                        </p>
                                        <Link href="/iletisim" className="inline-flex items-center gap-2 text-primary-600 font-bold text-sm hover:text-primary-700 transition-colors">
                                            İletişim Sayfasına Git
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </Link>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
