import { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { businessConfig } from "@/config/business.config";
import { faqs, faqCategories, generateFAQSchema } from "@/lib/faqData";

export const metadata: Metadata = {
    title: `Sıkça Sorulan Sorular | SSS | ${businessConfig.name}`,
    description: `PVC pencere, cam balkon, fiyat, montaj ve garanti hakkında sıkça sorulan sorular ve cevapları. ${businessConfig.brand} Beylikdüzü yetkili bayisi.`,
    keywords: [
        "PVC pencere sıkça sorulan sorular",
        "cam balkon SSS",
        "Egepen garanti",
        "pencere fiyat",
        "montaj süresi",
    ],
    openGraph: {
        title: `SSS | ${businessConfig.name}`,
        description: `PVC pencere ve cam balkon hakkında sık sorulan sorular`,
        url: "https://egepenakcayapi.com.tr/sss",
    },
    alternates: {
        canonical: "https://egepenakcayapi.com.tr/sss",
    },
};

export default function FAQPage() {
    const schema = generateFAQSchema();

    return (
        <>
            {/* JSON-LD FAQ Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />

            <Header />

            <main id="main-content" className="min-h-screen bg-neutral-50">
                {/* Hero Section */}
                <section className="bg-gradient-to-br from-primary-700 to-primary-900 text-white py-16 lg:py-24">
                    <div className="container-custom">
                        <nav aria-label="Breadcrumb" className="mb-6">
                            <ol className="flex items-center gap-2 text-sm text-white/60">
                                <li>
                                    <Link href="/" title="Ana Sayfa" className="hover:text-white transition-colors">
                                        Ana Sayfa
                                    </Link>
                                </li>
                                <li>/</li>
                                <li className="text-white">SSS</li>
                            </ol>
                        </nav>
                        <div className="max-w-3xl">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
                                Sıkça Sorulan <span className="text-secondary-400">Sorular</span>
                            </h1>
                            <p className="text-xl text-white/80 leading-relaxed">
                                PVC pencere, cam balkon, fiyatlandırma, montaj ve garanti hakkında
                                merak ettiklerinizi burada bulabilirsiniz.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Categories */}
                <section className="py-6 bg-white border-b border-neutral-100 sticky top-[72px] z-30">
                    <div className="container-custom">
                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                            {faqCategories.map((category) => (
                                <a
                                    key={category.id}
                                    href={`#${category.id}`}
                                    className="flex-shrink-0 px-5 py-2.5 rounded-full bg-neutral-100 hover:bg-primary-100 hover:text-primary-700 font-medium text-sm transition-colors flex items-center gap-2"
                                >
                                    <span>{category.icon}</span>
                                    {category.name}
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ Sections */}
                <section className="section">
                    <div className="container-custom">
                        <div className="max-w-4xl mx-auto">
                            {faqCategories.slice(1).map((category) => {
                                const categoryFaqs = faqs.filter(
                                    (faq) => faq.category === category.id
                                );
                                if (categoryFaqs.length === 0) return null;

                                return (
                                    <div key={category.id} id={category.id} className="mb-16 scroll-mt-32">
                                        <div className="flex items-center gap-3 mb-8">
                                            <span className="text-3xl">{category.icon}</span>
                                            <h2 className="text-2xl font-bold text-neutral-900">
                                                {category.name}
                                            </h2>
                                        </div>

                                        <div className="space-y-4">
                                            {categoryFaqs.map((faq) => (
                                                <details
                                                    key={faq.id}
                                                    className="group bg-white rounded-xl border border-neutral-200 overflow-hidden hover:shadow-md transition-shadow"
                                                >
                                                    <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                                                        <h3 className="font-bold text-neutral-900 pr-8 text-left">
                                                            {faq.question}
                                                        </h3>
                                                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center group-open:bg-primary-600 group-open:text-white transition-colors">
                                                            <svg
                                                                className="w-4 h-4 transform group-open:rotate-180 transition-transform"
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
                                                    <div className="px-6 pb-6 pt-0">
                                                        <div className="pt-4 border-t border-neutral-100">
                                                            <p className="text-neutral-600 leading-relaxed">
                                                                {faq.answer}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </details>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Still Have Questions */}
                <section className="py-16 bg-white">
                    <div className="container-custom">
                        <div className="max-w-4xl mx-auto text-center">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary-100 text-primary-600 text-4xl mb-6">
                                🤔
                            </div>
                            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                                Sorunuzun Cevabını Bulamadınız mı?
                            </h2>
                            <p className="text-neutral-600 mb-8 max-w-xl mx-auto">
                                Uzman ekibimiz sorularınızı yanıtlamak için hazır.
                                Bize telefon veya WhatsApp üzerinden ulaşabilirsiniz.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button
                                    variant="primary"
                                    size="lg"
                                    href={`tel:${businessConfig.contact.mobileRaw}`}
                                >
                                    📞 Hemen Arayın
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    href={`https://wa.me/${businessConfig.contact.whatsapp}?text=Merhaba, bir sorum var.`}
                                    external
                                >
                                    💬 WhatsApp ile Sorun
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Quick Links */}
                <section className="py-16 bg-neutral-100">
                    <div className="container-custom">
                        <h2 className="text-2xl font-bold text-neutral-900 mb-8 text-center">
                            Faydalı Bağlantılar
                        </h2>
                        <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                            {[
                                {
                                    title: "PVC Sistemleri",
                                    desc: "Egepen ürün serileri",
                                    href: "/pvc-sistemleri",
                                    icon: "🪟",
                                },
                                {
                                    title: "Projelerimiz",
                                    desc: "Referans çalışmalar",
                                    href: "/projeler",
                                    icon: "🏗️",
                                },
                                {
                                    title: "Blog",
                                    desc: "Uzman yazıları",
                                    href: "/blog",
                                    icon: "📚",
                                },
                                {
                                    title: "Teklif Al",
                                    desc: "Ücretsiz keşif",
                                    href: "/teklif-al",
                                    icon: "📝",
                                },
                            ].map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="flex items-center gap-4 p-5 bg-white rounded-xl border border-neutral-200 hover:border-primary-300 hover:shadow-md transition-all group"
                                >
                                    <span className="text-3xl">{link.icon}</span>
                                    <div>
                                        <h3 className="font-bold text-neutral-900 group-hover:text-primary-600 transition-colors">
                                            {link.title}
                                        </h3>
                                        <p className="text-sm text-neutral-500">{link.desc}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
