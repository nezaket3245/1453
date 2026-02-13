// ===========================================================================
// RepairStatusTracker — Server component for visual repair process timeline
// ===========================================================================
// Renders the 5-step repair flow (Talep → Keşif → Teklif → Onarım → Teslim)
// as a responsive horizontal/vertical timeline with SVG icons.
// Purely presentational — no client state needed.
// ===========================================================================

import React from "react";
import { repairStatusFlow } from "@/lib/tamiratData";

// ---------------------------------------------------------------------------
// Icon map for the status flow steps
// ---------------------------------------------------------------------------

const flowIcons: Record<string, React.ReactNode> = {
  phone: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  ),
  search: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  ),
  document: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  ),
  wrench: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1-5.1a2.25 2.25 0 010-3.182l.71-.71a2.25 2.25 0 013.182 0l2.12 2.122 2.122-2.122a2.25 2.25 0 013.182 0l.71.71a2.25 2.25 0 010 3.182l-5.1 5.1a.75.75 0 01-1.06 0z" />
    </svg>
  ),
  check: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function RepairStatusTracker() {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-neutral-900 text-center mb-2">
        Nasıl Çalışıyoruz?
      </h2>
      <p className="text-neutral-600 text-center mb-10 max-w-xl mx-auto">
        Tamirat sürecimiz 5 adımdan oluşur. Taleplerinizi aynı gün değerlendiriyoruz.
      </p>

      {/* ── Horizontal timeline (md+) ──────────────────────────────── */}
      <div className="hidden md:flex items-start justify-between max-w-4xl mx-auto relative">
        {/* Connector line */}
        <div className="absolute top-8 left-[10%] right-[10%] h-0.5 bg-blue-200" aria-hidden="true" />

        {repairStatusFlow.map((step, idx) => (
          <div key={step.id} className="relative flex flex-col items-center text-center w-1/5 px-2">
            {/* Circle with icon */}
            <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/20">
              {flowIcons[step.icon] ?? flowIcons.check}
            </div>
            {/* Step number */}
            <span className="mt-3 text-xs font-semibold text-blue-600 uppercase tracking-wider">
              Adım {idx + 1}
            </span>
            {/* Label */}
            <h3 className="mt-1 text-sm font-bold text-neutral-900">{step.label}</h3>
            {/* Description */}
            <p className="mt-1 text-xs text-neutral-500 leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>

      {/* ── Vertical timeline (mobile) ─────────────────────────────── */}
      <div className="md:hidden space-y-0">
        {repairStatusFlow.map((step, idx) => (
          <div key={step.id} className="relative flex items-start gap-4 pl-6">
            {/* Vertical line */}
            {idx < repairStatusFlow.length - 1 && (
              <div className="absolute left-[31px] top-16 bottom-0 w-0.5 bg-blue-200" aria-hidden="true" />
            )}
            {/* Circle */}
            <div className="relative z-10 flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/20">
              {flowIcons[step.icon] ?? flowIcons.check}
            </div>
            {/* Content */}
            <div className="pb-8">
              <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                Adım {idx + 1}
              </span>
              <h3 className="text-base font-bold text-neutral-900 mt-0.5">{step.label}</h3>
              <p className="text-sm text-neutral-500 mt-1">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
