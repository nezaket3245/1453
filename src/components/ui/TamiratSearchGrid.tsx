// ===========================================================================
// TamiratSearchGrid — Client component for interactive search & filter
// ===========================================================================
// Renders:
//   • Category filter badges
//   • Turkish-aware fuzzy search bar (re-uses Fuse.js from searchUtils)
//   • Responsive card grid with repair records
//   • Empty-state fallback
// ===========================================================================

"use client";

import { useState, useMemo, useCallback, useTransition } from "react";
import type { ReactNode } from "react";
import Fuse, { type IFuseOptions } from "fuse.js";
import {
  type RepairRecord,
  type RepairCategory,
  categoryMeta,
  repairRecords,
} from "@/lib/tamiratData";
import { normalizeTurkish } from "@/lib/searchUtils";

// ---------------------------------------------------------------------------
// Fuse.js configuration (lightweight — runs client-side)
// ---------------------------------------------------------------------------

function buildNormalizedRecords(records: readonly RepairRecord[]) {
  return records.map((r) => ({
    ...r,
    _normalTitle: normalizeTurkish(r.title),
    _normalDesc: normalizeTurkish(r.description),
    _normalKeywords: r.keywords.map(normalizeTurkish).join(" "),
  }));
}

type NormalizedRecord = ReturnType<typeof buildNormalizedRecords>[number];

const FUSE_OPTIONS: IFuseOptions<NormalizedRecord> = {
  keys: [
    { name: "_normalTitle", weight: 0.4 },
    { name: "_normalDesc", weight: 0.25 },
    { name: "_normalKeywords", weight: 0.35 },
  ],
  threshold: 0.35,
  ignoreLocation: true,
  minMatchCharLength: 2,
};

// ---------------------------------------------------------------------------
// SVG icon map (project policy: no emojis — inline SVG only)
// ---------------------------------------------------------------------------

const iconMap: Record<string, ReactNode> = {
  glass: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75h16.5v16.5H3.75zM3.75 3.75l16.5 16.5M20.25 3.75l-16.5 16.5" />
    </svg>
  ),
  "broken-glass": (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0 3v.008M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  mechanism: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.094c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.108 1.205.166.396.506.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.424.07-.764.384-.93.78-.164.398-.142.855.108 1.205l.527.737c.32.448.269 1.06-.12 1.45l-.773.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.205-.107-.396.165-.71.505-.78.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.205-.165-.396-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.397.143-.854-.108-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  seal: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  ),
  "door-seal": (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
    </svg>
  ),
  handle: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
    </svg>
  ),
  hinge: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
    </svg>
  ),
  welding: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
    </svg>
  ),
  impact: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1-5.1a2.25 2.25 0 010-3.182l.71-.71a2.25 2.25 0 013.182 0l2.12 2.122 2.122-2.122a2.25 2.25 0 013.182 0l.71.71a2.25 2.25 0 010 3.182l-5.1 5.1a.75.75 0 01-1.06 0z" />
    </svg>
  ),
  paint: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
    </svg>
  ),
  sill: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  ),
  overhaul: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1-5.1M21.75 12a9.75 9.75 0 11-19.5 0 9.75 9.75 0 0119.5 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
    </svg>
  ),
};

/** Lookup an icon by key, with fallback */
export function getRepairIcon(key: string): ReactNode {
  return iconMap[key] ?? iconMap.mechanism;
}

// ---------------------------------------------------------------------------
// Urgency / badge chip helpers
// ---------------------------------------------------------------------------

const urgencyColors: Record<string, string> = {
  high: "bg-red-100 text-red-700",
  medium: "bg-amber-100 text-amber-700",
  low: "bg-green-100 text-green-700",
};

const urgencyLabels: Record<string, string> = {
  high: "Acil",
  medium: "Orta",
  low: "Düşük",
};

