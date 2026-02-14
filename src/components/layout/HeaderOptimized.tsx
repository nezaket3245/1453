"use client";

import { useState, useEffect, useCallback, useRef, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { businessConfig } from "@/config/business.config";

/**
 * Navigation items - moved outside component to prevent recreation
 */
const navigationItems = [
    {
        label: "PVC Sistemleri",
        href: "/pvc-sistemleri",
        children: [
            { label: "Legend Serisi", href: "/pvc-sistemleri/legend-pvc-pencere" },
            { label: "Legend Art Serisi", href: "/pvc-sistemleri/legend-art-pvc-pencere" },
            { label: "Sürme Sistemleri", href: "/pvc-sistemleri#surme" },
            { label: "Tamirat & Tadilat", href: "/pvc-sistemleri/tamirat-tadilat" },
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
            { label: "Hebe-Schiebe", href: "/aluminyum-sistemleri/hebe-schiebe-lift-slide" },
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
            { label: "Çözüm Merkezi", href: "/cozumler" },
            { label: "Blog & İpuçları", href: "/blog" },
            { label: "SSS", href: "/sss" },
            { label: "Hakkımızda", href: "/hakkimizda" },
        ],
    },
    { label: "İletişim", href: "/iletisim" },
];

/**
 * HeaderOptimized Component
 * 
 * Performance optimizations:
 * - CSS-only animations (no framer-motion)
 * - Memoized sub-components
 * - Passive event listeners
 * - Minimal re-renders with useCallback
 */
export const HeaderOptimized = memo(function HeaderOptimized() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const hamburgerRef = useRef<HTMLButtonElement>(null);

    const handleScroll = useCallback(() => {
        setIsScrolled(window.scrollY > 20);
    }, []);

    useEffect(() => {
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    const toggleMobileMenu = useCallback(() => {
        setIsMobileMenuOpen((prev) => !prev);
    }, []);

    const closeMobileMenu = useCallback(() => {
        setIsMobileMenuOpen(false);
        setActiveDropdown(null);
        // Return focus to hamburger button
        hamburgerRef.current?.focus();
    }, []);

    // Escape key closes mobile menu and desktop dropdowns
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                if (isMobileMenuOpen) {
                    closeMobileMenu();
                } else if (activeDropdown) {
                    setActiveDropdown(null);
                }
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isMobileMenuOpen, activeDropdown, closeMobileMenu]);

    // Focus trap inside mobile menu
    useEffect(() => {
        if (!isMobileMenuOpen || !mobileMenuRef.current) return;
        const menu = mobileMenuRef.current;
        const focusable = menu.querySelectorAll<HTMLElement>(
            'a[href], button, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        first.focus();

        const trap = (e: KeyboardEvent) => {
            if (e.key !== "Tab") return;
            if (e.shiftKey) {
                if (document.activeElement === first) { e.preventDefault(); last.focus(); }
            } else {
                if (document.activeElement === last) { e.preventDefault(); first.focus(); }
            }
        };
        menu.addEventListener("keydown", trap);
        return () => menu.removeEventListener("keydown", trap);
    }, [isMobileMenuOpen]);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isMobileMenuOpen]);

    return (
        <>
            {/* Main Header */}
            <header
                className={cn(
                    "sticky top-0 z-50 w-full transition-[background-color,box-shadow] duration-200",
                    isScrolled
                        ? "bg-white shadow-lg border-b border-neutral-100"
                        : "bg-white"
                )}
                role="banner"
            >
                <nav
                    className="container-custom flex items-center justify-between h-16 lg:h-20"
                    role="navigation"
                    aria-label="Ana menü"
                >
                    {/* Logo */}
                    <Link
                        href="/"
                        title="Egepen Akçayapı Ana Sayfa"
                        className="shrink-0"
                    >
                        <Image
                            src="/images/akcay-yapi-logo.webp"
                            alt="Egepen Akçayapı — Egepen Deceuninck Yetkili Bayi"
                            width={200}
                            height={48}
                            className="h-10 lg:h-12 w-auto"
                            priority
                        />
                    </Link>

                    {/* Desktop Nav */}
                    <ul className="hidden lg:flex items-center gap-1" role="menubar">
                        {navigationItems.map((item) => (
                            <li
                                key={item.href}
                                className="relative group"
                                role="none"
                                onMouseEnter={() =>
                                    item.children && setActiveDropdown(item.href)
                                }
                                onMouseLeave={() => setActiveDropdown(null)}
                                onFocus={() =>
                                    item.children && setActiveDropdown(item.href)
                                }
                                onBlur={(e) => {
                                    // Close dropdown only when focus leaves the entire <li>
                                    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                                        setActiveDropdown(null);
                                    }
                                }}
                            >
                                <Link
                                    href={item.href}
                                    title={`${item.label} - Egepen Akçayapı`}
                                    className="px-4 py-2 rounded-lg font-bold text-neutral-900 hover:text-primary-600 hover:bg-primary-50 transition-colors flex items-center gap-1 text-[15px]"
                                    role="menuitem"
                                    aria-haspopup={item.children ? "true" : undefined}
                                    aria-expanded={
                                        item.children && activeDropdown === item.href
                                            ? "true"
                                            : undefined
                                    }
                                >
                                    {item.label}
                                    {item.children && (
                                        <ChevronDownIcon className="w-4 h-4 transition-transform group-hover:rotate-180" />
                                    )}
                                </Link>

                                {/* Desktop Dropdown - CSS only animation */}
                                {item.children && (
                                    <div
                                        className={cn(
                                            "absolute top-full left-0 pt-1 opacity-0 invisible translate-y-2 transition-all duration-200",
                                            activeDropdown === item.href &&
                                                "opacity-100 visible translate-y-0"
                                        )}
                                    >
                                        <ul
                                            className={cn(
                                                "bg-white rounded-xl shadow-xl border border-neutral-100 p-1.5",
                                                item.children.length > 4
                                                    ? "grid grid-cols-2 gap-0.5 w-[380px]"
                                                    : "min-w-[200px]"
                                            )}
                                            role="menu"
                                            aria-label={`${item.label} alt menüsü`}
                                        >
                                            {item.children.map((child) => (
                                                <li key={child.href} role="none">
                                                    <Link
                                                        href={child.href}
                                                        title={child.label}
                                                        className="block px-3 py-2 text-sm text-neutral-700 font-medium hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors whitespace-nowrap"
                                                        role="menuitem"
                                                    >
                                                        {child.label}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>

                    {/* Mobile Toggle */}
                    <button
                        ref={hamburgerRef}
                        className="lg:hidden p-2 min-w-[48px] min-h-[48px] text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                        onClick={toggleMobileMenu}
                        aria-label={isMobileMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
                        aria-expanded={isMobileMenuOpen}
                        aria-controls="mobile-menu"
                    >
                        {isMobileMenuOpen ? (
                            <CloseIcon className="w-8 h-8" />
                        ) : (
                            <MenuIcon className="w-8 h-8" />
                        )}
                    </button>
                </nav>
            </header>

            {/* Mobile Menu - CSS animation */}
            <div
                id="mobile-menu"
                ref={mobileMenuRef}
                className={cn(
                    "fixed inset-0 bg-white z-[60] lg:hidden flex flex-col transition-transform duration-300 ease-out",
                    isMobileMenuOpen ? "translate-x-0" : "translate-x-full invisible"
                )}
                aria-hidden={!isMobileMenuOpen}
                {...(!isMobileMenuOpen && { inert: "" as unknown as boolean })}
                role="dialog"
                aria-modal="true"
                aria-label="Mobil menü"
            >
                {/* Mobile Header */}
                <div className="flex justify-between items-center p-6 border-b border-neutral-100 bg-white">
                    <span className="text-2xl font-black text-primary-600 italic uppercase tracking-tighter">
                        {businessConfig.brand}{" "}
                        <span className="text-neutral-800">Akçayapı</span>
                    </span>
                    <button
                        onClick={closeMobileMenu}
                        className="p-2 -mr-2 text-neutral-400 hover:text-primary-600 transition-colors min-w-[48px] min-h-[48px]"
                        aria-label="Menüyü kapat"
                    >
                        <CloseIcon className="w-8 h-8" />
                    </button>
                </div>

                {/* Mobile Navigation List */}
                <div className="flex-1 overflow-y-auto p-6 overscroll-contain">
                    <ul className="space-y-4">
                        {navigationItems.map((item) => (
                            <li
                                key={item.href}
                                className="border-b border-neutral-50 pb-4 last:border-0"
                            >
                                <div className="flex items-center justify-between gap-4 font-bold text-xl text-neutral-900">
                                    <Link
                                        href={item.href}
                                        title={`${item.label} Sayfası`}
                                        onClick={closeMobileMenu}
                                        className="hover:text-primary-600 transition-colors flex-1 min-h-[44px] flex items-center"
                                    >
                                        {item.label}
                                    </Link>
                                    {item.children && (
                                        <button
                                            onClick={() =>
                                                setActiveDropdown(
                                                    activeDropdown === item.href
                                                        ? null
                                                        : item.href
                                                )
                                            }
                                            className={cn(
                                                "p-2 rounded-lg bg-neutral-50 text-neutral-500 transition-all min-w-[44px] min-h-[44px]",
                                                activeDropdown === item.href &&
                                                    "bg-primary-50 text-primary-600"
                                            )}
                                            aria-label={`${item.label} alt menüsünü aç/kapat`}
                                            aria-expanded={activeDropdown === item.href}
                                        >
                                            <ChevronDownIcon
                                                className={cn(
                                                    "w-6 h-6 transition-transform duration-200",
                                                    activeDropdown === item.href && "rotate-180"
                                                )}
                                            />
                                        </button>
                                    )}
                                </div>

                                {/* Mobile Sub-items - CSS animation */}
                                {item.children && (
                                    <ul
                                        className={cn(
                                            "pl-4 mt-4 space-y-3 overflow-hidden transition-all duration-200",
                                            activeDropdown === item.href
                                                ? "max-h-[500px] opacity-100"
                                                : "max-h-0 opacity-0"
                                        )}
                                    >
                                        {item.children.map((child) => (
                                            <li key={child.href}>
                                                <Link
                                                    href={child.href}
                                                    title={child.label}
                                                    onClick={closeMobileMenu}
                                                    className="block py-2 text-lg text-neutral-600 hover:text-primary-600 transition-colors min-h-[44px]"
                                                >
                                                    {child.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Mobile Footer Actions */}
                <div className="p-6 bg-neutral-50 space-y-4 border-t border-neutral-100">
                    <div className="grid grid-cols-2 gap-4">
                        <a
                            href={`tel:${businessConfig.contact.mobileRaw}`}
                            title="Egepen Akçayapı'yı Hemen Arayın"
                            className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors min-h-[48px]"
                        >
                            <PhoneIcon className="w-5 h-5" />
                            Tıkla Ara
                        </a>
                        <a
                            href={`https://wa.me/${businessConfig.contact.whatsapp}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="WhatsApp ile Mesaj Gönderin"
                            className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-colors min-h-[48px]"
                        >
                            <WhatsAppIcon className="w-5 h-5" />
                            WhatsApp
                        </a>
                    </div>
                    <Link
                        href="/teklif-al"
                        onClick={closeMobileMenu}
                        className="block w-full text-center px-4 py-3 border-2 border-neutral-200 text-neutral-600 font-bold rounded-xl hover:bg-neutral-100 transition-colors min-h-[48px]"
                    >
                        Ücretsiz Keşif Formu
                    </Link>
                </div>
            </div>

            {/* Mobile Menu Backdrop */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-[55] lg:hidden"
                    onClick={closeMobileMenu}
                    aria-hidden="true"
                />
            )}
        </>
    );
});

// Memoized Icons
const PhoneIcon = memo(function PhoneIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
        </svg>
    );
});

const WhatsAppIcon = memo(function WhatsAppIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
        >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
    );
});

const ChevronDownIcon = memo(function ChevronDownIcon({
    className,
}: {
    className?: string;
}) {
    return (
        <svg
            className={className}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
            />
        </svg>
    );
});

const MenuIcon = memo(function MenuIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
            />
        </svg>
    );
});

const CloseIcon = memo(function CloseIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
            />
        </svg>
    );
});

// Default export for easier imports
export default HeaderOptimized;
