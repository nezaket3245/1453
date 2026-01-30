/**
 * Service Worker for Egepen Akçayapı Website
 * 
 * Provides:
 * - Offline caching for critical assets
 * - Network-first strategy for dynamic content
 * - Cache-first strategy for static assets
 * - Faster subsequent page loads
 * - Priority loading for "Call Now" on slow connections
 */

const CACHE_NAME = "egepen-akcayapi-v2";
const STATIC_CACHE = "static-v2";
const DYNAMIC_CACHE = "dynamic-v2";
const CRITICAL_CACHE = "critical-v1";

// Critical assets - loaded first on slow connections
const CRITICAL_ASSETS = [
    "/",
    "/offline.html",
];

// Static assets to cache immediately
const STATIC_ASSETS = [
    "/manifest.json",
    "/images/logo.svg",
    "/images/logo-white.svg",
];

// Install event - cache critical and static assets
self.addEventListener("install", (event) => {
    event.waitUntil(
        Promise.all([
            caches.open(CRITICAL_CACHE).then((cache) => {
                console.log("[SW] Caching critical assets");
                return cache.addAll(CRITICAL_ASSETS);
            }),
            caches.open(STATIC_CACHE).then((cache) => {
                console.log("[SW] Caching static assets");
                return cache.addAll(STATIC_ASSETS);
            }),
        ])
    );
    // Activate immediately
    self.skipWaiting();
});

// Activate event - clean old caches
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys
                    .filter((key) =>
                        key !== STATIC_CACHE &&
                        key !== DYNAMIC_CACHE &&
                        key !== CRITICAL_CACHE
                    )
                    .map((key) => caches.delete(key))
            );
        })
    );
    // Claim all clients immediately
    self.clients.claim();
});

// Fetch event - serve from cache or network with priority handling
self.addEventListener("fetch", (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== "GET") return;

    // Skip chrome-extension and other non-http(s) requests
    if (!url.protocol.startsWith("http")) return;

    // Priority: Critical elements first (for slow connections)
    if (isCriticalElement(url)) {
        event.respondWith(criticalFirst(request));
        return;
    }

    // Strategy based on request type
    if (isStaticAsset(url)) {
        // Cache-first for static assets (images, fonts, etc.)
        event.respondWith(cacheFirst(request));
    } else if (isAPI(url)) {
        // Network-first for API requests
        event.respondWith(networkFirst(request));
    } else {
        // Stale-while-revalidate for HTML pages
        event.respondWith(staleWhileRevalidate(request));
    }
});

// Helper: Check if URL is a critical element (phone links, CTA buttons)
function isCriticalElement(url) {
    return url.pathname === "/" ||
        url.pathname.includes("/iletisim") ||
        url.href.includes("tel:") ||
        url.href.includes("wa.me");
}

// Helper: Check if URL is a static asset
function isStaticAsset(url) {
    const staticExtensions = [".js", ".css", ".png", ".jpg", ".jpeg", ".webp", ".svg", ".woff", ".woff2", ".ico"];
    return staticExtensions.some((ext) => url.pathname.endsWith(ext));
}

// Helper: Check if URL is an API request
function isAPI(url) {
    return url.pathname.startsWith("/api/");
}

// Strategy: Critical First (prioritize on slow connections)
async function criticalFirst(request) {
    // Check connection speed
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const isSlowConnection = connection && (connection.effectiveType === "slow-2g" || connection.effectiveType === "2g" || connection.saveData);

    if (isSlowConnection) {
        // On slow connections, serve from cache immediately
        const cached = await caches.match(request);
        if (cached) {
            // Update cache in background
            fetch(request).then((response) => {
                if (response.ok) {
                    caches.open(CRITICAL_CACHE).then((cache) => {
                        cache.put(request, response.clone());
                    });
                }
            }).catch(() => { });
            return cached;
        }
    }

    // Normal speed: Network first with cache fallback
    return networkFirst(request);
}

// Strategy: Cache First
async function cacheFirst(request) {
    const cached = await caches.match(request);
    if (cached) return cached;

    try {
        const response = await fetch(request);
        if (response.ok) {
            const cache = await caches.open(STATIC_CACHE);
            cache.put(request, response.clone());
        }
        return response;
    } catch (error) {
        return new Response("Offline", { status: 503 });
    }
}

// Strategy: Network First
async function networkFirst(request) {
    try {
        const response = await fetch(request);
        if (response.ok) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, response.clone());
        }
        return response;
    } catch (error) {
        const cached = await caches.match(request);
        if (cached) return cached;
        return new Response(JSON.stringify({ error: "Offline" }), {
            status: 503,
            headers: { "Content-Type": "application/json" },
        });
    }
}

// Strategy: Stale While Revalidate
async function staleWhileRevalidate(request) {
    const cached = await caches.match(request);

    const fetchPromise = fetch(request).then((response) => {
        if (response.ok) {
            caches.open(DYNAMIC_CACHE).then((cache) => {
                cache.put(request, response.clone());
            });
        }
        return response;
    });

    return cached || fetchPromise;
}
