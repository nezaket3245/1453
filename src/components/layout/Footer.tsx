import Link from "next/link";
import { businessConfig } from "@/config/business.config";
import { getPrimaryStore, formatWorkingHoursDisplay } from "@/data/stores";
import { productCategories } from "@/data/categories";

/**
 * Service area data sourced from businessConfig (DRY)
 */
const { beylikduzu, buyukcekmece, nearbyDistricts } = businessConfig.serviceAreas;

export function Footer() {
    const currentYear = new Date().getFullYear();
    const primaryStore = getPrimaryStore();

    return (
        <footer className="bg-neutral-900 text-white pt-20 pb-10" role="contentinfo" aria-label="Site alt bilgi">
            {/* Service Areas Section - Local SEO Critical */}
            <div className="container-custom mb-16">
                <div className="bg-neutral-800/50 rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center gap-2">
                        <svg className="w-6 h-6 text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
                        Hizmet Bölgelerimiz
                    </h2>
                    <p className="text-neutral-300 text-center max-w-2xl mx-auto mb-8">
                        Beylikdüzü, Büyükçekmece ve çevre ilçelerde <strong className="text-white">ücretsiz keşif</strong> ve profesyonel montaj hizmeti sunuyoruz.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8" aria-label="Hizmet verilen bölgeler">
                        {/* Beylikdüzü Neighborhoods */}
                        <div>
                            <h3 className="text-lg font-bold text-primary-300 mb-4 flex items-center gap-2">
                                <span className="w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center text-primary-400">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                                </span>
                                Beylikdüzü
                            </h3>
                            <div className="grid grid-cols-2 gap-1">
                                {beylikduzu.neighborhoods.map((neighborhood) => (
                                    <span
                                        key={neighborhood}
                                        className="text-sm text-neutral-300 hover:text-white transition-colors cursor-default"
                                    >
                                        • {neighborhood}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Büyükçekmece Neighborhoods */}
                        <div>
                            <h3 className="text-lg font-bold text-secondary-400 mb-4 flex items-center gap-2">
                                <span className="w-8 h-8 bg-secondary-500/20 rounded-lg flex items-center justify-center text-secondary-400">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                                </span>
                                Büyükçekmece
                            </h3>
                            <div className="grid grid-cols-2 gap-1">
                                {buyukcekmece.neighborhoods.slice(0, 16).map((neighborhood) => (
                                    <span
                                        key={neighborhood}
                                        className="text-xs text-neutral-300 hover:text-white transition-colors cursor-default"
                                    >
                                        • {neighborhood}
                                    </span>
                                ))}
                                <span className="text-xs text-neutral-300 col-span-2">
                                    +{buyukcekmece.neighborhoods.length - 16} mahalle daha...
                                </span>
                            </div>
                        </div>

                        {/* Nearby Districts */}
                        <div>
                            <h3 className="text-lg font-bold text-accent-400 mb-4 flex items-center gap-2">
                                <span className="w-8 h-8 bg-accent-500/20 rounded-lg flex items-center justify-center text-accent-400">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" /></svg>
                                </span>
                                Yakın İlçeler
                            </h3>
                            <div className="grid grid-cols-2 gap-1">
                                {nearbyDistricts.map((district: string) => (
                                    <span
                                        key={district}
                                        className="text-sm text-neutral-300 hover:text-white transition-colors cursor-default"
                                    >
                                        • {district}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>


                </div>
            </div>

            <div className="container-custom grid lg:grid-cols-4 gap-12 mb-16">
                {/* Branding & Bio */}
                <div className="lg:col-span-1">
                    <Link href="/" title="Egepen Akçayapı Ana Sayfa" className="mb-6 block focus:ring-2 focus:ring-white/50 focus:outline-none rounded">
                        <picture>
                            <source srcSet="/images/akcay-yapi-logo.webp" type="image/webp" />
                            <img
                                src="/images/akcay-yapi-logo.png"
                                alt="Egepen Akçay Yapı - PVC ve Cam Balkon Sistemleri"
                                width={180}
                                height={43}
                                loading="lazy"
                                className="h-8 w-auto brightness-0 invert"
                            />
                        </picture>
                    </Link>
                    <p className="text-neutral-300 text-sm leading-relaxed mb-6">
                        Beylikdüzü ve Gürpınar bölgesinde 40 yıllık tecrübe ile {businessConfig.brand} yetkili bayisi olarak hizmet vermekteyiz. Isı yalıtımı ve güvenlikte dünya standartlarını evinize getiriyoruz.
                    </p>
                    <div className="flex gap-4">
                        <a href={businessConfig.social.instagram} target="_blank" rel="noopener noreferrer nofollow" title="Egepen Akçayapı Instagram" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary-500 transition-colors" aria-label="Instagram">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                        </a>
                        <a href={businessConfig.social.youtube} target="_blank" rel="noopener noreferrer nofollow" title="Egepen Akçayapı YouTube Kanalı" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary-500 transition-colors" aria-label="YouTube">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                        </a>

                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-bold mb-6 border-l-4 border-primary-500 pl-3 uppercase">Hızlı Linkler</h3>
                    <ul className="space-y-4 text-neutral-300">
                        <li><Link href="/urunler" title="Egepen Akçayapı Ürünleri" className="hover:text-white transition-colors">Ürünlerimiz</Link></li>
                        <li><Link href="/pvc-sistemleri" title="PVC Pencere Sistemleri" className="hover:text-white transition-colors">PVC Sistemleri</Link></li>
                        <li><Link href="/projeler" title="Tamamlanan Projeler ve Referanslar" className="hover:text-white transition-colors">Referanslar</Link></li>
                        <li><Link href="/blog" title="PVC ve Cam Balkon Blog Yazıları" className="hover:text-white transition-colors">Blog</Link></li>
                        <li><Link href="/sss" title="Sıkça Sorulan Sorular" className="hover:text-white transition-colors">SSS</Link></li>
                        <li><Link href="/iletisim" title="Egepen Akçayapı İletişim" className="hover:text-white transition-colors">İletişim</Link></li>
                        <li><Link href="/gizlilik-politikasi" title="Gizlilik Politikası ve KVKK" className="hover:text-white transition-colors">Gizlilik Politikası</Link></li>
                    </ul>
                </div>

                {/* Services — from centralized categories */}
                <div>
                    <h3 className="text-lg font-bold mb-6 border-l-4 border-primary-500 pl-3 uppercase">Hizmetlerimiz</h3>
                    <ul className="space-y-4 text-neutral-300">
                        {productCategories.map((cat) => (
                            <li key={cat.id}>
                                <Link href={cat.href} title={cat.name} className="hover:text-white transition-colors">
                                    {cat.shortName}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact Info */}
                <div>
                    <h3 className="text-lg font-bold mb-6 border-l-4 border-primary-500 pl-3 uppercase">İletişim Bilgileri</h3>
                    <ul className="space-y-6 text-neutral-300">
                        <li className="flex gap-4">
                            <span className="text-primary-500" aria-hidden="true">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                            </span>
                            <a href={businessConfig.social.googleMaps} target="_blank" rel="noopener noreferrer nofollow" title="Egepen Akçayapı Google Maps Konumu" className="text-sm hover:text-white transition-colors">{businessConfig.address.full}</a>
                        </li>
                        <li className="flex gap-4">
                            <span className="text-primary-500" aria-hidden="true">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                            </span>
                            <a href={`tel:${businessConfig.contact.landlineRaw}`} className="hover:text-white transition-colors">{businessConfig.contact.landline}</a>
                        </li>
                        <li className="flex gap-4">
                            <span className="text-primary-500" aria-hidden="true">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /></svg>
                            </span>
                            <a href={`tel:${businessConfig.contact.mobileRaw}`} className="hover:text-white transition-colors font-medium">{businessConfig.contact.mobile}</a>
                        </li>
                        {/* E-posta gizlendi */}
                        <li className="flex gap-4">
                            <span className="text-primary-500" aria-hidden="true">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </span>
                            <span className="text-sm">
                                <span className="block font-medium text-white">Çalışma Saatleri</span>
                                <span className="block">{formatWorkingHoursDisplay(primaryStore.workingHours)}</span>
                            </span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* SEO Text for Local Search */}
            <div className="container-custom mb-8">
                <p className="text-xs text-neutral-300 text-center max-w-4xl mx-auto leading-relaxed">
                    <strong>Egepen Akçayapı</strong> - Beylikdüzü, Gürpınar, Yakuplu, Kavaklı, Adnan Kahveci ve çevre bölgelerde
                    PVC pencere, cam balkon, sineklik, panjur ve duşakabin montaj hizmeti veren <strong>Egepen Deceuninck yetkili bayisi</strong>.
                    İstanbul Avrupa yakasında 40 yıllık tecrübe ile profesyonel hizmet. Ücretsiz keşif.
                </p>
            </div>

            <div className="border-t border-white/5 pt-8 text-center text-neutral-300 text-xs">
                <p>© {currentYear} {businessConfig.legalName}. Tüm Hakları Saklıdır.</p>
                <p className="mt-2 text-neutral-300">Egepen Deceuninck Yetkili Bayi - Beylikdüzü / İstanbul</p>
            </div>
        </footer>
    );
}
