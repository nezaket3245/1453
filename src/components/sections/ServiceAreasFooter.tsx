"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { businessConfig } from "@/config/business.config";

/**
 * ServiceAreasFooter Component
 * 
 * Lists all service areas in Beylikdüzü for local SEO.
 * Includes tel: links for one-click calling.
 * 
 * SEO: Critical for "near me" searches and local visibility.
 */

// Beylikdüzü neighborhoods and districts
const serviceAreas = {
    beylikduzu: [
        "Adnan Kahveci Mahallesi",
        "Barış Mahallesi",
        "Büyükşehir Mahallesi",
        "Cumhuriyet Mahallesi",
        "Dereağzı Mahallesi",
        "Gürpınar Mahallesi",
        "Kavaklı Mahallesi",
        "Marmara Mahallesi",
        "Sahil Mahallesi",
        "Yakuplu Mahallesi",
    ],
    nearby: [
        { name: "Büyükçekmece", distance: "5 km" },
        { name: "Esenyurt", distance: "3 km" },
        { name: "Avcılar", distance: "8 km" },
        { name: "Küçükçekmece", distance: "12 km" },
        { name: "Başakşehir", distance: "15 km" },
        { name: "Bahçeşehir", distance: "10 km" },
        { name: "Hadımköy", distance: "12 km" },
        { name: "Silivri", distance: "25 km" },
    ],
};

export function ServiceAreasFooter() {
    return (
        <section className="bg-neutral-900 py-16 border-t border-neutral-800">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        Hizmet Bölgelerimiz
                    </h2>
                    <p className="text-neutral-400 max-w-2xl mx-auto">
                        Beylikdüzü ve çevre ilçelerde ücretsiz keşif ve profesyonel montaj hizmeti sunuyoruz.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Beylikdüzü Neighborhoods */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-neutral-800/50 rounded-2xl p-6"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-primary-400" fill="none" viewBox="0 0 24 24" aria-hidden="true" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-white">Beylikdüzü Mahalleleri</h3>
                        </div>
                        <ul className="grid grid-cols-2 gap-2">
                            {serviceAreas.beylikduzu.map((area) => (
                                <li key={area}>
                                    <Link
                                        href={`/hizmet-bolgeleri/beylikduzu/${area.toLowerCase().replace(/\s+/g, '-').replace(/ı/g, 'i').replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ö/g, 'o').replace(/ç/g, 'c')}`}
                                        className="text-sm text-neutral-400 hover:text-primary-400 transition-colors"
                                    >
                                        {area}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Nearby Districts */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="bg-neutral-800/50 rounded-2xl p-6"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-secondary-500/20 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-secondary-400" fill="none" viewBox="0 0 24 24" aria-hidden="true" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-white">Yakın İlçeler</h3>
                        </div>
                        <ul className="space-y-2">
                            {serviceAreas.nearby.map((area) => (
                                <li key={area.name} className="flex items-center justify-between">
                                    <Link
                                        href={`/hizmet-bolgeleri/${area.name.toLowerCase().replace(/ı/g, 'i').replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ö/g, 'o').replace(/ç/g, 'c')}`}
                                        className="text-sm text-neutral-400 hover:text-primary-400 transition-colors"
                                    >
                                        {area.name}
                                    </Link>
                                    <span className="text-xs text-neutral-600">{area.distance}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Quick Contact */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-6"
                    >
                        <h3 className="text-lg font-bold text-white mb-4">Hemen Ulaşın</h3>
                        <p className="text-white/80 text-sm mb-6">
                            Bölgenizde ücretsiz keşif için hemen arayın veya WhatsApp&apos;tan yazın.
                        </p>

                        <div className="space-y-3">
                            {/* Phone - tel: link for one-click calling */}
                            <a
                                href={`tel:${businessConfig.contact.mobileRaw}`}
                                className="flex items-center gap-3 w-full p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
                            >
                                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" aria-hidden="true" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <div className="text-left">
                                    <p className="text-xs text-white/60">Hemen Ara</p>
                                    <p className="text-white font-bold">{businessConfig.contact.mobile}</p>
                                </div>
                            </a>

                            {/* WhatsApp */}
                            <a
                                href={`https://wa.me/${businessConfig.contact.whatsapp}?text=${encodeURIComponent("Merhaba, bölgemde keşif istiyorum.")}`}
                                target="_blank"
                                rel="noopener noreferrer nofollow"
                                className="flex items-center gap-3 w-full p-3 bg-green-500 hover:bg-green-600 rounded-xl transition-colors"
                            >
                                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                </div>
                                <div className="text-left">
                                    <p className="text-xs text-white/80">WhatsApp</p>
                                    <p className="text-white font-bold">Mesaj Gönder</p>
                                </div>
                            </a>
                        </div>

                        {/* Office Hours */}
                        <div className="mt-6 pt-4 border-t border-white/20">
                            <p className="text-xs text-white/60 mb-2">Çalışma Saatleri</p>
                            <p className="text-sm text-white">Pazartesi - Cumartesi: 08:30 - 19:00</p>
                        </div>
                    </motion.div>
                </div>

                {/* SEO Text */}
                <div className="mt-12 text-center">
                    <p className="text-sm text-neutral-500 max-w-3xl mx-auto">
                        Egepen Akçayapı olarak <strong>Beylikdüzü, Gürpınar, Yakuplu, Kavaklı, Büyükçekmece, Esenyurt</strong> ve
                        çevre bölgelerde <strong>PVC pencere, cam balkon, sineklik, panjur ve duşakabin</strong> montaj hizmeti vermekteyiz.
                        Egepen Deceuninck yetkili bayisi olarak 10 yıl garanti ile profesyonel hizmet sunuyoruz.
                    </p>
                </div>
            </div>
        </section>
    );
}
