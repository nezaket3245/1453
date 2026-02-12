"use client";

import { useState, useEffect, useCallback, createContext, useContext } from "react";
import { cn } from "@/lib/utils";

/**
 * Toast Notification System
 * 
 * Lightweight, accessible toast notifications for form feedback.
 * Features:
 * - Success, error, warning, info variants
 * - Auto-dismiss with configurable duration
 * - Accessible with ARIA live region
 * - Stacking support for multiple toasts
 * - CSS-only animations (no Framer Motion)
 */

type ToastVariant = "success" | "error" | "warning" | "info";

interface Toast {
    id: string;
    message: string;
    variant: ToastVariant;
    duration?: number;
}

interface ToastContextType {
    showToast: (message: string, variant?: ToastVariant, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

/**
 * Hook to access toast notifications
 * @example const { showToast } = useToast();
 *          showToast("Form başarıyla gönderildi!", "success");
 */
export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
}

const variantStyles: Record<ToastVariant, { bg: string; icon: string; border: string }> = {
    success: {
        bg: "bg-green-50",
        border: "border-green-200",
        icon: "text-green-500",
    },
    error: {
        bg: "bg-red-50",
        border: "border-red-200",
        icon: "text-red-500",
    },
    warning: {
        bg: "bg-yellow-50",
        border: "border-yellow-200",
        icon: "text-yellow-500",
    },
    info: {
        bg: "bg-blue-50",
        border: "border-blue-200",
        icon: "text-blue-500",
    },
};

const variantIcons: Record<ToastVariant, React.ReactNode> = {
    success: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    error: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    warning: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
    ),
    info: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
};

/**
 * Individual Toast Component
 */
function ToastItem({
    toast,
    onDismiss,
}: {
    toast: Toast;
    onDismiss: (id: string) => void;
}) {
    const styles = variantStyles[toast.variant];

    useEffect(() => {
        const timer = setTimeout(() => {
            onDismiss(toast.id);
        }, toast.duration || 5000);

        return () => clearTimeout(timer);
    }, [toast.id, toast.duration, onDismiss]);

    return (
        <div
            className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg animate-slide-up max-w-sm w-full",
                styles.bg,
                styles.border
            )}
            role="alert"
            aria-live="polite"
        >
            <span className={cn("flex-shrink-0", styles.icon)}>
                {variantIcons[toast.variant]}
            </span>
            <p className="text-sm font-medium text-neutral-800 flex-1">
                {toast.message}
            </p>
            <button
                onClick={() => onDismiss(toast.id)}
                className="flex-shrink-0 p-1 rounded-lg hover:bg-black/5 transition-colors"
                aria-label="Bildirimi kapat"
            >
                <svg className="w-4 h-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
}

/**
 * ToastProvider - Wraps the app to provide toast functionality
 */
export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback(
        (message: string, variant: ToastVariant = "info", duration = 5000) => {
            const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;
            setToasts((prev) => [...prev, { id, message, variant, duration }]);
        },
        []
    );

    const dismissToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {/* Toast Container — fixed at bottom-right */}
            {toasts.length > 0 && (
                <div
                    className="fixed bottom-4 right-4 z-[1000] flex flex-col gap-2 items-end"
                    aria-label="Bildirimler"
                >
                    {toasts.map((toast) => (
                        <ToastItem
                            key={toast.id}
                            toast={toast}
                            onDismiss={dismissToast}
                        />
                    ))}
                </div>
            )}
        </ToastContext.Provider>
    );
}
