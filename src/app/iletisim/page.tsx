import { Metadata } from "next";
import { HeaderOptimized } from "@/components/layout/HeaderOptimized";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/ui/PageHero";
import { businessConfig } from "@/config/business.config";

export const metadata: Metadata = {
    title: "İletişim - Egepen Akçayapı Beylikdüzü",
    description:
        "Egepen Akçayapı Beylikdüzü iletişim bilgileri. WhatsApp, telefon, adres ve harita.",
    alternates: { canonical: "https://akcapen-pvc.pages.dev/iletisim" },
};

/* ── Small re-usable icon components ───────────────────────────── */
function PhoneIcon({ className = "w-5 h-5" }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        </svg>
    );
}
function MapPinIcon({ className = "w-5 h-5" }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
    );
}
function ClockIcon({ className = "w-5 h-5" }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    );
}
function MailIcon({ className = "w-5 h-5" }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
    );
}

/* ── Page ──────────────────────────────────────────────────────── */
export default function ContactPage() {
    const whatsappUrl = `https://wa.me/${businessConfig.contact.whatsapp}?text=${encodeURIComponent("Merhaba, bilgi almak istiyorum.")}`;

    return (
        <>
            <HeaderOptimized />
            <main id="main-content" className="min-h-screen bg-neutral-50">
                <PageHero
                    title="İletişim"
                    subtitle="Bize ulaşmanın en kolay yolu — hemen arayın veya WhatsApp'tan yazın."
                    breadcrumbs={[{ label: "İletişim" }]}
                    compact
                />

                {/* ============================================================
                    SECTION 1 — Contact Actions + Info
                    ============================================================ */}
                <section className="py-16 md:py-20 bg-white" aria-labelledby="contact-heading">
                    <div className="container-custom">
                        <div className="max-w-3xl mx-auto">
                            <h2
                                id="contact-heading"
                                className="text-2xl md:text-3xl font-bold text-neutral-900 mb-8 text-center"
                            >
                                Bize Ulaşın
                            </h2>

                            {/* Quick-action buttons */}
                            <div className="grid sm:grid-cols-2 gap-4 mb-12">
                                <a
                                    href={whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="WhatsApp ile mesaj gönderin"
                                    className="flex items-center justify-center gap-3 px-6 py-5 bg-green-500 text-white font-bold rounded-2xl hover:bg-green-600 transition-colors shadow-lg shadow-green-500/20 min-h-[64px] text-lg"
                                >
                                    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    WhatsApp ile Yazın
                                </a>
                                <a
                                    href={`tel:${businessConfig.contact.mobileRaw}`}
                                    aria-label={`Bizi hemen arayın: ${businessConfig.contact.mobile}`}
                                    className="flex items-center justify-center gap-3 px-6 py-5 bg-primary-600 text-white font-bold rounded-2xl hover:bg-primary-700 transition-colors min-h-[64px] text-lg"
                                >
                                    <PhoneIcon className="w-7 h-7" />
                                    Hemen Arayın
                                </a>
                            </div>

                            {/* Contact details card */}
                            <address className="not-italic bg-neutral-50 rounded-2xl p-8 border border-neutral-100">
                                <h3 className="font-bold text-neutral-900 text-lg mb-6">İletişim Bilgileri</h3>

                                <div className="grid sm:grid-cols-2 gap-6">
                                    <div className="flex gap-3 items-start">
                                        <span className="mt-0.5 text-primary-600"><MapPinIcon /></span>
                                        <div>
                                            <p className="text-sm text-neutral-500">Adres</p>
                                            <a
                                                href={businessConfig.social.googleMaps}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-neutral-700 hover:text-primary-600 transition-colors text-sm leading-relaxed"
                                            >
                                                {businessConfig.address.full}
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex gap-3 items-start">
                                        <span className="mt-0.5 text-primary-600"><PhoneIcon /></span>
                                        <div className="space-y-1">
                                            <p className="text-sm text-neutral-500">Telefon</p>
                                            <a href={`tel:${businessConfig.contact.mobileRaw}`} className="block text-primary-600 font-medium hover:underline">
                                                {businessConfig.contact.mobile}
                                            </a>
                                            <a href={`tel:${businessConfig.contact.landlineRaw}`} className="block text-neutral-600 hover:underline text-sm">
                                                {businessConfig.contact.landline}
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex gap-3 items-start">
                                        <span className="mt-0.5 text-primary-600"><MailIcon /></span>
                                        <div>
                                            <p className="text-sm text-neutral-500">E-posta</p>
                                            <a href={`mailto:${businessConfig.contact.email}`} className="text-primary-600 font-medium hover:underline text-sm">
                                                {businessConfig.contact.email}
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex gap-3 items-start">
                                        <span className="mt-0.5 text-primary-600"><ClockIcon /></span>
                                        <div>
                                            <p className="text-sm text-neutral-500">Çalışma Saatleri</p>
                                            <p className="text-neutral-700 text-sm">Pzt – Cum: 08:30 – 19:00</p>
                                            <p className="text-neutral-700 text-sm">Cumartesi: 09:00 – 18:00</p>
                                        </div>
                                    </div>
                                </div>
                            </address>
                        </div>
                    </div>
                </section>

                {/* ============================================================
                    SECTION 2 — Full-width Google Maps embed
                    ============================================================ */}
                <section className="bg-neutral-100" aria-label="Harita">
                    <div className="container-custom py-12 md:py-16">
                        <h2 className="text-2xl font-bold text-neutral-900 mb-6 text-center">
                            Showroom Konumumuz
                        </h2>
                        <div className="rounded-2xl overflow-hidden shadow-lg border border-neutral-200">
                            <iframe
                                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.5!2d${businessConfig.address.coordinates.longitude}!3d${businessConfig.address.coordinates.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z!5e0!3m2!1str!2str!4v1700000000000`}
                                width="100%"
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Egepen Akçayapı Showroom Konumu — Gürpınar, Beylikdüzü"
                                className="w-full"
                            />
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
