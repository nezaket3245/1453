"use client";

import { useEffect } from "react";
import Link from "next/link";
import { businessConfig } from "@/config/business.config";

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
        // Log the error to an error reporting service
        console.error("Application error:", error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-red-50 to-white p-4">
            <div className="max-w-lg w-full text-center">
                {/* Error Icon */}
                <div className="mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100">
                        <svg
                            className="w-10 h-10 text-red-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
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
                        <a
                            href={`tel:${businessConfig.contact.mobileRaw}`}
                            className="inline-flex items-center justify-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
                        >
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                />
                            </svg>
                            {businessConfig.contact.mobile}
                        </a>
                        <a
                            href={`https://wa.me/${businessConfig.contact.whatsapp}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 text-green-600 hover:text-green-700 font-medium"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            WhatsApp
                        </a>
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
        </div>
    );
}
