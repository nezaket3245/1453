"use client";

import { useState, useEffect, createContext, useContext } from "react";

/**
 * ConnectionAwareLoader - Detects network speed and prioritizes critical UI
 */

interface ConnectionInfo {
    effectiveType: "slow-2g" | "2g" | "3g" | "4g";
    downlink: number;
    rtt: number;
    saveData: boolean;
}

interface ConnectionContextType {
    connectionInfo: ConnectionInfo | null;
    isSlowConnection: boolean;
    shouldDeferImages: boolean;
}

const ConnectionContext = createContext<ConnectionContextType>({
    connectionInfo: null,
    isSlowConnection: false,
    shouldDeferImages: false,
});

export function useConnection() {
    return useContext(ConnectionContext);
}

export function ConnectionProvider({ children }: { children: React.ReactNode }) {
    const [connectionInfo, setConnectionInfo] = useState<ConnectionInfo | null>(null);

    useEffect(() => {
        const nav = navigator as Navigator & {
            connection?: {
                effectiveType: string;
                downlink: number;
                rtt: number;
                saveData: boolean;
            };
        };

        if (nav.connection) {
            setConnectionInfo({
                effectiveType: nav.connection.effectiveType as ConnectionInfo["effectiveType"],
                downlink: nav.connection.downlink,
                rtt: nav.connection.rtt,
                saveData: nav.connection.saveData,
            });
        }
    }, []);

    const isSlowConnection = connectionInfo
        ? connectionInfo.effectiveType !== "4g" || connectionInfo.downlink < 1.5 || connectionInfo.saveData
        : false;

    return (
        <ConnectionContext.Provider value={{ connectionInfo, isSlowConnection, shouldDeferImages: isSlowConnection }}>
            {children}
        </ConnectionContext.Provider>
    );
}

export function PriorityCTA({ href, children, variant = "primary", className = "" }: {
    href: string; children: React.ReactNode; variant?: "primary" | "whatsapp" | "call"; className?: string;
}) {
    const variantStyles = {
        primary: "bg-primary-600 text-white hover:bg-primary-700",
        whatsapp: "bg-green-500 text-white hover:bg-green-600",
        call: "bg-secondary-500 text-neutral-900 hover:bg-secondary-400",
    };
    return (
        <a href={href} className={`inline-flex items-center justify-center gap-2 font-bold rounded-xl transition-all shadow-lg ${variantStyles[variant]} ${className}`}>
            {children}
        </a>
    );
}
