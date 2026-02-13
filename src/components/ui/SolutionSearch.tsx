// ---------------------------------------------------------------------------
// SolutionSearch — Client component: search bar + filtered result cards
// Renders on the /cozumler index page
// ---------------------------------------------------------------------------
"use client";

import { useRef } from "react";
import Link from "next/link";
import { useSearch } from "@/lib/searchUtils";
import {
  type Solution,
  type SolutionCategory,
  categoryMeta,
} from "@/lib/solutionsData";

interface SolutionSearchProps {
  solutions: Solution[];
}

export function SolutionSearch({ solutions }: SolutionSearchProps) {
  const { query, setQuery, results, isPending, hasSearched } = useSearch(solutions);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      {/* ── Search bar ──────────────────────────────────────── */}
      <div className="relative max-w-2xl mx-auto mb-10">
        <label htmlFor="solution-search" className="sr-only">
          Çözüm ara
        </label>
        <div className="relative">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            ref={inputRef}
            id="solution-search"
            type="search"
            placeholder="Sorun veya konu ara… (ör: terleme, sürme sistem, kilit)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-10 py-4 text-base border border-neutral-200 rounded-2xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all placeholder:text-neutral-400"
            autoComplete="off"
            aria-describedby="search-hint"
          />
          {/* Clear button */}
          {query.length > 0 && (
            <button
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-neutral-700 transition-colors"
              aria-label="Aramayı temizle"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        <p id="search-hint" className="text-xs text-neutral-400 mt-2 text-center">
          Türkçe karakter duyarsız arama — &quot;aliminyum&quot; yazarak &quot;Alüminyum&quot; sonuçlarını görebilirsiniz.
        </p>
      </div>

      {/* ── Loading indicator ───────────────────────────────── */}
      {isPending && (
        <div className="text-center text-sm text-neutral-400 mb-4" aria-live="polite">
          Aranıyor…
        </div>
      )}

      {/* ── Result count ────────────────────────────────────── */}
      {hasSearched && (
        <p className="text-sm text-neutral-500 text-center mb-6" aria-live="polite">
          {results.length > 0
            ? `${results.length} sonuç bulundu`
            : "Sonuç bulunamadı"}
        </p>
      )}

      {/* ── No results fallback ─────────────────────────────── */}
      {hasSearched && results.length === 0 && (
        <div className="text-center py-12 px-6 bg-neutral-50 rounded-2xl border border-neutral-200 max-w-lg mx-auto mb-10">
          <svg className="w-12 h-12 mx-auto text-neutral-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
          </svg>
          <h3 className="text-lg font-bold text-neutral-800 mb-2">
            Aradığınız konuyu bulamadık
          </h3>
          <p className="text-sm text-neutral-500 mb-4">
            Sorunuzu doğrudan bize sorabilirsiniz — size özel çözüm sunalım.
          </p>
          <Link
            href="/iletisim"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Bize Ulaşın
          </Link>
        </div>
      )}

      {/* ── Result cards ────────────────────────────────────── */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((sol) => (
          <SolutionCard key={sol.slug} solution={sol} />
        ))}
      </div>
    </>
  );
}

// ---------------------------------------------------------------------------
// Card sub-component
// ---------------------------------------------------------------------------
function SolutionCard({ solution }: { solution: Solution }) {
  const meta = categoryMeta[solution.category as SolutionCategory];

  return (
    <article className="group flex flex-col bg-white rounded-2xl border border-neutral-200 hover:border-primary-300 hover:shadow-md transition-all overflow-hidden">
      {/* Badge */}
      <div className="px-5 pt-5">
        <span
          className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full border ${meta.bgColor} ${meta.color}`}
        >
          {meta.label}
        </span>
      </div>

      {/* Title + excerpt */}
      <div className="flex-1 px-5 py-3">
        <h3 className="text-base font-bold text-neutral-900 group-hover:text-primary-600 transition-colors leading-snug mb-2">
          <Link href={`/cozumler/${solution.slug}`} className="after:absolute after:inset-0 relative">
            {solution.title}
          </Link>
        </h3>
        <p className="text-sm text-neutral-500 line-clamp-3 leading-relaxed">
          {solution.excerpt}
        </p>
      </div>

      {/* Footer */}
      <div className="px-5 pb-5 pt-2 flex items-center justify-between">
        <time className="text-xs text-neutral-400" dateTime={solution.updatedAt}>
          {new Date(solution.updatedAt).toLocaleDateString("tr-TR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </time>
        <span className="text-xs font-medium text-primary-600 group-hover:underline">
          Oku →
        </span>
      </div>
    </article>
  );
}
