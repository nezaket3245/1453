"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { businessConfig } from "@/config/business.config";

const navigationItems = [
    {
        label: "PVC Sistemleri",
        href: "/pvc-sistemleri",
        children: [
            { label: "Legend Serisi", href: "/pvc-sistemleri/legend-pvc-pencere" },
            { label: "Legend Art Serisi", href: "/pvc-sistemleri/legend-art-pvc-pencere" },
            { label: "Sürme Sistemleri", href: "/pvc-sistemleri#surme" },
            { label: "Tamirat & Tadilat", href: "/pvc-sistemleri#tamirat" },
        ],
    },
    {
        label: "Cam Balkon",
        href: "/cam-balkon-sistemleri",
        children: [
            { label: "Tiara Max Isıcamlı", href: "/cam-balkon-sistemleri/tiara-max-isicamli-sistem" },
            { label: "Twin Isıcamlı", href: "/cam-balkon-sistemleri/twin-isicamli-sistem" },
            { label: "Eşikli Sürme", href: "/cam-balkon-sistemleri/esikli-surme-cam-balkon" },
            { label: "Eşiksiz Sürme", href: "/cam-balkon-sistemleri/esiksiz-surme-cam-balkon" },
            { label: "Motorlu Giyotin", href: "/cam-balkon-sistemleri/motorlu-giyotin-cam-balkon" },
            { label: "Manuel Giyotin", href: "/cam-balkon-sistemleri/manuel-giyotin-cam-balkon" },
            { label: "Katlanır Sistem", href: "/cam-balkon-sistemleri/katlanir-cam-balkon-sistemi" },
        ],
    },
    {
        label: "Alüminyum",
        href: "/aluminyum-sistemleri",
        children: [
            { label: "Isı Yalıtımlı Pencere", href: "/aluminyum-sistemleri/thermal-break-window" },
            { label: "Giydirme Cephe", href: "/aluminyum-sistemleri/curtain-wall-capped" },
            { label: "Yapısal Silikon", href: "/aluminyum-sistemleri/structural-glazing" },
            { label: "Ofis Bölme", href: "/aluminyum-sistemleri/office-partition-slim" },
            { label: "Hebe-Schiebe (Sürme)", href: "/aluminyum-sistemleri/hebe-schiebe-lift-slide" },
        ],
    },
    {
        label: "Sineklik",
        href: "/sineklik-sistemleri",
        children: [
            { label: "🐱 Kedi Sinekliği", href: "/sineklik-sistemleri/kedi-sinekligi-pet-screen" },
            { label: "Plise Sineklik (Dikey)", href: "/sineklik-sistemleri/plise-sineklik-dikey" },
            { label: "Plise Sineklik (Yatay)", href: "/sineklik-sistemleri/plise-sineklik-yatay" },
            { label: "Sürme Sineklik", href: "/sineklik-sistemleri/surme-sineklik-sistemi" },
            { label: "Menteşeli Sineklik", href: "/sineklik-sistemleri/menteseli-kapi-sinekligi" },
            { label: "Stor Sineklik", href: "/sineklik-sistemleri/stor-sineklik-sistemi" },
        ],
    },
    {
        label: "Panjur & Kepenk",
        href: "/panjur-kepenk-sistemleri",
        children: [
            { label: "Egepen Storbox", href: "/panjur-kepenk-sistemleri/egepen-storbox-monoblok-panjur" },
            { label: "Motorlu Alüminyum", href: "/panjur-kepenk-sistemleri/motorlu-aluminyum-panjur" },
            { label: "Manuel Alüminyum", href: "/panjur-kepenk-sistemleri/manuel-aluminyum-panjur" },
            { label: "Çelik Kepenk", href: "/panjur-kepenk-sistemleri/galvaniz-celik-kepenk" },
            { label: "Perforeli Kepenk", href: "/panjur-kepenk-sistemleri/perforeli-celik-kepenk" },
            { label: "Endüstriyel Kapı", href: "/panjur-kepenk-sistemleri/izoleli-endustriyel-kepenk" },
            { label: "Hızlı PVC Kapı", href: "/panjur-kepenk-sistemleri/hizli-pvc-kapi" },
        ],
    },
    {
        label: "Duşakabin",
        href: "/dusakabin-sistemleri",
        children: [
            { label: "Siyah Kare (Black Edition)", href: "/dusakabin-sistemleri/siyah-kare-cercevesiz-dusakabin" },
            { label: "Lüks Çerçevesiz Menteşeli", href: "/dusakabin-sistemleri/cercevesiz-menteseli-luks-dusakabin" },
            { label: "Premium Çift Sürme", href: "/dusakabin-sistemleri/premium-cift-surme-dusakabin" },
            { label: "Walk-in Tek Panel", href: "/dusakabin-sistemleri/walk-in-tek-panel-dusakabin" },
            { label: "Küvet Üstü Cam Perde", href: "/dusakabin-sistemleri/kuvet-ustu-pivot-cam-perde" },
            { label: "Yarı Çerçeveli Menteşeli", href: "/dusakabin-sistemleri/yari-cerceveli-menteseli-dusakabin" },
        ],
    },
    {
        label: "Bilgi",
        href: "/blog",
        children: [
            { label: "Blog & İpuçları", href: "/blog" },
            { label: "SSS", href: "/sss" },
            { label: "Hakkımızda", href: "/hakkimizda" },
        ],
    },
    { label: "İletişim", href: "/iletisim" },
];


