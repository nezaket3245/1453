"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import OptimizedImage from "@/components/ui/OptimizedImage";
import { Button } from "@/components/ui/Button";
import { analytics } from "@/lib/analytics";
import Link from "next/link";

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * DYNAMIC HERO SLIDER - EGEPEN BRAND FOCUSED
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * High-converting hero section with:
 * - Auto-rotating slides featuring Egepen systems
 * - Corporate Navy Blue / White / Silver color palette
 * - Strong CTA buttons with analytics tracking
 * - Responsive design with mobile optimization
 * - Animated text and image transitions
 */

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  image: string;
  mobileImage?: string;
  badge?: string;
  features?: string[];
}

// Hero slides data - Egepen focused content
const heroSlides: HeroSlide[] = [
  {
    id: "egepen-main",
    title: "Egepen Deceuninck",
    subtitle: "Beylikdüzü Yetkili Bayisi",
    description: "40 yılı aşkın tecrübemizle Avrupa'nın lider PVC pencere markası Egepen'i evlerinize taşıyoruz. Üstün ısı yalıtımı, dayanıklılık ve 10 yıl garanti.",
    ctaText: "Ücretsiz Keşif Al",
    ctaLink: "/teklif-al",
    secondaryCtaText: "Ürünleri İncele",
    secondaryCtaLink: "/pvc-sistemleri",
    image: "/images/hero/egepen-hero-main.jpg",
    mobileImage: "/images/hero/egepen-hero-main-mobile.jpg",
    badge: "Yetkili Bayi",
    features: ["10 Yıl Garanti", "Ücretsiz Keşif", "Profesyonel Montaj"],
  },
  {
    id: "cam-balkon",
    title: "Isıcamlı Cam Balkon",
    subtitle: "4 Mevsim Konfor",
    description: "Balkonunuzu 12 ay boyunca kullanılabilir bir yaşam alanına dönüştürün. Albert Genau ve Ponzio sistemleriyle maksimum görüş açısı ve yalıtım.",
    ctaText: "Fiyat Teklifi Al",
    ctaLink: "/teklif-al",
    secondaryCtaText: "Sistemleri Gör",
    secondaryCtaLink: "/cam-balkon-sistemleri",
    image: "/images/hero/cam-balkon-hero.jpg",
    badge: "Premium Sistemler",
    features: ["Isıcamlı Seçenekler", "Sürme & Katlanır", "Rüzgar Kesici"],
  },
  {
    id: "panjur-kepenk",
    title: "Motorlu Panjur",
    subtitle: "Akıllı Güvenlik Çözümleri",
    description: "Uzaktan kumandalı motorlu panjur sistemleriyle güvenlik ve rahatlığı bir arada yaşayın. Enerji tasarrufu ve modern görünüm.",
    ctaText: "Teklif Al",
    ctaLink: "/teklif-al",
    secondaryCtaText: "Detaylı Bilgi",
    secondaryCtaLink: "/panjur-kepenk-sistemleri",
    image: "/images/hero/panjur-hero.jpg",
    badge: "Motorlu Sistemler",
    features: ["Uzaktan Kumanda", "Akıllı Ev Entegrasyonu", "%30 Enerji Tasarrufu"],
  },
];

interface EgepenHeroSliderProps {
  autoPlayInterval?: number;
  onQuoteClick?: () => void;
}

