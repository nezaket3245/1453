import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContactFormValidated } from "@/components/ui/ContactFormValidated";
import { businessConfig } from "@/config/business.config";

export const metadata: Metadata = {
    title: `İletişim | ${businessConfig.name}`,
    description: `Bize ulaşın. Adresimiz, telefon numaramız ve çalışma saatlerimize buradan ulaşabilirsiniz. ${businessConfig.brand} yetkili bayisi Akçayapı ${businessConfig.address.district}.`,
};

export default function ContactPage() {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-neutral-50">
                {/* Hero */}
                <section className="bg-primary-700 text-white py-16 lg:py-24">
                    <div className="container-custom">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">İletişim</h1>
                        <p className="text-xl text-white/80 max-w-2xl">
                            Sorularınız, talepleriniz veya ücretsiz keşif hizmetimiz için bize ulaşın. Sizinle tanışmaktan mutluluk duyarız.
                        </p>
                    </div>
                </section>

                {/* Info, Form & Map */}
                <section className="section">
                    <div className="container-custom">
                        <div className="grid lg:grid-cols-3 gap-12">
                            {/* Contact Information */}
                            <div className="lg:col-span-1 space-y-8">
                                <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100">
                                    <h3 className="text-xl font-bold text-neutral-900 mb-6">İletişim Bilgileri</h3>
                                    <div className="space-y-6">
                                        {/* Address */}
                                        <div className="flex gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0">
                                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="font-bold text-neutral-900 mb-1">Adres</p>
                                                <a
                                                    href={businessConfig.social.googleMaps}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-neutral-600 hover:text-primary-600 transition-colors"
                                                >
                                                    {businessConfig.address.street}<br />{businessConfig.address.district}, {businessConfig.address.city}
                                                </a>
                                            </div>
                                        </div>

                                        {/* Phone - tel: linked */}
                                        <div className="flex gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center flex-shrink-0">
                                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="font-bold text-neutral-900 mb-1">Telefon</p>
                                                <a
                                                    href={`tel:${businessConfig.contact.landlineRaw}`}
                                                    className="text-neutral-600 hover:text-primary-600 transition-colors block"
                                                >
                                                    {businessConfig.contact.landline}
                                                </a>
                                                <a
                                                    href={`tel:${businessConfig.contact.mobileRaw}`}
                                                    className="text-primary-600 font-medium hover:text-primary-700 transition-colors block mt-1"
                                                >
                                                    📱 {businessConfig.contact.mobile}
                                                </a>
                                            </div>
                                        </div>

                                        {/* Email */}
                                        <div className="flex gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0">
                                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="font-bold text-neutral-900 mb-1">E-posta</p>
                                                <a
                                                    href={`mailto:${businessConfig.contact.email}`}
                                                    className="text-neutral-600 hover:text-primary-600 transition-colors"
                                                >
                                                    {businessConfig.contact.email}
                                                </a>
                                            </div>
                                        </div>

                                        {/* Working Hours */}
                                        <div className="flex gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0">
                                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <p className="font-bold text-neutral-900 mb-1">Çalışma Saatleri</p>
                                                <p className="text-neutral-600">Pzt - Cmt: 08:30 - 19:00<br />Paz: Kapalı</p>
                                            </div>
                                        </div>

                                        {/* Quick WhatsApp */}
                                        <a
                                            href={`https://wa.me/${businessConfig.contact.whatsapp}?text=${encodeURIComponent("Merhaba, bilgi almak istiyorum.")}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-2 w-full py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-colors"
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                            </svg>
                                            WhatsApp ile Yazın
                                        </a>
                                    </div>
                                </div>

                                {/* Contact Form */}
                                <ContactFormValidated />
                            </div>

                            {/* Map */}
                            <div className="lg:col-span-2 space-y-8">
                                <div className="bg-white p-2 rounded-2xl shadow-sm border border-neutral-100 h-full min-h-[600px]">
                                    <div className="w-full h-full bg-neutral-200 rounded-xl flex items-center justify-center text-neutral-500 overflow-hidden">
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1505.744158913926!2d28.601918388720703!3d40.99264560000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b55f13511eb42b%3A0xc49b7e3f844f24c0!2sAkcayapi%20Egepen%20Deceuninck!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str"
                                            width="100%"
                                            height="100%"
                                            style={{ border: 0 }}
                                            allowFullScreen
                                            loading="lazy"
                                            title="Egepen Akçayapı Konum Haritası"
                                        ></iframe>
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

