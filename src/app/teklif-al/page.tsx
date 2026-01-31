import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { QuoteForm } from "./QuoteForm";
import { businessConfig } from "@/config/business.config";

/**
 * Quote Page Metadata
 */
export const metadata: Metadata = {
    title: `Ücretsiz Teklif Al | ${businessConfig.name}`,
    description:
        `PVC pencere, cam balkon, alüminyum doğrama için ${businessConfig.address.district} ve çevresinde ücretsiz keşif ve teklif alın. 24 saat içinde size dönüş yapalım.`,
    keywords: [
        ...businessConfig.seo.mainKeywords,
        "PVC pencere teklif",
        "cam balkon fiyat",
        "ücretsiz keşif",
        `${businessConfig.address.district} PVC fiyat`,
    ],
    openGraph: {
        title: `Ücretsiz Teklif Al | ${businessConfig.name}`,
        description: `PVC pencere, cam balkon için ${businessConfig.address.district} ücretsiz keşif ve teklif alın.`,
        url: "https://egepenakcayapi.com.tr/teklif-al",
    },
    alternates: {
        canonical: "https://egepenakcayapi.com.tr/teklif-al",
    },
};

/**
 * JSON-LD Schema for Contact Page
 */
const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `${businessConfig.name} Teklif Formu`,
    description: `PVC pencere ve cam balkon için ${businessConfig.address.district} bölgesinde ücretsiz teklif alın`,
    url: "https://egepenakcayapi.com.tr/teklif-al",
    mainEntity: {
        "@type": "LocalBusiness",
        "@id": "https://egepenakcayapi.com.tr/#organization",
    },
};

export default function QuotePage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(contactSchema),
                }}
            />
            <Header />
            <main id="main-content" className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
                {/* Hero Section */}
                <section className="relative py-20 lg:py-32 bg-gradient-to-br from-primary-600 to-primary-800 overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                            }}
                        />
                    </div>
                    <div className="container-custom relative z-10">
                        <div className="max-w-3xl mx-auto text-center">
                            <span className="inline-block px-4 py-2 mb-6 text-sm font-semibold text-secondary-300 bg-secondary-500/20 rounded-full">
                                ÜCRETSİZ KEŞİF & TEKLİF
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                                Size Özel{" "}
                                <span className="text-secondary-400">Teklif</span> Alalım
                            </h1>
                            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                                Formu doldurun, uzman ekibimiz 24 saat içinde sizinle iletişime
                                geçsin. Ücretsiz keşif ve detaylı teklif için hemen başvurun!
                            </p>
                            <div className="flex flex-wrap items-center justify-center gap-8">
                                <div className="flex items-center gap-2 text-white/90">
                                    <CheckIcon className="w-5 h-5 text-green-400" />
                                    <span>Ücretsiz Keşif</span>
                                </div>
                                <div className="flex items-center gap-2 text-white/90">
                                    <CheckIcon className="w-5 h-5 text-green-400" />
                                    <span>24 Saat İçinde Dönüş</span>
                                </div>
                                <div className="flex items-center gap-2 text-white/90">
                                    <CheckIcon className="w-5 h-5 text-green-400" />
                                    <span>Bağlayıcı Değil</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Form Section */}
                <section className="py-16 lg:py-24">
                    <div className="container-custom">
                        <div className="grid lg:grid-cols-3 gap-12">
                            {/* Form */}
                            <div className="lg:col-span-2">
                                <QuoteForm />
                            </div>

                            {/* Sidebar */}
                            <aside className="lg:col-span-1">
                                {/* Contact Info Card */}
                                <div className="bg-white rounded-2xl shadow-lg border border-neutral-100 p-6 mb-6">
                                    <h3 className="text-lg font-bold text-neutral-900 mb-4">
                                        Hızlı İletişim
                                    </h3>
                                    <div className="space-y-4">
                                        <a
                                            href={`tel:${businessConfig.contact.landlineRaw}`}
                                            className="flex items-center gap-3 text-neutral-600 hover:text-primary-600 transition-colors"
                                        >
                                            <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center">
                                                <PhoneIcon className="w-5 h-5 text-primary-600" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-neutral-500">Telefon</p>
                                                <p className="font-medium">{businessConfig.contact.landline}</p>
                                            </div>
                                        </a>
                                        <a
                                            href={`https://wa.me/${businessConfig.contact.whatsapp}`}
                                            target="_blank"
                                            rel="noopener noreferrer nofollow"
                                            className="flex items-center gap-3 text-neutral-600 hover:text-green-600 transition-colors"
                                        >
                                            <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                                                <WhatsAppIcon className="w-5 h-5 text-green-600" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-neutral-500">WhatsApp</p>
                                                <p className="font-medium">{businessConfig.contact.mobile}</p>
                                            </div>
                                        </a>
                                    </div>
                                </div>

                                {/* Guarantee Card */}
                                <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-6 border border-primary-100">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 rounded-xl bg-primary-500 flex items-center justify-center">
                                            <ShieldIcon className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="text-lg font-bold text-neutral-900">
                                            Güvence Altındasınız
                                        </h3>
                                    </div>
                                    <ul className="space-y-2 text-sm text-neutral-700">
                                        <li className="flex items-center gap-2">
                                            <CheckIcon className="w-4 h-4 text-green-500" />
                                            <span>10 Yıl Garanti</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckIcon className="w-4 h-4 text-green-500" />
                                            <span>Profesyonel Montaj</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckIcon className="w-4 h-4 text-green-500" />
                                            <span>Ücretsiz Servis</span>
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckIcon className="w-4 h-4 text-green-500" />
                                            <span>TSE & CE Belgeli</span>
                                        </li>
                                    </ul>
                                </div>
                            </aside>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

// Icon Components
function CheckIcon({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" aria-hidden="true" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
    );
}

function PhoneIcon({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" aria-hidden="true" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
    );
}

function WhatsAppIcon({ className }: { className?: string }) {
    return (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
    );
}

function ShieldIcon({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" aria-hidden="true" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.75h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
    );
}
