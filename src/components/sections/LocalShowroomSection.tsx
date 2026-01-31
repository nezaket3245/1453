"use client";

import { motion } from "framer-motion";
import { businessConfig } from "@/config/business.config";

/**
 * LocalShowroomSection Component
 * 
 * Google Maps integration showing Beylikdüzü showroom.
 * Local SEO optimized with address, directions, and contact info.
 * Includes Schema.org LocalBusiness markup enhancement.
 * 
 * Büyükçekmece ve Beylikdüzü'nün tüm mahallelerini içerir.
 */

const workingHours = [
    { day: "Pazartesi - Cuma", hours: "08:30 - 19:00" },
    { day: "Cumartesi", hours: "09:00 - 18:00" },
    { day: "Pazar", hours: "Kapalı" },
];

// Merkez hizmet bölgeleri (ana ilçeler)
const primaryServiceAreas = [
    "Beylikdüzü",
    "Büyükçekmece",
    "Esenyurt",
    "Avcılar",
    "Küçükçekmece",
    "Başakşehir",
];

// Beylikdüzü Mahalleleri
const beylikduzuNeighborhoods = businessConfig.serviceAreas?.beylikduzu?.neighborhoods || [
    "Adnan Kahveci", "Barış", "Büyükşehir", "Cumhuriyet",
    "Dereağzı", "Gürpınar", "Kavaklı", "Marmara", "Sahil", "Yakuplu"
];

// Büyükçekmece Mahalleleri (TÜM MAHALLELER)
const buyukcekmceNeighborhoods = businessConfig.serviceAreas?.buyukcekmece?.neighborhoods || [
    // Merkez Mahalleler
    "Atatürk", "Bahçelievler", "Batıköy", "Beykent", "Celaliye",
    "Cumhuriyet", "Dizdariye", "Fatih", "Fevzi Çakmak", "Hürriyet",
    "Kamiloba", "Karaağaç", "Kumburgaz", "Mimarsinan", "Muratbey",
    // Sahil ve Kuzey Mahalleler
    "Pınartepe", "Ulus", "Yenimahalle", "19 Mayıs", "Alkent 2000",
    "Beykent Üniversitesi", "Boğaziçi", "Çakmaklı", "Güzelce",
    // Diğer Mahalleler
    "Ahmediye", "Tepecik", "Türkoba", "Yeniköy"
];

// Yakın ilçeler
const nearbyDistricts = businessConfig.serviceAreas?.nearbyDistricts || [
    "Bahçeşehir", "Hadımköy", "Silivri", "Çatalca"
];

