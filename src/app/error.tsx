"use client";

import { useEffect } from "react";
import Link from "next/link";

/**
 * Global Error Component
 * 
 * Handles unexpected errors gracefully with retry option.
 * Provides user-friendly error message and support contact.
 */
export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Error logged for error boundary
        void error;
    }, [error]);

    return (
        <main id="main-content" className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-50 to-white p-4">
            <div className="max-w-lg w-full text-center" role="alert" aria-live="assertive">
                {/* Error Icon */}
                <div className="mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100">
                        <svg
                            className="w-10 h-10 text-red-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                    </div>
                </div>

                {/* Error Message */}
                <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
                    Bir Hata Oluştu
                </h1>
                <p className="text-neutral-600 mb-8">
                    Üzgünüz, beklenmeyen bir hata oluştu. Lütfen tekrar deneyin veya
                    sorun devam ederse bizimle iletişime geçin.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                    <button
                        onClick={reset}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white font-bold rounded-xl hover:bg-primary-700 transition-colors"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                            />
                        </svg>
                        Tekrar Dene
                    </button>
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-neutral-700 font-bold rounded-xl border border-neutral-200 hover:border-primary-500 hover:text-primary-600 transition-colors"
                    >
                        Ana Sayfaya Dön
                    </Link>
                </div>

                {/* Contact Support */}
                <div className="bg-neutral-50 rounded-2xl p-6 border border-neutral-100">
                    <p className="text-sm text-neutral-500 mb-3">
                        Sorun devam ederse bize ulaşın:
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/iletisim"
                            className="inline-flex items-center justify-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
                        >
                            İletişim Sayfası
                        </Link>
                    </div>
                </div>

                {/* Error Details (Development Only) */}
                {process.env.NODE_ENV === "development" && (
                    <details className="mt-8 text-left">
                        <summary className="text-sm text-neutral-500 cursor-pointer hover:text-neutral-700">
                            Hata Detayları (Geliştirici)
                        </summary>
                        <pre className="mt-2 p-4 bg-neutral-900 text-neutral-100 text-xs rounded-lg overflow-x-auto">
                            {error.message}
                            {error.digest && `\n\nDigest: ${error.digest}`}
                        </pre>
                    </details>
                )}
            </div>
        </main>
    );
}
