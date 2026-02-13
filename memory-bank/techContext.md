# Tech Context — Egepen Akçayapı

## Core Stack
| Technology | Version | Purpose |
|---|---|---|
| Next.js | 16.1.6 | Framework (App Router, static export) |
| React | 19.2.3 | UI library |
| TypeScript | ^5 | Type safety |
| Tailwind CSS | ^4 | Utility-first styling |
| Framer Motion | ^12.29.2 | Animations (non-homepage pages only) |
| **motion-lite** | custom | Lightweight CSS-transition animations (homepage, ~2KB) |
| **Fuse.js** | ^7 | Client-side fuzzy search (Çözüm Merkezi) |
| Sharp | ^0.34.5 | Image processing (build-time) |
| clsx | ^2.1.1 | Conditional classnames |

## Dev Dependencies
| Tool | Purpose |
|---|---|
| ESLint + eslint-config-next | Linting |
| @tailwindcss/postcss | PostCSS integration for Tailwind v4 |
| Turbopack | Fast dev/build (built into Next.js 16) |

## Hosting & Deployment
- **Platform:** Cloudflare Pages
- **Project name:** `akcapen-yeni` (NOT `akcapen-pvc` — that project is stale)
- **Deploy tool:** Wrangler (`npx wrangler pages deploy out --project-name=akcapen-yeni`)
- **Build output:** `/out` directory (static HTML/CSS/JS)
- **Production URL:** https://akcapen-yeni-84y.pages.dev
- **Custom domain:** https://egepenakcayapi.com (CNAME → akcapen-yeni.pages.dev)
- **Git integration:** None (Git: No) — Cloudflare does NOT auto-deploy from GitHub
- **GitHub repos:**
  - `deploy` → https://github.com/nezaket3245/1453.git (code backup, push works)
  - `origin` → https://github.com/bagkurluibo-dotcom/akcapen-yeni.git (permission denied)
- **Security headers:** Defined in `public/_headers` (CSP, HSTS, X-Frame-Options, etc.)
- **Redirects:** Defined in `public/_redirects`

## Development Setup
```bash
# Install dependencies
npm install

# Dev server (Turbopack)
npm run dev

# Production build
npm run build

# Deploy to Cloudflare Pages (MANUAL — no auto-deploy)
npx wrangler pages deploy out --project-name=akcapen-yeni
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
| `public/_redirects` | Cloudflare URL redirects |

## Technical Constraints
1. **Static export only** — No server-side API routes, no `getServerSideProps`, no middleware
2. **No database** — All data in TypeScript files; changes require rebuild + redeploy
3. **Image optimization disabled** at runtime (`unoptimized: true`) — images must be pre-optimized
4. **Google Analytics disabled** — GA4 code in layout.tsx is commented out; needs real measurement ID
5. **Verification codes TODO** — Google, Yandex, Bing webmaster verification codes are placeholder
6. **No CMS** — Content changes require code edits
7. **No CI/CD** — Cloudflare Pages is not connected to GitHub; must deploy manually via wrangler

## Build Characteristics
- ~88+ static pages generated
- Build time: ~12 seconds with Turbopack
- Output size: ~945 files
- Uses `trailingSlash: true` (all URLs end with `/`)
- Homepage JS payload: ~674KB (down from ~850KB after framer-motion removal)
- framer-motion chunk (~111KB) excluded from homepage, only loaded on sub-pages that still use it
- Fuse.js chunk loaded only on /cozumler page (client component)

## Font Strategy
- **Outfit** — Primary font (headings + body text)
- **Inter** — REMOVED (8 Şubat 2026) to save ~50KB; was only used as fallback
- Single font loaded via `next/font/google` (self-hosted, not external Google Fonts)
- Fallback: `system-ui, arial`

## Cloudflare Account Info
- **Account ID:** `2f8a9910120689f4f86f06fb6637f9b2`
- **Active project:** `akcapen-yeni` → `akcapen-yeni-84y.pages.dev`
- **Stale projects:** `akcapen-pvc` (pages.dev), `akcapen-pvc-2lv` (pages.dev) — old/abandoned
- **OAuth token:** Read from `%APPDATA%/xdg.config/.wrangler/config/default.toml`
