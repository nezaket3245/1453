# Active Context — Egepen Akçayapı

## Current State (13 Şubat 2026)
The site is **live and deployed** on Cloudflare Pages at:
- **Production:** https://akcapen-yeni-84y.pages.dev (project: `akcapen-yeni`)
- **Custom domain:** https://egepenakcayapi.com
- **Build:** 88+ static pages generated, zero errors
- **Last deploy:** 13 Şubat 2026 via `npx wrangler pages deploy out --project-name=akcapen-yeni`

## Recent Changes (13 Şubat 2026)

### Phase 7: Performance & Content Enrichment
- **Performance optimization pass** — 9 fixes: duplicate ClientUI removed, Footer→server component, font fix, dead CSS/config cleanup, GA placeholder removed
- **Email removed** from all public-facing pages
- **Warranty text removed** site-wide
- **Google Maps location updated** to correct business coordinates
- **ImageLightbox component** created and integrated into all 6 category slug pages
- **Phone number updated** to 0212 880 15 07 (old 0536 640 53 11 removed from display)
- **Tamir-bakim page** enriched from 3→6 service categories

### Phase 8: Tamir-Bakım SEO Content Hub
- Page **deleted and recreated** with comprehensive content (~700 lines)
- **9 "Nasıl Yapılır?" guides**: mekanizma, kilit, karşılık ayarı, WC kilidi, menteşe, pencere kolu, cam çıtası, cam söküm, conta değişimi
- **HowTo schema markup** for all 9 guides
- **14 FAQs** with FAQPage schema
- **50+ long-tail keywords** targeting repair searches
- **Symptom finder** with 12 arıza doğrudan yönlendirme (click → relevant guide)
- **6 service categories**: PVC pencere, sineklik, cam balkon, alüminyum, panjur, duşakabin
- Committed: `e66061b`

### Phase 9: Çözüm Merkezi (Solution Center)
- **13 SEO articles** across 5 categories:
  - Sorun/Çözüm (3): pencere terleme, sürme sistemleri, kapı gıcırtısı
  - Ürün Bilgisi (2): Egepen Legend, Egepen Zendow (with TechSpecs tables)
  - Bakım Rehberi (3): PVC-Alüminyum karşılaştırma, pencere contası, cam balkon bakımı
  - Karşılaştırma (1): PVC vs Alüminyum
  - Rehber (4): ısı yalıtımı, ses yalıtımı, panjur motor arızası, sineklik seçimi, bakım takvimi
- **Fuse.js fuzzy search** with Turkish character normalization (ı→i, ö→o, ş→s, ğ→g, ç→c, ü→u)
- **FeedbackWidget** — "Bu içerik işinize yaradı mı?" with localStorage
- **TechSpecsTable** — Product spec tables for Legend/Zendow articles
- **Dynamic routing** `/cozumler/[slug]` with generateStaticParams
- **Schema.org**: Article + Breadcrumb + HowTo (where applicable)
- **Header updated**: "Çözüm Merkezi" added to Bilgi dropdown
- **Sitemap updated**: /cozumler + 13 solution slugs added
- Committed: `7f70932`

### Phase 10: Deployment Fix
- **Root cause found**: Cloudflare Pages project `akcapen-yeni` has Git: No — NOT connected to GitHub repo
- `git push deploy main` pushes code to `nezaket3245/1453` but NO auto-deploy trigger
- **Fix**: Manual deploy via `npx wrangler pages deploy out --project-name=akcapen-yeni`
- 945 files uploaded, all new pages verified live
- Old projects (`akcapen-pvc`, `akcapen-pvc-2lv`) are stale/abandoned

## Active Decisions
- **Emoji-free UI policy**: All user-facing icons must be inline SVG
- **No prices shown**: All prices replaced with "Fiyat İçin Arayın"
- **Email hidden**: Not displayed anywhere on the site
- **Stor sineklik out of stock**: Warning displayed, product still shown
- **Campaign active**: Sineklik colored profiles at white price
- **motion-lite vs framer-motion split**: Homepage uses motion-lite; other pages use framer-motion
- **Single font (Outfit)**: System-ui fallback
- **Analytics disabled** — GA4 needs real measurement ID
- **Manual deploy required**: No CI/CD — must run `npx wrangler pages deploy out --project-name=akcapen-yeni` after every build
- **Phone: 0212 880 15 07** — single phone number displayed (old mobile removed)

## Next Steps
- [ ] Run Lighthouse audit on deployed URL
- [ ] Set up real Google Analytics (GA4 measurement ID needed)
- [ ] Add real webmaster verification codes
- [ ] Image audit — ensure all referenced images exist
- [ ] Consider connecting Cloudflare Pages to GitHub for auto-deploy

## Important Patterns & Preferences
- **Code and comments in English; explanations to user in Turkish**
- **No emojis in UI** — always use inline SVG icons
- **No prices displayed** — always "Fiyat İçin Arayın"
- **No email displayed** — hidden from all public pages
- All data updates require rebuild + redeploy (no CMS)
- Slugs in data files **must** match filesystem route directories exactly
- `business.config.ts` is the single source of truth for contact info
- Homepage components use `@/lib/motion-lite` instead of `framer-motion`
- Testimonial avatars use initials (e.g., "AK", "MA") not emoji faces
- **Memory bank must be updated** after every operation (user request)
