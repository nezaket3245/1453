"use client";

import { ToastProvider } from "@/components/ui/Toast";

/**
 * AppProviders - Client-side provider wrapper
 * 
 * Wraps the entire app with necessary context providers:
 * - ToastProvider: Global toast notifications for form feedback
 * 
 * Add more providers here as needed (Auth, Theme, etc.)
 */
export function AppProviders({ children }: { children: React.ReactNode }) {
    return (
        <ToastProvider>
            {children}
        </ToastProvider>
    );
}
