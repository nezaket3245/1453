# Progress — Egepen Akçayapı

## What Works ✅
- **Full site deployed** on Cloudflare Pages (project: `egepenakcayap--com2`, domain: `egepenakcayapi.com`)
- **99 static pages** generated successfully (6 categories + sub-products + blog + tamir-bakim + çözüm merkezi + tamirat-tadilat + static pages)
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
  - XML sitemap covering 94 URLs (including /cozumler/* and /tamir-bakim)
  - sitemap.xml submitted to Google Search Console
  - robots.txt with sitemap reference, AI bots blocked
  - IndexNow: 18 URLs submitted to Bing/Yandex
  - Proper meta tags with title templates (keyword-optimized)
  - Geo tags for local SEO
  - WCAG AA color contrast compliance
  - ARIA labels on all interactive elements
- **301 Redirects (WordPress migration):**
  - 295 lines in `public/_redirects` covering 9 categories
  - All old WordPress URLs (blog posts, categories, WP infrastructure, color pages, date archives, author pages)
  - Old intermediate site routes (/products/*, /about, /contact)
  - Common typos and search term redirects
  - 10/10 tested and verified working on live site
- **GA4 Analytics ACTIVE:** `G-MJTK34FD1Y`
  - gtag.js script in layout.tsx head
  - analytics.ts utility with pageview + event tracking
- **Performance optimizations:**
  - Static export with aggressive CDN caching
  - WebP image support via OptimizedImage component
  - **framer-motion FULLY REMOVED** (saves ~150KB JS)
  - **motion-lite** (~2KB) replaces framer-motion across all 17 files
  - **Mobile performance:** backdrop-blur removed, blur-3xl decorations removed, transitions scoped
  - **Mobile media query:** Disables hover transforms + backdrop-filter on touch devices
  - Code splitting via dynamic imports
  - Critical CSS inlined
  - LCP image preloaded (priority loading on hero images)
  - Below-fold images: loading="lazy" + sizes attribute
  - Button.tsx converted to Server Component (no "use client")
- **Security headers:** CSP (includes GA domains), HSTS, X-Frame-Options, XSS Protection
- **PWA manifest** and service worker (`sw.js` v4)
- **Accessibility:** Skip-to-content, focus-visible, ARIA structure, tablist/tab roles, navigation landmarks
- **Mobile contact bar** (QuickContactBar) with phone + WhatsApp
- **Emoji-free UI** — All pages migrated to inline SVG icons
- **One-click deploy:** `SİTEYİ_YAYINLA.bat` builds and deploys in one step

## What's Left to Build 🔲
- [ ] **Google Business Profile** — claim/update for local SEO ("Beylikdüzü PVC" map pack)
- [ ] **Lighthouse audit** — run mobile Lighthouse to benchmark scores
- [ ] **Image audit** — verify all referenced images exist and are optimized
- [ ] **Blog expansion** — new articles for high-volume keywords
- [ ] **Backlink building** — local directories, partner sites
- [ ] **CI/CD** — Connect Cloudflare Pages to GitHub for auto-deploy (currently manual)
- [ ] **Remove unused UI components** — InteractiveCatalog, GoogleReviewsWidget, SearchModal, StickyQuoteCTA
- [ ] **Cookie consent** — Verify KVKK compliance
- [ ] **Real social media URLs** — Verify Facebook, Instagram, YouTube, LinkedIn links

## Known Issues ⚠️
1. **`urunler/[slug]` route duplication** — `/urunler/` page has own hardcoded product array that could drift from `data.ts`
2. **Unused UI components** — Several in `src/components/ui/` may be unused
3. **No automated tests** — No test files or test framework
4. **No CI/CD** — Deployment is manual via wrangler
5. **Old Cloudflare projects stale** — `akcapen-pvc`, `akcapen-pvc-2lv`, `akcapen-yeni` are abandoned; only `egepenakcayap--com2` is active
6. **Old WordPress sitemaps** in Search Console — will 404 naturally, can be ignored

## Evolution of Project Decisions

### Phase 1-6: Initial Build → Commercial Optimization (Pre-14 Şubat)
- Built as comprehensive Next.js static site with hardcoded data
- Cloudflare Pages hosting, Egepen Deceuninck brand
- Security headers, font optimization, PWA, motion-lite
- Slug fixes, product database expansion, dead code removal
- Homepage sections reduced, emoji → SVG migration
- Price removal, email hiding, campaign banners
- WCAG AA compliance, ARIA improvements
- Hero simplification, SEO title/keyword optimization

### Phase 7-11: Content & Features (13 Şubat 2026)
- Performance: duplicate ClientUI removed, Footer→server component
- ImageLightbox integrated everywhere, phone updated
- Tamir-Bakım SEO Hub: 9 how-to guides, 14 FAQs, symptom finder
- Çözüm Merkezi: 13 articles, Fuse.js search, FeedbackWidget, TechSpecsTable
- Deployment fix: Manual wrangler deploy (no Git auto-deploy)
- TamiratTadilat Module: 12 repair services, search, modal, form, status tracker

### Phase 12: WordPress Migration — 301 Redirects (14 Şubat 2026)
- 295+ redirect rules in `public/_redirects`
- Old WP backup explored, all content paths mapped
- Blog posts remapped to Çözüm Merkezi where topics match
- WP infrastructure catch-alls (/wp-content/*, /wp-admin/*, /feed, etc.)

### Phase 13: Domain & DNS Migration (14 Şubat 2026)
- Domain moved to Cloudflare DNS, Zone ID obtained
- New project `egepenakcayap--com2` created with custom domain
- DNS cache issues resolved (old IP flushed)
- Homepage redirect bug fixed (query string rules removed)

### Phase 14: Mobile Performance Optimization (14 Şubat 2026)
- framer-motion entirely removed from dependencies
- 8 files optimized: blur effects removed, transitions scoped, motion→CSS
- Button.tsx converted to Server Component
- Mobile media query added for touch device optimization

### Phase 15: SEO & Analytics Setup (14 Şubat 2026)
- GA4 `G-MJTK34FD1Y` activated in layout.tsx + analytics.ts
- Google Search Console: sitemap.xml submitted (94 URLs)
- IndexNow: 18 URLs submitted to Bing/Yandex (200 OK)
- Cache-buster cleanup: temporary scripts removed
- _headers cleanup: temporary cache rules removed

### Future Considerations
- Google Business Profile for local SEO
- CI/CD via GitHub → Cloudflare Pages
- Blog content expansion for organic traffic
- Backlink building campaign
- A/B testing for landing pages
