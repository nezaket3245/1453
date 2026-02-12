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
    const mobileToggleRef = useRef<HTMLButtonElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleScroll = useCallback(() => {
        setIsScrolled(window.scrollY > 20);
    }, []);

    useEffect(() => {
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    const toggleMobileMenu = useCallback(() => {
        setIsMobileMenuOpen((prev) => {
            const next = !prev;
            // Lock body scroll when menu is open
            document.body.style.overflow = next ? "hidden" : "";
            return next;
        });
    }, []);

    const closeMobileMenu = useCallback(() => {
        setIsMobileMenuOpen(false);
        setActiveDropdown(null);
        // Restore body scroll
        document.body.style.overflow = "";
        // Return focus to toggle button
        mobileToggleRef.current?.focus();
    }, []);

    // Close mobile menu on Escape key
    useEffect(() => {
        if (!isMobileMenuOpen) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeMobileMenu();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isMobileMenuOpen, closeMobileMenu]);

    // Focus trap for mobile menu
    useEffect(() => {
        if (!isMobileMenuOpen || !mobileMenuRef.current) return;

        const menu = mobileMenuRef.current;
        const focusableSelector = 'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])';
        
        // Auto-focus first focusable element (close button)
        const firstFocusable = menu.querySelector<HTMLElement>(focusableSelector);
        if (firstFocusable) {
            requestAnimationFrame(() => firstFocusable.focus());
        }

        const handleTabTrap = (e: KeyboardEvent) => {
            if (e.key !== "Tab") return;
            const focusables = menu.querySelectorAll<HTMLElement>(focusableSelector);
            if (focusables.length === 0) return;
            const first = focusables[0];
            const last = focusables[focusables.length - 1];

            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        };

        menu.addEventListener("keydown", handleTabTrap);
        return () => menu.removeEventListener("keydown", handleTabTrap);
    }, [isMobileMenuOpen]);

    // Desktop dropdown keyboard & focus handlers
    const handleDropdownFocusIn = useCallback((href: string) => {
        if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
        setActiveDropdown(href);
    }, []);

    const handleDropdownFocusOut = useCallback(() => {
        dropdownTimeoutRef.current = setTimeout(() => setActiveDropdown(null), 150);
    }, []);

    const handleDesktopNavKeyDown = useCallback((e: React.KeyboardEvent, item: typeof navigationItems[0]) => {
        if (!item.children) return;
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveDropdown(item.href);
            // Focus first submenu item
            const parentLi = (e.currentTarget as HTMLElement).closest("li");
            requestAnimationFrame(() => {
                const firstLink = parentLi?.querySelector<HTMLElement>('[role="menu"] a');
                firstLink?.focus();
            });
        }
    }, []);

    const handleSubmenuKeyDown = useCallback((e: React.KeyboardEvent, parentHref: string) => {
        const menu = (e.currentTarget as HTMLElement).closest('[role="menu"]');
        if (!menu) return;
        const items = Array.from(menu.querySelectorAll<HTMLElement>('a'));
        const currentIndex = items.indexOf(e.currentTarget as HTMLElement);

        if (e.key === "ArrowDown") {
            e.preventDefault();
            items[(currentIndex + 1) % items.length]?.focus();
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            items[(currentIndex - 1 + items.length) % items.length]?.focus();
        } else if (e.key === "Escape") {
            e.preventDefault();
            setActiveDropdown(null);
            // Return focus to parent menuitem
            const parentLi = menu.closest("li");
            parentLi?.querySelector<HTMLElement>("a")?.focus();
        }
    }, []);

    return (
        <>
            {/* Top Info Bar — hidden when scrolled for space */}
            <div
                className={cn(
                    "bg-primary-800 text-white text-xs sm:text-sm transition-[max-height,opacity,padding] duration-200 overflow-hidden",
                    isScrolled ? "max-h-0 py-0 opacity-0" : "max-h-12 py-1.5 opacity-100"
                )}
                aria-label="İletişim bilgileri"
            >
                <div className="container-custom flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 sm:gap-6">
                        <a href={`tel:${businessConfig.contact.mobileRaw}`} className="flex items-center gap-1.5 hover:text-primary-200 transition-colors" aria-label="Telefon">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                            <span>{businessConfig.contact.mobile}</span>
                        </a>
                        {/* E-posta gizlendi */}
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="hidden md:inline text-primary-200">Pzt-Cum: 08:30-19:00 | Cmt: 09:00-18:00</span>
                        <a href={businessConfig.social.googleMaps} target="_blank" rel="noopener noreferrer nofollow" className="hidden lg:flex items-center gap-1 hover:text-primary-200 transition-colors">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                            <span>{businessConfig.address.district}</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <header
                className={cn(
                    "sticky top-0 z-50 w-full transition-[box-shadow,border-color] duration-200",
                    isScrolled
                        ? "bg-white shadow-lg border-b border-neutral-100"
                        : "bg-white border-b border-neutral-50"
                )}
                role="banner"
            >
                <nav
                    className="container-custom flex items-center justify-between h-16 lg:h-20"
                    role="navigation"
                    aria-label="Ana menü"
                >
                    {/* Logo — image with explicit dimensions to prevent CLS */}
                    <Link
                        href="/"
                        title="Egepen Akçayapı Ana Sayfa"
                        className="flex items-center focus:ring-2 focus:ring-primary-400 focus:outline-none rounded"
                    >
                        <picture>
                            <source srcSet="/images/akcay-yapi-logo.webp" type="image/webp" />
                            <Image
                                src="/images/akcay-yapi-logo.png"
                                alt="Egepen Akçay Yapı - PVC ve Cam Balkon Sistemleri"
                                width={180}
                                height={43}
                                priority
                                className="h-8 lg:h-10 w-auto max-w-[180px]"
                            />
                        </picture>
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
                                onFocus={() => item.children && handleDropdownFocusIn(item.href)}
                                onBlur={handleDropdownFocusOut}
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
                                            : item.children ? "false" : undefined
                                    }
                                    onKeyDown={(e) => handleDesktopNavKeyDown(e, item)}
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
                                            "absolute top-full left-0 pt-2 opacity-0 invisible translate-y-2 transition-[opacity,transform,visibility] duration-200",
                                            activeDropdown === item.href &&
                                                "opacity-100 visible translate-y-0"
                                        )}
                                    >
                                        <ul
                                            className="bg-white rounded-xl shadow-xl border border-neutral-100 p-2 min-w-[240px]"
                                            role="menu"
                                            aria-label={`${item.label} alt menüsü`}
                                        >
                                            {item.children.map((child) => (
                                                <li key={child.href} role="none">
                                                    <Link
                                                        href={child.href}
                                                        title={child.label}
                                                        className="block px-4 py-2.5 text-neutral-800 font-semibold hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                                                        role="menuitem"
                                                        onKeyDown={(e) => handleSubmenuKeyDown(e, item.href)}
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

                    {/* Desktop CTA Button */}
                    <Link
                        href="/teklif-al"
                        title="Ücretsiz Teklif Al"
                        className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 bg-secondary-600 text-white font-bold rounded-xl hover:bg-secondary-700 transition-[color,background-color,box-shadow,transform] shadow-md hover:shadow-lg hover:shadow-secondary-500/20 min-h-[44px] text-sm hover:scale-[1.02] active:scale-[0.98]"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Teklif Al
                    </Link>

                    {/* Mobile Toggle */}
                    <button
                        ref={mobileToggleRef}
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
                ref={mobileMenuRef}
                id="mobile-menu"
                role="dialog"
                aria-modal="true"
                aria-label="Ana menü"
                className={cn(
                    "fixed inset-0 bg-white z-[60] lg:hidden flex flex-col transition-transform duration-300 ease-out",
                    isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
                )}
                aria-hidden={!isMobileMenuOpen}
            >
                {/* Mobile Header */}
                <div className="flex justify-between items-center p-6 border-b border-neutral-100 bg-white">
                    <picture>
                        <source srcSet="/images/akcay-yapi-logo.webp" type="image/webp" />
                        <img
                            src="/images/akcay-yapi-logo.png"
                            alt="Egepen Akçay Yapı"
                            width={150}
                            height={36}
                            className="h-8 w-auto"
                        />
                    </picture>
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
                                                "p-2 rounded-lg bg-neutral-50 text-neutral-500 transition-colors min-w-[44px] min-h-[44px]",
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
                                            "pl-4 mt-4 space-y-3 overflow-hidden transition-[max-height,opacity] duration-200",
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
                <div className="p-6 bg-neutral-50 space-y-3 border-t border-neutral-100">
                    {/* Primary CTA */}
                    <Link
                        href="/teklif-al"
                        onClick={closeMobileMenu}
                        className="flex items-center justify-center gap-2 w-full px-4 py-3.5 bg-secondary-600 text-white font-bold rounded-xl hover:bg-secondary-700 transition-colors min-h-[52px] text-lg shadow-md"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Ücretsiz Teklif Al
                    </Link>
                    <div className="grid grid-cols-2 gap-3">
                        <a
                            href={`tel:${businessConfig.contact.mobileRaw}`}
                            onClick={closeMobileMenu}
                            className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors min-h-[48px]"
                        >
                            <PhoneIcon className="w-5 h-5" />
                            Ara
                        </a>
                        <a
                            href={`https://wa.me/${businessConfig.contact.whatsapp}`}
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            onClick={closeMobileMenu}
                            className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-green-700 text-white font-bold rounded-xl hover:bg-green-800 transition-colors min-h-[48px]"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                            WhatsApp
                        </a>
                    </div>
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
