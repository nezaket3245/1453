/**
 * Global Loading Component
 * 
 * Displays a beautiful loading animation while pages are loading.
 * Uses the brand colors for consistency.
 */
export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="text-center">
                {/* Animated Logo/Spinner */}
                <div className="relative mb-8">
                    <div className="w-16 h-16 border-4 border-neutral-200 rounded-full"></div>
                    <div className="absolute top-0 left-0 w-16 h-16 border-4 border-primary-500 rounded-full border-t-transparent animate-spin"></div>
                </div>

                {/* Loading Text */}
                <p className="text-neutral-600 font-medium animate-pulse">
                    Yükleniyor...
                </p>
            </div>
        </div>
    );
}
