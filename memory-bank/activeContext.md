# Active Context — Egepen Akçayapı

## Current State (14 Şubat 2026)
The site is **live and deployed** on Cloudflare Pages at:
- **Production:** https://egepenakcayap--com2.pages.dev (project: `egepenakcayap--com2`)
- **Custom domain:** https://egepenakcayapi.com (DNS on Cloudflare, SSL active)
- **Build:** 99 static pages generated, zero errors
- **Last deploy:** 14 Şubat 2026 via `npx wrangler pages deploy out --project-name egepenakcayap--com2 --commit-dirty=true`
- **GA4 Analytics:** ACTIVE — `G-MJTK34FD1Y`
- **Google Search Console:** Verified, sitemap.xml submitted (94 URLs)
- **IndexNow:** 18 URLs submitted to Bing/Yandex (200 OK)

## Recent Changes (14 Şubat 2026)

### Phase 13: Domain & DNS Migration
- **Domain:** egepenakcayapi.com migrated to Cloudflare DNS
- **Zone ID:** `c584fe27d80aaa8a9237ca2fb857cd9c`
- **Account ID:** `1fb4ac9a140c6e18cf7c8d3c5854aaa9`
- **DNS API Token:** `2AU43Q3CQIyxY_dBaOVKBpRr6JolJeqaxNQVKL_c` (DNS edit only, no analytics/cache purge)
- **Project changed:** `akcapen-yeni` → `egepenakcayap--com2` (new project with custom domain)
- **301 Redirects:** 295 lines in `public/_redirects` covering all WordPress legacy URLs (9 sections)
- **Homepage redirect bug fixed:** `/?p=*` query string rules removed from _redirects
- **DNS cache fix:** Old IP `185.216.114.15` flushed → Cloudflare IPs `172.67.222.56` / `104.21.43.71`

### Phase 14: Lighthouse & Mobile Performance Optimization
- **framer-motion ENTIRELY REMOVED** from package.json dependencies (saves ~150KB)
- **motion-lite** (~2KB custom) used across all files that previously imported framer-motion
- **Mobile performance fixes (8 files, 7 components):**
  - HeaderOptimized: `backdrop-blur-md` removed → solid `bg-white`, scoped transitions
  - Button.tsx: `"use client"` removed, motion elements → plain HTML with CSS hover
  - TestimonialsSection: 2x `blur-3xl` blobs + SVG pattern removed, 6x motion.div → CSS transitions
  - FAQAccordion: 4x motion elements → CSS `animate-fade-in-up`
  - CTASection: 2x `blur-3xl` + `backdrop-blur-md` removed
  - ServiceCards: `transition-all` → scoped to specific properties
  - ServicesSection: hover scale animation removed from product images
  - globals.css: Mobile `@media (hover: none)` query disables hover transforms + backdrop-filter

### Phase 15: SEO & Analytics Setup
- **Cache-buster cleanup:** Removed temporary redirect-fix script from layout.tsx
- **_headers cleanup:** Removed `Clear-Site-Data` and `no-store` temporary rules for blog page
- **Homepage caching:** Changed from `no-cache, no-store` to `public, max-age=0, must-revalidate`
- **GA4 Analytics ACTIVATED:** `G-MJTK34FD1Y`
  - gtag.js async script + inline config added to layout.tsx `<head>`
  - `src/lib/analytics.ts` updated with hardcoded measurement ID
  - CSP already includes `googletagmanager.com` and `google-analytics.com`
- **Google Search Console:** Site verified (was already verified from old WordPress era)
  - New `sitemap.xml` submitted (94 URLs covering all pages)
  - Old WordPress sitemaps still listed but will 404 naturally
- **IndexNow protocol:** Key file `b8e4f2a1c9d74e5f8a3b6c0d1e2f7a4b.txt` deployed to root
  - 18 critical URLs submitted to api.indexnow.org → 200 OK (Bing, Yandex, DuckDuckGo notified)
- **robots.txt verified live:** Sitemap reference present, Googlebot/Bingbot allowed, GPTBot/CCBot blocked
- **Live redirect verification:** 10/10 old WordPress URLs confirmed returning 301 to correct targets

## Active Decisions
- **Emoji-free UI policy**: All user-facing icons must be inline SVG
- **No prices shown**: All prices replaced with "Fiyat İçin Arayın"
- **Email hidden**: Not displayed anywhere on the site
- **Stor sineklik out of stock**: Warning displayed, product still shown
- **Campaign active**: Sineklik colored profiles at white price
- **framer-motion FULLY REMOVED** — motion-lite used everywhere (17 files migrated)
- **Fonts: Outfit + Inter** (both loaded via next/font/google with swap + preload)
- **GA4 ACTIVE** — `G-MJTK34FD1Y` (hardcoded in analytics.ts + layout.tsx)
- **Manual deploy**: `npx wrangler pages deploy out --project-name egepenakcayap--com2 --commit-dirty=true`
- **One-click deploy:** `SİTEYİ_YAYINLA.bat` runs build + deploy
- **Phone: 0212 880 15 07** — single phone number displayed

## Next Steps
- [ ] **Google Business Profile** — claim/update for local SEO map pack
- [ ] **Lighthouse audit** — run mobile Lighthouse to benchmark scores
- [ ] **Image audit** — verify all referenced images exist and are WebP optimized
- [ ] **Blog content expansion** — new articles targeting high-volume keywords (cam balkon fiyatları 2026, PVC pencere nasıl seçilir)
- [ ] **Backlink building** — local directories, business partner sites
- [ ] **Connect Cloudflare Pages to GitHub** for auto-deploy (currently manual)
- [ ] **Remove unused UI components** — InteractiveCatalog, GoogleReviewsWidget, SearchModal, StickyQuoteCTA

## Important Patterns & Preferences
- **Code and comments in English; explanations to user in Turkish**
- **No emojis in UI** — always use inline SVG icons
- **No prices displayed** — always "Fiyat İçin Arayın"
- **No email displayed** — hidden from all public pages
- All data updates require rebuild + redeploy (no CMS)
- Slugs in data files **must** match filesystem route directories exactly
- `business.config.ts` is the single source of truth for contact info
- All components use `@/lib/motion-lite` (framer-motion dependency is gone)
- Testimonial avatars use initials (e.g., "AK", "MA") not emoji faces
- **Memory bank must be updated** after every operation (user request)
- **One-click deploy:** `SİTEYİ_YAYINLA.bat` builds and deploys in one step
