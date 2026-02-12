"use client";

import { useState, useEffect, useCallback, type JSX } from "react";

/**
 * SineklikStickyNav — Client Component
 *
 * Sticky sub-navigation sidebar for quick access to fly screen sections.
 * Desktop: vertical sidebar fixed on the left side
 * Mobile: horizontal scrollable pill bar at the top (sticky below header)
 *
 * Features:
 * - Smooth scroll on click
 * - Active section highlighting via IntersectionObserver
 * - Collapses on mobile for space efficiency
 */

interface NavItem {
    id: string;
    label: string;
    icon: string;
}

const navItems: NavItem[] = [
    { id: "models", label: "Modeller", icon: "grid" },
    { id: "kedi-sinekligi", label: "Kedi Sinekliği", icon: "shield" },
    { id: "plise", label: "Plise", icon: "lines" },
    { id: "surme-menteseli", label: "Sürme & Menteşeli", icon: "arrows" },
    { id: "stor", label: "Stor", icon: "scroll" },
    { id: "karsilastirma", label: "Karşılaştırma", icon: "table" },
    { id: "renkler", label: "Renkler", icon: "palette" },
    { id: "fiyat", label: "Fiyat", icon: "calculator" },
];

const iconMap: Record<string, JSX.Element> = {
    grid: <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />,
    shield: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.249-8.25-3.286z" />,
    lines: <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />,
    arrows: <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />,
    scroll: <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21l3.75-3.75" />,
    table: <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 0v.375" />,
    palette: <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />,
    calculator: <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />,
};

export default function SineklikStickyNav() {
    const [activeSection, setActiveSection] = useState("models");

    // Track visible sections via IntersectionObserver
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                }
            },
            { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
        );

        for (const item of navItems) {
            const el = document.getElementById(item.id);
            if (el) observer.observe(el);
        }

        return () => observer.disconnect();
    }, []);

    const scrollTo = useCallback((id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, []);

    return (
        <>
            {/* Desktop Sidebar — visible on xl+ */}
            <nav
                className="hidden xl:flex fixed left-4 top-1/2 -translate-y-1/2 z-30 flex-col gap-1.5 bg-white rounded-2xl shadow-lg border border-gray-200 p-2"
                aria-label="Sayfa içi hızlı navigasyon"
            >
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => scrollTo(item.id)}
                        className={`group relative flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors min-h-[40px] ${
                            activeSection === item.id
                                ? "bg-emerald-600 text-white shadow-md"
                                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        }`}
                        aria-current={activeSection === item.id ? "true" : undefined}
                        aria-label={item.label}
                    >
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                            {iconMap[item.icon]}
                        </svg>
                        <span className="whitespace-nowrap">{item.label}</span>
                    </button>
                ))}
            </nav>

            {/* Mobile Pill Bar — visible below xl */}
            <div className="xl:hidden sticky top-[60px] z-30 bg-white border-b border-gray-200 shadow-sm">
                <nav
                    className="flex items-center gap-2 px-4 py-2.5 overflow-x-auto scrollbar-hide"
                    aria-label="Sayfa içi hızlı navigasyon"
                >
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => scrollTo(item.id)}
                            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                                activeSection === item.id
                                    ? "bg-emerald-600 text-white shadow-sm"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                            aria-current={activeSection === item.id ? "true" : undefined}
                        >
                            {item.label}
                        </button>
                    ))}
                </nav>
            </div>
        </>
    );
}