export function EgepenHeroSlider({
  autoPlayInterval = 6000,
  onQuoteClick,
}: EgepenHeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [autoPlayInterval, isAutoPlaying]);

  // Pause autoplay on hover
  const handleMouseEnter = useCallback(() => setIsAutoPlaying(false), []);
  const handleMouseLeave = useCallback(() => setIsAutoPlaying(true), []);

  // Navigate to specific slide
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    analytics.trackEvent("hero_slide_change", {
      slide_id: heroSlides[index].id,
      slide_index: index,
    });
  };

  // Handle CTA click
  const handleCtaClick = (slideId: string, ctaType: "primary" | "secondary") => {
    analytics.trackEvent("hero_cta_click", {
      slide_id: slideId,
      cta_type: ctaType,
    });
    
    if (ctaType === "primary" && onQuoteClick) {
      onQuoteClick();
    }
  };

  const slide = heroSlides[currentSlide];

  return (
    <section
      className="relative w-full min-h-[85vh] md:min-h-[90vh] bg-navy-900 overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Image with Overlay */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <OptimizedImage
            src={slide.image}
            alt={slide.title}
            fill
            priority
            className="object-cover"
          />
          {/* Gradient Overlay - Navy Blue corporate look */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/95 via-[#0a1628]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/80 via-transparent to-[#0a1628]/30" />
        </motion.div>
      </AnimatePresence>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center min-h-[85vh] md:min-h-[90vh]">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full py-20 lg:py-0">
          {/* Text Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${slide.id}`}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-xl"
            >
              {/* Badge */}
              {slide.badge && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600/20 border border-primary-400/30 rounded-full mb-6"
                >
                  <span className="w-2 h-2 bg-primary-400 rounded-full animate-pulse" />
                  <span className="text-sm font-semibold text-primary-300 uppercase tracking-wider">
                    {slide.badge}
                  </span>
                </motion.div>
              )}

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
                <span className="block">{slide.title}</span>
                <span className="block text-primary-400">{slide.subtitle}</span>
              </h1>

              {/* Description */}
              <p className="text-lg sm:text-xl text-neutral-300 mb-8 leading-relaxed">
                {slide.description}
              </p>

              {/* Feature Pills */}
              {slide.features && (
                <div className="flex flex-wrap gap-3 mb-8">
                  {slide.features.map((feature, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white border border-white/10"
                    >
                      <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </span>
                  ))}
                </div>
              )}

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={slide.ctaLink}
                  onClick={() => handleCtaClick(slide.id, "primary")}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-primary-600/30 hover:shadow-xl hover:shadow-primary-600/40 hover:-translate-y-0.5"
                >
                  {slide.ctaText}
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>

                {slide.secondaryCtaText && (
                  <Link
                    href={slide.secondaryCtaLink!}
                    onClick={() => handleCtaClick(slide.id, "secondary")}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all duration-300 border border-white/20 backdrop-blur-sm"
                  >
                    {slide.secondaryCtaText}
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Trust Indicators (Right Side on Desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="hidden lg:flex flex-col items-end gap-6"
          >
            {/* Statistics Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 text-center">
                <div className="text-4xl font-black text-white mb-1">40+</div>
                <div className="text-sm text-neutral-400">Yıllık Tecrübe</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 text-center">
                <div className="text-4xl font-black text-primary-400 mb-1">5.000+</div>
                <div className="text-sm text-neutral-400">Mutlu Müşteri</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 text-center">
                <div className="text-4xl font-black text-white mb-1">10</div>
                <div className="text-sm text-neutral-400">Yıl Garanti</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 text-center">
                <div className="text-4xl font-black text-green-400 mb-1">4.8</div>
                <div className="text-sm text-neutral-400">Google Puanı</div>
              </div>
            </div>

            {/* Egepen Badge */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 flex items-center gap-4">
              <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center">
                <OptimizedImage
                  src="/images/egepen-logo.png"
                  alt="Egepen Deceuninck"
                  width={50}
                  height={50}
                  className="object-contain"
                />
              </div>
              <div>
                <p className="font-bold text-white">Egepen Deceuninck</p>
                <p className="text-sm text-neutral-400">Yetkili Satış Noktası</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Slide Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`
              transition-all duration-300 rounded-full
              ${currentSlide === index 
                ? "w-10 h-3 bg-primary-500" 
                : "w-3 h-3 bg-white/30 hover:bg-white/50"
              }
            `}
            aria-label={`Slide ${index + 1}'e git`}
          />
        ))}
      </div>

      {/* Slide Navigation Arrows */}
      <div className="absolute bottom-1/2 translate-y-1/2 left-4 right-4 z-20 flex justify-between pointer-events-none">
        <button
          onClick={() => goToSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length)}
          className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors pointer-events-auto hidden md:flex"
          aria-label="Önceki slide"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => goToSlide((currentSlide + 1) % heroSlides.length)}
          className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors pointer-events-auto hidden md:flex"
          aria-label="Sonraki slide"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Bottom Wave Decoration */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="currentColor"
            className="text-neutral-50"
          />
        </svg>
      </div>
    </section>
  );
}

export default EgepenHeroSlider;
