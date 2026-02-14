# Tech Context — Egepen Akçayapı

## Core Stack
| Technology | Version | Purpose |
|---|---|---|
| Next.js | 16.1.6 | Framework (App Router, static export) |
| React | 19.2.3 | UI library |
| TypeScript | ^5 | Type safety |
| Tailwind CSS | ^4 | Utility-first styling |
| **motion-lite** | custom (~2KB) | Lightweight CSS-transition animations (all pages) |
| **Fuse.js** | ^7 | Client-side fuzzy search (Çözüm Merkezi, TamiratTadilat) |
| clsx | ^2.1.1 | Conditional classnames |

**NOTE:** framer-motion was FULLY REMOVED from dependencies on 14 Şubat 2026. All animation uses motion-lite.

## Dev Dependencies
| Tool | Purpose |
|---|---|
| ESLint + eslint-config-next | Linting |
| @tailwindcss/postcss | PostCSS integration for Tailwind v4 |
| Turbopack | Fast dev/build (built into Next.js 16) |

## Hosting & Deployment
- **Platform:** Cloudflare Pages
- **Project name:** `egepenakcayap--com2`
- **Deploy command:** `npx wrangler pages deploy out --project-name egepenakcayap--com2 --commit-dirty=true`
- **One-click deploy:** `SİTEYİ_YAYINLA.bat` (build + deploy)
- **Build output:** `/out` directory (static HTML/CSS/JS)
- **Production URL:** https://egepenakcayap--com2.pages.dev
- **Custom domain:** https://egepenakcayapi.com
- **Cloudflare Zone ID:** `c584fe27d80aaa8a9237ca2fb857cd9c`
- **Account ID:** `1fb4ac9a140c6e18cf7c8d3c5854aaa9`
- **DNS API Token:** `2AU43Q3CQIyxY_dBaOVKBpRr6JolJeqaxNQVKL_c` (DNS edit only)
- **Git integration:** None (Git: No) — Cloudflare does NOT auto-deploy from GitHub
- **Security headers:** Defined in `public/_headers` (CSP, HSTS, X-Frame-Options, etc.)
- **Redirects:** 295 lines in `public/_redirects` (WordPress migration, 9 sections)

## Analytics & SEO
- **GA4:** `G-MJTK34FD1Y` — gtag.js in layout.tsx `<head>`, analytics.ts utility
- **Google Search Console:** Verified, sitemap.xml submitted (94 URLs)
- **IndexNow:** Key `b8e4f2a1c9d74e5f8a3b6c0d1e2f7a4b` deployed, 18 URLs submitted
- **robots.txt:** Googlebot/Bingbot allowed, GPTBot/CCBot blocked, sitemap referenced

## Development Setup
```bash
# Install dependencies
npm install

# Dev server (Turbopack)
npm run dev

# Production build
npm run build

# Deploy to Cloudflare Pages (MANUAL — no auto-deploy)
npx wrangler pages deploy out --project-name egepenakcayap--com2 --commit-dirty=true

# Or use the BAT file
SİTEYİ_YAYINLA.bat
```

There is also a `SİTEYİ_BAŞLAT.bat` file for local dev startup on Windows.

## Key Configuration Files
| File | Purpose |
|---|---|
| `next.config.ts` | Static export, Turbopack, image config, experimental features |
| `tsconfig.json` | TypeScript paths (`@/` alias for `src/`) |
| `postcss.config.mjs` | PostCSS with Tailwind CSS plugin |
| `eslint.config.mjs` | ESLint configuration |
| `public/manifest.json` | PWA manifest |
| `public/_headers` | Cloudflare security & caching headers |
| `public/_redirects` | 295 lines — Cloudflare URL redirects (WordPress migration) |
| `src/config/business.config.ts` | Single source of truth for business info |
| `src/lib/motion-lite.tsx` | Custom lightweight animation library (~2KB) |
| `src/lib/analytics.ts` | GA4 + Meta Pixel analytics utility |

## Technical Constraints
1. **Static export only** — No server-side API routes, no `getServerSideProps`, no middleware
2. **No database** — All data in TypeScript files; changes require rebuild + redeploy
3. **Image optimization disabled** at runtime (`unoptimized: true`) — images must be pre-optimized
4. **No CMS** — Content changes require code edits
5. **No CI/CD** — Cloudflare Pages is not connected to GitHub; must deploy manually via wrangler

## Build Characteristics
- 99 static pages generated
- Build time: ~3-6 seconds with Turbopack
- Output size: ~839 files
- Uses `trailingSlash: true` (all URLs end with `/`)
- framer-motion completely removed — zero runtime animation library cost
- motion-lite (~2KB) provides IntersectionObserver-based animations
- Fuse.js chunk loaded only on /cozumler and /pvc-sistemleri/tamirat-tadilat pages

## Font Strategy
- **Outfit** — Primary font (headings + body text)
- **Inter** — Secondary font (body text fallback)
- Both loaded via `next/font/google` with `display: "swap"`, `preload: true`
- Fallback: `system-ui, arial`

## Cloudflare Account Info
- **Account ID:** `1fb4ac9a140c6e18cf7c8d3c5854aaa9`
- **Zone ID:** `c584fe27d80aaa8a9237ca2fb857cd9c`
- **Active project:** `egepenakcayap--com2` → `egepenakcayap--com2.pages.dev`
- **Custom domain:** `egepenakcayapi.com` (CNAME to Cloudflare Pages)
- **Stale projects:** `akcapen-pvc`, `akcapen-pvc-2lv`, `akcapen-yeni` — old/abandoned
- **OAuth:** Wrangler logged in as `ibrahim52zorba@gmail.com`
