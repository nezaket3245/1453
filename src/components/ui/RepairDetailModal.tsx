// ===========================================================================
// RepairDetailModal — Client component for repair service detail overlay
// ===========================================================================
// Renders a full-screen accessible modal that shows:
//   • Service description & common issues
//   • Step-by-step repair process timeline
//   • Warranty information
//   • CTA (phone call + WhatsApp)
// Keyboard accessible: Escape to close, focus trap via inert background.
// ===========================================================================

"use client";

import { useEffect, useRef, useCallback } from "react";
import type { RepairRecord } from "@/lib/tamiratData";
import { categoryMeta } from "@/lib/tamiratData";
import { getRepairIcon } from "@/components/ui/TamiratSearchGrid";

interface Props {
  record: RepairRecord;
  onClose: () => void;
}

export default function RepairDetailModal({ record, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Focus the close button on mount; close on Escape key
  useEffect(() => {
    closeRef.current?.focus();
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  // Close when clicking the backdrop
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === overlayRef.current) onClose();
    },
    [onClose],
  );

  const urgencyColors: Record<string, string> = {
    high: "text-red-600",
    medium: "text-amber-600",
    low: "text-green-600",
  };

  const urgencyLabels: Record<string, string> = {
    high: "Yüksek",
    medium: "Orta",
    low: "Düşük",
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="repair-modal-title"
    >
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">
        {/* ── Close button ──────────────────────────────────────────── */}
        <button
          ref={closeRef}
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Kapat"
        >
          <svg className="w-5 h-5 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* ── Header ────────────────────────────────────────────────── */}
        <div className="px-6 pt-6 pb-4 border-b border-neutral-100">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              {getRepairIcon(record.icon)}
            </div>
            <div className="flex-1 min-w-0 pr-8">
              <h2 id="repair-modal-title" className="text-xl font-bold text-neutral-900 leading-tight">
                {record.title}
              </h2>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryMeta[record.category].color}`}>
                  {categoryMeta[record.category].label}
                </span>
                {record.badge && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-600 text-white">
                    {record.badge}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── Content ───────────────────────────────────────────────── */}
        <div className="px-6 py-5 space-y-6">
          {/* Description */}
          <div>
            <p className="text-neutral-700 leading-relaxed">{record.detailedDescription}</p>
          </div>

          {/* Meta row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
            <div className="bg-neutral-50 rounded-xl p-3">
              <span className="block text-neutral-500 mb-1">Süre</span>
              <span className="font-medium text-neutral-900">{record.estimatedDuration}</span>
            </div>
            <div className="bg-neutral-50 rounded-xl p-3">
              <span className="block text-neutral-500 mb-1">Aciliyet</span>
              <span className={`font-medium ${urgencyColors[record.urgencyLevel]}`}>
                {urgencyLabels[record.urgencyLevel]}
              </span>
            </div>
            <div className="bg-neutral-50 rounded-xl p-3 col-span-2 sm:col-span-1">
              <span className="block text-neutral-500 mb-1">Fiyat</span>
              <span className="font-medium text-neutral-900">Fiyat İçin Arayın</span>
            </div>
          </div>

          {/* Common issues */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 mb-3">Yaşanabilecek Sorunlar</h3>
            <ul className="space-y-2">
              {record.commonIssues.map((issue, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-neutral-700">
                  <svg className="flex-shrink-0 w-4 h-4 mt-0.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" />
                  </svg>
                  {issue}
                </li>
              ))}
            </ul>
          </div>

          {/* Process timeline */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 mb-3">Onarım Aşamaları</h3>
            <ol className="relative space-y-4 pl-6 border-l-2 border-blue-200">
              {record.processSteps.map((step) => (
                <li key={step.order} className="relative">
                  {/* Timeline dot */}
                  <span className="absolute -left-[25px] top-0.5 flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-white text-xs font-bold">
                    {step.order}
                  </span>
                  <h4 className="text-sm font-semibold text-neutral-800">{step.title}</h4>
                  <p className="text-sm text-neutral-600 mt-0.5">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* Warranty */}
          <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
            <div className="flex items-center gap-2 mb-1">
              <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              <span className="text-sm font-semibold text-emerald-800">Garanti</span>
            </div>
            <p className="text-sm text-emerald-700">{record.warranty}</p>
          </div>
        </div>

        {/* ── CTA Footer ────────────────────────────────────────────── */}
        <div className="sticky bottom-0 px-6 py-4 bg-white border-t border-neutral-100 flex flex-col sm:flex-row gap-3">
          <a
            href="tel:+902128801507"
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors text-center"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            0212 880 15 07
          </a>
          <a
            href={`https://wa.me/902128801507?text=${encodeURIComponent(`Merhaba, ${record.title} hizmeti hakkında bilgi almak istiyorum.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors text-center"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.75.75 0 00.917.918l4.462-1.494A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.37 0-4.567-.7-6.414-1.9l-.45-.3-2.663.892.892-2.664-.3-.45A9.957 9.957 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
            </svg>
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
