import Link from "next/link";
import OptimizedImage from "@/components/ui/OptimizedImage";

interface ProductCardProps {
  name: string;
  slug: string;
  basePath: string;
  image: string;
  tagline?: string;
  description?: string;
  badge?: string;
  specs?: { label: string; value: string }[];
}

/**
 * ProductCard - Sade, profesyonel ürün kartı
 * Hover efektli, mobil uyumlu, tutarlı tasarım
 */
export function ProductCard({
  name,
  slug,
  basePath,
  image,
  tagline,
  description,
  badge,
  specs,
}: ProductCardProps) {
  return (
    <Link
      href={`${basePath}/${slug}`}
      className="group block bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-lg hover:border-primary-200 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] bg-neutral-100 overflow-hidden">
        <OptimizedImage
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {badge && (
          <span className="absolute top-3 right-3 bg-primary-600 text-white px-3 py-1 rounded-full text-xs font-bold">
            {badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-neutral-900 group-hover:text-primary-600 transition-colors mb-1">
          {name}
        </h3>
        {tagline && (
          <p className="text-sm text-primary-600 font-medium mb-2">{tagline}</p>
        )}
        {description && (
          <p className="text-sm text-neutral-500 line-clamp-2 mb-3">{description}</p>
        )}

        {/* Quick Specs */}
        {specs && specs.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {specs.slice(0, 3).map((spec, i) => (
              <span
                key={i}
                className="inline-block text-xs bg-neutral-100 text-neutral-600 px-2 py-1 rounded-md"
              >
                {spec.label}: {spec.value}
              </span>
            ))}
          </div>
        )}

        <span className="inline-flex items-center gap-1 text-sm text-primary-600 font-semibold group-hover:gap-2 transition-all">
          Detaylı İncele
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