export function LocalShowroomSection() {
    const { coordinates, full } = businessConfig.address;
    const mapCenter = `!3d${coordinates.latitude}!4d${coordinates.longitude}`;
    const placeId = (coordinates as any).cid || "0x0:0x0";

    // Using the official place ID for more accurate marker and business info
    const googleMapsEmbedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.5!2d${coordinates.longitude}!3d${coordinates.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s${placeId}!2z${encodeURIComponent(full)}!5e0!3m2!1str!2str!4v1700000000000!5m2!1str!2str`;

    return (
        <section
            id="showroom"
            className="section bg-white overflow-hidden"
            aria-labelledby="showroom-heading"
            itemScope
            itemType="https://schema.org/LocalBusiness"
        >
            <div className="container-custom">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1.5 rounded-full bg-secondary-50 text-secondary-600 text-sm font-bold uppercase tracking-widest mb-4"
                    >
                        Showroom & Konum
                    </motion.span>
                    <motion.h2
                        id="showroom-heading"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-4xl lg:text-5xl font-black text-neutral-900 mb-6"
                        itemProp="name"
                    >
                        <span className="text-primary-600">Gürpınar</span> Showroom'umuzu Ziyaret Edin
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-neutral-600 leading-relaxed"
                        itemProp="description"
                    >
                        Tüm PVC pencere serilerini, cam balkon sistemlerini ve aksesuarları yerinde görün.
                        Uzman ekibimizden ücretsiz danışmanlık alın.
                    </motion.p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Map */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-neutral-200">
                            <iframe
                                src={googleMapsEmbedUrl}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title={`${businessConfig.name} Showroom Konumu - Gürpınar Beylikdüzü`}
                            />
                        </div>

                        {/* Directions CTA */}
                        <a
                            href={businessConfig.social.googleMaps}
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            title="Google Maps'te Egepen Akçayapı Showroom'una Yol Tarifi Al"
                            className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 px-6 py-3 bg-primary-600 text-white font-bold rounded-full shadow-xl hover:bg-primary-700 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" aria-hidden="true" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Yol Tarifi Al
                        </a>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        {/* Address Card */}
                        <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-100">
                            <h3 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
                                <span className="text-2xl">📍</span>
                                Adres
                            </h3>
                            <address
                                className="not-italic text-neutral-600 leading-relaxed mb-4"
                                itemProp="address"
                                itemScope
                                itemType="https://schema.org/PostalAddress"
                            >
                                <span itemProp="streetAddress">{businessConfig.address.street}</span><br />
                                <span itemProp="addressLocality">{businessConfig.address.district}</span> -
                                <span itemProp="addressRegion"> {businessConfig.address.city}</span>
                            </address>
                            <a
                                href={businessConfig.social.googleMaps}
                                target="_blank"
                                rel="noopener noreferrer nofollow"
                                title="Egepen Akçayapı Showroom Konumunu Google Maps'te Görüntüle"
                                className="text-primary-600 font-bold text-sm hover:underline"
                            >
                                Google Maps'te Aç →
                            </a>
                        </div>

                        {/* Contact Card */}
                        <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-6 border border-primary-200">
                            <h3 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
                                <span className="text-2xl">📞</span>
                                İletişim
                            </h3>
                            <div className="space-y-3">
                                <a
                                    href={`tel:${businessConfig.contact.mobileRaw}`}
                                    title="Egepen Akçayapı Cep Telefonunu Ara"
                                    className="flex items-center gap-3 text-neutral-700 hover:text-primary-600 transition-colors font-medium"
                                    itemProp="telephone"
                                >
                                    <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">📱</span>
                                    {businessConfig.contact.mobile}
                                </a>
                                <a
                                    href={`tel:${businessConfig.contact.landlineRaw}`}
                                    title="Egepen Akçayapı Sabit Hattını Ara"
                                    className="flex items-center gap-3 text-neutral-700 hover:text-primary-600 transition-colors font-medium"
                                >
                                    <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">☎️</span>
                                    {businessConfig.contact.landline}
                                </a>
                                <a
                                    href={`mailto:${businessConfig.contact.email}`}
                                    title="Egepen Akçayapı'ya E-posta Gönder"
                                    className="flex items-center gap-3 text-neutral-700 hover:text-primary-600 transition-colors font-medium"
                                    itemProp="email"
                                >
                                    <span className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">✉️</span>
                                    {businessConfig.contact.email}
                                </a>
                            </div>
                        </div>

                        {/* Working Hours Card */}
                        <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-100">
                            <h3 className="text-lg font-bold text-neutral-900 mb-4 flex items-center gap-2">
                                <span className="text-2xl">🕐</span>
                                Çalışma Saatleri
                            </h3>
                            <ul className="space-y-2">
                                {workingHours.map((item) => (
                                    <li
                                        key={item.day}
                                        className="flex justify-between text-neutral-600"
                                    >
                                        <span className="font-medium">{item.day}</span>
                                        <span className={item.hours === "Kapalı" ? "text-red-500 font-bold" : ""}>
                                            {item.hours}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                </div>

                {/* Service Areas - Genişletilmiş Görünüm */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20"
                >
                    <h3 className="text-2xl font-bold text-neutral-900 mb-4 text-center">
                        Hizmet Verdiğimiz Bölgeler
                    </h3>
                    <p className="text-neutral-600 text-center mb-10 max-w-2xl mx-auto">
                        İstanbul Avrupa Yakası&apos;nda profesyonel PVC pencere, cam balkon ve panjur montaj hizmeti sunuyoruz.
                    </p>

                    {/* Ana İlçeler */}
                    <div className="mb-12">
                        <h4 className="text-lg font-bold text-primary-600 mb-6 text-center">
                            📍 Ana Hizmet Bölgelerimiz
                        </h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                            {primaryServiceAreas.map((area: string, index: number) => (
                                <motion.div
                                    key={area}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className="text-center p-4 bg-primary-50 rounded-xl border-2 border-primary-200 hover:bg-primary-100 transition-colors"
                                    itemProp="areaServed"
                                >
                                    <span className="font-bold text-primary-700">{area}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Beylikdüzü Mahalleleri */}
                    <div className="mb-10">
                        <h4 className="text-md font-bold text-neutral-700 mb-4 flex items-center justify-center gap-2">
                            <span className="w-8 h-0.5 bg-primary-300"></span>
                            Beylikdüzü Mahalleleri
                            <span className="w-8 h-0.5 bg-primary-300"></span>
                        </h4>
                        <div className="flex flex-wrap justify-center gap-2">
                            {beylikduzuNeighborhoods.map((area: string) => (
                                <span
                                    key={area}
                                    className="px-3 py-1.5 bg-neutral-100 text-neutral-700 text-sm rounded-full hover:bg-primary-50 transition-colors"
                                    itemProp="areaServed"
                                >
                                    {area}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Büyükçekmece Mahalleleri */}
                    <div className="mb-10">
                        <h4 className="text-md font-bold text-neutral-700 mb-4 flex items-center justify-center gap-2">
                            <span className="w-8 h-0.5 bg-secondary-300"></span>
                            Büyükçekmece Mahalleleri
                            <span className="w-8 h-0.5 bg-secondary-300"></span>
                        </h4>
                        <div className="flex flex-wrap justify-center gap-2">
                            {buyukcekmceNeighborhoods.map((area: string) => (
                                <span
                                    key={area}
                                    className="px-3 py-1.5 bg-neutral-100 text-neutral-700 text-sm rounded-full hover:bg-secondary-50 transition-colors"
                                    itemProp="areaServed"
                                >
                                    {area}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Yakın İlçeler */}
                    <div>
                        <h4 className="text-md font-bold text-neutral-700 mb-4 flex items-center justify-center gap-2">
                            <span className="w-8 h-0.5 bg-accent-300"></span>
                            Yakın İlçeler
                            <span className="w-8 h-0.5 bg-accent-300"></span>
                        </h4>
                        <div className="flex flex-wrap justify-center gap-2">
                            {nearbyDistricts.map((area: string) => (
                                <span
                                    key={area}
                                    className="px-3 py-1.5 bg-neutral-100 text-neutral-700 text-sm rounded-full hover:bg-accent-50 transition-colors"
                                    itemProp="areaServed"
                                >
                                    {area}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
