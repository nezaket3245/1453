// ---------------------------------------------------------------------------
// FeedbackWidget — "Did this help you?" component for solution articles
// Stores feedback in localStorage to remember the user's choice
// ---------------------------------------------------------------------------
"use client";

import { useState, useEffect } from "react";

interface FeedbackWidgetProps {
  /** Unique article slug — used as localStorage key */
  articleSlug: string;
}

type FeedbackState = "idle" | "yes" | "no";

export function FeedbackWidget({ articleSlug }: FeedbackWidgetProps) {
  const storageKey = `feedback-${articleSlug}`;
  const [state, setState] = useState<FeedbackState>("idle");

  // Restore previous choice
  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved === "yes" || saved === "no") setState(saved);
    } catch {
      // localStorage may be unavailable
    }
  }, [storageKey]);

  const handleFeedback = (value: "yes" | "no") => {
    setState(value);
    try {
      localStorage.setItem(storageKey, value);
    } catch {
      // silent fail
    }
  };

  if (state !== "idle") {
    return (
      <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl border border-green-200 text-sm text-green-800">
        <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>
          {state === "yes"
            ? "Geri bildiriminiz için teşekkürler! Yardımcı olduğumuza sevindik."
            : "Geri bildiriminiz için teşekkürler. Daha iyi hale getirmek için çalışacağız."}
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 p-5 bg-neutral-50 rounded-xl border border-neutral-200">
      <p className="text-sm font-semibold text-neutral-700">Bu içerik işinize yaradı mı?</p>
      <div className="flex gap-3">
        <button
          onClick={() => handleFeedback("yes")}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-white border border-neutral-300 rounded-lg hover:bg-green-50 hover:border-green-300 hover:text-green-700 transition-all"
          aria-label="Evet, yardımcı oldu"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
          </svg>
          Evet
        </button>
        <button
          onClick={() => handleFeedback("no")}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium bg-white border border-neutral-300 rounded-lg hover:bg-red-50 hover:border-red-300 hover:text-red-700 transition-all"
          aria-label="Hayır, yardımcı olmadı"
        >
          <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
          </svg>
          Hayır
        </button>
      </div>
    </div>
  );
}
