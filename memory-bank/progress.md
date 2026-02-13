# Progress — Egepen Akçayapı

## What Works ✅
- **Full site deployed** on Cloudflare Pages (project: `akcapen-yeni`, URL: `akcapen-yeni-84y.pages.dev`)
- **99+ static pages** generated successfully (6 categories + sub-products + blog + tamir-bakim + çözüm merkezi + tamirat-tadilat + static pages)
- **All 6 product categories** have overview pages and sub-product detail pages with `generateStaticParams`
- **Tamir-Bakım SEO Hub** — 9 "Nasıl Yapılır?" how-to guides, 14 FAQs, symptom finder, 6 service categories
- **Çözüm Merkezi (Solution Center)** — 13 articles, Fuse.js fuzzy search, FeedbackWidget, TechSpecsTable
- **TamiratTadilat Module** — `/pvc-sistemleri/tamirat-tadilat`: 12 PVC repair services, Fuse.js search, category filters, detail modal, validated form, 5-step status tracker
- **Blog** — 6 articles with proper slugs and SEO metadata
- **FAQ** — 20 questions in expandable accordion
- **Contact page** with embedded map (no form)
- **Quote form** (teklif-al) for lead generation
- **Projects gallery** showing completed installations
- **ImageLightbox** component integrated into all 6 category slug pages
- **Prices hidden** — All prices replaced with "Fiyat İçin Arayın" site-wide
- **Email hidden** — Email address removed from all display locations
- **Phone updated** — 0212 880 15 07 (old 0536 number removed from display)
- **Campaign banners** — Small rose-600 alert bars on sineklik + 6 other pages
- **Stor stock warning** — Red out-of-stock notice on sineklik page
- **SEO foundations:**
  - Schema.org Service + BreadcrumbList + FAQPage + Product ItemList + AggregateRating + HowTo + Article JSON-LD
  - XML sitemap covering all pages (including /cozumler/* and /tamir-bakim)
  - Proper meta tags with title templates (keyword-optimized)
  - robots.txt
  - Geo tags for local SEO
  - `X-Robots-Tag: index, follow` header
  - WCAG AA color contrast compliance
  - ARIA labels on all interactive elements
- **Performance optimizations:**
  - Static export with aggressive CDN caching
  - WebP image support via OptimizedImage component
  - **Single font (Outfit only)** — Inter removed to save ~50KB
  - Code splitting via dynamic imports
  - Critical CSS inlined
  - **motion-lite** replaces framer-motion on homepage (saves ~150KB JS)
  - LCP image preloaded (priority loading on hero images)
  - Below-fold images: loading="lazy" + sizes attribute
  - Unused imports/components cleaned for smaller bundle
  - Empty analytics script removed
  - Footer converted to server component
  - Duplicate ClientUI removed
- **Security headers:** CSP, HSTS, X-Frame-Options, XSS Protection
- **PWA manifest** and service worker (`sw.js`)
- **Accessibility:** Skip-to-content, focus-visible, ARIA structure, tablist/tab roles, navigation landmarks
- **Mobile contact bar** (QuickContactBar) with phone + WhatsApp
- **Emoji-free UI** — All pages migrated to inline SVG icons
- **Confusing technical sections removed** from 6 category pages
- **Hero text hidden** (sr-only) — images visible with min-height, no overlays

## What's Left to Build 🔲
- [ ] **Run Lighthouse audit** — Verify Performance 90+ and SEO 100 scores
- [ ] **Google Analytics setup** — GA4 needs real measurement ID
- [ ] **Webmaster verification** — Google, Yandex, Bing codes are placeholder/TODO
- [ ] **Image audit** — Verify all referenced images exist and are optimized
- [ ] **Real social media URLs** — Verify Facebook, Instagram, YouTube, LinkedIn links
- [ ] **Cookie consent** — Verify KVKK compliance
- [ ] **Content expansion** — More blog posts, project gallery entries
- [ ] **CI/CD** — Connect Cloudflare Pages to GitHub for auto-deploy (currently manual)

## Known Issues ⚠️
1. **`urunler/[slug]` route duplication** — `/urunler/` page has own hardcoded product array that could drift from `data.ts`
2. **Unused UI components** — Several in `src/components/ui/` may be unused: InteractiveCatalog, GoogleReviewsWidget, SearchModal, StickyQuoteCTA
3. **Analytics disabled** — GA4 script removed; needs real measurement ID
4. **No automated tests** — No test files or test framework
5. **No CI/CD** — Deployment is manual via `wrangler pages deploy out --project-name=akcapen-yeni`
6. **Old Cloudflare projects stale** — `akcapen-pvc` and `akcapen-pvc-2lv` are abandoned; only `akcapen-yeni` is active

## Evolution of Project Decisions

### Phase 1: Initial Build
- Built as comprehensive Next.js static site with hardcoded data
- Cloudflare Pages hosting (free tier, global CDN)
- Egepen Deceuninck brand guidelines

### Phase 2: Optimization (8 Şubat 2026)
- Security headers, font optimization, PWA, motion-lite, X-Robots-Tag

### Phase 3: Data Cleanup (7 Şubat 2026)
- Slug mismatches fixed, product database expanded, dead code removed

### Phase 4: Homepage Review (9-10 Şubat 2026)
- 4 redundant sections removed, emoji → SVG migration, garanti text removed
- Footer refactored, 301 redirects configured

### Phase 5: Sineklik Review (11 Şubat 2026)
- 70+ emojis → SVG, unused imports removed, TypeScript fixes
- Keyword stuffing reduced, contrast improved

### Phase 6: Commercial Optimization & SEO Audit (12 Şubat 2026)
- **Price removal site-wide** — All prices replaced with "Fiyat İçin Arayın"
- **Campaign banners** — Small alert bars on 7 pages for sineklik colored profile promotion
- **Email hidden** — Removed from Header, Footer, İletişim, CTA, LocalShowroom, Gizlilik Politikası
- **Stor stock warning** — Red out-of-stock box on sineklik page
- **QuickQuoteForm hidden** on sineklik page
- **Confusing technical sections removed** from 6 category pages
- **Visual cleanup** — 5 sections removed from sineklik, blur/dot/gradient decorations stripped
- **Hero simplification** — Text sr-only, CTAs hidden, overlays removed, sticky nav removed
- **SEO optimization** — Title/description/keywords optimized for target terms
- **Schema.org enhanced** — AggregateRating + Product ItemList added
- **WCAG AA compliance** — 19 color contrast fixes across 4 files
- **ARIA improvements** — tablist/tab roles, navigation landmarks, section labels
- **Performance** — Hero priority loading, lazy loading + sizes on below-fold images
- **DOM cleanup** — Decorative circles removed, unused imports/components deleted

### Phase 7: Performance & Content Enrichment (13 Şubat 2026)
- **9 performance fixes**: duplicate ClientUI removed, Footer server component, font fix, dead CSS/config cleanup, GA placeholder removed
- **Email removed** from all public pages
- **Warranty text removed** site-wide
- **Google Maps updated** with correct business coordinates
- **ImageLightbox component** created and integrated into all 6 slug pages
- **Phone updated** to 0212 880 15 07
- **Tamir-bakım enriched** from 3 categories to 6 service categories
- Committed: `d53989e`, `0415860`, `ed8b323`, `d830a11`

### Phase 8: Tamir-Bakım SEO Content Hub (13 Şubat 2026)
- Page completely recreated (~700 lines)
- **9 step-by-step how-to guides**: mekanizma, kilit, karşılık ayarı, WC kilidi, menteşe, pencere kolu, cam çıtası, cam söküm, conta değişimi
- **HowTo schema** for each guide
- **14 FAQs** with FAQPage schema
- **Symptom finder** — 12 arıza belirtisi → doğru rehbere yönlendirme
- **50+ long-tail keywords** for repair searches
- Committed: `e66061b`

### Phase 9: Çözüm Merkezi / Solution Center (13 Şubat 2026)
- **13 articles** in 5 categories (Sorun/Çözüm, Ürün Bilgisi, Bakım Rehberi, Karşılaştırma, Rehber)
- **Fuse.js** fuzzy search with Turkish character normalization
- **FeedbackWidget** — "Bu içerik işinize yaradı mı?" with localStorage
- **TechSpecsTable** — Product spec tables (Legend/Zendow)
- **Dynamic routing** `/cozumler/[slug]` with generateStaticParams
- **Schema.org** Article + Breadcrumb + HowTo
- **Header** updated with Çözüm Merkezi link in Bilgi dropdown
- **Sitemap** updated with all solution URLs
- Committed: `7f70932`

### Phase 10: Deployment Fix (13 Şubat 2026)
- **Root cause**: Cloudflare Pages `akcapen-yeni` project has Git: No (not connected to GitHub)
- `git push deploy main` pushes to GitHub but NO auto-deploy trigger
- **Fix**: Manual deploy via `npx wrangler pages deploy out --project-name=akcapen-yeni`
- 945 files uploaded, all new pages verified live
- Old projects (`akcapen-pvc`, `akcapen-pvc-2lv`) confirmed stale/abandoned

### Phase 11: TamiratTadilat Module (13 Şubat 2026)
- **New page**: `/pvc-sistemleri/tamirat-tadilat` — PVC repair & renovation service hub
- **Data layer**: `src/lib/tamiratData.ts` — 12 repair records, 6 categories, TypeScript interfaces, custom validation
- **4 UI components**: TamiratSearchGrid (Fuse.js search + filter), RepairDetailModal (accessible modal), RepairRequestForm (validated form), RepairStatusTracker (5-step timeline)
- **Page**: Server component with SEO metadata, Service+BreadcrumbList schema.org, dynamic imports
- **Integration**: Header nav link updated, sitemap expanded, PVC page CTA section added
- **Deploy**: 1059 files (build: 99 pages)
- Committed: `d589b14`

### Phase 12: WordPress Migration — 301 Redirects (14 Şubat 2026)
- **Old WP backup explored**: `C:\Benim Web Sitem\yedekk\egepenakcayapi.com\` — 21+ content directories, HTTrack mirror
- **313+ redirect rules** in `public/_redirects` (Cloudflare Pages format) — 9 sections covering all old URLs
- **Improved redirect targets**: Old blog posts remapped to Çözüm Merkezi for exact topic matches:
  - `/kapi-gicirdamasi-nasil-giderilir-cozuldu` → `/cozumler/kapi-gicirtisi-nasil-giderilir`
  - `/pvc-dograma-camlarda-olusan-terleme-nasil-onlenir-cozuldu` → `/cozumler/pencere-terleme-bugulanma-sorunu`
- **WP infrastructure catch-alls**: `/wp-content/*`, `/wp-admin/*`, `/wp-json/*`, `/feed`, date archives, author/category/tag pages
- **Google Maps embed fixed**: iletisim/page.tsx iframe uses real CID from `businessConfig.address.coordinates.cid`
- **Validated**: All redirect target pages exist in build output
- Committed: `38e8a6b`

### Future Considerations
- Connect Cloudflare Pages to GitHub for auto-deploy
- CMS integration (if content updates become frequent)
- Multi-language support
- A/B testing for landing pages
