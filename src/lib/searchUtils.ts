// ---------------------------------------------------------------------------
// Search utilities — Turkish-aware fuzzy search powered by Fuse.js
// ---------------------------------------------------------------------------
// The module exports:
//   1. normalizeTurkish()  — strips accents & maps ı→i, İ→I, etc.
//   2. useSearch()         — React hook that returns filtered results
// ---------------------------------------------------------------------------

"use client";

import { useMemo, useState, useTransition } from "react";
import Fuse, { type IFuseOptions } from "fuse.js";
import type { Solution } from "@/lib/solutionsData";

// ---------------------------------------------------------------------------
// Turkish character normalisation
// ---------------------------------------------------------------------------
const TURKISH_MAP: Record<string, string> = {
  ç: "c",
  Ç: "C",
  ğ: "g",
  Ğ: "G",
  ı: "i",
  İ: "I",
  ö: "o",
  Ö: "O",
  ş: "s",
  Ş: "S",
  ü: "u",
  Ü: "U",
};

/**
 * Normalize a string so that Turkish diacritics are replaced and the
 * result is lowercased. This enables typo-tolerant searching:
 *   "aliminyum" will match "Alüminyum"
 */
export function normalizeTurkish(input: string): string {
  return input
    .replace(/[çÇğĞıİöÖşŞüÜ]/g, (ch) => TURKISH_MAP[ch] ?? ch)
    .toLowerCase();
}

// ---------------------------------------------------------------------------
// Fuse.js configuration
// ---------------------------------------------------------------------------
const FUSE_OPTIONS: IFuseOptions<Solution> = {
  keys: [
    { name: "title", weight: 0.35 },
    { name: "excerpt", weight: 0.25 },
    { name: "keywords", weight: 0.3 },
    { name: "badge", weight: 0.1 },
  ],
  threshold: 0.35, // fairly tolerant (0 = exact, 1 = anything)
  ignoreLocation: true, // match anywhere in the string
  minMatchCharLength: 2,
  getFn: (obj: Solution, path: string | string[]) => {
    // Resolve the value from the object first
    const key = Array.isArray(path) ? path[0] : path;
    const raw = (obj as unknown as Record<string, unknown>)[key];
    if (Array.isArray(raw)) {
      return raw.map((v) => normalizeTurkish(String(v)));
    }
    return normalizeTurkish(String(raw ?? ""));
  },
};

// ---------------------------------------------------------------------------
// useSearch hook
// ---------------------------------------------------------------------------
export interface UseSearchReturn {
  query: string;
  setQuery: (q: string) => void;
  results: Solution[];
  isPending: boolean;
  hasSearched: boolean;
}

export function useSearch(allSolutions: Solution[]): UseSearchReturn {
  const [query, setQueryRaw] = useState("");
  const [isPending, startTransition] = useTransition();

  // Build the Fuse index once
  const fuse = useMemo(() => new Fuse(allSolutions, FUSE_OPTIONS), [allSolutions]);

  // Wrap setter in a transition so typing stays smooth
  const setQuery = (q: string) => {
    startTransition(() => {
      setQueryRaw(q);
    });
  };

  const results = useMemo(() => {
    const trimmed = query.trim();
    if (trimmed.length < 2) return allSolutions;
    const normalised = normalizeTurkish(trimmed);
    return fuse.search(normalised).map((r) => r.item);
  }, [query, fuse, allSolutions]);

  return {
    query,
    setQuery,
    results,
    isPending,
    hasSearched: query.trim().length >= 2,
  };
}
