"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { analytics } from "@/lib/analytics";
import { businessConfig } from "@/config/business.config";
import { MultiStepLeadForm } from "@/components/forms/MultiStepLeadForm";

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * FLOATING WHATSAPP CTA BUTTON
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Persistent floating action button for WhatsApp contact.
 * Features:
 * - Pulse animation to draw attention
 * - Pre-filled message for Egepen inquiry
 * - Expands on hover to show text
 * - Optional tooltip with custom message
 * - Integration with analytics tracking
 */

interface FloatingWhatsAppCTAProps {
  /** Custom pre-filled message */
  message?: string;
  /** Position on screen */
  position?: "bottom-right" | "bottom-left";
  /** Show the lead form modal instead of direct WhatsApp link */
  showFormFirst?: boolean;
}

export function FloatingWhatsAppCTA({
  message = "Merhaba, Egepen sistemleri hakkında bilgi almak istiyorum.",
  position = "bottom-right",
  showFormFirst = false,
}: FloatingWhatsAppCTAProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [showLeadForm, setShowLeadForm] = useState(false);

  // Auto-hide tooltip after 5 seconds
  useState(() => {
    const timer = setTimeout(() => setShowTooltip(false), 5000);
    return () => clearTimeout(timer);
  });

  const handleClick = () => {
    if (showFormFirst) {
      setShowLeadForm(true);
      analytics.trackEvent("cta_click", {
        cta_name: "floating_whatsapp",
        action: "open_form",
      });
    } else {
      openWhatsApp();
    }
  };

  const openWhatsApp = () => {
    const whatsappUrl = `https://wa.me/${businessConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");

    // Track click
    analytics.trackWhatsAppClick("floating_cta");
    analytics.trackEvent("cta_click", {
      cta_name: "floating_whatsapp",
      action: "open_whatsapp",
    });
  };

  const positionClasses = position === "bottom-right"
    ? "right-4 sm:right-6"
    : "left-4 sm:left-6";

  return (
    <>
      {/* Floating Button Container */}
      <div className={`fixed bottom-20 sm:bottom-6 ${positionClasses} z-50`}>
        {/* Tooltip */}
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            className={`absolute bottom-full mb-3 ${position === "bottom-right" ? "right-0" : "left-0"} whitespace-nowrap`}
          >
            <div className="relative bg-white px-4 py-2 rounded-xl shadow-lg border border-neutral-100">
              <p className="text-sm font-medium text-neutral-800">
                💬 Hemen WhatsApp'tan yazın!
              </p>
              {/* Arrow */}
              <div className={`absolute top-full ${position === "bottom-right" ? "right-6" : "left-6"} w-3 h-3 bg-white border-r border-b border-neutral-100 transform rotate-45 -translate-y-1.5`} />
            </div>
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute -top-1 -right-1 w-5 h-5 bg-neutral-200 rounded-full flex items-center justify-center text-neutral-600 hover:bg-neutral-300 transition-colors"
              aria-label="Mesajı kapat"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}

        {/* Main Button */}
        <motion.button
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative flex items-center gap-3 bg-[#25D366] text-white rounded-full shadow-lg shadow-[#25D366]/30 overflow-hidden group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="WhatsApp ile iletişime geçin"
        >
          {/* Pulse Animation */}
          <motion.div
            className="absolute inset-0 bg-[#25D366] rounded-full"
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{
              scale: [1, 1.5, 1.5],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
            }}
            aria-hidden="true"
          />

          {/* Icon */}
          <div className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16">
            <svg
              className="w-7 h-7 sm:w-8 sm:h-8"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </div>

          {/* Expanded Text (shows on hover) */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{
              width: isHovered ? "auto" : 0,
              opacity: isHovered ? 1 : 0
            }}
            className="overflow-hidden whitespace-nowrap pr-5"
          >
            <span className="font-semibold">Bize Yazın</span>
          </motion.div>
        </motion.button>
      </div>

      {/* Lead Form Modal */}
      {showFormFirst && (
        <MultiStepLeadForm
          isOpen={showLeadForm}
          onClose={() => setShowLeadForm(false)}
        />
      )}
    </>
  );
}

/**
 * ═══════════════════════════════════════════════════════════════════════════
 * STICKY BOTTOM CTA BAR (Mobile)
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * Sticky CTA bar that appears on mobile devices at the bottom of the screen.
 * Contains quick action buttons for phone call and WhatsApp.
 */

export function StickyBottomCTA() {
  const handlePhoneClick = () => {
    analytics.trackEvent("cta_click", {
      cta_name: "sticky_bottom_phone",
      action: "call",
    });
  };

  const handleWhatsAppClick = () => {
    const message = "Merhaba, Egepen PVC sistemleri hakkında bilgi almak istiyorum.";
    const whatsappUrl = `https://wa.me/${businessConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");

    analytics.trackWhatsAppClick("sticky_bottom_cta");
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden">
      <div className="bg-white border-t border-neutral-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] px-4 py-3">
        <div className="flex gap-3">
          {/* Phone Button */}
          <a
            href={`tel:${businessConfig.contact.mobileRaw}`}
            onClick={handlePhoneClick}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors"
            title="Egepen Akçayapı'yı Hemen Arayın"
            aria-label="Telefon ile arayın"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Ara
          </a>

          {/* WhatsApp Button */}
          <button
            onClick={handleWhatsAppClick}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#25D366] text-white font-semibold rounded-xl hover:bg-[#20BD5A] transition-colors"
            title="WhatsApp ile İletişime Geçin"
            aria-label="WhatsApp ile mesaj gönderin"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}

export default FloatingWhatsAppCTA;
