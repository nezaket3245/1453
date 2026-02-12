import Link from "next/link";
import OptimizedImage from "@/components/ui/OptimizedImage";

/**
 * SineklikProductCard — Server Component
 *
 * Bento-style product card for fly screen systems.
 * Displays: image, title (H3), short summary (line-clamp-3),
 * feature tags, price segment badge, and CTA link.
 *
 * Mobile-first responsive: stacks vertically on small screens,
 * horizontal layout on md+ with image on the left.
 */

interface ProductCardProps {
    name: string;
    slug: string;
    tagline: string;
    description: string;
    image: string;
    features: string[];
    priceRange: "ekonomik" | "orta" | "premium";
    /** Optional accent color theme */
    accent?: "emerald" | "amber" | "purple" | "blue";
}

const accentMap = {
    emerald: {
        badge: "bg-emerald-100 text-emerald-700",
        tag: "bg-emerald-50 text-emerald-700 border-emerald-200",
        cta: "bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500",
        image: "from-emerald-600 to-teal-700",
    },
    amber: {
        badge: "bg-amber-100 text-amber-700",
        tag: "bg-amber-50 text-amber-700 border-amber-200",
        cta: "bg-amber-600 hover:bg-amber-700 focus:ring-amber-500",
        image: "from-amber-600 to-orange-600",
    },
    purple: {
        badge: "bg-purple-100 text-purple-700",
        tag: "bg-purple-50 text-purple-700 border-purple-200",
        cta: "bg-purple-600 hover:bg-purple-700 focus:ring-purple-500",
        image: "from-purple-600 to-pink-600",
    },
    blue: {
        badge: "bg-blue-100 text-blue-700",
        tag: "bg-blue-50 text-blue-700 border-blue-200",
        cta: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
        image: "from-blue-600 to-indigo-600",
    },
};

const priceLabel: Record<string, string> = {
    ekonomik: "Fiyat İçin Arayın",
    orta: "Fiyat İçin Arayın",
    premium: "Fiyat İçin Arayın",
};

export default function SineklikProductCard({
    name,
    slug,
    tagline,
    description,
    image,
    features,
    priceRange,
    accent = "emerald",
}: ProductCardProps) {
    const colors = accentMap[accent];

    return (
        <article className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col">
            {/* Image Area */}
            <div className={`relative h-52 md:h-56 bg-gradient-to-br ${colors.image} flex-shrink-0`}>
                <OptimizedImage
                    src={image}
                    alt={`${name} - Sineklik Uygulaması`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                />
                {/* Price Badge */}
                <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${colors.badge} shadow-sm`}>
                    {priceLabel[priceRange]}
                </span>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-gray-900 mb-1 leading-snug">
                    {name}
                </h3>
                <p className="text-sm font-medium text-emerald-600 mb-3">
                    {tagline}
                </p>
                <p className="text-sm text-gray-700 line-clamp-3 mb-4 leading-relaxed">
                    {description}
                </p>

                {/* Feature Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                    {features.slice(0, 3).map((feature, i) => (
                        <span
                            key={i}
                            className={`text-xs px-2.5 py-1 rounded-lg border ${colors.tag}`}
                        >
                            {feature}
                        </span>
                    ))}
                </div>

                {/* CTA — pushed to bottom */}
                <div className="mt-auto">
                    <Link
                        href={`/sineklik-sistemleri/${slug}`}
                        className={`inline-flex items-center justify-center w-full gap-2 px-5 py-3 ${colors.cta} text-white text-sm font-bold rounded-xl transition-colors focus:ring-2 focus:outline-none min-h-[48px]`}
                        aria-label={`${name} detaylarını incele`}
                    >
                        Detayları İncele
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </Link>
                </div>
            </div>
        </article>
    );
}