export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    const handleScroll = useCallback(() => {
        setIsScrolled(window.scrollY > 20);
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);


    const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    return (
        <>
            {/* Main Header */}
            <header className={cn("sticky top-0 z-50 w-full transition-all duration-300", isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg border-b" : "bg-white")}>
                <nav className="container-custom flex items-center justify-between h-16 lg:h-20">
                    <Link href="/" className="flex flex-col items-start leading-tight">
                        <span className="text-xl lg:text-2xl font-black text-primary-600 tracking-tighter uppercase italic">
                            {businessConfig.name.split(' ')[0]} <span className="text-neutral-900">{businessConfig.name.split(' ')[1]}</span>
                        </span>
                        <span className="text-[10px] lg:text-xs font-bold text-neutral-500 tracking-widest uppercase">
                            {businessConfig.brand} Yetkili Bayi
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <ul className="hidden lg:flex items-center gap-1">
                        {navigationItems.map((item) => (
                            <li key={item.href} className="relative" onMouseEnter={() => item.children && setActiveDropdown(item.href)} onMouseLeave={() => setActiveDropdown(null)}>
                                <Link href={item.href} className="px-4 py-2 rounded-lg font-bold text-neutral-700 hover:text-primary-600 hover:bg-primary-50 transition-all flex items-center gap-1">
                                    {item.label}
                                    {item.children && <ChevronDownIcon className="w-4 h-4" />}
                                </Link>
                                {item.children && (
                                    <AnimatePresence>
                                        {activeDropdown === item.href && (
                                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute top-full left-0 pt-2">
                                                <ul className="bg-white rounded-xl shadow-xl border p-2 min-w-[240px]">
                                                    {item.children.map((child) => (
                                                        <li key={child.href}>
                                                            <Link href={child.href} className="block px-4 py-2.5 text-neutral-700 font-medium hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                                                                {child.label}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                )}
                            </li>
                        ))}
                    </ul>

                    {/* Mobile Toggle */}
                    <button className="lg:hidden p-2 text-primary-600" onClick={toggleMobileMenu}>
                        <MenuIcon className="w-8 h-8" />
                    </button>
                </nav>
            </header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25 }} className="fixed inset-0 bg-white z-[60] lg:hidden flex flex-col p-6">
                        <div className="flex justify-between items-center mb-12">
                            <span className="text-2xl font-black text-primary-600 italic uppercase">
                                {businessConfig.name}
                            </span>
                            <button onClick={closeMobileMenu} className="p-2"><CloseIcon className="w-8 h-8" /></button>
                        </div>
                        <ul className="space-y-6 text-2xl font-bold text-neutral-900">
                            {navigationItems.map(item => (
                                <li key={item.href}><Link href={item.href} onClick={closeMobileMenu}>{item.label}</Link></li>
                            ))}
                        </ul>
                        <div className="mt-auto space-y-4">
                            <Button variant="primary" fullWidth size="lg" href={`tel:${businessConfig.contact.mobileRaw}`}>Tıkla Ara</Button>
                            <Button variant="outline" fullWidth size="lg" href={`https://wa.me/${businessConfig.contact.whatsapp}`}>WhatsApp Mesaj</Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

// Icons
function PhoneIcon({ className }: { className?: string }) {
    return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>;
}
function WhatsAppIcon({ className }: { className?: string }) {
    return <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>;
}
function ChevronDownIcon({ className }: { className?: string }) {
    return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>;
}
function MenuIcon({ className }: { className?: string }) {
    return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" /></svg>;
}
function CloseIcon({ className }: { className?: string }) {
    return <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>;
}