const badgeColors: Record<string, string> = {
  "En Sık": "bg-blue-600 text-white",
  Acil: "bg-red-600 text-white",
  Mevsimsel: "bg-amber-500 text-white",
  Yeni: "bg-emerald-600 text-white",
  Kampanya: "bg-purple-600 text-white",
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface Props {
  /** Callback fired when user clicks a card — opens detail modal */
  onSelectRecord: (record: RepairRecord) => void;
}

export default function TamiratSearchGrid({ onSelectRecord }: Props) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<RepairCategory | "all">("all");
  const [, startTransition] = useTransition();

  // Build Fuse index once
  const normalizedRecords = useMemo(() => buildNormalizedRecords(repairRecords), []);
  const fuse = useMemo(() => new Fuse(normalizedRecords, FUSE_OPTIONS), [normalizedRecords]);

  // Filtered results
  const results: RepairRecord[] = useMemo(() => {
    let base: RepairRecord[];

    if (query.trim().length >= 2) {
      const normalizedQuery = normalizeTurkish(query);
      base = fuse.search(normalizedQuery).map((r) => r.item);
    } else {
      base = [...repairRecords];
    }

    if (activeCategory !== "all") {
      base = base.filter((r) => r.category === activeCategory);
    }

    return base;
  }, [query, activeCategory, fuse]);

  const handleQueryChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      startTransition(() => setQuery(e.target.value));
    },
    [],
  );

  const categories = Object.entries(categoryMeta) as [RepairCategory, { label: string; color: string }][];

  return (
    <div>
      {/* ── Search bar ─────────────────────────────────────────────── */}
      <div className="relative max-w-xl mx-auto mb-8">
        <label htmlFor="repair-search" className="sr-only">
          Tamir hizmeti ara
        </label>
        <div className="relative">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <input
            id="repair-search"
            type="search"
            value={query}
            onChange={handleQueryChange}
            placeholder='Ara... örn. "conta", "cam", "mekanizma"'
            className="w-full pl-12 pr-10 py-3.5 rounded-xl border border-neutral-200 bg-white shadow-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
            autoComplete="off"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-neutral-100 transition-colors"
              aria-label="Aramayı temizle"
            >
              <svg className="w-5 h-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        <p className="mt-2 text-sm text-neutral-500 text-center">
          Türkçe karakter duyarsız arama — &quot;espanyolet&quot; veya &quot;fitil&quot; yazarak arayın.
        </p>
      </div>

      {/* ── Category filter badges ─────────────────────────────────── */}
      <div className="flex flex-wrap justify-center gap-2 mb-10" role="group" aria-label="Kategori filtreleri">
        <button
          onClick={() => setActiveCategory("all")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeCategory === "all"
              ? "bg-neutral-900 text-white shadow-md"
              : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
          }`}
        >
          Tümü ({repairRecords.length})
        </button>
        {categories.map(([key, meta]) => {
          const count = repairRecords.filter((r) => r.category === key).length;
          return (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === key
                  ? "bg-neutral-900 text-white shadow-md"
                  : `${meta.color} hover:opacity-80`
              }`}
            >
              {meta.label} ({count})
            </button>
          );
        })}
      </div>

      {/* ── Result count ───────────────────────────────────────────── */}
      {query.trim().length >= 2 && (
        <p className="text-sm text-neutral-500 mb-4 text-center">
          {results.length > 0
            ? `${results.length} sonuç bulundu`
            : "Sonuç bulunamadı"}
        </p>
      )}

      {/* ── Card grid ──────────────────────────────────────────────── */}
      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((record) => (
            <button
              key={record.id}
              onClick={() => onSelectRecord(record)}
              className="group text-left bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={`${record.title} detaylarını gör`}
            >
              {/* Badge */}
              {record.badge && (
                <span
                  className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold mb-3 ${
                    badgeColors[record.badge] ?? "bg-neutral-200 text-neutral-700"
                  }`}
                >
                  {record.badge}
                </span>
              )}

              {/* Icon + Title */}
              <div className="flex items-start gap-3 mb-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  {getRepairIcon(record.icon)}
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-blue-700 transition-colors leading-tight">
                  {record.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-sm text-neutral-600 mb-4 line-clamp-2">
                {record.description}
              </p>

              {/* Meta chips */}
              <div className="flex flex-wrap items-center gap-2">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${categoryMeta[record.category].color}`}>
                  {categoryMeta[record.category].label}
                </span>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${urgencyColors[record.urgencyLevel]}`}>
                  {urgencyLabels[record.urgencyLevel]}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-neutral-500">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {record.estimatedDuration}
                </span>
              </div>
            </button>
          ))}
        </div>
      ) : (
        /* ── Empty state ───────────────────────────────────────────── */
        <div className="text-center py-16 px-4">
          <svg className="w-16 h-16 mx-auto mb-4 text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <h3 className="text-lg font-semibold text-neutral-700 mb-2">
            Sonuç Bulunamadı
          </h3>
          <p className="text-neutral-500 mb-6 max-w-md mx-auto">
            Aradığınız hizmeti bulamadınız mı? Bizi arayın — tüm PVC pencere ve
            kapı sorunlarına çözüm sunuyoruz.
          </p>
          <a
            href="tel:+902128801507"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            0212 880 15 07
          </a>
        </div>
      )}
    </div>
  );
}
