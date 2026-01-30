"use client";

import Link from "next/link";
import { businessConfig } from "@/config/business.config";

/**
 * Beylikdüzü neighborhoods for local SEO targeting
 */
const beylikduzuNeighborhoods = [
    "Adnan Kahveci", "Barış", "Büyükşehir", "Cumhuriyet", "Dereağzı",
    "Gürpınar", "Kavaklı", "Marmara", "Sahil", "Yakuplu"
];

const nearbyDistricts = [
    "Büyükçekmece", "Esenyurt", "Avcılar", "Küçükçekmece",
    "Başakşehir", "Bahçeşehir", "Hadımköy"
];

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-neutral-900 text-white pt-20 pb-10">
            {/* Service Areas Section - Local SEO Critical */}
            <div className="container-custom mb-16">
                <div className="bg-neutral-800/50 rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-white mb-6 text-center">
                        🏠 Hizmet Bölgelerimiz
                    </h2>
                    <p className="text-neutral-400 text-center max-w-2xl mx-auto mb-8">
                        Beylikdüzü ve çevre ilçelerde <strong className="text-white">ücretsiz keşif</strong> ve profesyonel montaj hizmeti sunuyoruz.
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Beylikdüzü Neighborhoods */}
                        <div>
                            <h3 className="text-lg font-bold text-primary-400 mb-4 flex items-center gap-2">
                                <span className="w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center">📍</span>
                                Beylikdüzü Mahalleleri
                            </h3>
                            <div className="grid grid-cols-2 gap-2">
                                {beylikduzuNeighborhoods.map((neighborhood) => (
                                    <span
                                        key={neighborhood}
                                        className="text-sm text-neutral-400 hover:text-white transition-colors cursor-default"
                                    >
                                        • {neighborhood} Mah.
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Nearby Districts */}
                        <div>
                            <h3 className="text-lg font-bold text-secondary-400 mb-4 flex items-center gap-2">
                                <span className="w-8 h-8 bg-secondary-500/20 rounded-lg flex items-center justify-center">🗺️</span>
                                Yakın İlçeler
                            </h3>
                            <div className="grid grid-cols-2 gap-2">
                                {nearbyDistricts.map((district) => (
                                    <span
                                        key={district}
                                        className="text-sm text-neutral-400 hover:text-white transition-colors cursor-default"
                                    >
                                        • {district}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Quick Contact CTA */}
                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                            href={`tel:${businessConfig.contact.mobileRaw}`}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            Hemen Ara: {businessConfig.contact.mobile}
                        </a>
                        <a
                            href={`https://wa.me/${businessConfig.contact.whatsapp}?text=${encodeURIComponent("Merhaba, bölgemde ücretsiz keşif istiyorum.")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            WhatsApp ile Ulaşın
                        </a>
                    </div>
                </div>
            </div>

            <div className="container-custom grid lg:grid-cols-4 gap-12 mb-16">
                {/* Branding & Bio */}
                <div className="lg:col-span-1">
                    <Link href="/" className="text-2xl font-black text-white italic uppercase tracking-tighter mb-6 block">
                        {businessConfig.name}
                    </Link>
                    <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                        Beylikdüzü ve Gürpınar bölgesinde 25 yıllık tecrübe ile {businessConfig.brand} yetkili bayisi olarak hizmet vermekteyiz. Isı yalıtımı ve güvenlikte dünya standartlarını evinize getiriyoruz.
                    </p>
                    <div className="flex gap-4">
                        <a href={businessConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary-500 transition-colors" aria-label="Facebook">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" /></svg>
                        </a>
                        <a href={businessConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary-500 transition-colors" aria-label="Instagram">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-lg font-bold mb-6 border-l-4 border-primary-500 pl-3 uppercase">Hızlı Linkler</h4>
                    <ul className="space-y-4 text-neutral-400">
                        <li><Link href="/urunler" className="hover:text-white transition-colors">Ürünlerimiz</Link></li>
                        <li><Link href="/pvc-sistemleri" className="hover:text-white transition-colors">PVC Sistemleri</Link></li>
                        <li><Link href="/projeler" className="hover:text-white transition-colors">Referanslar</Link></li>
                        <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                        <li><Link href="/sss" className="hover:text-white transition-colors">SSS</Link></li>
                        <li><Link href="/iletisim" className="hover:text-white transition-colors">İletişim</Link></li>
                    </ul>
                </div>

                {/* Services */}
                <div>
                    <h4 className="text-lg font-bold mb-6 border-l-4 border-primary-500 pl-3 uppercase">Hizmetlerimiz</h4>
                    <ul className="space-y-4 text-neutral-400">
                        <li><Link href="/pvc-sistemleri" className="hover:text-white transition-colors">PVC Pencere Sistemleri</Link></li>
                        <li><Link href="/cam-balkon-sistemleri" className="hover:text-white transition-colors">Cam Balkon</Link></li>
                        <li><Link href="/panjur-kepenk-sistemleri" className="hover:text-white transition-colors">Panjur & Kepenk</Link></li>
                        <li><Link href="/sineklik-sistemleri" className="hover:text-white transition-colors">Sineklik Çözümleri</Link></li>
                        <li><Link href="/dusakabin-sistemleri" className="hover:text-white transition-colors">Duşakabin</Link></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h4 className="text-lg font-bold mb-6 border-l-4 border-primary-500 pl-3 uppercase">İletişim Bilgileri</h4>
                    <ul className="space-y-6 text-neutral-400">
                        <li className="flex gap-4">
                            <span className="text-primary-500 font-bold">📍</span>
                            <a href={businessConfig.social.googleMaps} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-white transition-colors">{businessConfig.address.full}</a>
                        </li>
                        <li className="flex gap-4">
                            <span className="text-primary-500 font-bold">📞</span>
                            <a href={`tel:${businessConfig.contact.landlineRaw}`} className="hover:text-white transition-colors">{businessConfig.contact.landline}</a>
                        </li>
                        <li className="flex gap-4">
                            <span className="text-primary-500 font-bold">📱</span>
                            <a href={`tel:${businessConfig.contact.mobileRaw}`} className="hover:text-white transition-colors font-medium">{businessConfig.contact.mobile}</a>
                        </li>
                        <li className="flex gap-4">
                            <span className="text-primary-500 font-bold">✉️</span>
                            <a href={`mailto:${businessConfig.contact.email}`} className="hover:text-white transition-colors">{businessConfig.contact.email}</a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Floating WhatsApp Button */}
            <a
                href={`https://wa.me/${businessConfig.contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center"
                aria-label="WhatsApp ile İletişim"
            >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
            </a>

            {/* SEO Text for Local Search */}
            <div className="container-custom mb-8">
                <p className="text-xs text-neutral-600 text-center max-w-4xl mx-auto leading-relaxed">
                    <strong>Egepen Akçayapı</strong> - Beylikdüzü, Gürpınar, Yakuplu, Kavaklı, Adnan Kahveci ve çevre bölgelerde
                    PVC pencere, cam balkon, sineklik, panjur ve duşakabin montaj hizmeti veren <strong>Egepen Deceuninck yetkili bayisi</strong>.
                    İstanbul Avrupa yakasında 25 yıllık tecrübe ile profesyonel hizmet. 10 yıl garanti, ücretsiz keşif.
                </p>
            </div>

            <div className="border-t border-white/5 pt-8 text-center text-neutral-500 text-xs">
                <p>© {currentYear} {businessConfig.legalName}. Tüm Hakları Saklıdır.</p>
                <p className="mt-2 text-neutral-600">Egepen Deceuninck Yetkili Bayi - Beylikdüzü / İstanbul</p>
            </div>
        </footer>
    );
}
