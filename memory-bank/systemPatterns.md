# System Patterns — Egepen Akçayapı

## Architecture
```
Static Site (Next.js 16 static export)
├── Cloudflare Pages (hosting + CDN + headers)
├── No backend / no database
├── All data lives in TypeScript files under src/lib/
└── Build output: /out directory
```

## Project Structure
```
src/
├── app/                      # Next.js App Router pages
│   ├── layout.tsx            # Root layout (fonts, meta, schema, analytics)
│   ├── page.tsx              # Homepage
│   ├── [category]/           # Product category pages
│   │   ├── page.tsx          # Category overview
│   │   └── [slug]/page.tsx   # Sub-product detail pages
│   ├── blog/                 # Blog listing + [slug] detail
│   ├── iletisim/             # Contact page
│   ├── teklif-al/            # Quote request form
│   └── ...                   # Other static pages
├── components/
│   ├── layout/               # Header, Footer, ClientUIComponents
│   ├── sections/             # Homepage & reusable content sections
│   ├── ui/                   # Reusable UI primitives (Button, Toast, etc.)
│   ├── cta/                  # (mostly cleaned — orphaned files removed)
│   ├── forms/                # (mostly cleaned — orphaned files removed)
│   └── providers/            # AnalyticsProvider
├── config/
│   └── business.config.ts    # Single source of truth for business info
├── data/
│   └── index.ts              # Re-exports from lib data files
├── lib/
│   ├── data.ts               # Central product database (6 products)
│   ├── motion-lite.tsx        # Lightweight framer-motion replacement (~2KB)
│   ├── pvcData.ts            # PVC sub-products (series)
│   ├── camBalkonData.ts      # Glass balcony systems
│   ├── sineklikData.ts       # Insect screen systems
│   ├── panjurData.ts         # Shutter/roller systems
│   ├── dusakabinData.ts      # Shower cabin systems
│   ├── aluminumData.ts       # Aluminum systems
│   ├── blogData.ts           # Blog posts
│   ├── faqData.ts            # FAQ entries
│   ├── projectsData.ts       # Project gallery data
│   ├── analytics.ts          # GA4 + Meta Pixel tracking helpers
│   ├── utils.ts              # Utility functions
│   └── accessibility.ts      # ARIA label helpers (currently unused)
└── types/
    └── index.ts              # TypeScript interfaces (Product, BlogPost, etc.)
```

## Key Patterns

### Data Architecture
- **No database** — all product data is hardcoded in TypeScript files
- **Central product registry:** `src/lib/data.ts` contains 6 `Product[]` entries
- **Category-specific data:** Each category has its own `xxxData.ts` with sub-products
- **Business config:** `src/config/business.config.ts` is the single source of truth for company name, address, phone, SEO keywords, service areas
- **Slugs = Routes:** Product slugs in `data.ts` exactly match the filesystem route (`pvc-sistemleri` → `src/app/pvc-sistemleri/`)

### URL Structure
```
/                                → Homepage
/pvc-sistemleri/                 → PVC products overview
/pvc-sistemleri/[slug]/          → PVC sub-product detail
/cam-balkon-sistemleri/          → Glass balcony overview
/cam-balkon-sistemleri/[slug]/   → Glass system detail
/sineklik-sistemleri/            → Insect screens
/panjur-kepenk-sistemleri/       → Shutters
/dusakabin-sistemleri/           → Shower cabins
/aluminyum-sistemleri/           → Aluminum systems
/blog/                           → Blog listing
/blog/[slug]/                    → Blog post
/urunler/                        → Products overview (has own product array)
/iletisim/                       → Contact page
/teklif-al/                      → Quote request
/hakkimizda/                     → About
/sss/                            → FAQ
/projeler/                       → Projects gallery
```

### Component Patterns
- **Client Components** are loaded with `dynamic()` and `ssr: false` via `ClientUIComponents.tsx`
- **motion-lite** (`src/lib/motion-lite.tsx`) used for homepage animations — lightweight CSS-transition replacement for framer-motion
- **Framer Motion** still used in non-homepage pages (15+ components)
- **Section Components** are self-contained: `HeroSection`, `ServicesSection`, `TestimonialsSection`, etc.
- **QuickContactBar** renders a floating mobile contact bar (phone + WhatsApp links) — loaded in layout.tsx via ClientUIComponents

### Emoji-Free UI Policy
All user-facing UI must use inline SVG icons instead of emoji characters. This ensures consistent rendering across browsers/OS, better accessibility, and professional appearance.

**SVG Icon Patterns (3 approaches used):**

1. **Inline SVG directly in JSX** — For one-off icons:
   ```tsx
   <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M..." />
   </svg>
   ```

2. **Icon Map with string IDs** — When data arrays need icons:
   ```tsx
   const iconMap: Record<string, JSX.Element> = {
     shield: <svg>...</svg>,
     lock: <svg>...</svg>,
   };
   // Data uses string IDs: { icon: 'shield', title: '...' }
   // Render: {iconMap[item.icon]}
   ```

3. **Dedicated Icon Components** — When multiple SVGs share a pattern:
   ```tsx
   function StepIcon({ step }: { step: string }) {
     switch (step) {
       case 'measure': return <svg>...</svg>;
       case 'produce': return <svg>...</svg>;
       // ...
     }
   }
   ```

**Applied in:** Homepage (Phase 4), Sineklik section (Phase 5). Remaining categories pending review.

### Animation Strategy (motion-lite)
- Homepage components import from `@/lib/motion-lite` instead of `framer-motion`
- motion-lite provides: `motion.{element}`, `AnimatePresence`, `useInView`, `useScroll`, `useTransform`
- Uses CSS transitions + IntersectionObserver instead of JS spring physics
- Trade-offs: no exit animations, no spring physics, no gesture support — acceptable for a content site
- If a component needs full framer-motion features, import from `framer-motion` directly (will add it to that page's bundle)

### SEO Patterns
- **Schema.org** `LocalBusiness` JSON-LD in root layout
- **XML Sitemap** auto-generated from all data files (`src/app/sitemap.ts`)
- **robots.ts** for crawler directives
- **Per-page metadata** with title template: `%s | Egepen Akçayapı`
- **Extensive keyword config** in `business.config.ts` (primary, product, service, local, question, LSI, trending keywords)

### Performance Patterns
- **Static export** (`output: "export"`) — no server runtime
- **Turbopack** for development builds
- **Image optimization:** WebP/AVIF formats, responsive srcsets, `unoptimized: true` for static export
- **Font optimization:** Single font (Outfit) via `next/font/google` (self-hosted), `display: swap`, fallback to system-ui
- **Lazy loading:** Images below fold use `loading="lazy"`
- **Code splitting:** Dynamic imports for below-fold homepage sections
- **motion-lite:** Homepage animations via 2KB CSS-transition library instead of 150KB framer-motion
- **Cloudflare headers:** Aggressive caching (1 year for static assets), LCP preload via Link header
- **LCP optimization:** Hero image preloaded in both `_headers` (Link header) and `layout.tsx` (`<link rel="preload">`)
- **Critical CSS:** Inlined in `<style>` tag in `<head>` for above-the-fold rendering

### Deployment Pattern
```bash
npm run build                    # → generates /out directory
npx wrangler pages deploy out \
  --project-name=akcapen-pvc \
  --branch=main \
  --commit-dirty=true            # → deploys to Cloudflare Pages
```
- Cloudflare project name: `akcapen-pvc`
- Production URL: https://akcapen-pvc.pages.dev
- Custom headers via `public/_headers`
- Redirects via `public/_redirects`
