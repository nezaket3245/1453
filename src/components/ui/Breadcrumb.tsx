"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Breadcrumb Component
 * 
 * SEO-friendly breadcrumb navigation with Schema.org markup.
 * Automatically generates breadcrumbs based on current path.
 */

interface BreadcrumbItem {
    label: string;
    href: string;
    current?: boolean;
}

// Path to Turkish label mapping
const pathLabels: Record<string, string> = {
    "pvc-sistemleri": "PVC Pencere Sistemleri",
    "cam-balkon-sistemleri": "Cam Balkon Sistemleri",
    "sineklik-sistemleri": "Sineklik Sistemleri",
    "panjur-kepenk-sistemleri": "Panjur & Kepenk",
    "dusakabin-sistemleri": "Duşakabin Sistemleri",
    "aluminyum-sistemleri": "Alüminyum Sistemleri",
    "urunler": "Ürünler",
    "hizmetler": "Hizmetler",
    "projeler": "Projeler",
    "blog": "Blog",
    "hakkimizda": "Hakkımızda",
    "iletisim": "İletişim",
    "teklif-al": "Teklif Al",
    "sss": "Sık Sorulan Sorular",
};

interface BreadcrumbProps {
    customItems?: BreadcrumbItem[];
    currentPageTitle?: string;
}

export function Breadcrumb({ customItems, currentPageTitle }: BreadcrumbProps) {
    const pathname = usePathname();

    // Generate breadcrumb items from pathname
    const generateBreadcrumbs = (): BreadcrumbItem[] => {
        if (customItems) return customItems;

        const segments = pathname.split("/").filter(Boolean);
        const breadcrumbs: BreadcrumbItem[] = [
            { label: "Ana Sayfa", href: "/" },
        ];

        let currentPath = "";
        segments.forEach((segment, index) => {
            currentPath += `/${segment}`;
            const isLast = index === segments.length - 1;

            // Get label from mapping or use current page title or format segment
            let label = pathLabels[segment];
            if (!label && isLast && currentPageTitle) {
                label = currentPageTitle;
            }
            if (!label) {
                // Format slug to readable text
                label = segment
                    .split("-")
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ");
            }

            breadcrumbs.push({
                label,
                href: currentPath,
                current: isLast,
            });
        });

        return breadcrumbs;
    };

    const items = generateBreadcrumbs();

    // Don't show on homepage
    if (pathname === "/") return null;

    // Schema.org BreadcrumbList
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.label,
            item: `https://egepenakcayapi.com.tr${item.href}`,
        })),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
            />
            <nav
                aria-label="Breadcrumb"
                className="bg-neutral-50 border-b border-neutral-100"
            >
                <div className="container-custom py-3">
                    <ol className="flex flex-wrap items-center gap-2 text-sm">
                        {items.map((item, index) => (
                            <li key={item.href} className="flex items-center">
                                {index > 0 && (
                                    <svg
                                        className="w-4 h-4 text-neutral-400 mx-2"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                )}
                                {item.current ? (
                                    <span
                                        className="text-neutral-600 font-medium truncate max-w-[200px]"
                                        aria-current="page"
                                    >
                                        {item.label}
                                    </span>
                                ) : (
                                    <Link
                                        href={item.href}
                                        className="text-neutral-500 hover:text-primary-600 transition-colors"
                                    >
                                        {index === 0 ? (
                                            <span className="flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                                </svg>
                                                <span className="hidden sm:inline">{item.label}</span>
                                            </span>
                                        ) : (
                                            item.label
                                        )}
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ol>
                </div>
            </nav>
        </>
    );
}
