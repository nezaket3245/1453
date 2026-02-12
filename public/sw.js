/**
 * Service Worker for Egepen Akçayapı Website
 * Optimized for Performance & SEO
 * 
 * Provides:
 * - Aggressive caching for static assets
 * - Network-first for HTML pages
 * - Offline support with fallback page
 * - Faster LCP through preloading
 */

const CACHE_VERSION = "v3";
const CACHE_NAME = `egepen-${CACHE_VERSION}`;
const STATIC_CACHE = `static-${CACHE_VERSION}`;
const IMAGE_CACHE = `images-${CACHE_VERSION}`;

// Critical assets for offline and fast loading
const PRECACHE_ASSETS = [
    "/",
    "/offline.html",
    "/manifest.json",
];

// Image extensions for image cache
const IMAGE_EXTENSIONS = [".webp", ".jpg", ".jpeg", ".png", ".svg", ".ico", ".avif"];

// Install: Precache critical assets
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(PRECACHE_ASSETS);
        })
    );
    self.skipWaiting();
});

// Activate: Clean old caches
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys
                    .filter((key) => !key.includes(CACHE_VERSION))
                    .map((key) => caches.delete(key))
            );
        })
    );
    self.clients.claim();
});

// Fetch: Route requests to appropriate strategy
self.addEventListener("fetch", (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET and non-http(s) requests
    if (request.method !== "GET" || !url.protocol.startsWith("http")) return;

    // Skip external domains
    if (!url.hostname.includes("akcapen") && 
        !url.hostname.includes("localhost")) {
        return;
    }

    // Images: Cache-first with long TTL
    if (isImage(url.pathname)) {
        event.respondWith(cacheFirstWithExpiry(request, IMAGE_CACHE, 30 * 24 * 60 * 60 * 1000)); // 30 days
        return;
    }

    // Static assets (JS, CSS, fonts): Cache-first
    if (isStaticAsset(url.pathname)) {
        event.respondWith(cacheFirst(request, STATIC_CACHE));
        return;
    }

    // HTML pages: Stale-while-revalidate
    event.respondWith(staleWhileRevalidate(request, CACHE_NAME));
});

// Check if path is an image
function isImage(pathname) {
    return IMAGE_EXTENSIONS.some(ext => pathname.toLowerCase().endsWith(ext));
}

// Check if path is a static asset
function isStaticAsset(pathname) {
    const staticExtensions = [".js", ".css", ".woff", ".woff2", ".ttf", ".eot"];
    return staticExtensions.some(ext => pathname.endsWith(ext));
}

// Cache-first strategy
async function cacheFirst(request, cacheName) {
    const cached = await caches.match(request);
    if (cached) return cached;

    try {
        const response = await fetch(request);
        if (response.ok && response.status === 200) {
            const cache = await caches.open(cacheName);
            cache.put(request, response.clone());
        }
        return response;
    } catch {
        return offlineResponse(request);
    }
}

// Cache-first with expiry check
async function cacheFirstWithExpiry(request, cacheName, maxAge) {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(request);
    
    if (cached) {
        const dateHeader = cached.headers.get("date");
        if (dateHeader) {
            const cachedTime = new Date(dateHeader).getTime();
            if (Date.now() - cachedTime < maxAge) {
                return cached;
            }
        } else {
            return cached;
        }
    }

    try {
        const response = await fetch(request);
        if (response.ok && response.status === 200) {
            cache.put(request, response.clone());
        }
        return response;
    } catch {
        if (cached) return cached;
        return offlineResponse(request);
    }
}

// Stale-while-revalidate strategy
async function staleWhileRevalidate(request, cacheName) {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(request);

    const networkPromise = fetch(request)
        .then((response) => {
            if (response.ok && response.status === 200) {
                cache.put(request, response.clone());
            }
            return response;
        })
        .catch(() => cached || offlineResponse(request));

    return cached || networkPromise;
}

// Offline fallback response
function offlineResponse(request) {
    const url = new URL(request.url);
    
    // Return offline page for HTML requests
    if (request.headers.get("accept")?.includes("text/html")) {
        return caches.match("/offline.html") || new Response(
            "<html><body><h1>Çevrimdışı</h1><p>Lütfen internet bağlantınızı kontrol edin.</p></body></html>",
            { headers: { "Content-Type": "text/html; charset=utf-8" } }
        );
    }

    return new Response("Offline", { status: 503, statusText: "Service Unavailable" });
}
