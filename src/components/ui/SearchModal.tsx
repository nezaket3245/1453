"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

/**
 * SearchModal Component
 * 
 * Full-screen search modal with keyboard navigation.
 * Searches through products, services, and pages.
 */

interface SearchResult {
    title: string;
    description: string;
    href: string;
    category: string;
    icon?: string;
}

// Static search data
const searchData: SearchResult[] = [
    // PVC Products
    { title: "Legend Serisi PVC Pencere", description: "6 odacık, maksimum ısı yalıtımı", href: "/pvc-sistemleri/legend-pvc-pencere", category: "PVC Sistemleri", icon: "🪟" },
    { title: "Evolution Serisi PVC Pencere", description: "Orta sınıf, dengeli performans", href: "/pvc-sistemleri/evolution-pvc-pencere", category: "PVC Sistemleri", icon: "🪟" },
    { title: "Fusion Serisi PVC Pencere", description: "Ekonomik çözüm", href: "/pvc-sistemleri/fusion-pvc-pencere", category: "PVC Sistemleri", icon: "🪟" },
    { title: "Zen Spirit Sürme Sistem", description: "Minimal çerçeve, maksimum görünürlük", href: "/pvc-sistemleri/zen-spirit-surme-sistem", category: "PVC Sistemleri", icon: "🪟" },

    // Cam Balkon
    { title: "Isıcamlı Cam Balkon", description: "Kış bahçesi için ideal çözüm", href: "/cam-balkon-sistemleri/isicamli-cam-balkon-tiara-max", category: "Cam Balkon", icon: "🌡️" },
    { title: "Katlanır Cam Balkon", description: "%100 açılım, tam manzara", href: "/cam-balkon-sistemleri/katlanir-cam-balkon-sistemi", category: "Cam Balkon", icon: "🏗️" },
    { title: "Sürme Cam Balkon", description: "Pratik kullanım", href: "/cam-balkon-sistemleri/surme-cam-balkon-sistemi", category: "Cam Balkon", icon: "↔️" },

    // Sineklik
    { title: "Pileli Sineklik", description: "Katlanır, yerden tasarruf", href: "/sineklik-sistemleri/pileli-pencere-sinekligi", category: "Sineklik", icon: "🦟" },
    { title: "Menteşeli Sineklik", description: "Kapı tipi sineklik", href: "/sineklik-sistemleri/menteseli-kapi-sinekligi", category: "Sineklik", icon: "🚪" },
    { title: "Sürgülü Sineklik", description: "Yan açılır sistem", href: "/sineklik-sistemleri/surgulu-sineklik", category: "Sineklik", icon: "↔️" },

    // Panjur
    { title: "Motorlu Panjur", description: "Somfy/Becker motorlu sistem", href: "/panjur-kepenk-sistemleri/motorlu-panjur-premium", category: "Panjur & Kepenk", icon: "⚙️" },
    { title: "Manuel Panjur", description: "Kayışlı klasik sistem", href: "/panjur-kepenk-sistemleri/manuel-panjur-sistemi", category: "Panjur & Kepenk", icon: "🔧" },

    // Pages
    { title: "Ana Sayfa", description: "Egepen Akçayapı - Beylikdüzü", href: "/", category: "Sayfalar", icon: "🏠" },
    { title: "Hakkımızda", description: "Şirket bilgileri ve tarihçe", href: "/hakkimizda", category: "Sayfalar", icon: "ℹ️" },
    { title: "İletişim", description: "Adres, telefon ve harita", href: "/iletisim", category: "Sayfalar", icon: "📞" },
    { title: "Teklif Al", description: "Ücretsiz keşif ve fiyat teklifi", href: "/teklif-al", category: "Sayfalar", icon: "📝" },
    { title: "Projeler", description: "Tamamlanan projelerimiz", href: "/projeler", category: "Sayfalar", icon: "🏗️" },
    { title: "Blog", description: "İpuçları ve haberler", href: "/blog", category: "Sayfalar", icon: "📰" },
    { title: "SSS", description: "Sık sorulan sorular", href: "/sss", category: "Sayfalar", icon: "❓" },
];

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    // Focus input when opened
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
            setQuery("");
            setResults([]);
            setSelectedIndex(0);
        }
    }, [isOpen]);

    // Search logic
    useEffect(() => {
        if (query.length < 2) {
            setResults([]);
            return;
        }

        const searchQuery = query.toLowerCase().trim();
        const filtered = searchData.filter(
            (item) =>
                item.title.toLowerCase().includes(searchQuery) ||
                item.description.toLowerCase().includes(searchQuery) ||
                item.category.toLowerCase().includes(searchQuery)
        );

        setResults(filtered.slice(0, 8));
        setSelectedIndex(0);
    }, [query]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;

            switch (e.key) {
                case "ArrowDown":
                    e.preventDefault();
                    setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
                    break;
                case "ArrowUp":
                    e.preventDefault();
                    setSelectedIndex((prev) => Math.max(prev - 1, 0));
                    break;
                case "Enter":
                    if (results[selectedIndex]) {
                        window.location.href = results[selectedIndex].href;
                        onClose();
                    }
                    break;
                case "Escape":
                    onClose();
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, results, selectedIndex, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4 bg-black/60 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Search Input */}
                        <div className="flex items-center gap-4 px-6 py-4 border-b border-neutral-100">
                            <svg className="w-5 h-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                ref={inputRef}
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Ürün, hizmet veya sayfa ara..."
                                className="flex-1 text-lg text-neutral-900 placeholder:text-neutral-400 outline-none"
                            />
                            <kbd className="hidden sm:inline-flex px-2 py-1 text-xs text-neutral-500 bg-neutral-100 rounded font-mono">
                                ESC
                            </kbd>
                        </div>

                        {/* Results */}
                        <div className="max-h-[60vh] overflow-y-auto">
                            {query.length < 2 ? (
                                <div className="p-6 text-center text-neutral-500">
                                    <p className="mb-4">Arama yapmak için en az 2 karakter girin</p>
                                    <div className="flex flex-wrap justify-center gap-2">
                                        {["PVC Pencere", "Cam Balkon", "Sineklik", "Panjur"].map((term) => (
                                            <button
                                                key={term}
                                                onClick={() => setQuery(term)}
                                                className="px-3 py-1.5 text-sm bg-neutral-100 text-neutral-600 rounded-lg hover:bg-neutral-200 transition-colors"
                                            >
                                                {term}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ) : results.length === 0 ? (
                                <div className="p-6 text-center text-neutral-500">
                                    <p>&ldquo;{query}&rdquo; için sonuç bulunamadı</p>
                                    <Link
                                        href="/iletisim"
                                        onClick={onClose}
                                        className="inline-block mt-4 text-primary-600 hover:text-primary-700"
                                    >
                                        Bize ulaşın →
                                    </Link>
                                </div>
                            ) : (
                                <ul className="py-2">
                                    {results.map((result, index) => (
                                        <li key={result.href}>
                                            <Link
                                                href={result.href}
                                                onClick={onClose}
                                                className={`flex items-center gap-4 px-6 py-3 transition-colors ${index === selectedIndex
                                                        ? "bg-primary-50"
                                                        : "hover:bg-neutral-50"
                                                    }`}
                                            >
                                                <span className="text-2xl">{result.icon}</span>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-medium text-neutral-900 truncate">
                                                        {result.title}
                                                    </p>
                                                    <p className="text-sm text-neutral-500 truncate">
                                                        {result.description}
                                                    </p>
                                                </div>
                                                <span className="text-xs text-neutral-400 bg-neutral-100 px-2 py-1 rounded">
                                                    {result.category}
                                                </span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="px-6 py-3 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                            <div className="flex items-center gap-4">
                                <span className="flex items-center gap-1">
                                    <kbd className="px-1.5 py-0.5 bg-white border border-neutral-200 rounded text-[10px]">↑</kbd>
                                    <kbd className="px-1.5 py-0.5 bg-white border border-neutral-200 rounded text-[10px]">↓</kbd>
                                    Gezin
                                </span>
                                <span className="flex items-center gap-1">
                                    <kbd className="px-1.5 py-0.5 bg-white border border-neutral-200 rounded text-[10px]">↵</kbd>
                                    Seç
                                </span>
                            </div>
                            <span>{results.length} sonuç</span>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// Search Button Component for Header
export function SearchButton({ onClick }: { onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="flex items-center gap-2 px-3 py-2 text-neutral-500 hover:text-primary-600 transition-colors"
            aria-label="Ara"
        >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="hidden lg:inline text-sm">Ara</span>
            <kbd className="hidden lg:inline-flex px-1.5 py-0.5 text-[10px] text-neutral-400 bg-neutral-100 rounded font-mono">
                ⌘K
            </kbd>
        </button>
    );
}
