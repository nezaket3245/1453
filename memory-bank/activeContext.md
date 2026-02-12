# Active Context — Egepen Akçayapı

## Current State (12 Şubat 2026)
The site is **live and deployed** on Cloudflare Pages at:
- **Production:** https://akcapen-pvc.pages.dev
- **Build:** 75/75 static pages, zero errors

## Recent Changes (12 Şubat 2026)

### Phase 6: Commercial Optimization & SEO/a11y Audit

#### Price Removal (Site-wide)
- All price displays removed across 15+ files
- Replaced with "Fiyat İçin Arayın" and "Detayları İncele" CTAs
- AnimatedPliseSineklik shrunk to max-w-sm

#### Campaign Banners
- **Sineklik page:** Small compact alert bars (rose-600) at 2 locations:
  - After hero: "KAMPANYA | Tüm renkli sineklik profilleri beyaz fiyatına! | Hemen Ara →"
  - Before colors section: "Renkli profiller beyaz fiyatına — Aşağıdaki renk seçeneklerinin hepsi aynı fiyat!"
- **6 other pages** (homepage, PVC, cam balkon, alüminyum, panjur, duşakabin): Small ad bar after hero linking to sineklik campaign

#### Stor Sineklik Stock Warning
- Red warning box above Stor section: "Stor sineklik şu an STOKTA BULUNMAMAKTADIR"

#### Email Address Hidden
- Removed from 6 locations: Header, Footer, İletişim page, CTASection, LocalShowroomSection, Gizlilik Politikası

#### QuickQuoteForm Hidden
- Sineklik page "Hızlı Fiyat Teklifi" section hidden

#### Confusing Technical Sections Removed (6 pages)
- Sineklik: MeshComparison, ComparisonTable
- Panjur: Motor Comparison, Somfy Ecosystem, Lamel Options
- Cam Balkon: ComparisonMatrix, GlassSafetyComparison, TechnicalFAQ
- Alüminyum: Thermal Break Tech, PVC vs Alu matrix
- PVC: ComparisonTable, SlidingComparisonTable

#### Sineklik Page Visual Cleanup
- Removed 5 entire sections: MeshVisibilitySlider, DecisionAssistant, MaintenanceGuide, SeasonalGuide, InstallationProcess
- Removed all blur blobs, dot patterns, gradient backgrounds, wave/curve dividers
- Simplified gradient text headings → plain bold text
- Reduced padding: py-20 lg:py-28 → py-16 lg:py-20

#### Hero Text & CTA Hidden
- All hero CTA buttons hidden across category pages
- All hero text hidden (sr-only) — images visible with min-height
- Image shadows/overlays removed
- Sticky nav removed

#### SEO & Performance Optimization (Sineklik Page)
- **Title** optimized to 60 chars with "Sineklik Sistemleri", "Plise", "Kedi Sinekliği"
- **Description** 155 chars with "pimapen sineklik" keyword added
- **Schema.org** enhanced: AggregateRating (4.9/5), Product ItemList schema added
- **H2 headings** now contain target keywords naturally
- **WCAG AA contrast** fixed: 19 text-gray-400/500 → text-gray-600/700 across 4 files
- **ARIA labels** added: tablist, tab roles, aria-selected, navigation landmarks, section labels
- **Hero image** → priority loading (LCP optimization)
- **Below-fold images** → loading="lazy" + sizes attribute
- **PetScreenHighlight** → OptimizedImage with lazy loading
- **Unused imports removed** (8 imports), CurveDivider function deleted
- **DOM reduced** — decorative circles removed (8 nodes)

## Active Decisions
- **Emoji-free UI policy**: All user-facing icons must be inline SVG
- **No prices shown**: All prices replaced with "Fiyat İçin Arayın"
- **Email hidden**: Not displayed anywhere on the site
- **Stor sineklik out of stock**: Warning displayed, product still shown
- **Campaign active**: Sineklik colored profiles at white price
- **motion-lite vs framer-motion split**: Homepage uses motion-lite; other pages use framer-motion
- **Single font (Outfit)**: System-ui fallback
- **Analytics disabled** — GA4 needs real measurement ID

## Next Steps
- [ ] Run Lighthouse audit on deployed URL
- [ ] Set up real Google Analytics (GA4 measurement ID needed)
- [ ] Add real webmaster verification codes
- [ ] Image audit — ensure all referenced images exist

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
