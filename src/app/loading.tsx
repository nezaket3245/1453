/**
 * Global Loading Component
 * 
 * Lightweight skeleton loader for better perceived performance.
 * Matches the layout structure to reduce CLS.
 */
export default function Loading() {
    return (
        <div className="min-h-screen bg-white" aria-busy="true" aria-label="Sayfa yükleniyor">
            {/* Header Skeleton */}
            <div className="h-16 lg:h-20 bg-white border-b border-neutral-100">
                <div className="container-custom flex items-center justify-between h-full">
                    <div className="w-32 h-8 bg-neutral-200 rounded animate-pulse" />
                    <div className="hidden lg:flex gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="w-20 h-6 bg-neutral-100 rounded animate-pulse" />
                        ))}
                    </div>
                </div>
            </div>

            {/* Hero Skeleton */}
            <div className="bg-neutral-900 min-h-[60vh] flex items-center">
                <div className="container-custom py-16">
                    <div className="max-w-2xl space-y-6">
                        <div className="w-40 h-6 bg-neutral-700 rounded-full animate-pulse" />
                        <div className="space-y-3">
                            <div className="w-full h-12 bg-neutral-800 rounded animate-pulse" />
                            <div className="w-3/4 h-12 bg-neutral-800 rounded animate-pulse" />
                        </div>
                        <div className="w-2/3 h-6 bg-neutral-700 rounded animate-pulse" />
                        <div className="flex gap-4 pt-4">
                            <div className="w-36 h-12 bg-primary-600/50 rounded-xl animate-pulse" />
                            <div className="w-36 h-12 bg-green-600/50 rounded-xl animate-pulse" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Skeleton */}
            <div className="py-16">
                <div className="container-custom">
                    <div className="w-48 h-8 bg-neutral-200 rounded mx-auto mb-8 animate-pulse" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="h-64 bg-neutral-100 rounded-xl animate-pulse"
                                style={{ animationDelay: `${i * 100}ms` }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
