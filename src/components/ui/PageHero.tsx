import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: BreadcrumbItem[];
  compact?: boolean;
  gradient?: string;
}

/**
 * PageHero - Tüm sayfalar için tutarlı, sade hero bölümü
 * Kompakt ve mobil uyumlu
 */
export function PageHero({
  title,
  subtitle,
  breadcrumbs = [],
  compact = false,
  gradient = 'from-primary-900 via-primary-800 to-primary-700',
}: PageHeroProps) {
  return (
    <section className={`relative bg-gradient-to-br ${gradient} text-white ${compact ? 'py-12 md:py-16' : 'py-16 md:py-20'} overflow-hidden`}>
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.05)_0%,transparent_50%)]" />
      
      <div className="container-custom relative z-10">
        {/* Breadcrumb */}
        {breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-sm text-white/50 font-medium">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
              </li>
              {breadcrumbs.map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-white/30" aria-hidden="true">/</span>
                  {item.href ? (
                    <Link href={item.href} className="hover:text-white transition-colors">{item.label}</Link>
                  ) : (
                    <span className="text-white" aria-current="page">{item.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <h1 className={`font-extrabold text-white leading-tight ${compact ? 'text-2xl md:text-3xl' : 'text-3xl md:text-4xl lg:text-5xl'}`}>
          {title}
        </h1>
        {subtitle && (
          <p className={`text-white/70 max-w-2xl mt-3 leading-relaxed ${compact ? 'text-base' : 'text-lg'}`}>
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
